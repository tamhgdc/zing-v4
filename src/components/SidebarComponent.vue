<template>
  <aside class="zm-sidebar">
    <div class="zm-sidebar-wrapper">
      <nav class="zm-navbar">
        <div class="zm-navbar-brand">
          <div class="zmp3-logo"></div>
        </div>
      </nav>
      <nav class="zm-navbar zm-navbar-main">
        <ul class="zm-navbar-menu">
          <router-link title="Cá nhân" to="/mymusic">
            <li class="zm-navbar-item md:hover:color-white">
              <ThemifyIcon icon="user" />
              <span>Cá nhân</span>
            </li>
          </router-link>
          <router-link to="/" title="Khám phá">
            <li class="zm-navbar-item md:hover:color-white">
              <ThemifyIcon icon="world" />
              <span>Khám phá</span>
            </li>
          </router-link>
          <router-link to="/zing-chart" title="#zingchart">
            <li class="zm-navbar-item md:hover:color-white">
              <ThemifyIcon icon="stats-up" />
              <span>#zingchart</span>
            </li>
          </router-link>
          <router-link to="/radio" title="Radio">
            <li class="zm-navbar-item md:hover:color-white">
              <ThemifyIcon icon="music-alt" />
              <span
                >Radio
                <span class="live_small_thumb">Live</span>
              </span>
            </li>
          </router-link>
          <router-link to="/follow" title="Theo dõi">
            <li class="zm-navbar-item md:hover:color-white">
              <ThemifyIcon icon="id-badge" />
              <span>Theo dõi</span>
            </li>
          </router-link>
        </ul>
      </nav>
      <div class="sidebar-divide"></div>
      <div class="zm-navbar-bottom">
        <div class="zm-sidebar-scrollbar">
          <nav class="zm-navbar zm-navbar-main">
            <ul class="zm-navbar-menu">
              <router-link to="/moi-phat-hanh" title="Nhạc mới">
                <li class="zm-navbar-item md:hover:color-white is-active">
                  <ThemifyIcon icon="music-alt" />
                  <span>Nhạc mới</span>
                </li>
              </router-link>
              <router-link to="/hub" title="Thể loại">
                <li class="zm-navbar-item md:hover:color-white">
                  <ThemifyIcon icon="layout-grid2" />
                  <span>Thể loại</span>
                </li>
              </router-link>
              <router-link to="/top100" title="Top100">
                <li class="zm-navbar-item md:hover:color-white">
                  <ThemifyIcon icon="star" />
                  <span>Top100</span>
                </li>
              </router-link>
              <router-link to="/mv" title="MV">
                <li class="zm-navbar-item md:hover:color-white">
                  <ThemifyIcon icon="video-clapper" />
                  <span>MV</span>
                </li>
              </router-link>
            </ul>
          </nav>
          <div class="vip-banner-sidebar">
            <div class="text">Nghe nhạc không quảng cáo cùng kho nhạc VIP</div>
            <a class="zm-btn md:hover:opacity-90">Nâng cấp Vip</a>
          </div>
        </div>
      </div>
      <div class="add-playlist-sidebar">
        <button class="zm-btn">
          <ThemifyIcon icon="plus" />
          <span>Tạo playlist mới</span>
        </button>
      </div>
    </div>
  </aside>
</template>

