<template>
  <view v-if="localShow" class="alert-wrapper">

    <view class="alert-box">
      <image
        src="https://img.alicdn.com/imgextra/i4/2200676927379/O1CN01iyOvoy24Ndd5wCCe7_!!2200676927379.png"
        class="icon"
        mode="widthFix"
      />
      <text class="text">注意：有气泡即将被击破</text>
    </view>
  </view>
</template>

<script>
export default {
  name: 'HpTopAlert',
  props: {
    show: {
      type: Boolean,
      default: false
    },
    duration: {
      type: Number,
      default: 3000
    }
  },
  data () {
    return {
      localShow: this.show,
      timer: null
    }
  },
  watch: {
    show (val) {
      this.localShow = val
    },
    localShow (val) {
      this.$emit('update:show', val)
      if (val) {
        this.startTimer()
      } else {
        this.clearTimer()
      }
    }
  },
  methods: {
    startTimer () {
      this.clearTimer()
      this.timer = setTimeout(() => {
        this.localShow = false
      }, this.duration)
    },
    clearTimer () {
      if (this.timer) {
        clearTimeout(this.timer)
        this.timer = null
      }
    }
  },
  beforeDestroy () {
    this.clearTimer()
  }
}
</script>

<style lang="scss" scoped>
.alert-wrapper {
  position: fixed;
  top: 12%;
  left: 50%;
  z-index: 9999;
  pointer-events: none;
}

.alert-box {
  position: relative;
  background-color: rgba(0, 0, 0, 0.85);
  border-radius: 24rpx;
  padding: 12rpx 24rpx;
  display: flex;
  align-items: center;
  white-space: nowrap;
  border: 2rpx solid #ff0000;
  animation: shakeScale 1.5s ease-in-out infinite;
  z-index: 2;
}

/* 缩小红光外扩 */
.alert-box::before {
  content: "";
  position: absolute;
  top: -15rpx;
  bottom: -15rpx;
  left: -15rpx;
  right: -15rpx;
  border-radius: 36rpx;
  background: transparent;
  z-index: -2;
  animation: pulseGlow 1.5s ease-in-out infinite;
}

@keyframes pulseGlow {
  0%, 100% {
    box-shadow:
      0 0 8rpx rgba(255, 0, 0, 0.6),
      0 0 16rpx rgba(255, 0, 0, 0.4),
      0 0 24rpx rgba(255, 0, 0, 0.2);
  }
  50% {
    box-shadow:
      0 0 16rpx rgba(255, 0, 0, 1),
      0 0 32rpx rgba(255, 0, 0, 0.8),
      0 0 40rpx rgba(255, 0, 0, 0.6);
  }
}

/* 缩小环形放大动画 */
.alert-box::after {
  content: "";
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  border-radius: 28rpx;
  z-index: -1;
  animation: ringPulse 2s ease-in-out infinite;
}

@keyframes ringPulse {
  0% {
    box-shadow: 0 0 0 0 rgba(255, 0, 0, 0.4);
  }
  70% {
    box-shadow: 0 0 0 12rpx rgba(255, 0, 0, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(255, 0, 0, 0);
  }
}

/* 微缩放震动 */
@keyframes shakeScale {
  0%, 100% {
    transform: translate(-50%, -50%) scale(1);
  }
  50% {
    transform: translate(-50%, -50%) scale(1.05);
  }
}

/* 图标发光 */
.icon {
  width: 36rpx;
  height: 36rpx;
  margin-right: 12rpx;
  flex-shrink: 0;
  animation: iconFlash 1.5s ease-in-out infinite;
}

@keyframes iconFlash {
  0%, 100% {
    filter: drop-shadow(0 0 6rpx rgba(255, 0, 0, 0.8));
  }
  50% {
    filter: drop-shadow(0 0 16rpx rgba(255, 0, 0, 1));
  }
}

/* 文字闪烁 */
.text {
  font-size: 28rpx;
  color: #ff0000;
  white-space: nowrap;
  animation: textFlash 1.2s ease-in-out infinite;
}

@keyframes textFlash {
  0%, 100% {
    text-shadow: 0 0 4rpx rgba(255, 0, 0, 0.8);
  }
  50% {
    text-shadow: 0 0 12rpx rgba(255, 0, 0, 1);
  }
}
</style>
