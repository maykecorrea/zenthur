<!-- filepath: d:\PROJETO\frontend\pages\plantainterativa.vue -->
<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
    <!-- Header Moderno com Gradiente -->
    <div class="bg-white/80 backdrop-blur-xl border-b border-white/20 shadow-lg sticky top-0 z-40">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div class="flex items-center justify-between">
          <div class="flex items-center space-x-4">
            <div class="w-12 h-12 bg-gradient-to-br from-emerald-600 to-teal-600 rounded-2xl flex items-center justify-center shadow-lg">
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-1.447-.894L15 9m0 8V9m0 0V7"></path>
              </svg>
            </div>
            <div>
              <h1 class="text-3xl font-bold bg-gradient-to-r from-slate-900 to-slate-600 bg-clip-text text-transparent">
                Plantas Interativas
              </h1>
              <p class="text-slate-500 text-sm">Visualize e gerencie plantas com marcadores interativos</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Filtros e Ações Modernas -->
      <div class="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-6 mb-8">
        <div class="flex flex-col lg:flex-row gap-4 justify-between items-start lg:items-center">
          <!-- Busca Moderna -->
          <div class="flex-1 max-w-md">
            <label for="search" class="block text-sm font-medium text-slate-700 mb-2">Buscar plantas</label>
            <div class="relative">
              <div class="absolute left-3 top-1/2 transform -translate-y-1/2">
                <svg class="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
              </div>
              <input 
                id="search" 
                v-model="searchQuery" 
                type="text" 
                placeholder="Digite o título ou descrição..." 
                class="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white shadow-sm transition-all"
              />
            </div>
          </div>
          
          <!-- Botões de Ação -->
          <div class="flex flex-wrap gap-3">
            <NuxtLink 
              to="/novaplanta" 
              class="px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl hover:from-emerald-700 hover:to-teal-700 transition-all duration-200 font-medium shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center"
            >
              <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
              </svg>
              Nova Planta
            </NuxtLink>
            
            <button 
              v-if="filteredPlantas.length > 0" 
              @click="openWithMarkerMode(0)" 
              class="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 font-medium shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center"
            >
              <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path>
              </svg>
              Adicionar Marcação
            </button>
          </div>
        </div>
      </div>

      <!-- Estado Vazio Melhorado -->
      <div v-if="filteredPlantas.length === 0" class="text-center py-20">
        <div class="w-24 h-24 bg-gradient-to-br from-slate-100 to-slate-200 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
          <svg class="w-12 h-12 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-1.447-.894L15 9m0 8V9m0 0V7"></path>
          </svg>
        </div>
        <h3 class="text-2xl font-bold text-slate-900 mb-2">Nenhuma planta encontrada</h3>
        <p class="text-slate-500 mb-6 max-w-md mx-auto">
          {{ searchQuery ? 'Tente ajustar os filtros de busca ou' : 'Comece' }} criando sua primeira planta interativa.
        </p>
        <NuxtLink 
          to="/novaplanta" 
          class="inline-flex items-center px-8 py-4 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl hover:from-emerald-700 hover:to-teal-700 transition-all duration-200 font-medium shadow-lg hover:shadow-xl transform hover:scale-105"
        >
          <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
          </svg>
          Criar Primeira Planta
        </NuxtLink>
      </div>

      <!-- Grid de Plantas Melhorado -->
      <div v-else class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        <div 
          v-for="(planta, index) in filteredPlantas" 
          :key="planta.id" 
          class="group bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 overflow-hidden cursor-pointer hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
          @click="openLightbox(index)"
        >
          <!-- Container da Imagem -->
          <div class="relative aspect-video overflow-hidden">
            <img 
              :src="planta.imageUrl" 
              :alt="planta.titulo" 
              class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
            />
            
            <!-- Overlay com Gradiente -->
            <div class="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            
            <!-- Badge de Marcadores -->
            <div v-if="planta.marcadores && planta.marcadores.length > 0" class="absolute top-4 right-4">
              <div class="bg-emerald-600 bg-opacity-90 backdrop-blur-sm text-white text-xs px-3 py-1.5 rounded-full flex items-center shadow-lg">
                <svg class="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                </svg>
                {{ planta.marcadores.length }}
              </div>
            </div>

            <!-- Ícone de Visualização no Hover -->
            <div class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div class="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                </svg>
              </div>
            </div>
          </div>
          
          <!-- Conteúdo do Card -->
          <div class="p-6">
            <h3 class="font-bold text-xl text-slate-900 mb-2 group-hover:text-emerald-600 transition-colors">
              {{ planta.titulo }}
            </h3>
            <p class="text-slate-600 text-sm mb-4 line-clamp-2">
              {{ planta.descricao }}
            </p>
            
            <!-- Informações Adicionais -->
            <div class="flex items-center justify-between pt-4 border-t border-slate-100">
              <div class="flex items-center text-xs text-slate-500">
                <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                </svg>
                {{ (planta.marcadores && planta.marcadores.length) || 0 }} marcadores
              </div>
              <div class="text-xs text-slate-500">
                {{ formatDate(planta.dataCriacao) }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- ⭐ LIGHTBOX CORRIGIDO com z-index adequado -->
    <div 
      v-if="lightboxVisible" 
      class="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100] flex items-center justify-center p-4"
      @click="closeLightbox"
    >
      <div 
        class="max-w-7xl max-h-[95vh] w-[95vw] bg-white rounded-2xl overflow-hidden shadow-2xl"
        @click.stop
      >
        <!-- Header do Lightbox -->
        <div class="flex justify-between items-center p-6 bg-gradient-to-r from-slate-50 to-slate-100 border-b border-slate-200">
          <div>
            <h3 class="text-xl font-bold text-slate-900">{{ currentPlanta?.titulo }}</h3>
            <p class="text-sm text-slate-600">{{ currentPlanta?.descricao }}</p>
          </div>
          
          <div class="flex items-center space-x-3">
            <!-- Toggle Modo Marcação -->
            <button 
              @click="toggleMarcacaoMode" 
              class="px-4 py-2 text-sm rounded-xl font-medium transition-all duration-200 flex items-center"
              :class="modoMarcacao 
                ? 'bg-blue-100 text-blue-700 ring-2 ring-blue-200' 
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'"
            >
              <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path>
              </svg>
              {{ modoMarcacao ? 'Cancelar marcação' : 'Adicionar marcador' }}
            </button>
            
            <!-- Botão Excluir Planta -->
            <button 
              @click="confirmarExclusaoPlanta" 
              class="px-4 py-2 text-sm rounded-xl font-medium bg-red-50 text-red-700 hover:bg-red-100 transition-all duration-200 flex items-center"
            >
              <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
              </svg>
              Excluir planta
            </button>
            
            <!-- Botão Fechar -->
            <button 
              @click="closeLightbox" 
              class="p-2 text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-xl transition-colors"
            >
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>
        </div>

        <!-- ⭐ CONTAINER DA IMAGEM CORRIGIDO -->
        <div class="relative overflow-auto bg-slate-50" style="height: calc(95vh - 180px)">
          <div 
            class="relative w-full h-full flex items-center justify-center p-4"
            :class="{ 'cursor-crosshair': modoMarcacao }"
            ref="imageContainer"
          >
            <!-- ⭐ IMAGEM COM POSICIONAMENTO CORRIGIDO -->
            <div class="relative inline-block">
              <img 
                :src="currentPlanta?.imageUrl" 
                :alt="currentPlanta?.titulo" 
                class="max-w-full max-h-full object-contain"
                ref="plantaImage"
                @click="handleImageClick"
                @load="onImageLoad"
                style="display: block;"
              />
              
              <!-- ⭐ MARCADORES COM POSICIONAMENTO ABSOLUTO CORRETO -->
              <div 
                v-for="marcador in currentPlanta?.marcadores" 
                :key="marcador.id"
                class="absolute w-8 h-8 rounded-full border-2 border-white transform -translate-x-1/2 -translate-y-1/2 z-10 transition-all duration-200 cursor-pointer flex items-center justify-center text-white font-bold shadow-lg hover:scale-125 text-sm"
                :style="{
                  left: `${marcador.posicaoX}%`,
                  top: `${marcador.posicaoY}%`,
                  backgroundColor: marcador.cor || '#ef4444'
                }"
                @mouseenter="activeTooltip = marcador.id"
                @mouseleave="activeTooltip = null"
                @click.stop="openMarkerEditModal(marcador.id)"
              >
                <span>{{ marcador.texto.charAt(0).toUpperCase() }}</span>
                
                <!-- ⭐ TOOLTIP MELHORADO -->
                <div 
                  v-if="activeTooltip === marcador.id"
                  class="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-3 px-3 py-2 bg-slate-900 text-white text-sm rounded-lg whitespace-nowrap shadow-xl z-20 max-w-xs"
                >
                  <div class="font-medium">{{ marcador.texto }}</div>
                  <div v-if="marcador.url" class="text-xs text-slate-300 mt-1">
                    Clique para acessar
                  </div>
                  <div class="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-slate-900 rotate-45"></div>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Instruções para Marcação -->
          <div v-if="modoMarcacao" class="absolute top-4 left-4 z-30">
            <div class="bg-blue-600 text-white px-4 py-2 rounded-xl text-sm font-medium shadow-lg flex items-center">
              <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              Clique na imagem para adicionar um marcador
            </div>
          </div>
        </div>

        <!-- Controles de Navegação -->
        <div class="flex justify-between items-center p-4 bg-slate-50 border-t border-slate-200">
          <button 
            @click.stop="navigateImage(-1)" 
            class="flex items-center px-4 py-2 text-slate-600 hover:text-slate-900 hover:bg-white rounded-xl transition-all duration-200 font-medium"
            :disabled="currentIndex === 0"
            :class="{ 'opacity-50 cursor-not-allowed': currentIndex === 0 }"
          >
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
            </svg>
            Anterior
          </button>
          
          <div class="flex items-center space-x-4">
            <div class="text-sm text-slate-600 font-medium">
              {{ currentIndex + 1 }} de {{ filteredPlantas.length }}
            </div>
            
            <!-- Indicadores de Navegação -->
            <div class="flex space-x-1">
              <div 
                v-for="(planta, index) in filteredPlantas.slice(Math.max(0, currentIndex - 2), currentIndex + 3)" 
                :key="planta.id"
                class="w-2 h-2 rounded-full transition-colors"
                :class="index + Math.max(0, currentIndex - 2) === currentIndex ? 'bg-emerald-600' : 'bg-slate-300'"
              ></div>
            </div>
          </div>
          
          <button 
            @click.stop="navigateImage(1)" 
            class="flex items-center px-4 py-2 text-slate-600 hover:text-slate-900 hover:bg-white rounded-xl transition-all duration-200 font-medium"
            :disabled="currentIndex === filteredPlantas.length - 1"
            :class="{ 'opacity-50 cursor-not-allowed': currentIndex === filteredPlantas.length - 1 }"
          >
            Próxima
            <svg class="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- ⭐ MODAL DE MARCADOR COM Z-INDEX SUPERIOR -->
    <div 
      v-if="marcadorModal.visible" 
      class="fixed inset-0 bg-black/60 backdrop-blur-sm z-[110] flex items-center justify-center p-4"
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
            <label for="marcador-texto" class="block text-sm font-medium text-slate-700 mb-2">
              Texto do marcador *
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
            <label for="marcador-url" class="block text-sm font-medium text-slate-700 mb-2">
              URL de destino (opcional)
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
              Use URLs internas (/equipamentos/123) ou externas (https://...). Deixe vazio para não adicionar link.
            </p>
          </div>
          
          <!-- Seletor de Cor -->
          <div>
            <label class="block text-sm font-medium text-slate-700 mb-3">Cor do marcador</label>
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
        <div class="p-6 bg-slate-50 border-t border-slate-200 flex justify-between">
          <!-- Botão Excluir (apenas quando editando) -->
          <button 
            v-if="marcadorModal.isEdit"
            type="button" 
            class="px-6 py-3 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-all duration-200 font-medium flex items-center"
            @click="deleteMarcador"
          >
            <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
            </svg>
            Excluir
          </button>
          <div v-else></div>
          
          <!-- Botões de Ação -->
          <div class="flex space-x-3">
            <button 
              type="button" 
              class="px-6 py-3 border border-slate-300 rounded-xl text-slate-700 hover:bg-slate-50 transition-all duration-200 font-medium"
              @click="closeMarcadorModal"
            >
              Cancelar
            </button>
            <button
              type="button" 
              class="px-6 py-3 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 transition-all duration-200 font-medium flex items-center"
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
  </div>
</template>

<script setup>
import { ref, computed, onMounted, reactive, nextTick } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

// Estado para armazenar as plantas
const plantas = ref([]);
const searchQuery = ref('');
const lightboxVisible = ref(false);
const currentIndex = ref(0);
const activeTooltip = ref(null);
const modoMarcacao = ref(false);
const imageContainer = ref(null);
const plantaImage = ref(null);

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

// Plantas filtradas com base na busca
const filteredPlantas = computed(() => {
  if (!searchQuery.value) return plantas.value;
  
  const query = searchQuery.value.toLowerCase();
  return plantas.value.filter(planta => 
    planta.titulo.toLowerCase().includes(query) || 
    planta.descricao.toLowerCase().includes(query)
  );
});

// Planta atual no lightbox
const currentPlanta = computed(() => {
  if (filteredPlantas.value.length === 0) return null;
  const planta = filteredPlantas.value[currentIndex.value];
  // Garantir que marcadores existe
  if (!planta.marcadores) {
    planta.marcadores = [];
  }
  return planta;
});

// ⭐ FUNÇÃO CORRIGIDA DE CLICK NA IMAGEM
const handleImageClick = (event) => {
  if (!modoMarcacao.value || !plantaImage.value || !currentPlanta.value) return;
  
  // Obter as dimensões e posição da imagem
  const imgRect = plantaImage.value.getBoundingClientRect();
  
  // Calcular posição relativa à imagem (0-100%)
  const x = ((event.clientX - imgRect.left) / imgRect.width) * 100;
  const y = ((event.clientY - imgRect.top) / imgRect.height) * 100;
  
  // Garantir que os valores estejam dentro dos limites
  const posX = Math.max(0, Math.min(100, x));
  const posY = Math.max(0, Math.min(100, y));
  
  console.log('Click position:', { x: posX, y: posY }); // Debug
  
  // Abrir modal de marcador
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

// Função chamada quando a imagem carrega
const onImageLoad = () => {
  // Aguardar próximo ciclo do DOM para garantir que as dimensões estão corretas
  nextTick(() => {
    console.log('Image loaded, dimensions:', {
      width: plantaImage.value?.offsetWidth,
      height: plantaImage.value?.offsetHeight
    });
  });
};

// Carregar plantas do localStorage
const loadPlantas = () => {
  try {
    const savedPlantas = localStorage.getItem('plantas');
    if (savedPlantas) {
      const parsedPlantas = JSON.parse(savedPlantas);
      // Garantir que cada planta tem array de marcadores
      plantas.value = parsedPlantas.map(planta => ({
        ...planta,
        marcadores: planta.marcadores || []
      }));
    }
  } catch (error) {
    console.error('Erro ao carregar plantas:', error);
  }
};

// Abrir lightbox em modo normal
const openLightbox = (index) => {
  currentIndex.value = index;
  lightboxVisible.value = true;
  modoMarcacao.value = false;
  document.body.style.overflow = 'hidden';
};

// Abrir lightbox com modo de marcação ativo
const openWithMarkerMode = (index) => {
  currentIndex.value = index;
  lightboxVisible.value = true;
  modoMarcacao.value = true;
  document.body.style.overflow = 'hidden';
};

// Fechar lightbox
const closeLightbox = () => {
  lightboxVisible.value = false;
  document.body.style.overflow = '';
  modoMarcacao.value = false;
  activeTooltip.value = null;
};

// Navegar entre imagens no lightbox
const navigateImage = (direction) => {
  const newIndex = currentIndex.value + direction;
  if (newIndex >= 0 && newIndex < filteredPlantas.value.length) {
    currentIndex.value = newIndex;
    activeTooltip.value = null;
  }
};

// Formatar data
const formatDate = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('pt-BR').format(date);
};

// Alternar modo de marcação
const toggleMarcacaoMode = () => {
  modoMarcacao.value = !modoMarcacao.value;
  if (!modoMarcacao.value) {
    activeTooltip.value = null;
  }
};

// Abrir modal para edição de marcador existente
const openMarkerEditModal = (marcadorId) => {
  if (!currentPlanta.value) return;
  
  const index = currentPlanta.value.marcadores.findIndex(m => m.id === marcadorId);
  if (index === -1) return;
  
  const marcador = currentPlanta.value.marcadores[index];
  
  marcadorModal.isEdit = true;
  marcadorModal.index = index;
  marcadorModal.texto = marcador.texto;
  marcadorModal.url = marcador.url || '';
  marcadorModal.cor = marcador.cor || '#ef4444';
  marcadorModal.posicaoX = marcador.posicaoX;
  marcadorModal.posicaoY = marcador.posicaoY;
  marcadorModal.errors.texto = '';
  marcadorModal.visible = true;
  
  // Fechar tooltip
  activeTooltip.value = null;
};

// Fechar modal de marcador
const closeMarcadorModal = () => {
  marcadorModal.visible = false;
  marcadorModal.errors.texto = '';
};

// Confirmar exclusão da planta completa
const confirmarExclusaoPlanta = () => {
  if (!currentPlanta.value) return;
  
  if (confirm(`Tem certeza que deseja excluir a planta "${currentPlanta.value.titulo}"? Esta ação não pode ser desfeita.`)) {
    excluirPlanta();
  }
};

// Excluir planta completa
const excluirPlanta = () => {
  if (!currentPlanta.value) return;
  
  try {
    const todasPlantas = JSON.parse(localStorage.getItem('plantas') || '[]');
    const index = todasPlantas.findIndex(p => p.id === currentPlanta.value.id);
    
    if (index !== -1) {
      todasPlantas.splice(index, 1);
      localStorage.setItem('plantas', JSON.stringify(todasPlantas));
      plantas.value = todasPlantas;
      closeLightbox();
    }
  } catch (error) {
    console.error('Erro ao excluir planta:', error);
  }
};

// Excluir marcador
const deleteMarcador = () => {
  if (!currentPlanta.value || marcadorModal.index < 0) return;
  
  if (confirm('Tem certeza que deseja excluir este marcador?')) {
    const plantaAtualizada = JSON.parse(JSON.stringify(currentPlanta.value));
    plantaAtualizada.marcadores.splice(marcadorModal.index, 1);
    atualizarPlantaNoStorage(plantaAtualizada);
    closeMarcadorModal();
  }
};

// Salvar marcador
const saveMarcador = () => {
  if (!currentPlanta.value) return;
  
  marcadorModal.errors.texto = '';
  
  if (!marcadorModal.texto.trim()) {
    marcadorModal.errors.texto = 'O texto do marcador é obrigatório';
    return;
  }
  
  const novoMarcador = {
    id: marcadorModal.isEdit ? currentPlanta.value.marcadores[marcadorModal.index].id : Date.now().toString(),
    texto: marcadorModal.texto.trim(),
    url: marcadorModal.url.trim(),
    cor: marcadorModal.cor,
    posicaoX: marcadorModal.posicaoX,
    posicaoY: marcadorModal.posicaoY
  };
  
  console.log('Saving marker:', novoMarcador); // Debug
  
  const plantaAtualizada = JSON.parse(JSON.stringify(currentPlanta.value));
  
  if (marcadorModal.isEdit) {
    plantaAtualizada.marcadores[marcadorModal.index] = novoMarcador;
  } else {
    plantaAtualizada.marcadores.push(novoMarcador);
  }
  
  atualizarPlantaNoStorage(plantaAtualizada);
  closeMarcadorModal();
  modoMarcacao.value = false;
};

// Atualizar planta no localStorage
const atualizarPlantaNoStorage = (plantaAtualizada) => {
  try {
    const todasPlantas = JSON.parse(localStorage.getItem('plantas') || '[]');
    const index = todasPlantas.findIndex(p => p.id === plantaAtualizada.id);
    
    if (index !== -1) {
      todasPlantas[index] = plantaAtualizada;
      localStorage.setItem('plantas', JSON.stringify(todasPlantas));
      plantas.value = todasPlantas;
      console.log('Plant updated successfully'); // Debug
    }
  } catch (error) {
    console.error('Erro ao atualizar planta:', error);
  }
};

// Inicializar componente
onMounted(() => {
  loadPlantas();
  
  const handleKeyDown = (e) => {
    if (!lightboxVisible.value) return;
    
    if (e.key === 'Escape') {
      if (marcadorModal.visible) {
        closeMarcadorModal();
      } else if (modoMarcacao.value) {
        modoMarcacao.value = false;
      } else {
        closeLightbox();
      }
    } else if (e.key === 'ArrowLeft' && !marcadorModal.visible) {
      navigateImage(-1);
    } else if (e.key === 'ArrowRight' && !marcadorModal.visible) {
      navigateImage(1);
    }
  };
  
  window.addEventListener('keydown', handleKeyDown);
  
  return () => {
    window.removeEventListener('keydown', handleKeyDown);
  };
});
</script>

<style scoped>
.backdrop-blur-xl {
  backdrop-filter: blur(24px);
}

.backdrop-blur-sm {
  backdrop-filter: blur(8px);
}

.line-clamp-2 {
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  line-clamp: 2;
}

.aspect-video {
  aspect-ratio: 16 / 9;
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
</style>