<style>
aside {
  top: 0;
  left: 0;
  bottom: 0;
  position: fixed;
  height: 100%;
  width: 240px;
  background: #231b2e;
  color: #dadada;
  padding-top: 70px;
  padding-bottom: 55px;
  z-index: 20;
}
.zm-sidebar .zm-sidebar-wrapper {
  display: flex;
  flex-direction: column;
  height: 100%;
}
.zm-sidebar .zm-navbar .zm-navbar-brand {
  width: 240px;
  height: 70px;
  position: fixed;
  top: 0;
  padding: 0 25px 0 28px;
  display: flex;
  align-items: center;
}
.zm-navbar-main {
  position: relative;
  margin-bottom: 15px;
}
.zmp3-logo {
  width: 120px;
  height: 40px;
  display: inline-block;
  background: url("https://zmp3-static.zadn.vn/skins/zmp3-v6.1/images/backgrounds/logo-dark.svg") 50% / contain no-repeat;
}
.zm-navbar-menu {
  list-style: none;
}
.zm-sidebar .zm-navbar-menu .zm-navbar-item {
  font-weight: 700;
  color: #dadada;
  border-left: 3px solid transparent;
  cursor: pointer;
}
.zm-sidebar .zm-navbar-menu a .zm-navbar-item {
  display: flex;
  align-items: center;
  font-size: 13px;
  font-weight: 700;
  padding: 7px 25px;
}
.zm-sidebar .zm-navbar-menu .zm-navbar-item i {
  width: 22px;
  height: 24px;
  font-size: 22px;
  margin-right: 10px;
  border-radius: 4px;
  flex-shrink: 0;
}
.zm-sidebar .zm-navbar-menu a.is-active .zm-navbar-item {
  background-color: hsl(0deg 0% 100% / 10%);
  color: #fff;
  border-left: 3px solid #7200a1;
}
.sidebar-divide {
  position: relative;
  height: 1px;
}
.sidebar-divide:after {
  content: "";
  border-top: 1px solid hsla(0, 0%, 100%, 0.1);
  position: absolute;
  left: 25px;
  right: 25px;
  top: 0;
}
.zm-navbar-bottom {
  position: relative;
  overflow: hidden;
  width: 100%;
  height: 100%;
}
.zm-navbar-bottom .zm-sidebar-scrollbar {
  position: absolute;
  inset: 0px;
  overflow: hidden scroll;
  margin-right: -6px;
  margin-bottom: 0px;
  margin-top: 10px;
}
.zm-navbar-bottom .zm-sidebar-scrollbar.is-mark {
  -webkit-mask-image: linear-gradient(180deg, hsla(0, 0%, 100%, 0), hsla(0, 0%, 100%, 0.8) 10%, #fff 25%, #fff);
}
.vip-banner-sidebar {
  padding: 15px 8px;
  border-radius: 8px;
  margin: 10px 20px;
  text-align: center;
  background-image: linear-gradient(117deg, #5a4be7, #c86dd7 102%);
}
.vip-banner-sidebar .text {
  font-size: 12px;
  margin-bottom: 10px;
  font-weight: 600;
  border-color: #ffdb00;
  line-height: 1.67;
  color: #fff;
}
.vip-banner-sidebar .zm-btn {
  background-color: #ffdb00;
  border-color: #ffdb00;
  color: #32323d;
  display: inline-block;
  padding: 6px 35px;
  font-size: 12px;
  font-weight: 600;
}
.add-playlist-sidebar .zm-btn {
  position: fixed;
  width: 240px;
  left: 0;
  height: 54px;
  border-top: 1px solid hsla(0, 0%, 100%, 0.1);
  padding: 0 28px;
  border-radius: 0;
  display: flex;
  align-items: center;
  color: #fff;
  font-weight: 700;
  bottom: 0;
}
.zm-layout.has-player .add-playlist-sidebar .zm-btn {
  bottom: 90px;
}
.add-playlist-sidebar .zm-btn i {
  margin-right: 8px;
}
.live_small_thumb {
  background: red;
  color: #fff;
  padding: 2px 6px;
  font-size: 11px;
  border-radius: 4px;
  margin-left: 3px;
}
@media screen and (max-width: 1133px) {
  .zm-sidebar .zm-navbar .zm-navbar-brand .zmp3-logo {
    width: 45px;
    height: 45px;
    background-image: url(https://zjs.zadn.vn/zmp3-desktop/releases/v1.5.12/static/media/icon_zing_mp3_60.f6b51045.svg);
  }
  .zm-sidebar .zm-navbar .zm-navbar-brand {
    display: flex;
    justify-content: center;
    width: 70px;
    padding: 0;
  }
  .zm-sidebar .zm-navbar-menu .zm-navbar-item {
    border-left: none !important;
  }
  .zm-sidebar .zm-navbar-menu .zm-navbar-item a {
    padding: 15px 0;
    justify-content: center;
  }
  .zm-sidebar .zm-navbar-menu .zm-navbar-item .tag,
  .zm-sidebar .zm-navbar-menu .zm-navbar-item span {
    display: none;
  }
  .zm-sidebar .zm-navbar-menu .zm-navbar-item i {
    margin-right: 0;
  }
  .add-playlist-sidebar,
  .vip-banner-sidebar {
    display: none;
  }
}
</style>
