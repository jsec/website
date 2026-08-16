type Hit = { kind: string; label: string; href: string };

const ROUTES: Hit[] = [
  { kind: "route", label: "/work — fifteen years, git-log style", href: "/work" },
  { kind: "route", label: "/blog — writing", href: "/blog" },
  { kind: "route", label: "/projects — drs, this site", href: "/projects" },
  { kind: "route", label: "/search — posts + projects", href: "/search" },
];

let index: Hit[] = [];
const loadIndex = async () => {
  if (index.length) return index;
  const res = await fetch("/search-index.json");
  const docs = (await res.json()) as { title: string; summary: string; url: string; kind: string }[];
  index = docs.map((d) => ({ kind: d.kind, label: `${d.title} — ${d.summary}`, href: d.url }));
  return index;
};

const match = (q: string, pool: Hit[]) =>
  pool.filter((h) => h.label.toLowerCase().includes(q)).slice(0, 5);

document.querySelectorAll<HTMLFormElement>("[data-command]").forEach((form) => {
  const input = form.querySelector("input")!;
  const list = form.parentElement?.querySelector<HTMLElement>("[data-command-hits]");
  let hits: Hit[] = [];

  const render = async () => {
    const raw = input.value.trim().toLowerCase();
    if (!list) return;
    if (!raw) { list.hidden = true; list.innerHTML = ""; return; }

    const [verb, ...rest] = raw.split(/\s+/);
    const term = rest.join(" ");
    hits =
      verb === "go" || verb === "cd" ? match(term, ROUTES)
      : verb === "find" ? match(term, await loadIndex())
      : verb === "help" ? ROUTES
      : match(raw, [...ROUTES, ...(await loadIndex())]);

    list.hidden = hits.length === 0;
    list.innerHTML = hits
      .map((h) => `<li><span class="kind">${h.kind}</span><span class="label">${h.label}</span></li>`)
      .join("");
  };

  input.addEventListener("input", render);
  form.addEventListener("submit", (e) => {
    if (!hits.length) return; // fall through to /search?q=
    e.preventDefault();
    location.href = hits[0].href;
  });
  input.addEventListener("keydown", (e) => {
    if (e.key === "Escape") { input.value = ""; render(); input.blur(); }
  });
});

document.addEventListener("keydown", (e) => {
  const el = document.activeElement;
  const typing = el instanceof HTMLInputElement || el instanceof HTMLTextAreaElement;
  if (e.key === "/" && !typing) {
    e.preventDefault();
    document.querySelector<HTMLInputElement>("[data-command] input")?.focus();
  }
});
