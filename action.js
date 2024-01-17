const axios = require('axios')
const log = require('./utils/log')

const getJueJinInfo = require('./api/juejin')
const renderJueJinCard = require('./render/juejin')

async function renderJueJin(id) {
  const data = await getJueJinInfo(id)
  return renderJueJinCard(data)
}

const getCSDNInfo = require('./api/csdn')
const renderCSDNCard = require('./render/csdn')

async function renderCSDN(name) {
  const data = await getCSDNInfo(name)
  return renderCSDNCard(data)
}

const Action = async (payload) => {
  const { token, JueJinId, csdnName, commit_message, branch, owner, repo } =
    payload

  log.info(`payload: ${JSON.stringify(payload)}`)

  // 创建一个 axios 实例，包含共享的请求配置
  const instance = axios.create({
    baseURL: `https://api.github.com/repos/${owner}/${repo}`,
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/vnd.github+json',
      'x-github-api-version': '2022-11-28'
    }
  })

  try {
    // 1. 获取特定分支的最后一次提交 SHA
    console.log('1. 获取特定分支的最后一次提交 SHA')
    const branchResponse = await instance.get(`/branches/${branch}`)
    console.log(branchResponse.data, 'branchResponse.data')
    console.log(branchResponse.data.commit, 'branchResponse.data.commit')
    const lastCommitSHA = branchResponse.data.commit.sha
    console.log(lastCommitSHA, 'lastCommitSHA')

    const createBlob = async (content, encoding) => {
      const blobResponse = await instance.post('/git/blobs', {
        content,
        encoding
      })
      return blobResponse.data.sha
    }

    // 掘金
    let jueJinSvgSHA = null
    if (JueJinId) {
      // 2. 创建 Blobs（base64 编码）
      console.log('2. 创建 Blobs（base64 编码）- juejin')
      const jueJinSvg = await renderJueJin(JueJinId)
      console.log(jueJinSvg, 'jueJinSvg,同步读取文件内容')

      jueJinSvgSHA = await createBlob(jueJinSvg.toString('base64'), 'utf-8')
      console.log('jueJinSvgSHA', jueJinSvgSHA)
    }

    // CSDN
    let csndSvgSvgSHA = null
    if (csdnName) {
      // 2. 创建 Blobs（base64 编码）
      console.log('2. 创建 Blobs（base64 编码）- csdn')
      const csndSvg = await renderCSDN(csdnName)
      console.log(csndSvg, 'csndSvg,同步读取文件内容')

      csndSvgSvgSHA = await createBlob(csndSvgSvg.toString('base64'), 'utf-8')
      console.log('csndSvgSvgSHA', csndSvgSvgSHA)
    }

    // 3. 创建一个定义了文件夹结构的树
    console.log('3. 创建一个定义了文件夹结构的树')
    const createTree = async (baseTreeSHA, blobs) => {
      const tree = blobs.map((blob) => {
        return {
          path: blob.path,
          mode: '100644', // 文件（BLOB）、可执行文件（BLOB）、子目录（树）更多参数：https://docs.github.com/zh/rest/git/trees?apiVersion=2022-11-28
          type: 'blob',
          sha: blob.sha
        }
      })
      console.log(tree, 'tree')

      const treeResponse = await instance.post('/git/trees', {
        base_tree: baseTreeSHA,
        tree: tree
      })
      return treeResponse.data.sha
    }

    const treeSHA = await createTree(
      lastCommitSHA,
      [
        { path: 'image/juejin.svg', sha: jueJinSvgSHA || null },
        { path: 'image/csdn.svg', sha: csndSvgSvgSHA || null }
      ].filter((tree) => tree != null)
    )
    console.log('treeSHA', treeSHA)

    // 4. 创建提交
    console.log('4. 创建提交')
    const createCommit = async (treeSHA) => {
      const commitResponse = await instance.post('/git/commits', {
        message: commit_message,
        author: {
          name: owner,
          email: 'actions@github.com' // "actions@github.com"
          // email: `${owner}@users.noreply.github.com` // "actions@github.com"
        },
        parents: [lastCommitSHA],
        tree: treeSHA
      })
      return commitResponse.data.sha
    }

    const newCommitSHA = await createCommit(treeSHA)

    // 5. 更新分支引用
    console.log('5. 更新分支引用')
    await instance.patch(`/git/refs/heads/${branch}`, {
      sha: newCommitSHA
    })
  } catch (error) {
    console.log('error', error)
  }
}

module.exports = Action
