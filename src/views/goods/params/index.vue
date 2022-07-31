<template>
  <div>
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>分类参数</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card style="margin-top: 20px">
      <el-alert
        :closable="false"
        show-icon
        title="注意：只允许为第三级分类设置相关参数！"
        type="warning"
      ></el-alert>
      <el-row>
        <el-col>
          <span>选择商品分类：</span>
          <el-cascader
            style="margin-top: 20px"
            expand-trigger="hover"
            :options="CateList"
            :props="CatePorps"
            v-model="SelectList"
            @change="handlechange"
          ></el-cascader>
        </el-col>
      </el-row>
      <el-tabs v-model="activeName" @tab-click="tabChange">
        <el-tab-pane label="动态属性" name="many">
          <el-button
            type="primary"
            :disabled="SelectList.length === 0 ? true : false"
            @click="dialogVisible = true"
            >添加参数</el-button
          >
          <el-table :data="manyList" border style="margin-top: 20px">
            <el-table-column type="expand">
              <template v-slot="scope">
                <!-- 标签 -->
                <el-tag
                  v-for="(item, id) in scope.row.attr_vals"
                  :key="id"
                  closable
                  @close="handleclose(id, scope.row)"
                  >{{ item }}</el-tag
                >
                <!-- 添加标签 -->
                <el-input
                  class="input-new-tag"
                  v-if="scope.row.inputVisible"
                  v-model="scope.row.inputValue"
                  ref="saveTagInput"
                  size="small"
                  @keyup.enter.native="handleInputConfirm(scope.row)"
                  @blur="handleInputConfirm(scope.row)"
                >
                </el-input>
                <el-button
                  v-else
                  class="button-new-tag"
                  size="small"
                  @click="scope.row.inputVisible = true"
                  >+ New Tag</el-button
                >
              </template>
            </el-table-column>
            <el-table-column type="index" label="#"></el-table-column>
            <el-table-column
              prop="attr_name"
              label="参数名称"
            ></el-table-column>
            <el-table-column prop="attr_name" label="操作">
              <template v-slot="scope">
                <el-button
                  type="primary"
                  icon="el-icon-edit"
                  @click="showeditdialog(scope.row.attr_id)"
                  >编辑</el-button
                >
                <el-button
                  type="danger"
                  icon="el-icon-delete"
                  @click="deleteParams(scope.row.attr_id)"
                  >删除</el-button
                ></template
              >
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="静态属性" name="only">
          <el-button
            type="primary"
            @click="dialogVisible = true"
            :disabled="SelectList.length === 0 ? true : false"
            >添加属性</el-button
          >
          <el-table :data="onlyList" border style="margin-top: 20px">
            <el-table-column type="expand"></el-table-column>
            <el-table-column type="index" label="#"></el-table-column>
            <el-table-column
              prop="attr_name"
              label="参数名称"
            ></el-table-column>
            <el-table-column prop="attr_name" label="操作">
              <template v-slot="scope">
                <el-button
                  type="primary"
                  @click="showeditdialog(scope.row.attr_id)"
                  >编辑</el-button
                >
                <el-button
                  type="danger"
                  @click="deleteParams(scope.row.attr_id)"
                  >删除</el-button
                ></template
              >
            </el-table-column></el-table
          >
        </el-tab-pane>
      </el-tabs>
    </el-card>

    <!-- 添加参数 -->
    <el-dialog
      :title="titleText"
      :visible.sync="dialogVisible"
      width="50%"
      @close="dialogclose"
    >
      <el-form
        :model="addForm"
        :rules="addFormRules"
        ref="addFormRef"
        label-width="100px"
      >
        <el-form-item :label="titleText" prop="attr_name">
          <el-input v-model="addForm.attr_name"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="addParams">确定</el-button>
      </template>
    </el-dialog>
    <!-- 编辑参数 -->
    <el-dialog
      :title="titleText"
      :visible.sync="editdialogVisible"
      width="50%"
      @close="editdialogclose"
    >
      <el-form
        :model="editForm"
        :rules="editFormRules"
        ref="editFormRef"
        label-width="100px"
      >
        <el-form-item :label="titleText" prop="attr_name">
          <el-input v-model="editForm.attr_name"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="editdialogVisible = false">取消</el-button>
        <el-button type="primary" @click="editsure">确定</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import { getCateList, getParameterList, addParams, editParams, submitEdit, deleteParams } from '@/api/goods'
