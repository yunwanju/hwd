<template>
  <div class="fields">
    <h2>基本信息</h2>
    <ul>
      <!-- {{fileIdData[$route.params.type]}} -->
      <template v-for="(item, key) in fileIdData[$route.params.type]">
        <li
          :key="key"
          :class="'long'"
          v-if="
            item.type === 'link_array' &&
            lawInfo[item.key] &&
            filterSpecial(lawInfo[item.key]).length
          "
        >
          <strong>{{ item.chn }}</strong>
          <span v-for="(item1, key1) in lawInfo[item.key]" :key="key1">
            {{...(Object.values(item1))}}
          </span>
        </li>
        <li
          :key="key"
          :class="'long'"
          v-if="
            item.type === 'string' &&
            lawInfo[item.key] 
          "
        >
          <strong>{{ item.chn }}</strong>
          {{ lawInfo[item.key] }}
        </li>
        <li
          :key="key"
          :class="'long'"
          v-if="
            item.type === 'array_case_special_zhu' &&
            lawInfo[item.key] &&
            lawInfo[item.key].length
          "
        >
          <strong>{{ item.chn }}</strong>
          <span v-for="(item1, key1) in lawInfo[item.key]" :key="key1">
            {{ filterCategory(item1) }}
          </span>
        </li>
        <li
          :key="key"
          :class="'long'"
          v-if="
            item.type === 'array' &&
            lawInfo[item.key] &&
            lawInfo[item.key].length
          "
        >
          <strong>{{ item.chn }}</strong>
          <span v-for="(item1, key1) in lawInfo[item.key]" :key="key1">
            {{ item1 }}
          </span>
        </li>
        <li
          :key="key"
          :class="'long'"
          v-if="
            item.type === 'link_array_article' &&
            lawInfo[item.key] &&
            filterSpecial(lawInfo[item.key]).length
          "
        >
          <strong>{{ item.chn }}</strong>
          <span v-for="(item1, key1) in lawInfo[item.key]" :key="key1">
            {{
              lawInfo[item.key][0].title ||
              lawInfo[item.key][0].Title ||
              lawInfo[item.key][0].name
            }}
          </span>
        </li>
        <li :key="key" :class="'long'" v-if="item.type === 'object'">
          <strong>{{ item.chn }}</strong>
          <span v-for="(item1, key1) in lawInfo[item.key]" :key="key1">
            {{ item1 }}
          </span>
        </li>
        <li :key="key" :class="'long'" v-if="item.type === 'html_string'&&lawInfo[item.key]">
          <strong>{{ item.chn }}</strong>
          <span v-html="lawInfo[item.key]"></span>
        </li>
      </template>
    </ul>
  </div>
</template>

<script>
import fileIdData from "@/utils/feildData";
import Bus from "@/utils/eventBus";
export default {
  data() {
    return {
      fileIdData: fileIdData,
      // detailtoList: detailtoList,
    };
  },
  props: {
    lawInfo: {
      type: Object,
      default: function () {
        return {};
      },
    },
  },
  methods: {
    filterSpecial(item) {
      if (!item) return;
      item = item.filter(function (value) {
        return value != "";
      });
      return item;
    },
    filterCategory(item) {
      var str = "";
      item.forEach(function (value, index) {
        if (index != item.length - 1) {
          str += value.name + " > ";
        } else {
          str += value.name;
        }
      });
      return str;
    },
    detailtoList(data, val, path, type) {
      if (new RegExp("/detail/(regulation)/[0-9a-zA-Z]{1,}", "g").test(path)) {
        let newRoutes = this.$router.resolve({
          path: "/regulation",
          query: {
            keyCode: Object.keys(data)[0],
            lib: type,
            classCodeKey: val == "docCate" ? "docSubCate" : val,
            zhName: encodeURI(Object.values(data)[0]),
          },
        });
        window.open(newRoutes.href, "_self");
        Bus.$emit("listSideBarInit");
      } else if (
        new RegExp(
          "/detail/(hndwcontract)|(hndwlegalopinionmodel)/[0-9a-zA-Z]{1,}",
          "g"
        ).test(path)
      ) {
        let newRoutes = this.$router.resolve({
          path: `/${type}`,
          query: {
            keyCode: Object.keys(data)[0],
            lib: type,
            classCodeKey: val,
            zhName: encodeURI(Object.values(data)[0]),
          },
        });
        window.open(newRoutes.href, "_self");
        Bus.$emit("listSideBarInit");
      }
    },
  },
  created() {
    console.log(this.lawInfo);
  },
  computed: {
    filterArrkey: function () {
      let conf = this.filterConfig[this.chanelType];
      let Arrkey = [];
      for (let i = 0; i < conf.length; i++) {
        Arrkey[i] = conf[i].key;
      }
      return Arrkey;
    },
    filterArrchn: function () {
      let conf = this.filterConfig[this.chanelType];
      let Arrchn = [];
      for (let i = 0; i < conf.length; i++) {
        Arrchn[i] = conf[i].chn;
      }
      return Arrchn;
    },
    filterArrtype: function () {
      let conf = this.filterConfig[this.chanelType];
      let Arrtype = [];
      for (let i = 0; i < conf.length; i++) {
        Arrtype[i] = conf[i].type;
      }
      return Arrtype;
    },
    computeClassLong: function () {
      return function (val) {
        // if (
        //     Object.values(val[0]).join("").length > 30 ||
        //     val.length > 1
        // ) {
        //     return "long";
        // } else {
        //     return "";
        // }
      };
    },
  },
};
</script>
<style scoped lang="less">
.fields {
  padding: 0.2rem 0.2rem 0.7rem;
  h2 {
    line-height: 0.3rem;
    font-size: 0.16rem;
    margin-bottom: 0.2rem;
    font-weight: 700;
  }
  .fileName {
    font-size: 0.14rem;
    line-height: 0.3rem;
    a {
      color: #006f6b;
    }
  }
}
.fields ul li {
  position: relative;
  padding-left: 1rem;
  font-size: 0.14rem;
  color: #999;
  vertical-align: top;
  margin-bottom: 0.1rem;
  line-height: 0.3rem;
}
.fields ul li strong {
  position: absolute;
  text-align: left;
  width: 1rem;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  left: 0;
}
.fields ul li span p {
  display: inline;
  padding: 0;
}

.fields ul li a {
  margin-right: 8px;
  color: #006f6b;
}
</style>