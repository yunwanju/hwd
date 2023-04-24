//data:obj{'code':'中文描述'},val索引英文，go索引英文，type库类型
import route from '../router/index'

export function detailtoList(data, val, path, type) {
  if (new RegExp('\/detail\/(regulation)\/[0-9a-zA-Z]{1,}', 'g').test(path)) {
    let newRoutes = route.resolve({
      path: '/regulation',
      query: {
        keyCode: Object.keys(data)[0],
        lib: type,
        classCodeKey: val == "docCate" ? "docSubCate" : val,
        zhName: encodeURI(Object.values(data)[0])
      }
    })
    window.open(newRoutes.href, "_self")
    Bus.$emit("listSideBarInit");
  } else if (new RegExp('\/detail\/(hndwcontract)|(hndwlegalopinionmodel)\/[0-9a-zA-Z]{1,}', 'g').test(path)) {
    let newRoutes = route.resolve({
      path: `/${type}`,
      query: {
        keyCode: Object.keys(data)[0],
        lib: type,
        classCodeKey: val,
        zhName: encodeURI(Object.values(data)[0])
      }
    })
    window.open(newRoutes.href, "_self")
    Bus.$emit("listSideBarInit");
  }
}

// export function detailtoListCustomed(keyVal,data,val,path,type){
//     if(new RegExp('\/detail\/(regulation)\/[0-9a-zA-Z]{1,}','g').test(path)){
//         let newRoutes=route.resolve({path:'/regulation',query:{
//             keyCode:keyVal,
//             lib:type,
//             classCodeKey:val,
//             zhName:encodeURI(data)
//         }})
//         window.open(newRoutes .href, '_blank')
//     }
// }

// export function recordtoListOnlySearch(data,val,path,type){
//     if(new RegExp('(regulation)','g').test(path)){
//         let newRoutes=route.resolve({path:'/regulation',query:{
//             lib:type,
//             classCodeKey:val,
//             zhName:encodeURI(data)
//         }})
//         window.open(newRoutes .href, '_blank')
//     }
// }
