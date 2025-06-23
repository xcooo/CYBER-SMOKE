<template>
  <canvas canvas-id="smokeCanvas" class="smoke-canvas"></canvas>
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
      ctx: null,
      particles: [],
      timer: null,
      canvasWidth: 300,
      canvasHeight: 400,
      image: null,
      particleCount: 30
    }
  },
  watch: {
    isActive (val) {
      if (val) {
        this.start()
      } else {
        this.stop()
      }
    }
  },
  mounted () {
    this.initCanvas()
  },
  methods: {
    initCanvas () {
      this.ctx = uni.createCanvasContext('smokeCanvas', this)
      this.loadImage()
    },
    loadImage () {
      uni.getImageInfo({
        src: '/static/smoke2.png',
        success: (res) => {
          this.image = res.path
          this.createParticles()
          if (this.isActive) this.start()
        },
        fail: (err) => {
          console.error('图片加载失败:', err)
        }
      })
    },
    createParticles () {
      this.particles = []
      for (let i = 0; i < this.particleCount; i++) {
        this.particles.push(this.createParticle())
      }
    },
createParticle () {
  return {
    x: this.canvasWidth / 2 + (Math.random() - 0.5) * 20, // 更集中
    y: this.canvasHeight + Math.random() * 10,             // 更靠下起点
    scale: 0.3 + Math.random() * 0.4,
    alpha: 0.3 + Math.random() * 0.5,
    vy: -0.6 - Math.random() * 0.7, // 增加向上速度
    vx: (Math.random() - 0.5) * 0.2,
    drift: Math.random() * Math.PI * 2
  }
},
    updateParticles () {
      this.particles.forEach(p => {
        p.drift += 0.03
        p.x += p.vx + Math.sin(p.drift) * 0.5
        p.y += p.vy * this.intensity
        p.alpha -= 0.002 * this.intensity

        if (p.alpha <= 0 || p.y < -100) {
          Object.assign(p, this.createParticle())
        }
      })
    },
    render () {
      const ctx = this.ctx
      ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight)

      this.particles.forEach(p => {
        ctx.save()
        ctx.globalAlpha = p.alpha
        const w = 80 * p.scale
        const h = 160 * p.scale
        ctx.drawImage(this.image, p.x - w / 2, p.y - h / 2, w, h)
        ctx.restore()
      })

      ctx.draw()
    },
    start () {
      if (this.timer || !this.image) return
      this.timer = setInterval(() => {
        this.updateParticles()
        this.render()
      }, 30)
    },
    stop () {
      clearInterval(this.timer)
      this.timer = null
      if (this.ctx) {
        this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight)
        this.ctx.draw()
      }
    }
  },
  beforeDestroy () {
    this.stop()
  }
}
</script>

<style scoped>
.smoke-canvas {
  width: 300px;
  height: 400px;
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  z-index: 99;
  pointer-events: none;
  background-color: transparent;
}
</style>
