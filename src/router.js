import { createRouter, createWebHistory } from "vue-router";

import top from "./pages/top.vue";
import create from "./pages/create.vue";
import edit from "./pages/edit.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "top",
      component: top,
    },
    {
      path: "/create",
      name: "create",
      component: create,
    },
    {
      path: "/edit/:id",
      name: "edit",
      component: edit,
    },
  ],
});

export default router;
