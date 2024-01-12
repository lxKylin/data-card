const axios = require('axios')

async function getJueJinInfo(user_id) {
  console.log('getJueJinInfo', user_id)
  let result = {
    user_id: user_id,
    user_name: '',
    follower_count: '', // 关注者
    got_digg_count: '', // 获得点赞
    article_count: '', // 文章数量
    got_view_count: '', // 文章被阅读
    level: '', // 创作等级
    jscore_level: '' // 掘友等级
  }

  try {
    let res = await axios.get(
      `https://api.juejin.cn/user_api/v1/user/get?user_id=${user_id}`
    )

    console.log(res.data, '用户信息')

    let data = res.data.data
    result.user_id = data.user_id
    result.user_name = data.user_name
    result.description = data.description
    result.follower_count = data.follower_count
    result.got_digg_count = data.got_digg_count
    result.got_view_count = data.got_view_count
    result.level = data.level
    result.jscore_level = data.user_growth_info.jscore_level

    // 获取文章数量
    let res2 = await axios.post(
      'https://api.juejin.cn/content_api/v1/article/query_list',
      {
        user_id: user_id,
        cursor: '0',
        sort_type: 2
      }
    )
    console.log(res2.data, '文章数据')
    result.article_count = res2.data.count
  } catch (e) {
    console.error('获取掘金数据失败：', e)
  }

  return result
}

module.exports = getJueJinInfo
