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

### 平台条件编译

> [条件编译支持 `#ifdef`, `#ifndef`, `%PLATFORM%`](https://zh.uniapp.dcloud.io/tutorial/platform.html#preprocessor).


### UnoCSS 支持

1. 安装 `unocss`, `@unocss/transformer-directives` 用于转换 combined atomic CSS properties.

```shell
pnpm i -D unocss @unocss/transformer-directives
```

2. 安装 uniapp 适配插件，禁掉 attributify 模式（消除小程序中部分内置组件，uni-ui 的 props 想冲突问题

```shell
pnpm i -D unocss-applet
```

最后，配置 `unocss.config.ts`:

```ts
import { defineConfig } from 'unocss'
import transformerDirectives from '@unocss/transformer-directives'

import {
  presetApplet,
  transformerApplet,
  // NOTE: DO NOT use uno attributify mode because of the conflicts
  // with some `uni-ui` components props.
  // transformerAttributify,
} from 'unocss-applet'

export default defineConfig({
  presets: [
    presetApplet(),
  ],
  transformers: [
    // Use this transformer directives to combine atomic CSS properties.
    // @see https://github.com/unocss/unocss/tree/main/packages/transformer-directives#css-variable-style
    transformerDirectives({
      applyVariable: ['--at-apply', '--uno-apply', '--uno'],
    }),
    // Don't change the following order
    // transformerAttributify(),
    transformerApplet(),
  ],
})
```