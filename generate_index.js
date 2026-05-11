#!/usr/bin/env node
/**
 * Generate index.html + index-<locale>.html (tool hub) with language switcher.
 * Run: node generate_index.js
 */
const fs = require('fs');
const path = require('path');

const langs = [
  { code: 'en-US', file: 'index.html', name: 'English', home: 'home.html', hotel: 'hotel.html', billiard: 'billiard.html' },
  { code: 'zh-CN', file: 'index-zh-CN.html', name: '简体中文', home: 'home-zh.html', hotel: 'hotel-zh-CN.html', billiard: 'billiard-zh-CN.html' },
  { code: 'zh-TW', file: 'index-zh-TW.html', name: '繁體中文', home: 'home-cht.html', hotel: 'hotel-zh-TW.html', billiard: 'billiard-zh-TW.html' },
  { code: 'de-DE', file: 'index-de-DE.html', name: 'Deutsch', home: 'home-de.html', hotel: 'hotel-de-DE.html', billiard: 'billiard-de-DE.html' },
  { code: 'es-ES', file: 'index-es-ES.html', name: 'Español', home: 'home-es.html', hotel: 'hotel-es-ES.html', billiard: 'billiard-es-ES.html' },
  { code: 'fr-FR', file: 'index-fr-FR.html', name: 'Français', home: 'home-fr.html', hotel: 'hotel-fr-FR.html', billiard: 'billiard-fr-FR.html' },
  { code: 'id-ID', file: 'index-id-ID.html', name: 'Bahasa Indonesia', home: 'home-id.html', hotel: 'hotel-id-ID.html', billiard: 'billiard-id-ID.html' },
  { code: 'ja-JP', file: 'index-ja-JP.html', name: '日本語', home: 'home-ja.html', hotel: 'hotel-ja-JP.html', billiard: 'billiard-ja-JP.html' },
  { code: 'ko-KR', file: 'index-ko-KR.html', name: '한국어', home: 'home-ko.html', hotel: 'hotel-ko-KR.html', billiard: 'billiard-ko-KR.html' },
  { code: 'pt-BR', file: 'index-pt-BR.html', name: 'Português', home: 'home-pt.html', hotel: 'hotel-pt-BR.html', billiard: 'billiard-pt-BR.html' },
  { code: 'ru-RU', file: 'index-ru-RU.html', name: 'Русский', home: 'home-ru.html', hotel: 'hotel-ru-RU.html', billiard: 'billiard-ru-RU.html' },
  { code: 'th-TH', file: 'index-th-TH.html', name: 'ภาษาไทย', home: 'home-th.html', hotel: 'hotel-th-TH.html', billiard: 'billiard-th-TH.html' },
  { code: 'vi-VN', file: 'index-vi-VN.html', name: 'Tiếng Việt', home: 'home-vi.html', hotel: 'hotel-vi-VN.html', billiard: 'billiard-vi-VN.html' },
];

