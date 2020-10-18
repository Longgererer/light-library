<template>
  <div id="bookSearch" class="borbox">
    <div class="simple-search flex flex-clo flex-ai" v-if="!complexSearchVisible">
      <span class="title-large">图书查询</span>
      <a-input-group class="search-box flex" compact>
        <a-select default-value="name" size="large" v-model="simpleSearchOption">
          <a-select-option value="name">书名</a-select-option>
          <a-select-option value="author">作者</a-select-option>
          <a-select-option value="publisher">出版社</a-select-option>
          <!-- <a-select-option value="type">类型</a-select-option> -->
        </a-select>
        <a-input-search size="large" placeholder="请输入查询信息..." @search="simpleSearch">
        </a-input-search>
      </a-input-group>
      <ul class="hot-list flex">
        <span>热门图书：</span>
        <li class="hot-list-item listyle text-small" v-for="(item, index) of hotList" :key="index"
          @click="searchHot(item)">{{item}}</li>
      </ul>
    </div>
    <div class="complex-search borbox flex flex-clo" v-else>
      <span class="title">图书查询</span>
      <div class="form flex flex-w">
        <div class="name flex flex-clo">
          <span class="label">书名</span>
          <a-input type="text" v-model="searchForm.name"></a-input>
        </div>
        <div class="author flex flex-clo">
          <span class="label">作者</span>
          <a-input type="text" v-model="searchForm.author"></a-input>
        </div>
        <div class="publisher flex flex-clo">
          <span class="label">出版社</span>
          <a-input type="text" v-model="searchForm.publisher"></a-input>
        </div>
        <div class="type flex flex-clo">
          <span class="label">类型</span>
          <a-select class="type-select" placeholder="请选择图书类型" v-model="searchForm.type">
            <a-select-option v-for="(item, index) of bookTypeList" :key="index" :value="item">
              {{item}}
            </a-select-option>
          </a-select>
        </div>
        <div class="btn-group flex flex-clo">
          <div>
            <a-button @click="resetForm">清空</a-button>
            <a-button type="primary" @click="searchBooks">搜索</a-button>
          </div>
        </div>
      </div>
      <div class="result-box">
        <div class="result-list">
          <div class="result-item borbox" v-for="(item, index) of resultList" :key="index">
            <!-- <a-skeleton :avatar="{shape:'square'}" active :paragraph="{ rows: 2 }" /> -->
            <div class="item-content flex">
              <img class="poster" :src="item.poster" alt="">
              <div class="item-info flex flex-clo flex-1">
                <span class="name title-small">{{item.name}}</span>
                <span class="author text-small describe">{{item.author}}</span>
                <span class="publisher text-small describe">{{item.publisher}}</span>
                <div>
                  <a-button type="primary" @click="orderBook" :disabled="item.stock===0||!item.isLendable">预约</a-button>
                  <span class="detail text-small" @click="detailVisible=true">查看详情
                    <a-icon type="double-right" />
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <a-pagination class="flex flex-jcr pagination" :total="85" :show-total="total => `查询到 ${total} 本图书`"
        :page-size="20" :default-current="1" size="small" />
    </div>
    <a-modal v-model="detailVisible" :footer="null" title="图书详情" width="450px">
      <div class="name">
        <span class="title-small">{{currentDetail.name}}</span>
      </div>
      <div class="detail flex">
        <img class="poster" :src="currentDetail.poster" alt="">
        <div class="content flex flex-clo">
          <div class="author">
            <span>作者：</span>
            <span class="describe">{{currentDetail.author}}</span>
          </div>
          <div class="publisher">
            <span>出版社：</span>
            <span class="describe">{{currentDetail.publisher}}</span>
          </div>
          <div class="publishTime">
            <span>出版时间：</span>
            <span class="describe">{{currentDetail.publishTime}}</span>
          </div>
          <div class="type">
            <span>图书类型：</span>
            <span class="describe">{{currentDetail.type}}</span>
          </div>
          <div class="id">
            <span>图书编号：</span>
            <span class="describe">{{currentDetail.id}}</span>
          </div>
          <div class="price">
            <span>单价：</span>
            <span class="describe">{{currentDetail.price}}</span>
          </div>
        </div>
      </div>
    </a-modal>
  </div>
</template>

