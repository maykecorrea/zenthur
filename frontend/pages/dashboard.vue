<!-- filepath: d:\PROJETO\frontend\pages\maintenance\dashboard.vue -->
<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
    <!-- Header Moderno com Glassmorphism -->
    <div class="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-gray-200/50 shadow-lg">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center py-6">
          <div class="flex items-center space-x-4">
            <div class="w-14 h-14 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-3xl flex items-center justify-center shadow-xl transform hover:scale-105 transition-all duration-300">
              <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
              </svg>
            </div>
            <div>
              <h1 class="text-3xl font-bold bg-gradient-to-r from-gray-900 via-blue-900 to-indigo-900 bg-clip-text text-transparent">
                Dashboard de Manutenção
              </h1>
              <p class="text-sm text-gray-500 mt-1">Sistema de Gestão Industrial</p>
            </div>
          </div>
          
          <!-- Notificações e Perfil -->
          <div class="flex items-center space-x-4">
            <button class="relative p-3 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-2xl transition-all duration-200">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-5-5V4a1 1 0 00-1-1H6a1 1 0 00-1 1v8l-5 5h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path>
              </svg>
              <span class="absolute top-1 right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></span>
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <!-- Botões de Ação Modernizados -->
      <div class="flex flex-wrap gap-6 items-center justify-between">
        <div class="flex space-x-6">
          <!-- Botão Nova Manutenção -->
          <div class="group">
            <NuxtLink to="/novomanu">
              <div class="w-16 h-16 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-3xl flex items-center justify-center text-white shadow-xl hover:shadow-2xl transform hover:scale-110 hover:-translate-y-2 transition-all duration-300 group-hover:rotate-3">
                <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                </svg>
              </div>
            </NuxtLink>
            <p class="text-xs mt-3 text-center font-medium text-gray-700 group-hover:text-blue-600 transition-colors">
              Nova<br/>Manutenção
            </p>
          </div>
          
          <!-- Botão Cadastrar Equipamento -->
          <div class="group">
            <button @click="$router.push('/equipamento2')">
              <div class="w-16 h-16 bg-gradient-to-br from-emerald-600 to-teal-600 rounded-3xl flex items-center justify-center text-white shadow-xl hover:shadow-2xl transform hover:scale-110 hover:-translate-y-2 transition-all duration-300 group-hover:rotate-3">
                <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"></path>
                </svg>
              </div>
            </button>
            <p class="text-xs mt-3 text-center font-medium text-gray-700 group-hover:text-emerald-600 transition-colors">
              Cadastrar<br/>Equipamento
            </p>
          </div>

          <!-- Botão Relatórios -->
          <div class="group">
            <button>
              <div class="w-16 h-16 bg-gradient-to-br from-purple-600 to-pink-600 rounded-3xl flex items-center justify-center text-white shadow-xl hover:shadow-2xl transform hover:scale-110 hover:-translate-y-2 transition-all duration-300 group-hover:rotate-3">
                <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                </svg>
              </div>
            </button>
            <p class="text-xs mt-3 text-center font-medium text-gray-700 group-hover:text-purple-600 transition-colors">
              Relatórios
            </p>
          </div>
        </div>
        
        <!-- Campo de Busca Modernizado -->
        <div class="flex-grow max-w-md">  
          <div class="relative group cursor-pointer" @click="openSearch">
            <div class="absolute inset-y-0 left-0 flex items-center pl-4">
              <svg class="h-5 w-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
            </div>
            <div class="pl-12 pr-6 py-4 w-full bg-white/80 backdrop-blur-sm border border-gray-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 shadow-lg hover:shadow-xl text-gray-900 placeholder-gray-500">
              <span class="text-gray-500">Buscar equipamentos, manutenções...</span>
              <kbd class="absolute right-4 top-1/2 transform -translate-y-1/2 px-2 py-1 bg-gray-100 border border-gray-200 rounded text-xs text-gray-500">
                ⌘K
              </kbd>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Cards Overview Modernizados -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <!-- Card Ativos -->
        <div class="group bg-white/80 backdrop-blur-sm p-8 rounded-3xl shadow-xl border border-white/20 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
          <div class="flex items-center justify-between mb-6">
            <div class="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
              <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <div class="text-right">
              <p class="text-sm font-semibold text-gray-500 uppercase tracking-wider">Equipamentos</p>
              <p class="text-4xl font-bold text-green-600 mt-1">{{ estatisticas.totalAtivos || 0 }}</p>
            </div>
          </div>
          <div class="border-t border-gray-200 pt-4">
            <p class="text-sm text-gray-600">Total de equipamentos cadastrados</p>
            <div class="flex items-center mt-2">
              <svg class="w-4 h-4 text-green-500 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>
              </svg>
              <span class="text-xs text-green-600 font-medium">+{{ estatisticas.crescimentoMensal || 0 }}% este mês</span>
            </div>
          </div>
        </div>
        
        <!-- Card Manutenções Próximas -->
        <div class="group bg-white/80 backdrop-blur-sm p-8 rounded-3xl shadow-xl border border-white/20 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
          <div class="flex items-center justify-between mb-6">
            <div class="w-16 h-16 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
              <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <div class="text-right">
              <p class="text-sm font-semibold text-gray-500 uppercase tracking-wider">Próximas</p>
              <p class="text-4xl font-bold text-yellow-600 mt-1">{{ estatisticas.proximasVencimento || 0 }}</p>
            </div>
          </div>
          <div class="border-t border-gray-200 pt-4">
            <p class="text-sm text-gray-600">Manutenções próximas do vencimento</p>
            <div class="flex items-center mt-2">
              <svg class="w-4 h-4 text-yellow-500 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              <span class="text-xs text-yellow-600 font-medium">7 dias restantes</span>
            </div>
          </div>
        </div>
        
        <!-- Card Manutenções Vencidas -->
        <div class="group bg-white/80 backdrop-blur-sm p-8 rounded-3xl shadow-xl border border-white/20 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
          <div class="flex items-center justify-between mb-6">
            <div class="w-16 h-16 bg-gradient-to-br from-red-500 to-rose-500 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
              <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <div class="text-right">
              <p class="text-sm font-semibold text-gray-500 uppercase tracking-wider">Vencidas</p>
              <p class="text-4xl font-bold text-red-600 mt-1">{{ estatisticas.vencidas || 0 }}</p>
            </div>
          </div>
          <div class="border-t border-gray-200 pt-4">
            <p class="text-sm text-gray-600">Manutenções não realizadas no prazo</p>
            <div class="flex items-center mt-2">
              <svg class="w-4 h-4 text-red-500 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6"></path>
              </svg>
              <span class="text-xs text-red-600 font-medium">Ação necessária</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Gráficos e Estatísticas Avançadas -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <!-- Gráfico de Manutenções por Status -->
        <div class="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/20 p-8">
          <div class="flex items-center justify-between mb-6">
            <h3 class="text-xl font-bold text-gray-900">Status das Manutenções</h3>
            <div class="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-2xl flex items-center justify-center">
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
              </svg>
            </div>
          </div>
          
          <!-- Barras de Progresso Modernas -->
          <div class="space-y-6">
            <div v-for="status in statusData" :key="status.name" class="group">
              <div class="flex justify-between items-center mb-2">
                <span class="text-sm font-semibold" :class="status.textColor">{{ status.name }}</span>
                <span class="text-sm font-bold text-gray-900">{{ status.count }}</span>
              </div>
              <div class="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                <div 
                  class="h-3 rounded-full transition-all duration-1000 ease-out transform group-hover:scale-105" 
                  :class="status.bgColor" 
                  :style="{ width: status.percentage + '%' }"
                ></div>
              </div>
            </div>
          </div>
        </div>

        <!-- Gráfico de Tendências -->
        <div class="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/20 p-8">
          <div class="flex items-center justify-between mb-6">
            <h3 class="text-xl font-bold text-gray-900">Tendência de Manutenções</h3>
            <div class="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center">
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>
              </svg>
            </div>
          </div>
          
          <!-- Gráfico Simplificado -->
          <div class="h-48 flex items-end justify-between space-x-2">
            <div v-for="(month, index) in chartData" :key="index" class="flex-1 group cursor-pointer">
              <div class="text-center">
                <div 
                  class="bg-gradient-to-t from-blue-600 to-blue-400 rounded-t-lg transition-all duration-500 hover:from-blue-700 hover:to-blue-500 transform hover:scale-105"
                  :style="{ height: (month.value / Math.max(...chartData.map(m => m.value))) * 160 + 'px' }"
                ></div>
                <p class="text-xs mt-2 text-gray-600 font-medium">{{ month.month }}</p>
                <p class="text-xs text-gray-500">{{ month.value }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Lista de Manutenções Recentes -->
      <div class="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/20 overflow-hidden">
        <div class="bg-gradient-to-r from-gray-900 to-blue-900 px-8 py-6">
          <div class="flex items-center justify-between">
            <h2 class="text-2xl font-bold text-white flex items-center">
              <svg class="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"></path>
              </svg>
              Manutenções Recentes
            </h2>
            <NuxtLink to="/manutencao" class="inline-flex items-center px-4 py-2 bg-white/20 text-white rounded-xl hover:bg-white/30 transition-all duration-200">
              <span class="text-sm font-medium mr-2">Ver Todas</span>
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
              </svg>
            </NuxtLink>
          </div>
        </div>
        
        <div class="p-8">
          <div v-if="loading" class="text-center py-12">
            <div class="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            <p class="mt-4 text-gray-600">Carregando manutenções...</p>
          </div>
          
          <div v-else-if="manutencoes.length === 0" class="text-center py-16">
            <div class="w-20 h-20 bg-gradient-to-br from-gray-100 to-gray-200 rounded-3xl flex items-center justify-center mx-auto mb-6">
              <svg class="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
              </svg>
            </div>
            <h3 class="text-xl font-bold text-gray-900 mb-3">Nenhuma manutenção encontrada</h3>
            <p class="text-gray-500 mb-8">Comece criando sua primeira solicitação de manutenção</p>
            <NuxtLink to="/novomanu" class="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
              <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
              </svg>
              Nova Manutenção
            </NuxtLink>
          </div>
          
          <div v-else class="space-y-4">
            <div 
              v-for="manutencao in manutencoes.slice(0, 5)" 
              :key="manutencao.id"
              class="group bg-gradient-to-r from-gray-50 to-blue-50 rounded-2xl p-6 border border-gray-200/50 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer"
              @click="verDetalhes(manutencao)"
            >
              <div class="flex items-center justify-between">
                <div class="flex-1">
                  <div class="flex items-center space-x-4 mb-3">
                    <div class="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
                      </svg>
                    </div>
                    <div class="flex-1">
                      <h4 class="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                        {{ manutencao.titulo }}
                      </h4>
                      <p class="text-sm text-gray-600">{{ manutencao.equipamento?.nome || 'Equipamento não informado' }}</p>
                    </div>
                  </div>
                  
                  <div class="flex items-center justify-between">
                    <div class="flex items-center space-x-4">
                      <span class="inline-flex items-center px-3 py-1 rounded-xl text-xs font-bold" :class="getStatusClass(manutencao.status)">
                        <svg class="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
                        </svg>
                        {{ getStatusLabel(manutencao.status) }}
                      </span>
                      
                      <span class="inline-flex items-center px-3 py-1 rounded-lg text-xs font-bold" :class="getCriticidadeClass(manutencao.criticidade)">
                        <svg class="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                          <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd"></path>
                        </svg>
                        {{ manutencao.criticidade?.toUpperCase() }}
                      </span>
                    </div>
                    
                    <div class="text-right">
                      <p class="text-xs text-gray-500">{{ formatarData(manutencao.dataHora) }}</p>
                      <p class="text-xs text-gray-400">{{ manutencao.solicitante }}</p>
                    </div>
                  </div>
                </div>
                
                <div class="ml-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Widget de Equipamentos -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <!-- Equipamentos por Categoria -->
        <div class="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/20 p-8">
          <div class="flex items-center justify-between mb-6">
            <h3 class="text-xl font-bold text-gray-900">Equipamentos por Categoria</h3>
            <NuxtLink to="/equipamentos" class="text-blue-600 hover:text-blue-700 text-sm font-medium">
              Ver Todos →
            </NuxtLink>
          </div>
          
          <div class="space-y-4">
            <div v-for="categoria in categorias" :key="categoria.id" class="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-blue-50 rounded-2xl border border-gray-200/50 hover:shadow-md transition-all duration-300">
              <div class="flex items-center space-x-3">
                <div class="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                  <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"></path>
                  </svg>
                </div>
                <span class="font-semibold text-gray-900">{{ categoria.nome }}</span>
              </div>
              <span class="text-sm font-bold text-purple-600 bg-purple-100 px-3 py-1 rounded-lg">
                {{ categoria.equipamentos_count || 0 }}
              </span>
            </div>
          </div>
        </div>

        <!-- Atividade Recente -->
        <div class="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/20 p-8">
          <div class="flex items-center justify-between mb-6">
            <h3 class="text-xl font-bold text-gray-900">Atividade Recente</h3>
            <div class="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl flex items-center justify-center">
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
          </div>
          
          <div class="space-y-4">
            <div v-for="atividade in atividadeRecente" :key="atividade.id" class="flex items-start space-x-3 p-4 bg-gradient-to-r from-gray-50 to-orange-50 rounded-2xl border border-gray-200/50">
              <div class="w-8 h-8 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg flex items-center justify-center flex-shrink-0">
                <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                </svg>
              </div>
              <div class="flex-1 min-w-0">
                <p class="text-sm font-semibold text-gray-900">{{ atividade.titulo }}</p>
                <p class="text-xs text-gray-600 mt-1">{{ atividade.descricao }}</p>
                <p class="text-xs text-gray-400 mt-1">{{ formatarData(atividade.data) }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- ⭐ ADICIONAR O MODAL DE BUSCA -->
    <SearchModal :isOpen="showSearchModal" @close="closeSearch" @open="openSearch" />
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'default'
});

