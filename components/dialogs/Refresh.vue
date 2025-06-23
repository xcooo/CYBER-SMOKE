<template>
  <!-- 科技风格确认弹窗 -->
  <u-popup v-model="localShow" mode="center">
    <view class="tech-popup">
      <!-- 顶部状态栏 -->
      <view class="popup-header">
        <view class="status-dots">
          <view class="dot red"></view>
          <view class="dot yellow"></view>
          <view class="dot green"></view>
        </view>
        <text class="header-text">系统确认提示</text>
      </view>

      <!-- 弹窗内容 -->
      <view class="popup-content">
        <view class="icon-container">
          <view class="refresh-icon">
            <u-icon name="moments" size="48" color="#06b6d4" class="animate-spin" />
          </view>
        </view>

        <text class="popup-title">系统刷新确认</text>
        <text class="popup-message">你确定要刷新游戏系统吗？</text>

        <!-- 按钮组 -->
        <view class="button-group">
          <u-button type="primary" @click="cancelRefresh" class="cancel-btn">
            取消
          </u-button>

          <u-button type="primary" @click="confirmRefresh" class="confirm-btn">
            确认
          </u-button>
        </view>
      </view>
    </view>
  </u-popup>
</template>

<script>
export default {
  props: {
    show: {
      type: Boolean,
      default: false
    },
  },
  data () {
    return {
      localShow: this.show,
    }
  },
  watch: {
    show (val) {
      this.localShow = val;
    },
    localShow (val) {
      this.$emit('update:show', val)
    }
  },
  methods: {
    // 取消刷新
    cancelRefresh () {
      this.localShow = false;
      this.$emit('cancel');
    },

    // 确认刷新
    confirmRefresh () {
      this.localShow = false;
      this.$emit('refresh');
    }
  },
}
</script>

<style lang='scss' scoped>
::v-deep .u-mode-center-box {
  background: transparent;
}

.tech-popup {
  width: 600rpx;
  border-radius: 24rpx;
  overflow: hidden;
  background: rgba(30, 41, 59, 0.8);
  border: 1rpx solid rgba(94, 234, 212, 0.2);
  box-shadow: 0 0 40rpx rgba(6, 182, 212, 0.3);
  backdrop-filter: blur(12rpx);

  .popup-header {
    height: 50rpx;
    background: linear-gradient(90deg, rgba(6, 182, 212, 0.25), rgba(139, 92, 246, 0.25));
    display: flex;
    align-items: center;
    padding: 0 24rpx;
    border-bottom: 1rpx solid rgba(6, 182, 212, 0.2);

    .status-dots {
      display: flex;
      margin-right: 24rpx;

      .dot {
        width: 14rpx;
        height: 14rpx;
        border-radius: 50%;
        margin-right: 10rpx;
      }

      .red {
        background-color: #ef4444;
      }

      .yellow {
        background-color: #facc15;
      }

      .green {
        background-color: #22c55e;
      }
    }

    .header-text {
      color: #67e8f9;
      font-size: 20rpx;
      letter-spacing: 3rpx;
      text-shadow: 0 0 8rpx rgba(6, 182, 212, 0.8);
    }
  }

  .popup-content {
    padding: 48rpx 32rpx;

    .icon-container {
      display: flex;
      justify-content: center;
      margin-bottom: 40rpx;

      .refresh-icon {
        width: 100rpx;
        height: 100rpx;
        border-radius: 50%;
        background: radial-gradient(circle, rgba(14, 165, 233, 0.2), transparent);
        border: 2rpx solid rgba(6, 182, 212, 0.5);
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 0 20rpx rgba(6, 182, 212, 0.5);
      }
    }

    .popup-title {
      display: block;
      text-align: center;
      color: #ffffff;
      font-size: 36rpx;
      font-weight: 600;
      margin-bottom: 20rpx;
      text-shadow: 0 0 12rpx rgba(6, 182, 212, 0.7);
    }

    .popup-message {
      display: block;
      text-align: center;
      color: #cbd5e1;
      font-size: 28rpx;
      margin-bottom: 50rpx;
    }

    .button-group {
      display: flex;
      justify-content: center;

      .cancel-btn,
      .confirm-btn {
        padding: 10rpx 30rpx;
        border-radius: 12rpx;
        font-size: 26rpx;
        transition: all 0.3s ease;
        flex: 1;
        flex-shrink: 0;
      }

      .cancel-btn {
        background: rgba(239, 68, 68, 0.1);
        border: 1rpx solid rgba(239, 68, 68, 0.4);
        color: #f87171;
        margin-right: 20rpx;

        &:hover {
          background: rgba(239, 68, 68, 0.25);
          transform: scale(1.05);
        }
      }

      .confirm-btn {
        background: linear-gradient(90deg, rgba(14, 165, 233, 0.3), rgba(139, 92, 246, 0.3));
        border: 1rpx solid rgba(6, 182, 212, 0.4);
        color: #67e8f9;
        box-shadow: 0 0 15rpx rgba(6, 182, 212, 0.4);

        &:hover {
          background: linear-gradient(90deg, rgba(14, 165, 233, 0.5), rgba(139, 92, 246, 0.5));
          transform: scale(1.05);
        }
      }
    }
  }
}

.animate-spin {
  animation: spin 3.5s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0);
  }

  100% {
    transform: rotate(360deg);
  }
}
</style>