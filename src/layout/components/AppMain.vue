<template>
  <section class="app-main">
    <div class="router-container">
      <transition name="fade-transform" mode="out-in">
        <keep-alive>
          <router-view v-wechat-title="$route.meta.heading"></router-view>
        </keep-alive>
      </transition>
    </div>
  </section>
</template>

<script>
import { mapState } from "vuex";
import { content_list_page } from "@/utils/listpage";
export default {
  data() {
    return {};
  },
  computed: {
    ...mapState({
      store: "store",
      search: "search",
    }),
  },
  watch: {
    $route(to, from) {
      this.store.listJson = {};
      this.store.listJson = {
        scope: "Default",
        sort: "date",
        orderByIndex: 0,
        groupByIndex: 0,
        synonymSearch: true,
        menu: this.$route.meta.type,
        page: 1,
        size: 10,
        index: this.$route.meta.defaults,
        keyword: "",
        group: true,
        keyValues: [],
        indexOfGroup: 0,
        queryBaseReqs: [],
        tagJson: [],
        displayHomePageFlag: false,
      };
      this.store.tagJson = []; /* 清除检索条件*/
      if (this.$route.query.type != "adv") {
        this.store.listJson.keyword = sessionStorage.listJson;
      } else {
        this.store.listJson.keyword = "";
      }
      this.store.listJson.size = content_list_page(
        this.store.listJson.groupByIndex,
        this.store.listJson.index
      );
    },
  },
  mounted() {
    if (this.$route.query.type == "adv" && this.$route.query.lib) {
      this.store.listJson.index = this.$route.query.lib;
    }
  },
};
</script>
