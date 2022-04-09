<template>
  <el-row class="comment-item">
    <el-col :span="24">
      <img :src="subCommentData.avatar" alt="" class="avatar" />
      <div class="name">
        {{ subCommentData.name }}
        <span style="display:inline-block;padding: 0px 10px;color:#aaaaaa;">
          回复
        </span>
        {{ subCommentData.reply_user_name }}
      </div>
    </el-col>
    <el-col :span="24">
      <div class="content">
        <div>
          {{ subCommentData.content }}
        </div>
        <div class="footer">
          <el-button
            icon="el-icon-nice-fwj"
            size="mini"
            circle
            @click="givSunItemNum"
          ></el-button>
          <span style="font-size:12px;margin-right:5px;">
            {{ subCommentData.nice_number }}
          </span>
          <el-button
            icon="el-icon-reply-fwj"
            size="mini"
            circle
            style="font-size:12px;"
            @click="reply"
          ></el-button>
          <el-button
            v-if="subCommentData.creator_id === userId"
            icon="el-icon-delete-solid"
            size="mini"
            circle
            style="font-size:12px;"
            @click="deleteSubItem"
          ></el-button>
        </div>
      </div>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: 'CommentSubItem',
  props: {
    subCommentData: {
      type: Object,
      default: function() {
        return {
          id: 0,
          avatar: '',
          name: '',
          reply_user_name: '',
          creator_id: 0,
          content: '',
          nice_number: 0
        }
      }
    }
  },
  data() {
    return {
      userId: this.$ls.get('userId', 0)
    }
  },
  provide() {
    return { subNumber: this.subCommentData.nice_number }
  },
  methods: {
    reply() {
      this.$emit('reply', {
        id: this.subCommentData.creator_id,
        name: this.subCommentData.name
      })
    },
    givSunItemNum() {},
    deleteSubItem() {
      this.$emit('deleteSub', this.subCommentData.id)
    }
  }
}
</script>

<style lang="less" scoped>
.comment-item {
  font-size: 12px;
  .avatar {
    width: 24px;
    height: 24px;
    border-radius: 12px;
    background: #efefef;
    vertical-align: top;
    margin-right: 10px;
  }

  .name {
    display: inline-block;
  }

  .created-at {
    float: right;
  }
  .content {
    padding-left: 34px;
  }
  .footer {
    margin-top: 10px;
  }
  button {
    width: 20px;
    height: 20px;
    font-size: 14px;
    padding: 0;
    border: 0;
    color: #aaaaaa;
  }
}
</style>
