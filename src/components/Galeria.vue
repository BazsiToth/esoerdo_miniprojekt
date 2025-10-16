<script setup>
import { ref } from 'vue';
const eleres = ref("../assets/Slider_Slide");
import { kepekszama } from '../datas/rainforests';

const kepek = ref(kepekszama.at(0));
console.log(kepek);

const getImageFromUrl = (url) => {
      return new URL(eleres.value+(url+1)+".jpg", import.meta.url).href
}
</script>
<template>
    <section>
        <div v-for="(kep, index) in kepek">
            <img :src="getImageFromUrl(index)" alt="kep">
        </div>
    </section>
</template>
<style scoped>

</style>