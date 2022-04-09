<template>
  <el-card shadow="hover" class="post-item">
    <div class="header">
      {{ data.title }}
      <div class="person" v-if="data.creator_id">
        <img :src="data.avatar" alt="avatar" class="avatar" />
        <span>{{ data.name }}</span>
      </div>
    </div>
    <div>
      <slot>
        <div class="content">
          {{ data.content }}
        </div>
      </slot>
    </div>
    <div class="footer">
      <div class="item">
        <i class="el-icon-reply-fwj"></i>
        <span class="number">{{ ' ' + data.reply_number }}</span>
      </div>
      <div class="item">
        <i class="el-icon-nice-fwj"></i>
        <span class="number">{{ ' ' + data.nice_number }}</span>
      </div>
      <div class="item" style="float:right;">
        <i class="el-icon-date"></i>
        <span class="number">{{ ' ' + data.created_at }}</span>
      </div>
    </div>
  </el-card>
</template>

<script>
export default {
  name: 'ForumItem',
  props: {
    data: {
      type: Object,
      default: function() {
        return {
          reply_number: 0,
          nice_number: 0,
          avatar: '',
          creator_id: '',
          name: '发帖人姓名',
          title: '标题',
          content: '',
          created_at: '2022-02-06 11:00'
        }
      }
    }
  }
}
</script>

<style lang="less" scoped>
.header {
  font-weight: 600;
  font-size: 16px;
  line-height: 25px;
  margin-bottom: 10px;
  display: flex;
  justify-content: space-between;
}

.person {
  height: 20px;
  line-height: 20px;
  color: #606266;
  font-size: 12px;
}

.avatar {
  width: 20px;
  height: 20px;
  border-radius: 10px;
  vertical-align: middle;
  margin-right: 10px;
}

.footer {
  margin-top: 10px;
  .item {
    display: inline-block;
    margin-right: 15px;
    .number {
      font-size: 12px;
    }
  }
}
</style>
