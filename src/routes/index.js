import { createRouter,createWebHistory } from "vue-router";
import Kezdolap from "../components/Kezdolap.vue";
import Quiz from "../components/Quiz.vue";
import Galeria from "../components/Galeria.vue";

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
            path: '/galeria',
            component: Galeria
      }
]

const router = createRouter({
      history: createWebHistory(), routes
})

export default router;