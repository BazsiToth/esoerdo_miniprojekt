<script setup>
import { ref, watch } from "vue";

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

const toggleSlider = () => {

  showSlider.value = !showSlider.value;
};
</script>

<template>
  <div class="music-player">

    <div class="volume-container">
      <button @click="toggleMute" @touchstart.prevent="toggleMute" class="volume-btn"
        :title="muted ? 'Némítva' : 'Hangerő'">
        <i :class="muted
            ? hoveredMute
              ? 'bi bi-volume-mute-fill fs-4'
              : 'bi bi-volume-mute fs-4'
            : hoveredMute
              ? 'bi bi-volume-up-fill fs-4'
              : 'bi bi-volume-up fs-4'
          " @mouseenter="hoveredMute = true" @mouseleave="hoveredMute = false"></i>
      </button>


      <div class="volume-slider" :class="{ visible: showSlider }">
        <input type="range" min="0" max="1" step="0.01" v-model="volume" @touchstart.stop />
      </div>


      <button class="slider-toggle-btn" @click="toggleSlider" @touchstart.prevent="toggleSlider"
        title="Hangerő szabályzás">
        <i class="bi bi-sliders fs-5"></i>
      </button>
    </div>


    <button @click="nextTrack" @touchstart.prevent="nextTrack" class="next-btn" title="Következő zene">
      <i :class="hoveredSkip ? 'bi bi-skip-end-fill fs-4' : 'bi bi-skip-end fs-4'" @mouseenter="hoveredSkip = true"
        @mouseleave="hoveredSkip = false"></i>
    </button>
  </div>
</template>

<style scoped>
.music-player {
  position: fixed;
  bottom: 20px;
  right: 20px;
  display: flex;
  align-items: center;
  background: rgba(0, 94, 16, 0.6);
  border-radius: 30px;
  padding: 8px 14px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
  z-index: 999;
  backdrop-filter: blur(8px);
}

.volume-container {
  display: flex;
  align-items: center;
  position: relative;
}

.volume-btn,
.next-btn,
.slider-toggle-btn {
  background: none;
  border: none;
  cursor: pointer;
  color: #fff;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: color 0.3s ease, transform 0.2s ease;
}

.volume-btn:hover,
.next-btn:hover,
.slider-toggle-btn:hover {
  color: #31ff5d;
  transform: scale(1.1);
}

.volume-slider {
  opacity: 0;
  transform: translateX(10px);
  transition: all 0.3s ease;
  position: absolute;
  left: -120px;
  top: 5px;
}

.volume-slider.visible {
  opacity: 1;
  transform: translateX(0);
}

.volume-slider input {
  width: 100px;
  accent-color: #31ff5d;
  cursor: pointer;
}


@media (max-width: 768px) {
  .music-player {
    bottom: 10px;
    right: 10px;
    padding: 6px 10px;
  }

  .volume-slider {
    left: auto;
    right: 0;
    top: -40px;
  }

  .volume-slider input {
    width: 80px;
  }

  .volume-btn,
  .next-btn,
  .slider-toggle-btn {
    width: 32px;
    height: 32px;
  }

  .music-player {
    border-radius: 20px;
  }
}

@media (max-width: 480px) {
  .music-player {
    flex-direction: row;
    padding: 6px 8px;
  }

  .volume-slider input {
    width: 60px;
  }

  .slider-toggle-btn {
    display: inline-flex;
  }
}
</style>
