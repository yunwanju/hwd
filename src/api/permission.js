import request from '@/utils/request.js';
// export function permission(data) {
//   return request({
//     url: '/font/getAllowedResource/getMenu',
//     method: 'get',
//     params:data
//   })
// }
export function permission(data) {
  return request({
    url: '/api/license/menu',
    method: 'get',
    params:data
  })
}
export function login(data) {
  return request({
    url: '/navs/pkulaw/login',
    method: 'post',
    data:data
  })
}
// 获取用户登录信息
export function userInfo(data){
  return request({
    url: '/navs/pkulaw/system/user/info',
    method: 'get',
    params:data
  })
}
//退出
export function layOut(data){
  return request({
    url:'/navs/oauth/remove_token',
    method: 'delete',
    params:data
  })
}
// 个人中心修改密码
export function changePass(data){
  return request({
    url:'/navs/pkulaw/system/user/modifyPass',
    method: 'POST',
    data:data
  })
}

