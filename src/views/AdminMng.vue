<template>
  <div id="adminMng">
    <span class="title">人员管理</span>
    <div class="title-medium">
      工作人员共 <span class="text-primary">6</span> 人
    </div>
    <div class="title-major">
      <span>超级管理员</span>
      <a-icon type="plus-circle" theme="filled" class="text-primary pointer" />
    </div>
    <div class="admin-list">
      <div class="admin-item borbox flex">
        <div class="avatar flex flex-ai flex-jcc flex-sh">
          <i class="icon iconfont icon-admin"></i>
        </div>
        <!-- <a-skeleton active size="small" :title="false" :paragraph="{ rows: 3, width: [80,100,50] }" /> -->
        <div>
          <span class="title-major">
            管理员名
          </span>
          <div class="admin-number">
            <span class="describe">编号：</span>
            <span>2131231123</span>
          </div>
          <div class="actions">
            <a class="text-primary" style="margin-right: 25px">编辑</a>
            <a class="text-danger">删除</a>
          </div>
        </div>
      </div>
    </div>
    <div class="title-major">
      <span>管理员</span>
      <a-icon type="plus-circle" theme="filled" class="text-primary pointer" />
    </div>
    <div class="admin-list">
      <div class="admin-item borbox flex" v-for="(item, index) of 5">
        <div class="avatar flex flex-ai flex-jcc flex-sh">
          <i class="icon iconfont icon-admin"></i>
        </div>
        <!-- <a-skeleton active size="small" :title="false" :paragraph="{ rows: 3, width: [80,100,50] }" /> -->
        <div>
          <span class="title-major">
            管理员名
          </span>
          <div class="admin-number">
            <span class="describe">编号：</span>
            <span>2131231123</span>
          </div>
          <div class="actions">
            <a class="text-primary" style="margin-right: 25px">编辑</a>
            <a class="text-danger">删除</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },
  methods: {},
  components: {}
}
</script>

<style lang="scss" scoped>
#adminMng {
  width: 100%;
  height: 100%;
  background-color: $white;
  border-radius: 4px;
  padding: 15px;
  .title-medium {
    margin-top: 15px;
  }
  .title-major {
    margin-top: 15px;
    .anticon {
      margin-left: 5px;
    }
  }
  .admin-list {
    margin-top: 10px;
    display: grid;
    grid-gap: 15px;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    .admin-item {
      height: 130px;
      padding: 20px;
      border: 2px solid $lightGray;
      border-radius: 4px;
      &:hover {
        border-color: $primary;
      }
      .avatar {
        width: 60px;
        height: 60px;
        border-radius: 50%;
        background-color: $lightGray;
        margin-right: 20px;
        i {
          color: $white;
          font-size: 40px;
        }
      }
      .admin-number {
        margin-top: 5px;
      }
      .actions {
        margin-top: 20px;
        text-align: right;
      }
    }
  }
}
</style>
