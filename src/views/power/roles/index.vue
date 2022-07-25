<template>
  <div>
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>角色列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card style="margin-top: 20px">
      <el-button type="primary" @click="showaddrole = true">添加角色</el-button>
      <el-table border style="margin-top: 10px" :data="roleList" stripe>
        <el-table-column type="expand">
          <template v-slot="scope">
            <!-- 一级 -->
            <el-row
              v-for="(item1, i1) in scope.row.children"
              :key="item1.id"
              :class="['bdbottom', i1 === 0 ? 'bdtop' : '', 'vcenter']"
            >
              <el-col :span="5">
                <el-tag closable @close="remove(scope.row, item1.id)">{{
                  item1.authName
                }}</el-tag>
                <i class="el-icon-caret-right"></i>
              </el-col>
              <el-col :span="19">
                <!-- 二级 -->
                <el-row
                  :class="[i2 === 0 ? '' : 'bdtop', 'vcenter']"
                  v-for="(item2, i2) in item1.children"
                  :key="item2.id"
                >
                  <el-col :span="8">
                    <el-tag
                      type="success"
                      closable
                      @close="remove(scope.row, item2.id)"
                      >{{ item2.authName }}</el-tag
                    >
                    <i class="el-icon-caret-right"></i>
                  </el-col>
                  <el-col :span="16">
                    <el-tag
                      type="warning"
                      v-for="item3 in item2.children"
                      :key="item3.id"
                      closable
                      @close="remove(scope.row, item3.id)"
                      >{{ item3.authName }}</el-tag
                    >
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
          </template>
        </el-table-column>
        <el-table-column label="#" type="index" width="48px"> </el-table-column>
        <el-table-column label="角色名称" prop="roleName"> </el-table-column>
        <el-table-column label="角色描述" prop="roleDesc"> </el-table-column>
        <el-table-column label="操作">
          <template v-slot="scope">
            <el-button type="primary" size="small" @click="editrole(scope.row)"
              ><i class="el-icon-edit"></i>编辑</el-button
            >
            <el-button type="danger" size="small" @click="delrole(scope.row.id)"
              ><i class="el-icon-delete"></i>删除</el-button
            >
            <el-button type="warning" size="small" @click="rights(scope.row)"
              ><i class="el-icon-delete"></i>分配权限</el-button
            ></template
          >
        </el-table-column>
      </el-table>
    </el-card>
    <!-- 分配权限 -->
    <el-dialog title="分配权限" :visible="dialogVisible" @close="close">
      <el-tree
        :data="rightsList"
        show-checkbox
        default-expand-all
        node-key="id"
        highlight-current
        :props="defaultProps"
        :default-checked-keys="role"
        ref="rolerights"
      ></el-tree>
      <span slot="footer" class="dialog-footer">
        <el-button @click="close">取 消</el-button>
        <el-button type="primary" @click="getCheckedKeys">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 添加角色 -->
    <el-dialog
      title="添加角色"
      :visible="showaddrole"
      @close="showaddrole = false"
    >
      <el-form label-width="80px">
        <el-form-item label="角色名称">
          <el-input v-model="obj.roleName"></el-input>
        </el-form-item>
        <el-form-item label="角色描述">
          <el-input v-model="obj.roleDesc"></el-input>
        </el-form-item>
      </el-form>
      <el-row type="flex" justify="end">
        <el-col :span="6">
          <el-button size="middle" @click="showaddrole = false">取消</el-button>
          <el-button size="middle" type="primary" @click="addrole"
            >确定</el-button
          >
        </el-col>
      </el-row>
    </el-dialog>
    <!-- 编辑角色 -->
    <el-dialog
      title="编辑角色"
      :visible="showeditrole"
      @close="showeditrole = false"
    >
      <el-form label-width="80px">
        <el-form-item label="角色名称">
          <el-input v-model="obj1.roleName"></el-input>
        </el-form-item>
        <el-form-item label="角色描述">
          <el-input v-model="obj1.roleDesc"></el-input>
        </el-form-item>
      </el-form>
      <el-row type="flex" justify="end">
        <el-col :span="6">
          <el-button size="middle" @click="showeditrole = false"
            >取消</el-button
          >
          <el-button size="middle" type="primary" @click="sureEditRole"
            >确定</el-button
          >
        </el-col>
      </el-row>
    </el-dialog>
  </div>
</template>

<script>
import { rolelist, delrole, rights, addrole, roleAuthorization, editrole, deleterolepower } from '@/api/power'
export default {

  name: 'UserList',
  created () {
    this.rolelist()
  },
  data () {
    return {
      roleList: [],
      rightsList: [],
      dialogVisible: false,
      defaultProps: {
        label: 'authName'
      },
      role: [],
      showaddrole: false, // 添加角色
      obj: {
        roleName: '',
        roleDesc: ''
      },
      userId: '',
      showeditrole: false, // 编辑角色
      obj1: {
        id: '',
        roleName: '',
        roleDesc: ''
      }
    }
  },
  methods: {
    async rolelist () {
      const res = await rolelist()
      this.roleList = res.data.data
      console.log(this.roleList)
    },
    async delrole (id) {
      try {
        await this.$confirm('确定删除该用户吗？')
        await delrole(id)
        this.$message.success('删除用户成功')
        this.rolelist()
      } catch (error) {
        console.log(error)
      }
    },
    async rights (row) {
      this.userId = row.id
      const res = await rights()
      this.rightsList = res.data.data
      this.getid(row.children)
      this.dialogVisible = true
    },
    getid (arr) {
      arr.forEach((item) => {
        if (item.children) {
          this.getid(item.children)
        } else {
          this.role.push(item.id)
        }
      })
      return this.role
    },
    async addrole () {
      await addrole(this.obj)
      this.$message.success('添加角色成功')
      this.showaddrole = false
      this.obj = {}
      this.rolelist()
    },

    async getCheckedKeys () {
      const checkId = (this.$refs.rolerights.getCheckedKeys()).join(',')
      await roleAuthorization(this.userId, checkId)
      this.$message.success('权限跟新成功')
      this.role = []
      this.dialogVisible = false
      this.rolelist()
    },
    close () {
      this.role = []
      this.dialogVisible = false
    },
    editrole (row) {
      this.obj1.id = row.id
      this.obj1.roleName = row.roleName
      this.obj1.roleDesc = row.roleDesc
      this.showeditrole = true
    },
    async sureEditRole () {
      await editrole(this.obj1)
      this.$message.success('角色编辑成功')
      this.showeditrole = false
      this.rolelist()
    },
    async remove (role, rightId) {
      try {
        await this.$confirm('此操作将永久删除该用户的权限, 是否继续?')
        const res = await deleterolepower(role.id, rightId)
        this.$message.success('删除成功')
        role.children = res.data.data
        console.log(res)
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
.el-tag {
  margin: 7px;
}
.bdtop {
  border-top: 1px solid #eee;
}
.bdbottom {
  border-bottom: 1px solid #eee;
}
.vcenter {
  display: flex;
  align-items: center;
}
</style>
