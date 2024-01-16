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
        constructItem(63, 120, `粉丝`, 'label', 13.5),
        constructItem(220, 120, `总访问量`, 'label', 13.5),
        constructItem(220, 83, `排名`, 'label', 13.5),
        constructItem(63, 163, `成就`, 'label', 13.5),
        constructItem(124, 153, `被点赞`, 'label', 13.5),
        constructItem(230, 153, `被评论`, 'label', 13.5),
        constructItem(124, 173, `被收藏`, 'label', 13.5),
        constructItem(230, 173, `被分享`, 'label', 13.5),
        constructItem(134, 83, `${formatNumber(article_count)}`, 'value', 15),
        constructItem(134, 120, `${formatNumber(follow_count)}`, 'value', 15),
        constructItem(295, 120, `${formatNumber(views)}`, 'value', 15),
        constructItem(295, 83, `${formatNumber(ranking)}`, 'value', 15),
        constructItem(295, 83, `${formatNumber(ranking)}`, 'value', 15),
        constructItem(185, 153, `${formatNumber(likes)}`, 'value', 15),
        constructItem(295, 153, `${formatNumber(discuss)}`, 'value', 15),
        constructItem(185, 173, `${formatNumber(collect)}`, 'value', 15),
        constructItem(295, 173, `${formatNumber(share)}`, 'value', 15)
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
