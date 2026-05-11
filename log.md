## 2026-05-11

- `home.html` 与各 `home-*.html`：在「隐私政策」标题上方增加技术支持说明段落（`.privacy-support-note`），含 `mailto:supports@echoshorts.win` 链接；英文模板为 “For technical support, please contact …”；`generate_home.js` 中 `privacySupportByLang` 为各语言提供对应译文（简中「如需技术支持，请联系 …。」等），`applyPrivacySupportLine` 在 `buildTranslated` / `buildOther` 末尾统一替换；已执行 `node generate_home.js` 更新全部首页。

- 台球页 `generate_billiard.js`：在隐私政策前增加「硬件设备选购及有偿技术支持」区块（简中：打印机、智能柜、智能灯开关等；其余语言对应译文；`mailto:supports@echoshorts.win`）；补充 `.section a` 样式；已执行 `node generate_billiard.js` 更新全部 `billiard*.html`。
- 酒店页 `generate_hotel.js`：硬件描述在门锁、读卡器、门卡基础上增加打印机（13 种语言同步）；已执行 `node generate_hotel.js` 更新全部 `hotel*.html`。

- `index*.html`（`generate_index.js` 模板）：为 `.page-title`、`.page-desc` 增加 `text-align: center`，使「EchoShorts.Win」与各语言标语（含简中「让精彩在短视频中回响，赢得永恒。」）在页面中居中；已执行 `node generate_index.js` 重新生成全部 `index*.html`。

- 酒店页「硬件设备选购」标题后追加「及有偿技术支持」，并在描述「门锁、读卡器、门卡等硬件如需采购」后追加「及有偿技术支持」；同步更新 13 种语言（en/zh/cht/ja/ko/pt/ru/es/fr/de/id/vi/th）的 `hardwareTitle` 与 `hardwareDescBefore` 文案；运行 `node generate_hotel.js` 重新生成全部 `hotel*.html`。

- 工具导航 `index*.html`：移除 e-hotel、e-billiard 两个 `<article class="tool-card">`（仅保留 EchoPShortsPlayer）；`generate_index.js` 去掉 `SHOW_HOTEL_BILLIARD_INTRO`、酒店/台球链接与相关翻译键，`.tool-grid` 恢复单列居中；已执行 `node generate_index.js` 更新全部 `index*.html`。

- 修复各语言 `home-*.html` 中「为什么使用扩展？/ Why use the extension?」「为什么使用 CLI？/ Why use the CLI?」h4 标题与其下 4 + 5 条优势 `<li>` 长期保持英文的问题：在 `generate_home.js` 新增 `applyAdvantages()` 统一替换标题与列表项；新增 `advantageTranslations.js`，为未在 `fullTranslations.js` / `fullTranslations2.js` 中的 22 种语言（bn / cs / da / el / fa / fi / he / hu / id / it / km / nb / nl / pl / ro / sv / sw / ta / te / tr / uk / ur）补齐 `extAdvTitle` / `extAdv1‑4`、`cliAdvTitle` / `cliAdv1‑5` 译文；已在 `buildTranslated`（zh/cht）和 `buildOther` 内调用，移除原先各处冗余的 `Why use ...` 字符串替换。重新运行 `node generate_home.js` 生成全部 `home-*.html`。

- 全站 `home*.html`、`hotel*.html`、`billiard*.html` 左上角固定返回按钮（左箭头 SVG）：新增 `index-back-nav.js`，在 `lang-query.js` 之后加载；根据当前文件名、`?lang=` 或语言下拉框**当前选中项**解析 hub 的 BCP47，跳转到对应 `index*.html?lang=`（无 hub 对应语种的 home 页如 `home-tr.html` 则回 `index.html`）。`home.html` 模板与 `generate_hotel.js`、`generate_billiard.js` 已引用；已运行 `generate_home.js`、`generate_hotel.js`、`generate_billiard.js`。新增 index hub 语言时需同步 `index-back-nav.js` 的 `INDEX_HTML` / `HOME_FILE_TO_LANG`。

- 酒店页「硬件设备选购」段落内采购邮箱改为可点击的 `mailto:supports@echoshorts.win` 链接（`generate_hotel.js`：`hardwareDescBefore` / `hardwareDescAfter` + `.section a` 样式）；已运行 `node generate_hotel.js` 更新全部 `hotel*.html`。

- 工具导航「打开工具」携带语言：各 `index*.html` 的链接追加查询参数 `?lang=BCP47`（与当前 hub 语言一致）；新增根目录 `lang-query.js`，在 `index` / `home` / `hotel` / `billiard` 页面首屏执行：若 URL 带 `lang` 且与当前文件不一致则 `location.replace` 到对应语言文件，已匹配则用 `history.replaceState` 去掉查询串。`home.html` 模板、`generate_index.js`、`generate_hotel.js`、`generate_billiard.js` 引入该脚本；已运行 `node generate_index.js`、`generate_hotel.js`、`generate_billiard.js`、`generate_home.js` 更新相关 HTML。新增语言时需同步 `lang-query.js` 中的 INDEX/HOME/HOTEL/BILLIARD 映射与 `generate_index.js` 的 `langs`。

