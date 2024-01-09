const core = require('@actions/core')

const getJueJinInfo = require('./crawler/juejin')
const renderJueJinCard = require('./render/juejin')

async function renderJueJin(id) {
  const data = await getJueJinInfo(id)
  renderJueJinCard(data)
}

const JueJinId = core.getInput('JueJinId')

renderJueJin(JueJinId || '4344859055106215')
