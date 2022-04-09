<template>
  <div
    class="edit-post w12"
    v-loading="loading"
    element-loading-text="拼命加载中"
    element-loading-spinner="el-icon-loading"
  >
    <el-page-header
      @back="goBack"
      content="编辑帖子"
      style="margin-bottom: 20px"
    ></el-page-header>
    <el-card shadow="always" style="margin-bottom: 20px">
      <el-row>
        <el-col :span="12">
          <el-input
            type="text"
            placeholder="请输入标题"
            v-model="title"
            maxlength="35"
            show-word-limit
          ></el-input>
        </el-col>
        <el-col :span="12">
          <el-button
            icon="el-icon-finished"
            style="margin-right: 10px; color: #86aee8; float: right"
            @click="publish"
          >
            {{ postId ? '更新' : '发布' }}
          </el-button>
        </el-col>
      </el-row>
    </el-card>
    <mavon-editor
      v-model="content"
      :toolbars="markdownOption"
      style="min-height: 420px"
    ></mavon-editor>
  </div>
</template>

<script>
import { mavonEditor } from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
export default {
  name: 'EditPost',
  data() {
    return {
      loading: false,
      postId: this.$route.params.id,
      categoryOptions: [],
      title: '',
      content: '',
      markdownOption: {
        bold: true, // 粗体
        italic: true, // 斜体
        header: true, // 标题
        underline: true, // 下划线
        strikethrough: true, // 中划线
        mark: true, // 标记
        superscript: true, // 上角标
        subscript: true, // 下角标
        quote: true, // 引用
        ol: true, // 有序列表
        ul: true, // 无序列表
        link: true, // 链接
        // imagelink: true, // 图片链接
        code: true, // code
        table: true, // 表格
        fullscreen: true, // 全屏编辑
        readmodel: true, // 沉浸式阅读
        // htmlcode: true, // 展示html源码
        help: true, // 帮助
        /* 1.3.5 */
        undo: true, // 上一步
        redo: true, // 下一步
        trash: true, // 清空
        /* 1.4.2 */
        navigation: true, // 导航目录
        /* 2.1.8 */
        alignleft: true, // 左对齐
        aligncenter: true, // 居中
        alignright: true, // 右对齐
        /* 2.2.1 */
        subfield: true, // 单双栏模式
        preview: true, // 预览
      },
    }
  },
  created() {
    this.getPost()
  },
  methods: {
    getPost() {
      if (!this.postId) {
        return
      }
      this.loading = true
      this.$axios
        .get('/posts/selectPostById', {
          params: {
            postId: this.postId,
          },
        })
        .then((res) => {
          if (res.code !== 200) {
            this.$message.error(res.msg)
          } else {
            this.title = res.result.post.title
            this.content = res.result.post.content
          }
          this.loading = false
        })
    },
    publish() {
      if (!this.title) {
        this.$message({
          showClose: true,
          message: '请输入标题',
          type: 'error',
        })
        return
      }
      if (!this.content) {
        this.$message({
          showClose: true,
          message: '正文不能为空哦',
          type: 'error',
        })
        return
      }
      let content = this.postId ? '更新' : '发布'
      this.$confirm(`是否要${content}?`, `${content}`, {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        this.submitPost()
      })
    },
    submitPost() {
      if (!this.postId) {
        this.publishPost()
      } else {
        this.updatePost()
      }
    },
    publishPost() {
      const loading = this.$loading({
        lock: true,
        text: '您的帖子发布中...',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)',
      })
      this.$axios
        .post('/posts/addPost', {
          title: this.title,
          content: this.content,
          creatorId: this.$ls.get('userId', 0),
        })
        .then((res) => {
          if (res.code !== 200) {
            this.$message.error(res.msg)
          } else {
            this.$message.success('发布帖子成功')
            this.$router.push('/forum')
          }
          loading.close()
        })
    },
    updatePost() {
      const loading = this.$loading({
        lock: true,
        text: '您的帖子更新中...',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)',
      })
      this.$axios
        .post('/posts/updatePost', {
          id: this.postId,
          userId: this.$ls.get('userId', 0),
          title: this.title,
          content: this.content,
        })
        .then((res) => {
          if (res.code !== 200) {
            this.$message.error(res.msg)
          } else {
            this.$message.success('更新帖子成功')
            this.$router.push('/forum')
          }
          loading.close()
        })
    },
    goBack() {
      this.$router.push('/forum')
    },
  },
  components: {
    mavonEditor,
  },
}
</script>

<style lang="less" scoped>
/deep/ .el-page-header__content {
  font-size: 16px;
}
.w12 {
  padding-top: 110px;
  max-width: 12rem;
  margin: 0 auto;
  font-size: 14px;
}
</style>
