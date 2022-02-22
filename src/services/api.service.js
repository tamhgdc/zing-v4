import axios from "axios";
const API_BASE_URL = "https://zingmp3-api-production.up.railway.app/api/v1/";
class API {
  __request__(URL) {
    return axios
      .get(API_BASE_URL + URL)
      .then((response) => response.data)
      .then((response) => {
        if (response.err === 0) return { status: true, data: response.data };
        return { status: false, msg: response.msg };
      })
      .catch((err) => {
        return { status: false, msg: err.message };
      });
  }

  async stream(id = null) {
    let URL = "audio/stream/" + id;
    return await this.__request__(URL);
  }

  async getPlaylistDetail(id = null) {
    let URL = "playlist-detail/" + id;
    return await this.__request__(URL);
  }

  async getHome(page = 1) {
    let URL = "get-home?page=" + page;
    return await this.__request__(URL);
  }

  async getTop100() {
    let URL = "get-top-100";
    return await this.__request__(URL);
  }

  async getHomeChart() {
    let URL = "get-chart-home";
    return await this.__request__(URL);
  }

  async getNewReleaseChart() {
    let URL = "new-release-chart";
    return await this.__request__(URL);
  }

  async songDetail(id = null) {
    let URL = "song-detail/" + id;
    return await this.__request__(URL);
  }

  async searchArtist(keyword = null) {
    let URL = "nghe-si/" + keyword;
    return await this.__request__(URL);
  }

  async getLyric(id = null) {
    let URL = "lyric/" + id;
    return await this.__request__(URL);
  }

  async search(keyword = null) {
    let URL = "search/" + keyword;
    return await this.__request__(URL);
  }

  async getPlaylistMV(id = null) {
    let URL = "playlist-mv/" + id;
    return await this.__request__(URL);
  }

  async getCategoryMV(id = null) {
    let URL = "category-mv/" + id;
    return await this.__request__(URL);
  }

  async streamVideo(id = null) {
    let URL = "video/stream/" + id;
    return await this.__request__(URL);
  }
}
export default new API();
