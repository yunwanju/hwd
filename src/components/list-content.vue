<template>
  <div class="list-wrap">
    <div class="l-search">
      <div :class="['menus', groupWord[activeIndex] ? '' : 'end']">
        <div class="menus-item" style="float: left">
          <div v-if="groupWord[activeIndex]">
            <span>分组：</span>
            <div class="inline">
              <van-dropdown-menu active-color="#158ec6">
                <van-dropdown-item
                  v-model="store.listJson.groupByIndex"
                  :options="groupWord[activeIndex]"
                  @change="changeGrade"
                />
              </van-dropdown-menu>
            </div>
          </div>
        </div>
        <div class="menus-item">
          <div v-if="reorder">
            <span ref="asd">排序：</span>
            <div class="inline">
              <van-dropdown-menu active-color="#158ec6">
                <van-dropdown-item
                  v-model="store.listJson.orderByIndex"
                  :options="reorderArr"
                  @change="changeOrderByIndex"
                />
              </van-dropdown-menu>
            </div>
          </div>
        </div>
        <div class="menus-item" style="float: right" @click="openPopup">
          <span
            >筛选<van-icon name="filter-o" style="vertical-align: middle"
          /></span>
        </div>
      </div>
      <h3>
        总共检索到<span v-if="mainList">{{ mainList.total }}</span
        >篇
      </h3>
    </div>
    <van-list
      v-model="loading"
      :error.sync="error"
      error-text="请求失败，点击重新加载"
      @load="listLoad"
      :immediate-check="false"
      :finished="finished"
    >
      <template v-if="mainList && mainList.group && mainList.group.length > 0">
        <div v-for="(item, i) in mainList.group" :key="i" class="list-box">
          <div class="grouping-title" v-if="mainList.group.length > 0">
            <span>{{ item.label }}（{{ item.total }}）</span>
            <a
              groupvalue="XA01"
              class="more"
              @click="
                addMoreTag(item.label, item.field, item.value, mainList.name)
              "
              >更多</a
            >
          </div>
          <List
            v-if="item.data.length !== 0"
            :type="mainList.index"
            :num="i"
            :list.sync="item.data"
            :label="item.label"
          ></List>
        </div>
      </template>
      <template v-else-if="mainList && mainList.data.length > 0">
        <List
          num="0"
          :type="mainList.index"
          :list.sync="mainList['data']"
          :label="mainList['data'].name"
        ></List>
      </template>
    </van-list>
    <van-popup
      v-model="showPop"
      position="right"
      :style="{ width: '80%', height: '100%' }"
      @close="closePopup"
    >
      <ListSideBar
        :sidebar.sync="search.sidebar"
        @closePop="closePop"
      ></ListSideBar>
    </van-popup>
    <ListSideBar
      :sidebar.sync="search.sidebar"
      @closePop="closePop"
      ref="listSide"
      v-show="false"
    ></ListSideBar>
  </div>
