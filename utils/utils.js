// 数据格式化
const formatData = (data) => {
  for (let attr in data) {
    if (typeof data[attr] === 'number') {
      let num = data[attr]
      let numStr = num
      if (num >= 1000000) {
        numStr = (num / 1000000).toFixed(1).toString()
        if (numStr.endsWith('.0')) {
          numStr = numStr.slice(0, -2)
        }
        numStr += 'M'
      } else if (num >= 10000) {
        numStr = (num / 1000).toFixed(1).toString()
        if (numStr.endsWith('.0')) {
          numStr = numStr.slice(0, -2)
        }
        numStr += 'k'
      }
      data[attr] = numStr
    }
  }
  return data
}

const isEndsWithASCII = (str) => {
  if (str.length === 0) return false
  return str.charCodeAt(str.length - 1) <= 127
}

const encodeHTML = (str) => {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

// 使用本地化的方法进行格式化
const formatNumber = (num) => {
  return num.toLocaleString()
}

module.exports = {
  formatData,
  isEndsWithASCII,
  encodeHTML,
  formatNumber
}
