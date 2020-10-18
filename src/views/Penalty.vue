<template>
  <div id="penalty" class="borbox flex flex-clo">
    <span class="title">罚款查询</span>
    <div class="title-medium statistics">
      当前有 <span class="text-danger">5</span> 项罚款未缴纳，请尽快前去图书馆归还图书并缴纳罚款！
    </div>
    <div class="describe borbox">
      <span class="text-medium">罚款事项说明</span>
      <div>
        逾期还书，超出时间按照每天 <span class="text-danger">1</span> 元计算，不满一天按一天计算。
      </div>
    </div>
    <a-spin :spinning="penaltySpinning" size="large" tip="加载中...">
      <a-table :columns="columns" :data-source="data" class="table">
        <span slot="penalty" class="text-danger" slot-scope="text">￥{{text}}</span>
      </a-table>
    </a-spin>
  </div>
</template>

<script>
const columns = [
  {
    title: '书名',
    dataIndex: 'name',
    key: 'name'
  },
  {
    title: '图书编号',
    dataIndex: 'number',
    key: 'number'
  },
  {
    title: '借阅时间',
    dataIndex: 'borrowDate',
    key: 'borrowDate'
  },
  {
    title: '罚款金额',
    dataIndex: 'penalty',
    key: 'penalty',
    scopedSlots: { customRender: 'penalty' }
  },
  {
    title: '原因',
    dataIndex: 'reason',
    key: 'reason'
  }
]
export default {
  data() {
    return {
      columns,
      data: [
        {
          name: '京东技术解密',
          number: '123131231231231',
          borrowDate: '2020-10-1 10:30:23',
          penalty: 25,
          reason: '逾期未还'
        },
        {
          name: '京东技术解密',
          number: '123131231231231',
          borrowDate: '2020-10-1 10:30:23',
          penalty: 25,
          reason: '逾期未还'
        },
        {
          name: '京东技术解密',
          number: '123131231231231',
          borrowDate: '2020-10-1 10:30:23',
          penalty: 25,
          reason: '逾期未还'
        },
        {
          name: '京东技术解密',
          number: '123131231231231',
          borrowDate: '2020-10-1 10:30:23',
          penalty: 25,
          reason: '逾期未还'
        },
        {
          name: '京东技术解密',
          number: '123131231231231',
          borrowDate: '2020-10-1 10:30:23',
          penalty: 25,
          reason: '逾期未还'
        }
      ],
      penaltySpinning: true
    }
  },
  methods: {},
  components: {}
}
</script>

<style lang="scss" scoped>
#penalty {
  width: 100%;
  height: 100%;
  background-color: $white;
  border-radius: 4px;
  padding: 15px;
  .statistics {
    margin-top: 20px;
  }
  .describe {
    background-color: $bgc;
    padding: 10px;
    border-radius: 4px;
  }
  /deep/.table {
    margin-top: 20px;
  }
}
</style>
