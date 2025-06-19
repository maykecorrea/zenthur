<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-100">
    <!-- Header Principal -->
    <header class="sticky top-0 z-50 bg-white/90 backdrop-blur-lg border-b border-gray-200 shadow-sm">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center py-4">
          <!-- Logo e Título -->
          <div class="flex items-center space-x-4">
            <button @click="voltarParaAdmin" class="p-2 hover:bg-gray-100 rounded-xl transition-all duration-200">
              <svg class="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
              </svg>
            </button>
            <div class="w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"></path>
              </svg>
            </div>
            <div>
              <h1 class="text-2xl font-bold bg-gradient-to-r from-gray-900 to-blue-600 bg-clip-text text-transparent">
                Gerenciamento de Usuários
              </h1>
              <p class="text-sm text-gray-500 font-medium">Administração de contas e permissões</p>
            </div>
          </div>

          <!-- Stats e Actions -->
          <div class="flex items-center space-x-4">
            <!-- Total Users Badge -->
            <div class="px-4 py-2 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl border border-blue-100">
              <div class="flex items-center space-x-2">
                <svg class="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                </svg>
                <span class="text-sm font-semibold text-blue-700">{{ usuarios.length }} usuários</span>
              </div>
            </div>

            <!-- Add User Button -->
            <button @click="abrirModalNovoUsuario" class="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
              </svg>
              <span class="font-medium">Novo Usuário</span>
            </button>
          </div>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Filters and Search -->
      <div class="bg-white/70 backdrop-blur-sm rounded-3xl shadow-xl border border-white/20 p-6 mb-8">
        <div class="flex flex-col md:flex-row gap-4 items-center justify-between">
          <!-- Search -->
          <div class="relative flex-1 max-w-md">
            <svg class="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
            <input
              v-model="filtroTexto"
              type="text"
              placeholder="Buscar usuários..."
              class="w-full pl-10 pr-4 py-3 bg-white/80 border border-gray-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-400 transition-all duration-200"
            />
          </div>

          <!-- Role Filter -->
          <div class="flex items-center space-x-3">
            <label class="text-sm font-medium text-gray-700">Filtrar por:</label>
            <select v-model="filtroRole" class="px-4 py-3 bg-white/80 border border-gray-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-400 transition-all duration-200">
              <option value="">Todos</option>
              <option value="admin">Administradores</option>
              <option value="user">Usuários</option>
            </select>
          </div>

          <!-- Refresh Button -->
          <button @click="carregarUsuarios" :disabled="loading" class="p-3 bg-gray-100 hover:bg-gray-200 rounded-xl transition-all duration-200 disabled:opacity-50">
            <svg class="w-4 h-4 text-gray-600" :class="{ 'animate-spin': loading }" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
            </svg>
          </button>
        </div>
      </div>

      <!-- Users Grid -->
      <div v-if="loading" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <!-- Loading Skeletons -->
        <div v-for="n in 6" :key="n" class="bg-white/70 backdrop-blur-sm rounded-3xl shadow-xl border border-white/20 p-6 animate-pulse">
          <div class="flex items-center space-x-4 mb-4">
            <div class="w-16 h-16 bg-gray-200 rounded-2xl"></div>
            <div class="flex-1">
              <div class="h-4 bg-gray-200 rounded mb-2"></div>
              <div class="h-3 bg-gray-200 rounded w-2/3"></div>
            </div>
          </div>
          <div class="space-y-2">
            <div class="h-3 bg-gray-200 rounded"></div>
            <div class="h-3 bg-gray-200 rounded w-3/4"></div>
          </div>
        </div>
      </div>

      <div v-else-if="usuariosFiltrados.length === 0" class="text-center py-12">
        <div class="w-24 h-24 bg-gray-100 rounded-3xl flex items-center justify-center mx-auto mb-4">
          <svg class="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
          </svg>
        </div>
        <h3 class="text-lg font-semibold text-gray-900 mb-2">Nenhum usuário encontrado</h3>
        <p class="text-gray-600">Tente ajustar os filtros ou adicione um novo usuário.</p>
      </div>

      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="usuario in usuariosFiltrados"
          :key="usuario.id"
          class="bg-white/70 backdrop-blur-sm rounded-3xl shadow-xl border border-white/20 p-6 hover:shadow-2xl transition-all duration-300 group"
        >
          <!-- User Header -->
          <div class="flex items-center justify-between mb-4">
            <div class="flex items-center space-x-4">
              <!-- Avatar -->
              <div class="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
                <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                </svg>
              </div>
              
              <div class="flex-1">
                <h3 class="font-bold text-gray-900 text-lg">{{ usuario.nome || 'Nome não informado' }}</h3>
                <p class="text-sm text-gray-600">{{ usuario.email }}</p>
              </div>
            </div>

            <!-- Status Badge -->
            <div class="flex flex-col items-end space-y-2">
              <span
                :class="getRoleClass(usuario.role)"
                class="px-3 py-1 rounded-full text-xs font-bold"
              >
                {{ getRoleLabel(usuario.role) }}
              </span>
              <div class="flex items-center space-x-1">
                <div class="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span class="text-xs text-gray-500">Online</span>
              </div>
            </div>
          </div>

          <!-- User Info -->
          <div class="space-y-3 mb-6">
            <div class="flex items-center space-x-3">
              <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h1a1 1 0 011 1v5m-4 0h4"></path>
              </svg>
              <span class="text-sm text-gray-600">{{ usuario.empresa || 'Empresa não informada' }}</span>
            </div>
            
            <div class="flex items-center space-x-3">
              <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
              </svg>
              <span class="text-sm text-gray-600">{{ usuario.telefone || 'Telefone não informado' }}</span>
            </div>
            
            <div class="flex items-center space-x-3">
              <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3a2 2 0 012-2h4a2 2 0 012 2v4m-6 4v10a2 2 0 002 2h4a2 2 0 002-2V11a2 2 0 00-2-2H10a2 2 0 00-2 2z"></path>
              </svg>
              <span class="text-sm text-gray-600">Criado em {{ formatarData(usuario.createdAt) }}</span>
            </div>
          </div>

          <!-- Actions -->
          <div class="flex items-center justify-between pt-4 border-t border-gray-200">
            <button @click="editarUsuario(usuario)" class="flex items-center space-x-2 px-4 py-2 bg-blue-50 hover:bg-blue-100 text-blue-600 rounded-xl transition-all duration-200 group">
              <svg class="w-4 h-4 group-hover:rotate-12 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
              </svg>
              <span class="text-sm font-medium">Editar</span>
            </button>

            <button @click="confirmarExclusao(usuario)" class="flex items-center space-x-2 px-4 py-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-xl transition-all duration-200 group">
              <svg class="w-4 h-4 group-hover:scale-110 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
              </svg>
              <span class="text-sm font-medium">Excluir</span>
            </button>
          </div>
        </div>
      </div>
    </main>

    <!-- Modal Novo/Editar Usuário -->
    <div v-if="mostrarModalUsuario" class="fixed inset-0 z-50 overflow-y-auto">
      <div class="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:p-0">
        <!-- Overlay -->
        <div class="fixed inset-0 transition-opacity bg-gray-500/75 backdrop-blur-sm" @click="fecharModalUsuario"></div>
        
        <!-- Modal -->
        <div class="relative inline-block w-full max-w-2xl p-8 overflow-hidden text-left align-middle transition-all transform bg-white/90 backdrop-blur-xl shadow-2xl rounded-3xl border border-white/20">
          <!-- Header -->
          <div class="flex items-center justify-between mb-6">
            <h3 class="text-2xl font-bold bg-gradient-to-r from-gray-900 to-blue-600 bg-clip-text text-transparent">
              {{ usuarioEditando ? 'Editar Usuário' : 'Novo Usuário' }}
            </h3>
            <button @click="fecharModalUsuario" class="p-2 hover:bg-gray-100 rounded-xl transition-all duration-200">
              <svg class="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>

          <!-- Form -->
          <form @submit.prevent="salvarUsuario" class="space-y-6">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <!-- Nome -->
              <div>
                <label class="block text-sm font-semibold text-gray-700 mb-2">Nome Completo</label>
                <input
                  v-model="formularioUsuario.nome"
                  type="text"
                  required
                  class="w-full px-4 py-3 bg-white/80 border border-gray-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-400 transition-all duration-200"
                  placeholder="Digite o nome completo"
                />
              </div>

              <!-- Email -->
              <div>
                <label class="block text-sm font-semibold text-gray-700 mb-2">Email</label>
                <input
                  v-model="formularioUsuario.email"
                  type="email"
                  required
                  class="w-full px-4 py-3 bg-white/80 border border-gray-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-400 transition-all duration-200"
                  placeholder="email@exemplo.com"
                />
              </div>

              <!-- Senha -->
              <div>
                <label class="block text-sm font-semibold text-gray-700 mb-2">
                  {{ usuarioEditando ? 'Nova Senha (opcional)' : 'Senha' }}
                </label>
                <input
                  v-model="formularioUsuario.password"
                  type="password"
                  :required="!usuarioEditando"
                  class="w-full px-4 py-3 bg-white/80 border border-gray-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-400 transition-all duration-200"
                  placeholder="••••••••"
                />
              </div>

              <!-- Role -->
              <div>
                <label class="block text-sm font-semibold text-gray-700 mb-2">Tipo de Usuário</label>
                <select
                  v-model="formularioUsuario.role"
                  required
                  class="w-full px-4 py-3 bg-white/80 border border-gray-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-400 transition-all duration-200"
                >
                  <option value="user">Usuário</option>
                  <option value="admin">Administrador</option>
                </select>
              </div>

              <!-- Empresa -->
              <div>
                <label class="block text-sm font-semibold text-gray-700 mb-2">Empresa</label>
                <input
                  v-model="formularioUsuario.empresa"
                  type="text"
                  class="w-full px-4 py-3 bg-white/80 border border-gray-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-400 transition-all duration-200"
                  placeholder="Nome da empresa"
                />
              </div>

              <!-- Telefone -->
              <div>
                <label class="block text-sm font-semibold text-gray-700 mb-2">Telefone</label>
                <input
                  v-model="formularioUsuario.telefone"
                  type="tel"
                  class="w-full px-4 py-3 bg-white/80 border border-gray-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-400 transition-all duration-200"
                  placeholder="(11) 99999-9999"
                />
              </div>
            </div>

            <!-- Actions -->
            <div class="flex items-center justify-end space-x-4 pt-6 border-t border-gray-200">
              <button
                type="button"
                @click="fecharModalUsuario"
                class="px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-2xl transition-all duration-200 font-medium"
              >
                Cancelar
              </button>
              <button
                type="submit"
                :disabled="salvandoUsuario"
                class="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-2xl transition-all duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <svg v-if="salvandoUsuario" class="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>{{ salvandoUsuario ? 'Salvando...' : (usuarioEditando ? 'Atualizar' : 'Criar Usuário') }}</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>

    <!-- Modal Confirmação Exclusão -->
    <div v-if="mostrarModalExclusao" class="fixed inset-0 z-50 overflow-y-auto">
      <div class="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:p-0">
        <!-- Overlay -->
        <div class="fixed inset-0 transition-opacity bg-gray-500/75 backdrop-blur-sm" @click="fecharModalExclusao"></div>
        
        <!-- Modal -->
        <div class="relative inline-block w-full max-w-md p-8 overflow-hidden text-left align-middle transition-all transform bg-white/90 backdrop-blur-xl shadow-2xl rounded-3xl border border-white/20">
          <!-- Warning Icon -->
          <div class="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg class="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
            </svg>
          </div>

          <!-- Content -->
          <div class="text-center mb-6">
            <h3 class="text-xl font-bold text-gray-900 mb-2">Confirmar Exclusão</h3>
            <p class="text-gray-600">
              Tem certeza que deseja excluir o usuário 
              <span class="font-semibold">{{ usuarioParaExcluir?.nome || usuarioParaExcluir?.email }}</span>?
            </p>
            <p class="text-sm text-red-600 mt-2">Esta ação não pode ser desfeita.</p>
          </div>

          <!-- Actions -->
          <div class="flex items-center justify-center space-x-4">
            <button
              @click="fecharModalExclusao"
              class="px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-2xl transition-all duration-200 font-medium"
            >
              Cancelar
            </button>
            <button
              @click="excluirUsuario"
              :disabled="excluindoUsuario"
              class="flex items-center space-x-2 px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-2xl transition-all duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <svg v-if="excluindoUsuario" class="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span>{{ excluindoUsuario ? 'Excluindo...' : 'Excluir Usuário' }}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';

