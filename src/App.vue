<script setup>
import Content from './components/Content.vue';
import Navbar from './components/Nav.vue';
</script>

<template>
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
