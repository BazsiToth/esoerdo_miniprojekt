<script setup>
import logoSrc from '../assets/svgs/leaves-icon.svg'
</script>

<template>
  <img :src="logoSrc" alt="Leaves Logo" class="brand-logo" />
</template>

<style scoped>
.brand-logo {
  width: 45px;
  height: 45px;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  filter: drop-shadow(0 0 3px rgba(0, 150, 50, 0.4));
}

/* Hover effekt - parent hover által aktiválódik */
.navbar-brand:hover .brand-logo {
  transform: scale(1.25) rotate(5deg);
  filter: drop-shadow(0 0 8px rgba(0, 180, 60, 0.9))
          drop-shadow(0 0 16px rgba(50, 200, 80, 0.7))
          drop-shadow(0 0 24px rgba(0, 150, 50, 0.5))
          drop-shadow(0 0 32px rgba(100, 220, 120, 0.3));
  animation: greenGlowPulse 2s ease-in-out infinite;
}

/* Zöld pulzáló glow animáció */
@keyframes greenGlowPulse {
  0%, 100% {
    filter: drop-shadow(0 0 8px rgba(0, 180, 60, 0.9))
            drop-shadow(0 0 16px rgba(50, 200, 80, 0.7))
            drop-shadow(0 0 24px rgba(0, 150, 50, 0.5));
  }
  50% {
    filter: drop-shadow(0 0 12px rgba(0, 200, 70, 1))
            drop-shadow(0 0 24px rgba(50, 220, 90, 0.9))
            drop-shadow(0 0 36px rgba(0, 180, 60, 0.7))
            drop-shadow(0 0 48px rgba(100, 240, 130, 0.5));
  }
}
</style>
