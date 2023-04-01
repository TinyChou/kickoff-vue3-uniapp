### Wechat/Lark JSSDK

在宿主（Wechat/Lark）中 H5 应用需要验证 H5 网页应用才有权限访问限定范围的 JSSDK API ，这个过程称为鉴权。

鉴权的过程：

1. 引入对应 JSSDK 到页面
  - [Wechat](https://developers.weixin.qq.com/doc/offiaccount/OA_Web_Apps/JS-SDK.html#1): http(s)://res.wx.qq.com/open/js/jweixin-1.6.0.js
            http(s)://res2.wx.qq.com/open/js/jweixin-1.6.0.js 备用
  - [Lark](https://open.feishu.cn/document/uYjL24iN/uMTMuMTMuMTM/introduction): https://lf1-cdn-tos.bytegoofy.com/goofy/lark/op/h5-js-sdk-1.5.21.js

2. 检测 JSSDK 是否已经加载 OK
  - script `onload`
  - 额外的全局对象已经挂载，微信是 `window.wx`，Lark 是 `window.h5sdk`

3. 去 H5 应用后台服务验证，向接入方服务端发起请求，获取鉴权参数（appId、timestamp、nonceStr、signature）

Wechat：

```js
// TODO: 发起签名（H5 应用后台）
// 获取鉴权参数（appId、timestamp、nonceStr、signature）

wx.config({
  debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
  appId: '', // 必填，公众号的唯一标识
  timestamp: , // 必填，生成签名的时间戳
  nonceStr: '', // 必填，生成签名的随机串
  signature: '',// 必填，签名
  jsApiList: [] // 必填，需要使用的JS接口列表
});

wx.ready(function(){
  // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
});

wx.error(function(res){
  // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
});
```

Lark:

```js
// 调用config接口的当前网页url
const url = encodeURIComponent(location.href.split("#")[0]);

// TODO: 发起签名（H5 应用后台）
// 获取鉴权参数（appId、timestamp、nonceStr、signature）

// 调用config接口进行鉴权
window.h5sdk.config({
  appId: res.appid,
  timestamp: res.timestamp,
  nonceStr: res.noncestr,
  signature: res.signature,
  jsApiList: [],
  //鉴权成功回调
  onSuccess: (res) => {
    console.log(`config success: ${JSON.stringify(res)}`);
  },
  //鉴权失败回调
  onFail: (err) => {
    throw `config failed: ${JSON.stringify(err)}`;
  },
});

// 通过error接口处理API验证失败后的回调
window.h5sdk.error((err) => {
  throw ("h5sdk error:", JSON.stringify(err));
});

// 完成鉴权后，便可在 window.h5sdk.ready 里调用 JSAPI
window.h5sdk.ready(() => {
  // tt.getUserInfo()
});
```

### jsSdkAuth 使用

1. 第一次进入 H5，在调用 JSSDK API 之前调用鉴权检查 `jsSdkAuth(true)`，这里，会先加载需要的 JSSDK 脚本

2. 在一个 SPA 内，切换路由，需要在路由守卫中再次刷新鉴权 `jsSdkAuth(false)`，保证 JSSDK API 一直可用