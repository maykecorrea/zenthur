import { defineNuxtPlugin } from '#app'

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig()
  
  const api = {
    baseURL: config.public.apiBase || 'http://localhost:3002',
    
    async request(method, url, options = {}) {
      const fullUrl = url.startsWith('http') ? url : `${this.baseURL}${url}`
      
      try {
        return await $fetch(fullUrl, {
          method,
          headers: {
            'Content-Type': 'application/json',
            ...options.headers
          },
          ...options
        })
      } catch (error) {
        throw error
      }
    },
    
    async get(url, options = {}) {
      return this.request('GET', url, options)
    },
    
    async post(url, data = {}, options = {}) {
      return this.request('POST', url, { body: data, ...options })
    },
    
    async put(url, data = {}, options = {}) {
      return this.request('PUT', url, { body: data, ...options })
    },
    
    async delete(url, options = {}) {
      return this.request('DELETE', url, options)
    }
  }

  return {
    provide: {
      api
    }
  }
})