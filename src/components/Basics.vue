<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const archRef = ref(null);
let animationInitialized = false;
let observer = null;
let resizeTimeout = null;

const initAnimations = () => {
    if (animationInitialized) return;
    animationInitialized = true;

    // Set initial background color
    gsap.set(".arch", { backgroundColor: "#f9ffe7" });
    gsap.set(".arch-container", { backgroundColor: "#f9ffe7" });

    // Set z-index for images
    document.querySelectorAll(".arch__right .img-wrapper").forEach((element) => {
        const order = element.getAttribute("data-index");
        if (order !== null) element.style.zIndex = order;
    });

    // Mobile layout handler (only handle order)
    const handleMobileLayout = () => {
        const isMobile = window.matchMedia("(max-width: 768px)").matches;
        const leftItems = gsap.utils.toArray(".arch__left .arch__info");
        const rightItems = gsap.utils.toArray(".arch__right .img-wrapper");

        if (isMobile) {
            leftItems.forEach((item, i) => (item.style.order = i * 2));
            rightItems.forEach((item, i) => (item.style.order = i * 2 + 1));
        } else {
            leftItems.forEach((item) => (item.style.order = ""));
            rightItems.forEach((item) => (item.style.order = ""));
        }
    };

    // Debounced resize for performance & refresh ScrollTrigger
    const onResize = () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            handleMobileLayout();
            ScrollTrigger.refresh();
        }, 120);
    };
    window.addEventListener("resize", onResize);
    handleMobileLayout();

    // GSAP animations
    const imgs = gsap.utils.toArray(".img-wrapper img");
    const bgColors = ["#EDF9FF", "#FFECF2", "#FFE8DB"];

    ScrollTrigger.matchMedia({
        // Desktop / large
        "(min-width: 769px)": function () {
            const mainTimeline = gsap.timeline({
                scrollTrigger: {
                    trigger: ".arch",
                    start: "top top",
                    end: "bottom bottom",
                    pin: ".arch__right",
                    scrub: true
                }
            });

            gsap.set(imgs, {
                clipPath: "inset(0)",
                objectPosition: "0px 0%"
            });

            imgs.forEach((_, index) => {
                const currentImage = imgs[index];
                const nextImage = imgs[index + 1] || null;

                const sectionTimeline = gsap.timeline();

                // First image: animate from initial color to first color
                if (index === 0) {
                    sectionTimeline
                        .to(
                            ".arch",
                            {
                                backgroundColor: bgColors[0],
                                duration: 1.5,
                                ease: "power2.inOut"
                            },
                            0
                        )
                        .to(
                            ".arch-container",
                            {
                                backgroundColor: bgColors[0],
                                duration: 1.5,
                                ease: "power2.inOut"
                            },
                            0
                        )
                        // Pause when first image is fully visible
                        .to({}, { duration: 0.8 });
                }

                if (nextImage) {
                    sectionTimeline
                        .to(
                            ".arch",
                            {
                                backgroundColor: bgColors[index + 1],
                                duration: 1.5,
                                ease: "power2.inOut"
                            },
                            0
                        )
                        .to(
                            ".arch-container",
                            {
                                backgroundColor: bgColors[index + 1],
                                duration: 1.5,
                                ease: "power2.inOut"
                            },
                            0
                        )
                        .to(
                            currentImage,
                            {
                                clipPath: "inset(0px 0px 100%)",
                                objectPosition: "0px 60%",
                                duration: 1.5,
                                ease: "none"
                            },
                            0
                        )
                        .to(
                            nextImage,
                            {
                                objectPosition: "0px 40%",
                                duration: 1.5,
                                ease: "none"
                            },
                            0
                        )
                        // Pause when next image is fully visible
                        .to({}, { duration: 0.8 });
                }

                mainTimeline.add(sectionTimeline);
            });
        },

        // Mobile
        "(max-width: 768px)": function () {
            const mbTimeline = gsap.timeline();
            gsap.set(imgs, { objectPosition: "0px 60%" });

            imgs.forEach((image, index) => {
                const innerTimeline = gsap.timeline({
                    scrollTrigger: {
                        trigger: image,
                        start: "top-=70% top+=50%",
                        end: "bottom+=200% bottom",
                        scrub: true
                    }
                });

                innerTimeline
                    .to(image, {
                        objectPosition: "0px 30%",
                        duration: 5,
                        ease: "none"
                    })
                    .to(".arch", {
                        backgroundColor: bgColors[index],
                        duration: 1.5,
                        ease: "power2.inOut"
                    })
                    .to(".arch-container", {
                        backgroundColor: bgColors[index],
                        duration: 1.5,
                        ease: "power2.inOut"
                    });

                mbTimeline.add(innerTimeline);
            });
        }
    });

    // store cleanup references on the DOM node so unmount can access them
    archRef.value.__cleanup = () => {
        window.removeEventListener("resize", onResize);
        ScrollTrigger.getAll().forEach((st) => st.kill());
        ScrollTrigger.clearMatchMedia();
    };
};

