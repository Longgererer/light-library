<template>
  <div id="login" class="flex flex-ai flex-jcc">
    <div class="login-box flex flex-clo flex-ai">
      <div class="logo flex flex-jcc flex-ai">
        <img class="logo-img" src="../assets/images/logo.svg" alt="" />
        <span class="title">轻书图书管理系统</span>
      </div>
      <div class="login-title flex flex-jcc flex-ai">
        <span class="title-small">用户登录</span>
      </div>
      <a-form-model :model="form" ref="loginForm" :rules="rules" layout="vertical" class="form">
        <a-form-model-item label="帐号" prop="userId">
          <a-input type="text" size="large" v-model="form.userId" :maxLength="20" />
        </a-form-model-item>
        <a-form-model-item label="密码" prop="password">
          <a-input-password type="password" size="large" v-model="form.password" :maxLength="16" />
        </a-form-model-item>
        <a-form-model-item label="验证码（点击图像更换）" prop="code">
          <a-input type="text" size="large" v-model="form.code">
            <div slot="addonAfter" class="auth-code-init noselect">
              <a-spin class="spin" :spinning="authCodeImgLoading">
                <img class="auth-code-img" :src="authCodeImgUrl" v-show="authCodeImgUrl">
                <div class="img-screen flex flex-ai flex-jcc" @click="getAuthCodeImg">
                  点击更换验证码
                </div>
              </a-spin>
            </div>
          </a-input>
        </a-form-model-item>
        <a-form-model-item label="你的身份是：" class="flex">
          <a-radio-group v-model="form.id">
            <a-radio value="1">
              读者
            </a-radio>
            <a-radio value="2">
              管理员
            </a-radio>
            <a-radio value="3">
              超级管理员
            </a-radio>
          </a-radio-group>
        </a-form-model-item>
        <a-button type="primary" size="large" class="login-button" @click="login" :loading="isLogging">登录
        </a-button>
      </a-form-model>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import { debounce } from '@utils/tools'
import * as request from '@utils/request'
import cookieHandler from '@utils/handleCookie'
import { identityCodeMap } from '@utils/publicData'
export default {
  data() {
    const validateAccounts = (rule, value, callback) => {
      /**
       * 账户校验规则：是否为空，是否超过20个有效字符(input自动限制)，账户是否存在
       */
      if (!value) {
        return callback(new Error('请输入帐号！'))
      } else {
        callback()
      }
    }
    const validatePassword = (rule, value, callback) => {
      /**
       * 密码校验规则：是否为空，是否超过16个有效字符(input自动限制)
       */
      if (!value) {
        return callback(new Error('请输入密码！'))
      } else {
        callback()
      }
    }
    const validateAuthCode = (rule, value, callback) => {
      /**
       * 验证码校验规则：是否为空，验证码是否正确
       */
      if (!value) {
        return callback(new Error('请输入验证码！'))
      } else {
        callback()
      }
    }
    return {
      form: {
        userId: '',
        password: '',
        code: '',
        id: '1'
      },
      rules: {
        userId: [{ validator: validateAccounts, trigger: 'submit' }],
        password: [{ validator: validatePassword, trigger: 'submit' }],
        code: [{ validator: validateAuthCode, trigger: 'submit' }]
      },
      isLogging: false,
      authCodeImgUrl: '',
      loadAuthCode: false,
      authCodeImgLoading: true
    }
  },
  created() {
    this.getAuthCodeImg()
  },
  methods: {
    ...mapMutations(['handleLogInAlready', 'handleUserInfo']),
    login() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.isLogging = true
          const { userId: user_id, password, code, id } = this.form
          request
            .post(
              `/lightLib/library/login/${id}`,
              { user_id, password, code },
              {}
            )
            .then(res => {
              if (res === 1) {
                this.$message.error('登录失败!')
              } else if (res === 2) {
                this.$message.error('登录失败!')
              } else {
                /**
                 * 登陆成功后跳转路由
                 * 将用户信息存储至vuex
                 * 将token存储至cookie
                 */
                const [token, userInfo] = res
                const {
                  user_id: userId,
                  user_identity: id,
                  user_name: username,
                  user_state: state
                } = userInfo
                cookieHandler.setCookie('TOKEN', token, 20 * 60)
                this.handleLogInAlready(true)
                this.handleUserInfo({ userId, id, username, state })
                this.$message.success('登录成功!')
                this.$router.push(identityCodeMap[id])
              }
              this.isLogging = false
            })
        }
      })
    },
    getAuthCodeImg: debounce(function() {
      // 向后台请求验证码
      this.authCodeImgLoading = true
      request
        .get('/lightLib/library/VerifyCode', {
          responseType: 'arraybuffer'
        })
        .then(res => {
          // 将图片文件转换成base64编码
          this.authCodeImgUrl = `data:image/png;base64,${btoa(
            new Uint8Array(res).reduce(
              (data, byte) => data + String.fromCharCode(byte),
              ''
            )
          )}`
          this.authCodeImgLoading = false
        })
    }, 500)
  }
}
</script>

<style lang="scss" scoped>
#login {
  width: 100%;
  height: 100%;
  position: relative;
  z-index: 1;
  &::after {
    content: '';
    display: block;
    position: absolute;
    background: url(../assets/images/logo.svg) no-repeat center;
    background-size: auto 800px;
    opacity: 0.5;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: -1;
  }
  .login-box {
    width: 450px;
    height: 550px;
    border-radius: 4px;
    background-color: $white;
    box-shadow: 0 0 100px -40px $primary;
    .logo {
      margin-top: 20px;
      .logo-img {
        margin-right: 10px;
      }
    }
    .login-title {
      margin-top: 20px;
    }
    /deep/.form {
      width: 380px;
      margin-top: 15px;
      .auth-code-init {
        cursor: pointer;
        font-size: 14px;
        color: $primary;
      }
      .login-button {
        width: 100%;
      }
      .auth-code-img {
        width: 100px;
        height: 38px;
      }
      .ant-input-group-addon {
        padding: 0;
      }
      .spin {
        width: 100px;
        height: 38px;
      }
      .img-screen {
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        color: $white;
        background-color: rgba(0, 0, 0, 0.5);
        opacity: 0;
        &:hover {
          opacity: 1;
        }
      }
    }
  }
}
</style>
