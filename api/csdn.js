const axios = require('axios')
const cheerio = require('cheerio')

async function getCSDNInfo(name = 'weixin_46926182') {
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
    achievement2: $('.aside-common-box-achievement div span').text(),
    test3: $('.user-profile-head-info-r-c')
      .text()
      .split('    ')[1]
      .split('  ')
      .filter((item) => item !== ''),
    name: $('.user-profile-head-name').text()

    // 示例：使用选择器获取其他数据
    // otherData: $('其他选择器').text(),
  }

  jsonData.views = Number(jsonData.test3[0].split(' ')[1].split(',').join(''))
  jsonData.article_count = Number(
    jsonData.test3[1].split(' ')[0].split(',').join('')
  )
  jsonData.ranking = Number(jsonData.test3[2].split(' ')[0].split(',').join(''))
  jsonData.follow_count = Number(
    jsonData.test3[3].split(' ')[0].split(',').join('')
  )

  // 打印转化后的JSON数据
  console.log(jsonData, 'jsonData')

  return jsonData
}

module.exports = getCSDNInfo
