import request from '@/utils/request';
/* 简单检索列表 */
export function getListNormalCondition(data){
  return request({
    url:'/xsfb/myadvseacond/getListNormalCondition',
    method:'post',
    data:data
  })
}
/* 高级检索列表 */
export function getListAdvCondition(data){
  return request({
    url:'/xsfb/myadvseacond/getListAdvCondition',
    method:'post',
    data:data
  })
}
/* 关键词检索列表 */
export function getListSeaKeyCondition(data){
  return request({
    url:'/font/xsfb/myseakey/getListSeaKeyCondition',
    method:'post',
    data:data
  })
}
/* 检查是否保存过该简单检索 */
export function checkconditionName(data){
  return request({
    url:'/font/xsfb/myadvseacond/checkconditionName',
    method:'post',
    data:data
  })
}
/*  */
export function getConditions(data){
  return request({
    url:'/font/xsfb/myadvseacond/getConditionsById',
    method:'get',
    params:data
  })
}
