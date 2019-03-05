<template>
  <div>
    <h1>Cashier can cash here.</h1>
    <searchProd></searchProd>
    <showProd></showProd>
    <!-- <showProd></showProd> -->
  </div>
</template>

<script>
import searchProd from './searchProd'
import showProd from './showProd'

export default {
  name: "Cash",
  components: {
    searchProd,
    showProd,
  }
}
</script>

<style scoped>

</style>