export default {
  name: 'params',
  created () {
    this.getCateList()
  },
  data () {
    return {
      CateList: [],
      CatePorps: {
        value: 'cat_id',
        label: 'cat_name',
        children: 'children'
      },
      SelectList: '',
      activeName: 'many',
      manyList: [],
      onlyList: [],
      dialogVisible: false,
      addForm: {
        attr_name: ''
      },
      addFormRules: {
        attr_name: [{ required: true, message: '必填', trigger: 'blur' }]
      },
      editdialogVisible: false,
      editForm: {
        attr_name: ''
      },
      editFormRules: {
        attr_name: [{ required: true, message: '必填', trigger: 'blur' }]
      },
      attrld: '' // 属性id
    }
  },
  methods: {
    async getCateList () {
      const res = await getCateList()
      this.CateList = res.data.data
    },
    handlechange () {
      this.getParameterList()
    },
    tabChange () {
      if (this.SelectList.length === 3) {
        this.getParameterList()
      }
    },
    async getParameterList () {
      if (this.SelectList.length !== 3) {
        this.SelectList = ''
      }
      const res = await getParameterList(this.SelectList[2], this.activeName)
      res.data.data.forEach(item => {
        item.attr_vals = item.attr_vals ? item.attr_vals.split(' ') : []
        item.inputVisible = false // 控制+tag标签显示隐藏
        item.inputValue = ''
      })
      console.log(res)
      if (this.activeName === 'many') {
        this.manyList = res.data.data
      } else {
        this.onlyList = res.data.data
      }
    },
    dialogclose () {
      this.$refs.addFormRef.resetFields()
    },
    addParams () {
      this.$refs.addFormRef.validate(async valid => {
        if (!valid) return
        await addParams(this.SelectList[2], this.addForm.attr_name, this.activeName)
        this.$message.success('添加成功')
        this.dialogVisible = false
        this.getParameterList()
      })
    },
    editdialogclose () {
      this.$refs.editFormRef.resetFields()
    },
    async showeditdialog (attrId) {
      console.log(attrId)
      this.attrId = attrId
      console.log(this.attrId)
      const res = await editParams(this.SelectList[2], this.attrId, this.activeName)
      this.editForm = res.data.data
      this.editdialogVisible = true
    },
    editsure () {
      this.$refs.editFormRef.validate(async valid => {
        if (!valid) return
        await submitEdit(this.SelectList[2], this.attrId, this.editForm.attr_name, this.activeName)
        this.$message.success('编辑成功')
        this.editdialogVisible = false
        this.getParameterList()
      })
    },
    async deleteParams (id) {
      await deleteParams(this.SelectList[2], id)
      this.$message.success('删除成功')
      this.getParameterList()
    },
    async handleInputConfirm (row) {
      console.log(row)
      if (row.inputValue.trim().length === 0) {
        row.inputValue = ''
        row.inputVisible = false
      }
      row.attr_vals.push(row.inputValue)
      row.inputValue = ''
      row.inputVisible = false
      await submitEdit(this.SelectList[2], row.attr_id, row.attr_name, row.attr_sel, row.attr_vals.join(' '))
      this.$message.success('编辑成功')
    },
    async handleclose (id, row) {
      row.attr_vals.splice(id, 1)
      await submitEdit(this.SelectList[2], row.attr_id, row.attr_name, row.attr_sel, row.attr_vals.join(' '))
      this.$message.success('删除成功')
    }
  },
  computed: {
    titleText () {
      if (this.activeName === 'many') {
        return '动态参数'
      }
      return '静态属性'
    }
  },
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped>
.el-tag {
  margin: 10px;
}

.input-new-tag {
  width: 90px;
  margin-left: 10px;
}
</style>
