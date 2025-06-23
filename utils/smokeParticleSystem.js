/**
 * 烟雾粒子系统
 * 兼容H5和小程序
 */
class SmokeParticleSystem {
  constructor(canvasId, options = {}) {
    this.canvasId = canvasId
    this.ctx = null
    this.particles = []
    this.isRunning = false
    this.animationId = null
    
    // 默认配置
    this.config = {
      maxParticles: options.maxParticles || 100,
      particleSize: options.particleSize || { min: 5, max: 25 },
      particleLife: options.particleLife || { min: 2000, max: 5000 },
      particleSpeed: options.particleSpeed || { min: 0.5, max: 2 },
      particleAlpha: options.particleAlpha || { min: 0.1, max: 0.6 },
      smokeColor: options.smokeColor || '#CCCCCC',
      turbulence: options.turbulence || 0.1,
      gravity: options.gravity || -0.05,
      wind: options.wind || { x: 0, y: 0 },
      ...options
    }
    
    // 烟雾颜色渐变
    this.smokeColors = [
      '#FFFFFF',
      '#F0F0F0', 
      '#E0E0E0',
      '#D0D0D0',
      '#C0C0C0',
      '#B0B0B0',
      '#A0A0A0',
      '#909090'
    ]
  }
  
  /**
   * 初始化Canvas
   */
  init() {
    return new Promise((resolve) => {
      try {
        // #ifdef H5
        this.ctx = uni.createCanvasContext(this.canvasId, this)
        // #endif
        
        // #ifdef MP-WEIXIN || MP-ALIPAY || MP-BAIDU || MP-TOUTIAO
        this.ctx = uni.createCanvasContext(this.canvasId, this)
        // #endif
        
        // #ifdef APP-PLUS
        this.ctx = uni.createCanvasContext(this.canvasId, this)
        // #endif
        
        resolve()
      } catch (error) {
        console.warn('Canvas初始化失败:', error)
        resolve()
      }
    })
  }
  
  /**
   * 开始粒子系统
   */
  start() {
    if (this.isRunning) return
    this.isRunning = true
    this.animate()
  }
  
  /**
   * 停止粒子系统
   */
  stop() {
    this.isRunning = false
    if (this.animationId) {
      cancelAnimationFrame(this.animationId)
      this.animationId = null
    }
  }
  
  /**
   * 清空所有粒子
   */
  clear() {
    this.particles = []
    if (this.ctx) {
      this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight)
      this.ctx.draw()
    }
  }
  
  /**
   * 设置Canvas尺寸
   */
  setCanvasSize(width, height) {
    this.canvasWidth = width
    this.canvasHeight = height
  }
  
  /**
   * 设置风向
   */
  setWind(x, y) {
    this.config.wind = { x, y }
  }
  
  /**
   * 创建烟雾粒子
   */
  createParticle(x, y, intensity = 1) {
    if (this.particles.length >= this.config.maxParticles) return
    
    const particle = {
      x: x + (Math.random() - 0.5) * 20,
      y: y + (Math.random() - 0.5) * 20,
      vx: (Math.random() - 0.5) * this.config.particleSpeed.max * intensity,
      vy: (Math.random() - 0.5) * this.config.particleSpeed.max * intensity,
      size: Math.random() * (this.config.particleSize.max - this.config.particleSize.min) + this.config.particleSize.min,
      life: 1,
      maxLife: Math.random() * (this.config.particleLife.max - this.config.particleLife.min) + this.config.particleLife.min,
      alpha: Math.random() * (this.config.particleAlpha.max - this.config.particleAlpha.min) + this.config.particleAlpha.min,
      color: this.smokeColors[Math.floor(Math.random() * this.smokeColors.length)],
      rotation: Math.random() * Math.PI * 2,
      rotationSpeed: (Math.random() - 0.5) * 0.1,
      createdAt: Date.now()
    }
    
    this.particles.push(particle)
  }
  
  /**
   * 创建爆炸式烟雾（吸一口时使用）
   */
  createExplosion(x, y, count = 15) {
    for (let i = 0; i < count; i++) {
      this.createParticle(x, y, 2)
    }
  }
  
  /**
   * 更新粒子
   */
  updateParticles() {
    this.particles = this.particles.filter(particle => {
      // 更新位置
      particle.x += particle.vx
      particle.y += particle.vy
      
      // 应用重力
      particle.vy += this.config.gravity
      
      // 应用风力
      particle.vx += this.config.wind.x
      particle.vy += this.config.wind.y
      
      // 添加湍流
      particle.vx += (Math.random() - 0.5) * this.config.turbulence
      particle.vy += (Math.random() - 0.5) * this.config.turbulence
      
      // 更新旋转
      particle.rotation += particle.rotationSpeed
      
      // 更新生命周期
      const age = Date.now() - particle.createdAt
      particle.life = 1 - (age / particle.maxLife)
      
      // 粒子逐渐变大
      particle.size += 0.1
      
      return particle.life > 0 && particle.y > -50
    })
  }
  
  /**
   * 绘制粒子
   */
  drawParticles() {
    if (!this.ctx) return
    
    // 清空画布
    this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight)
    
    // 绘制每个粒子
    this.particles.forEach(particle => {
      this.ctx.save()
      
      // 设置透明度
      this.ctx.globalAlpha = particle.alpha * particle.life
      
      // 移动到粒子位置
      this.ctx.translate(particle.x, particle.y)
      this.ctx.rotate(particle.rotation)
      
      // 创建径向渐变
      const gradient = this.ctx.createRadialGradient(0, 0, 0, 0, 0, particle.size)
      gradient.addColorStop(0, `${particle.color}FF`)
      gradient.addColorStop(0.5, `${particle.color}80`)
      gradient.addColorStop(1, `${particle.color}00`)
      
      // 绘制烟雾粒子
      this.ctx.fillStyle = gradient
      this.ctx.beginPath()
      this.ctx.arc(0, 0, particle.size, 0, Math.PI * 2)
      this.ctx.fill()
      
      this.ctx.restore()
    })
    
    // 绘制到画布
    this.ctx.draw()
  }
  
  /**
   * 动画循环
   */
  animate() {
    if (!this.isRunning) return
    
    this.updateParticles()
    this.drawParticles()
    
    this.animationId = requestAnimationFrame(() => {
      this.animate()
    })
  }
  
  /**
   * 获取粒子数量
   */
  getParticleCount() {
    return this.particles.length
  }
  
  /**
   * 设置烟雾强度
   */
  setIntensity(intensity) {
    this.config.maxParticles = Math.floor(intensity * 2)
  }
}

export default SmokeParticleSystem 