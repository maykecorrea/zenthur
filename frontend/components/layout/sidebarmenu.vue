<template>
  <div 
    class="relative h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 backdrop-blur-sm transition-all duration-500 ease-in-out z-30 shadow-2xl"
    :class="[isExpanded ? 'w-72' : 'w-20']"
  >
    <!-- Glass effect overlay -->
    <div class="absolute inset-0 bg-gradient-to-br from-white/5 via-white/10 to-transparent backdrop-blur-xl"></div>
    
    <!-- Container principal do sidebar -->
    <div class="relative flex flex-col h-full overflow-hidden">
      
      <!-- Botão para expandir/minimizar - REDESIGNED -->
      <button 
        @click="toggleSidebar" 
        class="absolute -right-4 top-8 bg-gradient-to-r from-blue-600 to-indigo-600 border-2 border-white/20 rounded-full p-2 shadow-2xl z-50 hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-4 focus:ring-blue-500/50 transition-all duration-300 transform hover:scale-110 backdrop-blur-sm"
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          class="h-5 w-5 text-white transition-transform duration-500" 
          :class="{ 'rotate-180': !isExpanded }"
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      
      <!-- Cabeçalho com logo - REDESIGNED -->
      <div class="flex justify-center items-center h-20 border-b border-white/10 px-6 relative">
        <div class="transition-all duration-500 overflow-hidden">
          <!-- ⭐ LOGO VISÍVEL APENAS QUANDO EXPANDIDO -->
          <div v-if="isExpanded" class="flex items-center space-x-3">
            <div class="w-12 h-12 bg-gradient-to-br from-blue-500 via-indigo-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-2xl transform hover:scale-105 transition-all duration-300">
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
              </svg>
            </div>
            <div>
              <h1 class="text-xl font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
                ZENTHUR
              </h1>
              <p class="text-xs text-slate-300 opacity-80">Industrial System</p>
            </div>
          </div>
          <!-- ⭐ ÍCONE PEQUENO QUANDO MINIMIZADO -->
          <div 
            v-else 
            class="w-12 h-12 bg-gradient-to-br from-blue-500 via-indigo-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-2xl transform hover:scale-105 transition-all duration-300"
          >
            <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
            </svg>
          </div>
        </div>
      </div>
      
      <!-- Menu de navegação - REDESIGNED -->
      <nav class="flex-1 px-4 py-6 overflow-y-auto custom-scrollbar">
        <div class="space-y-2">
          
          <!-- Dashboard -->
          <NuxtLink to="/dashboard" class="block group">
            <div :class="menuItemClass('/dashboard')" class="menu-item-glass">
              <div class="flex items-center min-w-0">
                <div class="icon-container">
                  <svg class="h-5 w-5 flex-shrink-0" :class="iconClass('/dashboard')" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                </div>
                <span v-if="isExpanded" class="menu-text">Dashboard</span>
              </div>
            </div>
          </NuxtLink>

          <!-- Documentação (Menu cascata) -->
          <div class="block">
            <div 
              @click="toggleDocumentacaoMenu"
              :class="menuItemClass('documentacao', true)"
              class="menu-item-glass group"
            >
              <div class="flex items-center justify-between w-full min-w-0">
                <div class="flex items-center min-w-0">
                  <div class="icon-container">
                    <svg class="h-5 w-5 flex-shrink-0" :class="iconClass('documentacao')" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <span v-if="isExpanded" class="menu-text">Documentação</span>
                </div>
                <div class="dropdown-arrow" v-if="isExpanded">
                  <svg 
                    class="h-4 w-4 flex-shrink-0 transition-transform duration-300" 
                    :class="[isDocumentacaoMenuOpen ? 'rotate-180' : '', isDocumentacaoActive() ? 'text-white' : 'text-slate-400']"
                    xmlns="http://www.w3.org/2000/svg" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>

            <!-- Submenu Documentação -->
            <Transition name="slide-fade">
              <div 
                v-if="isDocumentacaoMenuOpen && isExpanded"
                class="mt-2 ml-6 space-y-1 submenu-container"
              >
                <NuxtLink to="/dashdoc" class="block group">
                  <div :class="submenuItemClass('/dashdoc')" class="submenu-item-glass">
                    <div class="submenu-icon-container">
                      <svg class="h-4 w-4 flex-shrink-0" :class="iconClass('/dashdoc')" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <span class="submenu-text">Dashboard Documentos</span>
                  </div>
                </NuxtLink>
                
                <NuxtLink to="/doc2" class="block group">
                  <div :class="submenuItemClass('/doc2')" class="submenu-item-glass">
                    <div class="submenu-icon-container">
                      <svg class="h-4 w-4 flex-shrink-0" :class="iconClass('/doc2')" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <span class="submenu-text">Criar Documento</span>
                  </div>
                </NuxtLink>
              </div>
            </Transition>
          </div>

          <!-- Equipamentos -->
          <NuxtLink to="/equipamentos" class="block group">
            <div :class="menuItemClass('/equipamentos')" class="menu-item-glass">
              <div class="flex items-center min-w-0">
                <div class="icon-container">
                  <svg class="h-5 w-5 flex-shrink-0" :class="iconClass('/equipamentos')" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <span v-if="isExpanded" class="menu-text">Equipamentos</span>
              </div>
            </div>
          </NuxtLink>

          <!-- Manutenção (Menu cascata) -->
          <div class="block">
            <div 
              @click="toggleManutencaoMenu"
              :class="menuItemClass('manutencao', true)"
              class="menu-item-glass group"
            >
              <div class="flex items-center justify-between w-full min-w-0">
                <div class="flex items-center min-w-0">
                  <div class="icon-container">
                    <svg class="h-5 w-5 flex-shrink-0" :class="iconClass('manutencao')" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a1 1 0 01-1-1V9a1 1 0 011-1h1a2 2 0 100-4H4a1 1 0 01-1-1V5a1 1 0 011-1h3a1 1 0 001-1V4z" />
                    </svg>
                  </div>
                  <span v-if="isExpanded" class="menu-text">Manutenção</span>
                </div>
                <div class="dropdown-arrow" v-if="isExpanded">
                  <svg 
                    class="h-4 w-4 flex-shrink-0 transition-transform duration-300" 
                    :class="[isManutencaoMenuOpen ? 'rotate-180' : '', isManutencaoActive() ? 'text-white' : 'text-slate-400']"
                    xmlns="http://www.w3.org/2000/svg" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>

            <!-- Submenu Manutenção -->
            <Transition name="slide-fade">
              <div 
                v-if="isManutencaoMenuOpen && isExpanded"
                class="mt-2 ml-6 space-y-1 submenu-container"
              >
                <NuxtLink to="/manutencao" class="block group">
                  <div :class="submenuItemClass('/manutencao')" class="submenu-item-glass">
                    <div class="submenu-icon-container">
                      <svg class="h-4 w-4 flex-shrink-0" :class="iconClass('/manutencao')" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <span class="submenu-text">Solicitações e Ordens</span>
                  </div>
                </NuxtLink>
                
                <NuxtLink to="/manupreve" class="block group">
                  <div :class="submenuItemClass('/manupreve')" class="submenu-item-glass">
                    <div class="submenu-icon-container">
                      <svg class="h-4 w-4 flex-shrink-0" :class="iconClass('/manupreve')" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                      </svg>
                    </div>
                    <span class="submenu-text">Manutenção Preventiva</span>
                  </div>
                </NuxtLink>
                
                <NuxtLink to="/novomanu" class="block group">
                  <div :class="submenuItemClass('/novomanu')" class="submenu-item-glass">
                    <div class="submenu-icon-container">
                      <svg class="h-4 w-4 flex-shrink-0" :class="iconClass('/novomanu')" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <span class="submenu-text">Solicitar Manutenção</span>
                  </div>
                </NuxtLink>
              </div>
            </Transition>
          </div>

          <!-- Planta Interativa (Menu cascata) -->
          <div class="block">
            <div 
              @click="togglePlantaMenu"
              :class="menuItemClass('planta', true)"
              class="menu-item-glass group"
            >
              <div class="flex items-center justify-between w-full min-w-0">
                <div class="flex items-center min-w-0">
                  <div class="icon-container">
                    <svg class="h-5 w-5 flex-shrink-0" :class="iconClass('planta')" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                    </svg>
                  </div>
                  <span v-if="isExpanded" class="menu-text">Planta Interativa</span>
                </div>
                <div class="dropdown-arrow" v-if="isExpanded">
                  <svg 
                    class="h-4 w-4 flex-shrink-0 transition-transform duration-300" 
                    :class="[isPlantaMenuOpen ? 'rotate-180' : '', isPlantaActive() ? 'text-white' : 'text-slate-400']"
                    xmlns="http://www.w3.org/2000/svg" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>

            <!-- Submenu Planta -->
            <Transition name="slide-fade">
              <div 
                v-if="isPlantaMenuOpen && isExpanded"
                class="mt-2 ml-6 space-y-1 submenu-container"
              >
                <NuxtLink to="/plantainterativa" class="block group">
                  <div :class="submenuItemClass('/plantainterativa')" class="submenu-item-glass">
                    <div class="submenu-icon-container">
                      <svg class="h-4 w-4 flex-shrink-0" :class="iconClass('/plantainterativa')" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                      </svg>
                    </div>
                    <span class="submenu-text">Visualizar Planta</span>
                  </div>
                </NuxtLink>
                
                <NuxtLink to="/novaplanta" class="block group">
                  <div :class="submenuItemClass('/novaplanta')" class="submenu-item-glass">
                    <div class="submenu-icon-container">
                      <svg class="h-4 w-4 flex-shrink-0" :class="iconClass('/novaplanta')" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <span class="submenu-text">Nova Planta</span>
                  </div>
                </NuxtLink>
              </div>
            </Transition>
          </div>

          <!-- ⭐ MODELO 3D ATUALIZADO COM LINK RELATIVO -->
          <div @click="abrirModelo3D" class="block group cursor-pointer">
            <div :class="menuItemClass('/modelo3d')" class="menu-item-glass">
              <div class="flex items-center min-w-0">
                <div class="icon-container">
                  <svg class="h-5 w-5 flex-shrink-0" :class="iconClass('/modelo3d')" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
                  </svg>
                </div>
                <span v-if="isExpanded" class="menu-text flex items-center">
                  Modelo 3D
                  <svg class="w-3 h-3 ml-2 opacity-60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </span>
              </div>
            </div>
          </div>
        </div>
      </nav>
      
      <!-- Rodapé com logout - REDESIGNED -->
      <div class="px-4 py-4 border-t border-white/10 bg-gradient-to-r from-white/5 to-transparent">
        <button 
          @click="logout"
          :class="[
            'w-full flex items-center px-4 py-3 rounded-xl transition-all duration-300 text-slate-300 hover:bg-red-500/20 hover:text-red-300 group backdrop-blur-sm border border-white/10 hover:border-red-400/30 hover:shadow-lg hover:shadow-red-500/20',
            isExpanded ? 'justify-start' : 'justify-center'
          ]"
        >
          <div class="icon-container">
            <svg class="h-5 w-5 flex-shrink-0 group-hover:text-red-300 transition-colors duration-300" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
          </div>
          <span v-if="isExpanded" class="menu-text font-medium">Sair</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();

