import { loadAndExecScript } from '@/platforms/browser/loadAndExecScript'

declare global {
  interface Window {
    h5sdk?: any
    wx?: any
  }
}

// #ifdef H5
function validateSdk(obj: any) {
  if (obj) return
  throw new Error('The JSSDK is invalid, validation failed!')
}

function generateConfigUrl(apiPath: string) {
  return `${apiPath}${encodeURIComponent(location.href.split('#')[0])}`
}

// TODO:
const H5_API_CONFIG_LARK = ''
const H5_API_CONFIG_WECHAT = ''

async function _jsSdkAuth(initial: boolean) {
  // https://juejin.cn/post/7122744808023687182
  if (/Feishu TTWebView/.test(navigator.userAgent)) {
    // Mozilla/5.0 (Linux; Android 9; MI 6X Build/PKQ1.180904.001; wv) AppleWebKit/537.36 (KHTML, like Gecko)
    // Version/4.0 Chrome/75.0.3770.156 Mobile Safari/537.36 Lark/5.10.4 LarkLocale/zh_CN ChannelName/Feishu TTWebView/0751130016452
    initial && (await loadAndExecScript('https://lf1-cdn-tos.bytegoofy.com/goofy/lark/op/h5-js-sdk-1.5.21.js'))
    initial && validateSdk(window.h5sdk)
    return await fetch(generateConfigUrl(H5_API_CONFIG_LARK))
      .then((res) => res.json())
      .then((res) => {
        return new Promise<boolean>((resolve) => {
          window.h5sdk!.error(() => resolve(false))
          window.h5sdk!.ready(() => resolve(true))

          // 鉴权的 onSuccess/onFail 忽略
          window.h5sdk!.config({
            apiId: res.apiId,
            timestamp: res.timestamp,
            nonceStr: res.noncestr,
            signature: res.signature,
            jsApiList: [],
          })
        })
      })
  } else if (/WeChat/.test(navigator.userAgent)) {
    // Mozilla/5.0 (Linux; Android 12; M2102J2SC Build/SKQ1.211006.001; wv) AppleWebKit/537.36 (KHTML, like Gecko)
    // Version/4.0 Chrome/86.0.4240.99 XWEB/4267 MMWEBSDK/20220505 Mobile Safari/537.36 MMWEBID/4029
    // MicroMessenger/8.0.23.2160(0x28001757) WeChat/arm64 Weixin NetType/4G Language/zh_CN ABI/arm64
    initial &&
      (await loadAndExecScript([
        'https://res.wx.qq.com/open/js/jweixin-1.6.0.js',
        'https://res2.wx.qq.com/open/js/jweixin-1.6.0.js',
        'http://res.wx.qq.com/open/js/jweixin-1.6.0.js',
        'http://res2.wx.qq.com/open/js/jweixin-1.6.0.js',
      ]))
    initial && validateSdk(window.wx)
    return await fetch(generateConfigUrl(H5_API_CONFIG_WECHAT))
      .then((res) => res.json())
      .then((res) => {
        return new Promise<boolean>((resolve) => {
          window.wx!.error(() => resolve(false))
          window.wx!.ready(() => resolve(true))

          // 鉴权的 onSuccess/onFail 忽略
          window.wx!.config({
            debug: process.env.NODE_ENV === 'development',
            apiId: res.apiId,
            timestamp: res.timestamp,
            nonceStr: res.noncestr,
            signature: res.signature,
            jsApiList: [],
          })
        })
      })
  } else {
    return true
  }
}
// #endif

type PromiseCallbackPair<T> = [(value: T | PromiseLike<T>) => void, (reason?: any) => void]
const queue: PromiseCallbackPair<boolean>[] = []

export async function jsSdkAuth(initial: boolean = true) {
  return new Promise((resolve, reject) => {
    if (!queue.length) {
      _jsSdkAuth(initial)
        .then((value) => {
          while (queue.length) {
            const [resolveCallback] = queue.shift() as PromiseCallbackPair<boolean>
            resolveCallback(value)
          }
          resolve(value)
        })
        .catch((reason) => {
          while (queue.length) {
            const [, rejectCallback] = queue.shift() as PromiseCallbackPair<boolean>
            rejectCallback(reason)
          }
          reject(reason)
        })
    } else {
      queue.push([resolve, reject])
    }
  })
}
