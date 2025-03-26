import { defineConfig } from 'eslint/config';
import globals from 'globals';
import js from '@eslint/js';
import pluginReact from 'eslint-plugin-react';

export default defineConfig([
  // This block applies to all JS-related files.
  {
    files: ['**/*.{js,mjs,cjs,jsx}'],
    env: {
      browser: true, // for browser globals
      node: true, // for Node globals (like process)
      es2021: true,
    },
    languageOptions: {
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.node, // now process and other Node globals are defined
      },
    },
  },
  // For CommonJS files (if any)
  {
    files: ['**/*.js'],
    languageOptions: { sourceType: 'commonjs' },
  },
  {
    files: ['**/*.{js,mjs,cjs,jsx}'],
    plugins: { js },
    extends: ['js/recommended'],
  },
  pluginReact.configs.flat.recommended,
]);
