<template>
  <div>
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>订单管理</el-breadcrumb-item>
      <el-breadcrumb-item>订单列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card style="margin-top: 20px">
      <!-- 搜索 -->
      <el-row type="flex" justify="start">
        <el-col :span="8">
          <el-input placeholder="请输入内容" clearable v-model="obj.query">
            <el-button
              slot="append"
              icon="el-icon-search"
              @click="getOrders"
            ></el-button>
          </el-input>
        </el-col>
      </el-row>
      <!-- 表格 -->
      <el-table border style="margin-top: 10px" :data="orderList">
        <el-table-column label="#" type="index"></el-table-column>
        <el-table-column label="订单编号" prop="order_number"></el-table-column>
        <el-table-column label="订单价格" prop="order_price"></el-table-column>
        <el-table-column label="是否付款" prop="pay_status">
          <template v-slot="scope">
            <el-button
              type="danger"
              size="small"
              v-if="scope.row.pay_status === '0'"
              >未支付</el-button
            >
            <el-button type="success" size="small" v-else>已支付</el-button>
          </template>
        </el-table-column>
        <el-table-column label="是否发货" prop="is_send"></el-table-column>
        <el-table-column label="下单时间" prop="update_time">
          <template v-slot="scope">
            {{ scope.row.update_time | dateformat }}
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template>
            <el-button type="primary">操作</el-button>
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
import { dateformat } from '@/filters/index'
import { getOrders } from '@/api/orders'
export default {
  name: 'Orders',
  created () {
    this.getOrders()
  },
  data () {
    return {
      obj: {
        query: '',
        pagenum: 1,
        pagesize: 5,
        totalpage: 0
      },
      orderList: [] // 订单列表

    }
  },
  methods: {
    async getOrders () {
      const res = await getOrders(this.obj)
      console.log(res)
      this.orderList = res.data.data.goods
      this.obj.totalpage = res.data.data.total
    },
    handleSizeChange (val) {
      console.log(val)
      this.obj.pagesize = val
      this.getOrders()
    },
    handleCurrentChange (val) {
      this.obj.pagenum = val
      this.getOrders()
    }
  },
  computed: {},
  watch: {},
  filters: {
    dateformat
  },
  components: {

  }
}
</script>

<style scoped>
</style>
