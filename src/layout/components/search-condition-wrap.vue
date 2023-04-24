<template>
  <div class="search-condition-wrap">
    <van-tag
      v-for="(item, index) in wrapping"
      :key="index"
      round
      closeable
      size="medium"
      @close="changeTagJson(index, item)"
      style="flex-shrink: 0; margin-right: 0.1rem"
    >
      {{ item.name }}:{{ item.namelist[0] }}</van-tag
    >
  </div>
</template>
<script>
import { mapState } from "vuex";
import { content_list_page } from "@/utils/listpage";
import request from '@/components/mixins/index'
export default {
  mixins:[request],
  name: "wrap",
  components: {},
  data() {
    return {};
  },
  computed: {
    ...mapState({
      store: "store",
      sidebarbox: (search) => search.search.sidebar,
      list_data: "list",
    }),
    wrapping() {
      var wrap = this.store.tagJson;
      return wrap;
    },
    mapdata() {
      let data = this.list_data.list_data;
      let datas =
        data[this.activeListType][this.activeIndex] ||
        data[this.activeListType];
      return datas;
    },
  },
  methods: {
    changeTagJson(i, item) {
      /* 判断当前是否有结果 */
      if (this.$route.query.nocontent == "nocontent") {
        this.$router.push({ path: this.$route.path });
      }
      /* 简单检索的删除 */
      if (item.is_simple_search) {
        this.store.listJson.keyword = "";
        /* 删除简单检索 切换排序*/
        this.store.listJson.orderByIndex = 0;
      } else if (item.is_result_search) {
        /* 结果中检索的过滤 */
        this.store.listJson.queryBaseReqs = this.store.listJson.queryBaseReqs.filter(
          (value) =>
            value.fieldValue != item.namelist[0] &&
            value.fieldName != this.mapdata["搜索"][item.name]
        );
      }
      this.store.listJson.inquiryMode = 0;
      this.store.tagJson.splice(i, 1);
      var CodeKey = [];
      var tagJson = this.store.tagJson;
      for (var i = 0; i < tagJson.length; i++) {
        if (tagJson[i].iside) {
          CodeKey.push({
            key: tagJson[i].fieldname,
            value: tagJson[i].itemlist[0],
          });
        }
      }
      if (this.store.tagJson.length == 0) {
        this.store.Result = false;
        var index = this.store.listJson.index;
        this.store.listJson.scope = Object.values(this.mapdata["搜索"])[0];
        /* 切换分组状态 */
        if (this.mapdata["分组"] == item.fieldname) {
          this.store.listJson.groupByIndex = 2;
        } else {
          this.store.listJson.groupByIndex = 0;
          this.store.listJson.indexOfGroup = 0;
        }
      }
      this.store.listJson.size = content_list_page(
        this.store.listJson.groupByIndex,
        this.store.listJson.index
      );
      this.store.listJson.keyValues = CodeKey;
      this.store.listJson.page = 1;
      /* 判断 是否发起检索 */
      if (
        this.store.Result &&
        this.mapdata["搜索"][this.store.tagJson[0].name]
      ) {
        var listJson = JSON.parse(JSON.stringify(this.store.listJson));
        listJson.scope = this.mapdata["搜索"][this.store.tagJson[0].name];
        this.$store.dispatch("search/search", listJson);
      } else {
        this.$store.dispatch("search/search", this.store.listJson);
      }
    },
    clearTagJson() {
      this.store.tagJson = [];
      this.store.listJson.keyValues = [];
      this.store.listJson.keyword = "";
      this.store.listJson.queryBaseReqs = [];
      this.store.listJson.orderByIndex = 0;
      this.store.listJson.groupByIndex = 0;
      this.store.listJson.indexOfGroup = 0;
      this.store.listJson.page = 1;
      this.store.listJson.inquiryMode = 0;
      this.store.Result = false;
      this.store.listJson.scope = Object.values(this.mapdata["搜索"])[0];
      if (this.$route.query.nocontent == "nocontent") {
        this.$router.push({
          path: this.$route.path,
        });
      }
      this.$store.dispatch("search/search", this.store.listJson);
    },
  },
};
</script>
<style scoped>
.search-condition-wrap {
  padding: 0.08rem 0.15rem;
  border-bottom: 0.01rem solid #eee;
  overflow-x: auto;
  height: 0.42rem;
  box-sizing: border-box;
  display: flex;
}
</style>
