<template>
  <!--正文页标签-->
  <div class="container fulltext-container clearfix" :class="purefyDetail ? 'fulltext-pure' : ''">
    <div class="fulltext-tool" id="toolBar" :class="fixtoolBar ? 'pos-fixed' : ''">
      <div class="tool-position"></div>
    </div>
    <div v-show="fixtoolBar" style="height: 100px"></div>
    <div :class="purefyDetail ? '' : 'grid-left'">
      <div class="fulltext-wrap">
        <template>
          <h2 class="title">{{ totalTitle }}</h2>
          <div class="related-info">
          </div>
        </template>
        <div class="fulltext" v-html="fulleText"></div>
        <div class="fulltext" v-html="focusFilterArticle"></div>
      </div>
    </div>
    <div class="bottom-bar">
      <div class="bottom-btn" @click="downloadThisFile">
        <van-icon name="back-top" class="rotate" />
        <span>下载</span>
      </div>
      <div class="bottom-btn">
        <!-- <span v-show="!isAddtoCollection" @click="collectThisArticle">
          <van-icon name="star-o" />
          <span>收藏</span>
        </span>
        <span v-show="isAddtoCollection">
          <van-icon name="success" />已收藏
        </span> -->
      </div>
    </div>
    <div class="right-bar">
      <div class="right-btn" @click="basicInfoPopup = true">基本信息</div>
      <div class="right-btn" @click="totop">返回顶部</div>
    </div>
    <van-popup v-model="basicInfoPopup" position="right" :style="{ width: '80%', height: '100%' }">
      <field :lawInfo.sync="detailMain"></field>
    </van-popup>
    <van-popup
      v-model="associatedDataPopup"
      position="right"
      :style="{ width: '80%', height: '100%' }"
    >
      <!-- <lenovo
        :library="$route.params.type"
        :gid="$route.params.gid"
        :fromArticleTitle="totalTitle"
        v-if="!purefyDetail"
        :versionRelationList="detailMain.versionRelationList"
      >
      </lenovo>-->
    </van-popup>
    <van-dialog v-model="riskDialogVisible" confirm-button-text="关闭" confirmButtonColor="#006F6B">
      <p class="riskTitle">
        <span>风险点：</span>
        <a class="risk">{{ riskTypeName }}</a>
      </p>
      <p class="riskContent">{{ riskContent }}</p>
    </van-dialog>
  </div>
</template>
<script>
import { setWaterMark } from "@/utils/watermark";
import Bus from "../../utils/eventBus";
import lenovo from "./lenovo";
import field from "./field";
import { mapState, mapGetters } from "vuex";
import { collection } from "@/api/search.js";
import {
  isCollectedAPI,
  articlesFulltextNotLxAPI,
  articlesInfoAPI,
  addBrowseRecordRecord,
} from "@/api/detail.js";
import { baseAPI } from "@/utils/request";
import { getHubNamefromLib, addDownLoad } from "../../utils/articleAnchor";

