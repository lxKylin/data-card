const express = require('express')

const axios = require('axios')

const core = require('@actions/core')

const juejin = require('./api/juejin')

const app = express()

app.use('/api/juejin', juejin)

const port = 1231
app.listen(port, () => {
  console.log(`express server listening at http://localhost:${port}`)
})

// axios.get(`http://localhost:${port}/api/juejin?id=${1943592291009511}`);
const params = core.getInput('params')

if (params) {
  axios.get(`http://localhost:${port}/api/juejin?${params}`)
}
