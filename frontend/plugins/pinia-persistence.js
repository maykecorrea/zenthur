import { defineNuxtPlugin } from '#app'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

export default defineNuxtPlugin(nuxtApp => {
  // Configurar o plugin apenas no cliente
  if (process.client) {
    nuxtApp.$pinia.use(piniaPluginPersistedstate)
  }
})