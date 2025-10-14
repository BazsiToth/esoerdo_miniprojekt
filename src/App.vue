<script setup>
import Content from './components/Content.vue';
import Navbar from './components/Nav.vue';
import LoadingScreen from './components/LoadingScreen.vue';
import { ref, onMounted } from 'vue';

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
  <Navbar/>
  </header>
  <main>
  <Content/>
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