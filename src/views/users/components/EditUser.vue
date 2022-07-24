<template>
<div>
  <el-dialog title="编辑用户" :visible='showedituser' @close='cancle'>
  <el-form label-width="100px" :model="userform" :rules="rules" ref='userform'>
    <el-form-item label='用户名称' prop="username" >
      <el-input v-model='userform.username' style="width:90%" disabled></el-input>
    </el-form-item>
    <el-form-item label='邮箱' prop="email">
      <el-input v-model='userform.email'  style="width:90%"></el-input>
    </el-form-item>
    <el-form-item label='手机号' prop="mobile">
      <el-input v-model='userform.mobile'  style="width:90%"></el-input>
    </el-form-item>
  </el-form>
  <el-row type="flex" justify="center" align="middle">
    <el-col :span="6">
      <el-button size="small" @click="cancle">取消</el-button>
      <el-button size="small" type="primary" @click='sure'>确定</el-button>
    </el-col>
  </el-row>
</el-dialog>
</div>
</template>

<script>
import { editUserById, userInfoById } from '@/api/user'
export default {
  name: 'EditUser',
  props: {
    showedituser: {
      type: Boolean,
      default: false
    }
  },
  created () {},
  data () {
    return {
      userform: {
        username: '',
        email: '',
        mobile: ''
      },
      rules: {
        email: [{ required: true, message: '邮箱不能为空', trigger: 'blur' },
          { pattern: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, message: '邮箱格式不正确', trigger: 'blur' }
        ],
        mobile: [{ required: true, message: '手机号不能为空', trigger: 'blur' }, { pattern: /^(?:(?:\+|00)86)?1\d{10}$/, message: '手机格式不正确', trigger: 'blur' }]
      }
    }
  },
  methods: {
    // 获取编辑信息
    async userInfoById (id) {
      const res = await userInfoById(id)
      this.userform = res.data.data
    },
    // 点击取消
    cancle () {
      this.userform = {
        email: '',
        mobile: ''
      }
      this.$refs.userform.resetFields()
      this.$emit('update:showedituser', false)
    },
    // 点击确定
    async sure () {
      try {
        await this.$refs.userform.validate()
        await editUserById(this.userform)
        this.$message.success('添加用户成功')
        this.$emit('update:showedituser', false)
        this.$emit('edituser')
      } catch (error) {
        console.log(error)
      }
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>

</style>
