<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';

const frontDrops = ref([]);
const backDrops = ref([]);
const scrollY = ref(0);

let isDragging = false;
let startPointerY = 0;
let startScrollY = 0;
let dragConsumed = false;
const DROP_HEIGHT = 60;

const random = (min, max) => Math.random() * (max - min) + min;

const makeItRain = () => {
  frontDrops.value = [];
  backDrops.value = [];

  const frontCount = 40;
  const backCount = 24;

  for (let i = 0; i < frontCount; i++) {
    const left = +(random(0, 100)).toFixed(2);
    const size = +(random(6, 14)).toFixed(1);
    const duration = +(random(1.4, 3.2)).toFixed(2);
    const delay = +(random(0, 4)).toFixed(2);
    const stemH = +(random(40, 75)).toFixed(0);
    frontDrops.value.push({
      left,
      size,
      duration,
      delay,
      stemH,
      z: 3
    });
  }

  for (let i = 0; i < backCount; i++) {
    const left = +(random(0, 100)).toFixed(2);
    const size = +(random(5, 11)).toFixed(1);
    const duration = +(random(0.6, 0.8)).toFixed(2);
    const delay = +(random(0, 5)).toFixed(2);
    const stemH = +(random(35, 65)).toFixed(0);
    backDrops.value.push({
      left,
      size,
      duration,
      delay,
      stemH,
      z: 1,
      opacity: 0.5
    });
  }
};

const updateScrollSync = () => {
  if (isDragging) return;
  const docHeight = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
  const maxTravel = window.innerHeight - DROP_HEIGHT - (window.innerHeight * 0.10);
  const ratio = docHeight > 0 ? window.scrollY / docHeight : 0;
  scrollY.value = Math.max(0, Math.min(maxTravel, ratio * maxTravel));
};

const startDrag = (e) => {
  isDragging = true;
  startPointerY = e.clientY;
  startScrollY = scrollY.value;
  window.addEventListener('mousemove', onDrag);
  window.addEventListener('mouseup', endDrag);
};

const onDrag = (e) => {
  if (!isDragging) return;
  const deltaY = e.clientY - startPointerY;
  if (Math.abs(deltaY) > 3) dragConsumed = true;
  applyDragDelta(deltaY);
};

const startDragTouch = (e) => {
  isDragging = true;
  startPointerY = e.touches[0].clientY;
  startScrollY = scrollY.value;
  window.addEventListener('touchmove', onDragTouch, { passive: false });
  window.addEventListener('touchend', endDragTouch);
};

const onDragTouch = (e) => {
  e.preventDefault();
  if (!isDragging) return;
  const touchY = e.touches[0].clientY;
  const deltaY = touchY - startPointerY;
  if (Math.abs(deltaY) > 3) dragConsumed = true;
  applyDragDelta(deltaY);
};

const applyDragDelta = (deltaY) => {
  const maxTravel = window.innerHeight - DROP_HEIGHT - (window.innerHeight * 0.10);
  let newScrollY = startScrollY + deltaY;
  newScrollY = Math.max(0, Math.min(maxTravel, newScrollY));
  scrollY.value = newScrollY;
  const docHeight = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
  const ratio = maxTravel > 0 ? newScrollY / maxTravel : 0;
  const docScroll = Math.round(ratio * docHeight);
  window.scrollTo(0, docScroll);
};

const endDrag = () => {
  isDragging = false;
  window.removeEventListener('mousemove', onDrag);
  window.removeEventListener('mouseup', endDrag);
  setTimeout(() => {
    dragConsumed = false;
  }, 120);
};

const endDragTouch = () => {
  isDragging = false;
  window.removeEventListener('touchmove', onDragTouch);
  window.removeEventListener('touchend', endDragTouch);
  setTimeout(() => {
    dragConsumed = false;
  }, 120);
};

const onDropClick = (e) => {
  if (dragConsumed) {
    e.stopImmediatePropagation();
    return;
  }
  window.scrollTo({ top: 0, behavior: 'smooth' });
  scrollY.value = 0;
};

onMounted(() => {
  makeItRain();
  updateScrollSync();
  document.body.style.cssText = 'scrollbar-width: none; -ms-overflow-style: none;';
  document.documentElement.style.cssText = 'scrollbar-width: none; -ms-overflow-style: none;';
  window.addEventListener('scroll', updateScrollSync, { passive: true });
  window.addEventListener('resize', updateScrollSync, { passive: true });
});

onBeforeUnmount(() => {
  window.removeEventListener('scroll', updateScrollSync);
  window.removeEventListener('mousemove', onDrag);
  window.removeEventListener('mouseup', endDrag);
  window.removeEventListener('touchmove', onDragTouch);
  window.removeEventListener('touchend', endDragTouch);
  window.removeEventListener('resize', updateScrollSync);
});
</script>

