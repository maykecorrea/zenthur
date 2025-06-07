<!-- filepath: d:\PROJETO\frontend\pages\dashdoc.vue -->
<template>
  <div class="container mx-auto px-4 py-6">
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-gray-800 mb-2">Documentação</h1>
      <p class="text-gray-600">Gerencie e acesse todos os documentos técnicos do sistema</p>
    </div>

    <!-- Cards de estatísticas com melhor responsividade -->
    <div class="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 mb-6 sm:mb-8">
      <div class="bg-white rounded-lg shadow-sm p-3 sm:p-6 border-l-4 border-blue-500">
        <div class="flex justify-between items-start">
          <div>
            <p class="text-xs sm:text-sm font-medium text-gray-500">total de documentos</p>
            <p class="text-xl sm:text-2xl font-bold text-gray-800 mt-1 sm:mt-2">{{ totaldocuments }}</p>
          </div>
          <div class="bg-blue-100 p-2 sm:p-3 rounded-lg">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 sm:h-6 sm:w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-lg shadow-sm p-3 sm:p-6 border-l-4 border-green-500">
        <div class="flex justify-between items-start">
          <div>
            <p class="text-xs sm:text-sm font-medium text-gray-500">documentos atualizados este mês</p>
            <p class="text-xl sm:text-2xl font-bold text-gray-800 mt-1 sm:mt-2">{{ updatedthismonth }}</p>
          </div>
          <div class="bg-green-100 p-2 sm:p-3 rounded-lg">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 sm:h-6 sm:w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
            </svg>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-lg shadow-sm p-3 sm:p-6 border-l-4 border-purple-500">
        <div class="flex justify-between items-start">
          <div>
            <p class="text-xs sm:text-sm font-medium text-gray-500">tipos de documentos</p>
            <p class="text-xl sm:text-2xl font-bold text-gray-800 mt-1 sm:mt-2">{{ uniquetypes.length }}</p>
          </div>
          <div class="bg-purple-100 p-2 sm:p-3 rounded-lg">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 sm:h-6 sm:w-6 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-lg shadow-sm p-3 sm:p-6 border-l-4 border-amber-500">
        <div class="flex justify-between items-start">
          <div>
            <p class="text-xs sm:text-sm font-medium text-gray-500">equipamentos cadastrados</p>
            <p class="text-xl sm:text-2xl font-bold text-gray-800 mt-1 sm:mt-2">{{ uniqueequipamentos.length }}</p>
          </div>
          <div class="bg-amber-100 p-2 sm:p-3 rounded-lg">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 sm:h-6 sm:w-6 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
        </div>
      </div>
    </div>

    <!-- Filtros e busca -->
    <div class="bg-white rounded-lg shadow-sm p-4 sm:p-6 mb-6">
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        <div class="col-span-1 sm:col-span-2 md:col-span-1">
          <label for="search" class="block text-sm font-medium text-gray-700 mb-1">Buscar Documento</label>
          <div class="relative">
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg class="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input 
              type="text" 
              id="search" 
              v-model="searchquery" 
              placeholder="Buscar por título ou tipo" 
              class="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
        </div>
        <div class="col-span-1">
          <label for="tipo" class="block text-sm font-medium text-gray-700 mb-1">Tipo</label>
          <select 
            id="tipo" 
            v-model="selectedtype" 
            class="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
          >
            <option value="">Todos os tipos</option>
            <option v-for="tipo in uniquetypes" :key="tipo" :value="tipo">{{ tipo }}</option>
          </select>
        </div>
        <div class="col-span-1">
          <label for="equipamento" class="block text-sm font-medium text-gray-700 mb-1">Equipamento</label>
          <select 
            id="equipamento" 
            v-model="selectedequipamento" 
            class="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
          >
            <option value="">Todos os equipamentos</option>
            <option v-for="equip in equipamentos" :key="equip.id" :value="equip.id">{{ equip.nome }}</option>
          </select>
        </div>
      </div>
      
      <!-- Filtros aplicados -->
      <div class="flex flex-wrap gap-2 mt-4">
        <div v-if="searchquery" class="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm flex items-center">
          <span>Termo: {{ searchquery }}</span>
          <button @click="searchquery = ''" class="ml-1 focus:outline-none">
            <svg class="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"></path>
            </svg>
          </button>
        </div>
        <button 
          v-if="searchquery || selectedtype || selectedequipamento" 
          @click="clearfilters" 
          class="text-gray-600 hover:text-gray-800 text-sm ml-2"
        >
          Limpar filtros
        </button>
      </div>
    </div>

    <!-- Botão para criar novo documento -->
    <div class="mb-6 flex justify-end">
      <NuxtLink to="/doc2" class="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 flex items-center gap-2 mr-2">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
        </svg>
        Criar Novo Documento
      </NuxtLink>
      
      <!-- Botão de refresh -->
      <button @click="refreshData" class="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 flex items-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
        Atualizar Dados
      </button>
    </div>

    <!-- Tabela de documentos -->
    <div v-if="!loading" class="bg-white rounded-lg shadow-sm overflow-hidden">
      <!-- Versão para desktop -->
      <div class="hidden sm:block overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Título
              </th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Tipo
              </th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Equipamento
              </th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Versão
              </th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Tamanho
              </th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Data
              </th>
              <th scope="col" class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Ações
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr 
              v-for="doc in paginateddocuments" 
              :key="doc.id" 
              class="hover:bg-gray-50 transition-colors duration-150 cursor-pointer"
              @click="opendocmodal(doc)"
            >
              <!-- Título -->
              <td class="px-6 py-4">
                <div class="text-sm font-medium text-gray-900">{{ getdocumenttitle(doc) }}</div>
              </td>

              <!-- Tipo -->
              <td class="px-6 py-4 whitespace-nowrap">
                <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full" 
                       :class="gettypeclass(getdocumenttype(doc))">
                  {{ getdocumenttype(doc) }}
                </span>
              </td>

              <!-- Equipamento -->
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900">{{ getequipamentonome(doc.equipamentoId) }}</div>
                <div class="text-xs text-gray-500">{{ getequipamentotag(doc.equipamentoId) }}</div>
              </td>

              <!-- Versão -->
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm font-medium">
                  v{{ getdocumentversion(doc) }}
                </div>
              </td>
              
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900">{{ formatfilesize(doc.tamanho) }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900">
                  {{ formatdate(doc.createdAt || doc.updatedAt) }}
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-center">
                <div class="flex items-center justify-center space-x-3">
                  <!-- Visualizar -->
                  <a 
                    v-if="getdocumenturl(doc)" 
                    :href="getdocumenturl(doc)" 
                    target="_blank" 
                    class="text-blue-600 hover:text-blue-900" 
                    title="Visualizar"
                    @click.stop>
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  </a>
                  
                  <!-- Editar -->
                  <NuxtLink 
                    :to="`/doc2?id=${doc.id}`" 
                    class="text-amber-600 hover:text-amber-900" 
                    title="Editar"
                    @click.stop>
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </NuxtLink>
                  
                  <!-- Excluir -->
                  <button 
                    @click.stop="confirmdeletedocument(doc)" 
                    class="text-red-600 hover:text-red-900" 
                    title="Excluir">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </td>
            </tr>
            <tr v-if="filtereddocuments.length === 0">
              <td colspan="7" class="px-6 py-10 text-center text-gray-500">
                <div class="flex flex-col items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 text-gray-400 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <p class="text-lg font-medium">Nenhum documento encontrado</p>
                  <p class="text-sm">Tente ajustar os filtros ou criar um novo documento</p>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Versão para mobile - layout de cards -->
      <div class="sm:hidden">
        <div v-if="paginateddocuments.length === 0" class="px-4 py-6 text-center text-gray-500">
          <div class="flex flex-col items-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 text-gray-400 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <p class="text-lg font-medium">Nenhum documento encontrado</p>
            <p class="text-sm">Tente ajustar os filtros ou criar um novo documento</p>
          </div>
        </div>
        
        <div v-else class="divide-y divide-gray-200">
          <div 
            v-for="doc in paginateddocuments" 
            :key="doc.id" 
            class="p-4 hover:bg-gray-50 transition-colors duration-150"
            @click="opendocmodal(doc)"
          >
            <div class="flex justify-between items-start mb-2">
              <h3 class="text-sm font-semibold text-blue-600">{{ doc.titulo }}</h3>
              <span class="px-2 py-0.5 inline-flex text-xs leading-5 font-semibold rounded-full" 
                     :class="gettypeclass(doc.tipo || doc.type)">
                {{ doc.tipo || doc.type }}
              </span>
            </div>
            
            <div class="grid grid-cols-2 gap-2 text-xs text-gray-500">
              <div>
                <span class="font-medium">Equipamento:</span>
                <div>{{ getequipamentonome(doc.equipamentoId) }}</div>
              </div>
              <div>
                <span class="font-medium">Versão:</span>
                <div>v{{ doc.versao || doc.version || '1' }}</div>
              </div>
              <div>
                <span class="font-medium">Tamanho:</span>
                <div>{{ formatfilesize(doc.tamanho) }}</div>
              </div>
              <div>
                <span class="font-medium">Data:</span>
                <div>{{ formatdate(doc.createdAt || doc.updatedAt) }}</div>
              </div>
            </div>
            
            <div class="mt-3 flex justify-end space-x-2">
              <a 
                v-if="getdocumenturl(doc)" 
                :href="getdocumenturl(doc)" 
                target="_blank" 
                class="p-1.5 text-blue-600 hover:text-blue-900 bg-blue-50 rounded-full" 
                title="Visualizar"
                @click.stop>
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </a>
              
              <NuxtLink 
                :to="`/doc2?id=${doc.id}`" 
                class="p-1.5 text-amber-600 hover:text-amber-900 bg-amber-50 rounded-full" 
                title="Editar"
                @click.stop>
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </NuxtLink>
              
              <button 
                @click.stop="confirmdeletedocument(doc)" 
                class="p-1.5 text-red-600 hover:text-red-900 bg-red-50 rounded-full" 
                title="Excluir">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Paginação ajustada para melhor responsividade -->
      <div v-if="totalpages > 1" class="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
        <div class="flex-1 flex justify-between sm:hidden">
          <button
            @click="currentpage = Math.max(1, currentpage - 1)"
            :disabled="currentpage === 1"
            :class="[
              currentpage === 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-50',
              'relative inline-flex items-center px-3 py-1.5 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white'
            ]">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <span class="text-sm text-gray-700 mx-2">
            {{ currentpage }} / {{ totalpages }}
          </span>
          <button
            @click="currentpage = Math.min(totalpages, currentpage + 1)"
            :disabled="currentpage === totalpages"
            :class="[
              currentpage === totalpages ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-50',
              'relative inline-flex items-center px-3 py-1.5 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white'
            ]">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
        
        <!-- Esta parte permanece igual - para desktop -->
        <div class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
          <div>
            <p class="text-sm text-gray-700">
              mostrando
              <span class="font-medium">{{ (currentpage - 1) * itemsperpage + 1 }}</span>
              a
              <span class="font-medium">{{ Math.min(currentpage * itemsperpage, totaldocuments) }}</span>
              de
              <span class="font-medium">{{ totaldocuments }}</span>
              resultados
            </p>
          </div>
          <div>
            <nav class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
              <!-- Botão anterior -->
              <button
                @click="currentpage = Math.max(1, currentpage - 1)"
                :disabled="currentpage === 1"
                :class="[
                  currentpage === 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-50',
                  'relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500'
                ]">
                <span class="sr-only">Anterior</span>
                <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd" />
                </svg>
              </button>

              <!-- Números das páginas -->
              <template v-for="page in totalpages" :key="page">
                <button
                  v-if="page === 1 || page === totalpages || (page >= currentpage - 2 && page <= currentpage + 2)"
                  @click="currentpage = page"
                  :class="[
                    currentpage === page ? 'z-10 bg-blue-50 border-blue-500 text-blue-600' : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50',
                    'relative inline-flex items-center px-4 py-2 border text-sm font-medium'
                  ]">
                  {{ page }}
                </button>
                <span
                  v-else-if="page === currentpage - 3 || page === currentpage + 3"
                  class="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700">
                  ...
                </span>
              </template>

              <!-- Botão próximo -->
              <button
                @click="currentpage = Math.min(totalpages, currentpage + 1)"
                :disabled="currentpage === totalpages"
                :class="[
                  currentpage === totalpages ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-50',
                  'relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500'
                ]">
                <span class="sr-only">Próximo</span>
                <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
                </svg>
              </button>
            </nav>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal de confirmação de exclusão -->
    <div v-if="showdeletemodal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h3 class="text-lg font-bold text-gray-900 mb-4">Confirmar exclusão</h3>
        <p class="text-gray-700 mb-6">
          Tem certeza que deseja excluir o documento <span class="font-medium">{{ documenttodelete?.titulo }}</span>? Esta ação não pode ser desfeita.
        </p>
        <div class="flex justify-end space-x-3">
          <button 
            @click="showdeletemodal = false" 
            class="bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300"
          >
            Cancelar
          </button>
          <button 
            @click="deletedocument" 
            class="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
          >
            Excluir
          </button>
        </div>
      </div>
    </div>

    <!-- Modal de detalhes do documento -->
    <div v-if="selecteddoc && showmodal" class="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <!-- Background overlay -->
        <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" @click="closemodal"></div>

        <!-- Modal panel -->
        <div class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl w-full max-w-[95%] sm:w-full">
          <div class="bg-white px-3 sm:px-4 pt-4 sm:pt-5 pb-3 sm:pb-4">
            <div class="sm:flex sm:items-start">
              <div class="mt-2 sm:mt-0 sm:ml-4 sm:text-left w-full">
                <div class="flex justify-between items-center mb-3 sm:mb-4">
                  <h3 class="text-base sm:text-lg leading-6 font-medium text-gray-900" id="modal-title">
                    Detalhes do Documento
                  </h3>
                  <button @click="closemodal" class="text-gray-400 hover:text-gray-500">
                    <svg class="h-5 w-5 sm:h-6 sm:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                
                <!-- Grid reformatado para melhor visualização mobile -->
                <div class="mt-3 sm:mt-4 grid grid-cols-1 sm:grid-cols-2 gap-y-3 sm:gap-4">
                  <div>
                    <p class="text-sm font-medium text-gray-500">Título</p>
                    <p class="mt-1 text-sm text-gray-900">{{ selecteddoc.titulo || selecteddoc.nome || 'N/A' }}</p>
                  </div>
                  <div>
                    <p class="text-sm font-medium text-gray-500">Tipo</p>
                    <p class="mt-1 text-sm text-gray-900">{{ selecteddoc.tipo || 'N/A' }}</p>
                  </div>
                  <div>
                    <p class="text-sm font-medium text-gray-500">Versão</p>
                    <p class="mt-1 text-sm text-gray-900">v{{ selecteddoc.versao || '1' }}</p>
                  </div>
                  <div>
                    <p class="text-sm font-medium text-gray-500">Revisão</p>
                    <p class="mt-1 text-sm text-gray-900">{{ selecteddoc.revisao || 'N/A' }}</p>
                  </div>
                  <div>
                    <p class="text-sm font-medium text-gray-500">Equipamento</p>
                    <p class="mt-1 text-sm text-gray-900">{{ getequipamentonome(selecteddoc.equipamentoid) }}</p>
                  </div>
                  <div>
                    <p class="text-sm font-medium text-gray-500">Tag</p>
                    <p class="mt-1 text-sm text-gray-900">{{ getequipamentotag(selecteddoc.equipamentoid) }}</p>
                  </div>
                  <div>
                    <p class="text-sm font-medium text-gray-500">Área</p>
                    <p class="mt-1 text-sm text-gray-900">{{ getequipamentoarea(selecteddoc.equipamentoid) }}</p>
                  </div>
                  <div>
                    <p class="text-sm font-medium text-gray-500">Tamanho</p>
                    <p class="mt-1 text-sm text-gray-900">{{ formatfilesize(selecteddoc.tamanho || 0) }}</p>
                  </div>
                  <div>
                    <p class="text-sm font-medium text-gray-500">Criado em</p>
                    <p class="mt-1 text-sm text-gray-900">{{ formatdate(selecteddoc.createdat) }}</p>
                  </div>
                  <div>
                    <p class="text-sm font-medium text-gray-500">Atualizado em</p>
                    <p class="mt-1 text-sm text-gray-900">{{ formatdate(selecteddoc.updatedat) }}</p>
                  </div>
                </div>

                <!-- Descrição do documento se existir -->
                <div v-if="selecteddoc.descricao" class="mt-4">
                  <p class="text-sm font-medium text-gray-500">Descrição</p>
                  <p class="mt-1 text-sm text-gray-900 whitespace-pre-line">{{ selecteddoc.descricao }}</p>
                </div>
                
                <!-- Ações do documento - versão responsiva -->
                <div class="mt-5 sm:mt-6 flex flex-wrap gap-2 sm:gap-3">
                  <a 
                    v-if="getdocumenturl(selecteddoc)" 
                    :href="getdocumenturl(selecteddoc)" 
                    target="_blank" 
                    class="flex-grow sm:flex-grow-0 inline-flex justify-center items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700">
                    <svg class="mr-2 h-4 w-4 sm:h-5 sm:w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                    <span class="sm:inline">Visualizar PDF</span>
                  </a>
                  
                  <NuxtLink 
                    :to="`/doc2?id=${selecteddoc.id}`"
                    class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200">
                    <svg class="mr-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                    Editar Documento
                  </NuxtLink>
                  
                  <button 
                    @click="confirmdeletedocument(selecteddoc)"
                    class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-200">
                    <svg class="mr-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                    Excluir
                  </button>
                </div>

                <!-- Documentos relacionados (do mesmo equipamento) -->
                <div v-if="relateddocs && relateddocs.length > 0" class="mt-6">
                  <h4 class="font-medium text-gray-900">Documentos do mesmo equipamento</h4>
                  <div class="mt-2 space-y-2">
                    <div v-for="doc in relateddocs" :key="doc.id" 
                         class="p-3 border rounded-md hover:bg-gray-50 cursor-pointer"
                         @click="closemodal(); opendocmodal(doc)">
                      <div class="flex justify-between">
                        <div>
                          <p class="text-sm font-medium text-gray-900">{{ doc.titulo || doc.nome }}</p>
                          <p class="text-xs text-gray-500">{{ doc.tipo }} • v{{ doc.versao }}</p>
                        </div>
                        <span class="text-xs text-gray-500">{{ formatdate(doc.updatedat) }}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Mensagem de erro -->
    <div v-if="errormessage" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
      {{ errormessage }}
      <button @click="errormessage = ''" class="float-right text-red-700">
        &times;
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import api from '~/utils/api';

