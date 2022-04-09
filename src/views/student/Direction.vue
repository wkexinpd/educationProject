<template>
  <div id="student-direction">
    <div style="font-size:18px;font-weight:600;margin-bottom:20px;">
      <i class="el-icon-s-grid" style="color:#000;"></i>
      Direction
    </div>
    <el-card style="padding:20px 0px;" shadow="hover">
      <div>
        <el-steps
          :active="directionStatus"
          finish-status="success"
          align-center
        >
          <el-step title="未开始"></el-step>
          <el-step title="方向选择"></el-step>
          <el-step title="选择完成"></el-step>
          <el-step title="已完成"></el-step>
        </el-steps>
      </div>
      <div v-if="directionStatus === 2" class="activeStepDiv">
        <CustomRadioGroup :radioGroupData="firstDirectionData" />
        <CustomRadioGroup :radioGroupData="secondDirectionData" />
        <CustomRadioGroup :radioGroupData="planData" />
        <div style="width:300px;margin:0 auto;margin-top:100px;">
          <el-button
            type="primary"
            @click="chooseDirection"
            style="width:100%;background:rgb(155,45,48);"
          >
            提交
          </el-button>
        </div>
      </div>
      <div v-if="directionStatus === 3" class="activeStepDiv">
        <el-form
          ref="loginForm"
          :model="ownChooseDirectionInfo"
          label-position="left"
          label-width="80px"
          style="max-width:500px;margin: 30px auto;"
        >
          <el-form-item label="班级名">
            <el-input
              v-model="ownChooseDirectionInfo.majorClassName"
              prefix-icon="el-icon-user"
              placeholder="暂无信息"
              disabled
            ></el-input>
          </el-form-item>
          <el-form-item label="学号">
            <el-input
              v-model="ownChooseDirectionInfo.studentNumber"
              prefix-icon="el-icon-user"
              placeholder="暂无信息"
              disabled
            ></el-input>
          </el-form-item>
          <el-form-item label="姓名">
            <el-input
              v-model="ownChooseDirectionInfo.studentName"
              prefix-icon="el-icon-user"
              placeholder="暂无信息"
              disabled
            ></el-input>
          </el-form-item>
          <el-form-item label="首选方向">
            <el-input
              v-model="ownChooseDirectionInfo.firstDirectionName"
              prefix-icon="el-icon-user"
              placeholder="暂无信息"
              disabled
            ></el-input>
          </el-form-item>
          <el-form-item label="备选方向">
            <el-input
              v-model="ownChooseDirectionInfo.secondDirectionName"
              prefix-icon="el-icon-user"
              placeholder="暂无信息"
              disabled
            ></el-input>
          </el-form-item>

          <!-- <el-button type="danger" @click="deselect">
            删除当前所选方向
          </el-button> -->
          <el-button type="primary" @click="determineDirection">
            确定最终方向
          </el-button>
          <el-button
            type="info"
            @click="changeDirectionDialogVisible = true"
            plain
          >
            修改方向
          </el-button>
          <div style="color:#F56C6C;padding: 20px 0px;">
            <p>
              最终方向优先备选，备选为空，才会是首选。
              最终方向确定后，会进行分班，所以确认后将无法修改。请慎重！
            </p>
            <p>
              如果实在需要修改方向，请填写申请表，并盖章。然后点击申请按钮，带着申请表找老师审核修改方向。
            </p>
          </div>
          <el-table
                  :data="options"
                  border>
            <el-table-column
              prop="directionId"
              label="申请方向"
              style="width: 15%"
              min-width="90"
            >
            </el-table-column>
            <el-table-column
              prop="reason"
              label="申请理由"
              style="width: 15%"
              min-width="190"
            ></el-table-column>
            <el-table-column
              prop="status"
              label="状态"
              style="width: 15%"
              min-width="90"
            >
                </el-table-column>
          </el-table>
        </el-form>
      </div>
      <div v-if="directionStatus === 4" class="activeStepDiv">
        <p>请到个人中心的个人信息中查看自己的最终实训方向是否正确。</p>
        <p>如果有误，请联系管理员。</p>
      </div>
    </el-card>

    <el-dialog
      title="提交申请，修改方向"
      :visible.sync="changeDirectionDialogVisible"
    >
      <el-form
        ref="changeDirectionData"
        :model="changeDirectionData"
        label-position="top"
        label-width="60px"
        @submit.native.prevent
        :rules="rules"
      >
        <el-form-item label="方向" prop="directionId">
          <el-select
            v-model="changeDirectionData.directionId"
            placeholder="请选择"
          >
            <el-option
              v-for="item in directionOptions"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="理由" prop="reason">
          <el-input
            type="textarea"
            v-model="changeDirectionData.reason"
            placeholder="请输入申请修改方向的理由"
          ></el-input>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="changeDirectionDialogVisible = false">
          取 消
        </el-button>
        <el-button type="primary" @click="applyChangeDirection">
          确 定
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import CustomRadioGroup from '@/components/CustomRadioGroup.vue'

