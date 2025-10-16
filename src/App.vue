<script setup>
import Navbar from './components/Nav.vue';
import LoadingScreen from './components/LoadingScreen.vue';
import { ref, onMounted } from 'vue';
import Kezdolap from './components/Kezdolap.vue';
const isLoading = ref(true)

onMounted(async () => {
  setTimeout(() => {
    isLoading.value = false
  }, 1500)
})
</script>

<template>
  <LoadingScreen :isLoading="isLoading" />
  <header>
    <Navbar />
  </header>
  <main>
    <router-view></router-view>
  </main>
  <footer class="text-center p-4">
    Copyright &copy; All right reserved!
  </footer>
</template>

<style scoped>
footer {
  color: #fff;
  background-color: #000;
}
</style>