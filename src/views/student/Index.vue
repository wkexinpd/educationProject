<template>
  <div class="student-index">
    <el-container>
      <StudentHeader />
      <el-main>
        <router-view></router-view>
      </el-main>
      <el-footer>@ by wkx</el-footer>
    </el-container>
  </div>
</template>

<script>
import StudentHeader from '@/layouts/StudentHeader.vue'

export default {
  name: 'StudentIndex',
  components: {
    StudentHeader
  },
  data() {
    return {}
  },
  methods: {}
}
</script>

<style lang="less">
.el-main {
  padding: 0 !important;
  border: 0 !important;
  width: 100%;
  min-height: 800px;
  // margin: 85px auto !important;
}

.el-footer {
  padding: 20px;
  min-height: 150px;
  text-align: center;
  background-color: #444;
  color: #ffffff;
}
</style>
