import axios from 'axios';
import { Message,Loading } from 'element-ui'
var localUrl = window.location
const baseUrl = process.env.NODE_ENV === 'development'?process.env.APP_APTION:localUrl.protocol+'//'+localUrl.host+''
// const contextPath =  localStorage.getItem('contextPath')
// const baseUrl = contextPath
export const baseAPI = baseUrl
export const agent = baseUrl
const service = axios.create({
	baseURL: baseUrl,
	headers: {
		'Content-Type': 'application/json'
	},
	withCredentials: true,
	responseType: 'blob' //返回数据的格式，可选值为arraybuffer,blob,document,json,text,stream，默认值为json
})
let loading
function startLoading() { // 使用Element loading-start 方法
	loading = Loading.service({
		lock: true,
		background: 'rgba(255, 255, 255, 0)',
    	zIndex:999999
	})
}
export function endLoading() { // 使用Element loading-close 方法
	loading.close()
}
export let needLoadingRequestCount = 0
export function showFullScreenLoading() {
	if (needLoadingRequestCount === 0) {
		startLoading()
	}
	needLoadingRequestCount++
}

export function tryHideFullScreenLoading() {
	if (needLoadingRequestCount <= 0) return
		needLoadingRequestCount--
	if (needLoadingRequestCount === 0) {
		endLoading()
	}
}
service.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
/* 请求拦截器 */
service.interceptors.request.use(
	config => {
		let accessToken = localStorage.getItem('accessToken');
        if (accessToken) {
            config.headers.access_token = accessToken
            config.headers.Authorization = 'Bearer '+ accessToken
        }
    	showFullScreenLoading()
		return config
	},
	error => {
		return Promise.reject(error)
	}
)
/* 请求响应器 */
service.interceptors.response.use(
	response => {
    	let res = response
		if (response.status !== 1 && response.status !== 200) {
        tryHideFullScreenLoading()
			return Promise.reject('error')
		} else {
      		tryHideFullScreenLoading()
			return res
		}
	},
	error => {
    if(error.response.status == 500){
		Message({
			showClose: true,
			message: '服务器发生错误,请重试',
			type: 'error',
			duration: 5 * 1000,
		})
    }
    tryHideFullScreenLoading()
		return Promise.reject(error)
	}
)
export default service
