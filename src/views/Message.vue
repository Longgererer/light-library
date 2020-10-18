<template>
  <div id="message">
    <span class="title">通知信息</span>
    <a-tabs size="large" default-active-key="expire">
      <a-tab-pane key="expire">
        <span slot="tab" class="flex flex-ai">
          逾期
          <a-badge class="badge" count="5" />
        </span>
        <div class="message-list">
          <div v-for="(item, index) of 5" :key="index" class="message-item borbox">
            <span class="title-small">逾期提醒</span>
            <div>
              你于2020年5月10日从图书馆借阅的图书《京东技术揭秘》将于5天后逾期，请尽快归还，如未归还，按照每天*元的费用处以罚金。
            </div>
          </div>
        </div>
      </a-tab-pane>
      <a-tab-pane key="order">
        <span slot="tab" class="flex flex-ai">
          预约
          <a-badge class="badge" count="10" />
        </span>
        Content of Tab Pane 2
      </a-tab-pane>
      <a-tab-pane key="penalty">
        <span slot="tab" class="flex flex-ai">
          罚款
          <a-badge class="badge" count="10" />
        </span>
        Content of Tab Pane 3
      </a-tab-pane>
    </a-tabs>
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
#message {
  width: 100%;
  height: 100%;
  background-color: $white;
  border-radius: 4px;
  padding: 15px;
  /deep/.ant-tabs {
    .badge {
      margin-left: 5px;
    }
    .message-list{
      .message-item{
        padding: 15px;
        border: 2px solid $lightGray;
        border-radius: 4px;
        margin-bottom: 10px;
        cursor: pointer;
        &:hover{
          border-color: $primary;
        }
      }
    }
  }
}
</style>
