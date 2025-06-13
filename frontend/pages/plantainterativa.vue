<!-- filepath: d:\PROJETO\frontend\pages\plantainterativa.vue -->
<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
    <!-- Header Moderno com Gradiente -->
    <div class="bg-white/80 backdrop-blur-xl border-b border-white/20 shadow-lg sticky top-0 z-40">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
        <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div class="flex items-center space-x-4">
            <div class="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
              <svg class="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2-2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
              </svg>
            </div>
            <div>
              <h1 class="text-xl sm:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
                Plantas Interativas
              </h1>
              <p class="text-slate-600 text-xs sm:text-sm">
                Gerencie suas plantas baixas e adicione marcadores interativos
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
      <!-- Filtros e Ações Modernas -->
      <div class="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-4 sm:p-6 mb-6 sm:mb-8">
        <div class="flex flex-col lg:flex-row gap-4 justify-between items-start lg:items-center">
          <!-- Busca responsiva -->
          <div class="flex-1 w-full lg:max-w-md">
            <label for="search" class="block text-sm font-medium text-slate-700 mb-2">Buscar plantas</label>
            <div class="relative">
              <svg class="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
              <input 
                id="search" 
                v-model="searchQuery" 
                type="text" 
                placeholder="Buscar plantas..." 
                class="w-full pl-10 pr-4 py-3 bg-white border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm transition-all"
              />
            </div>
          </div>
          
          <!-- Botões de Ação responsivos -->
          <div class="flex flex-col sm:flex-row w-full lg:w-auto gap-3">
            <NuxtLink 
              to="/novaplanta" 
              class="inline-flex items-center justify-center px-4 sm:px-6 py-3 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white rounded-xl hover:from-emerald-700 hover:to-emerald-800 transition-all duration-200 font-medium shadow-lg hover:shadow-xl transform hover:scale-105 text-sm"
            >
              <svg class="w-4 h-4 sm:w-5 sm:h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
              </svg>
              Nova Planta
            </NuxtLink>
          </div>
        </div>
      </div>

      <!-- Estado Vazio Melhorado -->
      <div v-if="filteredPlantas.length === 0" class="text-center py-12 sm:py-20">
        <div class="mx-auto w-16 h-16 sm:w-20 sm:h-20 bg-slate-100 rounded-full flex items-center justify-center mb-6">
          <svg class="w-8 h-8 sm:w-10 sm:h-10 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2-2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
          </svg>
        </div>

        <h3 class="text-xl sm:text-2xl font-bold text-slate-900 mb-2">Nenhuma planta encontrada</h3>
        <p class="text-slate-500 mb-6 max-w-md mx-auto text-sm sm:text-base px-4">
          {{ searchQuery ? 'Nenhuma planta corresponde à sua busca.' : 'Comece criando sua primeira planta interativa com marcadores personalizados.' }}
        </p>
        
        <NuxtLink 
          to="/novaplanta" 
          class="inline-flex items-center px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl hover:from-emerald-700 hover:to-teal-700 transition-all duration-200 font-medium shadow-lg hover:shadow-xl transform hover:scale-105 text-sm sm:text-base"
        >
          <svg class="w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
          </svg>
          Criar Primeira Planta
        </NuxtLink>
      </div>

      <!-- ✅ GRID RESPONSIVO MELHORADO -->
      <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
        <div 
          v-for="(planta, index) in filteredPlantas" 
          :key="planta.id"
          @click="openLightbox(index)"
          class="group bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 overflow-hidden hover:shadow-2xl hover:scale-105 transition-all duration-300 cursor-pointer"
        >
          <!-- ✅ CONTAINER DE IMAGEM RESPONSIVO CORRIGIDO -->
          <div class="relative w-full h-48 sm:h-56 bg-slate-100 overflow-hidden">
            <img 
              :src="getImageUrl(planta)" 
              :alt="planta.titulo"
              class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              loading="lazy"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div class="absolute bottom-4 left-4 right-4">
                <div class="flex items-center justify-between text-white">
                  <div class="flex items-center space-x-2">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                    </svg>
                    <span class="text-sm font-medium">{{ planta.marcadores?.length || 0 }} marcadores</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <!-- ✅ CONTEÚDO DO CARD MELHORADO -->
          <div class="p-4 sm:p-6">
            <h3 class="text-lg sm:text-xl font-bold text-slate-900 mb-2 line-clamp-2">{{ planta.titulo }}</h3>
            <p v-if="planta.descricao" class="text-slate-600 text-sm mb-4 line-clamp-2">{{ planta.descricao }}</p>
            <div class="flex items-center justify-between text-xs sm:text-sm text-slate-500">
              <span>{{ formatDate(planta.createdAt) }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- ⭐ LIGHTBOX RESPONSIVO CORRIGIDO -->
    <div 
      v-if="lightboxVisible" 
      class="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100] flex items-center justify-center p-2 sm:p-4"
      @click="closeLightbox"
    >
      <div 
        class="max-w-7xl w-full h-full sm:h-[95vh] sm:w-[95vw] bg-white rounded-none sm:rounded-2xl overflow-hidden shadow-2xl flex flex-col"
        @click.stop
      >
        <!-- Header do Lightbox responsivo -->
        <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 sm:p-6 bg-gradient-to-r from-slate-50 to-slate-100 border-b border-slate-200 gap-4">
          <div class="flex-1 min-w-0">
            <h3 class="text-lg sm:text-xl font-bold text-slate-900 truncate">{{ currentPlanta?.titulo }}</h3>
            <p class="text-sm text-slate-600 line-clamp-2">{{ currentPlanta?.descricao }}</p>
          </div>
          
          <div class="flex items-center space-x-2 sm:space-x-3 flex-shrink-0">
            <!-- Toggle Modo Marcação -->
            <button 
              @click="toggleMarcacaoMode" 
              class="px-3 sm:px-4 py-2 text-xs sm:text-sm rounded-xl font-medium transition-all duration-200 flex items-center"
              :class="modoMarcacao 
                ? 'bg-blue-100 text-blue-700 ring-2 ring-blue-200' 
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'"
            >
              <svg class="w-4 h-4 mr-1 sm:mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path>
              </svg>
              <span class="hidden sm:inline">{{ modoMarcacao ? 'Cancelar marcação' : 'Adicionar marcador' }}</span>
              <span class="sm:hidden">{{ modoMarcacao ? 'Cancelar' : 'Marcador' }}</span>
            </button>
            
            <!-- Botão Excluir Planta -->
            <button 
              @click="confirmarExclusaoPlanta" 
              class="px-3 sm:px-4 py-2 text-xs sm:text-sm rounded-xl font-medium bg-red-50 text-red-700 hover:bg-red-100 transition-all duration-200 flex items-center"
            >
              <svg class="w-4 h-4 mr-1 sm:mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
              </svg>
              <span class="hidden sm:inline">Excluir planta</span>
              <span class="sm:hidden">Excluir</span>
            </button>
            
            <!-- Botão Fechar -->
            <button 
              @click="closeLightbox" 
              class="p-2 text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-xl transition-colors"
            >
              <svg class="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>
        </div>

        <!-- ⭐ CONTAINER DA IMAGEM RESPONSIVO CORRIGIDO -->
        <div class="flex-1 overflow-auto bg-slate-50 relative">
          <div 
            class="relative w-full h-full flex items-center justify-center p-2 sm:p-4"
            :class="{ 'cursor-crosshair': modoMarcacao }"
            ref="imageContainer"
          >
            <!-- ⭐ IMAGEM RESPONSIVA CORRIGIDA -->
            <div class="relative max-w-full max-h-full">
              <img 
                :src="getImageUrl(currentPlanta)" 
                :alt="currentPlanta?.titulo" 
                class="max-w-full max-h-full w-auto h-auto object-contain"
                ref="plantaImage"
                @click="handleImageClick"
                @load="onImageLoad"
                style="display: block;"
              />
              
              <!-- ⭐ MARCADORES RESPONSIVOS COM LINK DIRETO -->
              <div 
                v-for="marcador in currentPlanta?.marcadores" 
                :key="marcador.id"
                class="absolute w-6 h-6 sm:w-8 sm:h-8 rounded-full border-2 border-white transform -translate-x-1/2 -translate-y-1/2 z-10 transition-all duration-200 cursor-pointer flex items-center justify-center text-white font-bold shadow-lg hover:scale-125 text-xs sm:text-sm"
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
                
                <!-- ⭐ TOOLTIP INTERATIVO COM POSICIONAMENTO INTELIGENTE -->
                <div 
                  v-if="activeTooltip === marcador.id"
                  class="absolute bg-white rounded-xl shadow-2xl border border-slate-200 z-20 min-w-max max-w-xs overflow-hidden"
                  :class="getTooltipClasses(marcador)"
                  :style="getTooltipPosition(marcador)"
                  @mouseenter="activeTooltip = marcador.id"
                  @mouseleave="activeTooltip = null"
                >
                  <!-- Conteúdo do Tooltip -->
                  <div class="p-3 sm:p-4">
                    <!-- Título do Marcador -->
                    <div class="font-semibold text-slate-900 text-sm sm:text-base mb-2">
                      {{ marcador.texto }}
                    </div>
                    
                    <!-- Link Clicável (se existir) -->
                    <div v-if="marcador.url && marcador.url.trim()" class="space-y-2">
                      <a 
                        :href="formatUrl(marcador.url.trim())"
                        target="_blank"
                        rel="noopener noreferrer"
                        class="inline-flex items-center px-3 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white text-xs sm:text-sm font-medium rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105"
                        @click.stop
                      >
                        <svg class="w-3 h-3 sm:w-4 sm:h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
                        </svg>
                        Acessar Link
                      </a>
                      
                      <!-- URL de Referência -->
                      <div class="text-xs text-slate-500 break-all">
                        {{ formatUrlDisplay(marcador.url.trim()) }}
                      </div>
                    </div>
                    
                    <!-- Sem Link -->
                    <div v-else class="text-xs text-slate-500">
                      Nenhum link anexado
                    </div>
                  </div>
                  
                  <!-- Ações do Tooltip -->
                  <div class="border-t border-slate-100 px-3 py-2 bg-slate-50 flex items-center justify-between">
                    <button 
                      @click.stop="openMarkerEditModal(marcador.id)"
                      class="inline-flex items-center text-xs text-slate-600 hover:text-slate-900 font-medium transition-colors"
                    >
                      <svg class="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                      </svg>
                      Editar
                    </button>
                    
                    <div class="text-xs text-slate-400">
                      Clique para editar
                    </div>
                  </div>
                  
                  <!-- ⭐ SETA DINÂMICA -->
                  <div 
                    class="absolute w-4 h-4 bg-white border-slate-200 rotate-45"
                    :class="getArrowClasses(marcador)"
                  ></div>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Instruções para Marcação responsivas -->
          <div v-if="modoMarcacao" class="absolute top-2 sm:top-4 left-2 sm:left-4 z-30">
            <div class="bg-blue-600 text-white px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-medium shadow-lg flex items-center">
              <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              <span class="hidden sm:inline">Clique na imagem para adicionar um marcador</span>
              <span class="sm:hidden">Clique para marcar</span>
            </div>
          </div>
        </div>

        <!-- Controles de Navegação responsivos -->
        <div class="flex justify-between items-center p-3 sm:p-4 bg-slate-50 border-t border-slate-200">
          <button 
            @click.stop="navigateImage(-1)" 
            class="flex items-center px-3 sm:px-4 py-2 text-slate-600 hover:text-slate-900 hover:bg-white rounded-xl transition-all duration-200 font-medium text-sm"
            :disabled="currentIndex === 0"
            :class="{ 'opacity-50 cursor-not-allowed': currentIndex === 0 }"
          >
            <svg class="w-4 h-4 sm:w-5 sm:h-5 mr-1 sm:mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
            </svg>
            <span class="hidden sm:inline">Anterior</span>
          </button>
          
          <div class="flex items-center space-x-2 sm:space-x-4">
            <div class="text-xs sm:text-sm text-slate-600 font-medium">
              {{ currentIndex + 1 }} de {{ filteredPlantas.length }}
            </div>
            
            <!-- Indicadores de Navegação responsivos -->
            <div class="flex space-x-1">
              <div 
                v-for="(planta, index) in filteredPlantas.slice(Math.max(0, currentIndex - 2), currentIndex + 3)" 
                :key="planta.id"
                class="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full transition-colors"
                :class="index + Math.max(0, currentIndex - 2) === currentIndex ? 'bg-emerald-600' : 'bg-slate-300'"
              ></div>
            </div>
          </div>
          
          <button 
            @click.stop="navigateImage(1)" 
            class="flex items-center px-3 sm:px-4 py-2 text-slate-600 hover:text-slate-900 hover:bg-white rounded-xl transition-all duration-200 font-medium text-sm"
            :disabled="currentIndex === filteredPlantas.length - 1"
            :class="{ 'opacity-50 cursor-not-allowed': currentIndex === filteredPlantas.length - 1 }"
          >
            <span class="hidden sm:inline">Próxima</span>
            <svg class="w-4 h-4 sm:w-5 sm:h-5 ml-1 sm:ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- ⭐ MODAL DE MARCADOR -->
    <div 
      v-if="marcadorModal.visible"
      class="fixed inset-0 bg-black/50 backdrop-blur-sm z-[200] flex items-center justify-center p-4"
      @click="closeMarcadorModal"
    >
      <div 
        class="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden"
        @click.stop
      >
        <!-- Header do Modal -->
        <div class="bg-gradient-to-r from-blue-50 to-indigo-50 px-6 py-4 border-b border-slate-200">
          <h3 class="text-lg font-bold text-slate-900">
            {{ marcadorModal.isEdit ? 'Editar Marcador' : 'Novo Marcador' }}
          </h3>
        </div>
        
        <!-- Formulário -->
        <div class="p-6 space-y-6">
          <!-- Campo Texto -->
          <div>
            <label class="block text-sm font-medium text-slate-700 mb-2">
              Texto do Marcador *
            </label>
            <input 
              v-model="marcadorModal.texto"
              type="text" 
              placeholder="Digite o texto do marcador..."
              class="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              :class="{ 'border-red-300 focus:ring-red-500': marcadorModal.errors.texto }"
            />
            <p v-if="marcadorModal.errors.texto" class="text-red-600 text-sm mt-1">
              {{ marcadorModal.errors.texto }}
            </p>
          </div>
          
          <!-- Campo URL -->
          <div>
            <label class="block text-sm font-medium text-slate-700 mb-2">
              Link (opcional)
            </label>
            <input 
              v-model="marcadorModal.url"
              type="text" 
              placeholder="https://exemplo.com ou email@exemplo.com"
              class="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
          </div>
          
          <!-- Seleção de Cor -->
          <div>
            <label class="block text-sm font-medium text-slate-700 mb-3">
              Cor do Marcador
            </label>
            <div class="grid grid-cols-4 gap-3">
              <button 
                v-for="cor in coresMarcadores" 
                :key="cor.value"
                @click="marcadorModal.cor = cor.value"
                class="w-12 h-12 rounded-xl border-2 transition-all duration-200 hover:scale-110"
                :style="{ backgroundColor: cor.value }"
                :class="marcadorModal.cor === cor.value ? 'border-slate-400 ring-2 ring-slate-300' : 'border-slate-200'"
                :title="cor.name"
              ></button>
            </div>
          </div>
        </div>
        
        <!-- Ações do Modal -->
        <div class="bg-slate-50 px-6 py-4 flex items-center justify-between border-t border-slate-200">
          <div class="flex space-x-3">
            <button 
              @click="closeMarcadorModal"
              class="px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-xl hover:bg-slate-50 transition-colors"
            >
              Cancelar
            </button>
            
            <button 
              @click="saveMarcador"
              class="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-xl hover:bg-blue-700 transition-colors"
            >
              {{ marcadorModal.isEdit ? 'Atualizar' : 'Adicionar' }}
            </button>
          </div>
          
          <button 
            v-if="marcadorModal.isEdit"
            @click="deleteMarcador"
            class="px-4 py-2 text-sm font-medium text-red-600 bg-red-50 rounded-xl hover:bg-red-100 transition-colors"
          >
            Excluir
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, reactive, nextTick } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '~/stores/auth';

