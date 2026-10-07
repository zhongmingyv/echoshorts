'use strict';
(function () {
  var LANGS = ['zh', 'cht', 'en', 'ja'];
  var HTML_LANG = { zh: 'zh-CN', cht: 'zh-TW', en: 'en', ja: 'ja' };
  // 激活码后台(license.echoshorts.win)认的语言码,决定结账页与邮件的语言
  var API_LANG = { zh: 'zh', cht: 'zh-TW', en: 'en', ja: 'ja' };
  var API_BASE = 'https://license.echoshorts.win';
  // SLGMServer 的 License:AppId,激活码后台里给 Maker 建的那个 app
  var APP_ID = 'warsim-maker';

  function detectLang() {
    var m = location.search.match(/[?&]lang=([\w-]+)/);
    if (m && LANGS.indexOf(m[1]) >= 0) return m[1];
    var saved = null;
    try { saved = localStorage.getItem('stc-lang'); } catch (e) { /* file:// 或隐私模式下不可用 */ }
    if (saved && LANGS.indexOf(saved) >= 0) return saved;
    var nav = (navigator.language || 'en').toLowerCase();
    if (nav.indexOf('zh') === 0) {
      var trad = nav.indexOf('tw') >= 0 || nav.indexOf('hk') >= 0 || nav.indexOf('mo') >= 0 || nav.indexOf('hant') >= 0;
      return trad ? 'cht' : 'zh';
    }
    if (nav.indexOf('ja') === 0) return 'ja';
    return 'en';
  }

  var cur = detectLang();
  var page = document.body.getAttribute('data-page');

  function T() { return window.I18N[cur]; }

  function withLang(href) {
    var i = href.indexOf('#');
    var base = i < 0 ? href : href.slice(0, i);
    var hash = i < 0 ? '' : href.slice(i);
    return base + '?lang=' + cur + hash;
  }

  function hubHref() {
    return '../index.html?lang=' + (cur === 'zh' || cur === 'cht' ? 'zh' : 'en');
  }

  function renderChrome() {
    var c = T().common, s = T().shop;

    document.getElementById('crowdbar').innerHTML = page === 'buy' ? '' :
      '<div class="crowdfund-bar"><strong>' + s.bar.strong + '</strong>' + s.bar.text +
      '<a class="cta" href="' + withLang('buy.html') + '">' + s.bar.cta + '</a></div>';

    var links = [
      { href: 'index.html', label: c.nav.home, active: page === 'home' },
      { href: 'buy.html', label: s.navBuy, active: page === 'buy' },
      { href: 'terms.html', label: c.nav.terms, active: page === 'terms' },
      { href: 'disclaimer.html', label: c.nav.disclaimer, active: page === 'disclaimer' },
    ];
    var navHtml = '<a class="back" href="' + hubHref() + '">' + s.navBack + '</a><span class="brand">' + c.brand + '</span>';
    for (var i = 0; i < links.length; i++) {
      navHtml += '<a href="' + withLang(links[i].href) + '"' + (links[i].active ? ' class="active"' : '') + '>' +
        links[i].label + '</a>';
    }
    navHtml += '<span class="spacer"></span><select id="lang-select" aria-label="Language">';
    for (var j = 0; j < LANGS.length; j++) {
      navHtml += '<option value="' + LANGS[j] + '"' + (LANGS[j] === cur ? ' selected' : '') + '>' +
        window.I18N[LANGS[j]].langName + '</option>';
    }
    navHtml += '</select>';
    document.getElementById('nav').innerHTML = navHtml;

    document.getElementById('lang-select').addEventListener('change', function () {
      cur = this.value;
      try { localStorage.setItem('stc-lang', cur); } catch (e) { /* 忽略 */ }
      if (history.replaceState) {
        history.replaceState(null, '', location.pathname + '?lang=' + cur + location.hash);
      }
      renderAll();
    });

    document.getElementById('footer').innerHTML =
      '<div><a href="' + withLang('buy.html') + '">' + s.navBuy + '</a> · ' +
      '<a href="' + withLang('terms.html') + '">' + c.nav.terms + '</a> · ' +
      '<a href="' + withLang('disclaimer.html') + '">' + c.nav.disclaimer + '</a></div>' +
      '<div style="margin-top: 8px;">' + c.contactLabel + ': ' +
      '<a href="mailto:supports@echoshorts.win">supports@echoshorts.win</a></div>' +
      '<div style="margin-top: 8px;">' + c.footerCopy + '</div>';
  }

  function renderHome() {
    var h = T().home, b = T().shop.homeBuy;
    var html =
      '<div class="hero">' +
      '<img src="assets/sandtableclub.png" alt="' + h.heroAlt + '">' +
      '<h1>' + h.heroTitle + '</h1>' +
      '<p class="tagline">' + h.tagline + '</p>' +
      '</div>' +
      '<section id="about"><h2>' + h.about.title + '</h2><p>' + h.about.html + '</p>' +
      '<div class="cards" style="margin-top: 20px;">';
    for (var i = 0; i < h.cards.length; i++) {
      var card = h.cards[i];
      html += '<div class="card ' + card.cls + '"><h3>' + card.title + '</h3><p>' + card.text + '</p></div>';
    }
    html += '</div></section>' +
      '<section id="buy"><h2>' + b.secTitle + '</h2><div class="panel">' +
      '<h3>' + b.panelTitle + '</h3><p>' + b.p1 + '</p><ul>';
    for (var j = 0; j < b.items.length; j++) html += '<li>' + b.items[j] + '</li>';
    html += '</ul><a class="btn-gold" href="' + withLang('buy.html') + '">' + b.btn + '</a>' +
      '</div></section>';
    var main = document.getElementById('main');
    main.className = '';
    main.innerHTML = html;
    var meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute('content', h.metaDesc);
  }

  function blockHtml(b) {
    if (b.t === 'p') return '<p>' + b.h + '</p>';
    if (b.t === 'ol' || b.t === 'ul') {
      var lis = '';
      for (var i = 0; i < b.items.length; i++) lis += '<li>' + b.items[i] + '</li>';
      return '<' + b.t + '>' + lis + '</' + b.t + '>';
    }
    if (b.t === 'hl') {
      var ps = '';
      for (var j = 0; j < b.ps.length; j++) ps += '<p>' + b.ps[j] + '</p>';
      return '<div class="highlight">' + ps + '</div>';
    }
    return '';
  }

  function renderLegal(key) {
    var d = T()[key];
    var html = '<h1>' + d.docTitle + '</h1><p class="updated">' + d.updated + '</p><p>' + d.intro + '</p>';
    for (var i = 0; i < d.sections.length; i++) {
      var s = d.sections[i];
      html += '<h2>' + s.title + '</h2>';
      for (var j = 0; j < s.blocks.length; j++) html += blockHtml(s.blocks[j]);
    }
    var main = document.getElementById('main');
    main.className = 'legal';
    main.innerHTML = html;
  }

  // ---- 购买页:与 ../purchase.html 同一套后台接口,只是写死 appid ----
  var appInfo = null;     // { name, price_usd, ... };null = 还没读到 / 读失败
  var appInfoFailed = false;
  var discount = null;    // { code, money } 校验通过的优惠码
  var discountMsg = null; // { key, ok }

  function money(v) {
    try {
      return new Intl.NumberFormat(HTML_LANG[cur], { style: 'currency', currency: 'USD' }).format(v);
    } catch (e) { return 'USD ' + v; }
  }

  function priceHtml() {
    var b = T().shop.buy;
    if (appInfoFailed) return '<span class="err">' + b.loadError + '</span>';
    if (!appInfo) return '…';
    var base = appInfo.price_usd || 0;
    // 后台没填展示价(0)时不显示 $0.00,实价由 Paddle 结账页给出
    if (discount && discount.money !== undefined) {
      return (base > 0 ? '<s>' + money(base) + '</s> ' : '') + '<strong>' + money(discount.money) + '</strong>';
    }
    return base > 0 ? '<strong>' + money(base) + '</strong>' : '<span class="muted">' + b.priceAtCheckout + '</span>';
  }

  function renderBuy() {
    var b = T().shop.buy;
    var emailVal = '', codeVal = '';
    var oldEmail = document.getElementById('buy-email'), oldCode = document.getElementById('buy-code');
    if (oldEmail) emailVal = oldEmail.value;
    if (oldCode) codeVal = oldCode.value;

    var steps = '';
    for (var i = 0; i < b.steps.length; i++) steps += '<li>' + b.steps[i] + '</li>';
    var html =
      '<div class="buy-wrap">' +
      '<div class="buy-card">' +
      '<h1>' + b.h1 + '</h1><p class="lead">' + b.lead + '</p>' +
      '<div class="price-row"><span>' + b.priceLabel + '</span><span id="buy-price">' + priceHtml() + '</span></div>' +
      '<label for="buy-email">' + b.emailLabel + '</label>' +
      '<input id="buy-email" type="email" autocomplete="email" placeholder="' + b.emailPh + '">' +
      '<label for="buy-code">' + b.discountLabel + '</label>' +
      '<div class="code-row"><input id="buy-code" type="text" placeholder="' + b.discountPh + '">' +
      '<button id="buy-apply" type="button">' + b.apply + '</button></div>' +
      '<div id="buy-code-msg" class="code-msg"></div>' +
      '<button id="buy-pay" class="btn-gold pay" type="button">' + b.pay + '</button>' +
      '<div id="buy-err" class="err" style="display:none"></div>' +
      '<p class="fine">' + b.secure + '</p><p class="fine">' + b.agree + '</p>' +
      '</div>' +
      '<div class="buy-side">' +
      '<h2>' + b.howTitle + '</h2><ol>' + steps + '</ol>' +
      '<h2>' + b.noteTitle + '</h2><p>' + b.note + '</p>' +
      '</div></div>';
    var main = document.getElementById('main');
    main.className = 'buy';
    main.innerHTML = html;

    document.getElementById('buy-email').value = emailVal;
    document.getElementById('buy-code').value = codeVal;
    showCodeMsg();
    document.getElementById('buy-apply').addEventListener('click', applyDiscount);
    document.getElementById('buy-pay').addEventListener('click', pay);
    // 链接带 &code=XXX 时自动填上并校验,方便发优惠链接
    var m = location.search.match(/[?&]code=([^&#]+)/);
    if (m && !codeVal) { document.getElementById('buy-code').value = decodeURIComponent(m[1]); applyDiscount(); }
  }

  function showCodeMsg() {
    var el = document.getElementById('buy-code-msg');
    if (!el) return;
    el.className = 'code-msg' + (discountMsg ? (discountMsg.ok ? ' ok' : ' bad') : '');
    el.textContent = discountMsg ? (discountMsg.text || T().shop.buy[discountMsg.key]) : '';
  }

  function refreshPrice() {
    var el = document.getElementById('buy-price');
    if (el) el.innerHTML = priceHtml();
  }

  function loadAppInfo() {
    fetch(API_BASE + '/app-info?appid=' + encodeURIComponent(APP_ID))
      .then(function (r) { if (!r.ok) throw new Error('HTTP ' + r.status); return r.json(); })
      .then(function (d) { appInfo = d; refreshPrice(); })
      .catch(function () { appInfoFailed = true; refreshPrice(); });
  }

  function applyDiscount() {
    var code = document.getElementById('buy-code').value.trim();
    if (!code) { discount = null; discountMsg = null; showCodeMsg(); refreshPrice(); return; }
    var btn = document.getElementById('buy-apply');
    btn.disabled = true;
    fetch(API_BASE + '/check-discount?appid=' + encodeURIComponent(APP_ID) + '&code=' + encodeURIComponent(code))
      .then(function (r) { return r.json(); })
      .then(function (d) {
        if (d.valid) {
          discount = { code: code, money: d.money };
          discountMsg = { key: 'discountOk', ok: true, text: d.priceName || '' };
        } else {
          discount = null;
          var key = { disabled: 'discountOff', exhausted: 'discountUsed' }[d.reason] || 'discountBad';
          discountMsg = { key: key, ok: false };
        }
      })
      .catch(function () { discount = null; discountMsg = { key: 'discountErr', ok: false }; })
      .then(function () { btn.disabled = false; showCodeMsg(); refreshPrice(); });
  }

  function showErr(text) {
    var el = document.getElementById('buy-err');
    el.textContent = text;
    el.style.display = 'block';
  }

  function pay() {
    var b = T().shop.buy;
    var emailEl = document.getElementById('buy-email');
    var email = emailEl.value.trim();
    if (!email || !emailEl.validity.valid) { showErr(b.emailRequired); emailEl.focus(); return; }
    document.getElementById('buy-err').style.display = 'none';
    var code = document.getElementById('buy-code').value.trim() || undefined;
    var btn = document.getElementById('buy-pay');
    btn.disabled = true;
    btn.textContent = b.paying;
    // 支付成功页(../purchase-success.html)不知道买的是哪款软件,在同域里留个记号给它读
    try {
      localStorage.setItem('es-last-purchase', JSON.stringify({ appid: APP_ID, name: T().common.brand, at: Date.now() }));
    } catch (e) { /* 读不到就显示默认文案 */ }
    fetch(API_BASE + '/purchase', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ appid: APP_ID, email: email, discountCode: code, lang: API_LANG[cur] }),
    })
      .then(function (r) { return r.json().then(function (d) { return { ok: r.ok, d: d }; }); })
      .then(function (res) {
        if (res.ok && res.d.checkoutUrl) { location.href = res.d.checkoutUrl; return; }
        throw new Error(res.d.error || res.d.message || '');
      })
      .catch(function (err) {
        showErr(b.payError + (err && err.message ? '（' + err.message + '）' : ''));
        btn.disabled = false;
        btn.textContent = b.pay;
      });
  }

  function renderAll() {
    document.documentElement.lang = HTML_LANG[cur];
    renderChrome();
    if (page === 'home') renderHome();
    else if (page === 'buy') renderBuy();
    else renderLegal(page);
    document.title = page === 'home' ? T().home.title : page === 'buy' ? T().shop.buy.title : T()[page].title;
  }

  renderAll();
  if (page === 'buy') loadAppInfo();
})();
