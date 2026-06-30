/* The Open Accounting Path — single-page app (vanilla JS, no deps) */
(function () {
  "use strict";
  var D = window.CURRICULUM || {};
  var TRACKS = D.tracks || [];
  var SAUDI = D.saudi || null;
  var SAUDI_MODS = (SAUDI && SAUDI.modules) || [];

  // ---- module index ----
  var flatGlobal = [];
  TRACKS.forEach(function (t) { (t.modules || []).forEach(function (m) { flatGlobal.push(m); }); });
  var allMods = flatGlobal.concat(SAUDI_MODS);
  var byId = {};
  allMods.forEach(function (m) { byId[m.id] = m; });

  // ---- progress (localStorage) ----
  var PKEY = "oac-progress-v1";
  function loadProgress() {
    try { return new Set(JSON.parse(localStorage.getItem(PKEY) || "[]")); }
    catch (e) { return new Set(); }
  }
  function saveProgress(s) {
    try { localStorage.setItem(PKEY, JSON.stringify(Array.from(s))); } catch (e) {}
  }
  var done = loadProgress();
  function isDone(id) { return done.has(id); }
  function toggleDone(id, v) {
    if (v) done.add(id); else done.delete(id);
    saveProgress(done); refreshProgressUI();
  }

  // ---- theme ----
  var TKEY = "oac-theme";
  function applyTheme(t) {
    if (t === "dark") document.documentElement.setAttribute("data-theme", "dark");
    else document.documentElement.removeAttribute("data-theme");
  }
  applyTheme(localStorage.getItem(TKEY) || "light");
  document.getElementById("themeBtn").addEventListener("click", function () {
    var cur = document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark";
    localStorage.setItem(TKEY, cur); applyTheme(cur);
  });

  // ---- helpers ----
  function esc(s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }
  function costInfo(c) {
    var k = String(c || "").toLowerCase();
    if (k.indexOf("free-to-audit") >= 0 || k.indexOf("free to audit") >= 0) return ["audit", "Free to audit"];
    if (k.indexOf("freemium") >= 0) return ["freemium", "Freemium"];
    if (k.indexOf("paid") >= 0) return ["paid", "Paid (optional)"];
    if (k.indexOf("free") >= 0) return ["free", "Free"];
    return ["free", c || "Free"];
  }
  function roleClass(r) {
    var k = String(r || "").toLowerCase();
    if (k.indexOf("supp") >= 0) return "supplement";
    if (k.indexOf("practice") >= 0) return "practice";
    if (k.indexOf("refer") >= 0) return "reference";
    return "primary";
  }
  function roleRank(r) {
    var k = String(r || "").toLowerCase();
    if (k.indexOf("primary") >= 0 || k.indexOf("anchor") >= 0) return 0;
    if (k.indexOf("supp") >= 0) return 1;
    if (k.indexOf("practice") >= 0) return 2;
    return 3;
  }
  function go(hash) { location.hash = hash; }
  function modLink(id) {
    var m = byId[id];
    if (!m) return esc(id);
    return '<a href="#/module/' + encodeURIComponent(id) + '">' + esc(id) + " · " + esc(m.title) + "</a>";
  }

  // ---- progress math ----
  function trackPct(t) {
    var ms = t.modules || []; if (!ms.length) return 0;
    var d = ms.filter(function (m) { return isDone(m.id); }).length;
    return Math.round((d / ms.length) * 100);
  }
  function overallPct() {
    if (!allMods.length) return 0;
    var d = allMods.filter(function (m) { return isDone(m.id); }).length;
    return Math.round((d / allMods.length) * 100);
  }

  // ---- sidebar ----
  var navEl = document.getElementById("nav");
  var openTracks = {};
  function buildNav() {
    var h = "";
    h += '<div class="nav-link" data-go="#/"><span class="ic">🏠</span> Home</div>';
    h += '<div class="nav-section">Curriculum</div>';
    TRACKS.forEach(function (t, i) {
      var tid = "t" + i;
      var pct = trackPct(t);
      var open = openTracks[tid];
      h += '<div class="nav-track ' + (open ? "open" : "") + '" data-track="' + tid + '">';
      h += '<div class="nav-track-head" data-toggle="' + tid + '">' + esc(t.name) +
           '<span class="chev">▸</span></div>';
      h += '<div class="nav-track-bar"><i style="width:' + pct + '%"></i></div>';
      h += '<div class="nav-modules">';
      (t.modules || []).forEach(function (m) {
        h += '<a class="nav-mod ' + (isDone(m.id) ? "done" : "") + '" href="#/module/' +
             encodeURIComponent(m.id) + '" data-mid="' + esc(m.id) + '">' +
             '<span class="dot">' + (isDone(m.id) ? "✓" : "○") + '</span>' +
             '<span class="mid">' + esc(m.id) + '</span><span>' + esc(m.title) + '</span></a>';
      });
      h += "</div></div>";
    });
    if (SAUDI) {
      h += '<div class="nav-section">Jurisdiction</div>';
      var spct = SAUDI_MODS.length ? Math.round(SAUDI_MODS.filter(function(m){return isDone(m.id);}).length / SAUDI_MODS.length * 100) : 0;
      var sOpen = openTracks["ksa"];
      h += '<div class="nav-track ' + (sOpen ? "open" : "") + '" data-track="ksa">';
      h += '<div class="nav-track-head" data-toggle="ksa">🇸🇦 Saudi (SOCPA) Track<span class="chev">▸</span></div>';
      h += '<div class="nav-track-bar"><i style="width:' + spct + '%"></i></div>';
      h += '<div class="nav-modules">';
      h += '<a class="nav-mod" href="#/saudi"><span class="dot">★</span><span>Track overview</span></a>';
      SAUDI_MODS.forEach(function (m) {
        h += '<a class="nav-mod ' + (isDone(m.id) ? "done" : "") + '" href="#/module/' +
             encodeURIComponent(m.id) + '" data-mid="' + esc(m.id) + '">' +
             '<span class="dot">' + (isDone(m.id) ? "✓" : "○") + '</span>' +
             '<span class="mid">' + esc(m.id) + '</span><span>' + esc(m.title) + '</span></a>';
      });
      h += "</div></div>";
    }
    h += '<div class="nav-section">More</div>';
    h += '<div class="nav-link" data-go="#/projects"><span class="ic">🛠️</span> Projects</div>';
    h += '<div class="nav-link" data-go="#/certs"><span class="ic">🎓</span> Certifications</div>';
    h += '<div class="nav-link" data-go="#/tooling"><span class="ic">🧰</span> Tooling</div>';
    h += '<div class="nav-link" data-go="#/career"><span class="ic">💼</span> Career &amp; FAQ</div>';
    h += '<div class="nav-link" data-go="#/about"><span class="ic">ℹ️</span> About</div>';
    navEl.innerHTML = h;
    highlightNav();
  }
  navEl.addEventListener("click", function (e) {
    var tog = e.target.closest("[data-toggle]");
    if (tog) { var id = tog.getAttribute("data-toggle"); openTracks[id] = !openTracks[id]; buildNav(); return; }
    var g = e.target.closest("[data-go]");
    if (g) { go(g.getAttribute("data-go")); closeSidebar(); return; }
    var a = e.target.closest("a"); if (a) closeSidebar();
  });
  function highlightNav() {
    var hash = location.hash || "#/";
    navEl.querySelectorAll(".nav-link").forEach(function (n) {
      n.classList.toggle("active", n.getAttribute("data-go") === hash);
    });
    navEl.querySelectorAll(".nav-mod").forEach(function (n) {
      var mid = n.getAttribute("data-mid");
      n.classList.toggle("active", mid && hash === "#/module/" + encodeURIComponent(mid));
    });
  }
  function refreshProgressUI() {
    document.getElementById("progressChip").textContent = overallPct() + "%";
    buildNav();
  }

  // ---- views ----
  var main = document.getElementById("main");
  function set(html) { main.innerHTML = html; main.scrollTop = 0; window.scrollTo(0, 0); main.focus(); highlightNav(); }

  function resourceHTML(r) {
    var ci = costInfo(r.cost);
    var url = r.url && /^https?:/i.test(r.url) ? r.url : "";
    var title = url ? '<a href="' + esc(url) + '" target="_blank" rel="noopener">' + esc(r.title) + " ↗</a>" : esc(r.title);
    var ar = /arabic|عرب/i.test((r.notes || "") + (r.title || "")) ? '<span class="badge ar">العربية · Arabic</span>' : "";
    var meta = [];
    if (r.provider) meta.push(esc(r.provider));
    if (r.type) meta.push(esc(r.type));
    return '<div class="res"><div class="role ' + roleClass(r.role) + '"></div><div class="body">' +
      '<div class="rtitle">' + title + "</div>" +
      '<div class="rmeta">' + meta.join(" · ") +
      ' <span class="badge ' + ci[0] + '">' + esc(ci[1]) + "</span>" +
      (r.role ? ' <span class="badge role">' + esc(r.role) + "</span>" : "") + ar + "</div>" +
      (r.notes ? '<div class="notes">' + esc(r.notes) + "</div>" : "") +
      "</div></div>";
  }

  function renderModule(id) {
    var m = byId[id];
    if (!m) { set('<div class="empty">Module not found.</div>'); return; }
    var saudi = !!(m.overlaysGlobalModules && m.overlaysGlobalModules.length);
    var flat = saudi ? SAUDI_MODS : flatGlobal;
    var idx = flat.indexOf(m);
    var prev = idx > 0 ? flat[idx - 1] : null;
    var next = idx >= 0 && idx < flat.length - 1 ? flat[idx + 1] : null;

    var h = "";
    h += '<div class="crumb"><a href="#/">Home</a> › ' +
      (saudi ? '<a href="#/saudi">Saudi (SOCPA) Track</a>' : '<a href="#/track/' + encodeURIComponent(m.track) + '">' + esc(m.track) + "</a>") +
      " › " + esc(m.id) + "</div>";
    h += '<div class="mod-head"><span class="id">' + esc(m.id) + '</span><h1 style="flex:1;min-width:240px">' + esc(m.title) + "</h1></div>";

    var pills = [];
    if (m.estimatedHours) pills.push('<span class="pill">⏱️ <b>' + esc(m.estimatedHours) + "</b></span>");
    if (m.track) pills.push('<span class="pill">' + esc(m.track) + "</span>");
    if (m.prerequisites && m.prerequisites.length)
      pills.push('<span class="pill">Prereqs: ' + m.prerequisites.map(function (p) { return modLink(p); }).join(", ") + "</span>");
    else pills.push('<span class="pill">Prereqs: <b>none</b></span>');
    h += '<div class="metarow">' + pills.join("") + "</div>";

    if (saudi) {
      var reads = m.overlaysGlobalModules.map(function (p) { return modLink(p); }).join(" &nbsp;·&nbsp; ");
      h += '<div class="callout gold"><span class="lab">🇸🇦 Saudi overlay — read these global modules first</span>' + reads + "</div>";
    }
    if (m.summary) h += "<p class=\"lede\">" + esc(m.summary) + "</p>";
    if (m.whyItMatters) h += '<div class="callout why"><span class="lab">Why it matters</span>' + esc(m.whyItMatters) + "</div>";

    if (m.outcomes && m.outcomes.length) {
      h += "<h2>What you'll be able to do</h2><ul class=\"clean\">";
      m.outcomes.forEach(function (o) { h += "<li>" + esc(o) + "</li>"; });
      h += "</ul>";
    }
    if (m.resources && m.resources.length) {
      h += "<h2>Resources</h2>";
      m.resources.slice().sort(function (a, b) { return roleRank(a.role) - roleRank(b.role); })
        .forEach(function (r) { h += resourceHTML(r); });
    }
    if (m.project) h += '<h2>🛠️ Project</h2><div class="callout gold"><span class="lab">Build this</span>' + esc(m.project) + "</div>";
    if (m.milestoneCheck) h += '<h2>✅ Checkpoint</h2><div class="callout"><span class="lab">You\'re done when</span>' + esc(m.milestoneCheck) + "</div>";

    if (m.flags && m.flags.length) {
      h += '<details class="flags"><summary>Curation &amp; verification notes (' + m.flags.length + ")</summary><ul>";
      m.flags.forEach(function (f) { h += "<li>" + esc(f) + "</li>"; });
      h += "</ul></details>";
    }

    h += '<div class="complete-bar"><label class="chk"><input type="checkbox" id="doneChk" ' +
      (isDone(m.id) ? "checked" : "") + "> Mark this module complete</label>" +
      '<span class="muted" style="margin-left:auto;font-size:13px">' + (idx + 1) + " of " + flat.length + "</span></div>";

    h += '<div class="prevnext">';
    h += prev ? '<a href="#/module/' + encodeURIComponent(prev.id) + '"><div class="dir">← Previous</div><div class="t">' + esc(prev.id) + " " + esc(prev.title) + "</div></a>" : "<span></span>";
    h += next ? '<a class="next" href="#/module/' + encodeURIComponent(next.id) + '"><div class="dir">Next →</div><div class="t">' + esc(next.id) + " " + esc(next.title) + "</div></a>" : "<span></span>";
    h += "</div>";

    set(h);
    var chk = document.getElementById("doneChk");
    if (chk) chk.addEventListener("change", function () { toggleDone(m.id, chk.checked); });
  }

  function renderTrack(name) {
    var t = TRACKS.filter(function (x) { return x.name === name; })[0];
    if (!t) { set('<div class="empty">Track not found.</div>'); return; }
    var h = '<div class="crumb"><a href="#/">Home</a> › ' + esc(t.name) + "</div>";
    h += "<h1>" + esc(t.name) + "</h1>";
    h += '<p class="lede">' + (t.modules || []).length + " modules · " + trackPct(t) + "% complete</p>";
    h += '<div class="grid">';
    (t.modules || []).forEach(function (m) {
      var pct = isDone(m.id) ? 100 : 0;
      h += '<a class="card" href="#/module/' + encodeURIComponent(m.id) + '">' +
        '<div class="eyebrow">' + esc(m.id) + (isDone(m.id) ? " · ✓ done" : "") + "</div>" +
        "<h3>" + esc(m.title) + "</h3>" +
        "<p>" + esc((m.summary || "").slice(0, 130)) + ((m.summary || "").length > 130 ? "…" : "") + "</p>" +
        '<div class="meta">⏱️ ' + esc(m.estimatedHours || "—") + " · " + ((m.resources || []).length) + " resources</div>" +
        '<div class="meter"><i style="width:' + pct + '%"></i></div></a>';
    });
    h += "</div>";
    set(h);
  }

  function renderHome() {
    var st = D.stats || {};
    var h = "";
    h += '<div class="dedication"><span class="seal">📒</span><div>For <b>Abdulaziz</b> — start with a single debit; finish fluent in the language of business. This whole path is yours, free forever. Go build something. 🇸🇦</div></div>';
    h += '<div class="hero"><div class="kicker">Free · Self-paced · Project-driven</div>';
    h += "<h1>" + esc((D.intro && D.intro.title) || "The Open Accounting Path") + "</h1>";
    if (D.intro && D.intro.tagline) h += '<div class="tagline">' + esc(D.intro.tagline) + "</div>";
    h += '<p class="lede">' + esc((D.intro && D.intro.philosophy ? D.intro.philosophy.split("\n")[0] : "From zero to professionally competent in accounting — built on the best free resources on the web.")) + "</p>";
    h += '<div class="stats">' +
      stat(st.modules, "modules") + stat(st.resources, "free resources") +
      stat(st.projects, "projects") + stat(st.certs, "cert roadmaps") +
      stat(overallPct() + "%", "you've completed") + "</div>";
    var first = flatGlobal[0];
    h += '<div class="btn-row">';
    if (first) h += '<a class="btn" href="#/module/' + encodeURIComponent(first.id) + '">Start at module ' + esc(first.id) + " →</a>";
    if (SAUDI) h += '<a class="btn ghost" href="#/saudi">🇸🇦 Saudi (SOCPA) track</a>';
    h += "</div></div>";

    h += "<h2>The path</h2>";
    h += '<div class="grid">';
    TRACKS.forEach(function (t) {
      var pct = trackPct(t);
      h += '<a class="card" href="#/track/' + encodeURIComponent(t.name) + '">' +
        '<div class="eyebrow">' + (t.modules || []).length + " modules · " + pct + "%</div>" +
        "<h3>" + esc(t.name) + "</h3>" +
        '<div class="meter"><i style="width:' + pct + '%"></i></div></a>';
    });
    h += "</div>";

    if (SAUDI) {
      h += '<a class="card" style="display:block;margin-top:16px;border-color:var(--green)" href="#/saudi">' +
        '<div class="eyebrow">🇸🇦 Jurisdiction track</div><h3>' + esc(SAUDI.title || "Saudi (SOCPA) Track") + "</h3>" +
        "<p>" + esc((SAUDI.tagline || SAUDI.intro || "").slice(0, 150)) + "…</p></a>";
    }

    if (D.intro && D.intro.howToUse) {
      h += "<h2>How to use this</h2><ul class=\"clean\">";
      D.intro.howToUse.slice(0, 6).forEach(function (s) { h += "<li>" + esc(s) + "</li>"; });
      h += '</ul><p class="muted"><a href="#/about">More about the philosophy, principles &amp; staying accountable →</a></p>';
    }
    set(h);
  }
  function stat(v, l) { return '<div class="stat"><b>' + esc(v == null ? "—" : v) + "</b><span>" + esc(l) + "</span></div>"; }

  function renderSaudi() {
    if (!SAUDI) { set('<div class="empty">Saudi track not available.</div>'); return; }
    var h = '<div class="crumb"><a href="#/">Home</a> › Saudi (SOCPA) Track</div>';
    h += '<div class="ksa"><h1>' + esc(SAUDI.title || "Saudi (SOCPA) Track") + "</h1>";
    if (SAUDI.tagline) h += '<div class="tagline">' + esc(SAUDI.tagline) + "</div>";
    if (SAUDI.intro) h += "<p>" + esc(SAUDI.intro) + "</p>";
    if (SAUDI.keyFacts && SAUDI.keyFacts.length) {
      h += '<div class="facts">';
      SAUDI.keyFacts.forEach(function (f) { h += '<div class="f">' + esc(f) + "</div>"; });
      h += "</div>";
    }
    h += "</div>";

    h += '<div class="section-note">This track does <b>not</b> replace the global core. For each row below, complete the listed global module(s) first, then layer the Saudi overlay on top.</div>';

    if (SAUDI.howToUse && SAUDI.howToUse.length) {
      h += "<h2>How to use this track</h2><ul class=\"clean\">";
      SAUDI.howToUse.forEach(function (s) { h += "<li>" + esc(s) + "</li>"; });
      h += "</ul>";
    }

    h += "<h2>Saudi overlay modules</h2>";
    h += '<div class="grid">';
    SAUDI_MODS.forEach(function (m) {
      h += '<a class="card" href="#/module/' + encodeURIComponent(m.id) + '">' +
        '<div class="eyebrow">' + esc(m.id) + (isDone(m.id) ? " · ✓" : "") + "</div><h3>" + esc(m.title) + "</h3>" +
        "<p>" + esc((m.summary || "").slice(0, 120)) + "…</p>" +
        (m.overlaysGlobalModules ? '<div class="meta">Overlays: ' + esc(m.overlaysGlobalModules.join(", ")) + "</div>" : "") +
        "</a>";
    });
    h += "</div>";

    if (SAUDI.overlayMap && SAUDI.overlayMap.length) {
      h += "<h2>Overlay map</h2><table class=\"tbl\"><tr><th>Saudi module</th><th>Pairs with global</th><th>What changes</th></tr>";
      SAUDI.overlayMap.forEach(function (o) {
        h += "<tr><td><b>" + esc(o.saudiModule) + "</b></td><td>" + esc((o.pairsWithGlobal || []).join(", ")) + "</td><td>" + esc(o.whatChanges) + "</td></tr>";
      });
      h += "</table>";
    }
    if (SAUDI.regulators && SAUDI.regulators.length) {
      h += "<h2>Who's who — Saudi regulators</h2><table class=\"tbl\"><tr><th>Body</th><th>Role</th></tr>";
      SAUDI.regulators.forEach(function (r) {
        var nm = r.url ? '<a href="' + esc(r.url) + '" target="_blank" rel="noopener">' + esc(r.name) + " ↗</a>" : esc(r.name);
        h += "<tr><td><b>" + nm + "</b></td><td>" + esc(r.role) + "</td></tr>";
      });
      h += "</table>";
    }
    set(h);
  }

  function renderProjects() {
    var ps = D.projects || [];
    var h = '<div class="crumb"><a href="#/">Home</a> › Projects</div><h1>Projects &amp; Portfolio</h1>';
    h += '<p class="lede">You don\'t finish a module by watching videos — you finish it by building something. These capstones turn knowledge into a portfolio.</p>';
    ps.forEach(function (p) {
      h += "<h2>" + esc(p.title) + "</h2>";
      var meta = [];
      if (p.level) meta.push('<span class="pill"><b>' + esc(p.level) + "</b></span>");
      if (p.afterModules && p.afterModules.length) meta.push('<span class="pill">After: ' + esc(p.afterModules.join(", ")) + "</span>");
      if (meta.length) h += '<div class="metarow">' + meta.join("") + "</div>";
      if (p.description) h += "<p>" + esc(p.description) + "</p>";
      if (p.deliverable) h += '<div class="callout"><span class="lab">Deliverable</span>' + esc(p.deliverable) + "</div>";
      if (p.skills && p.skills.length) h += '<p class="muted"><b>Skills:</b> ' + esc(p.skills.join(", ")) + "</p>";
      if (p.resources && p.resources.length) p.resources.forEach(function (r) { h += resourceHTML(r); });
    });
    set(h);
  }

  function renderCerts() {
    var cs = D.certifications || [];
    var h = '<div class="crumb"><a href="#/">Home</a> › Certifications</div><h1>Certification Roadmaps</h1>';
    h += '<p class="lede">This path isn\'t a substitute for any licensing exam — it builds the knowledge so that, when you pick a credential, you study the format, not the material for the first time.</p>';
    if (SAUDI) h += '<div class="section-note">Targeting Saudi Arabia? See the <a href="#/module/SA.9">SOCPA Fellowship &amp; certification roadmap</a> in the Saudi track.</div>';
    cs.forEach(function (c) {
      h += "<h2>" + esc(c.name) + (c.body ? ' <span class="muted" style="font-size:15px">· ' + esc(c.body) + "</span>" : "") + "</h2>";
      var meta = [];
      if (c.region) meta.push('<span class="pill">' + esc(c.region) + "</span>");
      if (c.costRange) meta.push('<span class="pill">Cost: <b>' + esc(c.costRange) + "</b></span>");
      if (c.mapsToModules && c.mapsToModules.length) meta.push('<span class="pill">Modules: ' + esc(c.mapsToModules.join(", ")) + "</span>");
      if (meta.length) h += '<div class="metarow">' + meta.join("") + "</div>";
      if (c.whoItsFor) h += "<p><b>Who it's for:</b> " + esc(c.whoItsFor) + "</p>";
      if (c.prereqs) h += '<p class="muted"><b>Prerequisites:</b> ' + esc(c.prereqs) + "</p>";
      if (c.notes) h += "<p>" + esc(c.notes) + "</p>";
      if (c.freePrep && c.freePrep.length) c.freePrep.forEach(function (r) { h += resourceHTML(r); });
    });
    set(h);
  }

  function renderTooling() {
    var ts = D.tooling || [];
    var h = '<div class="crumb"><a href="#/">Home</a> › Tooling</div><h1>Tooling Tracks</h1>';
    h += '<p class="lede">Concepts aren\'t enough — modern accountants live in spreadsheets, cloud software, and data tools. Work these alongside the core. Learn the manual method first, then automate.</p>';
    ts.forEach(function (t) {
      h += "<h2>" + esc(t.name) + "</h2>";
      if (t.why) h += '<div class="callout why"><span class="lab">Why it matters</span>' + esc(t.why) + "</div>";
      (t.resources || []).forEach(function (r) { h += resourceHTML(r); });
    });
    set(h);
  }

  function renderCareer() {
    var c = D.career || {};
    var h = '<div class="crumb"><a href="#/">Home</a> › Career</div><h1>Career Paths &amp; FAQ</h1>';
    (c.paths || []).forEach(function (p) {
      h += "<h2>" + esc(p.role) + "</h2>";
      if (p.description) h += "<p>" + esc(p.description) + "</p>";
      if (p.modulesNeeded && p.modulesNeeded.length) h += '<p class="muted"><b>Focus modules:</b> ' + esc(p.modulesNeeded.join(", ")) + "</p>";
      if (p.certs && p.certs.length) h += '<p class="muted"><b>Credentials:</b> ' + esc(p.certs.join(", ")) + "</p>";
      if (p.startingSignal) h += '<div class="callout"><span class="lab">Ready when</span>' + esc(p.startingSignal) + "</div>";
    });
    if (c.faq && c.faq.length) {
      h += "<h2>FAQ</h2>";
      c.faq.forEach(function (q) { h += '<div class="faq-q">' + esc(q.q) + "</div><p>" + esc(q.a) + "</p>"; });
    }
    set(h);
  }

  function renderAbout() {
    var i = D.intro || {};
    var h = '<div class="crumb"><a href="#/">Home</a> › About</div><h1>About this curriculum</h1>';
    if (i.whoIsThisFor) { h += "<h2>Who it's for</h2><p>" + esc(i.whoIsThisFor) + "</p>"; }
    if (i.whatYouWontGet) { h += "<h2>What this is <em>not</em></h2><p>" + esc(i.whatYouWontGet) + "</p>"; }
    if (i.philosophy) { h += "<h2>Philosophy</h2>"; i.philosophy.split("\n").forEach(function (p) { if (p.trim()) h += "<p>" + esc(p) + "</p>"; }); }
    if (i.timeCommitment) { h += "<h2>Time commitment</h2><p>" + esc(i.timeCommitment) + "</p>"; }
    if (i.principles && i.principles.length) { h += "<h2>Principles</h2><ul class=\"clean\">"; i.principles.forEach(function (p) { h += "<li>" + esc(p) + "</li>"; }); h += "</ul>"; }
    if (i.accountability && i.accountability.length) { h += "<h2>Staying accountable</h2><ul class=\"clean\">"; i.accountability.forEach(function (p) { h += "<li>" + esc(p) + "</li>"; }); h += "</ul>"; }
    if (i.jurisdictionNote) { h += "<h2>Jurisdictions</h2><p>" + esc(i.jurisdictionNote) + "</p>"; }
    if (D.sequencing) { h += "<h2>Recommended sequencing</h2><p class=\"muted\" style=\"white-space:pre-wrap\">" + esc(D.sequencing) + "</p>"; }
    h += '<h2>How it was built</h2><p class="muted">Designed by independent curriculum architects, resourced by web-research agents, adversarially link-verified, then graded against CPA/CMA/ACCA blueprints and gap-filled. Resources can still go stale — if a link has moved, search its title and provider.</p>';
    h += '<p class="muted">Curriculum (roadmap, descriptions, projects) under CC BY-SA 4.0. Linked resources belong to their authors (OpenStax, Saylor, MIT OCW, AccountingCoach, IFRS Foundation, SOCPA, ZATCA, and many more).</p>';
    set(h);
  }

  // ---- search ----
  var searchEl = document.getElementById("search");
  function renderSearch(q) {
    var ql = q.toLowerCase();
    var hits = allMods.map(function (m) {
      var hay = [m.id, m.title, m.summary, m.whyItMatters,
        (m.outcomes || []).join(" "),
        (m.resources || []).map(function (r) { return r.title + " " + r.provider + " " + r.notes; }).join(" ")
      ].join(" ").toLowerCase();
      return hay.indexOf(ql) >= 0 ? m : null;
    }).filter(Boolean);
    var h = "<h1>Search</h1><p class=\"lede\">" + hits.length + ' result' + (hits.length === 1 ? "" : "s") + ' for “' + esc(q) + "”</p>";
    if (!hits.length) h += '<div class="empty">Nothing matched. Try a topic like “lease”, “zakat”, “cash flow”, or “audit”.</div>';
    h += '<div class="grid">';
    hits.forEach(function (m) {
      h += '<a class="card" href="#/module/' + encodeURIComponent(m.id) + '"><div class="eyebrow">' + esc(m.id) + " · " + esc(m.track) + "</div><h3>" + esc(m.title) + "</h3><p>" + esc((m.summary || "").slice(0, 120)) + "…</p></a>";
    });
    h += "</div>";
    main.innerHTML = h; window.scrollTo(0, 0);
  }
  var searchActive = false;
  searchEl.addEventListener("input", function () {
    var q = searchEl.value.trim();
    if (q.length >= 2) { searchActive = true; renderSearch(q); }
    else if (searchActive) { searchActive = false; router(); }
  });

  // ---- router ----
  function router() {
    if (searchActive && searchEl.value.trim().length >= 2) { renderSearch(searchEl.value.trim()); return; }
    var hash = location.hash || "#/";
    var parts = hash.replace(/^#\//, "").split("/");
    var route = parts[0] || "";
    if (route === "" ) return renderHome();
    if (route === "module") return renderModule(decodeURIComponent(parts.slice(1).join("/")));
    if (route === "track") return renderTrack(decodeURIComponent(parts.slice(1).join("/")));
    if (route === "saudi") return renderSaudi();
    if (route === "projects") return renderProjects();
    if (route === "certs") return renderCerts();
    if (route === "tooling") return renderTooling();
    if (route === "career") return renderCareer();
    if (route === "about") return renderAbout();
    return renderHome();
  }
  window.addEventListener("hashchange", router);

  // ---- mobile sidebar ----
  var sidebar = document.getElementById("sidebar"), scrim = document.getElementById("scrim");
  function closeSidebar() { sidebar.classList.remove("open"); scrim.classList.remove("show"); }
  document.getElementById("menuBtn").addEventListener("click", function () {
    sidebar.classList.toggle("open"); scrim.classList.toggle("show");
  });
  scrim.addEventListener("click", closeSidebar);
  document.getElementById("resetProgress").addEventListener("click", function () {
    if (confirm("Clear all your progress?")) { done = new Set(); saveProgress(done); refreshProgressUI(); router(); }
  });

  // ---- boot ----
  // auto-open the track of the current module
  (function preopen() {
    var hash = location.hash || "";
    if (hash.indexOf("#/module/") === 0) {
      var id = decodeURIComponent(hash.replace("#/module/", ""));
      TRACKS.forEach(function (t, i) { if ((t.modules || []).some(function (m) { return m.id === id; })) openTracks["t" + i] = true; });
      if (SAUDI_MODS.some(function (m) { return m.id === id; })) openTracks["ksa"] = true;
    }
  })();
  buildNav();
  document.getElementById("progressChip").textContent = overallPct() + "%";
  router();
})();
