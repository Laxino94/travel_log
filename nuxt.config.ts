import tailwindcss from '@tailwindcss/vite'

import './app/lib/env'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxt/eslint', '@nuxt/icon', '@nuxtjs/color-mode', '@pinia/nuxt', '@vee-validate/nuxt', 'nuxt-csurf'],
  eslint: {
    config: {
      standalone: false // load config from .eslintrc (or package.json)
    },
    checker: false // check eslint on dev and build
  },
  css: ['@/assets/css/main.css'],
  vite: {
    plugins: [
      tailwindcss()
    ]
  },
  colorMode: {
    dataValue: 'theme'
  }

})
