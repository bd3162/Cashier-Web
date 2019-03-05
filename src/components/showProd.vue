<template>

<el-row>
  <el-col :span="8">
    <el-card :body-style="{ padding: '10px' }" shadow="hover">
      <el-row :gutter="20" style="padding: 14px;">
        <el-col :span="2"><img src="../assets/logo.png" class="image"></el-col>
        <el-col :span="6" :offset="2">{{prod.title}}</el-col>
        <el-col :span="3" :offset="4" v-if="to_be_added">
          <el-button type="success" icon="el-icon-check">添加</el-button>
        </el-col>
        <el-col :span="3" :offset="6">
          <el-button type="success" icon="el-icon-close">删除</el-button>
        </el-col>
      </el-row>
    </el-card>
  </el-col>
</el-row>

</template>

<script>
export default {
  name: "showProd",
  data () {
    return{
      prod: {
        asin,
        title: "A piece of shit",
        price,
        imUrl,
        brand,
        cate,
      },
      to_be_added: true,
    }
  }
}
</script>

<style scope>
.time {
    font-size: 13px;
    color: #999;
  }
  
  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }

  .button {
    padding: 0;
    float: right;
  }

  .image {
    width: 60px;
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
