import { defineNuxtConfig } from 'nuxt/config'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt'
  ],
  css: ['~/assets/css/tailwind.css'],
<<<<<<< HEAD
  ssr: false,
=======
  ssr: false, // ✅ DESABILITAR SSR para produção
>>>>>>> c4410f37eb21356904139954172dee6daaafd1f8
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
<<<<<<< HEAD
      apiBase: process.env.NODE_ENV === 'production' 
        ? ''
        : 'http://localhost:3002'
    }
  }
})
=======
      // ✅ CORREÇÃO DEFINITIVA: URL RELATIVA EM PRODUÇÃO
      apiBase: process.env.NODE_ENV === 'production' 
        ? ''  // ✅ URL RELATIVA - vai usar o mesmo domínio do browser
        : 'http://localhost:3002'   // ✅ Desenvolvimento
    }
  }
})
>>>>>>> c4410f37eb21356904139954172dee6daaafd1f8
