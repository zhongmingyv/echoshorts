#!/usr/bin/env node
/**
 * Generate translated home-*.html pages from the English home.html template.
 * Run: node generate_home.js
 */
const fs = require('fs');
const path = require('path');

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
      // Feature cards
      f1t: '语音识别', f1p: '基于 OpenAI Whisper。支持 99 种语言，自动语言检测。多种模型大小可选，从 tiny（快速）到 large-v3（最高精度）。',
      f2t: 'AI 翻译', f2p: '多种翻译引擎：', f2l1: 'Opus-MT — 快速，9 种语言', f2l2: 'NLLB — 32+ 种语言，任意互译', f2l3: 'Qwen — 最高质量，CJK 优化',
      f3t: '媒体检测', f3p: '自动检测网页上的 m3u8/HLS 流和 MP4 视频链接。通过浏览器扩展或油猴脚本一键下载或翻译。',
      f4t: '实时字幕', f4p: '流式翻译模式：字幕在观看时实时显示。无需等待整个视频下载完成。SRT 字幕文件保存在本地供后续使用。',
      f5t: '100% 离线 & 隐私', f5p: '所有处理都在本地完成。不向外部服务器发送任何数据。无需账号、无跟踪、无广告。您的内容留在您的设备上。',
      f6t: '硬件要求', f6p: 'NVIDIA 显卡，8 GB+ 显存，并安装 CUDA 驱动。支持 GPU 加速的语音识别和翻译，获得最佳性能。',
      // Install section
      instTitle: '&#128229; 安装 EchoShortsPlayer', instTag: '必需', instSub: '桌面应用——所有功能的核心引擎',
      instP1: 'EchoShortsPlayer 是在本地运行 AI 模型的桌面应用。浏览器扩展、油猴脚本和 CLI 都依赖它。请先安装后再使用下列任何方式。',
      instDlBtn: '下载 EchoShortsPlayer',
      instReq: '<strong>系统要求：</strong>Windows 10/11，NVIDIA 显卡 8 GB+ 显存，已安装 CUDA 驱动。',
      instAfter: '安装后启动应用。它会在 <code>localhost:18632</code> 启动本地后端服务器，扩展、油猴脚本和 CLI 都通过它通信。',
      // Tampermonkey
      tmTitle: '&#129668; 篡改猴脚本', tmTag: '最简单', tmSub: '任何浏览器的零安装媒体检测',
      tmP1: '篡改猴脚本在每个网页中注入一个浮动面板，自动检测 m3u8 流和 MP4 视频链接。检测到的媒体显示在列表中，带有 <strong>下载</strong> 和 <strong>翻译</strong> 按钮。',
      tmStep1: '<strong>步骤 1：</strong>安装篡改猴浏览器扩展：',
      tmSite: '篡改猴官网', tmChrome: 'Chrome 商店',
      tmStep2: '<strong>步骤 2：</strong>安装 EchoShortsPlayer 脚本：',
      tmInstall: '安装脚本',
      tmStep3: '<strong>步骤 3：</strong>确保 EchoShortsPlayer 桌面应用正在运行（脚本将检测到的 URL 发送到本地后端 <code>localhost:18632</code>）。',
      tmStep4: '<strong>步骤 4：</strong>访问任何视频页面。浮动面板（右下角）会自动检测媒体。点击 <strong>下载</strong> 或 <strong>翻译</strong>。',
      tmAdvTitle: '为什么使用油猴脚本？',
      tmAdv1: '适用于所有支持 Tampermonkey 的浏览器（Chrome、Firefox、Edge、Safari、Opera）',
      tmAdv2: '无需安装 Chrome 扩展——适合扩展受限的环境',
      tmAdv3: '轻量：单个文件，易于检查和修改',
      tmAdv4: '通过 Tampermonkey 内置机制自动更新',
      tmAdv5: '同时检测 m3u8/HLS 流和 MP4 直链',
      // Extension
      extTitle: '&#128268; Chrome 扩展', extTag: '推荐', extSub: '深度网络级媒体拦截',
      extP1: 'Chrome 扩展使用 <code>webRequest</code> API 在浏览器层面拦截所有网络请求，检测 m3u8/HLS 流、MP4 文件和其他媒体格式。还会扫描页面 DOM 中的视频元素和下载链接。',
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
      extAdv5: '比油猴脚本更深度的检测：hook fetch、XHR、MediaSource 和响应体扫描',
      // CLI
      cliTitle: '&#128187; 命令行工具', cliTag: '高级用户', cliSub: '自动化、批处理和脚本集成',
      cliP1: 'CLI 提供从终端直接访问所有下载和翻译功能。专为需要批量处理视频、自动化工作流或与其他工具集成的高级用户设计。',
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
      pr2t: '无网络数据传输', pr2p1: '本应用在正常使用期间不会向外部服务器发送任何用户数据。所有音频处理和文本翻译都在本地完成。AI 模型首次使用时从公开来源（HuggingFace）下载，此后可完全离线运行。', pr2p2: '浏览器扩展和油猴脚本仅与本地后端 <code>localhost:18632</code> 通信。不向开发者运营的任何远程服务器传输数据。',
      pr3t: '无广告、无跟踪、无推荐', pr3p: '本应用不包含任何广告系统、用户行为跟踪代码、分析工具或数据推荐机制。我们不与任何第三方共享用户数据，也不根据用户行为创建画像或推送内容。',
      pr4t: '开源透明', pr4p: '应用的源代码，包括 Chrome 扩展、篡改猴脚本和后端管道，完全开放供检查。鼓励用户审查代码以验证本政策中的隐私和安全声明。',
      pr5t: '安全港与用户责任', pr5p1: 'EchoShortsPlayer 是一款通用技术工具，仅旨在帮助用户理解视频内容。根据安全港原则，本应用的开发者和发布者对用户访问、翻译或处理的任何内容不承担版权侵权或其他法律责任。', pr5p2: '用户必须确保其使用符合当地法律法规以及所访问平台的服务条款。因访问受版权保护的内容、违反平台规则或使用本应用从事任何非法活动而产生的所有法律责任由用户自行承担。', pr5p3: '本应用不对用户访问的内容的合法性做出判断或保证，也不承担因使用本应用而产生的任何直接或间接损失。',
      pr6t: '预期用途', pr6p: '本应用被定义为辅助工具，仅供听力障碍人士、语言学习者或需要理解外语视频内容的个人本地使用。任何其他用途由用户自行负责。',
      pr7t: '技术限制', pr7p1: '本应用支持分析未受数字版权管理（DRM）保护的公开可访问视频内容。由于版权保护协议（如 Widevine、PlayReady 等）的限制，DRM 保护内容的音频流可能无法提取，从而无法生成字幕。', pr7p2: '对于非"fast-start"编码的 MP4 文件（moov 原子在文件尾部），应用需要完整下载后才能开始翻译。Fast-start MP4 文件支持边下载边翻译。',
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
      f1t: '語音辨識', f1p: '基於 OpenAI Whisper。支援 99 種語言，自動語言偵測。多種模型大小可選，從 tiny（快速）到 large-v3（最高精度）。',
      f2t: 'AI 翻譯', f2p: '多種翻譯引擎：', f2l1: 'Opus-MT — 快速，9 種語言', f2l2: 'NLLB — 32+ 種語言，任意互譯', f2l3: 'Qwen — 最高品質，CJK 最佳化',
      f3t: '媒體偵測', f3p: '自動偵測網頁上的 m3u8/HLS 串流和 MP4 影片連結。透過瀏覽器擴充功能或油猴腳本一鍵下載或翻譯。',
      f4t: '即時字幕', f4p: '串流翻譯模式：字幕在觀看時即時顯示。無需等待整部影片下載完成。SRT 字幕檔案儲存在本機供後續使用。',
      f5t: '100% 離線 & 隱私', f5p: '所有處理都在本機完成。不向外部伺服器傳送任何資料。無需帳號、無追蹤、無廣告。您的內容留在您的裝置上。',
      f6t: '硬體需求', f6p: 'NVIDIA 顯示卡，8 GB+ 視訊記憶體，並安裝 CUDA 驅動程式。支援 GPU 加速的語音辨識和翻譯，獲得最佳效能。',
      instTitle: '&#128229; 安裝 EchoShortsPlayer', instTag: '必需', instSub: '桌面應用——所有功能的核心引擎',
      instP1: 'EchoShortsPlayer 是在本機執行 AI 模型的桌面應用。瀏覽器擴充功能、油猴腳本和 CLI 都依賴它。請先安裝後再使用下列任何方式。',
      instDlBtn: '下載 EchoShortsPlayer',
      instReq: '<strong>系統需求：</strong>Windows 10/11，NVIDIA 顯示卡 8 GB+ 視訊記憶體，已安裝 CUDA 驅動程式。',
      instAfter: '安裝後啟動應用。它會在 <code>localhost:18632</code> 啟動本機後端伺服器，擴充功能、油猴腳本和 CLI 都透過它通訊。',
      tmTitle: '&#129668; 篡改猴腳本', tmTag: '最簡單', tmSub: '任何瀏覽器的零安裝媒體偵測',
      tmP1: '篡改猴腳本在每個網頁中注入一個浮動面板，自動偵測 m3u8 串流和 MP4 影片連結。偵測到的媒體顯示在清單中，附有 <strong>下載</strong> 和 <strong>翻譯</strong> 按鈕。',
      tmStep1: '<strong>步驟 1：</strong>安裝篡改猴瀏覽器擴充功能：', tmSite: '篡改猴官網', tmChrome: 'Chrome 商店',
      tmStep2: '<strong>步驟 2：</strong>安裝 EchoShortsPlayer 腳本：', tmInstall: '安裝腳本',
      tmStep3: '<strong>步驟 3：</strong>確保 EchoShortsPlayer 桌面應用正在執行（腳本將偵測到的 URL 傳送到本機後端 <code>localhost:18632</code>）。',
      tmStep4: '<strong>步驟 4：</strong>造訪任何影片頁面。浮動面板（右下角）會自動偵測媒體。點擊 <strong>下載</strong> 或 <strong>翻譯</strong>。',
      tmAdvTitle: '為什麼使用油猴腳本？',
      tmAdv1: '適用於所有支援 Tampermonkey 的瀏覽器（Chrome、Firefox、Edge、Safari、Opera）',
      tmAdv2: '無需安裝 Chrome 擴充功能——適合擴充功能受限的環境',
      tmAdv3: '輕量：單一檔案，易於檢查和修改', tmAdv4: '透過 Tampermonkey 內建機制自動更新', tmAdv5: '同時偵測 m3u8/HLS 串流和 MP4 直接連結',
      extTitle: '&#128268; Chrome 擴充功能', extTag: '推薦', extSub: '深度網路級媒體攔截',
      extP1: 'Chrome 擴充功能使用 <code>webRequest</code> API 在瀏覽器層面攔截所有網路請求，偵測 m3u8/HLS 串流、MP4 檔案和其他媒體格式。還會掃描頁面 DOM 中的影片元素和下載連結。',
      extInstTitle: '<strong>安裝（開發者模式）：</strong>',
      extDlBtn: '下載擴充功能 (.zip)',
      extI1: '下載上方的擴充功能 zip 檔案並解壓縮到一個資料夾中。', extI2: '開啟 Chrome，導覽至 <code>chrome://extensions/</code>。', extI3: '啟用 <strong>開發者模式</strong>（右上角切換）。', extI4: '點擊 <strong>載入未封裝項目</strong>，選擇 <code>m3u8-extension</code> 資料夾。', extI5: '擴充功能圖示出現在工具列中，徽章顯示偵測到的媒體數量。',
      extUseTitle: '<strong>使用方式：</strong>',
      extU1: '瀏覽含有影片內容的頁面。', extU2: '點擊擴充功能圖示查看偵測到的 m3u8/MP4 串流。', extU3: '點擊 <strong>下載</strong> 儲存為本機 MP4，或點擊 <strong>翻譯</strong> 開始產生字幕。', extU4: '懸停在項目上可高亮顯示頁面中對應的影片元素。',
      extAdvTitle: '為什麼使用擴充功能？', extAdv1: '在瀏覽器層面攔截網路請求——捕獲 DOM 掃描遺漏的串流', extAdv2: '自動品質選擇：按影片 ID 分組並選擇最佳品質', extAdv3: 'Referer 標頭注入，播放需要驗證的串流', extAdv4: '徽章計數器一目了然顯示每個分頁偵測到的媒體數量', extAdv5: '比油猴腳本更深度的偵測：hook fetch、XHR、MediaSource 和回應本體掃描',
      cliTitle: '&#128187; 命令列工具', cliTag: '進階使用者', cliSub: '自動化、批次處理和腳本整合',
      cliP1: 'CLI 提供從終端直接存取所有下載和翻譯功能。專為需要批次處理影片、自動化工作流程或與其他工具整合的進階使用者設計。',
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
      cliC1: '# 將本機影片翻譯為中文字幕', cliC2: '# 批次翻譯整個資料夾', cliC3: '# 全部參數：來源語言、Whisper 模型、翻譯引擎、降噪、處理模式', cliC4: '# 下載遠端 m3u8 或 MP4', cliC5: '# 一步完成下載和翻譯', cliC6: '# 翻譯已有的 SRT 檔案',
      cliAdvTitle: '為什麼使用 CLI？', cliAdv1: '批次處理：一條命令翻譯數百部影片', cliAdv2: '可腳本化：整合到 shell 腳本、排程工作或 CI/CD 管線', cliAdv3: '完全控制模型：選擇 Whisper 模型大小、翻譯引擎、降噪模式', cliAdv4: '無 GUI 開銷：適合伺服器、無頭裝置或遠端 SSH 工作階段', cliAdv5: '支援序列（省記憶體）和平行（快速）處理模式',
      pr1t: '本機資料處理', pr1p1: 'EchoShortsPlayer 的所有核心功能——包括語音辨識、翻譯和媒體下載——完全在您的本機裝置上執行，由本機後端伺服器（127.0.0.1:18632）驅動。', pr1p2: '我們不收集、儲存、傳輸或分析任何使用者資料。',
      pr2t: '無網路資料傳輸', pr2p1: '本應用在正常使用期間不會向外部伺服器傳送任何使用者資料。所有音訊處理和文字翻譯都在本機完成。', pr2p2: '瀏覽器擴充功能和油猴腳本僅與本機後端 <code>localhost:18632</code> 通訊。',
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

