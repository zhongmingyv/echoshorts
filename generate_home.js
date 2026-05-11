#!/usr/bin/env node
/**
 * Generate translated home-*.html pages from the English home.html template.
 * Run: node generate_home.js
 */
const fs = require('fs');
const path = require('path');
const extensionStepTranslations = require('./extensionStepTranslations.js');
const advantageTranslations = require('./advantageTranslations.js');

const template = fs.readFileSync(path.join(__dirname, 'home.html'), 'utf8');

// Translation data for each language
const langs = {
  'zh': {
    lang: 'zh-CN', file: 'home-zh.html', selected: 'home-zh.html', label: '中文',
    t: {
      title: 'EchoShortsPlayer - AI 视频字幕翻译',
      logo: 'EchoShortsPlayer',
      h1: 'AI 视频翻译与字幕<br><span>边播边译、下载、全程离线</span>',
      heroP: 'EchoShortsPlayer 支持在线视频边播放边实时翻译——字幕随视频同步显示，无需等待。可下载公开可访问的视频供离线观看。所有语音识别和翻译 100% 在本地设备运行：无需网络、无需账号、数据绝不离开您的电脑。支持 99+ 种语言、m3u8 流和 MP4 文件。',
      sec1: '功能特性',
      sec2: '使用方式',
      sec3: '隐私政策与免责声明',
      storeBtn: '从 Microsoft Store 下载',
      // Feature cards
      f1t: '语音识别', f1p: '基于 OpenAI Whisper。支持 99 种语言，自动语言检测。多种模型大小可选，从 tiny（快速）到 large-v3（最高精度）。',
      f2t: 'AI 翻译', f2p: '多种翻译引擎：', f2l1: 'Opus-MT — 快速，9 种语言', f2l2: 'NLLB — 32+ 种语言，任意互译', f2l3: 'Qwen — 最高质量，CJK 优化',
      f3t: '媒体检测', f3p: '自动检测网页上的 m3u8/HLS 流和 MP4 视频链接。通过浏览器扩展一键下载或翻译。',
      f4t: '实时字幕', f4p: '流式翻译模式：字幕在观看时实时显示。无需等待整个视频下载完成。SRT 字幕文件保存在本地供后续使用。',
      f5t: '100% 离线 & 隐私', f5p: '所有处理都在本地完成。不向外部服务器发送任何数据。无需账号、无跟踪、无广告。您的内容留在您的设备上。',
      f6t: '硬件要求', f6p: 'NVIDIA 显卡，8 GB+ 显存，并安装 CUDA 驱动。支持 GPU 加速的语音识别和翻译，获得最佳性能。',
      // Install section
      instTitle: '&#128229; 安装 EchoShortsPlayer', instTag: '必需', instSub: '桌面应用——所有功能的核心引擎',
      instP1: 'EchoShortsPlayer 是在本地运行 AI 模型的桌面应用。浏览器扩展和 CLI 都依赖它。请先安装后再使用下列任何方式。',
      instDlBtn: '下载 EchoShortsPlayer',
      instReq: '<strong>系统要求：</strong>Windows 10/11，NVIDIA 显卡 8 GB+ 显存，已安装 CUDA 驱动。',
      instAfter: '安装后启动应用。它会在 <code>localhost:18632</code> 启动本地后端服务器，扩展和 CLI 都通过它通信。',
      // Extension
      extTitle: '&#128268; Chrome 扩展', extTag: '推荐', extSub: '深度网络级媒体拦截',
      extP1: 'Chrome 扩展使用 <code>webRequest</code> API 在浏览器层面拦截所有网络请求，检测 m3u8/HLS 流、MP4 文件和其他媒体格式。还会扫描页面 DOM 中的视频元素 and 下载链接。',
      extInstTitle: '<strong>安装（开发者模式）：</strong>',
      extDlBtn: '下载扩展 (.zip)',
      extI1: '下载上方的扩展 zip 文件并解压到一个文件夹中。',
      extI2: '打开 Chrome，导航到 <code>chrome://extensions/</code>。',
      extI3: '启用 <strong>开发者模式</strong>（右上角开关）。',
      extI4: '点击 <strong>加载已解压的扩展程序</strong>，选择 <code>m3u8-extension</code> 文件夹。',
      extI5: '扩展图标出现在工具栏中，徽章显示检测到的媒体数量。',
      extUseTitle: '<strong>使用方法：</strong>',
      extU1: '浏览包含视频内容的页面。',
      extU2: '点击扩展图标查看检测到的 m3u8/MP4 流。',
      extU3: '点击 <strong>下载</strong> 保存为本地 MP4，或点击 <strong>翻译</strong> 开始生成字幕。',
      extU4: '悬停在项目上可高亮页面中对应的视频元素。',
      extAdvTitle: '为什么使用扩展？',
      extAdv1: '在浏览器层面拦截网络请求——捕获 DOM 扫描遗漏的流',
      extAdv2: '自动质量选择：按视频 ID 分组并选择最佳质量',
      extAdv3: 'Referer 头注入，播放需要认证的流',
      extAdv4: '徽章计数器一目了然显示每个标签页检测到的媒体数量',
      extAdv5: '更深度的检测：可 hook fetch、XHR、MediaSource 并扫描响应体',
      // CLI
      cliTitle: '&#128187; 命令行工具', cliTag: '高级用户', cliSub: '自动化、批处理和脚本集成',
      cliP1: 'CLI 提供从终端直接访问所有下载 and 翻译功能。专为需要批量处理视频、自动化工作流或与其他工具集成的高级用户设计。',
      cliCmds: '<strong>可用命令：</strong>',
      cliParams: '<strong>参数参考：</strong>',
      cliParamsPre: `--source, -s      源语言或 "auto"（默认：auto）
--target, -t      目标语言（默认：zh）
--whisper, -w     tiny|base|small|medium|distil-large-v3|large-v3
--translation, -m opus-mt|nllb-distilled-600M|nllb-1.3B|nllb-3.3B|qwen2.5-3b|qwen3-8b
--denoise, -d     off|light|vocal（默认：off）
--mode            serial|parallel（默认：serial）
--output, -o      输出文件路径
--url             媒体 URL（m3u8 / MP4）
--referer         Referer 请求头`,
      cliLangLink: '查看 <code>--source</code> 和 <code>--target</code> 支持的完整语言代码列表：<a href="language-codes.html">语言代码参考</a>',
      cliC1: '# 将本地视频翻译为中文字幕', cliC2: '# 批量翻译整个文件夹', cliC3: '# 全部参数：源语言、Whisper 模型、翻译引擎、降噪、处理模式', cliC4: '# 下载远程 m3u8 或 MP4', cliC5: '# 一步完成下载和翻译', cliC6: '# 翻译已有的 SRT 文件',
      cliAdvTitle: '为什么使用 CLI？',
      cliAdv1: '批量处理：一条命令翻译数百个视频',
      cliAdv2: '可脚本化：集成到 shell 脚本、定时任务或 CI/CD 管道',
      cliAdv3: '完全控制模型：选择 Whisper 模型大小、翻译引擎、降噪模式',
      cliAdv4: '无 GUI 开销：适合服务器、无头设备或远程 SSH 会话',
      cliAdv5: '支持串行（省内存）和并行（快速）处理模式',
      // Privacy
      pr1t: '本地数据处理', pr1p1: 'EchoShortsPlayer 的所有核心功能——包括语音识别、翻译和媒体下载——完全在您的本地设备上运行，由本地后端服务器（127.0.0.1:18632）驱动。', pr1p2: '我们不收集、存储、传输或分析任何用户数据，包括但不限于：您观看的视频内容、识别的字幕文本、翻译结果、浏览历史或任何个人信息。',
      pr2t: '无网络数据传输', pr2p1: '本应用在正常使用期间不会向外部服务器发送任何用户数据。所有音频处理和文本翻译都在本地完成。AI 模型首次使用时从公开来源（HuggingFace）下载，此后可完全离线运行。', pr2p2: '浏览器扩展仅与本地后端 <code>localhost:18632</code> 通信。不向开发者运营的任何远程服务器传输数据。',
      pr3t: '无广告、无跟踪、无推荐', pr3p: '本应用不包含任何广告系统、用户行为跟踪代码、分析工具或数据推荐机制。我们不与任何第三方共享用户数据，也不根据用户行为创建画像或推送内容。',
      pr4t: '开源透明', pr4p: '应用的源代码，包括 Chrome 扩展和后端管道，完全开放供检查。鼓励用户审查代码以验证本政策中的隐私和安全声明。',
      pr5t: '安全港与用户责任', pr5p1: 'EchoShortsPlayer 是一款通用技术工具，仅旨在帮助用户理解视频内容。根据安全港原则，本应用的开发者和发布者对用户访问、翻译或处理的任何内容不承担版权侵权或其他法律责任。', pr5p2: '用户必须确保其使用符合当地法律法规以及所访问平台的服务条款。因访问受版权保护的内容、违反平台规则或使用本应用从事任何非法活动而产生的所有法律责任由用户自行承担。', pr5p3: '本应用不对用户访问的内容的合法性做出判断或保证，也不承担因使用本应用而产生的任何直接或间接损失。',
      pr6t: '预期用途', pr6p: '本应用被定义为辅助工具，仅供听力障碍人士、语言学习者或需要理解外语视频内容的个人本地使用。任何其他用途由用户自行负责。',
      pr7t: '技术限制', pr7p1: '本应用支持分析未受数字版权管理（DRM）保护的公开可访问视频内容。由于版权保护协议（如 Widevine、PlayReady 等）의 제한으로 DRM 보호 내용의 오디오 스트림은 추출할 수 없어 자막 생성이 불가능할 수 있습니다.', pr7p2: '对于非"fast-start"编码的 MP4 文件（moov 原子在文件尾部），应用需要完整下载后才能开始翻译。Fast-start MP4 文件支持边下载边翻译。',
      pr8t: '免责声明', pr8p1: '本应用按"原样"提供，不作任何明示或暗示的保证。开发者不保证本应用在所有环境中均能正确运行，也不承担因使用本应用造成的任何损失、数据丢失或设备问题。使用本应用即表示接受上述所有条款。', pr8p2: '本应用提供的字幕和翻译由机器自动生成，仅供参考。开发者不对机器翻译内容的准确性、完整性或适用性做出任何保证，也不承担因依赖此类翻译而产生的任何后果。',
      pr9t: '政策更新', pr9p: '本隐私政策可能随新版本更新。重大变更将通过应用更新日志通知。继续使用本应用即表示接受最新版本的隐私政策。',
      footer: '&copy; 2025 EchoShortsPlayer. 保留所有权利。',
      contact: '联系我们',
    }
  },
  'cht': {
    lang: 'zh-TW', file: 'home-cht.html', selected: 'home-cht.html', label: '繁體中文',
    t: {
      title: 'EchoShortsPlayer - AI 影片字幕翻譯',
      logo: 'EchoShortsPlayer',
      h1: 'AI 影片翻譯與字幕<br><span>邊播邊譯、下載、全程離線</span>',
      heroP: 'EchoShortsPlayer 支援線上影片邊播放邊即時翻譯——字幕隨影片同步顯示，無需等待。可下載公開可存取的影片供離線觀看。所有語音辨識和翻譯 100% 在本機裝置執行：無需網路、無需帳號、資料絕不離開您的電腦。支援 99+ 種語言、m3u8 串流和 MP4 檔案。',
      sec1: '功能特性', sec2: '使用方式', sec3: '隱私政策與免責聲明',
      storeBtn: '從 Microsoft Store 下載',
      f1t: '語音辨識', f1p: '基於 OpenAI Whisper。支援 99 種語言，自動語言偵測。多種模型大小可選，從 tiny（快速）到 large-v3（最高精度）。',
      f2t: 'AI 翻譯', f2p: '多種翻譯引擎：', f2l1: 'Opus-MT — 快速，9 種語言', f2l2: 'NLLB — 32+ 種語言，任意互譯', f2l3: 'Qwen — 最高品質，CJK 最佳化',
      f3t: '媒體偵測', f3p: '自動偵測網頁上的 m3u8/HLS 串流和 MP4 影片連結。透過瀏覽器擴充功能一鍵下載或翻譯。',
      f4t: '即時字幕', f4p: '串流翻譯模式：字幕在觀看時即時顯示。無需等待整部影片下載完成。SRT 字幕檔案儲存在本機供後續使用。',
      f5t: '100% 離線 & 隱私', f5p: '所有處理都在本機完成。不向外部伺服器傳送任何資料。無需帳號、無追蹤、無廣告。您的內容留在您的裝置上。',
      f6t: '硬體需求', f6p: 'NVIDIA 顯示卡，8 GB+ 視訊記憶體，並安裝 CUDA 驅動程式。支援 GPU 加速的語音辨識和翻譯，獲得最佳效能。',
      instTitle: '&#128229; 安裝 EchoShortsPlayer', instTag: '必需', instSub: '桌面應用——所有功能的核心引擎',
      instP1: 'EchoShortsPlayer 是在本機執行 AI 模型的桌面應用。瀏覽器擴充功能和 CLI 都依賴它。請先安裝後再使用下列任何方式。',
      instDlBtn: '下載 EchoShortsPlayer',
      instReq: '<strong>系統需求：</strong>Windows 10/11，NVIDIA 顯示卡 8 GB+ 視訊記憶體，已安裝 CUDA 驅動程式。',
      instAfter: '安裝後啟動應用。它會在 <code>localhost:18632</code> 啟動本機後端伺服器，擴充功能和 CLI 都透過它通訊。',
      extTitle: '&#128268; Chrome 擴充功能', extTag: '推薦', extSub: '深度網路級媒體攔截',
      extP1: 'Chrome 擴充功能使用 <code>webRequest</code> API 在瀏覽器層面攔截所有網路請求，偵測 m3u8/HLS 串流、MP4 檔案和其他媒體格式。還會掃描頁面 DOM 中的影片元素和下載連結。',
      extInstTitle: '<strong>安裝（開發者模式）：</strong>',
      extDlBtn: '下載擴充功能 (.zip)',
      extI1: '下載上方的擴充功能 zip 檔案並解壓縮到一個資料夾中。', extI2: '開啟 Chrome，導覽至 <code>chrome://extensions/</code>。', extI3: '啟用 <strong>開發者模式</strong>（右上角切換）。', extI4: '點擊 <strong>載入未封裝項目</strong>，選擇 <code>m3u8-extension</code> 資料夾。', extI5: '擴充功能圖示出現在工具列中，徽章顯示偵測到的媒體數量。',
      extUseTitle: '<strong>使用方式：</strong>',
      extU1: '瀏覽含有影片內容的頁面。', extU2: '點擊擴充功能圖示查看偵測到的 m3u8/MP4 串流。', extU3: '點擊 <strong>下載</strong> 儲存為本機 MP4，或點擊 <strong>翻譯</strong> 開始產生字幕。', extU4: '懸停在項目上可高亮顯示頁面中對應的影片元素。',
      extAdvTitle: '為什麼使用擴充功能？', extAdv1: '在瀏覽器層面攔截網路請求——捕獲 DOM 掃描遺漏的串流', extAdv2: '自動品質選擇：按影片 ID 分組並選擇最佳品質', extAdv3: 'Referer 標頭注入，播放需要驗證的串流', extAdv4: '徽章計數器一目了然顯示每個分頁偵測到的媒體數量', extAdv5: '更深度的偵測：可 hook fetch、XHR、MediaSource 並掃描回應本體',
      cliTitle: '&#128187; 命令列工具', cliTag: '進階使用者', cliSub: '自動化、批次處理和腳本整合',
      cliP1: 'CLI 提供從終端直接存取所有下載 and 翻譯功能。專為需要批次處理影片、自動化工作流程或與其他工具整合的進階使用者設計。',
      cliCmds: '<strong>可用命令：</strong>',
      cliParams: '<strong>參數參考：</strong>',
      cliParamsPre: `--source, -s      來源語言或 "auto"（預設：auto）
--target, -t      目標語言（預設：zh）
--whisper, -w     tiny|base|small|medium|distil-large-v3|large-v3
--translation, -m opus-mt|nllb-distilled-600M|nllb-1.3B|nllb-3.3B|qwen2.5-3b|qwen3-8b
--denoise, -d     off|light|vocal（預設：off）
--mode            serial|parallel（預設：serial）
--output, -o      輸出檔案路徑
--url             媒體 URL（m3u8 / MP4）
--referer         Referer 請求標頭`,
      cliLangLink: '查看 <code>--source</code> 和 <code>--target</code> 支援的完整語言代碼列表：<a href="language-codes.html">語言代碼參考</a>',
      cliC1: '# 將本機影片翻譯為中文字幕', cliC2: '# 批次翻譯整個資料夾', cliC3: '# 全部參數：來源語言、Whisper 模型、翻譯引擎、降噪、處理模式', cliC4: '# 下載遠端 m3u8 或 MP4', cliC5: '# 一步完成下載 and 翻譯', cliC6: '# 翻譯已有的 SRT 檔案',
      cliAdvTitle: '為什麼使用 CLI？', cliAdv1: '批次處理：一條命令翻譯數百部影片', cliAdv2: '可腳本化：整合到 shell 腳本、排程工作或 CI/CD 管線', cliAdv3: '完全控制模型：選擇 Whisper 模型大小、翻譯引擎、降噪模式', cliAdv4: '無 GUI 開銷：適合伺服器、無頭裝置或遠端 SSH 工作階段', cliAdv5: '支援序列（省記憶體）和平行（快速）處理模式',
      pr1t: '本機資料處理', pr1p1: 'EchoShortsPlayer 的所有核心功能——包括語音辨識、翻譯和媒體下載——完全在您的本機裝置上執行，由本機後端伺服器（127.0.0.1:18632）驅動。', pr1p2: '我們不收集、儲存、傳送或分析任何使用者資料。',
      pr2t: '無網路資料傳輸', pr2p1: '本應用在正常使用期間不會向外部伺服器傳送任何使用者資料。所有音訊處理和文字翻譯都在本機完成。', pr2p2: '瀏覽器擴充功能僅與本機後端 <code>localhost:18632</code> 通訊。',
      pr3t: '無廣告、無追蹤、無推薦', pr3p: '本應用不包含任何廣告系統、使用者行為追蹤程式碼、分析工具或資料推薦機制。',
      pr4t: '開源透明', pr4p: '應用的原始碼完全開放供檢查。鼓勵使用者審查程式碼以驗證本政策中的隱私和安全聲明。',
      pr5t: '安全港與使用者責任', pr5p1: 'EchoShortsPlayer 是一款通用技術工具，僅旨在協助使用者理解影片內容。開發者和發佈者不對使用者存取、翻譯或處理的任何內容承擔法律責任。', pr5p2: '使用者必須確保其使用符合當地法律法規以及所存取平台的服務條款。', pr5p3: '本應用不對使用者存取的內容的合法性做出判斷或保證。',
      pr6t: '預期用途', pr6p: '本應用被定義為輔助工具，僅供聽力障礙人士、語言學習者或需要理解外語影片內容的個人本機使用。',
      pr7t: '技術限制', pr7p1: '本應用支援分析未受 DRM 保護的公開可存取影片內容。', pr7p2: '對於非 fast-start 編碼的 MP4 檔案，應用需要完整下載後才能開始翻譯。',
      pr8t: '免責聲明', pr8p1: '本應用按「原樣」提供，不作任何明示或暗示的保證。', pr8p2: '字幕和翻譯由機器自動產生，僅供參考。',
      pr9t: '政策更新', pr9p: '本隱私政策可能隨新版本更新。繼續使用本應用即表示接受最新版本的隱私政策。',
      footer: '&copy; 2025 EchoShortsPlayer. 保留所有權利。', contact: '聯絡我們',
    }
  },
};

