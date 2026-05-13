'use strict';

const MAIL = '<a href="mailto:supports@echoshorts.win">supports@echoshorts.win</a>';

/**
 * @param {object} L string fields: s4, aT, aS, fL, s1a,s1b,s2a,s2b,s3a,s3b, vH,v1, dT,dS, t1a,t1b,t2a,t2b,t3a,t3b,t4a,t4b, nH,n1
 * s1b/t1b etc. may contain literal %M% for the mail link.
 */
function buildPartnerHtml(L) {
  const m = (s) => (s || '').replace(/%M%/g, MAIL);
  const li = (a, b) => `        <li><strong>${a}</strong>${m(b)}</li>`;
  return [
    '    <!-- ============ PARTNER PROGRAM ============ -->',
    `    <h2 class="section-title"><span class="num">#4</span> ${L.s4}</h2>`,
    '',
    '    <div class="method" id="partner-ambassador">',
    `      <h3>&#127775; ${L.aT}</h3>`,
    `      <div class="subtitle">${L.aS}</div>`,
    '',
    `      <p><strong>${L.fL}</strong></p>`,
    '      <ol>',
    li(L.s1a, L.s1b),
    li(L.s2a, L.s2b),
    li(L.s3a, L.s3b),
    '      </ol>',
    '',
    '      <div class="advantages">',
    `        <h4>${L.vH}</h4>`,
    '        <ul>',
    `          <li>${L.v1}</li>`,
    '        </ul>',
    '      </div>',
    '    </div>',
    '',
    '    <div class="method" id="partner-distribution">',
    `      <h3>&#128188; ${L.dT}</h3>`,
    `      <div class="subtitle">${L.dS}</div>`,
    '',
    `      <p><strong>${L.fL}</strong></p>`,
    '      <ol>',
    li(L.t1a, L.t1b),
    li(L.t2a, L.t2b),
    li(L.t3a, L.t3b),
    li(L.t4a, L.t4b),
    '      </ol>',
    '',
    '      <div class="advantages">',
    `        <h4>${L.nH}</h4>`,
    '        <ul>',
    `          <li>${L.n1}</li>`,
    '        </ul>',
    '      </div>',
    '    </div>',
  ].join('\n');
}

module.exports = { buildPartnerHtml, MAIL };