// For the remaining 12 languages, we keep English content but set proper lang attribute
// and mark the selected language in the dropdown.
// (Full professional translation for all 14 languages would require a translation service)

const otherLangs = {
  'es': { lang: 'es', label: 'Español', nativeName: 'Spanish',
    cli: ['# Traducir un archivo de video local a subtítulos en chino', '# Traducir por lotes una carpeta entera', '# Descargar un m3u8 o MP4 remoto', '# Descargar y traducir en un solo paso', '# Traducir un archivo SRT existente'] },
  'ar': { lang: 'ar', label: 'العربية', nativeName: 'Arabic', dir: 'rtl',
    cli: ['# ترجمة ملف فيديو محلي إلى ترجمات صينية', '# ترجمة مجلد كامل دفعة واحدة', '# تنزيل m3u8 أو MP4 عن بعد', '# التنزيل والترجمة في خطوة واحدة', '# ترجمة ملف SRT موجود'] },
  'pt': { lang: 'pt', label: 'Português', nativeName: 'Portuguese',
    cli: ['# Traduzir um arquivo de vídeo local para legendas em chinês', '# Traduzir em lote uma pasta inteira', '# Baixar um m3u8 ou MP4 remoto', '# Baixar e traduzir em uma etapa', '# Traduzir um arquivo SRT existente'] },
  'fr': { lang: 'fr', label: 'Français', nativeName: 'French',
    cli: ['# Traduire un fichier vidéo local en sous-titres chinois', '# Traduire en lot un dossier entier', '# Télécharger un m3u8 ou MP4 distant', '# Télécharger et traduire en une étape', '# Traduire un fichier SRT existant'] },
  'ru': { lang: 'ru', label: 'Русский', nativeName: 'Russian',
    cli: ['# Перевести локальный видеофайл в китайские субтитры', '# Пакетный перевод всей папки', '# Скачать удалённый m3u8 или MP4', '# Скачать и перевести за один шаг', '# Перевести существующий SRT-файл'] },
  'de': { lang: 'de', label: 'Deutsch', nativeName: 'German',
    cli: ['# Eine lokale Videodatei in chinesische Untertitel übersetzen', '# Einen ganzen Ordner im Stapel übersetzen', '# Eine entfernte m3u8- oder MP4-Datei herunterladen', '# In einem Schritt herunterladen und übersetzen', '# Eine vorhandene SRT-Datei übersetzen'] },
  'ja': { lang: 'ja', label: '日本語', nativeName: 'Japanese',
    cli: ['# ローカル動画ファイルを中国語字幕に翻訳', '# フォルダ全体を一括翻訳', '# リモートの m3u8 または MP4 をダウンロード', '# ダウンロードと翻訳を一度に実行', '# 既存の SRT ファイルを翻訳'] },
  'ko': { lang: 'ko', label: '한국어', nativeName: 'Korean',
    cli: ['# 로컬 동영상 파일을 중국어 자막으로 번역', '# 폴더 전체를 일괄 번역', '# 원격 m3u8 또는 MP4 다운로드', '# 한 번에 다운로드 및 번역', '# 기존 SRT 파일 번역'] },
  'hi': { lang: 'hi', label: 'हिन्दी', nativeName: 'Hindi',
    cli: ['# स्थानीय वीडियो फ़ाइल को चीनी उपशीर्षक में अनुवाद करें', '# पूरे फ़ोल्डर का बैच अनुवाद करें', '# रिमोट m3u8 या MP4 डाउनलोड करें', '# एक ही चरण में डाउनलोड और अनुवाद करें', '# मौजूदा SRT फ़ाइल का अनुवाद करें'] },
  'th': { lang: 'th', label: 'ภาษาไทย', nativeName: 'Thai',
    cli: ['# แปลไฟล์วิดีโอในเครื่องเป็นคำบรรยายภาษาจีน', '# แปลทั้งโฟลเดอร์แบบแบตช์', '# ดาวน์โหลด m3u8 หรือ MP4 ระยะไกล', '# ดาวน์โหลดและแปลในขั้นตอนเดียว', '# แปลไฟล์ SRT ที่มีอยู่'] },
  'vi': { lang: 'vi', label: 'Tiếng Việt', nativeName: 'Vietnamese',
    cli: ['# Dịch tệp video cục bộ sang phụ đề tiếng Trung', '# Dịch hàng loạt cả thư mục', '# Tải xuống m3u8 hoặc MP4 từ xa', '# Tải xuống và dịch trong một bước', '# Dịch tệp SRT hiện có'] },
  'ms': { lang: 'ms', label: 'Bahasa Melayu', nativeName: 'Malay',
    cli: ['# Terjemah fail video tempatan ke sari kata Cina', '# Terjemah kelompok seluruh folder', '# Muat turun m3u8 atau MP4 jauh', '# Muat turun dan terjemah dalam satu langkah', '# Terjemah fail SRT sedia ada'] },
};

// --- Privacy policy HTML blocks per language ---
// Each returns the inner HTML of the <div class="privacy"> block (excluding wrapper).
// The section title line is replaced separately.
const EN_PRIVACY_MARKER_START = '<!-- PRIVACY_CONTENT_START -->';
const EN_PRIVACY_MARKER_END = '<!-- PRIVACY_CONTENT_END -->';

function privacyBlock(p) {
  return p.sections.map(s => {
    const ps = s.paragraphs.map(t => `        <p>${t}</p>`).join('\n');
    return `      <div class="priv-section">\n        <h3>${s.title}</h3>\n${ps}\n      </div>`;
  }).join('\n\n');
}

