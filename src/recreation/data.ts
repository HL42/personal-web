export const projects = [
  {
    slug: "fun-arena",
    name: "Fun Arena",
    lines: ["Fun Arena"],
    year: "2026",
    type: "Mobile app design & build",
    platform: "iOS & Android",
    tone: "#283d6e",
    media: "play",
    note: "(Live on iOS & Android)",
  },
  {
    slug: "wellpaws",
    name: "WellPaws",
    lines: ["WellPaws"],
    year: "2025",
    type: "Shopify design & build",
    platform: "Shopify",
    tone: "#f6c9da",
    media: "paws",
  },
  {
    slug: "shopm2m",
    name: "ShopM2M",
    lines: ["ShopM2M"],
    year: "2024",
    type: "Shopify design & build",
    platform: "Shopify",
    tone: "#d7e4dc",
    media: "wear",
  },
  {
    slug: "digital-media-team",
    name: "Digital Media Team",
    lines: ["Digital Media", "Team"],
    year: "2025",
    type: "Webflow build",
    platform: "Webflow",
    tone: "#d7303c",
    media: "agency",
  },
] as const;
export type StudyProject = (typeof projects)[number];
export const services = [
  {
    name: "Websites",
    description:
      "Marketing sites and portfolios, designed and built with motion from the start.",
  },
  {
    name: "Shopify",
    description: "Custom storefronts shaped around a brand and its products.",
  },
  {
    name: "Webflow",
    description:
      "Visual builds that a team can edit and maintain on their own.",
  },
  {
    name: "Apps",
    description:
      "Mobile interfaces, from the first user flows through to launch.",
  },
];
export const skills = [
  "Design",
  "Build",
  "Motion",
  "Shopify",
  "Webflow",
  "Next.js",
  "Apps",
];
export const number = (n: number) => String(n + 1).padStart(2, "0");