const t = {
  'en-US': {
    title: 'EchoShorts.Win',
    pageDesc: 'Echo the brilliance in life’s shorts to win eternity.',
    sectionAria: 'Tool entry list',
    playerTitle: 'EchoPShortsPlayer',
    playerDesc: 'Short video player entry for playback and management.',
    hotelDesc: 'Business entry for room and check-in related features.',
    billiardDesc: 'Business entry for table and order operations.',
    openTool: 'Open Tool',
    altPlayer: 'EchoPShortsPlayer',
    altHotel: 'e-hotel',
    altBilliard: 'e-billiard',
    langAria: 'Language',
  },
  'zh-CN': {
    title: 'EchoShorts.Win',
    pageDesc: '让精彩在短视频中回响，赢得永恒。',
    sectionAria: '工具入口列表',
    playerTitle: 'EchoPShortsPlayer',
    playerDesc: '短视频播放与管理入口。',
    hotelDesc: '客房与入住相关业务入口。',
    billiardDesc: '球桌与订单等业务入口。',
    openTool: '打开工具',
    altPlayer: 'EchoPShortsPlayer',
    altHotel: 'e-hotel',
    altBilliard: 'e-billiard',
    langAria: '界面语言',
  },
  'zh-TW': {
    title: 'EchoShorts.Win',
    pageDesc: '讓精彩在短影片中共鳴，贏得永恆。',
    sectionAria: '工具入口列表',
    playerTitle: 'EchoPShortsPlayer',
    playerDesc: '短影片播放與管理入口。',
    hotelDesc: '客房與入住相關業務入口。',
    billiardDesc: '球桌與訂單等業務入口。',
    openTool: '開啟工具',
    altPlayer: 'EchoPShortsPlayer',
    altHotel: 'e-hotel',
    altBilliard: 'e-billiard',
    langAria: '介面語言',
  },
  'de-DE': {
    title: 'EchoShorts.Win',
    pageDesc: 'Das Strahlende in den kurzen Momenten widerhallen lassen — für die Ewigkeit.',
    sectionAria: 'Tool-Übersicht',
    playerTitle: 'EchoPShortsPlayer',
    playerDesc: 'Einstieg zum Kurzvideo-Player: Wiedergabe und Verwaltung.',
    hotelDesc: 'Einstieg für Zimmer- und Check-in-Funktionen.',
    billiardDesc: 'Einstieg für Tisch- und Bestellvorgänge.',
    openTool: 'Öffnen',
    altPlayer: 'EchoPShortsPlayer',
    altHotel: 'e-hotel',
    altBilliard: 'e-billiard',
    langAria: 'Sprache',
  },
  'es-ES': {
    title: 'EchoShorts.Win',
    pageDesc: 'Haz eco del brillo en los cortos de la vida para ganar la eternidad.',
    sectionAria: 'Lista de herramientas',
    playerTitle: 'EchoPShortsPlayer',
    playerDesc: 'Acceso al reproductor de vídeos cortos: reproducción y gestión.',
    hotelDesc: 'Acceso a habitaciones y funciones de check-in.',
    billiardDesc: 'Acceso a mesas y operaciones de pedidos.',
    openTool: 'Abrir',
    altPlayer: 'EchoPShortsPlayer',
    altHotel: 'e-hotel',
    altBilliard: 'e-billiard',
    langAria: 'Idioma',
  },
  'fr-FR': {
    title: 'EchoShorts.Win',
    pageDesc: 'Faire résonner l’éclat des courts moments pour toucher l’éternité.',
    sectionAria: 'Liste des outils',
    playerTitle: 'EchoPShortsPlayer',
    playerDesc: 'Accès au lecteur de courtes vidéos : lecture et gestion.',
    hotelDesc: 'Accès aux chambres et aux fonctions d’enregistrement.',
    billiardDesc: 'Accès aux tables et aux commandes.',
    openTool: 'Ouvrir',
    altPlayer: 'EchoPShortsPlayer',
    altHotel: 'e-hotel',
    altBilliard: 'e-billiard',
    langAria: 'Langue',
  },
  'id-ID': {
    title: 'EchoShorts.Win',
    pageDesc: 'Gema kecemerlangan dalam video pendek hidup untuk meraih keabadian.',
    sectionAria: 'Daftar alat',
    playerTitle: 'EchoPShortsPlayer',
    playerDesc: 'Pintu masuk pemutar video pendek untuk pemutaran dan pengelolaan.',
    hotelDesc: 'Pintu masuk bisnis untuk kamar dan fitur check-in.',
    billiardDesc: 'Pintu masuk bisnis untuk meja dan pesanan.',
    openTool: 'Buka',
    altPlayer: 'EchoPShortsPlayer',
    altHotel: 'e-hotel',
    altBilliard: 'e-billiard',
    langAria: 'Bahasa',
  },
  'ja-JP': {
    title: 'EchoShorts.Win',
    pageDesc: '人生のショートに輝きを響かせ、永遠へ。',
    sectionAria: 'ツール一覧',
    playerTitle: 'EchoPShortsPlayer',
    playerDesc: 'ショート動画の再生・管理への入口。',
    hotelDesc: '客室・チェックイン関連の業務入口。',
    billiardDesc: '卓・オーダーなどの業務入口。',
    openTool: '開く',
    altPlayer: 'EchoPShortsPlayer',
    altHotel: 'e-hotel',
    altBilliard: 'e-billiard',
    langAria: '表示言語',
  },
  'ko-KR': {
    title: 'EchoShorts.Win',
    pageDesc: '삶의 숏폼 속 찬란함을 울려 퍼뜨려 영원으로.',
    sectionAria: '도구 목록',
    playerTitle: 'EchoPShortsPlayer',
    playerDesc: '숏폼 영상 재생 및 관리 진입점.',
    hotelDesc: '객실·체크인 관련 업무 진입점.',
    billiardDesc: '당구대·주문 등 업무 진입점.',
    openTool: '열기',
    altPlayer: 'EchoPShortsPlayer',
    altHotel: 'e-hotel',
    altBilliard: 'e-billiard',
    langAria: '언어',
  },
  'pt-BR': {
    title: 'EchoShorts.Win',
    pageDesc: 'Ecoar o brilho nos curtas da vida para conquistar a eternidade.',
    sectionAria: 'Lista de ferramentas',
    playerTitle: 'EchoPShortsPlayer',
    playerDesc: 'Entrada do player de vídeos curtos: reprodução e gestão.',
    hotelDesc: 'Entrada para quartos e recursos de check-in.',
    billiardDesc: 'Entrada para mesas e operações de pedidos.',
    openTool: 'Abrir',
    altPlayer: 'EchoPShortsPlayer',
    altHotel: 'e-hotel',
    altBilliard: 'e-billiard',
    langAria: 'Idioma',
  },
  'ru-RU': {
    title: 'EchoShorts.Win',
    pageDesc: 'Отразите сияние коротких мгновений жизни — к вечности.',
    sectionAria: 'Список инструментов',
    playerTitle: 'EchoPShortsPlayer',
    playerDesc: 'Вход к плееру коротких видео: воспроизведение и управление.',
    hotelDesc: 'Вход к номерам и функциям заселения.',
    billiardDesc: 'Вход к столам и заказам.',
    openTool: 'Открыть',
    altPlayer: 'EchoPShortsPlayer',
    altHotel: 'e-hotel',
    altBilliard: 'e-billiard',
    langAria: 'Язык',
  },
  'th-TH': {
    title: 'EchoShorts.Win',
    pageDesc: 'สะท้อนความเจิดจ้าในคลิปสั้นของชีวิตสู่นิรันดร์',
    sectionAria: 'รายการเครื่องมือ',
    playerTitle: 'EchoPShortsPlayer',
    playerDesc: 'ทางเข้าเครื่องเล่นวิดีโอสั้น สำหรับเล่นและจัดการ',
    hotelDesc: 'ทางเข้าธุรกิจสำหรับห้องและเช็คอิน',
    billiardDesc: 'ทางเข้าธุรกิจสำหรับโต๊ะและคำสั่งซื้อ',
    openTool: 'เปิด',
    altPlayer: 'EchoPShortsPlayer',
    altHotel: 'e-hotel',
    altBilliard: 'e-billiard',
    langAria: 'ภาษา',
  },
  'vi-VN': {
    title: 'EchoShorts.Win',
    pageDesc: 'Vang vọng điều rực rỡ trong những khoảnh khắc ngắn của đời — hướng tới vĩnh cửu.',
    sectionAria: 'Danh sách công cụ',
    playerTitle: 'EchoPShortsPlayer',
    playerDesc: 'Cổng vào trình phát video ngắn: phát và quản lý.',
    hotelDesc: 'Cổng nghiệp vụ phòng và nhận phòng.',
    billiardDesc: 'Cổng nghiệp vụ bàn và đơn hàng.',
    openTool: 'Mở',
    altPlayer: 'EchoPShortsPlayer',
    altHotel: 'e-hotel',
    altBilliard: 'e-billiard',
    langAria: 'Ngôn ngữ',
  },
};

