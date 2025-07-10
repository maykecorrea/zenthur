<template>
  <div 
    class="relative h-screen bg-white shadow-lg transition-all duration-300 ease-in-out z-30"
    :class="[isExpanded ? 'w-64' : 'w-16']"
  >
    <!-- Container principal do sidebar -->
    <div class="flex flex-col h-full overflow-hidden">
      
      <!-- Header com logo centralizada -->
      <div class="flex justify-center items-center h-20 border-b border-gray-200 relative bg-white">
        <img
          :src="logoUrl"
          alt="Logo Zenthur"
          class="object-contain transition-all duration-200"
          :class="[isExpanded ? 'w-32 h-14' : 'w-10 h-10']"
        />
      </div>

      <!-- Botão para expandir/minimizar -->
      <button 
        @click="toggleSidebar" 
        class="absolute -right-3 top-24 bg-white border border-gray-300 rounded-full p-1.5 shadow-md z-50 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          class="h-4 w-4 text-gray-600 transition-transform duration-300" 
          :class="{ 'rotate-180': !isExpanded }"
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      
      <!-- Menu de navegação -->
      <nav class="flex-1 px-4 py-4 overflow-y-auto">
        <div class="space-y-1">
          
          <!-- Dashboard -->
          <NuxtLink to="/dashboard" class="block">
            <div :class="menuItemClass('/dashboard')">
              <svg class="h-5 w-5 flex-shrink-0" :class="iconClass('/dashboard')" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2" />
              </svg>
              <span v-if="isExpanded" class="ml-3 text-sm font-medium">Dashboard</span>
            </div>
          </NuxtLink>

          <!-- Documentação (Menu cascata) -->
          <div class="block">
            <div 
              @click="toggleDocumentacaoMenu"
              :class="menuItemClass('documentacao', true)"
            >
              <div class="flex items-center justify-between w-full min-w-0">
                <div class="flex items-center min-w-0">
                  <svg class="h-5 w-5 flex-shrink-0" :class="iconClass('documentacao')" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <span v-if="isExpanded" class="ml-3 text-sm font-medium">Documentação</span>
                </div>
                <svg 
                  v-if="isExpanded"
                  class="h-4 w-4 transition-transform duration-200" 
                  :class="{ 'rotate-90': isDocumentacaoMenuOpen }"
                  xmlns="http://www.w3.org/2000/svg" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>

            <!-- Submenu Documentação -->
            <Transition name="slide-fade">
              <div 
                v-if="isDocumentacaoMenuOpen && isExpanded"
                class="mt-1 ml-4 space-y-1"
              >
                <NuxtLink to="/dashdoc" class="block">
                  <div :class="submenuItemClass('/dashdoc')">
                    <span class="text-xs">Dashboard</span>
                  </div>
                </NuxtLink>
              </div>
            </Transition>
          </div>

          <!-- Equipamentos -->
          <NuxtLink to="/equipamentos" class="block">
            <div :class="menuItemClass('/equipamentos')">
              <svg class="h-5 w-5 flex-shrink-0" :class="iconClass('/equipamentos')" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.022.547l-1.4 1.4A2 2 0 003 19.243V20a1 1 0 001 1h16a1 1 0 001-1v-.757a2 2 0 00-.628-1.415l-1.4-1.4z" />
              </svg>
              <span v-if="isExpanded" class="ml-3 text-sm font-medium">Equipamentos</span>
            </div>
          </NuxtLink>

          <!-- Manutenção (Menu cascata) -->
          <div class="block">
            <div 
              @click="toggleManutencaoMenu"
              :class="menuItemClass('manutencao', true)"
            >
              <div class="flex items-center justify-between w-full min-w-0">
                <div class="flex items-center min-w-0">
                  <svg class="h-5 w-5 flex-shrink-0" :class="iconClass('manutencao')" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.915.558 2.14.211 2.573-1.066z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span v-if="isExpanded" class="ml-3 text-sm font-medium">Manutenção</span>
                </div>
                <svg 
                  v-if="isExpanded"
                  class="h-4 w-4 transition-transform duration-200" 
                  :class="{ 'rotate-90': isManutencaoMenuOpen }"
                  xmlns="http://www.w3.org/2000/svg" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>

            <!-- Submenu Manutenção -->
            <Transition name="slide-fade">
              <div 
                v-if="isManutencaoMenuOpen && isExpanded"
                class="mt-1 ml-4 space-y-1"
              >
                <NuxtLink to="/manutencao" class="block">
                  <div :class="submenuItemClass('/manutencao')">
                    <span class="text-xs">Dashboard</span>
                  </div>
                </NuxtLink>
                
                <NuxtLink to="/novomanu" class="block">
                  <div :class="submenuItemClass('/novomanu')">
                    <span class="text-xs">Nova Manutenção</span>
                  </div>
                </NuxtLink>
                
                <!-- Manutenção Preventiva -->
                <NuxtLink to="/manupreve" class="block">
                  <div :class="submenuItemClass('/manupreve')">
                    <span class="text-xs">Manutenção Preventiva</span>
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
            >
              <div class="flex items-center justify-between w-full min-w-0">
                <div class="flex items-center min-w-0">
                  <svg class="h-5 w-5 flex-shrink-0" :class="iconClass('planta')" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-1.447-.894L15 7m0 13V7" />
                  </svg>
                  <span v-if="isExpanded" class="ml-3 text-sm font-medium">Planta Interativa</span>
                </div>
                <svg 
                  v-if="isExpanded"
                  class="h-4 w-4 transition-transform duration-200" 
                  :class="{ 'rotate-90': isPlantaMenuOpen }"
                  xmlns="http://www.w3.org/2000/svg" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>

            <!-- Submenu Planta -->
            <Transition name="slide-fade">
              <div 
                v-if="isPlantaMenuOpen && isExpanded"
                class="mt-1 ml-4 space-y-1"
              >
                <NuxtLink to="/plantainterativa" class="block">
                  <div :class="submenuItemClass('/plantainterativa')">
                    <span class="text-xs">Visualizar</span>
                  </div>
                </NuxtLink>
                
                <NuxtLink to="/novaplanta" class="block">
                  <div :class="submenuItemClass('/novaplanta')">
                    <span class="text-xs">Nova Planta</span>
                  </div>
                </NuxtLink>
              </div>
            </Transition>
          </div>

          <!-- MODELO 3D - REDIRECIONAR PARA APS VIEWER -->
          <a href="http://localhost:8080" target="_blank" class="block">
            <div :class="menuItemClass('/modelo3d')">
              <div class="flex items-center justify-between w-full min-w-0">
                <div class="flex items-center min-w-0">
                  <svg class="h-5 w-5 flex-shrink-0" :class="iconClass('/modelo3d')" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
                  </svg>
                  <span v-if="isExpanded" class="ml-3 text-sm font-medium">Modelo 3D</span>
                </div>
                <!-- ÍCONE INDICANDO LINK EXTERNO -->
                <svg 
                  v-if="isExpanded" 
                  class="h-3 w-3 ml-1 text-gray-400" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-2M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </div>
            </div>
          </a>
        </div>
      </nav>
      
      <!-- Rodapé com logout -->
      <div class="px-4 py-3 border-t border-gray-200">
        <button 
          @click="logout"
          :class="[
            'w-full flex items-center px-3 py-2 rounded-md transition-all duration-200 text-gray-700 hover:bg-red-50 hover:text-red-600 group',
            isExpanded ? 'justify-start' : 'justify-center'
          ]"
        >
          <svg class="h-5 w-5 flex-shrink-0 text-gray-500 group-hover:text-red-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          <span v-if="isExpanded" class="ml-3 text-sm font-medium">Sair</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRoute } from 'vue-router';