// Middleware de proteção admin
definePageMeta({
  middleware: 'admin'
});

const router = useRouter();

// Estados
const usuarios = ref([]);
const loading = ref(false);
const filtroTexto = ref('');
const filtroRole = ref('');

// Modal Usuário
const mostrarModalUsuario = ref(false);
const usuarioEditando = ref(null);
const salvandoUsuario = ref(false);
const formularioUsuario = ref({
  nome: '',
  email: '',
  password: '',
  role: 'user',
  empresa: '',
  telefone: ''
});

// Modal Exclusão
const mostrarModalExclusao = ref(false);
const usuarioParaExcluir = ref(null);
const excluindoUsuario = ref(false);

// Computed
const usuariosFiltrados = computed(() => {
  let resultado = usuarios.value;

  // Filtro por texto
  if (filtroTexto.value) {
    const texto = filtroTexto.value.toLowerCase();
    resultado = resultado.filter(user => 
      user.nome?.toLowerCase().includes(texto) ||
      user.email?.toLowerCase().includes(texto) ||
      user.empresa?.toLowerCase().includes(texto)
    );
  }

  // Filtro por role
  if (filtroRole.value) {
    resultado = resultado.filter(user => user.role === filtroRole.value);
  }

  return resultado;
});

// Lifecycle
onMounted(async () => {
  await carregarUsuarios();
});

