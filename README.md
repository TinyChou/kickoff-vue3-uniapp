> 版本日志：[CHANGELOG.md](./CHANGELOG.md)
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

### 添加 commitlint 检查

1. 安装 `commitlint` 相关依赖，@commitlint/{cli,config-conventional}

```shell
pnpm i -D @commitlint/{cli,config-conventional}
```
2. 配置 `.commitlintrc.cjs`

```shell
echo "module.exports = { extends: ['@commitlint/config-conventional'] }" > .commitlintrc.cjs
```
3. 安装 `husky`

```shell
pnpm i -D husky
```
4. 添加 husky hook

```shell
npx husky add .husky/commit-msg  'npx --no -- commitlint --edit ${1}'
```
5. 测试

```shell
npx commitlint --from HEAD~1 --to HEAD --verbose
git commit -m "foo: this will fail"
git commit -m "chore: lint on commitmsg"
```