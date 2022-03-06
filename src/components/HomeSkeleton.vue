<template>
  <div class="zm-section-skeleton" v-if="loading">
    <div class="zm-carousel-skeleton-container">
      <div class="zm-carousel-skeleton">
        <div class="zm-carousel-item skeleton-item"></div>
        <div class="zm-carousel-item skeleton-item mobile:hidden tablet:hidden"></div>
        <div class="zm-carousel-item skeleton-item mobile:hidden tablet:hidden"></div>
      </div>
    </div>
    <div class="skeleton-item skeleton-section-title"></div>
    <div class="skeleton-grid">
      <div class="skeleton-section-card">
        <div class="skeleton-item skeleton-section-card-thumb"></div>
        <div class="skeleton-item skeleton-card-title"></div>
        <div class="skeleton-item skeleton-card-subtitle"></div>
      </div>
      <div class="skeleton-section-card">
        <div class="skeleton-item skeleton-section-card-thumb"></div>
        <div class="skeleton-item skeleton-card-title"></div>
        <div class="skeleton-item skeleton-card-subtitle"></div>
      </div>
      <div class="skeleton-section-card mobile:hidden">
        <div class="skeleton-item skeleton-section-card-thumb"></div>
        <div class="skeleton-item skeleton-card-title"></div>
        <div class="skeleton-item skeleton-card-subtitle"></div>
      </div>
      <div class="skeleton-section-card mobile:hidden tablet:hidden">
        <div class="skeleton-item skeleton-section-card-thumb"></div>
        <div class="skeleton-item skeleton-card-title"></div>
        <div class="skeleton-item skeleton-card-subtitle"></div>
      </div>
      <div class="skeleton-section-card mobile:hidden tablet:hidden">
        <div class="skeleton-item skeleton-section-card-thumb"></div>
        <div class="skeleton-item skeleton-card-title"></div>
        <div class="skeleton-item skeleton-card-subtitle"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["loading"],
};
</script>

<style scoped>
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
  grid-template-columns: repeat(5, minmax(0, 1fr));
  grid-column-gap: 26px;
}
.zm-carousel-item {
  /* min-width: 315px; */
  width: 100%;
  height: 176px;
  border-radius: 12px;
}
.skeleton-section-card-thumb {
  height: 283%;
  width: 100%;
  min-width: unset;
  border-radius: 12px;
}
.skeleton-card-title {
  margin-top: 9px;
  height: 14px;
  width: 100%;
  border-radius: 50px;
}
.skeleton-card-subtitle {
  margin-top: 9px;
  height: 14px;
  width: 80%;
  border-radius: 6px;
}
.skeleton-section-title {
  height: 26px;
  width: 30%;
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
@keyframes skeletonLoading {
  from {
    left: -100%;
  }
  to {
    left: 150%;
  }
}
@media (min-width: 641px) and (max-width: 768px) {
  .skeleton-grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
    grid-column-gap: 12px;
  }
  .skeleton-section-card-thumb {
    height: 365%;
  }
  .zm-carousel-skeleton {
    grid-template-columns: auto;
  }
}
@media (min-width: 0px) and (max-width: 640px) {
  .zm-carousel-skeleton {
    grid-template-columns: auto;
  }
  .skeleton-grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    grid-column-gap: 8px;
  }
}
</style>
