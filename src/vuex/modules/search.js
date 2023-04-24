import {
  clustering,
  right_side_list,
  hitNumber
} from '@/api/search';
import {
  Toast
} from 'vant';
import store from './store'
const state = {
  sidebar: [],
  /* 左侧导航 */
  maincontent: [],
  /* 数据 */
  queryBaseReqs: [],
  headerQueryBaseReqs: {},
  navbar: {},
  isGroup: false,
  nocontent: false,
  listFinished: false,
};
const mutations = {
  SET_SIDEBAR: (state, sidebar) => {
    state.sidebar = sidebar;
  },
  SET_MAINCONTENT: (state, maincontent) => {
    state.maincontent = maincontent;
  },
  SET_QUERYBASE: (state, queryBaseReqs) => {
    state.queryBaseReqs = queryBaseReqs;
  },
  SET_NOCONTENT: (state, nocontent) => {
    state.nocontent = nocontent;
  },
  SET_NAVBAR: (state, navbar) => {
    state.navbar = navbar;
  },
  setHeaderQueryBaseReqs: (state, queryBaseReqs) => {
    state.headerQueryBaseReqs = queryBaseReqs;
  },
}
const actions = {
  /* 右侧列表数据 */
  rightList({
    commit,
    state
  }, data) {
    return new Promise((resolve, reject) => {
     
      right_side_list(data).then(res => {
        state.listFinished = !state.listFinished
        res.code == 9001 && resolve(9001);
        const {
          maincontent,
          queryBaseReqs,
        } = res.data;
        if (maincontent[0].group.length > 0) {
          commit('SET_NOCONTENT', false)
          state.queryBaseReqs = queryBaseReqs
          var data = maincontent[0].group;
        } else if (maincontent[0].data.length > 0) {
          commit('SET_NOCONTENT', false)
          state.queryBaseReqs = queryBaseReqs
          var data = maincontent[0].data;

        } else {
          commit('SET_NOCONTENT', true)
        }
        commit('SET_MAINCONTENT', maincontent);
        commit('SET_QUERYBASE', queryBaseReqs);
        // toast2.clear();

        resolve(res.data);
      }).catch(Error => {
        console.log(Error);
      })
    }).catch(function (reason, data) {
      console.log(reason)
    })
  },
  /* 左侧聚类 */
  cluster({
    commit,
    state
  }, data) {
    return new Promise((resolve, reject) => {
      let newdata = JSON.parse(JSON.stringify(data));
      delete newdata.displayHomePageFlag
      clustering(newdata).then(res => {
        const {
          sidebar
        } = res.data;
        commit('SET_SIDEBAR', sidebar);
        resolve(res.data);
      }).catch(Error => {
        console.log(Error);
      })
    }).catch(function (reason, data) {
      console.log(reason)
    })
  },
  /* 头部数量 */
  number({
    commit,
    state
  }, data) {
    return new Promise((resolve, reject) => {
      // var toast1 = Toast.loading({
      //   message: '加载中...',
      //   // forbidClick: true,
      // });
      let newdata = JSON.parse(JSON.stringify(data));
      // delete newdata.
      hitNumber(newdata).then(res => {
        const {
          navbar,
          queryBaseReqs
        } = res.data;
        commit('SET_NAVBAR', navbar)
        commit('setHeaderQueryBaseReqs', queryBaseReqs[0])
        // toast1.clear();
        resolve(res.data);
      }).catch(Error => {
        reject(Error)
        console.log(Error);
      })
    }).catch(function (reason, data) {
      console.log(reason)
    })
  },
  /* 左侧 列表 字库数据 */
  search({
    commit,
    state
  }, data) {
    var toast = Toast.loading({
      message: '加载中...',
      duration: 0,
      // forbidClick: true,
    });
    return Promise.all([actions.rightList({
      commit,
      state
    }, data), actions.cluster({
      commit,
      state
    }, data), actions.number({
      commit,
      state
    }, data)]).then((values) => {
      toast.clear();
    }).catch((e) => {
      toast.clear();
    })
  },
  /* 无左侧列表 */
  surplus({
    commit,
    state
  }, data) {
    return Promise.all([actions.rightList({
      commit,
      state
    }, data), actions.number({
      commit,
      state
    }, data)]).then((values) => { }).catch((e) => { })
  },
  /* 无头部数据 */
  uppers({
    commit,
    state
  }, data) {
    return Promise.all([actions.rightList({
      commit,
      state
    }, data), actions.cluster({
      commit,
      state
    }, data)]).then((values) => { }).catch((e) => { })
  }
};
export default {
  namespaced: true,
  state,
  mutations,
  actions
}