const router = useRouter();
const authStore = useAuthStore();

// ✅ ADICIONAR VARIÁVEL LOADING QUE ESTAVA FALTANDO
const loading = ref(false);
const plantas = ref([]);
const selectedPlanta = ref(null);
const showModal = ref(false);

// Estados do modal
const modalState = reactive({
  visible: false,
  tipo: '', // 'visualizar', 'editar', 'excluir'
});

// Estado para armazenar as plantas
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
  { name: 'Cinza', value: '#6b7280' },
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
    (planta.descricao && planta.descricao.toLowerCase().includes(query))
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

// ✅ CARREGAR PLANTAS DA API (mantendo a lógica da versão antiga)
const loadPlantas = async () => {
  try {
    loading.value = true;
    
    const response = await $fetch('http://localhost:3001/api/plantas', {
      headers: {
        'Authorization': `Bearer ${authStore.token}`
      }
    });
    
    if (response.success) {
      // ✅ GARANTIR QUE MARCADORES EXISTAM (lógica da versão antiga)
      plantas.value = (response.data || []).map(planta => ({
        ...planta,
        marcadores: planta.marcadores || []
      }));
      console.log('✅ Plantas carregadas:', plantas.value.length);
    } else {
      plantas.value = [];
    }
    
  } catch (error) {
    console.error('❌ Erro ao carregar plantas:', error);
    plantas.value = [];
  } finally {
    loading.value = false;
  }
};

