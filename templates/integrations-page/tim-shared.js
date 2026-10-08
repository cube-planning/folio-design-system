// tim-shared.js: shared pieces for the TIM prototype pages.
//
//   TIM.FlowRow   Source -> Connection -> Destination wrapper (grid + arrows)
//   TIM.FlowCard  One card in that flow, also usable on its own
//
// Inline styles only, Folio tokens (var(--color-*)) where they exist. Buttons,
// icon buttons, tooltips and badges come from window.FolioDS; nothing is
// hand-built. Resolve FolioDS at render time so load order does not matter.
//
// FlowCard props
//   label        small caption above the card ("Source")
//   icon         node | { img } | { fa } | { initial }
//   iconShape    'circle' | 'rounded' (default 'rounded')
//   title        card title
//   titleColor   CSS color override; default is blue when onTitleClick is set, else gray-900
//   onTitleClick makes the title a link
//   subtitle     neutral 12px text under the title
//   status       { tone: 'red' | 'orange' | 'blue', icon?: 'fa-wrench', text, onClick? }
//   badge        node (e.g. an F.Badge) rendered under the title block
//   actions      [{ icon: 'fa-arrows-rotate', label, tooltip?, onClick?, spinning? }] | node
//   body         node rendered between header and button
//   button       { label, onClick, tone?: 'default' | 'danger' }

