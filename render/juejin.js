const { render, constructItem } = require('./common')
const { isEndsWithASCII, encodeHTML, formatData } = require('../utils/utils')

function renderJueJinCard(data, lang = 'zh-CN') {
  console.log(data, 'data1')
  data = formatData(data)
  console.log(data, 'data2')
  let {
    user_name, // 用户名
    follower_count, // 关注者
    got_digg_count, // 获得点赞
    article_count, // 文章数
    got_view_count, // 文章被阅读
    level, // 创作等级
    jscore_level, // 掘友等级
    theme // 主题
  } = data
  let items = []
  switch (lang) {
    case 'zh-CN':
      if (isEndsWithASCII(user_name)) {
        user_name += ' '
      }
      items = [
        constructItem(94, 44, `${user_name}的掘金数据`, 'title', 18),
        constructItem(55, 84, `关注者`, 'label', 13.5),
        constructItem(193, 84, `创作文章数`, 'label', 13.5),
        constructItem(55, 119, `创作等级`, 'label', 13.5),
        constructItem(193, 119, `文章被点赞数`, 'label', 13.5),
        constructItem(55, 154, `掘友等级`, 'label', 13.5),
        constructItem(193, 154, `文章被阅读数`, 'label', 13.5),
        constructItem(126, 84, `${follower_count}`, 'value', 15),
        constructItem(289, 84, `${article_count}`, 'value', 15),
        constructItem(126, 119, `Lv.${level}`, 'value', 15),
        constructItem(289, 119, `${got_digg_count}`, 'value', 15),
        constructItem(126, 154, `Lv.${jscore_level}`, 'value', 15),
        constructItem(289, 154, `${got_view_count}`, 'value', 15)
      ]
      break
    default:
      items = [
        constructItem(94, 44, `${user_name}&apos;s Juejin Stats`, 'title', 18),
        constructItem(55, 84, `Followers`, 'label', 13.5),
        constructItem(193, 84, `Articles`, 'label', 13.5),
        constructItem(55, 119, `Creation Level`, 'label', 13.5),
        constructItem(193, 119, `Likes`, 'label', 13.5),
        constructItem(55, 154, `JueJin Level`, 'label', 13.5),
        constructItem(193, 154, `Article Views`, 'label', 13.5),
        constructItem(126, 84, `${follower_count}`, 'value', 15),
        constructItem(289, 84, `${article_count}`, 'value', 15),
        constructItem(126, 119, `Lv.${level}`, 'value', 15),
        constructItem(289, 119, `${got_digg_count}`, 'value', 15),
        constructItem(126, 154, `Lv.${jscore_level}`, 'value', 15),
        constructItem(289, 154, `${got_view_count}`, 'value', 15)
      ]
      break
  }
  return render(items, 'juejin', theme)
}

module.exports = renderJueJinCard
