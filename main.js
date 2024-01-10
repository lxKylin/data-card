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
    console.log('github', github)
    log.info(`github: ${github}`)
    log.info(`github: ${JSON.stringify(github)}`)
    // const { context } = github.context
    const context = github.context
    log.info(`context: ${context}`)
    log.info(`context: ${JSON.stringify(context)}`)
    const owner = context.repo.owner
    const repo = context.repo.repo
    log.info(`owner: ${owner}`)
    log.info(`repo: ${repo}`)
    const payload = { token, JueJinId, commit_message, branch, owner, repo }

    await Action(payload)
  } catch (error) {
    log.error(error)
    core.setFailed(error.message)
  }
})()
