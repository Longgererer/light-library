<template>
  <div id="bookMng">
    <span class="title">图书管理</span>
    <div class="title-medium">
      图书馆共藏书 <span class="text-primary">31231321</span> 册
    </div>
    <div class="form flex flex-w">
      <div class="name flex flex-ai">
        <span class="label flex-sh">书名：</span>
        <a-input type="text" v-model="searchForm.name"></a-input>
      </div>
      <div class="author flex flex-ai">
        <span class="label flex-sh">作者：</span>
        <a-input type="text" v-model="searchForm.author"></a-input>
      </div>
      <div class="publisher flex flex-ai">
        <span class="label flex-sh">出版社：</span>
        <a-input type="text" v-model="searchForm.publisher"></a-input>
      </div>
      <div class="number flex flex-ai">
        <span class="label flex-sh">图书编号：</span>
        <a-input type="text" v-model="searchForm.number"></a-input>
      </div>
      <div class="type flex flex-ai">
        <span class="label flex-sh">类型：</span>
        <a-select class="type-select" placeholder="请选择图书类型">
        </a-select>
      </div>
      <div class="btn-group">
        <div class="flex flex-jcb">
          <a-button>清空</a-button>
          <a-button type="primary">搜索</a-button>
        </div>
      </div>
    </div>
    <a-divider class="divider" />
    <a-spin :spinning="bookMngSpinning" size="large" tip="加载中...">
      <div class="actions flex flex-ai">
        <div class="result-sum">
          <span>查询到288个结果</span>
        </div>
        <div class="btn-group flex-sh">
          <a-button type="primary" @click="addBookVisible=true">添加新图书</a-button>
          <a-button type="danger">批量删除</a-button>
        </div>
      </div>
      <a-table size="middle" :scroll="{ x: 1500 }"
        :row-selection="{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange }" :columns="allColumns"
        :data-source="allBooks" class="all-books">
        <span slot="price" slot-scope="text">￥{{text}}</span>
        <div slot="action">
          <a style="margin-right: 10px" class="text-primary">编辑</a>
          <a class="text-danger">删除</a>
        </div>
      </a-table>
    </a-spin>
    <a-modal class="add-book-modal" width="800px" title="添加新图书" :visible="addBookVisible" :maskClosable="false"
      :footer="null" :closable="false">
      <a-form-model ref="addBookForm" :model="addBookForm" :rules="addBookRules" layout="vertical">
        <a-form-model-item label="书名" prop="name">
          <a-input type="text" v-model="addBookForm.name"></a-input>
        </a-form-model-item>
        <a-form-model-item label="作者" prop="author">
          <a-input type="text" v-model="addBookForm.author"></a-input>
        </a-form-model-item>
        <a-form-model-item label="类型" prop="type">
          <a-select class="type-select" placeholder="请选择图书类型">
          </a-select>
        </a-form-model-item>
        <a-form-model-item label="出版社" prop="publisher">
          <a-input type="text" v-model="addBookForm.publisher"></a-input>
        </a-form-model-item>
        <a-form-model-item label="出版时间" prop="publishTime">
          <a-date-picker placeholder="请选择日期" />
        </a-form-model-item>
        <a-form-model-item label="单价" prop="price">
          <a-input type="text" v-model="addBookForm.price" prefix="￥" suffix="RMB" />
        </a-form-model-item>
        <div class="btn-group flex flex-jcb">
          <a-button @click="addBookModalHide">取消</a-button>
          <a-button type="primary" @click="addBook">添加</a-button>
        </div>
      </a-form-model>
    </a-modal>
  </div>
</template>

<script>
const allColumns = [
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
    title: '出版日期',
    dataIndex: 'publishTime'
  },
  {
    title: '单价',
    dataIndex: 'price',
    scopedSlots: { customRender: 'price' }
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
    const validateName = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('请输入书名！'))
      } else {
        callback()
      }
    }
    const validateAuthor = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('请输入作者！'))
      } else {
        callback()
      }
    }
    const validatePublisher = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('请输入出版社！'))
      } else {
        callback()
      }
    }
    const validatePrice = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('请输入单价！'))
      } else if (!/^[0-9]*$/.test(value)) {
        return callback(new Error('只能输入数字！'))
      } else {
        callback()
      }
    }
    return {
      bookMngSpinning: false,
      searchForm: {
        name: '',
        author: '',
        publisher: '',
        number: '',
        type: ''
      },
      addBookForm: {
        name: '',
        author: '',
        type: '',
        publisher: '',
        publishTime: '',
        price: '',
        poster: ''
      },
      addBookRules: {
        name: [{ validator: validateName, trigger: 'submit' }],
        author: [{ validator: validateAuthor, trigger: 'submit' }],
        type: '',
        publisher: [{ validator: validatePublisher, trigger: 'submit' }],
        publishTime: '',
        price: [{ validator: validatePrice, trigger: 'submit' }]
      },
      allColumns,
      allBooks: [
        {
          key: '1',
          name: '京东技术解密',
          author: '京东研发体系',
          publisher: '机械工业出版社',
          number: '3123123413213',
          type: '计算机类',
          publishTime: '2020-10-13',
          price: 99
        },
        {
          key: '2',
          name: '京东技术解密',
          author: '京东研发体系',
          publisher: '机械工业出版社',
          number: '3123123413213',
          type: '计算机类',
          publishTime: '2020-10-13',
          price: 99
        },
        {
          key: '3',
          name: '京东技术解密',
          author: '京东研发体系',
          publisher: '机械工业出版社',
          number: '3123123413213',
          type: '计算机类',
          publishTime: '2020-10-13',
          price: 99
        }
      ],
      selectedRowKeys: [],
      addBookVisible: false
    }
  },
  methods: {
    onSelectChange(selectedRowKeys) {
      console.log('selectedRowKeys changed: ', selectedRowKeys)
      this.selectedRowKeys = selectedRowKeys
    },
    addBookModalHide() {
      this.addBookForm = {
        name: '',
        author: '',
        type: '',
        publisher: '',
        publishTime: '',
        price: '',
        poster: ''
      }
      this.addBookVisible = false
    },
    addBook() {
      const form = this.addBookForm
      this.$refs.addBookForm.validate(valid => {
        if (valid) {
          alert('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  },
  created() {
    const path = this.$route.path
  },
  components: {}
}
</script>
<style lang="scss">
.add-book-modal {
  .ant-modal {
    top: 20px;
  }
  .ant-modal-body {
    .ant-form {
      width: 400px;
      margin: 0 auto;
      .ant-form-item {
        .ant-calendar-picker {
          width: 100%;
        }
      }
      .btn-group {
        .ant-btn {
          width: 150px;
        }
      }
    }
  }
}
</style>
<style lang="scss" scoped>
#bookMng {
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
      width: 300px;
      margin: 10px 20px 0 0;
      .label {
        margin-right: 10px;
      }
      .type-select {
        width: 100%;
      }
    }
    .btn-group {
      .ant-btn {
        width: 140px;
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