// Atualizar para usar a porta correta (8080 ou nova porta se você alterou)
const abrirModelo3D = () => {
  // Use a porta que está funcionando (8080 ou outra que você configurou)
  window.open('https://localhost:8080/index.html', '_blank');
};

// Estados
const isExpanded = ref(true);
const isManutencaoMenuOpen = ref(false);
const isPlantaMenuOpen = ref(false);
const isDocumentacaoMenuOpen = ref(false);

// Classes dinâmicas modernizadas
const menuItemClass = (path, isSubmenu = false) => {
  const baseClass = 'flex items-center px-4 py-3 rounded-xl transition-all duration-300 cursor-pointer group relative overflow-hidden';
  const expandedClass = isExpanded.value ? 'justify-between' : 'justify-center';
  
  if (isSubmenu) {
    const isActiveGroup = 
      (path === 'documentacao' && isDocumentacaoActive()) ||
      (path === 'manutencao' && isManutencaoActive()) ||
      (path === 'planta' && isPlantaActive());
      
    return [
      baseClass,
      expandedClass,
      isActiveGroup
        ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/25 border border-blue-400/30'
        : 'text-slate-300 hover:bg-white/10 hover:text-white border border-transparent hover:border-white/20 hover:shadow-lg hover:shadow-white/10'
    ].join(' ');
  }
  
  return [
    baseClass,
    expandedClass,
    isActive(path)
      ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/25 border border-blue-400/30'
      : 'text-slate-300 hover:bg-white/10 hover:text-white border border-transparent hover:border-white/20 hover:shadow-lg hover:shadow-white/10'
  ].join(' ');
};

