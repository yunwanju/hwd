<template>
  <div class="grid-right">
    <h2 class="navTitle">数据关联</h2>
    <div class="noDataAll" v-if="!lenovo || Object.keys(lenovo).length == 0">
      无相关内容
    </div>
    <div class="lenovo" v-if="versionRelationList.length > 0">
      <h4 class="title"><van-icon name="description" />制度变迁</h4>
      <ul class="list" v-for="subItem in versionRelationList" :key="subItem.id">
        <li>
          <i class="solidCircle"></i>
          <a v-if="subItem.url" class="jump_detail" :href="subItem.url">
            {{ subItem.title }}
          </a>
          <router-link
            v-else
            class="jump_detail"
            :to="'/detail/' + (store.listJson.index || subItem.type) + '/' + subItem.id"
          >
            {{ subItem.title }}
          </router-link>
        </li>
      </ul>
    </div>
    <div
      class="lenovo"
      v-if="Object.keys(lenovo).length > 0"
      v-for="(item, key, index) in lenovo"
      :key="index"
    >
      <h4 class="title"><van-icon name="description" />{{ key }}</h4>
      <ul class="list" v-for="subItem in item.data" :key="subItem.id">
        <li>
          <i class="solidCircle"></i>
          <a v-if="subItem.url" class="jump_detail" :href="subItem.url">
            {{ subItem.title }}
          </a>
          <router-link
            v-else
            class="jump_detail"
            :to="'/detail/' + (store.listJson.index || subItem.type) + '/' + subItem.id"
          >
            {{ subItem.title }}
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import { lenovoAPI } from "@/api/lenovo.js";
import { mapState } from "vuex";
export default {
  props: ["library", "gid", "fromArticleTitle", "versionRelationList"],
  data() {
    return {
      lenovo: {},
      lenovoAPI: lenovoAPI,
      handleLenData: {},
    };
  },
  computed: {
    ...mapState({
      list_data: "list",
      store: "store",
    }),
  },

  created() {
    this.getLenovo();
  },
  methods: {
    //获得正文右侧数据
    getLenovo() {
      this.lenovoAPI({
        library: this.library,
        gid: this.gid,
      })
        .then((res) => {
          console.log(res.data);
          this.lenovo = res.data.magicWeaponLenovo;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // refresh(){
    //   this.$router.go(0)
    // }
  },
  watch:{
    $route(){
      this.$router.go(0)
    }
  }
};
</script>
<style scoped>
.grid-right {
  padding-bottom: 0.7rem;
}
.navTitle {
  height: 0.4rem;
  background-color: #006f6b;
  font-size: 0.16rem;
  line-height: 0.4rem;
  color: #fff;
  padding-left: 0.125rem;
}
.title {
  font-size: 0.18rem;
  height: 0.4rem;
  line-height: 0.4rem;
  padding: 0 0.2rem;
  font-weight: bold;
  color: #006f6b;
}
.title .van-icon {
  font-size: 0.2rem;
  vertical-align: text-top;
  margin-right: 0.04rem;
}
.solidCircle {
  position: absolute;
  left: 0;
  top: 0.07rem;
  width: 0.04rem;
  height: 0.04rem;
  background-color: #bfbfbf;
  border-radius: 0.02rem;
}
.list {
  padding: 0.1rem 0.2rem;
}
.list > li {
  position: relative;
  font-size: 0.14rem;
  padding-left: 0.1rem;
}
.noDataAll {
  text-align: center;
  font-size: 0.16rem;
  color: #666;
  padding: 0.1rem 0;
}
.jump_detail {
  display: block;
  color: #666;
}
.jump_detail:hover {
  cursor: pointer;
  text-decoration: underline;
}
.more {
  margin-bottom: 0.15rem;
  text-align: center;
}
.more > a {
  font-size: 0.12rem;
  color: #666;
}
</style>
