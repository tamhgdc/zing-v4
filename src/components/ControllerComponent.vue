<template>
  <div class="now-playing-bar" v-if="isControllerShow">
    <div class="player-controls">
      <div class="player-controls__container" @click="handleRedirectOnClick()">
        <div class="player-controls-left">
          <div class="media">
            <div class="media-thumb" :class="{ ' playing-active': isPlaying }">
              <img :src="currentAlbumData.song.items[currentIndex].thumbnail" />
            </div>
            <div class="media-content">
              <p class="capitalize">{{ currentAlbumData.song.items[currentIndex].title }}</p>
              <p class="capitalize opacity-60">{{ currentAlbumData.song.items[currentIndex].artistsNames }}</p>
            </div>
          </div>
        </div>
        <div class="player-controls-center">
          <div class="player-controls-item">
            <div class="actions">
              <button
                class="zm-controls-btn desktop:is-hover-circle btn-shuffle"
                :class="{ active: isShuffle }"
                @click="handleSetShuffle()"
                title="Bật phát ngẫu nhiên"
              >
                <ThemifyIcon icon="control-shuffle" />
              </button>
              <button class="zm-controls-btn desktop:is-hover-circle btn-pre" @click="handlePreSong()">
                <ThemifyIcon icon="control-skip-backward" />
              </button>
              <button class="zm-controls-btn btn-play" v-if="!isPlaying && !isLoadingToPlay" @click="handlePlay()">
                <ThemifyIcon icon="control-play" />
              </button>
              <button class="zm-controls-btn btn-loading-to-play" v-if="isLoadingToPlay">
                <ThemifyIcon icon="settings" />
              </button>
              <button class="zm-controls-btn btn-pause" v-if="isPlaying && !isLoadingToPlay" @click="handlePause()">
                <ThemifyIcon icon="control-pause" />
              </button>
              <button class="zm-controls-btn desktop:is-hover-circle btn-next" @click="handleNextSong">
                <ThemifyIcon icon="control-skip-forward" />
              </button>
              <button
                class="zm-controls-btn desktop:is-hover-circle btn-repeat"
                :class="{ active: isRepeat }"
                @click="handleSetRepeat()"
                title="Bật phát lại một bài hát"
              >
                <ThemifyIcon icon="infinite" />
              </button>
            </div>
          </div>
          <div class="player-controls-rangebar">
            <span class="time-left">{{ fmtMSS(currentTime) }}</span>
            <div class="zm-duration-bar">
              <input
                id="song-slider"
                type="range"
                class="w-full mb-2 controller-slider-input"
                @input="handleChangeCurrentTime"
                :value="currentTimePercent ? currentTimePercent : 0"
              />
              <div
                class="zm-slide-bar"
                :style="
                  'background: linear-gradient( to right,#fff 0%,#fff ' +
                  currentTimePercent +
                  '%,hsla(0, 0%, 100%, 0.3) 0%,hsla(0, 0%, 100%, 0.3) 100% ) !important;'
                "
              ></div>
            </div>
            <span class="time-right">{{ fmtMSS(currentAlbumData.song.items[currentIndex].duration) }}</span>
          </div>
        </div>
        <div class="player-controls-right">Right</div>
      </div>
    </div>
  </div>
</template>

