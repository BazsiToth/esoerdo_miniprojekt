import { createRouter,createWebHistory } from "vue-router";
import Kezdolap from "../components/Kezdolap.vue";

const routes = [
      {
            path: '/',
            component: Kezdolap
      }
]

const router = createRouter({
      history: createWebHistory(), routes
})

export default router;