<template>
  <div class="min-h-screen bg-gray-50 p-8">
    <div class="max-w-4xl mx-auto">
      <h1 class="text-3xl font-bold mb-8 text-center">
        🩺 System Status
      </h1>
      
      <!-- Status Geral -->
      <div class="bg-white rounded-lg shadow-md p-6 mb-6">
        <div class="flex items-center justify-between">
          <h2 class="text-xl font-semibold">Overall Status</h2>
          <div :class="[
            'px-3 py-1 rounded-full text-sm font-medium',
            overallStatus === 'healthy' ? 'bg-green-100 text-green-800' :
            overallStatus === 'degraded' ? 'bg-yellow-100 text-yellow-800' :
            'bg-red-100 text-red-800'
          ]">
            {{ overallStatus.toUpperCase() }}
          </div>
        </div>
        <p class="text-gray-600 mt-2">
          Last updated: {{ new Date().toLocaleString() }}
        </p>
      </div>

      <!-- Serviços -->
      <div class="grid gap-6 md:grid-cols-2">
        <!-- Backend -->
        <div class="bg-white rounded-lg shadow-md p-6">
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-lg font-semibold">Backend API</h3>
            <div :class="[
              'w-3 h-3 rounded-full',
              backendHealth.status === 'healthy' ? 'bg-green-500' :
              backendHealth.status === 'degraded' ? 'bg-yellow-500' :
              'bg-red-500'
            ]"></div>
          </div>
          
          <div class="space-y-2 text-sm">
            <div class="flex justify-between">
              <span>Status:</span>
              <span class="font-medium">{{ backendHealth.status }}</span>
            </div>
            <div class="flex justify-between">
              <span>Response Time:</span>
              <span>{{ backendHealth.responseTime }}ms</span>
            </div>
            <div class="flex justify-between">
              <span>Uptime:</span>
              <span>{{ formatUptime(backendHealth.uptime) }}</span>
            </div>
          </div>

          <!-- Serviços do Backend -->
          <div class="mt-4" v-if="backendHealth.services">
            <h4 class="font-medium mb-2">Services:</h4>
            <div class="space-y-1 text-xs">
              <div v-for="(service, name) in backendHealth.services" :key="name"
                   class="flex justify-between">
                <span>{{ name }}:</span>
                <span :class="[
                  'font-medium',
                  service.status === 'healthy' ? 'text-green-600' :
                  service.status === 'configured' ? 'text-blue-600' :
                  'text-red-600'
                ]">{{ service.status }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Frontend -->
        <div class="bg-white rounded-lg shadow-md p-6">
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-lg font-semibold">Frontend</h3>
            <div class="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
          
          <div class="space-y-2 text-sm">
            <div class="flex justify-between">
              <span>Status:</span>
              <span class="font-medium">healthy</span>
            </div>
            <div class="flex justify-between">
              <span>URL:</span>
              <span class="font-medium">{{ frontendUrl }}</span>
            </div>
            <div class="flex justify-between">
              <span>Build:</span>
              <span class="font-medium">{{ buildTime }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Refresh Button -->
      <div class="text-center mt-8">
        <button @click="refreshStatus" 
                :disabled="loading"
                class="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg disabled:opacity-50">
          {{ loading ? 'Checking...' : 'Refresh Status' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
const { checkBackendHealth } = useHealthcheck()

const backendHealth = ref({
  status: 'checking',
  services: {},
  responseTime: 0,
  uptime: 0
})

const loading = ref(false)
const frontendUrl = ref('')
const buildTime = ref(new Date().toISOString())

const overallStatus = computed(() => {
  if (backendHealth.value.status === 'healthy') return 'healthy'
  if (backendHealth.value.status === 'degraded') return 'degraded'
  return 'unhealthy'
})

const formatUptime = (seconds) => {
  const hours = Math.floor(seconds / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)
  return `${hours}h ${minutes}m`
}

const refreshStatus = async () => {
  loading.value = true
  try {
    backendHealth.value = await checkBackendHealth()
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  if (process.client) {
    frontendUrl.value = window.location.origin
  }
  refreshStatus()
  
  // Auto-refresh a cada 30 segundos
  setInterval(refreshStatus, 30000)
})
</script>