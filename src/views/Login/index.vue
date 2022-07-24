<template>
  <div class="login-container">
    <div class="form-box">
      <el-row class="demo-avatar demo-basic">
        <el-col :span="12">
          <div class="demo-basic--circle">
            <div class="block">
              <el-avatar
                :size="80"
                src="https://www.haoy99.com/FileUpload/2019-02/Shui1Zhu11i1Pao1pptB-173234_109.jpg"
              ></el-avatar>
            </div>
          </div>
        </el-col>
      </el-row>
      <el-form :model="loginForm" :rules="rules" ref="loginFormRef">
        <el-form-item prop="username">
          <el-input
            v-model="loginForm.username"
            prefix-icon="el-icon-user-solid"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="loginForm.password"
            prefix-icon="el-icon-lock"
          ></el-input>
        </el-form-item>
        <el-form-item class="btn-item">
          <el-button type="primary" @click="login">登录</el-button>
          <el-button type="info" @click="reset">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  created () { },
  data () {
    return {
      loginForm: {
        username: 'admin',
        password: '123456'
      },
      rules: {
        username: [
          { required: true, message: '用户名不能为空', trigger: 'blur' },
          { min: 3, max: 8, message: '长度在3到8之间', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '密码不能为空', trigger: 'blur' },
          { min: 3, max: 8, message: '长度在3到8之间', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    reset () {
      this.$refs.loginFormRef.resetFields()
    },
    login () {
      this.$refs.loginFormRef.validate(valid => {
        if (valid) {
          this.$store.dispatch('user/login', this.loginForm).then(() => {
            this.$message.success('登录成功')
            this.$router.push('/home')
          })
        } else {
          this.$message.error('表单数据填写异常')
          return false
        }
      })
    }
  }

}
</script>

<style scoped lang='less'>
.login-container {
  width: 100vw;
  height: 100vh;
  background-color: #2b4b6b;
  display: flex;
  justify-content: center;
  align-items: center;
  .form-box {
    position: relative;
    width: 450px;
    height: 300px;
    background-color: #fff;
    padding: 0 15px;
    box-sizing: border-box;
    border-radius: 5px;
    .btn-item {
      text-align: right;
    }
  }
  .demo-basic--circle {
    position: absolute;
    left: 170px;
    top: -40px;
  }
  /deep/.el-form {
    margin-top: 70px;
  }
}
</style>
