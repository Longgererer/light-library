<template>
  <div id="sidebar">
    <div class="user-info flex flex-clo flex-ai">
      <div class="avatar flex flex-ai flex-jcc">
        <i class="icon iconfont icon-reader"></i>
      </div>
      <span class="nickname title-major">用户昵称</span>
      <span class="identity text-small">学生</span>
    </div>
    <ul class="menu-list noselect">
      <li class="menu-list-item listyle text-medium flex flex-jcc flex-ai"
        :class="judgeRoute(item.name)?'menu-list-item-active':''" v-for="(item, index) in menu[rootRoute]" :key="index"
        @click="jumpTo(item.name)">
        <i class="icon iconfont" :class="item.icon"></i>
        <span class="item-title">
          {{item.title}}
          <a-badge class="badge" v-if="item.name==='message'" count="25" />
        </span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    rootRoute: String
  },
  data() {
    return {
      menu: {
        '/user': [
          { title: '图书查询', icon: 'icon-search', name: 'search' },
          { title: '借阅管理', icon: 'icon-lendMng', name: 'lendMng' },
          { title: '罚款查询', icon: 'icon-penalty', name: 'penalty' },
          { title: '通知信息', icon: 'icon-inform', name: 'message' },
          { title: '借阅证　', icon: 'icon-papers', name: 'card' },
          { title: '修改密码', icon: 'icon-lock', name: 'resetPwd' },
          { title: '退出登录', icon: 'icon-logout', name: 'logout' }
        ],
        '/admin': [
          { title: '图书管理', icon: 'icon-bookMng', name: 'bookMng' },
          { title: '借阅管理', icon: 'icon-lendMng', name: 'lendMng' },
          { title: '预约管理', icon: 'icon-order', name: 'orderMng' },
          { title: '读者管理', icon: 'icon-reader', name: 'readerMng' },
          { title: '人员管理', icon: 'icon-admin', name: 'adminMng' },
          { title: '修改密码', icon: 'icon-lock', name: 'resetPwd' },
          { title: '退出登录', icon: 'icon-logout', name: 'logout' }
        ]
      }
    }
  },
  created() {
    console.log(this.$route)
  },
  computed: {
    routePath() {
      return this.$route.path
    }
  },
  methods: {
    jumpTo(name) {
      if (name === 'logout') {
        this.logout()
      } else {
        this.$router.push(name)
      }
    },
    judgeRoute(name) {
      const reg = new RegExp(`${this.rootRoute}/${name}`)
      return reg.test(this.routePath)
    },
    logout() {
      /**
       * 退出登陆流程
       * 弹出提示框确认是否登出
       * 清除本地保存的用户信息，进入登陆页面
       */
      this.$confirm({
        title: '你确定要退出登陆么？',
        content: '本地用户信息将不会被保存。',
        cancelText: '取消',
        okText: '登出',
        onOk() {
          //...
        }
      })
    }
  },
  components: {}
}
</script>

<style lang="scss" scoped>
#sidebar {
  width: 200px;
  background-color: $white;
  .user-info {
    padding-top: 50px;
    .avatar {
      width: 100px;
      height: 100px;
      background-color: $lightGray;
      border-radius: 50%;
      i {
        color: $white;
        font-size: 60px;
      }
    }
    .nickname {
      margin-top: 20px;
    }
    .identity {
      margin-top: 10px;
      color: $describe;
    }
  }
  .menu-list {
    margin: 25px 0 0 0;
    padding: 0;
    .menu-list-item {
      height: 40px;
      cursor: pointer;
      @include setTransition(all, 0.3s, ease);
      i {
        color: $black;
        height: 20px;
        width: 0;
        opacity: 0;
      }
      i,
      span {
        @include setTransition(all, 0.1s, ease-out);
      }
      .item-title {
        position: relative;
        /deep/.badge {
          position: absolute;
          left: 110%;
          top: 50%;
          transform: translateY(-50%);
          border: none;
          margin: 0 !important;
          .ant-badge-count {
            background-color: $danger;
            box-shadow: none;
          }
        }
      }
      &:hover {
        background-color: $hoverBgc;
        i {
          width: auto;
          opacity: 1;
        }
        span {
          margin-left: 15px;
        }
      }
    }
    .menu-list-item-active {
      background-color: $primary;
      i {
        color: $white;
        width: auto;
        opacity: 1;
      }
      span {
        margin-left: 15px;
        color: $white;
      }
      &:hover {
        background-color: $primary;
      }
    }
  }
}
</style>
