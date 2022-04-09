<template>
  <div class="banner"> 
    <div class="infoName">
      <img src="../assets/lecture/banner1.jpeg" alt="">
    </div>
    <div class="w12">
      <div class="NyTopinfCon">
        <p>{{ bannerTitle }}</p>
        <span>{{ bannerMsg }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'StudentBanner',
  props: {
    // imgUrl: String,
    bannerTitle: String,
    bannerMsg: String
  },
  data() {
    return {
    }
  },
  methods: {
  }
}
</script>

<style lang="less" scoped>
.banner {
  position: relative;
  z-index: 6;
  .infoName {
    position: relative;
    img {
      position: relative;
      left: 50%;
      height: auto !important;
      min-height: auto !important;
      min-width: 100%;
      transform: translate(-50%, 0);
      top: 0;
    }
  }
  .w12 {
    max-width: 12rem;
    margin: 0 auto;
    position: relative;
    .NyTopinfCon {
      position: absolute;
      bottom: 0.4rem;
      left: 0;
      width: 6.37rem;
      p {
        font-size: 0.48rem;
        color: white;
        z-index: 9;
        font-weight: normal;
        margin-bottom: 0.15rem;
      }
      span {
        display: block;
        font-size: 0.18rem;
        color: white;
        line-height: 0.3rem;
      }
    }
  }
}
</style>
