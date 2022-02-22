<template>
  <main>
    <AlbumsSkeleton :loading="loading" />
    <div class="zm-section" v-if="!loading">
      <div class="grid grid-cols-3 gap-7 mb-10">
        <div class="...">
          <div class="media playlist-header sticky text-center">
            <div class="media-content font-bold">
              <figure class="zm-card-image rounded-md mb-3">
                <img
                  class="select-none"
                  :src="albumData.thumbnailM"
                  style="width: 100%"
                />
                <span class="overlay" @click="handlePlay()">
                  <ThemifyIcon icon="control-play" />
                </span>
              </figure>
              <h1 class="font-bold text-xl select-none">
                {{ albumData.title }}
              </h1>
              <p class="text-gray-400 font-medium select-none">
                Cập nhật:
                {{ new Date(albumData.contentLastUpdate * 1000).toLocaleDateString() }}
              </p>
              <p class="text-gray-400 font-medium select-none">
                {{ albumData.artistsNames }}
              </p>
              <p class="text-gray-400 font-medium select-none">
                {{ likesFormat(albumData.like) }} người yêu thích
              </p>
              <button
                class="zm-btn-play-all text-white font-bold py-2 px-7 mt-3 rounded-full"
                @click="handlePlayAll(albumData)"
              >
                <ThemifyIcon icon="control-play" /> Phát tất cả
              </button>
            </div>
          </div>
        </div>
        <div class="col-span-2 ...">
          <div class="playlist-content">
            <p class="title font-medium mb-5">
              <span class="opacity-70">Lời tựa</span>
              {{ albumData.sortDescription }}
            </p>
            <div class="grid grid-cols-4 gap-4 mb-3 px-3 text-gray-400 font-medium">
              <div class="col-span-2 ...">Bài hát</div>
              <div class="...">Album</div>
              <div class="... text-right">Thời gian</div>
            </div>
            <div v-for="(song, i) in albumData.song.items" :key="i">
              <div
                class="border-t-2 grid grid-cols-4 gap-4 text-gray-400 p-3 font-medium hover:bg-white hover:bg-opacity-10 select-none"
                :ref="currentIndex === i ? 'playing' : 'noplay'"
                :class="{ 'now-playing': currentIndex === i }"
              >
                <div class="col-span-2 ... flex items-center">
                  <span class="mr-2"><ThemifyIcon icon="music-alt" /></span>
                  <img
                    class="mr-2 cursor-pointer"
                    style="width: 40px"
                    :src="song.thumbnail"
                    @click="selectSongToPlay({ albumData, i })"
                  />
                  <div class="zm-song-title">
                    <p class="text-white capitalize">
                      {{ song.title }}
                    </p>
                    <p class="capitalize">{{ song.artistsNames }}</p>
                  </div>
                </div>
                <div class="... flex items-center zm-song-title capitalize">
                  {{ song.album ? song.album.title : "---" }}
                </div>
                <div class="... flex items-center justify-end">
                  <span class="mr-4">
                    {{ fmtMSS(song.duration) }}
                  </span>
                </div>
              </div>
            </div>
            <div class="mb-3 p-3 text-gray-400 font-medium border-t-2">
              <p>
                {{ albumData.song.total }} bài hát •
                {{ fmtMSSToString(albumData.song.totalDuration) }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import { mapActions, mapState } from "vuex";
import Helper from "@/utils/helper.js";
import AlbumsSkeleton from "@/components/AlbumsSkeleton.vue";
import Zingmp3 from "@/services/api.service.js";

export default {
  data() {
    return {
      albumData: null,
      loading: true,
      metaInfo: {
        title: "Zing MP3 | Nghe tải nhạc chất lượng cao",
      },
    };
  },
  mounted() {
    Zingmp3.getPlaylistDetail(this.$route.params.id.split(".")[0])
      .then((response) => {
        if (response.status) {
          this.loading = false;
          this.albumData = response.data;
          this.metaInfo.title = response.data.title + " | Album 320 lossless";
        } else {
          this.$router.push("/");
        }
      })
      .catch(() => {
        this.$router.push("/");
      });
  },
  methods: {
    ...mapActions(["handlePlayAll", "handlePlay", "selectSongToPlay"]),
    fmtMSS: Helper.fmtMSS,
    fmtMSSToString: Helper.fmtMSSToString,
    likesFormat: Helper.likesFormat,
  },
  components: { AlbumsSkeleton },
  computed: { ...mapState(["currentIndex"]) },
  metaInfo() {
    return {
      title: this.metaInfo.title,
    };
  },
};
</script>

<style>
.playlist-header.sticky {
  position: -webkit-sticky;
  position: sticky;
  top: 35px;
}
.zm-btn-play-all {
  background: #7200a1;
  text-transform: uppercase;
}
.zm-btn-play-all:hover {
  opacity: 0.9;
}
.border-t-2 {
  border-top: 0.5px solid rgba(255, 255, 255, 0.082);
}
.zm-song-title {
  width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100%;
}
.now-playing {
  background: rgba(124, 124, 124, 0.411);
}

.zm-card-image {
  transition: transform 0.7s;
  height: 100%;
  width: 100%;
  overflow: hidden;
  position: relative;
}
.zm-card-image img {
  transition: all 0.7s;
}
.zm-card-image:hover img {
  transform: scale(1.1) translateZ(0);
  filter: brightness(0.5) saturate(0.5) blur(1px);
}
.zm-card-image .overlay {
  position: absolute;
  height: 100%;
  width: 100%;
  transform: translateY(-100%);
  display: none;
  justify-content: center;
  align-items: center;
  font-size: 30px;
  cursor: pointer;
  transition: all 0.7s;
}
.zm-card-image:hover .overlay {
  display: flex;
}
.zm-card-image .overlay i {
  position: relative;
  transition: all 0.7s;
}
.zm-card-image .overlay i::after {
  position: absolute;
  content: "";
  border: 2px solid white;
  height: 150%;
  width: 150%;
  transform: translate(-85%, -20%);
  border-radius: 50px;
  transition: all linear 0.1s;
}
</style>
