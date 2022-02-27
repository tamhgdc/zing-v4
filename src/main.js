import Vue from "vue";
import App from "@/App.vue";
import store from "@/store";
import router from "@/router";
import VueMeta from "vue-meta";
import VueToastr from "vue-toastr";
import VueAlertify from "vue-alertify";
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

new Vue({
  store,
  router,
  render: (h) => h(App),
}).$mount("#app");
