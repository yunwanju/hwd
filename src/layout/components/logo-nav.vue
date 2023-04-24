<template>
  <div class="logo-nav">
    <div class="container">
      <div class="logo-head">
        <div class="logobox">
          <!-- <a href=""><div class="logo"></div></a> -->
          <div class="back" @click="back">首页</div>
        </div>
      </div>
      <div style="height:0.46rem;"></div>

      <ul class="nav-wrap" v-if="!$route.meta.noshow">
        <li
          v-for="(item, index) in navFirst"
          :key="index"
          :class="{ current: item.url == activeListType }"
          @click="hrefOther(item)"
        >{{ item.name }}</li>
      </ul>
    </div>
  </div>
</template>
<script>
import { mapState, mapGetters } from "vuex";
import { content_list_page } from "@/utils/listpage";
import Bus from "@/utils/eventBus.js";
import request from "@/components/mixins/index.js";
import {goRobotHome} from '@/utils/util.js'
export default {
  mixins: [request],
  name: "logoNav",
  components: {},
  data() {
    return {
      dialogVisible: false,
      isShowFw: false,
      isShowSys: false,
      title: "",
    };
  },
  computed: {
    ...mapState({
      store: "store",
    }),
    ...mapGetters(["navFirst", "activeListType","personInfo"]),
    adress() {
      let type = "";
      type = this.$route.meta.defaults;
      return type;
    },

  },
  methods: {
    back() {
      this.$router.push({ path: '/' })
      return
      // this.$router.back();
      goRobotHome()
      this.$store.dispatch("store/changeIndex", {
        defaults: this.$route.params.type,
      });
    },
    loginOut(){
      localStorage.clear();
      this.store.personInfo = null;
      console.log(this.store.personInfo);
    },
    noHomePage(value) {
      if (value) {
        this.$router.push({
          path: this.$route.path,
          query: {
            nocontent: "nocontent",
          },
        });
      } else {
        window.location.hash = this.$route.path;
      }
    },
    async hrefOther(item) {
      this.store.tagJson = [];
      await this.$store.dispatch("store/changeIndex", item);
      await this.$store.dispatch("store/changeListType", item);
      const library = ['chl', 'pfnl', 'gac']
      this.getMergeData({
        index: item.defaults,
        menu: item.url,
        groupByIndex: item.url === 'specialtopic' ? 2 : 0,
        orderByIndex: 0,
        keyValues: [],
        indexOfGroup: 0,
        page: 1,
        keyword: '',
        queryBaseReqs:[],
        size: content_list_page(0, item.defaults),
        displayHomePageFlag: library.indexOf(item.defaults) > -1,
        scope: this.listData["搜索"]["默 认"] || this.listData["搜索"]["标 题"],
      });
    },
    layOut() {
      this.$store.dispatch("store/LOGOUT");
    },
  },
  beforeDestroy() {
    Bus.$off("detail_ajax", this.handle);
    Bus.$off("content_ajax", this.handle);
  },
};
</script>
<style scoped lang="less">
.logo-head {
  font-size: 0.427rem;
  color: #fff;
  background: #158ec6;
  padding: 0 0.1rem;
  height: 0.46rem;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 10;
  .logobox {
    line-height: 0.46rem;
    .logo{
      float: left;
    }
  }
}
.back {
  color: #fff;
  float: right;
  font-size: 0.16rem;
  margin-left: 0.1rem
}
@import "../../assets/css/layout/logo-nav.less";
</style>