definePageMeta({
  layout: 'default'
});

const router = useRouter();
const route = useRoute();

// Estados principais
const documentos = ref([]);
const equipamentos = ref([]);
const loading = ref(false);
const errormessage = ref('');

// Estados de paginação e filtros
const currentpage = ref(1);
const itemsperpage = ref(10);
const searchquery = ref('');
const selectedtype = ref('');
const selectedequipamento = ref('');

// Estados de modais
const showmodal = ref(false);
const selecteddoc = ref(null);
const showdeletemodal = ref(false);
const documenttodelete = ref(null);
const relateddocs = ref([]);

// Computed properties com verificações de segurança
const filtereddocuments = computed(() => {
  if (!documentos.value || !Array.isArray(documentos.value)) {
    return [];
  }
  
  let result = [...documentos.value];
  
  if (searchquery.value) {
    const query = searchquery.value.toLowerCase();
    result = result.filter(doc => 
      doc && (
        (doc.titulo && doc.titulo.toLowerCase().includes(query)) || 
        (doc.tipo && doc.tipo.toLowerCase().includes(query))
      )
    );
  }
  
  if (selectedtype.value) {
    result = result.filter(doc => doc && doc.tipo === selectedtype.value);
  }
  
  if (selectedequipamento.value) {
    result = result.filter(doc => doc && doc.equipamentoid === selectedequipamento.value);
  }
  
  return result;
});

