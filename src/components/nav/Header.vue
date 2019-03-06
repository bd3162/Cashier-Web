<template>
  <div>
  <el-menu :default-active="this.$router.path" router class="el-menu-demo" mode="horizontal" @select="handleSelect">
    <el-menu-item><img src="../../assets/logo.png" width="40" height="40" alt="LOGO"/></el-menu-item>
    
    <el-menu-item v-for="(item, index) in navList" :key="index" :index="item.name">
      {{ item.navItem }}
    </el-menu-item>
    
    <el-menu-item>
      <el-button>登录</el-button>
    </el-menu-item>

    

  </el-menu>
  <div class="line"></div>
  </div>
</template>

<script>
  export default {
    name: "Header",
    data () {
      return {
        navList: [
          {name: '/face', navItem: '扫描人脸'},
          {name: '/cash', navItem: '商品结算'},
        ],
      }
    },
    methods: {
        handleSelect(key, keyPath) {
          console.log(key, keyPath);
      }
    }
  }
</script>

<style scoped>

</style>
