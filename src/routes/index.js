import { createRouter,createWebHistory } from "vue-router";
import Kezdolap from "../components/Kezdolap.vue";
import Quiz from "../components/Quiz.vue";
import Gallery from "../components/Gallery.vue";
import Animals from "../components/Animals.vue";
import Climate from "../components/Climate.vue";
import Nature from "../components/Nature.vue";
import About from "../components/About.vue";

const routes = [
      {
            path: '/',
            component: Kezdolap
      },
      {
            path: '/quiz',
            component: Quiz
      },
      {
            path: '/gallery',
            component: Gallery
      },
      {
            path: '/animals',
            component: Animals
      },
      {
            path: '/climate',
            component: Climate
      },
      {
            path: '/nature',
            component: Nature
      },
      {
            path: '/about',
            component: About
      }
]

const router = createRouter({
      history: createWebHistory(), routes
})

export default router;