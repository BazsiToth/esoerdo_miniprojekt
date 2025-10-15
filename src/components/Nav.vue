<script setup>
import { ref, onMounted } from 'vue'

const isOpen = ref(false)
const isDropdownOpen = ref(false)
const windowWidth = ref(window.innerWidth)

const closeMenu = () => {
  isOpen.value = false
  isDropdownOpen.value = false
}

// Figyeljük az ablakméret változását
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
      <a class="navbar-brand" href="#">Mouri</a>

      <!-- Hamburger -->
      <button class="navbar-toggler" type="button" @click="isOpen = !isOpen" :aria-expanded="isOpen.toString()"
        aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" :class="{ show: isOpen }" id="navbarSupportedContent">
        <ul class="navbar-nav ms-auto">
          <li class="nav-item">
            <a class="nav-link active" href="#" @click="closeMenu">Főoldal</a>
          </li>

          <!-- Dropdown -->
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
          <li class="nav-item"><a class="nav-link" href="#" @click="closeMenu">Quiz</a></li>
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

/* Hover dropdown nagy képernyőn */
@media (min-width: 992px) {
  .nav-item.dropdown:hover .dropdown-menu {
    display: block;
    margin-top: 5px;
    border-radius: 0 6px;
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
}


.dropdown-menu {
  text-align: center;
  border: 0;
  border-radius: 0 0 6px 6px;
}

.nav-item:hover {
  background-color: rgba(0, 0, 0, 0.8);
  border-radius: 6px;
}

.dropdown-menu-dark {
  background-color: rgba(0, 0, 0, 0.4);
}

.dropdown-item:hover {
  background-color: rgba(0, 0, 0, 0.8);
  border-radius: 6px;
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
}

.navbar-light .navbar-nav .nav-link {
  color: #fff;
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
