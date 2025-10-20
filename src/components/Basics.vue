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

    gsap.set(".arch", { backgroundColor: "#386041" });
    gsap.set(".arch-container", { backgroundColor: "#386041" });

    document.querySelectorAll(".arch__right .img-wrapper").forEach((element) => {
        const order = element.getAttribute("data-index");
        if (order !== null) element.style.zIndex = order;
    });

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

    const onResize = () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            handleMobileLayout();
            ScrollTrigger.refresh();
        }, 120);
    };
    window.addEventListener("resize", onResize);
    handleMobileLayout();

    const imgs = gsap.utils.toArray(".img-wrapper img");
    const bgColors = ["#244238", "#244238", "#071c08", "#3F624B"];

    ScrollTrigger.matchMedia({
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

                if (index === 0) {
                    sectionTimeline
                        .to(".arch", {
                            backgroundColor: bgColors[0],
                            duration: 1.5,
                            ease: "power2.inOut"
                        }, 0)
                        .to(".arch-container", {
                            backgroundColor: bgColors[0],
                            duration: 1.5,
                            ease: "power2.inOut"
                        }, 0)
                        .to({}, { duration: 0.8 });
                }

                if (nextImage) {
                    sectionTimeline
                        .to(".arch", {
                            backgroundColor: bgColors[index + 1],
                            duration: 1.5,
                            ease: "power2.inOut"
                        }, 0)
                        .to(".arch-container", {
                            backgroundColor: bgColors[index + 1],
                            duration: 1.5,
                            ease: "power2.inOut"
                        }, 0)
                        .to(currentImage, {
                            clipPath: "inset(0px 0px 100%)",
                            objectPosition: "0px 60%",
                            duration: 1.5,
                            ease: "none"
                        }, 0)
                        .to(nextImage, {
                            objectPosition: "0px 40%",
                            duration: 1.5,
                            ease: "none"
                        }, 0)
                        .to({}, { duration: 0.8 });
                }

                mainTimeline.add(sectionTimeline);
            });
        },

        "(max-width: 768px)": function () {
            gsap.set(imgs, { objectPosition: "top center" });

            imgs.forEach((image, index) => {
                gsap.timeline({
                    scrollTrigger: {
                        trigger: image,
                        start: "top center",
                        end: "bottom center",
                        scrub: true
                    }
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
            });
        }
    });

    archRef.value.__cleanup = () => {
        window.removeEventListener("resize", onResize);
        ScrollTrigger.getAll().forEach((st) => st.kill());
        ScrollTrigger.clearMatchMedia();
    };
};

onMounted(() => {
    observer = new IntersectionObserver(
        (entries) => {
            const e = entries[0];
            if (e.isIntersecting) {
                initAnimations();
                if (observer && archRef.value) observer.unobserve(archRef.value);
            }
        },
        { threshold: 0.15 }
    );

    if (archRef.value) observer.observe(archRef.value);
});

onUnmounted(() => {
    if (observer && archRef.value) observer.unobserve(archRef.value);
    if (archRef.value && typeof archRef.value.__cleanup === "function") {
        archRef.value.__cleanup();
        delete archRef.value.__cleanup;
    } else {
        ScrollTrigger.getAll().forEach((st) => st.kill());
        ScrollTrigger.clearMatchMedia();
    }
});
</script>

