<template>
  <div class="block">
    <!--标题-->
    <div class="list-title list_dropdown">
      <h4>
        <span>{{ countNumber }}.</span>
        <router-link
          v-if="store.listJson.keyword"
          :to="
            '/detail/' +
            activeIndex +
            '/' +
            item[mapdata['唯一标识']] +
            '?keysearchword=' +
            store.listJson.keyword
          "
          v-html="item[mapdata['标题']]"
        ></router-link>
        <router-link
          v-else
          :to="
            '/detail/' + activeIndex + '/' + item[mapdata['唯一标识']]
          "
          v-html="item[mapdata['标题']]"
        ></router-link>
        <template v-if="activeIndex === 'chl' || activeIndex === 'lar'">
          <template v-if="item.TimelinessDic">
            
            <span v-if="item.TimelinessDic == '尚未生效'" class="havent-valid">{{ item.TimelinessDic }}</span>
            <span
              v-else-if="item.TimelinessDic == '已被修改'"
              class="havent-valid havent-valid1"
            >{{ item.TimelinessDic }}</span>
            <span
              v-else-if="item.TimelinessDic == '失效'"
              class="havent-valid havent-valid2"
            >{{ item.TimelinessDic }}</span>
            <span
              v-else-if="item.TimelinessDic == '部分失效'"
              class="havent-valid havent-valid3"
            >{{ item.TimelinessDic }}</span>
            <span
              v-else-if="item.TimelinessDic == '现行有效'"
              class="havent-valid havent-valid4"
            >{{ item.TimelinessDic }}</span>
            
          </template>
        </template>
      </h4>
    </div>
    <!-- 中间内容展示 -->
    <div class="related-info">
      <template v-for="(value, index) in filterCenter(mapdata.listItem)">
        <span v-html="filterValue(item[value.key], value)" :key="index + 'rel'"></span>
        <span v-if="decide(value.key, index)" :key="index + 'dec'">/</span>
      </template>
    </div>
    <!-- 全文状态下的内容-->
    <div class="search-hit-box" v-if="item.highLighter" style="padding: 10px">
      <div class="keywords">
        命中次数：
        <span>{{ store.listJson.keyword }}</span>
        <span style="color: #f72e2e">({{ item.hitTimes }})</span>
      </div>
      <div v-if="listType && listId == indexJ" style="overflow: hidden">
        <template v-for="(item1, index1) in item.highLighter">
          <p v-if="index1 < 4" :key="index1 + 'sub'">
            <router-link
              v-if="store.listJson.keyword"
              :to="
                '/detail/' +
                store.listJson.index +
                '/' +
                item[mapdata['唯一标识']] +
                '?keysearchword=' +
                store.listJson.keyword
              "
              v-html="item1"
            ></router-link>
            <router-link
              v-else
              :to="
                '/detail/' +
                store.listJson.index +
                '/' +
                item[mapdata['唯一标识']]
              "
              v-html="item1"
            ></router-link>
          </p>
          <p v-if="index1 == 4">
            <span>......</span>
          </p>
        </template>
        <div class="more-hit">
          <a
            class="btn"
            @click="
            listType = false;
            listPage = 0;
            "
          >收起命中</a>
        </div>
      </div>
      <div v-if="!listType" style="overflow: hidden">
        <span class="unexpanded" style="border-bottom: none">
          <router-link
            v-if="store.listJson.keyword"
            :to="
              '/detail/' +
              store.listJson.index +
              '/' +
              item[mapdata['唯一标识']] +
              '?keysearchword=' +
              store.listJson.keyword
            "
            v-html="item.highLighter[0]"
          ></router-link>
          <router-link
            v-else
            :to="
              '/detail/' +
              store.listJson.index +
              '/' +
              item[mapdata['唯一标识']]
            "
            v-html="item.highLighter[0]"
          ></router-link>
        </span>
        <div class="more-hit" v-if="item.highLighter.length > 1">
          <a
            class="btn"
            @click="
            listId = indexJ;
            listType = true;
            "
          >展开命中</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import request from '@/components/mixins/index'
