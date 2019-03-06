<template>
<el-div>
    <el-form :inline="true">
        <el-form-item>
            <el-input v-model="asinForSearch" placeholder="请输入商品号" clearable></el-input>
        </el-form-item>
        <el-form-item>
            <el-button @click="search" type="primary" icon="el-icon-search" round>搜索</el-button>
        </el-form-item>
    </el-form>
    <ProdCard v-if="prodFound" :prod="result" @added="addProd"/>
</el-div>
</template>

<script>
import axios from 'axios'

import ProdCard from './ProdCard'
export default {
    components:{
        ProdCard,
    },
    data () {
        return {
            asinForSearch: '',
            prodFound: false,
            result: {
                
            }
        }
    },
    methods: {
        search () {
            this.prodFound = true;
            // this.$axios({
            //     method: 'GET',
            //     url: '',
            //     data: this.qs.stringify({
                    
            //     })
            // })
            this.result = {
                asin: "2",
                title: "2这是Title",
                price: 2.00,
                brand: "这是品牌",
                imUrl: require("../assets/logo.png"),
                cate: "",
                num: 0,
            }
        },
        addProd (prod) {
            this.prodFound = false;
            console.log("in searchProd:" + prod.num);
            this.result = prod;
            this.$emit('addProds', this.result)
        },
    },
}
</script>

