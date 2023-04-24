const getters = {
    navFirst:state=>state.store.navFirst,
    navSecond:state=>state.store.navSecond,
    activeIndex:state=>state.store.activeIndex,
    activeListType:state=>state.store.activeListType,
    listJson:state=>state.store.listJson,
    list_data:state=>state.list.list_data,
    personInfo:state=>state.store.personInfo
}

export default getters