onMounted(() => {
    // IntersectionObserver: csak akkor inicializáljuk, ha láthatóvá válik a komponens
    observer = new IntersectionObserver(
        (entries) => {
            const e = entries[0];
            if (e.isIntersecting) {
                initAnimations();
                // ha egyszer inicializáltuk, nem kell tovább figyelni
                if (observer && archRef.value) {
                    observer.unobserve(archRef.value);
                }
            }
        },
        { threshold: 0.15 } // ha a komponens 15%-a látszik, aktiváljuk
    );

    if (archRef.value) observer.observe(archRef.value);
});

onUnmounted(() => {
    if (observer && archRef.value) observer.unobserve(archRef.value);
    // ha tároltunk cleanup függvényt
    if (archRef.value && typeof archRef.value.__cleanup === "function") {
        archRef.value.__cleanup();
        delete archRef.value.__cleanup;
    } else {
        // biztonsági tisztítás
        ScrollTrigger.getAll().forEach((st) => st.kill());
        ScrollTrigger.clearMatchMedia();
    }
});
</script>

<template>
    <section class="arch-container">
        <div class="arch" ref="archRef">
            <div class="arch__left">
                <div class="arch__info" id="green-arch">
  <div class="content">
    <h2 class="header">Zöld Esőerdő</h2>
    <p class="desc">
      Az esőerdők a Föld tüdeje – sűrű növényzetük oxigént termel, és
      számtalan élőlény otthona. Minden fa, minden levél része a
      bolygónk légzésének.
    </p>
    <a class="link" href="#" style="background-color: #D5FF37">
      <svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" fill="none">
        <path fill="#121212"
          d="M5 2c0 1.105-1.895 2-3 2a2 2 0 1 1 0-4c1.105 0 3 .895 3 2ZM11 3.5c0 1.105-.895 3-2 3s-2-1.895-2-3a2 2 0 1 1 4 0ZM6 9a2 2 0 1 1-4 0c0-1.105.895-3 2-3s2 1.895 2 3Z" />
      </svg> <span>Növényzet</span>
    </a>
  </div>
</div>

<div class="arch__info" id="blue-arch">
  <div class="content">
    <h2 class="header">Az Éltető Víz</h2>
    <p class="desc">
      A trópusi esőerdők folyói és patakjai az élet forrásai. A víz
      ciklusa táplálja a növényeket, hűsíti a levegőt és biztosítja a
      túlélést minden élőlénynek.
    </p>
    <a class="link" href="#" style="background-color: #7DD6FF">
      <svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" fill="none">
        <path fill="#121212"
          d="M5 2c0 1.105-1.895 2-3 2a2 2 0 1 1 0-4c1.105 0 3 .895 3 2ZM11 3.5c0 1.105-.895 3-2 3s-2-1.895-2-3a2 2 0 1 1 4 0ZM6 9a2 2 0 1 1-4 0c0-1.105.895-3 2-3s2 1.895 2 3Z" />
      </svg> <span>Víz szerepe</span>
    </a>
  </div>
</div>

<div class="arch__info" id="pink-arch">
  <div class="content">
    <h2 class="header">Az Élet Színei</h2>
    <p class="desc">
      A színes madarak, ritka virágok és különleges rovarok együtt
      alkotják az esőerdő varázslatos világát. Minden árnyalat egy újabb
      történetet mesél a természet harmóniájáról.
    </p>
    <a class="link" href="#" style="background-color: #FFA0B0">
      <svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" fill="none">
        <path fill="#121212"
          d="M5 2c0 1.105-1.895 2-3 2a2 2 0 1 1 0-4c1.105 0 3 .895 3 2ZM11 3.5c0 1.105-.895 3-2 3s-2-1.895-2-3a2 2 0 1 1 4 0ZM6 9a2 2 0 1 1-4 0c0-1.105.895-3 2-3s2 1.895 2 3Z" />
      </svg> <span>Galéria</span>
    </a>
  </div>
