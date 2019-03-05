<template>
    <el-form :inline="true">
        <el-form-item>
            <el-input v-model="asin" placeholder="请输入商品号" clearable></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" icon="el-icon-search" round>搜索</el-button>
        </el-form-item>
    </el-form>
</template>

<script>
export default {
    data () {
        return {
            asin: ''
        }
    }
}
</script>

