<template>
  <div id="readerMng">
    <span class="title">读者管理</span>
    <div class="title-medium">
      注册读者共 <span class="text-primary">123123</span> 人
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
      <div class="state flex flex-ai">
        <span class="label flex-sh">借阅证状态：</span>
        <a-select class="state-select" placeholder=""></a-select>
      </div>
      <div class="btn-group">
        <div class="flex flex-jcb">
          <a-button>清空</a-button>
          <a-button type="primary">搜索</a-button>
        </div>
      </div>
    </div>
    <a-divider class="divider" />
    <div class="actions flex flex-ai">
      <div class="result-sum">
        <span>查询到288个结果</span>
      </div>
      <div class="btn-group flex-sh">
        <a-button type="primary" @click="addReaderVisible=true">添加读者</a-button>
        <a-button type="danger">批量删除</a-button>
      </div>
    </div>
    <a-table size="middle" :row-selection="{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange }"
      :columns="readerColumns" :data-source="readers" class="readers">
      <div slot="action" class="item-actions">
        <a class="text-primary">编辑</a>
        <a class="text-danger">删除</a>
        <a class="text-danger">重置密码</a>
      </div>
    </a-table>
    <a-modal class="add-reader-modal" width="800px" title="添加读者" :visible="addReaderVisible" :maskClosable="false"
      :footer="null" :closable="false">
      <a-form-model ref="addReaderForm" :model="addReaderForm" :rules="addReaderRules" layout="vertical">
        <a-form-model-item label="读者名" prop="readerName">
          <a-input type="text" v-model="addReaderForm.readerName"></a-input>
        </a-form-model-item>
        <a-form-model-item label="读者号" prop="readerNum">
          <a-input type="text" v-model="addReaderForm.readerNum"></a-input>
        </a-form-model-item>
        <a-form-model-item label="身份" prop="status">
          <a-select placeholder="请选择身份"></a-select>
        </a-form-model-item>
        <div class="btn-group flex flex-jcb">
          <a-button @click="addReaderModalHide">取消</a-button>
          <a-button type="primary" @click="addReader">添加</a-button>
        </div>
      </a-form-model>
    </a-modal>
  </div>
</template>

<script>
const readerColumns = [
  {
    title: '读者名',
    dataIndex: 'readerName'
  },
  {
    title: '读者号',
    dataIndex: 'readerNum'
  },
  {
    title: '身份',
    dataIndex: 'status'
  },
  {
    title: '借阅证状态',
    dataIndex: 'state'
  },
  {
    title: '操作',
    scopedSlots: { customRender: 'action' }
  }
]
export default {
  data() {
    const validateReaderName = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('请输入读者名！'))
      } else {
        callback()
      }
    }
    const validateReaderNum = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('请输入读者号！'))
      } else if (!/^[0-9]*$/.test(value)) {
        return callback(new Error('只能输入数字！'))
      } else {
        callback()
      }
    }
    return {
      form: {
        readerName: '',
        readerNum: '',
        state: ''
      },
      selectedRowKeys: [],
      readerColumns,
      readers: [
        {
          readerName: 'lliiooiill',
          readerNum: '123123123123',
          status: '学生',
          state: '正常'
        },
        {
          readerName: 'lliiooiill',
          readerNum: '123123123123',
          status: '学生',
          state: '正常'
        },
        {
          readerName: 'lliiooiill',
          readerNum: '123123123123',
          status: '学生',
          state: '正常'
        }
      ],
      addReaderVisible: false,
      addReaderForm: {
        readerName: '',
        readerNum: '',
        status: ''
      },
      addReaderRules: {
        readerName: [{ validator: validateReaderName, trigger: 'submit' }],
        readerNum: [{ validator: validateReaderNum, trigger: 'submit' }],
        status: ''
      }
    }
  },
  methods: {
    onSelectChange(selectedRowKeys) {
      console.log('selectedRowKeys changed: ', selectedRowKeys)
      this.selectedRowKeys = selectedRowKeys
    },
    addReaderModalHide() {
      this.addReaderForm = {
        readerName: '',
        readerNum: '',
        status: ''
      }
      this.addReaderVisible = false
    },
    addReader() {
      const form = this.addReaderForm
      this.$refs.addReaderForm.validate(valid => {
        if (valid) {
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  },
  components: {}
}
</script>
<style lang="scss">
.add-reader-modal {
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
#readerMng {
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
    .label {
      margin-right: 10px;
    }
    .name,
    .number {
      width: 300px;
    }
    .state,
    .btn-group {
      width: 200px;
    }
    .btn-group {
      .ant-btn {
        width: 90px;
      }
    }
    .state-select {
      width: 100%;
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
  /deep/.ant-table {
    .item-actions {
      a:not(:last-child) {
        margin-right: 10px;
      }
    }
  }
}
</style>