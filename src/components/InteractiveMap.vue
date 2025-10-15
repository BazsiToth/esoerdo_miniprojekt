<script setup>
import { onMounted } from 'vue'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import rainforests from '../datas/rainforests.json'

// Segédfüggvény (ha szükséges, közvetlen URL-ből is tudja készíteni)
const getImageFromUrl = (url) => {
  return new URL(url, import.meta.url).href
}

// Előre feloldott képek (Vite-hoz): beolvassa a src/assets mappa képeit
// (ez biztosítja, hogy a képek bekerülnek a bundle-be)
const images = import.meta.glob('../assets/*.{jpg,jpeg,png,webp}', { eager: true, as: 'url' })

onMounted(() => {
  // Térkép inicializálása (világ nézet)
  const map = L.map('map').setView([0, 20], 2)

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  }).addTo(map)

  // Marker ikon (Leaflet alapértelmezett ikon URL-je nyilvánosságban)
  const customIcon = L.icon({
    iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
    shadowSize: [41, 41]
  })

  // gyűjtsük a koordinátákat, hogy a térkép fitBounds-olható legyen
  const latlngs = []

  // FOR ciklus — kéréseid szerint
  for (let i = 0; i < rainforests.length; i++) {
    const erdo = rainforests[i]

    // 1) Próbáljuk meg megtalálni a képet az import.meta.glob eredményében (fájlnév alapján)
    const filename = erdo.kep ? erdo.kep.split('/').pop() : null
    let imgUrl = ''

    if (filename) {
      const foundKey = Object.keys(images).find(k => k.endsWith('/' + filename) || k.includes(filename))
      if (foundKey) {
        imgUrl = images[foundKey] // már előre feloldott URL
      } else {
        // 2) fallback: próbáljuk meg a getImageFromUrl-ral feloldani a JSON mezőt (relatív a src/ komponensre)
        // A JSON-ban most "/assets/amazon.jpg" van — levágjuk az előtte álló "/"-t, és '../' -ként adjuk
        const rel = erdo.kep ? `../${erdo.kep.replace(/^\//, '')}` : null
        try {
          imgUrl = rel ? getImageFromUrl(rel) : ''
        } catch (e) {
          imgUrl = ''
        }
      }
    }

    // Ha nincs kép, használjunk beépített inline SVG placeholdert (adat-URI)
    const placeholder = 'data:image/svg+xml;utf8,' + encodeURIComponent(
      `<svg xmlns='http://www.w3.org/2000/svg' width='400' height='250'><rect width='100%' height='100%' fill='#e6e6e6'/><text x='50%' y='50%' font-size='18' dominant-baseline='middle' text-anchor='middle' fill='#888'>Kép nem elérhető</text></svg>`
    )

    if (!imgUrl) imgUrl = placeholder

    // Marker létrehozása és popup binding (popup HTML)
    const marker = L.marker(erdo.koordinatak, { icon: customIcon }).addTo(map)

    // A popupban az <img> onerror-rel visszaállít placeholderre, ha a kép 404
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

        <h5 style="margin:6px 0 8px 0;">${erdo.nev}</h5>

        <p style="font-size:14px;color:#555;margin-bottom:10px;line-height:1.2;">
          ${erdo.leiras}
        </p>

        <div style="display:flex;flex-direction:column;gap:6px;background:#f6f6f6;padding:8px;border-radius:6px;font-size:12px;color:#333;text-align:left;">
          <div><strong>Helyszín:</strong> ${erdo.helyszin}</div>
          <div><strong>Terület:</strong> ${erdo.terulet_km2.toLocaleString()} km²</div>
          <div><strong>Évi csapadék:</strong> ${erdo.evi_csapadek_mm.toLocaleString()} mm</div>

        </div>
      </div>
    `

    marker.bindPopup(popupHTML)

    // gyűjtsük a koordinátákat fitBounds-hoz
    if (Array.isArray(erdo.koordinatak) && erdo.koordinatak.length === 2) {
      latlngs.push(erdo.koordinatak)
    }
  }

  // Ha vannak marker-ek, igazítsuk a térképet rájuk
  if (latlngs.length > 0) {
    try {
      map.fitBounds(latlngs, { padding: [50, 50], maxZoom: 5 })
    } catch (e) {
      // ha valami furcsa hiba, hagyjuk a default view-t
      // console.warn('fitBounds hiba:', e)
    }
  }
})
</script>

<template>
  <section>
    <div class="container map-container">
      <div id="map"></div>
    </div>
  </section>
</template>

<style scoped>
#map {
  height: 660px;
  width: 100%;
  border-radius: 10px;
  box-shadow: 0 6px 16px rgba(0,0,0,0.18);
  overflow: hidden;
}

.map-container {
  margin: 0 auto;
  max-width: 1100px;
  padding: 0 16px;
}

section {
  background-color: #f0f0f2;
  padding: 60px 0;
}
</style>
