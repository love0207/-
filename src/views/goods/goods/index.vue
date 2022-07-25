<template>
  <div>
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card style="margin-top: 20px">
      <!-- 搜索 -->
      <el-row type="flex">
        <el-col :span="8">
          <el-input placeholder="请输入内容" clearable v-model="obj.query">
            <el-button
              slot="append"
              icon="el-icon-search"
              @click="getGoodsList"
            ></el-button>
          </el-input>
        </el-col>
        <el-col>
          <el-button
            style="margin-left: 20px"
            type="primary"
            @click="$router.push('/addgoods')"
            >添加商品</el-button
          >
        </el-col>
      </el-row>
      <el-table border style="margin-top: 20px" :data="goodsList">
        <el-table-column label="#" type="index"></el-table-column>
        <el-table-column label="商品名称" prop="goods_name"></el-table-column>
        <el-table-column
          label="商品价格(元)"
          prop="goods_price"
        ></el-table-column>
        <el-table-column label="商品重量" prop="goods_weight">
        </el-table-column>
        <el-table-column label="创建时间" prop="upd_time">
          <template v-slot="scope">
            {{ scope.row.upd_time | dateformat }}
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template v-slot="scope">
            <el-button
              type="primary"
              size="small"
              @click="editgood(scope.row.id)"
              ><i class="el-icon-edit"></i>编辑</el-button
            >
            <el-button
              type="danger"
              size="small"
              @click="delgoods(scope.row.goods_id)"
              ><i class="el-icon-delete"></i>删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :page-sizes="[5, 6, 7, 8]"
        :page-size="obj.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="obj.totalpage"
      >
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
import { getGoodsList, delgoods } from '@/api/goods'
import { dateformat } from '@/filters/index'
export default {
  name: 'goods',
  created () {
    this.getGoodsList()
  },
  data () {
    return {
      obj: {
        query: '',
        pagenum: 1,
        pagesize: 5,
        totalpage: 0
      },
      goodsList: []
    }
  },
  methods: {
    async getGoodsList () {
      const res = await getGoodsList(this.obj)
      console.log(res)
      this.goodsList = res.data.data.goods
      this.obj.totalpage = res.data.data.total
    },
    handleSizeChange (val) {
      console.log(val)
      this.obj.pagesize = val
      this.getGoodsList()
    },
    handleCurrentChange (val) {
      this.obj.pagenum = val
      this.getGoodsList()
    },
    async delgoods (id) {
      try {
        await this.$confirm('确定删除该用户吗？')
        await delgoods(id)
        this.$message.success('删除用户成功')
        this.getGoodsList()
      } catch (error) {
        console.log(error)
      }
    }
  },
  computed: {},
  watch: {},
  filters: {
    dateformat
  },
  components: {}
}
</script>

<style scoped>
</style>
