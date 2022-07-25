<template>
  <div>
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片内容 -->
    <el-card class="box-card">
      <!-- 头部搜索 -->
      <el-row type="flex" justify="start">
        <el-col :span="8">
          <el-input
            placeholder="请输入内容"
            v-model="obj.query"
            clearable
          >
            <el-button
              slot="append"
              icon="el-icon-search"
              @click="getuserList"
            ></el-button>
          </el-input>
        </el-col>
        <el-col
          ><el-button
            style="margin-left: 20px"
            type="primary"
            @click="showadduser = true"
            >添加用户</el-button
          ></el-col
        >
      </el-row>
      <!-- 表格 -->
      <el-table border style="width: 100%" :data="userlist" stripe>
        <el-table-column type="index" label="#" width="180"> </el-table-column>
        <el-table-column prop="username" label="姓名" width="180">
        </el-table-column>
        <el-table-column prop="mobile" label="电话"> </el-table-column>
        <el-table-column prop="role_name" label="角色"> </el-table-column>
        <el-table-column prop="mg_state" label="状态">
          <template v-slot="scope">
            <el-switch
              v-model="scope.row.mg_state"
              @change="userstate(scope.row.id, scope.row.mg_state)"
            ></el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template v-slot="scope">
            <el-button
              type="primary"
              size="small"
              @click="edituser(scope.row.id)"
              ><i class="el-icon-edit"></i
            ></el-button>
            <el-button type="danger" size="small" @click="deluser(scope.row.id)"
              ><i class="el-icon-delete"></i
            ></el-button>
            <el-button
              type="warning"
              size="small"
              @click="assignrole(scope.row)"
              ><i class="el-icon-setting"></i
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-row>
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :page-sizes="[5, 10, 15, 20]"
          :page-size="obj.pagesize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="obj.totalpage"
        >
        </el-pagination>
      </el-row>
    </el-card>
    <!-- 添加用户 -->
    <adduser :showadduser.sync="showadduser" @adduser="getuserList"></adduser>
    <AssignRoles
      :showassign.sync="showassign"
      ref="assignform"
      :user="user"
    ></AssignRoles>
    <EditUser
      :showedituser.sync="showedituser"
      @edituser="getuserList"
      ref="editform"
    ></EditUser>
  </div>
</template>

<script>
import { getuserList, editUserState, delUserById } from '@/api/user'
import adduser from './components/adduser.vue'
import AssignRoles from './components/AssignRoles.vue'
import EditUser from './components/EditUser.vue'
export default {
  created () {
    this.getuserList()
  },
  data () {
    return {
      obj: {
        query: '',
        pagenum: 1,
        pagesize: 5,
        totalpage: 0
      },
      userlist: [],
      showadduser: false,
      showassign: false,
      showedituser: false,
      user: {}
    }
  },
  methods: {
    async getuserList () {
      const res = await getuserList(this.obj)
      console.log(res)
      console.log(1)
      this.userlist = res.data.data.users
      this.obj.totalpage = res.data.data.total
      console.log(this.userlist)
    },
    async userstate (id, type) {
      console.log(id, type)
      await editUserState(id, type)
      this.$message.success('设置状态成功')
    },
    handleSizeChange (val) {
      console.log(val)
      this.obj.pagesize = val
      this.getuserList()
    },
    handleCurrentChange (val) {
      this.obj.pagenum = val
      this.getuserList()
    },

    async deluser (id) {
      try {
        await this.$confirm('确定删除该用户吗？')
        await delUserById(id)
        this.$message.success('删除用户成功')
        this.getuserList()
      } catch (error) {
        console.log(error)
      }
    },
    assignrole (row) {
      this.showassign = true
      this.$refs.assignform.userinfos(row.id)
      this.user = row
    },
    async edituser (id) {
      await this.$refs.editform.userInfoById(id)
      this.showedituser = true
    },
    async editstate (id, type) {
      console.log(id, type)
      await editUserState(id, type)
      this.$message.success('设置状态成功')
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: {
    adduser,
    AssignRoles,
    EditUser
  }
}
</script>

<style scoped lang='less'>
.box-card {
  margin: 15px 0;
}
.el-table {
  margin: 10px 0;
}
</style>
