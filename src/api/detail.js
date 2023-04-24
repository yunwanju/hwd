import request from '@/utils/request.js'

export function detailAPI(data){
  return request({
    url:'/api/detail/detail',
    method:'GET',
    params:data
  })
}

export function getLawAPI(data){
  return request({
    url:'/font/xsfb/fbreference/referenceThisLaw',
    method:'POST',
    params:data
  })
}

export function isCollectedAPI(data) {
  return request({
    url:'/navs/pkulaw/font/externalKnowledge/getUserIsCollectedByGid',
    method:'post',
    data:data
    
  })
}

export function articlesFulltextNotLxAPI(data) {
  return request({
    url: '/api/articles/fulltextNotLx',
    method: 'GET',
    params: data
  })
}
export function articlesInfoAPI(data) {
  return request({
    url: '/api/articles/info',
    method: 'GET',
    params: data
  })
}
export function addBrowseRecordRecord(data){
  return request({
      url:'/navs/pkulaw/font/externalKnowledge/addBrowseRecordRecord',
      method:'post',
      data:data
  })
}

