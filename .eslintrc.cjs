module.exports = {
  root: true,
  env: {
    browser: true,
    es2022: true,
  },
  extends: ['airbnb', 'airbnb/hooks'],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  rules: {
    'react/react-in-jsx-scope': 'off',
    'react/jsx-props-no-spreading': 'off',
    'react/jsx-no-bind': 'off',
    'react/jsx-one-expression-per-line': 'off',
    'react/no-danger': 'off',
    'jsx-a11y/label-has-associated-control': 'off',
    'object-curly-newline': 'off',
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never',
      },
    ],
    'react/function-component-definition': [
      'error',
      {
        namedComponents: 'function-declaration',
        unnamedComponents: 'function-expression',
      },
    ],
    'no-alert': 'off',
  },
  overrides: [
    {
      files: ['vite.config.js', 'cypress.config.js'],
      rules: {
        'import/no-extraneous-dependencies': 'off',
      },
    },
    {
      files: ['src/**/*.test.js', 'src/**/*.test.jsx'],
      globals: {
        describe: 'readonly',
        it: 'readonly',
        expect: 'readonly',
        vi: 'readonly',
        beforeEach: 'readonly',
        afterEach: 'readonly',
      },
      rules: {
        'import/no-extraneous-dependencies': 'off',
      },
    },
    {
      files: ['cypress/**/*.js'],
      env: {
        'cypress/globals': true,
      },
      plugins: ['cypress'],
      extends: ['plugin:cypress/recommended'],
      rules: {
        'import/no-extraneous-dependencies': 'off',
      },
    },
  ],
};
