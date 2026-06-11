/**
 * EchoShorts static pages: read ?lang=BCP47 from URL and open the matching locale file.
 * Used by home / billiard HTML. (index.html is a redirect; hotel.html handles ?lang= itself.)
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
    var BILLIARD = {
      'en-US': 'billiard.html',
      'zh-CN': 'billiard-zh-CN.html',
      'zh-TW': 'billiard-zh-TW.html',
      'de-DE': 'billiard-de-DE.html',
      'es-ES': 'billiard-es-ES.html',
      'fr-FR': 'billiard-fr-FR.html',
      'id-ID': 'billiard-id-ID.html',
      'ja-JP': 'billiard-ja-JP.html',
      'ko-KR': 'billiard-ko-KR.html',
      'pt-BR': 'billiard-pt-BR.html',
      'ru-RU': 'billiard-ru-RU.html',
      'th-TH': 'billiard-th-TH.html',
      'vi-VN': 'billiard-vi-VN.html',
    };

    var map = null;
    if (/^home/i.test(file)) map = HOME;
    else if (/^billiard/i.test(file)) map = BILLIARD;
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
