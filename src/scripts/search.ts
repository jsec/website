type Doc = { title: string; summary: string; url: string; kind: string; date: string };

const input = document.querySelector<HTMLInputElement>("[data-search]")!;
const results = document.querySelector<HTMLElement>("[data-search-results]")!;
const count = document.querySelector<HTMLElement>("[data-search-count]")!;
const docs: Doc[] = JSON.parse(document.querySelector("#search-data")!.textContent!);

const row = (d: Doc) => `
  <a class="hit" href="${d.url}">
    <span class="kind">${d.kind}</span>
    <time class="dim">${d.date}</time>
    <span class="body"><span>${d.title}</span><span class="summary dim">${d.summary}</span></span>
  </a>`;

const run = () => {
  const q = input.value.trim().toLowerCase();
  const hits = q ? docs.filter((d) => (d.title + " " + d.summary).toLowerCase().includes(q)) : docs;
  results.innerHTML = hits.map(row).join("");
  count.textContent = `${hits.length} result${hits.length === 1 ? "" : "s"}`;
  const url = new URL(location.href);
  q ? url.searchParams.set("q", q) : url.searchParams.delete("q");
  history.replaceState(null, "", url);
};

input.value = new URL(location.href).searchParams.get("q") ?? "";
input.addEventListener("input", run);
input.addEventListener("keydown", (e) => {
  if (e.key === "Escape") { input.value = ""; run(); }
  if (e.key === "Enter") results.querySelector("a")?.click();
});
input.focus();
run();
