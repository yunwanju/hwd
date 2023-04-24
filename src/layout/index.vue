<template>
  <div class="app-wrapper">
    <!-- <van-sticky> -->
    <LogoNav></LogoNav>
    <!-- </van-sticky> -->
    <template>
      <van-popup
        v-model="showPop"
        position="right"
        :style="{ width: '100%', height: '100%' }"
        v-if="!$route.meta.noshow"
        @close="closePopup"
      >
      <ColumnSearch v-if="!$route.meta.noshow" @closePop="showPop = false"></ColumnSearch>
      </van-popup>
      <van-search
        placeholder="请输入搜索关键词"
        disabled
        readonly
        shape="round"
        v-if="!$route.meta.noshow"
        @click="showPop = true"
      />
      <Library v-if="!$route.meta.noshow"></Library>
      <togole
        v-if="
          $route.meta.type == 'hndwlegalopinion' ||
          $route.meta.type == 'hndwlegalopinionmodel'
        "
      ></togole>
      <Wrap v-if="store.tagJson.length > 0 && !$route.meta.noWrap"></Wrap>
    </template>
    <AppMain></AppMain>
  </div>
</template>

<script>
import LogoNav from "./components/logo-nav";
import ColumnSearch from "./components/column-search";
import Wrap from "./components/search-condition-wrap";
import AppMain from "./components/AppMain";
import noContent from "@/views/noContent/index.vue";
import Library from './components/library.vue'
import togole from "./components/togole";
import { mapState } from "vuex";
export default {
  components: {
    LogoNav /* 头部 */,
    ColumnSearch /* 搜索 */,
    Wrap /* 检索条件 */,
    AppMain /* 中间内容 走二级路由 */,
    noContent /* 无结果页面 */,
    togole,
    Library
  },
  data() {
    return {
      showPop: false
    };
  },
  computed: {
    ...mapState({
      store: "store",
    }),
  },
  created() {
    if (this.$route.query.nocontent == "nocontent") {
      this.$router.push({
        path: this.$route.path,
      });
    }
  },
  methods:{
    closePopup(){
      this.showPop = false
    }
  }
};
</script>

<style scoped>
</style>
