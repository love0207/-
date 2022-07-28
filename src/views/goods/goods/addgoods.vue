<template>
  <div>
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>添加商品</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card style="margin-top: 20px">
      <el-alert
        title="添加商品信息"
        type="info"
        center
        show-icon
        :closable="false"
      >
      </el-alert>
      <!-- 步骤条 -->
      <el-steps
        :space="200"
        :active="active - 0"
        finish-status="success"
        align-center
        style="margin-top: 20px"
      >
        <el-step title="基本信息"></el-step>
        <el-step title="商品参数"></el-step>
        <el-step title="商品属性"></el-step>
        <el-step title="商品图片"></el-step>
        <el-step title="商品内容"></el-step>
        <el-step title="完成"></el-step>
      </el-steps>
      <el-form
        :model="addForm"
        :rules="addFormRules"
        ref="addFormRef"
        label-width="100px"
        label-position="top"
      >
        <el-tabs :tab-position="'left'" v-model="active" @tab-click="tabClick">
          <el-tab-pane label="基本信息" name="0">
            <el-form-item label="商品名称" prop="goods_name">
              <el-input v-model="addForm.goods_name"> </el-input>
            </el-form-item>
            <el-form-item label="商品价格" prop="goods_price">
              <el-input v-model="addForm.goods_price"> </el-input>
            </el-form-item>
            <el-form-item label="商品重量" prop="goods_weight">
              <el-input v-model="addForm.goods_weight"> </el-input>
            </el-form-item>
            <el-form-item label="商品数量" prop="goods_number">
              <el-input v-model="addForm.goods_number"> </el-input>
            </el-form-item>
            <el-form-item label="商品分类" prop="goods_cat">
              <el-cascader
                expand-trigger="hover"
                :options="catelist"
                :props="cateProps"
                v-model="addForm.goods_cat"
                @change="handleChange"
              >
              </el-cascader>
            </el-form-item>
          </el-tab-pane>
          <el-tab-pane label="商品参数" name="1">
            <el-form-item
              :label="item.attr_name"
              v-for="item in ParameterList"
              :key="item.attr_id"
            >
              <!-- 复选框 -->
              <el-checkbox-group v-model="item.attr_vals">
                <el-checkbox
                  border
                  :label="item1"
                  v-for="(item1, index) in item.attr_vals"
                  :key="index"
                ></el-checkbox>
              </el-checkbox-group>
            </el-form-item>
          </el-tab-pane>
          <el-tab-pane label="商品属性" name="2">
            <el-form-item
              :label="item.attr_name"
              v-for="item in List"
              :key="item.attr_id"
            >
              <el-input v-model="item.attr_vals"></el-input>
            </el-form-item>
          </el-tab-pane>
          <el-tab-pane label="商品图片" name="3">
            <el-upload
              action="http://liufusong.top:8899/api/private/v1/upload"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              list-type="picture"
              :headers="headers"
              :on-success="handleSuccess"
            >
              <el-button size="small" type="primary">点击上传</el-button>
            </el-upload>
          </el-tab-pane>
          <el-tab-pane label="商品内容" name="4">
            <quill-editor v-model="addForm.goods_introduce"> </quill-editor>
            <el-button type="primary" size="small" @click="add"
              >添加商品</el-button
            >
          </el-tab-pane>
        </el-tabs>
      </el-form>
    </el-card>
    <!-- 图片预览 -->
    <el-dialog title="图片预览" :visible.sync="previewVisible">
      <img :src="previewPath" alt="" />
    </el-dialog>
  </div>
</template>

<script>
import { getCateList, getParameterList, addgoods } from '@/api/goods'
export default {
  name: 'addgoods',
  created () {
    this.getCateList()
  },
  data () {
    return {
      active: 0, // 步骤条选中
      addForm: {
        goods_name: '',
        goods_price: '',
        goods_weight: 0,
        goods_number: 0,
        goods_cat: [], // 商品所属的分类数组
        pics: [],
        goods_introduce: '',
        attrs: []
      },
      catelist: [],
      cateProps: {
        label: 'cat_name',
        value: 'cat_id',
        children: 'children'
      },
      addFormRules: {
        goods_name: [{ required: true, message: '必填', trigger: 'blur' }],
        goods_price: [{ required: true, message: '必填', trigger: 'blur' }],
        goods_number: [{ required: true, message: '必填', trigger: 'blur' }],
        goods_weight: [{ required: true, message: '必填', trigger: 'blur' }],
        goods_introduce: [{ required: true, message: '必填', trigger: 'blur' }],
        goods_cat: [{ required: true, message: '必填', trigger: 'blur' }]
      },
      ParameterList: [], // 商品参数many
      List: [], // 商品参数only
      headers: {
        Authorization: this.$store.state.user.token
      },
      previewPath: '', // 图片路径
      previewVisible: false // 图片预览

    }
  },
  methods: {
    async getCateList () {
      const res = await getCateList()
      this.catelist = res.data.data
    },
    handleChange () {
      console.log(this.addForm.goods_cat)
      if (this.addForm.goods_cat.length !== 3) {
        this.addForm.goods_cat = []
      }
    },
    async tabClick () {
      if (this.active === '1') {
        const res = await getParameterList(this.addForm.goods_cat[2], 'many')
        this.ParameterList = res.data.data
        this.ParameterList.forEach(item => {
          item.attr_vals = item.attr_vals.length === 0 ? [] : item.attr_vals.split(' ')
        })
      }
      if (this.active === '2') {
        const res = await getParameterList(this.addForm.goods_cat[2], 'only')
        console.log(res)
        this.List = res.data.data
      }
    },
    handlePreview (file) {
      console.log(file)
      this.previewPath = file.response.data.url
      this.previewVisible = true
    },
    handleRemove () { },
    handleSuccess (response) {
      const Infopic = { res: response.data.tmp_path }
      this.addForm.pics.push(Infopic)
    },
    add () {
      this.$refs.addFormRef.validate(
        async (valid) => {
          if (!valid) {
            this.$message.error('请填入必填项')
          } else {
            this.addForm.goods_cat = this.addForm.goods_cat.join(',')
            this.ParameterList.forEach(item => {
              const newInfo = {
                attr_id: item.attr_id,
                attr_value: item.attr_vals.join(' ')
              }
              this.addForm.attrs.push(newInfo)
            })
            this.List.forEach(item => {
              const newInfo = {
                attr_id: item.attr_id,
                attr_value: item.attr_vals
              }
              this.addForm.attrs.push(newInfo)
            })
            const res = await addgoods(this.addForm)
            console.log(res)
          }
        }
      )
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
.el-step__title {
  font-size: 13px;
}
.quill-editor {
  height: 250px;
  margin-bottom: 90px;
}
</style>
