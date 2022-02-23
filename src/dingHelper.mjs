import axios from "axios"
import crypto from "crypto"

const secret =
  "SEC320c38ed97d2aadc381fc14a720b3aea3e041c746712585d618b0940bc85aae0";

const getSignData = () => {
  const ts = +new Date();
  let stringToSign = ts + "\n" + secret;
  return {
    sign: encodeURIComponent(
      crypto
        .createHmac("sha256", secret)
        .update(stringToSign)
        .digest("base64")
        .toString()
    ),
    timestamp: ts,
  };
};

/**
 *
 * @param {string} msg
 */
export const sendDingMsg = (msg) => {
  const signData = getSignData();
  return axios.post(
    "https://oapi.dingtalk.com/robot/send",
    {
      at: {
        isAtAll: true,
      },
      text: {
        content: msg,
      },
      msgtype: "text",
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
      params: {
        access_token:
          "7d131ec1af9e459462f2567ff5631b1a1c8cd040bd3dd23a1015a711b5748bea",
        timestamp: signData.timestamp,
        sign: signData.sign,
      },
    }
  ).then(res => {
    console.log('sendDingMsg succeeded. Msg is: ' + msg)
  }).catch(err => {
    console.log('sendDingMsg failed. Error is: ' + err)
  });
};
