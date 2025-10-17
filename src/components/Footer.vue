<script setup>
import LogoSvg from './LogoSvg.vue'
import { computed } from 'vue';
import { ref, onMounted, onUnmounted } from 'vue';

const currentYear = computed(() => new Date().getFullYear());

const marqueeInner = ref(null);
const isPaused = ref(false);
let animationId = null;
let position = 0;

const animate = () => {
  if (!isPaused.value) {
    position -= 1;

    if (marqueeInner.value) {
      const halfWidth = marqueeInner.value.scrollWidth / 2;
      if (Math.abs(position) >= halfWidth) {
        position = 0;
      }
      marqueeInner.value.style.transform = `translateX(${position}px)`;
    }
  }

  animationId = requestAnimationFrame(animate);
};

const handleMouseEnter = () => {
  isPaused.value = true;
};

const handleMouseLeave = () => {
  isPaused.value = false;
};

onMounted(() => {
  animate();
});

onUnmounted(() => {
  if (animationId) {
    cancelAnimationFrame(animationId);
  }
});
</script>

<template>
  <footer class="thevr-footer">
    <div class="footer-content">
      <section class="footer-section">
        <h3 class="footer-logo"><span class="p-2"><LogoSvg /></span>Mouri</h3>
        <nav class="footer-nav">
          <router-link to="/" class="footer-link">Főoldal</router-link>
          <router-link to="/Climate" class="footer-link">Éghajlat</router-link>
          <router-link to="/Nature" class="footer-link">Természet</router-link>
          <router-link to="/Animals" class="footer-link">Állatvilág</router-link>
          <router-link to="/Galery" class="footer-link">Galéria</router-link>
          <router-link to="/Quiz" class="footer-link">Quiz</router-link>
          <router-link to="https://vod.thevr.hu" class="footer-link">Rólunk</router-link>
        </nav>
      </section>
      <section class="marquee-container">
        <div ref="marqueeInner" class="marquee-inner">
          <div v-for="i in 4" :key="i" class="marquee-set">
            <span class="marquee-item text-item" @mouseenter="handleMouseEnter" @mouseleave="handleMouseLeave">
              Elérhetőségeink
            </span>
            <a href="https://github.com/BazsiToth/Esoerdo_miniprojekt/" target="_blank" class="marquee-item icon-item"
              @mouseenter="handleMouseEnter" @mouseleave="handleMouseLeave">
              <i class="bi bi-github" title="Github"></i>
            </a>
            <a href="https://www.notion.so/2852ce8849f980a18566cb23a5dad45a?v=2852ce8849f98049abde000c105fa774" target="_blank" class="marquee-item icon-item"
              @mouseenter="handleMouseEnter" @mouseleave="handleMouseLeave" title="Notion">
              <svg class="icon-svg" viewBox="0 0 24 24">
                <defs>
                  <linearGradient id="icon-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stop-color="#006811" />
                    <stop offset="100%" stop-color="#31eb4a" />
                  </linearGradient>
                </defs>
                <path
                  d="M4.459 4.208c.746.606 1.026.56 2.428.466l13.215-.793c.28 0 .047-.28-.046-.326L17.86 1.968c-.42-.326-.981-.7-2.055-.607L3.01 2.295c-.466.046-.56.28-.374.466zm.793 3.08v13.904c0 .747.373 1.027 1.214.98l14.523-.84c.841-.046.935-.56.935-1.167V6.354c0-.606-.233-.933-.748-.887l-15.177.887c-.56.047-.747.327-.747.933zm14.337.745c.093.42 0 .84-.42.888l-.7.14v10.264c-.608.327-1.168.514-1.635.514-.748 0-.935-.234-1.495-.933l-4.577-7.186v6.952L12.21 19s0 .84-1.168.84l-3.222.186c-.093-.186 0-.653.327-.746l.84-.233V9.854L7.822 9.76c-.094-.42.14-1.026.793-1.073l3.456-.233 4.764 7.279v-6.44l-1.215-.139c-.093-.514.28-.887.747-.933zM1.936 1.035l13.31-.98c1.634-.14 2.055-.047 3.082.7l4.249 2.986c.7.513.934.653.934 1.213v16.378c0 1.026-.373 1.634-1.68 1.726l-15.458.934c-.98.047-1.448-.093-1.962-.747l-3.129-4.06c-.56-.747-.793-1.306-.793-1.96V2.667c0-.839.374-1.54 1.447-1.632"
                  fill="#6b7280" />
              </svg>
            </a>
            <a href="https://www.instagram.com/ajembazsii/" target="_blank" class="marquee-item icon-item"
              @mouseenter="handleMouseEnter" @mouseleave="handleMouseLeave">
              <i class="bi bi-instagram" title="@ajembazsii"></i>
            </a>
            <a href="https://www.instagram.com/capuuus" target="_blank" class="marquee-item icon-item"
              @mouseenter="handleMouseEnter" @mouseleave="handleMouseLeave">
              <i class="bi bi-instagram" title="@capuuus"></i>
            </a>
          </div>
        </div>
      </section>
      <section class="footer-section">
        <p class="copyright">
          Copyright © {{ currentYear }} TFB-KG™ | Mouri
        </p>
        <p class="company">Iskolai Esőerdő Projekt</p>
        <p class="tagline">Minden jog fenntartva.</p>
      </section>
    
    </div>
  </footer>
