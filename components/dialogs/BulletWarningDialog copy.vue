<template>
  <u-popup v-model="localShow" mode="center" border-radius="20" :custom-style="{ backgroundColor: 'rgba(0, 0, 0, 0.7)' }"
    @close="close"  :mask-close-able="false">
    <view class="bullet-recharge-box">
      <view class="bullet-recharge-header">
        <u-icon class="close-icon" name="close" color="#333" size="38" @click="close"></u-icon>
        <view class="bullet-recharge-title">子弹不足了</view>
      </view>

      <view class="bullet-recharge-content">
        <view class="warning-content">
          您即将击爆气泡，是否补充弹药并将其击爆?
        </view>
      </view>

      <view class="bullet-recharge-footer">
        <button class="cancel-btn" @click="close">放弃奖品</button>
        <button class="recharge-btn" @click="confirm">补充弹药</button>
      </view>
    </view>
  </u-popup>
</template>

<script>
export default {
  name: 'HpWarningDialog',
  props: {
    show: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      localShow: this.show
    }
  },
  watch: {
    show (val) {
      this.localShow = val
    },
    localShow (val) {
      this.$emit('update:show', val)
    }
  },
  methods: {
    close () {
      this.localShow = false
    },
    confirm () {
      this.$emit('confirm')
      this.localShow = false
    }
  }
}
</script>

<style scoped>
.bullet-recharge-box {
  background-color: #fff;
  border-radius: 20rpx;
  width: 600rpx;
  overflow: hidden;
}

.bullet-recharge-header {
  position: relative;
  padding: 30rpx;
  text-align: center;
}

.close-icon {
  position: absolute;
  right:30rpx;
  top: 30rpx;
}

.bullet-recharge-title {
  font-size: 36rpx;
  font-weight: bold;
  color: #333;
}

.bullet-recharge-content {
  padding: 40rpx 30rpx;
}

.warning-content {
  font-size: 30rpx;
  color: #333;
  text-align: center;
  line-height: 1.5;
}

.bullet-recharge-footer {
  display: flex;
  justify-content: space-between;
  padding: 0 20rpx 20rpx;
}

.cancel-btn,
.recharge-btn {
  flex: 1;
  margin: 0 10rpx;
  padding: 10rpx 0;
  font-size: 24rpx;
  border-radius: 12rpx;
  border: none;
}

.cancel-btn {
  background-color: #eee;
  color: #333;
}

.recharge-btn {
  background-color: #f56c6c;
  color: #fff;
}
</style>
