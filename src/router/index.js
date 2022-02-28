import Vue from "vue";
import VueRouter from "vue-router";
import HomeView from "@/views/desktop/HomeView.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: HomeView,
  },
  {
    path: "/about",
    name: "About",
    component: () => import(/* webpackChunkName: "about" */ "@/views/desktop/AboutView.vue"),
  },
  {
    path: "/album/:slugName/:id",
    name: "Albums",
    component: () => import(/* webpackChunkName: "album" */ "@/views/desktop/AlbumsView.vue"),
  },
  {
    path: "/bai-hat/:slugName/:id",
    name: "bai-hat",
    component: () => import(/* webpackChunkName: "bai-hat" */ "@/views/desktop/SongView.vue"),
  },
  {
    path: "/playlist/:slugName/:id",
    name: "Playlist",
    component: () => import(/* webpackChunkName: "playlist" */ "@/views/desktop/AlbumsView.vue"),
  },
  {
    path: "*",
    name: "NotFound",
    component: () => import(/* webpackChunkName: "notfound" */ "@/views/desktop/404View.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  linkExactActiveClass: "is-active",
  base: process.env.BASE_URL,
  routes,
});

export default router;
