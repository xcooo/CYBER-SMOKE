<template>
  <view class="cyber-smoke-container">
    <!-- 背景 -->
    <view class="background">
      <view class="stars" v-for="(star, index) in stars" :key="index"
        :style="{ left: star.x + 'px', top: star.y + 'px', animationDelay: star.delay + 's' }"></view>
    </view>

    <CloudBackgroundBlack ref="cloudBackgroundBlack"></CloudBackgroundBlack>

    <!-- 标题 -->
    <view class="title">
      <text class="title-text">赛博畅吸</text>
      <text class="subtitle">CYBER SMOKE</text>
    </view>

    <!-- 健康提示（移至顶部） -->
    <view class="health-warning">
      <text class="warning-text">未成年青少年禁止吸烟</text>
      <text class="warning-text">吸烟有害健康</text>
    </view>

    <!-- 香烟区域 -->
    <view class="cigarette-area">
      <view class="cigarette" :class="{ burning: isBurning }" :style="{ width: cigaretteWidth + 'rpx' }">
        <!-- 烟身 -->
        <view class="body" :style="{ height: cigaretteLength + 'vh' }">
          <view class="cigarette-paper">
            <!-- 新增火焰元素 -->
            <view class="flame" :class="{ igniting: isIgniting }" v-if="isIgniting"
              :style="{ top: `calc(${burnProgress}% - 40rpx)` }">
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
            </view>
            <!-- 烧焦边缘 -->
            <view class="burn-edge" v-if="isBurning" :style="{ top: burnProgress + '%' }"></view>

            <!-- 火光 -->
            <view class="ember" v-if="isBurning" :style="{ top: `calc(${burnProgress}% - 10rpx)` }"></view>

            <!-- 竖纹 -->
            <view class="thread-pattern"></view>

            <!-- 已经燃烧过的烟身区域 -->
            <view class="burned-ash" v-if="burnProgress > 0" :style="{ height: burnProgress + '%', top: 0 }">
            </view>
          </view>
        </view>

        <!-- 烟嘴 -->
        <view class="filter">
          <!-- 中华标识 -->
          <view class="brand-label">
            <text class="brand-text">{{ cigaretteBrand }}</text>
          </view>
          <!-- 英文标识 -->
          <text class="brand-text-eng">CHUNGHWA</text>
          <!-- 高光线 -->
          <view class="highlight-line"></view>
        </view>
      </view>

      <!-- 烟雾粒子 -->
      <view class="smoke-particles">
        <view class="smoke-particle" v-for="(particle, index) in smokeParticles" :key="index" :style="{
          left: particle.x + 'px',
          top: particle.y + 'px',
          opacity: particle.opacity,
          transform: `scale(${particle.scale})`
        }" />
      </view>

    </view>

    <!-- 控制按钮（移至香烟左侧垂直排列） -->
    <view class="controls left-controls">
      <view class="control-btn light-btn" @click="startBurning" :disabled="isBurning">
        <text class="btn-text">点火</text>
      </view>
      <view class="control-btn extinguish-btn" @click="extinguishCigarette"
        :disabled="!isBurning || isBurning && !isActivelyBurning">
        <text class="btn-text">熄灭</text>
      </view>
      <view class="control-btn mode-btn" @click="toggleSmokeMode">
        <text class="btn-text">
          {{ smokeMode === 'segment' ? '节俭模式' : '土豪模式' }}
        </text>
      </view>
      <view class="control-btn reset-btn" @click="resetCigarette">
        <text class="btn-text">再来一根</text>
      </view>
    </view>

    <view class="controls right-controls">
      <view class="control-btn want-btn" @click="showCigarettePopup = true">
        <text class="btn-text">我想吸</text>
      </view>
      <view class="control-btn info-btn" @click="showInfoPopup = true">
        <text class="btn-text">玩法说明</text>
      </view>
    </view>

    <!-- 状态显示 -->
    <view class="status">
      <text class="mode-text">模式：{{ smokeMode == 'segment' ? '断续吸烟' : '一吸到底' }}</text>
      <text class="status-text">{{ statusText || '香烟已点燃' }}</text>
      <text class="burn-progress">燃烧进度: {{ burnProgress.toFixed(2) }}%</text>
      <text class="cloud-status" :class="{ active: isCloudEffectActive }">
        云雾效果: {{ isCloudEffectActive ? '吐雾中' : '吸烟中' }}
      </text>
    </view>

    <!-- 模式切换动画提示 -->
    <view class="mode-transition-animation" v-if="showModeTransition"
      :class="{ 'fade-in': isFadingIn, 'fade-out': isFadingOut }">
      <view class="mode-transition-text">{{ smokeMode === 'segment' ? '已切换到节俭模式' : '已切换到土豪模式' }}</view>
    </view>

    <u-popup v-model="showInfoPopup" mode="center" :mask-close-able="true" border-radius="20">
      <view class="info-popup-content">
        <view class="info-title">玩法说明</view>
        <view class="info-desc">
          <view>1. 通过真实的视觉和声音效果，让用户在屏幕上"吸烟"，无须点燃真实香烟，体验虚拟吸烟的乐趣。</view>
          <view>2. 解决公共场所或上班状态不能吸烟的痛楚！</view>
          <view>3. 对着充电口吹气，燃烧速度更快哦！</view>
          <view>4. 赛博畅吸市面上的香烟或特供香烟！</view>
          <view>5. 赛博经济商业玩法合作加V: xcooo88</view>
        </view>
        <view class="info-btns">
          <view class="info-close-btn" @click="showInfoPopup = false">我知道了</view>
        </view>
      </view>
    </u-popup>

    <u-popup v-model="showCigarettePopup" mode="center" :mask-close-able="true" width="90%" border-radius="20"
      @close="cigarettePopupClose">
      <view class="cigarette-popup-content">
        <view class="info-title">自定义香烟</view>
        <view class="cigarette-form">
          <view class="form-row">
            <text class="form-label">香烟品牌：</text>
            <u-input class="form-input" v-model="cigaretteBrand" placeholder="请输入品牌名" />
          </view>
          <view class="form-row">
            <text class="form-label">香烟宽度：</text>
            <u-input class="form-input" v-model.number="cigaretteWidth" type="number" min="40" max="200" />
          </view>
        </view>
        <view class="info-btns">
          <view class="info-close-btn" @click="showCigarettePopup = false">取消</view>
          <view class="info-close-btn confirm" @click="applyCigaretteStyle">确认</view>
        </view>
      </view>
    </u-popup>

  </view>
