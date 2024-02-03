const core = require('@actions/core')
const github = require('@actions/github')
const log = require('./utils/log')
const Action = require('./action')

;(async () => {
  try {
    // 获取输入
    log.info(`开始获取输入`)
    const token = core.getInput('github_token')
    const JueJinId = core.getInput('juejin_id')
    const csdnName = core.getInput('csdn_name')
    const lang = core.getInput('lang')
    const commitUser = core.getInput('commit_user')
    log.info(`JueJinId: ${JueJinId}`)
    log.info(`csdnName: ${csdnName}`)
    log.info(`lang: ${lang}`)
    log.info(`commitUser: ${commitUser}`)
    const commitMessage = core.getInput('commit_message')
    const branch = core.getInput('branch')
    log.info(`commit_message: ${commitMessage}`)
    log.info(`branch: ${branch}`)
    console.log('github1', github)
    log.info(`github: ${JSON.stringify(github)}`)
    const context = github.context
    log.info(`context: ${JSON.stringify(context)}`)
    const owner = context.repo.owner
    const repo = context.repo.repo
    log.info(`owner: ${owner}`)
    log.info(`repo: ${repo}`)
    const payload = {
      token,
      JueJinId,
      csdnName,
      lang,
      commitUser,
      commitMessage,
      branch,
      owner,
      repo
    }

    await Action(payload)
  } catch (error) {
    log.error(error)
    core.setFailed(error.message)
  }
})()
