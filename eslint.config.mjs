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
    files: ["src/**/*.{js,jsx,ts,tsx,vue}", "native/**/*.{js,jsx,ts,tsx}"],
    rules: {
      // TS
      "@typescript-eslint/no-explicit-any": "off",
      "no-debugger": "off",
      "@typescript-eslint/explicit-module-boundary-types": "off",
      "@typescript-eslint/ban-types": "off",
      "@typescript-eslint/ban-ts-comment": "off",
      "@typescript-eslint/no-empty-function": "off",
      "@typescript-eslint/no-non-null-assertion": "off",
      "@typescript-eslint/no-unused-expressions": "off",
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_"
        }
      ],
      "no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_"
        }
      ],
      // Vue
      "vue/no-v-html": "off",
      "vue/require-default-prop": "off",
      "vue/require-explicit-emits": "off",
      "vue/multi-word-component-names": "off",
      "vue/max-attributes-per-line": [2, {
        singleline: 4,
        multiline: 1
      }],
      "vue/html-self-closing": [
        "error",
        {
          html: {
            void: "always",
            normal: "always",
            component: "always"
          },
          svg: "always",
          math: "always"
        }
      ],

    }
  },
]
