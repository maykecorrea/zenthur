import { defineNuxtConfig } from 'nuxt/config'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  
  css: ['~/assets/css/tailwind.css'],
  
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  
  modules: [
    '@pinia/nuxt'
  ],
  
  app: {
    head: {
      script: [
        {
          src: 'https://developer.api.autodesk.com/modelderivative/v2/viewers/7.*/viewer3D.min.js',
          defer: true
        }
      ],
      link: [
        {
          rel: 'stylesheet',
          href: 'https://developer.api.autodesk.com/modelderivative/v2/viewers/7.*/style.min.css'
        }
      ]
    }
  },
  
  runtimeConfig: {
    public: {
      apiUrl: process.env.API_URL || 'http://localhost:3001'
    }
  },

  ssr: true
})