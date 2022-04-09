'use strict'

import Vue from 'vue'
import axios from 'axios'
import { REQUEST_TOKEN } from '@/store/mutation-types'

// Full config:  https://github.com/axios/axios#request-config
// axios.defaults.baseURL = process.env.baseURL || process.env.apiUrl || '';
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

let config = {
  // baseURL: process.env.baseURL || process.env.apiUrl || ""
  // baseURL: '/api',
  baseURL: 'http://localhost:3000',
  timeout: 60 * 1000
  // timeout: 60 * 1000, // Timeout
  // withCredentials: true, // Check cross-site Access-Control
}

const _axios = axios.create(config)

_axios.interceptors.request.use(
  function(config) {
    const token = Vue.ls.get(REQUEST_TOKEN)
    if (token) {
      config.headers[REQUEST_TOKEN] = token // 让每个请求携带自定义 token 请根据实际情况自行修改
    }
    // Do something before request is sent
    return config
  },
  function(error) {
    // Do something with request error
    return Promise.reject(error)
  }
)

// Add a response interceptor
_axios.interceptors.response.use(
  function(response) {
    // Do something with response data
    return response.data
  },
  function(error) {
    // Do something with response error
    return Promise.reject(error)
  }
)

Plugin.install = function(Vue) {
  Vue.axios = _axios
  window.axios = _axios
  Object.defineProperties(Vue.prototype, {
    axios: {
      get() {
        return _axios
      }
    },
    $axios: {
      get() {
        return _axios
      }
    }
  })
}

Vue.use(Plugin)

export default Plugin
