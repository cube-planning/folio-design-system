import { Tab } from "folio-design-system";

export function PrimaryActive() {
  return <Tab type="primary" active>Tab</Tab>;
}

export function PrimaryInactive() {
  return <Tab type="primary">Tab</Tab>;
}

export function SecondaryActive() {
  return <Tab type="secondary" active>Tab</Tab>;
}

export function SecondaryInactive() {
  return <Tab type="secondary">Tab</Tab>;
}

export function WithIconPrimary() {
  return (
    <Tab type="primary" active icon={<i className="fa-regular fa-clipboard-list" />}>
      Account
    </Tab>
  );
}

export function WithIconSecondary() {
  return (
    <Tab type="secondary" icon={<i className="fa-regular fa-sitemap" />}>
      Department
    </Tab>
  );
}

export function Row() {
  return (
    <div style={{ display: "flex" }}>
      <Tab type="secondary" active>Overview</Tab>
      <Tab type="secondary">Details</Tab>
      <Tab type="secondary">History</Tab>
    </div>
  );
}

export function DimensionsRow() {
  return (
    <div style={{ display: "flex" }}>
      <Tab type="secondary" active icon={<i className="fa-regular fa-clipboard-list" />}>
        Account
      </Tab>
      <Tab type="secondary" icon={<i className="fa-regular fa-sitemap" />}>
        Department
      </Tab>
      <Tab type="secondary" icon={<i className="fa-regular fa-code-branch" />}>
        Scenario
      </Tab>
    </div>
  );
}