const paginateddocuments = computed(() => {
  if (!filtereddocuments.value || !Array.isArray(filtereddocuments.value)) {
    return [];
  }
  
  const start = (currentpage.value - 1) * itemsperpage.value;
  const end = start + itemsperpage.value;
  return filtereddocuments.value.slice(start, end);
});

const totalpages = computed(() => {
  if (!filtereddocuments.value || !Array.isArray(filtereddocuments.value)) {
    return 1;
  }
  
  return Math.ceil(filtereddocuments.value.length / itemsperpage.value);
});

const totaldocuments = computed(() => {
  if (!filtereddocuments.value || !Array.isArray(filtereddocuments.value)) {
    return 0;
  }
  
  return filtereddocuments.value.length;
});

const uniquetypes = computed(() => {
  if (!documentos.value || !Array.isArray(documentos.value)) {
    return [];
  }
  
  const types = documentos.value
    .filter(doc => doc && doc.tipo)
    .map(doc => doc.tipo);
    
  return [...new Set(types)].sort();
});

const uniqueequipamentos = computed(() => {
  if (!equipamentos.value || !Array.isArray(equipamentos.value)) {
    return [];
  }
  
  const uniquemap = new Map();
  equipamentos.value.forEach(equip => {
    if (equip && equip.id) {
      uniquemap.set(equip.id, equip);
    }
  });
  
  return Array.from(uniquemap.values());
});

