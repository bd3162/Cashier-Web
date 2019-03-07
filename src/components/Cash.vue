<template>
	<div>
    	<el-row type="flex" class="row-bg" justify="center">
      		<el-col :span="10">
        		<h1>收银台</h1>
				<el-row :gutter="24" v-if="member">
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
						<el-tooltip class="item" effect="dark" content="Verification: Q5ZG" placement="right" style="position:absolute; bottom: 0">
							<el-button type="success" round>Sign Up</el-button>
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
			member: false,
			shoppingList: [

			],
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
		}
	},
	methods: {
		// delete the products
		deleteAsin (asin) {
			console.log('about to delete' + asin);
			// var index = this.shoppingList.findIndex(function(item){
			// 	return prod
			// })

			this.shoppingList.some((prod, i) => {
				if (prod.asin == asin) {
					this.shoppingList.splice(i, 1);
					return true;
				}
			})
		},

		// add the searching result into shopping list
		addAsin (prod) {
			var newProd =  this.shoppingList.find(item => {
				return item.asin === prod.asin;
			});

			if (newProd!=undefined) {
				newProd.num += prod.num;
			}
			else {
				this.shoppingList.push(prod);
			}
		},

		// check orders
		check () {

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
