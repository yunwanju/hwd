import axios from 'axios';
import { Message,Loading} from 'element-ui'
var localUrl = window.location
const baseUrl = process.env.NODE_ENV === 'development'?process.env.APP_APTION:localUrl.protocol+'//'+localUrl.host+''
// const contextPath =  localStorage.getItem('contextPath')
// const baseUrl = contextPath

export const baseAPI = baseUrl
export const agent = baseUrl
const service = axios.create({
	baseURL: baseUrl, // api 的 base_url
	withCredentials: true, // 跨域请求时发送 cookies
	timeout: 8000 // 请求超时时间
})
let loading
function startLoading() { // 使用Element loading-start 方法
	loading = Loading.service({
		lock: true,
		text: '加载中……',
		background: 'rgba(255, 255, 255, 0)',
    	zIndex:999999
	})
}
export function endLoading() { // 使用Element loading-close 方法
	loading.close()
}
// 那么 showFullScreenLoading() tryHideFullScreenLoading() 要干的事儿就是将同一时刻的请求合并。
// 声明一个变量 needLoadingRequestCount，每次调用showFullScreenLoading方法 needLoadingRequestCount + 1。
// 调用tryHideFullScreenLoading()方法，needLoadingRequestCount - 1。needLoadingRequestCount为 0 时，结束 loading。
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
		return config
	},
	error => {
		return Promise.reject(error)
	}
)

/* 请求响应器 */
service.interceptors.response.use(
	response => {
    let res = response.data
		if (res.code !== 200) {
			if (res.code == 500) {
				Message({
					showClose: true,
					message: '服务器发生错误,请重试',
					type: 'error',
					duration: 5 * 1000,
				})
			}
        if (res.code == '9001') {
			Message({
				showClose: true,
				message: res.message,
				type: 'error',
				duration: 5 * 1000,
			})
        }
        var codeArr = ['5001',
			'50030',
			'50040',
			'50050',
			'20017',
			'50060'
        ]
        if (codeArr.indexOf(res.code)>-1) {
			Message({
				showClose: true,
				message: res.message,
				type: 'error',
				duration: 5 * 1000,
			})
        }
        tryHideFullScreenLoading()
			return res
		} else {
			return res
		}
	},
	error => { 
		if(error.toString().indexOf("401")>=0){//登录过期
			// Message({
			// 	showClose: true,
			// 	message: '登录已失效，请重新登录',
			// 	type: 'error',
			// 	duration: 5 * 1000,
			// })
            // router.push('/login');
        }
		if(error.response.status == 500){
			Message({
				showClose: true,
				message: '服务器发生错误,请重试',
				type: 'error',
				duration: 5 * 1000,
			})
		}
		return Promise.reject(error)
	}
)
export default service
