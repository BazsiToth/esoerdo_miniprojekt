<script setup>
import { ref } from 'vue';

const eleres = ref("../assets/galery/animals/Galery");

const imageFiles = import.meta.glob('../assets/galery/animals/*.jpg', { eager: true })
const IMAGE_COUNT = Object.keys(imageFiles).length

const selectedImage = ref(null);

const getImageFromUrl = (url) => {
    return new URL(eleres.value + (url + 1) + ".jpg", import.meta.url).href
}

const openLightbox = (index) => {
    selectedImage.value = index;
}

const closeLightbox = () => {
    selectedImage.value = null;
}

const nextImage = () => {
    if (selectedImage.value < kepek.value - 1) {
        selectedImage.value++;
    }
}

const prevImage = () => {
    if (selectedImage.value > 0) {
        selectedImage.value--;
    }
}
</script>

<template>
    <section class="gallery-container">
        <div class="gallery-grid">
            <div v-for="(kep, index) in IMAGE_COUNT" :key="index" class="gallery-item" @click="openLightbox(index)">
                <img class="gallery-image" :src="getImageFromUrl(index)" :alt="'Kép ' + (index + 1)">
            </div>
        </div>

        <div v-if="selectedImage !== null" class="lightbox" @click.self="closeLightbox">
            <button class="close" @click="closeLightbox">
                <i class="bi bi-x-lg"></i>
            </button>
            <button v-if="selectedImage > 0" class="nav prev" @click="prevImage">
                <i class="bi bi-arrow-left-circle-fill"></i>
            </button>
            <img :src="getImageFromUrl(selectedImage)" :alt="'Kép ' + (selectedImage + 1)">
            <button v-if="selectedImage < kepek - 1" class="nav next" @click="nextImage">
                <i class="bi bi-arrow-right-circle-fill"></i>
            </button>
        </div>
    </section>
</template>

<style scoped>
.gallery-container {
    padding: 100px 20px 20px;
    max-width: 1200px;
    margin: 0 auto;
}

.gallery-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
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

    .gallery-grid {
        grid-template-columns: 1fr;
    }

    .gallery-image {
        height: 200px;
    }
}
</style>