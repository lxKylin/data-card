const axios = require('axios')
const fs = require('fs')
const log = require('./utils/log')
// const { Octokit } = require('@octokit/core')

const Action = async (payload) => {
  const { token, JueJinId, commit_message, branch, owner, repo } = payload

  // const octokit = new Octokit({
  //   auth: token
  // })
  // console.log('octokit', octokit)

  // async function b() {
  //   const a = await octokit.request(`GET /repos/${owner}/${repo}/commits`, {
  //     owner,
  //     repo,
  //     headers: {
  //       'X-GitHub-Api-Version': '2022-11-28'
  //     }
  //   })
  //   console.log('a', a)
  // }

  // b()

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
    log.info(branchResponse, 'branchResponse1')
    log.info(JSON.stringify(branchResponse), 'branchResponse2')
    const commitsResponse = await instance.get(`/commits`)
    log.info(commitsResponse, 'commitsResponse1')
    log.info(JSON.stringify(commitsResponse), 'commitsResponse2')
  } catch (error) {
    console.log('error', error)
  }
}

module.exports = Action
