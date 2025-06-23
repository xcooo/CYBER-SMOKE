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
      cloudCount: 50,
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
    if (this.animationId) cancelAnimationFrame(this.animationId);
  },
  methods: {
    loadCloudImage(url) {
      wx.downloadFile({
        url,
        success: (res) => {
          if (res.statusCode === 200) {
            this.cloudImgSrc = res.tempFilePath;
            this.imgReady = true;
          }
          this.initClouds();
          this.animate();
        },
        fail: () => {
          this.initClouds();
          this.animate();
        },
      });
    },
    initClouds() {
      const topY = this.canvasHeight / 2;
      const bottomY = this.canvasHeight;
      const centerX = this.canvasWidth / 2;
      const spreadX = this.canvasWidth * 0.7;
      this.clouds = [];

      for (let i = 0; i < this.cloudCount; i++) {
        this.clouds.push({
          x: centerX - spreadX / 2 + Math.random() * spreadX,
          y: topY + Math.random() * (bottomY - topY),
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
      const topY = this.canvasHeight / 2;
      const bottomY = this.canvasHeight;
      const normPos = (cloud.y - topY) / (bottomY - topY);
      const scale = 0.5 + normPos * 1.5;
      const alpha = cloud.alpha * normPos * 1.1;

      if (alpha <= 0) return;

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

      // 背景天空渐变
      const skyGrad = ctx.createLinearGradient(0, 0, 0, h);
      skyGrad.addColorStop(0, "#a0d8ff");
      skyGrad.addColorStop(1, "#5dadeb");
      ctx.setFillStyle(skyGrad);
      ctx.fillRect(0, 0, w, h);

      // 顶部光晕
      const glowGrad = ctx.createLinearGradient(0, 0, 0, h / 2);
      glowGrad.addColorStop(0, "rgba(255, 255, 255, 0.3)");
      glowGrad.addColorStop(1, "rgba(255, 255, 255, 0)");
      ctx.setFillStyle(glowGrad);
      ctx.fillRect(0, 0, w, h / 2);

      // 斜射阳光（已减弱）
      const sunGrad = ctx.createLinearGradient(w, 0, 0, h);
      sunGrad.addColorStop(0, "rgba(255, 255, 180, 0.2)");
      sunGrad.addColorStop(0.3, "rgba(255, 255, 180, 0.08)");
      sunGrad.addColorStop(1, "rgba(255, 255, 180, 0)");
      ctx.setFillStyle(sunGrad);
      ctx.fillRect(0, 0, w, h);

      // 太阳
      const sunX = w - 60;
      const sunY = 100;
      ctx.beginPath();
      ctx.setFillStyle("rgba(255,255,255,0.4)"); // 核心亮度减弱
      ctx.arc(sunX, sunY, 16, 0, Math.PI * 2);
      ctx.fill();

      const layers = [
        { r: 50, color: "rgba(255, 255, 180, 0.08)" },
        { r: 70, color: "rgba(255, 255, 200, 0.05)" },
        { r: 100, color: "rgba(255, 255, 255, 0.03)" },
        { r: 150, color: "rgba(255, 255, 255, 0.015)" },
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
        const curSpeed = 0.05 + normY * (cloud.speed - 0.05);

        cloud.y -= curSpeed;
        cloud.x += Math.sin(cloud.phase) * 0.2 * normY;
        cloud.phase += 0.015;

        cloud.alphaTarget = cloud.y <= topY + 50 ? 0 : 0.3 + Math.random() * 0.4;

        const delta = cloud.fadeSpeed;
        if (cloud.alpha < cloud.alphaTarget) {
          cloud.alpha = Math.min(cloud.alpha + delta, cloud.alphaTarget);
        } else {
          cloud.alpha = Math.max(cloud.alpha - delta, cloud.alphaTarget);
        }

        if (cloud.alpha <= 0 && cloud.y <= topY + 50) {
          const centerX = w / 2;
          const spreadX = w * 0.7;
          Object.assign(cloud, {
            x: centerX - spreadX / 2 + Math.random() * spreadX,
            y: bottomY + Math.random() * 100,
            baseSize: 70 + Math.random() * 90,
            alpha: 0,
            alphaTarget: 0.3 + Math.random() * 0.4,
            speed: 0.3 + Math.random() * 0.3,
            phase: Math.random() * Math.PI * 2,
            fadeSpeed: 0.004 + Math.random() * 0.008,
          });
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
