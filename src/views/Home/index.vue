<template>
  <el-container class="container">
    <!-- 头部 -->
    <el-header>
      <el-avatar
        :size="60"
        src="https://www.haoy99.com/FileUpload/2019-02/Shui1Zhu11i1Pao1pptB-173234_109.jpg"
      ></el-avatar>
      <h3>商品后台管理系统</h3>
      <el-button @click="logout">退出</el-button>
    </el-header>
    <!-- 侧导航 -->
    <el-container>
      <el-aside width="none">
        <el-menu
          class="el-menu-vertical-demo"
          :collapse="isCollapse"
          background-color="#464c50"
          router
          text-color="#fff"
          unique-opened
          :default-active="indexPath"
          @select="selected"
        >
          <el-radio-group v-model="isCollapse">
            <el-button
              @click="isCollapse = !isCollapse"
              :icon="this.isCollapse ? 'el-icon-s-unfold' : 'el-icon-s-fold'"
              >{{ this.isCollapse ? "" : "点击闭合" }}</el-button
            >
          </el-radio-group>
          <el-submenu
            :index="item.path"
            v-for="(item, index) in leftmenu"
            :key="index"
          >
            <template slot="title">
              <i class="el-icon-menu"></i> <span slot="title">{{ item.authName }}</span>
            </template>
            <el-menu-item-group>
              <el-menu-item
                :index="item1.path"
                v-for="(item1, index1) in item.children"
                :key="index1"
                ><i class="el-icon-menu"></i> {{ item1.authName }}</el-menu-item
              >
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-aside>
      <!-- 内容区 -->
      <el-main>
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import { getmenus } from '@/api/home'
export default {
  async created () {
    try {
      const res = await getmenus()
      console.log(res)
      this.leftmenu = res.data.data
    } catch (e) { console.log(e) }
  },
  data () {
    return {
      isCollapse: false,
      leftmenu: '',
      indexPath: ''
    }
  },
  methods: {
    logout () {
      this.$store.commit('user/removeToken')
      this.$router.push('login')
    },
    selected (index) {
      this.indexPath = index
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: {

  }
}
</script>

<style scoped lang='less'>
.container {
  height: 100vh;
  .el-header {
    background-color: #373d41;
    display: flex;
    align-items: center;
    h3 {
      color: #fff;
      font-size: 22px;
      margin-left: 10px;
    }
    .el-button {
      position: absolute;
      right: 20px;
    }
  }
  .el-aside {
    background-color: #464c50;
    .el-button {
      background-color: #69d4e8;
      border: none;
      border-radius: 0;
      width: 100%;
    }
  }
  .el-main {
    background-color: #eaedf1;
  }
  .el-menu {
    border-right: none;
  }
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
}
.el-menu-vertical-demo {
  height: 100%;
}
.el-radio-group {
  width: 100%;
}
</style>