import { ref, computed, onMounted, onBeforeUnmount } from 'vue';
import { useAuthStore } from '@/stores/auth';
import api from '~/utils/api';
import { useRouter } from 'vue-router';

const authStore = useAuthStore();
const API_URL = 'http://localhost:3001';
const router = useRouter(); // Adicione o router se não estiver presente

// Inicialize todas as variáveis reativas antes de qualquer método
const loading = ref(true);
const manutencoes = ref([]);
const categorias = ref([]);
const atividadeRecente = ref([]);
const showSearchModal = ref(false);
const estatisticas = ref({
  totalAtivos: 0,
  proximasVencimento: 0,
  vencidas: 0,
  crescimentoMensal: 0
});
const statusData = ref([
  { name: 'Recebidas', count: 0, percentage: 0, bgColor: 'bg-gradient-to-r from-blue-500 to-blue-600', textColor: 'text-blue-600' },
  { name: 'Em Análise', count: 0, percentage: 0, bgColor: 'bg-gradient-to-r from-yellow-500 to-yellow-600', textColor: 'text-yellow-600' },
  { name: 'Em Execução', count: 0, percentage: 0, bgColor: 'bg-gradient-to-r from-orange-500 to-orange-600', textColor: 'text-orange-600' },
  { name: 'Concluídas', count: 0, percentage: 0, bgColor: 'bg-gradient-to-r from-green-500 to-green-600', textColor: 'text-green-600' }
]);
const chartData = ref([
  { month: 'Jan', value: 12 },
  { month: 'Fev', value: 19 },
  { month: 'Mar', value: 15 },
  { month: 'Abr', value: 25 },
  { month: 'Mai', value: 22 },
  { month: 'Jun', value: 30 }
]);