- 工具导航主页多语言：新增 `generate_index.js`，与酒店/台球页一致的 13 种语言（`index.html` + `index-zh-CN.html` … `index-vi-VN.html`）；右上角语言下拉切换；各语言页的「打开工具」分别指向对应 `home-*`、`hotel-*`、`billiard-*`（如简中：`home-zh.html`、`hotel-zh-CN.html`、`billiard-zh-CN.html`）。执行 `node generate_index.js` 生成/更新全部 `index*.html`。

- 酒店页：在 `generate_hotel.js` 为各语言增加「硬件设备选购」区块（门锁、读卡器、门卡及采购联系 supports@echoshorts.win），页脚隐私联系改为 `supports@echoshorts.win`；运行 `node generate_hotel.js` 重新生成全部 `hotel*.html`。
- 全站将写死的 `mingyvzhong@gmail.com` 替换为 `supports@echoshorts.win`（含 `generate_hotel.js`、`generate_billiard.js` 及运行 `node generate_billiard.js` 生成的全部 `billiard*.html`）。

## 2026-05-11

- 移除首页「功能特性 / Features」标题下方重复的 Microsoft Store 下载按钮，仅保留「使用方式 / How to Use」安装 EchoShortsPlayer 区域中的下载入口；更新 `home.html` 并重新运行 `node generate_home.js` 生成全部 `home-*.html`。

- 不再宣传油猴/Tampermonkey 用户脚本：从 `generate_home.js`（简繁中文与隐私段落）、`fullTranslations.js`、`fullTranslations2.js` 中移除相关文案与整段 `tm*` 翻译键；安装说明与「媒体检测」等改为仅提及浏览器扩展与 CLI；扩展优势文案改为相对「简单 DOM 扫描」的对比，避免提及用户脚本。
- 运行 `node generate_home.js` 重新生成全部 `home-*.html`，使各语言页面与上述翻译一致。

## 2026-05-11

- 修复各语言 `home-*.html` 中 Chrome 扩展「安装（开发者模式）」「使用方法」下列表项长期为英文的问题：在 `generate_home.js` 增加 `applyExtensionInstallUsage`，从 `fullTranslations.js` / `fullTranslations2.js` 或新建 `extensionStepTranslations.js` 注入对应译文的 `<li>`；对仅部分翻译的语言页同时替换小节标题（`extInstTitle` / `extUseTitle`）。重新执行 `node generate_home.js` 生成全部首页。

## 2026-05-05

- 重写 `index.html` 作为三个工具的主页面。
- 首页展示三个入口卡片：`EchoPShortsPlayer`、`酒店系统`、`台球系统`。
- 三个卡片分别使用图片：`echoshortsplayer.png`、`ehotel.png`、`ebilliard.png`。
- 跳转链接按需求设置为：`home.html`、`billiard.html`、`hotel.html`。
- 介绍文案保持简短，不展开详细功能说明。
## 2026-05-05

- 补齐 `home-xx.html` 语言页面：新增 `home-pl.html`、`home-fa.html`、`home-da.html`、`home-fi.html`、`home-km.html`、`home-nl.html`、`home-cs.html`、`home-ro.html`、`home-bn.html`、`home-nb.html`、`home-sv.html`、`home-sw.html`、`home-te.html`、`home-ta.html`、`home-tr.html`、`home-ur.html`、`home-uk.html`、`home-he.html`、`home-el.html`、`home-hu.html`、`home-it.html`、`home-id.html`。
- 统一更新所有 `home*.html` 的语言下拉框，补齐并同步完整语言选项。

## 2026-05-05

- 根据 `home.html` 调整 `index.html` 为同风格深色背景（`#0f0f0f`）与绿色强调色（`#4ade80`）。
- 将 `index.html` 的标题、说明、卡片文案和按钮文案全部改为英文。
- 保持三个入口和跳转关系不变：`home.html`、`billiard.html`、`hotel.html`。

## 2026-05-05

- 将 `index.html` 的页面标题与主标题文本由 `Tool Navigation Home` 替换为 `EchoShorts.Win`。

## 2026-05-05

- 将 `index.html` 中工具名称 `Hotel System`、`Billiard System` 替换为 `e-hotel`、`e-billiard`（包含卡片标题与相关展示文案）。

## 2026-05-05

- 将 `index.html` 的副标题文案替换为：`Echo the brilliance in life’s shorts to win eternity.`。
