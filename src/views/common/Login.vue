<template>
  <div id="login">
    <el-card
      shadow="always"
      style="color:rgb(155,45,48);font-size:22px;font-weight:900;margin-bottom:40px;"
    >
      TP
    </el-card>
    <el-form
      ref="loginForm"
      :model="loginForm"
      label-position="top"
      label-width="60px"
      class="loginForm"
      @submit.native.prevent
    >
      <el-form-item label="账户">
        <el-input
          v-model="loginForm.username"
          prefix-icon="el-icon-user"
          placeholder="请输入账户"
        ></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input
          type="password"
          v-model="loginForm.password"
          prefix-icon="el-icon-postcard"
          show-password
          placeholder="请输入密码"
          @keyup.enter.native="loginFormSubmit"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" style="width:100%;" @click="loginFormSubmit">
          登录
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { REQUEST_TOKEN } from '@/store/mutation-types'

export default {
  name: 'Login',
  data: function() {
    return {
      loginForm: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    loginFormSubmit() {
      const loading = this.$loading({
        lock: true,
        text: '努力登陆中...',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
      this.$axios({
        url: '/user/login',
        method: 'post',
        data: this.loginForm
      }).then(res => {
        loading.close()
        if (res.code !== 200) {
          this.$message.error(res.msg)
        }
        const result = res.result
        this.$ls.set(REQUEST_TOKEN, result.token, 7 * 24 * 60 * 60 * 1000)
        this.$ls.set('username', result.username, 7 * 24 * 60 * 60 * 1000)
        this.$ls.set('userId', result.userId, 7 * 24 * 60 * 60 * 1000)
        this.$ls.set('role', result.role, 7 * 24 * 60 * 60 * 1000)
        this.goBack()
      })
    },
    goBack() {
      window.history.length > 1 ? this.$router.go(-1) : this.$router.push('/')
    }
  },
  components: {}
}
</script>

<style>
.loginForm {
  max-width: 500px;
  margin: 0 auto;
  padding: 10px;
}
</style>
