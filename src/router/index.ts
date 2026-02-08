import { createRouter, createWebHistory } from "vue-router"

import HomeView from "../views/HomeView.vue"

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/car/:id",
      name: "car",
      component: () => import("../views/CarView.vue"),
    },
  ],
})

export default router