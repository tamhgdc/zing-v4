<template>
  <main>
    <Carousel :loading="!homeData" :data="homeData.page1" />
    <HomeSkeleton :loading="!homeData" />
    <div class="zm-section" v-if="homeData">
      <div class="zm-content mb-10" v-for="dataItem in homeData.page1" :key="dataItem.encodeId">
        <div class="mb-10" v-if="dataItem.sectionType === 'playlist'">
          <h1 class="font-bold text-2xl mb-5">{{ dataItem.title }}</h1>
          <div class="grid grid-cols-5 gap-5 mobile:grid-cols-2 mobile:gap-2 tablet:grid-cols-3 tablet:gap-3">
            <div class="w-full music-card" v-for="item in dataItem.items" :key="item.encodeId">
              <div :title="item.title">
                <figure class="zm-card-image rounded-md">
                  <router-link :to="item.link">
                    <img v-lazy="item.thumbnail" class="select-none" width="100%" :src="item.thumbnail" />
                  </router-link>
                  <router-link :to="item.link">
                    <span class="overlay">
                      <ThemifyIcon icon="control-play" />
                    </span>
                  </router-link>
                </figure>
              </div>
              <div class="music-card-content mt-2 select-none">
                <router-link :to="item.link">
                  <p class="font-bold zm-title transition-all">
                    {{ item.title }}
                  </p>
                </router-link>
                <p class="font-bold text-sm opacity-80 text-gray-400 zm-subtitle">
                  {{ item.sortDescription }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="zm-content mb-10" v-for="dataItem in homeData.page2" :key="dataItem.encodeId">
        <div class="mb-10" v-if="dataItem.sectionType === 'playlist'">
          <h1 class="font-bold text-2xl mb-5">{{ dataItem.title }}</h1>
          <div class="grid grid-cols-5 gap-5 mobile:grid-cols-2 mobile:gap-2 tablet:grid-cols-3 tablet:gap-3">
            <div class="w-full music-card" v-for="item in dataItem.items" :key="item.encodeId">
              <div :title="item.title">
                <figure class="zm-card-image rounded-md">
                  <router-link :to="item.link">
                    <img v-lazy="item.thumbnail" class="select-none" width="100%" :src="item.thumbnail" />
                  </router-link>
                  <router-link :to="item.link">
                    <span class="overlay">
                      <ThemifyIcon icon="control-play" />
                    </span>
                  </router-link>
                </figure>
              </div>
              <div class="music-card-content mt-2 select-none">
                <router-link :to="item.link">
                  <p class="font-bold zm-title transition-all">
                    {{ item.title }}
                  </p>
                </router-link>
                <p class="font-bold text-sm opacity-80 text-gray-400 zm-subtitle">
                  {{ item.sortDescription }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="zm-content mb-10" v-for="dataItem in homeData.page3" :key="dataItem.encodeId">
        <div class="mb-10" v-if="dataItem.sectionType === 'playlist'">
          <h1 class="font-bold text-2xl mb-5">{{ dataItem.title }}</h1>
          <div class="grid grid-cols-5 gap-5 mobile:grid-cols-2 mobile:gap-2 tablet:grid-cols-3 tablet:gap-3">
            <div class="w-full music-card" v-for="item in dataItem.items" :key="item.encodeId">
              <div :title="item.title">
                <figure class="zm-card-image rounded-md">
                  <router-link :to="item.link">
                    <img v-lazy="item.thumbnail" class="select-none" width="100%" :src="item.thumbnail" />
                  </router-link>
                  <router-link :to="item.link">
                    <span class="overlay">
                      <ThemifyIcon icon="control-play" />
                    </span>
                  </router-link>
                </figure>
              </div>
              <div class="music-card-content mt-2 select-none">
                <router-link :to="item.link">
                  <p class="font-bold zm-title transition-all">
                    {{ item.title }}
                  </p>
                </router-link>
                <p class="font-bold text-sm opacity-80 text-gray-400 zm-subtitle">
                  {{ item.sortDescription }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import Carousel from "@/components/CarouselComponent.vue";
import HomeSkeleton from "@/components/HomeSkeleton.vue";
import { mapState } from "vuex";

export default {
  data() {
    return {};
  },
  mounted() {
    this.$store.commit("set_title", "Zing MP3 | Nghe tải nhạc chất lượng cao");
  },
  computed: { ...mapState(["homeData"]) },
  components: { Carousel, HomeSkeleton },
  metaInfo() {
    return {
      title: this.$store.state.title,
    };
  },
};
</script>

<style>
.zm-title {
  width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 70%;
}
.zm-title:hover {
  color: #c662ef;
}
.zm-subtitle {
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  width: 100%;
  text-overflow: ellipsis;
  max-width: 90%;
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

.zm-carousel-skeleton-container {
  margin-bottom: 50px;
}
.zm-carousel-skeleton {
  display: grid;
  grid-template-columns: auto auto auto;
  grid-column-gap: 30px;
}
.skeleton-grid {
  display: grid;
  grid-template-columns: auto auto auto auto auto;
  grid-column-gap: 26px;
}
.zm-carousel-item {
  min-width: 315px;
  width: 100%;
  height: 176px;
  border-radius: 12px;
}
.skeleton-section-card-thumb {
  height: 180px;
  min-width: 180px;
  width: 100%;
  border-radius: 12px;
}
.skeleton-card-title {
  margin-top: 9px;
  height: 14px;
  width: 175px;
  border-radius: 50px;
}
.skeleton-card-subtitle {
  margin-top: 9px;
  height: 14px;
  width: 150px;
  border-radius: 6px;
}
.skeleton-section-title {
  height: 26px;
  width: 250px;
  margin-bottom: 16px;
  border-radius: 50px;
}
.skeleton-item {
  background: hsla(0, 0%, 100%, 0.1);
  overflow: hidden;
  position: relative;
}
.skeleton-item::before {
  content: "";
  display: block;
  position: absolute;
  left: -120%;
  left: 0;
  top: -120px;
  height: 400px;
  width: 300px;
  transform: rotate(15deg);
  background: linear-gradient(to right, transparent 0%, #ffffff1f 50%, transparent 100%);
  animation: skeletonLoading 1s cubic-bezier(0.4, 0, 0.2, 1) infinite;
}
@media (min-width: 768px) {
  .zm-card-image:hover > img {
    transform: scale(1.1) translateZ(0);
    filter: brightness(0.5) saturate(0.5) blur(1px);
  }
  .zm-card-image:hover img.zm-sound-wave-thumb {
    transform: unset;
    filter: unset;
  }
}
@keyframes skeletonLoading {
  from {
    left: -100%;
  }
  to {
    left: 150%;
  }
}
</style>
