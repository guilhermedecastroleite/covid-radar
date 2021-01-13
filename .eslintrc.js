module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: [
    'eslint:recommended',
    'airbnb',
    'airbnb/hooks',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
    React: 'writable',
  },
  parser: 'babel-eslint',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: [
    'react',
    'react-hooks',
  ],
  rules: {
    indent: ['error', 2], // 2 spaces indentation
    'linebreak-style': ['error', 'unix'], // \n instead of \r\n
    quotes: ['error', 'single'], // single quotes preferred
    semi: ['error', 'always'], // always use semicolons
    'brace-style': ['error', 'stroustrup', { allowSingleLine: true }], // Overrides Airbnb: statements on separated lines
    'react/forbid-prop-types': 0, // Overrides Airbnb: allows all proptypes
    'jsx-quotes': ['error', 'prefer-single'],
    'no-continue': 0, // allows continue
    'max-len': ['error', {
      code: 120,
      tabWidth: 2,
      ignoreUrls: true,
      ignoreComments: true,
      ignoreStrings: true,
      ignoreTemplateLiterals: true,
    }],
    camelcase: 0,
    'no-underscore-dangle': 0,
    'no-console': ['warn', { allow: ['warn', 'error'] }],
    'react/jsx-props-no-spreading': 0,
    'react/default-props-match-prop-types': [2, { allowRequiredDefaults: true }],
    'react/require-default-props': [2, { forbidDefaultForRequired: false }],
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    'import/no-named-as-default-member': 0,
    'react/react-in-jsx-scope': 'off',
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
  },
};