// Funções para o modal de busca
const openSearch = () => {
  showSearchModal.value = true;
};

const closeSearch = () => {
  showSearchModal.value = false;
};

// Adicionar formatador de data
const formatarData = (data) => {
  if (!data) return 'N/A';
  try {
    return new Date(data).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  } catch (error) {
    return 'Data inválida';
  }
};

// Função para atualizar os dados do gráfico de status
const atualizarStatusData = () => {
  if (!manutencoes.value || !manutencoes.value.length) return;
  
  const recebidas = manutencoes.value.filter(m => m.status === 'recebida').length;
  const analise = manutencoes.value.filter(m => m.status === 'analise').length;
  const execucao = manutencoes.value.filter(m => m.status === 'execucao').length;
  const concluidas = manutencoes.value.filter(m => m.status === 'concluida').length;
  
  const total = manutencoes.value.length;
  
  statusData.value = [
    { name: 'Recebidas', count: recebidas, percentage: Math.round((recebidas/total)*100) || 0, bgColor: 'bg-gradient-to-r from-blue-500 to-blue-600', textColor: 'text-blue-600' },
    { name: 'Em Análise', count: analise, percentage: Math.round((analise/total)*100) || 0, bgColor: 'bg-gradient-to-r from-yellow-500 to-yellow-600', textColor: 'text-yellow-600' },
    { name: 'Em Execução', count: execucao, percentage: Math.round((execucao/total)*100) || 0, bgColor: 'bg-gradient-to-r from-orange-500 to-orange-600', textColor: 'text-orange-600' },
    { name: 'Concluídas', count: concluidas, percentage: Math.round((concluidas/total)*100) || 0, bgColor: 'bg-gradient-to-r from-green-500 to-green-600', textColor: 'text-green-600' },
  ];
};

