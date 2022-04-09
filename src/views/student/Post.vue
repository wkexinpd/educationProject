<template>
  <div class="post w12">
    <el-page-header
      @back="goBack"
      content="帖子详情页"
      style="margin-bottom:20px;"
    ></el-page-header>
    <el-card v-if="!postDetail.creator_id">
      您访问的帖子正在加载中...
    </el-card>
    <el-row v-else>
      <ForumItem :data="post" style="margin-bottom: 10px;">
        <div style="width:100%;height:35px;margin-top:-50px;">
          <el-button
            v-if="userId == postDetail.creator_id"
            style="margin-right:10px;color:#86aee8;float:right;"
            @click="editPost"
          >
            编辑
          </el-button>
        </div>
        <mavon-editor
          v-model="postDetail.content"
          :subfield="false"
          :boxShadow="false"
          defaultOpen="preview"
          :toolbarsFlag="false"
          class="post-content"
        />
      </ForumItem>
    </el-row>
    <el-card shadow="hover" style="margin-top: 20px;">
      <el-input
        type="textarea"
        :autosize="{ minRows: 3, maxRows: 8 }"
        placeholder="请输入评论内容"
        v-model="postComment"
        maxlength="254"
        show-word-limit
      ></el-input>
      <el-button
        style="float:right;color:#86aee8;margin: 10px 0px 15px 0px;"
        @click="submitPostComment"
      >
        提交评论
        <i class="el-icon-upload el-icon--right"></i>
      </el-button>
    </el-card>
    <el-card shadow="hover" style="margin-top: 20px;">
      <div>评论</div>
      <div v-if="postCommentData.total == 0">
        <el-divider></el-divider>
        暂无评论
      </div>
      <div v-for="postComment in postCommentData.records" :key="postComment.id">
        <el-divider></el-divider>
        <PostCommentItem
          :postCommentData="postComment"
          @getPostCommentData="getPostCommentData"
        />
      </div>
    </el-card>
  </div>
</template>

<script>
import ForumItem from '@/components/ForumItem.vue'
import PostCommentItem from '@/components/PostCommentItem.vue'
import { mavonEditor } from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
export default {
  name: 'Post',
  data() {
    return {
      userId: this.$ls.get('userId', 0),
      postId: this.$route.params.postId,
      postComment: '',
      postDetail: {},
      markdownOption: {},
      postCommentData: {
        total: 0,
        records: []
      }
    }
  },
  components: {
    ForumItem,
    mavonEditor,
    PostCommentItem
  },
  created() {
    this.getPost()
    this.getPostCommentData()
  },
  computed: {
    post() {
      return {
        reply_number: this.postDetail.reply_number,
        nice_number: this.postDetail.nice_number,
        avatar: this.postDetail.avatar,
        creator_name: this.postDetail.name,
        title: this.postDetail.title,
        created_at: this.postDetail.created_at
      }
    }
  },
  methods: {
    editPost() {
      this.$router.push('/edit-post/' + this.postId)
    },
    handlePostCommentCurrentChange() {
      this.getPostCommentData()
    },
    submitPostComment() {
      this.$axios
        .post('/comment/addPostComment', {
          postId: this.postId,
          commentContent: this.postComment,
          creatorId: this.$ls.get('userId', 0)
        })
        .then(res => {
          if (res.code !== 200) {
            this.$message.error(res.msg)
          } else {
            this.postComment = ''
            this.getPostCommentData()
            this.$message.success('发布评论成功')
          }
        })
    },
    getPost() {
      this.$axios
        .get('/posts/selectPostById', {
          params: {
            postId: this.postId
          }
        })
        .then(res => {
          if (res.code !== 200) {
            this.$message.error(res.msg)
          } else {
            this.postDetail = res.result.post
          }
        })
    },
    getPostCommentData() {
      this.$axios
        .get('/comment/getPostComments', {
          params: {
            postId: this.postId
          }
        })
        .then(res => {
          if (res.code !== 200) {
            this.$message.error(res.msg)
          } else {
            this.postCommentData = res.result
          }
        })
    },
    goBack() {
      this.$router.push('/forum')
    }
  }
}
</script>

<style lang="less" scoped>
.w12 {
  padding-top: 110px;
  max-width: 12rem;
  margin: 0 auto;
}

.post {
  -webkit-user-select: text;
  -moz-user-select: text;
  -o-user-select: text;
  user-select: text;
  font-size: 14px;
}

/deep/ .el-card__body {
  .header {
    font-size: 26px !important;
    margin-bottom: 15px;
  }
}

/deep/ .v-show-content {
  background: #ffffff !important;
}

.post-content {
  margin: 15px auto;
  border: 0px;
}
</style>
