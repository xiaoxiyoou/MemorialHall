module.exports = {
  root: true,
  env: {
    node: true
  },
  'extends': [
    'plugin:vue/essential',
    '@vue/standard'
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'space-before-function-paren': 0,
    'indent': 0,
    'no-multiple-empty-lines':'off',
    'no-trailing-spaces':'off',
    'no-tabs':'off',
    'space-before-blocks':'off',
    'keyword-spacing':'off',
    'arrow-spacing':'off',
    'no-multi-spaces':'off',
    'key-spacing':'off',
    'comma-spacing':'off',
    'no-console': 'off',
    'semi': 0,
    "eol-last": 0,
    "no-multiple-empty-lines": ["error", { "max": 1, "maxEOF": 0 }],
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
}