<template>
  <section id="home" class="home">
    <div class="rain front-row" aria-hidden="true">
      <div
        v-for="(drop, i) in frontDrops"
        :key="`f-${i}`"
        class="drop"
        :style="{
          left: drop.left + '%',
          '--w': drop.size + 'px',
          '--d': drop.duration + 's',
          '--delay': drop.delay + 's',
          '--stem-h': drop.stemH + '%',
          'z-index': drop.z
        }"
      >
        <div class="stem"></div>
        <div class="splat"></div>
      </div>
    </div>

    <div class="rain back-row" aria-hidden="true">
      <div
        v-for="(drop, i) in backDrops"
        :key="`b-${i}`"
        class="drop back"
        :style="{
          left: drop.left + '%',
          '--w': drop.size + 'px',
          '--d': drop.duration + 's',
          '--delay': drop.delay + 's',
          '--stem-h': drop.stemH + '%',
          'opacity': drop.opacity,
          'z-index': drop.z
        }"
      >
        <div class="stem"></div>
        <div class="splat"></div>
      </div>
    </div>

    <img
      src="../assets/svgs/raindrop.svg"
      alt="Esőcsepp"
      class="scroll-drop"
      :style="{ transform: `translateY(${scrollY}px)` }"
      @mousedown.prevent="startDrag"
      @touchstart.prevent="startDragTouch"
      @click.prevent="onDropClick"
      role="button"
      aria-label="Esőcsepp"
    />

    <div class="container">
      <h1>Welcome to Vue 3</h1>
      <h4>Scroll down or drag the drop!</h4>
      <p>The blue drop on the top right can be dragged to scroll. It won't leave the screen.</p>
    </div>
  </section>
</template>

<style scoped>

#home {
  position: relative;
  width: 100%;
  min-height: 100dvh; /* height helyett min-height */
  background: linear-gradient(to bottom, #202020, #111119);
  color: #e7e6f1;
  text-align: center;
  overflow: hidden; /* overflow-x helyett overflow */
}

#home::-webkit-scrollbar {
  display: none;
}

.rain {
  position: absolute;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  top: 0;
}

.back-row { transform: translateY(40px); }

.drop {
  position: absolute;
  top: -10dvh;
  width: var(--w, 8px);
  height: calc(var(--w, 8px) * 6);
  transform-origin: center top;
  will-change: transform, opacity;
  animation: fall var(--d, 2.6s) linear var(--delay, 0s) infinite;
}

.drop.back { filter: blur(0.2px); }

.stem {
  width: 1px;
  height: var(--stem-h, 60%);
  margin-left: calc(var(--w,8px) / 2);
  background: linear-gradient(to bottom, rgba(255,255,255,0.1), rgba(255,255,255,0.6));
  transform-origin: center top;
}

.splat {
  width: calc(var(--w, 8px) * 1.8);
  height: calc(var(--w, 8px) * 0.6);
  border-radius: 50%;
  background: rgba(255,255,255,0.08);
  position: absolute;
  left: 50%;
  transform: translateX(-50%) scale(0);
  bottom: -6px;
  opacity: 0;
  transform-origin: center center;
  animation: splat var(--d, 2.6s) linear var(--delay, 0s) infinite;
}


@keyframes fall {
  0% {
    transform: translateY(0);
    opacity: 1;
  }
  85% {
    transform: translateY(calc(100dvh - 3dvh));
    opacity: 1;
  }
  100% {
    transform: translateY(calc(100dvh - 3dvh));
    opacity: 0;
  }
}

@keyframes splat {
  0% {
    opacity: 0;
    transform: translateX(-50%) scale(0);
  }
  82% {
    opacity: 0;
    transform: translateX(-50%) scale(0);
  }
  88% {
    opacity: 1;
    transform: translateX(-50%) scale(1);
  }
  100% {
    opacity: 0;
    transform: translateX(-50%) scale(1.4);
  }
}

.scroll-drop {
  position: fixed;
  top: 2%;
  right: 18px;
  width: 56px;
  height: auto;
  z-index: 999;
  cursor: grab;
  user-select: none;
  touch-action: none;
  transition: transform 0.04s linear;
}
.scroll-drop:active {
  cursor: grabbing;
}

.container {
  position: relative;
  z-index: 4;
  padding: 80px 20px; 
  max-width: 900px;
  margin: 0 auto;
}

h1 { font-weight: 300; margin: 0 0 12px; }
h4 { margin: 8px 0 20px; color: #97a0d5; font-weight: 600; }
p { margin: 0 0 36px; color: #cbd2ea; }

@media (max-width: 520px) {
  .scroll-drop { right: 12px; width: 44px; }
  .container { padding-top: 100px; }
  .drop { height: calc(var(--w,8px) * 5); }
  .splat { bottom: -4px; }
}

@media (max-width:586px){
  @keyframes fall {
  0% {
    transform: translateY(0);
    opacity: 1;
  }
  85% {
    transform: translateY(calc(100dvh));
    opacity: 1;
  }
  100% {
    transform: translateY(calc(100dvh));
    opacity: 0;
  }
}
}
</style>
