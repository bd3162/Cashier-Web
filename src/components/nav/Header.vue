<template>
  <div>
  <el-menu :default-active="this.$router.path" router class="el-menu-demo" mode="horizontal" @select="handleSelect">
    <el-menu-item v-for="(item, index) in navList" :key="i" :index="item.name">
      {{ item.navItem }}
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
          {name: '/cash', navItem: '商品结算'},
          {name: '/qr_code', navItem: '扫描二维码'},
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