import { hasClass, addClass, removeClass, moveAll } from "../../utils/util";
export default {
  name: "detail",
  components: {
    lenovo, //右侧引用制度
    field: field, //基础字段组件
  },
  data() {
    return {
      dialogVisible: false,
      downForm: {
        downloadType: "1",
        keepFields: true,
        needKeepRightLenovo: true,
        needRiskpoint: true,
      },
      detailMain: {}, //正文数据
      menu: false, //目录开关
      lawBox: { box1: false, box2: false },
      subMain: "",
      contractTerms: [], //合同范本正文数据
      totalTitle: "",
      jumpTiao: "",
      tKeyword: "",
      cbFocusWord: false,
      switchToIndex: -1,
      baseAPI: baseAPI,
      downType: {
        1: ".doc",
      },
      fixtoolBar: false, //是否定位到头部
      themColor: ["#ffffff", "#faf0e7", "#ddeee3", "#e2edf2"],
      textFontSize: 0.16,
      operateMoreConfig: false,
      downloadDialogueOne: true,
      downloadDialogueTwo: false,
      routerKeyHighLightSwitch: false,
      markPen: true,
      tiaoJumpRouterSwitch: 0,
      isAddtoCollection: false,
      viewsList: {
        regulation: {
          chn: "规章制度篇",
          num: 188,
        },
      },
      purefyDetail: false,
      currentLib: "",
      riskDialogVisible: false,
      riskContent: "",
      riskTypeName: "",
      showPop: false,
      basicInfoPopup: false,
      associatedDataPopup: false,
      fulleText: null,
    };
  },
  methods: {
    // 回到顶部
    totop() {
      moveAll(document.getElementById("app"), {
        scrollTop: 0,
      });
    },
    // 取消下载
    cancelDowns() {
      this.downForm = this.$options.data().downForm;
      this.dialogVisible = false;
    },
    /* 下载 */
    downloadThisFile() {
      let link = document.createElement("a");
      link.href =
        baseAPI +
        "/api/download/downloadDocumentFile?" +
        "keepFields=true&downloadType=1&library=" +
        this.$route.params.type +
        "&gid=" +
        this.$route.params.gid +
        "&curLib=" +
        this.$route.params.type +
        "&needKeepRightLenovo=true&needKeepFullTextLenovo=true";
      link.downLoad = this.totalTitle + "doc";
      link.target = "_blank";
      let elemIF = document.createElement("iframe");
      elemIF.src = link.href;
      elemIF.style.display = "none";
      document.body.appendChild(elemIF);
      const userInfo = this.personInfo;
    //   addDownLoad([
    //     {
    //       userId: userInfo.id,
    //       sourcename: getHubNamefromLib(this.$route.params.type),
    //       sourcetype: this.$route.params.type,
    //       gid: this.$route.params.gid,
    //       title: this.totalTitle,
    //     },
    //   ]);
    },
    /* 过滤裁判规则 规则标题*/
    filterTitle(value) {
      var str = value;
      if (value) {
        str = value.replace(/<font class="red">/g, "").replace(/<\/font>/g, "");
      }
      return str;
    },
    //收藏这篇文章
    collectThisArticle() {
      const userInfo = this.personInfo;
      const title = this.filterTitle(this.totalTitle);
      let param = [
        {
          userId: userInfo.id,
          sourcename: getHubNamefromLib(this.$route.params.type),
          sourcetype: this.$route.params.type,
          gid: this.$route.params.gid,
          title: title,
          urlParameter: location.hash,
        },
      ];
      collection(param)
        .then((res) => {
          if (res.code === 200) {
            this.isAddtoCollection = true;
            this.$toast.success("收藏成功！");
          } else if (res.code === 20016) {
            this.isAddtoCollection = true;
            this.$toast.fail("用户已经收藏！");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    //获得正文页数据
    getDetail() {
      const toast = this.$toast.loading({
        message: "加载中...",
        forbidClick: true,
      });
      articlesFulltextNotLxAPI({
        library: this.$route.params.type,
        gid: this.$route.params.gid,
      })
        .then((res) => {
          // this.detailMain = res.data.data;
          this.totalTitle =
            res.data.data.Title ||
            res.data.data.InfoTitle ||
            res.data.data.ArticleCtitle;
          this.fulleText = res.data.data.FullText || res.data.data.ContentTxt;
        //   this.addThisArticleToHistory();
        //   this.isCollected()
          toast.clear();
        })
        .then(() => { })
        .catch((e) => {
          console.log(e);
        });
    },
    // 基本字段接口
    getArticlesInfo: function () {
      articlesInfoAPI({
        library: this.$route.params.type,
        gid: this.$route.params.gid,
      })
        .then((res) => {
          this.articlesInfo = res.data;
          if (
            this.articlesInfo.hasOwnProperty("InfoTitle") &&
            this.articlesInfo["InfoTitle"] !== null
          ) {
            this.totalTitle = res.data.InfoTitle;
          } else if (
            this.articlesInfo.hasOwnProperty("ArticleCtitle") &&
            this.articlesInfo["ArticleCtitle"] !== null
          ) {
            this.totalTitle = res.data.ArticleCtitle;
          } else if (
            this.articlesInfo.hasOwnProperty("Title") &&
            this.articlesInfo["Title"] !== null
          ) {
            this.totalTitle = res.data.Title;
          }

          this.detailMain.fbm = res.data.fbm;
          this.detailMain = Object.assign(this.articlesInfo, this.detailMain);
        })
        .then(() => {
          if (this.$route.params.type === "payz") {
            if (this.articlesInfo["DisputedIssues"]) {
              this.totalTitle = this.articlesInfo["DisputedIssues"].replace(
                new RegExp("^[0-9].", "g"),
                ""
              );
            }
          }
          if (
            this.totalTitle.length > 0 &&
            this.totalTitle.indexOf("&#8203;") > -1
          ) {
            this.totalTitle = this.totalTitle.replace(
              new RegExp("&#8203;", "g"),
              ""
            );
          }
        })
        .then(() => {
          if (this.$route.params.type === "payz") {
            let web_string = [];
            web_string[0] = [
              '<div class="fields" style="font-size: 16px;"><ul>',
            ];

            if (
              this.articlesInfo["Core"] &&
              this.articlesInfo["Core"].length > 0
            ) {
              web_string[1] =
                '<li class="row"><strong>关键词：</strong>' +
                this.articlesInfo["Core"] +
                "</li>";
            }
            if (
              this.articlesInfo["FullText"] &&
              this.articlesInfo["FullText"].length > 0
            ) {
              web_string[2] =
                '<li class="row"><strong>裁判要点：</strong>' +
                this.articlesInfo["FullText"] +
                "</li>";
            }
            if (
              this.articlesInfo["Summary"] &&
              this.articlesInfo["Summary"].length > 0
            ) {
              web_string[3] =
                '<li class="row"><strong>适用法律：</strong>' +
                this.articlesInfo["Summary"] +
                "</li>";
            }
            if (
              this.articlesInfo["Title"] &&
              this.articlesInfo["Title"].length > 0 &&
              this.articlesInfo["SourceGid"]
            ) {
              web_string[4] =
                '<li class="row"><strong>渊源案例：</strong><a' +
                ' href="/#/detail/pfnl/' +
                this.articlesInfo["SourceGid"] +
                '" target="_blank">' +
                this.articlesInfo["Title"] +
                '<a href="javascript:void(0)" class="organization" onmouseover="showBasePayzMsg(event,this)">基本信息</a>' +
                "</a></li>";
            }
            web_string[5] = "</ul></div>";
            this.webString = web_string;
            this.subMain = web_string.join("");
          }
        })
        .catch((e) => {
          console.log(e);
        });
    },
    riskBox(riskContent, riskTypeName) {
      this.riskContent = riskContent;
      this.riskTypeName = riskTypeName;
      this.riskDialogVisible = true;
    },
    //通过目录跳到相应位置
    goSpecificPos(val) {
      let tp = document.querySelector("a[name=" + val + "]").parentNode;
      let tpPos = tp.offsetTop;
      document.getElementById("app").scrollTop = tpPos;
      this.menu = false;
    },
    //路由关键字跳转
    tiaoJumpByRouter() {
      if (
        this.$route.query.hasOwnProperty("tiao") &&
        this.tiaoJumpRouterSwitch === 0
      ) {
        let num = parseInt(this.$route.query.tiao);
        let tarDomTop =
          document.getElementsByClassName("navtiao")[num - 1].offsetTop;
        document.getElementById("app").scrollTop = tarDomTop;
        this.tiaoJumpRouterSwitch = 1;
      } else {
        return;
      }
    },
    //路由高亮
    routerHighlight() {
      if (window.location.hash.indexOf("?keysearchword") > -1) {
        let key = this.$route.query.keysearchword;
        this.tKeyword = key;
        this.routerKeyHighLightSwitch = true;
      } else {
        return;
      }
    },
    //高亮字符命中
    targetDomClassChange(index) {
      let dom = document.querySelectorAll(".high-light");
      if (dom !== null) {
        for (let i = 0; i < dom.length; i++) {
          if (hasClass(dom[i], "high-light-selected")) {
            removeClass(dom[i], "high-light-selected");
          }
        }
        addClass(dom[index], "high-light-selected");
        let top = dom[index].offsetTop;
        document.getElementById("app").scrollTop = top;
      } else {
        return;
      }
    },
    //固定工具栏class="pos-fixed"
    fixTool() {
      if (document.getElementById("app").scrollTop > 175) {
        this.fixtoolBar = true;
        this.downloadDialogueTwo = true;
        this.downloadDialogueOne = false;
      } else {
        this.fixtoolBar = false;
        this.downloadDialogueTwo = false;
        this.downloadDialogueOne = true;
      }
    },
    //改变颜色
    changeThemColor(val) {
      document.querySelector(".fulltext-wrap").style.background = val;
      localStorage.setItem("Article_Theme_Color", val);
    },
    //获得文章设置（字体，背景色）
    getArticleConfig: function () {
      if (localStorage.getItem("Article_Theme_Color") !== null) {
        let color = localStorage.getItem("Article_Theme_Color");
        this.changeThemColor(color);
      } else {
        localStorage.setItem("Article_Theme_Color", "#ffffff");
        this.changeThemColor(this.themColor[0]);
      }
      if (localStorage.getItem("Article_Theme_Font_Size") !== null) {
        let size = localStorage.getItem("Article_Theme_Font_Size");
        this.textFontSize = parseInt(size);
        document.querySelector(".fulltext").style.fontSize =
          this.textFontSize / 100 + "rem";
      } else {
        localStorage.setItem("Article_Theme_Font_Size", "16");
        document.querySelector(".fulltext").style.fontSize =
          this.textFontSize / 100 + "rem";
      }
    },
    //检测是否已经收藏
    isCollected: function () {
      let userInfo = this.personInfo;
      isCollectedAPI({
        gid: this.$route.params.gid,
        userId: userInfo.id,
        sourcename: getHubNamefromLib(this.$route.params.type),
        sourcetype: this.$route.params.type,
      })
        .then((res) => {
          if (!res.data) {
            this.isAddtoCollection = true;
          } else {
            this.isAddtoCollection = false;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    highlightMethod: function (o, k) {
      if (o.indexOf(k) > -1 && k !== "" && k != "|") {
        let rStr = new RegExp(k, "g");
        let sKey = '<font class="high-light">' + k + "</font>";
        let num = -1;
        let rHtml = new RegExp("<.*?>", "ig");
        let aHtml = o.match(rHtml);
        let sss = o.replace(rHtml, "{~}");
        sss = sss.replace(rStr, sKey);
        sss = sss.replace(/{~}/g, function () {
          //恢复html标签
          num++;
          return aHtml[num];
        });
        return sss;
      } else {
        return o;
      }
    },
    highLightReduce: function (o, k) {
      if (
        k.indexOf("*") > -1 ||
        k.indexOf(" ") > -1 ||
        k.indexOf("+") > -1 ||
        k.indexOf("!") > -1 ||
        k.indexOf("\uff01") > -1
      ) {
        let ar = [];
        ar = k.split(/[\*\s\!\+\uff01]/g);
        if (ar.length > 1) {
          return ar.reduce(this.highlightMethod, o);
        } else if (ar.length == 1) {
          return this.highlightMethod(o, k);
        } else {
          return o;
        }
      } else {
        return this.highlightMethod(o, k);
      }
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
              str += val[Object.keys(val)] + ";";
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
      var tableData = this.detailMain; //后台返回列表数据
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
      return flag;
    },
    /* 判断下个是否有值 是返回true 否判断下下一个  */
    nextJudge(Item, Index, data) {
      let nextFlag = false;
      if (this.detailMain[Item.key]) {
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
    addThisArticleToHistory() {
      const userInfo = this.personInfo;
      addBrowseRecordRecord({
        userId: userInfo.id,
        menu: getHubNamefromLib(this.$route.params.type),
        library: this.$route.params.type,
        gid: this.$route.params.gid,
        title: this.filterTitle(this.totalTitle),
        urlParameter: location.hash,
      })
        .then((res) => {
          if (res.code === 200) {
            // console.log('already add this article in history list')
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  updated() {
    document.title = this.totalTitle;
    this.$nextTick(() => {
      this.tiaoJumpByRouter();
    });
  },
  created() {
    // !this.personInfo&& this.$router.push('/login')
    this.getDetail();
    this.getArticlesInfo();
    Bus.$on("detail_ajax", (val) => {
      this.getDetail();
    });
  },

  mounted() {
    this.$nextTick(() => {
      // setWaterMark(
      //   "国网湖南省电力有限公司益阳市赫山区供电分公司",
      //   "2021年12月22日 超级管理员",
      //   "fulltext-wrap"
      // );
      this.getArticleConfig();
      this.routerHighlight();
      document.getElementById("app").addEventListener("scroll", this.fixTool);
    });
    window.riskBox = this.riskBox;
  },
  computed: {
    ...mapState({
      store: "store",
      list_data: "list",
    }),
    ...mapGetters(['personInfo']),
    mapdata() {
      let data = this.list_data.list_data;
      let datas = data[this.$route.params.type];
      return datas;
    },
    //返回带有关键字的高亮字符串
    filterArticle() {
      if (this.tKeyword.trim() !== "" && this.markPen) {
        let temp = this.tKeyword.trim();
        if (temp.length > 0) {
          return this.highLightReduce(this.subMain, temp);
        } else {
          return this.subMain;
        }
      } else {
        return this.subMain;
      }
    },
    //返回聚焦命中的字符串。
    focusFilterArticle() {
      if (this.tKeyword.trim() !== "") {
        let temp = this.tKeyword.trim();
        let len = temp.split(/[\*\s\!\+\uff01]/g).length;
        if (
          this.cbFocusWord &&
          (len > 1 || (len == 1 && this.subMain.indexOf(temp) > -1))
        ) {
          let ctext = this.highLightReduce(this.subMain, temp);
          ctext = ctext.replace(
            new RegExp('<div class="tiao-wrap">', "ig"),
            '<br><div class="tiao-wrap">'
          );
          ctext = ctext.replace(
            new RegExp(
              "<TABLE[^>]*>|<TD[^>]*>|<TR[^>]*>|</TABLE>|</TD>|</TR>|<TBODY[^>]*>|</TBODY>|</THEAD>|<THEAD[^>]*>|</TFOOT>|<TFOOT[^>]*>|<TABLE(.|\\r|\\n)+?</TABLE>",
              "ig"
            ),
            ""
          );
          ctext = ctext.replace(new RegExp('align="right"', "ig"), "");
          ctext = ctext.replace(new RegExp("<p>|</p>", "ig"), "<br>\n");
          let ret = /<br *\/{0,1}>/gi;
          let matchResult = ctext.match(ret);
          let ctexts = [];
          if (matchResult) {
            ctexts = ctext.split(/<br *\/{0,1}>|\r\n|\n/gi);
          } else {
            ctexts = ctext.split(/<div *\/{0,1}>/gi);
          }
          let rctexts = [];
          let regx = /high-light|high-light-selected/i;
          for (let i = 0; i < ctexts.length; i++) {
            if (regx.test(ctexts[i])) {
              rctexts.push(
                ctexts[i].replace(new RegExp('align="center"', "ig"), "")
              );
            }
          }
          let res_text = rctexts.join("<br /><hr /><br />");
          return res_text;
        } else {
          return this.subMain;
        }
      } else {
        return this.subMain;
      }
    },
  },
  destroyed() {
    //销毁工具栏定位
    document.getElementById("app").removeEventListener("scroll", this.fixTool);
    // removeWatermark();
  },
  beforeRouteLeave(to, from, next) {
    //销毁工具栏定位
    document.getElementById("app").removeEventListener("scroll", this.fixTool);
    next();
  },
};
</script>

<style scoped>
@import "../../assets/css/layout/detail.css";
.container {
  min-height: calc(100vh - 0.32rem);
  background-color: #fff;
  font: 0.16rem;
}
.fulltext >>> .title {
  margin-bottom: 0.15rem;
  font-size: 0.2rem;
  text-align: center;
  font-weight: bold;
}
.fulltext >>> .contractContent {
  padding: 0.08rem 0.15rem;
  margin-bottom: 0.08rem;
  background: #f7f7f7;
}
.fulltext >>> .termsContent {
  line-height: 0.32rem;
  color: #333;
}
.fulltext >>> .riskType {
  color: #006f6b;
}
.fulltext >>> .riskType > a {
  color: #006f6b;
  text-decoration: underline;
}
.risk {
  padding: 0.03rem 0.12rem;
  border-radius: 0.05rem;
  color: #fff;
  background: #006f6b;
  cursor: default;
}
.riskTitle {
  padding: 0.1rem;
}
.riskContent {
  height: 2.5rem;
  padding: 0.1rem;
  font-size: 0.14rem;
  overflow-y: auto;
}
</style>