const updatedthismonth = computed(() => {
  if (!documentos.value || !Array.isArray(documentos.value)) {
    return 0;
  }
  
  const now = new Date();
  const startofmonth = new Date(now.getFullYear(), now.getMonth(), 1);
  
  return documentos.value.filter(doc => {
    if (!doc || !doc.updatedat) return false;
    
    try {
      const updatedate = new Date(doc.updatedat);
      return !isNaN(updatedate.getTime()) && updatedate >= startofmonth;
    } catch (error) {
      return false;
    }
  }).length;
});

// Carrega documentos e equipamentos ao montar o componente
onMounted(async () => {
  loading.value = true;
  
  try {
    // Nova abordagem de atualização forçada
    const forceRefresh = localStorage.getItem('doc_force_refresh') === 'true';
    const updatedDocData = localStorage.getItem('doc_updated');
    
    if (forceRefresh || updatedDocData) {
      console.log('🔄 Forçando atualização completa dos dados');
      localStorage.removeItem('doc_force_refresh');
      
      if (updatedDocData) {
        try {
          const updatedDoc = JSON.parse(updatedDocData);
          console.log('📝 Atualização detectada para documento:', updatedDoc);
          localStorage.removeItem('doc_updated');
        } catch (e) {
          console.error('Erro ao processar dados de atualização:', e);
          localStorage.removeItem('doc_updated');
        }
      }
      
      // Limpar o cache do módulo API completamente
      if (typeof api.clearCache === 'function') {
        api.clearCache();
      }
      
      // Forçar nova solicitação ignorando totalmente o cache
      documentos.value = []; // Limpar dados existentes
      equipamentos.value = []; // Limpar dados existentes
      
      // Carregar tudo do zero
      await Promise.all([
        loadDocumentsForced(),
        loadEquipamentosForced()
      ]);
    } else {
      // Carregamento normal
      await refreshData();
    }
  } finally {
    loading.value = false;
  }
});

