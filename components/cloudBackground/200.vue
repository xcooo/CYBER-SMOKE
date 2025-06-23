<template>
  <view class="container">
    <canvas
      canvas-id="cloudCanvas"
      :style="{ width: canvasWidth + 'px', height: canvasHeight + 'px' }"
      class="cloud-canvas"
    ></canvas>
  </view>
</template>

<script>
export default {
  data() {
    return {
      ctx: null,
      canvasWidth: 0,
      canvasHeight: 0,
      clouds: [],
      animationId: null,
      cloudCount: 60,
      cloudImgSrc:
        "https://img.alicdn.com/imgextra/i1/2200676927379/O1CN01gNvNfv24NddACa6pI_!!2200676927379.png",
      imgReady: false,
    };
  },
  mounted() {
    uni.getSystemInfo({
      success: (res) => {
        this.canvasWidth = res.windowWidth;
        this.canvasHeight = res.windowHeight;

        this.ctx = uni.createCanvasContext("cloudCanvas", this);
        this.loadCloudImage(this.cloudImgSrc);
      },
    });
  },
  beforeDestroy() {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }
  },
  methods: {
    loadCloudImage(url) {
      wx.downloadFile({
        url,
        success: (res) => {
          if (res.statusCode === 200) {
            this.cloudImgSrc = res.tempFilePath;
            this.imgReady = true;
            this.initClouds();
            this.animate();
          } else {
            console.error("图片下载失败", res);
            this.initClouds();
            this.animate();
          }
        },
        fail: (err) => {
          console.error("图片下载失败", err);
          this.initClouds();
          this.animate();
        },
      });
    },

    initClouds() {
      this.clouds = [];
      const bottomY = this.canvasHeight;
      const topY = this.canvasHeight / 2;
      const centerX = this.canvasWidth / 2;
      const spreadX = this.canvasWidth * 0.7;

      for (let i = 0; i < this.cloudCount; i++) {
        const x = centerX - spreadX / 2 + Math.random() * spreadX;
        const y = topY + Math.random() * (bottomY - topY) + (Math.random() - 0.5) * 100;

        this.clouds.push({
          x,
          y,
          speed: 0.3 + Math.random() * 0.3,
          baseSize: 70 + Math.random() * 90,
          alpha: 0,
          alphaTarget: 0.3 + Math.random() * 0.4,
          phase: Math.random() * Math.PI * 2,
          fadeSpeed: 0.004 + Math.random() * 0.008,
        });
      }
    },

    drawCloud(cloud) {
      const ctx = this.ctx;
      const bottomY = this.canvasHeight;
      const topY = this.canvasHeight / 2;
      const normPos = (cloud.y - topY) / (bottomY - topY);

      const scale = 0.5 + normPos * 1.5;
      const alpha = cloud.alpha * normPos * 1.1;

      const width = cloud.baseSize * scale;
      const height = width * 0.6;

      ctx.save();
      ctx.globalAlpha = alpha;
      ctx.drawImage(this.cloudImgSrc, cloud.x - width / 2, cloud.y - height / 2, width, height);
      ctx.restore();
    },

    animate() {
      const ctx = this.ctx;

      // 天空蓝渐变背景
      const grad = ctx.createLinearGradient(0, 0, 0, this.canvasHeight);
      grad.addColorStop(0, "#87CEEB");
      grad.addColorStop(1, "#4682B4");
      ctx.setFillStyle(grad);
      ctx.fillRect(0, 0, this.canvasWidth, this.canvasHeight);

      const topY = this.canvasHeight / 2;
      const bottomY = this.canvasHeight;

      this.clouds.forEach((cloud) => {
        // 速度根据位置插值，顶部慢，底部正常
        const normY = (cloud.y - topY) / (bottomY - topY);
        const minSpeed = 0.05;
        const maxSpeed = cloud.speed;
        const curSpeed = minSpeed + normY * (maxSpeed - minSpeed);

        cloud.y -= curSpeed;
        cloud.x += Math.sin(cloud.phase) * 0.2 * normY;
        cloud.phase += 0.015;

        // 临近顶部开始淡出
        if (cloud.y <= topY + 50) {
          cloud.alphaTarget = 0;
        } else {
          cloud.alphaTarget = 0.3 + Math.random() * 0.4;
        }

        if (cloud.alpha < cloud.alphaTarget) {
          cloud.alpha = Math.min(cloud.alpha + cloud.fadeSpeed, cloud.alphaTarget);
        } else if (cloud.alpha > cloud.alphaTarget) {
          cloud.alpha = Math.max(cloud.alpha - cloud.fadeSpeed, cloud.alphaTarget);
        }

        // 云朵完全透明且到达顶部时重置到底部
        if (cloud.alpha <= 0 && cloud.y <= topY + 50) {
          const centerX = this.canvasWidth / 2;
          const spreadX = this.canvasWidth * 0.7;
          cloud.x = centerX - spreadX / 2 + Math.random() * spreadX;
          cloud.y = bottomY + cloud.baseSize + Math.random() * 100;
          cloud.baseSize = 70 + Math.random() * 90;
          cloud.alpha = 0;
          cloud.alphaTarget = 0.3 + Math.random() * 0.4;
          cloud.speed = 0.3 + Math.random() * 0.3;
          cloud.phase = Math.random() * Math.PI * 2;
          cloud.fadeSpeed = 0.004 + Math.random() * 0.008;
        }

        this.drawCloud(cloud);
      });

      ctx.draw(false, () => {
        this.animationId = requestAnimationFrame(this.animate);
      });
    },
  },
};
</script>

<style scoped>
.container {
  width: 100vw;
  height: 100vh;
  position: absolute;
  overflow: hidden;
}
.cloud-canvas {
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100vw;
  height: 100vh;
}
</style>
