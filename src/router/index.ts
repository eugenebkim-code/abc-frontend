import { createRouter, createWebHistory } from "vue-router"

import HomeView from "../views/HomeView.vue"

const router = createRouter({
  history: createWebHistory(),

  scrollBehavior() {
    return { top: 0 }
  },

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
      props: true,
    },

    // fallback 404
    {
      path: "/:pathMatch(.*)*",
      name: "not-found",
      redirect: "/",
    },
  ],
})

export default router