const submenuItemClass = (path) => {
  return [
    'flex items-center px-4 py-2.5 rounded-lg transition-all duration-300 border border-transparent backdrop-blur-sm',
    isActive(path)
      ? 'bg-gradient-to-r from-blue-500/30 to-indigo-500/30 text-white font-medium border-blue-400/30 shadow-lg shadow-blue-500/20'
      : 'text-slate-400 hover:bg-white/10 hover:text-white hover:border-white/20'
  ].join(' ');
};

const iconClass = (path) => {
  if (path === 'documentacao' && isDocumentacaoActive()) return 'text-white';
  if (path === 'manutencao' && isManutencaoActive()) return 'text-white';
  if (path === 'planta' && isPlantaActive()) return 'text-white';
  
  return isActive(path) ? 'text-white' : 'text-slate-400 group-hover:text-white';
};

// Funções de toggle (mantidas)
const toggleSidebar = () => {
  isExpanded.value = !isExpanded.value;
  try {
    localStorage.setItem('sidebarExpanded', isExpanded.value.toString());
  } catch (error) {
    console.error('Erro ao salvar preferência:', error);
  }
};

const toggleDocumentacaoMenu = () => {
  if (!isExpanded.value) {
    isExpanded.value = true;
    isDocumentacaoMenuOpen.value = true;
    localStorage.setItem('sidebarExpanded', 'true');
  } else {
    isDocumentacaoMenuOpen.value = !isDocumentacaoMenuOpen.value;
  }
};