// --- Privacy policy translation data per language ---
// Loaded from privacy/*.js (one file may contain multiple languages).
const privacyData = (() => {
  const dir = path.join(__dirname, 'privacy');
  const merged = {};
  if (fs.existsSync(dir)) {
    for (const f of fs.readdirSync(dir)) {
      if (!f.endsWith('.js')) continue;
      try {
        const mod = require(path.join(dir, f));
        Object.assign(merged, mod);
      } catch (e) {
        console.warn(`[privacy] failed to load ${f}: ${e.message}`);
      }
    }
  }
  return merged;
})();

function privacyBlock(p) {
  return p.sections.map(s => {
    const ps = s.paragraphs.map(t => `        <p>${t}</p>`).join('\n');
    return `      <div class="priv-section">\n        <h3>${s.title}</h3>\n${ps}\n      </div>`;
  }).join('\n\n');
}

/**
 * Replace the entire <div class="privacy">...</div> wrapper (right before
 * </main>), the #3 section title, the footer copyright line and the
 * "Contact Us" link with the localised text from privacyData[langKey].
 * Tolerant of CRLF/LF line endings.
 */
function applyPrivacyBlock(html, langKey) {
  const priv = privacyData[langKey];
  if (!priv) return html;

  // 1) Replace the entire privacy wrapper div content. Use a non-greedy match
  // that is anchored to the trailing </main> so we only swap the wrapper's
  // closing </div>, not any nested priv-section </div>.
  const wrapperRe = /<div class="privacy">[\s\S]*?<\/div>(\s*<\/main>)/;
  if (wrapperRe.test(html)) {
    html = html.replace(
      wrapperRe,
      `<div class="privacy">\r\n\r\n${privacyBlock(priv)}\r\n    </div>$1`
    );
  }

  // 2) Replace the "#3 Privacy Policy & Disclaimer" section title (English
  // template). Languages that already translated this earlier won't match.
  if (priv.secTitle) {
    html = html.replace(
      '<span class="num">#3</span> Privacy Policy &amp; Disclaimer',
      `<span class="num">#3</span> ${priv.secTitle}`
    );
  }

  // 3) Footer copyright + Contact Us link.
  if (priv.footer) {
    html = html.replace(
      '&copy; 2025 EchoShortsPlayer. All rights reserved.',
      priv.footer
    );
  }
  if (priv.contact) {
    html = html.replace('>Contact Us<', `>${priv.contact}<`);
  }

  return html;
}

