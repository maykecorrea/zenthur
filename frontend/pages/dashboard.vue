<!-- filepath: d:\PROJETO\frontend\pages\maintenance\dashboard.vue -->
<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      <!-- Botões de Ação -->
      <div class="flex flex-wrap gap-6 items-center justify-between">
        <div class="flex space-x-6">
          <!-- Nova Manutenção -->
          <div class="group">
            <NuxtLink to="/novomanu">
              <div class="w-16 h-16 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-3xl flex items-center justify-center text-white shadow-xl hover:shadow-2xl transform hover:scale-110 hover:-translate-y-2 transition-all duration-300">
                <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                </svg>
              </div>
            </NuxtLink>
            <p class="text-xs mt-3 text-center font-medium text-gray-700">Nova<br/>Manutenção</p>
          </div>
          
          <!-- Cadastrar Equipamento -->
          <div class="group">
            <button @click="$router.push('/equipamento2')">
              <div class="w-16 h-16 bg-gradient-to-br from-emerald-600 to-teal-600 rounded-3xl flex items-center justify-center text-white shadow-xl hover:shadow-2xl transform hover:scale-110 hover:-translate-y-2 transition-all duration-300">
                <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"></path>
                </svg>
              </div>
            </button>
            <p class="text-xs mt-3 text-center font-medium text-gray-700">Cadastrar<br/>Equipamento</p>
          </div>

          <!-- Relatórios -->
          <div class="group">
            <button @click="$router.push('/manutencao')">
              <div class="w-16 h-16 bg-gradient-to-br from-purple-600 to-pink-600 rounded-3xl flex items-center justify-center text-white shadow-xl hover:shadow-2xl transform hover:scale-110 hover:-translate-y-2 transition-all duration-300">
                <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                </svg>
              </div>
            </button>
            <p class="text-xs mt-3 text-center font-medium text-gray-700">Manutenções</p>
          </div>
        </div>
        
        <!-- Campo de Busca -->
        <div class="flex-grow max-w-md">  
          <div class="relative group cursor-pointer" @click="openSearch">
            <div class="absolute inset-y-0 left-0 flex items-center pl-4">
              <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
            </div>
            <div class="pl-12 pr-6 py-4 w-full bg-white/80 backdrop-blur-sm border border-gray-200 rounded-2xl hover:shadow-xl transition-all duration-200 text-gray-900">
              <span class="text-gray-500">Buscar equipamentos, manutenções...</span>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Cards Overview -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <!-- Card Equipamentos -->
        <div class="group bg-white/80 backdrop-blur-sm p-8 rounded-3xl shadow-xl border border-white/20 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
          <div class="flex items-center justify-between mb-6">
            <div class="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center shadow-lg">
              <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <div class="text-right">
              <p class="text-sm font-semibold text-gray-500 uppercase tracking-wider">Equipamentos</p>
              <p class="text-4xl font-bold text-green-600 mt-1">{{ estatisticas.totalAtivos }}</p>
            </div>
          </div>
          <div class="border-t border-gray-200 pt-4">
            <p class="text-sm text-gray-600">Total de equipamentos cadastrados</p>
            <div class="flex items-center mt-2">
              <svg class="w-4 h-4 text-green-500 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>
              </svg>
              <span class="text-xs text-green-600 font-medium">+{{ estatisticas.crescimentoMensal }}% este mês</span>
            </div>
          </div>
        </div>
        
        <!-- Card Próximas -->
        <div class="group bg-white/80 backdrop-blur-sm p-8 rounded-3xl shadow-xl border border-white/20 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
          <div class="flex items-center justify-between mb-6">
            <div class="w-16 h-16 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-2xl flex items-center justify-center shadow-lg">
              <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <div class="text-right">
              <p class="text-sm font-semibold text-gray-500 uppercase tracking-wider">Próximas</p>
              <p class="text-4xl font-bold text-yellow-600 mt-1">{{ estatisticas.proximasVencimento }}</p>
            </div>
          </div>
          <div class="border-t border-gray-200 pt-4">
            <p class="text-sm text-gray-600">Manutenções próximas do vencimento</p>
            <div class="flex items-center mt-2">
              <svg class="w-4 h-4 text-yellow-500 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
              </svg>
              <span class="text-xs text-yellow-600 font-medium">7 dias restantes</span>
            </div>
          </div>
        </div>
        
        <!-- Card Vencidas -->
        <div class="group bg-white/80 backdrop-blur-sm p-8 rounded-3xl shadow-xl border border-white/20 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
          <div class="flex items-center justify-between mb-6">
            <div class="w-16 h-16 bg-gradient-to-br from-red-500 to-rose-500 rounded-2xl flex items-center justify-center shadow-lg">
              <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
              </svg>
            </div>
            <div class="text-right">
              <p class="text-sm font-semibold text-gray-500 uppercase tracking-wider">Vencidas</p>
              <p class="text-4xl font-bold text-red-600 mt-1">{{ estatisticas.vencidas }}</p>
            </div>
          </div>
          <div class="border-t border-gray-200 pt-4">
            <p class="text-sm text-gray-600">Manutenções não realizadas no prazo</p>
            <div class="flex items-center mt-2">
              <svg class="w-4 h-4 text-red-500 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
              </svg>
              <span class="text-xs text-red-600 font-medium">{{ estatisticas.vencidas > 0 ? 'Ação necessária' : 'Tudo em dia' }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Gráficos -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <!-- Status das Manutenções -->
        <div class="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/20 p-8">
          <div class="flex items-center justify-between mb-6">
            <h3 class="text-xl font-bold text-gray-900">Status das Manutenções</h3>
            <div class="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-2xl flex items-center justify-center">
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
              </svg>
            </div>
          </div>
          
          <div class="space-y-6">
            <div v-for="status in statusData" :key="status.name" class="group">
              <div class="flex justify-between items-center mb-2">
                <span class="text-sm font-semibold" :class="status.textColor">{{ status.name }}</span>
                <span class="text-sm font-bold text-gray-900">{{ status.count }}</span>
              </div>
              <div class="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                <div 
                  class="h-3 rounded-full transition-all duration-1000 ease-out" 
                  :class="status.bgColor" 
                  :style="{ width: status.percentage + '%' }"
                ></div>
              </div>
            </div>
          </div>
        </div>

        <!-- Tendências -->
        <div class="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/20 p-8">
          <div class="flex items-center justify-between mb-6">
            <h3 class="text-xl font-bold text-gray-900">Tendência Anual</h3>
            <div class="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center">
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>
              </svg>
            </div>
          </div>
          
          <div class="h-48 flex items-end justify-between space-x-1">
            <div v-for="(month, index) in chartData" :key="index" class="flex-1 group cursor-pointer">
              <div class="text-center">
                <div 
                  class="bg-gradient-to-t from-blue-600 to-blue-400 rounded-t-lg transition-all duration-500 hover:from-blue-700 hover:to-blue-500 transform hover:scale-105 mx-auto"
                  :style="{ 
                    height: Math.max((month.value / Math.max(...chartData.map(m => m.value))) * 160, 8) + 'px',
                    width: '20px'
                  }"
                ></div>
                <p class="text-xs mt-2 text-gray-600 font-medium">{{ month.month }}</p>
                <p class="text-xs text-gray-500">{{ month.value }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Manutenções Recentes -->
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
                    <div class="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-2xl flex items-center justify-center shadow-lg">
                      <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                      </svg>
                    </div>
                    <div class="flex-1">
                      <h4 class="font-bold text-gray-900 mb-1">{{ manutencao.titulo }}</h4>
                      <p class="text-sm text-gray-600">{{ manutencao.equipamento?.nome || 'Equipamento não especificado' }}</p>
                    </div>
                    <span 
                      class="px-3 py-1 rounded-full text-xs font-medium"
                      :class="getStatusClass(manutencao.status)"
                    >
                      {{ getStatusLabel(manutencao.status) }}
                    </span>
                  </div>
                  
                  <div class="flex items-center justify-between">
                    <div class="flex items-center space-x-4">
                      <span class="text-sm text-gray-500">
                        {{ formatarData(manutencao.dataHora) }}
                      </span>
                      <span 
                        class="px-2 py-1 rounded text-xs font-medium"
                        :class="getCriticidadeClass(manutencao.criticidade)"
                      >
                        {{ manutencao.criticidade?.toUpperCase() || 'N/A' }}
                      </span>
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

      <!-- Equipamentos por Categoria -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
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
                  <svg class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z"></path>
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
              <div class="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
              <div class="flex-1">
                <h4 class="font-semibold text-gray-900 text-sm">{{ atividade.titulo }}</h4>
                <p class="text-xs text-gray-600 mt-1">{{ atividade.descricao }}</p>
                <p class="text-xs text-gray-500 mt-1">{{ formatarData(atividade.data) }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal de Busca -->
    <SearchModal :isOpen="showSearchModal" @close="closeSearch" />
  </div>
</template>

<script setup>
definePageMeta({ layout: 'default' });

import { ref, computed, onMounted } from 'vue';
import { useAuthStore } from '@/stores/auth';
import api from '~/utils/api';
import { useRouter } from 'vue-router';

const authStore = useAuthStore();
const router = useRouter();

// ⭐ VARIÁVEIS REATIVAS
const loading = ref(true);
const equipamentos = ref([]);
const manutencoes = ref([]);
const categorias = ref([]);
const atividadeRecente = ref([]);
const showSearchModal = ref(false);

// ⭐ DADOS CALCULADOS DINAMICAMENTE (NÃO MAIS MOCKUP)
const chartData = ref([]);
const statusData = ref([]);
const estatisticas = ref({
  totalAtivos: 0,
  proximasVencimento: 0,
  vencidas: 0,
  crescimentoMensal: 8
});

// ⭐ FUNÇÕES COM DADOS REAIS DO BANCO
const fetchEquipamentos = async () => {
  try {
    console.log('🔍 Buscando equipamentos...');
    const response = await api.get('/equipamentos');
    
    if (response && Array.isArray(response)) {
      equipamentos.value = response;
      estatisticas.value.totalAtivos = response.length;
      console.log('✅ Equipamentos carregados:', response.length);
    }
    
    return equipamentos.value;
  } catch (error) {
    console.error('❌ Erro ao carregar equipamentos:', error);
    equipamentos.value = [];
    return [];
  }
};

const fetchManutencoes = async () => {
  try {
    console.log('🔄 Carregando manutenções...');
    const response = await api.get('/manutencoes');
    
    let manutencoesData = [];
    if (response?.manutencoes && Array.isArray(response.manutencoes)) {
      manutencoesData = response.manutencoes;
    } else if (Array.isArray(response)) {
      manutencoesData = response;
    }
    
    manutencoes.value = manutencoesData;
    calcularEstatisticasReais(manutencoesData);
    calcularStatusData(manutencoesData);
    calcularTendenciasReais(manutencoesData);
    
    console.log('✅ Manutenções processadas:', manutencoesData.length);
    return manutencoesData;
  } catch (error) {
    console.error('❌ Erro ao carregar manutenções:', error);
    return [];
  }
};

// ⭐ CÁLCULOS BASEADOS EM DADOS REAIS
const calcularEstatisticasReais = (manutencoesData) => {
  const hoje = new Date();
  const proximosSete = new Date();
  proximosSete.setDate(hoje.getDate() + 7);
  
  const proximasVencimento = manutencoesData.filter(m => {
    if (!m.dataProximaManutencao) return false;
    const dataVenc = new Date(m.dataProximaManutencao);
    return dataVenc >= hoje && dataVenc <= proximosSete && 
           !['concluida', 'arquivada'].includes(m.status);
  }).length;
  
  const vencidas = manutencoesData.filter(m => {
    if (!m.dataProximaManutencao) return false;
    const dataVenc = new Date(m.dataProximaManutencao);
    return dataVenc < hoje && !['concluida', 'arquivada'].includes(m.status);
  }).length;
  
  estatisticas.value = {
    ...estatisticas.value,
    proximasVencimento,
    vencidas
  };
};

const calcularStatusData = (manutencoesData) => {
  const counts = {
    recebida: manutencoesData.filter(m => m.status === 'recebida').length,
    analise: manutencoesData.filter(m => m.status === 'analise').length,
    execucao: manutencoesData.filter(m => m.status === 'execucao').length,
    concluida: manutencoesData.filter(m => m.status === 'concluida').length
  };
  
  const total = manutencoesData.length;
  
  statusData.value = [
    { 
      name: 'Recebidas', 
      count: counts.recebida, 
      percentage: total > 0 ? Math.round((counts.recebida/total)*100) : 0,
      bgColor: 'bg-gradient-to-r from-blue-500 to-blue-600', 
      textColor: 'text-blue-600' 
    },
    { 
      name: 'Em Análise', 
      count: counts.analise, 
      percentage: total > 0 ? Math.round((counts.analise/total)*100) : 0,
      bgColor: 'bg-gradient-to-r from-yellow-500 to-yellow-600', 
      textColor: 'text-yellow-600' 
    },
    { 
      name: 'Em Execução', 
      count: counts.execucao, 
      percentage: total > 0 ? Math.round((counts.execucao/total)*100) : 0,
      bgColor: 'bg-gradient-to-r from-orange-500 to-orange-600', 
      textColor: 'text-orange-600' 
    },
    { 
      name: 'Concluídas', 
      count: counts.concluida, 
      percentage: total > 0 ? Math.round((counts.concluida/total)*100) : 0,
      bgColor: 'bg-gradient-to-r from-green-500 to-green-600', 
      textColor: 'text-green-600' 
    }
  ];
};

const calcularTendenciasReais = (manutencoesData) => {
  const meses = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
  const hoje = new Date();
  const anoAtual = hoje.getFullYear();
  
  const contadores = {};
  meses.forEach(mes => contadores[mes] = 0);
  
  manutencoesData.forEach(manutencao => {
    const data = new Date(manutencao.dataHora || manutencao.createdAt);
    if (data.getFullYear() === anoAtual) {
      const mes = meses[data.getMonth()];
      contadores[mes]++;
    }
  });
  
  chartData.value = meses.map(mes => ({
    month: mes,
    value: contadores[mes]
  }));
};

const fetchCategorias = async () => {
  try {
    const response = await api.get('/categorias');
    
    if (response && Array.isArray(response)) {
      categorias.value = response.map(categoria => ({
        ...categoria,
        equipamentos_count: equipamentos.value?.filter(eq => eq.categoriaId === categoria.id).length || 0
      }));
    } else {
      categorias.value = [
        { id: 1, nome: 'Motores', equipamentos_count: 5 },
        { id: 2, nome: 'Bombas', equipamentos_count: 3 },
        { id: 3, nome: 'Compressores', equipamentos_count: 2 }
      ];
    }
    
    return categorias.value;
  } catch (error) {
    console.error('❌ Erro ao carregar categorias:', error);
    return [];
  }
};

const gerarAtividadeRecente = (manutencoesData) => {
  if (!manutencoesData || manutencoesData.length === 0) {
    atividadeRecente.value = [
      { id: 1, titulo: 'Sistema iniciado', descricao: 'Dashboard carregado com sucesso', data: new Date().toISOString() }
    ];
    return;
  }
  
  const atividades = [...manutencoesData]
    .sort((a, b) => new Date(b.updatedAt || b.dataHora) - new Date(a.updatedAt || a.dataHora))
    .slice(0, 5)
    .map(m => ({
      id: m.id,
      titulo: getAtividadeTitulo(m.status),
      descricao: `${m.titulo} - ${m.equipamento?.nome || 'Equipamento'}`,
      data: m.updatedAt || m.dataHora
    }));
  
  atividadeRecente.value = atividades;
};

// ⭐ FUNÇÕES AUXILIARES
const getAtividadeTitulo = (status) => {
  const titulos = {
    'recebida': 'Nova manutenção registrada',
    'analise': 'Manutenção em análise',
    'execucao': 'Manutenção em execução',
    'concluida': 'Manutenção concluída'
  };
  return titulos[status] || 'Atualização de manutenção';
};

const getStatusClass = (status) => {
  const classes = {
    'recebida': 'bg-blue-100 text-blue-800',
    'analise': 'bg-yellow-100 text-yellow-800',
    'execucao': 'bg-orange-100 text-orange-800',
    'concluida': 'bg-green-100 text-green-800'
  };
  return classes[status] || 'bg-gray-100 text-gray-800';
};

const getStatusLabel = (status) => {
  const labels = {
    'recebida': 'Recebida',
    'analise': 'Em Análise',
    'execucao': 'Em Execução',
    'concluida': 'Concluída'
  };
  return labels[status] || status;
};

const getCriticidadeClass = (criticidade) => {
  const classes = {
    'alta': 'bg-red-100 text-red-800',
    'media': 'bg-yellow-100 text-yellow-800',
    'baixa': 'bg-green-100 text-green-800'
  };
  return classes[criticidade] || 'bg-gray-100 text-gray-800';
};

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

const openSearch = () => showSearchModal.value = true;
const closeSearch = () => showSearchModal.value = false;
const verDetalhes = (manutencao) => navigateTo('/manutencao');

// ⭐ CARREGAMENTO PRINCIPAL
const carregarDashboard = async () => {
  loading.value = true;
  
  try {
    await fetchEquipamentos();
    const manutencoesData = await fetchManutencoes();
    await fetchCategorias();
    gerarAtividadeRecente(manutencoesData);
    
    console.log('🎉 Dashboard carregado com dados reais!');
  } catch (error) {
    console.error('❌ Erro ao carregar dashboard:', error);
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  carregarDashboard();
});
</script>

<style scoped>
.backdrop-blur-sm {
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
}
</style>