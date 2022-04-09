<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'app',
  created: function() {
    setTimeout(function() {
      document.body.removeChild(document.getElementById('loading-of-index'))
    }, 900)
  }
}
</script>
<!--样式-->
<style>
html,
body {
  padding: 0;
  margin: 0;
  border: 0;
  /* 以下代码，禁止文字被选中 */
  -webkit-user-select: none;
  -moz-user-select: none;
  -o-user-select: none;
  user-select: none;
  font-size: 90px;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* color: #303133; */
}

#nprogress .bar {
  height: 4px !important;
}

ul {
  padding-inline-start: 0px;
  margin-block-start: 0px;
  margin-block-end: 0px;
}
li {
  list-style: outside none;
}
a {
  text-decoration: none;
  outline: none;
}

.el-page-header__left:hover {
  color: rgba(64, 130, 250, 0.9);
}

.el-message {
  font-size: 14px;
  z-index: 66666667 !important;
}

textarea, input {
  background: transparent;
  font-size: 12px;
  font-family: "SourceSansPro-Regular", "微软雅黑";
  color: #888;
  outline: none;
  border: 0;
}
.el-message--success{
  font-size: 14px;
}
.el-message--error{
  font-size: 14px;
}
</style>
