<template>
  <view class="container">
    <canvas canvas-id="cloudCanvas" :style="{ width: canvasWidth + 'px', height: canvasHeight + 'px' }"
      class="cloud-canvas"></canvas>
  </view>
</template>

<script>
export default {
  data () {
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
      meteors: [],
      meteorCount: 3,
      stars: [], // 新增：存储星星位置和亮度
      starCount: 120,
    };
  },
  mounted () {
    uni.getSystemInfo({
      success: (res) => {
        this.canvasWidth = res.windowWidth;
        this.canvasHeight = res.windowHeight;

        this.ctx = uni.createCanvasContext("cloudCanvas", this);
        this.initStars();
        // this.loadCloudImage(this.cloudImgSrc);
      },
    });
  },
  beforeDestroy () {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }
  },
  methods: {
    start () {
      if (this.animationId) return; // 避免重复启动
      this.loadCloudImage(this.cloudImgSrc);
    },
    stop () {
      if (this.animationId) {
        cancelAnimationFrame(this.animationId);
        this.animationId = null;
      }
      // 清空画布（用透明矩形覆盖整个区域）
      this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
      // 如果 clearRect 不生效，可以用 fillRect 填充透明色
      // this.ctx.setFillStyle('rgba(0,0,0,0)');
      // this.ctx.fillRect(0, 0, this.canvasWidth, this.canvasHeight);
      this.ctx.draw(true); // 强制刷新画布
    },

    loadCloudImage (url) {
      wx.downloadFile({
        url,
        success: (res) => {
          if (res.statusCode === 200) {
            this.cloudImgSrc = res.tempFilePath;
            this.imgReady = true;
            this.initClouds();
            this.initMeteors();
            this.animate();
          } else {
            console.error("图片下载失败", res);
            this.initClouds();
            this.initMeteors();
            this.animate();
          }
        },
        fail: (err) => {
          console.error("图片下载失败", err);
          this.initClouds();
          this.initMeteors();
          this.animate();
        },
      });
    },

    initClouds () {
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

    initMeteors () {
      this.meteors = [];
      for (let i = 0; i < this.meteorCount; i++) {
        this.meteors.push(this.createMeteor());
      }
    },

    createMeteor () {
      return {
        x: Math.random() * this.canvasWidth,
        y: Math.random() * this.canvasHeight / 2,
        length: 80 + Math.random() * 60,
        speed: 6 + Math.random() * 4,
        angle: Math.PI / 4, // 45度斜线
        opacity: 0,
        opacitySpeed: 0.02 + Math.random() * 0.02,
        active: false,
        waitTime: Math.random() * 200 + 100,
      };
    },

    drawCloud (cloud) {
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

    drawMeteor (meteor) {
      const ctx = this.ctx;
      ctx.save();
      ctx.beginPath();
      ctx.strokeStyle = `rgba(255, 255, 255, ${meteor.opacity})`;
      ctx.lineWidth = 2;
      ctx.shadowColor = "white";
      ctx.shadowBlur = 10;

      const endX = meteor.x + meteor.length * Math.cos(meteor.angle);
      const endY = meteor.y + meteor.length * Math.sin(meteor.angle);

      ctx.moveTo(meteor.x, meteor.y);
      ctx.lineTo(endX, endY);
      ctx.stroke();
      ctx.restore();
    },

    initStars () {
      this.stars = [];
      for (let i = 0; i < this.starCount; i++) {
        this.stars.push({
          x: Math.random() * this.canvasWidth,
          y: Math.random() * this.canvasHeight,
          radius: Math.random() * 1.5 + 0.3,
          alpha: Math.random(),
          alphaSpeed: (Math.random() * 0.02) + 0.005,
          increasing: Math.random() > 0.5,
        });
      }
    },

    drawStars () {
      const ctx = this.ctx;
      this.stars.forEach(star => {
        // 星星闪烁alpha变化
        if (star.increasing) {
          star.alpha += star.alphaSpeed;
          if (star.alpha >= 1) {
            star.alpha = 1;
            star.increasing = false;
          }
        } else {
          star.alpha -= star.alphaSpeed;
          if (star.alpha <= 0.1) {
            star.alpha = 0.1;
            star.increasing = true;
          }
        }
        // 绘制星星，发光效果
        ctx.save();
        const glowColor = `rgba(180, 200, 255, ${star.alpha})`;
        ctx.shadowColor = glowColor;
        ctx.shadowBlur = 6;
        ctx.fillStyle = glowColor;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, 2 * Math.PI);
        ctx.fill();
        ctx.restore();
      });
    },

    animate () {
      const ctx = this.ctx;

      // 多层渐变背景叠加，科技感霓虹蓝紫青
      // 第一层：深蓝紫
      let grad1 = ctx.createLinearGradient(0, 0, 0, this.canvasHeight);
      grad1.addColorStop(0, "#0f0c29");
      grad1.addColorStop(1, "#302b63");
      ctx.setFillStyle(grad1);
      ctx.fillRect(0, 0, this.canvasWidth, this.canvasHeight);

      // 第二层：蓝青渐变，叠加半透明覆盖
      let grad2 = ctx.createLinearGradient(0, 0, this.canvasWidth, this.canvasHeight);
      // grad2.addColorStop(0, "rgba(58,123,213,0.3)");
      // grad2.addColorStop(1, "rgba(0,210,255,0.3)");
      grad2.addColorStop(0, "rgba(5, 5, 10, 0.8)");     // 极深黑蓝
      grad2.addColorStop(0.5, "rgba(15, 15, 30, 0.8)"); // 黑中带一点冷蓝
      grad2.addColorStop(1, "rgba(25, 30, 50, 0.8)");   // 深蓝灰混合
      ctx.setFillStyle(grad2);
      ctx.fillRect(0, 0, this.canvasWidth, this.canvasHeight);

      // 绘制闪烁星星
      this.drawStars();

      // 右上角小月亮光晕和月牙
      const moonX = this.canvasWidth * 0.9;
      const moonY = this.canvasHeight * 0.15;
      const moonRadius = 30; // 小月亮半径

      // 月亮光晕（线性渐变）
      const moonGrad = ctx.createLinearGradient(
        moonX - moonRadius,
        moonY - moonRadius,
        moonX + moonRadius,
        moonY + moonRadius
      );
      moonGrad.addColorStop(0, "rgba(220, 220, 220, 0.5)");
      moonGrad.addColorStop(1, "rgba(220, 220, 220, 0)");
      ctx.setFillStyle(moonGrad);
      ctx.beginPath();
      ctx.arc(moonX, moonY, moonRadius, 0, 2 * Math.PI);
      ctx.fill();

      // 月牙形状
      ctx.setFillStyle("rgba(245, 245, 245, 0.9)");
      ctx.beginPath();
      ctx.arc(moonX - 7, moonY, moonRadius * 0.7, 0.5 * Math.PI, 1.5 * Math.PI, true);
      ctx.arc(moonX - 2, moonY, moonRadius * 0.7, 1.5 * Math.PI, 0.5 * Math.PI, false);
      ctx.closePath();
      ctx.fill();

      const topY = this.canvasHeight / 2;
      const bottomY = this.canvasHeight;

      // 云朵动画
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

      // 流星动画
      this.meteors.forEach((meteor) => {
        if (meteor.waitTime > 0) {
          meteor.waitTime--;
          meteor.opacity = 0;
        } else {
          meteor.active = true;
          meteor.opacity += meteor.opacitySpeed;
          if (meteor.opacity > 1) meteor.opacity = 1;

          meteor.x += meteor.speed * Math.cos(meteor.angle);
          meteor.y += meteor.speed * Math.sin(meteor.angle);

          // 超出边界时重置流星
          if (
            meteor.x > this.canvasWidth + meteor.length ||
            meteor.y > this.canvasHeight + meteor.length
          ) {
            Object.assign(meteor, this.createMeteor());
          }
        }
        this.drawMeteor(meteor);
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