/** Replace "Why use the extension/CLI?" h4 titles and advantage <li> bullets. */
function applyAdvantages(html, advT) {
  if (!advT) return html;
  if (advT.extAdvTitle) {
    html = html.replace('Why use the extension?', advT.extAdvTitle);
  }
  if (advT.cliAdvTitle) {
    html = html.replace('Why use the CLI?', advT.cliAdvTitle);
  }
  const extEN = [
    'Intercepts network requests at the browser level &mdash; catches streams that DOM scanning misses',
    'Automatic quality selection: groups variants by video ID and picks the best quality',
    'Referer header injection for playing streams that require authentication',
    'Badge counter shows detected media count per tab at a glance',
  ];
  for (let i = 0; i < extEN.length; i++) {
    const key = 'extAdv' + (i + 1);
    if (advT[key]) {
      html = html.replace(`<li>${extEN[i]}</li>`, `<li>${advT[key]}</li>`);
    }
  }
  const cliEN = [
    'Batch processing: translate hundreds of videos with a single command',
    'Scriptable: integrate into shell scripts, cron jobs, or CI/CD pipelines',
    'Full control over models: choose Whisper model size, translation engine, denoising mode',
    'No GUI overhead: ideal for servers, headless machines, or remote SSH sessions',
    'Supports both serial (memory-efficient) and parallel (fast) processing modes',
  ];
  for (let i = 0; i < cliEN.length; i++) {
    const key = 'cliAdv' + (i + 1);
    if (advT[key]) {
      html = html.replace(`<li>${cliEN[i]}</li>`, `<li>${advT[key]}</li>`);
    }
  }
  return html;
}

