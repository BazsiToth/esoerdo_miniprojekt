<script setup>
import { ref } from 'vue'

const isOpen = ref(false)

const closeMenu = () => {
  isOpen.value = false
}
</script>

<template>
  <nav class="navbar navbar-expand-lg navbar-light fixed-top navbar-custom">
    <div class="container">
      <a class="navbar-brand" href="#">Mouri</a>
      <button
        class="navbar-toggler"
        type="button"
        @click="isOpen = !isOpen"
        :aria-expanded="isOpen.toString()"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" :class="{ show: isOpen }" id="navbarSupportedContent">
        <ul class="navbar-nav ms-auto">
          <li class="nav-item">
            <a class="nav-link active" href="#" @click="closeMenu">Home</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#" @click="closeMenu">About</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#" @click="closeMenu">Portfolio</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#" @click="closeMenu">Services</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#" @click="closeMenu">Contact</a>
          </li>
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
  padding-bottom: 10px;
  padding-left: 40px;
  padding-right: 40px;
  align-items: center;
  border-radius: 10px;
}

/* Reszponzív breakpontok */
@media (max-width: 1200px) {
  .navbar-custom {
    width: 80%;
  }
}
@media (max-width: 768px) {
  .navbar-custom {
    width: 60%;
  }
}
@media (max-width: 480px) {
  .navbar-custom {
    width: 80%;
  }
}

/* Alap stílusok */
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
