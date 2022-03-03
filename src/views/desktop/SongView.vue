<template>
  <main>
    <AlbumsSkeleton :loading="loading" />
    <div class="zm-section" v-if="!loading">
      <div class="grid mobile:grid-cols-1 mobile:gap-0 tablet:grid-cols-1 tablet:gap-0 grid-cols-3 gap-7 mb-10">
        <div class="... mb-4">
          <div class="media playlist-header sticky text-center">
            <div class="media-content font-bold">
              <figure class="zm-card-image rounded-md mb-3">
                <img class="select-none" :src="albumData.thumbnailM" style="width: 100%" />
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
              <p class="text-gray-400 font-medium select-none">{{ likesFormat(albumData.like) }} người yêu thích</p>
              <button class="zm-btn-play-all text-white font-bold py-2 px-7 mt-3 rounded-full" @click="handlePlayAll()">
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
            <div class="grid grid-cols-4 mobile:grid-cols-3 tablet:grid-cols-3 gap-4 mb-3 px-3 text-gray-400 font-medium">
              <div class="col-span-2 mobile:col-span-2 tablet:col-span-2...">Bài hát</div>
              <div class="... mobile:hidden tablet:hidden">Album</div>
              <div class="... text-right">Thời gian</div>
            </div>
            <div v-for="(song, index) in albumData.song.items" :key="index" class="mobile:focus:bg-gray-600">
              <div
                class="border-t-2 grid mobile:grid-cols-3 tablet:grid-cols-3 grid-cols-4 gap-4 text-gray-400 p-3 font-medium md:hover:bg-white md:hover:bg-opacity-10 select-none"
                :ref="currentIndex === index ? 'playing' : 'noplay'"
                :class="{ 'now-playing': currentIndex === index, 'opacity-50': song.streamingStatus === 2 }"
              >
                <div class="mobile:col-span-2 tablet:col-span-2 col-span-2 ... flex items-center">
                  <span class="mr-2"><ThemifyIcon icon="music-alt" /></span>
                  <img
                    class="mr-2"
                    style="width: 40px"
                    :class="{ 'cursor-pointer': song.streamingStatus != 2 }"
                    :src="song.thumbnail"
                    @click="song.streamingStatus !== 2 ? handlePlayThisSong({ song, index }) : null"
                  />
                  <div class="zm-song-title">
                    <div>
                      <p class="text-white capitalize">
                        {{ song.title }}
                        <span class="vip-member font-bold" v-if="song.streamingStatus === 2">VIP</span>
                      </p>
                      <p class="capitalize">{{ song.artistsNames }}</p>
                    </div>
                  </div>
                </div>
                <div class="... flex items-center zm-song-title capitalize mobile:hidden tablet:hidden">
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
import { mapState } from "vuex";
import Helper from "@/utils/helper.js";
import AlbumsSkeleton from "@/components/AlbumsSkeletonComponent.vue";
import Zingmp3 from "@/services/api.service.js";

export default {
  data() {
    return {
      albumData: null,
      loading: true,
    };
  },
  created() {
    this.$watch(
      () => this.$route.params.id.split(".")[0],
      (id) => {
        // react to route changes...
        this.loading = true;
        Zingmp3.songDetail(id)
          .then((response) => {
            if (response.status) {
              this.loading = false;
              this.albumData = response.data;
              this.$store.commit("set_title", response.data.title);
            } else {
              this.$router.push("/");
            }
          })
          .catch(() => {
            this.$router.push("/");
          });
      }
    );
  },
  mounted() {
    Zingmp3.songDetail(this.$route.params.id.split(".")[0])
      .then((response) => {
        console.log(response);
        // if (response.status) {
        //   this.loading = false;
        //   this.albumData = response.data;
        //   this.$store.commit("set_title", response.data.title);
        // } else {
        //   this.$router.push("/");
        // }
      })
      .catch(() => {
        this.$router.push("/");
      });
  },
  methods: {
    fmtMSS: Helper.fmtMSS,
    fmtMSSToString: Helper.fmtMSSToString,
    likesFormat: Helper.likesFormat,
    toCapitalize: Helper.toCapitalize,
    handlePlayThisSong(object) {
      let { song, index } = object;
      this.$store.commit("destroy_audio", {});
      this.$store.commit("set_loading_to_play_status", true);
      this.$store.commit("set_current_album_data", this.albumData);
      this.$store.commit("set_current_song_source", { song, index });
    },
    handlePlayAll() {
      this.$toastr.i("Chức năng này chưa cập nhật...");
    },
  },
  computed: {
    ...mapState([
      "audio",
      "isPlaying",
      "toast",
      "currentIndex",
      "isControllerShow",
      "currentAlbumData",
      "currentSongEncodeId",
      "currentSongData",
      "currentSongSrc",
      "currentTime",
      "currentTimePercent",
      "isLoadingToPlay",
    ]),
  },
  metaInfo() {
    return {
      title: this.$store.state.title,
    };
  },
  components: { AlbumsSkeleton },
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
span.vip-member {
  background: #ffe000;
  border-radius: 4px;
  color: #333;
  padding: 0 6px;
  font-size: 9px;
  margin: 0;
  margin-left: 5px;
}
</style>