(function () {
  const e = (...a) => window.React.createElement(...a);
  const FONT = "'DM Sans', sans-serif";

  const COLOR = {
    border: 'var(--color-gray-300)',
    flowBg: 'var(--color-gray-100)',
    label: 'var(--color-gray-500)',
    arrow: 'var(--color-gray-400)',
    title: 'var(--color-gray-900)',
    link: 'var(--color-blue-500)',
    muted: 'var(--color-gray-700)',
    tile: 'var(--color-gray-200)',
    tileInk: 'var(--color-cobalt-500)',
  };
  const TONE = {
    red: 'var(--color-red-700)',
    orange: 'var(--color-orange-700)',
    blue: 'var(--color-blue-500)',
  };

  function Icon({ icon, shape }) {
    const radius = shape === 'circle' ? '50%' : 8;
    const box = { width: 40, height: 40, borderRadius: radius, flexShrink: 0 };
    if (icon && icon.img) return e('img', { src: icon.img, alt: '', style: { ...box, display: 'block', objectFit: 'cover' } });
    if (icon && (icon.fa || icon.initial)) {
      return e('span', { style: { ...box, background: COLOR.tile, color: COLOR.tileInk, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, fontWeight: 600 } },
        icon.fa ? e('i', { className: 'fa-solid ' + icon.fa }) : icon.initial);
    }
    return icon || null;
  }

  function Actions({ actions }) {
    const F = window.FolioDS;
    if (!actions) return null;
    const content = Array.isArray(actions)
      ? actions.map((a, i) => e(F.Tooltip, { key: i, content: a.tooltip },
          e(F.Button, {
            variant: 'plain-blue', size: 'small', onClick: a.onClick, style: { width: 24, height: 24 },
            'aria-label': a.label || a.tooltip,
            icon: e('i', { className: 'fa-regular ' + a.icon + (a.spinning ? ' fa-spin' : '') }),
          })))
      : actions;
    return e('div', { style: { marginLeft: 'auto', alignSelf: 'flex-start', display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 } }, content);
  }

  function Status({ status }) {
    if (!status) return null;
    const style = {
      display: 'inline-flex', alignItems: 'center', gap: 6, alignSelf: 'flex-start',
      fontSize: 12, lineHeight: '18px', fontFamily: FONT, color: TONE[status.tone] || TONE.blue,
    };
    const inner = [status.icon && e('i', { key: 'i', className: 'fa-solid ' + status.icon, style: { fontSize: 11 } }), status.text];
    return status.onClick
      ? e('button', { type: 'button', onClick: status.onClick, style: { ...style, background: 'none', border: 'none', padding: 0, cursor: 'pointer' } }, inner)
      : e('span', { style }, inner);
  }

  // Single-line title. When the text is clipped by the ellipsis, the full title
  // appears in the Folio Tooltip on hover/focus; otherwise no tooltip is mounted.
  function Title({ title, style, onClick }) {
    const R = window.React;
    const ref = R.useRef(null);
    const [clipped, setClipped] = R.useState(false);
    R.useEffect(() => {
      const el = ref.current;
      if (!el) return;
      const measure = () => setClipped(el.scrollWidth > el.clientWidth);
      measure();
      if (!window.ResizeObserver) return;
      const ro = new ResizeObserver(measure);
      ro.observe(el);
      return () => ro.disconnect();
    }, [title]);
    const node = onClick
      ? e('button', { ref, type: 'button', onClick, style: { ...style, background: 'none', border: 'none', padding: 0, cursor: 'pointer', textAlign: 'left' } }, title)
      : e('span', { ref, style }, title);
    return clipped ? e(window.FolioDS.Tooltip, { content: title }, node) : node;
  }

  function FlowCard(props) {
    const { label, icon, iconShape, title, titleColor, onTitleClick, subtitle, status, badge, actions, body, button } = props;
    const F = window.FolioDS;
    const titleStyle = {
      fontSize: 16, lineHeight: '24px', fontWeight: 500, fontFamily: FONT,
      color: titleColor || (onTitleClick ? COLOR.link : COLOR.title),
      overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', minWidth: 0,
    };
    const danger = button && button.tone === 'danger';

    return e('div', null,
      label && e('div', { style: { fontSize: 13, fontWeight: 500, color: COLOR.label, marginBottom: 12, fontFamily: FONT } }, label),
      e('div', { style: { background: '#fff', border: '1px solid ' + COLOR.border, borderRadius: 12, padding: 16, display: 'flex', flexDirection: 'column', gap: 16, width: 300, height: 164, boxSizing: 'border-box' } },
        e('div', { style: { display: 'flex', alignItems: 'center', gap: 12 } },
          e(Icon, { icon, shape: iconShape }),
          e('div', { style: { display: 'flex', flexDirection: 'column', minWidth: 0 } },
            e(Title, { title, style: titleStyle, onClick: onTitleClick }),
            subtitle && e('span', { style: { fontSize: 12, lineHeight: '18px', color: COLOR.muted, fontFamily: FONT } }, subtitle),
            e(Status, { status }),
            badge),
          e(Actions, { actions })),
        body,
        button && e(F.Button, {
          variant: danger ? 'destructive-subtle' : 'subtle-blue', size: 'small', onClick: button.onClick,
          style: danger
            ? { marginTop: 'auto', flexShrink: 0, width: '100%', borderRadius: 9999 }
            : { marginTop: 'auto', flexShrink: 0, width: '100%', borderRadius: 9999, background: 'var(--color-cobalt-50)', color: 'var(--color-cobalt-500)' },
        }, button.label)));
  }

  function FlowRow({ children, marginBottom = 24 }) {
    const kids = window.React.Children.toArray(children);
    const out = [];
    kids.forEach((k, i) => {
      if (i) out.push(e('div', { key: 'a' + i, style: { display: 'flex', alignItems: 'center', justifyContent: 'center', color: COLOR.arrow, fontSize: 16 } }, e('i', { className: 'fa-solid fa-arrow-right' })));
      out.push(window.React.cloneElement(k, { key: 'c' + i }));
    });
    return e('div', { style: { display: 'grid', gridTemplateColumns: '1fr 40px 1fr 40px 1fr', alignItems: 'center', marginBottom, background: COLOR.flowBg, border: '1px solid ' + COLOR.border, borderRadius: 16, padding: 24 } }, out);
  }

  window.TIM = Object.assign(window.TIM || {}, { FlowCard, FlowRow });
})();
