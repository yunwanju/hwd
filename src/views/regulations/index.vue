<template>
  <Index></Index>
</template>

<script>
import Index from "@/components/index";
export default {
  data() {
    return {};
  },
  components: {
    Index,
  },
  activated() {
    const scrollTop = this.$route.meta.scrollTop;
    const $content = document.querySelector("#app");
    if (scrollTop && $content) {
      $content.scrollTop = scrollTop;
    }
  },
  created(){
    
  }
};
</script>