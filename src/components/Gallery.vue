<script setup>
import { ref, computed } from 'vue';

const imageFilesAnimal = import.meta.glob('../assets/gallery/animals/*.jpg', { eager: true });
const imageFilesPlant = import.meta.glob('../assets/gallery/plants/*.jpg', { eager: true });

const animalImages = computed(() => {
    return Object.keys(imageFilesAnimal).map(path => imageFilesAnimal[path].default);
});

const plantImages = computed(() => {
    return Object.keys(imageFilesPlant).map(path => imageFilesPlant[path].default);
});

const selectedImage = ref(null);
const selectedGallery = ref(null);
const selectedCategory = ref('all');

const openLightbox = (imageUrl, gallery) => {
    selectedImage.value = imageUrl;
    selectedGallery.value = gallery;
}

const closeLightbox = () => {
    selectedImage.value = null;
    selectedGallery.value = null;
}

const getCurrentImages = () => {
    return selectedGallery.value === 'animals' ? animalImages.value : plantImages.value;
}

const nextImage = () => {
    const images = getCurrentImages();
    const currentIndex = images.indexOf(selectedImage.value);
    if (currentIndex < images.length - 1) {
        selectedImage.value = images[currentIndex + 1];
    }
}

const prevImage = () => {
    const images = getCurrentImages();
    const currentIndex = images.indexOf(selectedImage.value);
    if (currentIndex > 0) {
        selectedImage.value = images[currentIndex - 1];
    }
}

const canGoPrev = computed(() => {
    if (selectedImage.value === null) return false;
    const images = getCurrentImages();
    return images.indexOf(selectedImage.value) > 0;
});

const canGoNext = computed(() => {
    if (selectedImage.value === null) return false;
    const images = getCurrentImages();
    const currentIndex = images.indexOf(selectedImage.value);
    return currentIndex < images.length - 1;
});
</script>

<template>
    <section class="gallery-container">
        <div class="header-section">
            <h1 class="main-title">Galéria</h1>
            <select 
                class="form-select" 
                v-model="selectedCategory" 
                @change="closeLightbox"
                aria-label="Galéria kategória választó">
                <option value="all">Összes</option>
                <option value="animals">Állatvilág</option>
                <option value="plants">Növényvilág</option>
            </select>
        </div>

        <div v-if="selectedCategory === 'all' || selectedCategory === 'animals'">
            <h2>Állatvilág</h2>
            <div class="gallery-grid">
                <div v-for="(image, index) in animalImages" :key="'animal-' + index"
                     class="gallery-item" @click="openLightbox(image, 'animals')">
                    <img class="gallery-image" :src="image" :alt="'Állat kép ' + (index + 1)">
                </div>
            </div>
        </div>

        <div v-if="selectedCategory === 'all' || selectedCategory === 'plants'">
            <h2>Növényzet</h2>
            <div class="gallery-grid">
                <div v-for="(image, index) in plantImages" :key="'plant-' + index"
                     class="gallery-item" @click="openLightbox(image, 'plants')">
                    <img class="gallery-image" :src="image" :alt="'Növény kép ' + (index + 1)">
                </div>
            </div>
        </div>

        <div v-if="selectedImage !== null" class="lightbox" @click.self="closeLightbox">
            <button class="close" @click="closeLightbox">
                <i class="bi bi-x-lg"></i>
            </button>
            <button v-if="canGoPrev" class="nav prev" @click="prevImage">
                <i class="bi bi-arrow-left-circle-fill"></i>
            </button>
            <img :src="selectedImage" alt="Nagyított kép">
            <button v-if="canGoNext" class="nav next" @click="nextImage">
                <i class="bi bi-arrow-right-circle-fill"></i>
            </button>
        </div>
    </section>
</template>

<style scoped>
.d-flex {
    padding: 2rem 0rem 2rem 0rem;
}

.gallery-container {
    padding: 100px 20px 20px;
    max-width: 1200px;
    margin: 0 auto;
}

.header-section {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 3rem;
    gap: 2rem;
}

.main-title {
    font-size: 2.5rem;
    font-weight: 700;
    color: #2c3e50;
    margin: 0;
    flex-shrink: 0;
}

select {
    width: 100%;
    max-width: 280px;
    height: 3.5rem;
    font-size: 1.1rem;
    padding: 0 1.5rem;
    border: 2px solid #e0e0e0;
    border-radius: 12px;
    background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
    color: #2c3e50;
    cursor: pointer;
    transition: all 0.3s ease;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
    font-weight: 500;
}

select:hover {
    border-color: #4CAF50;
    box-shadow: 0 4px 12px rgba(76, 175, 80, 0.2);
    transform: translateY(-2px);
}

select:focus {
    outline: none;
    border-color: #4CAF50;
    box-shadow: 0 0 0 4px rgba(76, 175, 80, 0.1);
}

select option {
    padding: 1rem;
    font-size: 1rem;
}

h2 {
    margin: 40px 0 20px;
    font-size: 2rem;
    color: #333;
}

.gallery-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
    margin-bottom: 40px;
}

.gallery-item {
    cursor: pointer;
    overflow: hidden;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, .15);
    transition: transform .3s;
}

.gallery-item:hover {
    transform: translateY(-5px);
}

.gallery-image {
    width: 100%;
    height: 250px;
    object-fit: cover;
    display: block;
}

.lightbox {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, .9);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 9999;
}

.lightbox img {
    max-width: 90%;
    max-height: 90%;
    object-fit: contain;
}

.close {
    position: absolute;
    top: 20px;
    right: 20px;
    background: transparent;
    border: none;
    color: white;
    font-size: 32px;
    cursor: pointer;
    transition: all .3s;
    display: flex;
    align-items: center;
    justify-content: center;
}

.close:hover {
    color: #f44336;
    transform: scale(1.2);
}

.nav {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    background: transparent;
    border: none;
    color: white;
    font-size: 48px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all .3s;
}

.nav:hover {
    transform: translateY(-50%) scale(1.2);
}

.prev {
    left: 20px;
}

.next {
    right: 20px;
}

@media (max-width: 992px) {
    .gallery-grid {
        grid-template-columns: repeat(2, 1fr);
    }
}

@media (max-width: 576px) {
    .gallery-container {
        padding-top: 80px;
    }

    .header-section {
        flex-direction: column;
        align-items: stretch;
        gap: 1.5rem;
        margin-bottom: 2rem;
    }

    .main-title {
        font-size: 2rem;
        text-align: center;
    }

    select {
        max-width: 100%;
    }

    .gallery-grid {
        grid-template-columns: 1fr;
    }

    .gallery-image {
        height: 200px;
    }
}
</style>