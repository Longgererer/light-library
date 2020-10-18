<template>
  <div id="lendMng">
    <span class="title">借阅管理</span>
    <div class="title-medium">
      当前共有 <span class="text-primary">3123</span> 本图书被借阅
    </div>
    <div class="form flex flex-w">
      <div class="name flex flex-ai">
        <span class="label flex-sh">读者名：</span>
        <a-input type="text" v-model="form.readerName"></a-input>
      </div>
      <div class="number flex flex-ai">
        <span class="label flex-sh">读者号：</span>
        <a-input type="text" v-model="form.readerNum"></a-input>
      </div>
      <div class="overdue flex flex-ai">
        <a-checkbox v-model="form.isOverdue">逾期未还</a-checkbox>
      </div>
      <div class="btn-group flex flex-jcb">
        <a-button>清空</a-button>
        <a-button type="primary">搜索</a-button>
      </div>
    </div>
    <a-divider class="divider" />
    <div class="actions flex flex-ai">
      <div class="result-sum">
        <span>查询到288个结果</span>
      </div>
      <div class="btn-group flex-sh">
        <a-button type="danger" v-show="form.isOverdue">计算罚款</a-button>
        <a-button type="danger">批量删除</a-button>
      </div>
    </div>
    <a-table size="middle" :scroll="{ x: 1500 }"
      :row-selection="{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange }" :columns="lendColumns"
      :data-source="lendBooks" class="lend-books">
      <div slot="action">
        <a style="margin-right: 10px" class="text-primary" v-if="form.isOverdue">计算罚款</a>
        <a class="text-danger">删除</a>
      </div>
    </a-table>
  </div>
</template>

<script>
const lendColumns = [
  {
    title: '书名',
    dataIndex: 'name',
    fixed: 'left'
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
    title: '图书编号',
    dataIndex: 'number'
  },
  {
    title: '图书类型',
    dataIndex: 'type'
  },
  {
    title: '借出日期',
    dataIndex: 'lendTime'
  },
  {
    title: '读者名',
    dataIndex: 'readerName'
  },
  {
    title: '读者号',
    dataIndex: 'readerNum'
  },
  {
    title: '操作',
    width: 150,
    fixed: 'right',
    scopedSlots: { customRender: 'action' }
  }
]
export default {
  data() {
    return {
      form: {
        readerName: '',
        readerNum: '',
        isOverdue: false
      },
      selectedRowKeys: [],
      lendColumns,
      lendBooks: [
        {
          key: '1',
          name: '京东技术解密',
          author: '京东研发体系',
          publisher: '机械工业出版社',
          number: '3123123413213',
          type: '计算机类',
          lendTime: '2020-10-13 12:00:13',
          readerName: 'lliiooiill',
          readerNum: '20151110130'
        },
        {
          key: '2',
          name: '京东技术解密',
          author: '京东研发体系',
          publisher: '机械工业出版社',
          number: '3123123413213',
          type: '计算机类',
          lendTime: '2020-10-13 12:00:13',
          readerName: 'lliiooiill',
          readerNum: '20151110130'
        },
        {
          key: '3',
          name: '京东技术解密',
          author: '京东研发体系',
          publisher: '机械工业出版社',
          number: '3123123413213',
          type: '计算机类',
          lendTime: '2020-10-13 12:00:13',
          readerName: 'lliiooiill',
          readerNum: '20151110130'
        }
      ]
    }
  },
  methods: {
    onSelectChange(selectedRowKeys) {
      console.log('selectedRowKeys changed: ', selectedRowKeys)
      this.selectedRowKeys = selectedRowKeys
    }
  },
  components: {}
}
</script>

<style lang="scss" scoped>
#lendMng {
  width: 100%;
  height: 100%;
  background-color: $white;
  border-radius: 4px;
  padding: 15px;
  .title-medium {
    margin-top: 15px;
  }
  .form {
    margin-top: 10px;
    & > div {
      margin: 10px 20px 0 0;
    }
    .name,
    .number {
      width: 300px;
    }
    .overdue {
      width: auto;
    }
    .btn-group {
      width: 200px;
      .ant-btn {
        width: 90px;
      }
    }
  }
  .divider {
    margin-bottom: 0;
  }
  .actions {
    height: 42px;
    .result-sum {
      width: 100%;
    }
    .btn-group {
      .ant-btn:not(:first-child) {
        margin-left: 15px;
      }
    }
  }
}
</style>