// Implementar função para integrar com o novo backend NestJS
const fetchDashboardEstatisticas = async () => {
  try {
    console.log('🔄 Carregando estatísticas do dashboard via NestJS API...');
    
    const token = authStore.token || localStorage.getItem('auth_token');
    if (!token) {
      throw new Error('Token não encontrado');
    }

    const response = await api.get('/dashboard/estatisticas');
    console.log('📊 Dados do dashboard recebidos:', response);
    
    if (response) {
      // Atualizar estatísticas
      estatisticas.value = {
        totalAtivos: response.totalAtivos || 0,
        proximasVencimento: response.proximasVencimento || 0,
        vencidas: response.vencidas || 0,
        crescimentoMensal: response.crescimentoMensal || 0
      };
      
      // Atualizar dados de status se disponíveis
      if (response.statusData && Array.isArray(response.statusData)) {
        statusData.value = response.statusData;
      }
    }
    
    return response;
  } catch (error) {
    console.error('❌ Erro ao buscar estatísticas do dashboard:', error);
    usarEstatisticasLocais(); // Fallback para dados locais
    throw error;
  }
};

// Função para buscar tendências
const fetchTendencias = async () => {
  try {
    console.log('📈 Buscando tendências...');
    
    // Usar a API de manutenções que já está funcionando em vez da API específica de tendências
    const response = await api.get('/manutencoes');
    console.log('📋 Dados para tendências recebidos das manutenções:', response);
    
    let manutencoesDados = [];
    if (response && Array.isArray(response)) {
      manutencoesDados = response;
    } else if (response && response.data && Array.isArray(response.data.manutencoes)) {
      manutencoesDados = response.data.manutencoes;
    } else if (response && response.manutencoes && Array.isArray(response.manutencoes)) {
      manutencoesDados = response.manutencoes;
    }
    
    if (manutencoesDados.length > 0) {
      // Agrupar manutenções por mês
      const mesesAbrev = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
      const mesesContagem = {};
      
      manutencoesDados.forEach(manutencao => {
        const data = manutencao.dataHora || manutencao.createdAt || manutencao.data;
        if (data) {
          const dataObj = new Date(data);
          const mes = dataObj.getMonth(); // 0-11
          const mesAbrev = mesesAbrev[mes];
          
          if (!mesesContagem[mesAbrev]) {
            mesesContagem[mesAbrev] = 0;
          }
          mesesContagem[mesAbrev]++;
        }
      });
      
      // Converter para o formato esperado pelo gráfico
      const tendencias = mesesAbrev.slice(0, 6).map(mes => ({
        month: mes,
        value: mesesContagem[mes] || 0
      }));
      
      console.log('📊 Tendências geradas a partir dos dados:', tendencias);
      chartData.value = tendencias;
    }
    
    return chartData.value;
  } catch (error) {
    console.error('❌ Erro ao buscar tendências:', error);
    // Manter dados simulados como fallback
    console.log('⚠️ Usando dados simulados para tendências');
    return chartData.value;
  }
};

