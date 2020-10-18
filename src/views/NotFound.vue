<template>
  <div id="notFound" class="flex flex-ai flex-jcc">
    <div class="content">
      <div class="go-back title" @click="backToHome">
        <i class="icon iconfont icon-goback title"></i>
        <span>点击此处返回首页</span>
      </div>
      <img src="../assets/images/404.svg" alt="">
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },
  methods: {
    backToHome() {
      this.$router.replace('/user/search')
    }
  },
  components: {}
}
</script>

<style lang="scss" scoped>
#notFound {
  width: 100%;
  height: 100%;
  background-color: $primary;
  .content {
    position: relative;
    .go-back {
      position: absolute;
      left: 0;
      top: 0;
      color: $bgc;
      cursor: pointer;
      i,
      span {
        @include setTransition(all, 0.3s, ease);
      }
      span {
        margin-left: 5px;
      }
      &:hover {
        i,
        span {
          text-shadow: 2px 2px 0 $black !important;
        }
      }
    }
    img {
      width: 500px;
    }
  }
}
</style>
