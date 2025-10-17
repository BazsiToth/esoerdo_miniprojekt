<script setup>
import { ref, onMounted } from 'vue'
import LogoSvg from './LogoSvg.vue'

const isOpen = ref(false)
const isDropdownOpen = ref(false)
const windowWidth = ref(window.innerWidth)

const closeMenu = () => {
  isOpen.value = false
  isDropdownOpen.value = false
}

const handleResize = () => {
  windowWidth.value = window.innerWidth
  if (windowWidth.value > 992) {
    isDropdownOpen.value = false
  }
}

onMounted(() => {
  window.addEventListener('resize', handleResize)
})
</script>

<template>
  <nav class="navbar navbar-expand-lg navbar-light fixed-top navbar-custom">
    <div class="container">
      <a class="navbar-brand brand-with-logo" href="#">
        <LogoSvg />
        <span class="brand-text">Mouri</span>
      </a>

      <button class="navbar-toggler" type="button" @click="isOpen = !isOpen" :aria-expanded="isOpen.toString()"
        aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" :class="{ show: isOpen }" id="navbarSupportedContent">
        <ul class="navbar-nav ms-auto">
          <li class="nav-item">
            <router-link to="/" class="nav-link active" href="#" @click="closeMenu">Főoldal</router-link>
          </li>

          <li class="nav-item dropdown" @mouseenter="windowWidth > 991 && (isDropdownOpen = true)"
            @mouseleave="windowWidth > 991 && (isDropdownOpen = false)">
            <a class="nav-link dropdown-toggle" href="#" role="button"
              @click.prevent="windowWidth <= 991 && (isDropdownOpen = !isDropdownOpen)"
              :class="{ 'dropdown-toggle-opened-design': isDropdownOpen && windowWidth <= 991 }">
              Esőerdő
            </a>
            <ul class="dropdown-menu dropdown-menu-dark" :class="{ show: isDropdownOpen }">
              <li><a class="dropdown-item" href="#">Éghajlata</a></li>
              <li><a class="dropdown-item" href="#">Természete</a></li>
              <li><a class="dropdown-item" href="#">Állatvilága</a></li>
            </ul>
          </li>
          <li class="nav-item"><router-link to="/galeria" class="nav-link" href="#"
              @click="closeMenu">Galéria</router-link></li>
          <li class="nav-item"><router-link to="/quiz" class="nav-link" href="#" @click="closeMenu">Quiz</router-link>
          </li>
          <li class="nav-item"><a class="nav-link" href="#" @click="closeMenu">Rólunk</a></li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<style scoped>
.navbar-custom {
  background-color: rgba(0, 0, 0, 0.4);
  margin: 0 auto;
  width: 50%;
  margin-top: 10px;
  padding: 10px 40px;
  border-radius: 10px;
}

@media (min-width: 992px) {
  .nav-item.dropdown:hover .dropdown-menu {
    display: block;
    margin-top: 5px;
    border-radius: 0 6px 6px 6px;
  }
}

@media (max-width: 1200px) {
  .navbar-custom {
    width: 80%;
  }
}

@media (max-width: 768px) {
  .navbar-custom {
    width: 80%;
  }
}

@media (max-width: 480px) {
  .navbar-custom {
    width: 80%;
  }
}

.dropdown-toggle-opened-design {
  background-color: rgba(0, 0, 0, 0.4);
  border-radius: 6px 6px 0 0;
}

.nav-item {
  padding: 5px;
  font-weight: 500;
  text-shadow: 2px 2px 10px black;
  position: relative;
}

.dropdown-menu {
  text-align: center;
  border: 0;
  border-radius: 0 0 6px 6px;
}

.dropdown-item {
  color: white;
  font-weight: 500;
  text-shadow: 2px 2px 10px black;
  position: relative;
  padding: 12px 20px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.dropdown-item::after {
  content: '';
  position: absolute;
  bottom: 8px;
  left: 50%;
  transform: translateX(-50%);
  width: 0;
  height: 2px;
  background-color: #fff;
  transition: width 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.dropdown-item:hover {
  background-color: rgba(0, 0, 0, 0.8);
  border-radius: 6px;
  transform: translateY(-2px);
}

.dropdown-item:hover::after {
  width: 70%;
}

.nav-item:hover {
  background-color: rgba(0, 0, 0, 0.8);
  border-radius: 6px;
}

.dropdown-menu-dark {
  background-color: rgba(0, 0, 0, 0.4);
}

.dropdown-toggle:hover,
.nav-link:hover {
  background-color: none !important;
  border-radius: 6px;
}

.navbar-light .navbar-brand {
  color: #fff;
  font-size: 25px;
  text-transform: uppercase;
  font-weight: bold;
  letter-spacing: 2px;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 12px;
}

.brand-with-logo {
  display: flex;
  align-items: center;
  gap: 12px;
}

.brand-text {
  transition: all 0.3s ease;
}

.navbar-light .navbar-brand:hover .brand-text {
  transform: scale(1.05);
  text-shadow: 0 0 10px rgba(255, 255, 255, 0.3);
}

.navbar-light .navbar-nav .nav-link {
  color: #fff;
  position: relative;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.navbar-light .navbar-nav .nav-link::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 0;
  height: 2px;
  background-color: #fff;
  transition: width 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.navbar-light .navbar-nav .nav-link:hover::after {
  width: 80%;
}

.navbar-light .navbar-nav .nav-link:hover {
  transform: translateY(-2px);
  text-shadow: 0 0 8px rgba(255, 255, 255, 0.3);
}

/* Dropdown toggle specifikus szabályok */
.dropdown-toggle::after {
  display: inline-block !important;
  margin-left: 0.255em;
  vertical-align: 0.255em;
  content: "";
  border-top: 0.3em solid;
  border-right: 0.3em solid transparent;
  border-bottom: 0;
  border-left: 0.3em solid transparent;
}

.nav-item.dropdown .dropdown-toggle::after {
  content: '';
  position: static;
  width: auto;
  height: auto;
  background-color: transparent;
  border-top: 0.3em solid;
  border-right: 0.3em solid transparent;
  border-bottom: 0;
  border-left: 0.3em solid transparent;
  transform: none;
  transition: none;
}

.nav-item.dropdown .dropdown-toggle:hover::after {
  width: auto;
  background-color: transparent;
}

.navbar-toggler {
  background: #fff;
}

.navbar-nav {
  text-align: center;
}

.nav-link {
  padding: 0.2rem 1rem;
}

.nav-link.active,
.nav-link:focus {
  color: #fff;
}

.navbar-toggler {
  padding: 1px 5px;
  font-size: 18px;
  line-height: 0.3;
}

.navbar-light .navbar-nav .nav-link:focus,
.navbar-light .navbar-nav .nav-link:hover {
  color: #fff;
}
</style>
