<template>
  <div id="app">
    <div class="zm-layout" :class="{ 'has-player': isControllerShow, 'toggle-sidebar-expand': toggleSidebar }">
      <sidebar-component />
      <header-component />
      <div class="zm-mainpage">
        <router-view />
      </div>
      <controller-component />
    </div>
    <lyric-component />
  </div>
</template>

<script>
import { mapState } from "vuex";
import SidebarComponent from "@/components/SidebarComponent.vue";
import HeaderComponent from "@/components/HeaderComponent.vue";
import ControllerComponent from "@/components/ControllerComponent.vue";
import LyricComponent from "@/components/LyricComponent.vue";
import Zingmp3 from "@/services/api.service.js";

export default {
  components: { SidebarComponent, HeaderComponent, ControllerComponent, LyricComponent },
  async mounted() {
    this.$store.commit("set_toast", this.$toastr);
    this.$store.commit("set_alertify", this.$alertify);
    const page1Data = await Zingmp3.getHome();
    const page2Data = await Zingmp3.getHome(2);
    const page3Data = await Zingmp3.getHome(3);
    if (page1Data.status && page2Data.status && page3Data.status) {
      this.$store.commit("set_home_data", {
        page1: page1Data.data.items,
        page2: page2Data.data.items,
        page3: page3Data.data.items,
      });
    } else {
      this.$toastr.e(page1Data.msg, "Có lỗi xảy ra!");
    }
  },
  computed: {
    ...mapState([
      "audio",
      "isPlaying",
      "toast",
      "currentIndex",
      "isControllerShow",
      "currentAlbumData",
      "toggleSidebar",
      "currentSongSrc",
      "currentSongEncodeId",
      "currentSong",
      "currentTime",
      "currentTimePercent",
    ]),
  },
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
* {
  scroll-behavior: smooth;
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
  transition: transform linear 0.2s;
}

.zm-mainpage main {
  padding: 35px 59px 59px 59px;
}

@media screen and (max-width: 640px) {
  .zm-mainpage main {
    padding: 10px;
  }
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
@media screen and (max-width: 768px) {
  .toggle-sidebar-expand .zm-mainpage {
    margin-left: 0;
    width: 100%;
  }
}
</style>
