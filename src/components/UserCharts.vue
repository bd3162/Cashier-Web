<template>
  <div>
    <div id="myCharts" :style="{width: '600px', height: '600px'}"></div>
  </div>
</template>

<script>
  import echarts from "echarts";
    export default {
        name: "UseCharts",

        data() {
                return {

                }
              },

        mounted() {
          this.drawLine();
        },

        methods: {
          drawLine() {
            // 基于准备好的dom，初始化echarts实例
            let myChart = echarts.init(document.getElementById('myCharts'));
            myChart.showLoading();
            var lineStyle = {
                normal: {
                width: 1,
                opacity: 0.5
              }
            };

            var wechatData=[];
            var priceRegion=[];
            var product;
            var catagory;
            var brand;

            var data=[];

            var theIndicator=[
              {name: '性别:', max: 10},
              {name: '城市:', max: 20},
              {name: '承价水平:', max: 80},
              {name: '产品偏好:', max: 5},
              {name: '种类喜好:', max: 80},
              {name: '品牌:', max: 10}
            ];

            let param=[{
              user_id:"A1T7EHCMZ92TKC"
            },{
              "userId":"A1T7EHCMZ92TKC",
              "statisDimens": "price",
              "subNum": 2,
            },{
              "userId":"A1T7EHCMZ92TKC",
              "statisDimens": "product",
              "subNum": 1,
            },{
              "userId":"A1T7EHCMZ92TKC",
              "statisDimens": "category",
              "subNum": 1,
            },{
              "userId":"A1T7EHCMZ92TKC",
              "statisDimens": "brand",
              "subNum": 2,
            }
            ];

            this.$axios.all([
              this.$axios.get('https://haoxipeng.chinacloudapp.cn/scrm-1.0/customer/selectById',{ params: param[0]},{retry:4,retryDelay:1000 }),

              this.$axios.post('https://haoxipeng.chinacloudapp.cn/scrm-1.0/rest/report/person',param[1],{retry:4,retryDelay:1000 }),

              this.$axios.post('https://haoxipeng.chinacloudapp.cn/scrm-1.0/rest/report/person',param[2],{retry:4,retryDelay:1000 }),

              this.$axios.post('https://haoxipeng.chinacloudapp.cn/scrm-1.0/rest/report/person', param[3],{retry:4,retryDelay:1000 }),

              this.$axios.post('https://haoxipeng.chinacloudapp.cn/scrm-1.0/rest/report/person', param[4],{retry:4,retryDelay:1000 })

              ]
            )
              .then(this.$axios.spread(function (wechatInfo,priceInfo,productInfo,categoryInfo,brandInfo) {

                //获取性别
                if (wechatInfo.data.customer.gender == 1) {
                   data[0]=8;
                   theIndicator[0]= {name: '性别: 男', max: 10};
                } else {
                   data[0]=4;
                   theIndicator[0]={name: '性别: 女', max: 10}
                }

                //从后台获取城市
                data[1]=10;
                wechatData.push(wechatInfo.data.customer.city);
                theIndicator[1]= {name: '城市: '+wechatData[0], max: 20};

                //从后台获取价格区间的销量+价格区间
                if (priceInfo.data['msgDesc'] == "Success") {
                  data[2]=priceInfo.data.data.priceSalesList[0][0].salesCount;
                  priceRegion.push(priceInfo.data.data.priceSalesList[0][1].startPrice);
                  priceRegion.push(priceInfo.data.data.priceSalesList[0][1].endPrice);
                  theIndicator[2]=  {name: '承价水平: '+priceRegion[0]+"-"+priceRegion[1], max: 80};
                }

                //从后台获取产品销量+产品名称
                if (productInfo.data['msgDesc'] == "Success") {
                  data[3]=productInfo.data.data.productSalesList[0][0].salesCount;
                  product = productInfo.data.data.productSalesList[0][0].product;
                  theIndicator[3]= {name: '产品偏好: '+product, max: 5};
                }

                //从后台获取种类销量+种类名称
                if (categoryInfo.data['msgDesc'] == "Success") {
                   data[4] = categoryInfo.data.data.categorySalesList[0][0].salesCount;
                   catagory = categoryInfo.data.data.categorySalesList[0][0].category;
                   theIndicator[4]=   {name: '种类喜好: '+catagory, max: 80};
                }

                //从后台获取品牌销量+品牌名称
                if (brandInfo.data['msgDesc'] == "Success") {
                  data[5] = brandInfo.data.data.brandSalesList[0][1].salesCount;
                  brand = brandInfo.data.data.brandSalesList[0][1].brand;
                  theIndicator[5] = {name: '品牌: '+brand, max: 10};
                }

                myChart.hideLoading();

                option.radar.indicator=theIndicator;
                option.series[0].data[0].value =data;
                myChart.setOption(option);

              }))
              .catch(function(err){
                console.log(err)
              });


           var option = {
              title: {
                text: '用户分析图'
              },
              tooltip: {},
              legend: {},
              radar: {
                name: {
                  textStyle: {
                    color: '#fff',
                    backgroundColor: '#999',
                    borderRadius: 15,
                    padding: [3, 5]
                  }
                },
                indicator: []
              },
              series: [{
                type: 'radar',
                // areaStyle: {normal: {}},
                data : [
                  {
                    value :[],
                  }
                ]
              }]
            };

       //    myChart.setOption(option);
          }
        }
    }

</script>

<style scoped>

</style>
