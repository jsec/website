import type { APIRoute } from "astro";
import { getCollection } from "astro:content";

// Markdown body → plain lines: drop blanks and headings, strip list markers.
const textLines = (body = "") =>
  body.split("\n").map((l) => l.trim().replace(/^[-*] /, "")).filter((l) => l && !l.startsWith("#"));

export const GET: APIRoute = async () => {
  const files = [];

  const work = (await getCollection("work")).sort((a, b) => +b.data.dateStart - +a.data.dateStart);
  for (const w of work) {
    files.push({
      file: `work/${w.id}.md`,
      href: `/work#${w.id}`,
      lines: [`# ${w.data.company}`, w.data.role, ...textLines(w.body), w.data.stack.join(", ")],
    });
  }

  const posts = (await getCollection("blog", (p) => !p.data.draft)).sort((a, b) => +b.data.date - +a.data.date);
  for (const p of posts) {
    files.push({
      file: `blog/${p.id}.md`,
      href: `/blog/${p.id}`,
      lines: [`# ${p.data.title}`, p.data.summary, ...textLines(p.body)],
    });
  }

  const projects = (await getCollection("projects", (p) => !p.data.draft)).sort((a, b) => +b.data.date - +a.data.date);
  for (const p of projects) {
    const stack = Object.entries(p.data.facts).map(([k, v]) => `${k}=${v}`).join(" ");
    files.push({
      file: `projects/${p.id}.md`,
      href: `/projects#${p.id}`,
      lines: [`# ${p.data.title}`, p.data.summary, stack],
    });
  }

  return new Response(JSON.stringify(files), { headers: { "content-type": "application/json" } });
};
