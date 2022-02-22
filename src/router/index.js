import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("@/views/Home.vue"),
  },
  {
    path: "/about",
    name: "About",
    component: () => import("@/views/About.vue"),
  },
  {
    path: "/album/:slugName/:id",
    name: "Albums",
    component: () => import("@/views/Albums.vue"),
  },
  {
    path: "/playlist/:slugName/:id",
    name: "Playlist",
    component: () => import("@/views/Albums.vue"),
    meta: {
      title: "Playlist",
    },
  },
  {
    path: "*",
    name: "NotFound",
    component: () => import("@/views/404.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  linkExactActiveClass: "is-active",
  base: process.env.BASE_URL,
  routes,
});

export default router;
