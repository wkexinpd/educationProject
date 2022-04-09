<template>
  <div class="student-forum w12">
    <div class="title">
      <h2>常见问题</h2>
      <el-input
        placeholder="搜索你感兴趣的问题"
        suffix-icon="el-icon-search"
        v-model="postKey"
        @change="getPostData">
      </el-input>
      <el-button
        type="primary"
        icon="el-icon-edit"
        size="mini"
        @click="editPost"
        class="add-post"
      >
        我要提问
      </el-button>
    </div>
    <el-row>
      <el-col
        :span="24"
        v-for="post in postData.records"
        :key="post.id"
        @click.native="handleForumItemClick(post.id)"
      >
        <ForumItem :data="post" />
      </el-col>
    </el-row>
    <el-row style="margin-top: 10px;">
      <el-pagination
        background
        :page-size="postRequestParam.limit"
        @current-change="handleCurrentChange"
        :current-page="postRequestParam.from"
        layout="prev, pager, next"
        :total="postData.total"
        hide-on-single-page
      ></el-pagination>
    </el-row>
  </div>
</template>

<script>
import ForumItem from '@/components/ForumItem.vue'

export default {
  name: 'StudentForum',
  components: {
    ForumItem
  },
  data() {
    return {
      postRequestParam: {
        from: 1,
        limit: 8
      },
      postData: {
        total: 0,
        records: []
      },
      postKey: ''
    }
  },
  created() {
    this.getPostData()
  },
  watch: {
    newPostCategoryValue() {
      this.postRequestParam.from = 1
      this.getPostData()
    }
  },
  methods: {
    handleForumItemClick(postId) {
      this.$router.push({
        name: 'Post',
        params: { postId: postId }
      })
    },
    handleCurrentChange(toPage) {
      this.postRequestParam.from = toPage
      this.getPostData()
    },
    editPost() {
      this.$router.push('/edit-post')
    },
    getPostData() {
      this.$axios
        .get('/posts/selectPosts', {
          params: {
            key: this.postKey,
            from: this.postRequestParam.from,
            limit: this.postRequestParam.limit
          }
        })
        .then(res => {
          if (res.code !== 200) {
            this.$message.error(res.msg)
          } else {
            this.postData = res.result
          }
        })
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
.student-forum {
  font-size: 14px;
  .title {
    margin-bottom: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .el-input {
      width: 70%;
      /deep/.el-input__inner {
        border: none;
        border-bottom: #eee solid 0.015rem;
        border-radius: 0;
      }
    }
    .add-post {
      height: 40px;
      background-color: #9b3537;
      border-color: #9b3537;
    }
  }
  h2 {
    font-size: 0.28rem;
    color: #000000;
    font-weight: normal;
    position: relative;
    padding-bottom: 8px;
    display: block;
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
}
</style>
