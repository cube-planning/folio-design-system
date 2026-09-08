import { AgentCard } from "folio-design-system";

export function IconAvatar() {
  return (
    <AgentCard
      icon="fa-regular fa-database"
      hue="orange"
      name="Data Manager"
      role="Source reconciliation"
      message="Reconciled 3 sources. APAC Holdings is 4 hours stale relative to the NetSuite cursor."
      trace="netsuite_sync.log:118"
    />
  );
}

export function InitialAvatar() {
  return (
    <AgentCard
      initial="D"
      name="Data Manager"
      role="Source reconciliation"
      message="Reconciled 3 sources. APAC Holdings is 4 hours stale relative to the NetSuite cursor."
      trace="netsuite_sync.log:118"
    />
  );
}

export function Done() {
  return (
    <AgentCard
      icon="fa-regular fa-chart-line"
      hue="indigo"
      name="Variance Analyst"
      role="FY26 plan vs actuals"
      status="done"
      message="Opex is $1.2M favourable to budget, concentrated in headcount."
      trace="fy26_plan.xlsx!B14"
    />
  );
}

export function NoTrace() {
  return (
    <AgentCard
      initial="V"
      name="Variance Analyst"
      role="FY26 plan vs actuals"
      status="done"
      message="Opex is $1.2M favourable to budget, concentrated in headcount."
    />
  );
}