const toggleManutencaoMenu = () => {
  if (!isExpanded.value) {
    isExpanded.value = true;
    isManutencaoMenuOpen.value = true;
    localStorage.setItem('sidebarExpanded', 'true');
  } else {
    isManutencaoMenuOpen.value = !isManutencaoMenuOpen.value;
  }
};

const togglePlantaMenu = () => {
  if (!isExpanded.value) {
    isExpanded.value = true;
    isPlantaMenuOpen.value = true;
    localStorage.setItem('sidebarExpanded', 'true');
  } else {
    isPlantaMenuOpen.value = !isPlantaMenuOpen.value;
  }
};

// Funções de verificação (mantidas)
const isActive = (path) => {
  return route.path === path || route.path.startsWith(path + '/');
};

const isManutencaoActive = () => {
  return route.path.startsWith('/manutencao') || 
         route.path.startsWith('/manupreve') || 
         route.path.startsWith('/novomanu');
};

const isPlantaActive = () => {
  return route.path.startsWith('/plantainterativa') || 
         route.path.startsWith('/novaplanta');
};

const isDocumentacaoActive = () => {
  return route.path.startsWith('/doc') || 
         route.path.startsWith('/dashdoc');
};

const logout = () => {
  try {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userData');
    window.location.href = '/';
  } catch (error) {
    console.error('Erro ao fazer logout:', error);
  }
};

