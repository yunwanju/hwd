<template>
  <div class="list-side-bar">
    <h2 class="title">筛选</h2>
    <div v-for="(item, itemIndex) in sidebarbox" :key="itemIndex" class="block">
      <h4 class="filter-title">
        {{ item.label }}
      </h4>
      <div v-if="item.data.length > 0">
        <transition name="sub-comments">
          <ul class="filter-list" v-show="item.expand">
            <template v-for="(obj, index) in item.data">
              <li
                :key="index"
                :class="[
                  'level-' + obj.num,
                  obj.isSelect == 1 ? 'current' : '',
                ]"
              >
                <div
                  @click="
                    changeTagJson(
                      item.label,
                      item.value,
                      obj.label,
                      obj.value,
                      item,
                      index,
                      obj
                    )
                  "
                >
                  <i class="solidCircle"></i>
                  <span>{{ obj.label | shiftBizzear }}({{ obj.count }})</span>
                </div>
              </li>
            </template>
            <template v-for="(obj, index) in item.data">
              <li
                :key="index"
                v-if="!item.state && obj.count > 0"
                :class="'level-' + obj.num"
              >
                <a
                  @click="
                    changeTagJson(
                      item.label,
                      item.value,
                      obj.label,
                      obj.value,
                      item,
                      index,
                      obj
                    )
                  "
                >
                  <i class="solidCircle"></i>
                  <span>{{ obj.label | shiftBizzear }}({{ obj.count }})</span>
                </a>
              </li>
            </template>
          </ul>
        </transition>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
