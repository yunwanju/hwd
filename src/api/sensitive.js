import request from '@/utils/request.js';

/* 敏感词数据获取*/
export function sensitiveWords(){
	return request({
		url:'/api/sensitive/allSensitiveWords',
		method:'post'
	})
}
/* 敏感词校验*/
export function sensitiveCheck(data){
  return request({
    url:'/api/sensitive/isSensitiveWords',
    method:'get',
    params:data
  })
}
