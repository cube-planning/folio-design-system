import { Banner } from "folio-design-system";

export function Canonical() {
  return (
    <Banner variant="info" title="Scheduled maintenance">
      The workspace will be read-only from 2:00–2:30 AM UTC on Saturday.
    </Banner>
  );
}

export function Error() {
  return (
    <Banner variant="error" title="Import failed">
      3 rows in "vendor-contacts.csv" are missing a required email column.
    </Banner>
  );
}

export function Warning() {
  return (
    <Banner variant="warning" title="Storage almost full">
      Your team has used 92% of its allotted storage. Free up space or upgrade your plan.
    </Banner>
  );
}

export function Success() {
  return (
    <Banner variant="success" title="Changes published">
      Your updates to the Q3 Roadmap are now live for all collaborators.
    </Banner>
  );
}

export function BodyOnly() {
  return (
    <Banner variant="info">
      New teammates you invite will inherit the default "Editor" role.
    </Banner>
  );
}
