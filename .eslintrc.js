module.exports = {
  root: true,
  env: {
    node: true,
    jest: true
  },
  'extends': [
    'plugin:vue/essential',
    'eslint:recommended',
    '@vue/typescript'
  ],
  rules: {
    'no-console': 'off',
    'no-debugger': 'off',
    'no-unreachable': 'off',
    'no-empty': 'off',
    'no-func-assign': 'off',
    'no-unreachable': 'off',
    'getter-return': 'off',
    'no-unsafe-finally': 'off',
    'no-mixed-spaces-and-tabs': 'off'
  },
  parserOptions: {
    parser: '@typescript-eslint/parser'
  },
  overrides: [
    {
      files: [
        '**/__tests__/*.{j,t}s?(x)'
      ],
      env: {
        mocha: true
      }
    }
  ]
}
