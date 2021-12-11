import { createRouter, createWebHistory } from "vue-router";

import top from "./pages/top.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "top",
      component: top,
    },
  ],
});

export default router;