// Função corrigida para buscar atividade recente
const fetchAtividadeRecente = async () => {
  try {
    console.log('🕒 Gerando atividade recente a partir de manutenções...');
    
    // Verificar se já temos manutenções carregadas
    let manutencoesData = manutencoes.value;
    
    // Se não tiver, buscar manutenções
    if (!manutencoesData || manutencoesData.length === 0) {
      try {
        const response = await api.get('/manutencoes');
        console.log('📋 Dados para atividade recente das manutenções:', response);
        
        if (response && Array.isArray(response)) {
          manutencoesData = response;
        } else if (response && response.data && Array.isArray(response.data.manutencoes)) {
          manutencoesData = response.data.manutencoes;
        } else if (response && response.manutencoes && Array.isArray(response.manutencoes)) {
          manutencoesData = response.manutencoes;
        }
      } catch (error) {
        console.warn('⚠️ Erro ao buscar manutenções para atividade recente, usando fallback');
        carregarAtividadeRecente(); // Fallback para dados simulados
        return atividadeRecente.value;
      }
    }
    
    if (manutencoesData && manutencoesData.length > 0) {
      // Converter manutenções em atividades recentes
      const atividades = manutencoesData.slice(0, 5).map((manutencao, index) => {
        let titulo = '';
        let descricao = '';
        
        // Gerar título e descrição com base no status da manutenção
        switch(manutencao.status) {
          case 'recebida':
            titulo = 'Nova manutenção registrada';
            descricao = `Solicitação para ${manutencao.equipamento?.nome || 'equipamento'} foi recebida`;
            break;
          case 'analise':
            titulo = 'Manutenção em análise';
            descricao = `Análise iniciada para ${manutencao.equipamento?.nome || 'equipamento'}`;
            break;
          case 'execucao':
            titulo = 'Manutenção em execução';
            descricao = `Trabalho iniciado em ${manutencao.equipamento?.nome || 'equipamento'}`;
            break;
          case 'concluida':
            titulo = 'Manutenção concluída';
            descricao = `Serviço finalizado para ${manutencao.equipamento?.nome || 'equipamento'}`;
            break;
          default:
            titulo = 'Atualização de manutenção';
            descricao = `Status alterado para ${getStatusLabel(manutencao.status)}`;
        }
        
        return {
          id: manutencao.id || index + 1,
          titulo: titulo,
          descricao: descricao,
          data: manutencao.dataHora || manutencao.createdAt || manutencao.updatedAt || new Date().toISOString()
        };
      });
      
      console.log('🔔 Atividades recentes geradas:', atividades);
      atividadeRecente.value = atividades;
    } else {
      // Se ainda não tiver manutenções, usar dados simulados
      carregarAtividadeRecente();
    }
    
    return atividadeRecente.value;
  } catch (error) {
    console.error('❌ Erro ao gerar atividade recente:', error);
    carregarAtividadeRecente(); // Fallback para dados simulados
    return atividadeRecente.value;
  }
};

