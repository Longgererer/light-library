<template>
  <div id="card" class="borbox flex flex-clo">
    <span class="title">借阅证</span>
    <div class="electronic-card noselect">
      <div class="content borbox flex flex-clo">
        <span class="card-name title-medium">轻书图书馆</span>
        <div class="name">
          <span class="describe">读者名</span>
          <span>{{cardInfo.name}}</span>
        </div>
        <div class="id">
          <span class="describe">读者号</span>
          <span>{{cardInfo.id}}</span>
        </div>
        <div class="status">
          <span class="describe">身份</span>
          <span>{{cardInfo.status}}</span>
        </div>
        <div class="state">
          <span class="describe">借阅证状态</span>
          <span class="state-val text-success">{{cardInfo.state}}</span>
        </div>
      </div>
      <div class="card-decoration">
        <i class="icon iconfont icon-logo"></i>
      </div>
    </div>
    <div class="report-lose flex flex-clo flex-ai">
      <a-button type="danger" size="large" @click="loseModalVisible=true">借阅证挂失</a-button>
      <span class="describe">线上挂失后，需凭有效证件到图书馆咨询台或各分馆咨询台办理相关手续。挂失前所有被借图书由借书证所属人承担责任</span>
    </div>
    <a-modal title="借阅证挂失" :visible="loseModalVisible" cancelText="取消" okText="确认" okType="danger"
      @cancel="loseModalVisible=false" @ok="loseCard">
      <span>确认挂失借阅证（借阅证将置为挂失状态）？</span>
    </a-modal>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loseModalVisible: false,
      cardInfo: {
        name: 'lliiooiill',
        id: '1231231231232',
        status: '学生',
        state: '正常'
      }
    }
  },
  methods: {
    loseCard() {
      /**
       * 挂失借阅证，将借阅证状态置为挂失
       */
      this.loseModalVisible = false
    }
  },
  components: {}
}
</script>

<style lang="scss" scoped>
#card {
  width: 100%;
  height: 100%;
  background-color: $white;
  border-radius: 4px;
  padding: 15px;
  .electronic-card {
    width: 400px;
    height: 240px;
    border-radius: 10px;
    box-shadow: 0 2px 6px 0 $lightGray;
    margin: 0 auto;
    margin-top: 60px;
    position: relative;
    overflow: hidden;
    cursor: pointer;
    &:hover{
      box-shadow:  0 2px 6px 0 $primary;
    }
    .content {
      padding: 20px;
      .card-name {
        color: $primary;
        font-weight: bold;
      }
      & > div {
        margin-top: 15px;
        .describe {
          margin-right: 20px;
        }
      }
    }
    .card-decoration {
      width: 200px;
      height: 200px;
      border-color: transparent $primary;
      border-width: 200px 200px 0px 0px;
      border-style: solid;
      position: absolute;
      right: 0;
      bottom: 0;
      i {
        font-size: 70px;
        position: absolute;
        top: -125px;
        right: -180px;
        color: $white;
      }
    }
  }
  .report-lose {
    margin-top: 50px;
    .describe {
      margin-top: 15px;
    }
  }
}
</style>
