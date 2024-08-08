import globals from "globals"
import pluginJs from "@eslint/js"
import tsEslint from "typescript-eslint"
import pluginVue from "eslint-plugin-vue"
import vueParser from "vue-eslint-parser"


export default [
  /** eslint 默认推荐规则 */
  pluginJs.configs.recommended,
  /** ts 默认推荐规则 */
  ...tsEslint.configs.recommended,
  /** vue3 基础推荐规则 */
  ...pluginVue.configs["flat/recommended"],
  /**  prettier 推荐风格规则 */
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.es2020,
        ...globals.node,
      },
      parser: vueParser,
      sourceType: "module",
      ecmaVersion: "latest",
      parserOptions: {
        parser: tsEslint.parser,
        sourceType: "module"
      },
    },
    ignores: ["node_modules/**", "dist/**", ".DS_Store", "dist-ssr", "*.local", ".npmrc", "build", "release"],
    files: ["src/**/*.{js,jsx,ts,tsx,vue}", "native/**/*.{js,jsx,ts,tsx}"]
  },
]
