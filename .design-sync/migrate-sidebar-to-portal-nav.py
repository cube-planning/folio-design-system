import re, sys
ACTIVE = {'AI Hub':'cubeAI','Planner':'planners','Smart Variance':'smartVariance','Boards':'boards','Cube BI':'cubeBI',
 'Library':'library','Reports':'reports','Files':'files','Scenarios':'scenarios','Workflows':'workflows','Tables':'tables',
 'Dimensions':'dimensions','Formulas':'formulas','Tags':'tags','Integrations':'integrations','Data Export':'dataExport',
 'Users':'users','Currencies':'currencies','Audit Trail':'auditTrail','Usages':'usage'}
def migrate(path):
    s=open(path).read()
    L=s.split('\n')
    # which item is active inside the nav region
    start=next(i for i,l in enumerate(L) if l.strip()=='<div class="nav-section">')
    pp=next(i for i,l in enumerate(L) if 'data-label="PowerPoint"' in l)
    region='\n'.join(L[start:pp+1])
    m=re.search(r'class="ni(?:-sub)? active"[^>]*data-label="([^"]+)"',region) or re.search(r'data-label="([^"]+)"[^>]*class="ni(?:-sub)? active"',region)
    label=m.group(1) if m else None
    if label is not None: assert label in ACTIVE, 'unmapped active label '+label
    active=ACTIVE.get(label)
    # markup
    assert [l.strip() for l in L[pp+1:pp+4]]==['</div>']*3, 'unexpected nav end'
    j=pp+4
    while L[j].strip()=='' : j+=1
    assert L[j].lstrip().startswith('<div style="height:1px;background:#E3E8EF'), 'footer divider not found'
    k=start-1
    while L[k].strip()=='' or L[k].strip().startswith('<!--'): k-=1
    assert L[k].strip()=='<div class="dv"></div>', 'home divider not found'
    L[k+1:pp+3]=['        {{ sideNavEl }}']
    s='\n'.join(L)
    # collapse handler -> also flip React state (keeps the .col class toggle for the sidebar shell)
    n=s.count("sb.classList.toggle('col');"); assert n==1, f'collapse toggle count {n}'
    s=s.replace("sb.classList.toggle('col');","sb.classList.toggle('col'); this.setState((st) => ({ sbCollapsed: !(st && st.sbCollapsed) }));")
    # startCollapsed
    if "this.props.startCollapsed" in s:
        a="if (sb) sb.classList.add('col');"
        assert s.count(a)==1
        s=s.replace(a,a+" this.setState({ sbCollapsed: true });")
    # re-render once FolioDS is ready
    s=re.sub(r"if \(!window\.SIDEBAR_ICONS\) \{", "if (!window.SIDEBAR_ICONS || !window.FolioDS) {", s)
    s=re.sub(r"if \(window\.SIDEBAR_ICONS\) \{ clearInterval", "if (window.SIDEBAR_ICONS && window.FolioDS) { clearInterval", s)
    assert 'window.SIDEBAR_ICONS && window.FolioDS) { clearInterval' in s, 'wait loop not patched'
    # the component element
    aid = repr(active) if active else 'undefined'
    el=("    const sideNavEl = window.FolioDS ? React.createElement(window.FolioDS.PortalSideBarNav, "
        "{ expanded: !(this.state && this.state.sbCollapsed), activeItemId: %s, style: { width: '100%%' } }) : null;\n" % aid)
    r=s.index('  renderVals() {\n')+len('  renderVals() {\n')
    s=s[:r]+el+s[r:]
    # return value
    tail=s[r:]
    m1=re.search(r'\n    return \{ ',tail); m2=re.search(r'\n    return \{\n',tail)
    ms=[m for m in (m1,m2) if m]; assert ms, 'renderVals return not found'
    m=min(ms,key=lambda m:m.start())
    rep=('\n    return { sideNavEl, ' if m is m1 else '\n    return {\n      sideNavEl,\n')
    tail=tail[:m.start()]+rep+tail[m.end():]
    s=s[:r]+tail
    open(path,'w').write(s)
    return label, active
if __name__=='__main__':
    for p in sys.argv[1:]:
        try:
            print(p.split('/')[-1], migrate(p))
        except Exception as e:
            print('FAILED', p, '->', repr(e))
