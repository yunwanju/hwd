<template>
  <div class="crumbs" v-if="!$route.meta.noShowCrumbs">
    <div class="container clearfix">
      <div class="route_link fl">
        <a href="javascript:" @click="goHome">
          <span>首页 <i>&gt;</i> </span>
        </a>
        <template v-if="$route.path.indexOf('detail') > -1">
          <router-link
            v-for="(item, key, index) in navDetail"
            :key="index"
            :to="'/' + adress"
            >{{ item.title }} <i>&gt;</i>
          </router-link>
          <strong>全文阅览</strong>
        </template>
        <template v-if="$route.query.type == 'adv'">
          <router-link
            v-for="(item, index) in secNav"
            :key="index"
            :to="'/' + item.url"
          >
            <span @click="crumb(item)">{{ item.title }} <i>&gt;</i></span>
          </router-link>
          <strong>高级检索</strong>
        </template>
        <template v-if="$route.path.indexOf('AssociationMore') > -1">
          <router-link :to="'/' + $route.params.type">规章制度</router-link>
          <i>&gt;</i>
          <strong>{{ computedTitle }}</strong>
        </template>
        <template
          v-if="
            $route.path.indexOf('AssociationMore') <= -1 &&
            $route.query.type != 'adv'
          "
        >
          <strong v-for="(item, index) in secNav" :key="index">{{
            item.title
          }}</strong>
        </template>
        <template v-if="$route.path.indexOf('tutorial') > -1">
          <strong>检索教程</strong>
        </template>
        <template v-if="$route.path.indexOf('usercenter') > -1">
          <strong>用户管理中心</strong>
        </template>
      </div>
      <ul
        class="relation_nav"
        v-if="search.navbar && search.navbar.length > 0 && !isUserCenter"
      >
        <li class=""><a>| 相关结果：</a></li>
        <li class="" v-for="item in search.navbar" :key="item.index">
          <a @click="hrefOther(item)"
            >{{ item.title }}&nbsp;({{ item.total }})</a
          >
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import { getHubNamefromLib } from "@/utils/articleAnchor.js";
import { mapState, mapGetters } from "vuex";
import { mirrorData } from "@/utils/mirrorLenovoValue";
import {goRobotHome} from '@/utils/util.js'
export default {
  computed: {
    ...mapState({
      store: "store",
      search: "search",
      list_data: "list",
    }),
    ...mapGetters(["navFirst"]),
    mapdata() {
      let data = this.list_data.list_data;
      let datas =
        data[this.$route.meta.type][this.store.listJson.index] ||
        data[this.$route.meta.type];
      return datas;
    },
    adress() {
      return getHubNamefromLib(this.$route.params.type);
    },
    navDetail() {
      console.log(this.navFirst);
      return this.navFirst.filter((item) => item.path == this.adress);
    },
    secNav() {
      return this.navFirst.filter(
        (item) => item.path == this.$route.meta.type
      );
    },
    computedTitle() {
      if (this.$route.query.smallStyle !== "") {
        return mirrorData[this.$route.query.smallStyle];
      } else {
        return mirrorData[this.$route.query.bigStyle];
      }
    },
    isUserCenter() {
      let Path = this.$route.fullPath.split("/")[1];
      if (Path == "usercenter") {
        return true;
      }
      return false;
    },
    goHome(){
      this.$router.push({ path: '/' })
    //   goRobotHome();
    }
  },
  data() {
    return {};
  },
  methods: {
    /* 面包屑第二级点击时候触发 */
    crumb(item) {
      /* 判断当前 库是否是在第一级 否跳转到默认值*/
      if (item.name != this.store.listJson.index) {
        this.store.listJson.index = item.name;
      }
      /* 切换二级库名 删除检索条件 */
      if (
        this.store.listJson.keyValues &&
        this.store.listJson.keyValues.length > 0
      ) {
        this.store.tagJson = [];
        delete this.store.listJson.keyValues;
      }
      /* 判断当前是否是无结果页面 */
      if (this.$route.query.type == "nocontent") {
        this.store.listJson.keyword = "";
        this.store.tagJson = [];
      }
      this.store.listJson.tagJson = [];
      this.store.listJson.page = 1;
      this.$store.dispatch("search/search", this.store.listJson);
    },
    hrefOther(item) {
      if (this.$route.path != "/" + item.index) {
        this.$router.push({
          path: "/" + item.index + "",
          query: {
            keyword: this.store.listJson.keyword,
          },
        });
      }
    },
  },
};
</script>
<style scoped>
@import "../../assets/css/layout/crumbs.css";
.relation_nav {
  display: flex;
}
.relation_nav a {
  font-size: 14px;
  color: #218fc4;
  padding-right: 10px;
}
.relation_nav li:first-child a {
  padding: 0 15px;
  color: #333;
  cursor: default;
}
</style>
