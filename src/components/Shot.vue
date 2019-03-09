<template>
    <!--Taking picture-->
    <div id="camera">
        <el-row type="flex" class="row-bg" justify="center">
            <el-col :span="10">
                <h1>人脸识别</h1>
                <img id="image" :src="imgUrl"/>
                <video id="video" width="320" height="240" autoplay></video>
                <el-button @click="snap" type="primary" round>Snap Photo</el-button>
                <canvas id="canvas" width="320" height="240"></canvas>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    export default {
        name: "Shot",
        data () {
            return {
                imgUrl: '',
                canvas: null,
                video: null,
                context: null,
            }
        },
        mounted() {
            // Grab elements, create settings, etc.
            var video = document.getElementById('video');

            // Get access to the camera!
            if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
                // Not adding `{ audio: true }` since we only want video now
                navigator.mediaDevices.getUserMedia({ video: true }).then(function(stream) {
                    //video.src = window.URL.createObjectURL(stream);
                    video.srcObject = stream;
                    video.play();
                });
            }

            this.canvas = document.getElementById('canvas');
            this.context = this.canvas.getContext('2d');
            this.video = document.getElementById('video');

        },
        methods: {
            shot: function (url) {
                // this.context.drawImage(this.video, 0, 0, 320, 240);
                this.imgUrl = url;
                var img = document.getElementById('image');
                this.context.drawImage(img, 0, 0, 320, 240);
                var dataURL = this.canvas.toDataURL("screenshot/png");
                return dataURL;
            },
            snap: function () {
                var imgs = ['../../static/502/1.jpg', '../../static/502/2.jpg', '../../static/502/3.jpg', '../../static/502/4.jpg', '../../static/502/5.jpg', ]

                for (var i=0;i<imgs.length;i++) {
                    let base = this.shot(imgs[i]);
                    this.$axios({
                        method: 'POST',
                        url: 'crm32/multiImage/sendBase',
                        data: this.qs.stringify({
                            bases: base,
                            name: i,
                        })
                    })
                        .then(response => {
                            console.log(response.data);
                            if (response.data.success == true) {
                                if (response.data.finish == true) {
                                    console.log("FACEID:"+response.data.faceid);
                                    this.$emit('faceLog', response.data.faceid);
                                }
                                else {
                                    console.log("还没结束请耐心等待");
                                }
                            }
                            else {
                                console.log("请求失败！！！");
                            }
                        })
                        .catch(error => {
                            console.log(error);
                            this.$message.error('Can\'t do it!!!');
                    })
                }

            }
        }
    }

</script>

<style scoped>

</style>
