const getJuejinInfo = require('../crawler/juejin');
const renderJuejinCard = require('../render/juejin');
// const { cacheTime, cache } = require('../common/cache');
// const { processData } = require('../common/utils');

module.exports = async (req, res) => {
  const { id, theme, lang, raw } = req.query;
  // let key = 'j' + id;
  // let data = cache.get(key);
  // if (!data) {
  //   data = await getJuejinInfo(id);
  //   cache.set(key, data);
  // }
  const data = await getJuejinInfo(id);
  data.theme = theme;
  // if (raw) {
  //   return res.json(data);
  // }
  // processData(data);
  res.setHeader('Content-Type', 'image/svg+xml');
  // res.setHeader('Cache-Control', `public, max-age=${cacheTime}`);
  return res.send(renderJuejinCard(data, lang));
};
