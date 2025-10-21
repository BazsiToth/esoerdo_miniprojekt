# 🌿 Esőerdő Weboldal - Trópusi Dzsungel Projekt

Egy modern, interaktív Vue 3 alkalmazás az esőerdők világának felfedezéséhez. A projekt célja, hogy bemutassa az esőerdők éghajlatát, természetét és állatvilágát egy vizuálisan lenyűgöző, felhasználóbarát webes felületen.

![Vue.js](https://img.shields.io/badge/Vue.js-3.0-4FC08D?style=flat&logo=vue.js&logoColor=white)
![Bootstrap](https://img.shields.io/badge/Bootstrap-5.0-7952B3?style=flat&logo=bootstrap&logoColor=white)
![License](https://img.shields.io/badge/license-MIT-green)

## 📋 Tartalomjegyzék

- [Funkciók](#-funkciók)
- [Technológiák](#-technológiák)
- [Telepítés](#-telepítés)
- [Futtatás](#-futtatás)
- [Projekt Struktúra](#-projekt-struktúra)
- [Komponensek](#-komponensek)
- [Routing](#-routing)
- [Licensz](#-licensz)

## ✨ Funkciók

- **Teljes képernyős carousel** - 3 slide háttérképekkel (Éghajlat, Természet, Állatvilág)
- **Interaktív navigáció** - Responsive navbar hover effektekkel és dropdown menüvel
- **Quiz funkció** - Interaktív kvíz az esőerdőkről szerzett tudás tesztelésére
- **Képgaléria** - Vizuális gyűjtemény az esőerdő szépségeiről
- **Kontakt űrlap** - Floating label animációval ellátott kapcsolatfelvételi oldal
- **404 Error Page** - Tematikus, esőerdő témájú hibaoldal
- **Animációk** - Smooth transitions, hover effektek, GSAP animációk
- **Reszponzív design** - Mobil, tablet és desktop optimalizált megjelenés

## 🛠 Technológiák

### Frontend Framework
- **Vue.js 3** - Composition API használatával
- **Vue Router ** - Routing megoldás

### UI Framework & Library
- **Bootstrap 5** - Responsive grid és komponensek
- **jQuery** - DOM manipuláció és Bootstrap támogatás
- **Popper.js** - Tooltip és dropdown pozicionálás

### Animációk
- **GSAP (GreenSock Animation Platform)** - Professzionális animációk

### Egyéb
- **Vite** - Gyors development build tool
- **CSS3** - Modern animációk és transitions

## 📦 Telepítés

### Előfeltételek

Győződj meg róla, hogy a következők telepítve vannak a rendszereden:

- **Node.js** (v16 vagy újabb)
- **npm** (v7 vagy újabb)

### Telepítési lépések

1. **Klónozd a repository-t**

git repo clone https://github.com/BazsiToth/Esoerdo_miniprojekt.git

2. **Telepítsd a függőségeket**

Futtasd az alábbi parancsokat a megadott sorrendben:

npm install jquery

npm install bootstrap jquery popper.js

npm install gsap

npm i


Ez telepíti az összes szükséges függőséget, beleértve:
- Vue 3 és Vue Router
- Bootstrap 5, jQuery, Popper.js
- GSAP animációs könyvtár
- Egyéb dev dependencies

## 🚀 Futtatás

### Development Mode

A development szerver indítása:

npm run dev

Az alkalmazás elérhető lesz a következő címen: [**http://localhost:5173**](http://localhost:5173)

## 🧩 Komponensek

### Navbar.vue
- Responsive navigációs sáv
- Dropdown menü az esőerdő aloldalakhoz
- Hover animációk TheVR stílusban
- Logo SVG integrációval

### LogoSvg.vue
- Trópusi levél logó
- Zöld glow hover effekt
- Scale és rotate animáció

### Kezdolap.vue
- 3 slide-os Bootstrap carousel
- Teljes képernyős (100vh) megjelenés
- Középre igazított caption szövegek
- Automatikus és manuális slide váltás

### NotFound.vue
- Esőerdő témájú 404 oldal
- Zöld gradient háttér animációval
- Vissza a főoldalra navigáció

### About.vue (Contact Form)
- Név, email, üzenet mezők
- Floating label animáció
- Material Design stílus
- Form validáció és submit kezelés

## 🛤 Routing

Az alkalmazás az alábbi route-okat használja:

| Route | Komponens | Leírás |
|-------|-----------|--------|
| `/` | Kezdolap.vue | Főoldal carousel-lel |
| `/quiz` | Quiz.vue | Interaktív kvíz |
| `/gallery` | Gallery.vue | Képgaléria |
| `/animals` | Animals.vue | Állatvilág |
| `/climate` | Climate.vue | Éghajlat |
| `/nature` | Nature.vue | Természet |
| `/about` | About.vue | Kapcsolat |
| `/:pathMatch(.*)*` | NotFound.vue | 404 Error Page |

## 🎨 Színpaletta

A projekt az esőerdő témához illeszkedő zöld árnyalatokat használ:

- **Elsődleges zöld**: `#28a745`
- **Sötét esőerdő**: `#1e7e34`
- **Trópusi türkiz**: `#20c997`
- **Víz kék**: `#17a2b8`
- **Világos árnyalat**: `#d4edda`

## 📱 Responsive Breakpoints

- **Desktop**: > 1200px
- **Tablet**: 768px - 1200px
- **Mobile**: < 768px
- **Small Mobile**: < 480px

## 📄 Licensz

Ez a projekt MIT licensz alatt áll. További részletekért lásd a LICENSE fájlt.

## 💻 Drótváz

A drótváz megtekinthető itt: **(https://excalidraw.com/#json=TDNZ6q70AJ7TwemINT3mM,XCffq_FqxipdEwTh8-hKPA)**

⭐ Ha tetszik a projekt, ne felejtsd el adni egy csillagot a GitHub-on!