// Função para buscar equipamentos e atualizar o card
const fetchEquipamentos = async () => {
  try {
    console.log('🔍 Buscando equipamentos para o dashboard...');
    
    const response = await api.get('/equipamentos');
    console.log('📋 Resposta da API equipamentos:', response);
    
    // Tratamento para diferentes formatos de resposta
    let equipamentosData = [];
    if (response && response.data) {
      equipamentosData = Array.isArray(response.data) ? response.data : [];
    } else if (Array.isArray(response)) {
      equipamentosData = response;
    }
    
    // Atualizar o card de equipamentos com o valor real
    estatisticas.value = {
      ...estatisticas.value,
      totalAtivos: equipamentosData.length || 0
    };
    
    return equipamentosData;
  } catch (error) {
    console.error('❌ Erro ao buscar equipamentos:', error);
    return [];
  }
};

// Funções que podem estar faltando
const fetchManutencoes = async () => {
  try {
    console.log('🔄 Carregando manutenções...');
    
    const response = await api.get('/manutencoes');
    console.log('📋 Manutenções recebidas:', response);
    
    if (response && Array.isArray(response)) {
      manutencoes.value = response;
    } else if (response && response.data && Array.isArray(response.data)) {
      manutencoes.value = response.data;
    }
    
    return manutencoes.value;
  } catch (error) {
    console.error('❌ Erro ao carregar manutenções:', error);
    throw error;
  }
};

const fetchCategorias = async () => {
  try {
    console.log('🔄 Carregando categorias...');
    
    const response = await api.get('/categorias');
    console.log('📋 Categorias recebidas:', response);
    
    if (response && Array.isArray(response)) {
      categorias.value = response;
    } else if (response && response.data && Array.isArray(response.data)) {
      categorias.value = response.data;
    }
    
    return categorias.value;
  } catch (error) {
    console.error('❌ Erro ao carregar categorias:', error);
    throw error;
  }
};

const carregarAtividadeRecente = () => {
  atividadeRecente.value = [
    {
      id: 1,
      titulo: 'Nova manutenção registrada',
      descricao: 'Manutenção preventiva no Motor #123',
      data: new Date().toISOString()
    },
    {
      id: 2,
      titulo: 'Status atualizado',
      descricao: 'Manutenção #45 alterada para "Em Execução"',
      data: new Date(Date.now() - 3600000).toISOString()
    },
    {
      id: 3,
      titulo: 'Documento anexado',
      descricao: 'Manual técnico adicionado ao Equipamento #78',
      data: new Date(Date.now() - 7200000).toISOString()
    }
  ];
};

