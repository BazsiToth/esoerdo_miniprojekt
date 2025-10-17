import { createRouter,createWebHistory } from "vue-router";
import Kezdolap from "../components/Kezdolap.vue";
import Quiz from "../components/Quiz.vue";
import Galery from "../components/Galery.vue";

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
            path: '/galery',
            component: Galery
      }
]

const router = createRouter({
      history: createWebHistory(), routes
})

export default router;