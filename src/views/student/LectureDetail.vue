<template>
  <div class="lecture-detail" ref="view">
    <div class="w12">
      <div class="ld-top">
        <el-row>
          <el-col :span="11">
            <div class="top-img">
              <img :src="lectureDeatil.img" width="510" height="288"/>
            </div>
          </el-col>
          <el-col :span="13">
            <div class="top-introduce">
              <div class="lecture-title">
                <span>{{lectureDeatil.title}}</span>
              </div>
              <div class="course-enroll-info">
                <div class="info introduce">
                  <span>课程简介：</span>
                  <span>
                    {{lectureDeatil.content}}
                  </span>
                </div>
                <div class="info progress">
                  <span>课程安排：</span>
                  <span>共{{lectureDeatil.chapter.length}}小节</span>
                </div>
                <div class="info teacher">
                  <span>授课老师：</span>
                  <span>{{lectureDeatil.speaker}}</span>
                </div>
                <div class="info company">
                  <span>授课企业：</span>
                  <span>蓝鸥</span>
                </div>
              </div>
              <div class="course-button">
                <el-button @click="learnCourse">立即学习</el-button>
              </div>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
    <div class="ld-flow">
      <div class="w12">
        <div class="video">
          <el-row
            v-for="item in lectureDeatil.chapter"
            :key="item.lecture_chapter_id"
            @click.native="viewVideo(item.lecture_chapter_id)"
          >
            <el-col :span="2" style="padding-left: 10px;"><span>第{{item.seqid_id}}节</span></el-col>
            <el-col :span="20"><span>{{item.name}}</span></el-col>
            <el-col :span="2"><i class="icon el-icon-circle-check"></i></el-col>
          </el-row>
        </div>
      </div>
    </div>
    <el-dialog
      title="视频学习"
      :visible.sync="videoVisible"
      :before-close="handleClose"
      class="dialogVideo"
    >
      <CustomVideo class="custom-video" :videoUrl="videoUrl" />
    </el-dialog>
  </div>
</template>

<script>
import CustomVideo from '@/components/CustomVideo.vue'
export default {
  name: 'LectureDeatil',
  components: {
    CustomVideo
  },
  data() {
    return {
      videoUrl: '',
      videoVisible: false,
      lecture_id: this.$route.params.id,
      lectureDeatil: {}
    }
  },
  created() {
    // 获取详情信息
    this.getLectureDeatil()
  },
  methods: {
    getLectureDeatil() {
      this.$axios
        .get('/lecture/selectLectureDetail', {
          params: {
            lectureId: this.lecture_id
          }
        })
        .then(res => {
          if (res.code !== 200) {
            this.$message.error(res.msg)
          }
          this.lectureDeatil = res.result
        })
    },
    viewVideo(index) {
      this.videoUrl = this.lectureDeatil.chapter[index - 1].url
      this.videoVisible = true
    },
    handleClose(done) {
      this.videoUrl = ''
      done()
    },
    learnCourse() {
      this.videoUrl = this.lectureDeatil.chapter[0].url
      this.videoVisible = true
    }
  }
}
</script>

<style lang="less">
.el-dialog__header {
  font-size: 16px;
}
.el-dialog__body {
  padding: 0 20px 30px 20px;
}
</style>
<style lang="less" scoped>
.lecture-detail {
  background: #eee;
  padding-bottom: 20px;
  overflow-x: hidden;
  overflow-y: auto;
  .w12 {
    background: #fff;
  }
  .ld-top {
    padding-top: 100px;
    max-width: 13rem;
    margin: 0 auto;
    img {
      border-radius: 8px;
    }
    .top-introduce {
      display: flex;
      flex-direction: column;
      font-size: 12px;
      .lecture-title {
        font-size: 24px;
        color: #333333;
        font-weight: 600;
      }
      .course-enroll-info {
        margin-top: 16px;
        display: flex;
        flex-direction: column;
        padding: 4px 19px 16px 16px;
        margin-bottom: 24px;
        background-color: #f8f9fb;
        border-radius: 8px;
        color: #666666;
        .info {
          padding: 10px 10px 0 10px;
          display: flex;
          span {
            min-width: 60px;
          }
        }
      }
      .course-button {
        .el-button {
          height: 48px;
          line-height: 48px;
          font-size: 16px;
          background-color: #b92c30;
          border-color: #b92c30;
          min-width: 192px;
          font-weight: 600;
          border-radius: 24px;
          padding: 0 24px;
          color: #fff;
        }
      }
    }
  }
  .ld-flow {
    background: #eee;
    .w12 {
      max-width: 10rem;
      margin: 0 auto;
      background: #fff;
      box-shadow: 0 8px 16px 0 rgba(7 17 27 10%);
      padding: 24px 32px 32px;
      border-radius: 6px;
      margin-top: 20px;
      margin-bottom: 20px;
      font-size: 14px;
      .video {
        .el-row {
          height: 48px;
          line-height: 48px;
          color: #1c1f21;
          display: flex;
          align-items: center;
          font-size: 15px;
          border-radius: 3px;
        }
        .el-row:hover {
          background: #f8caca;
          color: #f3070e;
        }
      }
    }
  }
}
</style>