// Recarregar documentos quando retornar à página
watch(() => route.path, async (newPath, oldPath) => {
  if (newPath === '/dashdoc' && oldPath !== '/dashdoc') {
    console.log('🔄 Retornando à página de documentos - recarregando dados');
    await loaddocuments();
  }
});

// Carrega documentos da API
const loaddocuments = async () => {
  try {
    // Adicionar timestamp para evitar cache
    const timestamp = Date.now();
    const response = await api.get(`/documentos?_t=${timestamp}`);
    console.log("Raw response from documents API:", response);
    
    if (Array.isArray(response)) {
      documentos.value = response;
    } else if (response && response.data) {
      if (Array.isArray(response.data)) {
        documentos.value = response.data;
      } else if (response.data.data && Array.isArray(response.data.data)) {
        documentos.value = response.data.data;
      } else {
        documentos.value = [];
      }
    } else {
      documentos.value = [];
    }
    
    console.log('Documentos carregados (length):', documentos.value.length);
    
    // Mapeamento completo de todos os campos
    documentos.value = documentos.value.map(doc => {
      const mappedDoc = { ...doc }; // Cria uma cópia para não modificar o original
      
      // Mapeamento de campos camelCase para lowercase
      const fieldMappings = {
        // Campos existentes
        equipamentoId: 'equipamentoid',
        createdAt: 'createdat',
        updatedAt: 'updatedat',
        
        // Campos adicionais que precisam ser mapeados
        tipo: 'tipo',
        versao: 'versao',
        revisao: 'revisao',
        titulo: 'titulo',
        descricao: 'descricao',
        tamanho: 'tamanho',
        arquivo: 'arquivo',
        fileName: 'fileName',
        pdfFileName: 'pdfFileName'
      };
      
      // Aplica o mapeamento para cada campo
      Object.entries(fieldMappings).forEach(([camelCase, lowercase]) => {
        // Se o campo camelCase existe e o campo lowercase não, crie o campo lowercase
        if (doc[camelCase] !== undefined && doc[lowercase] === undefined) {
          mappedDoc[lowercase] = doc[camelCase];
        }
        
        // Se o campo lowercase existe e o campo camelCase não, crie o campo camelCase
        if (doc[lowercase] !== undefined && doc[camelCase] === undefined) {
          mappedDoc[camelCase] = doc[lowercase];
        }
      });
      
      return mappedDoc;
    });
    
    // Log para depuração após o mapeamento
    console.log('Mapeamento concluído. Exemplo do primeiro doc:', 
      documentos.value.length > 0 ? documentos.value[0] : 'Nenhum documento');
      
    // Log adicional para verificar os dados após processamento
    if (documentos.value.length > 0) {
      console.log('📄 Verificando valores do documento após processamento:');
      const firstDoc = documentos.value[0];
      console.log('ID:', firstDoc.id);
      console.log('Título:', firstDoc.titulo);
      console.log('Tipo:', firstDoc.tipo);
      console.log('Equipamento ID:', firstDoc.equipamentoId || firstDoc.equipamentoid);
      console.log('Versão:', firstDoc.versao || firstDoc.version);
    }
  } catch (error) {
    console.error('Erro ao carregar documentos:', error);
    errormessage.value = 'Falha ao carregar documentos. Tente novamente.';
    documentos.value = [];
  }
};

