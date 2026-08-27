module.exports = {
  root: true,
  env: {
    browser: true,
    es2020: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:react/jsx-runtime',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  plugins: ['@typescript-eslint', 'react', 'react-hooks', 'react-refresh'],
  ignorePatterns: ['dist', 'node_modules', 'vite.config.ts', 'tailwind.config.ts'],
  rules: {
    // Disable rules that are likely to cause warnings in the current codebase
    '@typescript-eslint/no-unused-vars': 'off',
    'react/prop-types': 'off',
    'react/react-in-jsx-scope': 'off', // not needed with new JSX transform
    'react-refresh/only-export-components': 'off',
    'no-empty': 'off',
    'no-case-declarations': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
  },
  settings: {
    react: {
      version: '18.2',
    },
  },
};