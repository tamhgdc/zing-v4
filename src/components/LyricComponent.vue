<template>
  <div class="zm-lyric-container" :class="{ active: lyricStatus.isUp, 'un-active': lyricStatus.isDown }">
    <div
      class="overlay"
      :style="'background: url(' + currentAlbumData.song.items[currentIndex].thumbnail + ')'"
      :class="{ active: lyricStatus.isUp, 'un-active': lyricStatus.isDown }"
    ></div>
    <div class="main-content">
      <p>Hello world</p>
      <button @click="hideLyric()">Hide</button>
    </div>
  </div>
</template>

<script>
// import Helper from "@/utils/helper.js";
import { mapState } from "vuex";
export default {
  data() {
    return {};
  },
  mounted() {},
  methods: {
    hideLyric() {
      this.$store.commit("set_lyric_hide", true);
      this.$store.commit("set_lyric_show", false);
    },
  },
  computed: {
    ...mapState([
      "audio",
      "isPlaying",
      "toast",
      "lyricStatus",
      "currentIndex",
      "isRepeat",
      "isShuffle",
      "isControllerShow",
      "currentAlbumData",
      "currentSongData",
      "currentSongSrc",
      "currentSongEncodeId",
      "currentSong",
      "currentTime",
      "currentTimePercent",
      "isLoadingToPlay",
    ]),
  },
};
</script>

<style scoped>
.zm-lyric-container {
  background: #392242;
  position: fixed;
  height: 100vh;
  width: 100vw;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  transform: translateY(-100%);
  z-index: 100;
}
.zm-lyric-container.active {
  animation: slideUp 0.4s linear forwards;
}
.zm-lyric-container.un-active {
  animation: slideDown 0.4s linear forwards;
}
.zm-lyric-container > .overlay.active {
  animation: slideUp 0.4s linear forwards;
}
.zm-lyric-container > .overlay.un-active {
  animation: slideDown 0.4s linear forwards;
}
.zm-lyric-container > .overlay {
  z-index: 1100;
  position: absolute;
  height: 100vh;
  width: 100vw;
  filter: blur(80px);
  transform: translateY(-100%);
  background-repeat: no-repeat !important;
  background-size: 250% 250% !important;
  background-position: center !important;
}
.zm-lyric-container > .main-content {
  position: absolute;
  z-index: 1200;
  color: white;
}

@keyframes slideUp {
  0% {
    transform: translateY(100%);
    opacity: 0;
  }
  80% {
    opacity: 1;
  }
  100% {
    transform: translateY(0%);
    opacity: 1;
  }
}
@keyframes slideDown {
  0% {
    transform: translateY(0);
    opacity: 1;
  }
  80% {
    opacity: 1;
  }
  100% {
    transform: translateY(100%);
    opacity: 0;
  }
}
</style>
