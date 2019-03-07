<template>
<div>
    <el-form :inline="true">
        <el-form-item>
            <el-input v-model="asinForSearch" placeholder="Please input the product ID" clearable></el-input>
        </el-form-item>
        <el-form-item>
            <el-button @click="search" type="primary" icon="el-icon-search" round>Search</el-button>
        </el-form-item>
        <el-form-item>
            <el-button @click="clear" type="danger" icon="el-icon-delete" circle></el-button>
        </el-form-item>
    </el-form>
    <transition name="el-fade-in">
        <ProdCard v-if="prodFound" :prod="result" @added="addProd"/>
    </transition>
</div>
</template>

<script>
import ProdCard from './ProdCard'
export default {
    name: 'searchProd',
    components:{
        ProdCard,
    },
    data () {
        return {
            value3: true,
            value4: true,
            asinForSearch: '',
            prodFound: false,
            result: {
                
            }
        }
    },
    methods: {
        clear () {
            this.prodFound = false;
            this.asinForSearch = '';
        },
        search () {
            this.prodFound = false;

            // input component can't be empty
            if(this.asinForSearch == null || this.asinForSearch == "") {
                this.$message({message: 'Please input the ID of product that you wanna search!', type: 'warning'})
            }
            else {
                this.$axios({
                    method: 'POST',
                    url: '/cashier/findProd',
                    data: this.qs.stringify({
                        asin: this.asinForSearch
                    })
                })
                    .then(response => {
                        console.log(response.data);
                        if (response.data['success']) {
                            this.result = {
                                asin: response.data.asin,
                                title: response.data.title,
                                price: response.data.price,
                                brand: response.data.brand,
                                imUrl: response.data.imUrl,
                                cate: response.data.cate,
                                num: 1,
                            };
                            this.prodFound = true;
                        }
                        else {
                            this.$message.error('Can\'t find the Product, please check your product ID!');
                        }
                    })
                    .catch(error => {
                        console.log(error)
                        this.$message.error('Can\'t find the Product, please check your product ID!');
                    })
            }
        },
        addProd (prod) {
            this.prodFound = false;
            this.result = prod;
            this.$emit('addProds', this.result)
        },
    },
}
</script>
