
import { permission, layOut } from '@/api/permission';
import router from '@/router/index'
import { userInfo } from "@/api/permission";
const state = {
    api: '/apis',
    Result: false,
    activeListType: "", //移动端缓存路由
    IsshowResult: false, //检索判断其他库是否有结果
    changeChart: false, //切换图表
    navFirst: [],
    viewsList: {
        regulation: "规章制度",
        hndwcontract: '合同范本'
    },
    activeIndex: null,
    listJson: {
        "scope": "Default",//检索左侧下拉
        "sort": "date",//固定字段
        "synonymSearch": false,//同义词 true选择 false不选择
        "menu": 'law',//
        'groupByIndex': 0,//分组参数 
        'orderByIndex': 0,//排序字段  参考vuex/modules/lists/排序字段  每个库对应的排序不同
        "page": 1,//分页
        "keyValues": [],
        "size": 8,//分页数量
        "index": "chl",//当前库名 例如:规章制度:regulation
        "keyword": "",//搜索输入框字段
        "group": true,//固定字段
        "indexOfGroup": 0,//分组状态滚动加载 
        "tagJson": [],//高级检索
        "displayHomePageFlag": true,//是否为首页展示 true是 false否
        "queryBaseReqs": [],//结果中检索
        "showStyleFlag": "text"
    },

    navSecond: {
        law: [{
            name: '中央法规',
            type: 'chl',
            chart: true,
        },
        {
            name: '地方法规',
            type: 'lar',
            chart: true,
        },
        {
            name: '法律动态',
            type: 'news'
        },
        {
            name: '合同范本',
            type: 'contract'
        },
        {
            name: '法律文书',
            type: 'fmt'
        },
        {
            name: '立法资料',
            type: 'protocol'
        },
        {
            name: '立法计划',
            type: 'legislation'
        },
        {
            name: '中外条约',
            type: 'eagn'
        },
        {
            name: '外国法规',
            type: 'iel'
        },
        {
            name: '香港法规',
            type: 'hkd'
        },
        {
            name: '澳门法规',
            type: 'aom'
        },
        {
            name: '台湾地区法规',
            type: 'twd'
        },
        ],
        case: [{
            name: '案例与裁判文书',
            type: 'pfnl',
            chart: true,

        }, {
            name: '裁判规则',
            type: 'payz'
        }, {
            name: '案例报道',
            type: 'pal'
        }, {
            name: '仲裁案例',
            type: 'atr'
        }
        ],
    },
    blockedOut: '', //当前检索方式 eg：标题（title）全文（structuredContent）
    tagJson: [], //检索条件 
    /* 左侧聚力点击 */
    simple: [],
    /* 简单检索和结果中检索 */
    selPara: {
        'all': {
            "adv_type": "exact",
            "data_type": "tag",
            "relatetype": "or"
        },
        'input': {
            "adv_type": "fuzzy",
            "data_type": "text",
            "relatetype": "in"
        },
        'time': {
            "adv_type": "condition",
            "data_type": "daterange",
            "relatetype": "range"
        }
    },
    isCache: true,
    personInfo: null,
}

const mutations = {
    RESULT_SEARCH: (state, data) => {
        if (state.listJson['queryBaseReqs']) {
            state.listJson.queryBaseReqs.push(data)
        } else {
            state.listJson['queryBaseReqs'] = []
            state.listJson['queryBaseReqs'].push(data)
        }
    },
    CLEAR_RESULT_SEARCH: (state) => {
        if (state.listJson.queryBaseReqs) {
            state.listJson.queryBaseReqs = []
            delete state.listJson['queryBaseReqs']
        }
    },
    GET_NAV(state, navFirst) {
        state.navFirst = navFirst
        localStorage.setItem('navFirst', JSON.stringify(state.navFirst))
    },
    changeListJson(state, listJson) {
        state.listJson = listJson
    },
    SETACTIVEINDEX: (state, activeIndex) => {
        state.activeIndex = activeIndex
    },
    SETACTIVELISTTYPE: (state, activeListType) => {
        state.activeListType = activeListType
    },
    SETPERSONINFO: (state, personInfo) => {
        state.personInfo = personInfo;
    }
}

const actions = {
    setListJson({ state, commit }, data) {
        return new Promise((resolve, reject) => {
            const listJson = {
                ...state.listJson,
                ...data
            }
            commit('changeListJson', listJson)
            resolve()
        })
    },
    verification({ commit }, data) {
        return new Promise((resolve, reject) => {
            // const navFirst = [
            //     { "defaults": "chl", "name": "法律法规", "url": "law" },
            //     // { "defaults": "pfnl", "name": "司法案例", "url": "case" },
            //     // { "defaults": "qikan", "name": "法学期刊", "url": "qikan" },
            //     // { "defaults": "lawfirmarticles", "name": "律所实务", "url": "lawfirmarticles" },
            //     // { "defaults": "specialtopic", "name": "专题参考", "url": "specialtopic" }
            // ]
            // commit('GET_NAV', navFirst);
            // resolve(navFirst)
            permission(data).then(res => {
                if (res.success) {
                    const data = res.data;
                    commit('GET_NAV', data);
                    resolve(data)
                }
            })
        }).catch(err => {
            console.log('err', err)
        })
    },
    LOGOUT({ commit }) {
        var accessToken = localStorage.getItem('accessToken')
        layOut({ access_token: accessToken }).then(res => {
           // router.push({ name: 'login' })
            localStorage.clear()
        })
    },
    changeIndex({ state, commit }, data) {
        return new Promise((resolve, reject) => {
            commit('SETACTIVEINDEX', data.defaults)
            resolve()

        })
    },
    changeListType({ state, commit }, data) {
        return new Promise((resolve, reject) => {
            commit('SETACTIVELISTTYPE', data.url)
            resolve()

        })
    },
    getUserInfo({ state, commit }, data) {
        return new Promise((resolve, reject) => {
            userInfo().then(res => {
                if (res.success) {
                    commit('SETPERSONINFO', res.result)
                    resolve(res.result)
                }
            })
        })
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}
