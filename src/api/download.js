import request from '@/utils/download.js';
/* 单文件下载 */
export function download(data){
  return request({
    url:'/font/xsfb/criminal/downloadDocumentFile',
    method:'get',
    params:data
  })
}

/* 批量下载 */
export function batchDownload(data){
  return request({
    url:'/font/xsfb/criminal/BatchDownloadFulltext',
    method:'get',
    params:data
  })
}

/* 批量收藏 */
export function enshrine(data){
  return request({
    url:'/font/xsfb/charge/collectBatch',
    method:'post',
    data:data
  })
}

/* 收藏 */
export function collection(data){
  return request({
    url:'/xsfb/charge/collect',
    method:'get',
    params:data
  })
}
