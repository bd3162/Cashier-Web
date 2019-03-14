<template>
	<div>
    	<el-row type="flex" class="row-bg" justify="center">
      		<el-col :span="10">
        		<h1>收银台</h1>
				<el-row :gutter="24" v-if="this.$store.state.member">
					<el-col :span="6">
						<h2 style="color: #F56C6C">您已经是零售店会员</h2>
						<h2 style="color: #F56C6C">享受您的积分吧！</h2>
					</el-col>
				</el-row>

				<el-row :gutter="24" v-else>
					<el-col :span="12">
						<h2 style="color: #F56C6C">您还不是会员</h2>
						<h2 style="color: #F56C6C">现在注册，领取积分奖励！</h2>
					</el-col>
					<el-col :span="4" :offset="8">
						<el-tooltip class="item" effect="dark" content="verif" placement="right" style="position:absolute; bottom: 0">
							<el-button @click="signup" type="success" round>Sign Up</el-button>
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
      		</el-col>
    	</el-row>
    </div>
</template>

<script>
import searchProd from './searchProd'
import ProdCard2 from './ProdCard2'

export default {
	name: "Cash",
	data () {
		return {
			shoppingList: [],
		}
	},
	components: {
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
			return total;
		},
		// 非会员产生验证码
		verif () {
			return "Verification: " + this.$store.state.verif;
		}
	},
	methods: {
		// delete the products by asin
		deleteAsin (asin) {
			console.log('about to delete' + asin);
			this.shoppingList.some((prod, i) => {
				if (prod.asin == asin) {
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
				this.shoppingList.push(prod);
			}
		},

		// add orders
		addorder (prod) {
			this.$axios({
				methods: 'POST',
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
						console.log("success to add order.")
						return true;
					}
					else {
						console.log("fail to add order.")
						return false;
					}
				})
				.catch(error => {
					console.log("add order request error.")
					return false;
				})
		},

		// check
		check () {
			for (order in shoppingList) {
				let flag = this.addorder(order);
				if (flag) {
					console.log("success" + order);
				}
				else {
					console.log("fail" + order);
				}
			}
			if (this.$store.state.member) { // if the customer is a member
				this.$axios({
					methods: 'POST',
					url: '/cashier/updatePoints',
					data: this.qs.stringify({
						user_id: this.$store.state.face_id,
						total: this.totalPrice,
					})
				})
						.then(response => {
							if (response.data['message']) {
								this.$message({
									message: 'Success to update member points. Congrats!',
									type: 'success',
								})
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
			}
		},

		// check if the customer has signed up
		signup () {
			this.$axios({
				methods: 'POST',
				url: '/cashier/getVerif',
				data: this.qs.stringify({
					user_id: this.$store.state.face_id,
				})
			})
					.then(response => {
						if (response.data["member"]) {
							// find out the customer signed up successfully
							this.$store.dispatch('changeMember', true)
							this.$message({
								message: 'You are a member now. Congrats!',
								type: 'success',
							})
						}
						else {
							// still not a member
							this.$store.dispatch('changeMember', false)
							this.$message({
								message: 'Still not a member, please check your phone again.',
								type: 'warning'
							})
						}
					})
					.catch(error => {
						this.$message.error('Request Error, please check the console to find out what goes wrong.');
					})
		}
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