<script>
import { isObjectEmpty } from '@utils/tools.js'
import { bookTypeList } from '@utils/publicData.js'
import { debounce } from '@utils/tools'
export default {
  data() {
    return {
      bookTypeList,
      hotList: [
        '京东技术解密',
        '图解HTTP',
        '昆虫记',
        '人人都是产品经理',
        '晚熟的人',
        '我对投资的思考'
      ],
      simpleSearchOption: 'name',
      searchForm: {
        name: '',
        author: '',
        publisher: '',
        type: '所有'
      },
      resultList: [
        {
          poster:
            'https://upload.wikimedia.org/wikipedia/zh/9/95/Time_USA_%E2%80%93_October_07%2C_2019.jpg',
          name: '时代周刊',
          author: '[美]理查德·斯坦格尔',
          publisher: '时代华纳',
          publishTime: '1923-3-3',
          type: '新闻杂志',
          id: '12312',
          price: '￥54',
          stock: 10,
          isLendable: true
        }
      ],
      currentDetail: {
        poster:
          'https://upload.wikimedia.org/wikipedia/zh/9/95/Time_USA_%E2%80%93_October_07%2C_2019.jpg',
        name: '时代周刊',
        author: '[美]理查德·斯坦格尔',
        publisher: '时代华纳',
        publishTime: '1923-3-3',
        type: '新闻杂志',
        id: '12312',
        price: '￥54'
      },
      complexSearchVisible: false,
      detailVisible: false
    }
  },
  created() {
    this.searchByQuery()
  },
  computed: {
    routeQuery() {
      return this.$route.query
    }
  },
  watch: {
    routeQuery(newQuery) {
      this.searchByQuery()
    }
  },
  methods: {
    searchByQuery() {
      /**
       * 判断路由是否包含了参数，有参数则代表有查询信息，显示详细查询页面
       * 将参数值放到对应的查询表单中
       * 执行查询
       */
      const query = this.$route.query
      if (isObjectEmpty(query)) {
        this.complexSearchVisible = false
      } else {
        const { name = '', author = '', publisher = '', type = '所有' } = query
        this.searchForm = { name, author, publisher, type }
        this.complexSearchVisible = true
      }
    },
    simpleSearch(value) {
      /**
       * 判断搜索框是否为空
       * 不为空则显示高级搜索界面，并请求后台匹配图书信息并渲染至页面上
       */
      this.$router.push({
        path: '/user/search',
        query: { [`${this.simpleSearchOption}`]: value }
      })
    },
    searchBooks() {
      const {
        name = '',
        author = '',
        publisher = '',
        type = ''
      } = this.searchForm
      this.$router.push(
        {
          path: '/user/search',
          query: {
            name,
            author,
            publisher,
            type
          }
        },
        onComplete => {},
        onAbort => {}
      )
    },
    resetForm() {
      this.searchForm = {
        name: '',
        author: '',
        publisher: '',
        type: ''
      }
    },
    searchHot(name) {
      this.$router.push({
        path: '/user/search',
        query: { name }
      })
    },
    orderBook: debounce(function() {
      this.$message.success('预约成功!')
    }, 500)
  },
  components: {}
}
</script>

<style lang="scss" scoped>
.ant-modal {
  .detail {
    margin-top: 20px;
    .poster {
      width: 100px;
      height: 140px;
      border-radius: 4px;
    }
    .content {
      margin-left: 25px;
      & > div {
        margin-bottom: 5px;
      }
    }
  }
}
#bookSearch {
  width: 100%;
  min-height: 100%;
  background-color: $white;
  border-radius: 4px;
  .simple-search {
    padding-top: 150px;
    .search-box {
      margin-top: 100px;
      width: 650px;
    }
    .hot-list {
      width: 650px;
      margin: 5px 0 0 0;
      padding: 0;
      color: $describe;
      cursor: pointer;
      .hot-list-item {
        margin-left: 10px;
        &:hover {
          color: $primary;
          text-decoration: underline;
        }
      }
    }
  }
  .complex-search {
    padding: 15px;
    /deep/.form {
      margin-top: 15px;
      & > div {
        &:not(:last-child) {
          margin-right: 15px;
        }
        .label {
          margin-bottom: 5px;
        }
      }
      .type-select {
        width: 212px;
      }
      .btn-group {
        text-align: right;
        margin-top: 26px;
        .ant-btn {
          &:not(:first-child) {
            margin-left: 15px;
          }
        }
      }
    }
    .result-box {
      .result-list {
        margin-top: 20px;
        display: grid;
        grid-gap: 15px;
        grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
        .result-item {
          height: 150px;
          padding: 15px;
          border-radius: 4px;
          border: 2px solid $bgc;
          &:hover {
            border-color: $primary;
          }
          /deep/.ant-skeleton {
            .ant-skeleton-avatar {
              width: 85px;
              height: 120px;
            }
          }
          .item-content {
            .poster {
              width: 85px;
              height: 120px;
              border-radius: 2px;
            }
            .item-info {
              margin-left: 20px;
              .author,
              .publisher {
                margin-top: 5px;
              }
              .ant-btn {
                margin-top: 5px;
              }
              .detail {
                margin-left: 30px;
                color: $black;
                cursor: pointer;
                &:hover {
                  color: $primary;
                }
              }
            }
          }
        }
      }
    }
    .pagination {
      margin: 50px 0;
    }
  }
}
</style>
