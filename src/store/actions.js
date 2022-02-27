export default {
  handleNextSong({ commit, state }) {
    commit("destroy_audio", {});
    commit("set_current_time", 0);
    commit("set_current_time_percent", 0);
    commit("set_playing_status", false);
    commit("set_loading_to_play_status", true);
    let totalLength = state.currentAlbumData.song.total - 1;
    let currentIndex = state.currentIndex;
    currentIndex++;

    if (currentIndex <= totalLength) {
      commit("set_current_index", currentIndex);
      commit("set_current_song_source", {
        song: state.currentAlbumData.song.items[currentIndex],
        index: currentIndex,
      });
      console.log(state.currentIndex);
      console.log(state.currentAlbumData);
    } else {
      commit("set_current_index", 0);
      commit("set_current_song_source", {
        song: state.currentAlbumData.song.items[0],
        index: 0,
      });
      console.log(state.currentIndex);
      console.log(state.currentAlbumData);
    }
  },
  handlePreSong({ commit, state }) {
    commit("destroy_audio", {});
    commit("set_current_time", 0);
    commit("set_current_time_percent", 0);
    commit("set_playing_status", false);
    commit("set_loading_to_play_status", true);
    let currentIndex = state.currentIndex;
    let totalLength = state.currentAlbumData.song.total - 1;
    currentIndex--;
    if (currentIndex < 0) {
      commit("set_current_index", totalLength);
      commit("set_current_song_source", {
        song: state.currentAlbumData.song.items[totalLength],
        index: totalLength,
      });
      console.log(state.currentIndex);
      console.log(state.currentAlbumData);
    } else {
      commit("set_current_index", currentIndex);
      commit("set_current_song_source", {
        song: state.currentAlbumData.song.items[currentIndex],
        index: currentIndex,
      });
      console.log(state.currentIndex);
      console.log(state.currentAlbumData);
    }
  },
  audioOnPlaying({ commit, state }) {
    document.querySelector(".now-playing").scrollIntoView({ behavior: "smooth", block: "center" });
    state.audio.addEventListener("timeupdate", () => {
      if (state.audio) {
        let durationTime = Math.round(state.audio.duration);
        let currentTime = Math.round(state.audio.currentTime);
        let percent = (currentTime * 100) / durationTime;
        commit("set_playing_status", true);
        commit("set_loading_to_play_status", false);
        commit("set_current_time", currentTime);
        commit("set_current_time_percent", Math.round(percent));
      }
    });
  },
  audioOnEnded({ state, commit, dispatch }) {
    state.audio.addEventListener("ended", () => {
      commit("set_playing_status", false);
      commit("set_loading_to_play_status", false);
      commit("set_current_time", 0);
      commit("set_current_time_percent", 0);
      commit("destroy_audio", {});
      dispatch("handleNextSong");
      console.log("Audio has been ended!");
    });
  },
  handlePlayCurrentSong({ commit, dispatch, state }) {
    commit("set_controller_status", true);
    commit("destroy_audio", {});
    commit("set_loading_to_play_status", true);
    if (state.currentSongSrc) {
      commit("initial_audio", {});
      commit("set_audio_source", state.currentSongSrc);
      commit("set_audio_current_time", state.currentTime);
      commit("set_audio_playing", true);
      dispatch("audioOnPlaying");
      dispatch("audioOnEnded");
    } else {
      state.toast.e("Có lỗi xãy ra, không thể phát bài hát...");
    }
  },
  handlePause({ commit }) {
    commit("destroy_audio", {});
    commit("set_loading_to_play_status", false);
    commit("set_playing_status", false);
  },
};