<script>
import Helper from "@/utils/helper.js";
import { mapState } from "vuex";
export default {
  mounted() {
    if (this.$store.state.currentSongSrc) {
      this.$store.commit("set_controller_status", true);
    }
  },
  methods: {
    fmtMSS: Helper.fmtMSS,
    handleRedirectOnClick() {
      if (this.$router.history.current.fullPath != this.currentAlbumData.link) {
        this.$router.push(this.currentAlbumData.link);
      }
    },
    handleChangeCurrentTime(e) {
      let time = (e.target.value * this.currentSongData.duration) / 100;
      let percent = e.target.value;
      if (this.audio) {
        this.$store.commit("set_audio_current_time", time);
      }
      this.$store.commit("set_current_time_percent", percent);
      this.$store.commit("set_current_time", Math.round(time));
    },
    handlePause() {
      console.log("pause");
      this.$store.dispatch("handlePause");
    },
    handlePlay() {
      console.log("play");
      this.$store.dispatch("handlePlayCurrentSong");
    },
    handlePreSong() {
      console.log("pre");
      this.$store.dispatch("handlePreSong");
    },
    handleNextSong() {
      console.log("next");
      this.$store.dispatch("handleNextSong");
    },
    handleSetRepeat() {
      console.log("set repeat");
      this.$store.commit("set_is_repeat", !this.isRepeat);
      this.isRepeat ? this.$toastr.i("Bạn vừa bật chức năng lặp lại một bài hát") : this.$toastr.i("Bạn vừa tắt chức năng lặp lại một bài hát");
    },
    handleSetShuffle() {
      console.log("set shuffle");
      this.$store.commit("set_is_shuffle", !this.isShuffle);
      this.isShuffle ? this.$toastr.i("Bạn vừa bật chức năng phát ngẫu nhiên") : this.$toastr.i("Bạn vừa tắt chức năng phát ngẫu nhiên");
    },
  },
  computed: {
    ...mapState([
      "audio",
      "isPlaying",
      "toast",
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
.now-playing-bar {
  position: fixed;
  bottom: 0;
  width: 100%;
  max-height: 70px;
  z-index: 100;
  cursor: pointer;
}
.player-controls {
  position: fixed;
  z-index: 2;
  width: 100%;
  bottom: 0;
  -webkit-user-select: none;
  -ms-user-select: none;
  user-select: none;
  background-color: #170f23;
}
.player-controls__container {
  height: 90px;
  min-width: 768px;
  padding: 0 20px;
  background-color: rgba(0, 0, 0, 0.2);
  border-top: 1px solid #ffffff1c;
  background-image: var(--miniplayer-bg-img);
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: white;
}
.media {
  display: flex;
  align-items: center;
  text-align: left;
  padding: 0px;
  -webkit-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
.media-thumb {
  width: 68px;
  height: 68px;
  overflow: hidden;
  margin-right: 20px;
}
.media-thumb img {
  width: 100%;
  min-width: 68px;
  height: 100%;
  border-radius: 50%;
  animation: frameInitial 0.5s linear forwards;
}
.media-thumb.playing-active img {
  animation: frameRotate 10s linear infinite;
}
.player-controls-left {
  justify-content: flex-start;
}
.player-controls-right {
  justify-content: flex-end;
}
.player-controls-left,
.player-controls-right {
  position: relative;
  max-height: 100%;
  overflow: hidden;
  width: 30%;
  z-index: 1;
  display: flex;
  align-items: center;
  flex-basis: auto;
  flex-grow: 0;
  flex-shrink: 0;
}
.player-controls-center {
  flex-grow: 1;
  max-width: 40vw;
  text-align: center;
}
.player-controls-center .player-controls-item {
  align-items: center;
  display: flex;
  flex-basis: auto;
  flex-grow: 0;
  flex-shrink: 0;
  justify-content: center;
}
.player-controls-center .player-controls-item .actions {
  display: flex;
  flex-shrink: 0;
  justify-content: center;
  align-items: center;
}
.zm-controls-btn {
  padding: 3px;
  margin: 0 7px;
  line-height: 0;
  font-size: 14px;
  border-radius: 999px;
  line-height: normal;
  border: 0;
  display: inline-block;
  font-weight: 400;
  text-transform: none;
  text-align: center;
  cursor: pointer;
  position: relative;
  transition: all 0.1s linear;
}
.zm-controls-btn i {
  padding: 5px;
  font-size: 16px;
  display: inline-block;
}
.zm-controls-btn.btn-play,
.zm-controls-btn.btn-loading-to-play,
.zm-controls-btn.btn-pause {
  padding: 0;
}
.zm-controls-btn.btn-play i,
.zm-controls-btn.btn-loading-to-play i,
.zm-controls-btn.btn-pause i {
  position: relative;
  font-size: 20px;
  padding: 15px;
}
.zm-controls-btn.btn-loading-to-play i {
  animation: frameRotate 1s linear infinite;
}
.zm-controls-btn.btn-play:hover,
.zm-controls-btn.btn-pause:hover {
  color: #c662ef;
}
.zm-controls-btn.btn-play:hover i::after,
.zm-controls-btn.btn-pause:hover i::after {
  border: 1px solid #c662ef;
}
.zm-controls-btn.btn-play i::after,
.zm-controls-btn.btn-loading-to-play i::after,
.zm-controls-btn.btn-pause i::after {
  position: absolute;
  content: "";
  border: 1px solid white;
  height: 70%;
  width: 70%;
  border-radius: 50px;
  transition: all linear 0.1s;
}
.zm-controls-btn.btn-play i::after {
  transform: translate(-78%, -21%);
}
.zm-controls-btn.btn-loading-to-play i::after {
  transform: translate(-80%, -20%);
}
.zm-controls-btn.btn-pause i::after {
  transform: translate(-80%, -22%);
}
.zm-controls-btn.is-hover-circle:hover {
  background: hsla(0, 0%, 100%, 0.1);
}
.player-controls-rangebar {
  align-items: center;
  display: flex;
  flex-basis: auto;
  flex-grow: 0;
  flex-shrink: 0;
  justify-content: center;
  margin-bottom: 5px;
}
.time-left,
.time-right {
  opacity: 0.5;
  min-width: 45px;
  font-size: 12px;
  font-weight: 500;
}
.time-left {
  text-align: right;
  margin-right: 10px;
}
.time-right {
  text-align: left;
  margin-left: 10px;
}
.zm-duration-bar {
  min-width: 100%;
  height: 15px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}
.zm-duration-bar .zm-slide-bar {
  position: absolute;
  width: 100%;
  height: 3px;
  border-radius: 4px;
  background: linear-gradient(to right, #fff 0%, #fff 0%, hsla(0, 0%, 100%, 0.3) 0%, hsla(0, 0%, 100%, 0.3) 100%);
  align-self: center;
}
.zm-duration-bar .controller-slider-input {
  position: absolute;
  width: 100%;
  height: 3px;
  border-radius: 4px;
  background: linear-gradient(to right, #fff 0%, #fff 0%, hsla(0, 0%, 100%, 0.3) 0%, hsla(0, 0%, 100%, 0.3) 100%);
  outline: none;
  cursor: pointer;
  z-index: 100;
  margin: 0;
  transition: all 0.2s linear;
  -webkit-appearance: none;
  -webkit-transition: 0.2s;
}
.btn-shuffle.active,
.btn-repeat.active {
  color: #c662ef;
}
@media screen and (max-width: 768px) {
  .player-controls-left,
  .player-controls-right {
    display: none !important;
  }
  .player-controls-center {
    max-width: unset;
    width: 100%;
  }
  .player-controls__container {
    padding: 0;
    min-width: unset;
    justify-content: center;
  }
  .zm-duration-bar {
    min-width: unset;
    width: 100%;
  }
}
@keyframes frameRotate {
  0% {
    transform: rotate(0);
  }
  50% {
    transform: rotate(180deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
@keyframes frameInitial {
  0% {
    transform: rotate(0);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
