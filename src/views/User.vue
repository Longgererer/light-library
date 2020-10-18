<template>
  <div id="user" class="flex">
    <Sidebar :rootRoute="rootRoute"></Sidebar>
    <div class="sec-view borbox">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import Sidebar from '@components/Sidebar.vue'
export default {
  data() {
    return {}
  },
  computed: {
    rootRoute() {
      return this.$route.matched[0].path
    }
  },
  methods: {},
  components: {
    Sidebar
  }
}
</script>

<style lang="scss" scoped>
#user {
  width: 100%;
  height: 100%;
  .sec-view {
    width: calc(100% - 200px);
    padding: 15px;
    height: 100%;
    overflow-y: auto;
  }
}
</style>
