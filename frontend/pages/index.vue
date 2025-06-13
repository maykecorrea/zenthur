<template>
  <div class="min-h-screen flex">
    <!-- Metade esquerda - Formulário de login -->
    <div class="w-1/2 flex flex-col justify-center px-8 md:px-16 bg-white">
      <!-- Logo no topo -->
      <div class="mb-10 flex justify-center">
        <img :src="logoImage" alt="Logo" class="h-16 object-contain" />
      </div>
      
      <h2 class="text-2xl font-bold text-gray-800 mb-6">
        Acesse sua conta
      </h2>

      <!-- Formulário de login -->
      <form @submit.prevent="handleLogin" class="space-y-6">
        <div>
          <label for="email" class="block text-sm font-medium text-gray-700">
            Email
          </label>
          <div class="mt-1">
            <input
              id="email"
              v-model="email"
              type="email"
              required
              placeholder="Digite seu email"
              class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
          </div>
        </div>

        <div>
          <label for="password" class="block text-sm font-medium text-gray-700">
            Senha
          </label>
          <div class="mt-1">
            <input
              id="password"
              v-model="password"
              type="password"
              required
              placeholder="Digite sua senha"
              class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
          </div>
        </div>

<<<<<<< HEAD
=======
        <!-- Link "Esqueci minha senha" -->
>>>>>>> c4410f37eb21356904139954172dee6daaafd1f8
        <div class="flex justify-end">
          <button 
            type="button" 
            @click="forgotPassword"
            class="text-sm text-blue-600 hover:text-blue-800 font-medium"
          >
            Esqueci minha senha
          </button>
        </div>

        <div>
          <button
            type="submit"
            :disabled="isLoading"
            class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-blue-300"
          >
            <span v-if="isLoading">Entrando...</span>
            <span v-else>Entrar</span>
          </button>
        </div>
        
        <div v-if="error" class="text-sm text-red-600 text-center">
          {{ error }}
        </div>
      </form>
    </div>

    <!-- Metade direita - Imagem de fundo -->
    <div 
      class="hidden md:block w-1/2 bg-cover bg-center" 
      :style="`background-image: url(${bgImage})`"
    >
<<<<<<< HEAD
=======
      <!-- Overlay escuro para melhorar o contraste caso necessário -->
>>>>>>> c4410f37eb21356904139954172dee6daaafd1f8
      <div class="h-full w-full bg-black bg-opacity-20"></div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useAuthStore } from '~/stores/auth';
import { useRouter } from 'vue-router';
<<<<<<< HEAD
=======

// Importar imagens
>>>>>>> c4410f37eb21356904139954172dee6daaafd1f8
import logoImage from '~/assets/img/logo.jpg';
import bgImage from '~/assets/img/123bg.jpg';

definePageMeta({
  layout: false
});

const router = useRouter();
const authStore = useAuthStore();

const email = ref('');
const password = ref('');
const error = ref('');
const isLoading = ref(false);

const handleLogin = async () => {
<<<<<<< HEAD
=======
  // Validar entradas
>>>>>>> c4410f37eb21356904139954172dee6daaafd1f8
  if (!email.value || !password.value) {
    error.value = 'Por favor, preencha todos os campos.';
    return;
  }
  
  isLoading.value = true;
  
<<<<<<< HEAD
=======
  // ✅ CORRIGIDO: Passar como objeto
>>>>>>> c4410f37eb21356904139954172dee6daaafd1f8
  const success = await authStore.login({
    email: email.value,
    password: password.value
  });
  
  isLoading.value = false;
  
  if (success) {
<<<<<<< HEAD
    console.log("User role:", authStore.userRole);
    console.log("User data:", authStore.user);
    
    // Redirecionar baseado no papel do usuário
    if (authStore.userRole === 'admin') {
=======
    console.log("User role:", authStore.role);
    console.log("User data:", authStore.user);
    
    // Redirecionar baseado no papel do usuário
    if (authStore.role === 'admin') {
>>>>>>> c4410f37eb21356904139954172dee6daaafd1f8
      router.push('/adm');
    } else {
      router.push('/dashboard');
    }
  } else {
    error.value = authStore.error || 'Credenciais inválidas. Tente novamente.';
  }
};

const forgotPassword = () => {
  alert("Em breve você receberá um email com instruções para recuperar sua senha.");
};
<<<<<<< HEAD
</script>
=======
</script>
>>>>>>> c4410f37eb21356904139954172dee6daaafd1f8
