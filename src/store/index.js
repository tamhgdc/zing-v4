import Vue from "vue";
import Vuex from "vuex";
import Zingmp3 from "@/services/api.service.js";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    audio: new Audio(),
    isControllerShow: false,
    isPlaying: false,
    toast: null,
    currentAlbumData: localStorage.getItem("currentAlbumData") ? JSON.parse(localStorage.getItem("currentAlbumData")) : null,
    currentIndex: localStorage.getItem("currentIndex") ? JSON.parse(localStorage.getItem("currentIndex")) : 0,
    currentSongEncodeId: localStorage.getItem("currentSongEncodeId") ? JSON.parse(localStorage.getItem("currentSongEncodeId")) : null,
    currentSong: localStorage.getItem("currentSong") ? JSON.parse(localStorage.getItem("currentSong")) : null,
    currentTime: localStorage.getItem("currentTime") ? JSON.parse(localStorage.getItem("currentTime")) : 0,
    currentTimePercent: localStorage.getItem("currentTimePercent") ? JSON.parse(localStorage.getItem("currentTimePercent")) : 0,
  },
  mutations: {
    set_toast(state, obj) {
      state.toast = obj;
    },
    set_controller_status(state, status) {
      state.isControllerShow = status;
    },
    set_current_index(state, index) {
      state.currentIndex = index;
      localStorage.setItem("currentIndex", JSON.stringify(index));
    },
    set_playing_status(state, status) {
      state.isPlaying = status;
    },
    set_current_album_data(state, data) {
      state.currentAlbumData = data;
      localStorage.setItem("currentAlbumData", JSON.stringify(data));
    },
    set_current_song(state, src) {
      state.currentSong = src;
      state.audio.src = src;
      localStorage.setItem("currentSong", JSON.stringify(src));
    },
    set_current_encodeId(state, encodeId) {
      state.currentSongEncodeId = encodeId;
      localStorage.setItem("currentSongEncodeId", JSON.stringify(encodeId));
    },
    set_current_time(state, time) {
      state.currentTime = time;
      localStorage.setItem("currentTime", JSON.stringify(time));
    },
    set_current_time_percent(state, time) {
      state.currentTimePercent = time;
      localStorage.setItem("currentTimePercent", JSON.stringify(time));
    },
    set_audio_current_time(state, time) {
      state.audio.currentTime = time;
    },
    set_audio_playing(state, status) {
      if (status) {
        state.audio.play();
      } else {
        state.audio.pause();
      }
    },
  },
  actions: {
    handlePreSong({ commit, state, dispatch }) {
      commit("set_current_time", 0);
      commit("set_current_time_percent", 0);
      let totalLength = state.currentAlbumData.song.total;
      let crntIndex = state.currentIndex;
      crntIndex--;
      if (crntIndex < 0) {
        commit("set_current_index", totalLength - 1);
      } else {
        commit("set_current_index", crntIndex);
      }
      dispatch("handlePlay");
    },
    handleNextSong({ commit, state, dispatch }) {
      commit("set_current_time", 0);
      commit("set_current_time_percent", 0);
      let totalLength = state.currentAlbumData.song.total;
      let crntIndex = state.currentIndex;
      crntIndex++;
      if (crntIndex > totalLength - 1) {
        commit("set_current_index", 0);
      } else {
        commit("set_current_index", crntIndex);
      }
      dispatch("handlePlay");
    },
    setControllerStatus({ commit }, status) {
      commit("set_controller_status", status);
    },
    handlePlayAll({ commit, dispatch }, albumData) {
      commit("set_current_index", 0);
      commit("set_current_song", null);
      commit("set_current_time", 0);
      commit("set_audio_playing", false);
      commit("set_current_album_data", albumData);
      dispatch("handlePlay");
    },
    selectSongToPlay({ commit, dispatch }, data) {
      commit("set_current_song", null);
      commit("set_current_time", 0);
      commit("set_audio_playing", false);
      commit("set_current_album_data", data.albumData);
      commit("set_current_index", data.i);
      commit("set_controller_status", true);
      commit("set_current_time_percent", 0);
      dispatch("handlePlay");
    },
    audioOnPlaying({ commit, state, dispatch }) {
      state.audio.addEventListener("timeupdate", () => {
        let durationTime = state.audio.duration.toFixed();
        let currentTime = state.audio.currentTime.toFixed();
        let percent = (currentTime * 100) / durationTime;
        commit("set_current_time", currentTime);
        commit("set_current_time_percent", percent);
        // commit("set_current_time_percent", Math.round(percent));
        if (durationTime === currentTime) {
          dispatch("handleNextSong");
        }
      });
    },
    handlePlay({ commit, state, dispatch }) {
      commit("set_playing_status", false);
      commit("set_audio_playing", false);
      commit("set_current_time_percent", 0);
      commit("set_controller_status", true);
      let encodeId = state.currentAlbumData.song.items[state.currentIndex].encodeId;
      if (state.currentSongEncodeId === encodeId) {
        commit("set_audio_playing", true);
        commit("set_playing_status", true);
        dispatch("audioOnPlaying");
      } else {
        Zingmp3.stream(encodeId).then((response) => {
          if (response.status) {
            commit("set_current_song", response.data["128"]);
            commit("set_current_encodeId", encodeId);
            commit("set_audio_playing", true);
            commit("set_playing_status", true);
            dispatch("audioOnPlaying");
          } else {
            state.toast.e(response.msg);
            dispatch("handleNextSong");
          }
        });
      }
    },
    handlePause({ commit }) {
      commit("set_playing_status", false);
      commit("set_audio_playing", false);
    },
  },
  modules: {},
});
