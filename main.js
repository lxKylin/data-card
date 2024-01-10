const core = require('@actions/core')
const github = require('@actions/github')
const log = require('./utils/log')
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
    log.info(`github: ${github}`)
    const { context } = github.context
    const { owner, repo } = context.repo
    log.info(`owner: ${owner}`)
    log.info(`repo: ${repo}`)
    const payload = { token, JueJinId, commit_message, branch, owner, repo }
  } catch (error) {
    log.error(error)
    core.setFailed(error.message)
  }
})()

// const getJueJinInfo = require('./crawler/juejin')
// const renderJueJinCard = require('./render/juejin')

// async function renderJueJin(id) {
//   const data = await getJueJinInfo(id)
//   renderJueJinCard(data)
// }

// const JueJinId = core.getInput('JueJinId')

// renderJueJin(JueJinId || '4344859055106215')
