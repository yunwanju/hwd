<template>
  <div class="togole-box">
    <span
      :class="{ active: $route.meta.type == 'hndwlegalopinion' }"
      @click="goExter"
      >法律意见书</span
    >
    <span
      :class="{ active: $route.meta.type == 'hndwlegalopinionmodel' }"
      @click="goInter"
      >法律意见书模板</span
    >
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    goExter() {
      this.$router.push({
        name: "hndwlegalopinion",
      });
    },
    goInter() {
      this.$router.push({
        name: "hndwlegalopinionmodel",
      });
    },
  },
};
</script>

<style lang="less" scoped="scoped">
.togole-box {
  height: 0.44rem;
  display: flex;
  overflow: auto;
  font-size: 0.14rem;
  align-items: center;
  padding: 0 0.1rem;
  background: #fff;
  span {
    flex-shrink: 0;
    padding: 0 0.05rem;
  }
  .active {
    color: #006f6b;
  }
}
</style>