<template>
  <div class="zm-carousel-container" v-if="!loading">
    <div class="zm-carousel-track">
      <VueSlickCarousel
        :arrows="true"
        :dots="false"
        :slidesToShow="slidesToShow"
        :infinite="true"
        :speed="1000"
        :slidesToScroll="1"
        :autoplay="true"
        :autoplaySpeed="3000"
      >
        <router-link v-for="(item, index) in data[0].items" :key="index" :to="item.link">
          <img class="rounded-md" :src="item.banner" />
        </router-link>
      </VueSlickCarousel>
    </div>
  </div>
</template>

<script>
import VueSlickCarousel from "vue-slick-carousel";
import "vue-slick-carousel/dist/vue-slick-carousel.css";
import "vue-slick-carousel/dist/vue-slick-carousel-theme.css";
export default {
  data() {
    return {
      slidesToShow: 3,
    };
  },
  components: { VueSlickCarousel },
  props: ["loading", "data"],
  mounted() {
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
      this.slidesToShow = 1;
    }
  },
};
</script>

<style>
.slick-prev,
.slick-next {
  display: none !important;
  transform: translate(0, -70%);
  z-index: 100;
  transition: all 0.2s linear;
}
.zm-carousel-container {
  margin-bottom: 46px;
  width: 100%;
  overflow: hidden;
  position: relative;
}
.zm-carousel-track {
  width: 103%;
  transform: translateX(-15px);
}
.zm-carousel-container:hover .slick-next,
.zm-carousel-container:hover .slick-prev {
  display: block !important;
}
.slick-prev::before,
.slick-next::before {
  font-size: 30px;
}
.slick-prev {
  left: 20px;
}
.slick-next {
  right: 30px;
}
.slick-slide {
  padding: 0 15px;
}
</style>
