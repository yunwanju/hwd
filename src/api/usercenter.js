import request from '@/utils/request.js'
export function uesrCollectionsAPI(data){
    return request({
        url:'/font/xsfb/charge/collectList',
        method:'GET',
        params:data
    })
}

export function DeleteuesrCollectionsAPI(data){
    return request({
        url:'/font/xsfb/charge/deleteCollect',
        method:'GET',
        params:data
    })
}


export function TopuesrCollectionsAPI(data){
    return request({
        url:'/font/xsfb/charge/topCollect',
        method:'GET',
        params:data
    })
}

export function unTopuesrCollectionsAPI(data){
    return request({
        url:'/font/xsfb/charge/removeTopCollect',
        method:'GET',
        params:data
    })
}
