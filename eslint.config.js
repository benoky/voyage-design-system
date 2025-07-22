// Import basic ESLint rules
import js from '@eslint/js';
// Import global variables definitions (global variables available in browser, node environments)
import globals from 'globals';
// Import React Hooks rules plugin
import reactHooks from 'eslint-plugin-react-hooks';
// Import React Fast Refresh rules plugin
import reactRefresh from 'eslint-plugin-react-refresh';
// Import TypeScript ESLint configuration
import tseslint from 'typescript-eslint';
// Import Prettier plugin
import prettierPlugin from 'eslint-plugin-prettier';
// Import React plugin
import reactPlugin from 'eslint-plugin-react';
// Import Prettier configuration (disable ESLint rules that conflict with Prettier)
import prettierEslint from 'eslint-config-prettier';

// Prettier plugin configuration
const prettierConfig = {
  files: ['**/*.{js,jsx,ts,tsx,css,scss,md}'],
  plugins: {
    prettier: prettierPlugin,
  },
  rules: {
    // Show Prettier rules as ESLint errors (Prettier takes priority)
    'prettier/prettier': ['error'],
    // Disable ESLint rules that may conflict with Prettier
    'arrow-body-style': 'off',
    'prefer-arrow-callback': 'off',
  },
};

// React configuration
const reactConfig = {
  files: ['**/*.{jsx,tsx}'],
  plugins: {
    react: reactPlugin,
  },
  settings: {
    react: {
      version: 'detect', // Auto-detect React version
    },
  },
  rules: {
    // React import is not required in React 17+
    'react/react-in-jsx-scope': 'off',
    'react/jsx-uses-react': 'off',
    // Additional React rules
    'react/prop-types': 'off', // prop-types not needed when using TypeScript
    'react/jsx-key': 'error', // key attribute required when rendering arrays
  },
};

export default [
  // Configure files and directories to ignore
  { ignores: ['dist'] },
  // Disable all ESLint rules that conflict with Prettier (apply first)
  prettierEslint,
  // Apply React configuration
  reactConfig,
  // Apply Prettier configuration
  prettierConfig,
  // Apply basic recommended JavaScript rules
  js.configs.recommended,
  // Apply TypeScript recommended rules to TypeScript files
  ...tseslint.configs.recommended,
  {
    // Apply to TypeScript and TSX files only
    files: ['**/*.{ts,tsx}'],
    // Language options configuration
    languageOptions: {
      // Use ECMAScript 2022 syntax
      ecmaVersion: 2022,
      // Allow browser environment global variables
      globals: globals.browser,
      // Enable JSX support
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    // Plugin configuration
    plugins: {
      // React Hooks rules plugin
      'react-hooks': reactHooks,
      // React Fast Refresh plugin
      'react-refresh': reactRefresh,
    },
    // Rule configuration
    rules: {
      // Apply React Hooks recommended rules (ensure proper usage of useEffect, useState, etc.)
      ...reactHooks.configs.recommended.rules,
      // Rule to only export React components (Fast Refresh optimization)
      'react-refresh/only-export-components': [
        'warn', // Set to warning level
        { allowConstantExport: true }, // Allow exporting constants
      ],
      '@typescript-eslint/no-explicit-any': 'off', // Disable typescript-eslint rule that disallows any type
      '@typescript-eslint/no-unused-vars': 'off', // Disable typescript-eslint rule for unused variables error handling
    },
  },
];
