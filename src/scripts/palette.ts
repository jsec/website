import type { SearchEntry } from "../pages/search.json";

type Group = { file: SearchEntry; lines: { n: number; text: string }[] };

const scrim = document.querySelector<HTMLElement>("[data-palette]")!;
const input = scrim.querySelector<HTMLInputElement>("[data-palette-input]")!;
const empty = scrim.querySelector<HTMLElement>("[data-palette-empty]")!;
const none = scrim.querySelector<HTMLElement>("[data-palette-none]")!;
const list = scrim.querySelector<HTMLElement>("[data-palette-groups]")!;
const count = scrim.querySelector<HTMLElement>("[data-palette-count]")!;
const closeButton = scrim.querySelector<HTMLElement>("[data-palette-close]")!;

let index: SearchEntry[] = [];
let groups: Group[] = [];
let sel = 0;

const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

// Up to 36 chars before the first match and 72 after, every match wrapped in <mark>.
const snippet = (text: string, q: string) => {
  const first = text.toLowerCase().indexOf(q);
  const a = Math.max(0, first - 36);
  const b = Math.min(text.length, first + q.length + 72);
  const t = (a > 0 ? "…" : "") + text.slice(a, b) + (b < text.length ? "…" : "");
  const lower = t.toLowerCase();
  let out = "";
  let i = 0;
  let j;
  while ((j = lower.indexOf(q, i)) !== -1) {
    out += esc(t.slice(i, j)) + `<mark>${esc(t.slice(j, j + q.length))}</mark>`;
    i = j + q.length;
  }

  return out + esc(t.slice(i));
};

const render = () => {
  const q = input.value.trim().toLowerCase();
  groups = [];
  sel = 0;
  if (q.length >= 2) {
    for (const file of index) {
      const lines = [];
      for (const [i, text] of file.lines.entries()) {
        if (text.toLowerCase().includes(q)) {
          lines.push({ n: i + 1, text });
        }
      }
      if (lines.length) {
        groups.push({ file, lines });
      }
    }
  }

  empty.hidden = q.length >= 2;
  none.hidden = q.length < 2 || groups.length > 0;

  list.innerHTML = groups
    .map((g, i) => `
      <a class="group${i === sel ? " sel" : ""}" href="${esc(g.file.href)}" data-i="${i}">
        <span class="file"><span class="acc">${esc(g.file.file)}</span><span class="open wide">↵ open</span></span>
        ${g.lines.map((l) => `<span class="line"><span class="n">${l.n}:</span><span class="t">${snippet(l.text, q)}</span></span>`).join("")}
      </a>`)
    .join("");

  count.textContent = "";
  if (groups.length) {
    const matches = groups.reduce((n, g) => n + g.lines.length, 0);
    const matchWord = matches === 1 ? "match" : "matches";
    const fileWord = groups.length === 1 ? "file" : "files";
    count.textContent = `${matches} ${matchWord} in ${groups.length} ${fileWord}`;
  }
};

const select = (i: number) => {
  sel = i;
  list.querySelectorAll(".group").forEach((el, j) => el.classList.toggle("sel", j === i));
  list.children[i]?.scrollIntoView({ block: "nearest" });
};

const open = async () => {
  scrim.hidden = false;
  input.focus();
  input.select();
  if (!index.length) {
    index = (await (await fetch("/search.json")).json()) as SearchEntry[];
  }

  render();
};

const close = () => { scrim.hidden = true; };

document.querySelectorAll("[data-palette-open]").forEach((b) => b.addEventListener("click", open));
closeButton.addEventListener("click", close);

scrim.addEventListener("click", (e) => {
  if (!(e.target instanceof Element)) {
    return;
  }

  if (e.target === scrim) {
    close();
    return;
  }

  const suggestion = e.target.closest<HTMLElement>("[data-q]");
  if (suggestion) {
    input.value = suggestion.dataset.q!;
    input.focus();
    render();
    return;
  }

  if (e.target.closest(".group")) {
    close();
  }
});

list.addEventListener("mouseover", (e) => {
  if (!(e.target instanceof Element)) {
    return;
  }

  const group = e.target.closest<HTMLElement>(".group");
  if (group && Number(group.dataset.i) !== sel) {
    select(Number(group.dataset.i));
  }
});

input.addEventListener("input", render);

input.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    e.preventDefault();
    close();
  } else if (e.key === "ArrowDown") {
    e.preventDefault();
    select(Math.max(0, Math.min(sel + 1, groups.length - 1)));
  } else if (e.key === "ArrowUp") {
    e.preventDefault();
    select(Math.max(sel - 1, 0));
  } else if (e.key === "Enter" && groups[sel]) {
    e.preventDefault();
    close();
    location.href = groups[sel].file.href;
  }
});

document.addEventListener("keydown", (e) => {
  const typing =
    e.target instanceof HTMLInputElement ||
    e.target instanceof HTMLTextAreaElement ||
    (e.target instanceof HTMLElement && e.target.isContentEditable);
  if ((e.key === "/" && !typing) || ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k")) {
    e.preventDefault();
    open();
  }
});
