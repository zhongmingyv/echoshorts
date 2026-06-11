/**
 * EchoShorts static pages: read ?lang=BCP47 from URL and open the matching locale file.
 * Used by home HTML. (index.html is a redirect; hotel.html and billiard.html handle ?lang= themselves.)
 */
(function () {
  try {
    var params = new URLSearchParams(window.location.search);
    var want = params.get('lang');
    if (!want) return;

    var file = (location.pathname.split('/').pop() || '').split('?')[0];

    var HOME = {
      'en-US': 'home.html',
      'zh-CN': 'home-zh.html',
      'zh-TW': 'home-cht.html',
      'de-DE': 'home-de.html',
      'es-ES': 'home-es.html',
      'fr-FR': 'home-fr.html',
      'id-ID': 'home-id.html',
      'ja-JP': 'home-ja.html',
      'ko-KR': 'home-ko.html',
      'pt-BR': 'home-pt.html',
      'ru-RU': 'home-ru.html',
      'th-TH': 'home-th.html',
      'vi-VN': 'home-vi.html',
    };
    var map = null;
    if (/^home/i.test(file)) map = HOME;
    if (!map) return;

    var target = map[want];
    if (!target) return;
    if (target === file) {
      try {
        history.replaceState(null, '', file);
      } catch (e) {}
      return;
    }
    location.replace(target);
  } catch (e) {}
})();
