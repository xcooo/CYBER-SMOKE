/**
 * 音效管理器
 * 兼容H5和小程序
 */
class AudioManager {
  constructor() {
    this.sounds = {}
    this.isMuted = false
    this.volume = 0.5

    // 预定义音效
    this.soundConfigs = {
      ignite: {
        // #ifdef H5
        src: '/static/sounds/ignite.mp3',
        // #endif
        // #ifdef MP-WEIXIN || MP-ALIPAY || MP-BAIDU || MP-TOUTIAO
        src: '/static/sounds/ignite.mp3',
        // #endif
        volume: 0.6
      },
      puff: {
        // #ifdef H5
        src: '/static/sounds/puff.mp3',
        // #endif
        // #ifdef MP-WEIXIN || MP-ALIPAY || MP-BAIDU || MP-TOUTIAO
        src: '/static/sounds/puff.mp3',
        // #endif
        volume: 0.4
      },
      extinguish: {
        // #ifdef H5
        src: '/static/sounds/extinguish.mp3',
        // #endif
        // #ifdef MP-WEIXIN || MP-ALIPAY || MP-BAIDU || MP-TOUTIAO
        src: '/static/sounds/extinguish.mp3',
        // #endif
        volume: 0.5
      },
      spark: {
        // #ifdef H5
        src: '/static/sounds/spark.mp3',
        // #endif
        // #ifdef MP-WEIXIN || MP-ALIPAY || MP-BAIDU || MP-TOUTIAO
        src: '/static/sounds/spark.mp3',
        // #endif
        volume: 0.3
      }
    }
  }

  /**
   * 初始化音效
   */
  async init () {
    try {
      // 预加载所有音效
      for (const [key, config] of Object.entries(this.soundConfigs)) {
        try {
          await this.loadSound(key, config)
        } catch (error) {
          console.warn(`音效 ${key} 加载失败:`, error)
          // 继续加载其他音效，不中断整个初始化过程
        }
      }
      console.log('音效管理器初始化完成')
    } catch (error) {
      console.warn('音效加载失败，将使用静音模式:', error)
      this.isMuted = true
    }
  }

  /**
   * 加载音效
   */
  async loadSound (key, config) {
    return new Promise((resolve, reject) => {
      // #ifdef H5
      const audio = new Audio()
      audio.src = config.src
      audio.volume = config.volume * this.volume
      audio.preload = 'auto'

      audio.addEventListener('canplaythrough', () => {
        this.sounds[key] = audio
        resolve()
      })

      audio.addEventListener('error', (error) => {
        console.warn(`音效加载失败: ${key}`, error)
        reject(error)
      })
      // #endif

      // #ifdef MP-WEIXIN || MP-ALIPAY || MP-BAIDU || MP-TOUTIAO || APP-PLUS
      const innerAudioContext = uni.createInnerAudioContext()
      innerAudioContext.src = config.src
      innerAudioContext.volume = config.volume * this.volume

      innerAudioContext.onCanplay(() => {
        this.sounds[key] = innerAudioContext
        resolve()
      })

      innerAudioContext.onError((error) => {
        console.warn(`音效加载失败: ${key}`, error)
        reject(error)
      })
      // #endif
    })
  }

  /**
   * 播放音效
   */
  play (soundKey) {
    if (this.isMuted || !this.sounds[soundKey]) {
      console.log(`播放音效: ${soundKey} (静音或未加载)`)
      return
    }

    try {
      const sound = this.sounds[soundKey]

      // #ifdef H5
      sound.currentTime = 0
      sound.play().catch(error => {
        console.warn(`音效播放失败: ${soundKey}`, error)
      })
      // #endif

      // #ifdef MP-WEIXIN || MP-ALIPAY || MP-BAIDU || MP-TOUTIAO || APP-PLUS
      sound.stop()
      sound.play()
      // #endif

      console.log(`播放音效: ${soundKey}`)
    } catch (error) {
      console.warn(`音效播放失败: ${soundKey}`, error)
    }
  }

  /**
   * 播放点燃音效
   */
  playIgnite () {
    this.play('ignite')
  }

  /**
   * 播放吸一口音效
   */
  playPuff () {
    this.play('puff')
  }

  /**
   * 播放熄灭音效
   */
  playExtinguish () {
    this.play('extinguish')
  }

  /**
   * 播放火星音效
   */
  playSpark () {
    this.play('spark')
  }

  /**
   * 设置音量
   */
  setVolume (volume) {
    this.volume = Math.max(0, Math.min(1, volume))

    // 更新所有音效的音量
    Object.values(this.sounds).forEach(sound => {
      if (sound) {
        sound.volume = this.volume
      }
    })
  }

  /**
   * 静音/取消静音
   */
  toggleMute () {
    this.isMuted = !this.isMuted
    return this.isMuted
  }

  /**
   * 设置静音状态
   */
  setMuted (muted) {
    this.isMuted = muted
  }

  /**
   * 停止所有音效
   */
  stopAll () {
    Object.values(this.sounds).forEach(sound => {
      if (sound) {
        try {
          // #ifdef H5
          sound.pause()
          sound.currentTime = 0
          // #endif

          // #ifdef MP-WEIXIN || MP-ALIPAY || MP-BAIDU || MP-TOUTIAO || APP-PLUS
          sound.stop()
          // #endif
        } catch (error) {
          console.warn('停止音效失败:', error)
        }
      }
    })
  }

  /**
   * 销毁音效管理器
   */
  destroy () {
    this.stopAll()
    this.sounds = {}
  }
}

// 创建单例实例
const audioManager = new AudioManager()

export default audioManager 