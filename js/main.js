/* Cabancalan I ES Library — interactions */
(function () {
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Header ---------- */
  const header = $(".site-header");
  const toTop = $(".to-top");
  window.addEventListener("scroll", () => {
    header && header.classList.toggle("scrolled", scrollY > 10);
    toTop && toTop.classList.toggle("show", scrollY > 600);
  }, { passive: true });
  toTop && toTop.addEventListener("click", () => scrollTo({ top: 0, behavior: "smooth" }));

  const toggle = $(".nav-toggle"), links = $(".nav-links");
  if (toggle) {
    toggle.addEventListener("click", () => {
      const open = links.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open);
      toggle.textContent = open ? "✕" : "☰";
    });
  }

  /* ---------- Reveal on scroll ---------- */
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } });
  }, { threshold: 0.12 });
  $$(".reveal").forEach((el) => io.observe(el));

  /* ---------- Animated headings, illustrations ---------- */
  const A = window.ART || {};
  function splitWords(el) {
    const text = el.textContent.trim().replace(/\s+/g, " ");
    el.setAttribute("aria-label", text);
    el.textContent = "";
    text.split(" ").forEach((w, i, arr) => {
      const s = document.createElement("span");
      s.className = "word";
      s.style.setProperty("--i", i);
      s.setAttribute("aria-hidden", "true");
      s.textContent = w;
      el.appendChild(s);
      if (i < arr.length - 1) el.appendChild(document.createTextNode(" "));
    });
    const u = document.createElement("i");
    u.className = "uline";
    u.setAttribute("aria-hidden", "true");
    el.insertAdjacentElement("afterend", u);
  }
  $$(".page-hero h1, .reveal h2").forEach(splitWords);

  // Illustration sets for the inner-page headers (slot order: big, bottom, top, small, ribbon)
  const HERO_SETS = {
    about:     ["book", "stack", "cap", "pencil", "bookmark"],
    programs:  ["book", "trophy", "magnifier", "star", "bookmark"],
    calendar:  ["calendar", "clock", "pencil", "star", "bookmark"],
    resources: ["folder", "stack", "doc", "pencil", "bookmark"],
    gallery:   ["camera", "photo", "star", "pencil", "bookmark"],
    contact:   ["envelope", "pin", "book", "star", "bookmark"]
  };
  const ph = $(".page-hero");
  const set = HERO_SETS[document.body.dataset.page];
  if (ph && set) {
    const wrap = document.createElement("div");
    wrap.className = "hero-art";
    wrap.setAttribute("aria-hidden", "true");
    wrap.innerHTML = '<span class="orb a"></span><span class="orb b"></span>' +
      set.map((k, i) => `<span class="art s${i + 1}">${A[k] || ""}</span>`).join("") +
      [["34%", "58%", 18, 0, 3], ["8%", "62%", 14, 1, 3.6], ["46%", "22%", 12, 1.8, 4], ["22%", "48%", 10, .6, 3.2]]
        .map(([r, t, z, d, tt]) => `<span class="spark" style="right:${r};top:${t};width:${z}px;height:${z}px;--d:${d}s;--t:${tt}s">${A.spark}</span>`).join("");
    ph.prepend(wrap);
  }

  // Corner illustrations inside sections: <span class="deco tr" data-art="book">
  $$("[data-art]").forEach((el) => {
    el.innerHTML = A[el.dataset.art] || "";
    el.setAttribute("aria-hidden", "true");
    if (reduceMotion) el.classList.add("in"); else io.observe(el);
  });

  /* ---------- Image helper with fallback ---------- */
  function makeImg(id, w, alt) {
    const img = new Image();
    img.loading = "lazy";
    img.alt = alt || "Cabancalan I ES Library";
    img.src = DRIVE_IMG(id, w);
    img.onerror = () => { img.style.display = "none"; };
    return img;
  }

  /* ---------- Hero slideshow ---------- */
  const heroWrap = $(".hero-slides");
  if (heroWrap && typeof HERO_IDS !== "undefined") {
    const dots = $(".hero-dots");
    const slides = HERO_IDS.map((id, i) => {
      const d = document.createElement("div");
      d.className = "hero-slide" + (i === 0 ? " active" : "");
      d.style.backgroundImage = `url("${DRIVE_IMG(id, 1600)}")`;
      heroWrap.appendChild(d);
      const b = document.createElement("button");
      b.setAttribute("aria-label", "Show photo " + (i + 1));
      if (i === 0) b.className = "active";
      b.addEventListener("click", () => { go(i); restart(); });
      dots && dots.appendChild(b);
      return d;
    });
    let cur = 0, timer;
    const go = (n) => {
      slides[cur].classList.remove("active");
      $$("button", dots)[cur]?.classList.remove("active");
      cur = (n + slides.length) % slides.length;
      // restart the ken-burns animation
      slides[cur].classList.remove("active"); void slides[cur].offsetWidth;
      slides[cur].classList.add("active");
      $$("button", dots)[cur]?.classList.add("active");
    };
    const restart = () => { clearInterval(timer); if (!reduceMotion) timer = setInterval(() => go(cur + 1), 6500); };
    restart();
  }

  /* ---------- Floating book emojis ---------- */
  const floaters = $(".floaters");
  if (floaters && !reduceMotion) {
    const icons = ["📚", "📖", "✏️", "🔖", "⭐", "📕", "📗", "📘"];
    for (let i = 0; i < 14; i++) {
      const s = document.createElement("span");
      s.textContent = icons[i % icons.length];
      s.style.left = Math.random() * 96 + "%";
      s.style.fontSize = 1.2 + Math.random() * 1.8 + "rem";
      s.style.animationDuration = 12 + Math.random() * 14 + "s";
      s.style.animationDelay = -Math.random() * 20 + "s";
      floaters.appendChild(s);
    }
  }

  /* ---------- Typed words ---------- */
  const typed = $(".typed");
  if (typed) {
    const words = ["read.", "discover.", "imagine.", "grow.", "dream."];
    if (reduceMotion) { typed.textContent = words[0]; }
    else {
      let w = 0, c = 0, del = false;
      const tick = () => {
        const word = words[w];
        typed.textContent = word.slice(0, c);
        if (!del && c === word.length) { del = true; return setTimeout(tick, 5000); }
        if (del && c === 0) { del = false; w = (w + 1) % words.length; return setTimeout(tick, 1000); }
        c += del ? -1 : 1;
        setTimeout(tick, del ? 150 : 250);
      };
      tick();
    }
  }

  /* ---------- Counters ---------- */
  const counters = $$("[data-count]");
  if (counters.length) {
    const co = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        const el = e.target, end = +el.dataset.count, suffix = el.dataset.suffix || "";
        const start = performance.now(), dur = 1800;
        const step = (t) => {
          const p = Math.min((t - start) / dur, 1);
          const eased = 1 - Math.pow(1 - p, 3);
          el.textContent = Math.round(end * eased).toLocaleString() + suffix;
          if (p < 1 && !reduceMotion) requestAnimationFrame(step);
          else el.textContent = end.toLocaleString() + suffix;
        };
        requestAnimationFrame(step);
        co.unobserve(el);
      });
    }, { threshold: 0.5 });
    counters.forEach((c) => co.observe(c));
  }

  /* ---------- Quote marquee ---------- */
  const track = $(".marquee-track");
  if (track && typeof QUOTES !== "undefined") {
    const html = QUOTES.map((q) => `<span>“${q}”</span><span>📚</span>`).join("");
    track.innerHTML = html + html;
  }

  /* ---------- Gallery ---------- */
  const lb = $(".lightbox");
  let lbIndex = 0;
  const openLb = (i) => {
    lbIndex = (i + GALLERY_IDS.length) % GALLERY_IDS.length;
    $("img", lb).src = DRIVE_IMG(GALLERY_IDS[lbIndex], 1800);
    lb.classList.add("open");
    document.body.style.overflow = "hidden";
  };
  const closeLb = () => { lb.classList.remove("open"); document.body.style.overflow = ""; };
  if (lb) {
    $(".lb-close", lb).addEventListener("click", closeLb);
    $(".lb-prev", lb).addEventListener("click", () => openLb(lbIndex - 1));
    $(".lb-next", lb).addEventListener("click", () => openLb(lbIndex + 1));
    lb.addEventListener("click", (e) => { if (e.target === lb) closeLb(); });
    document.addEventListener("keydown", (e) => {
      if (!lb.classList.contains("open")) return;
      if (e.key === "Escape") closeLb();
      if (e.key === "ArrowLeft") openLb(lbIndex - 1);
      if (e.key === "ArrowRight") openLb(lbIndex + 1);
    });
  }
  const gal = $("#gallery");
  if (gal) {
    GALLERY_IDS.forEach((id, i) => {
      const d = document.createElement("div");
      d.className = "g-item reveal";
      d.appendChild(makeImg(id, 700));
      d.addEventListener("click", () => openLb(i));
      gal.appendChild(d);
      io.observe(d);
    });
  }
  const strip = $("#strip");
  if (strip) {
    GALLERY_IDS.slice(5, 11).forEach((id) => {
      const d = document.createElement("a");
      d.className = "g-item reveal";
      d.href = "gallery.html";
      d.appendChild(makeImg(id, 500));
      strip.appendChild(d);
      io.observe(d);
    });
  }
  $$("[data-img]").forEach((el) => {
    el.src = DRIVE_IMG(el.dataset.img, 1200);
  });

  /* ---------- Programs ---------- */
  const pg = $("#programs");
  if (pg) {
    const limit = +(pg.dataset.limit || PROGRAMS.length);
    pg.innerHTML = PROGRAMS.slice(0, limit).map((p, i) => `
      <article class="card program reveal d${i % 3}" data-grades="${p.grades}">
        <span class="num">${p.n}</span>
        <div class="icon-bubble">${p.icon}</div>
        <h3>${p.name}</h3>
        <p>${p.what}</p>
        <p><b style="color:var(--teal)">Result:</b> ${p.result}</p>
        <div class="tags"><span class="tag">Grades ${p.grades}</span><span class="tag gold">${p.freq}</span></div>
      </article>`).join("");
    $$(".reveal", pg).forEach((el) => io.observe(el));

    $$(".chip").forEach((chip) => chip.addEventListener("click", () => {
      $$(".chip").forEach((c) => c.classList.remove("active"));
      chip.classList.add("active");
      const f = chip.dataset.filter;
      $$(".program", pg).forEach((card) => {
        const g = card.dataset.grades;
        let show = f === "all" || g === "All" || g === "K–6";
        if (f === "K–3") show = ["K–3", "K–6", "All"].includes(g);
        if (f === "2–6") show = ["2–6", "3–6", "K–6", "All"].includes(g);
        if (f === "all") show = true;
        card.classList.toggle("hide", !show);
      });
    }));
  }

  /* ---------- Calendar ---------- */
  const tl = $("#timeline");
  if (tl) {
    tl.innerHTML = CALENDAR.map((m, i) => `
      <div class="t-item reveal">
        <div class="t-dot">${m.m}</div>
        <div class="t-card"><h3>${m.name}</h3>
          <ul>${m.items.map(([w, t]) => `<li><b>${w}:</b> ${t}</li>`).join("")}</ul>
        </div>
      </div>`).join("");
    $$(".reveal", tl).forEach((el) => io.observe(el));
  }

  /* ---------- Resources ---------- */
  const rs = $("#resources");
  if (rs) {
    rs.innerHTML = RESOURCES.map((r, i) => `
      <article class="card res-card reveal d${i % 2}">
        <div class="res-icon ${r.type}">${r.type.toUpperCase()}</div>
        <div><h3>${r.title}</h3><p>${r.desc}</p>
          <a class="btn btn-outline" href="${r.url}" target="_blank" rel="noopener">Open on Google Drive ↗</a>
        </div>
      </article>`).join("");
    $$(".reveal", rs).forEach((el) => io.observe(el));
  }


  /* ---------- Hero card: Book of the Week ---------- */
  const hc = $("#heroCard");
  if (hc && typeof BOOKS !== "undefined" && BOOKS.length) {
    const weekNo = (d) => {
      const t = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
      const day = t.getUTCDay() || 7;
      t.setUTCDate(t.getUTCDate() + 4 - day);
      const y0 = new Date(Date.UTC(t.getUTCFullYear(), 0, 1));
      return Math.ceil(((t - y0) / 86400000 + 1) / 7);
    };
    const wk = weekNo(new Date());
    let idx = wk % BOOKS.length;
    const render = (animate) => {
      const b = BOOKS[idx];
      $("#bwTitle").textContent = b.title;
      $("#bwAuthor").textContent = b.author;
      $("#bwBlurb").textContent = b.blurb;
      $("#bwTags").innerHTML = (b.tags || []).map((t) => `<span>${t}</span>`).join("");
      $("#bwCoverTitle").textContent = b.title;
      $("#bwCoverIcon").textContent = b.icon || "📘";
      $("#bwCover").style.background = `linear-gradient(135deg, ${b.color}, #14213d)`;
      $("#bwWeek").textContent = idx === wk % BOOKS.length ? "Week " + wk : "Browsing";
      if (animate && !reduceMotion) {
        $$(".bw-body, .bw-blurb", hc).forEach((el) => { el.classList.remove("bw-swap"); void el.offsetWidth; el.classList.add("bw-swap"); });
      }
    };
    $("#bwPrev").addEventListener("click", () => { idx = (idx - 1 + BOOKS.length) % BOOKS.length; render(true); });
    $("#bwNext").addEventListener("click", () => { idx = (idx + 1) % BOOKS.length; render(true); });
    render(false);
  }

  /* ---------- Year ---------- */
  $$(".year").forEach((y) => (y.textContent = new Date().getFullYear()));
})();
