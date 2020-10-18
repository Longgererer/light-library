<template>
  <div id="userBorrow">
    <span class="title">借阅管理</span>
    <div class="describe">
      <span class="text-medium">借阅和预约说明</span>
      <div>每位读者一次最多预约 <span class="text-danger">5</span> 本书，预约成功后需在 <span class="text-danger">10</span>
        天内前往图书馆取书，如超时未取，系统会自动取消预约。</div>
      <div>借阅的书籍需在 <span class="text-danger">2个月</span> 内归还，如超时未还，将产生罚款（详细请看罚款说明）。</div>
    </div>
    <a-tabs default-active-key="loan" size="large" :animated="false" @change="tabsChange">
      <a-tab-pane key="loan" tab="借阅">
        <div class="title-medium">当前已借阅图书共<span class="text-primary">5</span>本</div>
        <a-spin :spinning="lendSpinning" size="large" tip="加载中...">
          <a-table size="middle" :columns="loanColumns" :data-source="loanData" class="loan-table">
          </a-table>
        </a-spin>
      </a-tab-pane>
      <a-tab-pane key="order" tab="预约">
        <div class="title-medium">当前已预约图书共<span class="text-primary">5</span>本</div>
        <a-spin :spinning="orderSpinning" size="large" tip="加载中...">
          <a-table size="middle" :columns="orderColumns" :data-source="orderData" class="order-table">
            <a class="text-primary" slot="action">取消预约</a>
          </a-table>
        </a-spin>
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script>
const loanColumns = [
  {
    title: '书名',
    dataIndex: 'name'
  },
  {
    title: '图书编号',
    dataIndex: 'number'
  },
  {
    title: '作者',
    dataIndex: 'author'
  },
  {
    title: '出版社',
    dataIndex: 'publisher'
  },
  {
    title: '图书类型',
    dataIndex: 'type'
  },
  {
    title: '借阅时间',
    dataIndex: 'borrowDate'
  }
]
const orderColumns = [
  {
    title: '书名',
    dataIndex: 'name'
  },
  {
    title: '图书编号',
    dataIndex: 'number'
  },
  {
    title: '作者',
    dataIndex: 'author'
  },
  {
    title: '出版社',
    dataIndex: 'publisher'
  },
  {
    title: '图书类型',
    dataIndex: 'type'
  },
  {
    title: '借阅时间',
    dataIndex: 'borrowDate'
  },
  {
    title: '操作',
    scopedSlots: { customRender: 'action' }
  }
]
export default {
  data() {
    return {
      lendSpinning: true,
      orderSpinning: true,
      loanColumns,
      orderColumns,
      loanData: [
        {
          key: '1',
          name: '京东技术解密',
          number: '3123123413213',
          author: '京东研发体系',
          publisher: '机械工业出版社',
          type: '计算机类',
          borrowDate: '2020-10-13 15:00:23'
        },
        {
          key: '2',
          name: '京东技术解密',
          number: '3123123413213',
          author: '京东研发体系',
          publisher: '机械工业出版社',
          type: '计算机类',
          borrowDate: '2020-10-13 15:00:23'
        },
        {
          key: '3',
          name: '京东技术解密',
          number: '3123123413213',
          author: '京东研发体系',
          publisher: '机械工业出版社',
          type: '计算机类',
          borrowDate: '2020-10-13 15:00:23'
        },
        {
          key: '4',
          name: '京东技术解密',
          number: '3123123413213',
          author: '京东研发体系',
          publisher: '机械工业出版社',
          type: '计算机类',
          borrowDate: '2020-10-13 15:00:23'
        },
        {
          key: '5',
          name: '京东技术解密',
          number: '3123123413213',
          author: '京东研发体系',
          publisher: '机械工业出版社',
          type: '计算机类',
          borrowDate: '2020-10-13 15:00:23'
        }
      ],
      orderData: [
        {
          key: '1',
          name: '京东技术解密',
          number: '3123123413213',
          author: '京东研发体系',
          publisher: '机械工业出版社',
          type: '计算机类',
          borrowDate: '2020-10-13 15:00:23'
        },
        {
          key: '2',
          name: '京东技术解密',
          number: '3123123413213',
          author: '京东研发体系',
          publisher: '机械工业出版社',
          type: '计算机类',
          borrowDate: '2020-10-13 15:00:23'
        },
        {
          key: '3',
          name: '京东技术解密',
          number: '3123123413213',
          author: '京东研发体系',
          publisher: '机械工业出版社',
          type: '计算机类',
          borrowDate: '2020-10-13 15:00:23'
        },
        {
          key: '4',
          name: '京东技术解密',
          number: '3123123413213',
          author: '京东研发体系',
          publisher: '机械工业出版社',
          type: '计算机类',
          borrowDate: '2020-10-13 15:00:23'
        },
        {
          key: '5',
          name: '京东技术解密',
          number: '3123123413213',
          author: '京东研发体系',
          publisher: '机械工业出版社',
          type: '计算机类',
          borrowDate: '2020-10-13 15:00:23'
        }
      ]
    }
  },
  created() {
    this.getLendList()
  },
  methods: {
    getLendList() {
      /**
       * 根据读者账号获取读者借阅图书列表
       */
    },
    getOrderList() {
      /**
       * 根据读者账号获取读者预约图书列表
       */
    },
    tabsChange(activeKey) {
      if (activeKey === 'order') {
        this.getOrderList()
      } else {
        this.getLendList()
      }
    }
  },
  components: {}
}
</script>

<style lang="scss" scoped>
#userBorrow {
  width: 100%;
  height: 100%;
  background-color: $white;
  border-radius: 4px;
  padding: 15px;
  & > .describe {
    margin-top: 15px;
    background-color: $bgc;
    border-radius: 4px;
    padding: 10px;
  }
}
</style>
