<template>
    <!--Taking picture-->
  <div id="camera">
    <video id="video" width="320" height="240" autoplay></video>
    <el-button @click="shot">Snap Photo</el-button>
    <canvas id="canvas" width="320" height="240"></canvas>
  </div>
</template>

<script>
    export default {
      name: "Shot",
      data() {
        return {
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
        shot: function () {
          this.context.drawImage(this.video, 0, 0, 320, 240);
        }
      }
    }

</script>

<style scoped>

</style>
