<template>
  <div class="company-detail">
    <div class="w12">
      <div class="title">
        <h2>公司简介</h2>
        <p v-for="(item, key) in companyDeatil.introduce" :key="key">
          {{ item }}
        </p>
        <div class="env">
          <el-carousel :interval="3000" type="card" height="300px">
            <el-carousel-item
              v-for="(item, key) in companyDeatil.env_img"
              :key="key"
            >
              <img :src="item" />
            </el-carousel-item>
          </el-carousel>
        </div>
      </div>
      <div class="culture">
        <h2>企业文化</h2>
        <div v-for="(item, key) in companyDeatil.culture" :key="key">
          {{ item }}
        </div>
      </div>
      <div class="process">
        <h2>发展历程</h2>
        <el-timeline :reverse="true">
          <el-timeline-item
            v-for="(item, index) in companyDeatil.develop_process"
            :key="index"
          >
            {{ item }}
          </el-timeline-item>
        </el-timeline>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'CompanyDetail',
  data() {
    return {
      companyDeatil: {},
    }
  },
  created() {
    this.getCompanyDetail()
  },
  methods: {
    getCompanyDetail() {
      this.$axios
        .get('/company/selectCompanyDetail', {
          params: {
            id: this.$route.params.id,
          },
        })
        .then((res) => {
          if (res.code !== 200) {
            this.$message.error(res.msg)
          }
          this.companyDeatil = res.result
        })
    },
  },
}
</script>
<style lang="less" scoped>
.company-detail {
  background: #eee;
  min-height: 800px;
  padding-top: 100px;
  font-size: 0.16rem;
  line-height: 0.3rem;
  color: #777676;
  text-align: justify;
  h2 {
    font-size: 0.28rem;
    color: #000000;
    font-weight: normal;
    position: relative;
    padding-bottom: 8px;
  }
  h2::after {
    content: '';
    position: absolute;
    left: 0;
    bottom: 0;
    background: #9b3537;
    width: 0.58rem;
    height: 3px;
  }
  .w12 {
    background: #fff;
    max-width: 11rem;
    margin: 0 auto;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    padding: 20px;
    .title {
      h3 {
        font-size: 0.24rem;
        font-weight: normal;
        text-align: center;
      }
      p {
        font-size: 0.16rem;
        line-height: 0.3rem;
        color: #777676;
        text-align: justify;
      }
      img {
        height: 300px;
        width: 100%;
      }
      .el-carousel__item:nth-child(2n) {
        background-color: #99a9bf;
      }
      .el-carousel__item:nth-child(2n + 1) {
        background-color: #d3dce6;
      }
      /deep/ .el-carousel__indicators {
        line-height: 10px;
      }
    }
    .el-timeline-item__content {
      color: #777676;
    }
  }
}
</style>