/** Replace Chrome extension install/usage <li> blocks (English template → extT). */
function applyExtensionInstallUsage(html, extT) {
  if (!extT || !extT.extI1) return html;
  return html
    .replace('<li>Download the extension zip above and extract it to a folder.</li>', `<li>${extT.extI1}</li>`)
    .replace('<li>Open Chrome and navigate to <code>chrome://extensions/</code>.</li>', `<li>${extT.extI2}</li>`)
    .replace('<li>Enable <strong>Developer mode</strong> (top-right toggle).</li>', `<li>${extT.extI3}</li>`)
    .replace('<li>Click <strong>Load unpacked</strong> and select the <code>m3u8-extension</code> folder.</li>', `<li>${extT.extI4}</li>`)
    .replace('<li>The extension icon appears in the toolbar with a badge showing detected media count.</li>', `<li>${extT.extI5}</li>`)
    .replace('<li>Browse to any page with video content.</li>', `<li>${extT.extU1}</li>`)
    .replace('<li>Click the extension icon to see detected m3u8/MP4 streams.</li>', `<li>${extT.extU2}</li>`)
    .replace('<li>Click <strong>Download</strong> to save to local MP4, or <strong>Translate</strong> to start subtitle generation.</li>', `<li>${extT.extU3}</li>`)
    .replace('<li>Hover over items to highlight the corresponding video element on the page.</li>', `<li>${extT.extU4}</li>`);
}

