const { render, constructItem } = require('./common')
const {
  isEndsWithASCII,
  encodeHTML,
  formatData,
  formatNumber
} = require('../utils/utils')

function renderCSDNCard(data, lang = 'en') {
  console.log(data, 'csdn1')
  data = formatData(data)
  console.log(data, 'csdn2')
  let {
    username,
    article_count,
    ranking,
    follow_count,
    views,
    likes,
    discuss,
    collect,
    share,
    theme
  } = data
  let items = []
  switch (lang) {
    case 'zh-CN':
      if (isEndsWithASCII(username)) {
        username += ' '
      }
      items = [
        constructItem(97, 44, `${username}的 CSDN 数据`, 'title', 18),
        constructItem(63, 83, `原创`, 'label', 13.5),
        constructItem(63, 115, `粉丝`, 'label', 13.5),
        constructItem(220, 115, `总访问量`, 'label', 13.5),
        constructItem(220, 83, `排名`, 'label', 13.5),
        constructItem(63, 145, `被点赞`, 'label', 13.5),
        constructItem(220, 145, `被评论`, 'label', 13.5),
        constructItem(63, 173, `被收藏`, 'label', 13.5),
        constructItem(220, 173, `被分享`, 'label', 13.5),
        constructItem(134, 83, `${formatNumber(article_count)}`, 'value', 15),
        constructItem(134, 115, `${formatNumber(follow_count)}`, 'value', 15),
        constructItem(295, 115, `${formatNumber(views)}`, 'value', 15),
        constructItem(295, 83, `${formatNumber(ranking)}`, 'value', 15),
        constructItem(134, 145, `${formatNumber(likes)}`, 'value', 15),
        constructItem(295, 145, `${formatNumber(discuss)}`, 'value', 15),
        constructItem(134, 173, `${formatNumber(collect)}`, 'value', 15),
        constructItem(295, 173, `${formatNumber(share)}`, 'value', 15)
      ]
      break
    case 'en':
      items = [
        constructItem(97, 44, `${username}'s CSDN Stats`, 'title', 18),
        constructItem(53, 83, `Articles`, 'label', 13.5),
        constructItem(53, 115, `Fans`, 'label', 13.5),
        constructItem(200, 115, `Views`, 'label', 13.5),
        constructItem(200, 83, `Ranking`, 'label', 13.5),
        constructItem(53, 145, `Be Liked`, 'label', 13.5),
        constructItem(200, 145, `Be Commented`, 'label', 13.5),
        constructItem(53, 173, `Be Collected`, 'label', 13.5),
        constructItem(200, 173, `Be Shared`, 'label', 13.5),
        constructItem(150, 83, `${formatNumber(article_count)}`, 'value', 15),
        constructItem(150, 115, `${formatNumber(follow_count)}`, 'value', 15),
        constructItem(310, 115, `${formatNumber(views)}`, 'value', 15),
        constructItem(310, 83, `${formatNumber(ranking)}`, 'value', 15),
        constructItem(150, 145, `${formatNumber(likes)}`, 'value', 15),
        constructItem(310, 145, `${formatNumber(discuss)}`, 'value', 15),
        constructItem(150, 173, `${formatNumber(collect)}`, 'value', 15),
        constructItem(310, 173, `${formatNumber(share)}`, 'value', 15)
      ]
      break
  }
  return render(items, 'csdn', theme)
}

module.exports = renderCSDNCard