</template>

<script>
import CloudBackgroundBlack from '@/components/cloudBackground/CloudBackgroundBlack'
export default {
  name: 'CyberSmoke',
  components: {
    CloudBackgroundBlack
  },
  data () {
    return {
      // 原有数据...
      isBurning: true,
      isActivelyBurning: false,
      isIgniting: false, // 新增：点火时的火焰状态
      ignitionTimer: null, // 新增：点火动画定时器
      smokeParticles: [],
      stars: [],
      animationFrameId: null,
      statusText: '香烟已点燃',
      burnProgress: 1,
      burnTriggerPoints: [],
      triggeredPoints: new Set(),
      smokeMode: 'segment',
      segmentTimer: null,
      audioManager: null,
      showInfoPopup: false,
      showCigarettePopup: false,
      cigaretteBrand: '中华',
      cigaretteWidth: 80,
      cigaretteLength: 60,
      isCloudEffectActive: false,
      showModeTransition: false,
      isFadingIn: false,
      isFadingOut: false,
      modeTransitionTimer: null,

      // 吹气检测相关数据
      isBlowDetecting: false,
      blowStrength: 0,       // 吹气强度 (0-1)
      blowSpeedMultiplier: 1, // 吹气速度倍率
      audioContext: null,
      analyser: null,
      microphone: null,
      dataArray: null,
      blowTimeout: null,
      lastBlowTime: 0
    }
  },
  mounted () {
    this.initStars();
    this.generateTriggerPoints();
    this.startAnimationLoop();
    this.initAudioManager();

    // 初始化吹气检测
    this.initBlowDetection();
  },
  beforeDestroy () {
    cancelAnimationFrame(this.animationFrameId);
    this.stopCloudEffect();
    this.clearModeTransitionTimer();
    this.stopBlowDetection(); // 停止吹气检测
    if (this.ignitionTimer) clearTimeout(this.ignitionTimer);
  },
  methods: {
    // 原有方法...
    generateTriggerPoints () {
      this.burnTriggerPoints = [];
      this.triggeredPoints.clear();

      const numPoints = 3 + Math.floor(Math.random() * 4);
      const progressRange = 70;
      const intervalSize = progressRange / numPoints;

      for (let i = 0; i < numPoints; i++) {
        const minProgress = 15 + (i * intervalSize);
        const maxProgress = minProgress + intervalSize;
        const triggerPoint = minProgress + 5 + Math.random() * (intervalSize - 10);
        this.burnTriggerPoints.push(triggerPoint);
      }

      this.burnTriggerPoints.sort((a, b) => a - b);

      console.log('生成的触发点:', this.burnTriggerPoints.map(p => p.toFixed(2)));
    },
    initStars () {
      for (let i = 0; i < 50; i++) {
        this.stars.push({
          x: Math.random() * 750,
          y: Math.random() * 1334,
          delay: Math.random() * 3
        });
      }
    },
    startAnimationLoop () {
      const loop = () => {
        this.updateSmokeParticles();
        this.updateBurnProgress();
        this.animationFrameId = requestAnimationFrame(loop);
      };
      loop();
    },
    updateSmokeParticles () {
      if (!this.isBurning) return;

      if (this.smokeParticles.length < 10 && Math.random() < 0.2) {
        this.smokeParticles.push({
          x: 40 + Math.random() * 40,
          y: 0,
          opacity: 0.4,
          scale: 0.6,
          rotation: 0,
          startTime: Date.now(),
          life: 6000,
        });
      }

      const now = Date.now();
      this.smokeParticles.forEach(p => {
        const progress = (now - p.startTime) / p.life;
        p.y = -progress * 500;
        p.x += Math.sin(progress * Math.PI) * 10;
        p.scale = 0.6 + progress * 0.9;
        p.opacity = Math.max(0, 0.4 * (1 - progress));
      });

      this.smokeParticles = this.smokeParticles.filter(p => (Date.now() - p.startTime) < p.life);
    },
    updateBurnProgress () {
      if (this.isActivelyBurning && this.burnProgress < 100) {
        // 根据吹气强度调整燃烧速度
        const baseSpeed = this.smokeMode === 'continuous' ? 0.25 : 0.15;
        const speedMultiplier = this.isBlowDetecting && this.blowStrength > 0.3
          ? 1 + this.blowStrength * 3 // 最大4倍速度
          : 1;
        this.blowSpeedMultiplier = speedMultiplier;

        const jitter = (Math.random() - 0.5) * 0.2;
        this.burnProgress += (baseSpeed * speedMultiplier) + jitter;

        if (this.burnProgress >= 100) {
          this.burnProgress = 100;
          this.isActivelyBurning = false;
          this.statusText = '香烟已燃尽';

          this.stopCloudEffect();

          if (this.animationFrameId) {
            cancelAnimationFrame(this.animationFrameId);
            this.animationFrameId = null;
          }
        }

        this.burnTriggerPoints.forEach((triggerPoint, index) => {
          if (this.burnProgress >= triggerPoint && !this.triggeredPoints.has(index)) {
            this.triggeredPoints.add(index);
            if (this.audioManager) this.audioManager.play('cloud');

            this.startCloudEffect();

            console.log(`燃烧进度到达触发点 ${index + 1}: ${triggerPoint.toFixed(2)}%`);
          }
        });
      }
    },
    startSmoking () {
      if (this.smokeMode === 'segment') {
        this.startSegmentSmoking();
      } else {
        this.startContinuousSmoking();
      }
    },
    startSegmentSmoking () {
      if (this.segmentTimer) clearTimeout(this.segmentTimer);

      const inhale = () => {
        if (!this.isBurning || this.burnProgress >= 100) return;

        this.isActivelyBurning = true;

        const inhaleDuration = 600 + Math.random() * 600;

        setTimeout(() => {
          this.isActivelyBurning = false;

          const pauseDuration = 2000 + Math.random() * 2000;

          this.segmentTimer = setTimeout(() => {
            inhale();
          }, pauseDuration);
        }, inhaleDuration);
      };

      const initialDelay = 500 + Math.random() * 800;
      this.segmentTimer = setTimeout(() => {
        inhale();
      }, initialDelay);
    },
    startContinuousSmoking () {
      if (this.segmentTimer) clearTimeout(this.segmentTimer);
      this.isActivelyBurning = true;
    },
    stopSmoking () {
      if (this.segmentTimer) clearTimeout(this.segmentTimer);
      this.isActivelyBurning = false;
    },
    startBurning () {
      if (this.burnProgress === 100) {
        uni.showToast({
          title: '本只已抽完，请再来一根',
          icon: 'none',
          duration: 2000
        });
        return
      }
      if (this.audioManager) this.audioManager.play('startBurning');

      // 新增：显示点火火焰动画
      this.showIgnitionFlame();
      if (this.smokeMode === 'segment') {
        this.startSegmentSmoking();
      } else {
        this.startContinuousSmoking();
      }
    },
    // 新增：点火火焰动画
    showIgnitionFlame () {
      this.isIgniting = true;

      // 火焰动画持续1.5秒后消失
      this.ignitionTimer = setTimeout(() => {
        this.isIgniting = false;
      }, 1500);
    },
    cigarettePopupClose () {
      if (this.cigaretteBrand === '') {
        this.cigaretteBrand = '中华'
      }
    },
    extinguishCigarette () {
      this.stopSmoking();
      this.stopCloudEffect();
      this.statusText = '香烟已熄灭';
    },
    resetCigarette () {
      this.generateTriggerPoints();
      this.stopCloudEffect();
      this.stopSmoking();
      this.isBurning = true;
      this.isActivelyBurning = false;
      this.burnProgress = 1;
      this.statusText = '香烟已点燃';
      this.smokeParticles = [];
      this.stars = [];
      this.initStars();
      if (this.animationFrameId) {
        cancelAnimationFrame(this.animationFrameId);
        this.animationFrameId = null;
      }
      this.startAnimationLoop();
    },
    toggleSmokeMode () {
      this.stopSmoking();
      if (this.smokeMode === 'segment') {
        this.smokeMode = 'continuous';
      } else {
        this.smokeMode = 'segment';
      }

      this.showModeTransitionAnimation();

      if (this.isBurning && this.burnProgress < 100) {
        this.startSmoking();
      }
    },
    initAudioManager () {
      this.audioManager = {
        audios: {
          startBurning: new Audio(require('@/static/sounds/startBurning.mp3')),
          cloud: new Audio(require('@/static/sounds/cloud.mp3')),
          blowDetected: new Audio(require('@/static/sounds/blowDetected.mp3')) // 新增吹气音效
        },
        play (name) {
          const audio = this.audios[name];
          if (audio) {
            audio.currentTime = 0;
            audio.play().catch(err => {
              console.error(`音频播放失败 (${name}):`, err);
            });
          }
        },
        stop (name) {
          const audio = this.audios[name];
          if (audio) {
            audio.pause();
            audio.currentTime = 0;
          }
        }
      };
    },
    applyCigaretteStyle () {
      this.showCigarettePopup = false;
    },
    startCloudEffect () {
      if (this.isCloudEffectActive && this.cloudEffectTimer) {
        clearTimeout(this.cloudEffectTimer);

        const extendedDuration = 2000 + Math.random() * 2000;

        this.cloudEffectTimer = setTimeout(() => {
          this.stopCloudEffect();
        }, extendedDuration);

        console.log(`云雾效果延长，额外持续时间: ${(extendedDuration / 1000).toFixed(1)}秒`);
        return;
      }

      this.isCloudEffectActive = true;
      this.$refs.cloudBackgroundBlack.start();

      const cloudDuration = 3000 + Math.random() * 3000;

      this.cloudEffectTimer = setTimeout(() => {
        this.stopCloudEffect();
      }, cloudDuration);

      console.log(`云雾效果启动，持续时间: ${(cloudDuration / 1000).toFixed(1)}秒`);
    },
    stopCloudEffect () {
      this.isCloudEffectActive = false;
      this.$refs.cloudBackgroundBlack.stop();
      if (this.cloudEffectTimer) {
        clearTimeout(this.cloudEffectTimer);
        this.cloudEffectTimer = null;
      }
      console.log('云雾效果已停止');
    },
    showModeTransitionAnimation () {
      this.clearModeTransitionTimer();

      this.showModeTransition = true;
      this.isFadingIn = true;
      this.isFadingOut = false;

      setTimeout(() => {
        this.isFadingIn = false;

        setTimeout(() => {
          this.isFadingOut = true;

          setTimeout(() => {
            this.showModeTransition = false;
            this.isFadingOut = false;
          }, 1000);
        }, 3000);
      }, 1000);
    },
    clearModeTransitionTimer () {
      if (this.modeTransitionTimer) {
        clearTimeout(this.modeTransitionTimer);
        this.modeTransitionTimer = null;
      }
    },

    // ===== 吹气检测相关方法 =====
    initBlowDetection () {
      // 检查浏览器是否支持Web Audio API
      if (!window.AudioContext && !window.webkitAudioContext) {
        console.error('当前不支持Web Audio API，吹气检测功能不可用');
        uni.showToast({
          title: '不支持吹气功能',
          icon: 'none',
          duration: 2000
        });
        return;
      }

      // 申请充电口权限并初始化音频分析
      this.requestMicrophonePermission();
    },

    requestMicrophonePermission () {
      navigator.mediaDevices.getUserMedia({ audio: true })
        .then(stream => {
          this.setupAudioContext(stream);
          this.isBlowDetecting = true;
          uni.showToast({
            title: '已启用吹气检测，对着手机充电口吹气',
            icon: 'success',
            duration: 2000
          });
        })
        .catch(err => {
          this.handleMicrophoneError(err);
        });
    },

    setupAudioContext (stream) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      this.audioContext = new AudioContext();
      this.analyser = this.audioContext.createAnalyser();
      this.microphone = this.audioContext.createMediaStreamSource(stream);

      this.microphone.connect(this.analyser);
      this.analyser.fftSize = 256;

      this.dataArray = new Uint8Array(this.analyser.frequencyBinCount);

      // 开始实时分析音频数据
      this.startAudioAnalysis();
    },

    startAudioAnalysis () {
      if (!this.audioContext || !this.analyser || !this.dataArray) return;

      const analyze = () => {
        if (this.audioContext.state === 'closed') return;

        this.analyser.getByteFrequencyData(this.dataArray);
        this.detectBlowStrength();
        requestAnimationFrame(analyze);
      };

      analyze();
    },

    detectBlowStrength () {
      if (!this.dataArray || this.dataArray.length === 0) return;

      // 计算音频数据的最大值作为吹气强度
      const maxVolume = Math.max(...this.dataArray);
      this.blowStrength = maxVolume / 255; // 标准化为0-1范围

      // 检测到有效吹气（强度>0.3）
      if (this.blowStrength > 0.3) {
        this.lastBlowTime = Date.now();

        // 播放吹气音效（避免频繁播放）
        if (Date.now() - this.lastBlowSoundTime > 1000) {
          this.audioManager.play('blowDetected');
          this.lastBlowSoundTime = Date.now();
        }

        // 更新状态显示
        this.statusText = `正在吹气，燃烧速度: ${(this.blowSpeedMultiplier * 100).toFixed(0)}%`;
      } else if (Date.now() - this.lastBlowTime > 1500) {
        // 停止吹气一段时间后恢复正常状态
        this.statusText = this.isActivelyBurning
          ? '香烟已点燃'
          : '香烟已熄灭';
      }
    },

    stopBlowDetection () {
      this.isBlowDetecting = false;
      this.blowStrength = 0;
      this.blowSpeedMultiplier = 1;

      if (this.audioContext) {
        if (this.microphone) this.microphone.disconnect();
        this.audioContext.close();
        this.audioContext = null;
      }
    },

    handleMicrophoneError (err) {
      console.error('麦克风权限申请失败:', err);
      this.isBlowDetecting = false;

      let errorMsg = '无法访问麦克风，吹气功能不可用';
      if (err.name === 'NotAllowedError') {
        errorMsg = '请在浏览器设置中允许麦克风访问';
      } else if (err.name === 'NotFoundError') {
        errorMsg = '未检测到麦克风设备';
      }

      uni.showToast({
        title: errorMsg,
        icon: 'none',
        duration: 3000
      });
    }
  }
}
</script>

