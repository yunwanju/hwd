<template>
  <div class="search-no-content container">
    <div class="col-wrap">
      <div class="col-wrap">
        <p>
          <i class="c-icon c-warning-s"></i>
          抱歉，在指定
          <span>检索条件</span
          >下，没有检索结果。请修改检索条件或者检索方式后，再次尝试。
        </p>
        <div class="other-info">
          <el-button
            type="primary"
            style="background: #006f6b; border: none"
            size="small"
            @click="back"
            >返回</el-button
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import Bus from "@/utils/eventBus";
import { content_list_page } from "@/utils/listpage";
export default {
  data() {
    return {};
  },
  computed: {
    ...mapState({
      store: "store",
    }),
  },
  methods: {
    back() {
      this.store.tagJson = []; //检索条件展示清空
      this.store.listJson.keyword = ""; //主检索输入框清空
      this.store.listJson.keyValues = []; //清空主检索左侧点击数据
      this.store.listJson.queryBaseReqs = []; //清空结果中检所数据
      this.store.listJson.scope = "Default"; //搜索左侧下拉给初始默认值
      this.store.listJson.orderByIndex = 0; //列表排序返回到默认值
      this.store.listJson.size = content_list_page(
        this.store.listJson.groupByIndex,
        this.store.listJson.index
      ); //返回判断 哪个库 是否分组 调用方法去返回每页几条或者每组几条数据
      this.store.Result = false; //
      Bus.$emit("getTarget", true); //
      if (
        this.$route.query.type == "adv" &&
        this.$route.query.nocontent == "nocontent"
      ) {
        this.store.listJson.tagJson = [];
        this.$router.push({
          path: this.$route.path,
          query: {
            type: "adv",
            lib: this.store.listJson.index,
          },
        });
      } else {
        this.$router.push({
          path: this.$route.path,
        });
      }
    },
  },
  updated() {
    if (this.$route.query.lib) {
      this.$route.meta.type = this.$route.query.lib;
    }
  },
};
</script>

<style scoped>
.search-no-content {
  background: #fff;
  text-align: center;
  padding: 71px 0;
  height: 400px;
}
.col-wrap {
  width: 680px;
  margin: 0 auto;
}
.col-wrap p {
  font-size: 16px;
  text-align: left;
  line-height: 26px;
  color: #666;
  padding-left: 40px;
  width: 634px;
  min-height: 40px;
  margin: 0 auto 20px;
}
.col-wrap p span {
  color: #ea2525;
}
.col-wrap .other-info {
  margin-bottom: 20px;
  line-height: 26px;
}
</style>