// Métodos
const carregarUsuarios = async () => {
  try {
    console.log('🔄 Carregando usuários...');
    loading.value = true;
    
    // Usar o plugin $api que já está configurado
    const { $api } = useNuxtApp();
    const response = await $api.get('/users');
    
    if (response.data && Array.isArray(response.data)) {
      usuarios.value = response.data;
      console.log(`✅ ${response.data.length} usuários carregados`);
    } else {
      throw new Error('Resposta inválida do servidor');
    }
    
  } catch (error) {
    console.error('❌ Erro ao carregar usuários:', error);
    
    // Tratamento específico de erros
    if (error.response?.status === 401) {
      ElMessage.error('Sessão expirada. Você será redirecionado para o login.');
      await navigateTo('/');
    } else {
      ElMessage.error(`Erro ao carregar usuários: ${error.message}`);
    }
  } finally {
    loading.value = false;
  }
};

const abrirModalNovoUsuario = () => {
  usuarioEditando.value = null;
  formularioUsuario.value = {
    nome: '',
    email: '',
    password: '',
    role: 'user',
    empresa: '',
    telefone: ''
  };
  mostrarModalUsuario.value = true;
};

const editarUsuario = (usuario) => {
  usuarioEditando.value = usuario;
  formularioUsuario.value = {
    nome: usuario.nome || '',
    email: usuario.email || '',
    password: '',
    role: usuario.role || 'user',
    empresa: usuario.empresa || '',
    telefone: usuario.telefone || ''
  };
  mostrarModalUsuario.value = true;
};

