const axios = require('axios')
const cheerio = require('cheerio')

const url = 'https://www.yuque.com/jianxu'

// 发送GET请求
axios
  .get(url)
  .then((response) => {
    // 使用cheerio加载HTML
    const $ = cheerio.load(response.data)

    console.log($, '$')

    // 在这里根据你的HTML结构使用选择器定位数据
    // 并将其存储为JSON格式
    const jsonData = {
      // 示例：使用选择器获取标题
      title: $('title').text(),
      meta: $('meta').text()

      // 示例：使用选择器获取其他数据
      // otherData: $('其他选择器').text(),
    }

    // 打印转化后的JSON数据
    console.log(jsonData, 'jsonData')
  })
  .catch((error) => {
    console.error('请求失败：', error)
  })
