<template>
  <div id="student-lecture">
    <StudentBanner
      :bannerTitle="'免费课程'"
      :bannerMsg="
        '免费课程免费课程免费课程免费课程免费课程免费课程免费课程免费课程免费课程'
      "
    ></StudentBanner>
    <div class="w12">
      <el-row class="nav">
        <el-col :span="12">
          <div class="nav1">全部课程</div>
        </el-col>
        <el-col :span="12">
          <div class="nav2">
            <el-input v-model="inputKey" placeholder="请输入内容"></el-input>
            <el-button
              icon="el-icon-search"
              class="nav2-btn"
              @click="getLectures('', 1, inputKey)"
            ></el-button>
          </div>
        </el-col>
      </el-row>
      <div class="category">
        <div class="title">分类：</div>
        <el-row class="content">
          <el-col :span="3">
            <el-button
              type="text"
              @click="getLectures('', 1)"
              :class="major_default === 0 && 'el-button-active'"
            >
              全部
            </el-button>
          </el-col>
          <el-col :span="3" v-for="item in major" :key="item.major_id">
            <el-button
              type="text"
              @click="getLectures(item.major_id)"
              :class="major_default === item.major_id && 'el-button-active'"
            >
              {{ item.name }}
            </el-button>
          </el-col>
        </el-row>
      </div>
      <el-divider></el-divider>
      <el-row :gutter="20">
        <el-col
          :span="6"
          v-for="lecture in lectureData.records"
          :key="lecture.lecture_id"
        >
          <el-card
            shadow="hover"
            :body-style="{ padding: '10px', marginTop: '10px' }"
            style="margin-bottom:20px;"
          >
            <img
              :src="lecture.img"
              style="width:100%;height:150px;background:#efefef;"
            />
            <div style="font-size: 12px; margin-top:-35px;">
              <p
                style="font-size: 16px; font-weight: bolder;"
                class="overflow-text"
              >
                {{ lecture.title }}
              </p>
              <p class="overflow-text">
                <i class="el-icon-document"></i>
                {{ lecture.content }}
              </p>
              <p class="overflow-text">
                <i class="el-icon-user"></i>
                {{ lecture.speaker }}
              </p>
              <div class="choose-lecture-btn">
                <el-button size="mini" @click="viewVideo(lecture.lecture_id)">
                  看视频
                </el-button>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
      <el-row>
        <el-pagination
          :page-size="lectureRequestParam.limit"
          @current-change="handleCurrentChange"
          :current-page="lectureRequestParam.from"
          layout="prev, pager, next"
          hide-on-single-page
          :total="lectureData.total"
        ></el-pagination>
      </el-row>
    </div>
  </div>
</template>

<script>
import StudentBanner from '@/layouts/StudentBanner.vue'
export default {
  name: 'StudentLecture',
  components: {
    StudentBanner
  },
  data() {
    return {
      videoUrl: '',
      videoVisible: false,
      lectureRequestParam: {
        from: 1,
        limit: 8
      },
      inputKey: '',
      major: [],
      major_id: '',
      major_default: 0,
      lectureData: {
        records: [],
        total: ''
      },
      lectureDeatil: {}
    }
  },
  created() {
    this.getMajor()
    this.getLectures()
  },
  computed: {},
  methods: {
    handleCurrentChange(toPage) {
      this.lectureRequestParam.from = toPage
      this.getLectures(this.major_id, toPage)
    },
    getMajor() {
      this.$axios.get('/major/selectMajor').then(res => {
        if (res.code !== 200) {
          this.$message.error(res.msg)
        }
        this.major = res.result.major
      })
    },
    getLectures(major_id, toPage, key) {
      this.lectureRequestParam.from = toPage
      this.major_default = major_id ? major_id : 0
      if (major_id) {
        this.major_id = major_id
      }
      this.$axios
        .get('/lecture/selectLecture', {
          params: {
            from: this.lectureRequestParam.from,
            limit: this.lectureRequestParam.limit,
            major: major_id,
            key
          }
        })
        .then(res => {
          if (res.code !== 200) {
            this.$message.error(res.msg)
          }
          this.lectureData = res.result
        })
    },
    viewVideo(index) {
      this.$router.push(`/lecture-detail/${index}`)
    }
  }
}
</script>

<style>
@media screen and (max-width: 1030px) {
  .dialogVideo .el-dialog {
    width: 100%;
  }
}
.btn-prev i:hover {
  color: #b92c30;
}
.btn-next i:hover {
  color: #b92c30;
}
.el-pager .number:hover {
  color: #b92c30;
}
.el-pager li.active {
  color: #b92c30;
  cursor: default;
}
/*.dialogVideo .el-dialog {*/
/*  width: 100%;*/
/*}*/
</style>
<style lang="less" scoped>
.w12 {
  max-width: 12rem;
  margin: 0 auto;
  .nav {
    margin: 0 0 20px 0;
    .nav1 {
      font-size: 18px;
      height: 40px;
      line-height: 40px;
    }
    .nav2 {
      display: flex;
      .nav2-btn {
        background: #b92c30;
        color: #fff;
      }
    }
  }
  .category {
    .title {
      font-size: 16px;
    }
    .content {
      margin-left: 45px;
      font-size: 14px;
      color: #545c63;
      .el-col {
        padding: 10px 0;
        .el-button {
          color: #545c63;
        }
        .el-button-active {
          color: #b92c30;
        }
      }
    }
  }
}
.overflow-text {
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.el-pagination {
  text-align: center;
}
</style>