// --- Build function for fully translated languages (zh, cht) ---
function buildTranslated(key, data) {
  const t = data.t;
  const file = data.file;

  let html = template
    .replace('lang="en"', `lang="${data.lang}"`)
    .replace(/<title>.*?<\/title>/, `<title>${t.title}</title>`)
    .replace(`<option value="home.html" selected>English</option>`, `<option value="home.html">English</option>`)
    .replace(`<option value="${file}">${data.label}</option>`, `<option value="${file}" selected>${data.label}</option>`)
    .replace('AI Video Translation &amp; Subtitles<br><span>Stream, Translate, Download &mdash; All Offline</span>', t.h1)
    .replace(/EchoShortsPlayer translates online videos.*?m3u8 streams and MP4 files\./s, t.heroP)
    .replace('<span class="num">#1</span> Features', `<span class="num">#1</span> ${t.sec1}`)
    .replace('<span class="num">#2</span> How to Use', `<span class="num">#2</span> ${t.sec2}`)
    .replace('<span class="num">#3</span> Privacy Policy &amp; Disclaimer', `<span class="num">#3</span> ${t.sec3}`)
    .replace('>Download from Microsoft Store<', `>${t.storeBtn}<`)
    .replace('>Speech Recognition<', `>${t.f1t}<`).replace(/Powered by OpenAI Whisper\. Supports 99 languages.*?highest accuracy\)\./, t.f1p)
    .replace('>AI Translation<', `>${t.f2t}<`).replace('Multiple translation engines:', t.f2p)
    .replace('Opus-MT &mdash; fast, 9 languages', t.f2l1).replace('NLLB &mdash; 32+ languages, any-to-any', t.f2l2).replace('Qwen &mdash; best quality, CJK-optimized', t.f2l3)
    .replace('>Media Detection<', `>${t.f3t}<`).replace(/Automatically detects m3u8\/HLS.*?extension\./, t.f3p)
    .replace('>Real-time Subtitles<', `>${t.f4t}<`).replace(/Stream translation mode.*?future use\./, t.f4p)
    .replace('>100% Offline &amp; Private<', `>${t.f5t}<`).replace(/All processing happens locally.*?on your device\./, t.f5p)
    .replace('>Hardware Requirements<', `>${t.f6t}<`).replace(/NVIDIA GPU with 8 GB\+.*?optimal performance\./, t.f6p)
    .replace(/Install EchoShortsPlayer <span class="tag">Required/, `${t.instTitle.replace(/&#\d+; /, '')} <span class="tag">${t.instTag}`)
    .replace('Desktop application &mdash; the core engine for all features', t.instSub)
    .replace(/EchoShortsPlayer is the desktop application.*?methods below\./, t.instP1)
    .replace('>Download EchoShortsPlayer<', `>${t.instDlBtn}<`)
    .replace(/<p><strong>System requirements:<\/strong>.*?installed\.<\/p>/, `<p>${t.instReq}</p>`)
    .replace(/<p>After installation, launch the application\..*?communicate with\.<\/p>/, `<p>${t.instAfter}</p>`)
    .replace('Chrome Extension <span class="tag">Recommended', `${t.extTitle.replace(/&#\d+; /, '')} <span class="tag">${t.extTag}`)
    .replace('Deep network-level media interception', t.extSub)
    .replace(/The Chrome extension uses the.*?download links\./, t.extP1)
    .replace('<strong>Installation (developer mode):</strong>', t.extInstTitle)
    .replace('>Download Extension (.zip)<', `>${t.extDlBtn}<`)
    .replace('<strong>Usage:</strong>', t.extUseTitle)
    .replace('Command-Line Interface <span class="tag">Power Users', `${t.cliTitle.replace(/&#\d+; /, '')} <span class="tag">${t.cliTag}`)
    .replace('Automation, batch processing, and scripting', t.cliSub)
    .replace(/The CLI provides direct access.*?other tools\./, t.cliP1)
    .replace('<strong>Available commands:</strong>', t.cliCmds)
    .replace('# Translate a local video file to Chinese subtitles', t.cliC1)
    .replace('# Batch translate an entire folder', t.cliC2)
    .replace('# Full options: source language, whisper model, translation engine, denoising, processing mode', t.cliC3)
    .replace('# Download a remote m3u8 or MP4', t.cliC4)
    .replace('# Download and translate in one step', t.cliC5)
    .replace('# Translate an existing SRT file', t.cliC6);

  // CLI params
  if (t.cliParams) {
    html = html.replace('<strong>Parameter reference:</strong>', t.cliParams);
  }
  if (t.cliParamsPre) {
    html = html.replace(/--source, -s[\s\S]*?--referer\s+[^\n]+/, t.cliParamsPre.trim());
    html = html.replace(/See the full list of supported language codes[\s\S]*?Language Code Reference<\/a>/, t.cliLangLink);
  }

  html = applyExtensionInstallUsage(html, t);
  html = applyAdvantages(html, t);
  html = applyPrivacyBlock(html, key);
  html = applyPrivacySupportLine(html, key);

  fs.writeFileSync(path.join(__dirname, file), html, 'utf8');
}

// --- Store button translations for all languages ---
const storeBtnTranslations = {
  'ja': 'Microsoft Store からダウンロード',
  'ko': 'Microsoft Store에서 다운로드',
  'es': 'Descargar de Microsoft Store',
  'fr': 'Télécharger depuis le Microsoft Store',
  'de': 'Aus dem Microsoft Store herunterladen',
  'ru': 'Скачать из Microsoft Store',
  'pt': 'Baixar da Microsoft Store',
  'ar': 'تحميل من Microsoft Store',
  'hi': 'Microsoft Store से डाउनलोड करें',
  'th': 'ดาวน์โหลดจาก Microsoft Store',
  'vi': 'Tải xuống từ Microsoft Store',
  'ms': 'Muat turun dari Microsoft Store',
  'id': 'Unduh dari Microsoft Store',
  'tr': 'Microsoft Store\'dan İndir',
  'pl': 'Pobierz z Microsoft Store',
  'nl': 'Downloaden uit de Microsoft Store',
  'sv': 'Ladda ner från Microsoft Store',
  'da': 'Download fra Microsoft Store',
  'nb': 'Last ned fra Microsoft Store',
  'fi': 'Lataa Microsoft Storesta',
  'cs': 'Stáhnout z Microsoft Store',
  'hu': 'Letöltés a Microsoft Store-ból',
  'ro': 'Descarcă din Microsoft Store',
  'el': 'Λήψη από το Microsoft Store',
  'he': 'הורדה מ-Microsoft Store',
  'uk': 'Завантажити з Microsoft Store',
  'bn': 'Microsoft Store থেকে ডাউনলোড করুন',
  'ta': 'Microsoft Store இலிருந்து பதிவிறக்கம்',
  'te': 'Microsoft Store నుండి డౌన్‌లోడ్ చేయండి',
  'ur': 'Microsoft Store سے ڈاؤن لوڈ کریں',
  'fa': 'دانلود از Microsoft Store',
  'sw': 'Pakua kutoka Microsoft Store',
  'km': 'ទាញយកពី Microsoft Store',
  'it': 'Scarica dal Microsoft Store',
};

// --- CLI "Parameter reference:" label translations ---
const cliParamsLabelTranslations = {
  'id': '<strong>Referensi parameter:</strong>',
  'tr': '<strong>Parametre referansı:</strong>',
  'pl': '<strong>Odniesienie do parametrów:</strong>',
  'nl': '<strong>Parameterreferentie:</strong>',
  'sv': '<strong>Parameterreferens:</strong>',
  'da': '<strong>Parameterreference:</strong>',
  'nb': '<strong>Parameterreferanse:</strong>',
  'fi': '<strong>Parametriviite:</strong>',
  'cs': '<strong>Reference parametrů:</strong>',
  'hu': '<strong>Paraméter-hivatkozás:</strong>',
  'ro': '<strong>Referință parametri:</strong>',
  'el': '<strong>Αναφορά παραμέτρων:</strong>',
  'he': '<strong>הפניית פרמטרים:</strong>',
  'uk': '<strong>Довідка параметрів:</strong>',
  'bn': '<strong>প্যারামিটার রেফারেন্স:</strong>',
  'ta': '<strong>அளவுரு குறிப்பு:</strong>',
  'te': '<strong>పారామీటర్ సూచన:</strong>',
  'ur': '<strong>پیرامیٹر حوالہ:</strong>',
  'fa': '<strong>مرجع پارامترها:</strong>',
  'sw': '<strong>Marejeo ya vigezo:</strong>',
  'km': '<strong>ឯកសារយោងប៉ារ៉ាម៉ែត្រ:</strong>',
  'it': '<strong>Riferimento parametri:</strong>',
};

