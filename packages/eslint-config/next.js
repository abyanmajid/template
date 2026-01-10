import antfu from '@antfu/eslint-config'

export default antfu(
  {
    react: true,
    typescript: true,
    formatters: true,
    stylistic: {
      indent: 2,
      quotes: 'single',
    },
  },
  {
    rules: {
      // Next.js specific rules
      'react/react-in-jsx-scope': 'off', // Not needed in Next.js
      'react/prop-types': 'off', // Using TypeScript
    },
  },
)