export default {
  name: 'StudentDirection',
  components: {
    CustomRadioGroup
  },
  data() {
    return {
      changeDirectionDialogVisible: false,
      changeDirectionData: {
        directionId: null,
        reason: ''
      },
      options: [],
      directionOptions: [],
      rules: {
        directionId: [
          { required: true, message: '请选择方向', trigger: 'blur' }
        ],
        reason: [{ required: true, message: '请输入理由', trigger: 'blur' }]
      },
      ownChooseDirectionInfo: {
        userId: null,
        majorClassName: null,
        studentNumber: null,
        studentName: null,
        firstDirectionName: null,
        secondDirectionName: null
      },
      directionStatus: 1,
      firstDirectionData: {
        value: 1,
        description: '首选方向',
        radioList: []
      },
      secondDirectionData: {
        value: 0,
        description: '备选方向',
        radioList: [
          {
            id: 0,
            name: '不选'
          }
        ]
      },
      planData: {
        value: 1,
        description: '未来计划',
        radioList: []
      }
    }
  },
  created() {
    this.getDirectionStatus()
    this.getDirectionData()
    this.getOwnChooseDirectionInfo()
    this.getDirectionList()
    this.getChangeDirection()
  },
  methods: {
    getDirectionList() {
      this.$axios.get('/direction/list', { params: {} }).then(res => {
        if (res.code !== 200) {
          this.$message.error(res.msg)
        } else {
          this.directionOptions = res.result
        }
      })
    },
    getChangeDirection() {
      this.$axios
        .get('/direction/selectownChangeDirection', { params: {} })
        .then(res => {
          if (res.code !== 200) {
            this.$message.error(res.msg)
          } else {
            for (let i = 0; i < res.result.length; i++) {
              if (res.result[i].status === 0) {
                res.result[i].status = '正在审核中'
              } else if (res.result[i].status === 1) {
                res.result[i].status = '驳回'
              } else if (res.result[i].status === 2) {
                res.result[i].status = '同意'
              }
              if (res.result[i].directionId === 4) {
                res.result[i].directionId = 'JAVA'
              } else if (res.result[i].directionId === 7) {
                res.result[i].directionId = 'JAVA大数据'
              } else if (res.result[i].directionId === 6) {
                res.result[i].directionId = '人工智能'
              } else if (res.result[i].directionId === 3) {
                res.result[i].directionId = '信息安全'
              } else if (res.result[i].directionId === 2) {
                res.result[i].directionId = '全栈'
              } else if (res.result[i].directionId === 14) {
                res.result[i].directionId = '大前端'
              } else if (res.result[i].directionId === 8) {
                res.result[i].directionId = '大数据'
              } else if (res.result[i].directionId === 10) {
                res.result[i].directionId = '智能终端应用'
              } else if (res.result[i].directionId === 9) {
                res.result[i].directionId = '物联网'
              }
            }
            this.options = res.result
          }
        })
    },
    applyChangeDirection() {
      this.$refs['changeDirectionData'].validate(valid => {
        if (valid) {
          const loading = this.$loading({
            lock: true,
            text: '提交修改申请中...',
            spinner: 'el-icon-loading',
            background: 'rgba(0, 0, 0, 0.7)'
          })
          this.$axios
            .post('/direction/apply-change-direction', {
              directionId: this.changeDirectionData.directionId,
              reason: this.changeDirectionData.reason
            })
            .then(res => {
              if (res.code !== 200) {
                this.$message.error(res.msg)
              } else {
                this.$message.success('提交申请成功')
              }
              this.changeDirectionDialogVisible = false
              loading.close()
            })
        } else {
          return false
        }
      })
    },
    determineDirection() {
      let finallyDirectionName = this.ownChooseDirectionInfo.secondDirectionName
        ? this.ownChooseDirectionInfo.secondDirectionName
        : this.ownChooseDirectionInfo.firstDirectionName

      this.$confirm(
        '你的最终方向是 [ ' +
          finallyDirectionName +
          ' ] 确定后，方向将无法修改，是否继续?',
        '提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }
      )
        .then(() => {
          this.$axios.post('/direction/determine', {}).then(res => {
            if (res.code !== 200) {
              this.$message.error(res.msg)
            } else {
              this.getDirectionStatus()
              this.$message.success('确定成功')
            }
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          })
        })
    },
    deselect() {
      this.$confirm('删除后，已选方向信息将丢失, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.$axios
            .delete('/direction/deselect', {
              params: {}
            })
            .then(res => {
              if (res.code !== 200) {
                this.$message.error(res.msg)
              } else {
                this.getDirectionStatus()
                this.$message.success('删除成功')
              }
            })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          })
        })
    },
    getOwnChooseDirectionInfo() {
      this.$axios.get('/direction/own', { params: {} }).then(res => {
        if (res.code !== 200) {
          this.$message.error(res.msg)
        } else {
          this.ownChooseDirectionInfo = res.result
        }
      })
    },
    chooseDirection() {
      this.$confirm('此次提交后将无法修改, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.$axios
            .get('/direction/choose', {
              params: {
                firstDirectionId: this.firstDirectionData.value,
                secondDirectionId: this.secondDirectionData.value,
                planId: this.planData.value
              }
            })
            .then(res => {
              if (res.code !== 200) {
                this.$message.error(res.msg)
              } else {
                this.directionStatus = 3
                this.$message.success('选择方向成功！')
              }
            })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          })
        })
    },
    getDirectionStatus() {
      this.$axios.get('/direction/choose-status', { params: {} }).then(res => {
        if (res.code !== 200) {
          this.$message.error(res.msg)
        } else {
          this.directionStatus = res.result.status + 1
        }
      })
    },
    getDirectionData() {
      this.$axios
        .get('/major-direction-relation/select', { params: {} })
        .then(res => {
          if (res.code !== 200) {
            this.$message.error(res.msg)
          } else {
            const result = res.result
            this.firstDirectionData.radioList = result.optionalDirection
            if (result.optionalDirection.length > 0) {
              this.firstDirectionData.value = result.optionalDirection[0].id
            }
            this.secondDirectionData.radioList = this.secondDirectionData.radioList.concat(
              result.notOptionalDirection
            )
            const plans = result.plans
            if (plans.length > 0) {
              this.planData.value = plans[0].planId
            }
            for (let i = 0; i < plans.length; i++) {
              this.planData.radioList.push({
                id: plans[i].planId,
                name: plans[i].planName
              })
            }
          }
        })
    }
  }
}
</script>

<style lang="less" scoped>
/deep/ .el-step > .is-success {
  color: rgb(155,45,48);
  border-color: rgb(155,45,48);
}
/deep/ .el-step__main > .is-success {
  color: rgb(155,45,48);
}
.activeStepDiv {
  box-sizing: border-box;
  width: 80%;
  margin: 20px auto;
  padding: 15px;
}

/deep/ .el-form-item__label {
  padding: 0px;
}
</style>