// --- CLI language code link translations ---
const cliLangLinkTranslations = {
  'id': 'Lihat daftar lengkap kode bahasa yang didukung untuk <code>--source</code> dan <code>--target</code>: <a href="language-codes.html">Referensi kode bahasa</a>',
  'tr': '<code>--source</code> ve <code>--target</code> için desteklenen dil kodlarının tam listesine bakın: <a href="language-codes.html">Dil kodu referansı</a>',
  'pl': 'Zobacz pełną listę obsługiwanych kodów języków dla <code>--source</code> i <code>--target</code>: <a href="language-codes.html">Kody języków</a>',
  'nl': 'Bekijk de volledige lijst met ondersteunde taalcodes voor <code>--source</code> en <code>--target</code>: <a href="language-codes.html">Taalcodereferentie</a>',
  'sv': 'Se den fullständiga listan över språkkoder som stöds för <code>--source</code> och <code>--target</code>: <a href="language-codes.html">Språkkodsreferens</a>',
  'da': 'Se den fulde liste over understøttede sprogkoder til <code>--source</code> og <code>--target</code>: <a href="language-codes.html">Sprogkodereference</a>',
  'nb': 'Se den fullstendige listen over støttede språkkoder for <code>--source</code> og <code>--target</code>: <a href="language-codes.html">Språkkodereferanse</a>',
  'fi': 'Katso täydellinen luettelo tuetuista kielikoodeista <code>--source</code> ja <code>--target</code>: <a href="language-codes.html">Kielikoodiviite</a>',
  'cs': 'Úplný seznam podporovaných jazykových kódů pro <code>--source</code> a <code>--target</code>: <a href="language-codes.html">Reference jazykových kódů</a>',
  'hu': 'A <code>--source</code> és <code>--target</code> támogatott nyelvkódjainak teljes listája: <a href="language-codes.html">Nyelvkód-hivatkozás</a>',
  'ro': 'Consultați lista completă a codurilor de limbă acceptate pentru <code>--source</code> și <code>--target</code>: <a href="language-codes.html">Referință coduri de limbă</a>',
  'el': 'Δείτε την πλήρη λίστα υποστηριζόμενων κωδικών γλώσσας για <code>--source</code> και <code>--target</code>: <a href="language-codes.html">Αναφορά κωδικών γλώσσας</a>',
  'he': 'ראו את הרשימה המלאה של קודי שפה נתמכים עבור <code>--source</code> ו-<code>--target</code>: <a href="language-codes.html">מדריך קודי שפה</a>',
  'uk': 'Повний список підтримуваних кодів мов для <code>--source</code> та <code>--target</code>: <a href="language-codes.html">Довідник кодів мов</a>',
  'bn': '<code>--source</code> এবং <code>--target</code>-এর জন্য সমর্থিত ভাষা কোডের সম্পূর্ণ তালিকা দেখুন: <a href="language-codes.html">ভাষা কোড রেফারেন্স</a>',
  'ta': '<code>--source</code> மற்றும் <code>--target</code>-க்கான ஆதரிக்கப்படும் மொழிக் குறியீடுகளின் முழு பட்டியலைப் பார்க்கவும்: <a href="language-codes.html">மொழிக் குறியீடு குறிப்பு</a>',
  'te': '<code>--source</code> మరియు <code>--target</code> కోసం మద్దతు ఉన్న భాషా కోడ్‌ల పూర్తి జాబితా చూడండి: <a href="language-codes.html">భాషా కోడ్ సూచన</a>',
  'ur': '<code>--source</code> اور <code>--target</code> کے لیے معاون زبان کوڈز کی مکمل فہرست دیکھیں: <a href="language-codes.html">زبان کوڈ حوالہ</a>',
  'fa': 'فهرست کامل کدهای زبان پشتیبانی‌شده برای <code>--source</code> و <code>--target</code> را ببینید: <a href="language-codes.html">مرجع کدهای زبان</a>',
  'sw': 'Tazama orodha kamili ya misimbo ya lugha inayotumika kwa <code>--source</code> na <code>--target</code>: <a href="language-codes.html">Rejea ya misimbo ya lugha</a>',
  'km': 'មើលបញ្ជីពេញនៃកូដភាសាដែលគាំទ្រសម្រាប់ <code>--source</code> និង <code>--target</code>: <a href="language-codes.html">ឯកសារយោងកូដភាសា</a>',
  'it': 'Consulta l\'elenco completo dei codici lingua supportati per <code>--source</code> e <code>--target</code>: <a href="language-codes.html">Riferimento codici lingua</a>',
};

/** Same markup as home.html; replaced per locale before the privacy section. */
const PRIVACY_SUPPORT_HTML_EN = '<p class="privacy-support-note">For technical support, please contact <a href="mailto:supports@echoshorts.win">supports@echoshorts.win</a>.</p>';

