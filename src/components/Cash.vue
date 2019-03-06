<template>
	<div>
    	<el-row type="flex" class="row-bg" justify="center">
      		<el-col :span="10">
        
        		<h1>Cashier can cash here.</h1>
        		<searchProd @addProds="addAsin"></searchProd>
				<ProdCard2 v-for="(prod, key) in shoppingList" :key="prod" :prod=prod @deleteAsin="deleteAsin"></ProdCard2>
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
			shoppingList: [{
                asin: "1",
                title: "这是Title",
                price: 0.00,
                brand: "这是品牌",
                imUrl: require("../assets/logo.png"),
				cate: "",
				num: 2,
			},{
				asin: "2",
                title: "2这是Title",
                price: 2.00,
                brand: "2这是品牌",
                imUrl: require("../assets/logo.png"),
				cate: "",
				num: 3,
			},{
				asin: "3",
                title: "3这是Title",
                price: 3.00,
                brand: "3这是品牌",
                imUrl: require("../assets/logo.png"),
				cate: "",
				num: 4,
			}
			]
		}
	},
	components: {
		searchProd,
		ProdCard2,
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
	}
}
</script>

<style scoped>

</style>
