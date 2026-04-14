// ==UserScript==
// @name         EchoShortsPlayer Media Grabber
// @namespace    https://echoshorts.win
// @version      1.0.0
// @description  Detect m3u8/HLS streams and MP4 video links on any webpage. Send to EchoShortsPlayer for download or translation.
// @author       EchoShortsPlayer
// @match        *://*/*
// @grant        GM_xmlhttpRequest
// @grant        GM_addStyle
// @connect      localhost
// @connect      127.0.0.1
// @run-at       document-start
// @homepageURL  https://echoshorts.win/home.html
// @supportURL   mailto:supports@echoshorts.win
// @license      MIT
// ==/UserScript==

(function () {
  'use strict';

  const ECHO_PORT = 18632;
  const ECHO_BASE = `http://localhost:${ECHO_PORT}`;
  const STREAM_RE = /\.(m3u8|mpd|flv)(\?|$)/i;
  const MP4_RE = /\.mp4(\?|$)/i;
  const MEDIA_RE = /\.(m3u8|mpd|flv|mp4)(\?|$)/i;
  const JSON_SCAN_RE = /https?:\/\/[^\s"'\\]+\.(m3u8|mpd|flv|mp4)(?:[^\s"'\\]*)/gi;

  // --- State ---
  const foundMedia = new Map(); // url -> {url, type, source, time}
  let panelVisible = false;
  let panelEl = null;
  let listEl = null;
  let badgeEl = null;

  // --- Detect format ---
  function detectType(url) {
    if (/\.m3u8(\?|$)/i.test(url)) return 'HLS';
    if (/\.mpd(\?|$)/i.test(url)) return 'DASH';
    if (/\.flv(\?|$)/i.test(url)) return 'FLV';
    if (/\.mp4(\?|$)/i.test(url)) return 'MP4';
    return '?';
  }

  function addMedia(url, source) {
    if (!url || typeof url !== 'string') return;
    if (!MEDIA_RE.test(url)) return;
    if (foundMedia.has(url)) return;
    foundMedia.set(url, { url, type: detectType(url), source, time: Date.now() });
    updatePanel();
  }

  function scanJson(text, source) {
    if (!text || text.length > 200000) return;
    JSON_SCAN_RE.lastIndex = 0;
    let m;
    while ((m = JSON_SCAN_RE.exec(text)) !== null) {
      addMedia(m[0], source + '-json');
    }
  }

  // --- Hook fetch ---
  const origFetch = window.fetch;
  window.fetch = function (...args) {
    const url = typeof args[0] === 'string' ? args[0] : (args[0]?.url || '');
    addMedia(url, 'fetch');
    return origFetch.apply(this, args).then(resp => {
      try {
        const ct = resp.headers?.get('content-type') || '';
        if (ct.includes('json') || ct.includes('text/plain') || ct.includes('text/html')) {
          resp.clone().text().then(t => scanJson(t, 'fetch')).catch(() => {});
        }
      } catch (e) { /* */ }
      return resp;
    });
  };

  // --- Hook XHR ---
  const origOpen = XMLHttpRequest.prototype.open;
  const origSend = XMLHttpRequest.prototype.send;

  XMLHttpRequest.prototype.open = function (method, url, ...rest) {
    this._echoUrl = typeof url === 'string' ? url : url?.toString() || '';
    addMedia(this._echoUrl, 'xhr');
    return origOpen.call(this, method, url, ...rest);
  };

  XMLHttpRequest.prototype.send = function (...args) {
    this.addEventListener('load', function () {
      try {
        const ct = this.getResponseHeader('content-type') || '';
        if (ct.includes('json') || ct.includes('text/plain') || ct.includes('text/html')) {
          scanJson(this.responseText, 'xhr');
        }
      } catch (e) { /* */ }
    });
    return origSend.apply(this, args);
  };

  // --- DOM scanning ---
  function scanDOM(root) {
    try {
      root.querySelectorAll?.('video[src], audio[src], source[src]')?.forEach(el => {
        const src = el.src || el.getAttribute('src') || '';
        if (src && !src.startsWith('blob:')) addMedia(src, 'dom');
      });
      root.querySelectorAll?.('a[href]')?.forEach(a => {
        const href = a.href || '';
        if (href && MP4_RE.test(href)) addMedia(href, 'dom-link');
      });
    } catch (e) { /* */ }
  }

  // --- MutationObserver ---
  function setupObserver() {
    const obs = new MutationObserver(muts => {
      for (const mut of muts) {
        for (const node of mut.addedNodes) {
          if (node.nodeType !== 1) continue;
          const tag = node.tagName;
          if (tag === 'VIDEO' || tag === 'AUDIO' || tag === 'SOURCE') {
            const src = node.src || node.getAttribute('src') || '';
            if (src && !src.startsWith('blob:')) addMedia(src, 'dom');
          }
          if (tag === 'A') {
            const href = node.href || '';
            if (href && MP4_RE.test(href)) addMedia(href, 'dom-link');
          }
          if (node.querySelectorAll) scanDOM(node);
        }
      }
    });
    if (document.documentElement) {
      obs.observe(document.documentElement, { childList: true, subtree: true });
    } else {
      document.addEventListener('DOMContentLoaded', () => {
        obs.observe(document.documentElement, { childList: true, subtree: true });
      });
    }
  }

  // --- EchoPlayer communication ---
  function callEcho(path, body) {
    GM_xmlhttpRequest({
      method: 'POST',
      url: ECHO_BASE + path,
      headers: { 'Content-Type': 'application/json' },
      data: JSON.stringify(body),
      onload: function (resp) {
        if (resp.status >= 200 && resp.status < 300) {
          showToast('Sent to EchoShortsPlayer');
        } else {
          showToast('EchoShortsPlayer error: HTTP ' + resp.status, true);
        }
      },
      onerror: function () {
        showToast('EchoShortsPlayer not running', true);
      },
    });
  }

  function getReferer() {
    try { return new URL(location.href).origin + '/'; } catch (e) { return ''; }
  }

  // --- UI ---
  function injectUI() {
    if (panelEl) return;

    GM_addStyle(`
      #echo-grabber-toggle {
        position: fixed; bottom: 20px; right: 20px; z-index: 2147483647;
        width: 44px; height: 44px; border-radius: 50%;
        background: #1a1a1a; border: 2px solid #4ade80; color: #4ade80;
        font-size: 18px; cursor: pointer; display: flex; align-items: center;
        justify-content: center; box-shadow: 0 2px 12px rgba(0,0,0,.5);
        transition: transform .15s; font-family: sans-serif;
      }
      #echo-grabber-toggle:hover { transform: scale(1.1); }
      #echo-grabber-badge {
        position: absolute; top: -4px; right: -4px;
        background: #e53935; color: #fff; font-size: 10px; font-weight: 700;
        min-width: 18px; height: 18px; border-radius: 9px; display: none;
        align-items: center; justify-content: center; padding: 0 4px;
      }
      #echo-grabber-panel {
        position: fixed; bottom: 74px; right: 20px; z-index: 2147483646;
        width: 420px; max-height: 480px; background: #141414;
        border: 1px solid #2a2a2a; border-radius: 12px; display: none;
        flex-direction: column; box-shadow: 0 8px 32px rgba(0,0,0,.6);
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      }
      #echo-grabber-panel.show { display: flex; }
      #echo-grabber-panel-header {
        padding: 12px 16px; border-bottom: 1px solid #2a2a2a;
        font-size: 13px; font-weight: 600; color: #fff;
      }
      #echo-grabber-list {
        flex: 1; overflow-y: auto; padding: 8px;
      }
      .echo-item {
        background: #1a1a1a; border: 1px solid #2a2a2a; border-radius: 8px;
        padding: 10px 12px; margin-bottom: 6px;
      }
      .echo-item-row { display: flex; align-items: center; gap: 8px; margin-bottom: 6px; }
      .echo-type {
        font-size: 10px; font-weight: 700; color: #fff; padding: 2px 6px;
        border-radius: 3px; text-transform: uppercase;
      }
      .echo-type-hls { background: #e53935; }
      .echo-type-mp4 { background: #1e88e5; }
      .echo-type-dash { background: #fb8c00; }
      .echo-type-flv { background: #8e24aa; }
      .echo-item-url {
        font-size: 11px; color: #666; word-break: break-all;
        max-height: 32px; overflow: hidden; line-height: 1.4;
      }
      .echo-item-btns { display: flex; gap: 6px; margin-top: 8px; }
      .echo-item-btns button {
        font-size: 11px; font-weight: 600; padding: 4px 12px;
        border-radius: 5px; border: none; cursor: pointer;
        transition: opacity .15s;
      }
      .echo-item-btns button:hover { opacity: .8; }
      .echo-btn-dl { background: #4ade80; color: #0f0f0f; }
      .echo-btn-tr { background: #3b82f6; color: #fff; }
      .echo-empty { text-align: center; color: #555; font-size: 12px; padding: 32px 0; }
      #echo-toast {
        position: fixed; bottom: 80px; right: 80px; z-index: 2147483647;
        background: #1a1a1a; border: 1px solid #2a2a2a; border-radius: 8px;
        padding: 8px 16px; font-size: 12px; color: #4ade80;
        display: none; box-shadow: 0 4px 16px rgba(0,0,0,.5);
      }
      #echo-toast.error { color: #e53935; border-color: #3a1a1a; }
      #echo-toast.show { display: block; }
    `);

    // Toggle button
    const toggle = document.createElement('div');
    toggle.id = 'echo-grabber-toggle';
    toggle.innerHTML = '&#9654;';
    toggle.title = 'EchoShortsPlayer Media Grabber';
    badgeEl = document.createElement('div');
    badgeEl.id = 'echo-grabber-badge';
    toggle.appendChild(badgeEl);
    toggle.addEventListener('click', () => {
      panelVisible = !panelVisible;
      panelEl.classList.toggle('show', panelVisible);
    });

    // Panel
    panelEl = document.createElement('div');
    panelEl.id = 'echo-grabber-panel';
    const header = document.createElement('div');
    header.id = 'echo-grabber-panel-header';
    header.textContent = 'Detected Media';
    listEl = document.createElement('div');
    listEl.id = 'echo-grabber-list';
    panelEl.appendChild(header);
    panelEl.appendChild(listEl);

    // Toast
    const toast = document.createElement('div');
    toast.id = 'echo-toast';

    document.body.appendChild(toggle);
    document.body.appendChild(panelEl);
    document.body.appendChild(toast);

    updatePanel();
  }

  function updatePanel() {
    if (!listEl) return;

    // Badge
    const count = foundMedia.size;
    if (badgeEl) {
      badgeEl.textContent = count;
      badgeEl.style.display = count > 0 ? 'flex' : 'none';
    }

    if (count === 0) {
      listEl.innerHTML = '<div class="echo-empty">No media detected.<br>Play a video or browse a page with video links.</div>';
      return;
    }

    listEl.innerHTML = '';
    for (const [url, info] of foundMedia) {
      const item = document.createElement('div');
      item.className = 'echo-item';

      const row = document.createElement('div');
      row.className = 'echo-item-row';
      const badge = document.createElement('span');
      badge.className = 'echo-type echo-type-' + info.type.toLowerCase();
      badge.textContent = info.type;
      row.appendChild(badge);
      item.appendChild(row);

      const urlDiv = document.createElement('div');
      urlDiv.className = 'echo-item-url';
      urlDiv.textContent = url;
      item.appendChild(urlDiv);

      const btns = document.createElement('div');
      btns.className = 'echo-item-btns';

      const dlBtn = document.createElement('button');
      dlBtn.className = 'echo-btn-dl';
      dlBtn.textContent = 'Download';
      dlBtn.addEventListener('click', () => callEcho('/download', { url, referer: getReferer() }));

      const trBtn = document.createElement('button');
      trBtn.className = 'echo-btn-tr';
      trBtn.textContent = 'Translate';
      trBtn.addEventListener('click', () => callEcho('/play-and-translate', { url, referer: getReferer() }));

      btns.appendChild(dlBtn);
      btns.appendChild(trBtn);
      item.appendChild(btns);
      listEl.appendChild(item);
    }
  }

  let toastTimer = null;
  function showToast(msg, isError) {
    const el = document.getElementById('echo-toast');
    if (!el) return;
    el.textContent = msg;
    el.className = 'show' + (isError ? ' error' : '');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => { el.className = ''; }, isError ? 3000 : 2000);
  }

  // --- Init ---
  setupObserver();

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => { scanDOM(document); injectUI(); });
  } else {
    scanDOM(document);
    injectUI();
  }
})();
