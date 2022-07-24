<template>
  <div class="box">
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>权限列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card style="margin-top: 20px">
      <el-table :data="rightlist" border style="width: 100%">
        <el-table-column type="index" label="#" width="50px"> </el-table-column>
        <el-table-column prop="authName" label="权限名称"> </el-table-column>
        <el-table-column prop="path" label="路径"> </el-table-column>
        <el-table-column label="权限等级">
          <template v-slot="scope">
            <el-button
              size="small"
              plain
              v-if="scope.row.level === '0'"
              type="warning"
              disabled
              >等级一</el-button
            >
            <el-button
              size="small"
              plain
              v-if="scope.row.level === '1'"
              type="success"
              disabled
              >等级二</el-button
            >
            <el-button
              size="small"
              plain
              v-if="scope.row.level === '2'"
              type="primary"
              disabled
              >等级三</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
import { rightslist } from '@/api/power'
export default {
  created () {
    this.rightslist()
  },
  data () {
    return {
      rightlist: []
    }
  },
  methods: {
    async rightslist () {
      const res = await rightslist()
      this.rightlist = res.data.data
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
.box {
  overflow: scroll;
  height: 810px;
}
</style>