export default {
  mixins: [request],
  props: ["item", "indexJ", "label"],
  data() {
    return {
      downForm: {
        downloadType: "1",
        keepFields: false,
        needKeepRightLenovo: false,
        needRiskpoint: false,
      },
      offIcon: false,
      dialogVisible: false,
      downType: { 1: ".doc" },
      Off: false,
      listId: "",
      offData: {},
      listType: false,
      listPage: 0,
      listSize: 5,
    };
  },
  computed: {
    countNumber() {
      return this.indexJ + 1;
    },
    ...mapState({
      list_data: "list",
      store: "store",
    }),
    ...mapGetters(["activeListType", "activeIndex"]),
    mapdata() {
      let data = this.list_data.list_data;
      let datas = data[this.activeListType][this.activeIndex] || data[this.activeListType]
      return datas;
    },
    IsShowFulltext() {
      return (
        this.store.tagJson.some(
          (item) =>
            item.scope &&
            (item.scope == "structuredContent" || item.scope == "Default")
        ) ||
        (this.store.listJson.tagJson.length > 0 &&
          this.store.listJson.tagJson.some(
            (item) =>
              item.fieldName &&
              (item.fieldName == "structuredContent" ||
                item.fieldName == "Default")
          ))
      );
    },
  },
  methods: {
    /* 判断下个是否有值 是返回true 否判断下下一个  */
    nextJudge(Item, Index, data) {
      let nextFlag = false;
      if (this.item[Item.key]) {
        //下个值存在直接返回true
        return (nextFlag = true);
      } else {
        //下个值不存在 继续查询下下个值
        let NextItem = data[Index + 1];
        if (Index < data.length - 1) {
          return this.nextJudge(NextItem, Index + 1, data);
        }
      }
      return nextFlag;
    },
    /* 过滤字段不能为空数组 */
    filtersArr(value) {
      value = value.filter((item) => {
        return item != "";
      });
      return value;
    },
    /* 中间行字段 判断数据类型返回 */
    filterValue(value, item) {
      if (Array.isArray(value)) {
        //数据返回单层数组
        if (!this.filtersArr(value).length) {
          return;
        }
        if (item.lastValue) {
          //单层数组取最后一个值
          return value[value.length - 1];
        } else {
          var str = "";
          value.forEach((val) => {
            if (Array.isArray(val)) {
              //数据返回二层数组
              str += val.join(";") + ";";
            } else {
              str += val + ";";
            }
          });
          str = str.slice(0, str.length - 1);
          return str;
        }
      } else if (typeof value === "string" || typeof value == "number") {
        //字符串类型和数字类型 字段增加解释说明
        value = item.frontValue
          ? item.frontValue +
          "&nbsp;" +
          value +
          (item.behindValue ? "&nbsp;" + item.behindValue : "")
          : item.behindValue
            ? value + "&nbsp;" + item.behindValue
            : value;
      }
      return value;
    },
    filterCenter(value) {
      var obj = value;
      if (
        this.mapdata.labelListItem &&
        this.label &&
        this.mapdata.labelListItem[this.label]
      ) {
        obj = {};
        obj = this.mapdata.labelListItem[this.label];
      }
      return obj;
    },
    /* 通过判断上下数据是否为空来添加斜杠*/
    decide(value, index) {
      var flag = true;
      var data = this.filterCenter(this.mapdata.listItem); //中间行配置文件
      var tableData = this.item; //后台返回列表数据
      if (data.length - 1 === index) {
        //最后一个数据不加斜杠
        return (flag = false);
      }
      /* 判断下一个值是否存在*/
      if (tableData[value]) {
        var next = index + 1;
        var nextItem = data[next];
        return (flag = this.nextJudge(nextItem, next, data));
      } else {
        return (flag = false);
      }
    },
    /* 判断下个是否有值 是返回true 否判断下下一个  */
    nextJudge(Item, Index, data) {
      let nextFlag = false;
      if (this.item[Item.key]) {
        //下个值存在直接返回true
        return (nextFlag = true);
      } else {
        //下个值不存在 继续查询下下个值
        let NextItem = data[Index + 1];
        if (Index < data.length - 1) {
          return this.nextJudge(NextItem, Index + 1, data);
        }
      }
      return nextFlag;
    },
  },
};
</script>

<style scoped lang="less">
@import "../assets/css/layout/list-detail.less";

.havent-valid {
  font-size: 0.12rem;
  color: #fff;
  line-height: 0.16rem;
  padding: 0 0.03rem;
  background: #deb925;
  margin-left: 0.04rem;
  display: inline-block;
}
.havent-valid1{
  background: #77a88a;
}
.havent-valid2{
  background: #d1d1d1;
}
.havent-valid3{
  background: #7493af;
}
.havent-valid4{
  background: #33b35a;
}
</style>