const privacySupportByLang = {
  zh: '<p class="privacy-support-note">如需技术支持，请联系 <a href="mailto:supports@echoshorts.win">supports@echoshorts.win</a>。</p>',
  cht: '<p class="privacy-support-note">如需技術支援，請聯絡 <a href="mailto:supports@echoshorts.win">supports@echoshorts.win</a>。</p>',
  ja: '<p class="privacy-support-note">テクニカルサポートが必要な場合は、<a href="mailto:supports@echoshorts.win">supports@echoshorts.win</a> までご連絡ください。</p>',
  ko: '<p class="privacy-support-note">기술 지원이 필요하시면 <a href="mailto:supports@echoshorts.win">supports@echoshorts.win</a> 으로 문의해 주세요.</p>',
  es: '<p class="privacy-support-note">Para soporte técnico, contacte a <a href="mailto:supports@echoshorts.win">supports@echoshorts.win</a>.</p>',
  fr: '<p class="privacy-support-note">Pour une assistance technique, contactez <a href="mailto:supports@echoshorts.win">supports@echoshorts.win</a>.</p>',
  de: '<p class="privacy-support-note">Für technischen Support wenden Sie sich bitte an <a href="mailto:supports@echoshorts.win">supports@echoshorts.win</a>.</p>',
  ru: '<p class="privacy-support-note">По вопросам технической поддержки пишите на <a href="mailto:supports@echoshorts.win">supports@echoshorts.win</a>.</p>',
  pt: '<p class="privacy-support-note">Para suporte técnico, contacte <a href="mailto:supports@echoshorts.win">supports@echoshorts.win</a>.</p>',
  ar: '<p class="privacy-support-note">للدعم الفني، يرجى التواصل مع <a href="mailto:supports@echoshorts.win">supports@echoshorts.win</a>.</p>',
  hi: '<p class="privacy-support-note">तकनीकी सहायता के लिए कृपया <a href="mailto:supports@echoshorts.win">supports@echoshorts.win</a> से संपर्क करें।</p>',
  th: '<p class="privacy-support-note">หากต้องการความช่วยเหลือทางเทคนิค กรุณาติดต่อ <a href="mailto:supports@echoshorts.win">supports@echoshorts.win</a></p>',
  vi: '<p class="privacy-support-note">Để được hỗ trợ kỹ thuật, vui lòng liên hệ <a href="mailto:supports@echoshorts.win">supports@echoshorts.win</a>.</p>',
  ms: '<p class="privacy-support-note">Untuk sokongan teknikal, sila hubungi <a href="mailto:supports@echoshorts.win">supports@echoshorts.win</a>.</p>',
  id: '<p class="privacy-support-note">Untuk dukungan teknis, hubungi <a href="mailto:supports@echoshorts.win">supports@echoshorts.win</a>.</p>',
  tr: '<p class="privacy-support-note">Teknik destek için lütfen <a href="mailto:supports@echoshorts.win">supports@echoshorts.win</a> adresine yazın.</p>',
  pl: '<p class="privacy-support-note">W sprawie wsparcia technicznego napisz na <a href="mailto:supports@echoshorts.win">supports@echoshorts.win</a>.</p>',
  nl: '<p class="privacy-support-note">Voor technische ondersteuning kunt u contact opnemen met <a href="mailto:supports@echoshorts.win">supports@echoshorts.win</a>.</p>',
  sv: '<p class="privacy-support-note">För teknisk support, kontakta <a href="mailto:supports@echoshorts.win">supports@echoshorts.win</a>.</p>',
  da: '<p class="privacy-support-note">For teknisk support, kontakt <a href="mailto:supports@echoshorts.win">supports@echoshorts.win</a>.</p>',
  nb: '<p class="privacy-support-note">For teknisk støtte, kontakt <a href="mailto:supports@echoshorts.win">supports@echoshorts.win</a>.</p>',
  fi: '<p class="privacy-support-note">Tekniseen tukeen: <a href="mailto:supports@echoshorts.win">supports@echoshorts.win</a>.</p>',
  cs: '<p class="privacy-support-note">Technickou podporu získáte na <a href="mailto:supports@echoshorts.win">supports@echoshorts.win</a>.</p>',
  hu: '<p class="privacy-support-note">Technikai támogatásért írjon a következő címre: <a href="mailto:supports@echoshorts.win">supports@echoshorts.win</a>.</p>',
  ro: '<p class="privacy-support-note">Pentru suport tehnic, contactați <a href="mailto:supports@echoshorts.win">supports@echoshorts.win</a>.</p>',
  el: '<p class="privacy-support-note">Για τεχνική υποστήριξη, επικοινωνήστε με <a href="mailto:supports@echoshorts.win">supports@echoshorts.win</a>.</p>',
  he: '<p class="privacy-support-note">לתמיכה טכנית נא לפנות ל-<a href="mailto:supports@echoshorts.win">supports@echoshorts.win</a>.</p>',
  uk: '<p class="privacy-support-note">Щодо технічної підтримки звертайтеся на <a href="mailto:supports@echoshorts.win">supports@echoshorts.win</a>.</p>',
  bn: '<p class="privacy-support-note">প্রযুক্তিগত সহায়তার জন্য <a href="mailto:supports@echoshorts.win">supports@echoshorts.win</a> এ যোগাযোগ করুন।</p>',
  ta: '<p class="privacy-support-note">தொழில்நுட்ப ஆதரவுக்கு <a href="mailto:supports@echoshorts.win">supports@echoshorts.win</a> ஐ தொடர்பு கொள்ளவும்.</p>',
  te: '<p class="privacy-support-note">సాంకేతిక మద్దతు కోసం దయచేసి <a href="mailto:supports@echoshorts.win">supports@echoshorts.win</a> ను సంప్రదించండి.</p>',
  ur: '<p class="privacy-support-note">تکنیکی معاونت کے لیے براہ کرم <a href="mailto:supports@echoshorts.win">supports@echoshorts.win</a> سے رابطہ کریں۔</p>',
  fa: '<p class="privacy-support-note">برای پشتیبانی فنی با <a href="mailto:supports@echoshorts.win">supports@echoshorts.win</a> تماس بگیرید.</p>',
  sw: '<p class="privacy-support-note">Kwa msaada wa kiufundi, wasiliana na <a href="mailto:supports@echoshorts.win">supports@echoshorts.win</a>.</p>',
  km: '<p class="privacy-support-note">សម្រាប់ការគាំទ្របច្ចេកទេស សូមទាក់ទង <a href="mailto:supports@echoshorts.win">supports@echoshorts.win</a>។</p>',
  it: '<p class="privacy-support-note">Per supporto tecnico, contattare <a href="mailto:supports@echoshorts.win">supports@echoshorts.win</a>.</p>',
};

function applyPrivacySupportLine(html, langKey) {
  const line = privacySupportByLang[langKey] || PRIVACY_SUPPORT_HTML_EN;
  if (!html.includes(PRIVACY_SUPPORT_HTML_EN)) return html;
  return html.replace(PRIVACY_SUPPORT_HTML_EN, line);
}

// --- Load full translations for remaining languages ---
const _ft1 = require('./fullTranslations.js');
const _ft2 = require('./fullTranslations2.js');
const fullTrans = { ..._ft1, ..._ft2 };

