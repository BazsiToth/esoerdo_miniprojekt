<script setup>
import Navbar from './components/Nav.vue';
import LoadingScreen from './components/LoadingScreen.vue';
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import Footer from './components/Footer.vue';

const isLoading = ref(false);
const route = useRoute();

if (route.path === '/') {
  isLoading.value = true;
  setTimeout(() => {
    isLoading.value = false;
  }, 1500);
}

watch(() => route.fullPath, (newPath) => {
  if (newPath === '/') {
    isLoading.value = true;
    setTimeout(() => {
      isLoading.value = false;
    }, 1500);
  }
});
</script>

<template>
  <LoadingScreen :isLoading="isLoading" />
  <header>
    <Navbar/>
  </header>
  <main>
    <router-view :key="route.fullPath"></router-view>
  </main>
  <footer>
    <Footer/>
  </footer>
</template>

<style scoped>
footer {
  color: #fff;
  background-color: #000;
}
</style>
