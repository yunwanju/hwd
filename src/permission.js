import router from './router'
import store from './vuex'
import { Toast } from 'vant';
router.beforeEach(async (to, from, next) => {
  if (localStorage.getItem('accessToken')) {
    let toast = Toast.loading({
      message: "加载中...",
      forbidClick: true,
    });
    await store.dispatch('store/getUserInfo').then(date => {
      toast.clear();
    })
    next()
  }
  //await store.dispatch('store/verification')
  next()
})
