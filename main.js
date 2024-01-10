const core = require('@actions/core')
const github = require('@actions/github')
const log = require('./utils/log')
const Action = require('./actions')
;(async () => {
  try {
    // 获取输入
    log.info(`开始获取输入`)
    const token = core.getInput('github_token')
    const JueJinId = core.getInput('JueJinId')
    log.info(`JueJinId: ${JueJinId}`)
    const commit_message = core.getInput('commit_message')
    const branch = core.getInput('branch')
    log.info(`commit_message: ${commit_message}`)
    log.info(`branch: ${branch}`)
    console.log('github1', github)
    log.info(`github2: ${github}`)
    log.info(`github3: ${JSON.stringify(github)}`)
    // const { context } = github.context
    const context = github.context
    console.log(`context11: ${context}`)
    log.info(`context22: ${context}`)
    log.info(`context33: ${JSON.stringify(context)}`)
    const owner = context.repo.owner
    const repo = context.repo.repo
    log.info(`owner: ${owner}`)
    log.info(`repo: ${repo}`)
    const payload = { token, JueJinId, commit_message, branch }

    await Action(payload)
  } catch (error) {
    log.error(error)
    core.setFailed(error.message)
  }
})()