</div>

<div class="arch__info" id="orange-arch">
  <div class="content">
    <h2 class="header">Az Esőerdők Védelmében</h2>
    <p class="desc">
      Az esőerdők irtása súlyos következményekkel jár: fajok tűnnek el,
      az éghajlat felborul, és a Föld elveszíti természetes védelmét.
      Minden megmentett fa számít.
    </p>
    <a class="link" href="#" style="background-color: #FFA17B">
      <svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" fill="none">
        <path fill="#121212"
          d="M5 2c0 1.105-1.895 2-3 2a2 2 0 1 1 0-4c1.105 0 3 .895 3 2ZM11 3.5c0 1.105-.895 3-2 3s-2-1.895-2-3a2 2 0 1 1 4 0ZM6 9a2 2 0 1 1-4 0c0-1.105.895-3 2-3s2 1.895 2 3Z" />
      </svg> <span>Természet -> Szennyezés Tegyél ellene!</span>
    </a>
  </div>
</div>

            </div>

            <div class="arch__right">
                <div class="img-wrapper" data-index="4">
                    <img src="../assets/Basics_Scroll1.jpg"
                        alt="Green Architecture" />
                </div>

                <div class="img-wrapper" data-index="3">
                    <img src="../assets/Basics_Scroll2.jpg"
                        alt="Blue Architecture" />
                </div>

                <div class="img-wrapper" data-index="2">
                    <img src="../assets/Basics_Scroll3.jpg"
                        alt="Pink Architecture" />
                </div>

                <div class="img-wrapper" data-index="1">
                    <img src="../assets/Basics_Scroll4.jpg"
                        alt="Orange Architecture" />
                </div>
            </div>
        </div>
    </section>
</template>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Outfit:wght@400;800&display=swap");

.arch-container {
    width: 100%;
    padding: 30px;
    background-color: #f9ffe7;
    transition: background-color 0.3s ease;
}

.container {
    padding: 2rem;
}

.spacer {
    width: 100%;
    height: 30vh;
}

.arch {
    display: flex;
    gap: 60px;
    justify-content: space-between;
    max-width: 1100px;
    margin-inline: auto;
    background-color: #f9ffe7;
    transition: background-color 0.3s ease;
}

.arch__left {
    display: flex;
    flex-direction: column;
    min-width: 300px;
}

.arch__left .arch__info {
    max-width: 356px;
    height: 100vh;
    display: grid;
    place-items: center;
}

.arch__left .header {
    font-family: Outfit;
    font-size: 42px;
    font-weight: 800;
    letter-spacing: -0.84px;
}

.arch__left .desc {
    font-size: 18px;
    letter-spacing: -0.54px;
    margin-block: 6px 28px;
    line-height: normal;
}

.arch__left .link {
    text-decoration: none;
    padding: 16px 18px;
    color: inherit;
    border-radius: 40px;
    display: flex;
    gap: 4px;
    width: fit-content;
    align-items: center;
}

.arch__right {
    flex-shrink: 1;
    height: 100vh;
    width: 100%;
    max-width: 540px;
    position: relative;
    display: flex;
    flex-direction: column;
}

.img-wrapper {
    position: absolute;
    top: 50%;
    left: 0;
    transform: translateY(-50%);
    height: 400px;
    width: 100%;
    border-radius: 16px;
    overflow: hidden;
}

.img-wrapper img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
}

/* responsive */
@media (max-width: 900px) {
    .arch {
        gap: 30px;
    }
}

@media (max-width: 768px) {
    .arch {
        flex-direction: column;
        gap: 20px;
    }

    .arch__left,
    .arch__right {
        display: contents;
    }

    .arch__right {
        height: auto;
        max-width: 100%;
    }

    .arch__right .img-wrapper {
        position: static;
        transform: none;
        height: 360px;
        width: 100%;
        margin-bottom: 20px;
    }

    .arch__left .arch__info {
        height: auto;
        padding: 20px 0;
    }
}

@media (max-width: 560px) {
    .arch {
        gap: 12px;
    }

    .container {
        padding: 10px;
    }

    .arch__right .img-wrapper {
        border-radius: 10px;
        height: 280px;
    }
}
</style>