<template>
  <u-popup
    v-model="localShow"
    mode="center"
    border-radius="20"
    :custom-style="{ backgroundColor: 'rgba(0, 0, 0, 0.7)' }"
  >
    <view class="rules-box">
      <view class="rules-header">
        <u-icon
          class="close-icon"
          name="close"
          color="#333"
          size="38"
          @click="close"
        />
        <view class="rules-title">充值须知</view>
      </view>
      <view class="pay-rules-content">
        <view class="pay-rule-item">1. 充值金额不可退款，请谨慎操作</view>
        <view class="pay-rule-item">2. 充值成功后，子弹将立即到账</view>
        <view class="pay-rule-item">3. 如遇充值问题，请联系客服处理</view>
        <view class="pay-rule-item">4. 本游戏禁止未成年人充值</view>
        <view class="pay-rule-item">5. 最终解释权归平台所有</view>
      </view>
    </view>
  </u-popup>
</template>

<script>
export default {
  name: 'RechargeRulesDialog',
  props: {
    show: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      localShow: this.show
    }
  },
  watch: {
    show(val) {
      this.localShow = val
    },
    localShow(val) {
      this.$emit('update:show', val)
    }
  },
  methods: {
    close() {
      this.localShow = false
    }
  }
}
</script>

<style lang="scss" scoped>
.rules-box,
.prizes-box,
.weapon-box {
  width: 650rpx;
  background: linear-gradient(180deg, #FFFFFF 0%, #F8F8F8 100%);
  border-radius: 30rpx;
  padding: 40rpx;

  .rules-header,
  .prizes-header,
  .weapon-header {
    position: relative;
    text-align: center;
    margin-bottom: 40rpx;

    .close-icon {
      position: absolute;
      right: 0;
      top: 50%;
      transform: translateY(-50%);
      width: 40rpx;
      height: 40rpx;
    }

    .rules-title,
    .prizes-title,
    .weapon-title {
      font-size: 36rpx;
      font-weight: bold;
      color: #333;
      background: linear-gradient(90deg, #FF6B6B 0%, #FF8E8E 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
  }
}
.pay-rules-content {
  .pay-rule-item {
    font-size: 28rpx;
    color: #666;
    line-height: 1.8;
    margin-bottom: 20rpx;
    padding-left: 20rpx;
    position: relative;

    &::before {
      content: '';
      position: absolute;
      left: 0;
      top: 50%;
      transform: translateY(-50%);
      width: 8rpx;
      height: 8rpx;
      background: #FF6B6B;
      border-radius: 50%;
    }
  }
}
</style>