import filterConfig from "@/utils/leftSideBar.js";
import filterConfigbeiyong from "@/utils/feildData.js";
import { content_list_page } from "@/utils/listpage";
import Bus from "@/utils/eventBus";
import { getConditions } from "@/api/record"; //高级检索
export default {
  name: "ListSideBar",
  components: {},
  props: ["sidebar"],
  data() {
    return {
      sidebarbox: [],
      filterConfig: filterConfig,
      filterConfigbeiyong: filterConfigbeiyong,
      label: "",
      listJson: {},
      pageSize: 13,
      currentpage: 1,
    };
  },
  filters: {
    shiftBizzear: function (val) {
      if (val.indexOf("\u2605") > -1) {
        return val.replace(new RegExp("\u2605", "gi"), "");
      } else if (val.indexOf("\u25b2") > -1) {
        return val.replace(new RegExp("\u25b2", "gi"), "");
      } else if (val.indexOf("\u25c6") > -1) {
        return val.replace(new RegExp("\u25c6", "gi"), "");
      } else {
        return val;
      }
    },
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
        data[this.$route.meta.type][this.store.listJson.index] ||
        data[this.$route.meta.type];
      return datas;
    },
    Level_of_validity() {
      var level = {}
        if (this.store.listJson.keyValues.length) {
          var data = this.store.listJson.keyValues;
          data.forEach(item => {
            this.$set(level, item.key, true)
          })
        }
        return level
    },
  },
  methods: {
    init() {
      /* 正文页跳转到列表页检索条件 */
      this.$route.meta.scrollTop = 0;
      this.sidebar_data(this.sidebar);
      if (this.$route.query.classCodeKey) {
        let query = this.$route.query;
        let CodeKey = [];
        if (query.keyCode2) {
          CodeKey.push({
            key: query.classCodeKey2,
            value: query.keyCode2,
          });
        }
        this.store.listJson.index = query.lib;
        let belongName,
          belongName2,
          data = this.filterConfig[query.lib],
          databeiyong = this.filterConfigbeiyong[query.lib];
        for (let i = 0; i < databeiyong.length; i++) {
          if (
            query.classCodeKey2 &&
            query.classCodeKey2 == databeiyong[i].key
          ) {
            belongName2 = databeiyong[i].chn.slice(
              0,
              databeiyong[i].chn.length - 1
            );
          }
        }
        var Isleft = false,
          isSelect = false;
        /* 判断是否是在左侧聚类 */
        data.forEach((item) => {
          if (item.key == query.classCodeKey) {
            Isleft = true;
            belongName = item.chn.slice(0, item.chn.length - 1);
            CodeKey.push({
              key: query.classCodeKey,
              value: query.keyCode,
            });
          }
        });
        /* 判断是否在左侧下拉 */
        if (!Isleft) {
          var selectData = this.mapdata["搜索"];
          if (Object.values(selectData).indexOf(query.classCodeKey) > -1) {
            isSelect = true;
            this.store.listJson.scope = query.classCodeKey;
            var search_name = Object.values(selectData).indexOf(
              query.classCodeKey
            );
            belongName = Object.keys(selectData)[search_name];
            this.store.listJson.keyword = decodeURI(query.zhName);
            Bus.$emit("colunmSearch", this.store.listJson.keyword);
          }
        }
        /*处理最后一种不在左侧 也不在下拉 */
        if (!Isleft && !isSelect) {
          CodeKey.push({
            key: query.classCodeKey,
            value: query.keyCode,
          });
          for (let i = 0; i < databeiyong.length; i++) {
            if (databeiyong[i].key == query.classCodeKey) {
              belongName = databeiyong[i].chn.slice(
                0,
                databeiyong[i].chn.length - 1
              );
            }
          }
        }
        this.store.listJson.keyValues = CodeKey;
        /* 处理每组显示几条*/
        this.store.listJson.size = content_list_page(
          this.store.listJson.groupByIndex,
          this.store.listJson.index
        );
        this.$store.dispatch("search/search", this.store.listJson).then(() => {
          if (this.search.nocontent) {
            this.$router.push({
              path: this.$route.path,
              query: {
                nocontent: "nocontent",
              },
            });
          }

          this.store.tagJson = [];
          /* 左侧 */
          if (Isleft || isSelect) {
            var is_simple_search = isSelect ? true : false;
            var iside = Isleft ? true : false;
            this.AddTagJson(
              belongName,
              decodeURI(query.zhName),
              query.classCodeKey,
              query.keyCode,
              query.classCodeKey,
              is_simple_search,
              "",
              iside
            );
          }
          /* 既不在左侧  也不在下拉*/
          if (!Isleft && !isSelect) {
            this.AddTagJson(
              belongName,
              decodeURI(query.zhName),
              query.classCodeKey,
              query.keyCode
            );
          }
          if (query.keyCode2) {
            this.AddTagJson(
              belongName2,
              decodeURI(query.zhName2),
              query.classCodeKey2,
              query.keyCode2
            );
          }
          this.store.Result = true;
        });
      } else if (this.$route.query.record && !this.$route.query.type) {
        this.record();
      }
    },
    resetDom(data) {
      this.sidebarbox = [];
      for (var i = 0; i < data.length; i++) {
        var obj = data[i];
        this.sidebarbox.push(obj);
      }
    },
    filterOutSpecialChar(val) {
      if (val.indexOf("\u2605") > -1) {
        return val.replace(new RegExp("\u2605", "gi"), "");
      } else if (val.indexOf("\u25b2") > -1) {
        return val.replace(new RegExp("\u25b2", "gi"), "");
      } else if (val.indexOf("\u25c6") > -1) {
        return val.replace(new RegExp("\u25c6", "gi"), "");
      } else {
        return val;
      }
    },
    changeTagJson(name, fieldname, namelist, itemlist, item, index, obj) {
      this.Level_of_validity[item.value] = true;

      let resultChar = this.filterOutSpecialChar(namelist);

      // var selPara = this.store.selPara;
      var theTag = {
        name: name,
        namelist: [resultChar],
        fieldname: fieldname,
        itemlist: [itemlist],
        iside: true,
      };
      var tagJson = [];
      for (var i = 0; i < this.store.tagJson.length; i++) {
        tagJson.push(this.store.tagJson[i]);
      }
      if (this.verify(name) > -1) {
        tagJson[this.verify(name)] = theTag;
      } else {
        tagJson.push(theTag);
        this.listJson = JSON.parse(JSON.stringify(this.store.listJson));
      }
      this.store.tagJson = tagJson;
      var CodeKey = [];
      for (var i = 0; i < tagJson.length; i++) {
        if (tagJson[i].iside) {
          CodeKey.push({
            key: tagJson[i].fieldname,
            value: tagJson[i].itemlist[0],
          });
        }
      }
      this.store.listJson.page = 1;
      this.store.listJson.indexOfGroup = 0;
      this.currentpage = Math.ceil((index + 1) / this.pageSize);
      if (this.mapdata["分组"] && this.mapdata["分组"] == fieldname) {
        this.store.listJson.groupByIndex = 2;
      }
      this.store.listJson.keyValues = CodeKey;
      this.$emit("closePop");
      this.$store
        .dispatch("search/search", this.store.listJson)
        .then(() => {
          this.store.Result = true;
        })
        .catch((e) => {});
    },
    verify(name) {
      var arr = this.store.tagJson;
      for (var i = 0; i < arr.length; i++) {
        if (arr[i].name == name) {
          return i;
        }
      }
      return -1;
    },
    getSideTree(arr, num) {
      var data = [];
      for (var i = 0; i < arr.length; i++) {
        data.push({
          label: arr[i].label,
          value: arr[i].value,
          count: arr[i].count,
          num: num,
          isSelect: arr[i].isSelect,
        });
        if (arr[i].children) {
          data.push.apply(data, this.getSideTree(arr[i].children, num + 1));
        }
      }
      return data;
    },
    findName(data, value) {
      let index = value;
      for (var i = 0; i < data.length; i++) {
        if (data[i].value == index) {
          this.label = data[i].label;
          return this.label;
        } else {
          if (this.label) {
            return;
          }
          if (data[i].children) {
            this.findName(data[i].children, index);
          }
        }
      }
    },
    /* 分页定位 */
    localization(data) {
      var num = 0,
        level = 1;
      function recursive(value, level) {
        var arr = value;
        for (var i = 0; i < arr.length; i++) {
          arr[i].level = level;
          if (arr[i].isSelect == 1) {
            num = i + arr[i].level * 1 - 1;
            break;
          } else {
            if (arr[i].children) {
              recursive(arr[i].children, level + 1);
            }
          }
        }
        return num;
      }
      return Math.floor((recursive(data.data, level) * 1) / 13);
    },
    /* 处理监听的数据 */
    sidebar_data(data) {
      this.sidebarbox = [];
      for (let i = 0; i < data.length; i++) {
        var obj = {};
        obj.page = this.localization(data[i]);
        obj.size = 13;
        obj.openChild = false;
        obj.label = data[i].label;
        obj.value = data[i].value;
        obj.data = this.getSideTree(data[i].data, 1);
        obj.total = obj.data.length;
        obj.state = true;
        obj.expand = true;
        this.sidebarbox.push(obj);
      }
    },
    /* 推到tagJson保存起来 */
    AddTagJson(
      belongName,
      zhName,
      classCodeKey,
      keyCode,
      scope,
      is_simple_search,
      is_result_search,
      iside
    ) {
      this.store.tagJson.push({
        scope: scope,
        adv_type: "exact",
        data_type: "tag",
        name: belongName,
        namelist: [zhName],
        fieldname: classCodeKey,
        min: "",
        max: "",
        itemlist: [keyCode],
        relatetype: "or",
        is_simple_search: is_simple_search,
        iside: iside,
      });
    },

    record() {
      var records = this.$route.query.record;
      var that = this;
      getConditions({
        id: records,
      }).then((res) => {
        var condition = JSON.parse(res.data.conditions).NormalModels;
        this.store.listJson = condition;
        this.$store.dispatch("search/search", condition).then(() => {
          function scopename(scope) {
            var name = "";
            if (scope == "Default") {
              name = that.mapdata["默认"];
            } else {
              for (var i in that.mapdata["搜索"]) {
                if (that.mapdata["搜索"][i] == scope) {
                  name = i;
                }
              }
            }
            return name;
          }
          if (condition.keyword) {
            Bus.$emit("colunmSearch", condition.keyword);
            var is_simple_search = true;
            this.AddTagJson(
              scopename(condition.scope),
              condition.keyword,
              "",
              "",
              condition.scope,
              is_simple_search
            );
          }
          /* 处理左侧聚力条件*/
          if (condition.classCodeKeys.length > 0) {
            var codekey = [];
            /* 查找 左侧聚力标题*/
            function condited(value) {
              var data = that.filterConfig[condition.index],
                name;
              for (var i in data) {
                if (data[i].key == value) {
                  name = data[i].chn.slice(0, data[i].chn.length - 1);
                  return name;
                }
              }
              return name;
            }
            /* 查找检索条件内容*/
            function findname(item, value) {
              var data = that.sidebar,
                arr = [];
              for (var i = 0; i < data.length; i++) {
                if (item == data[i].value) {
                  arr = data[i].data;
                  break;
                }
              }
              /* 递归查找 左侧距离检索条件 */
              function secondfind(data, value) {
                var label;
                for (var j = 0; j < data.length; j++) {
                  if (data[j].value == value) {
                    label = data[j].label;
                    return label;
                  } else {
                    if (data[j].children) {
                      secondfind(data[j].children, value);
                    }
                  }
                }
              }
              return secondfind(arr, value);
            }
            var output = (item, index) =>
              new Promise((resolve, reject) => {
                var is_simple_search = true;
                this.AddTagJson(
                  condited(item.key),
                  findname(item.key, item.value),
                  item.key,
                  item.value,
                  is_simple_search
                );
                resolve();
              });
            condition.classCodeKeys.forEach((item) => {
              codekey.push(output(item));
            });
            Promise.all(codekey).then(() => {});
          }
          if (condition.queryBaseReqs.length > 0) {
            condition.queryBaseReqs.forEach((item) => {
              var is_result_search = true;
              this.AddTagJson(
                scopename(item.fieldName),
                item.fieldValue,
                "",
                "",
                item.fieldName,
                "",
                is_result_search
              );
            });
          }
          if (this.search.nocontent) {
            this.$router.push({
              path: this.$route.path,
              query: {
                nocontent: "nocontent",
              },
            });
          }
        });
      });
    },
  },
  watch: {
    sidebar: function (data) {
      this.sidebar_data(data);
    },
  },
  mounted() {
    Bus.$on("listSideBarInit", () => {
      this.init();
    });
    this.init();
  },
};
</script>
<style scoped lang="less">
@import "../assets/css/layout/list-side-bar.less";
</style>