<style lang="scss" scoped>
.cyber-smoke-container {
  width: 100vw;
  height: 100vh;
  background: linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%);
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;

  .background {
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 1;

    .stars {
      position: absolute;
      width: 4rpx;
      height: 4rpx;
      background: #fff;
      border-radius: 50%;
      animation: twinkle 3s infinite;
    }
  }

  .title {
    margin-top: 20rpx;
    text-align: center;
    z-index: 10;

    .title-text {
      display: block;
      font-size: 72rpx;
      font-weight: bold;
      color: #00ffff;
      text-shadow: 0 0 40rpx #00ffff;
      margin-bottom: 20rpx;
    }

    .subtitle {
      display: block;
      font-size: 32rpx;
      color: #888;
      letter-spacing: 6rpx;
    }
  }

  .health-warning {
    margin-top: 20rpx;
    text-align: center;
    z-index: 10;
    padding: 10rpx 20rpx;
    background: rgba(255, 0, 0, 0.1);
    border-radius: 20rpx;
    border: 2rpx solid rgba(255, 0, 0, 0.3);

    .warning-text {
      display: block;
      font-size: 24rpx;
      color: #ff4444;
      margin-bottom: 4rpx;
      font-weight: bold;
      text-shadow: 0 0 4rpx rgba(255, 68, 68, 0.5);

      &:last-child {
        margin-bottom: 0;
      }
    }
  }

  .cigarette-area {
    position: relative;
    margin-top: 100rpx;
    margin-bottom: 50rpx;
    display: flex;
    justify-content: center;
    z-index: 10;
  }

  .cigarette {
    width: 80rpx;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
  }

  .body {
    position: relative;
    width: 100%;
    height: 60vh;
    // background: linear-gradient(135deg,
    //     #ffffff 0%,
    //     #f8f8f8 30%,
    //     #f0f0f0 50%,
    //     #e8e8e8 70%,
    //     #e0e0e0 100%);
    border-radius: 12rpx 12rpx 0 0;
    // overflow: hidden;
    // border: 2rpx solid #d0d0d0;
    // box-shadow: 0 4rpx 8rpx rgba(0, 0, 0, 0.2), 0 2rpx 4rpx rgba(0, 0, 0, 0.1),
    //   inset 0 2rpx 4rpx rgba(255, 255, 255, 0.8),
    //   inset 0 -2rpx 4rpx rgba(0, 0, 0, 0.1);

    &::before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(135deg,
          rgba(255, 255, 255, 0.6) 0%,
          rgba(255, 255, 255, 0.3) 30%,
          transparent 60%,
          rgba(0, 0, 0, 0.1) 100%);
      border-radius: 12rpx 12rpx 0 0;
      z-index: 3;
    }


    .cigarette-paper {
      position: absolute;
      width: 100%;
      height: 100%;
      background: repeating-linear-gradient(0deg,
          #ffffff,
          #ffffff 4rpx,
          #f8f8f8 4rpx,
          #f8f8f8 8rpx);
      border-radius: 12rpx 12rpx 0 0;

      .flame {
        position: absolute;
        width: 100%;
        height: 120rpx;
        left:50%;

        z-index: 7;
        pointer-events: none;
        transform-origin: center bottom;
        opacity: 0;

        /* 点火时淡入效果 */
        &.igniting {
          animation: fadeIn 0.3s forwards;
        }

        /* 主火焰层 */
        &::before {
          content: "";
          position: absolute;
          top: -30rpx;
          left: 50%;
          transform: translateX(-50%);
          width: 130%;
          height: 100%;
          background: radial-gradient(ellipse at center,
              rgba(255, 30, 0, 0.9) 0%,
              rgba(255, 90, 0, 0.8) 30%,
              rgba(255, 150, 0, 0.6) 60%,
              transparent 85%);
          border-radius: 45% 45% 30% 30% / 70% 70% 30% 30%;
          animation: flameMain 0.8s infinite alternate cubic-bezier(0.4, 0, 0.6, 1);
          filter: blur(2rpx);
        }

        /* 中间火焰层 */
        &::after {
          content: "";
          position: absolute;
          top: -40rpx;
          left: 50%;
          transform: translateX(-50%);
          width: 100%;
          height: 80%;
          background: radial-gradient(ellipse at center,
              rgba(255, 200, 0, 0.95) 0%,
              rgba(255, 180, 0, 0.8) 40%,
              rgba(255, 150, 0, 0.6) 70%,
              transparent 90%);
          border-radius: 50%;
          animation: flameMiddle 0.6s infinite alternate cubic-bezier(0.3, 0, 0.7, 1);
          filter: blur(3rpx);
          opacity: 0.9;
        }

        /* 明亮核心层 */
        & span:nth-child(1) {
          content: "";
          position: absolute;
          top: -50rpx;
          left: 50%;
          transform: translateX(-50%);
          width: 60%;
          height: 50%;
          background: radial-gradient(ellipse at center,
              rgba(255, 255, 180, 1) 0%,
              rgba(255, 230, 0, 0.9) 50%,
              rgba(255, 200, 0, 0.7) 80%,
              transparent 100%);
          border-radius: 50%;
          animation: flameCore 0.4s infinite alternate cubic-bezier(0.5, 0, 0.5, 1);
          filter: blur(4rpx);
          z-index: 10;
        }

        /* 随机火焰粒子 */
        & span:nth-child(n+2) {
          content: "";
          position: absolute;
          top: -40rpx;
          left: 50%;
          width: 15rpx;
          height: 25rpx;
          background: radial-gradient(circle at center,
              rgba(255, 200, 0, 0.8) 0%,
              rgba(255, 150, 0, 0.6) 50%,
              transparent 80%);
          border-radius: 50%;
          opacity: 0;
          filter: blur(2rpx);
          animation: flameParticle 2s infinite ease-in;
        }

        /* 生成多个随机位置的粒子 */
        & span:nth-child(2) {
          animation-delay: 0.2s;
          left: 30%;
        }

        & span:nth-child(3) {
          animation-delay: 0.7s;
          left: 70%;
        }

        & span:nth-child(4) {
          animation-delay: 1.2s;
          left: 40%;
        }

        & span:nth-child(5) {
          animation-delay: 1.7s;
          left: 60%;
        }

        & span:nth-child(6) {
          animation-delay: 0.5s;
          left: 25%;
        }

        & span:nth-child(7) {
          animation-delay: 1.1s;
          left: 75%;
        }
      }

      .burn-edge {
        position: absolute;
        left: 0;
        width: 100%;
        height: 24rpx;
        background: radial-gradient(circle at 20% 60%, #4f4f4f, transparent 60%),
          radial-gradient(circle at 50% 40%, #a9a9a9, transparent 60%),
          radial-gradient(circle at 80% 50%, #696969, transparent 60%);
        background-repeat: no-repeat;
        background-size: cover;
        filter: blur(1rpx);
        z-index: 5;
        pointer-events: none;
        transition: top 0.2s linear;
      }

      .ember {
        position: absolute;
        width: 100%;
        height: 5rpx;
        border-radius: 6rpx;
        background: radial-gradient(circle, #ff9933, #ff3300, transparent);
        animation: emberFlicker 0.4s infinite alternate;
        opacity: 0.7;
        z-index: 6;
      }

      .thread-pattern {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-image: repeating-linear-gradient(90deg,
            transparent,
            transparent 2rpx,
            rgba(200, 200, 200, 0.2) 2rpx,
            rgba(200, 200, 200, 0.2) 4rpx);
        opacity: 0.4;
      }

      .burned-ash {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        background:
          radial-gradient(circle at 30% 20%, #3a3a3a 0%, transparent 50%),
          radial-gradient(circle at 70% 60%, #555 0%, transparent 60%),
          linear-gradient(to bottom, #7e7e7e 0%, #2e2e2e 100%);
        background-blend-mode: multiply;
        border-radius: 12rpx 12rpx 0 0;
        z-index: 2;
        transition: height 0.2s ease-out;
        height: 0;

        // 加“碎裂质感”的图层
        &::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;

          background-image:
            repeating-linear-gradient(45deg, rgba(0, 0, 0, 0.05) 0, rgba(0, 0, 0, 0.05) 1rpx, transparent 1rpx, transparent 3rpx),
            repeating-linear-gradient(-45deg, rgba(255, 255, 255, 0.04) 0, rgba(255, 255, 255, 0.04) 2rpx, transparent 2rpx, transparent 4rpx),
            url('https://img.alicdn.com/imgextra/i2/2200676927379/O1CN01epPC1S24NddXJpNir_!!2200676927379.png'); // 可选：碎灰贴图（你可以用 PNG 贴图替代）
          background-size: cover;
          opacity: 0.4;
          pointer-events: none;
        }

        &::after {
          content: "";
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 10rpx;
          background: radial-gradient(ellipse at center, #000 0%, transparent 80%);
          filter: blur(6rpx);
          opacity: 0.3;
        }
      }

    }
  }

  /* 淡入动画 */
  @keyframes fadeIn {
    from {
      opacity: 0;
    }

    to {
      opacity: 1;
    }
  }

  /* 主火焰动画 */
  @keyframes flameMain {
    0% {
      transform: translateX(-50%) scale(1) rotate(-2deg);
      height: 100%;
      border-radius: 45% 45% 30% 30% / 70% 70% 30% 30%;
    }

    100% {
      transform: translateX(-50%) scale(1.05) rotate(2deg);
      height: 110%;
      border-radius: 45% 45% 30% 30% / 80% 80% 20% 20%;
    }
  }

  /* 中间火焰动画 */
  @keyframes flameMiddle {
    0% {
      transform: translateX(-50%) scale(0.95) rotate(1deg);
      opacity: 0.85;
    }

    100% {
      transform: translateX(-50%) scale(1.05) rotate(-1deg);
      opacity: 0.95;
    }
  }

  /* 核心火焰动画 */
  @keyframes flameCore {
    0% {
      transform: translateX(-50%) scale(0.9) translateY(0);
      opacity: 0.9;
    }

    100% {
      transform: translateX(-50%) scale(1.1) translateY(-5rpx);
      opacity: 1;
    }
  }

  /* 火焰粒子动画 */
  @keyframes flameParticle {
    0% {
      opacity: 0;
      transform: translate(-50%, 0) scale(0.3);
    }

    20% {
      opacity: 0.8;
    }

    100% {
      opacity: 0;
      transform: translate(calc(-50% + var(--x, 0)), calc(-100% + var(--y, 0))) scale(1);
    }
  }


  @keyframes emberFlicker {
    from {
      opacity: 0.3;
      transform: scale(1);
    }

    to {
      opacity: 1;
      transform: scale(1.1);
    }
  }

  .filter {
    width: 100%;
    height: 20vh;
    background: linear-gradient(135deg,
        #e6c35c 0%,
        #d9ab52 30%,
        #c8943b 50%,
        #b8860b 70%,
        #a67c00 100%);
    border-radius: 0 0 12rpx 12rpx;
    // border: 2rpx solid #9a6b1f;
    box-shadow: 0 4rpx 8rpx rgba(0, 0, 0, 0.2), 0 2rpx 4rpx rgba(0, 0, 0, 0.1),
      inset 0 2rpx 4rpx rgba(255, 255, 255, 0.6),
      inset 0 -2rpx 4rpx rgba(0, 0, 0, 0.2);
    position: relative;

    &::before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(135deg,
          rgba(255, 255, 255, 0.4) 0%,
          rgba(255, 255, 255, 0.2) 30%,
          transparent 60%,
          rgba(0, 0, 0, 0.1) 100%);
      border-radius: 0 0 12rpx 12rpx;
      z-index: 3;
    }

    &::after {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-image: repeating-linear-gradient(90deg,
          transparent,
          transparent 1rpx,
          rgba(255, 255, 255, 0.1) 1rpx,
          rgba(255, 255, 255, 0.1) 2rpx);
      border-radius: 0 0 12rpx 12rpx;
      opacity: 0.3;
      z-index: 2;
    }

    .brand-label {
      position: absolute;
      top: 10%;
      left: 50%;
      transform: translateX(-50%);
      width: 36rpx;
      /* 修改宽度为文字高度 */
      background: linear-gradient(to bottom, #b40000 0%, #8b0000 100%);
      border-radius: 18rpx;
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 4;
      border: 2rpx solid #8b0000;
      box-shadow: 0 2rpx 6rpx rgba(0, 0, 0, 0.3),
        inset 0 1rpx 2rpx rgba(255, 255, 255, 0.2);

      .brand-text {
        color: #ffd700;
        font-size: 22rpx;
        font-weight: bold;
        font-family: "STKaiti", "KaiTi", "SimKai", serif;
        text-shadow: 2rpx 2rpx 4rpx rgba(0, 0, 0, 0.8);
        letter-spacing: 8rpx;
        /* 增加字间距 */
        writing-mode: vertical-rl;
        /* 垂直排列，从右到左 */
        text-orientation: upright;
        /* 文字保持直立 */
        padding: 10rpx 0;
        /* 上下内边距 */
      }
    }

    .brand-text-eng {
      position: absolute;
      bottom: 6rpx;
      left: 50%;
      transform: translateX(-50%);
      font-size: 10rpx;
      color: #fff8dc;
      font-weight: bold;
      font-family: Arial, sans-serif;
      letter-spacing: 1rpx;
      text-shadow: 2rpx 2rpx 2rpx rgba(0, 0, 0, 0.5);
      z-index: 4;
    }

    .highlight-line {
      position: absolute;
      top: 4rpx;
      left: 50%;
      transform: translateX(-50%);
      width: 80%;
      height: 2rpx;
      background: linear-gradient(to right, transparent, #fff8dc, transparent);
      opacity: 0.6;
      z-index: 2;
    }
  }

  .smoke-particles {
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 300rpx;
    height: 100%;
    pointer-events: none;
    z-index: 999;

    .smoke-particle {
      position: absolute;
      width: 120rpx;
      height: 120rpx;
      background: radial-gradient(circle at center,
          rgba(255, 255, 255, 0.3) 0%,
          rgba(240, 240, 240, 0.2) 40%,
          rgba(200, 200, 200, 0.1) 70%,
          transparent 100%);
      border-radius: 50%;
      filter: blur(12rpx);
      animation: smokeCloudFloat 10s linear forwards;
      opacity: 0.6;
    }
  }

  @keyframes smokeCloudFloat {
    0% {
      transform: scale(0.6) translate(0, 0);
      opacity: 0.4;
    }

    100% {
      transform: scale(1.5) translate(40rpx, -500rpx);
      opacity: 0;
    }
  }

  .controls {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    display: flex;
    flex-direction: column;
    gap: 40rpx;
    z-index: 10;
  }

  .left-controls {
    left: 2%;
  }

  .right-controls {
    right: 2%;
  }

  .control-btn {
    padding: 24rpx 30rpx;
    border: none;
    border-radius: 50rpx;
    font-size: 28rpx;
    font-weight: bold;
    cursor: pointer;
    transition: all 0.3s ease;
    min-width: 180rpx;
    text-align: center;

    &:hover:not(:disabled) {
      transform: translateY(-4rpx);
      box-shadow: 0 10rpx 40rpx rgba(0, 0, 0, 0.3);
    }

    &:disabled {
      background: #666;
      box-shadow: none;
      cursor: not-allowed;
    }

    .btn-text {
      color: inherit;
      font-weight: bold;
    }

    &.light-btn {
      background: linear-gradient(45deg, #fff700, #ffea00);
      color: rgb(143, 12, 12);
      box-shadow: 0 0 30rpx rgba(255, 234, 0, 0.7);
    }

    &.extinguish-btn {
      background: linear-gradient(45deg, #444444, #888888);
      color: white;
      box-shadow: 0 0 30rpx rgba(136, 136, 136, 0.5);
    }

    &.reset-btn {
      background: linear-gradient(45deg, #4e00ff, #00d0ff);
      color: white;
      box-shadow: 0 0 30rpx rgba(0, 208, 255, 0.6);
    }

    &.mode-btn {
      background: linear-gradient(45deg, #00c3ff, #ffff1c);
      color: #222;
      box-shadow: 0 0 30rpx rgba(0, 195, 255, 0.4);
      margin-top: 20rpx;
    }

    &.info-btn {
      background: linear-gradient(45deg, #ffb347, #ffcc33);
      color: #222;
      box-shadow: 0 0 30rpx rgba(255, 195, 0, 0.3);
      margin-top: 20rpx;
    }

    &.want-btn {
      background: linear-gradient(45deg, #ff7eb3, #ff758c);
      color: #fff;
      box-shadow: 0 0 30rpx rgba(255, 117, 140, 0.3);
      margin-top: 20rpx;
    }
  }

  .status {
    text-align: center;
    z-index: 10;
    position: absolute;
    top: 30%;
    right: 1%;
    transform: translateY(-50%);
    border: 2rpx solid #00ffff;
    border-radius: 20rpx;
    padding: 10rpx 20rpx;
    background: rgba(0, 0, 0, 0.7);
    backdrop-filter: blur(10rpx);
    min-width: 200rpx;
    min-height: 120rpx;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .mode-text {
      display: block;
      font-size: 32rpx;
      color: #66ccff;
      margin-bottom: 10rpx;
      text-shadow: 0 0 20rpx #00ffff;
      white-space: nowrap;
    }

    .status-text {
      display: block;
      font-size: 32rpx;
      color: #00ffff;
      margin-bottom: 10rpx;
      text-shadow: 0 0 20rpx #00ffff;
      white-space: nowrap;
    }

    .burn-progress {
      display: block;
      font-size: 24rpx;
      color: #888;
      white-space: nowrap;
    }

    .cloud-status {
      display: block;
      font-size: 24rpx;
      color: #888;
      margin-top: 10rpx;
      white-space: nowrap;

      &.active {
        color: #00ff00;
      }
    }
  }

  .info-popup-content {
    padding: 40rpx 30rpx 30rpx 30rpx;
    background: #fff;
    border-radius: 24rpx;
    min-width: 480rpx;
    max-width: 90vw;
    text-align: center;
  }

  .info-title {
    font-size: 36rpx;
    font-weight: bold;
    color: #333;
    margin-bottom: 40rpx;
  }

  .info-desc {
    font-size: 28rpx;
    color: #555;
    margin-bottom: 32rpx;
    text-align: left;
    line-height: 1.8;
  }

  .info-btns {
    display: flex;
    justify-content: center;
  }

  .info-close-btn {
    background: linear-gradient(45deg, #00c3ff, #ffff1c);
    color: #222;
    border-radius: 16rpx;
    padding: 16rpx 48rpx;
    font-size: 30rpx;
    font-weight: bold;
    box-shadow: 0 0 20rpx rgba(0, 195, 255, 0.2);
    cursor: pointer;
  }
}

.cigarette-popup-content {
  padding: 40rpx 30rpx 30rpx;
  background: #fff;
  border-radius: 24rpx;
  text-align: center;

  .info-title {
    font-size: 36rpx;
    font-weight: bold;
    color: #222;
    margin-bottom: 40rpx;
  }

  .cigarette-form {
    margin-bottom: 32rpx;

    .form-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 24rpx;

      .form-label {
        width: 150rpx;
        font-size: 28rpx;
        color: #333;
        text-align: right;
        margin-right: 16rpx;
      }

      ::v-deep.uni-input-placeholder {
        padding-left: 20rpx;
      }

      ::v-deep.uni-input-input {
        padding-left: 20rpx;
      }

      .form-input {
        flex: 1;
        font-size: 28rpx;
        padding: 12rpx 16rpx;
        padding-left: 16rpx;
        border: 1rpx solid #ddd;
        border-radius: 12rpx;
        background-color: #f9f9f9;
        box-sizing: border-box;
      }

      .form-unit {
        margin-left: 12rpx;
        font-size: 26rpx;
        color: #999;
        white-space: nowrap;
      }
    }
  }

  .info-btns {
    display: flex;
    justify-content: center;
    margin-top: 20rpx;

    .info-close-btn {
      padding: 18rpx 40rpx;
      font-size: 28rpx;
      border-radius: 12rpx;
      background-color: #eee;
      color: #666;
      transition: all 0.3s;

      &:active {
        opacity: 0.7;
      }

      &.confirm {
        background: linear-gradient(45deg, #00ffb4, #00c3ff);
        color: #fff;
        margin-left: 24rpx;
        font-weight: bold;
      }
    }
  }
}

// 模式切换动画样式
.mode-transition-animation {
  position: absolute;
  width: 80%;
  top: 12%;
  left: 50%;
  transform: translateX(-50%);
  padding: 20rpx 40rpx;
  background: rgba(0, 0, 0, 0.7);
  border-radius: 30rpx;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 0 20rpx rgba(0, 0, 0, 0.5);

  .mode-transition-text {

    color: #00ffff;
    font-size: 60rpx;
    font-weight: bold;
    text-shadow: 0 0 10rpx #00ffff;
  }
}

// 淡入动画
.fade-in {
  animation: fadeIn 1s ease-in forwards;
}

// 淡出动画
.fade-out {
  animation: fadeOut 1s ease-out forwards;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateX(-50%) scale(0.8);
  }

  to {
    opacity: 1;
    transform: translateX(-50%) scale(1);
  }
}

@keyframes fadeOut {
  from {
    opacity: 1;
    transform: translateX(-50%) scale(1);
  }

  to {
    opacity: 0;
    transform: translateX(-50%) scale(0.8);
  }
}

@keyframes twinkle {

  0%,
  100% {
    opacity: 0.3;
  }

  50% {
    opacity: 1;
  }
}

@keyframes smokeFloat {
  0% {
    transform: translateY(0) scale(0.6);
    opacity: 0.9;
  }

  100% {
    transform: translateY(-450rpx) scale(2.5);
    opacity: 0.2;
  }
}

@keyframes ashFall {
  0% {
    transform: translateY(0) rotate(0deg);
    opacity: 1;
  }

  100% {
    transform: translateY(200rpx) rotate(360deg);
    opacity: 0;
  }
}

@keyframes sparkle {
  0% {
    opacity: 0.3;
    transform: scale(0.8);
  }

  100% {
    opacity: 1;
    transform: scale(1.2);
  }
}
</style>