function buildOther(key, data) {
  const file = `home-${key}.html`;
  const t = fullTrans[key];

  let html = template
    .replace('lang="en"', `lang="${data.lang}"`)
    .replace(`<option value="home.html" selected>English</option>`, `<option value="home.html">English</option>`)
    .replace(new RegExp(`<option value="${file}">([^<]+)</option>`), `<option value="${file}" selected>$1</option>`);

  if (t) {
    html = html
      .replace(/<title>.*?<\/title>/, `<title>${t.title}</title>`)
      .replace('AI Video Translation &amp; Subtitles<br><span>Stream, Translate, Download &mdash; All Offline</span>', t.h1)
      .replace(/EchoShortsPlayer translates online videos.*?m3u8 streams and MP4 files\./s, t.heroP)
      .replace('<span class="num">#1</span> Features', `<span class="num">#1</span> ${t.sec1}`)
      .replace('<span class="num">#2</span> How to Use', `<span class="num">#2</span> ${t.sec2}`)
      .replace('>Speech Recognition<', `>${t.f1t}<`).replace(/Powered by OpenAI Whisper\. Supports 99 languages.*?highest accuracy\)\./, t.f1p)
      .replace('>AI Translation<', `>${t.f2t}<`).replace('Multiple translation engines:', t.f2p)
      .replace('Opus-MT &mdash; fast, 9 languages', t.f2l1).replace('NLLB &mdash; 32+ languages, any-to-any', t.f2l2).replace('Qwen &mdash; best quality, CJK-optimized', t.f2l3)
      .replace('>Media Detection<', `>${t.f3t}<`).replace(/Automatically detects m3u8\/HLS.*?extension\./, t.f3p)
      .replace('>Real-time Subtitles<', `>${t.f4t}<`).replace(/Stream translation mode.*?future use\./, t.f4p)
      .replace('>100% Offline &amp; Private<', `>${t.f5t}<`).replace(/All processing happens locally.*?on your device\./, t.f5p)
      .replace('>Hardware Requirements<', `>${t.f6t}<`).replace(/NVIDIA GPU with 8 GB\+.*?optimal performance\./, t.f6p)
      .replace('Install EchoShortsPlayer <span class="tag">Required', `${t.instTitle} <span class="tag">${t.instTag}`)
      .replace('Desktop application &mdash; the core engine for all features', t.instSub)
      .replace(/EchoShortsPlayer is the desktop application.*?methods below\./, t.instP1)
      .replace('>Download EchoShortsPlayer<', `>${t.instDlBtn}<`)
      .replace(/<p><strong>System requirements:<\/strong>.*?installed\.<\/p>/, `<p>${t.instReq}</p>`)
      .replace(/<p>After installation, launch the application\..*?communicate with\.<\/p>/, `<p>${t.instAfter}</p>`)
      .replace('Chrome Extension <span class="tag">Recommended', `${t.extTitle} <span class="tag">${t.extTag}`)
      .replace('Deep network-level media interception', t.extSub)
      .replace(/The Chrome extension uses the.*?download links\./, t.extP1)
      .replace('>Download Extension (.zip)<', `>${t.extDlBtn}<`)
      .replace('<strong>Installation (developer mode):</strong>', t.extInstTitle)
      .replace('<strong>Usage:</strong>', t.extUseTitle)
      .replace('Command-Line Interface <span class="tag">Power Users', `${t.cliTitle} <span class="tag">${t.cliTag}`)
      .replace('Automation, batch processing, and scripting', t.cliSub)
      .replace(/The CLI provides direct access.*?other tools\./, t.cliP1)
      .replace('<strong>Available commands:</strong>', t.cliCmds)
      .replace('# Translate a local video file to Chinese subtitles', t.cliC1)
      .replace('# Batch translate an entire folder', t.cliC2)
      .replace('# Full options: source language, whisper model, translation engine, denoising, processing mode', t.cliC3)
      .replace('# Download a remote m3u8 or MP4', t.cliC4)
      .replace('# Download and translate in one step', t.cliC5)
      .replace('# Translate an existing SRT file', t.cliC6);
    
    if (t.cliParams) {
      html = html.replace('<strong>Parameter reference:</strong>', t.cliParams);
    }
    if (t.cliParamsPre) {
      html = html.replace(/--source, -s[\s\S]*?--referer\s+[^\n]+/, t.cliParamsPre.trim());
    }
    if (t.cliLangLink) {
      html = html.replace(/See the full list of supported language codes[\s\S]*?Language Code Reference<\/a>/, t.cliLangLink);
    }

    if (t.storeBtn) {
       html = html.replace('>Download from Microsoft Store<', `>${t.storeBtn}<`);
    }
  }

  const extT = (t && t.extI1) ? t : extensionStepTranslations[key];
  html = applyExtensionInstallUsage(html, extT);

  // Apply advantage translations (h4 titles + bullet items). Prefer fullTrans
  // data when available (it already contains extAdv*/cliAdv*); otherwise fall
  // back to advantageTranslations.js.
  const advT = (t && (t.extAdvTitle || t.cliAdvTitle)) ? t : advantageTranslations[key];
  html = applyAdvantages(html, advT);

  const extHead = extensionStepTranslations[key];
  if (extHead && extHead.extInstTitle && !(t && t.extInstTitle)) {
    html = html
      .replace('<p><strong>Installation (developer mode):</strong></p>', `<p>${extHead.extInstTitle}</p>`)
      .replace('<p><strong>Usage:</strong></p>', `<p>${extHead.extUseTitle}</p>`);
  }

  // Apply store button translation from the mapping (fallback for languages without full translations)
  const storeLabel = storeBtnTranslations[key];
  if (storeLabel && html.includes('>Download from Microsoft Store<')) {
    html = html.replace('>Download from Microsoft Store<', `>${storeLabel}<`);
  }

  // Apply CLI "Parameter reference:" label (fallback for languages without full translations)
  const cliParamsLabel = cliParamsLabelTranslations[key];
  if (cliParamsLabel && html.includes('<strong>Parameter reference:</strong>')) {
    html = html.replace('<strong>Parameter reference:</strong>', cliParamsLabel);
  }

  // Apply CLI language code link (fallback for languages without full translations)
  const cliLangLinkText = cliLangLinkTranslations[key];
  if (cliLangLinkText && html.includes('Language Code Reference</a>')) {
    html = html.replace(/See the full list of supported language codes[\s\S]*?Language Code Reference<\/a>/, cliLangLinkText);
  }

  html = applyPrivacyBlock(html, key);
  html = applyPrivacySupportLine(html, key);

  fs.writeFileSync(path.join(__dirname, file), html, 'utf8');
}

// --- Main ---
console.log('Generating home pages...\n');

for (const [key, data] of Object.entries(langs)) {
  buildTranslated(key, data);
}

// Get all home-*.html files to ensure we update all of them
const homeFiles = fs.readdirSync(__dirname).filter(f => f.startsWith('home-') && f.endsWith('.html'));
homeFiles.forEach(file => {
  const key = file.replace('home-', '').replace('.html', '');
  if (langs[key]) return;
  
  // Try to find if we have data for it, or just use English template defaults
  const label = file.toUpperCase().replace('HOME-', '').replace('.HTML', '');
  buildOther(key, { lang: key, label: label });
});

console.log(`\nDone! Updated ${homeFiles.length + Object.keys(langs).length} home pages.`);