const privacyData = {
  'zh': { secTitle: '隐私政策与免责声明', footer: '&copy; 2025 EchoShortsPlayer. 保留所有权利。', contact: '联系我们', sections: [
    { title: '本地数据处理', paragraphs: ['EchoShortsPlayer 的所有核心功能——包括语音识别、翻译和媒体下载——完全在您的本地设备上运行，由本地后端服务器（127.0.0.1:18632）驱动。', '我们不收集、存储、传输或分析任何用户数据，包括但不限于：您观看的视频内容、识别的字幕文本、翻译结果、浏览历史或任何个人信息。'] },
    { title: '无网络数据传输', paragraphs: ['本应用在正常使用期间不会向外部服务器发送任何用户数据。所有音频处理和文本翻译都在本地完成。AI 模型首次使用时从公开来源（HuggingFace）下载，此后可完全离线运行。', '浏览器扩展和油猴脚本仅与本地后端 <code>localhost:18632</code> 通信。不向开发者运营的任何远程服务器传输数据。'] },
    { title: '无广告、无跟踪、无推荐', paragraphs: ['本应用不包含任何广告系统、用户行为跟踪代码、分析工具或数据推荐机制。我们不与任何第三方共享用户数据，也不根据用户行为创建画像或推送内容。'] },
    { title: '开源透明', paragraphs: ['应用的源代码，包括 Chrome 扩展、篡改猴脚本和后端管道，完全开放供检查。鼓励用户审查代码以验证本政策中的隐私和安全声明。'] },
    { title: '安全港与用户责任', paragraphs: ['EchoShortsPlayer 是一款通用技术工具，仅旨在帮助用户理解视频内容。根据安全港原则，本应用的开发者和发布者对用户访问、翻译或处理的任何内容不承担版权侵权或其他法律责任。', '用户必须确保其使用符合当地法律法规以及所访问平台的服务条款。因访问受版权保护的内容、违反平台规则或使用本应用从事任何非法活动而产生的所有法律责任由用户自行承担。', '本应用不对用户访问的内容的合法性做出判断或保证，也不承担因使用本应用而产生的任何直接或间接损失。'] },
    { title: '预期用途', paragraphs: ['本应用被定义为辅助工具，仅供听力障碍人士、语言学习者或需要理解外语视频内容的个人本地使用。任何其他用途由用户自行负责。'] },
    { title: '技术限制', paragraphs: ['本应用支持分析未受数字版权管理（DRM）保护的公开可访问视频内容。由于版权保护协议（如 Widevine、PlayReady 等）的限制，DRM 保护内容的音频流可能无法提取，从而无法生成字幕。', '对于非"fast-start"编码的 MP4 文件（moov 原子在文件尾部），应用需要完整下载后才能开始翻译。Fast-start MP4 文件支持边下载边翻译。'] },
    { title: '免责声明', paragraphs: ['本应用按"原样"提供，不作任何明示或暗示的保证。开发者不保证本应用在所有环境中均能正确运行，也不承担因使用本应用造成的任何损失、数据丢失或设备问题。使用本应用即表示接受上述所有条款。', '本应用提供的字幕和翻译由机器自动生成，仅供参考。开发者不对机器翻译内容的准确性、完整性或适用性做出任何保证，也不承担因依赖此类翻译而产生的任何后果。'] },
    { title: '政策更新', paragraphs: ['本隐私政策可能随新版本更新。重大变更将通过应用更新日志通知。继续使用本应用即表示接受最新版本的隐私政策。'] },
  ]},
  'cht': { secTitle: '隱私政策與免責聲明', footer: '&copy; 2025 EchoShortsPlayer. 保留所有權利。', contact: '聯絡我們', sections: [
    { title: '本機資料處理', paragraphs: ['EchoShortsPlayer 的所有核心功能——包括語音辨識、翻譯和媒體下載——完全在您的本機裝置上執行，由本機後端伺服器（127.0.0.1:18632）驅動。', '我們不收集、儲存、傳輸或分析任何使用者資料，包括但不限於：您觀看的影片內容、辨識的字幕文字、翻譯結果、瀏覽記錄或任何個人資訊。'] },
    { title: '無網路資料傳輸', paragraphs: ['本應用在正常使用期間不會向外部伺服器傳送任何使用者資料。所有音訊處理和文字翻譯都在本機完成。AI 模型首次使用時從公開來源（HuggingFace）下載，此後可完全離線執行。', '瀏覽器擴充功能和油猴腳本僅與本機後端 <code>localhost:18632</code> 通訊。不向開發者營運的任何遠端伺服器傳輸資料。'] },
    { title: '無廣告、無追蹤、無推薦', paragraphs: ['本應用不包含任何廣告系統、使用者行為追蹤程式碼、分析工具或資料推薦機制。我們不與任何第三方共享使用者資料，也不根據使用者行為建立檔案或推送內容。'] },
    { title: '開源透明', paragraphs: ['應用的原始碼，包括 Chrome 擴充功能、篡改猴腳本和後端管線，完全開放供檢查。鼓勵使用者審查程式碼以驗證本政策中的隱私和安全聲明。'] },
    { title: '安全港與使用者責任', paragraphs: ['EchoShortsPlayer 是一款通用技術工具，僅旨在協助使用者理解影片內容。根據安全港原則，本應用的開發者和發佈者對使用者存取、翻譯或處理的任何內容不承擔版權侵權或其他法律責任。', '使用者必須確保其使用符合當地法律法規以及所存取平台的服務條款。因存取受版權保護的內容、違反平台規則或使用本應用從事任何非法活動而產生的所有法律責任由使用者自行承擔。', '本應用不對使用者存取的內容的合法性做出判斷或保證，也不承擔因使用本應用而產生的任何直接或間接損失。'] },
    { title: '預期用途', paragraphs: ['本應用被定義為輔助工具，僅供聽力障礙人士、語言學習者或需要理解外語影片內容的個人本機使用。任何其他用途由使用者自行負責。'] },
    { title: '技術限制', paragraphs: ['本應用支援分析未受數位版權管理（DRM）保護的公開可存取影片內容。由於版權保護協議（如 Widevine、PlayReady 等）的限制，DRM 保護內容的音訊串流可能無法提取，從而無法產生字幕。', '對於非"fast-start"編碼的 MP4 檔案（moov 原子在檔案尾部），應用需要完整下載後才能開始翻譯。Fast-start MP4 檔案支援邊下載邊翻譯。'] },
    { title: '免責聲明', paragraphs: ['本應用按「原樣」提供，不作任何明示或暗示的保證。開發者不保證本應用在所有環境中均能正確執行，也不承擔因使用本應用造成的任何損失、資料遺失或裝置問題。使用本應用即表示接受上述所有條款。', '本應用提供的字幕和翻譯由機器自動產生，僅供參考。開發者不對機器翻譯內容的準確性、完整性或適用性做出任何保證，也不承擔因依賴此類翻譯而產生的任何後果。'] },
    { title: '政策更新', paragraphs: ['本隱私政策可能隨新版本更新。重大變更將透過應用更新日誌通知。繼續使用本應用即表示接受最新版本的隱私政策。'] },
  ]},
  'es': { secTitle: 'Política de Privacidad y Descargo de Responsabilidad', footer: '&copy; 2025 EchoShortsPlayer. Todos los derechos reservados.', contact: 'Contáctenos', sections: [
    { title: 'Procesamiento Local de Datos', paragraphs: ['Todas las funciones principales de EchoShortsPlayer &mdash; incluyendo reconocimiento de voz, traducción y descarga de medios &mdash; se ejecutan completamente en su dispositivo local, mediante un servidor backend local (127.0.0.1:18632).', 'No recopilamos, almacenamos, transmitimos ni analizamos ningún dato de usuario, incluyendo pero no limitado a: contenido de video que visualiza, texto de subtítulos reconocido, resultados de traducción, historial de navegación o cualquier información personal.'] },
    { title: 'Sin Transmisión de Datos por Red', paragraphs: ['Esta aplicación no envía datos de usuario a servidores externos durante el uso normal. Todo el procesamiento de audio y la traducción de texto se completan localmente. Los modelos de IA se descargan de fuentes públicas (HuggingFace) en el primer uso y pueden funcionar completamente sin conexión a partir de entonces.', 'La extensión del navegador y el script de usuario se comunican únicamente con el backend local en <code>localhost:18632</code>. No se transmiten datos a ningún servidor remoto operado por los desarrolladores.'] },
    { title: 'Sin Publicidad, Sin Rastreo, Sin Recomendaciones', paragraphs: ['Esta aplicación no contiene sistemas publicitarios, código de rastreo de comportamiento de usuario, herramientas de análisis ni mecanismos de recomendación de datos. No compartimos datos de usuario con terceros, ni creamos perfiles ni enviamos contenido basado en el comportamiento del usuario.'] },
    { title: 'Código Abierto y Transparente', paragraphs: ['El código fuente de la aplicación, incluyendo la extensión de Chrome, el script de Tampermonkey y el pipeline del backend, está completamente disponible para su inspección. Se alienta a los usuarios a revisar el código para verificar las afirmaciones de privacidad y seguridad realizadas en esta política.'] },
    { title: 'Puerto Seguro y Responsabilidad del Usuario', paragraphs: ['EchoShortsPlayer es una herramienta técnica de propósito general diseñada únicamente para ayudar a los usuarios a comprender el contenido de video. Bajo la Doctrina de Puerto Seguro, los desarrolladores y editores de esta aplicación no asumen responsabilidad legal por infracción de derechos de autor u otra responsabilidad legal por cualquier contenido accedido, traducido o procesado por los usuarios.', 'Los usuarios deben asegurarse de que su uso cumple con las leyes y regulaciones locales, así como con los términos de servicio de las plataformas a las que acceden. Toda responsabilidad legal derivada del acceso a contenido protegido por derechos de autor, la violación de reglas de plataformas o la participación en cualquier actividad ilegal usando esta aplicación recae únicamente en el usuario.', 'Esta aplicación no emite juicios ni garantías sobre la legalidad del contenido accedido por los usuarios, ni acepta responsabilidad por pérdidas directas o indirectas derivadas de su uso.'] },
    { title: 'Uso Previsto', paragraphs: ['Esta aplicación está diseñada como una herramienta de asistencia destinada al uso personal local por personas con discapacidad auditiva, estudiantes de idiomas o quienes necesitan comprender contenido de video en idiomas extranjeros. Cualquier otro uso es responsabilidad exclusiva del usuario.'] },
    { title: 'Limitaciones Técnicas', paragraphs: ['Esta aplicación admite el análisis de contenido de video de acceso público no protegido por Gestión de Derechos Digitales (DRM). Debido a las restricciones impuestas por protocolos de protección de derechos de autor (como Widevine, PlayReady, etc.), los flujos de audio de contenido protegido por DRM pueden no ser extraíbles, impidiendo la generación de subtítulos.', 'Para archivos MP4 que no están codificados con "fast-start" (átomo moov al final del archivo), la aplicación requiere una descarga completa antes de que pueda comenzar la traducción. Los archivos MP4 fast-start admiten traducción en streaming mientras se descargan.'] },
    { title: 'Descargo de Responsabilidad', paragraphs: ['Esta aplicación se proporciona "tal cual" sin garantías expresas o implícitas. El desarrollador no garantiza que esta aplicación funcione correctamente en todos los entornos, ni acepta responsabilidad por pérdidas, pérdida de datos o problemas de dispositivos causados por su uso. El uso de esta aplicación constituye la aceptación de todos los términos anteriores.', 'Los subtítulos y traducciones proporcionados por esta aplicación son generados automáticamente por máquinas y son solo de referencia. El desarrollador no ofrece garantías sobre la precisión, integridad o idoneidad del contenido traducido por máquinas, y no acepta responsabilidad por consecuencias derivadas de la dependencia de dichas traducciones.'] },
    { title: 'Actualizaciones de la Política', paragraphs: ['Esta política de privacidad puede actualizarse con nuevas versiones. Los cambios significativos se comunicarán a través del registro de actualizaciones de la aplicación. El uso continuado de esta aplicación constituye la aceptación de la última versión de la política de privacidad.'] },
  ]},
  'ar': { secTitle: 'سياسة الخصوصية وإخلاء المسؤولية', footer: '&copy; 2025 EchoShortsPlayer. جميع الحقوق محفوظة.', contact: 'اتصل بنا', sections: [
    { title: 'معالجة البيانات محلياً', paragraphs: ['جميع الميزات الأساسية لـ EchoShortsPlayer &mdash; بما في ذلك التعرف على الكلام والترجمة وتنزيل الوسائط &mdash; تعمل بالكامل على جهازك المحلي، مدعومة بخادم محلي (127.0.0.1:18632).', 'نحن لا نجمع أو نخزن أو ننقل أو نحلل أي بيانات مستخدم، بما في ذلك على سبيل المثال لا الحصر: محتوى الفيديو الذي تشاهده، نص الترجمة المعترف به، نتائج الترجمة، سجل التصفح، أو أي معلومات شخصية.'] },
    { title: 'عدم نقل البيانات عبر الشبكة', paragraphs: ['لا يرسل هذا التطبيق أي بيانات مستخدم إلى خوادم خارجية أثناء الاستخدام العادي. تتم جميع عمليات معالجة الصوت وترجمة النص محلياً. يتم تنزيل نماذج الذكاء الاصطناعي من مصادر عامة (HuggingFace) عند الاستخدام الأول ويمكن أن تعمل بالكامل دون اتصال بعد ذلك.', 'يتواصل امتداد المتصفح وسكريبت المستخدم فقط مع الخادم المحلي على <code>localhost:18632</code>. لا يتم نقل أي بيانات إلى أي خادم بعيد يديره المطورون.'] },
    { title: 'بدون إعلانات، بدون تتبع، بدون توصيات', paragraphs: ['لا يحتوي هذا التطبيق على أنظمة إعلانية أو رموز تتبع سلوك المستخدم أو أدوات تحليل أو آليات توصية البيانات. نحن لا نشارك بيانات المستخدم مع أي أطراف ثالثة.'] },
    { title: 'مفتوح المصدر وشفاف', paragraphs: ['الكود المصدري للتطبيق متاح بالكامل للفحص. نشجع المستخدمين على مراجعة الكود للتحقق من ادعاءات الخصوصية والأمان الواردة في هذه السياسة.'] },
    { title: 'الملاذ الآمن ومسؤولية المستخدم', paragraphs: ['EchoShortsPlayer هو أداة تقنية للأغراض العامة مصممة فقط لمساعدة المستخدمين على فهم محتوى الفيديو. بموجب مبدأ الملاذ الآمن، لا يتحمل مطورو وناشرو هذا التطبيق أي مسؤولية قانونية عن أي محتوى يتم الوصول إليه أو ترجمته أو معالجته من قبل المستخدمين.', 'يجب على المستخدمين التأكد من أن استخدامهم يتوافق مع القوانين واللوائح المحلية وشروط خدمة المنصات التي يصلون إليها. تقع جميع المسؤولية القانونية على عاتق المستخدم وحده.', 'لا يصدر هذا التطبيق أي حكم أو ضمان بشأن قانونية المحتوى الذي يصل إليه المستخدمون.'] },
    { title: 'الاستخدام المقصود', paragraphs: ['تم تصميم هذا التطبيق كأداة مساعدة مخصصة للاستخدام الشخصي المحلي من قبل الأشخاص ذوي الإعاقة السمعية أو متعلمي اللغات أو من يحتاجون لفهم محتوى الفيديو بلغات أجنبية.'] },
    { title: 'القيود التقنية', paragraphs: ['يدعم هذا التطبيق تحليل محتوى الفيديو المتاح للعامة وغير المحمي بإدارة الحقوق الرقمية (DRM).', 'بالنسبة لملفات MP4 غير المشفرة بـ "fast-start"، يتطلب التطبيق تنزيلاً كاملاً قبل أن تبدأ الترجمة.'] },
    { title: 'إخلاء المسؤولية', paragraphs: ['يتم تقديم هذا التطبيق "كما هو" دون أي ضمانات صريحة أو ضمنية. لا يضمن المطور أن هذا التطبيق سيعمل بشكل صحيح في جميع البيئات.', 'الترجمات والعناوين الفرعية المقدمة يتم إنشاؤها تلقائياً بواسطة الآلة وهي للإشارة فقط.'] },
    { title: 'تحديثات السياسة', paragraphs: ['قد يتم تحديث سياسة الخصوصية هذه مع الإصدارات الجديدة. الاستمرار في استخدام هذا التطبيق يشكل قبولاً لأحدث إصدار من سياسة الخصوصية.'] },
  ]},
  'pt': { secTitle: 'Política de Privacidade e Isenção de Responsabilidade', footer: '&copy; 2025 EchoShortsPlayer. Todos os direitos reservados.', contact: 'Contate-nos', sections: [
    { title: 'Processamento Local de Dados', paragraphs: ['Todos os recursos principais do EchoShortsPlayer &mdash; incluindo reconhecimento de fala, tradução e download de mídia &mdash; são executados inteiramente no seu dispositivo local, alimentados por um servidor backend local (127.0.0.1:18632).', 'Não coletamos, armazenamos, transmitimos ou analisamos nenhum dado do usuário.'] },
    { title: 'Sem Transmissão de Dados pela Rede', paragraphs: ['Este aplicativo não envia nenhum dado do usuário para servidores externos durante o uso normal. Todo o processamento de áudio e tradução de texto são realizados localmente.', 'A extensão do navegador e o userscript se comunicam apenas com o backend local em <code>localhost:18632</code>.'] },
    { title: 'Sem Anúncios, Sem Rastreamento, Sem Recomendações', paragraphs: ['Este aplicativo não contém sistemas de publicidade, código de rastreamento de comportamento do usuário, análises ou mecanismos de recomendação de dados.'] },
    { title: 'Código Aberto e Transparente', paragraphs: ['O código-fonte do aplicativo está totalmente disponível para inspeção. Os usuários são encorajados a revisar o código para verificar as alegações de privacidade e segurança feitas nesta política.'] },
    { title: 'Porto Seguro e Responsabilidade do Usuário', paragraphs: ['EchoShortsPlayer é uma ferramenta técnica de uso geral projetada exclusivamente para ajudar os usuários a entender o conteúdo de vídeo. Os desenvolvedores não assumem responsabilidade legal por qualquer conteúdo acessado, traduzido ou processado pelos usuários.', 'Os usuários devem garantir que seu uso está em conformidade com as leis e regulamentos locais. Toda responsabilidade legal recai exclusivamente sobre o usuário.', 'Este aplicativo não faz julgamentos ou garantias sobre a legalidade do conteúdo acessado pelos usuários.'] },
    { title: 'Uso Pretendido', paragraphs: ['Este aplicativo é projetado como uma ferramenta assistiva destinada ao uso pessoal local por pessoas com deficiência auditiva, estudantes de idiomas ou que precisam entender conteúdo de vídeo em idiomas estrangeiros.'] },
    { title: 'Limitações Técnicas', paragraphs: ['Este aplicativo suporta análise de conteúdo de vídeo acessível publicamente não protegido por DRM.', 'Para arquivos MP4 que não são codificados com "fast-start", o aplicativo requer download completo antes que a tradução possa começar.'] },
    { title: 'Isenção de Responsabilidade', paragraphs: ['Este aplicativo é fornecido "como está" sem quaisquer garantias expressas ou implícitas.', 'Legendas e traduções são geradas automaticamente por máquina e são apenas para referência.'] },
    { title: 'Atualizações da Política', paragraphs: ['Esta política de privacidade pode ser atualizada com novas versões. O uso continuado deste aplicativo constitui a aceitação da versão mais recente da política de privacidade.'] },
  ]},
  'fr': { secTitle: 'Politique de Confidentialité et Clause de Non-responsabilité', footer: '&copy; 2025 EchoShortsPlayer. Tous droits réservés.', contact: 'Nous Contacter', sections: [
    { title: 'Traitement Local des Données', paragraphs: ['Toutes les fonctionnalités principales d\'EchoShortsPlayer &mdash; y compris la reconnaissance vocale, la traduction et le téléchargement de médias &mdash; s\'exécutent entièrement sur votre appareil local, alimentées par un serveur backend local (127.0.0.1:18632).', 'Nous ne collectons, stockons, transmettons ou analysons aucune donnée utilisateur.'] },
    { title: 'Aucune Transmission de Données Réseau', paragraphs: ['Cette application n\'envoie aucune donnée utilisateur à des serveurs externes pendant l\'utilisation normale. Tout le traitement audio et la traduction de texte sont effectués localement.', 'L\'extension de navigateur et le script utilisateur communiquent uniquement avec le backend local sur <code>localhost:18632</code>.'] },
    { title: 'Pas de Publicité, Pas de Suivi, Pas de Recommandations', paragraphs: ['Cette application ne contient aucun système publicitaire, code de suivi du comportement des utilisateurs, outils d\'analyse ou mécanismes de recommandation de données.'] },
    { title: 'Open Source et Transparent', paragraphs: ['Le code source de l\'application est entièrement disponible pour inspection. Les utilisateurs sont encouragés à examiner le code pour vérifier les déclarations de confidentialité et de sécurité faites dans cette politique.'] },
    { title: 'Sphère de Sécurité et Responsabilité de l\'Utilisateur', paragraphs: ['EchoShortsPlayer est un outil technique à usage général conçu uniquement pour aider les utilisateurs à comprendre le contenu vidéo. Les développeurs n\'assument aucune responsabilité légale pour tout contenu consulté, traduit ou traité par les utilisateurs.', 'Les utilisateurs doivent s\'assurer que leur utilisation est conforme aux lois et réglementations locales. Toute responsabilité légale incombe uniquement à l\'utilisateur.', 'Cette application ne porte aucun jugement ni garantie sur la légalité du contenu consulté par les utilisateurs.'] },
    { title: 'Utilisation Prévue', paragraphs: ['Cette application est conçue comme un outil d\'assistance destiné à l\'usage personnel local par des personnes malentendantes, des apprenants de langues ou ceux qui ont besoin de comprendre du contenu vidéo en langues étrangères.'] },
    { title: 'Limitations Techniques', paragraphs: ['Cette application prend en charge l\'analyse de contenu vidéo accessible publiquement non protégé par DRM.', 'Pour les fichiers MP4 non encodés en "fast-start", l\'application nécessite un téléchargement complet avant que la traduction puisse commencer.'] },
    { title: 'Clause de Non-responsabilité', paragraphs: ['Cette application est fournie "en l\'état" sans aucune garantie expresse ou implicite.', 'Les sous-titres et traductions sont générés automatiquement par machine et sont fournis à titre indicatif uniquement.'] },
    { title: 'Mises à Jour de la Politique', paragraphs: ['Cette politique de confidentialité peut être mise à jour avec de nouvelles versions. L\'utilisation continue de cette application constitue l\'acceptation de la dernière version de la politique de confidentialité.'] },
  ]},
  'ru': { secTitle: 'Политика конфиденциальности и отказ от ответственности', footer: '&copy; 2025 EchoShortsPlayer. Все права защищены.', contact: 'Связаться с нами', sections: [
    { title: 'Локальная обработка данных', paragraphs: ['Все основные функции EchoShortsPlayer &mdash; включая распознавание речи, перевод и загрузку медиа &mdash; работают полностью на вашем локальном устройстве, используя локальный сервер (127.0.0.1:18632).', 'Мы не собираем, не храним, не передаём и не анализируем никакие данные пользователей.'] },
    { title: 'Отсутствие сетевой передачи данных', paragraphs: ['Это приложение не отправляет никаких данных пользователя на внешние серверы при обычном использовании. Вся обработка аудио и перевод текста выполняются локально.', 'Расширение браузера и пользовательский скрипт взаимодействуют только с локальным сервером на <code>localhost:18632</code>.'] },
    { title: 'Без рекламы, без отслеживания, без рекомендаций', paragraphs: ['Это приложение не содержит рекламных систем, кода отслеживания поведения пользователей, аналитических инструментов или механизмов рекомендаций данных.'] },
    { title: 'Открытый исходный код и прозрачность', paragraphs: ['Исходный код приложения полностью доступен для проверки. Пользователям рекомендуется изучить код для проверки заявлений о конфиденциальности и безопасности, сделанных в данной политике.'] },
    { title: 'Безопасная гавань и ответственность пользователя', paragraphs: ['EchoShortsPlayer — это универсальный технический инструмент, предназначенный исключительно для помощи пользователям в понимании видеоконтента. Разработчики не несут юридической ответственности за любой контент, к которому пользователи получают доступ, переводят или обрабатывают.', 'Пользователи должны убедиться, что их использование соответствует местным законам и правилам. Вся юридическая ответственность лежит исключительно на пользователе.', 'Это приложение не даёт оценок и гарантий относительно законности контента, к которому обращаются пользователи.'] },
    { title: 'Предназначение', paragraphs: ['Это приложение разработано как вспомогательный инструмент для личного локального использования людьми с нарушениями слуха, изучающими языки или нуждающимися в понимании видеоконтента на иностранных языках.'] },
    { title: 'Технические ограничения', paragraphs: ['Это приложение поддерживает анализ общедоступного видеоконтента, не защищённого DRM.', 'Для файлов MP4, не закодированных в формате "fast-start", приложению требуется полная загрузка перед началом перевода.'] },
    { title: 'Отказ от ответственности', paragraphs: ['Это приложение предоставляется «как есть» без каких-либо явных или подразумеваемых гарантий.', 'Субтитры и переводы генерируются автоматически машиной и предназначены только для справки.'] },
    { title: 'Обновления политики', paragraphs: ['Данная политика конфиденциальности может обновляться с новыми версиями. Продолжение использования этого приложения означает принятие последней версии политики конфиденциальности.'] },
  ]},
  'de': { secTitle: 'Datenschutzrichtlinie und Haftungsausschluss', footer: '&copy; 2025 EchoShortsPlayer. Alle Rechte vorbehalten.', contact: 'Kontakt', sections: [
    { title: 'Lokale Datenverarbeitung', paragraphs: ['Alle Kernfunktionen von EchoShortsPlayer &mdash; einschließlich Spracherkennung, Übersetzung und Medien-Download &mdash; laufen vollständig auf Ihrem lokalen Gerät, betrieben durch einen lokalen Backend-Server (127.0.0.1:18632).', 'Wir erheben, speichern, übertragen oder analysieren keine Benutzerdaten.'] },
    { title: 'Keine Netzwerk-Datenübertragung', paragraphs: ['Diese Anwendung sendet bei normalem Gebrauch keine Benutzerdaten an externe Server. Alle Audio- und Textverarbeitungen werden lokal durchgeführt.', 'Die Browser-Erweiterung und das Userscript kommunizieren nur mit dem lokalen Backend unter <code>localhost:18632</code>.'] },
    { title: 'Keine Werbung, kein Tracking, keine Empfehlungen', paragraphs: ['Diese Anwendung enthält keine Werbesysteme, keinen Code zur Verfolgung des Nutzerverhaltens, keine Analysetools oder Datenempfehlungsmechanismen.'] },
    { title: 'Open Source und Transparent', paragraphs: ['Der Quellcode der Anwendung ist vollständig zur Inspektion verfügbar. Benutzer werden ermutigt, den Code zu überprüfen, um die in dieser Richtlinie gemachten Datenschutz- und Sicherheitsaussagen zu verifizieren.'] },
    { title: 'Safe Harbor und Benutzerverantwortung', paragraphs: ['EchoShortsPlayer ist ein universelles technisches Werkzeug, das ausschließlich dazu dient, Benutzern beim Verständnis von Videoinhalten zu helfen. Die Entwickler übernehmen keine rechtliche Haftung für Inhalte, auf die Benutzer zugreifen, die sie übersetzen oder verarbeiten.', 'Benutzer müssen sicherstellen, dass ihre Nutzung den örtlichen Gesetzen und Vorschriften entspricht. Jegliche rechtliche Haftung liegt ausschließlich beim Benutzer.', 'Diese Anwendung gibt keine Beurteilung oder Garantie hinsichtlich der Rechtmäßigkeit der von Benutzern abgerufenen Inhalte ab.'] },
    { title: 'Bestimmungsgemäße Verwendung', paragraphs: ['Diese Anwendung ist als Hilfswerkzeug für die persönliche lokale Nutzung durch Menschen mit Hörbeeinträchtigungen, Sprachlernende oder Personen gedacht, die Videoinhalte in Fremdsprachen verstehen müssen.'] },
    { title: 'Technische Einschränkungen', paragraphs: ['Diese Anwendung unterstützt die Analyse von öffentlich zugänglichen Videoinhalten, die nicht durch DRM geschützt sind.', 'Für MP4-Dateien, die nicht im "Fast-Start"-Format kodiert sind, erfordert die Anwendung einen vollständigen Download, bevor die Übersetzung beginnen kann.'] },
    { title: 'Haftungsausschluss', paragraphs: ['Diese Anwendung wird "wie besehen" ohne ausdrückliche oder stillschweigende Garantien bereitgestellt.', 'Untertitel und Übersetzungen werden automatisch maschinell erstellt und dienen nur als Referenz.'] },
    { title: 'Richtlinien-Updates', paragraphs: ['Diese Datenschutzrichtlinie kann mit neuen Versionen aktualisiert werden. Die fortgesetzte Nutzung dieser Anwendung stellt die Annahme der neuesten Version der Datenschutzrichtlinie dar.'] },
  ]},
  'ja': { secTitle: 'プライバシーポリシーと免責事項', footer: '&copy; 2025 EchoShortsPlayer. All rights reserved.', contact: 'お問い合わせ', sections: [
    { title: 'ローカルデータ処理', paragraphs: ['EchoShortsPlayerのすべての主要機能&mdash;音声認識、翻訳、メディアダウンロードを含む&mdash;は、ローカルバックエンドサーバー（127.0.0.1:18632）により、お使いのデバイス上で完全に実行されます。', '当社はユーザーデータを一切収集、保存、送信、分析しません。'] },
    { title: 'ネットワークデータ転送なし', paragraphs: ['本アプリケーションは通常の使用中にユーザーデータを外部サーバーに送信しません。すべての音声処理とテキスト翻訳はローカルで完了します。', 'ブラウザ拡張機能とユーザースクリプトは<code>localhost:18632</code>のローカルバックエンドとのみ通信します。'] },
    { title: '広告なし、追跡なし、レコメンドなし', paragraphs: ['本アプリケーションには広告システム、ユーザー行動追跡コード、分析ツール、データ推薦メカニズムは含まれていません。'] },
    { title: 'オープンソースと透明性', paragraphs: ['アプリケーションのソースコードは検査のために完全に公開されています。ユーザーの皆様には、本ポリシーで述べられているプライバシーとセキュリティの主張を確認するためにコードをレビューすることをお勧めします。'] },
    { title: 'セーフハーバーとユーザーの責任', paragraphs: ['EchoShortsPlayerは、ユーザーがビデオコンテンツを理解するのを支援するためだけに設計された汎用技術ツールです。開発者は、ユーザーがアクセス、翻訳、処理したコンテンツについて法的責任を負いません。', 'ユーザーは、使用が現地の法律および規制、アクセスするプラットフォームの利用規約に準拠していることを確認する必要があります。すべての法的責任はユーザーのみに帰属します。', '本アプリケーションは、ユーザーがアクセスするコンテンツの合法性について判断や保証を行いません。'] },
    { title: '想定される使用方法', paragraphs: ['本アプリケーションは、聴覚障害者、語学学習者、または外国語のビデオコンテンツを理解する必要がある方の個人的なローカル使用を目的とした補助ツールとして設計されています。'] },
    { title: '技術的制限', paragraphs: ['本アプリケーションは、DRMで保護されていない公開アクセス可能なビデオコンテンツの分析をサポートしています。', 'fast-startエンコードされていないMP4ファイルの場合、翻訳を開始する前に完全なダウンロードが必要です。'] },
    { title: '免責事項', paragraphs: ['本アプリケーションは、明示または黙示の保証なしに「現状のまま」提供されます。', '字幕と翻訳は機械によって自動生成されたものであり、参考としてのみ提供されます。'] },
    { title: 'ポリシーの更新', paragraphs: ['本プライバシーポリシーは新しいバージョンとともに更新される場合があります。本アプリケーションの継続使用は、最新版のプライバシーポリシーへの同意を意味します。'] },
  ]},
  'ko': { secTitle: '개인정보 보호정책 및 면책조항', footer: '&copy; 2025 EchoShortsPlayer. All rights reserved.', contact: '문의하기', sections: [
    { title: '로컬 데이터 처리', paragraphs: ['EchoShortsPlayer의 모든 핵심 기능&mdash;음성 인식, 번역, 미디어 다운로드 포함&mdash;은 로컬 백엔드 서버(127.0.0.1:18632)를 통해 사용자의 기기에서 완전히 실행됩니다.', '당사는 사용자 데이터를 일체 수집, 저장, 전송 또는 분석하지 않습니다.'] },
    { title: '네트워크 데이터 전송 없음', paragraphs: ['이 애플리케이션은 정상 사용 중 사용자 데이터를 외부 서버로 전송하지 않습니다. 모든 오디오 처리와 텍스트 번역은 로컬에서 완료됩니다.', '브라우저 확장 프로그램과 유저스크립트는 <code>localhost:18632</code>의 로컬 백엔드와만 통신합니다.'] },
    { title: '광고 없음, 추적 없음, 추천 없음', paragraphs: ['이 애플리케이션에는 광고 시스템, 사용자 행동 추적 코드, 분석 도구 또는 데이터 추천 메커니즘이 포함되어 있지 않습니다.'] },
    { title: '오픈 소스 및 투명성', paragraphs: ['애플리케이션의 소스 코드는 검토를 위해 완전히 공개되어 있습니다. 사용자는 이 정책에서 주장하는 개인정보 보호 및 보안 사항을 확인하기 위해 코드를 검토하는 것이 좋습니다.'] },
    { title: '세이프 하버 및 사용자 책임', paragraphs: ['EchoShortsPlayer는 사용자가 비디오 콘텐츠를 이해하는 것을 돕기 위해 설계된 범용 기술 도구입니다. 개발자는 사용자가 액세스, 번역 또는 처리하는 콘텐츠에 대해 법적 책임을 지지 않습니다.', '사용자는 자신의 사용이 현지 법률 및 규정과 액세스하는 플랫폼의 서비스 약관을 준수하는지 확인해야 합니다. 모든 법적 책임은 사용자에게만 있습니다.'] },
    { title: '의도된 용도', paragraphs: ['이 애플리케이션은 청각 장애인, 언어 학습자 또는 외국어 비디오 콘텐츠를 이해해야 하는 개인의 개인 로컬 사용을 위한 보조 도구로 설계되었습니다.'] },
    { title: '기술적 제한', paragraphs: ['이 애플리케이션은 DRM으로 보호되지 않는 공개적으로 접근 가능한 비디오 콘텐츠의 분석을 지원합니다.', 'fast-start로 인코딩되지 않은 MP4 파일의 경우, 번역을 시작하기 전에 전체 다운로드가 필요합니다.'] },
    { title: '면책조항', paragraphs: ['이 애플리케이션은 명시적이든 묵시적이든 어떠한 보증 없이 "있는 그대로" 제공됩니다.', '자막과 번역은 기계에 의해 자동으로 생성되며 참고용으로만 제공됩니다.'] },
    { title: '정책 업데이트', paragraphs: ['이 개인정보 보호정책은 새로운 버전과 함께 업데이트될 수 있습니다. 이 애플리케이션의 계속 사용은 최신 버전의 개인정보 보호정책에 대한 동의를 의미합니다.'] },
  ]},
  'hi': { secTitle: 'गोपनीयता नीति और अस्वीकरण', footer: '&copy; 2025 EchoShortsPlayer. सर्वाधिकार सुरक्षित।', contact: 'हमसे संपर्क करें', sections: [
    { title: 'स्थानीय डेटा प्रसंस्करण', paragraphs: ['EchoShortsPlayer की सभी मुख्य सुविधाएं &mdash; जिसमें वाक् पहचान, अनुवाद और मीडिया डाउनलोड शामिल है &mdash; आपके स्थानीय डिवाइस पर पूरी तरह से चलती हैं, स्थानीय बैकएंड सर्वर (127.0.0.1:18632) द्वारा संचालित।', 'हम कोई भी उपयोगकर्ता डेटा एकत्र, संग्रहीत, प्रेषित या विश्लेषण नहीं करते हैं।'] },
    { title: 'कोई नेटवर्क डेटा ट्रांसमिशन नहीं', paragraphs: ['यह एप्लिकेशन सामान्य उपयोग के दौरान बाहरी सर्वरों को कोई उपयोगकर्ता डेटा नहीं भेजता है।', 'ब्राउज़र एक्सटेंशन और यूज़रस्क्रिप्ट केवल <code>localhost:18632</code> पर स्थानीय बैकएंड से संवाद करते हैं।'] },
    { title: 'कोई विज्ञापन नहीं, कोई ट्रैकिंग नहीं, कोई अनुशंसाएं नहीं', paragraphs: ['इस एप्लिकेशन में कोई विज्ञापन प्रणाली, उपयोगकर्ता व्यवहार ट्रैकिंग कोड, एनालिटिक्स या डेटा अनुशंसा तंत्र नहीं है।'] },
    { title: 'ओपन सोर्स और पारदर्शी', paragraphs: ['एप्लिकेशन का स्रोत कोड निरीक्षण के लिए पूरी तरह उपलब्ध है।'] },
    { title: 'सेफ हार्बर और उपयोगकर्ता की जिम्मेदारी', paragraphs: ['EchoShortsPlayer एक सामान्य-उद्देश्य तकनीकी उपकरण है जो केवल उपयोगकर्ताओं को वीडियो सामग्री समझने में मदद करने के लिए डिज़ाइन किया गया है। डेवलपर्स किसी भी सामग्री के लिए कानूनी जिम्मेदारी नहीं लेते।', 'उपयोगकर्ताओं को यह सुनिश्चित करना चाहिए कि उनका उपयोग स्थानीय कानूनों और विनियमों का अनुपालन करता है। सभी कानूनी जिम्मेदारी केवल उपयोगकर्ता की है।'] },
    { title: 'इच्छित उपयोग', paragraphs: ['यह एप्लिकेशन श्रवण बाधित व्यक्तियों, भाषा सीखने वालों या विदेशी भाषाओं में वीडियो सामग्री समझने वालों के व्यक्तिगत स्थानीय उपयोग के लिए एक सहायक उपकरण के रूप में डिज़ाइन किया गया है।'] },
    { title: 'तकनीकी सीमाएं', paragraphs: ['यह एप्लिकेशन DRM द्वारा संरक्षित नहीं सार्वजनिक रूप से सुलभ वीडियो सामग्री के विश्लेषण का समर्थन करता है।', 'गैर-fast-start MP4 फ़ाइलों के लिए, अनुवाद शुरू होने से पहले पूर्ण डाउनलोड आवश्यक है।'] },
    { title: 'अस्वीकरण', paragraphs: ['यह एप्लिकेशन किसी भी स्पष्ट या निहित गारंटी के बिना "जैसा है" प्रदान किया जाता है।', 'उपशीर्षक और अनुवाद मशीन द्वारा स्वचालित रूप से उत्पन्न होते हैं और केवल संदर्भ के लिए हैं।'] },
    { title: 'नीति अपडेट', paragraphs: ['यह गोपनीयता नीति नए संस्करणों के साथ अपडेट हो सकती है। इस एप्लिकेशन का निरंतर उपयोग गोपनीयता नीति के नवीनतम संस्करण की स्वीकृति है।'] },
  ]},
  'th': { secTitle: 'นโยบายความเป็นส่วนตัวและข้อจำกัดความรับผิดชอบ', footer: '&copy; 2025 EchoShortsPlayer. สงวนลิขสิทธิ์', contact: 'ติดต่อเรา', sections: [
    { title: 'การประมวลผลข้อมูลในเครื่อง', paragraphs: ['ฟีเจอร์หลักทั้งหมดของ EchoShortsPlayer &mdash; รวมถึงการรู้จำเสียง การแปล และการดาวน์โหลดสื่อ &mdash; ทำงานบนอุปกรณ์ของคุณทั้งหมด ขับเคลื่อนโดยเซิร์ฟเวอร์แบ็คเอนด์ในเครื่อง (127.0.0.1:18632)', 'เราไม่เก็บรวบรวม จัดเก็บ ส่ง หรือวิเคราะห์ข้อมูลผู้ใช้ใด ๆ'] },
    { title: 'ไม่มีการส่งข้อมูลผ่านเครือข่าย', paragraphs: ['แอปพลิเคชันนี้ไม่ส่งข้อมูลผู้ใช้ไปยังเซิร์ฟเวอร์ภายนอกระหว่างการใช้งานปกติ', 'ส่วนขยายเบราว์เซอร์และยูสเซอร์สคริปต์สื่อสารกับแบ็คเอนด์ในเครื่องที่ <code>localhost:18632</code> เท่านั้น'] },
    { title: 'ไม่มีโฆษณา ไม่มีการติดตาม ไม่มีคำแนะนำ', paragraphs: ['แอปพลิเคชันนี้ไม่มีระบบโฆษณา โค้ดติดตามพฤติกรรมผู้ใช้ เครื่องมือวิเคราะห์ หรือกลไกแนะนำข้อมูล'] },
    { title: 'โอเพนซอร์สและโปร่งใส', paragraphs: ['ซอร์สโค้ดของแอปพลิเคชันเปิดให้ตรวจสอบได้อย่างเต็มที่'] },
    { title: 'Safe Harbor และความรับผิดชอบของผู้ใช้', paragraphs: ['EchoShortsPlayer เป็นเครื่องมือเทคนิคทั่วไปที่ออกแบบมาเพื่อช่วยผู้ใช้ทำความเข้าใจเนื้อหาวิดีโอเท่านั้น นักพัฒนาไม่รับผิดชอบทางกฎหมายสำหรับเนื้อหาใด ๆ ที่ผู้ใช้เข้าถึง แปล หรือประมวลผล', 'ผู้ใช้ต้องมั่นใจว่าการใช้งานของตนเป็นไปตามกฎหมายและข้อบังคับท้องถิ่น ความรับผิดทางกฎหมายทั้งหมดตกอยู่ที่ผู้ใช้เท่านั้น'] },
    { title: 'การใช้งานที่ตั้งใจ', paragraphs: ['แอปพลิเคชันนี้ออกแบบเป็นเครื่องมือช่วยเหลือสำหรับการใช้งานส่วนตัวในเครื่องโดยผู้พิการทางการได้ยิน ผู้เรียนภาษา หรือผู้ที่ต้องการทำความเข้าใจเนื้อหาวิดีโอในภาษาต่างประเทศ'] },
    { title: 'ข้อจำกัดทางเทคนิค', paragraphs: ['แอปพลิเคชันนี้รองรับการวิเคราะห์เนื้อหาวิดีโอที่เข้าถึงได้สาธารณะซึ่งไม่ได้รับการป้องกันโดย DRM', 'สำหรับไฟล์ MP4 ที่ไม่ได้เข้ารหัสแบบ fast-start จำเป็นต้องดาวน์โหลดทั้งหมดก่อนเริ่มการแปล'] },
    { title: 'ข้อจำกัดความรับผิดชอบ', paragraphs: ['แอปพลิเคชันนี้ให้บริการ "ตามสภาพ" โดยไม่มีการรับประกันใด ๆ ทั้งโดยชัดแจ้งหรือโดยนัย', 'คำบรรยายและการแปลถูกสร้างขึ้นโดยอัตโนมัติโดยเครื่องจักรและมีไว้เพื่ออ้างอิงเท่านั้น'] },
    { title: 'การอัปเดตนโยบาย', paragraphs: ['นโยบายความเป็นส่วนตัวนี้อาจได้รับการอัปเดตพร้อมกับเวอร์ชันใหม่ การใช้แอปพลิเคชันนี้ต่อไปถือเป็นการยอมรับนโยบายความเป็นส่วนตัวเวอร์ชันล่าสุด'] },
  ]},
  'vi': { secTitle: 'Chính Sách Bảo Mật và Tuyên Bố Miễn Trừ', footer: '&copy; 2025 EchoShortsPlayer. Bảo lưu mọi quyền.', contact: 'Liên hệ', sections: [
    { title: 'Xử Lý Dữ Liệu Cục Bộ', paragraphs: ['Tất cả các tính năng cốt lõi của EchoShortsPlayer &mdash; bao gồm nhận dạng giọng nói, dịch thuật và tải phương tiện &mdash; chạy hoàn toàn trên thiết bị cục bộ của bạn, được hỗ trợ bởi máy chủ backend cục bộ (127.0.0.1:18632).', 'Chúng tôi không thu thập, lưu trữ, truyền tải hoặc phân tích bất kỳ dữ liệu người dùng nào.'] },
    { title: 'Không Truyền Dữ Liệu Qua Mạng', paragraphs: ['Ứng dụng này không gửi dữ liệu người dùng đến máy chủ bên ngoài trong quá trình sử dụng bình thường.', 'Tiện ích mở rộng trình duyệt và userscript chỉ giao tiếp với backend cục bộ tại <code>localhost:18632</code>.'] },
    { title: 'Không Quảng Cáo, Không Theo Dõi, Không Đề Xuất', paragraphs: ['Ứng dụng này không chứa hệ thống quảng cáo, mã theo dõi hành vi người dùng, công cụ phân tích hoặc cơ chế đề xuất dữ liệu.'] },
    { title: 'Mã Nguồn Mở và Minh Bạch', paragraphs: ['Mã nguồn của ứng dụng hoàn toàn sẵn có để kiểm tra.'] },
    { title: 'Cảng An Toàn và Trách Nhiệm Người Dùng', paragraphs: ['EchoShortsPlayer là công cụ kỹ thuật đa năng được thiết kế chỉ để giúp người dùng hiểu nội dung video. Nhà phát triển không chịu trách nhiệm pháp lý cho bất kỳ nội dung nào mà người dùng truy cập, dịch hoặc xử lý.', 'Người dùng phải đảm bảo việc sử dụng tuân thủ luật pháp và quy định địa phương. Mọi trách nhiệm pháp lý thuộc về người dùng.'] },
    { title: 'Mục Đích Sử Dụng', paragraphs: ['Ứng dụng này được thiết kế như một công cụ hỗ trợ dành cho người khiếm thính, người học ngoại ngữ hoặc những người cần hiểu nội dung video bằng tiếng nước ngoài.'] },
    { title: 'Hạn Chế Kỹ Thuật', paragraphs: ['Ứng dụng này hỗ trợ phân tích nội dung video có thể truy cập công khai không được bảo vệ bởi DRM.', 'Đối với tệp MP4 không được mã hóa fast-start, ứng dụng yêu cầu tải xuống hoàn toàn trước khi bắt đầu dịch.'] },
    { title: 'Tuyên Bố Miễn Trừ', paragraphs: ['Ứng dụng này được cung cấp "nguyên trạng" không có bất kỳ bảo đảm nào.', 'Phụ đề và bản dịch được tạo tự động bởi máy và chỉ mang tính tham khảo.'] },
    { title: 'Cập Nhật Chính Sách', paragraphs: ['Chính sách bảo mật này có thể được cập nhật cùng với phiên bản mới. Tiếp tục sử dụng ứng dụng này đồng nghĩa với việc chấp nhận phiên bản mới nhất của chính sách bảo mật.'] },
  ]},
  'ms': { secTitle: 'Dasar Privasi dan Penafian', footer: '&copy; 2025 EchoShortsPlayer. Hak cipta terpelihara.', contact: 'Hubungi Kami', sections: [
    { title: 'Pemprosesan Data Tempatan', paragraphs: ['Semua ciri teras EchoShortsPlayer &mdash; termasuk pengecaman suara, penterjemahan dan muat turun media &mdash; berjalan sepenuhnya pada peranti tempatan anda, dikuasakan oleh pelayan backend tempatan (127.0.0.1:18632).', 'Kami tidak mengumpul, menyimpan, menghantar atau menganalisis sebarang data pengguna.'] },
    { title: 'Tiada Penghantaran Data Rangkaian', paragraphs: ['Aplikasi ini tidak menghantar sebarang data pengguna ke pelayan luaran semasa penggunaan biasa.', 'Sambungan pelayar dan skrip pengguna hanya berkomunikasi dengan backend tempatan di <code>localhost:18632</code>.'] },
    { title: 'Tiada Iklan, Tiada Penjejakan, Tiada Cadangan', paragraphs: ['Aplikasi ini tidak mengandungi sistem pengiklanan, kod penjejakan tingkah laku pengguna, alat analitik atau mekanisme cadangan data.'] },
    { title: 'Sumber Terbuka dan Telus', paragraphs: ['Kod sumber aplikasi tersedia sepenuhnya untuk pemeriksaan.'] },
    { title: 'Pelabuhan Selamat dan Tanggungjawab Pengguna', paragraphs: ['EchoShortsPlayer ialah alat teknikal kegunaan umum yang direka semata-mata untuk membantu pengguna memahami kandungan video. Pembangun tidak menanggung liabiliti undang-undang untuk sebarang kandungan yang diakses, diterjemah atau diproses oleh pengguna.', 'Pengguna mesti memastikan penggunaan mereka mematuhi undang-undang dan peraturan tempatan. Semua liabiliti undang-undang terletak pada pengguna semata-mata.'] },
    { title: 'Kegunaan Yang Dimaksudkan', paragraphs: ['Aplikasi ini direka sebagai alat bantuan untuk kegunaan peribadi tempatan oleh individu kurang pendengaran, pelajar bahasa atau mereka yang perlu memahami kandungan video dalam bahasa asing.'] },
    { title: 'Had Teknikal', paragraphs: ['Aplikasi ini menyokong analisis kandungan video yang boleh diakses secara awam yang tidak dilindungi oleh DRM.', 'Untuk fail MP4 yang tidak dikodkan fast-start, aplikasi memerlukan muat turun penuh sebelum penterjemahan boleh dimulakan.'] },
    { title: 'Penafian', paragraphs: ['Aplikasi ini disediakan "seadanya" tanpa sebarang jaminan nyata atau tersirat.', 'Sari kata dan terjemahan dijana secara automatik oleh mesin dan hanya untuk rujukan.'] },
    { title: 'Kemas Kini Dasar', paragraphs: ['Dasar privasi ini mungkin dikemas kini dengan versi baharu. Penggunaan berterusan aplikasi ini merupakan penerimaan versi terkini dasar privasi.'] },
  ]},
};

