const getTheme = require('../common/theme.js')
const fs = require('fs')
const path = require('path')

function render(items, theme = 'default') {
  const { titleColor, backgroundColor, labelColor, valueColor } =
    getTheme(theme)
  let textTags = ''
  for (let i = 0; i < items.length; i++) {
    items[i].id = `key_${i}`
    if (!items[i].color) {
      switch (items[i].type) {
        case 'title':
          items[i].color = titleColor
          break
        case 'label':
          items[i].color = labelColor
          break
        case 'value':
          items[i].color = valueColor
          break
      }
    }
    textTags += renderText(items[i])
  }

  const svgContent = `<svg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' width='382' height='228' viewBox='0 0 382 228'>
  <defs>
    <filter id='Card' x='0' y='0' width='382' height='228' filterUnits='userSpaceOnUse'>
      <feOffset dy='3' input='SourceAlpha'/>
      <feGaussianBlur stdDeviation='3' result='blur'/>
      <feFlood flood-opacity='0.161'/>
      <feComposite operator='in' in2='blur'/>
      <feComposite in='SourceGraphic'/>
    </filter>
  </defs>
  <g transform='matrix(1, 0, 0, 1, 0, 0)' filter='url(#Card)'>
    <rect id='Card-2' data-name='Card' width='364' height='210' rx='8' transform='translate(9 6)' fill='${backgroundColor}'/>
  </g>
  ${textTags}
</svg>
`

  const targetDirectory = path.resolve(__dirname, '../image')

  // 检查目录是否存在，如果不存在则创建
  if (!fs.existsSync(targetDirectory)) {
    fs.mkdirSync(targetDirectory, { recursive: true })
    console.log(`Directory '${targetDirectory}' has been created.`)
  }

  fs.writeFile(
    path.resolve(__dirname, '../image/juejin-card.svg'),
    svgContent,
    (err) => {
      if (err) throw err
      console.log('SVG file has been created!')
    }
  )

  return svgContent
}

function renderText(data) {
  let weight = ''
  if (data.type === 'title') {
    weight = ` font-weight="700" `
    return `<text id='${data.id}' x='50%' y='${data.translate_y}' dominant-baseline='middle' text-anchor='middle' fill='${data.color}' font-size='${data.font_size}' font-family='${data.font}' ${weight}>${data.text}</text>`
  }
  return `<text id='${data.id}' transform='translate(${data.translate_x} ${data.translate_y})' fill='${data.color}' font-size='${data.font_size}' font-family='${data.font}' ${weight}><tspan x='0' y='0'>${data.text}</tspan></text>\n`
}

function constructItem(
  translate_x,
  translate_y,
  text,
  type,
  font_size,
  color = '',
  font = 'SegoeUI, Segoe UI, BlinkMacSystemFont, Helvetica Neue, PingFang SC, Microsoft YaHei'
) {
  return {
    translate_x: translate_x,
    translate_y: translate_y,
    text: text,
    type: type,
    font_size: font_size,
    color: color,
    font: font
  }
}

exports.render = render
exports.constructItem = constructItem
