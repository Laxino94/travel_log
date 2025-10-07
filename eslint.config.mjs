// @ts-check
import antfu from '@antfu/eslint-config'

import withNuxt from './.nuxt/eslint.config.mjs'

// TODO: add tailwindcss plugin support

export default withNuxt(
  antfu(
    {
      type: 'app',
      vue: true,
      typescript: true,
      formatters: true,
      stylistic: {
        indent: 2,
        semi: false,
        quotes: 'single'
      },
      ignores: [
        '.pnpm-store/**',
        '**/migrations/**'
      ]
    },
    {
      rules: {
        'vue/max-attributes-per-line': ['error', {
          singleline: {
            max: 3
          },
          multiline: {
            max: 1
          }
        }], // allow multiple attributes per line
        'ts/no-redeclare': ['off'], // allow redeclare variables
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
          cases: {
            kebabCase: true,
            camelCase: true
          },
          ignore: ['README.md']
        }],
        'style/comma-dangle': ['error', 'never']
      }
    }
  )
)
