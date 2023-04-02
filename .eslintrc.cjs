/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  root: true,
  'extends': [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/eslint-config-typescript',
    '@vue/eslint-config-prettier',
    // 'plugin:@cspell/recommended',
  ],
  parserOptions: {
    ecmaVersion: 'latest',
  },
  rules: {
    'vue/multi-word-component-names': 'off',
    // '@cspell/spellchecker': [
    //   'warn',
    //   {
    //     checkComments: false,
    //     autoFix: false,
    //   }
    // ],
  },
  globals: {
    uni: true,
  },
}
