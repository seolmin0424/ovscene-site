/* ==========================================================
   OVSCENE — 오브씬
   테마 선택 → 랜덤 추첨 → 장바구니
   ========================================================== */
(function () {
  "use strict";

  var $ = function (s) { return document.querySelector(s); };
  var won = function (n) { return n.toLocaleString("ko-KR") + "원"; };

  function sample(arr, n) {
    var c = arr.slice(), out = [];
    while (out.length < n && c.length) {
      out.push(c.splice(Math.floor(Math.random() * c.length), 1)[0]);
    }
    return out;
  }

  /* ---------- 화면 테마(라이트/다크) ---------- */
  var root = document.documentElement;
  try {
    var st = localStorage.getItem("ovs-theme");
    if (st) root.setAttribute("data-theme", st);
  } catch (e) {}

  $("#themeBtn").addEventListener("click", function () {
    var c = root.getAttribute("data-theme");
    var dark = c ? c === "dark" : matchMedia("(prefers-color-scheme: dark)").matches;
    var n = dark ? "light" : "dark";
    root.setAttribute("data-theme", n);
    try { localStorage.setItem("ovs-theme", n); } catch (e) {}
  });

  /* ---------- 브랜드 테마 5종 ---------- */
  var THEMES = [
    { id: "modern", ko: "모던", en: "Modern", pool: 46,
      c: ["#2E2E2C", "#9BA0A6", "#E3E2DE", "#FFFFFF"], line: "#2E2E2C",
      kw: "Matte · Steel · White",
      desc: "군더더기 없는 면과 무채색. 각진 실루엣과 무광 마감으로 방의 소음을 줄입니다." },
    { id: "vintage", ko: "빈티지", en: "Vintage", pool: 38,
      c: ["#6E4526", "#B4813F", "#D9C29A", "#EFE3CA"], line: "#5A381E",
      kw: "Walnut · Brass · Amber glass",
      desc: "원목과 황동, 흐린 유리. 시간이 묻은 물건들로 방에 밀도를 더합니다." },
    { id: "kitsch", ko: "키치", en: "Kitsch", pool: 42,
      c: ["#E4482E", "#F5B301", "#2F6BE0", "#EA6BA6"], line: "#22201E",
      kw: "Primary · Gloss · Oversized",
      desc: "원색과 유광, 과장된 형태. 하나만 놓아도 방의 표정이 완전히 바뀝니다." },
    { id: "eco", ko: "에코", en: "Eco", pool: 51,
      c: ["#5F7048", "#94A57C", "#C8CBB2", "#E6E2D2"], line: "#3E4A31",
      kw: "Linen · Rattan · Clay",
      desc: "리넨과 라탄, 무유약 도기. 손이 닿는 곳마다 질감이 남는 소재 위주입니다." },
    { id: "metallic", ko: "메탈릭", en: "Metallic", pool: 33,
      c: ["#7C828A", "#AEB4BA", "#C9A25F", "#E7E9EB"], line: "#3C4046",
      kw: "Chrome · Brass · Mirror",
      desc: "크롬과 황동, 거울면. 좁은 방에서 빛을 한 번 더 튕겨 공간을 넓혀 보이게 합니다." }
  ];
  var themeById = {};
  THEMES.forEach(function (t) { themeById[t.id] = t; });

  /* ---------- 오브제 이름 ---------- */
  var NAMES = {
    mug: "머그 · 컵", plate: "접시 세트", bottle: "보틀 · 디스펜서", towel: "수건 · 패브릭",
    tray: "트레이 · 코스터", basket: "수납 바스켓", clock: "테이블 시계", stool: "스툴 · 사이드테이블",
    floorlamp: "플로어 조명", mirror: "벽 거울", cushion: "쿠션 커버", globe: "글로브 무드등",
    lampshade: "셰이드 램프", candle: "캔들 · 홀더", pot: "미니 조리도구", book: "책 · 독립출판물",
    vase: "베이스 · 드라이플라워", frame: "액자 · 아트 프린트", plant: "화분 오브제", rug: "러그 · 매트",
    sachet: "티 · 향 파우치", shelf: "월 셀프"
  };
  var ALL_TYPES = Object.keys(NAMES);

  /* ---------- 오브제 도형 ---------- */
  function S(type, x, y, sc, c, line) {
    var g = '<g transform="translate(' + x + "," + y + ") scale(" + sc + ')">';
    var st = 'stroke="' + line + '" stroke-width="2" stroke-linejoin="round"';
    var A = c[0], B = c[1], C = c[2], D = c[3];
    switch (type) {
      case "mug": g += '<path d="M-20 -34 h38 v24 a10 10 0 0 1 -10 10 h-18 a10 10 0 0 1 -10 -10 z" fill="' + C + '" ' + st + '/><path d="M18 -26 a11 11 0 0 1 0 18" fill="none" stroke="' + line + '" stroke-width="3.4"/>'; break;
      case "plate": g += '<ellipse cx="0" cy="-5" rx="33" ry="10" fill="' + B + '" ' + st + '/><ellipse cx="0" cy="-16" rx="28" ry="9" fill="' + D + '" ' + st + '/><ellipse cx="0" cy="-26" rx="23" ry="8" fill="' + A + '" ' + st + "/>"; break;
      case "bottle": g += '<path d="M-11 0 h22 v-32 q0 -7 -5 -10 v-12 h-12 v12 q-5 3 -5 10 z" fill="' + A + '" ' + st + '/><rect x="-11" y="-25" width="22" height="13" fill="' + D + '"/>'; break;
      case "towel": g += '<rect x="-26" y="-13" width="52" height="13" rx="5" fill="' + A + '" ' + st + '/><rect x="-23" y="-25" width="46" height="13" rx="5" fill="' + D + '" ' + st + '/><rect x="-20" y="-37" width="40" height="13" rx="5" fill="' + B + '" ' + st + "/>"; break;
      case "tray": g += '<ellipse cx="0" cy="-8" rx="30" ry="11" fill="' + B + '" ' + st + '/><ellipse cx="0" cy="-12" rx="22" ry="7" fill="' + D + '" opacity=".7"/>'; break;
      case "basket": g += '<path d="M-24 -38 h48 l-6 38 h-36 z" fill="' + C + '" ' + st + '/><path d="M-21 -26 h42 M-19 -14 h38" stroke="' + line + '" stroke-width="1.6" opacity=".55"/>'; break;
      case "clock": g += '<circle cx="0" cy="-26" r="25" fill="' + D + '" ' + st + '/><path d="M0 -26 v-13 M0 -26 l10 6" stroke="' + line + '" stroke-width="2.6" stroke-linecap="round"/><rect x="-8" y="-3" width="16" height="6" fill="' + A + '"/>'; break;
      case "stool": g += '<ellipse cx="0" cy="-40" rx="27" ry="8" fill="' + A + '" ' + st + '/><path d="M-19 -36 l-5 36 M19 -36 l5 36 M-12 -35 l2 35 M12 -35 l-2 35" stroke="' + A + '" stroke-width="5" fill="none" stroke-linecap="round"/>'; break;
      case "floorlamp": g += '<path d="M-20 -78 h40 l-9 22 h-22 z" fill="' + B + '" ' + st + '/><rect x="-2.5" y="-56" width="5" height="52" fill="' + A + '"/><ellipse cx="0" cy="-3" rx="20" ry="6" fill="' + A + '" ' + st + "/>"; break;
      case "mirror": g += '<rect x="-23" y="-62" width="46" height="62" rx="23" fill="' + D + '" ' + st + '/><path d="M-13 -14 l16 -32 l8 14" stroke="' + B + '" stroke-width="3" fill="none" opacity=".8"/>'; break;
      case "cushion": g += '<rect x="-27" y="-52" width="54" height="52" rx="10" fill="' + A + '" ' + st + '/><path d="M-27 -26 h54" stroke="' + D + '" stroke-width="2.4" opacity=".65"/>'; break;
      case "globe": g += '<rect x="-19" y="-16" width="38" height="16" rx="4" fill="' + A + '" ' + st + '/><circle cx="0" cy="-42" r="27" fill="' + C + '" opacity=".55" ' + st + '/><path d="M-5 -30 v-12 a5 5 0 0 1 10 0 v12" fill="none" stroke="' + line + '" stroke-width="2.4"/>'; break;
      case "lampshade": g += '<path d="M-25 -32 L25 -32 L15 -66 L-15 -66 Z" fill="' + D + '" ' + st + '/><rect x="-3" y="-32" width="6" height="24" fill="' + A + '"/><ellipse cx="0" cy="-6" rx="17" ry="6" fill="' + A + '" ' + st + "/>"; break;
      case "candle": g += '<path d="M-17 0 h34 v-36 h-34 z" fill="' + D + '" ' + st + '/><rect x="-17" y="-25" width="34" height="12" fill="' + B + '"/><path d="M0 -36 v-9" stroke="' + line + '" stroke-width="2"/>'; break;
      case "pot": g += '<path d="M-23 -32 h46 v20 a10 10 0 0 1 -10 10 h-26 a10 10 0 0 1 -10 -10 z" fill="' + A + '" ' + st + '/><rect x="-29" y="-39" width="58" height="8" rx="4" fill="' + D + '" ' + st + '/><circle cx="0" cy="-43" r="4.5" fill="' + line + '"/>'; break;
      case "book": g += '<path d="M-30 0 v-38 l60 -8 v38 z" fill="' + A + '" ' + st + '/><path d="M-30 -38 l60 -8 l0 6 l-60 8 z" fill="' + D + '"/><path d="M-21 -4 v-37" stroke="' + D + '" stroke-width="2" opacity=".6"/>'; break;
      case "vase": g += '<path d="M-13 -22 q-5 22 13 22 q18 0 13 -22 z" fill="' + D + '" ' + st + '/><path d="M-8 -22 h16 v-9 h-16 z" fill="' + D + '" ' + st + '/><path d="M0 -31 v-24" stroke="' + B + '" stroke-width="2.2"/><circle cx="0" cy="-59" r="8" fill="' + B + '"/><circle cx="0" cy="-59" r="3" fill="' + D + '"/>'; break;
      case "frame": g += '<rect x="-26" y="-52" width="52" height="52" fill="' + D + '" ' + st + '/><rect x="-18" y="-44" width="36" height="36" fill="' + C + '"/><path d="M-18 -8 l12 -17 l10 10 l9 -13 l5 20 z" fill="' + A + '"/>'; break;
      case "plant": g += '<path d="M-15 0 h30 l-4 -22 h-22 z" fill="' + C + '" ' + st + '/><path d="M0 -22 q-21 -6 -18 -30 q16 5 18 30" fill="' + A + '"/><path d="M0 -22 q22 -10 20 -34 q-18 9 -20 34" fill="' + B + '"/>'; break;
      case "rug": g += '<ellipse cx="0" cy="-8" rx="36" ry="12" fill="' + A + '" ' + st + '/><ellipse cx="0" cy="-10" rx="24" ry="7" fill="' + D + '" opacity=".75"/><ellipse cx="0" cy="-11" rx="12" ry="4" fill="' + B + '"/>'; break;
      case "sachet": g += '<rect x="-18" y="-44" width="36" height="44" rx="2" fill="' + A + '" ' + st + '/><rect x="-11" y="-31" width="22" height="16" fill="' + D + '"/><rect x="-18" y="-44" width="36" height="6" fill="' + line + '" opacity=".35"/>'; break;
      case "shelf": g += '<rect x="-32" y="-14" width="64" height="7" fill="' + A + '" ' + st + '/><rect x="-16" y="-40" width="12" height="26" fill="' + B + '" ' + st + '/><circle cx="12" cy="-24" r="10" fill="' + C + '" ' + st + "/>"; break;
    }
    return g + "</g>";
  }

  function scene(types, theme, w, h, shelf) {
    w = w || 400; h = h || 300;
    var s = '<svg viewBox="0 0 ' + w + " " + h + '" preserveAspectRatio="xMidYMid meet" aria-hidden="true">';
    var base = h - (shelf ? 46 : 14);
    var n = types.length, gap = w / (n + 1);
    for (var i = 0; i < n; i++) s += S(types[i], gap * (i + 1), base, 1.02, theme.c, theme.line);
    if (shelf) {
      s += '<rect x="0" y="' + base + '" width="' + w + '" height="9" fill="var(--shelf)"/>';
      s += '<rect x="0" y="' + (base + 9) + '" width="' + w + '" height="4" fill="rgba(0,0,0,.10)"/>';
    }
    return s + "</svg>";
  }

  /* ---------- 팩 ---------- */
  var PACKS = [
    { id: "starter", cat: "starter", en: "Starter", name: "자취 스타터 팩", price: 89000, n: 4,
      desc: "첫 자취방에 없으면 생활이 안 되는 것들. 짐이 되지 않는 최소 구성.",
      pool: ["mug", "plate", "bottle", "towel", "tray", "basket", "clock", "sachet"] },
    { id: "furniture", cat: "furniture", en: "Furniture", name: "가구 팩", price: 240000, n: 3,
      desc: "스툴·사이드테이블·플로어 조명 등 방에 실제로 들어가는 소형 가구.",
      pool: ["stool", "floorlamp", "mirror", "shelf", "frame", "cushion", "rug"] },
    { id: "home", cat: "home", en: "Home", name: "가정용품 팩", price: 64000, n: 4,
      desc: "매일 쓰지만 고르기는 귀찮은 것들. 톤을 맞춰 한 번에 정리합니다.",
      pool: ["bottle", "towel", "basket", "tray", "sachet", "clock", "mug"] },
    { id: "light", cat: "light", en: "Lighting", name: "조명 팩", price: 78000, n: 3,
      desc: "천장등을 끄고 쓰는 조명 조합. 색온도를 맞춰 보냅니다.",
      pool: ["globe", "lampshade", "floorlamp", "candle", "mirror"] },
    { id: "kitchen", cat: "home", en: "Kitchen", name: "키친 팩", price: 96000, n: 4,
      desc: "집에서 요리를 시작하는 사람을 위한 1인분 기준 구성.",
      pool: ["pot", "plate", "mug", "tray", "sachet", "bottle"] },
    { id: "fabric", cat: "home", en: "Fabric", name: "침구 · 패브릭 팩", price: 74000, n: 3,
      desc: "잠들기 전 30분이 머무는 반경. 침대 옆 1미터만 손보는 구성.",
      pool: ["cushion", "towel", "rug", "basket", "globe"] },
    { id: "desk", cat: "deco", en: "Desk", name: "데스크 팩", price: 58000, n: 4,
      desc: "책상 위에서 시선이 머무는 자리를 정리하는 오브제들.",
      pool: ["lampshade", "book", "tray", "clock", "vase", "frame"] },
    { id: "deco", cat: "deco", en: "Objet", name: "데코 오브제 팩", price: 52000, n: 3,
      desc: "기능은 없지만 방의 인상을 결정하는 것들. 발견의 재미가 가장 큰 팩.",
      pool: ["vase", "frame", "plant", "clock", "mirror", "candle", "book"] }
  ];
  var CATS = [["all", "All"], ["starter", "Starter"], ["furniture", "Furniture"],
              ["home", "Home"], ["light", "Lighting"], ["deco", "Objet"]];

  /* ---------- 상태 ---------- */
  var storeTheme = "modern", activeCat = "all", draws = {};
  function newDraw(p) { draws[p.id] = sample(p.pool, Math.min(p.n, 4)); }
  PACKS.forEach(newDraw);

  /* ---------- 히어로 ---------- */
  function renderHero() {
    var th = themeById[storeTheme];
    var types = sample(["globe", "vase", "stool", "book", "plant", "mirror", "lampshade", "clock", "basket", "pot"], 5);
    $("#heroScene").innerHTML = scene(types, th, 900, 270, false);
  }
  renderHero();

  /* ---------- 랜덤 추첨 패널 ---------- */
  var rollTheme = "modern";
  $("#themeList").innerHTML = THEMES.map(function (t) {
    return '<button class="tbtn" data-t="' + t.id + '" aria-pressed="' + (t.id === rollTheme) + '">' +
      '<span class="sw">' + t.c.map(function (c) { return '<i style="background:' + c + '"></i>'; }).join("") + "</span>" +
      '<span><span class="te">' + t.en + '</span><span class="tn">' + t.ko + "</span></span></button>";
  }).join("");

  $("#themeList").addEventListener("click", function (e) {
    var b = e.target.closest("[data-t]");
    if (!b) return;
    rollTheme = b.dataset.t;
    [].forEach.call(this.children, function (c) { c.setAttribute("aria-pressed", String(c === b)); });
    renderRoll();
  });

  var SLOT_KEYS = [
    ["필수", "생활에 바로 쓰이는 물건"],
    ["취향", "방 색감에 맞춘 오브제"],
    ["발견", "직접 찾지 않았을 물건"],
    ["디지털", "플레이리스트 · 배치 카드"]
  ];

  function renderRoll() {
    var th = themeById[rollTheme];
    $("#rollEn").textContent = th.en;
    $("#rollKo").textContent = th.ko;
    $("#poolN").textContent = th.pool;

    var picks = sample(ALL_TYPES, 3), html = "";
    for (var i = 0; i < 3; i++) {
      html += '<div class="slot anim" style="animation-delay:' + (i * 70) + 'ms">' +
        '<div class="slot-fig">' + scene([picks[i]], th, 120, 64, false) + "</div>" +
        '<span class="sk">' + SLOT_KEYS[i][0] + "</span>" +
        '<span class="sv">' + NAMES[picks[i]] + "</span>" +
        '<span class="sd">' + SLOT_KEYS[i][1] + "</span></div>";
    }
    html += '<div class="slot anim" style="animation-delay:210ms">' +
      '<div class="slot-fig" style="display:grid;place-items:center;color:var(--amber)">' +
      '<svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4">' +
      '<path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg></div>' +
      '<span class="sk">' + SLOT_KEYS[3][0] + '</span><span class="sv">' + th.ko + " 플레이리스트</span>" +
      '<span class="sd">' + SLOT_KEYS[3][1] + "</span></div>";
    $("#slots").innerHTML = html;
  }
  renderRoll();

  $("#rerollBtn").addEventListener("click", function () { renderRoll(); renderHero(); });

  /* ---------- 테마 카드 ---------- */
  $("#themeCards").innerHTML = THEMES.map(function (t) {
    return '<article class="tcard"><div class="band">' +
      t.c.map(function (c) { return '<i style="background:' + c + '"></i>'; }).join("") + "</div>" +
      '<div class="tb"><div class="en">' + t.en + '</div><h4 class="kh">' + t.ko + "</h4>" +
      "<p>" + t.desc + '</p><div class="kw">' + t.kw + " · Pool " + t.pool + "</div></div></article>";
  }).join("");

  /* ---------- 스토어 ---------- */
  $("#tabs").innerHTML = CATS.map(function (c) {
    return '<button class="tab" data-c="' + c[0] + '" aria-pressed="' + (c[0] === "all") + '">' + c[1] + "</button>";
  }).join("");

  $("#tabs").addEventListener("click", function (e) {
    var b = e.target.closest("[data-c]");
    if (!b) return;
    activeCat = b.dataset.c;
    [].forEach.call(this.children, function (c) { c.setAttribute("aria-pressed", String(c === b)); });
    renderGrid();
  });

  $("#tsel").insertAdjacentHTML("beforeend", THEMES.map(function (t) {
    return '<button class="tdot" data-th="' + t.id + '" title="' + t.ko + '" aria-label="' + t.ko + ' 테마" aria-pressed="' + (t.id === storeTheme) + '">' +
      '<i style="background:linear-gradient(135deg,' + t.c[0] + " 0 50%," + t.c[2] + ' 50% 100%)"></i></button>';
  }).join(""));

  $("#tsel").addEventListener("click", function (e) {
    var b = e.target.closest("[data-th]");
    if (!b) return;
    storeTheme = b.dataset.th;
    [].forEach.call(this.querySelectorAll("[data-th]"), function (c) { c.setAttribute("aria-pressed", String(c === b)); });
    PACKS.forEach(newDraw);
    renderGrid();
    renderHero();
  });

  function cardHTML(p) {
    var th = themeById[storeTheme];
    return '<article class="pcard" data-id="' + p.id + '">' +
      '<div class="pfig">' + scene(draws[p.id], th, 400, 300, true) +
        '<span class="rnd"><i></i>Random ' + draws[p.id].length + " / Pool " + p.pool.length * 6 + "</span>" +
        '<button class="reroll" data-re="' + p.id + '" aria-label="다시 뽑기">' +
          '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7">' +
          '<path d="M20 11a8 8 0 1 0-2.3 6.3"/><path d="M20 4v7h-7"/></svg></button>' +
      "</div>" +
      '<div class="pb"><div class="cat">' + p.en + " — " + th.en + '</div><h3 class="kh">' + p.name + "</h3>" +
      '<p class="dsc">' + p.desc + "</p>" +
      '<div class="pool-line">이번 뽑기 — ' + draws[p.id].map(function (t) { return NAMES[t]; }).join(" · ") + "</div>" +
      '<div class="pfoot"><span class="price">' + won(p.price) + "</span>" +
      '<button class="addb" data-add="' + p.id + '">담기</button></div></div></article>';
  }

  function renderGrid() {
    $("#grid").innerHTML = PACKS.filter(function (p) {
      return activeCat === "all" || p.cat === activeCat;
    }).map(cardHTML).join("");
  }
  renderGrid();

  $("#grid").addEventListener("click", function (e) {
    var r = e.target.closest("[data-re]");
    if (r) {
      var p1 = PACKS.filter(function (x) { return x.id === r.dataset.re; })[0];
      newDraw(p1);
      r.closest(".pcard").outerHTML = cardHTML(p1);
      return;
    }
    var a = e.target.closest("[data-add]");
    if (a) {
      var p = PACKS.filter(function (x) { return x.id === a.dataset.add; })[0];
      var th = themeById[storeTheme];
      add({ key: p.id + "|" + storeTheme, name: p.name, opt: th.ko + " 테마",
            price: p.price, types: draws[p.id], theme: storeTheme, rnd: true });
      a.textContent = "담김";
      a.classList.add("ok");
      setTimeout(function () { a.textContent = "담기"; a.classList.remove("ok"); }, 1100);
    }
  });

  $("#rollAdd").addEventListener("click", function () {
    var th = themeById[rollTheme];
    add({ key: "sub|" + rollTheme, name: "월간 구독 · " + th.ko, opt: "스탠다드 · 매달 무작위 4점",
          price: 39900, types: sample(ALL_TYPES, 3), theme: rollTheme, rnd: true });
  });

  [].forEach.call(document.querySelectorAll("[data-plan]"), function (b) {
    b.addEventListener("click", function () {
      add({ key: "plan|" + b.dataset.plan, name: "월간 구독 · " + b.dataset.plan,
            opt: "테마는 결제 후 선택", price: parseInt(b.dataset.price, 10),
            types: sample(ALL_TYPES, 3), theme: storeTheme, rnd: true });
    });
  });

  /* ---------- 장바구니 ---------- */
  var cart = [];
  try {
    var raw = localStorage.getItem("ovs-cart");
    if (raw) cart = JSON.parse(raw) || [];
  } catch (e) { cart = []; }

  function save() { try { localStorage.setItem("ovs-cart", JSON.stringify(cart)); } catch (e) {} }

  function add(it) {
    var f = null;
    for (var i = 0; i < cart.length; i++) { if (cart[i].key === it.key) { f = cart[i]; break; } }
    if (f) { f.qty++; } else { it.qty = 1; cart.push(it); }
    save(); renderCart(); openCart(); toast(it.name + " 담았습니다");
  }

  function renderCart() {
    $("#cartCount").textContent = cart.reduce(function (a, b) { return a + b.qty; }, 0);
    var b = $("#cartBody");
    if (!cart.length) {
      b.innerHTML = '<p class="empty">아직 담긴 것이 없습니다.<br>테마부터 골라보세요.</p>';
    } else {
      b.innerHTML = cart.map(function (c, i) {
        var th = themeById[c.theme] || THEMES[0];
        return '<div class="ci"><div class="th">' + scene((c.types || ["mug"]).slice(0, 2), th, 140, 56, false) + "</div>" +
          '<div><h4 class="kh">' + c.name + '</h4><div class="op">' + (c.opt || "") + "</div>" +
          (c.rnd ? '<div class="rndn">Random contents</div>' : "") +
          '<div class="qty"><button data-d="' + i + '" aria-label="수량 줄이기">−</button><span>' + c.qty +
          '</span><button data-i="' + i + '" aria-label="수량 늘리기">+</button></div></div>' +
          '<div><div class="pp">' + won(c.price * c.qty) + '</div><button class="rm" data-r="' + i + '">삭제</button></div></div>';
      }).join("");
    }
    $("#cartTotal").textContent = won(cart.reduce(function (a, b) { return a + b.price * b.qty; }, 0));
  }

  $("#cartBody").addEventListener("click", function (e) {
    var b = e.target.closest("button");
    if (!b) return;
    if (b.dataset.i !== undefined) { cart[+b.dataset.i].qty++; }
    else if (b.dataset.d !== undefined) {
      var c = cart[+b.dataset.d]; c.qty--;
      if (c.qty < 1) cart.splice(+b.dataset.d, 1);
    } else if (b.dataset.r !== undefined) { cart.splice(+b.dataset.r, 1); }
    save(); renderCart();
  });
  renderCart();

  function openCart() {
    $("#drawer").classList.add("on");
    $("#scrim").classList.add("on");
    $("#drawer").setAttribute("aria-hidden", "false");
  }
  function closeCart() {
    $("#drawer").classList.remove("on");
    $("#scrim").classList.remove("on");
    $("#drawer").setAttribute("aria-hidden", "true");
  }
  $("#cartBtn").addEventListener("click", openCart);
  $("#closeCart").addEventListener("click", closeCart);
  $("#scrim").addEventListener("click", closeCart);
  document.addEventListener("keydown", function (e) { if (e.key === "Escape") closeCart(); });

  $("#checkout").addEventListener("click", function () {
    if (!cart.length) { toast("장바구니가 비어 있습니다"); return; }
    toast("브랜드 콘셉트 데모입니다 — 실제 결제는 진행되지 않습니다");
  });

  $("#nl").addEventListener("submit", function (e) {
    e.preventDefault();
    $("#nlMsg").textContent = "신청되었습니다. 다음 달 첫째 주에 보내드릴게요. (데모)";
    e.target.reset();
  });

  /* ---------- 토스트 ---------- */
  var tt;
  function toast(m) {
    var el = $("#toast");
    el.textContent = m;
    el.classList.add("on");
    clearTimeout(tt);
    tt = setTimeout(function () { el.classList.remove("on"); }, 2300);
  }
})();
