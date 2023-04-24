<template>
  <ul class="nav-wrap" v-if="navSecond[activeListType]">
    <li
      v-for="(item, key) in navSecond[activeListType]"
      :key="key"
      :class="{ current: item.type === activeIndex }"
      @click="changeIndex(item)"
    >
      {{ item.name }}
    </li>
  </ul>
</template>
<script>
import { mapState,mapGetters } from "vuex";
import request from "@/components/mixins/index.js";
import { content_list_page } from "@/utils/listpage";
export default {
  mixins: [request],
  computed: {
    ...mapGetters(["navSecond", "activeIndex", "activeListType"]),
    ...mapState({
      store: "store",
    }),
  },
  
  data() {
    return {};
  },
  methods: {
    changeIndex(item) {
      // this.store.tagJson = [];
      this.store.tagJson = this.store.tagJson.filter(item=>{
        return item.is_simple_search||item.is_result_search
      })
      this.$store.dispatch("store/changeIndex", {
        defaults: item.type,
      });
      this.getMergeData({
          index:item.type,
          groupByIndex:0,
          orderByIndex:0,
          keyValues:[],
          indexOfGroup:0,
          size:content_list_page(0,item.type),
          page:1,
          displayHomePageFlag:false,
          scope:this.listData['搜索']['默 认']||this.listData['搜索']['标 题']
      })
    },
  },
};
</script>
<style scoped lang="less">
.nav-wrap {
  display: flex;
  height: 0.4rem;
  line-height: 0.4rem;
  overflow: scroll;
  color: #000;
  background: #fff;
  li {
    text-align: center;
    padding: 0 0.1rem;
    -ms-flex-negative: 0;
    flex-shrink: 0;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    opacity: 0.7;
    position: relative;
    font-size: 0.14rem;
    color: #000;
  }
  li.current {
    color: #158ec6;
  }
}
</style>