import js from '@eslint/js';
import typescriptPlugin from '@typescript-eslint/eslint-plugin';
import typescriptParser from '@typescript-eslint/parser';
import airbnb from 'eslint-config-airbnb';
import airbnbTs from 'eslint-config-airbnb-typescript';
import jsxa11y from 'eslint-plugin-jsx-a11y';
import prettierPlugin from 'eslint-plugin-prettier';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import globals from 'globals';

export default [
  {
    ignores: ['dist']
  },
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      sourceType: 'module',
      parser: typescriptParser,
      parserOptions: {
        ecmaFeatures: { jsx: true }
      },
      globals: globals.browser
    },

    plugins: {
      '@typescript-eslint': typescriptPlugin,
      react,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      'eslint-plugin-jsx-a11y': jsxa11y,
      'simple-import-sort': simpleImportSort,
      prettier: prettierPlugin
    },
    rules: {
      ...js.configs.recommended.rules,
      ...typescriptPlugin.configs.recommended.rules,
      ...react.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,
      ...prettierPlugin.configs.recommended.rules,
      ...airbnb.rules,
      ...airbnbTs.rules,

      'react/jsx-curly-brace-presence': [
        'error',
        { props: 'never', children: 'never' }
      ],
      'prettier/prettier': ['error'],
      'react/function-component-definition': [
        2,
        { namedComponents: 'arrow-function' }
      ],
      'react/react-in-jsx-scope': 'off',
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true }
      ],
      'simple-import-sort/imports': [
        'error',
        {
          groups: [
            ['^react', '^@?\\w'],
            ['^@emotion', '^@chakra'],
            ['routes'],
            [
              '^hooks',
              '^store',
              '^store/hooks',
              '^store/actions',
              '^store/reducers'
            ],
            ['^helpers', '^utils'],
            ['^constants', '^types'],
            ['^assets'],
            ['^styles'],
            [
              '^(@|components)(/.*|$)',
              '^(@|ui)(/.*|$)',
              '^./components',
              '^./ui',
              '^\\.\\.(?!/?$)',
              '^\\./(?=.*/)(?!/?$)',
              '^\\.(?!/?$)',
              '^\\./?$'
            ],
            ['^\\u0000'],
            ['^.+\\.?(schema)$']
          ]
        }
      ]
    },

    ignores: ['node_modules', 'dist', 'build', 'public', 'vite.config.ts']
  }
];
