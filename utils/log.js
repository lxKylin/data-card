const core = require('@actions/core')
const dayjs = require('dayjs')
require('dayjs/locale/zh-cn')

const nowTime = dayjs().locale('zh-cn').format('YYYY-MM-DD HH:mm:ss')

function info(message = '') {
  core.info(`[${nowTime}]: ${message}`)
}

function warning(message = '') {
  core.warning(`[${nowTime}]: ${message}`)
}

function error(message = '') {
  core.error(`[${nowTime}]: ${message}`)
}

function setFailed(message = '') {
  core.setFailed(`[${nowTime}]: ${message}`)
}

module.exports = {
  info,
  warning,
  error,
  setFailed
}
