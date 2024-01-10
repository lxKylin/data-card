const axios = require('axios')
const fs = require('fs')
const log = require('./utils/log')

const Action = async (payload) => {
  const { token, JueJinId, commit_message, branch, owner, repo } = payload

  log.info(`payload: ${payload}`)

  // 创建一个 axios 实例，包含共享的请求配置
  const Axios = axios.create({
    baseURL: `https://api.github.com/repos/${owner}/${repo}`,
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  })

  const branchResponse = await Axios.get(`/branches/${branch}`)
  log.info(branchResponse, 'branchResponse')
}

module.exports = Action
