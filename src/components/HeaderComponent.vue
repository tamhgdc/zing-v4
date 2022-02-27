<template>
  <header class="zm-header">
    <div class="level">
      <div class="level-left">
        <button class="zm-btn mobile:hidden tablet:hidden"><ThemifyIcon icon="arrow-left" /></button>
        <button class="zm-btn mobile:hidden tablet:hidden"><ThemifyIcon icon="arrow-right" /></button>
        <form class="search">
          <div class="search__container">
            <button class="zm-btn" type="button">
              <ThemifyIcon icon="search" />
            </button>
            <div class="input__wrapper">
              <input type="text" placeholder="Nhập tên bài hát, nghệ sĩ hoặc MV…" />
            </div>
          </div>
          <button type="reset" class="zm-btn zm-reset-btn">
            <ThemifyIcon icon="close" />
          </button>
          <ul class="search-sugestion">
            <div class="sugestion__wrapper">
              <div class="search-title">Đề xuất cho bạn</div>
              <li class="sugest__item"><ThemifyIcon icon="stats-up" /> Chay ve khoc</li>
              <li class="sugest__item"><ThemifyIcon icon="stats-up" /> Thay moi co gai</li>
              <li class="sugest__item"><ThemifyIcon icon="stats-up" /> Khong tron ven</li>
              <li class="sugest__item"><ThemifyIcon icon="stats-up" /> #Zing-chart</li>
              <li class="sugest__item"><ThemifyIcon icon="stats-up" /> Zing choice</li>
            </div>
          </ul>
        </form>
      </div>
      <div class="level-right mobile:hidden tablet:hidden">
        <div class="level-item-skeleton"></div>
        <div class="level-item-skeleton"></div>
        <a class="link-to-profile"></a>
      </div>
    </div>
  </header>
</template>

<style>
.zm-header {
  color: white;
  background: #170f23;
  display: flex;
  align-items: center;
  position: fixed;
  left: 240px;
  top: 0;
  right: 4px;
  height: 70px;
  padding: 0 30px;
  z-index: 10;
  min-width: 660px;
  box-shadow: 0 3px 5px rgba(0, 0, 0, 0.1);
}
button {
  background: none;
  border: none;
  outline: none;
  color: white;
}
.level {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.level-left,
.level-right {
  display: flex;
}
.level-left {
  align-items: center;
  justify-content: flex-start;
  flex-grow: 1;
  margin-right: 10px;
}
.level-right .level-item-skeleton::before,
.link-to-profile::before {
  content: "";
  display: block;
  position: absolute;
  left: -120%;
  left: 0;
  top: -120px;
  height: 400px;
  width: 40px;
  transform: rotate(15deg);
  background: linear-gradient(to right, transparent 0%, #ffffff1f 50%, transparent 100%);
  animation: skeletonLoading 1s cubic-bezier(0.4, 0, 0.2, 1) infinite;
}
.level-right .level-item-skeleton,
.link-to-profile {
  position: relative;
  height: 40px;
  width: 40px;
  background: hsla(0, 0%, 100%, 0.1);
  border-radius: 50px;
  overflow: hidden;
}
.level-right .level-item-skeleton {
  margin-right: 10px;
}
.zm-btn {
  font-size: 14px;
  border-radius: 999px;
  line-height: normal;
  border: 0;
  height: inherit;
  font-weight: 400;
  text-transform: none;
  text-align: center;
  cursor: pointer;
  position: relative;
  display: flex;
  align-items: center;
}
.zm-btn > i {
  font-size: 18px;
  margin-right: 26px;
}
.zm-reset-btn {
  display: none;
  position: absolute;
  top: 14px;
  right: -6px;
}
.zm-reset-btn i {
  font-size: 12px;
}
.search:focus-within .zm-reset-btn {
  display: block;
}
.zm-header .level .level-left .search {
  position: relative;
  width: 100%;
  max-width: 540px;
}
.search__container {
  position: relative;
  border-radius: 20px;
  height: 40px;
  background-color: hsla(0, 0%, 100%, 0.1);
}
.search__container i {
  position: absolute;
  cursor: pointer;
  font-size: 20px;
  top: 10px;
  left: 10px;
  color: #dadada;
}
.search__container .input__wrapper {
  position: absolute;
  top: 0;
  left: 38px;
  right: 10px;
  bottom: 0;
}
.search__container .input__wrapper input {
  margin: 0;
  display: inline-block;
  width: 95%;
  font-size: 14px;
  color: #eee;
  background-clip: padding-box;
  border: 0;
  position: relative;
  top: 2px;
  height: 34px;
  padding: 1px 0;
  line-height: 34px;
  background: transparent;
  border: none;
  outline: none;
}
.search__container .input__wrapper input::placeholder {
  color: #eee;
}
.search__container:focus-within {
  border-radius: 20px 20px 0 0;
  background: #432275;
}
.search__container:focus-within ~ .search-sugestion {
  display: block;
}
.search-sugestion {
  display: none;
  position: absolute;
  overflow: hidden;
  width: 100%;
  height: auto;
  min-height: 0;
  background: #432275;
  z-index: 5;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
  box-shadow: 0 4px 6px 0 rgb(32 33 36 / 28%);
  padding: 13px 10px;
  color: white;
  list-style: none;
}
.search-sugestion .search-title {
  font-weight: 600;
  padding: 0 10px 8px;
}
.search-sugestion .sugest__item {
  border-radius: 4px;
  padding: 8px 10px;
  transition: all linear 0.01s;
  cursor: pointer;
}
.search-sugestion .sugest__item:hover {
  background: hsla(0, 0%, 100%, 0.1);
}
.search-sugestion .sugest__item i {
  margin-right: 10px;
}
@media screen and (max-width: 640px) {
  .zm-header {
    padding: 6px;
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
