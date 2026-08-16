export const SITE = {
  name: "jsec.online",
  title: "Jarrod's little slice of the internet",
  description: "Senior backend engineer.",
  email: "jarrod.seccombe@icloud.com",
  github: "https://github.com/jsec",
  linkedin: "https://www.linkedin.com/in/jarrodseccombe",
} as const;

export const NAV = [
  { path: "/", label: "home" },
  { path: "/work", label: "work" },
  { path: "/blog", label: "blog" },
  { path: "/projects", label: "projects" },
  { path: "/search", label: "search" },
] as const;

export const NOW = {
  role: "Senior Backend Engineer",
  company: "Solace Health",
  since: "2026-07",
  stack: ["TypeScript", "NestJS", "Postgres", "GCP"],
  doing:
    "health insurance stuff",
} as const;

/** Injected at build time; surfaced in the footer. */
export const BUILD = {
  hash: (import.meta.env.PUBLIC_COMMIT_SHA ?? "dev").slice(0, 7),
} as const;