const makeOptions = (currentCode) =>
  langs
    .map(
      (l) =>
        `      <option value="${l.file}"${l.code === currentCode ? ' selected' : ''}>${l.name}</option>`
    )
    .join('\n');

const template = (langCode, text, links) => `<!DOCTYPE html>
<html lang="${langCode}">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${text.title}</title>
  <style>
    :root {
      --bg: #0f0f0f;
      --card-bg: #1a1a1a;
      --text: #e0e0e0;
      --muted: #999999;
      --primary: #4ade80;
      --border: #2a2a2a;
      --shadow: 0 10px 26px rgba(0, 0, 0, 0.35);
      --radius: 16px;
    }

    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      background: var(--bg);
      color: var(--text);
      line-height: 1.6;
    }

    .lang-switcher {
      max-width: 1080px;
      margin: 0 auto;
      padding: 20px 20px 0;
      display: flex;
      justify-content: flex-end;
    }
    .lang-switcher select {
      background: var(--card-bg);
      border: 1px solid var(--border);
      border-radius: 6px;
      color: var(--text);
      font-size: 12px;
      padding: 5px 8px;
      cursor: pointer;
      outline: none;
    }
    .lang-switcher select:hover {
      border-color: var(--primary);
    }

    .container {
      max-width: 1080px;
      margin: 0 auto;
      padding: 24px 20px 60px;
    }

    .page-title {
      font-size: 32px;
      margin-bottom: 10px;
    }

    .page-desc {
      color: var(--muted);
      margin-bottom: 28px;
      font-size: 15px;
    }

    .tool-grid {
      display: grid;
      grid-template-columns: repeat(3, minmax(0, 1fr));
      gap: 20px;
    }

    .tool-card {
      background: var(--card-bg);
      border: 1px solid var(--border);
      border-radius: var(--radius);
      overflow: hidden;
      box-shadow: var(--shadow);
      display: flex;
      flex-direction: column;
    }

    .tool-image {
      width: 100%;
      height: 220px;
      object-fit: cover;
      background: #141414;
    }

    .tool-body {
      padding: 16px;
      display: flex;
      flex-direction: column;
      gap: 10px;
      flex: 1;
    }

    .tool-title {
      font-size: 20px;
      font-weight: 700;
    }

    .tool-desc {
      font-size: 14px;
      color: var(--muted);
      flex: 1;
    }

    .tool-link {
      display: inline-block;
      align-self: flex-start;
      background: var(--primary);
      color: #0f0f0f;
      text-decoration: none;
      border-radius: 999px;
      padding: 9px 16px;
      font-size: 14px;
      font-weight: 600;
    }

    .tool-link:hover {
      background: #22c55e;
    }

    @media (max-width: 960px) {
      .tool-grid {
        grid-template-columns: repeat(2, minmax(0, 1fr));
      }
    }

    @media (max-width: 640px) {
      .lang-switcher {
        padding: 14px 18px 0;
      }
      .container {
        padding-top: 16px;
      }

      .page-title {
        font-size: 26px;
      }

      .tool-grid {
        grid-template-columns: minmax(0, 1fr);
      }
    }
  </style>
</head>
<body>
  <script src="lang-query.js"></script>
  <div class="lang-switcher">
    <select id="index-lang" onchange="location.href=this.value" aria-label="${text.langAria}">
${makeOptions(langCode)}
    </select>
  </div>
  <main class="container">
    <h1 class="page-title">${text.title}</h1>
    <p class="page-desc">
      ${text.pageDesc}
    </p>

    <section class="tool-grid" aria-label="${text.sectionAria}">
      <article class="tool-card">
        <img class="tool-image" src="echoshortsplayer.png" alt="${text.altPlayer}" />
        <div class="tool-body">
          <h2 class="tool-title">${text.playerTitle}</h2>
          <p class="tool-desc">${text.playerDesc}</p>
          <a class="tool-link" href="${links.home}?lang=${encodeURIComponent(langCode)}">${text.openTool}</a>
        </div>
      </article>

      <article class="tool-card">
        <img class="tool-image" src="ehotel.png" alt="${text.altHotel}" />
        <div class="tool-body">
          <h2 class="tool-title">e-hotel</h2>
          <p class="tool-desc">${text.hotelDesc}</p>
          <a class="tool-link" href="${links.hotel}?lang=${encodeURIComponent(langCode)}">${text.openTool}</a>
        </div>
      </article>

      <article class="tool-card">
        <img class="tool-image" src="ebilliard.png" alt="${text.altBilliard}" />
        <div class="tool-body">
          <h2 class="tool-title">e-billiard</h2>
          <p class="tool-desc">${text.billiardDesc}</p>
          <a class="tool-link" href="${links.billiard}?lang=${encodeURIComponent(langCode)}">${text.openTool}</a>
        </div>
      </article>
    </section>
  </main>
</body>
</html>`;

for (const lang of langs) {
  const text = t[lang.code] || t['en-US'];
  const htmlContent = template(lang.code, text, {
    home: lang.home,
    hotel: lang.hotel,
    billiard: lang.billiard,
  });
  fs.writeFileSync(path.join(__dirname, lang.file), htmlContent);
  console.log('Created ' + lang.file);
}
