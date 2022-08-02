<template>
  <div>
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card style="margin-top: 20px">
      <el-button type="primary" @click="showaddCate">添加分类</el-button>
      <el-table border style="margin-top: 20px" :data="List">
        <el-table-column type="index" label="#"></el-table-column>
        <el-table-column label="分类名称" prop="cat_name"></el-table-column>
        <el-table-column prop="cat_deleted" label="是否有效">
          <template v-slot="scope">
            <i
              class="el-icon-success"
              v-if="scope.row.cat_deleted === false"
              style="color: green"
            ></i>
            <i class="el-icon-error" v-else style="color: green"></i>
          </template>
        </el-table-column>
        <el-table-column label="排序">
          <template v-slot="scope">
            <el-button
              size="small"
              plain
              v-if="scope.row.cat_level === 0"
              type="primary"
              >一级</el-button
            >
            <el-button
              size="small"
              plain
              v-if="scope.row.cat_level === 1"
              type="success"
              >二级</el-button
            >
            <el-button
              size="small"
              plain
              v-if="scope.row.cat_level === 2"
              type="warning"
              >三级</el-button
            >
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template>
            <el-button size="mini" type="primary">编辑</el-button>
            <el-button size="mini" type="danger">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="changesize"
        @current-change="changenum"
        :current-page="params.pagenum"
        :page-sizes="[4, 6, 8, 10]"
        :page-size="params.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="params.total"
      >
      </el-pagination>
    </el-card>
    <!-- 添加分类 -->
    <el-dialog title="添加商品分类" :visible.sync="showaddsort">
      <el-form
        label-width="80px"
        ref="addform"
        :model="addform"
        :rules="addformRules"
      >
        <el-form-item label="分类名称" prop="cat_name">
          <el-input v-model="addform.cat_name"> </el-input>
        </el-form-item>
        <el-form-item label="父级分类">
          <el-cascader
            :options="options"
            clearable
            :props="props"
            v-model="select"
            expand-trigger="hover"
            change-on-select
          ></el-cascader>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button>取消</el-button>
        <el-button type="primary">确定</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import { classifyList, classList } from '@/api/goods'
export default {
  name: 'categories',
  created () {
    this.getclassifyList()
  },
  data () {
    return {
      params: {
        type: 3,
        pagenum: 1,
        pagesize: 4,
        total: null
      },
      List: [],
      showaddsort: false,
      addform: {
        cat_name: '',
        cat_pid: 0,
        cat_level: 0
      },
      addformRules: {
        cat_name: [
          { required: true, message: '请输入分类名称', tigger: 'blur' }
        ]
      },
      options: [],
      props: {
        value: 'cat_id',
        label: 'cat_name',
        children: 'children'
      },
      select: []
    }
  },
  methods: {
    async getclassifyList () {
      const res = await classifyList(this.params)
      console.log(res)
      this.List = res.data.data.result
      this.params.total = res.data.data.total
    },
    changesize (val) {
      this.params.pagesize = val
      this.getclassifyList()
    },
    changenum (val) {
      this.params.pagenum = val
      this.getclassifyList()
    },
    async showaddCate () {
      const res = await classList()
      this.options = res.data.data
      this.showaddsort = true
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped>
</style>
