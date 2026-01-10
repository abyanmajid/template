import antfu from '@antfu/eslint-config'

export default antfu(
  {
    type: 'lib',
    typescript: true,
    formatters: true,
    stylistic: {
      indent: 2,
      quotes: 'single',
    },
  },
  {
    rules: {
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

      // Force multiline for long objects
      'style/object-curly-newline': ['error', {
        multiline: true,
        minProperties: 3,
        consistent: true,
      }],
      'style/object-property-newline': ['error', {
        allowAllPropertiesOnSameLine: false,
      }],

      // Enforce max line length
      'style/max-len': ['error', {
        code: 100,
        ignoreUrls: true,
        ignoreStrings: true,
        ignoreTemplateLiterals: true,
        ignoreRegExpLiterals: true,
      }],

      // Force method chains to break onto new lines
      'style/newline-per-chained-call': ['error', { ignoreChainWithDepth: 2 }],
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
