import request from '@/utils/request.js'
/* 搜索接口 */
export function search(data) {
  return request({
    url: '/api/xsfb/criminal/search',
    method: 'post',
    data: data
  })
}

/* 左侧聚类 */
export function clustering(data) {
  return request({
    url: '/api/search/sidebar',
    method: 'post',
    data: data
  })
}

/* 获取各库的命中数 */
export function hitNumber(data) {
  return request({
    url: '/api/search/navbar',
    method: 'post',
    data: data
  })
}

/* 右侧列表 */
export function right_side_list(data) {
  return request({
    url: '/api/search/maincontent',
    method: 'post',
    data: data
  })
}

/* 高级搜索 下拉框 弹框 */
export function selBox(data){
  return request({
    url:'/api/menu/item',
    method:'get',
    params:data
  })
}

//搜索历史
export function getSearchHistoryAPI(data){
  return request({
    url:'/api/user/searchHistory/getListSeaKeyCondition',
    method:'POST',
    data:data
  })
}

//搜索同义词
export function getSearchSyncWordAPI(data){
  return request({
    url:'/api/dict/synonym',
    method:'GET',
    params:data
  })
}
//热搜
export function getSearchHotKeyWordAPI(data){
  return request({
    url:'/api/dict/hotKeyword',
    method:'GET',
    params:data
  })
}
//直达法规
export function getSearchLawDirect(data){
  return request({
    url:'/api/law/lawRule',
    method:'GET',
    params:data
  })
}
//直达法条
export function getSearchLawDirectToTiao(data){
  return request({
    url:'/api/law/lawArticle',
    method:'GET',
    params:data
  })
}

//司法案例下的默认，案由，法院，法官，律师，律所所需接口

export function getSearchCaseData(data){
  return request({
    url:'/api/dict/getDictByKeyword',
    method:'GET',
    params:data
  })
}

//关键字接口
export function getSearchKeyWordHint(data){
  return request({
    url:'/api/dict/getDictByKeyword',
    method:'GET',
    params:data
  })
}

/* 收藏 */
export function collection(data){
  return request({
    // url:'/api/user/collect/collect',
    // method:'get',
    // params:data
    url:'/navs/pkulaw/font/externalKnowledge/addExternalKnowledgeCollection',
    method:'post',
    data:data
  })
}


/* 批量收藏 */
export function enshrine(data){
  return request({
    url:'/api/user/collect/collectBatch',
    method:'post',
    data:data
  })
}

/* 左侧聚力 "注"接口 */
export function getAnnotationFieldInfo(data){
  return request({
    url:'/api/Tool/getAnnotationFieldInfo',
    method:'get',
    params:data
  })
}
/* 新增下载记录 */
export function addExternalKnowledgeDownloadRecord(data){
  return request({
    url:'/navs/pkulaw/font/externalKnowledge/addExternalKnowledgeDownloadRecord',
    method:'post',
    data:data
  })
}
/* 新增浏览记录 */
export function addBrowseRecordRecord(data){
    return request({
        url:'/navs/pkulaw/font/externalKnowledge/addBrowseRecordRecord',
        method:'post',
        data:data
    })
}
/* 新增检索记录 */
export function addOrdinarySearchRecord(data){
    return request({
        url:'/navs/pkulaw/font/externalKnowledge/addOrdinarySearchRecord',
        method:'post',
        data:data
    })
}
/* userid 判断 */
export function checklegal(data){
  return request({
    url:'/navs/pkulaw/system/user/checklegal',
    method:'get',
    params:data
  })
}
