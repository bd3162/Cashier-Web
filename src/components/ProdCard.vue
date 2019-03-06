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
                            <div style="padding-top: 30px; padding-left: 18px">
                                <el-button @click="addProd" class="button" type="success" icon="el-icon-plus" round>Add</el-button>
                            </div>
                        </div>
                    </el-col>
                </el-row>
            </el-card>
        </el-col>
    </el-row>
</template>

<script>
// the result of searching

export default {
    name: "ProdCard",
    props: {
        prod: Object,
    },
    data () {
        return {

        }
    },
    methods: {
        addProd () {
            this.$emit('added', this.prod); // 'added': the name to @ in parent component, 'this.prod': the args to be dilivered
        }
    }
}
</script>

<style scope>
.image {
    width: 100%;
    display: block;
  }

.clearfix:before,
.clearfix:after {
    display: table;
    content: "";
}

.clearfix:after {
    clear: both
}
</style>