import logoImage from '~/assets/img/logo.jpg';

const route = useRoute();

const logoUrl = computed(() => logoImage);

const isExpanded = ref(true);
const isManutencaoMenuOpen = ref(false);
const isPlantaMenuOpen = ref(false);
const isDocumentacaoMenuOpen = ref(false);

const menuItemClass = (path, isSubmenu = false) => {
  const baseClass = 'flex items-center px-3 py-2 rounded-lg transition-all duration-200 cursor-pointer group';
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
        ? 'bg-blue-600 text-white shadow-md'
        : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
    ].join(' ');
  }
  
  if (path === '/modelo3d') {
    return [
      baseClass,
      expandedClass,
      'text-gray-700 hover:bg-blue-50 hover:text-blue-600'
    ].join(' ');
  }
  
  return [
    baseClass,
    expandedClass,
    isActive(path)
      ? 'bg-blue-600 text-white shadow-md'
      : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
  ].join(' ');
};

const submenuItemClass = (path) => {
  return [
    'flex items-center px-3 py-1.5 rounded-md transition-all duration-200 text-sm',
    isActive(path)
      ? 'bg-blue-100 text-blue-800 font-medium'
      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
  ].join(' ');
};

const iconClass = (path) => {
  if (path === 'documentacao' && isDocumentacaoActive()) return 'text-white';
  if (path === 'manutencao' && isManutencaoActive()) return 'text-white';
  if (path === 'planta' && isPlantaActive()) return 'text-white';
  if (path === '/modelo3d') return 'text-gray-500 group-hover:text-blue-600';
  return isActive(path) ? 'text-white' : 'text-gray-500';
};

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

onMounted(() => {
  try {
    const savedState = localStorage.getItem('sidebarExpanded');
    if (savedState !== null) {
      isExpanded.value = savedState === 'true';
    }
    if (isManutencaoActive()) isManutencaoMenuOpen.value = true;
    if (isPlantaActive()) isPlantaMenuOpen.value = true;
    if (isDocumentacaoActive()) isDocumentacaoMenuOpen.value = true;
  } catch (error) {
    console.error('Erro ao carregar preferências:', error);
  }
});
</script>

<style scoped>
.slide-fade-enter-active {
  transition: all 0.3s ease;
}
.slide-fade-leave-active {
  transition: all 0.3s ease;
}
.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateY(-10px);
  opacity: 0;
}
.group:hover .group-hover\:scale-105 {
  transform: scale(1.05);
}
::-webkit-scrollbar {
  width: 6px;
}
::-webkit-scrollbar-track {
  background: transparent;
}
::-webkit-scrollbar-thumb {
  background: #e2e8f0;
  border-radius: 3px;
}
::-webkit-scrollbar-thumb:hover {
  background: #cbd5e1;
}
</style>
