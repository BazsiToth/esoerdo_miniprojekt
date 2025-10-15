<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  isLoading: {
    type: Boolean,
    required: true
  }
})

const showLoader = ref(true)

watch(() => props.isLoading, (newVal) => {
  if (!newVal) {
    setTimeout(() => {
      showLoader.value = false
    }, 500)
  }
})
</script>

<template>
  <div v-if="showLoader" class="loading-wrapper" :class="{ 'fade-out': !isLoading }">
    <span class="loader"><span class="loader-inner"></span></span>
  </div>
</template>

<style scoped>
.loading-wrapper {
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
background: 
    radial-gradient(ellipse 150% 100% at 50% 0%, 
        #B5D6E4 0%,
        #8AB3C4 30%,
        transparent 70%),
    radial-gradient(circle at 0% 100%, 
        #4D8A73 0%,
        #6B9D87 40%,
        transparent 80%),
    radial-gradient(circle at 100% 100%, 
        #4D8A73 0%,
        #6B9D87 40%,
        transparent 80%),
    #6A9AA8;
background-blend-mode: overlay, multiply, normal;

  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
  opacity: 1;
  transition: opacity 0.5s ease-in-out;
}

.loading-wrapper.fade-out {
  opacity: 0;
}

.loader {
  display: inline-block;
  width: 30px;
  height: 30px;
  position: relative;
  border: 4px solid #fff;
  animation: loader 2s infinite ease;
}

.loader-inner {
  vertical-align: top;
  display: inline-block;
  width: 100%;
  background-color: #fff;
  animation: loader-inner 2s infinite ease-in;
}

@keyframes loader {
  0% {
    transform: rotate(0deg);
  }

  25% {
    transform: rotate(180deg);
  }

  50% {
    transform: rotate(180deg);
  }

  75% {
    transform: rotate(360deg);
  }

  100% {
    transform: rotate(360deg);
  }
}

@keyframes loader-inner {
  0% {
    height: 0%;
  }

  25% {
    height: 0%;
  }

  50% {
    height: 100%;
  }

  75% {
    height: 100%;
  }

  100% {
    height: 0%;
  }
}
</style>