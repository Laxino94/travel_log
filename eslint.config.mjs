import antfu from '@antfu/eslint-config'

// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt(antfu({

  type: 'app',
  vue: true,
  typescript: true,
  formatters: true,
  stylistic: {
    indent: 2,
    semi: false,
    quotes: 'single'
  }

}, {
  rules: {
    'ts/consistent-type-definitions': ['error', 'type'], // use type instead of interface
    'no-console': ['warn'], // allow console during development
    'antfu/no-top-level-await': ['off'], // allow top level await
    'node-prefer-global.process': ['off'],
    'node/no-process-env': ['error'],
    'perfectionist/sort-imports': ['error', {
      tsconfigRootDir: '.'
    }],
    // file naming
    'unicorn/filename-case': ['error', {
      case: 'camelCase',
      ignore: ['README.md']
    }],
    'style/comma-dangle': ['error', 'never']
  }

})
)
