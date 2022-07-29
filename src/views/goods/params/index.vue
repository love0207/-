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
            >添加参数</el-button
          >
          <el-table :data="manyList" border style="margin-top: 20px">
            <el-table-column type="expand"></el-table-column>
            <el-table-column type="index" label="#"></el-table-column>
            <el-table-column
              prop="attr_name"
              label="参数名称"
            ></el-table-column>
            <el-table-column prop="attr_name" label="操作">
              <el-button type="primary">编辑</el-button>
              <el-button type="danger">删除</el-button>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="静态属性" name="only">
          <el-button
            type="primary"
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
              <el-button type="primary">编辑</el-button>
              <el-button type="danger">删除</el-button>
            </el-table-column></el-table
          >
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
import { getCateList, getParameterList } from '@/api/goods'
export default {

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
      onlyList: []
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
      console.log(res)
      if (this.activeName === 'many') {
        this.manyList = res.data.data
      } else {
        this.onlyList = res.data.data
      }
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
