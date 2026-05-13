'use strict';

const { buildPartnerHtml } = require('./partnerProgramCore');
const STR = require('./partnerProgramLocales');

module.exports = function getPartnerProgramHtml(langKey) {
  return buildPartnerHtml(STR[langKey] || STR.en);
};
