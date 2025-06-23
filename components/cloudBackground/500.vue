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
            this.initClouds();
            this.animate();
          }
        },
        fail: () => {
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
      const w = this.canvasWidth;
      const h = this.canvasHeight;

      // 天空渐变背景
      const skyGrad = ctx.createLinearGradient(0, 0, 0, h);
      skyGrad.addColorStop(0, "#a0d8ff");
      skyGrad.addColorStop(1, "#5dadeb");
      ctx.setFillStyle(skyGrad);
      ctx.fillRect(0, 0, w, h);

      // 顶部白色光晕
      const glowGrad = ctx.createLinearGradient(0, 0, 0, h / 2);
      glowGrad.addColorStop(0, "rgba(255, 255, 255, 0.5)");
      glowGrad.addColorStop(1, "rgba(255, 255, 255, 0)");
      ctx.setFillStyle(glowGrad);
      ctx.fillRect(0, 0, w, h / 2);

      // 右上角斜射阳光
      const sunGrad = ctx.createLinearGradient(w, 0, 0, h);
      sunGrad.addColorStop(0, "rgba(255, 255, 180, 0.35)");
      sunGrad.addColorStop(0.3, "rgba(255, 255, 180, 0.15)");
      sunGrad.addColorStop(1, "rgba(255, 255, 180, 0)");
      ctx.setFillStyle(sunGrad);
      ctx.fillRect(0, 0, w, h);

      // 🌞 模拟太阳核心与炫光
      const sunX = w - 60;
      const sunY = 100;

      // 核心白点
      ctx.beginPath();
      ctx.setFillStyle("rgba(255,255,255,0.95)");
      ctx.arc(sunX, sunY, 16, 0, Math.PI * 2);
      ctx.fill();

      // 外部炫光光圈（多层）
      const layers = [
        { r: 50, color: "rgba(255, 255, 180, 0.12)" },
        { r: 70, color: "rgba(255, 255, 200, 0.08)" },
        { r: 100, color: "rgba(255, 255, 255, 0.05)" },
        { r: 150, color: "rgba(255, 255, 255, 0.03)" },
      ];
      layers.forEach((layer) => {
        ctx.beginPath();
        ctx.setFillStyle(layer.color);
        ctx.arc(sunX, sunY, layer.r, 0, Math.PI * 2);
        ctx.fill();
      });

      // 云动画
      const topY = h / 2;
      const bottomY = h;
      this.clouds.forEach((cloud) => {
        const normY = (cloud.y - topY) / (bottomY - topY);
        const minSpeed = 0.05;
        const maxSpeed = cloud.speed;
        const curSpeed = minSpeed + normY * (maxSpeed - minSpeed);

        cloud.y -= curSpeed;
        cloud.x += Math.sin(cloud.phase) * 0.2 * normY;
        cloud.phase += 0.015;

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

        if (cloud.alpha <= 0 && cloud.y <= topY + 50) {
          const centerX = w / 2;
          const spreadX = w * 0.7;
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
