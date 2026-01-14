import antfu from '@antfu/eslint-config'

export default antfu(
  {
    type: 'lib',
    typescript: true,
    formatters: false, // Disable formatters - no auto-formatting
    stylistic: false,  // Disable ALL stylistic rules
    ignores: [
      // Build outputs
      '**/dist/**',
      '**/build/**',
      '**/.next/**',
      '**/.turbo/**',
      '**/out/**',

      // Dependencies
      '**/node_modules/**',
      '**/bun.lock',
      '**/package-lock.json',
      '**/yarn.lock',

      // Documentation and non-code files
      '**/*.md',
      '**/*.mdx',
      '**/README*',
      '**/CHANGELOG*',
      '**/LICENSE*',

      // Config files that don't need linting
      '**/.env*',
      '**/.vscode/**',
      '**/.idea/**',

      // Generated files
      '**/coverage/**',
      '**/.cache/**',
    ],
  },
  {
    rules: {
      // === PRACTICAL RULES ONLY - BUG PREVENTION ===

      // Disable console usage - enforce proper logging libraries
      'no-console': 'error',

      // Prevent debugger statements in committed code
      'no-debugger': 'error',

      // Enforce explicit typing instead of 'any'
      '@typescript-eslint/no-explicit-any': 'error',

      // Block direct process.env access - use typesafe env loading
      'no-restricted-globals': [
        'error',
        {
          name: 'process',
          message: 'Use typesafe environment variables instead of process.env',
        },
      ],

      // Disable explicit return type requirement
      'ts/explicit-function-return-type': 'off',

      // Allow global process usage
      'node/prefer-global/process': 'off',

      // Allow index as key in React lists
      'react/no-array-index-key': 'off',

      // === DISABLE ALL FORMATTING RULES ===

      // Disable all style rules - use Prettier or editor formatting instead
      'style/object-curly-newline': 'off',
      'style/object-property-newline': 'off',
      'style/max-len': 'off',
      'style/newline-per-chained-call': 'off',
      'style/arrow-parens': 'off',
      'style/quotes': 'off',
      'style/semi': 'off',
      'style/indent': 'off',
      'style/comma-dangle': 'off',
      'style/brace-style': 'off',
      'style/space-before-function-paren': 'off',
      'style/operator-linebreak': 'off',
      'style/multiline-ternary': 'off',

      // Disable perfectionist rules - they add time overhead without practical benefit
      'perfectionist/sort-imports': 'off',
      'perfectionist/sort-named-imports': 'off',
      'perfectionist/sort-named-exports': 'off',
      'perfectionist/sort-exports': 'off',
      'perfectionist/sort-objects': 'off',
      'perfectionist/sort-object-types': 'off',
      'perfectionist/sort-interfaces': 'off',
      'perfectionist/sort-enums': 'off',
      'perfectionist/sort-classes': 'off',
      'perfectionist/sort-array-includes': 'off',

      // Aggressively disable ALL @stylistic/* rules
      '@stylistic/quotes': 'off',
      '@stylistic/semi': 'off',
      '@stylistic/indent': 'off',
      '@stylistic/comma-dangle': 'off',
      '@stylistic/arrow-parens': 'off',
    },
  },
  {
    // Disable ALL style/* and @stylistic/* rules globally
    ignores: [],
    rules: {
      'style/*': 'off',
      '@stylistic/*': 'off',
    },
  },
  // Override: Allow 'any' in test files
  {
    files: ['**/*.{test,spec}.{ts,tsx,js,jsx}'],
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
    },
  },
  // Override: Allow process.env in config files
  {
    files: ['*.config.{ts,js,mjs}', 'next.config.*'],
    rules: {
      'no-restricted-globals': 'off',
    },
  },
)
