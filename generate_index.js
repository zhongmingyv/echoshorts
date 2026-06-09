#!/usr/bin/env node
/**
 * Generate index.html + index-<locale>.html (hub: EchoShortsPlayer only) with language switcher.
 * Run: node generate_index.js
 */
const fs = require('fs');
const path = require('path');

const langs = [
  { code: 'en-US', file: 'index.html', name: 'English', home: 'home.html' },
  { code: 'zh-CN', file: 'index-zh-CN.html', name: '简体中文', home: 'home-zh.html' },
  { code: 'zh-TW', file: 'index-zh-TW.html', name: '繁體中文', home: 'home-cht.html' },
  { code: 'de-DE', file: 'index-de-DE.html', name: 'Deutsch', home: 'home-de.html' },
  { code: 'es-ES', file: 'index-es-ES.html', name: 'Español', home: 'home-es.html' },
  { code: 'fr-FR', file: 'index-fr-FR.html', name: 'Français', home: 'home-fr.html' },
  { code: 'id-ID', file: 'index-id-ID.html', name: 'Bahasa Indonesia', home: 'home-id.html' },
  { code: 'ja-JP', file: 'index-ja-JP.html', name: '日本語', home: 'home-ja.html' },
  { code: 'ko-KR', file: 'index-ko-KR.html', name: '한국어', home: 'home-ko.html' },
  { code: 'pt-BR', file: 'index-pt-BR.html', name: 'Português', home: 'home-pt.html' },
  { code: 'ru-RU', file: 'index-ru-RU.html', name: 'Русский', home: 'home-ru.html' },
  { code: 'th-TH', file: 'index-th-TH.html', name: 'ภาษาไทย', home: 'home-th.html' },
  { code: 'vi-VN', file: 'index-vi-VN.html', name: 'Tiếng Việt', home: 'home-vi.html' },
];

