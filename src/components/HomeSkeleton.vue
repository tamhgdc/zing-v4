<template>
  <div class="zm-section-skeleton" v-if="loading">
    <div class="zm-carousel-skeleton-container">
      <div class="zm-carousel-skeleton">
        <div class="zm-carousel-item skeleton-item"></div>
        <div class="zm-carousel-item skeleton-item"></div>
        <div class="zm-carousel-item skeleton-item"></div>
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
      <div class="skeleton-section-card">
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
@keyframes skeletonLoading {
  from {
    left: -100%;
  }
  to {
    left: 150%;
  }
}
</style>
