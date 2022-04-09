<template>
  <div class="student-video">
    <el-page-header
      @back="goBack"
      content="课程视频详情页"
      style="margin-bottom:20px;"
    ></el-page-header>
    <el-row style="margin-bottom:20px;">
      <el-col :span="24">
        <h3>{{ curriculum.name }} - {{ curriculum.teacher }}</h3>
        <p style="font-size:12px;">{{ curriculum.description }}</p>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :md="18" :sm="16" :xs="24" style="margin-bottom:20px;">
        <CustomVideo class="custom-video" :videoUrl="videoUrl" />
      </el-col>
      <el-col :md="6" :sm="8" :xs="24">
        <VideoEpisode
          :videoEpisodeData="videoData"
          @switch="handleSwitchEpisode"
          :currentVideoEpisodeId="currentVideoEpisodeId"
        />
      </el-col>
    </el-row>
    <!-- <el-row>
      <el-col :span="24">
        <h3>评论</h3>
        <div>
          <el-divider></el-divider>
          <p>vue的双向绑定怎么理解？</p>
        </div>
        <div>
          <el-divider></el-divider>
          <p>prop</p>
        </div>
        <div>
          <el-divider></el-divider>
          <p>测试评论</p>
        </div>
      </el-col>
    </el-row> -->
  </div>
</template>

<script>
import CustomVideo from '@/components/CustomVideo.vue'
import VideoEpisode from '@/components/VideoEpisode.vue'
export default {
  name: 'StudentVideo',
  data() {
    return {
      videoUrl: '',
      currentVideoEpisodeId: 0,
      curriculumId: this.$route.params.curriculumId,
      curriculum: {},
      videoData: {
        total: 0,
        records: []
      }
    }
  },
  created() {
    this.getCurriculumData()
    this.getVideoData()
  },
  mounted() {},
  methods: {
    handleSwitchEpisode(currentVideoEpisodeId) {
      this.currentVideoEpisodeId = currentVideoEpisodeId
      let url = ''
      const videos = this.videoData.records
      for (let i = 0; i < videos.length; i++) {
        if (videos[i].id === currentVideoEpisodeId) {
          url = videos[i].url
          break
        }
      }
      this.videoUrl = url
    },
    getCurriculumData() {
      this.$axios
        .get('/curriculum/select-by-id', {
          params: {
            id: this.curriculumId
          }
        })
        .then(res => {
          this.curriculum = res.result
        })
    },
    getVideoData() {
      this.$axios
        .get('/video/select-all', {
          params: {
            from: 1,
            limit: 100,
            curriculumId: this.curriculumId
          }
        })
        .then(res => {
          this.videoData = res.result
          if (this.videoData.total > 0) {
            this.videoUrl = res.result.records[0].url
            this.currentVideoEpisodeId = res.result.records[0].id
          }
        })
    },
    goBack() {
      this.$router.push('/curriculum')
    }
  },
  components: {
    CustomVideo,
    VideoEpisode
  }
}
</script>

<style lang="less" scoped>
/deep/ .el-page-header__content {
  font-size: 16px;
}

/deep/ .el-page-header__left:hover {
  color: rgb(155,45,48);
}
</style>
