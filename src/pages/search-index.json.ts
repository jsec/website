import type { APIRoute } from "astro";
import { getCollection } from "astro:content";
import { ymd } from "../lib/format";

export const GET: APIRoute = async () => {
  const posts = await getCollection("blog", (p) => !p.data.draft);
  const projects = await getCollection("projects", (p) => !p.data.draft);

  const docs = [
    ...posts.map((p) => ({ kind: "post", title: p.data.title, summary: p.data.summary, url: `/blog/${p.id}`, date: ymd(p.data.date) })),
    ...projects.map((p) => ({ kind: "project", title: p.data.title, summary: p.data.summary, url: `/projects/${p.id}`, date: ymd(p.data.date) })),
  ];

  return new Response(JSON.stringify(docs), {
    headers: { "content-type": "application/json" },
  });
};
