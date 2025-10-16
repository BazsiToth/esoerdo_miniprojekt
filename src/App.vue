<script setup>
import Navbar from './components/Nav.vue';
import LoadingScreen from './components/LoadingScreen.vue';
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';

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

    <!-- Bottom fade overlay -->
    <div class="bottom-fade"></div>
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

/* Fading overlay a képernyő alján */
.bottom-fade {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100px; /* beállítható */
  pointer-events: none;
  background: linear-gradient(
    to top,
    rgba(110, 110, 110, 0.4),
    rgba(0, 0, 0, 0)
  );
  z-index: 9998;
}
</style>
