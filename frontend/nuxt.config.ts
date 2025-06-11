import { defineNuxtConfig } from 'nuxt/config'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt'
  ],
  css: ['~/assets/css/tailwind.css'],
  ssr: false, // ✅ DESABILITAR SSR para produção
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
      // ✅ CORREÇÃO DEFINITIVA: URL RELATIVA EM PRODUÇÃO
      apiBase: process.env.NODE_ENV === 'production' 
        ? ''  // ✅ URL RELATIVA - vai usar o mesmo domínio do browser
        : 'http://localhost:3002'   // ✅ Desenvolvimento
    }
  }
})