const getJuejinInfo = require('./crawler/juejin');
const renderJuejinCard = require('./render/juejin');

async function renderJueJin(id) {
  const data = await getJuejinInfo(id);
  renderJuejinCard(data, (lang = 'zh-CN'));
}

renderJueJin('4344859055106215');
