import antfu from '@antfu/eslint-config'

export default antfu(
  {
    react: true,
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

      // Next.js specific rules
      'react/react-in-jsx-scope': 'off', // Not needed in Next.js
      'react/prop-types': 'off', // Using TypeScript

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

      // === DISABLE ALL FORMATTING RULES ===

      // Disable all style rules - no formatting enforcement
      'style/arrow-parens': 'off',
      'style/quotes': 'off',
      'style/semi': 'off',
      'style/indent': 'off',
      'style/comma-dangle': 'off',
      'style/object-curly-newline': 'off',
      'style/object-property-newline': 'off',
      'style/max-len': 'off',
      'style/brace-style': 'off',

      // Disable perfectionist rules
      'perfectionist/sort-imports': 'off',
      'perfectionist/sort-named-imports': 'off',
      'perfectionist/sort-objects': 'off',

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
  // Override: Allow process.env in config files
  {
    files: ['*.config.{ts,js,mjs}', 'next.config.*'],
    rules: {
      'no-restricted-globals': 'off',
    },
  },
)