</template>

<style scoped>

.icon-svg {
  width: 2rem;
  padding-bottom: 7px;
  transition: all 0.3s ease;
}

.icon-svg path {
  transition: fill 0.4s ease;
}

/* Hover állapot */
.icon-item:hover path {
  fill: url(#icon-gradient);
}


.thevr-footer {
  background: linear-gradient(to bottom, #0a2510, #000c02);
  color: #ffffff;
  padding: 3rem 2rem 2rem;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif;
}

.footer-content {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
}

.footer-logo {
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 1rem;
  color: #ffffff;
}

.footer-nav {
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
}

.footer-link {
  position: relative;
  color: #cccccc;
  text-decoration: none;
  font-size: 0.95rem;
  font-weight: 500;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  padding-bottom: 2px;
}

.footer-link::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: 2px;
  background-color: #ffffff;
  transition: width 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.footer-link:hover {
  color: #ffffff;
  transform: translateY(-2px);
}

.footer-link:hover::after {
  width: 100%;
}

.footer-link:active {
  transform: translateY(0);
}

.copyright,
.company,
.tagline {
  font-size: 0.875rem;
  color: #888888;
  margin: 0.5rem 0;
  transition: color 0.3s ease;
}

.copyright {
  font-weight: 500;
}

.copyright:hover,
.company:hover,
.tagline:hover {
  color: #aaaaaa;
}

@media (max-width: 768px) {
  .footer-nav {
    flex-direction: column;
    gap: 0.75rem;
    text-align: center;
  }

  .thevr-footer {
    padding: 2rem 1rem 1.5rem;
  }

  .footer-link:hover {
    transform: translateX(4px);
  }

  .footer-logo{
      text-align: center;
  }
}

@media (prefers-reduced-motion: no-preference) {
  .footer-link:hover {
    text-shadow: 0 0 8px rgba(255, 255, 255, 0.3);
  }
}




.marquee-container {
  width: 80%;
  overflow: hidden;
  padding: 20px;
}

.marquee-inner {
  display: flex;
  width: fit-content;
  white-space: nowrap;
}

.marquee-set {
  display: flex;
  align-items: center;
}

.marquee-item {
  display: inline-block;
  font-size: 2rem;
  padding: 0 2rem;
}

.text-item {
  font-weight: bold;
  color: #6b7280;
  transition: all 0.3s ease;
  cursor: default;
}

.text-item:hover {
  background: linear-gradient(135deg, #197728 0%, #31eb4a 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.icon-item {
  color: #6b7280;
  text-decoration: none;
  transition: all 0.3s ease;
}

.icon-item:hover {
  transform: scale(1.1);
  background: linear-gradient(135deg, #006811 0%, #31eb4a 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
</style>