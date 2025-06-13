import { defineNuxtConfig } from 'nuxt/config'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt'
  ],
  css: ['~/assets/css/tailwind.css'],
  ssr: false,
  nitro: {
    preset: 'node-server'
  },
  build: {
    transpile: ['vue-toastification']
  },
  vite: {
    optimizeDeps: {
      include: ['vue-toastification']
    }
  },
  runtimeConfig: {
    public: {
      apiBase: process.env.NODE_ENV === 'production' 
        ? ''
        : 'http://localhost:3002'
    }
  }
})
