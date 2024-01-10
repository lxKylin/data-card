const axios = require('axios')
const fs = require('fs')
const log = require('./utils/log')

const Action = async (payload) => {
  const { token, JueJinId, commit_message, branch, owner, repo } = payload

  log.info(`payload: ${JSON.stringify(payload)}`)

  // 创建一个 axios 实例，包含共享的请求配置
  const instance = axios.create({
    baseURL: `https://api.github.com/repos/${owner}/${repo}`,
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  })

  try {
    const branchResponse = await instance.get(`/branches/${branch}`)
    console.log(branchResponse, 'branchResponse1')
    console.log(JSON.stringify(branchResponse), 'branchResponse2')
    console.log(branchResponse.data, 'branchResponse.data')
    const lastCommitSHA = branchResponse.data.commit.sha
    console.log(lastCommitSHA, 'lastCommitSHA')
    const commitsResponse = await instance.get(`/commits`)
    console.log(commitsResponse, 'commitsResponse1')
    console.log(JSON.stringify(commitsResponse), 'commitsResponse2')
  } catch (error) {
    console.log('error', error)
  }
}

module.exports = Action
