<template>
  <el-dialog title="分配角色" :visible="showassign" @close="cancle">
    <p>当前的用户：{{ user.username }}</p>
    <p>当前的角色：{{ user.role_name }}</p>
    <p>
      分配新角色：
      <el-select v-model="value" placeholder="请选择">
        <el-option
          v-for="item in roles"
          :key="item.id"
          :label="item.roleName"
          :value="item.id"
        >
        </el-option>
      </el-select>
    </p>
    <el-row type="flex" justify="end" align="middle">
      <el-col :span="6">
        <el-button size="middle" @click="cancle">取消</el-button>
        <el-button size="middle" type="primary" @click="sure">确定</el-button>
      </el-col>
    </el-row>
  </el-dialog>
</template>

<script>
import { assginRole, userInfoById, rolelist } from '@/api/user'
export default {
  props: {
    showassign: {
      type: Boolean,
      default: false
    },
    user: {
      type: Object,
      required: true
    }
  },
  created () {
    this.rolelist()
  },
  data () {
    return {
      roles: [],
      value: '',
      userinfo: {}
    }
  },
  methods: {
    async rolelist () {
      const res = await rolelist()
      this.roles = res.data.data
    },

    cancle () {
      this.value = ''
      this.$emit('update:showassign', false)
    },

    async sure () {
      try {
        await assginRole({ id: this.user.id, rid: this.value })
        this.$message.success('分配角色成功')
        this.$emit('update:showassign', false)
      } catch (error) {
        console.log(error)
      }
    },
    async userinfos (id) {
      this.userinfo = await userInfoById(id)
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang="less"></style>