const fecharModalUsuario = () => {
  mostrarModalUsuario.value = false;
  usuarioEditando.value = null;
  formularioUsuario.value = {
    nome: '',
    email: '',
    password: '',
    role: 'user',
    empresa: '',
    telefone: ''
  };
};

const salvarUsuario = async () => {
  try {
    salvandoUsuario.value = true;
    
    const token = localStorage.getItem('auth_token'); // ⭐ MESMO TOKEN
    if (!token) {
      await router.push('/');
      return;
    }

    const dadosUsuario = {
      nome: formularioUsuario.value.nome,
      email: formularioUsuario.value.email,
      role: formularioUsuario.value.role,
      empresa: formularioUsuario.value.empresa,
      telefone: formularioUsuario.value.telefone
    };

    // Incluir senha apenas se preenchida
    if (formularioUsuario.value.password) {
      dadosUsuario.password = formularioUsuario.value.password;
    }

    let response;
    
    if (usuarioEditando.value) {
      // Editar usuário existente
      console.log('✏️ Editando usuário:', usuarioEditando.value.id);
      response = await fetch(`http://localhost:3001/api/users/${usuarioEditando.value.id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`, // ⭐ USAR TOKEN CORRETO
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(dadosUsuario)
      });
    } else {
      // Criar novo usuário
      console.log('➕ Criando novo usuário');
      response = await fetch('http://localhost:3001/api/users', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`, // ⭐ USAR TOKEN CORRETO
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(dadosUsuario)
      });
    }

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Erro ao salvar usuário');
    }

    console.log('✅ Usuário salvo com sucesso');
    
    // Recarregar lista de usuários
    await carregarUsuarios();
    
    // Fechar modal
    fecharModalUsuario();
    
  } catch (error) {
    console.error('❌ Erro ao salvar usuário:', error);
    alert(error.message || 'Erro ao salvar usuário. Tente novamente.');
  } finally {
    salvandoUsuario.value = false;
  }
};

const confirmarExclusao = (usuario) => {
  usuarioParaExcluir.value = usuario;
  mostrarModalExclusao.value = true;
};

const fecharModalExclusao = () => {
  mostrarModalExclusao.value = false;
  usuarioParaExcluir.value = null;
};

const excluirUsuario = async () => {
  try {
    excluindoUsuario.value = true;
    
    // ⭐ USAR O TOKEN CORRETO (mesmo que outras funções usam)
    const token = localStorage.getItem('auth_token'); // ✅ CORRETO
    if (!token) {
      await router.push('/');
      return;
    }

    console.log('🗑️ Excluindo usuário:', usuarioParaExcluir.value.id);
    
    const response = await fetch(`http://localhost:3001/api/users/${usuarioParaExcluir.value.id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`, // ⭐ USAR TOKEN CORRETO
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Erro ao excluir usuário');
    }

    console.log('✅ Usuário excluído com sucesso');
    
    // Recarregar lista de usuários
    await carregarUsuarios();
    
    // Fechar modal
    fecharModalExclusao();
    
  } catch (error) {
    console.error('❌ Erro ao excluir usuário:', error);
    alert(error.message || 'Erro ao excluir usuário. Tente novamente.');
  } finally {
    excluindoUsuario.value = false;
  }
};

