export const SITE = {
  name: "jsec.online",
  title: "Jarrod's little slice of the internet",
  description: "Senior backend engineer.",
  email: "jarrod.seccombe@icloud.com",
  github: "https://github.com/jsec",
  linkedin: "https://www.linkedin.com/in/jarrodseccombe",
} as const;

export const NAV = [
  { path: "/", label: "~" },
  { path: "/work", label: "~/work" },
  { path: "/blog", label: "~/blog" },
  { path: "/projects", label: "~/projects" },
] as const;
