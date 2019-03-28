<template>
    <div>
        <el-row type="flex" class="row-bg" justify="center">

            <el-col :span="10">
                <h1>收银台</h1>
                <el-row :gutter="24" v-if="this.$store.state.member">
                    <el-col :span="12">
                        <h2 style="color: #F56C6C">您已经是零售店会员</h2>
                        <h2 style="color: #F56C6C">享受您的积分吧！</h2>
                    </el-col>
                </el-row>

                <el-row :gutter="24" v-else>
                    <el-col :span="14">
                        <h2 style="color: #F56C6C">您还不是会员</h2>
                        <h2 style="color: #F56C6C">现在注册，领取积分奖励！</h2>
                    </el-col>
                    <el-col :span="4" :offset="18">
                        <el-tooltip class="item" effect="dark" :content="verification" placement="right" style="position:absolute; bottom: 0">
                            <el-button type="success" round @click="checkMember">Sign Up</el-button>
                        </el-tooltip>
                    </el-col>
                </el-row>

                <searchProd @addProds="addAsin"></searchProd>
                <ProdCard2 v-for="(prod, key) in shoppingList" :key="prod" :prod=prod @deleteAsin="deleteAsin"></ProdCard2>

                <el-row type="flex" class="row-bg" justify="end" :gutter="24">
                    <el-col :span="6">
                        <h3>Total: $ {{totalPrice | priceFilter}}</h3>
                        <el-button @click="check" type="success" size="medium" icon="el-icon-goods" round>Check</el-button>

                    </el-col>
                </el-row>
                <!--<UseCharts v-if="this.$store.state.member"></UseCharts>-->

            </el-col>
        </el-row>
    </div>
</template>

<script>
    import searchProd from './searchProd'
    import ProdCard2 from './ProdCard2'
    // import UseCharts from "./UserCharts";

    export default {
        name: "Cash",
        data () {
            return {
                member: false,
                shoppingList: [

                ],
            }
        },
        components: {
            // UseCharts,
            searchProd,
            ProdCard2, // product card that already be put in the shopping list
        },
        computed: {
            // return total price of shopping list
            totalPrice () {
                let total = 0;
                this.shoppingList.forEach(a => {
                    total += a.price * a.num;
                });
                return Math.round(total);
            },
            verification () {
                return "Verification: " + this.$store.state.verification;
            }
        },
        methods: {
            checkMember () {
                console.log(this.$store.state.face_id);
                let faceid = this.$store.state.face_id
                // this.$axios.post('/cashier/getVerif', {param:{user_id: faceid}})
                this.$axios({
                    method: 'POST',
                    url: '/cashier/getVerif',
                    data: this.qs.stringify({
                        user_id: this.$store.state.face_id,
                    })
                })
                    .then(response => {
                        if (response.data["member"]) {
                            // 数据库中有数据，是会员
                            this.$store.dispatch('changeMember', true);
                            console.log("Has change into a member.");
                        }
                        else {
                            // 非会员
                            if (response.data["message"]) {
                                // 会员设为false
                                this.$store.dispatch('changeMember', false);
                                console.log("Not a member yet");
                                // 存储产生的验证码
                                this.$store.dispatch('getVerif', response.data['verif']);
                            }
                            else {
                                console.log("Set Verification Failed......");
                            }
                        }
                    })
                    .catch(error => {
                        console.log("Check member request error.");
                    })
            },
            // delete the products by asin
            deleteAsin (asin) {
                console.log('about to delete' + asin);
                this.shoppingList.some((prod, i) => {
                    if (prod.asin == asin) {
                        //数组的第二个位置添加一个元素
                        this.shoppingList.splice(i, 1);
                        return true;
                    }
                })
            },
            // add the searching result into shopping list
            addAsin (prod) {
                let newProd =  this.shoppingList.find(item => {
                    return item.asin === prod.asin;
                });
                if (newProd!=undefined) {
                    newProd.num += prod.num;
                }
                else {
                    //数组末尾添加元素（对类型无限制）
                    this.shoppingList.push(prod);
                }
            },

            // add orders
            addorder (prod) {
                this.$axios({
                    method: 'POST',
                    url: '/cashier/addOrder',
                    data: this.qs.stringify({
                        user_id: this.$store.state.face_id,
                        prod_asin: prod.asin,
                        num: prod.num,
                    })
                })
                    .then(response => {
                        console.log(response.data);
                        if (response.data["message"]) {
                            // this.$message({
                            // 	message: 'Success to check the order. Congrats!',
                            // 	type: 'success'
                            // })
                            return true;
                        }
                        else {
                            // this.$message({
                            // 	message: 'Failed to check the order. Shame!',
                            // 	type: 'warning'
                            // })
                            return false;
                        }
                    })
                    .catch(error => {
                        // this.$message.error('Request Error, please check the console to find out what goes wrong.');
                        return false;
                    })
            },

            // check
            check　() {
                if (this.shoppingList.length == 0) {
                    this.$message({
                        message: 'Please put products into the shopping list. THX!',
                        type: 'warning'
                    })
                    return
                }
                for (let order of this.shoppingList) {
                    let flag = this.addorder(order);
                    if (flag) {
                        console.log("success" + order);
                    }
                    else {
                        console.log("fail" + order);
                    }
                }
                // 更新个性化推荐
                this.$axios({
                    method: 'GET',
                    url: 'https://wsw.chinanorth.cloudapp.chinacloudapi.cn/reco-1.0/reco',
                    data: this.qs.stringify({
                        user_id: this.face_id,
                    })
                })
                    .then(response => {
                        if (response.data.success) {
                            console.log("更新个性化推荐成功")
                        }
                        else {
                            console.log("更新个性化推荐失败！！！")
                        }
                    })

                //axios用于向后台发起请求
                this.$axios({
                    method: 'POST',
                    url: '/cashier/updatePoints',
                    data: this.qs.stringify({
                        user_id: this.$store.state.face_id,
                        total: this.totalPrice,
                    })
                })
                    .then(response => {
                        if (response.data['message']) {
                            this.$message({
                                message: 'Success to Check Orders and Member Points. Congrats!',
                                type: 'success'
                            })
                            //重新开始人脸识别
                            this.$store.dispatch('changeStep', 1)
                            this.$store.dispatch('changeMember', false)
                            this.$store.dispatch('getFaceid', '')
                            this.$store.dispatch('getVerif', '')
                        }
                        else {
                            this.$message({
                                message: 'Failed to update member points. Shame!',
                                type: 'warning'
                            })
                        }
                    })
                    .catch(error => {
                        this.$message.error('Request Error, please check the console to find out what goes wrong.');
                    })

            },
        },
        filters: {
            // filter to keep price in short
            priceFilter(price){
                let newPrice = parseFloat(price).toFixed(2);
                return parseFloat(newPrice)
            }
        },
    }
</script>

<style>

</style>