const voltarParaAdmin = () => {
  router.push('/adm');
};

// Utility functions
const getRoleClass = (role) => {
  switch (role) {
    case 'admin':
      return 'bg-purple-100 text-purple-800';
    case 'user':
      return 'bg-blue-100 text-blue-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

const getRoleLabel = (role) => {
  switch (role) {
    case 'admin':
      return 'Admin';
    case 'user':
      return 'Usuário';
    default:
      return 'Indefinido';
  }
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
</script>

<style scoped>
/* Animações personalizadas */
@keyframes float {
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-3px);
  }
}

.animate-float {
  animation: float 3s ease-in-out infinite;
}

/* Glass morphism effect */
.backdrop-blur-sm {
  backdrop-filter: blur(12px);
}

.backdrop-blur-xl {
  backdrop-filter: blur(24px);
}

/* Hover effects */
.group:hover .group-hover\:scale-110 {
  transform: scale(1.1);
}

.group:hover .group-hover\:rotate-12 {
  transform: rotate(12deg);
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .grid-cols-3 {
    grid-template-columns: repeat(1, minmax(0, 1fr));
  }
  
  .transform:hover {
    transform: none;
  }
}

/* Scrollbar styling */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: rgba(0, 0, 0, 0.1);
  border-radius: 4px;
}

::-webkit-scrollbar-thumb {
  background: rgba(59, 130, 246, 0.5);
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: rgba(59, 130, 246, 0.7);
}

/* Focus states */
input:focus, select:focus {
  transform: translateY(-1px);
}

/* Loading animation */
@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}
</style>