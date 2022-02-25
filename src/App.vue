<template>
  <div id="app">
    <div class="zm-layout" :class="{ 'has-player': isControllerShow }">
      <Sidebar />
      <Header />
      <div class="zm-mainpage">
        <router-view />
      </div>
      <Controller />
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
import Sidebar from "@/components/Sidebar.vue";
import Header from "@/components/Header.vue";
import Controller from "@/components/Controller.vue";
export default {
  components: { Sidebar, Header, Controller },
  mounted() {
    this.$store.commit("set_toast", this.$toastr);
  },
  computed: { ...mapState(["isControllerShow"]) },
};
</script>

<style>
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
body {
  line-height: 1.5;
  font-family: Inter, sans-serif;
  font-size: 14px;
}
body ::-webkit-scrollbar {
  width: 4px;
  z-index: 30;
}
body ::-webkit-scrollbar-thumb {
  z-index: 30;
  border-radius: 4px;
  -webkit-box-shadow: inset 0 0 6px rgb(135 135 135);
}

.zm-layout {
  display: flex;
  width: 100%;
  height: 100vh;
  background: #170f23;
}
.zm-layout.has-player {
  height: calc(100vh - 90px);
}
.zm-layout.has-player .zm-sidebar {
  height: calc(100vh - 90px);
}

.zm-mainpage {
  position: relative;
  padding-top: 70px;
  margin-left: 240px;
  width: calc(100% - 240px);
  height: 100%;
  color: #fff;
  overflow: hidden scroll;
}

.zm-mainpage main {
  padding: 35px 59px 59px 59px;
}

@media screen and (max-width: 1133px) {
  .zm-sidebar {
    width: 70px;
  }
  .zm-mainpage {
    width: calc(100% - 70px);
    margin-left: 70px;
  }
  .zm-header {
    left: calc(240px - 170px);
  }
}
</style>
