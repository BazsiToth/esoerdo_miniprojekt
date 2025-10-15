<script setup>

</script>
<template>
  <section class="section_Carousel">
    <div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="carousel">
      <div class="carousel-indicators">
        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active"
          aria-current="true" aria-label="Slide 1"></button>
        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1"
          aria-label="Slide 2"></button>
        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2"
          aria-label="Slide 3"></button>
      </div>
      <div class="carousel-inner">
        <div class="carousel-item active">
          <img class="d-block w-100" src="../assets/ContentEsoerdo1.jpg" alt="First slide">
          <div class="carousel-caption">
            <h5>Éghajlat</h5>
            <p>Hőmérséklet & Csapadék</p>
          </div>
        </div>
        <div class="carousel-item">
          <img class="d-block w-100" src="../assets/ContentEsoerdo2.jpg" alt="Second slide">
          <div class="carousel-caption">
            <h5>Természet</h5>
            <p>Növényzet & Vizek</p>
          </div>
        </div>
        <div class="carousel-item">
          <img class="d-block w-100" src="../assets/ContentEsoerdo4.jpg" alt="Third slide">
          <div class="carousel-caption">
            <h5>Állatvilág</h5>
            <p>Madárvilág & Emlősök</p>
          </div>
        </div>
      </div>
      <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators"
        data-bs-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
      </button>
      <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators"
        data-bs-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
      </button>
    </div>
  </section>
</template>
<style scoped>
#carouselExampleIndicators {
  height: 100vh;
  overflow: hidden;
}

.carousel-inner {
  height: 100%;
}

.carousel-item {
  height: 100vh;
  min-height: 100vh;
  background: no-repeat center center scroll;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
  position: relative;
}

.carousel-item img {
  object-fit: cover;
  height: 100%;
  width: 100%;
}

.carousel-caption {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  bottom: auto;
  width: 90%;
  max-width: 800px;
  padding: 20px;
  text-align: center;
  transition: opacity 0.6s ease-in-out;
}

.carousel-caption h5 {
  font-size: 70px;
  text-transform: uppercase;
  letter-spacing: 2px;
  margin-bottom: 15px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.7);
  transition: font-size 0.3s ease, letter-spacing 0.3s ease;
}

.carousel-caption p {
  width: 100%;
  margin: 0 auto;
  font-size: 36px;
  line-height: 1.9;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.7);
  transition: font-size 0.3s ease, line-height 0.3s ease;
}

/* Mobil nézet optimalizálás */
@media (max-width: 1200px) {
  .carousel-caption h5 {
    font-size: 54px;
  }

  .carousel-caption p {
    font-size: 28px;
  }
}

@media (max-width: 768px) {
  #carouselExampleIndicators {
    height: 100vh;
  }

  .carousel-item {
    min-height: 100vh;
    height: 100vh;
  }

  .carousel-caption {
    width: 85%;
    padding: 15px;
  }

  .carousel-caption h5 {
    font-size: 40px;
    letter-spacing: 1px;
    margin-bottom: 10px;
  }

  .carousel-caption p {
    font-size: 20px;
    line-height: 1.6;
  }
}

@media (max-width: 480px) {
  .carousel-caption h5 {
    font-size: 32px;
  }

  .carousel-caption p {
    font-size: 16px;
  }
}

/* Bootstrap carousel átmenet simítása */
.carousel-item {
  transition: transform 0.6s ease-in-out;
}
</style>