// --- Build function for fully translated languages (zh, cht) ---
function buildTranslated(key, data) {
  const t = data.t;
  const file = data.file;

  // Update the language dropdown selected state
  let html = template
    .replace('lang="en"', `lang="${data.lang}"`)
    .replace(`<title>EchoShortsPlayer - AI Video Subtitle Translation</title>`, `<title>${t.title}</title>`)
    // Dropdown: unselect English, select this lang
    .replace(`<option value="home.html" selected>English</option>`, `<option value="home.html">English</option>`)
    .replace(`<option value="${file}">${data.label}</option>`, `<option value="${file}" selected>${data.label}</option>`)
    // Hero
    .replace('AI Video Translation &amp; Subtitles<br><span>Stream, Translate, Download &mdash; All Offline</span>', t.h1)
    .replace(/EchoShortsPlayer translates online videos.*?m3u8 streams and MP4 files\./s, t.heroP)
    // Section titles
    .replace('<span class="num">#1</span> Features', `<span class="num">#1</span> ${t.sec1}`)
    .replace('<span class="num">#2</span> How to Use', `<span class="num">#2</span> ${t.sec2}`)
    .replace('<span class="num">#3</span> Privacy Policy &amp; Disclaimer', `<span class="num">#3</span> ${t.sec3}`)
    // Feature cards
    .replace('>Speech Recognition<', `>${t.f1t}<`).replace(/Powered by OpenAI Whisper\. Supports 99 languages.*?highest accuracy\)\./, t.f1p)
    .replace('>AI Translation<', `>${t.f2t}<`).replace('Multiple translation engines:', t.f2p)
    .replace('Opus-MT &mdash; fast, 9 languages', t.f2l1).replace('NLLB &mdash; 32+ languages, any-to-any', t.f2l2).replace('Qwen &mdash; best quality, CJK-optimized', t.f2l3)
    .replace('>Media Detection<', `>${t.f3t}<`).replace(/Automatically detects m3u8\/HLS.*?userscript\./, t.f3p)
    .replace('>Real-time Subtitles<', `>${t.f4t}<`).replace(/Stream translation mode.*?future use\./, t.f4p)
    .replace('>100% Offline &amp; Private<', `>${t.f5t}<`).replace(/All processing happens locally.*?on your device\./, t.f5p)
    .replace('>Hardware Requirements<', `>${t.f6t}<`).replace(/NVIDIA GPU with 8 GB\+.*?optimal performance\./, t.f6p)
    // Install section
    .replace('Install EchoShortsPlayer <span class="tag">Required', `${t.instTitle.replace('&#128229; ', '')} <span class="tag">${t.instTag}`)
    .replace('Desktop application &mdash; the core engine for all features', t.instSub)
    .replace(/EchoShortsPlayer is the desktop application.*?methods below\./, t.instP1)
    .replace('>Download EchoShortsPlayer<', `>${t.instDlBtn}<`)
    .replace(/<p><strong>System requirements:<\/strong>.*?installed\.<\/p>/, `<p>${t.instReq}</p>`)
    .replace(/After installation, launch the application\..*?communicate with\.<\/p>/, `<p>${t.instAfter}</p>`)
    // Tampermonkey
    .replace('Tampermonkey Userscript <span class="tag">Easiest', `${t.tmTitle.replace('&#129668; ', '')} <span class="tag">${t.tmTag}`)
    .replace('Zero-install media detection for any browser', t.tmSub)
    .replace(/The Tampermonkey userscript injects.*?<strong>Translate<\/strong> buttons\./, t.tmP1)
    .replace(/<p><strong>Step 1:<\/strong> Install the Tampermonkey browser extension:<\/p>/, `<p>${t.tmStep1}</p>`)
    .replace('>Tampermonkey Official Site<', `>${t.tmSite}<`).replace('>Chrome Web Store<', `>${t.tmChrome}<`)
    .replace(/<p><strong>Step 2:<\/strong> Install the EchoShortsPlayer userscript:<\/p>/, `<p>${t.tmStep2}</p>`)
    .replace('>Install Userscript<', `>${t.tmInstall}<`)
    .replace(/<p><strong>Step 3:<\/strong> Make sure.*?<\/code>\)\.<\/p>/, `<p>${t.tmStep3}</p>`)
    .replace(/<p><strong>Step 4:<\/strong> Visit any.*?<strong>Translate<\/strong>\.<\/p>/, `<p>${t.tmStep4}</p>`)
    .replace('Why use the userscript?', t.tmAdvTitle)
    .replace('Works in any browser that supports Tampermonkey (Chrome, Firefox, Edge, Safari, Opera)', t.tmAdv1)
    .replace(/No Chrome extension installation required.*?restricted/, t.tmAdv2)
    .replace('Lightweight: single file, easy to inspect and modify', t.tmAdv3)
    .replace(/Auto-updates via Tampermonkey.*?mechanism/, t.tmAdv4)
    .replace('Detects both m3u8/HLS streams and direct MP4 links on pages', t.tmAdv5)
    // Extension
    .replace('Chrome Extension <span class="tag">Recommended', `${t.extTitle.replace('&#128268; ', '')} <span class="tag">${t.extTag}`)
    .replace('Deep network-level media interception', t.extSub)
    .replace(/The Chrome extension uses the.*?download links\./, t.extP1)
    .replace('<strong>Installation (developer mode):</strong>', t.extInstTitle)
    .replace('>Download Extension (.zip)<', `>${t.extDlBtn}<`)
    .replace(/Download the extension zip above and extract it to a folder\./, t.extI1)
    .replace(/Open Chrome and navigate to <code>chrome:\/\/extensions\/<\/code>\./, t.extI2)
    .replace(/Enable <strong>Developer mode<\/strong> \(top-right toggle\)\./, t.extI3)
    .replace(/Click <strong>Load unpacked<\/strong> and select the <code>m3u8-extension<\/code> folder\./, t.extI4)
    .replace(/The extension icon appears in the toolbar with a badge showing detected media count\./, t.extI5)
    .replace('<strong>Usage:</strong>', t.extUseTitle)
    .replace('Browse to any page with video content.', t.extU1)
    .replace('Click the extension icon to see detected m3u8/MP4 streams.', t.extU2)
    .replace(/Click <strong>Download<\/strong> to save to local MP4, or <strong>Translate<\/strong> to start subtitle generation\./, t.extU3)
    .replace('Hover over items to highlight the corresponding video element on the page.', t.extU4)
    .replace('Why use the extension?', t.extAdvTitle)
    .replace(/Intercepts network requests at the browser level.*?misses/, t.extAdv1)
    .replace(/Automatic quality selection.*?quality/, t.extAdv2)
    .replace(/Referer header injection for playing.*?authentication/, t.extAdv3)
    .replace(/Badge counter shows detected media count per tab at a glance/, t.extAdv4)
    .replace(/Deeper detection than userscripts.*?scanning/, t.extAdv5)
    // CLI
    .replace('Command-Line Interface <span class="tag">Power Users', `${t.cliTitle.replace('&#128187; ', '')} <span class="tag">${t.cliTag}`)
    .replace('Automation, batch processing, and scripting', t.cliSub)
    .replace(/The CLI provides direct access.*?other tools\./, t.cliP1)
    .replace('<strong>Available commands:</strong>', t.cliCmds)
    .replace('<strong>Parameter reference:</strong>', t.cliParams || '<strong>Parameter reference:</strong>')
    .replace('# Translate a local video file to Chinese subtitles', t.cliC1)
    .replace('# Batch translate an entire folder', t.cliC2)
    .replace('# Full options: source language, whisper model, translation engine, denoising, processing mode', t.cliC3)
    .replace('# Download a remote m3u8 or MP4', t.cliC4)
    .replace('# Download and translate in one step', t.cliC5)
    .replace('# Translate an existing SRT file', t.cliC6);

  // Replace parameter reference pre block and lang link
  if (t.cliParamsPre) {
    html = html.replace(
      /--source, -s[\s\S]*?--referer\s+[^\n]+/,
      t.cliParamsPre
    );
    html = html.replace(
      /See the full list of supported language codes[\s\S]*?Language Code Reference<\/a>/,
      t.cliLangLink
    );
  }

  html = html
    .replace('Why use the CLI?', t.cliAdvTitle)
    .replace('Batch processing: translate hundreds of videos with a single command', t.cliAdv1)
    .replace(/Scriptable: integrate into shell scripts.*?pipelines/, t.cliAdv2)
    .replace(/Full control over models.*?denoising mode/, t.cliAdv3)
    .replace(/No GUI overhead.*?SSH sessions/, t.cliAdv4)
    .replace(/Supports both serial.*?modes/, t.cliAdv5)


  // Privacy: full block replacement using privacyData
  const priv = privacyData[key];
  if (priv) {
    html = html.replace(
      '<span class="num">#3</span> Privacy Policy &amp; Disclaimer',
      `<span class="num">#3</span> ${priv.secTitle}`
    );
    const privStart = '    <div class="privacy">';
    const privEnd = '    </div>\n  </main>';
    const startIdx = html.indexOf(privStart);
    const endIdx = html.indexOf(privEnd, startIdx);
    if (startIdx !== -1 && endIdx !== -1) {
      const newPrivacy = `    <div class="privacy">\n\n${privacyBlock(priv)}\n    </div>\n  </main>`;
      html = html.substring(0, startIdx) + newPrivacy + html.substring(endIdx + privEnd.length);
    }
    html = html.replace('&copy; 2025 EchoShortsPlayer. All rights reserved.', priv.footer);
    html = html.replace('>Contact Us<', `>${priv.contact}<`);
  }

  fs.writeFileSync(path.join(__dirname, file), html, 'utf8');
  console.log(`  Generated: ${file}`);
}

