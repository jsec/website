import type { Site, Page, Links, Socials } from "@types"

// Global
export const SITE: Site = {
  TITLE: "jsec.online",
  DESCRIPTION: "Welcome to jsec.online, Jarrod's little slice of the internet",
  AUTHOR: "Jarrod Seccombe",
}

// Work Page
export const WORK: Page = {
  TITLE: "Work",
  DESCRIPTION: "Places I have worked.",
}

// Blog Page
export const BLOG: Page = {
  TITLE: "Blog",
  DESCRIPTION: "Writing on topics I am passionate about.",
}

// Projects Page 
export const PROJECTS: Page = {
  TITLE: "Projects",
  DESCRIPTION: "Recent projects I have worked on.",
}

// Search Page
export const SEARCH: Page = {
  TITLE: "Search",
  DESCRIPTION: "Search all posts and projects by keyword.",
}

// Links
export const LINKS: Links = [
  {
    TEXT: "Home",
    HREF: "/",
  },
  {
    TEXT: "Work",
    HREF: "/work",
  },
  {
    TEXT: "Blog",
    HREF: "/blog",
  },
  {
    TEXT: "Projects",
    HREF: "/projects",
  },
]

// Socials
export const SOCIALS: Socials = [
  {
    NAME: "Email",
    ICON: "email",
    TEXT: "jarrod.seccombe@icloud.com",
    HREF: "mailto:jarrod.seccombe@icloud.com",
  },
  {
    NAME: "Github",
    ICON: "github",
    TEXT: "jsec",
    HREF: "https://github.com/jsec"
  },
  {
    NAME: "LinkedIn",
    ICON: "linkedin",
    TEXT: "jarrodseccombe",
    HREF: "https://www.linkedin.com/in/jarrodseccombe",
  },
]