// Carrega equipamentos da API
const loadequipamentos = async () => {
  try {
    const response = await api.get('/equipamentos');
    console.log("DEBUG - Resposta da API equipamentos:", response);
    
    let equipdata = [];
    
    if (Array.isArray(response)) {
      equipdata = response;
    } else if (response && Array.isArray(response.data)) {
      equipdata = response.data;
    } else if (response && response.data && Array.isArray(response.data.data)) {
      equipdata = response.data.data;
    } else {
      equipdata = [];
    }
    
    equipamentos.value = equipdata.filter(item => item && item.id);
    console.log(`Equipamentos carregados: ${equipamentos.value.length} itens`);
  } catch (error) {
    console.error('Erro ao carregar equipamentos:', error);
    errormessage.value = 'Falha ao carregar equipamentos. Tente novamente.';
    equipamentos.value = [];
  }
};

// Funções auxiliares para equipamentos
const getequipamentonome = (id) => {
  if (id === null || id === undefined) return 'Sem equipamento';
  
  if (!equipamentos.value || !Array.isArray(equipamentos.value) || equipamentos.value.length === 0) {
    return `Equipamento #${id}`;
  }
  
  const numericid = typeof id === 'string' ? parseInt(id, 10) : id;
  const equip = equipamentos.value.find(e => e && e.id === numericid);
  
  return equip ? equip.nome : `Equipamento #${id}`;
};

