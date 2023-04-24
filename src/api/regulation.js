import request from '@/utils/requestWithNoLoading';
//首页-制度变迁、相关案例、相关规章、法律依据
export function Elastic(data){
    return request({
        url:'/font/regulation/getRelationList',
        method:'get',
        params:data
    })
}
