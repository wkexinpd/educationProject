<template>
  <div class="home-news">
    <div class="col-1">
      <div class="title">
        <a href="">
          <em>中北新闻</em>
          <span>更多</span>
        </a>
      </div>
      <div class="list">
        <ul>
          <li>
            <a href="">
              <div class="img">
                <img src="@/assets/home/home_new1.jpg" alt="">
              </div>
              <div class="name">我校严格落实各项疫情防控措施确保新学期开学平安有序</div>
            </a>
          </li>
          <li>
            <a href="">
              <div class="name">我校严格落实各项疫情防控措施确保新学期开学平安有序</div>
            </a>
          </li>
          <li>
            <a href="">
              <div class="name">我校严格落实各项疫情防控措施确保新学期开学平安有序</div>
            </a>
          </li>
          <li>
            <a href="">
              <div class="name">我校严格落实各项疫情防控措施确保新学期开学平安有序</div>
            </a>
          </li>
        </ul>
      </div>
    </div>
    <div class="col-2">
      <div class="list">
        <div class="img">
          <a>
            <img src="@/assets/home/home_new2.jpg" alt="">
          </a>
        </div>
        <div class="title">
          <em>头条新闻</em>
          <span>Headlines</span>
        </div>
        <div class="name">
          <a>2021中北大学十大新闻</a>
        </div>
        <p>金牛昂首辞旧岁，虎跃龙腾开新篇。当2022年农历新年的第一缕曙光照耀神州大地，让我们共同回顾“2021年度中北大学十大新闻”，踏着奋斗的足迹开...</p>
      </div>
    </div>
    <div class="col-1">
      <div class="title">
        <a href="">
          <em>中北新闻</em>
          <span>更多</span>
        </a>
      </div>
      <div class="list">
        <ul>
          <li>
            <a href="">
              <div class="img">
                <img src="@/assets/home/home_new3.jpg" alt="">
              </div>
              <div class="name">我校举行2022年工作部署会暨党风廉政建设大会</div>
            </a>
          </li>
          <li>
            <a href="">
              <div class="name">我校举行2022年工作部署会暨党风廉政建设大会</div>
            </a>
          </li>
          <li>
            <a href="">
              <div class="name">我校举行2022年工作部署会暨党风廉政建设大会</div>
            </a>
          </li>
          <li>
            <a href="">
              <div class="name">我校举行2022年工作部署会暨党风廉政建设大会</div>
            </a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomeNews',
  components: {},
  data() {
    return {
    }
  },
  created() {
  },
  computed: {},
  methods: {
  },
  mounted() {
  }
}
</script>

<style lang="less" scoped>
.home-news {
  max-width: 13.2rem;
  margin: 0 auto;
  display: flex;
  flex-direction: wrap;
  justify-content: space-between;
  .col-1 {
    width: 2.8rem;
    .title {
      font-size: 0.16rem;
      text-transform: uppercase;
      color: #666;
      padding-top: 0.15rem;
      line-height: 0.45rem;
      a {
        color: #666;
        em {
          font-style: normal;
        }
        span {
          padding-left: 0.1rem;
        }
      }
    }
    .list {
      li {
        border-bottom: #E2E2E2 solid 1px;
      }
      a {
        display: block;
        color: #000;
        .img {
          width: 100%;
          overflow: hidden;
          position: relative;
          margin-bottom: -0.08rem;
          img {
            width: 100%;
            height: 125px;
          }
        }
        .name {
          font-size: 0.17rem;
          line-height: 0.24rem;
          font-weight: bold;
          padding: 0.25rem 0;
        }
      }
    }
  }
  .col-2 {
    width: 6.71rem;
    position: relative;
    min-height: 7.2rem;
    .list {
      position: relative;
      width: 100%;
      overflow: hidden;
      .img {
        width: 100%;
        overflow: hidden;
        position: relative;
        img {
          width: 100%;
        }
      }
      .title:before {
        content: "";
        display: block;
        position: absolute;
        position: relative;
        width: 0.15rem;
        height: 1px;
        background: #6510AD;
        opacity: .64;
        margin: 0 0.15rem;
      }
      .title:after {
        content: "";
        display: block;
        position: absolute;
        position: relative;
        width: 0.15rem;
        height: 1px;
        background: #6510AD;
        opacity: .64;
        margin: 0 0.15rem;
      }
      .title {
        color: #6510AD;
        font-size: .12rem;
        // padding-top: 0.22rem;
        text-transform: uppercase;
        line-height: 1em;
        display: flex;
        justify-content: center;
        align-items: center;
        em {
          font-style: normal;
        }
        span{
          padding-left: 0.1rem;
        }
      }
      .name{
        a {
          display: block;
          font-size: .24rem;
          line-height: .3rem;
          color: #555;
          padding: 0.25rem 0.55rem 0.1rem 0.55rem;
          text-align: center;
        }
      }
      p {
        text-align: left;
        text-indent: 2em;
        font-size: .13rem;
        line-height: .22rem;
        padding: 0 0.8rem;
        color: #888;
      }
    }
  }
}
</style>
