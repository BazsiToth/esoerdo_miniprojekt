<script setup>
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { rainforests } from '../datas/rainforests.js'
import { ref, onMounted, nextTick } from 'vue'
import { gsap } from 'gsap'


const getImageFromUrl = (url) => {
  return new URL(url, import.meta.url).href
}

const images = import.meta.glob('../assets/*.{jpg,jpeg,png,webp}', { eager: true, as: 'url' })

onMounted(() => {
  const map = L.map('map').setView([0, 20], 2)

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  }).addTo(map)

  const latlngs = []

  for (let i = 0; i < rainforests.length; i++) {
    const erdo = rainforests[i]

    const filename = erdo.kep ? erdo.kep.split('/').pop() : null
    let imgUrl = ''

    if (filename) {
      const foundKey = Object.keys(images).find(k => k.endsWith('/' + filename) || k.includes(filename))
      if (foundKey) {
        imgUrl = images[foundKey]
      } else {
        const rel = erdo.kep ? `../${erdo.kep.replace(/^\//, '')}` : null
        try {
          imgUrl = rel ? getImageFromUrl(rel) : ''
        } catch (e) {
          imgUrl = ''
        }
      }
    }

    const placeholder = 'data:image/svg+xml;utf8,' + encodeURIComponent(
      `<svg xmlns='http://www.w3.org/2000/svg' width='400' height='250'><rect width='100%' height='100%' fill='#e6e6e6'/><text x='50%' y='50%' font-size='18' dominant-baseline='middle' text-anchor='middle' fill='#888'>Kép nem elérhető</text></svg>`
    )

    if (!imgUrl) imgUrl = placeholder

    const circle = L.circle(erdo.koordinatak, {
      color: '#2d8659',
      fillColor: '#45c98a',
      fillOpacity: 0.4,
      radius: erdo.radius,
      weight: 2
    }).addTo(map)

    const popupHTML = `
      <div style="text-align: center; max-width: 320px;">
        <div style="width:100%;height:180px;overflow:hidden;border-radius:8px;margin-bottom:8px;">
          <img
            src="${imgUrl}"
            alt="${erdo.nev}"
            style="width:100%;height:100%;object-fit:cover;display:block;"
            onerror="this.onerror=null;this.src='${placeholder}'"
          />
        </div>

        <h5 style="margin:6px 0 12px 0; color: #2d8659;">${erdo.nev}</h5>
        
        <p style="font-size:14px;color:#555;margin-bottom:12px;line-height:1.4;">
          ${erdo.leiras}
        </p>
        
        <div style="display:flex;flex-direction:column;gap:6px;background:#f6f6f6;padding:10px;border-radius:6px;font-size:13px;color:#333;text-align:left;">
          <div><strong>Helyszín:</strong> ${erdo.helyszin}</div>
          <div><strong>Terület:</strong> ${erdo.terulet_km2.toLocaleString()} km²</div>
          <div><strong>Évi csapadék:</strong> ${erdo.evi_csapadek_mm.toLocaleString()} mm</div>
        </div>
      </div>
    `

    circle.bindPopup(popupHTML)

    if (Array.isArray(erdo.koordinatak) && erdo.koordinatak.length === 2) {
      latlngs.push(erdo.koordinatak)
    }
  }

  if (latlngs.length > 0) {
    try {
      map.fitBounds(latlngs, { padding: [50, 50], maxZoom: 4 })
    } catch (e) {
      console.warn('fitBounds hiba:', e)
    }
  }
})
const base = ref(null)
const container = ref(null)

onMounted(async () => {
  const baseEl = base.value
  const containerEl = container.value
  const textEl = containerEl.querySelector('div:first-child')
  const textHTML = textEl.outerHTML
  const baseWidth = baseEl.offsetWidth

  function runBackgroundAnimation(el) {
    const textWidth = el.offsetWidth

    gsap.to(el, {
      duration: 20,
      x: -(baseWidth + textWidth),
      ease: 'none',
      onUpdate() {
        if (el.getBoundingClientRect().left + (textWidth - baseWidth) <= 0) {
          containerEl.insertAdjacentHTML('beforeend', textHTML)
          const newEl = containerEl.querySelector('div:last-child')
          runBackgroundAnimation(newEl)
          this.vars.onUpdate = null
        }
      },
      onComplete() {
        el.remove()
      }
    })
  }

  await nextTick()
  runBackgroundAnimation(textEl)
})

</script>

<template>
  <section>


    <div class="container text-container text-center">
      <h2>Tekintsd meg interaktív térképünket!</h2>
      <div class="map-text">
        <p>
          Az interaktív térképünkön meg tudod tekinteni az ismertebb, nagyobb esőerdőket, emellett azoknak pár fontos
          adatát!
        </p>
      </div>
    </div>
    <div id="background-wrapper" ref="base">
      <div id="background-text" ref="container">
        <div>Interaktív&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>
      </div>
    </div>
    <div class="container map-container">
      <div id="map"></div>
    </div>
  </section>
</template>


<style scoped>
p {
  font-size: 20px;
  margin-bottom: 0;
  color: #212529;
  font-weight: 500;
}

h2 {
  font-weight: 1000;
  margin-bottom: 100px;
}

.text-container {
  width: 40%;
  z-index: 3;
}

.text-container>h2 {
  font-size: 3vw;
}

@media (max-width: 1200px) {
  .text-container {
    width: 70%;
  }

  .text-container>h2 {
    font-size: 4vw;
  }
}

@media (max-width: 900px) {
  .text-container {
    width: 80%;
  }

  .text-container>h2 {
    font-size: 5vw;
  }
}


@media (max-width: 600px) {
  .text-container {
    width: 90%;
  }

  .text-container>h2 {
    font-size: 7vw;
  }
}

.map-text {
  padding: 20px;
  background-color: #f2efe9;
  border-radius: 15px;
  margin: 10% auto;
  width: 70%;
  max-width: 1100px;
}

#map {
  height: 660px;
  width: 70%;
  margin: 0 auto;
  border-radius: 10px;
  overflow: hidden;
}

.map-container {
  margin: 0 auto;
  max-width: 1100px;
  padding: 0 16px;
}

section {
  background-color: #aad3df;
  padding: 60px 0;
}


#background-wrapper {
  position: absolute;
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  z-index: 0;
}

#background-text {
  position: relative;
  font-size: 20em;
  font-weight: 900;
  /**color: #f2efe9;**/
  white-space: nowrap;
  z-index: 0;


  &>div {
    position: absolute;
    overflow: hidden;
    left: 100%;
  }
}
</style>