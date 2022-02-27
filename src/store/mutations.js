import Zingmp3 from "@/services/api.service.js";
export default {
  set_toast(state, obj) {
    state.toast = obj;
  },
  initial_audio(state) {
    state.audio = new Audio();
  },
  destroy_audio(state) {
    if (state.audio) {
      state.audio.pause();
      state.audio.src = null;
      state.audio = null;
    } else {
      state.audio = null;
    }
  },
  set_controller_status(state, status) {
    state.isControllerShow = status;
  },
  set_loading_to_play_status(state, status) {
    state.isLoadingToPlay = status;
  },
  set_current_index(state, index) {
    state.currentIndex = index;
    localStorage.setItem("currentIndex", JSON.stringify(index));
  },
  set_is_repeat(state, status) {
    state.isRepeat = status;
    localStorage.setItem("isRepeat", JSON.stringify(status));
  },
  set_playing_status(state, status) {
    state.isPlaying = status;
  },
  set_current_album_data(state, data) {
    state.currentAlbumData = data;
    localStorage.setItem("currentAlbumData", JSON.stringify(data));
  },
  set_current_song_data(state, data) {
    state.currentSongData = data;
    localStorage.setItem("currentSongData", JSON.stringify(data));
  },
  set_current_song_encodeId(state, encodeId) {
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
    status ? state.audio.play() : state.audio.pause();
  },
  set_audio_source(state, src) {
    state.audio.src = src;
  },
  set_current_song_source(state, object) {
    let { song, index } = object;
    Zingmp3.stream(song.encodeId).then((response) => {
      if (response.status) {
        state.currentSongSrc = response.data["128"];
        localStorage.setItem("currentSongSrc", JSON.stringify(response.data["128"]));
        this.commit("set_current_song_encodeId", song.encodeId);
        this.commit("set_current_index", index);
        this.commit("set_current_song_data", song);
        this.commit("set_current_time", 0);
        this.commit("set_current_time_percent", 0);
        document.querySelector(".now-playing").scrollIntoView({ behavior: "smooth", block: "center" });
        this.dispatch("handlePlayCurrentSong");
      } else {
        state.toast.e(response.msg);
      }
    });
  },
};
