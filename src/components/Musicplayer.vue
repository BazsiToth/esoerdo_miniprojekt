<script setup>
import { ref, onMounted, watch } from "vue";

const musicFiles = [
  new URL("../assets/musics/music1.mp3", import.meta.url).href,
  new URL("../assets/musics/music2.mp3", import.meta.url).href,
];

const currentTrackIndex = ref(0);
const volume = ref(0.5);
const muted = ref(false);
const showSlider = ref(false);
const hoveredSkip = ref(false);
const hoveredMute = ref(false);
let audio;

onMounted(() => {
  loadAndPlayTrack(currentTrackIndex.value);
});

watch(volume, (val) => {
  if (audio) audio.volume = val;
});
watch(muted, (val) => {
  if (audio) audio.muted = val;
});

const nextTrack = () => {
  currentTrackIndex.value = (currentTrackIndex.value + 1) % musicFiles.length;
  loadAndPlayTrack(currentTrackIndex.value);
};


function loadAndPlayTrack(index) {
  if (audio) {
    audio.pause();
    audio.currentTime = 0;
  }

  audio = new Audio(musicFiles[index]);
  audio.loop = false;
  audio.volume = volume.value;
  audio.muted = muted.value;


  audio.addEventListener("ended", nextTrack);

  audio.play().catch(() => {
    console.warn("Autoplay blokkolva, user interakcióra indul majd.");
  });
}

const toggleMute = () => {
  muted.value = !muted.value;
};

const handleMouseEnter = () => {
  showSlider.value = true;
};
const handleMouseLeave = () => {
  showSlider.value = false;
};
</script>

<template>
  <div class="music-player" @mouseenter="handleMouseEnter" @mouseleave="handleMouseLeave">
    <div class="volume-slider" v-show="showSlider">
      <input type="range" min="0" max="1" step="0.01" v-model="volume" />
    </div>
<button @click="toggleMute" class="volume-btn" :title="muted ? 'Némítva' : 'Hangerő'">
    <i 
      :class="muted
               ? (hoveredMute ? 'bi bi-volume-mute-fill fs-4' : 'bi bi-volume-mute fs-4')
               : (hoveredMute ? 'bi bi-volume-up-fill fs-4' : 'bi bi-volume-up fs-4')"
      @mouseenter="hoveredMute = true"
      @mouseleave="hoveredMute = false"
    ></i>
  </button>

  <button @click="nextTrack" class="next-btn" title="Következő zene">
    <i 
      :class="hoveredSkip ? 'bi bi-skip-end-fill fs-4' : 'bi bi-skip-end fs-4'"
      @mouseenter="hoveredSkip = true"
      @mouseleave="hoveredSkip = false"
    ></i>
  </button>
  </div>
</template>

<style scoped>
.music-player {
  position: fixed;
  bottom: 30px;
  right: 30px;
  display: flex;
  align-items: center;
  background: rgba(0, 94, 16, 0.6);
  border-radius: 30px;
  padding: 8px 14px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
  transition: 0.3s ease;
  z-index: 999;
}

.volume-btn,
.next-btn {
  background: none;
  border: none;
  cursor: pointer;
  color: #ffffff;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: color 0.3s ease;
}

.volume-btn:hover,
.next-btn:hover {
  color: #31ff5d;
}

.volume-slider {
  margin-left: 10px;
  opacity: 0;
  transform: translateX(10px);
  transition: all 0.3s ease;
}

.volume-slider input {
  width: 100px;
  accent-color: #80ffa649;
  cursor: pointer;
}

.music-player:hover .volume-slider {
  opacity: 1;
  transform: translateX(0);
}
</style>
