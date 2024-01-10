const axios = require('axios')
const log = require('./utils/log')

const getJueJinInfo = require('./crawler/juejin')
const renderJueJinCard = require('./render/juejin')

async function renderJueJin(id) {
  const data = await getJueJinInfo(id)
  return renderJueJinCard(data)
}

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
    // 1. 获取特定分支的最后一次提交 SHA
    console.log('1. 获取特定分支的最后一次提交 SHA')
    const branchResponse = await instance.get(`/branches/${branch}`)
    console.log(branchResponse, 'branchResponse1')
    console.log(branchResponse.data, 'branchResponse.data')
    console.log(branchResponse.data.commit, 'branchResponse.data.commit')
    const lastCommitSHA = branchResponse.data.commit.sha
    console.log(lastCommitSHA, 'lastCommitSHA')

    const jueJinSvg = await renderJueJin(JueJinId)
    console.log(jueJinSvg, 'jueJinSvg,同步读取文件内容')
    const imageContent = fs.readFileSync('./images/test.jpeg')
    const juejin = fs.readFileSync('./images/juejin-card.svg')
    // 2. 创建 Blobs（base64 编码）
    console.log('2. 创建 Blobs（base64 编码）')
    const createBlob = async (content, encoding) => {
      const blobResponse = await instance.post('/git/blobs', {
        content: content,
        encoding: encoding,
        type: 'image/svg+xml'
      })
      return blobResponse.data.sha
    }
    const jueJinSvgSHA = await createBlob(
      jueJinSvg.toString('base64'),
      'base64',
      'image/svg+xml'
    )
    const imageContentSHA = await createBlob(
      imageContent.toString('base64'),
      'base64'
    )
    const juejinSHA = await createBlob(juejin.toString('base64'), 'base64')
    console.log('jueJinSvgSHA', jueJinSvgSHA)
    console.log('imageContentSHA', imageContentSHA)
    console.log('juejinSHA', juejinSHA)
    // 3. 创建一个定义了文件夹结构的树
    console.log('3. 创建一个定义了文件夹结构的树')
    const createTree = async (baseTreeSHA, blobs) => {
      const tree = blobs.map((blob) => {
        return {
          path: blob.path,
          mode: '100644',
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

    const treeSHA = await createTree(lastCommitSHA, [
      { path: 'image/juejin.svg', sha: jueJinSvgSHA },
      { path: 'image/test.jpeg', sha: imageContentSHA },
      { path: 'image/card.svg', sha: juejinSHA }
    ])
    console.log('treeSHA', treeSHA)

    // 4. 创建提交
    console.log('4. 创建提交')
    const createCommit = async (treeSHA) => {
      const commitResponse = await instance.post('/git/commits', {
        message: commit_message,
        author: {
          name: owner,
          email: `${owner}@users.noreply.github.com`
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
