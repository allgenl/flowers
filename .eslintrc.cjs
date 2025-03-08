module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    'plugin:import/typescript',
    'plugin:effector/react',
    'plugin:effector/future',
    'plugin:effector/recommended',
    'eslint-config-prettier',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh', 'react', '@typescript-eslint', 'import', 'jsx-a11y', 'react-hooks', 'effector'],
  settings: {
    react: {
      version: 'detect',
    },
    'import/resolver:': {
      node: {
        paths: ['src'],
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
  },
  rules: {
    'no-empty': ['error', { 'allowEmptyCatch': true }],
    'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        args: "all",
        argsIgnorePattern: "^_",
        caughtErrors: "all",
        caughtErrorsIgnorePattern: "error|^_",
        destructuredArrayIgnorePattern: "^_",
        varsIgnorePattern: "^_",
        ignoreRestSiblings: true
      },
    ],
    '@typescript-eslint/no-explicit-any': 'off',
    'react/react-in-jsx-scope': 'off',
    'react-refresh/only-export-components': 'off',
    'no-restricted-imports': [
      'error',
      {
        // "paths": [
        //   {
        //     "message": "Используйте `shared/lib/dayjs`",
        //     "name": "dayjs"
        //   }
        // ],
        patterns: [
          {
            message: 'Запрещен импорт приватного API',
            group: [
              // "features/*/*",
              '**/../features/*',
            ],
          },
          // {
          //   "message": "Используйте `shared/lib/dayjs`",
          //   "group": ["dayjs/*"]
          // }
        ],
      },
    ],
  },
};
