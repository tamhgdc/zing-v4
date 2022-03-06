import Vue from "vue";
import App from "@/App.vue";
import store from "@/store";
import router from "@/router";
import VueMeta from "vue-meta";
import VueToastr from "vue-toastr";
import VueAlertify from "vue-alertify";
import VueLazyload from "vue-lazyload";
import ThemifyIcon from "vue-themify-icons";
import VueSmoothScroll from "vue2-smooth-scroll";
import "@/assets/css/tailwind.css";

Vue.config.productionTip = false;
Vue.component("ThemifyIcon", ThemifyIcon);
Vue.use(VueSmoothScroll);
Vue.use(VueMeta);
Vue.use(VueToastr);

Vue.use(VueAlertify, {
  glossary: {
    title: "Thông báo",
    ok: "OK",
    cancel: "Huỷ",
  },
});

Vue.use(VueLazyload, {
  preLoad: 1.3,
  error: "https://www.freeiconspng.com/thumbs/no-image-icon/no-image-icon-6.png",
  loading: "https://i.stack.imgur.com/ATB3o.gif",
  attempt: 1,
});

new Vue({
  store,
  router,
  render: (h) => h(App),
}).$mount("#app");
