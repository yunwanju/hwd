import request from '@/utils/request';
/* 检查是否保存过该简单检索 */
export function inspect(data){
  return request({
    url:'/font/xsfb/myadvseacond/checkconditionName',
    method:'post',
    data:data
  })
}
/* 保存简单检索 */
export function saveCondition(data){
  return request({
    url:'/font/xsfb/myadvseacond/saveCondition',
    method:'post',
    data:data
  })
}
