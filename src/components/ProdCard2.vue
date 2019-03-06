<template>
    <el-row>
        <el-col :span="24">
            <el-card :body-style="{ padding: '10px' }" shadow="hover">
                <el-row :gutter="0" style="padding: 14px;">
                    <el-col :span="2"><img :src="prod.imUrl" class="image"></el-col>
                    <el-col :span="12" :offset="4">
                        <span>{{prod.title}}</span>
                        <span>{{prod.price}}RMB</span>
                        <span>{{prod.brand}}</span>
                    </el-col>
                    <el-col :span="3" :offset="14">
                        <el-input-number v-model="prod.num"  size="mini" :min="1"></el-input-number>
                    </el-col>
                    <el-col :span="3" :offset="18">
                        <el-button @click="deleteProd" type="warning" icon="el-icon-minus" round>Delete</el-button>
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
    }
}
</script>

<style scope>
.image {
    width: 60px;
    display: block;
  }
</style>
