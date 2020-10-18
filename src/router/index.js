import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import store from '../store/index'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/login',
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/user',
    name: 'User',
    component: () => import('../views/User.vue'),
    children: [
      {
        path: '',
        redirect: 'search',
      },
      {
        path: 'search',
        name: 'Search',
        component: () => import('../views/BookSearch.vue'),
      },
      {
        path: 'lendMng',
        name: 'LendMng',
        component: () => import('../views/UserBorrow.vue'),
      },
      {
        path: 'penalty',
        name: 'Penalty',
        component: () => import('../views/Penalty.vue'),
      },
      {
        path: 'message',
        name: 'Message',
        component: () => import('../views/Message.vue'),
      },
      {
        path: 'card',
        name: 'Card',
        component: () => import('../views/Card.vue'),
      },
      {
        path: 'resetPwd',
        name: 'ResetPwd',
        component: () => import('../views/ResetPwd.vue'),
      },
    ],
  },
  {
    path: '/admin',
    name: 'Admin',
    component: () => import('../views/User.vue'),
    children: [
      {
        path: '',
        redirect: 'bookMng',
      },
      {
        path: 'bookMng',
        name: 'BookMng',
        component: () => import('../views/BookMng.vue'),
      },
      {
        path: 'lendMng',
        name: 'LendMng',
        component: () => import('../views/LendMng.vue'),
      },
      {
        path: 'orderMng',
        name: 'OrderMng',
        component: () => import('../views/OrderMng.vue'),
      },
      {
        path: 'readerMng',
        name: 'ReaderMng',
        component: () => import('../views/ReaderMng.vue'),
      },
      {
        path: 'adminMng',
        name: 'AdminMng',
        component: () => import('../views/AdminMng.vue'),
      },
      {
        path: 'resetPwd',
        name: 'ResetPwd',
        component: () => import('../views/ResetPwd.vue'),
      },
    ],
  },
  {
    path: '*',
    component: () => import('../views/NotFound.vue'),
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})
// 将sessionstorage中的数据取出放入vuex
function loadHistorySession() {
  const lightLibStore = sessionStorage.getItem('lightLibStore')
  if (lightLibStore !== null) {
    store.replaceState(JSON.parse(lightLibStore))
  }
}
loadHistorySession()

router.beforeEach((to, from, next) => {
  if (!store.state.logInAlready) {
    const path = '/login'
    if (to.path !== path) {
      router.push({ path })
    }
    next()
  }
})
export default router
