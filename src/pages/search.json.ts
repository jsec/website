import type { APIRoute } from "astro";
import { getCollection } from "astro:content";

export type SearchEntry = { file: string; href: string; lines: string[] };

// Markdown body → plain lines: drop blanks and headings, strip list markers.
const textLines = (body = "") => {
  const lines = [];
  for (const raw of body.split("\n")) {
    const line = raw.trim().replace(/^[-*] /, "");
    if (line && !line.startsWith("#")) {
      lines.push(line);
    }
  }

  return lines;
};

export const GET: APIRoute = async () => {
  const files: SearchEntry[] = [];

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
