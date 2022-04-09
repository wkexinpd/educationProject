<template>
  <div id="student-home">
    <el-carousel
      class="carousel-home"
      indicator-position="none"
    >
      <el-carousel-item v-for="carouselItem in carousel" :key="carouselItem.id">
        <a href="">
          <img class="carousel-home-img" :src="carouselItem.url" />
        </a>
      </el-carousel-item>
    </el-carousel>
    <div class="index-search">
      <div class="wal">
        <div class="form">
          <div class="input">
            <input
              type="text"
              class="inputbtn1"
              name="showkeycode"
              id="showkeycode1016"
              placeholder="快速探索"
            />
          </div>
          <div class="submit">
            <input type="submit" class="inputbtn" value="">
          </div>
        </div>
      </div>
    </div>
    <HomeNews />
    <HomeTeachers />
    <HomeCourse />
    <!-- <el-tabs v-model="activeTabName">
      <el-tab-pane name="first">
        <span class="tab-name" slot="label">
          <i class="el-icon-document"></i>
          讲座
        </span>
        <el-row :gutter="20" style="margin-top:20px;">
          <el-col
            :xs="24"
            :sm="8"
            :md="6"
            v-for="lecture in topLectures"
            :key="lecture.id"
          >
            <el-card
              shadow="hover"
              :body-style="{ padding: '10px', marginTop: '10px' }"
              style="margin-bottom:20px;"
            >
              <img
                :src="lecture.img"
                style="width:100%;height:160px;background:#efefef;"
              />
              <div style="font-size: 12px;">
                <p style="font-size: 14px;" class="overflow-text">
                  <i class="el-icon-tickets"></i>
                  {{ lecture.title }}
                </p>
                <p class="overflow-text">
                  <i class="el-icon-user"></i>
                  {{ lecture.speaker }} - {{ lecture.companyName }}
                </p>
                <p class="overflow-text">
                  <i class="el-icon-date"></i>
                  {{ lecture.startedAt && lecture.startedAt.slice(5) }} -
                  {{ lecture.endedAt && lecture.endedAt.slice(5) }}
                </p>
                <p class="overflow-text">
                  <i class="el-icon-location-information"></i>
                  {{ lecture.place ? lecture.place : '待定' }}
                </p>
              </div>
            </el-card>
          </el-col>
        </el-row>
      </el-tab-pane>
      <el-tab-pane label="视频" name="second">
        <span class="tab-name" slot="label">
          <i class="el-icon-video-camera"></i>
          视频
        </span>
        暂无热门视频
      </el-tab-pane>
    </el-tabs> -->
  </div>
</template>

<script>
import carousel from '@/utils/carousel.js'
import HomeNews from './HomeNews.vue'
import HomeTeachers from './HomeTeachers.vue'
import HomeCourse from './HomeCourse.vue'

export default {
  name: 'StudentHome',
  components: {
    HomeNews,
    HomeTeachers,
    HomeCourse
  },
  data() {
    return {
      carousel,
      carouselHeight: '460px',
      activeTabName: 'first',
      topLectures: []
    }
  },
  created() {
    this.getTopLectures()
  },
  computed: {},
  methods: {
    setSize: function() {
      // 通过浏览器宽度(图片宽度)计算高度
      if (this.screenWidth > 900) {
        this.carouselHeight = (600 / 1920) * this.screenWidth + 'px'
      } else {
        this.carouselHeight = (800 / 1920) * this.screenWidth + 'px'
      }
    },
    getTopLectures() {
      this.$axios
        .get('/lecture/select', { params: { from: 1, limit: 4 } })
        .then(res => {
          if (res.code !== 200) {
            this.$message.error(res.msg)
          }
          this.topLectures = res.result.records
        })
    }
  },
  mounted() {
    // 首次加载时,需要调用一次
    this.screenWidth = window.innerWidth
    this.setSize()
    // 窗口大小发生改变时,调用一次
    window.addEventListener(
      'resize',
      () => {
        this.screenWidth = window.innerWidth
        this.setSize()
      },
      false
    )
  }
}
</script>

<style lang="less" scoped>
.carousel-home-img {
  position: absolute;
  left: 50%;
  top: 50%;
  min-height: 100%;
  min-width: 100%;
  // max-width: 1000%;
  transform: translate(-50%, -50%);
}

.carousel-home {
  width: 100%;
  height: 100vh;
  overflow: hidden;
  position: relative;
}
/deep/ .el-carousel__container {
  position: relative;
  width: 100%;
  height: 100%;
  z-index: 1;
}
.el-carousel__item {
  a {
    position: relative;
    display: block;
    height: 100vh;
    overflow: hidden;
  }
  a:before {
    content: "";
    display: block;
    position: absolute;
    z-index: 5;
    left: 0;
    bottom: 0;
    right: 0;
    top: 0;
    background: url(../../assets/home/bg20.png) center bottom repeat-x;
    background-size: auto 5.19rem;
  }
}

.tab-name {
  font-size: 15px;
  padding: 10px;
}

.overflow-text {
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.index-search {
  height: 1.1rem;
  position: relative;
  max-width: 11.5rem;
  margin: 0 auto;
  .wal {
    position: relative;
    z-index: 10;
    background: url(../../assets/home/index-search.png) center top no-repeat;
    background-size: 100%;
    min-height: 1.67rem;
    padding: 0 0.76rem 0 0.6rem;
    top: -0.81rem;
    .form {
      border-bottom: #9b3537 solid 0.02rem;
      height: 0.81rem;
      position: relative;
      .input {
        position: absolute;
        z-index: 1;
        left: 0;
        right: 0;
        top: -0.4rem;
        bottom: auto;
        input {
          width: 92%;
          height: 0.5rem;
          line-height: 0.5rem;
          font-size: 0.2rem;
          color: #333;
        }
      }
      .submit {
        position: absolute;
        z-index: 2;
        top: 0.1rem;
        right: 0;
        bottom: 0;
        width: 0.64rem;
        background: url(../../assets/home/search24.png) center no-repeat;
        background-size: 0.24rem;
        input {
          width: 100%;
          height: 0.81rem;
          cursor: pointer;
        }
      }
    }
  }
}
</style>