// Inicialização
onMounted(() => {
  try {
    const savedState = localStorage.getItem('sidebarExpanded');
    if (savedState !== null) {
      isExpanded.value = savedState === 'true';
    }
    
    // Auto-expandir menus ativos
    if (isManutencaoActive()) isManutencaoMenuOpen.value = true;
    if (isPlantaActive()) isPlantaMenuOpen.value = true;
    if (isDocumentacaoActive()) isDocumentacaoMenuOpen.value = true;
    
  } catch (error) {
    console.error('Erro ao carregar preferências:', error);
  }
});
</script>

<style scoped>
/* ⭐ ESTILOS CORRIGIDOS - SEM DEPENDÊNCIAS CIRCULARES */

/* Glass effects para menu items */
.menu-item-glass {
  @apply backdrop-blur-lg;
}

.menu-item-glass::before {
  content: '';
  @apply absolute inset-0 bg-gradient-to-r from-white/5 to-transparent opacity-0 transition-opacity duration-300 rounded-xl;
}

.menu-item-glass:hover::before {
  @apply opacity-100;
}

.submenu-item-glass {
  @apply backdrop-blur-md;
}

.submenu-container {
  @apply relative;
}

.submenu-container::before {
  content: '';
  @apply absolute left-2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-400/30 via-indigo-400/30 to-transparent;
}

/* Icon containers */
.icon-container {
  @apply w-8 h-8 flex items-center justify-center rounded-lg transition-all duration-300;
}

.submenu-icon-container {
  @apply w-6 h-6 flex items-center justify-center rounded-md transition-all duration-300;
}

.group:hover .icon-container {
  @apply transform scale-110;
}

.group:hover .submenu-icon-container {
  @apply transform scale-105;
}

/* Text styles */
.menu-text {
  @apply ml-3 text-sm font-medium transition-all duration-300;
}

.submenu-text {
  @apply ml-2 text-xs font-medium transition-all duration-300;
}

/* Dropdown arrow */
.dropdown-arrow {
  @apply transition-all duration-300;
}

.group:hover .dropdown-arrow {
  @apply transform scale-110;
}

/* Animações para submenus */
.slide-fade-enter-active {
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.slide-fade-leave-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.slide-fade-enter-from {
  transform: translateY(-20px) scale(0.95);
  opacity: 0;
}

.slide-fade-leave-to {
  transform: translateY(-10px) scale(0.98);
  opacity: 0;
}

/* Scrollbar customizado ultra-moderno */
.custom-scrollbar::-webkit-scrollbar {
  width: 8px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  @apply bg-white/5 rounded-full;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  @apply bg-gradient-to-b from-white/20 to-white/10 rounded-full border-2 border-transparent bg-clip-padding;
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  @apply from-white/30 to-white/20;
}

/* Hover effects melhorados */
.group:hover {
  @apply transform translate-x-1;
}

/* Active state enhancements - SEM bg-gradient-to-r */
.menu-item-glass.active-gradient {
  @apply shadow-2xl;
}

.menu-item-glass.active-gradient::after {
  content: '';
  @apply absolute right-0 top-1/2 transform -translate-y-1/2 w-1 h-8 bg-white/50 rounded-full;
}

/* Loading shimmer effect */
@keyframes shimmer {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
}

.menu-item-glass:hover::after {
  content: '';
  @apply absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent;
  animation: shimmer 2s infinite;
}
</style>