const core = require('@actions/core');

const getJuejinInfo = require('./crawler/juejin');
const renderJuejinCard = require('./render/juejin');

async function renderJueJin(id) {
  const data = await getJuejinInfo(id);
  renderJuejinCard(data, (lang = 'zh-CN'));
}

const params = core.getInput('params');

renderJueJin(params);
