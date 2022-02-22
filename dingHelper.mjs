import fetch from 'node-fetch'
import crypto from 'crypto'

const secret = 'SEC320c38ed97d2aadc381fc14a720b3aea3e041c746712585d618b0940bc85aae0'

const getSignData = () => {
  const ts = +new Date()
  let stringToSign = ts + '\n' + secret
  return {
    sign: encodeURIComponent(crypto.createHmac('sha256', secret).update(stringToSign).digest('base64').toString('base64')),
    timestamp: ts,
  }
}

export const sendDingMsg = () => {
  const signData = getSignData()
  return fetch(
    `https://oapi.dingtalk.com/robot/send?access_token=7d131ec1af9e459462f2567ff5631b1a1c8cd040bd3dd23a1015a711b5748bea&timestamp=${signData.timestamp}&sign=${signData.sign}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      "at": {
        "isAtAll": false
    },
    "text": {
        "content":"我就是我, 是不一样的烟火2"
    },
    "msgtype":"text"
    })
  }).then(res => {
    return res.json()
  })
}
