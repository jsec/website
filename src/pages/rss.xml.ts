import rss from "@astrojs/rss";
import type { APIContext } from "astro";
import { getCollection } from "astro:content";
import { SITE } from "../consts";

export async function GET(context: APIContext) {
  const posts = (await getCollection("blog", (p) => !p.data.draft)).sort(
    (a, b) => +b.data.date - +a.data.date,
  );

  return rss({
    title: `${SITE.title} — ${SITE.name}`,
    description: SITE.description,
    site: context.site!,
    trailingSlash: false,
    items: posts.map((p) => ({
      title: p.data.title,
      description: p.data.summary,
      pubDate: p.data.date,
      categories: p.data.tags,
      link: `/blog/${p.id}`,
    })),
    customData: "<language>en-us</language>",
    stylesheet: "/rss.xsl",
  });
}
