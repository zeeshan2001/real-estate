export const DASHBOARD_TABS = ["Portfolio", "Single", "Multi"];
export const DEAL_STATUSES = [
  { label: "Following Site", value: "Following Site", color: "#FFC107" },
  { label: "Offer Out", value: "Offer Out", color: "#FF9430" },
  { label: "LOI Signed", value: "LOI Signed", color: "#1BAEDC" },
  { label: "Under Contract", value: "Under Contract", color: "#DD270F" },
  { label: "Closed", value: "Closed", color: "#54A912" },
  { label: "Dead Deal", value: "Dead Deal", color: "#000000" },
];

export const STATES = [
  {
    label: "Florida",
    value: "Florida",
    coordinates: { lat: 27.994402, lng: -81.760254 },
  },
  {
    label: "Atlanta MSA",
    value: "Atlanta MSA",
    coordinates: { lat: 33.739876, lng: -84.512581 },
  },
  {
    label: "South Carolina",
    value: "South Carolina",
    coordinates: { lat: 33.836082, lng: -81.163727 },
  },
  {
    label: "North Carolina",
    value: "North Carolina",
    coordinates: { lat: 35.782169, lng: -80.793457 },
  },
  {
    label: "Virginia",
    value: "Virginia",
    coordinates: { lat: 37.4316, lng: -78.6569 },
  },
  {
    label: "Maryland",
    value: "Maryland",
    coordinates: { lat: 39.045753, lng: -76.641273 },
  },
];

export const ZONING = [
  { label: "Zoning in Place", value: "Zoning in Place" },
  { label: "Needs Special Use", value: "Needs Special Use" },
  { label: "Needs Conditional", value: "Needs Conditional" },
  { label: "Needs Variance", value: "Needs Variance" },
  { label: "Needs Rezoning", value: "Needs Rezoning" },
];

export const DEAL_PERCENTAGES = [
  { label: "4%", value: "4%" },
  { label: "9%", value: "9%" },
];

export const DEAL_RESIDENTIALS = [
  { label: "Family", value: "Family" },
  { label: "Senior", value: "Senior" },
];

export const QCT_DDA = [
  { label: "Yes", value: "Yes" },
  { label: "No", value: "No" },
];

export const SITE_PLAN_APPROVED = [
  { label: "Yes", value: "Yes" },
  { label: "No", value: "No" },
];

export const ROOT_API_URL = "http://alivdata.com:5000/api";
// export const ROOT_API_URL = "http://localhost:5000/api";