// ✅ ADICIONAR MARCADOR VIA API (mantendo lógica da versão antiga)
const adicionarMarcadorAPI = async (plantaId, marcadorData) => {
  try {
    const response = await $fetch(`http://localhost:3001/api/plantas/${plantaId}/marcadores`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${authStore.token}`,
        'Content-Type': 'application/json'
      },
      body: marcadorData
    });

    if (response.success) {
      await loadPlantas(); // Recarregar lista
      return response.data;
    }
  } catch (error) {
    console.error('Erro ao adicionar marcador:', error);
    throw error;
  }
};

// ✅ ATUALIZAR MARCADOR VIA API
const atualizarMarcadorAPI = async (marcadorId, marcadorData) => {
  try {
    const response = await $fetch(`http://localhost:3001/api/plantas/marcadores/${marcadorId}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${authStore.token}`,
        'Content-Type': 'application/json'
      },
      body: marcadorData
    });

    if (response.success) {
      await loadPlantas();
      return response.data;
    }
  } catch (error) {
    console.error('Erro ao atualizar marcador:', error);
    throw error;
  }
};

// ✅ EXCLUIR MARCADOR VIA API
const excluirMarcadorAPI = async (marcadorId) => {
  try {
    const response = await $fetch(`http://localhost:3001/api/plantas/marcadores/${marcadorId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${authStore.token}`
      }
    });

    if (response.success) {
      await loadPlantas();
      return true;
    }
  } catch (error) {
    console.error('Erro ao excluir marcador:', error);
    throw error;
  }
};

