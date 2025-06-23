import { defineNuxtConfig } from 'nuxt/config'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  
  runtimeConfig: {
    apiSecret: process.env.API_SECRET || '',
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE || 'http://localhost:4001/api'
    }
  },

  ssr: false,
  
  app: {
    head: {
      title: 'Sistema de Gestão Industrial',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' }
      ],
      script: [
        {
          src: 'https://developer.api.autodesk.com/modelderivative/v2/viewers/7.*/viewer3D.js',
          defer: true
        }
      ],
      link: [
        {
          rel: 'stylesheet',
          href: 'https://developer.api.autodesk.com/modelderivative/v2/viewers/7.*/style.css'
        }
      ]
    }
  },

  css: [
    '~/assets/css/tailwind.css'
  ],

  modules: [
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt'
  ],

  build: {
    transpile: ['vue-router']
  },

  nitro: {
    experimental: {
      wasm: true
    }
  }
})