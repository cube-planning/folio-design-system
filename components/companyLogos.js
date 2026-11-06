// Third-party company logos (data sources and destinations) — one place to pull them from.
// Files live in ./assets/company-logos/ as real vendor SVGs; see the README there for the
// rules. Add a logo by dropping the SVG in that folder and adding one line below.
//
// Consumers: AppIcon (`image`), FlowCard (`icon={{ company: "quickbooks" }}`).

import quickbooks from "./assets/company-logos/quickbooks.svg";

export const COMPANY_LOGOS = {
  quickbooks,
};

// 40px circular avatars (the logo, circle mask and gray-300 ring are all baked into the file),
// exported from Figma. FlowCard shows these as is. They are SVG wrappers around a high-res
// embedded image, so display them at 40px or smaller.
import avatarQuickbooks from "./assets/company-logos/avatar/quickbooks.svg";
import avatarSage from "./assets/company-logos/avatar/sage.svg";
import avatarXero from "./assets/company-logos/avatar/xero.svg";
import avatarSalesforce from "./assets/company-logos/avatar/salesforce.svg";
import avatarNetsuite from "./assets/company-logos/avatar/netsuite.svg";
import avatarPaylocity from "./assets/company-logos/avatar/paylocity.svg";

export const COMPANY_AVATARS = {
  quickbooks: avatarQuickbooks,
  sage: avatarSage,
  xero: avatarXero,
  salesforce: avatarSalesforce,
  netsuite: avatarNetsuite,
  paylocity: avatarPaylocity,
};
