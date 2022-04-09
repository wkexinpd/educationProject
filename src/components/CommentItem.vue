<template>
  <el-row class="comment-item">
    <el-col :span="24">
      <img :src="commentData.avatar" alt="" class="avatar" />
      <div class="name">{{ commentData.name }}</div>
      <div class="created-at">{{ commentData.created_at }}</div>
    </el-col>
    <el-col :span="24">
      <div class="content">
        <div>
          {{ commentData.content }}
        </div>
        <div class="footer">
          <el-button
            class="img-button"
            icon="el-icon-nice-fwj"
            size="mini"
            circle
            @click="giveNiceNum"
          ></el-button>
          <span style="font-size:12px;margin-right:5px;">
            {{ commentData.nice_number }}
          </span>
          <el-button
            class="img-button"
            icon="el-icon-reply-fwj"
            size="mini"
            circle
            style="font-size:14px;"
            @click="reply(commentData.creator_id, commentData.name)"
          ></el-button>
          <el-button
            v-if="commentData.creator_id === userId"
            class="img-button"
            icon="el-icon-delete-solid"
            size="mini"
            circle
            style="font-size:14px;"
            @click="deleteDialogVisible = true"
          ></el-button>
        </div>
      </div>
    </el-col>
    <el-col :span="24">
      <div style="padding-left:66px;">
        <div
          class="sub-comment"
          v-for="subPostComment in subPostCommentData.records"
          :key="subPostComment.id"
        >
          <el-divider></el-divider>
          <CommentSubItem
            :subCommentData="subPostComment"
            @reply="replyComment"
            @deleteSub="deleteSubItem"
          />
        </div>
      </div>
    </el-col>
    <el-col :span="24" v-if="replyInputFlag" style="margin-top:5px;">
      <div style="padding-left:66px;">
        <el-input
          type="text"
          :placeholder="replayPlaceholder"
          v-model="subPostComment"
          maxlength="100"
          show-word-limit
          ref="replyInput"
        ></el-input>
        <el-button
          type="primary"
          style="float:right;margin: 10px 0px 15px 0px;"
          size="mini"
          @click="submitReply"
        >
          回复
        </el-button>
      </div>
    </el-col>
    <el-dialog title="提示" :visible.sync="deleteDialogVisible" width="30%">
      <span>删除评论后，评论下所有回复将会删除</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="deleteDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="deleteItem">
          确 定
        </el-button>
      </span>
    </el-dialog>
  </el-row>
</template>

<script>
import CommentSubItem from '@/components/CommentSubItem.vue'
export default {
  name: 'CommentItem',
  components: {
    CommentSubItem
  },
  props: {
    commentData: {
      type: Object,
      default: function() {
        return {
          id: 0,
          avatar: '',
          name: '',
          creator_id: 0,
          content: '',
          nice_number: 0,
          created_at: '2020-04-08 17:06:31'
        }
      }
    }
  },
  data() {
    return {
      userId: this.$ls.get('userId', 0),
      replyInputFlag: false,
      replayPlaceholder: '',
      replyUserId: 0,
      subPostComment: '',
      subPostCommentData: {
        records: []
      },
      deleteDialogVisible: false
    }
  },
  created() {
    this.getSubPostCommentData()
  },
  methods: {
    handleSubCommentCurrentChange() {
      this.getSubPostCommentData()
    },
    getSubPostCommentData() {
      this.$axios
        .get('/comment/getSubPostComments', {
          params: {
            commentId: this.commentData.id
          }
        })
        .then(res => {
          if (res.code !== 200) {
            this.$message.error(res.msg)
          } else {
            if (res.result !== null) {
              this.subPostCommentData = res.result
            }
          }
        })
    },
    replyComment(data) {
      this.reply(data.id, data.name)
    },
    reply(id, name) {
      this.replyInputFlag = true
      this.replayPlaceholder = '回复 ' + name
      this.replyUserId = id
      this.$nextTick(function() {
        this.$refs.replyInput.focus()
      })
    },
    submitReply() {
      this.$emit(
        'submitReply',
        {
          postCommentId: this.commentData.id,
          subCommentContent: this.subPostComment,
          replyUserId: this.replyUserId,
          creatorId: this.$ls.get('userId', 0)
        },
        () => {
          this.subPostComment = ''
          this.getSubPostCommentData()
          this.$message.success('发布回复成功')
        }
      )
    },
    giveNiceNum() {
      // this.$emit("giveNice",url,)
    },
    // giveSubNiceNum(subNiceNumUrl, subNiceNumber) {
    //   this.$emit('giveNice', subNiceNumUrl, subNiceNumber)
    // },
    // 删除评论
    deleteItem() {
      this.deleteDialogVisible = false
      this.$emit('deleteItem')
    },
    //删除评论的回复
    deleteSubItem(id) {
      this.$axios.delete(`/forum/sub-post-comments/${id}`).then(res => {
        if (res.code !== 200) {
          this.$message.error(res.msg)
        } else {
          this.getSubPostCommentData()
          this.$message.success('删除成功')
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.comment-item {
  font-size: 14px;
  .avatar {
    width: 46px;
    height: 46px;
    border-radius: 23px;
    background: #cccccc;
    vertical-align: top;
    margin-right: 20px;
  }

  .name {
    display: inline-block;
  }

  .created-at {
    float: right;
  }
  .content {
    padding-left: 66px;
    margin-top: -20px;
  }
  .footer {
    margin-top: 5px;
  }
  .img-button {
    width: 30px;
    height: 30px;
    font-size: 16px;
    padding: 0;
    border: 0;
    color: #aaaaaa;
  }
}

.el-divider {
  margin: 12px 0px !important;
}
</style>