</template>
<script>
import Bus from "@/utils/eventBus.js";
import { right_side_list } from "@/api/search.js";
import { mapState } from "vuex";
import List from "./list";
import { content_list_page } from "@/utils/listpage.js";
import ListSideBar from "./list-side-bar";
import request from "@/components/mixins/index.js";
import {getHubNamefromLib } from '@/utils/articleAnchor'
export default {
  mixins: [request],
  name: "ListContent",
  components: {
    List,
    ListSideBar,
  },
  props: ["mainList"],
  data() {
    return {
      options: [10, 20, 50, 100], //分页每页几条可选值
      downForm: {
        downloadType: "1",
        keepFields: false,
        needKeepRightLenovo: false,
        needRiskpoint: false,
      },
      selTime: false,
      selRank: false,
      groupWord: {
        chl: [
          { text: "效力级别", value: 0 },
          { text: "时效性", value: 1 },
          { text: "不分组", value: 2 },
        ],
        lar: [
          { text: "效力级别", value: 0 },
          { text: "时效性", value: 1 },
          { text: "不分组", value: 2 },
        ],
        pfnl: [
          { text: "参照级别", value: 0 },
          { text: "文书类型", value: 1 },
          { text: "法院级别", value: 3 },
          { text: "不分组", value: 2 },
        ],
        payz: [
          { text: "规则分类", value: 0 },
          { text: "不分组", value: 2 },
        ],
        gac: [
          { text: "案例分类", value: 0 },
          { text: "不分组", value: 2 },
        ],
        gdd: [
          { text: "分类", value: 0 },
          { text: "不分组", value: 2 },
        ],
      },
      loading: false,
      error: false,
      finished: false,
      showPop: false,
    };
  },
  created() {
    this.store.activeListType = this.$route.meta.type;
    this.store.activeIndex= this.$route.meta.defaults;
  },
  computed: {
    ...mapState({
      store: "store",
      search: "search",
      list_data: "list",
    }),
    mapdata() {
      let data = this.list_data.list_data;
      let datas =
        data[this.activeListType][this.activeIndex] ||
        data[this.activeListType];
      return datas;
    },
    /* 控制排序 */
    reorder() {
      if (this.mapdata["排序"]) {
        if (this.mapdata["排序"][5]) {
          if (this.store.Result) {
            this.mapdata["排序"][5].show = true;
          } else {
            this.mapdata["排序"][5].show = false;
          }
        }
        return this.mapdata["排序"];
      }
    },
    reorderArr() {
      let arr = [];
      const arr1 = Object.entries(this.reorder);
      arr1.forEach((item, index) => {
        if (item[1].show) {
          arr.push({ text: item[1].name, value: index });
        }
      });
      return arr;
    },

    Count() {
      return this.mainList.total > 2000 ? 2000 : this.mainList.total;
    },
  },
  mounted: function () {
    Bus.$on("content_ajax", (target) => {
      this.rightList(this.store.listJson);
    });
    this.$refs.listSide.init();
  },
  watch: {
    /* 监听分组变化 变成不分组状态 入参当前页数至少为10条*/
    "store.listJson.groupByIndex"(value) {
      if (value == 2) {
        this.store.listJson.size = 10;
      }
    },
    "search.listFinished"(value, oldValue) {
      if (value !== oldValue) {
        this.finished = false;
        this.loading = false;
      }
    },
    mainList: {
      handler(newData, oldData) {
        if (newData.groupTotal > 1) {
          this.store.listJson.indexOfGroup = 0;
        }
      },
    },
    // "$route.query.zhName": {
    //   handler(newData, oldData) {
    //     this.$refs.listSide.init();
    //   },
    // },
  },
  methods: {
    changeOrderByIndex(i) {
      this.store.listJson.page = 1;
      this.store.listJson.orderByIndex = i;
      this.store.listJson.indexOfGroup = 0;
      this.selTime = false;
      this.finished = false;
      this.loading = false;
      this.search.maincontent[0].data = [];
      this.$store.dispatch("search/rightList", this.store.listJson);
    },
    /* 更多*/
    addMoreTag(label, field, value, name) {
      var theTag = {
        adv_type: "exact",
        data_type: "tag",
        name: "文件属性",
        namelist: [label],
        fieldname: field,
        min: "",
        max: "",
        itemlist: [value],
        relatetype: "or",
      };
      var tagJson = this.store.tagJson;
      var obj = {};
      tagJson.forEach((item) => {
        if (item.fieldname) {
          this.$set(obj, item.fieldname, true);
        }
      });
      if (!obj[theTag.fieldname]) {
        tagJson.push(theTag);
      }
      this.store.tagJson = tagJson;
      var CodeKey = [];
      for (var i = 0; i < this.store.tagJson.length; i++) {
        if (
          !this.store.tagJson[i].is_simple_search &&
          !this.store.tagJson[i].is_result_search
        ) {
          CodeKey.push({
            key: this.store.tagJson[i].fieldname,
            value: this.store.tagJson[i].itemlist[0],
          });
        }
      }
      this.store.listJson.keyValues = CodeKey;
      this.store.listJson.groupByIndex = 2;
      this.store.listJson.page = 1;
      this.store.listJson.indexOfGroup = 0;
      this.finished = false;
      this.loading = false;
      this.$store.dispatch("search/search", this.store.listJson);
    },
    changeGrade(i) {
      if (this.groupWord[this.store.listJson.index] != "不分组") {
        this.store.listJson.indexOfGroup = 0;
      }
      this.store.listJson.page = 1;
      this.store.listJson.groupByIndex = i;
      this.finished = false;
      this.loading = false;
      this.store.listJson.size = content_list_page(
        i,
        this.store.listJson.index
      );
      this.selRank = false;
      this.search.maincontent[0].data = [];
      this.$store.dispatch("search/rightList", this.store.listJson);
    },
    listLoad() {
      this.store.listJson = {
        ...this.store.listJson,
        ...{
          index:this.activeIndex,
          menu:getHubNamefromLib(this.activeIndex)
        }
      }
      setTimeout(async () => {
        if (
          this.store.listJson.groupByIndex != 2 &&
          this.groupWord[this.activeIndex]
        ) {
          let index = this.search.maincontent[0].groupTotal;
          let indexOfGroup = this.search.maincontent[0].indexOfGroup;
          if (indexOfGroup >= index - 1) {
            console.log("停止加载，到底了");
            this.finished = true;
            return;
          }
          indexOfGroup = indexOfGroup + 1;
          this.store.listJson.indexOfGroup = indexOfGroup;
          await this.rightList(this.store.listJson);
        } else {

          let index = this.store.listJson.page;
          let total =
            this.search.maincontent[0].total > 2000
              ? 2000
              : this.search.maincontent[0].total;
          if (index >= total / 10) {
            console.log("停止加载，到底了");
            this.finished = true;
            return;
          }
          this.store.listJson.page = this.store.listJson.page + 1;
          this.store.listJson.size = 10;
          await new Promise((resolve, reject) => {
            right_side_list(this.store.listJson).then((res) => {
              this.search.maincontent[0].data.push(
                ...res.data.maincontent[0].data
              );
              this.loading = false;
            });
          });
        }
      }, 500);
    },
    rightList(data) {
      setTimeout(() => {
        right_side_list(data)
          .then((res) => {
            var obj = {};
            this.search.maincontent[0].group.forEach((item) => {
              this.$set(obj, item.label, true);
            });
            var data = res.data.maincontent[0].group;
            this.search.maincontent[0].indexOfGroup =
              res.data.maincontent[0].indexOfGroup;
            data.forEach((item) => {
              item.data.forEach((item1) => {
                if (item1) {
                  item1.selected = false;
                }
              });
              if (!obj[item.label]) {
                this.search.maincontent[0].group.push(item);
              }
            });
            this.loading = false;
          })
          .catch((Error) => {
            this.error = true;
            console.log(Error);
          });
      });
    },
    // 筛选打开弹窗
    openPopup() {
      this.showPop = true;
    },
    closePopup() {},
    closePop() {
      this.showPop = false;
    },
  },
};
</script>
<style scoped lang="less">
@import "../assets/css/layout/list-content.less";
</style>
