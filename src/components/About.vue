<script setup>
import { ref } from 'vue'

const formData = ref({
  name: '',
  email: '',
  message: ''
})

const isSubmitting = ref(false)
const submitSuccess = ref(false)

const handleSubmit = async () => {
  isSubmitting.value = true
  
  try {
    // Itt kezelheted a form küldését (pl. API hívás)
    console.log('Contact form submitted:', formData.value)
    
    // Szimuláljuk az API hívást
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    submitSuccess.value = true
    
    // Form reset
    setTimeout(() => {
      formData.value = {
        name: '',
        email: '',
        message: ''
      }
      submitSuccess.value = false
    }, 3000)
    
  } catch (error) {
    console.error('Error submitting form:', error)
  } finally {
    isSubmitting.value = false
  }
}
</script>

<template>
  <div class="contact-container">
    <div class="contact-card">
      <h1 class="contact-title">LÉPJ VELÜNK KAPCSOLATBA</h1>
      
      <form @submit.prevent="handleSubmit">
        <!-- Név mező -->
        <div class="form-group mb-5">
          <input 
            type="text" 
            id="name" 
            v-model="formData.name"
            class="form-input"
            autocomplete="name"
            required
          />
          <label 
            for="name" 
            class="form-label"
            :class="{ 'active': formData.name }"
          >
            Neved
          </label>
        </div>

        <!-- Email mező -->
        <div class="form-group mb-5">
          <input 
            type="email" 
            id="email" 
            v-model="formData.email"
            class="form-input"
            autocomplete="email"
            required
          />
          <label 
            for="email" 
            class="form-label"
            :class="{ 'active': formData.email }"
          >
            Email címed
          </label>
        </div>

        <!-- Üzenet mező -->
        <div class="form-group mb-5">
          <textarea 
            id="message" 
            v-model="formData.message"
            class="form-input form-textarea"
            rows="1"
            required
          ></textarea>
          <label 
            for="message" 
            class="form-label"
            :class="{ 'active': formData.message }"
          >
            Üzeneted
          </label>
        </div>

        <!-- Success message -->
        <div v-if="submitSuccess" class="alert alert-success mb-4" role="alert">
          <i class="bi bi-check-circle-fill me-2"></i>
          Köszönjük az üzeneted! Hamarosan válaszolunk.
        </div>

        <!-- Submit gomb -->
        <div class="d-flex justify-content-center">
          <button 
            type="submit" 
            class="btn-submit"
            :disabled="isSubmitting"
          >
            <span v-if="!isSubmitting">KÜLDÉS</span>
            <span v-else>
              <span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
              KÜLDÉS...
            </span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped>
.contact-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #1e7e34 0%, #28a745 50%, #20c997 100%);
  padding: 20px;
}

.contact-card {
  background-color: #ffffff;
  border-radius: 15px;
  box-shadow: 0 15px 50px rgba(0, 0, 0, 0.25);
  padding: 60px 50px 50px;
  width: 100%;
  max-width: 600px;
}

.contact-title {
  font-size: 32px;
  font-weight: 700;
  color: #333;
  margin: 0 0 40px;
  padding: 5px 0 5px 20px;
  border-left: 5px solid #28a745;
  font-family: 'Calibri', sans-serif;
  text-transform: uppercase;
}

.form-group {
  position: relative;
  margin-bottom: 50px;
}

.form-input {
  width: 100%;
  padding: 0;
  margin: 0;
  font-size: 20px;
  line-height: 50px;
  height: 50px;
  border: none;
  border-bottom: 2px solid #ddd;
  background-color: transparent;
  outline: none;
  transition: border-color 0.3s ease;
  font-family: 'Calibri', sans-serif;
  resize: none;
}

.form-textarea {
  height: auto;
  min-height: 50px;
  padding-top: 15px;
  line-height: 1.5;
}

.form-input:focus {
  border-bottom-color: #28a745;
}

.form-label {
  position: absolute;
  top: 0;
  left: 0;
  font-size: 20px;
  line-height: 50px;
  color: #999;
  pointer-events: none;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  font-family: 'Calibri', sans-serif;
}

.form-input:focus + .form-label,
.form-label.active {
  transform: translate(-5px, -28px) scale(0.75);
  color: #28a745;
  font-weight: 600;
}

.btn-submit {
  font-family: 'Calibri', sans-serif;
  padding: 16px 80px;
  background-color: transparent;
  border: 2px solid #28a745;
  color: #28a745;
  font-size: 20px;
  font-weight: 700;
  border-radius: 50px;
  cursor: pointer;
  outline: none;
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 1.5px;
}

.btn-submit:hover:not(:disabled) {
  background-color: #28a745;
  color: #ffffff;
  transform: translateY(-3px);
  box-shadow: 0 8px 25px rgba(40, 167, 69, 0.4);
}

.btn-submit:active:not(:disabled) {
  transform: translateY(-1px);
  box-shadow: 0 4px 15px rgba(40, 167, 69, 0.3);
}

.btn-submit:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.alert {
  border-radius: 10px;
  font-size: 16px;
  animation: slideDown 0.4s ease-out;
}

@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Responsive design */
@media (max-width: 768px) {
  .contact-card {
    padding: 50px 40px;
  }

  .contact-title {
    font-size: 26px;
    margin-bottom: 35px;
  }
}

@media (max-width: 576px) {
  .contact-card {
    padding: 40px 25px;
  }

  .contact-title {
    font-size: 22px;
    margin-bottom: 30px;
  }

  .form-input,
  .form-label {
    font-size: 18px;
    line-height: 40px;
    height: 40px;
  }

  .form-textarea {
    min-height: 40px;
  }

  .btn-submit {
    padding: 14px 50px;
    font-size: 18px;
  }
}
</style>
