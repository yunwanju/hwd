import request from '@/utils/request.js'
//正文页联想请求

export function lenovoAPI(data){
    return request({
        url:'/font/xsfb/criminal/magicWeaponLenovo',
        method:'POST',
        data:data
    })
}

export function lenovoGetMoreAPI(data){
    return request({
        url:'/font/xsfb/association/asociationMore',
        method:'POST',
        data:data
    })
}