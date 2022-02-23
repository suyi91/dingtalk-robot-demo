import express from 'express'
import { sendDingMsg } from './dingHelper.mjs'

const app = express()

app.use('/dingding', (req, res) => {
  sendDingMsg().then(res => {
    res.json(res)
  }).catch(err => {
    res.json(err)
  })
})

app.listen(3030, () => {
  console.log('Server started on port: 3030')
})
