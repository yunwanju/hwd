<template>
  <div class="wscn-http404-container">
    <div class="errorTip">
      <div class="errorTips">
        <h4>您访问的页面不存在，请返回检查！</h4>
        <a href="javascript:" @click="goHome" target="_top">返回首页</a>
      </div>
    </div>
  </div>
</template>

<script>
import {goRobotHome} from '@/utils/util.js'
export default {
  name: "Page404",
  created() {
    console.log("404");
  },
  computed: {
    message() {
      return "网管说这个页面你不能进......";
    },
  },
  methods:{
    goHome(){
      this.$router.push({ path: '/' })
    //   goRobotHome();
    }
  }
};
</script>

<style scoped>
.wscn-http404-container {
  transform: translate(-50%, -50%);
  position: absolute;
  top: 40%;
  left: 50%;
}
.errorTip {
  width: 100%;
  height: 100%;
  background: #fff;
}
.errorTips {
  width: 370px;
  border-radius: 5px;
  padding: 40px 50px 40px 180px;
  min-height: 76px;
  position: absolute;
  background: #eee;
  left: 50%;
  margin-left: -300px;
  top: 50%;
  margin-top: -80px;
}
.errorTips > h4 {
  font-size: 14px;
  font-family: Microsoft Yahei;
  font-weight: bold;
  color: #353535;
  margin: 20px 0 10px 0;
}
.errorTips > ._top {
  font-size: 12px;
  color: #fff;
  text-decoration: none;
  padding: 8px 15px;
  background: #ed5040;
  border-radius: 3px;
}
</style>
