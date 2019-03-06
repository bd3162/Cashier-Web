<template>
	<div>
    	<el-row type="flex" class="row-bg" justify="center">
      		<el-col :span="10">
        		<h1>收银台</h1>
				<div v-if="member">
					<h2 style="color: #F56C6C">You Are Already a Member of Our Market.</h2>
					<h2 style="color: #F56C6C">Enjoy Your Member Points!</h2>
				</div>
				<div v-else>
					<h2 style="color: #F56C6C">您还不是会员</h2>
					<h2 style="color: #F56C6C">现在注册，领取积分奖励！</h2>
				</div>
        		<searchProd @addProds="addAsin"></searchProd>
				<ProdCard2 v-for="(prod, key) in shoppingList" :key="prod" :prod=prod @deleteAsin="deleteAsin"></ProdCard2>
				<div>
					<h3>Total: $ {{totalPrice | priceFilter}}</h3>
					<el-button @click="check" type="success" size="medium" icon="el-icon-goods" round>Check</el-button>
				</div>
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
		ProdCard2,
	},
	computed: {
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
		}
	},
	filters: {
		priceFilter(price){
			let newPrice = parseFloat(price).toFixed(2);
			return parseFloat(newPrice)
		}
	}
}
</script>

<style>

</style>