<template>
    <section class="arch-container">
        <span class="arch-header">
            <h2>Az esőerdőkről</h2>
        </span>
        <div class="arch" ref="archRef">
            <div class="arch__left">
                <div class="arch__info" id="green-arch">
                    <div class="content text-design green-text">
                        <h2 class="header">Zöld Esőerdő</h2>
                        <p class="desc">
                            Az esőerdők a Föld tüdeje – sűrű növényzetük oxigént termel, és
                            számtalan élőlény otthona. Minden fa, minden levél része a
                            bolygónk légzésének.
                        </p>
                        <router-link to="/gallery" class="link" href="#" style="background-color: #287209;">
                            <svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" fill="none">
                                <path fill="#121212"
                                    d="M5 2c0 1.105-1.895 2-3 2a2 2 0 1 1 0-4c1.105 0 3 .895 3 2ZM11 3.5c0 1.105-.895 3-2 3s-2-1.895-2-3a2 2 0 1 1 4 0ZM6 9a2 2 0 1 1-4 0c0-1.105.895-3 2-3s2 1.895 2 3Z" />
                            </svg> <span>Növényzet</span>
                        </router-link>
                    </div>
                </div>

                <div class="arch__info" id="blue-arch">
                    <div class="content text-design blue-text">
                        <h2 class="header">Az Éltető Víz</h2>
                        <p class="desc">
                            A trópusi esőerdők folyói és patakjai az élet forrásai. A víz
                            ciklusa táplálja a növényeket, hűsíti a levegőt és biztosítja a
                            túlélést minden élőlénynek.
                        </p>
                        <router-link to="/gallery" class="link" href="#" style="background-color: #4A8C9F">
                            <svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" fill="none">
                                <path fill="#121212"
                                    d="M5 2c0 1.105-1.895 2-3 2a2 2 0 1 1 0-4c1.105 0 3 .895 3 2ZM11 3.5c0 1.105-.895 3-2 3s-2-1.895-2-3a2 2 0 1 1 4 0ZM6 9a2 2 0 1 1-4 0c0-1.105.895-3 2-3s2 1.895 2 3Z" />
                            </svg> <span>Víz szerepe</span>
                        </router-link>
                    </div>
                </div>

                <div class="arch__info" id="pink-arch">
                    <div class="content text-design red-text">
                        <h2 class="header">Az Élet Színei</h2>
                        <p class="desc">
                            A színes madarak, ritka virágok és különleges rovarok együtt
                            alkotják az esőerdő varázslatos világát. Minden árnyalat egy újabb
                            történetet mesél a természet harmóniájáról.
                        </p>
                        <router-link to="/gallery" class="link" href="#" style="background-color: #342a1e">
                            <svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" fill="none">
                                <path fill="#121212"
                                    d="M5 2c0 1.105-1.895 2-3 2a2 2 0 1 1 0-4c1.105 0 3 .895 3 2ZM11 3.5c0 1.105-.895 3-2 3s-2-1.895-2-3a2 2 0 1 1 4 0ZM6 9a2 2 0 1 1-4 0c0-1.105.895-3 2-3s2 1.895 2 3Z" />
                            </svg> <span>Galéria</span>
                        </router-link>
                    </div>
                </div>

                <div class="arch__info" id="orange-arch">
                    <div class="content text-design gray-text">
                        <h2 class="header">Az Esőerdők Védelmében</h2>
                        <p class="desc">
                            Az esőerdők irtása súlyos következményekkel jár: fajok tűnnek el,
                            az éghajlat felborul, és a Föld elveszíti természetes védelmét.
                            Minden megmentett fa számít.
                        </p>
                        <router-link to="/about" class="link" href="#" style="background-color: #fd859b">
                            <svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" fill="none">
                                <path fill="#121212"
                                    d="M5 2c0 1.105-1.895 2-3 2a2 2 0 1 1 0-4c1.105 0 3 .895 3 2ZM11 3.5c0 1.105-.895 3-2 3s-2-1.895-2-3a2 2 0 1 1 4 0ZM6 9a2 2 0 1 1-4 0c0-1.105.895-3 2-3s2 1.895 2 3Z" />
                            </svg> <span>Lépj velünk kapcsolatba</span>
                        </router-link>
                    </div>
                </div>

            </div>

            <div class="arch__right">
                <div class="img-wrapper" data-index="4" style="z-index: 4; clip-path: inset(0px);">
                    <img src="../assets/Basics_Scroll1.jpg" alt="Green Architecture" />
                </div>

                <div class="img-wrapper img-scroll" data-index="3" style="z-index: 3;">
                    <img src="../assets/Basics_Scroll2.jpg" alt="Blue Architecture" />
                </div>

                <div class="img-wrapper img-scroll" data-index="2" style="z-index: 2;" id="scroll3">
                    <img src="../assets/Basics_Scroll3.jpg" alt="Pink Architecture" />
                </div>

                <div class="img-wrapper img-scroll" data-index="1" style="z-index: 1;">
                    <img src="../assets/Basics_Scroll4.jpg" alt="Orange Architecture" />
                </div>
            </div>
        </div>
    </section>
</template>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Outfit:wght@400;800&display=swap");

.text-design {
    text-shadow: 5px 5px 5px rgb(0, 0, 0);
    background-color: rgba(0, 0, 0, 0.4);
    border-radius: 20px;
    padding: 30px;
    font-weight: 400;
}

.text-design>p {
    font-weight: 500;
    text-shadow: 5px 5px 5px rgb(0, 0, 0);
}

.text-design>a>span {
    font-weight: 1000;
    text-shadow: 3px 3px 10px rgb(0, 0, 0);
}

.green-text {
    color: #72C000;
}

.green-text>h2 {
    color: #88b2fd;
}

.green-text>p {
    color: #FEFEFE;
}

.blue-text {
    color: #c1e2d2;
}

.blue-text>h2 {
    color: #BAEA4B;
}

.blue-text>p {
    color: #75B797;
}

.red-text {
    color: #fa6759;
}

.red-text>h2 {
    color: #EFCF00;
}

.red-text>p {
    color: #5b88c1;
}

.gray-text {
    color: #F0F2EF;
}

.gray-text>h2 {
    color: #5D844C;
}

.gray-text>p {
    color: #917E76;
}

.arch-container {
    width: 100%;
    padding: 0;
    transition: background-color 0.3s ease;
    background-color: #386041;
}

.arch-header {
    background-color: #386041;
    text-align: center;
    color: white;
    font-weight: 1000;
}

.arch-header>h2 {
    padding-top: 60px;
    font-size: 5em;
    color: white;
}

.arch-text-container {
    padding: 50px;
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
    background-color: #386041;
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
    padding: 10px;
    width: 100%;
    object-fit: cover;
    object-position: center;
}

.img-scroll img {
    height: 100%;
}


@media (max-width: 900px) {
    .arch {
        gap: 30px;
    }

    .img-wrapper {
        margin-right: 20px;
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
        margin-bottom: 300px;
    }

    .arch__left .arch__info {
        height: auto;
        padding: 20px 0;
    }

    .arch__info {
        margin: 0 auto;
    }

    .img-wrapper {
        margin-left: 0;
        padding: 0 30px 0 30px;
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

    .arch-header>h2 {
        font-size: 4em;
    }
}
</style>