// Função de estatísticas locais de fallback
const usarEstatisticasLocais = () => {
  estatisticas.value = {
    totalAtivos: 12,
    proximasVencimento: 3,
    vencidas: 1,
    crescimentoMensal: 8
  };
};

// Método de carregamento principal com proteção contra erros
const carregarDadosDashboard = async () => {
  loading.value = true;
  
  try {
    // Proteger contra unmount durante operações assíncronas
    let componenteMontado = true;
    onBeforeUnmount(() => {
      componenteMontado = false;
    });
    
    // Buscar equipamentos primeiro
    try {
      if (!componenteMontado) return;
      const equipamentos = await fetchEquipamentos();
      console.log('✅ Equipamentos carregados no dashboard:', equipamentos?.length || 0);
    } catch (error) {
      console.warn('⚠️ Erro ao carregar equipamentos:', error);
    }
    
    // Carregar categorias
    try {
      if (!componenteMontado) return;
      await fetchCategorias();
    } catch (error) {
      console.warn('⚠️ Erro ao carregar categorias, usando dados simulados');
      categorias.value = [
        { id: 1, nome: 'Motores', equipamentos_count: 5 },
        { id: 2, nome: 'Bombas', equipamentos_count: 3 },
        { id: 3, nome: 'Compressores', equipamentos_count: 2 },
      ];
    }
    
    // Carregar manutenções
    try {
      if (!componenteMontado) return;
      await fetchManutencoes();
      atualizarStatusData();
    } catch (error) {
      console.warn('⚠️ Erro ao carregar manutenções, usando dados simulados');
    }
    
    // Não usar Promise.allSettled, que pode causar problemas se o componente for desmontado
    if (componenteMontado) {
      try {
        await fetchTendencias();
      } catch (error) {
        console.warn('⚠️ Erro ao carregar tendências');
      }
    }
    
    if (componenteMontado) {
      try {
        await fetchAtividadeRecente();
      } catch (error) {
        console.warn('⚠️ Erro ao carregar atividade recente');
        carregarAtividadeRecente();
      }
    }
  } catch (error) {
    console.error('❌ Erro ao carregar dados do dashboard:', error);
  } finally {
    // Apenas atualizar o estado se o componente ainda estiver montado
    loading.value = false;
  }
};

// Carregar dados ao montar o componente
onMounted(() => {
  carregarDadosDashboard();
});

// Helper functions para estados e criticidade
const getStatusClass = (status) => {
  const classes = {
    'recebida': 'bg-blue-100 text-blue-700',
    'analise': 'bg-yellow-100 text-yellow-700',
    'execucao': 'bg-orange-100 text-orange-700',
    'concluida': 'bg-green-100 text-green-700',
    'cancelada': 'bg-gray-100 text-gray-700'
  };
  return classes[status] || 'bg-gray-100 text-gray-700';
};

const getStatusLabel = (status) => {
  const labels = {
    'recebida': 'Recebida',
    'analise': 'Em Análise',
    'execucao': 'Em Execução',
    'concluida': 'Concluída',
    'cancelada': 'Cancelada'
  };
  return labels[status] || 'Desconhecido';
};

const getCriticidadeClass = (criticidade) => {
  const classes = {
    'baixa': 'bg-green-100 text-green-700',
    'media': 'bg-yellow-100 text-yellow-700',
    'alta': 'bg-red-100 text-red-700',
    'urgente': 'bg-purple-100 text-purple-700'
  };
  return classes[criticidade?.toLowerCase()] || 'bg-gray-100 text-gray-700';
};

const verDetalhes = (manutencao) => {
  if (manutencao && manutencao.id) {
    router.push(`/manutencao/${manutencao.id}`);
  }
};
</script>

<style scoped>
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in-up {
  animation: fadeInUp 0.6s ease-out;
}

/* Glassmorphism effect */
.backdrop-blur-sm {
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
}

/* Smooth transitions for cards */
.group:hover .transform {
  transform: translateY(-8px) scale(1.02);
}

/* Custom scrollbar */
::-webkit-scrollbar {
  width: 6px;
}

::-webkit-scrollbar-track {
  background: #f1f5f9;
  border-radius: 10px;
}

::-webkit-scrollbar-thumb {
  background: linear-gradient(to bottom, #3b82f6, #1d4ed8);
  border-radius: 10px;
}

::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(to bottom, #2563eb, #1e40af);
}
</style>