// Modificar a função getequipamentotag para usar a propriedade correta
const getequipamentotag = (equipamentoid) => {
  if (!equipamentoid || !equipamentos.value) return 'n/a';
  
  const equipamento = equipamentos.value.find(eq => eq && eq.id === equipamentoid);
  return equipamento ? equipamento.tag || 'n/a' : 'n/a';
};

// Modificar a função formatdate para aceitar ambos os formatos de data
const formatdate = (datestring) => {
  if (!datestring) return 'N/A';
  
  try {
    const date = new Date(datestring);
    if (isNaN(date.getTime())) return 'N/A';
    
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    }).format(date);
  } catch (error) {
    return 'N/A';
  }
};

const formatfilesize = (size) => {
  if (!size || size === 0) return '0 KB';
  
  const bytes = parseInt(size);
  if (isNaN(bytes)) return '0 KB';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

const gettypeclass = (tipo) => {
  const classes = {
    'Manual': 'bg-blue-100 text-blue-800',
    'Especificação': 'bg-green-100 text-green-800',
    'Desenho': 'bg-purple-100 text-purple-800',
    'Procedimento': 'bg-yellow-100 text-yellow-800',
    'Relatório': 'bg-red-100 text-red-800',
    'Outro': 'bg-gray-100 text-gray-800',
  };
  
  return classes[tipo] || 'bg-gray-100 text-gray-800';
};

// Funções de modal
const opendocmodal = async (doc) => {
  try {
    selecteddoc.value = doc;
    showmodal.value = true;
    
    if (doc && doc.equipamentoid) {
      const documentosrelacionados = await getrelateddocuments(doc.equipamentoid, doc.id);
      relateddocs.value = Array.isArray(documentosrelacionados) ? documentosrelacionados : [];
    } else {
      relateddocs.value = [];
    }
    
  } catch (error) {
    console.error('❌ Erro ao abrir modal de documentos:', error);
    relateddocs.value = [];
  }
};

const closemodal = () => {
  showmodal.value = false;
  selecteddoc.value = null;
  relateddocs.value = [];
};

const getrelateddocuments = async (equipamentoid, excludedocid = null) => {
  try {
    console.log('📄 Buscando documentos para equipamento ID:', equipamentoid);
    
    const response = await api.get(`/documentos?equipamentoid=${equipamentoid}`);
    console.log('📄 Resposta da API:', response);
    
    let documentosdata = response?.data || response || [];
    
    if (!Array.isArray(documentosdata)) {
      if (documentosdata.data && Array.isArray(documentosdata.data)) {
        documentosdata = documentosdata.data;
      } else {
        console.warn('⚠️ Resposta não é um array:', documentosdata);
        return [];
      }
    }
    
    let documentosrelacionados = documentosdata.filter(doc => 
      doc && doc.equipamentoid === parseInt(equipamentoid)
    );
    
    if (excludedocid) {
      documentosrelacionados = documentosrelacionados.filter(doc => 
        doc && doc.id !== excludedocid
      );
    }
    
    console.log('📄 Documentos encontrados:', documentosrelacionados);
    return documentosrelacionados;
    
  } catch (error) {
    console.error('❌ Erro ao buscar documentos relacionados:', error);
    return [];
  }
};

// Funções de exclusão
const confirmdeletedocument = (doc) => {
  if (!doc) return;
  
  documenttodelete.value = doc;
  showdeletemodal.value = true;
  
  if (showmodal.value) {
    showmodal.value = false;
  }
};

const deletedocument = async () => {
  if (!documenttodelete.value) return;
  
  try {
    await api.delete(`/documentos/${documenttodelete.value.id}`);
    documentos.value = documentos.value.filter(doc => doc && doc.id !== documenttodelete.value.id);
    documenttodelete.value = null;
    showdeletemodal.value = false;
  } catch (error) {
    console.error('Erro ao excluir documento:', error);
    errormessage.value = 'Erro ao excluir documento. Tente novamente.';
  }
};

// Adicione um método de refresh explícito para uso manual
const refreshData = async () => {
  loading.value = true;
  try {
    await Promise.all([
      loaddocuments(),
      loadequipamentos()
    ]);
  } finally {
    loading.value = false;
  }
};

// Função para limpar filtros
const clearfilters = () => {
  searchquery.value = '';
  selectedtype.value = '';
  selectedequipamento.value = '';
};

// Função para obter URL do documento
const getdocumenturl = (doc) => {
  if (!doc) return null;
  
  // Verificar se tem URL direta
  if (doc.url) return doc.url;
  
  // Verificar se tem arquivo PDF
  if (doc.pdfFileName) {
    return `http://localhost:3001/uploads/documentos/${doc.pdfFileName}`;
  }
  
  // Verificar se tem arquivo original
  if (doc.fileName) {
    return `http://localhost:3001/uploads/documentos/${doc.fileName}`;
  }
  
  // Verificar se tem o campo arquivo (nome do arquivo no servidor)
  if (doc.arquivo) {
    return `http://localhost:3001/uploads/documentos/${doc.arquivo}`;
  }
  
  return null;
};

// Função auxiliar adicional para equipamentos
const getequipamentoarea = (equipamentoid) => {
  if (!equipamentoid || !equipamentos.value) return 'N/A';
  
  const equipamento = equipamentos.value.find(eq => eq && eq.id === equipamentoid);
  return equipamento && equipamento.area ? equipamento.area : 'N/A';
};

// Adicione estas funções auxiliares para outros campos, seguindo o mesmo padrão do equipamento

// Função para obter o tipo do documento
const getdocumenttype = (doc) => {
  if (!doc) return 'N/A';
  // Tenta todas as possíveis propriedades
  return doc.tipo || doc.type || doc.documentType || 'N/A';
};

// Função para obter a versão do documento
const getdocumentversion = (doc) => {
  if (!doc) return '1';
  // Tenta todas as possíveis propriedades
  return doc.versao || doc.version || doc.documentVersion || '1';
};

// Função para obter a revisão do documento
const getdocumentrevision = (doc) => {
  if (!doc) return '0';
  // Tenta todas as possíveis propriedades
  return doc.revisao || doc.revision || doc.documentRevision || '0';
};

// Função para obter o título do documento
const getdocumenttitle = (doc) => {
  if (!doc) return 'N/A';
  // Tenta todas as possíveis propriedades
  return doc.titulo || doc.title || doc.nome || doc.name || 'N/A';
};

// Adicione estas duas novas funções forçadas
const loadDocumentsForced = async () => {
  try {
    // Adicionar timestamp + random para evitar cache em todos os níveis
    const nocache = `${Date.now()}-${Math.random()}`;
    const response = await fetch(`${process.env.API_URL || 'http://localhost:3001'}/documentos?_nocache=${nocache}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache'
      }
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    console.log("🔄 Dados forçados carregados:", data);
    
    // Processar dados como antes
    documentos.value = Array.isArray(data) ? data : (data.data || []);
    
    // Aplicar mapeamento como anteriormente...
    documentos.value = documentos.value.map(doc => {
      // Seu código de mapeamento aqui...
      return { ...doc };  // Retornar uma cópia fresca do objeto
    });
    
    console.log('🔄 Recarregamento forçado concluído - documentos:', documentos.value.length);
  } catch (error) {
    console.error('Erro no carregamento forçado de documentos:', error);
    errormessage.value = 'Falha ao atualizar documentos. Tente novamente.';
  }
};

const loadEquipamentosForced = async () => {
  try {
    // Implementação similar à função loadDocumentsForced
    const nocache = `${Date.now()}-${Math.random()}`;
    const response = await fetch(`${process.env.API_URL || 'http://localhost:3001'}/equipamentos?_nocache=${nocache}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache'
      }
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    equipamentos.value = Array.isArray(data) ? data : (data.data || []);
    console.log('🔄 Recarregamento forçado concluído - equipamentos:', equipamentos.value.length);
  } catch (error) {
    console.error('Erro no carregamento forçado de equipamentos:', error);
  }
};
</script>

<style scoped>
.required:after {
  content: " *";
  color: red;
}
</style>