export default {
  // 登录状态
  handleLogInAlready: (state, already) => {
    state.logInAlready = already
  },
  // 用户信息
  handleUserInfo: (state, userInfo) => {
    state.userInfo = userInfo
  },
}
