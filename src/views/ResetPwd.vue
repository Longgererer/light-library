<template>
  <div id="ResetPwd" class="borbox">
    <span class="title">修改密码</span>
    <a-form-model :model="form" :rules="rules" layout="vertical" ref="form" class="form">
      <a-form-model-item label="密码" prop="password" ref="password" :autoLink="false">
        <div class="describe">
          密码长度为 <span class="text-warn">6 ~ 16</span> 位，不得包含除大小写英文字母、数字和特殊字符（<span
            class="text-warn">$!&^*#%@</span>）外的其他字符
        </div>
        <a-input-password type="password" size="large" v-model="form.password" :maxLength="16"
          @change="() => {$refs.password.onFieldChange()}" />
      </a-form-model-item>
      <a-form-model-item label="重复密码" prop="rePassword">
        <a-input type="password" size="large" v-model="form.rePassword" :maxLength="16" />
      </a-form-model-item>
      <a-button size="large" type="primary" class="form-btn" @click="submit">修改密码</a-button>
    </a-form-model>
  </div>
</template>

<script>
export default {
  data() {
    const validatePassword = (rule, value, callback) => {
      /**
       * 密码校验规则：是否为空，长度是否为6~16位，是否包含特殊字符，
       */
      const reg = /^[0-9a-zA-Z$!&^*#%@]{6,16}$/
      if (!value) {
        return callback(new Error('请输入密码！'))
      } else if (value.length < 6) {
        return callback(new Error('密码长度错误！'))
      } else if (!reg.test(value)) {
        return callback(new Error('密码格式错误！'))
      } else {
        callback()
      }
    }
    const validateRePassword = (rule, value, callback) => {
      /**
       * 重复密码校验规则：是否为空，是否与密码相同
       */
      if (!value) {
        return callback(new Error('请重复密码！'))
      } else if (value !== this.form.password) {
        return callback(new Error('两次密码不一致！'))
      } else {
        callback()
      }
    }
    return {
      form: {
        password: '',
        rePassword: ''
      },
      rules: {
        password: [
          {
            validator: validatePassword,
            trigger: 'change'
          }
        ],
        rePassword: [
          {
            validator: validateRePassword,
            trigger: 'change'
          }
        ]
      }
    }
  },
  methods: {
    submit(){
      this.$refs.form.validate(valid=>{
        if(valid){
          this.$message.success('修改密码成功！')
        }
      })
    }
  },
  components: {}
}
</script>

<style lang="scss" scoped>
#ResetPwd {
  width: 100%;
  height: 100%;
  background-color: $white;
  border-radius: 4px;
  padding: 15px;
  /deep/.form {
    width: 400px;
    margin: 0 auto;
    margin-top: 60px;
    label {
      font-size: 16px;
    }
    .form-btn {
      width: 100%;
      font-size: 14px;
    }
  }
}
</style>
