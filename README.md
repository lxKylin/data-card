# data-card
一个展示网站数据的卡片

- [x] 掘金
- [x] CSDN
- [ ] LeetCode
- [ ] 语雀

## 使用方法

### yml配置

> `commit_user`为`actions`则为`actions`机器人进行提交，为`users`则是用户自身进行提交，日历热力图中才会显示今日提交

| 参数           | 说明               | 类型   | 可选值        | 默认值                    |
| -------------- | ------------------ | ------ | ------------- | ------------------------- |
| github_token   | GitHub token`必须` | string | --            | --                        |  |
| juejin_id      | 掘金ID             | string | --            | --                        |  |
| csdn_name      | CSDN用户名         | string | --            | --                        |
| commit_user    | commit提交人员     | string | actions/users | actions                   |  |
| commit_message | commit信息         | string | --            | feat: Add Card Image [ci] |  |
| branch         | 推送分支           | string | --            | main                      |  |
| lang           | 语言               | string | en/zh-CN      | en                        |  |

### yml Demo
```yml
name: generate-data-card

on:
  schedule:
    - cron: '0 0 * * *'
  workflow_dispatch:

jobs:
  generate-card:
    runs-on: ubuntu-latest
    steps:
      - name: Use Data Card Action
        uses: lxKylin/data-card@action
        with:
          github_token: ${{ secrets.DATA_CARD_TOKEN }} # Github token
          juejin_id: ${{ secrets.JUEJIN_PARAMS }} # 掘金用户id，也可直接写死
          commit_message: 'JueJin Card', # 提交信息，默认：feat: Add Card Image [ci]
          branch: main # 提交分支，默认：main
          lang: en # 语言，默认：en，可选zh-CN

```

## 掘金

- 使用掘金主页`url`后的一串数字作为`JueJinId`，例如`https://juejin.cn/user/1667667673461376`对应`1667667673461376`

![Alt text](/images/juejin.png)

- 掘金卡片如下：
  
![掘金数据卡片](./image/juejin-card.svg)

![掘金数据卡片](./image/juejin-card_zh-CN.svg)

## CSDN

- 使用`CSDN`个人主页`url`后的字符串作为`csdnName`，例如`https://blog.csdn.net/qq_40592625`对应`qq_40592625`

![Alt text](/images/csdn.png)

- CSDN卡片如下：

![CSDN数据卡片](./image/csdn-card.svg)

![CSDN数据卡片](./image/csdn-card_zh-CN.svg)
