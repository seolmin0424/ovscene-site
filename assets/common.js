/* ==========================================================
   OVSCENE — 공통 모듈
   저장소 · 장바구니 · 오브제 SVG · 토스트
   ========================================================== */
window.OVS = window.OVS || {};
(function (OVS) {
  "use strict";

  OVS.$ = function (s, r) { return (r || document).querySelector(s); };
  OVS.$$ = function (s, r) { return [].slice.call((r || document).querySelectorAll(s)); };
  OVS.won = function (n) { return n.toLocaleString("ko-KR") + "원"; };
  OVS.sample = function (arr, n) {
    var c = arr.slice(), o = [];
    while (o.length < n && c.length) o.push(c.splice(Math.floor(Math.random() * c.length), 1)[0]);
    return o;
  };
  OVS.byId = function (id) {
    return OVS.ALL_ITEMS.filter(function (p) { return p.id === id; })[0] || null;
  };
  OVS.styleById = function (id) {
    return OVS.STYLES.filter(function (s) { return s.id === id; })[0] || OVS.STYLES[0];
  };
  OVS.momentById = function (id) {
    return OVS.MOMENTS.filter(function (m) { return m.id === id; })[0] || null;
  };

  /* ---------- 저장소 ---------- */
  OVS.load = function (key, fallback) {
    try {
      var raw = localStorage.getItem("ovs-" + key);
      return raw ? JSON.parse(raw) : fallback;
    } catch (e) { return fallback; }
  };
  OVS.save = function (key, val) {
    try { localStorage.setItem("ovs-" + key, JSON.stringify(val)); } catch (e) {}
  };

  /* ---------- 화면 테마 ---------- */
  var root = document.documentElement;
  try {
    var st = localStorage.getItem("ovs-theme");
    if (st) root.setAttribute("data-theme", st);
  } catch (e) {}

  OVS.initThemeToggle = function () {
    var b = OVS.$("#themeBtn");
    if (!b) return;
    b.addEventListener("click", function () {
      var c = root.getAttribute("data-theme");
      var dark = c ? c === "dark" : matchMedia("(prefers-color-scheme: dark)").matches;
      var n = dark ? "light" : "dark";
      root.setAttribute("data-theme", n);
      try { localStorage.setItem("ovs-theme", n); } catch (e) {}
    });
  };

  /* ---------- 오브제 SVG ---------- */
  function S(type, x, y, sc, c, line) {
    var g = '<g transform="translate(' + x + "," + y + ") scale(" + sc + ')">';
    var st = 'stroke="' + line + '" stroke-width="2" stroke-linejoin="round"';
    var A = c[0], B = c[1], C = c[2], D = c[3];
    switch (type) {
      case "mug": g += '<path d="M-20 -34 h38 v24 a10 10 0 0 1 -10 10 h-18 a10 10 0 0 1 -10 -10 z" fill="' + C + '" ' + st + '/><path d="M18 -26 a11 11 0 0 1 0 18" fill="none" stroke="' + line + '" stroke-width="3.4"/>'; break;
      case "glass": g += '<path d="M-15 -44 h30 l-4 44 h-22 z" fill="' + D + '" opacity=".75" ' + st + '/><path d="M-13 -22 h26" stroke="' + line + '" stroke-width="1.4" opacity=".5"/><circle cx="0" cy="-10" r="7" fill="' + B + '" opacity=".8"/>'; break;
      case "plate": g += '<ellipse cx="0" cy="-5" rx="33" ry="10" fill="' + B + '" ' + st + '/><ellipse cx="0" cy="-16" rx="28" ry="9" fill="' + D + '" ' + st + '/><ellipse cx="0" cy="-26" rx="23" ry="8" fill="' + A + '" ' + st + "/>"; break;
      case "bottle": g += '<path d="M-11 0 h22 v-32 q0 -7 -5 -10 v-12 h-12 v12 q-5 3 -5 10 z" fill="' + A + '" ' + st + '/><rect x="-11" y="-25" width="22" height="13" fill="' + D + '"/>'; break;
      case "towel": g += '<rect x="-26" y="-13" width="52" height="13" rx="5" fill="' + A + '" ' + st + '/><rect x="-23" y="-25" width="46" height="13" rx="5" fill="' + D + '" ' + st + '/><rect x="-20" y="-37" width="40" height="13" rx="5" fill="' + B + '" ' + st + "/>"; break;
      case "tray": g += '<ellipse cx="0" cy="-8" rx="32" ry="11" fill="' + B + '" ' + st + '/><ellipse cx="0" cy="-12" rx="23" ry="7" fill="' + D + '" opacity=".7"/>'; break;
      case "basket": g += '<path d="M-24 -38 h48 l-6 38 h-36 z" fill="' + C + '" ' + st + '/><path d="M-21 -26 h42 M-19 -14 h38" stroke="' + line + '" stroke-width="1.6" opacity=".55"/>'; break;
      case "clock": g += '<circle cx="0" cy="-26" r="25" fill="' + D + '" ' + st + '/><path d="M0 -26 v-13 M0 -26 l10 6" stroke="' + line + '" stroke-width="2.6" stroke-linecap="round"/><rect x="-8" y="-3" width="16" height="6" fill="' + A + '"/>'; break;
      case "speaker": g += '<rect x="-21" y="-46" width="42" height="46" rx="9" fill="' + A + '" ' + st + '/><circle cx="0" cy="-27" r="12" fill="' + D + '" opacity=".85"/><circle cx="0" cy="-27" r="4.5" fill="' + line + '"/><rect x="-9" y="-9" width="18" height="3" rx="1.5" fill="' + D + '" opacity=".7"/>'; break;
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
      case "shelf": g += '<rect x="-32" y="-14" width="64" height="7" fill="' + A + '" ' + st + '/><rect x="-16" y="-40" width="12" height="26" fill="' + B + '" ' + st + '/><circle cx="12" cy="-24" r="10" fill="' + C + '" ' + st + "/>"; break;
    }
    return g + "</g>";
  }
  OVS.shape = S;

  /* 오브제 여러 개를 한 장면으로 */
  OVS.scene = function (types, style, w, h, shelf) {
    w = w || 400; h = h || 300;
    var s = '<svg viewBox="0 0 ' + w + " " + h + '" preserveAspectRatio="xMidYMid meet" aria-hidden="true">';
    var base = h - (shelf ? 46 : 14);
    var n = types.length, gap = w / (n + 1);
    for (var i = 0; i < n; i++) s += S(types[i], gap * (i + 1), base, 1.02, style.c, style.line);
    if (shelf) {
      s += '<rect x="0" y="' + base + '" width="' + w + '" height="9" fill="var(--shelf)"/>';
      s += '<rect x="0" y="' + (base + 9) + '" width="' + w + '" height="4" fill="rgba(0,0,0,.10)"/>';
    }
    return s + "</svg>";
  };

  /* 제품 한 점을 크게 */
  OVS.hero1 = function (type, style, size) {
    size = size || 400;
    return '<svg viewBox="0 0 ' + size + " " + size + '" preserveAspectRatio="xMidYMid meet" aria-hidden="true">' +
      S(type, size / 2, size * 0.72, size / 190, style.c, style.line) +
      '<rect x="0" y="' + (size * 0.72) + '" width="' + size + '" height="8" fill="var(--shelf)"/>' +
      "</svg>";
  };

  /* ---------- 장바구니 ---------- */
  OVS.cart = OVS.load("cart", []);

  OVS.cartCount = function () {
    return OVS.cart.reduce(function (a, b) { return a + b.qty; }, 0);
  };
  OVS.cartTotal = function () {
    return OVS.cart.reduce(function (a, b) { return a + b.price * b.qty; }, 0);
  };
  OVS.addToCart = function (item, qty) {
    qty = qty || 1;
    var f = null;
    for (var i = 0; i < OVS.cart.length; i++) if (OVS.cart[i].id === item.id) { f = OVS.cart[i]; break; }
    if (f) f.qty += qty;
    else OVS.cart.push({ id: item.id, name: item.name, price: item.price, type: item.type, cat: item.cat, qty: qty });
    OVS.save("cart", OVS.cart);
    OVS.syncCart();
  };
  OVS.setQty = function (id, qty) {
    for (var i = 0; i < OVS.cart.length; i++) {
      if (OVS.cart[i].id === id) {
        if (qty < 1) OVS.cart.splice(i, 1);
        else OVS.cart[i].qty = qty;
        break;
      }
    }
    OVS.save("cart", OVS.cart);
    OVS.syncCart();
  };
  OVS.removeFromCart = function (id) {
    OVS.cart = OVS.cart.filter(function (c) { return c.id !== id; });
    OVS.save("cart", OVS.cart);
    OVS.syncCart();
  };
  OVS.clearCart = function () {
    OVS.cart = [];
    OVS.save("cart", OVS.cart);
    OVS.syncCart();
  };
  OVS.syncCart = function () {
    OVS.$$("#cartCount").forEach(function (el) { el.textContent = OVS.cartCount(); });
  };

  /* 배송비: 5만원 이상 무료 */
  OVS.shipping = function (subtotal) {
    return subtotal === 0 || subtotal >= 50000 ? 0 : 3000;
  };

  /* ---------- 취향 프로필 ---------- */
  OVS.profile = OVS.load("profile", null);
  OVS.saveProfile = function (p) { OVS.profile = p; OVS.save("profile", p); };

  /* 프로필 → 제품 매칭 점수 */
  OVS.matchScore = function (item, profile) {
    if (!profile) return 0;
    var s = 0;
    if (item.styles && item.styles.indexOf(profile.style) > -1) s += 40;
    if (profile.moment && item.moments && item.moments.indexOf(profile.moment) > -1) s += 40;
    var b = profile.axes.budget;
    var band = item.price <= 30000 ? 20 : item.price <= 60000 ? 50 : item.price <= 100000 ? 72 : 90;
    s += Math.max(0, 20 - Math.abs(b - band) / 4);
    return Math.round(s);
  };
  OVS.recommend = function (profile, n) {
    if (!profile) return OVS.sample(OVS.PRODUCTS, n || 5);
    return OVS.PRODUCTS.slice()
      .map(function (p) { return { p: p, s: OVS.matchScore(p, profile) }; })
      .sort(function (a, b) { return b.s - a.s; })
      .slice(0, n || 5)
      .map(function (x) { return x.p; });
  };

  /* ---------- 토스트 ---------- */
  var tt;
  OVS.toast = function (msg) {
    var el = OVS.$("#toast");
    if (!el) return;
    el.textContent = msg;
    el.classList.add("on");
    clearTimeout(tt);
    tt = setTimeout(function () { el.classList.remove("on"); }, 2300);
  };

  /* ---------- 뉴스레터(데모) ---------- */
  OVS.initNewsletter = function () {
    var f = OVS.$("#nl");
    if (!f) return;
    f.addEventListener("submit", function (e) {
      e.preventDefault();
      var m = OVS.$("#nlMsg");
      if (m) m.textContent = "신청되었습니다. 다음 달 첫째 주에 보내드릴게요. (데모)";
      f.reset();
    });
  };

  /* ---------- 공통 초기화 ---------- */
  document.addEventListener("DOMContentLoaded", function () {
    OVS.initThemeToggle();
    OVS.initNewsletter();
    OVS.syncCart();
  });
})(window.OVS);
