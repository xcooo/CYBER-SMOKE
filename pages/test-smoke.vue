<template>
  <view class="test-container">
    <view class="test-title">烟雾效果测试</view>

    <view class="smoke-test-area">
      <SmokeCanvas :isActive="isSmokeActive"
                   :intensity="smokeIntensity"
                   @ready="onSmokeCanvasReady" />

      <view class="fake-cigarette">
        <view class="cigarette-body"></view>
        <view class="cigarette-filter"></view>
      </view>
    </view>

    <view class="controls">
      <button @click="toggleSmoke"
              class="control-btn">
        {{ isSmokeActive ? '停止烟雾' : '开始烟雾' }}
      </button>
      <button @click="changeIntensity"
              class="control-btn">
        烟雾强度: {{ Math.round(smokeIntensity * 100) }}%
      </button>
    </view>

    <view class="debug-info">
      <text>烟雾状态: {{ isSmokeActive ? '开启' : '关闭' }}</text>
      <text>强度: {{ Math.round(smokeIntensity * 100) }}%</text>
      <text>Canvas状态: {{ canvasReady ? '就绪' : '初始化中' }}</text>
    </view>
  </view>
</template>

<script>
import SmokeCanvas from '@/components/SmokeCanvas.vue'

export default {
  components: {
    SmokeCanvas
  },
  data () {
    return {
      isSmokeActive: false,
      smokeIntensity: 0.8,
      canvasReady: false
    }
  },
  mounted () {
    setTimeout(() => {
      this.isSmokeActive = true
    }, 1000)
  },
  methods: {
    toggleSmoke () {
      this.isSmokeActive = !this.isSmokeActive
    },
    changeIntensity () {
      const levels = [0.3, 0.5, 0.8, 1.0]
      const index = levels.findIndex(i => Math.abs(i - this.smokeIntensity) < 0.05)
      this.smokeIntensity = levels[(index + 1) % levels.length]
    },
    onSmokeCanvasReady () {
      this.canvasReady = true
    }
  }
}
</script>

<style lang="scss" scoped>
.test-container {
  width: 100vw;
  height: 100vh;
  background: linear-gradient(135deg, #0a0a0a, #1a1a2e, #16213e);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.test-title {
  font-size: 48rpx;
  color: #00ffff;
  margin-bottom: 60rpx;
  text-shadow: 0 0 20rpx #00ffff;
}

.smoke-test-area {
  position: relative;
  width: 300px;
  height: 400px;
  margin-bottom: 60rpx;
  background: rgba(0, 0, 0, 0.05);
}

.fake-cigarette {
  position: absolute;
  left: 50%;
  bottom: 0;
  transform: translateX(-50%);
  z-index: 10;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.cigarette-body {
  width: 20px;
  height: 120px;
  background: linear-gradient(to bottom, #ffffff, #f0f0f0);
  border-radius: 10px 10px 0 0;
  border: 1px solid #ccc;
}

.cigarette-filter {
  width: 20px;
  height: 40px;
  background: linear-gradient(to bottom, #e6c35c, #b8860b);
  border-radius: 0 0 10px 10px;
  border: 1px solid #9a6b1f;
}

.controls {
  display: flex;
  gap: 30rpx;
  margin-bottom: 20rpx;
}

.control-btn {
  padding: 20rpx 40rpx;
  background: linear-gradient(45deg, #00c3ff, #ffff1c);
  border-radius: 50rpx;
  color: #222;
  font-weight: bold;
}

.debug-info {
  margin-top: 20rpx;
  text {
    color: #00ffff;
    font-size: 24rpx;
    display: block;
    margin-bottom: 10rpx;
  }
}
</style>
