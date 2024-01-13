const { render, constructItem } = require('./common')
const {
  isEndsWithASCII,
  encodeHTML,
  formatData,
  formatNumber
} = require('../utils/utils')

function renderCSDNCard(data, lang = 'zh-CN') {
  console.log(data, 'csdn1')
  data = formatData(data)
  console.log(data, 'csdn2')
  let { username, article_count, ranking, follow_count, views, theme } = data
  let items = []
  switch (lang) {
    case 'zh-CN':
      if (isEndsWithASCII(username)) {
        username += ' '
      }
      items = [
        constructItem(97, 44, `${username}的 CSDN 数据`, 'title', 18),
        constructItem(63, 83, `原创`, 'label', 13.5),
        constructItem(63, 120, `粉丝`, 'label', 13.5),
        constructItem(63, 157, `总访问量`, 'label', 13.5),
        constructItem(220, 83, `排名`, 'label', 13.5),
        constructItem(134, 83, `${formatNumber(article_count)}`, 'value', 15),
        constructItem(134, 120, `${formatNumber(follow_count)}`, 'value', 15),
        constructItem(295, 83, `${formatNumber(views)}`, 'value', 15),
        constructItem(134, 157, `${formatNumber(ranking)}`, 'value', 15)
      ]
      break
    default:
      items = [
        constructItem(97, 44, `${username}'s CSDN Stats`, 'title', 18),
        constructItem(63, 83, `Articles`, 'label', 13.5),
        constructItem(63, 120, `Fans`, 'label', 13.5),
        constructItem(63, 157, `Likes`, 'label', 13.5),
        constructItem(220, 83, `Replies`, 'label', 13.5),
        constructItem(220, 120, `Views`, 'label', 13.5),
        constructItem(220, 157, `Credit`, 'label', 13.5),
        constructItem(134, 83, `${articles}`, 'value', 15),
        constructItem(134, 120, `${fans}`, 'value', 15),
        constructItem(134, 157, `${likes}`, 'value', 15),
        constructItem(295, 83, `${replies}`, 'value', 15),
        constructItem(295, 120, `${views}`, 'value', 15),
        constructItem(295, 157, `${credit}`, 'value', 15)
      ]
      break
  }
  return render(items, 'csdn', theme)
}

module.exports = renderCSDNCard
