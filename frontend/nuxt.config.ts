import { defineNuxtConfig } from 'nuxt/config'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt'
  ],
  css: ['~/assets/css/tailwind.css'], // ✅ MANTER NOME ORIGINAL
  ssr: true,
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
      // ✅ CORRIGIR URLs PARA PRODUÇÃO
      apiBase: process.env.NODE_ENV === 'production' 
        ? 'http://127.0.0.1:3002'  // URL interna do container
        : 'http://localhost:3002'   // URL local de desenvolvimento
    }
  }
})