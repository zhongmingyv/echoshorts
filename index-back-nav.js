/**
 * Top-left back control: return to EchoShorts tool hub (index*.html) with ?lang= preserved.
 * Loaded on home / hotel / billiard pages only. Sync INDEX_HTML keys with generate_index.js langs.
 */
(function () {
  var file = (location.pathname.split('/').pop() || '').split('?')[0];
  if (/^index/i.test(file)) return;
  if (!/^home/i.test(file) && !/^hotel/i.test(file) && !/^billiard/i.test(file)) return;

  var INDEX_HTML = {
    'en-US': 'index.html',
    'zh-CN': 'index-zh-CN.html',
    'zh-TW': 'index-zh-TW.html',
    'de-DE': 'index-de-DE.html',
    'es-ES': 'index-es-ES.html',
    'fr-FR': 'index-fr-FR.html',
    'id-ID': 'index-id-ID.html',
    'ja-JP': 'index-ja-JP.html',
    'ko-KR': 'index-ko-KR.html',
    'pt-BR': 'index-pt-BR.html',
    'ru-RU': 'index-ru-RU.html',
    'th-TH': 'index-th-TH.html',
    'vi-VN': 'index-vi-VN.html',
  };

  var HOME_FILE_TO_LANG = {
    'home.html': 'en-US',
    'home-zh.html': 'zh-CN',
    'home-cht.html': 'zh-TW',
    'home-de.html': 'de-DE',
    'home-es.html': 'es-ES',
    'home-fr.html': 'fr-FR',
    'home-id.html': 'id-ID',
    'home-ja.html': 'ja-JP',
    'home-ko.html': 'ko-KR',
    'home-pt.html': 'pt-BR',
    'home-ru.html': 'ru-RU',
    'home-th.html': 'th-TH',
    'home-vi.html': 'vi-VN',
  };

  var ARIA = {
    'en-US': 'Back to tools',
    'zh-CN': '返回工具导航',
    'zh-TW': '返回工具導覽',
    'de-DE': 'Zurück zur Übersicht',
    'es-ES': 'Volver a herramientas',
    'fr-FR': 'Retour aux outils',
    'id-ID': 'Kembali ke alat',
    'ja-JP': 'ツール一覧へ戻る',
    'ko-KR': '도구 목록으로',
    'pt-BR': 'Voltar às ferramentas',
    'ru-RU': 'К списку инструментов',
    'th-TH': 'กลับไปหน้าเครื่องมือ',
    'vi-VN': 'Về trang công cụ',
  };

  function resolveLangFromFile(f) {
    if (HOME_FILE_TO_LANG[f]) return HOME_FILE_TO_LANG[f];
    if (f === 'hotel.html' || f === 'billiard.html') return 'en-US';
    var hm = f.match(/^hotel-(.+)\.html$/i);
    if (hm && INDEX_HTML[hm[1]]) return hm[1];
    var bm = f.match(/^billiard-(.+)\.html$/i);
    if (bm && INDEX_HTML[bm[1]]) return bm[1];
    return null;
  }

  /** Map language switcher option value (e.g. home-ja.html) to hub BCP47 when supported. */
  function langFromChooserOption(optFile) {
    if (!optFile) return null;
    optFile = optFile.replace(/^.*\//, '');
    if (HOME_FILE_TO_LANG[optFile]) return HOME_FILE_TO_LANG[optFile];
    if (optFile === 'hotel.html' || optFile === 'billiard.html') return 'en-US';
    var hm = optFile.match(/^hotel-(.+)\.html$/i);
    if (hm && INDEX_HTML[hm[1]]) return hm[1];
    var bm = optFile.match(/^billiard-(.+)\.html$/i);
    if (bm && INDEX_HTML[bm[1]]) return bm[1];
    return null;
  }

  function hrefForLang(useLang) {
    var indexFile = useLang && INDEX_HTML[useLang] ? INDEX_HTML[useLang] : 'index.html';
    return indexFile + (useLang ? '?lang=' + encodeURIComponent(useLang) : '');
  }

  var qp = new URLSearchParams(window.location.search);
  var ql = qp.get('lang');
  var lang = ql && INDEX_HTML[ql] ? ql : resolveLangFromFile(file);
  var href = hrefForLang(lang);
  var aria = (lang && ARIA[lang]) || ARIA['en-US'];

  var css = document.createElement('style');
  css.textContent =
    '.echo-back-to-index{' +
    'position:fixed;top:14px;left:14px;z-index:10050;' +
    'display:flex;align-items:center;justify-content:center;' +
    'width:40px;height:40px;border-radius:999px;' +
    'background:#1a1a1a;border:1px solid #2a2a2a;color:#e0e0e0;' +
    'text-decoration:none!important;box-shadow:0 4px 14px rgba(0,0,0,.35);' +
    '}' +
    '.echo-back-to-index:hover{border-color:#4ade80;color:#4ade80;}' +
    '.echo-back-to-index svg{width:20px;height:20px;display:block;fill:currentColor;}';
  document.head.appendChild(css);

  var a = document.createElement('a');
  a.className = 'echo-back-to-index';
  a.href = href;
  a.setAttribute('aria-label', aria);
  a.setAttribute('title', aria);
  a.innerHTML =
    '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/></svg>';
  a.addEventListener('click', function (e) {
    if (e.button !== 0 || e.ctrlKey || e.metaKey || e.shiftKey || e.altKey) return;
    e.preventDefault();
    var sel = document.querySelector('.lang-switcher select');
    var useLang = lang;
    if (sel && sel.value) {
      var optFile = sel.value.replace(/^.*\//, '');
      var ls = langFromChooserOption(optFile);
      if (ls) useLang = ls;
    }
    var dest = hrefForLang(useLang);
    var ar = (useLang && ARIA[useLang]) || ARIA['en-US'];
    a.setAttribute('aria-label', ar);
    a.setAttribute('title', ar);
    location.href = dest;
  });
  document.body.appendChild(a);
})();
