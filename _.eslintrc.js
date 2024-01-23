module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: ['plugin:react/recommended', 'prettier', 'react-app'],
  overrides: [],
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    project: './tsconfig.json',
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  plugins: ['react', 'prettier'],
  rules: {
    "react/jsx-uses-react": "error",
     "react/jsx-uses-vars": "error",
    'comma-dangle': ['error', 'never'],
    'import/exports-last': 'error',
    'import/extensions': 'off',
    'import/first': 'error',
    'import/order': [
      'error',
      {
        groups: [
          ['external', 'builtin'],
          ['index', 'internal', 'sibling', 'parent']
        ],
        'newlines-between': 'always-and-inside-groups'
      }
    ],
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: ['.storybook/**', '**/*.stories.tsx', 'scripts/*.js', 'src/setupTests.ts']
      }
    ],
    'import/prefer-default-export': 0,
    'jsx-a11y/anchor-is-valid': [
      'error',
      {
        components: ['Link'],
        specialLink: ['hrefLeft', 'hrefRight'],
        aspects: ['invalidHref', 'preferButton']
      }
    ],
    "import/no-anonymous-default-export": ["error", {
      "allowArray": false,
      "allowArrowFunction": false,
      "allowAnonymousClass": false,
      "allowAnonymousFunction": false,
      "allowCallExpression": true, // The true value here is for backward compatibility
      "allowLiteral": false,
      "allowObject": false
    }],
    'prettier/prettier': ['warn'],
    'no-class-assign': ['off'],
    'no-func-assign': ['off'],
    'react-hooks/exhaustive-deps': 'off',
    'no-multiple-empty-lines': ['error', { max: 1, maxBOF: 0, maxEOF: 0 }],
    'no-param-reassign': ['error', { props: false }],
    'no-plusplus': ['error', { allowForLoopAfterthoughts: true }],
    'no-shadow': 'off',
    'no-underscore-dangle': ['error', { allow: ['_id', '_identifier', '_contentType'] }],
    'no-unused-vars': ['error', { ignoreRestSiblings: true, argsIgnorePattern: '^_' }],
    'jsx-a11y/label-has-associated-control': 'off',
    'object-curly-newline': ['error', { consistent: true }],
    'jsx-a11y/label-has-for': 'off',
    'react/forbid-prop-types': ['off'],
    'react/jsx-filename-extension': ['error', { extensions: ['.tsx', '.js'] }],
    'react/jsx-one-expression-per-line': ['off'],
    'react/jsx-props-no-spreading': ['off'],
    'react/no-unused-prop-types': ['off'],
    'react/prop-types': ['off'],
    'react/require-default-props': ['off'],
    'import/no-anonymous-default-export': ['off'],
    semi: ['error', 'never'],
    'spaced-comment': ['error', 'always', { markers: ['/'] }]
  }
}