// ✅ EXCLUIR PLANTA VIA API
const excluirPlantaAPI = async (plantaId) => {
  try {
    const response = await $fetch(`http://localhost:3001/api/plantas/${plantaId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${authStore.token}`
      }
    });

    if (response.success) {
      await loadPlantas();
      return true;
    }
  } catch (error) {
    console.error('Erro ao excluir planta:', error);
    throw error;
  }
};

// ⭐ FUNÇÃO CORRIGIDA DE CLICK NA IMAGEM
const handleImageClick = async (event) => {
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
  marcadorModal.marcadorId = marcador.id;
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
const confirmarExclusaoPlanta = async () => {
  if (!currentPlanta.value) return;
  
  if (confirm(`Tem certeza que deseja excluir a planta "${currentPlanta.value.titulo}"? Esta ação não pode ser desfeita.`)) {
    try {
      await excluirPlantaAPI(currentPlanta.value.id);
      closeLightbox();
    } catch (error) {
      alert('Erro ao excluir planta. Tente novamente.');
    }
  }
};

// Excluir marcador
const deleteMarcador = async () => {
  if (!currentPlanta.value || !marcadorModal.marcadorId) return;
  
  if (confirm('Tem certeza que deseja excluir este marcador?')) {
    try {
      await excluirMarcadorAPI(marcadorModal.marcadorId);
      closeMarcadorModal();
    } catch (error) {
      alert('Erro ao excluir marcador. Tente novamente.');
    }
  }
};

// Salvar marcador
const saveMarcador = async () => {
  if (!currentPlanta.value) return;
  
  marcadorModal.errors.texto = '';
  
  if (!marcadorModal.texto.trim()) {
    marcadorModal.errors.texto = 'O texto do marcador é obrigatório';
    return;
  }
  
  const marcadorData = {
    texto: marcadorModal.texto.trim(),
    url: marcadorModal.url.trim(),
    cor: marcadorModal.cor,
    posicaoX: marcadorModal.posicaoX,
    posicaoY: marcadorModal.posicaoY
  };
  
  try {
    if (marcadorModal.isEdit) {
      await atualizarMarcadorAPI(marcadorModal.marcadorId, marcadorData);
    } else {
      await adicionarMarcadorAPI(currentPlanta.value.id, marcadorData);
    }
    
    closeMarcadorModal();
    modoMarcacao.value = false;
  } catch (error) {
    alert('Erro ao salvar marcador. Tente novamente.');
  }
};

// Função para obter a URL da imagem da planta
const getImageUrl = (planta) => {
  if (!planta?.imageUrl) return '/placeholder.jpg';
  
  // ✅ GARANTIR QUE USA PORTA 3001 (BACKEND)
  if (planta.imageUrl.startsWith('/uploads/')) {
    return `http://localhost:3001${planta.imageUrl}`;
  }
  
  return planta.imageUrl;
};

// ✅ FUNÇÃO PARA FORMATAR URL (garantir protocolo)
const formatUrl = (url) => {
  if (!url) return '#';
  
  // Se já tem protocolo, retorna como está
  if (url.startsWith('http://') || url.startsWith('https://')) {
    return url;
  }
  
  // Se parece com email
  if (url.includes('@') && !url.includes('://')) {
    return `mailto:${url}`;
  }
  
  // Se parece com telefone
  if (url.match(/^[\d\s\-\(\)\+]+$/)) {
    return `tel:${url.replace(/\s/g, '')}`;
  }
  
  // Caso contrário, adiciona https://
  return `https://${url}`;
};

// ✅ FUNÇÃO PARA EXIBIR URL DE FORMA AMIGÁVEL
const formatUrlDisplay = (url) => {
  if (!url) return '';
  
  // Se é email
  if (url.includes('@') && !url.includes('://')) {
    return url;
  }
  
  // Se é telefone
  if (url.match(/^[\d\s\-\(\)\+]+$/)) {
    return url;
  }
  
  // Se é URL
  let displayUrl = url;
  
  // Remove protocolo para exibição
  displayUrl = displayUrl.replace(/^https?:\/\//, '');
  displayUrl = displayUrl.replace(/^www\./, '');
  
  // Limita o tamanho
  if (displayUrl.length > 40) {
    displayUrl = displayUrl.substring(0, 37) + '...';
  }
  
  return displayUrl;
};

// ✅ FUNÇÃO PARA CALCULAR POSIÇÃO DO TOOLTIP
const getTooltipPosition = (marcador) => {
  const posX = marcador.posicaoX;
  const posY = marcador.posicaoY;
  
  // Definir posição baseada na localização do marcador
  let styles = {};
  
  // Se está na metade superior da imagem
  if (posY < 50) {
    // Mostra tooltip abaixo
    styles.top = '100%';
    styles.marginTop = '8px';
  } else {
    // Mostra tooltip acima  
    styles.bottom = '100%';
    styles.marginBottom = '8px';
  }
  
  // Se está na metade esquerda da imagem
  if (posX < 50) {
    // Alinha à esquerda
    styles.left = '0';
    styles.transform = 'translateX(0)';
  } else {
    // Alinha à direita
    styles.right = '0';
    styles.transform = 'translateX(0)';
  }
  
  return styles;
};

// ✅ FUNÇÃO PARA CLASSES DO TOOLTIP
const getTooltipClasses = (marcador) => {
  return 'w-64 sm:w-72'; // Largura fixa responsiva
};

// ✅ FUNÇÃO PARA POSIÇÃO DA SETA
const getArrowClasses = (marcador) => {
  const posX = marcador.posicaoX;
  const posY = marcador.posicaoY;
  
  let classes = [];
  
  // Posição vertical da seta
  if (posY < 50) {
    // Tooltip está abaixo, seta vai no topo
    classes.push('-top-2');
  } else {
    // Tooltip está acima, seta vai embaixo
    classes.push('-bottom-2', 'border-t', 'border-l');
  }
  
  // Posição horizontal da seta
  if (posX < 50) {
    // Tooltip alinhado à esquerda, seta no lado esquerdo
    classes.push('left-4');
  } else {
    // Tooltip alinhado à direita, seta no lado direito
    classes.push('right-4');
  }
  
  // Bordas da seta baseadas na posição
  if (posY >= 50) {
    classes.push('border-r', 'border-b');
  }
  
  return classes.join(' ');
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

/* ✅ ESTILOS RESPONSIVOS MELHORADOS */
@media (max-width: 640px) {
  .aspect-video {
    aspect-ratio: 4 / 3;
  }
}

@media (min-width: 640px) {
  .aspect-video {
    aspect-ratio: 16 / 9;
  }
}

/* Scrollbar personalizada */
::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}

@media (min-width: 640px) {
  ::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }
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