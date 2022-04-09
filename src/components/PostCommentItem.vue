<template>
  <el-row class="comment-item">
    <el-col :span="24">
      <CommentItem
        :commentData="postCommentData"
        @submitReply="submitReply"
        @giveNice="giveNice"
        @deleteItem="deleteItem"
      />
    </el-col>
  </el-row>
</template>

<script>
import CommentItem from '@/components/CommentItem.vue'
export default {
  name: 'PostCommentItem',
  props: {
    postCommentData: {
      type: Object,
      default: function() {
        return {
          id: 0,
          avatar: '',
          name: '',
          content: '',
          nice_number: 0,
          created_at: '2022-02-08 17:06:31'
        }
      }
    }
  },
  // inject: ['subNumber'],
  data() {
    return {
      postComment: '',
      //评论的回复
      subPostCommentRequestParam: {
        from: 1,
        limit: 4
      },
      subPostCommentData: {
        total: 0,
        records: []
      }
    }
  },
  components: {
    CommentItem
  },
  methods: {
    //回复
    submitReply(replyObj, callback) {
      this.$axios.post('/comment/addSubPostComment', replyObj).then(res => {
        if (res.code !== 200) {
          this.$message.error(res.msg)
        } else {
          callback()
        }
      })
    },
    //给评论点赞
    giveNice(niceNumber) {
      this.$axios.post('评论点赞api', niceNumber).then(res => {
        if (res.code !== 200) {
          this.$message.error(res.msg)
        } else {
          this.postCommentData.niceNumber = res.data.niceNumber
        }
      })
    },
    //给评论的评论点赞
    // giveSubNiceNumber(subNiceNumber) {
    //   this.$axios.post('评论的评论点赞api', subNiceNumber).then(res => {
    //     if (res.code !== 200) {
    //       this.$message.error(res.msg)
    //     } else {
    //       let subNiceNumber = res.data.subNiceNumber
    //       this.subNumber.change(subNiceNumber)
    //     }
    //   })
    // }
    //删除评论
    deleteItem() {
      // this.deleteDialogVisible = false
      this.$axios
        .delete(`/forum/post-comments/${this.postCommentData.id}`)
        .then(res => {
          // console.log(res)
          if (res.code !== 200) {
            this.$message.error(res.msg)
          } else {
            this.$emit('getPostCommentData')
            this.$message.success('删除成功')
          }
        })
    }
  }
}
</script>

<style lang="less" scoped>
.sub-comment {
  padding: 10px 0px;
}

.el-divider {
  margin: 15px 0px !important;
}
</style>
