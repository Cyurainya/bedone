module.exports = {
  extends: ['plugin:vue/recommended', 'eslint:recommended'],
  globals: { uni: true, wx: true },
  rules: {
    'no-mixed-spaces-and-tabs': ['error', 'smart-tabs'],
    "vue/html-closing-bracket-newline": ["error", {
      "singleline": "never",
      "multiline": "never"
      }],
      "vue/max-attributes-per-line": ["error", {
        "singleline": 1,
        "multiline": {
          "max": 1,
          "allowFirstLine": true
        }
      }]
  },
  env: {
    es6: true,
    browser: true,
    node: true
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
}
