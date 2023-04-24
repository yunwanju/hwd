import axios from 'axios';
import {
  Toast
} from 'vant';
import router from '@/router'
import Vuex from '@/vuex'
var localUrl = window.location
const baseUrl = process.env.NODE_ENV === 'development' ? process.env.APP_APTION : localUrl.protocol + '//' + localUrl.host
// const contextPath = localStorage.getItem('contextPath')
// const baseUrl = contextPath

export const baseAPI = baseUrl
export const agent = baseUrl;

const service = axios.create({
  baseURL: baseUrl, // api 的 base_url
  withCredentials: true, // 跨域请求时发送 cookies
  timeout: 80000 // 请求超时时间
})

// 那么 showFullScreenLoading() tryHideFullScreenLoading() 要干的事儿就是将同一时刻的请求合并。
// 声明一个变量 needLoadingRequestCount，每次调用showFullScreenLoading方法 needLoadingRequestCount + 1。
// 调用tryHideFullScreenLoading()方法，needLoadingRequestCount - 1。needLoadingRequestCount为 0 时，结束 loading。
export let needLoadingRequestCount = 0
export function showFullScreenLoading() {
  needLoadingRequestCount++
}

export function tryHideFullScreenLoading() {
  if (needLoadingRequestCount <= 0) return
  needLoadingRequestCount--
}
service.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
/* 请求拦截器 */
service.interceptors.request.use(config => {
    let accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      config.headers.access_token = accessToken
      config.headers.Authorization = 'Bearer ' + accessToken
    }
    showFullScreenLoading()
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

/* 请求响应器 */
export var showcode = false
service.interceptors.response.use(
  response => {
    let res = response.data
    if (res.code !== '200') {
      if (res.code == '500') {
        Toast.fail({
          message: '服务器发生错误,请重试',
        });

      }

      // if (res.code == '60001') {
      //   Toast.fail({
      //     message: '登录已失效，请重新登录',
      //   });
      //   router.push('/login');
      // }
      if (res.code == '40005') {
        Toast.fail({
          message: res.message,
        });
        router.push({
          path: '/404'
        });
      }
      var codeArr = [
        '5001',
        '50030',
        '50040',
        '50050',
        '20017',
        '50060',
        '9001'
      ]
      if (codeArr.indexOf(res.code) > -1) {
        Toast.fail({
          message: res.message,
        });
      }
      tryHideFullScreenLoading()
      return res
    } else {
      tryHideFullScreenLoading()
      return res
    }
  },
  error => {
    if (error.message.includes('timeout')) { // 判断请求异常信息中是否含有超时timeout字符串
      Toast.fail({
        message: '加载超时，请重新加载。',
      });
      return Promise.reject(error); // reject这个错误信息
    }
    // if (error.response.status == 401) { //登录过期
    //   Toast.fail({
    //     message: '登录已失效，请重新登录',
    //   });
    //   localStorage.clear();
    //   return router.push('/login');
    // }
    if (error.response.status == 500) {
      Toast.fail({
        message: '服务器发生错误,请重试',
      });
    } else if (error.response.status == 509) {
      tryHideFullScreenLoading()
      let html = error.response.data;
      var num = html.indexOf('<form'),
        num1 = html.indexOf('</body>');
      var formdata = html.slice(num, num1);
      Vuex.state.store.code_value = formdata;
      Vuex.state.store.code_flag = true;
    }
    tryHideFullScreenLoading()
    return Promise.reject(error)
  }
)
export default service
