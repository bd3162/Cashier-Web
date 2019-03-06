<template>
    <el-row style="padding: 10px 0px">
        <el-col :span="24">
            <el-card :body-style="{ padding: '10px' }" shadow="hover">
                <el-row :gutter="2" style="padding: 14px;">
                    <el-col :span="2"><img :src="prod.imUrl" class="image"/></el-col>
                    <el-col :span="6" :offset="1">
                        <a style="font-style: oblique">{{prod.title}}</a>
                    </el-col>
                    <el-col :span="2" :offset="1">
                        <a style="font-weight: bold">{{prod.brand == "null"?"No Brand" : prod.brand}}</a>
                    </el-col>
                    <el-col :span="2" :offset="3">
                        <a>$ {{prod.price}}</a>
                    </el-col>
                    <el-col :span="2" :offset="3">
                        <div>
                            <el-input-number v-model="prod.num"  size="mini" :min="1"></el-input-number>
                            <div style="padding-top: 30px; padding-left: 12px">
                                <el-button @click="deleteProd" class="button" type="warning" icon="el-icon-minus" round>Delete</el-button>
                            </div>
                        </div>
                    </el-col>
                </el-row>
            </el-card>
        </el-col>
    </el-row>
</template>

<script>
// products in the shopping list
export default {
    props: {
        prod: Object,
    },
    data () {
        return {
            
        }
    },
    methods: {
        deleteProd () {
            console.log("ready to delete" + this.prod.asin);
            this.$emit('deleteAsin', this.prod.asin);
        }
    },
    // mounted() {
    //     if (this.prod.brand == "null") {
    //         this.prod.brand = "No Brand"
    //     }
    // }
}
</script>

<style scope>
.image {
    width: 60px;
    display: block;
  }
</style>
