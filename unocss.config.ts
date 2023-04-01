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