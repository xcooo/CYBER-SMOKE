<template>
  <canvas canvas-id="smokeCanvas"
          class="smoke-canvas"></canvas>
</template>

<script>
export default {
  props: {
    isActive: Boolean,
    intensity: {
      type: Number,
      default: 0.8
    }
  },
  data () {
    return {
      explosionCtx: null,
      canvasWidth: 300,
      canvasHeight: 400,
      particles: [],
      timer: null,
      particleCount: 60
    }
  },
  watch: {
    isActive (val) {
      if (val) {
        this.startSmoke()
      } else {
        this.stopSmoke()
      }
    }
  },
  mounted () {
    this.initExplosionCanvas()
  },
  methods: {
    initExplosionCanvas () {
      if (this.explosionCtx) return;
      try {
        this.explosionCtx = uni.createCanvasContext('smokeCanvas', this);
        this.createParticles();
        if (this.isActive) this.startSmoke();
      } catch (error) {
        console.error('Canvas 初始化失败:', error);
      }
    },
    createParticles () {
      this.particles = []
      for (let i = 0; i < this.particleCount; i++) {
        this.particles.push(this.createParticle())
      }
    },
    createParticle () {
      return {
        x: this.canvasWidth / 2 + (Math.random() - 0.5) * 40,
        y: this.canvasHeight - 60 + Math.random() * 10,
        radius: 10 + Math.random() * 15,
        alpha: 0.6 + Math.random() * 0.4,
        vx: (Math.random() - 0.5) * 0.5,
        vy: -0.5 - Math.random(),
      }
    },
    drawParticle (p) {
      const ctx = this.explosionCtx
      ctx.beginPath();
      ctx.setFillStyle(`rgba(255,255,255,${p.alpha.toFixed(2)})`);
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fill();
      ctx.closePath();
    },
    updateParticles () {
      this.particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy * this.intensity;
        p.alpha -= 0.005 * this.intensity;
        if (p.alpha <= 0) {
          Object.assign(p, this.createParticle());
        }
      });
    },
    render () {
      const ctx = this.explosionCtx
      ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight)
      this.particles.forEach(p => {
        this.drawParticle(p);
      });
      ctx.draw();
    },
    startSmoke () {
      if (this.timer) return;
      this.timer = setInterval(() => {
        this.updateParticles();
        this.render();
      }, 30);
    },
    stopSmoke () {
      clearInterval(this.timer);
      this.timer = null;
      if (this.explosionCtx) {
        this.explosionCtx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
        this.explosionCtx.draw();
      }
    }
  },
  beforeDestroy () {
    this.stopSmoke();
  }
}
</script>

<style scoped>
.smoke-canvas {
  width: 300px;
  height: 400px;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  bottom: 0;
  z-index: 999;
  pointer-events: none;
  background: rgba(255, 255, 255, 0.05);
}
</style>
