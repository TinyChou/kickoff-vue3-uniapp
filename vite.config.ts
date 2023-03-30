import { defineConfig } from 'vite'
import uni from '@dcloudio/vite-plugin-uni'
import eslint from 'vite-plugin-eslint'
import vueJsx from '@vitejs/plugin-vue-jsx'
import unocss from 'unocss/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    // do not fail on serve (i.e. local development)
    {
      ...eslint({
        failOnWarning: false,
        failOnError: false,
        cache: true,
        fix: true,
      }),
      apply: "serve",
      enforce: "post",
    },
    uni(),
    vueJsx(),
    unocss(),
  ],
})