const t = {
  'en-US': {
    title: 'EchoShorts.Win',
    pageDesc: 'Echo the brilliance in life’s shorts to win eternity.',
    sectionAria: 'Tool entry list',
    playerTitle: 'EchoShortsPlayer',
    playerDesc: 'Short video player entry for playback and management.',
    openTool: 'Open Tool',
    altPlayer: 'EchoShortsPlayer',
    langAria: 'Language',
  },
  'zh-CN': {
    title: 'EchoShorts.Win',
    pageDesc: '让精彩在短视频中回响，赢得永恒。',
    sectionAria: '工具入口列表',
    playerTitle: 'EchoShortsPlayer',
    playerDesc: '短视频播放与管理入口。',
    openTool: '打开工具',
    altPlayer: 'EchoShortsPlayer',
    langAria: '界面语言',
  },
  'zh-TW': {
    title: 'EchoShorts.Win',
    pageDesc: '讓精彩在短影片中共鳴，贏得永恆。',
    sectionAria: '工具入口列表',
    playerTitle: 'EchoShortsPlayer',
    playerDesc: '短影片播放與管理入口。',
    openTool: '開啟工具',
    altPlayer: 'EchoShortsPlayer',
    langAria: '介面語言',
  },
  'de-DE': {
    title: 'EchoShorts.Win',
    pageDesc: 'Das Strahlende in den kurzen Momenten widerhallen lassen — für die Ewigkeit.',
    sectionAria: 'Tool-Übersicht',
    playerTitle: 'EchoShortsPlayer',
    playerDesc: 'Einstieg zum Kurzvideo-Player: Wiedergabe und Verwaltung.',
    openTool: 'Öffnen',
    altPlayer: 'EchoShortsPlayer',
    langAria: 'Sprache',
  },
  'es-ES': {
    title: 'EchoShorts.Win',
    pageDesc: 'Haz eco del brillo en los cortos de la vida para ganar la eternidad.',
    sectionAria: 'Lista de herramientas',
    playerTitle: 'EchoShortsPlayer',
    playerDesc: 'Acceso al reproductor de vídeos cortos: reproducción y gestión.',
    openTool: 'Abrir',
    altPlayer: 'EchoShortsPlayer',
    langAria: 'Idioma',
  },
  'fr-FR': {
    title: 'EchoShorts.Win',
    pageDesc: 'Faire résonner l’éclat des courts moments pour toucher l’éternité.',
    sectionAria: 'Liste des outils',
    playerTitle: 'EchoShortsPlayer',
    playerDesc: 'Accès au lecteur de courtes vidéos : lecture et gestion.',
    openTool: 'Ouvrir',
    altPlayer: 'EchoShortsPlayer',
    langAria: 'Langue',
  },
  'id-ID': {
    title: 'EchoShorts.Win',
    pageDesc: 'Gema kecemerlangan dalam video pendek hidup untuk meraih keabadian.',
    sectionAria: 'Daftar alat',
    playerTitle: 'EchoShortsPlayer',
    playerDesc: 'Pintu masuk pemutar video pendek untuk pemutaran dan pengelolaan.',
    openTool: 'Buka',
    altPlayer: 'EchoShortsPlayer',
    langAria: 'Bahasa',
  },
  'ja-JP': {
    title: 'EchoShorts.Win',
    pageDesc: '人生のショートに輝きを響かせ、永遠へ。',
    sectionAria: 'ツール一覧',
    playerTitle: 'EchoShortsPlayer',
    playerDesc: 'ショート動画の再生・管理への入口。',
    openTool: '開く',
    altPlayer: 'EchoShortsPlayer',
    langAria: '表示言語',
  },
  'ko-KR': {
    title: 'EchoShorts.Win',
    pageDesc: '삶의 숏폼 속 찬란함을 울려 퍼뜨려 영원으로.',
    sectionAria: '도구 목록',
    playerTitle: 'EchoShortsPlayer',
    playerDesc: '숏폼 영상 재생 및 관리 진입점.',
    openTool: '열기',
    altPlayer: 'EchoShortsPlayer',
    langAria: '언어',
  },
  'pt-BR': {
    title: 'EchoShorts.Win',
    pageDesc: 'Ecoar o brilho nos curtas da vida para conquistar a eternidade.',
    sectionAria: 'Lista de ferramentas',
    playerTitle: 'EchoShortsPlayer',
    playerDesc: 'Entrada do player de vídeos curtos: reprodução e gestão.',
    openTool: 'Abrir',
    altPlayer: 'EchoShortsPlayer',
    langAria: 'Idioma',
  },
  'ru-RU': {
    title: 'EchoShorts.Win',
    pageDesc: 'Отразите сияние коротких мгновений жизни — к вечности.',
    sectionAria: 'Список инструментов',
    playerTitle: 'EchoShortsPlayer',
    playerDesc: 'Вход к плееру коротких видео: воспроизведение и управление.',
    openTool: 'Открыть',
    altPlayer: 'EchoShortsPlayer',
    langAria: 'Язык',
  },
  'th-TH': {
    title: 'EchoShorts.Win',
    pageDesc: 'สะท้อนความเจิดจ้าในคลิปสั้นของชีวิตสู่นิรันดร์',
    sectionAria: 'รายการเครื่องมือ',
    playerTitle: 'EchoShortsPlayer',
    playerDesc: 'ทางเข้าเครื่องเล่นวิดีโอสั้น สำหรับเล่นและจัดการ',
    openTool: 'เปิด',
    altPlayer: 'EchoShortsPlayer',
    langAria: 'ภาษา',
  },
  'vi-VN': {
    title: 'EchoShorts.Win',
    pageDesc: 'Vang vọng điều rực rỡ trong những khoảnh khắc ngắn của đời — hướng tới vĩnh cửu.',
    sectionAria: 'Danh sách công cụ',
    playerTitle: 'EchoShortsPlayer',
    playerDesc: 'Cổng vào trình phát video ngắn: phát và quản lý.',
    openTool: 'Mở',
    altPlayer: 'EchoShortsPlayer',
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
      text-align: center;
    }

    .page-desc {
      color: var(--muted);
      margin-bottom: 28px;
      font-size: 15px;
      text-align: center;
    }

    .tool-grid {
      display: grid;
      grid-template-columns: minmax(0, 400px);
      justify-content: center;
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
        grid-template-columns: minmax(0, 360px);
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
    </section>
  </main>
</body>
</html>`;

for (const lang of langs) {
  const text = t[lang.code] || t['en-US'];
  const htmlContent = template(lang.code, text, {
    home: lang.home,
  });
  fs.writeFileSync(path.join(__dirname, lang.file), htmlContent);
  console.log('Created ' + lang.file);
}
