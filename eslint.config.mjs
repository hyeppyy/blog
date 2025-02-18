import nextPlugin from '@next/eslint-plugin-next';
import tseslint from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import importPlugin from 'eslint-plugin-import';
import prettier from 'eslint-plugin-prettier';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';

const config = [
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    plugins: {
      '@typescript-eslint': tseslint,
      '@next/next': nextPlugin,
      prettier,
      react,
      'react-hooks': reactHooks,
      import: importPlugin,
    },
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        },
        project: './tsconfig.json',
      },
    },
    settings: {
      react: {
        version: 'detect',
      },
      next: {
        rootDir: './',
      },
      'import/resolver': {
        typescript: {},
      },
    },
    linterOptions: {
      reportUnusedDisableDirectives: true,
    },
    rules: {
      '@next/next/no-html-link-for-pages': 'error',
      '@next/next/no-img-element': 'error',
      '@next/next/no-sync-scripts': 'error',
      '@next/next/google-font-display': 'error',
      '@next/next/no-page-custom-font': 'error',

      'prettier/prettier': ['error', { singleQuote: true }],
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          varsIgnorePattern: '^_',
          argsIgnorePattern: '^_',
        },
      ],
      'react/react-in-jsx-scope': 'off',
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      '@next/next/no-html-link-for-pages': 'error',
      'react/function-component-definition': [
        'error', // 'warn'에서 'error'로 변경
        {
          namedComponents: 'arrow-function',
          unnamedComponents: 'arrow-function',
        },
      ],
      'arrow-body-style': ['error', 'as-needed'],
      'react/jsx-pascal-case': 'error',
      camelcase: ['error', { properties: 'never' }],
      'react/jsx-handler-names': [
        'error',
        {
          eventHandlerPropPrefix: 'handle',
        },
      ],
      'import/no-default-export': 'off',
      'import/prefer-default-export': 'off',
      'import/no-unresolved': 'error',
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
      'react/prop-types': 'off',
      'prefer-const': 'error',
      'no-var': 'error',
      'no-unused-vars': 'off',
      'import/order': [
        'error',
        {
          groups: ['builtin', 'external', 'internal', 'index'],
          pathGroups: [
            {
              pattern: 'react',
              group: 'external',
              position: 'before',
            },
            {
              pattern: '@/**',
              group: 'internal',
            },
          ],
          pathGroupsExcludedImportTypes: ['react'],
          'newlines-between': 'never',
          alphabetize: {
            order: 'asc',
            caseInsensitive: true,
          },
        },
      ],
      'react/jsx-no-duplicate-props': ['error', { ignoreCase: true }],
      '@typescript-eslint/no-empty-interface': 'off',
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      'no-useless-rename': 'error',
      'object-shorthand': 'error',
      'react/jsx-key': ['warn', { checkFragmentShorthand: true }],
    },
  },
];

export default config;
