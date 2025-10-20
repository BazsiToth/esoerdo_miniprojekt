<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const goHome = () => {
  router.push('/')
}
</script>

<template>
  <div class="not-found-container">
    <div class="jungle-overlay"></div>
    <div class="not-found-content">
      <div class="error-wrapper">
        <h1 class="error-code">404</h1>
      </div>
      
      <h2 class="error-title">Elvesztél az Esőerdőben!</h2>
      <p class="error-message">
        Az általad keresett ösvény nem létezik ebben a dzsungelben.
      </p>
      
      <div class="button-group">
        <button @click="goHome" class="btn-home">
          Vissza a Főoldalra
        </button>
        
        <router-link to="/" class="link-home">
          vagy fedezd fel az esőerdőt →
        </router-link>
      </div>
    </div>
  </div>
</template>

<style scoped>
.not-found-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #1e7e34 0%, #28a745 30%, #20c997 70%, #17a2b8 100%);
  background-size: 400% 400%;
  animation: gradientShift 15s ease infinite;
  padding: 20px;
  position: relative;
  overflow: hidden;
}

.jungle-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: 
    radial-gradient(circle at 20% 80%, rgba(40, 167, 69, 0.3) 0%, transparent 50%),
    radial-gradient(circle at 80% 20%, rgba(32, 201, 151, 0.3) 0%, transparent 50%),
    radial-gradient(circle at 50% 50%, rgba(30, 126, 52, 0.2) 0%, transparent 70%);
  pointer-events: none;
}

@keyframes gradientShift {
  0%, 100% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
}

.not-found-content {
  text-align: center;
  color: white;
  max-width: 700px;
  z-index: 2;
  position: relative;
}

.error-wrapper {
  position: relative;
  display: inline-block;
}

.error-code {
  font-size: 180px;
  font-weight: 900;
  margin: 0;
  text-shadow: 
    4px 4px 8px rgba(0, 0, 0, 0.4),
    0 0 40px rgba(40, 167, 69, 0.5);
  animation: float 3s ease-in-out infinite;
  background: linear-gradient(45deg, #ffffff, #d4edda);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.error-title {
  font-size: 48px;
  font-weight: 700;
  margin: 30px 0 20px;
  text-transform: uppercase;
  letter-spacing: 3px;
  text-shadow: 2px 2px 6px rgba(0, 0, 0, 0.4);
}

.error-message {
  font-size: 22px;
  margin: 20px auto 50px;
  opacity: 0.95;
  max-width: 500px;
  line-height: 1.6;
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.3);
}

.button-group {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}

.btn-home {
  padding: 18px 50px;
  background: linear-gradient(135deg, #ffffff 0%, #d4edda 100%);
  color: #1e7e34;
  border: 3px solid #28a745;
  border-radius: 50px;
  font-size: 20px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 2px;
  box-shadow: 
    0 6px 20px rgba(0, 0, 0, 0.3),
    inset 0 1px 0 rgba(255, 255, 255, 0.5);
}

.btn-home:hover {
  transform: translateY(-4px);
  box-shadow: 
    0 8px 30px rgba(40, 167, 69, 0.5),
    inset 0 1px 0 rgba(255, 255, 255, 0.5);
  background: linear-gradient(135deg, #d4edda 0%, #ffffff 100%);
}

.btn-home:active {
  transform: translateY(-2px);
}

.link-home {
  color: #d4edda;
  text-decoration: none;
  font-size: 18px;
  font-weight: 500;
  transition: all 0.3s ease;
  padding: 8px 16px;
  border-radius: 20px;
  border: 2px solid transparent;
}

.link-home:hover {
  color: white;
  border-color: rgba(255, 255, 255, 0.3);
  background: rgba(255, 255, 255, 0.1);
  transform: translateX(5px);
}

@keyframes float {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-25px);
  }
}

@media (max-width: 768px) {
  .error-code {
    font-size: 120px;
  }
  
  .error-title {
    font-size: 36px;
    letter-spacing: 2px;
  }
  
  .error-message {
    font-size: 18px;
    padding: 0 20px;
  }
  
  .btn-home {
    padding: 16px 40px;
    font-size: 18px;
  }
}

@media (max-width: 480px) {
  .error-code {
    font-size: 90px;
  }
  
  .error-title {
    font-size: 28px;
  }
  
  .error-message {
    font-size: 16px;
  }
  
  .btn-home {
    padding: 14px 30px;
    font-size: 16px;
  }
}
</style>