// --- Load full translations for remaining 12 languages ---
const _ft1 = require('./fullTranslations.js');
const _ft2 = require('./fullTranslations2.js');
const fullTrans = { ..._ft1, ..._ft2 };

// --- Unified build for other languages (full translation) ---
function buildOther(key, data) {
  const file = `home-${key}.html`;
  const t = fullTrans[key];
  if (!t) {
    console.error(`  SKIP: ${file} — no translation data for '${key}'`);
    return;
  }

  let html = template
    .replace('lang="en"', `lang="${data.lang}"`)
    .replace(`<title>EchoShortsPlayer - AI Video Subtitle Translation</title>`, `<title>${t.title}</title>`)
    .replace(`<option value="home.html" selected>English</option>`, `<option value="home.html">English</option>`)
    .replace(`<option value="${file}">${data.label}</option>`, `<option value="${file}" selected>${data.label}</option>`);

  if (data.dir === 'rtl') {
    html = html.replace('<html', '<html dir="rtl"');
  }

  // Hero
  html = html
    .replace('AI Video Translation &amp; Subtitles<br><span>Stream, Translate, Download &mdash; All Offline</span>', t.h1)
    .replace(/EchoShortsPlayer translates online videos.*?m3u8 streams and MP4 files\./s, t.heroP);

  // Section titles
  html = html
    .replace('<span class="num">#1</span> Features', `<span class="num">#1</span> ${t.sec1}`)
    .replace('<span class="num">#2</span> How to Use', `<span class="num">#2</span> ${t.sec2}`);

  // Feature cards
  html = html
    .replace('>Speech Recognition<', `>${t.f1t}<`).replace(/Powered by OpenAI Whisper\. Supports 99 languages.*?highest accuracy\)\./, t.f1p)
    .replace('>AI Translation<', `>${t.f2t}<`).replace('Multiple translation engines:', t.f2p)
    .replace('Opus-MT &mdash; fast, 9 languages', t.f2l1).replace('NLLB &mdash; 32+ languages, any-to-any', t.f2l2).replace('Qwen &mdash; best quality, CJK-optimized', t.f2l3)
    .replace('>Media Detection<', `>${t.f3t}<`).replace(/Automatically detects m3u8\/HLS.*?userscript\./, t.f3p)
    .replace('>Real-time Subtitles<', `>${t.f4t}<`).replace(/Stream translation mode.*?future use\./, t.f4p)
    .replace('>100% Offline &amp; Private<', `>${t.f5t}<`).replace(/All processing happens locally.*?on your device\./, t.f5p)
    .replace('>Hardware Requirements<', `>${t.f6t}<`).replace(/NVIDIA GPU with 8 GB\+.*?optimal performance\./, t.f6p);

  // Tampermonkey
  html = html
    .replace('Tampermonkey Userscript <span class="tag">Easiest', `${t.tmTitle} <span class="tag">${t.tmTag}`)
    .replace('Zero-install media detection for any browser', t.tmSub)
    .replace(/The Tampermonkey userscript injects.*?<strong>Translate<\/strong> buttons\./, t.tmP1)
    .replace(/<p><strong>Step 1:<\/strong> Install the Tampermonkey browser extension:<\/p>/, `<p>${t.tmStep1}</p>`)
    .replace('>Tampermonkey Official Site<', `>${t.tmSite}<`).replace('>Chrome Web Store<', `>${t.tmChrome}<`)
    .replace(/<p><strong>Step 2:<\/strong> Install the EchoShortsPlayer userscript:<\/p>/, `<p>${t.tmStep2}</p>`)
    .replace('>Install Userscript<', `>${t.tmInstall}<`)
    .replace(/<p><strong>Step 3:<\/strong> Make sure.*?<\/code>\)\.<\/p>/, `<p>${t.tmStep3}</p>`)
    .replace(/<p><strong>Step 4:<\/strong> Visit any.*?<strong>Translate<\/strong>\.<\/p>/, `<p>${t.tmStep4}</p>`)
    .replace('Why use the userscript?', t.tmAdvTitle)
    .replace('Works in any browser that supports Tampermonkey (Chrome, Firefox, Edge, Safari, Opera)', t.tmAdv1)
    .replace(/No Chrome extension installation required.*?restricted/, t.tmAdv2)
    .replace('Lightweight: single file, easy to inspect and modify', t.tmAdv3)
    .replace(/Auto-updates via Tampermonkey.*?mechanism/, t.tmAdv4)
    .replace('Detects both m3u8/HLS streams and direct MP4 links on pages', t.tmAdv5);

  // Extension
  html = html
    .replace('Chrome Extension <span class="tag">Recommended', `${t.extTitle} <span class="tag">${t.extTag}`)
    .replace('Deep network-level media interception', t.extSub)
    .replace(/The Chrome extension uses the.*?download links\./, t.extP1)
    .replace('>Download Extension (.zip)<', `>${t.extDlBtn}<`)
    .replace('<strong>Installation (developer mode):</strong>', t.extInstTitle)
    .replace(/Download the extension zip above and extract it to a folder\./, t.extI1)
    .replace(/Open Chrome and navigate to <code>chrome:\/\/extensions\/<\/code>\./, t.extI2)
    .replace(/Enable <strong>Developer mode<\/strong> \(top-right toggle\)\./, t.extI3)
    .replace(/Click <strong>Load unpacked<\/strong> and select the <code>m3u8-extension<\/code> folder\./, t.extI4)
    .replace(/The extension icon appears in the toolbar with a badge showing detected media count\./, t.extI5)
    .replace('<strong>Usage:</strong>', t.extUseTitle)
    .replace('Browse to any page with video content.', t.extU1)
    .replace('Click the extension icon to see detected m3u8/MP4 streams.', t.extU2)
    .replace(/Click <strong>Download<\/strong> to save to local MP4, or <strong>Translate<\/strong> to start subtitle generation\./, t.extU3)
    .replace('Hover over items to highlight the corresponding video element on the page.', t.extU4)
    .replace('Why use the extension?', t.extAdvTitle)
    .replace(/Intercepts network requests at the browser level.*?misses/, t.extAdv1)
    .replace(/Automatic quality selection.*?quality/, t.extAdv2)
    .replace(/Referer header injection for playing.*?authentication/, t.extAdv3)
    .replace(/Badge counter shows detected media count per tab at a glance/, t.extAdv4)
    .replace(/Deeper detection than userscripts.*?scanning/, t.extAdv5);

  // CLI
  html = html
    .replace('Command-Line Interface <span class="tag">Power Users', `${t.cliTitle} <span class="tag">${t.cliTag}`)
    .replace('Automation, batch processing, and scripting', t.cliSub)
    .replace(/The CLI provides direct access.*?other tools\./, t.cliP1)
    .replace('<strong>Available commands:</strong>', t.cliCmds)
    .replace('<strong>Parameter reference:</strong>', t.cliParams || '<strong>Parameter reference:</strong>');

  // Replace parameter reference pre block and lang link
  if (t.cliParamsPre) {
    html = html.replace(
      /--source, -s[\s\S]*?--referer\s+[^\n]+/,
      t.cliParamsPre
    );
    html = html.replace(
      /See the full list of supported language codes[\s\S]*?Language Code Reference<\/a>/,
      t.cliLangLink
    );
  }

  html = html
    .replace('Why use the CLI?', t.cliAdvTitle)
    .replace('Batch processing: translate hundreds of videos with a single command', t.cliAdv1)
    .replace(/Scriptable: integrate into shell scripts.*?pipelines/, t.cliAdv2)
    .replace(/Full control over models.*?denoising mode/, t.cliAdv3)
    .replace(/No GUI overhead.*?SSH sessions/, t.cliAdv4)
    .replace(/Supports both serial.*?modes/, t.cliAdv5);

  // CLI comments
  if (t.cliC1) {
    html = html
      .replace('# Translate a local video file to Chinese subtitles', t.cliC1)
      .replace('# Batch translate an entire folder', t.cliC2)
      .replace('# Full options: source language, whisper model, translation engine, denoising, processing mode', t.cliC3)
      .replace('# Download a remote m3u8 or MP4', t.cliC4)
      .replace('# Download and translate in one step', t.cliC5)
      .replace('# Translate an existing SRT file', t.cliC6);
  }

  // Privacy: full block replacement
  const priv = privacyData[key];
  if (priv) {
    html = html.replace(
      '<span class="num">#3</span> Privacy Policy &amp; Disclaimer',
      `<span class="num">#3</span> ${priv.secTitle}`
    );
    const privStart = '    <div class="privacy">';
    const privEnd = '    </div>\n  </main>';
    const startIdx = html.indexOf(privStart);
    const endIdx = html.indexOf(privEnd, startIdx);
    if (startIdx !== -1 && endIdx !== -1) {
      const newPrivacy = `    <div class="privacy">\n\n${privacyBlock(priv)}\n    </div>\n  </main>`;
      html = html.substring(0, startIdx) + newPrivacy + html.substring(endIdx + privEnd.length);
    }
    html = html.replace('&copy; 2025 EchoShortsPlayer. All rights reserved.', priv.footer);
    html = html.replace('>Contact Us<', `>${priv.contact}<`);
  }

  fs.writeFileSync(path.join(__dirname, file), html, 'utf8');
  console.log(`  Generated: ${file} (${data.nativeName})`);
}

// --- Main ---
console.log('Generating home pages...\n');

for (const [key, data] of Object.entries(langs)) {
  buildTranslated(key, data);
}

for (const [key, data] of Object.entries(otherLangs)) {
  buildOther(key, data);
}

console.log(`\nDone! Generated ${Object.keys(langs).length + Object.keys(otherLangs).length} translated pages.`);
