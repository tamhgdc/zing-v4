<template>
  <div class="zm-section-skeleton" v-if="loading">
    <div class="section-left">
      <div>
        <div class="thumb skeleton-item"></div>
        <div class="title skeleton-item"></div>
        <div class="subtitle skeleton-item"></div>
        <div class="subtitle skeleton-item"></div>
        <div class="button skeleton-item"></div>
        <div class="circle-center">
          <div class="circle skeleton-item"></div>
          <div class="circle skeleton-item"></div>
        </div>
      </div>
    </div>
    <div class="section-center">
      <div class="section-flex">
        <div class="small-thumb skeleton-item"></div>
        <div class="skeleton-content">
          <div class="small-title skeleton-item"></div>
          <div class="small-subtitle skeleton-item"></div>
        </div>
      </div>
      <div class="section-flex">
        <div class="small-thumb skeleton-item"></div>
        <div class="skeleton-content">
          <div class="small-title skeleton-item"></div>
          <div class="small-subtitle skeleton-item"></div>
        </div>
      </div>
      <div class="section-flex">
        <div class="small-thumb skeleton-item"></div>
        <div class="skeleton-content">
          <div class="small-title skeleton-item"></div>
          <div class="small-subtitle skeleton-item"></div>
        </div>
      </div>
      <div class="section-flex">
        <div class="small-thumb skeleton-item"></div>
        <div class="skeleton-content">
          <div class="small-title skeleton-item"></div>
          <div class="small-subtitle skeleton-item"></div>
        </div>
      </div>
      <div class="section-flex">
        <div class="small-thumb skeleton-item"></div>
        <div class="skeleton-content">
          <div class="small-title skeleton-item"></div>
          <div class="small-subtitle skeleton-item"></div>
        </div>
      </div>
      <div class="section-flex">
        <div class="small-thumb skeleton-item"></div>
        <div class="skeleton-content">
          <div class="small-title skeleton-item"></div>
          <div class="small-subtitle skeleton-item"></div>
        </div>
      </div>
      <div class="section-flex">
        <div class="small-thumb skeleton-item"></div>
        <div class="skeleton-content">
          <div class="small-title skeleton-item"></div>
          <div class="small-subtitle skeleton-item"></div>
        </div>
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
.zm-section-skeleton {
  display: grid;
  grid-template-columns: 1fr 2fr;
  grid-column-gap: 48px;
}
.section-left,
.section-center,
.section-right {
  width: 100%;
}
.thumb {
  width: 100%;
  height: 300px;
  border-radius: 12px;
}
.title {
  width: 80%;
  height: 30px;
  margin: 0 auto;
  margin-top: 18px;
  border-radius: 12px;
}
.subtitle {
  width: 60%;
  height: 12px;
  margin: 0 auto;
  margin-top: 10px;
  border-radius: 12px;
}
.button {
  width: 50%;
  height: 36px;
  margin: 0 auto;
  margin-top: 24px;
  border-radius: 12px;
}
.circle-center {
  text-align: center;
}
.circle {
  width: 36px;
  height: 36px;
  border-radius: 100%;
  display: inline-block;
  margin: 12px 8px;
}
.section-flex {
  display: flex;
  margin-bottom: 32px;
}
.skeleton-content {
  width: 100%;
}
.small-thumb.skeleton-item {
  flex: none;
  height: 40px;
  width: 40px;
  border-radius: 4px;
  margin-right: 14px;
}
.small-title.skeleton-item {
  height: 16px;
  width: 100%;
  border-radius: 50px;
}
.small-subtitle.skeleton-item {
  height: 16px;
  width: 80%;
  margin-top: 8px;
  border-radius: 20px;
}
/* Skeleton items */
.skeleton-item {
  background: hsla(0, 0%, 100%, 0.1);
  overflow: hidden;
  position: relative;
}
.skeleton-item::before {
  content: "";
  display: block;
  position: absolute;
  left: 0;
  top: -120px;
  height: 550px;
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
/* Skeleton items */
@media (min-width: 0px) and (max-width: 640px) {
  .zm-section-skeleton {
    grid-template-columns: auto;
  }
}
</style>
