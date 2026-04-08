// 설정은 chrome.storage.sync 에서 읽고 팝업이 변경하면 즉시 반영됩니다.
(() => {
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

  let cfg = { ...DEFAULTS };
  let lastSetTitle = "";
  let timer = null;
  let titleObserver = null;

  function todayAt(hhmm) {
    const [h, m] = hhmm.split(":").map(Number);
    const d = new Date();
    d.setHours(h, m, 0, 0);
    return d;
  }

  function progress() {
    const s = todayAt(cfg.start), e = todayAt(cfg.end);
    const now = new Date();
    let p = (now - s) / (e - s);
    return { p: Math.max(0, Math.min(1, p)), e, now };
  }

  function tick() {
    const { p, e, now } = progress();
    const pos = Math.round(p * (cfg.track - 1));
    const bar = `🏢${"·".repeat(pos)}${cfg.character}${"·".repeat(cfg.track-1-pos)}🏠`;

    if (cfg.updateTitle) {
      const remMs = Math.max(0, e - now);
      const hh = Math.floor(remMs / 3600000);
      const mm = Math.floor((remMs % 3600000) / 60000);
      const tail = p >= 1 ? "퇴근!" : `${hh}h${mm}m`;
      const newTitle = `${bar} ${tail}`;
      lastSetTitle = newTitle;
      if (document.title !== newTitle) document.title = newTitle;
    }

    if (cfg.updateHash) {
      const newHash = `#출근${bar}퇴근`;
      if (location.hash !== newHash) {
        history.replaceState(null, "", newHash);
      }
    }
  }

  function installTitleGuard() {
    const titleEl = document.querySelector("title");
    if (!titleEl) return;
    if (titleObserver) titleObserver.disconnect();
    titleObserver = new MutationObserver(() => {
      if (cfg.updateTitle && lastSetTitle && document.title !== lastSetTitle) {
        document.title = lastSetTitle;
      }
    });
    titleObserver.observe(titleEl, { childList: true, characterData: true, subtree: true });
  }

  function restartTimer() {
    if (timer) clearInterval(timer);
    tick();
    timer = setInterval(tick, cfg.intervalMs);
  }

  api.storage.sync.get(DEFAULTS, (saved) => {
    cfg = { ...DEFAULTS, ...saved };
    installTitleGuard();
    restartTimer();
    setInterval(installTitleGuard, 3000);
  });

  api.storage.onChanged.addListener((changes) => {
    let intervalChanged = false;
    for (const k of Object.keys(changes)) {
      cfg[k] = changes[k].newValue;
      if (k === "intervalMs") intervalChanged = true;
    }
    if (intervalChanged) restartTimer();
    else tick();
  });
})();
