/* main.js — Interactividad del sitio "Transformando el eje Z" v2 */
import "../css/main.css";

(function () {
  "use strict";

  const root = document.documentElement;

  /* ── Tema claro/oscuro ── */
  function applyTheme(theme) {
    root.classList.toggle("dark", theme === "dark");
    document.querySelectorAll("[data-theme-toggle]").forEach((btn) => {
      btn.textContent = theme === "dark" ? "☀️" : "🌙";
    });
    try { localStorage.setItem("theme", theme); } catch (e) {}
  }

  try {
    const saved = localStorage.getItem("theme");
    if (saved === "dark" || saved === "light") applyTheme(saved);
  } catch (e) {}

  window.toggleTheme = function () {
    applyTheme(root.classList.contains("dark") ? "light" : "dark");
  };

  /* ── Menú móvil ── */
  window.toggleMenu = function () {
    const links = document.getElementById("navLinks");
    if (links) links.classList.toggle("open");
  };

  /* ── Copiar código ── */
  window.copiar = function (btn) {
    const block = btn.closest("[data-code]");
    if (!block) return;
    const pre = block.querySelector("pre");
    const text = pre ? pre.textContent : "";
    function done() {
      btn.textContent = "¡Copiado!";
      setTimeout(function () { btn.textContent = "Copiar"; }, 1500);
    }
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(done, done);
    } else {
      const ta = document.createElement("textarea");
      ta.value = text;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
      done();
    }
  };

  /* ── Lightbox genérico (cheatsheet, evidencias, ...) ── */
  window.abrirModal = function (src) {
    const overlay = document.querySelector("[data-lightbox]");
    if (!overlay) return;
    const img = overlay.querySelector("img");
    // Normaliza rutas absolutas ("/assets/...") a relativas ("./assets/...")
    // para que el lightbox funcione igual en cualquier página.
    if (img && src) img.src = src.startsWith("/") ? "." + src : src;
    overlay.classList.remove("hidden");
    overlay.classList.add("flex");
    document.body.style.overflow = "hidden";
  };

  window.cerrarModal = function () {
    const overlay = document.querySelector("[data-lightbox]");
    if (!overlay) return;
    overlay.classList.add("hidden");
    overlay.classList.remove("flex");
    document.body.style.overflow = "";
  };

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") cerrarModal();
  });

  /* ── Videos demo: reproducir en pantalla, pausar fuera ── */
  const demoVideos = document.querySelectorAll("video[data-autodemo]");
  if ("IntersectionObserver" in window && demoVideos.length) {
    const vio = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        const v = entry.target;
        if (entry.isIntersecting) {
          if (v.paused) v.play().catch(function () {});
        } else {
          v.pause();
        }
      });
    }, { threshold: 0.25 });
    demoVideos.forEach(function (v) { vio.observe(v); });
  }

  /* ── Video hero: forzar autoplay en móviles ── */
  // Los móviles bloquean el autoplay con sonido: se fuerza mute y se
  // reintenta reproducir cuando la página vuelve a ser visible o el
  // usuario interactúa (toque, clic o scroll).
  const heroVideo = document.querySelector("header video");
  if (heroVideo) {
    heroVideo.muted = true;
    heroVideo.defaultMuted = true;
    const tryPlay = function () {
      if (heroVideo.paused) heroVideo.play().catch(function () {});
    };
    tryPlay();
    heroVideo.addEventListener("loadeddata", tryPlay);
    document.addEventListener("visibilitychange", function () {
      if (!document.hidden && heroVideo.paused) tryPlay();
    });
    ["touchstart", "click", "scroll"].forEach(function (evt) {
      window.addEventListener(evt, tryPlay, { once: true, passive: true });
    });
  }

  /* ── Reveal al scroll ── */
  const revealTargets = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    const io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealTargets.forEach(function (el) { io.observe(el); });
  } else {
    revealTargets.forEach(function (el) { el.classList.add("visible"); });
  }
})();
