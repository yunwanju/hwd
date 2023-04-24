<template>
  <div class="container">
    <!-- 文字状态-->
    <template v-if="!store.changeChart">
      <div class="grid-right">
        <ListContent :mainList.sync="search.maincontent[0]"></ListContent>
      </div>
      <div style="clear: both"></div>
    </template>
  </div>
</template>
<script>
import ListContent from "./list-content";
import { mapState } from "vuex";
import { content_list_page } from "@/utils/listpage";
export default {
  name: "index",
  components: {
    ListContent,
  },
  data() {
    return {};
  },
  methods: {},
  computed: {
    ...mapState({
      search: "search",
      store: "store",
      list_data: "list",
    }),
    mapdata() {
      let data = this.list_data.list_data;
      let datas =
        data[this.$route.meta.type][this.store.listJson.index] ||
        data[this.$route.meta.type];
      return datas;
    },
  },
  created() {
    var index = this.$route.meta.defaults;
    this.store.listJson.menu = this.$route.meta.type;
    /* 从正文跳到列表页 判断类型 是否发请求 */
    var flag =
      this.$route.query.keyCode ||
      this.$route.query.classCodeKey ||
      this.store.tagJson.length > 0 ||
      this.$route.query.record;
    if (!flag) {
      if (this.$route.query.keyword || this.$route.query.centerkeyword) {
        //表示从全库检索中跳转过来的
        let value = this.search.headerQueryBaseReqs;
        if (this.$route.query.centerkeyword) {
          //从个人中心携带关键词跳转过来的处理
          this.store.listJson.keyword = this.$route.query.centerkeyword;
          this.store.listJson.inquiryMode = 0;
          this.store.listJson.displayTongyinFlag = true;
          this.store.listJson.keyValues = [];
          this.store.listJson.scope = "Default";
        } else {
          this.store.listJson.keyword = value.fieldValue;
          this.store.listJson.scope = value.fieldName;
        }
        this.store.listJson.inquiryMode = value.fieldInquiryMode;
        this.store.listJson.synonymSearch = value.fieldSynonymSearch;
        let name;
        for (var i in this.mapdata["搜索"]) {
          if (this.mapdata["搜索"][i] == value.fieldName) {
            name = i;
          } else {
            name = "标题";
          }
        }
        /* 简单检索增加检索条件 */
        var theTag = {
          scope: value.fieldName ? value.fieldName : "Default",
          name: this.$route.query.centerkeyword ? this.mapdata["默认"] : name, //如果是个人中心过来的话那么走标题加全文搜索
          namelist: this.$route.query.centerkeyword
            ? [this.$route.query.centerkeyword]
            : [this.$route.query.keyword],
          fieldname: "",
          relatetype: "or",
          iside: false,
          is_simple_search: true,
          synonymSearch: value.fieldSynonymSearch,
        };
        this.store.tagJson = [];
        this.store.listJson.queryBaseReqs = [];
        this.store.tagJson.push(theTag);
      } else {
        this.store.listJson.scope = Object.values(this.mapdata["搜索"])[0];
      }

      this.store.listJson.size = content_list_page(
        this.store.listJson.groupByIndex,
        this.store.listJson.index
      );
      this.$store.dispatch("search/search", this.store.listJson);
    }
    if (this.$route.query.nocontent) {
      window.location.hash = this.$route.path;
    }
  },
};
</script>
