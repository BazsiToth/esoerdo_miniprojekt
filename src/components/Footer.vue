<template>
  <footer class="thevr-footer">
    <div class="footer-content">
      <div class="footer-section">
        <h3 class="footer-logo">TheVR</h3>
        <nav class="footer-nav">
          <a href="/gaming" class="footer-link">Gaming</a>
          <a href="/tech" class="footer-link">Tech</a>
          <a href="/podcastek" class="footer-link">Podcastek</a>
          <a href="/rolunk" class="footer-link">Rólunk</a>
          <a href="/menetrend" class="footer-link">Menetrend</a>
          <a href="https://thevrshop.hu" class="footer-link">Shop</a>
          <a href="https://vod.thevr.hu" class="footer-link">Végigjátszások</a>
          <a href="https://hh.thevr.hu" class="footer-link">HH Kereső</a>
        </nav>
      </div>
      
      <div class="footer-section">
        <p class="copyright">
          Copyright © {{ currentYear }} TheVR™ | WeAreTheVR™
        </p>
        <p class="company">WE ARE MEDIA TECH Bt.</p>
        <p class="tagline">Minden jog fenntartva.</p>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { computed } from 'vue';

const currentYear = computed(() => new Date().getFullYear());
</script>

<style scoped>
.thevr-footer {
  background-color: #1a1a1a;
  color: #ffffff;
  padding: 3rem 2rem 2rem;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif;
}

.footer-content {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 2rem;
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
  margin-bottom: 2rem;
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
.company:hover {
  color: #aaaaaa;
}

@media (max-width: 768px) {
  .footer-nav {
    flex-direction: column;
    gap: 0.75rem;
  }
  
  .thevr-footer {
    padding: 2rem 1rem 1.5rem;
  }
  
  .footer-link:hover {
    transform: translateX(4px);
  }
}

/* Opcionális: Glow effect alternatíva */
@media (prefers-reduced-motion: no-preference) {
  .footer-link:hover {
    text-shadow: 0 0 8px rgba(255, 255, 255, 0.3);
  }
}
</style>
