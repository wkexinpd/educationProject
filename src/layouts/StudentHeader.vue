<template>
  <el-header style="height: 85px;">
    <div v-if="!isMobile" class="logo">
      <a href="/">
        <img src="@/assets/home/logo.png">
        <span class="logo-text">中北大学</span>
      </a>
    </div>
    <el-menu
      v-if="isMobile"
      mode="vertical"
      router
      :default-active="nav.defaultActive"
    >
      <el-collapse accordion>
        <el-collapse-item>
          <template slot="title">
            <i
              class="el-icon-s-unfold"
              style="font-size:20px;color:#ffffff;"
            ></i>
            <span style="font-size:18px;color:#ffffff;">导航</span>
          </template>
          <el-menu-item
            v-for="navItem in nav.itemList"
            :key="navItem.id"
            :index="navItem.id"
            :route="navItem.route"
            :disabled="navItem.disabled"
          >
            {{ navItem.name }}
          </el-menu-item>

          <el-dropdown v-if="username != ''" style="width: 100%;">
            <span class="el-dropdown-link">
              <el-menu-item index="998" route="#">
                <i
                  class="el-icon-user"
                  style="color:#ffffff;font-size:18px;"
                ></i>
                <span>{{ username }}</span>
              </el-menu-item>
            </span>

            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>
                <div @click="logout">
                  退出登录
                </div>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>

          <el-menu-item v-else route="/login" index="999" style="width: 100%;">
            Login
          </el-menu-item>
        </el-collapse-item>
      </el-collapse>
    </el-menu>
    <el-menu
      v-else
      mode="horizontal"
      router
      :default-active="nav.defaultActive"
    >
      <el-menu-item
        v-for="navItem in nav.itemList"
        :key="navItem.id"
        :index="navItem.id"
        :route="navItem.route"
        :disabled="navItem.disabled"
      >
        {{ navItem.name }}
      </el-menu-item>
    </el-menu>
    <el-menu style="height: 86px;">
      <el-dropdown v-if="username != ''" class="user_avatar">
        <span class="el-dropdown-link">
          <el-menu-item index="998" route="#">
            <i class="el-icon-user" style="font-size:20px;color:#fff;"></i>
            <span>{{ username }}</span>
          </el-menu-item>
        </span>

        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item @click.native="logout">
            <div>
              退出登录
            </div>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>

      <el-menu-item v-else class="user_avatar" route="/login" index="999">
        登录
      </el-menu-item>
    </el-menu>
  </el-header>
</template>

<script>
export default {
  name: 'StudentHeader',
  props: {},
  data() {
    return {
      username: this.$ls.get('username', ''),
      isMobile: false,
      nav: {
        defaultActive: '1',
        itemList: [
          {
            id: '1',
            name: '首页',
            route: '/',
            disabled: false
          },
          {
            id: '2',
            name: '免费课程',
            route: '/lecture',
            disabled: false
          },
          {
            id: '3',
            name: '关于企业',
            route: '/company',
            disabled: false
          },
          {
            id: '5',
            name: '教务决策',
            route: '/forum',
            disabled: false
          },
          {
            id: '6',
            name: '个人中心',
            route: '/person-center',
            disabled: false
          }
        ]
      }
    }
  },
  methods: {
    setIsMobile: function() {
      // 通过浏览器宽度(图片宽度)计算高度
      if (this.screenWidth < 650) {
        this.isMobile = true
      } else {
        this.isMobile = false
      }
    },
    logout: function() {
      const loading = this.$loading({
        lock: true,
        text: '退出登录中...',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
      this.$ls.remove('Authorization')
      this.$ls.remove('username')
      this.$ls.remove('role')
      this.$router.push('/login')
      loading.close()
    },
    setActiveNavItem(path) {
      for (let navItem of this.nav.itemList) {
        if (navItem.route === path) {
          this.nav.defaultActive = navItem.id
        }
      }
    }
  },
  watch: {
    $route(to) {
      this.setActiveNavItem(to.path)
    }
  },
  mounted() {
    this.setActiveNavItem(this.$route.path)
    // 首次加载时,需要调用一次
    this.screenWidth = window.innerWidth
    this.setIsMobile()
    // 窗口大小发生改变时,调用一次
    window.addEventListener(
      'resize',
      () => {
        this.screenWidth = window.innerWidth
        this.setIsMobile()
      },
      false
    )
  }
}
</script>

<style lang="less" scoped>
/deep/ .el-menu-item:hover {
  // background-color: transparent;
  color: #9b3537;
}
.el-header {
  padding: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  left: 0%;
  top: 0;
  right: 0%;
  color: #fff;
  // background: url(../assets/home/head-bg.png) center repeat-x;
  width: 100%;
  position: fixed;
  z-index: 66666666 !important;
  .logo {
    margin: 0 45px;
    width: 200px;
    height: 85px;
    z-index: 99;
    a {
      height: 100%;
      font-size: 0;
      display: block;
    }
    img {
      max-height: 90%;
      vertical-align: middle;
      display: inline-block;
    }
    .logo-text {
      width: 105px;
      color: #fff;
      font-size: 26px;
      vertical-align: middle;
      text-align: center;
      height: 85px;
      line-height: 85px;
      font-family: STKaiti;
      text-transform: uppercase;
      text-shadow: 0px 1px 0px #c0c0c0, 0px 1px 0px #b0b0b0, 0px 2px 0px #a0a0a0, 0px 2px 0px #909090, 0px 3px 5px rgba(0, 0, 0, 0.6);
    }
  }
}
.el-header::before {
  content: "";
  display: block;
  position: absolute;
  left: 0;
  top: -0.05rem;
  right: 0;
  height: 1.38rem;
  background: url(../assets/home/head-bg.png) center repeat-x;
  background-size: auto 99%;
}

.el-menu {
  background-color: transparent;
}
.el-menu--horizontal {
  border-bottom: none;
}
.el-menu-item {
  float: left;
  height: 85px;
  line-height: 85px;
  font-size: 18px;
  color: #fff;
  margin: 0;
  background-color: transparent;
}
.el-menu--horizontal>.el-menu-item.is-active {
  border-bottom: 2px solid #9b3537;
  color: #fff;
  background-color: transparent;
}
.el-menu--horizontal>.el-menu-item.is-active:hover {
  background-color: transparent;
  color: #9b3537;
}
.el-menu--horizontal>.el-menu-item:hover {
  background-color: transparent;
  color: #9b3537;
}
.el-menu--horizontal>.el-menu-item:active {
  background-color: transparent;
  color: #9b3537;
}
/deep/ .el-collapse-item__wrap {
  // background-color: rgb(155,45,48);
  position: fixed;
  width: 100%;
  z-index: 66666666 !important;
}

.user_avatar {
  width: 200px;
  height: 86px;
  .el-dropdown {
    display: block;
  }
}

/deep/ .el-collapse {
  border: 0px;
}

/deep/ .el-collapse-item__header {
  height: 85px;
  padding: 0px 0px 0px 20px;
  // background-color: rgb(155,45,48);
  border: 0 !important;
  border-image-width: 0 !important;
  outline-width: 0 !important;
}

/deep/ .el-collapse-item__arrow {
  display: none;
}
</style>
