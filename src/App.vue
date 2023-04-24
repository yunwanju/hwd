<template>
  <div id="app">
    <!-- <keep-alive> -->
    <!-- <router-view  v-wechat-title="$route.meta.heading" /> -->
    <!-- </keep-alive> -->
    <keep-alive>
      <router-view
        v-if="$route.meta.keepAlive"
        v-wechat-title="$route.meta.heading"
      />
    </keep-alive>
    <router-view
      v-if="!$route.meta.keepAlive"
      v-wechat-title="$route.meta.heading"
    />
  </div>
</template>

<script>
import "./assets/css/base/reset.css";
export default {
  name: "App",
  computed: {
    isCache() {
      return this.$store.state.store.isCache;
    },
  },
  data() {
    return {};
  },
};
</script>
