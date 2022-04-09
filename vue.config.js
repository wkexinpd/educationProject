module.exports = {
  productionSourceMap: false,
  css: {
    loaderOptions: {
      // 给 less-loader 传递 Less.js 相关选项
      less: {
        javascriptEnabled: true
      }
    }
  },
  // headers: {
  //   'Access-Control-Allow-Origin': '*'
  // },
  devServer: {
    port: 80,
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  }
}
