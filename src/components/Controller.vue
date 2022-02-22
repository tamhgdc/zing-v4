<template>
  <div class="now-playing-bar" v-if="isControllerShow">
    <div class="player-controls">
      <div class="player-controls__container">
        <div class="player-controls-left">
          <div class="media">
            <div class="media-thumb">
              <img :src="currentAlbumData.song.items[currentIndex].thumbnail" />
            </div>
            <div class="media-content">
              {{ currentAlbumData.song.items[currentIndex].title }}
            </div>
          </div>
        </div>
        <div class="player-controls-center">
          <div class="player-controls-item">
            <div class="actions">
              <button
                class="zm-controls-btn is-hover-circle btn-shuffle"
                title="Bật phát ngẫu nhiên"
              >
                <ThemifyIcon icon="control-shuffle" />
              </button>
              <button
                class="zm-controls-btn is-hover-circle btn-pre"
                @click="handlePreSong()"
              >
                <ThemifyIcon icon="control-skip-backward" />
              </button>
              <button
                class="zm-controls-btn btn-play"
                v-if="!isPlaying"
                @click="handlePlay()"
              >
                <ThemifyIcon icon="control-play" />
              </button>
              <button
                class="zm-controls-btn btn-pause"
                v-if="isPlaying"
                @click="handlePause()"
              >
                <ThemifyIcon icon="control-pause" />
              </button>
              <button
                class="zm-controls-btn is-hover-circle btn-next"
                @click="handleNextSong()"
              >
                <ThemifyIcon icon="control-skip-forward" />
              </button>
              <button
                class="zm-controls-btn is-hover-circle btn-repeat"
                title="Bật phát lại tất cả"
              >
                <ThemifyIcon icon="infinite" />
              </button>
            </div>
          </div>
          <div class="player-controls-rangebar">
            <span class="time-left">{{ fmtMSS(currentTime) }}</span>
            <div class="zm-duration-bar">
              <div
                class="zm-slide-bar"
                v-bind:style="
                  'background: linear-gradient( to right,#fff 0%,#fff ' +
                  currentTimePercent +
                  '%,hsla(0, 0%, 100%, 0.3) 0%,hsla(0, 0%, 100%, 0.3) 100% ) !important;'
                "
              ></div>
            </div>
            <span class="time-right">{{
              fmtMSS(currentAlbumData.song.items[currentIndex].duration)
            }}</span>
          </div>
        </div>
        <div class="player-controls-right">Right</div>
      </div>
    </div>
  </div>
</template>
<script>
import Helper from "@/utils/helper.js";
import { mapState, mapActions } from "vuex";
export default {
  mounted() {
    if (this.currentSong) {
      this.setControllerStatus(true);
      this.$store.commit("set_audio_current_time", this.currentTime);
      this.$store.commit("set_current_song", this.currentSong);
    } else {
      this.setControllerStatus(false);
    }
  },
  methods: {
    ...mapActions([
      "handlePlay",
      "handlePause",
      "handlePreSong",
      "handleNextSong",
      "setControllerStatus",
    ]),
    fmtMSS: Helper.fmtMSS,
  },
  computed: {
    ...mapState([
      "isControllerShow",
      "isPlaying",
      "currentAlbumData",
      "currentIndex",
      "currentSong",
      "currentTime",
      "currentTimePercent",
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
  border-radius: 5px;
  -webkit-user-select: none;
  -ms-user-select: none;
  user-select: none;
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
.zm-controls-btn.btn-pause {
  padding: 0;
}
.zm-controls-btn.btn-play i,
.zm-controls-btn.btn-pause i {
  position: relative;
  font-size: 20px;
  padding: 15px;
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
  transform: translate(-82%, -22%);
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
  width: 100%;
  height: 15px;
  cursor: pointer;
  display: flex;
  justify-content: center;
}
.zm-duration-bar .zm-slide-bar {
  width: 100%;
  height: 3px;
  border-radius: 4px;
  background: linear-gradient(
    to right,
    #fff 0%,
    #fff 0%,
    hsla(0, 0%, 100%, 0.3) 0%,
    hsla(0, 0%, 100%, 0.3) 100%
  );
  align-self: center;
}
</style>
