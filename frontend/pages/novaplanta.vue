<!-- filepath: d:\PROJETO\frontend\pages\novaplanta.vue -->
<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 via-emerald-50 to-teal-100">
    <!-- Header Moderno -->
    <div class="bg-white/80 backdrop-blur-xl border-b border-white/20 shadow-lg sticky top-0 z-40">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div class="flex items-center justify-between">
          <div class="flex items-center space-x-4">
            <div class="w-12 h-12 bg-gradient-to-br from-emerald-600 to-teal-600 rounded-2xl flex items-center justify-center shadow-lg">
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
              </svg>
            </div>
            <div>
              <h1 class="text-3xl font-bold bg-gradient-to-r from-slate-900 to-slate-600 bg-clip-text text-transparent">
                {{ editMode ? 'Editar Planta' : 'Nova Planta' }}
              </h1>
              <p class="text-slate-500 text-sm">
                {{ editMode ? 'Atualize as informações da planta interativa' : 'Crie uma nova planta com marcadores interativos' }}
              </p>
            </div>
          </div>
          
          <!-- Botão Voltar Elegante -->
          <NuxtLink 
            to="/plantainterativa" 
            class="flex items-center px-4 py-2 text-slate-600 hover:text-slate-900 hover:bg-white/50 rounded-xl transition-all duration-200 font-medium backdrop-blur-sm border border-white/20"
          >
            <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
            </svg>
            Voltar
          </NuxtLink>
        </div>
      </div>
    </div>

    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Formulário Principal -->
      <div class="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 overflow-hidden">
        
        <!-- Seção: Informações Básicas -->
        <div class="p-8 border-b border-slate-200">
          <div class="flex items-center mb-6">
            <div class="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mr-4">
              <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <div>
              <h2 class="text-xl font-bold text-slate-900">Informações Básicas</h2>
              <p class="text-slate-600 text-sm">Defina o título e descrição da planta</p>
            </div>
          </div>
          
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <label for="titulo" class="block text-sm font-semibold text-slate-700 mb-3">
                Título da Planta *
              </label>
              <input 
                id="titulo" 
                v-model="planta.titulo" 
                type="text" 
                class="w-full border border-slate-300 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white shadow-sm transition-all"
                :class="{ 'border-red-500 ring-2 ring-red-200': errors.titulo }"
                placeholder="Ex: Planta do Setor de Produção"
              />
              <p v-if="errors.titulo" class="mt-2 text-sm text-red-600 flex items-center">
                <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
                </svg>
                {{ errors.titulo }}
              </p>
            </div>
            
            <div>
              <label for="descricao" class="block text-sm font-semibold text-slate-700 mb-3">
                Descrição
              </label>
              <textarea 
                id="descricao" 
                v-model="planta.descricao" 
                rows="3"
                class="w-full border border-slate-300 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white shadow-sm transition-all resize-none"
                placeholder="Breve descrição da planta e sua finalidade..."
              ></textarea>
            </div>
          </div>
        </div>

        <!-- Seção: Upload de Imagem -->
        <div class="p-8 border-b border-slate-200">
          <div class="flex items-center mb-6">
            <div class="w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mr-4">
              <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
              </svg>
            </div>
            <div>
              <h2 class="text-xl font-bold text-slate-900">Imagem da Planta</h2>
              <p class="text-slate-600 text-sm">Faça upload da imagem base para adicionar marcadores</p>
            </div>
          </div>

          <!-- Upload Area -->
          <div v-if="!planta.imageUrl" class="border-2 border-dashed border-slate-300 rounded-2xl p-12 text-center bg-gradient-to-br from-slate-50 to-slate-100 hover:from-slate-100 hover:to-slate-200 transition-all duration-200">
            <div class="w-20 h-20 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-full flex items-center justify-center mx-auto mb-6 border border-emerald-200">
              <svg class="w-10 h-10 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
              </svg>
            </div>
            
            <label for="file-upload" class="cursor-pointer">
              <span class="inline-flex items-center px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-medium rounded-xl hover:from-emerald-700 hover:to-teal-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105">
                <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
                </svg>
                Selecionar Imagem
              </span>
              <input 
                id="file-upload" 
                ref="fileInput"
                type="file" 
                accept="image/*" 
                class="sr-only" 
                @change="handleImageUpload"
              />
            </label>
            
            <p class="text-slate-500 text-sm mt-4 max-w-md mx-auto">
              Formatos suportados: PNG, JPG, GIF. Tamanho máximo: 10MB
            </p>
            
            <div v-if="errors.imagem" class="mt-4 p-3 bg-red-50 border border-red-200 rounded-xl">
              <p class="text-red-600 text-sm flex items-center justify-center">
                <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
                </svg>
                {{ errors.imagem }}
              </p>
            </div>
          </div>
          
          <!-- Preview da Imagem com Marcadores -->
          <div v-else class="space-y-4">
            <!-- Controles da Imagem -->
            <div class="flex justify-between items-center">
              <div class="flex items-center space-x-3">
                <div class="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                  <svg class="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
                <span class="text-sm font-medium text-slate-700">Imagem carregada com sucesso</span>
              </div>
              
              <div class="flex items-center space-x-3">
                <!-- Toggle Modo Adição -->
                <button 
                  @click="modoAdicao = !modoAdicao" 
                  type="button" 
                  class="px-4 py-2 text-sm rounded-xl font-medium transition-all duration-200 flex items-center"
                  :class="modoAdicao 
                    ? 'bg-blue-100 text-blue-700 ring-2 ring-blue-200' 
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'"
                >
                  <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path>
                  </svg>
                  {{ modoAdicao ? 'Cancelar adição' : 'Adicionar marcador' }}
                </button>
                
                <!-- Botão Remover Imagem -->
                <button 
                  @click="removeImage" 
                  type="button" 
                  class="px-4 py-2 bg-red-50 text-red-700 text-sm rounded-xl hover:bg-red-100 transition-all duration-200 font-medium flex items-center"
                >
                  <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                  </svg>
                  Remover
                </button>
              </div>
            </div>
            
            <!-- Container da Imagem -->
            <div class="relative border-2 border-slate-200 rounded-2xl overflow-hidden bg-white shadow-lg">
              <div 
                class="relative"
                :class="{ 'cursor-crosshair': modoAdicao }"
                @click="modoAdicao ? addMarker($event) : null"
                ref="imageContainer"
              >
                <img 
                  :src="planta.imageUrl" 
                  :alt="planta.titulo" 
                  class="max-w-full h-auto block"
                />
                
                <!-- Marcadores -->
                <div 
                  v-for="(marcador, index) in planta.marcadores" 
                  :key="marcador.id"
                  class="absolute w-8 h-8 rounded-full border-2 border-white transform -translate-x-1/2 -translate-y-1/2 z-10 transition-all duration-200 cursor-pointer flex items-center justify-center text-white font-bold shadow-lg hover:scale-125 text-sm"
                  :style="{
                    left: `${marcador.posicaoX}%`,
                    top: `${marcador.posicaoY}%`,
                    backgroundColor: marcador.cor || '#ef4444'
                  }"
                  :draggable="!modoAdicao"
                  @dragstart="startDrag($event, index)"
                  @click.stop="openMarkerEditModal(index)"
                  :title="marcador.texto"
                >
                  {{ marcador.texto.charAt(0).toUpperCase() }}
                </div>
                
                <!-- Instruções de Uso -->
                <div v-if="modoAdicao" class="absolute top-4 left-4">
                  <div class="bg-blue-600 text-white px-4 py-2 rounded-xl text-sm font-medium shadow-lg flex items-center">
                    <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    Clique na imagem para adicionar marcador
                  </div>
                </div>
              </div>
            </div>
            
            <!-- Dicas de Uso -->
            <div class="bg-gradient-to-r from-slate-50 to-slate-100 border border-slate-200 rounded-xl p-4">
              <div class="flex items-start">
                <div class="w-5 h-5 bg-blue-100 rounded-full flex items-center justify-center mr-3 mt-0.5">
                  <svg class="w-3 h-3 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                </div>
                <div class="text-sm text-slate-600">
                  <p class="font-medium mb-1">Como usar:</p>
                  <ul class="space-y-1 text-xs">
                    <li>• Clique em "Adicionar marcador" e depois na imagem</li>
                    <li>• Clique em um marcador para editar suas informações</li>
                    <li>• Arraste os marcadores para reposicioná-los</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Seção: Lista de Marcadores -->
        <div v-if="planta.marcadores.length > 0" class="p-8 border-b border-slate-200">
          <div class="flex items-center mb-6">
            <div class="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center mr-4">
              <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
              </svg>
            </div>
            <div>
              <h2 class="text-xl font-bold text-slate-900">Marcadores</h2>
              <p class="text-slate-600 text-sm">{{ planta.marcadores.length }} marcador(es) adicionado(s)</p>
            </div>
          </div>
          
          <div class="bg-gradient-to-br from-slate-50 to-slate-100 rounded-2xl p-6 max-h-80 overflow-y-auto border border-slate-200">
            <div class="space-y-3">
              <div 
                v-for="(marcador, index) in planta.marcadores" 
                :key="marcador.id"
                class="flex items-center justify-between p-4 bg-white rounded-xl border border-slate-200 hover:shadow-md transition-all duration-200"
              >
                <div class="flex items-center">
                  <div 
                    class="w-10 h-10 rounded-xl mr-4 flex items-center justify-center text-white font-bold shadow-sm border-2 border-white"
                    :style="{ backgroundColor: marcador.cor || '#ef4444' }"
                  >
                    {{ marcador.texto.charAt(0).toUpperCase() }}
                  </div>
                  <div class="flex-1">
                    <div class="font-semibold text-slate-900 text-sm">{{ marcador.texto }}</div>
                    <div class="text-xs text-slate-500 flex items-center mt-1">
                      <svg class="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"></path>
                      </svg>
                      {{ marcador.url || 'Sem link definido' }}
                    </div>
                  </div>
                </div>
                
                <!-- Ações do Marcador -->
                <div class="flex items-center space-x-2">
                  <button 
                    @click="openMarkerEditModal(index)" 
                    type="button" 
                    class="p-2 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    title="Editar marcador"
                  >
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path>
                    </svg>
                  </button>
                  <button 
                    @click="removeMarcador(index)" 
                    type="button" 
                    class="p-2 text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    title="Excluir marcador"
                  >
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Botões de Ação -->
        <div class="p-8 bg-gradient-to-r from-slate-50 to-slate-100">
          <div class="flex justify-between items-center">
            <!-- Informações de Status -->
            <div class="flex items-center text-sm text-slate-600">
              <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              {{ planta.marcadores.length }} marcador(es) • {{ planta.imageUrl ? 'Imagem carregada' : 'Sem imagem' }}
            </div>
            
            <!-- Botões de Ação -->
            <div class="flex items-center space-x-4">
              <button 
                type="button" 
                class="px-6 py-3 border border-slate-300 rounded-xl text-slate-700 hover:bg-white hover:shadow-sm transition-all duration-200 font-medium"
                @click="$router.push('/plantainterativa')"
              >
                Cancelar
              </button>
              <button
                type="button" 
                class="px-8 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl hover:from-emerald-700 hover:to-teal-700 transition-all duration-200 font-medium shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center"
                @click="salvarPlanta"
              >
                <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                </svg>
                {{ editMode ? 'Atualizar Planta' : 'Salvar Planta' }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal para Edição de Marcador Melhorado -->
    <div 
      v-if="marcadorModal.visible" 
      class="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      @click="closeMarcadorModal"
    >
      <div 
        class="bg-white rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden"
        @click.stop
      >
        <!-- Header do Modal -->
        <div class="p-6 bg-gradient-to-r from-slate-50 to-slate-100 border-b border-slate-200">
          <h3 class="text-xl font-bold text-slate-900">
            {{ marcadorModal.isEdit ? 'Editar Marcador' : 'Novo Marcador' }}
          </h3>
          <p class="text-sm text-slate-600 mt-1">
            {{ marcadorModal.isEdit ? 'Modifique as informações do marcador' : 'Adicione informações ao novo marcador' }}
          </p>
        </div>
        
        <!-- Conteúdo do Modal -->
        <div class="p-6 space-y-6">
          <!-- Campo Texto -->
          <div>
            <label for="marcador-texto" class="block text-sm font-semibold text-slate-700 mb-3">
              Texto do Marcador *
            </label>
            <input 
              id="marcador-texto" 
              v-model="marcadorModal.texto" 
              type="text" 
              class="w-full border border-slate-300 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
              :class="{ 'border-red-500 ring-2 ring-red-200': marcadorModal.errors.texto }"
              placeholder="Ex: Equipamento A, Zona de Segurança..."
            />
            <p v-if="marcadorModal.errors.texto" class="mt-2 text-sm text-red-600 flex items-center">
              <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
              </svg>
              {{ marcadorModal.errors.texto }}
            </p>
          </div>
          
          <!-- Campo URL -->
          <div>
            <label for="marcador-url" class="block text-sm font-semibold text-slate-700 mb-3">
              URL de Destino (opcional)
            </label>
            <input 
              id="marcador-url" 
              v-model="marcadorModal.url" 
              type="text" 
              class="w-full border border-slate-300 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
              placeholder="Ex: /equipamentos/123 ou https://example.com"
            />
            <p class="mt-2 text-xs text-slate-500 flex items-start">
              <svg class="w-4 h-4 mr-1 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              URLs internas (/página) ou externas (https://...). Deixe vazio para não adicionar link.
            </p>
          </div>
          
          <!-- Seletor de Cor Melhorado -->
          <div>
            <label class="block text-sm font-semibold text-slate-700 mb-3">Cor do Marcador</label>
            <div class="grid grid-cols-4 gap-3">
              <button 
                v-for="cor in coresMarcadores" 
                :key="cor.value"
                type="button"
                @click="marcadorModal.cor = cor.value"
                class="relative w-12 h-12 rounded-xl border-2 transition-all duration-200 hover:scale-110"
                :class="marcadorModal.cor === cor.value ? 'border-slate-400 ring-2 ring-slate-200 scale-110' : 'border-slate-200'"
                :style="{ backgroundColor: cor.value }"
                :title="cor.name"
              >
                <div v-if="marcadorModal.cor === cor.value" class="absolute inset-0 flex items-center justify-center">
                  <svg class="w-6 h-6 text-white drop-shadow-lg" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                  </svg>
                </div>
              </button>
            </div>
          </div>
        </div>
        
        <!-- Footer do Modal -->
        <div class="p-6 bg-slate-50 border-t border-slate-200 flex justify-end space-x-3">
          <button 
            type="button" 
            class="px-6 py-3 border border-slate-300 rounded-xl text-slate-700 hover:bg-white transition-all duration-200 font-medium"
            @click="closeMarcadorModal"
          >
            Cancelar
          </button>
          <button
            type="button" 
            class="px-6 py-3 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 transition-all duration-200 font-medium flex items-center shadow-lg"
            @click="saveMarcador"
          >
            <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
            </svg>
            {{ marcadorModal.isEdit ? 'Atualizar' : 'Salvar' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, onBeforeUnmount, nextTick } from 'vue';
import { useRouter, useRoute } from 'vue-router';

const router = useRouter();
const route = useRoute();

// Verificar se estamos no modo de edição
const editMode = ref(false);
const plantaId = ref(null);

// Referências para manipulação do DOM
const fileInput = ref(null);
const imageContainer = ref(null);

// Estado para controle de adição de marcador
const modoAdicao = ref(false);

// Dados da planta
const planta = reactive({
  id: '',
  titulo: '',
  descricao: '',
  imageUrl: '',
  dataCriacao: null,
  marcadores: []
});

// Erros de validação
const errors = reactive({
  titulo: '',
  imagem: ''
});

// Estado do modal de marcador
const marcadorModal = reactive({
  visible: false,
  isEdit: false,
  index: -1,
  texto: '',
  url: '',
  cor: '#ef4444',
  posicaoX: 0,
  posicaoY: 0,
  errors: {
    texto: ''
  }
});

// Cores disponíveis para marcadores
const coresMarcadores = [
  { name: 'Vermelho', value: '#ef4444' },
  { name: 'Laranja', value: '#f97316' },
  { name: 'Amarelo', value: '#eab308' },
  { name: 'Verde', value: '#22c55e' },
  { name: 'Azul', value: '#3b82f6' },
  { name: 'Roxo', value: '#8b5cf6' },
  { name: 'Rosa', value: '#ec4899' },
  { name: 'Cinza', value: '#6b7280' }
];

// Carregar planta existente para edição
const carregarPlantaParaEdicao = () => {
  try {
    const plantas = JSON.parse(localStorage.getItem('plantas') || '[]');
    const plantaExistente = plantas.find(p => p.id === plantaId.value);
    
    if (plantaExistente) {
      Object.assign(planta, plantaExistente);
      editMode.value = true;
    }
  } catch (error) {
    console.error('Erro ao carregar planta para edição:', error);
  }
};

// Manipular upload de imagem
const handleImageUpload = (event) => {
  const file = event.target.files[0];
  if (!file) return;
  
  // Validar tamanho do arquivo (10MB)
  if (file.size > 10 * 1024 * 1024) {
    errors.imagem = 'A imagem deve ter menos de 10MB';
    return;
  }
  
  const reader = new FileReader();
  reader.onload = (e) => {
    planta.imageUrl = e.target.result;
    errors.imagem = '';
    
    // Aguardar o próximo ciclo para configurar os listeners
    nextTick(() => {
      setupDragListeners();
    });
  };
  reader.readAsDataURL(file);
};

// Remover imagem
const removeImage = () => {
  planta.imageUrl = '';
  planta.marcadores = [];
  if (fileInput.value) {
    fileInput.value.value = '';
  }
};

// ⭐ FUNÇÃO CORRIGIDA DE ADICIONAR MARCADOR
const addMarker = (event) => {
  if (!imageContainer.value) return;
  
  // Obter as dimensões e posição da imagem
  const img = imageContainer.value.querySelector('img');
  if (!img) return;
  
  const imgRect = img.getBoundingClientRect();
  
  // Calcular posição relativa à imagem (0-100%)
  const x = ((event.clientX - imgRect.left) / imgRect.width) * 100;
  const y = ((event.clientY - imgRect.top) / imgRect.height) * 100;
  
  // Garantir que os valores estejam dentro dos limites
  const posX = Math.max(0, Math.min(100, x));
  const posY = Math.max(0, Math.min(100, y));
  
  marcadorModal.isEdit = false;
  marcadorModal.index = -1;
  marcadorModal.texto = '';
  marcadorModal.url = '';
  marcadorModal.cor = '#ef4444';
  marcadorModal.posicaoX = posX;
  marcadorModal.posicaoY = posY;
  marcadorModal.errors.texto = '';
  marcadorModal.visible = true;
};

// Abrir modal para edição de marcador
const openMarkerEditModal = (index) => {
  const marcador = planta.marcadores[index];
  
  marcadorModal.isEdit = true;
  marcadorModal.index = index;
  marcadorModal.texto = marcador.texto;
  marcadorModal.url = marcador.url || '';
  marcadorModal.cor = marcador.cor || '#ef4444';
  marcadorModal.posicaoX = marcador.posicaoX;
  marcadorModal.posicaoY = marcador.posicaoY;
  marcadorModal.errors.texto = '';
  marcadorModal.visible = true;
};

// Fechar modal de marcador
const closeMarcadorModal = () => {
  marcadorModal.visible = false;
  marcadorModal.errors.texto = '';
};

// Salvar marcador
const saveMarcador = () => {
  // Validar
  marcadorModal.errors.texto = '';
  
  if (!marcadorModal.texto.trim()) {
    marcadorModal.errors.texto = 'O texto do marcador é obrigatório';
    return;
  }
  
  const novoMarcador = {
    id: marcadorModal.isEdit ? planta.marcadores[marcadorModal.index].id : Date.now().toString(),
    texto: marcadorModal.texto.trim(),
    url: marcadorModal.url.trim(),
    cor: marcadorModal.cor,
    posicaoX: marcadorModal.posicaoX,
    posicaoY: marcadorModal.posicaoY
  };
  
  if (marcadorModal.isEdit) {
    // Atualizar marcador existente
    planta.marcadores.splice(marcadorModal.index, 1, novoMarcador);
  } else {
    // Adicionar novo marcador
    planta.marcadores.push(novoMarcador);
  }
  
  closeMarcadorModal();
  modoAdicao.value = false;
};

// Remover marcador
const removeMarcador = (index) => {
  if (confirm('Tem certeza que deseja remover este marcador?')) {
    planta.marcadores.splice(index, 1);
  }
};

// Iniciar arrastar marcador
const startDrag = (event, index) => {
  event.dataTransfer.setData('text/plain', index.toString());
};

// ⭐ CONFIGURAR LISTENERS DE DRAG AND DROP CORRIGIDOS
const setupDragListeners = () => {
  if (!imageContainer.value) return;
  
  const img = imageContainer.value.querySelector('img');
  if (!img) return;
  
  const onDragOver = (event) => {
    event.preventDefault();
  };
  
  const onDrop = (event) => {
    event.preventDefault();
    const index = parseInt(event.dataTransfer.getData('text/plain'));
    if (isNaN(index)) return;
    
    const imgRect = img.getBoundingClientRect();
    const x = ((event.clientX - imgRect.left) / imgRect.width) * 100;
    const y = ((event.clientY - imgRect.top) / imgRect.height) * 100;
    
    // Garantir que os valores estejam dentro dos limites
    const posX = Math.max(0, Math.min(100, x));
    const posY = Math.max(0, Math.min(100, y));
    
    planta.marcadores[index].posicaoX = posX;
    planta.marcadores[index].posicaoY = posY;
  };
  
  img.addEventListener('dragover', onDragOver);
  img.addEventListener('drop', onDrop);
  
  // Cleanup
  return () => {
    img.removeEventListener('dragover', onDragOver);
    img.removeEventListener('drop', onDrop);
  };
};

// Salvar planta
const salvarPlanta = () => {
  // Validar
  errors.titulo = '';
  errors.imagem = '';
  
  if (!planta.titulo.trim()) {
    errors.titulo = 'O título da planta é obrigatório';
    return;
  }
  
  if (!planta.imageUrl) {
    errors.imagem = 'É necessário adicionar uma imagem para a planta';
    return;
  }
  
  try {
    // Carregar plantas existentes
    const plantas = JSON.parse(localStorage.getItem('plantas') || '[]');
    
    if (editMode.value) {
      // Atualizar planta existente
      const index = plantas.findIndex(p => p.id === planta.id);
      if (index !== -1) {
        plantas[index] = { ...planta };
      }
    } else {
      // Adicionar nova planta
      planta.id = Date.now().toString();
      planta.dataCriacao = new Date().toISOString();
      plantas.push({ ...planta });
    }
    
    // Salvar no localStorage
    localStorage.setItem('plantas', JSON.stringify(plantas));
    
    // Redirecionar para a página de visualização
    router.push('/plantainterativa');
  } catch (error) {
    console.error('Erro ao salvar planta:', error);
    alert('Ocorreu um erro ao salvar a planta. Por favor, tente novamente.');
  }
};

// Ciclo de vida do componente
onMounted(() => {
  // Verificar se estamos no modo de edição
  if (route.query.id) {
    plantaId.value = route.query.id;
    carregarPlantaParaEdicao();
  }
  
  // Configurar listeners se já há imagem
  if (planta.imageUrl) {
    nextTick(() => {
      setupDragListeners();
    });
  }
});
</script>

<style scoped>
.backdrop-blur-xl {
  backdrop-filter: blur(24px);
}

.backdrop-blur-sm {
  backdrop-filter: blur(8px);
}

/* Scrollbar personalizada */
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

::-webkit-scrollbar-track {
  background: #f1f5f9;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}

/* Estilos para drag and drop */
[draggable] {
  -webkit-user-drag: element;
  user-select: none;
}
</style>