export default {
  audio: null,
  toast: null,
  isPlaying: false,
  isLoadingToPlay: false,
  isRepeat: localStorage.getItem("isRepeat") ? JSON.parse(localStorage.getItem("isRepeat")) : false,
  currentIndex: localStorage.getItem("currentIndex") ? JSON.parse(localStorage.getItem("currentIndex")) : 0,
  isControllerShow: localStorage.getItem("currentSongData") ? true : false,
  currentAlbumData: localStorage.getItem("currentAlbumData") ? JSON.parse(localStorage.getItem("currentAlbumData")) : null,
  currentSongEncodeId: localStorage.getItem("currentSongEncodeId") ? JSON.parse(localStorage.getItem("currentSongEncodeId")) : null,
  currentSongData: localStorage.getItem("currentSongData") ? JSON.parse(localStorage.getItem("currentSongData")) : null,
  currentSongSrc: localStorage.getItem("currentSongSrc") ? JSON.parse(localStorage.getItem("currentSongSrc")) : null,
  currentTime: localStorage.getItem("currentTime") ? JSON.parse(localStorage.getItem("currentTime")) : 0,
  currentTimePercent: localStorage.getItem("currentTimePercent") ? JSON.parse(localStorage.getItem("currentTimePercent")) : 0,
};
