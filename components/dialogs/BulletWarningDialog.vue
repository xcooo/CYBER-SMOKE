<template>
  <u-popup
    v-model="localShow"
    mode="center"
    border-radius="16"
    :mask-close-able="false"
    :custom-style="{ backgroundColor: 'transparent' }"
    @close="close"
  >
    <view class="hp-warning-wrapper">
      <view class="hp-warning-box">
        <view class="title">子弹不足啦</view>
        <view class="desc">您即将击爆气泡，是否补充弹药并将其击爆？</view>
        <view class="btn-group">
          <button class="btn cancel-btn" @click="close">放弃奖品</button>
          <button class="btn confirm-btn" @click="confirm">补充弹药</button>
        </view>
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
.hp-warning-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
}

.hp-warning-box {
  width: 600rpx;
  background-color: #3b2a2a;
  border-radius: 20rpx;
  padding: 40rpx 30rpx;
  border: 4rpx solid #fbd851;
  box-shadow: 0 6rpx 20rpx rgba(0, 0, 0, 0.5);
}

.title {
  font-size: 34rpx;
  font-weight: bold;
  color: #fbd851;
  text-align: center;
  margin-bottom: 30rpx;
}

.desc {
  font-size: 28rpx;
  color: #ffffff;
  text-align: center;
  line-height: 1.6;
  margin-bottom: 40rpx;
}

.btn-group {
  display: flex;
  justify-content: space-between;
}

.btn {
  flex: 1;
  font-size: 28rpx;
  border-radius: 12rpx;
  padding: 20rpx 0;
  margin: 0 10rpx;
  border: none;
}

.cancel-btn {
  background-color: #b3b3b3;
  color: #fff;
}

.confirm-btn {
  background: linear-gradient(to right, #34e89e, #0f3443);
  color: #fff;
}
</style>
