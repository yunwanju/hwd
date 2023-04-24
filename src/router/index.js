import Vue from 'vue';
import store from '../vuex'
import VueRouter from 'vue-router';
import Layout from '@/layout/index';

/*解决控制台报[NavigationDuplicated {_name: "NavigationDuplicated", name: "NavigationDuplicated"}]。
原因是Vue-router在3.1之后把$router.push()方法改为了Promise。
所以假如没有回调函数，错误信息就会交给全局的路由错误处理，因此就会报上述的错误。*/
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
Vue.use(VueRouter)

/*
  路由的配置项
  meta{
    title:'子库名',
    type:'类型',当前属于那个大库
    heading:'标题',
    searchName:'检索栏目名称 只填写最大的库名'
    url:'地址',
    defaults 切换头部栏目 search接口 给库的默认值
    show_nav 是否显示二级导航,
    noshow:不显示搜索组件 比如详情页
    noCache: true如果设置为true，则不会被 <keep-alive> 缓存(默认 false)
    requireAuth:是否需要登录
  }
 */
const routes = [{
  path: '/change',
  component: () => import('@/views/index'),
  name: "change",
},
{
  path: '*',
  component: Layout,
  redirect: '/regulation'
},
{
  path: '/404',
  component: () => import('@/views/errorPage/404'),
  name: 404,
  meta: {
    type: '404'
  }
},
{
  path: '/401',
  component: () => import('@/views/errorPage/401'),
  name: 401,
  meta: {
    type: '401'
  }
},
// {
//   path: '/login',
//   name: 'login',
//   component: () => import('@/views/logins/index'),
//   meta: {
//     heading: '登录',
//     requireAuth: false,
//     noshow: true,
//   }
// },
{
  path: '/',
  component: Layout,
  children: [{
    path: '/',
    component: () => import('@/views/regulations/index'),
    name: 'law',
    meta: {
      show_nav: false,
      type: 'law',
      defaults: 'chl',
      searchName: '法律法规',
      heading: '法律法规',
      requireAuth: true,
      keepAlive:true
    }
  }]
},
{
  path: '/case',
  component: Layout,
  children: [{
    path: '/',
    component: () => import('@/views/regulations/index'),
    name: 'case',
    meta: {
      show_nav: false,
      type: 'case',
      defaults: 'pfnl',
      searchName: '司法案例',
      heading: '司法案例',
      requireAuth: true,
    }
  }]
},
{
  path: '/detail/:type/:gid',
  component: Layout,
  children: [{
    path: '/',
    component: () => import('@/views/details/index'),
    name: 'detail',
    meta: {
      heading: '详情',
      noshow: true,
      type: 'detail',
      requireAuth: true,
      keepAlive:false
    }
  }]
}
]
const router = new VueRouter({
  // mode: 'history',
  routes
})

// router.beforeEach((to, from, next) => {
//   if (to.query.token) { //证明是从法务机器人跳转过来
//     let login_token = to.query.token ? to.query.token : "";
//     if (login_token) { //证明是从个人中心携带token登录
//       localStorage.setItem("accessToken", login_token);
//     } else {
//       next()
//     }
//   } else {
//     if (from.meta.keepAlive) {
//       const $content = document.querySelector('#app');
//       const scrollTop = $content ? $content.scrollTop : 0;
//       from.meta.scrollTop = scrollTop;
//     }
//     next()
//   }
// })
export default router
