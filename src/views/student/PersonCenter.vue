<template>
  <div>
    <div style="font-size:18px;font-weight:600;margin-bottom:20px;">
      <i class="el-icon-s-grid" style="color:#000;"></i>
      Person Center
    </div>
    <el-tabs v-model="activeTabName" :tab-position="tabPosition">
      <el-tab-pane name="first">
        <span class="tab-name" slot="label">
          已选讲座
        </span>
        <el-table :data="choosedLectures" stripe border style="width: 100%">
          <el-table-column prop="lectureName" label="讲座名"></el-table-column>
          <el-table-column
            prop="lectureSpeaker"
            label="演讲人"
          ></el-table-column>
          <el-table-column
            prop="lectureAddress"
            label="讲座地址"
          ></el-table-column>
          <el-table-column prop="startedAt" label="开始时间"></el-table-column>
          <el-table-column prop="endedAt" label="结束时间"></el-table-column>
          <el-table-column fixed="right" label="操作" width="120">
            <template slot-scope="scope">
              <el-button
                @click.native.prevent="deleteChoosedLecture(scope.$index)"
                type="text"
                size="small"
              >
                移除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane name="second">
        <span class="tab-name" slot="label">
          个人信息
        </span>
        <el-card>
          <el-row>
            <p>班级名：</p>
            <el-input
              placeholder="暂未确定"
              v-model="ownInfo.majorClassName"
              :disabled="true"
            ></el-input>
          </el-row>
          <el-row>
            <p>学号：</p>
            <el-input
              placeholder="暂未确定"
              v-model="ownInfo.studentNumber"
              :disabled="true"
            ></el-input>
          </el-row>
          <el-row>
            <p>姓名：</p>
            <el-input
              placeholder="暂未确定"
              v-model="ownInfo.name"
              :disabled="true"
            ></el-input>
          </el-row>
          <el-row>
            <p>专业方向：</p>
            <el-input
              placeholder="暂未确定"
              v-model="ownInfo.majorName"
              :disabled="true"
            ></el-input>
          </el-row>
          <el-row>
            <p>最终实训方向：</p>
            <el-input
              placeholder="暂未确定"
              v-model="ownInfo.directionName"
              :disabled="true"
            ></el-input>
          </el-row>
        </el-card>
      </el-tab-pane>
      <el-tab-pane name="three">
        <span class="tab-name" slot="label">
          修改密码
        </span>
        <el-input
          type="text"
          placeholder="请输入旧密码"
          v-model="password.old"
          maxlength="25"
          show-word-limit
          style="margin-bottom: 15px;"
        ></el-input>
        <el-input
          type="text"
          placeholder="请输入新密码"
          v-model="password.first"
          maxlength="25"
          show-word-limit
          style="margin-bottom: 15px;"
        ></el-input>
        <el-input
          type="text"
          placeholder="请再次输入新密码"
          v-model="password.second"
          maxlength="25"
          show-word-limit
          style="margin-bottom: 15px;"
        ></el-input>
        <el-button type="primary" @click="changePassword">
          修改密码
        </el-button>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeTabName: 'first',
      tabPosition: 'top',
      choosedLectures: [],
      password: {
        old: '',
        first: '',
        second: ''
      },
      ownInfo: {}
    }
  },
  created() {
    this.getChoosedLectures()
    this.getOwnInfo()
  },
  methods: {
    getChoosedLectures() {
      this.$axios
        .get('/lecture/choose-by-student', {
          params: {}
        })
        .then(res => {
          if (res.code !== 200) {
            this.$message.error(res.msg)
          }
          this.choosedLectures = res.result
        })
    },
    getOwnInfo() {
      this.$axios
        .get('/student/own-info', {
          params: {}
        })
        .then(res => {
          if (res.code !== 200) {
            this.$message.error(res.msg)
          }
          this.ownInfo = res.result
        })
    },
    deleteChoosedLecture(index) {
      this.$axios
        .delete('/lecture/deselect', {
          params: {
            selectLectureId: this.choosedLectures[index].selectLectureId
          }
        })
        .then(res => {
          if (res.code !== 200) {
            this.$message.error(res.msg)
          } else {
            this.choosedLectures.splice(index, 1)
            this.$message.success('删除成功')
          }
        })
    },
    changePassword() {
      const loading = this.$loading({
        lock: true,
        text: '修改密码中...',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
      this.$axios
        .post('/user/password/change', {
          password: this.password.old,
          newPassword: this.password.first,
          twoPassword: this.password.second
        })
        .then(res => {
          if (res.code !== 200) {
            this.$message.error(res.msg)
          } else {
            this.password = {
              old: '',
              first: '',
              second: ''
            }
            this.$message.success('修改密码成功')
          }
          loading.close()
        })
    }
  }
}
</script>

<style lang="less" scoped>
// /deep/ .el-tabs__item {
//     padding: 0px 20px 0px 0px;
// }

.tab-name {
  font-size: 16px;
}
</style>
