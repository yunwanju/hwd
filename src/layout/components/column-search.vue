<template>
  <div class="column-search">
    <div class="container">
      <!-- 首页搜索及栏目名称 -->
      <div class="search-wrap">
        <div class="left-drop">
          <van-dropdown-menu active-color="#006f6b">
            <van-dropdown-item
              v-model="search_name"
              :options="dropdownItems"
              @change="changeScope"
            />
          </van-dropdown-menu>
        </div>
        <div class="right-search">
          <van-search
            v-model="inputSearch"
            show-action
            placeholder="请输入检索内容"
            @search="changeKeyWord"
            @cancel="closePop"
            shape="round"
          />
        </div>
      </div>
      <Wrap v-if="store.tagJson.length > 0 && !$route.meta.noWrap" ref="searchWrap"></Wrap>
      <div class="btns">
        <div>
          <div class="btn" @click="clearInputSearch">清除全部</div>
        </div>
        <div v-if="store.tagJson.length === 0">
          <div class="btn" @click="changeKeyWord">检索</div>
        </div>
        <div v-if="store.tagJson.length > 0 && !$route.meta.noWrap">
          <div class="btn" @click="resultWord">结果中检索</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { debounce } from "@/utils/util";
import { getHubNamefromLib } from "@/utils/articleAnchor.js";
import { mapState , mapGetters} from "vuex";
import filterConfig from "@/utils/feildData";
import { content_list_page } from "@/utils/listpage.js";
import { condition } from "@/utils/searchConfig";
import Bus from "@/utils/eventBus";
import Wrap from "./search-condition-wrap";
import {
  getSearchSyncWordAPI,
  getSearchHotKeyWordAPI,
  getSearchLawDirect,
  getSearchLawDirectToTiao,
  getSearchCaseData,
  getSearchKeyWordHint,
  addOrdinarySearchRecord
} from "@/api/search.js";
import { sensitiveCheck } from "@/api/sensitive.js";
import request from '@/components/mixins/index'
export default {
  mixins: [request],
  name: "ColumnSearch",
  components: {
    Wrap /* 检索条件 */,
  },
  props: ["keyNone"],
  data() {
    return {
      intelligence: false, //智能切换
      tip: "", //提示
      selectStyle: false, //
      inputSearch: "", //输入框绑定数据
      inquiryMode: "0", //
      radioDis: true, //
      rangeType: "", //
      inputType: false, //
      hot: [], //
      search_name: "", //
      search_name1: "",
      defaultPrompt: "", //默认提示
      filterConfig: filterConfig, //过滤配置文件
      SearchHistoryData: {}, //下拉提示检索历史接口数据存储
      SearchHintSwitch: true, //检索历史与其他提示互斥锁
      syncWordData: [], //下拉提示同义词接口存储数据
      hotSearchData: [], //下拉提示热搜接口数据存储
      directToArticleData: [], //
      directToTiao: [], //下拉提示-直达法条数据存储
      activeAllHint: false, //非历史检索下拉提示开关
      keyWordHintData: [], //下拉提示-关键字接口数据-存储
      searchHintConfigFocus: 0, //当前下拉提示检索历史请求数量-为0时是不请求
      searchHintConfigInputConf: [], //当前下拉提示的请求规则存储
      upAndDownHistoryIndex: -1, //当前下拉提示-检索历史-上下切换索引
      upAndDownNormalIndex: -1, //当前下拉提示-关键字提示-上下切换索引
      upAndDownHistorySwitch: false, //当前下拉提示-检索历史-开关
      inputSearchTemp: "", //检索关键字临时存储
      sameMeaningWord: "", //同义词
      navbar_index: {
        regulation: 0,
        hndwcontract: 0,
      },
    };
  },
  computed: {
    ...mapState({
      store: "store",
      search: "search",
      list_data: "list",
    }),
    ...mapGetters(["personInfo"]),
    /* 返回当前库的配置文件*/
    mapdata() {
      let data = this.list_data.list_data;
      let datas =
        data[this.activeListType][this.activeIndex] ||
        data[this.activeListType];
      return datas;
    },
    dropdownItems() {
      let searchData = [];
      for (let i in this.mapdata["搜索"]) {
        searchData.push({
          text: i,
          value: this.mapdata["搜索"][i]
        })
      }
      return searchData;
    },
    flag() {
      return this.search.nocontent;
    },
  },

  methods: {
    closePop() {
      this.$emit("closePop");
    },
    clearInputSearch() {
      this.inputSearch = "";
      this.SearchHintSwitch = false;
      this.$refs.searchWrap.clearTagJson()
      this.closePop();
    },
    SearchHint() {
      if (this.inputSearch.trim().length > 0) {
        this.SearchHintSwitch = false;
        this.syncWordData = [];
        this.hotSearchData = [];
        this.directToArticleData = [];
        this.directToTiao = [];
        this.keyWordHintData = [];
        if (
          this.searchHintConfigInputConf &&
          this.searchHintConfigInputConf.length === 4 &&
          this.searchHintConfigInputConf[0] > 0
        ) {
          getSearchSyncWordAPI({
            keywords: this.inputSearch,
            size: this.searchHintConfigInputConf[0],
            menu: this.$route.meta.type,
          })
            .then((res) => {
              if (res.code === 200) {
                if (
                  res.data[0]["synonymskeyword"] &&
                  res.data[0]["synonymskeyword"].length > 0
                ) {
                  this.syncWordData = res.data[0]["synonymskeyword"];
                  this.activeAllHint = true;
                }
              }
            })
            .catch((err) => {
              console.log(err);
            });
        }
        if (
          this.searchHintConfigInputConf &&
          (this.searchHintConfigInputConf.length === 4 ||
            this.searchHintConfigInputConf.length === 6) &&
          this.searchHintConfigInputConf[1] > 0
        ) {
          if (this.$route.meta.type == "qikan") {
            getSearchHotKeyWordAPI({
              keywords: this.inputSearch,
              size: this.searchHintConfigInputConf[1],
              menu: "journal",
            })
              .then((res) => {
                if (res.code === 200) {
                  this.hotSearchData = res.data;
                  this.activeAllHint = true;
                }
              })
              .catch((err) => {
                console.log(err);
              });
          } else if (this.$route.meta.type == "lawfirmarticles") {
            getSearchHotKeyWordAPI({
              keywords: this.inputSearch,
              size: this.searchHintConfigInputConf[1],
              menu: "lawfirm",
            })
              .then((res) => {
                if (res.code === 200) {
                  this.hotSearchData = res.data;
                  this.activeAllHint = true;
                }
              })
              .catch((err) => {
                console.log(err);
              });
          } else if (this.$route.meta.type == "specialtopic") {
            getSearchHotKeyWordAPI({
              keywords: this.inputSearch,
              size: this.searchHintConfigInputConf[1],
              menu: "reference",
            })
              .then((res) => {
                if (res.code === 200) {
                  this.hotSearchData = res.data;
                  this.activeAllHint = true;
                }
              })
              .catch((err) => {
                console.log(err);
              });
          } else {
            getSearchHotKeyWordAPI({
              keywords: this.inputSearch,
              size: this.searchHintConfigInputConf[1],
              menu: this.$route.meta.type,
            })
              .then((res) => {
                if (res.code === 200) {
                  this.hotSearchData = res.data;
                  this.activeAllHint = true;
                }
              })
              .catch((err) => {
                console.log(err);
              });
          }
        }
        if (
          this.searchHintConfigInputConf &&
          this.searchHintConfigInputConf.length === 4 &&
          this.searchHintConfigInputConf[2] > 0
        ) {
          getSearchLawDirect({
            keywords: this.inputSearch,
            size: this.searchHintConfigInputConf[2],
            index: this.store.listJson.index,
          })
            .then((res) => {
              if (res.code === 200) {
                this.directToArticleData = res.data;
                this.activeAllHint = true;
              }
            })
            .catch((err) => {
              console.log(err);
            });
        }
        if (
          this.searchHintConfigInputConf &&
          this.searchHintConfigInputConf.length === 4 &&
          this.searchHintConfigInputConf[3] > 0
        ) {
          getSearchLawDirectToTiao({
            keywords: this.inputSearch,
            size: this.searchHintConfigInputConf[3],
            library: this.store.listJson.index,
          })
            .then((res) => {
              if (res.code === 200) {
                this.directToTiao = res.data;
                this.activeAllHint = true;
              }
            })
            .catch((err) => {
              console.log(err);
            });
        }
        if (
          this.searchHintConfigInputConf &&
          this.searchHintConfigInputConf.length === 5 &&
          this.searchHintConfigInputConf[0] > 0
        ) {
          getSearchHotKeyWordAPI({
            keywords: this.inputSearch,
            size: this.searchHintConfigInputConf[0],
            menu: this.$route.meta.type,
          })
            .then((res) => {
              if (res.code === 200) {
                this.hotSearchData = res.data;
                this.activeAllHint = true;
              }
            })
            .catch((err) => {
              console.log(err);
            });
        }
        if (
          this.searchHintConfigInputConf &&
          this.searchHintConfigInputConf.length === 5 &&
          this.searchHintConfigInputConf[1] > 0
        ) {
          getSearchCaseData({
            keywords: this.inputSearch,
            size: this.searchHintConfigInputConf[1],
            scope: this.mapdata["搜索"][this.search_name],
          })
            .then((res) => {
              if (res.code === 200) {
                this.activeAllHint = true;
              }
            })
            .catch((err) => {
              console.log(err);
            });
        }
        if (
          this.searchHintConfigInputConf &&
          this.searchHintConfigInputConf.length === 6 &&
          this.searchHintConfigInputConf[5] > 0
        ) {
          getSearchKeyWordHint({
            keywords: this.inputSearch,
            size: this.searchHintConfigInputConf[5],
            scope: this.mapdata["搜索"][this.search_name],
          })
            .then((res) => {
              if (res.code === 200) {
                this.keyWordHintData =
                  res.data[this.mapdata["搜索"][this.search_name]];
                this.activeAllHint = true;
              }
            })
            .catch((err) => {
              console.log(err);
            });
        }
      } else {
        return;
      }
    },
    /* 结果中检索*/
    resultWord() {
      var that = this;
      if (!this.inputSearch.trim()) {
        return;
      }
      if (this.inputSearch.length >= 200) {
        this.$toast.fail("请输入少于200个字符的关键词进行检索！");
        return;
      }
      this.closePop();
      sensitiveCheck({
        keyword: this.inputSearch,
      })
        .then((res) => {
          if (!res.data) {
            this.store.IsshowResult = false;

            function isUnique(source, data) {
              let temp = true;
              source.forEach((item) => {
                if (
                  item["fieldName"] == data["fieldName"] &&
                  item["fieldValue"] == data["fieldValue"] &&
                  item["fieldInquiryMode"] == data["fieldInquiryMode"] &&
                  item["fieldRangeType"] == data["fieldRangeType"]
                ) {
                  temp = false;
                }
              });
              return temp;
            }
            let temp = this.search.queryBaseReqs;
            let param = {
              fieldName: this.mapdata["搜索"][this.search_name1],
              fieldValue: this.inputSearch.trim(),
              fieldInquiryMode: temp[0].fieldInquiryMode,
              fieldRangeType: temp[0].fieldRangeType,
              fieldSynonymSearch: this.store.listJson.synonymSearch,
            };
            if (!isUnique(temp, param)) {
              return;
            } else {
              let go = that.inputSearch.trim();
              var name;
              if (that.search_name1 == "默 认") {
                name = that.mapdata["默认"];
              } else {
                name = that.search_name1.replace(/\s*/g, "");
              }
              var Isdefault = that.search_name == "默 认" ? true : false;
              that.changeTagJsonWithnoEmpty(
                name,
                go,
                that.mapdata["搜索"][that.search_name],
                Isdefault
              );
              that.$store.commit("store/RESULT_SEARCH", param);
              that.store.listJson.size = content_list_page(
                that.store.listJson.groupByIndex,
                that.store.listJson.index
              );

              var listJson = JSON.parse(JSON.stringify(that.store.listJson));
              if (that.store.tagJson[0].scope) {
                listJson.scope = that.store.tagJson[0].scope;
                listJson.indexOfGroup = 0;
                listJson.synonymSearch = that.store.tagJson[0].synonymSearch;
              }
              that.store.listJson.page = 1;
              that.$store.dispatch("search/search", listJson).then(() => {
                that.no_content(true);
              });
            }
          } else {
            this.$toast.fail("对不起，您输入的条件包含敏感词汇，请重新输入！");
          }
        })
        .catch((Error) => {
          console.log(Error);
        });
    },
    /* 结果中检索增加检索条件 */
    changeTagJsonWithnoEmpty(name, namelist, scope, Isdefault) {
      var theTag = {
        scope: scope,
        name: name,
        namelist: [namelist],
        fieldname: "",
        min: "",
        max: "",
        itemlist: [namelist],
        relatetype: "or",
        iside: false,
        is_result_search: true,
        Isdefault: Isdefault,
      };
      this.store.tagJson.push(theTag);
    },
    /* 左侧下拉变化 */
    changeScope(item) {
      this.defaultPrompt =
        item == "默 认" ? this.mapdata["默认提示"] : "请输入检索内容";
      this.rangeType = "";
      if (item == "默 认" || item == "标 题" || item == "全 文") {
        this.store.listJson.synonymSearch = true;
      } else {
        this.store.listJson.synonymSearch = false;
      }
      this.selectStyle = false;
      if (this.store.listJson.scope == "content") {
        this.radioDis = false;
      } else {
        this.radioDis = true;
      }
    },
    /* 简单检索增加检索条件 */
    changeTagJson(name, namelist, scope, synonymSearch) {
      var theTag = {
        scope: scope,
        name: name,
        namelist: [namelist],
        fieldname: "",
        min: "",
        max: "",
        itemlist: [namelist],
        relatetype: "or",
        iside: false,
        is_simple_search: true,
        synonymSearch: synonymSearch,
      };
      this.store.tagJson = [];
      this.store.listJson.queryBaseReqs = [];
      this.store.tagJson.push(theTag);
    },
    /* 是否跳转到无结果页面搜索 */
    no_content(result) {
      if (this.flag) {
        //当前检索无内容
        var navbar = this.search.navbar;
        var navindex = this.navbar_index[
          getHubNamefromLib(this.store.listJson.index)
        ];
        let flags = false;
        for (var i in navindex) {
          if (navbar[i]) {
            if (navbar[i] != 0) {
              flags = true;
              break;
            }
          }
        }
        if (flags) {
          this.store.IsshowResult = true;
          Bus.$emit("jumpOther", index);
        } else {
          let listJson = this.store.listJson;
          let configData = condition[this.store.blockedOut];
          if (configData && !result) {
            let keys =
              listJson.scope +
              "_" +
              listJson.inquiryMode +
              (listJson.rangeType ? "_" + listJson.rangeType : "");
            if (!configData[keys].noTips) {
              this.intelligence = true;
            } else {
              this.supplement();
            }
          } else {
            this.$router.push({
              path: this.$route.path,
              query: {
                nocontent: "nocontent",
              },
            });
          }
        }
      } else if (this.$route.query.nocontent) {
        window.location.hash = this.$route.path;
      }
    },
    //通用普通检索方法-普通检索调用该方法。
    changeKeyWord() {
      if (!this.inputSearch.trim()) {
        return;
      }
      if (this.inputSearch.length >= 200) {
        this.$toast.fail("请输入少于200个字符的关键词进行检索！");
        return;
      }
      this.sureChangeKeyWord(false);
    },
    //增加检索记录接口
    addSearchData() {
      const {
        menu,
        index,
        scope,
        keyword
      } = this.store.listJson;
      console
      !this.personInfo && this.$router.push('/login')
      const personInfo = this.personInfo;
      addOrdinarySearchRecord({
        accountid: personInfo.id,
        menu: menu,
        scope: scope,
        library: index,
        keyword: keyword,
        urlParameter: `#/${menu}?lib=${index}&classCodeKey=${scope}&zhName=${keyword}`
      }).then(res => {

      }).catch((err) => {
        console.log(err)
      })
    },
    /* 开始检索  或者点击否直接发起检索*/
    sureChangeKeyWord(value) {
      this.closePop();
      sensitiveCheck({
        keyword: this.inputSearch,
      })
        .then((res) => {
          if (!res.data) {
            this.store.IsshowResult = false;
            var inputSearch = this.inputSearch;
            if (value) {
              inputSearch = inputSearch.replace(/-/g, "!");
            }
            this.store.listJson.keyword = inputSearch;
            this.store.listJson.index = this.activeIndex;
            this.store.listJson.menu = this.activeListType;
            this.store.listJson.inquiryMode = this.inquiryMode;
            this.store.listJson.displayTongyinFlag = true;
            this.store.listJson.displayHomePageFlag = false;
            this.store.listJson.indexOfGroup = 0;
            this.store.listJson.groupByIndex = this.activeIndex === 'specialtopic'?2:0
            delete this.store.listJson.rangeType;
            var name,
              namelist,
              that = this;
            if (this.search_name1 == "默 认") {
              name = this.mapdata["默认"];
            } else {
              name = this.search_name1.replace(/\s*/g, "");
            }
            this.store.Result = true;
            this.store.listJson.keyValues = [];
            this.store.listJson.queryBaseReqs = [];
            this.store.listJson.page = 1;
            var indexof = ['chl', 'lar', 'pfnl'];
            if (indexof.indexOf(this.store.listJson.index) > -1) {
              this.store.listJson.orderByIndex = 5;
            }
            this.store.listJson.scope = this.mapdata["搜索"][this.search_name1];
            this.store.listJson.size = content_list_page(
              this.store.listJson.groupByIndex,
              this.store.listJson.index
            );
            this.$store
              .dispatch("search/search", this.store.listJson)
              .then(() => {
                this.addSearchData()
                this.store.blockedOut = this.store.listJson.scope;
                if (this.search.pinyin && this.search.pinyin.length) {
                  //同义词处理
                  namelist = this.search.pinyin[0];
                } else {
                  namelist = this.inputSearch;
                }
                this.changeTagJson(
                  name,
                  namelist,
                  that.store.listJson.scope,
                  that.store.listJson.synonymSearch
                );
                /* 无数据跳到无结果页面 否则返回*/
                this.no_content();
              });
          } else {
            this.$toast.fail("对不起，您输入的条件包含敏感词汇，请重新输入！");
          }
        })
        .catch((Error) => {
          console.log(Error);
        });
    },
    /* 检索无结果补充 */
    supplement() {
      this.intelligence = false;
      let listJson = this.store.listJson;
      let configData = condition[this.store.blockedOut];
      let keys =
        listJson.scope +
        "_" +
        listJson.inquiryMode +
        (listJson.rangeType ? "_" + listJson.rangeType : "");
      let index = Object.keys(configData).indexOf(keys);
      if (index + 1 < Object.keys(configData).length) {
        listJson = Object.assign(
          listJson,
          configData[Object.keys(configData)[index + 1]].listJson
        );
        this.store.listJson = listJson;
        var tagJson = JSON.parse(JSON.stringify(this.store.tagJson));
        tagJson[0].name = configData[Object.keys(configData)[index + 1]].Tips;
        tagJson[0].scope =
          configData[Object.keys(configData)[index + 1]].listJson.scope;
        tagJson[0].change = true;
        this.store.tagJson = [];
        this.store.tagJson = tagJson;
        if (configData[Object.keys(configData)[index + 1]].loop) {
          //当有loop的时候，当前条件不触发
          this.supplement();
        } else {
          this.$store.dispatch("search/search", listJson).then(() => {
            this.no_switching();
          });
        }
      } else {
        this.$router.push({
          path: this.$route.path,
          query: {
            nocontent: "nocontent",
          },
        });
      }
    },
    /* 专供智能切换循环调用*/
    no_switching(result) {
      if (this.flag) {
        let configData = condition[this.store.blockedOut];
        if (configData && !result) {
          this.supplement();
        } else {
          this.$router.push({
            path: this.$route.path,
            query: {
              nocontent: "nocontent",
            },
          });
        }
      } else if (this.$route.query.nocontent) {
        this.$router.push({
          path: this.$route.path,
          query: {
            lib: this.store.listJson.index,
          },
        });
      }
    },
    /* 库名变化 默认值 及其默认提示变化 */
    changedepot() {
      let index,
        index1,
        scope,
        flag = true;
      for (let i in this.mapdata["搜索"]) {
        if (this.store.listJson.scope == this.mapdata["搜索"][i]) {
          index = this.mapdata["搜索"][i];
          index1 = i
          scope = this.store.listJson.scope;
          flag = false;
        }
      }
      if (flag) {
        index1 = Object.keys(this.mapdata["搜索"])[0];
        index = Object.values(this.mapdata["搜索"])[0];
        scope = Object.values(this.mapdata["搜索"])[0];
      }
      this.search_name = index;
      this.search_name1 = index1;
      this.store.listJson.scope = scope;
      this.defaultPrompt =
        this.store.listJson.scope == "Default"
          ? this.mapdata["默认提示"]
          : "请输入检索内容";
    },
    debouncedFunc: debounce(function () {
      //输入防抖函数
      this.SearchHint();
    }, 800),
  },
  watch: {
    dropdownItems: {
      handler(newValue, oldValue) {
        this.changedepot();
      },
      deep: true,
    },
    /* 监听输入框发生变化调用热词接口 和法宝联想接口 */
    inputSearch(curVal, oldVal) {
      // 实现input连续输入，只发一次请求
      /* 设置主检索输入框字符大小 */
      if (curVal.length >= 200) {
        this.$toast.fail("请输入少于200个字符的关键词进行检索！");
        return;
      }
      clearTimeout(this.timeout);
      var data = {
        keywords: this.inputSearch,
        menu: this.$route.meta.type,
      };
      if (curVal.trim() === "") {
        if (this.activeAllHint) {
          this.SearchHistory();
        }
        this.syncWordData = [];
        this.hotSearchData = [];
        this.directToArticleData = [];
        this.directToTiao = [];
        this.activeAllHint = false;
        this.keyWordHintData = [];
        this.upAndDownHistorySwitch = false;
      } else {
        if (this.upAndDownHistorySwitch) {
          return;
        }
        this.sameMeaningWord = curVal;
        this.SearchHintSwitch = false;
        this.upAndDownNormalIndex = -1;
        this.SearchHistoryData = {};
        this.upAndDownNormalIndex = -1;
        if (this.activeAllHint) {
          this.debouncedFunc();
        }
      }
    },
    keyNone(type) {
      if (type) {
        this.inputSearch = "";
        this.inquiryMode = "0";
        this.radioDis = true;
        this.rangeType = "";
      }
    },
    inquiryMode: function (value) {
      this.rangeType = "";
    },
  },
  created() {
    Bus.$on("getTarget", (target) => {
      if (target) {
        this.changedepot();
        this.inputSearch = "";
      }
    });
    Bus.$on("colunmSearch", (target) => {
      if (target) {
        this.inputSearch = target;
      }
    });
  },
  beforeDestroy() {
    Bus.$off("jumpOther", this.handle);
  },
  mounted() {
    this.changedepot();
  },
};
</script>
<style scoped>
@import "../../assets/css/layout/column-search.css";
</style>
