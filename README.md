### 添加 `@dcloudio/uni-ui` 支持

1. `sass` 依赖安装，因为使用 vite，所以不需要安装 `sass-loader`
2. 使用官方 easycom 规范引入依赖，支持按需加载，编辑 pages.json

```json
"easycom": {
  "autoscan": true,
  "custom": {
    "uni-(.*)": "@dcloudio/uni-ui/lib/uni-$1/uni-$1.vue"
  }
}
```
