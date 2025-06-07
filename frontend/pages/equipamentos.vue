<!-- filepath: d:\PROJETO\frontend\pages\equipamentos.vue -->
<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
    <!-- Header Moderno -->
    <div class="sticky top-0 z-40 bg-white/90 backdrop-blur-lg border-b border-gray-200 shadow-sm">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center py-6">
          <div class="flex items-center space-x-4">
            <div class="w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"></path>
              </svg>
            </div>
            <div>
              <h1 class="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                Gestão de Equipamentos
              </h1>
              <p class="text-sm text-gray-500 mt-1">Administre todos os equipamentos do sistema</p>
            </div>
          </div>
          
          <router-link 
            to="/equipamento2" 
            class="group inline-flex items-center px-6 py-3 text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
            </svg>
            Novo Equipamento
          </router-link>
        </div>
      </div>
    </div>

    <!-- Container Principal -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Lista de Equipamentos -->
      <div class="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/20 overflow-hidden">
        <div class="bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-6">
          <h2 class="text-2xl font-bold text-white flex items-center">
            <svg class="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
            </svg>
            Lista de Equipamentos
          </h2>
          <p class="text-blue-100 mt-1">{{ equipamentos.length }} equipamentos cadastrados</p>
        </div>
        
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50/80">
              <tr>
                <th class="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Equipamento</th>
                <th class="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Categoria</th>
                <th class="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tag</th>
                <th class="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fabricante</th>
                <th class="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Localização</th>
                <th class="px-6 py-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
              </tr>
            </thead>
            <tbody class="bg-white/60 divide-y divide-gray-200">
              <tr v-for="equipamento in equipamentos" :key="equipamento.id" class="hover:bg-blue-50/50 transition-all duration-300 group">
                <td class="px-6 py-6 whitespace-nowrap">
                  <div class="flex items-center">
                    <div class="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg mr-4">
                      <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"></path>
                      </svg>
                    </div>
                    <div>
                      <div class="text-lg font-bold text-gray-900">{{ equipamento.nome }}</div>
                      <div class="text-sm text-gray-500">{{ equipamento.modelo || 'Modelo não informado' }}</div>
                    </div>
                  </div>
                </td>
                <td class="px-6 py-6 whitespace-nowrap">
                  <span class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                    {{ getCategoriaName(equipamento.categoriaId) }}
                  </span>
                </td>
                <td class="px-6 py-6 whitespace-nowrap">
                  <div class="text-sm font-mono text-gray-900 bg-gray-100 px-3 py-1 rounded-lg">
                    {{ equipamento.tag || 'N/A' }}
                  </div>
                </td>
                <td class="px-6 py-6 whitespace-nowrap">
                  <div class="text-sm text-gray-900">{{ equipamento.fabricante || 'N/A' }}</div>
                </td>
                <td class="px-6 py-6 whitespace-nowrap">
                  <div class="text-sm text-gray-900">{{ equipamento.localizacao || 'N/A' }}</div>
                </td>
                <td class="px-6 py-6 whitespace-nowrap text-center">
                  <div class="flex items-center justify-center space-x-3">
                    <!-- Botão Ver Detalhes -->
                    <button 
                      @click="abrirDetalhes(equipamento)"
                      class="group relative inline-flex items-center justify-center w-11 h-11 text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-2xl transition-all duration-200 hover:scale-110 hover:shadow-lg"
                      title="Ver Detalhes"
                    >
                      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                      </svg>
                    </button>
                    
                    <!-- Botão Editar -->
                    <button 
                      @click="editarEquipamento(equipamento.id)"
                      class="group relative inline-flex items-center justify-center w-11 h-11 text-green-600 bg-green-50 hover:bg-green-100 rounded-2xl transition-all duration-200 hover:scale-110 hover:shadow-lg"
                      title="Editar"
                    >
                      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                      </svg>
                    </button>
                    
                    <!-- Botão Excluir -->
                    <button 
                      @click="confirmarExclusao(equipamento)"
                      class="group relative inline-flex items-center justify-center w-11 h-11 text-red-600 bg-red-50 hover:bg-red-100 rounded-2xl transition-all duration-200 hover:scale-110 hover:shadow-lg"
                      title="Excluir"
                    >
                      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
          
          <!-- Estado vazio -->
          <div v-if="equipamentos.length === 0" class="text-center py-12">
            <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 009.586 13H7"></path>
            </svg>
            <h3 class="mt-2 text-sm font-medium text-gray-900">Nenhum equipamento cadastrado</h3>
            <p class="mt-1 text-sm text-gray-500">Comece criando um novo equipamento.</p>
            <div class="mt-6">
              <router-link 
                to="/equipamento2" 
                class="inline-flex items-center px-6 py-3 border border-transparent shadow-sm text-sm font-medium rounded-2xl text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
              >
                <svg class="-ml-1 mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                </svg>
                Novo Equipamento
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal de Confirmação de Exclusão -->
    <div v-if="modalVisible" class="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-50 p-4">
      <div class="bg-white rounded-3xl shadow-2xl w-full max-w-md border border-gray-200/50 overflow-hidden">
        <!-- Header do Modal -->
        <div class="bg-gradient-to-r from-red-500 to-red-600 px-8 py-6">
          <h2 class="text-2xl font-bold text-white flex items-center">
            <svg class="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
            </svg>
            Confirmar Exclusão
          </h2>
          <p class="text-red-100 mt-1">Esta ação não pode ser desfeita</p>
        </div>
        
        <!-- Conteúdo do Modal -->
        <div class="p-8">
          <p class="text-gray-700 text-lg mb-6">
            Tem certeza que deseja excluir o equipamento 
            <span class="font-bold text-gray-900">"{{ equipamentoParaExcluir?.nome }}"</span>?
          </p>
          
          <div class="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
            <div class="flex">
              <div class="flex-shrink-0">
                <svg class="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
                </svg>
              </div>
              <div class="ml-3">
                <p class="text-sm text-yellow-700">
                  <strong>Atenção:</strong> Todos os dados relacionados a este equipamento serão perdidos permanentemente.
                </p>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Footer do Modal -->
        <div class="flex justify-end space-x-3 px-8 py-6 bg-gray-50 border-t border-gray-200">
          <button 
            @click="fecharModal" 
            class="px-6 py-3 bg-gray-200 text-gray-700 text-sm font-semibold rounded-xl hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-all duration-200"
          >
            Cancelar
          </button>
          <button 
            @click="excluirEquipamento" 
            class="px-6 py-3 bg-gradient-to-r from-red-600 to-red-700 text-white text-sm font-semibold rounded-xl hover:from-red-700 hover:to-red-800 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            <svg class="w-4 h-4 mr-2 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
            </svg>
            Excluir Equipamento
          </button>
        </div>
      </div>
    </div>

    <!-- Modal de Detalhes do Equipamento -->
    <div v-if="modalDetalhesVisible" class="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-50 p-4">
      <div class="bg-white rounded-3xl shadow-2xl w-full max-w-7xl max-h-[95vh] overflow-hidden border border-gray-200/50">
        <!-- Header do Modal -->
        <div class="flex justify-between items-center p-8 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 border-b border-gray-200/60">
          <div class="flex items-center space-x-4">
            <div class="w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"></path>
              </svg>
            </div>
            <div>
              <h2 class="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                {{ equipamentoDetalhes.nome }}
              </h2>
              <p class="text-sm text-gray-500 mt-1">Informações detalhadas do equipamento</p>
            </div>
          </div>
          <button @click="fecharModalDetalhes" class="group p-3 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-2xl transition-all duration-200">
            <svg class="w-6 h-6 group-hover:rotate-90 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
        
        <!-- Tabs de Navegação -->
        <div class="border-b border-gray-200 bg-gray-50/80">
          <nav class="flex space-x-8 px-8" aria-label="Tabs">
            <button 
              @click="currentTab = 'info'"
              :class="currentTab === 'info' 
                ? 'border-blue-500 text-blue-600 bg-blue-50' 
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'"
              class="py-4 px-6 border-b-2 font-medium text-sm rounded-t-lg transition-all duration-200"
            >
              <svg class="w-5 h-5 mr-2 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              Informações
            </button>
            <button 
              @click="currentTab = 'docs'"
              :class="currentTab === 'docs' 
                ? 'border-blue-500 text-blue-600 bg-blue-50' 
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'"
              class="py-4 px-6 border-b-2 font-medium text-sm rounded-t-lg transition-all duration-200"
            >
              <svg class="w-5 h-5 mr-2 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
              </svg>
              Documentos ({{ equipamentoDocumentos.length }})
            </button>
            <button 
              @click="currentTab = 'manutencoes'"
              :class="currentTab === 'manutencoes' 
                ? 'border-blue-500 text-blue-600 bg-blue-50' 
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'"
              class="py-4 px-6 border-b-2 font-medium text-sm rounded-t-lg transition-all duration-200"
            >
              <svg class="w-5 h-5 mr-2 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
              </svg>
              Manutenções ({{ equipamentoManutencoes.length }})
            </button>
          </nav>
        </div>
        
        <!-- Conteúdo das Abas -->
        <div class="p-8 overflow-y-auto max-h-[calc(95vh-240px)]">
          <!-- Aba Informações -->
          <div v-if="currentTab === 'info'" class="space-y-6">
            <!-- Grid de Informações Principais -->
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <!-- Coluna 1 -->
              <div class="space-y-6">
                <div class="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-200/50">
                  <h3 class="text-lg font-semibold text-blue-900 mb-4 flex items-center">
                    <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    Informações Básicas
                  </h3>
                  <div class="space-y-4">
                    <div>
                      <span class="text-sm font-medium text-gray-500">Nome:</span>
                      <p class="text-lg font-semibold text-gray-900">{{ equipamentoDetalhes.nome }}</p>
                    </div>
                    <div>
                      <span class="text-sm font-medium text-gray-500">Categoria:</span>
                      <p class="text-lg text-gray-900">{{ getCategoriaName(equipamentoDetalhes.categoriaId) }}</p>
                    </div>
                    <div>
                      <span class="text-sm font-medium text-gray-500">Tag:</span>
                      <p class="text-lg font-mono text-gray-900 bg-gray-100 px-3 py-1 rounded-lg inline-block">
                        {{ equipamentoDetalhes.tag || 'N/A' }}
                      </p>
                    </div>
                  </div>
                </div>
                
                <div class="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-200/50">
                  <h3 class="text-lg font-semibold text-green-900 mb-4 flex items-center">
                    <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
                    </svg>
                    Dados Técnicos
                  </h3>
                  <div class="space-y-4">
                    <div>
                      <span class="text-sm font-medium text-gray-500">Fabricante:</span>
                      <p class="text-lg text-gray-900">{{ equipamentoDetalhes.fabricante || 'N/A' }}</p>
                    </div>
                    <div>
                      <span class="text-sm font-medium text-gray-500">Modelo:</span>
                      <p class="text-lg text-gray-900">{{ equipamentoDetalhes.modelo || 'N/A' }}</p>
                    </div>
                    <div>
                      <span class="text-sm font-medium text-gray-500">Número de Série:</span>
                      <p class="text-lg font-mono text-gray-900">{{ equipamentoDetalhes.numeroSerie || 'N/A' }}</p>
                    </div>
                    <div>
                      <span class="text-sm font-medium text-gray-500">Data de Aquisição:</span>
                      <p class="text-lg text-gray-900">{{ formatarData(equipamentoDetalhes.dataAquisicao) }}</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <!-- Coluna 2 -->
              <div class="space-y-6">
                <div class="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 border border-purple-200/50">
                  <h3 class="text-lg font-semibold text-purple-900 mb-4 flex items-center">
                    <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                    </svg>
                    Localização
                  </h3>
                  <div class="space-y-4">
                    <div>
                      <span class="text-sm font-medium text-gray-500">Localização:</span>
                      <p class="text-lg text-gray-900">{{ equipamentoDetalhes.localizacao || 'N/A' }}</p>
                    </div>
                    <div>
                      <span class="text-sm font-medium text-gray-500">Área:</span>
                      <p class="text-lg text-gray-900">{{ equipamentoDetalhes.area || 'N/A' }}</p>
                    </div>
                    <div>
                      <span class="text-sm font-medium text-gray-500">Unidade:</span>
                      <p class="text-lg text-gray-900">{{ equipamentoDetalhes.unidade || 'N/A' }}</p>
                    </div>
                    <div>
                      <span class="text-sm font-medium text-gray-500">Disciplina:</span>
                      <p class="text-lg text-gray-900">{{ equipamentoDetalhes.disciplina || 'N/A' }}</p>
                    </div>
                  </div>
                </div>
                
                <div class="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-6 border border-amber-200/50">
                  <h3 class="text-lg font-semibold text-amber-900 mb-4 flex items-center">
                    <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                    </svg>
                    Detalhes Adicionais
                  </h3>
                  <div>
                    <p class="text-gray-700 leading-relaxed">
                      {{ equipamentoDetalhes.detalhes || 'Nenhum detalhe adicional informado.' }}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Aba Documentos -->
          <div v-if="currentTab === 'docs'" class="space-y-6">
            <div class="flex justify-between items-center">
              <h3 class="text-2xl font-bold text-gray-900">Documentos do Equipamento</h3>
              <button 
                @click="abrirModalDocumento(equipamentoDetalhes.id)"
                class="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-green-600 to-emerald-600 rounded-xl hover:from-green-700 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
                </svg>
                Adicionar Documento
              </button>
            </div>
            
            <div v-if="equipamentoDocumentos.length === 0" class="text-center py-12 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-300">
              <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
              </svg>
              <h3 class="mt-2 text-sm font-medium text-gray-900">Nenhum documento</h3>
              <p class="mt-1 text-sm text-gray-500">Comece adicionando um documento para este equipamento.</p>
            </div>
            
            <div v-else class="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/20 overflow-hidden">
              <table class="min-w-full divide-y divide-gray-200">
                <thead class="bg-gray-50/80">
                  <tr>
                    <th class="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Documento</th>
                    <th class="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tipo</th>
                    <th class="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Data</th>
                    <th class="px-6 py-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
                  </tr>
                </thead>
                <tbody class="bg-white/60 divide-y divide-gray-200">
                  <tr v-for="doc in equipamentoDocumentos" :key="doc.id" class="hover:bg-blue-50/50 transition-all duration-300 group">
                    <td class="px-6 py-6 whitespace-nowrap">
                      <div class="flex items-center">
                        <div class="w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center mr-4">
                          <svg class="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                          </svg>
                        </div>
                        <div>
                          <div class="text-sm font-bold text-gray-900">{{ doc.titulo || doc.nome }}</div>
                          <div class="text-sm text-gray-500">{{ doc.descricao || 'Sem descrição' }}</div>
                        </div>
                      </div>
                    </td>
                    <td class="px-6 py-6 whitespace-nowrap">
                      <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                        {{ doc.tipo || 'Manual' }}
                      </span>
                    </td>
                    <td class="px-6 py-6 whitespace-nowrap text-sm text-gray-500">
                      {{ formatarData(doc.createdAt) }}
                    </td>
                    <td class="px-6 py-6 whitespace-nowrap text-center">
                      <div class="flex items-center justify-center space-x-3">
                        <!-- Botão Visualizar - CORRIGIDO -->
                        <button 
                          @click="visualizarDocumento(doc)"
                          class="group relative inline-flex items-center justify-center w-11 h-11 text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-2xl transition-all duration-200 hover:scale-110 hover:shadow-lg"
                          title="Visualizar Documento"
                        >
                          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                          </svg>
                        </button>
                        
                        <!-- Botão Download - CORRIGIDO -->
                        <button 
                          @click="downloadDocumento(doc)"
                          class="group relative inline-flex items-center justify-center w-11 h-11 text-green-600 bg-green-50 hover:bg-green-100 rounded-2xl transition-all duration-200 hover:scale-110 hover:shadow-lg"
                          title="Download"
                        >
                          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                          </svg>
                        </button>
                        
                        <!-- Botão Excluir -->
                        <button 
                          @click="excluirDocumento(doc)"
                          class="group relative inline-flex items-center justify-center w-11 h-11 text-red-600 bg-red-50 hover:bg-red-100 rounded-2xl transition-all duration-200 hover:scale-110 hover:shadow-lg"
                          title="Excluir"
                        >
                          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <!-- Aba Manutenções -->
          <div v-if="currentTab === 'manutencoes'" class="space-y-6">
            <div class="flex justify-between items-center">
              <h3 class="text-2xl font-bold text-gray-900">Histórico de Manutenções</h3>
              <span class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                {{ equipamentoManutencoes.length }} registros
              </span>
            </div>
            
            <div v-if="equipamentoManutencoes.length === 0" class="text-center py-12 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-300">
              <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
              </svg>
              <h3 class="mt-2 text-sm font-medium text-gray-900">Nenhuma manutenção registrada</h3>
              <p class="mt-1 text-sm text-gray-500">O histórico de manutenções aparecerá aqui quando houver registros.</p>
            </div>
            
            <div v-else class="space-y-4">
              <div v-for="manutencao in equipamentoManutencoes" :key="manutencao.id" 
                   class="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200">
                <div class="flex justify-between items-start mb-4">
                  <div class="flex-1">
                    <h4 class="text-lg font-semibold text-gray-900 mb-2">{{ manutencao.titulo }}</h4>
                    <p class="text-gray-600 mb-3">{{ manutencao.descricao }}</p>
                    <div class="flex flex-wrap gap-4 text-sm text-gray-500">
                      <span>📋 {{ manutencao.codigo }}</span>
                      <span>📅 {{ formatarData(manutencao.dataHora) }}</span>
                      <span>🔧 {{ manutencao.tipo }}</span>
                      <span>👤 {{ manutencao.responsavel || 'Não atribuído' }}</span>
                    </div>
                  </div>
                  <div class="flex flex-col items-end space-y-2 ml-6">
                    <span class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium" 
                          :class="getStatusClass(manutencao.status)">
                      {{ manutencao.status?.charAt(0).toUpperCase() + manutencao.status?.slice(1) }}
                    </span>
                    <span class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium" 
                          :class="getCriticidadeClass(manutencao.criticidade)">
                      {{ manutencao.criticidade?.charAt(0).toUpperCase() + manutencao.criticidade?.slice(1) }}
                    </span>
                  </div>
                </div>
                
                <div v-if="manutencao.observacoes" class="bg-amber-50 border-l-4 border-amber-400 p-4 rounded-lg">
                  <p class="text-amber-800 text-sm">
                    <strong>Observações:</strong> {{ manutencao.observacoes }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal Adicionar Documento -->
    <div v-if="mostrarModalDocumento" class="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-50 p-4">
      <div class="bg-white rounded-3xl shadow-2xl w-full max-w-2xl border border-gray-200/50 overflow-hidden">
        <!-- Header do Modal -->
        <div class="bg-gradient-to-r from-green-600 to-emerald-600 px-8 py-6">
          <h2 class="text-2xl font-bold text-white flex items-center">
            <svg class="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
            </svg>
            Adicionar Documento
          </h2>
          <p class="text-green-100 mt-1">Anexe um novo documento ao equipamento</p>
        </div>
        
        <!-- Conteúdo do Modal -->
        <form @submit.prevent="adicionarDocumento" class="p-8 space-y-6">
          <!-- Título -->
          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-2">Título *</label>
            <input 
              v-model="novoDocumento.titulo"
              type="text"
              class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all"
              placeholder="Digite o título do documento"
              required
            />
          </div>
          
          <!-- Tipo -->
          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-2">Tipo</label>
            <select 
              v-model="novoDocumento.tipo"
              class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all"
            >
              <option value="manual">Manual</option>
              <option value="especificacao">Especificação</option>
              <option value="desenho">Desenho</option>
              <option value="procedimento">Procedimento</option>
              <option value="relatorio">Relatório</option>
              <option value="outro">Outro</option>
            </select>
          </div>
          
          <!-- Descrição -->
          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-2">Descrição</label>
            <textarea 
              v-model="novoDocumento.descricao"
              rows="3"
              class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all resize-none"
              placeholder="Descrição opcional do documento"
            ></textarea>
          </div>
          
          <!-- Upload de Arquivo -->
          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-2">Arquivo PDF</label>
            <div class="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-green-400 transition-colors">
              <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
              </svg>
              <div class="mt-4">
                <label class="cursor-pointer">
                  <span class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-green-600 hover:bg-green-700 transition-colors">
                    Selecionar arquivo PDF
                  </span>
                  <input 
                    type="file" 
                    class="hidden" 
                    accept=".pdf"
                    @change="handleFileUpload"
                  />
                </label>
                <p class="mt-2 text-sm text-gray-500">Máximo 10MB</p>
                <p v-if="novoDocumento.arquivo" class="mt-2 text-sm font-medium text-green-600">
                  📄 {{ novoDocumento.arquivo.name }}
                </p>
              </div>
            </div>
          </div>
        </form>
        
        <!-- Footer do Modal -->
        <div class="flex justify-end space-x-3 px-8 py-6 bg-gray-50 border-t border-gray-200">
          <button 
            @click="fecharModalDocumento" 
            type="button"
            class="px-6 py-3 bg-gray-200 text-gray-700 text-sm font-semibold rounded-xl hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-all duration-200"
          >
            Cancelar
          </button>
          <button 
            @click="adicionarDocumento"
            type="submit"
            class="px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white text-sm font-semibold rounded-xl hover:from-green-700 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            <svg class="w-4 h-4 mr-2 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
            </svg>
            Adicionar Documento
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import api from '~/utils/api';

const router = useRouter();

// ⭐ TODAS AS VARIÁVEIS REATIVAS
const equipamentos = ref([]);
const categorias = ref([]);
const modalVisible = ref(false);
const equipamentoParaExcluir = ref(null);
const modalDetalhesVisible = ref(false);
const equipamentoDetalhes = ref({});
const currentTab = ref('info');
const expandedManutencoesIds = ref([]);
const equipamentoDocumentos = ref([]);
const equipamentoManutencoes = ref([]);
const manutencoesConcluidas = ref([]);
const draggingId = ref(null);

// ⭐ VARIÁVEIS PARA DOCUMENTOS
const mostrarModalDocumento = ref(false);
const equipamentoIdDocumento = ref(null);
const novoDocumento = ref({
  titulo: '',
  tipo: 'manual',
  descricao: '',
  arquivo: null
});

// Carregar dados ao montar o componente
onMounted(async () => {
  await Promise.all([
    carregarEquipamentos(),
    carregarCategorias()
  ]);
});

// ⭐ FUNÇÃO PARA OBTER NOME DA CATEGORIA - ADICIONADA
const getCategoriaName = (categoriaId) => {
  if (!categoriaId || !categorias.value || categorias.value.length === 0) {
    return 'Sem categoria';
  }
  
  const categoria = categorias.value.find(cat => cat.id === categoriaId);
  return categoria ? categoria.nome : 'Categoria não encontrada';
};

// Função para carregar equipamentos
const carregarEquipamentos = async () => {
  try {
    console.log('🔄 Carregando equipamentos...');
    const response = await api.get('/equipamentos');
    console.log('📋 Equipamentos recebidos:', response);
    
    // ⭐ VERIFICAR E TRATAR A RESPOSTA
    if (response && response.data) {
      equipamentos.value = Array.isArray(response.data) ? response.data : [];
    } else if (Array.isArray(response)) {
      equipamentos.value = response;
    } else {
      console.warn('⚠️ Resposta inesperada da API:', response);
      equipamentos.value = [];
    }
    
    console.log('✅ Equipamentos carregados:', equipamentos.value.length);
  } catch (error) {
    console.error('❌ Erro ao carregar equipamentos:', error);
    equipamentos.value = []; // ⭐ GARANTIR QUE SEJA ARRAY
  }
};

// Função para carregar categorias
const carregarCategorias = async () => {
  try {
    console.log('🔄 Carregando categorias...');
    const response = await api.get('/categorias');
    console.log('📂 Categorias recebidas:', response);
    
    // ⭐ VERIFICAR E TRATAR A RESPOSTA
    if (response && response.data) {
      categorias.value = Array.isArray(response.data) ? response.data : [];
    } else if (Array.isArray(response)) {
      categorias.value = response;
    } else {
      console.warn('⚠️ Resposta inesperada da API de categorias:', response);
      categorias.value = [];
    }
    
    console.log('✅ Categorias carregadas:', categorias.value.length);
  } catch (error) {
    console.error('❌ Erro ao carregar categorias:', error);
    categorias.value = []; // ⭐ GARANTIR QUE SEJA ARRAY
  }
};

// Função para abrir o modal de detalhes
const abrirDetalhes = async (equipamento) => {
  equipamentoDetalhes.value = equipamento;
  currentTab.value = 'info';
  modalDetalhesVisible.value = true;
  
  // ⭐ CARREGAR DADOS RELACIONADOS
  await Promise.all([
    carregarDocumentos(),
    carregarManutencoes()
  ]);
};

// ⭐ FUNÇÃO PARA CARREGAR MANUTENÇÕES DO EQUIPAMENTO - ADICIONADA
const carregarManutencoes = async () => {
  try {
    console.log('🔄 Carregando manutenções do equipamento:', equipamentoDetalhes.value.id);
    const response = await api.get(`/equipamentos/${equipamentoDetalhes.value.id}/manutencoes`);
    
    if (response && response.data) {
      equipamentoManutencoes.value = Array.isArray(response.data) ? response.data : [];
    } else if (Array.isArray(response)) {
      equipamentoManutencoes.value = response;
    } else {
      equipamentoManutencoes.value = [];
    }
    
    console.log('✅ Manutenções carregadas:', equipamentoManutencoes.value.length);
  } catch (error) {
    console.error('❌ Erro ao carregar manutenções:', error);
    equipamentoManutencoes.value = [];
  }
};

// Função para fechar o modal de detalhes
const fecharModalDetalhes = () => {
  modalDetalhesVisible.value = false;
  equipamentoDetalhes.value = {};
  equipamentoDocumentos.value = [];
  equipamentoManutencoes.value = [];
};

// Função para abrir o modal de confirmação de exclusão
const confirmarExclusao = (equipamento) => {
  equipamentoParaExcluir.value = equipamento;
  modalVisible.value = true;
};

// Função para fechar o modal de confirmação de exclusão
const fecharModal = () => {
  modalVisible.value = false;
  equipamentoParaExcluir.value = null;
};

// Função para excluir equipamento
const excluirEquipamento = async () => {
  try {
    console.log('🗑️ Excluindo equipamento:', equipamentoParaExcluir.value.id);
    await api.delete(`/equipamentos/${equipamentoParaExcluir.value.id}`);
    
    // Remover da lista local
    equipamentos.value = equipamentos.value.filter(e => e.id !== equipamentoParaExcluir.value.id);
    
    fecharModal();
    console.log('✅ Equipamento excluído com sucesso');
  } catch (error) {
    console.error('❌ Erro ao excluir equipamento:', error);
    alert('Erro ao excluir equipamento. Tente novamente.');
  }
};

// Função para editar equipamento
const editarEquipamento = (id) => {
  router.push(`/equipamento2?id=${id}`);
};

// ⭐ FUNÇÕES PARA DOCUMENTOS - ADICIONADAS
const adicionarDocumento = async () => {
  try {
    if (!novoDocumento.value.titulo.trim()) {
      alert('Título é obrigatório!');
      return;
    }

    const formData = new FormData();
    formData.append('titulo', novoDocumento.value.titulo);
    formData.append('tipo', novoDocumento.value.tipo);
    formData.append('descricao', novoDocumento.value.descricao || '');
    
    if (novoDocumento.value.arquivo) {
      formData.append('arquivo', novoDocumento.value.arquivo);
    }
    
    console.log('📤 Adicionando documento para equipamento:', equipamentoDetalhes.value.id);
    await api.post(`/equipamentos/${equipamentoDetalhes.value.id}/documentos`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    
    // Atualizar lista de documentos
    await carregarDocumentos();
    
    // Fechar modal
    fecharModalDocumento();
    
    console.log('✅ Documento adicionado com sucesso');
  } catch (error) {
    console.error('❌ Erro ao adicionar documento:', error);
    alert('Erro ao adicionar documento. Tente novamente.');
  }
};

// Função para carregar documentos do equipamento
const carregarDocumentos = async () => {
  try {
    if (!equipamentoDetalhes.value.id) return;
    
    console.log('🔄 Carregando documentos do equipamento:', equipamentoDetalhes.value.id);
    const response = await api.get(`/equipamentos/${equipamentoDetalhes.value.id}/documentos`);
    
    if (response && response.data) {
      equipamentoDocumentos.value = Array.isArray(response.data) ? response.data : [];
    } else if (Array.isArray(response)) {
      equipamentoDocumentos.value = response;
    } else {
      equipamentoDocumentos.value = [];
    }
    
    console.log('✅ Documentos carregados:', equipamentoDocumentos.value.length);
  } catch (error) {
    console.error('❌ Erro ao carregar documentos:', error);
    equipamentoDocumentos.value = [];
  }
};

// ⭐ FUNÇÕES PARA DOCUMENTOS - VISUALIZAR E DOWNLOAD
const visualizarDocumento = (documento) => {
  try {
    if (documento.url) {
      window.open(documento.url, '_blank');
    } else if (documento.arquivo) {
      // Construir URL baseada no nome do arquivo
      const baseUrl = 'http://localhost:3001';
      const url = `${baseUrl}/uploads/documentos/${documento.arquivo}`;
      window.open(url, '_blank');
    } else {
      alert('Arquivo não disponível para visualização.');
    }
  } catch (error) {
    console.error('❌ Erro ao visualizar documento:', error);
    alert('Erro ao abrir documento.');
  }
};

const downloadDocumento = (documento) => {
  try {
    if (documento.url) {
      // Criar link temporário para download
      const link = document.createElement('a');
      link.href = documento.url;
      link.download = documento.titulo || documento.nome || 'documento.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else if (documento.arquivo) {
      // Construir URL baseada no nome do arquivo
      const baseUrl = 'http://localhost:3001';
      const url = `${baseUrl}/uploads/documentos/${documento.arquivo}`;
      const link = document.createElement('a');
      link.href = url;
      link.download = documento.titulo || documento.nome || 'documento.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      alert('Arquivo não disponível para download.');
    }
  } catch (error) {
    console.error('❌ Erro ao fazer download:', error);
    alert('Erro ao baixar documento.');
  }
};

const excluirDocumento = async (documento) => {
  if (!confirm(`Tem certeza que deseja excluir o documento "${documento.titulo}"?`)) {
    return;
  }

  try {
    console.log('🗑️ Excluindo documento:', documento.id);
    await api.delete(`/documentos/${documento.id}`);
    
    // Atualizar lista de documentos
    await carregarDocumentos();
    
    console.log('✅ Documento excluído com sucesso');
  } catch (error) {
    console.error('❌ Erro ao excluir documento:', error);
    alert('Erro ao excluir documento. Tente novamente.');
  }
};

// Função para abrir modal de documento
const abrirModalDocumento = (equipamentoId) => {
  equipamentoIdDocumento.value = equipamentoId;
  mostrarModalDocumento.value = true;
};

// Função para fechar modal de documento
const fecharModalDocumento = () => {
  mostrarModalDocumento.value = false;
  equipamentoIdDocumento.value = null;
  novoDocumento.value = {
    titulo: '',
    tipo: 'manual',
    descricao: '',
    arquivo: null
  };
};

// Função para fazer upload do arquivo
const handleFileUpload = (event) => {
  const file = event.target.files[0];
  if (file) {
    if (file.type === 'application/pdf') {
      if (file.size <= 10 * 1024 * 1024) // 10MB
        novoDocumento.value.arquivo = file;
      else {
        alert('Arquivo muito grande. Máximo 10MB.');
        event.target.value = '';
      }
    } else {
      alert('Apenas arquivos PDF são permitidos.');
      event.target.value = '';
    }
  }
};

// Formatação de data
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

// Obter classe CSS para o status da manutenção
const getStatusClass = (status) => {
  if (!status) return 'bg-gray-500 text-white';
  
  switch (status.toLowerCase()) {
    case 'recebida':
      return 'bg-blue-500 text-white';
    case 'analise':
      return 'bg-amber-500 text-white';
    case 'execucao':
      return 'bg-indigo-600 text-white';
    case 'concluida':
      return 'bg-green-600 text-white';
    case 'cancelada':
      return 'bg-red-600 text-white';
    default:
      return 'bg-gray-500 text-white';
  }
};

// Obter classe CSS para criticidade da manutenção
const getCriticidadeClass = (criticidade) => {
  if (!criticidade) return 'bg-gray-500 text-white';
  
  switch (criticidade.toLowerCase()) {
    case 'baixa':
      return 'bg-green-500 text-white';
    case 'media':
      return 'bg-yellow-500 text-white';
    case 'alta':
      return 'bg-red-600 text-white';
    default:
      return 'bg-gray-500 text-white';
  }
};
</script>

<style scoped>
/* Estilos para animações */
@keyframes animate-in {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-in {
  animation: animate-in 0.3s ease-out;
}

/* Transições suaves para inputs */
input:focus, select:focus, textarea:focus {
  transform: translateY(-1px);
}

/* Efeito glass nos cards */
.backdrop-blur-sm {
  backdrop-filter: blur(12px);
}

/* Line clamp para textos longos - CORRIGIDO */
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2; /* Propriedade padrão para compatibilidade */
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>