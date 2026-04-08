const api = (typeof browser !== "undefined") ? browser : chrome;
const DEFAULTS = {
  character: "🐹",
  start: "09:00",
  end: "18:00",
  track: 10,
  updateTitle: true,
  updateHash: true,
  intervalMs: 1000,
};
const QUICK = ["🐹","🐰","🐱","🐻","🐤","🐢","🦔","🦆","🏃","🚶"];
const FIELDS = ["character","start","end","track","updateTitle","updateHash","intervalMs"];
const $ = (id) => document.getElementById(id);

function readForm() {
  return {
    character: $("character").value || "🐹",
    start: $("start").value || "09:00",
    end: $("end").value || "18:00",
    track: Math.max(3, parseInt($("track").value) || 10),
    updateTitle: $("updateTitle").checked,
    updateHash: $("updateHash").checked,
    intervalMs: Math.max(200, parseInt($("intervalMs").value) || 1000),
  };
}

function writeForm(cfg) {
  $("character").value = cfg.character;
  $("start").value = cfg.start;
  $("end").value = cfg.end;
  $("track").value = cfg.track;
  $("updateTitle").checked = cfg.updateTitle;
  $("updateHash").checked = cfg.updateHash;
  $("intervalMs").value = cfg.intervalMs;
  highlightActive();
  updatePreview();
}

function highlightActive() {
  const cur = $("character").value;
  document.querySelectorAll("#quickChars button").forEach((b) => {
    b.classList.toggle("active", b.textContent === cur);
  });
}

function updatePreview() {
  const c = readForm();
  const [sh, sm] = c.start.split(":").map(Number);
  const [eh, em] = c.end.split(":").map(Number);
  const now = new Date();
  const s = new Date(now); s.setHours(sh, sm, 0, 0);
  const e = new Date(now); e.setHours(eh, em, 0, 0);
  let p = (now - s) / (e - s);
  p = Math.max(0, Math.min(1, p));
  const pos = Math.round(p * (c.track - 1));
  const bar = `🏢${"·".repeat(pos)}${c.character}${"·".repeat(c.track-1-pos)}🏠`;
  $("preview").textContent = bar;
}

function save() {
  const cfg = readForm();
  api.storage.sync.set(cfg, () => {
    $("saved").textContent = "저장됨 ✓";
    setTimeout(() => $("saved").textContent = "", 1000);
  });
  highlightActive();
  updatePreview();
}

function buildQuick() {
  const c = $("quickChars");
  QUICK.forEach((ch) => {
    const b = document.createElement("button");
    b.type = "button";
    b.textContent = ch;
    b.onclick = () => { $("character").value = ch; save(); };
    c.appendChild(b);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  buildQuick();
  api.storage.sync.get(DEFAULTS, (cfg) => writeForm({ ...DEFAULTS, ...cfg }));
  FIELDS.forEach((id) => {
    const el = $(id);
    el.addEventListener("change", save);
    el.addEventListener("input", save);
  });
});
