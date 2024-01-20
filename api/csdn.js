const axios = require('axios')
const cheerio = require('cheerio')

async function getCSDNInfo(name = 'weixin_46926182') {
  try {
    // 发送GET请求
    const res = await axios.get(`https://blog.csdn.net/${name}`)

    // 使用cheerio加载HTML
    const $ = cheerio.load(res.data)

    // 在这里根据你的HTML结构使用选择器定位数据
    // 并将其存储为JSON格式
    const jsonData = {
      // 示例：使用选择器获取标题
      username: $('title').text().split('-')[0],
      achievement: $('.aside-common-box-achievement div').text(),
      achievement3: $('.aside-common-box-achievement div')
        .text()
        .split('得')
        .splice(1)
        .map((item) => item.split('次')[0]),
      test3: $('.user-profile-head-info-r-c')
        .text()
        .split('    ')[1]
        .split('  ')
        .filter((item) => item !== '')

      // 示例：使用选择器获取其他数据
      // otherData: $('其他选择器').text(),
    }

    jsonData.views = Number(jsonData.test3[0].split(' ')[1].split(',').join('')) // 总访问量
    jsonData.article_count = Number(
      jsonData.test3[1].split(' ')[0].split(',').join('')
    ) // 原创文章数
    jsonData.ranking = Number(
      jsonData.test3[2].split(' ')[0].split(',').join('')
    ) // 排名
    jsonData.follow_count = Number(
      jsonData.test3[3].split(' ')[0].split(',').join('')
    ) // 粉丝数
    jsonData.likes = Number(jsonData.achievement3[0]) // 点赞数
    jsonData.discuss = Number(jsonData.achievement3[1]) // 评论数
    jsonData.collect = Number(jsonData.achievement3[2]) // 收藏数
    jsonData.share = Number(jsonData.achievement3[3]) // 分享数
    // 打印转化后的JSON数据
    console.log(jsonData, 'jsonData')

    return jsonData
  } catch (error) {
    console.log('获取CSDN数据失败：', error)
  }
}

module.exports = getCSDNInfo
