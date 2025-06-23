<template>
  <u-popup v-model="localShow" mode="center" border-radius="20" :custom-style="{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }"
    width="93%">
    <view class="bullet-recharge-box">
      <view class="bullet-recharge-header">
        <u-icon class="close-icon" name="close" color="#333" size="38" @click="close"></u-icon>
        <view class="bullet-recharge-title">子弹充值</view>
      </view>
      <view class="bullet-recharge-content">
        <view class="bullet-count">
          <text>当前子弹</text>
          <text class="count-num">{{ localCoin }}</text>
        </view>
        <view class="recharge-options">
          <view class="recharge-item" v-for="(item, index) in coinList" :key="index"
            :class="{ active: selectedRecharge.id == item.id }" @click="selectRecharge(item)">
            <view class="recharge-amount">{{ item.coin }}发</view>
            <view class="recharge-price">￥{{ item.rmb }}</view>
            <view class="recharge-tag" v-if="item.tag">{{ item.tag }}</view>
          </view>
        </view>
      </view>
      <view class="payment-method-section">
        <view class="payment-title">选择支付方式</view>
        <view v-if="filteredMoneyTypeList.length === 0" class="no-payment-tip">
          当前系统已关闭支付方式
        </view>
        <view v-else class="payment-methods">
          <view class="payment-item" v-for="item in filteredMoneyTypeList" :key="item.id"
            :class="{ active: selectedPay === item.id }" @click="selectedPay = item.id">
            <image :src="item.icon" mode="widthFix" class="pay-icon" />
            <view>{{ item.name }}</view>
          </view>
        </view>
      </view>
      <view v-if="selectedPay == 2" class="user-balance-info">
        <view class="balance-row">
          <image src="https://img.alicdn.com/imgextra/i1/2200676927379/O1CN01hEqKfV24NdXhvTwFw_!!2200676927379.png"
            class="icon" mode="aspectFit" />
          <text class="balance-text">当前余额：￥{{ userBalance.toFixed(2) }}</text>
        </view>
        <view class="balance-warning" v-if="userBalance <= 0" @click="goWallet">
          * 您的余额不足，点我充值
        </view>
      </view>

      <view class="agreement-checkbox">
        <u-checkbox v-model="agree" shape="square" active-color="#FF6B6B">
          我已满18岁，已阅读并同意
          <text class="link" @click.stop="goToAgreement">《支付协议》</text>
        </u-checkbox>
      </view>
      <view class="bullet-recharge-footer">
        <button class="cancel-btn" @click="close">取消</button>
        <button class="recharge-btn" :class="{
          disabled: filteredMoneyTypeList.length === 0,
          loading: isPaying
        }" :disabled="filteredMoneyTypeList.length === 0 || isPaying" @click="confirmRecharge">
          {{ isPaying ? '支付中...' : '立即充值' }}
        </button>
      </view>
    </view>
  </u-popup>
</template>

<script>
export default {
  name: 'BulletRechargeDialog',
  props: {
    localCoin: {
      type: [String, Number]
    },
    show: {
      type: Boolean,
      default: false
    },
    userInfo: {
      type: Object,
      default: () => ({})
    },
    coinList: {
      type: Array,
      default: () => []
    },
    isPaying: {
      type: Boolean,
      default: false
    },
    // 支付选项
    moneyTypeList: {
      type: Array,
    },
    // 是否开启聚合支付(优先级最高)
    is_epay: {
      type: [String, Number],
      default: 0
    },
    // 是否开启聚合微信支付
    is_wx_epay: {
      type: [String, Number],
      default: 0
    },
    // 是否开启聚合支付宝支付
    is_ali_epay: {
      type: [String, Number],
      default: 0
    },
    // 是否开启支付宝官方支付
    is_ali_pay: {
      type: [String, Number],
      default: 0
    },
    // 是否开启微信官方支付
    is_wx_pay: {
      type: [String, Number],
      default: 0
    },
    // 是否开启余额支付
    is_money_pay: {
      type: [String, Number],
      default: 0
    },
  },
  data () {
    return {
      localShow: this.show,
      selectedPay: '3',
      agree: false, // 是否勾选协议
      selectedRecharge: {
        id: null
      },
    }
  },
  watch: {
    show (val) {
      this.localShow = val
    },
    localShow (val) {
      this.$emit('update:show', val)
      if (!val) {
        // 弹窗关闭时重置表单
        this.resetForm();
      }
    }
  },
  computed: {
    userBalance () {
      return Number(this.userInfo.money || 0)
    },
    filteredMoneyTypeList () {
      const list = [];
      if (this.is_epay == 1) {
        // 聚合微信
        if (this.is_wx_epay == 1) {
          list.push(3);
        }
        // 聚合支付宝
        if (this.is_ali_epay == 1) {
          list.push(4);
        }
      } else {
        // 官方微信
        if (this.is_wx_pay == 1) {
          list.push(3);
        }
        // 官方支付宝
        if (this.is_ali_pay == 1) {
          list.push(4);
        }
      }
      if (this.is_money_pay == 1) {
        // 余额支付
        list.push(2);
      }

      return this.moneyTypeList.filter(item => list.includes(Number(item.id)));
    }
  },
  methods: {
    resetForm () {
      this.selectedPay = '3';
      this.agree = false;
      this.selectedRecharge = { id: null };
    },
    goWallet () {
      uni.navigateTo({
        url: '/package/mine/recharge'
      })
    },
    goToAgreement () {
      uni.navigateTo({
        url: '/pages/mine/agreement?type=pay'
      })
    },
    close () {
      this.localShow = false
    },
    selectRecharge (item) {
      this.selectedRecharge = item
    },
    confirmRecharge () {
      if (this.filteredMoneyTypeList.length === 0) {
        uni.showToast({
          title: '当前系统已关闭支付方式',
          icon: 'none'
        });
        return;
      }
      if (!this.selectedRecharge.id) {
        uni.showToast({
          title: '请选择充值数量',
          icon: 'none'
        })
        return
      }
      if (!this.selectedPay) {
        uni.showToast({
          title: '请选择支付方式',
          icon: 'none'
        })
        return
      }
      if (!this.agree) {
        return uni.showToast({ title: '请先勾选支付协议', icon: 'none' })
      }
      this.$emit('confirmRecharge', {
        ...this.selectedRecharge,
        pay_type: this.selectedPay
      })
    }
  }
}
</script>


<style lang="scss" scoped>
.bullet-recharge-box {
  background: linear-gradient(180deg, #FFFFFF 0%, #F8F8F8 100%);
  border-radius: 30rpx;
  padding: 40rpx;
  position: relative;

  .bullet-recharge-header {
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

    .bullet-recharge-title {
      font-size: 36rpx;
      font-weight: bold;
      color: #333;
      background: linear-gradient(90deg, #FF6B6B 0%, #FF8E8E 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
  }

  .bullet-recharge-content {
    .bullet-count {
      display: flex;
      align-items: center;
      justify-content: center;
      text-align: center;
      font-size: 28rpx;
      margin-bottom: 40rpx;
      background: rgba(0, 0, 0, 0.5);
      border-radius: 20rpx;
      color: #fff;

      .count-num {
        font-size: 48rpx;
        font-weight: bold;
        color: #FF6B6B;
        margin-left: 20rpx;
      }
    }

    .recharge-options {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 20rpx;

      .recharge-item {
        background: #FFFFFF;
        border-radius: 16rpx;
        padding: 20rpx;
        text-align: center;
        position: relative;
        box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.05);
        transition: all 0.3s ease;
        border: 2rpx solid transparent;

        &.active {
          background: #FFF0F0;
          border: 2rpx solid #FF6B6B;
          transform: scale(1.05);
          // box-shadow: 0 6rpx 16rpx rgba(255, 107, 107, 0.3);
        }

        .recharge-amount {
          font-size: 32rpx;
          font-weight: bold;
          color: #333;
          margin-bottom: 10rpx;
        }

        .recharge-price {
          font-size: 28rpx;
          color: #FF6B6B;
          font-weight: bold;
        }

        .recharge-tag {
          position: absolute;
          top: -10rpx;
          right: -10rpx;
          background: #FF6B6B;
          color: #fff;
          font-size: 20rpx;
          padding: 4rpx 12rpx;
          border-radius: 20rpx;
        }
      }
    }
  }

  .no-payment-tip {
    margin-top: 40rpx;
    padding: 20rpx;
    text-align: center;
    font-size: 28rpx;
    font-weight: 700;
    color: #FF6B6B;
    background: #FFF0F0;
    border-radius: 16rpx;
    border: 2rpx solid #FF6B6B;
  }


  .payment-method-section {
    margin-top: 40rpx;

    .payment-title {
      font-size: 28rpx;
      font-weight: bold;
      color: #333;
      margin-bottom: 20rpx;
    }

    .payment-methods {
      display: flex;
      gap: 20rpx;
      justify-content: center;

      .payment-item {
        flex: 1;
        padding: 20rpx 10rpx;
        border-radius: 16rpx;
        background: #fff;
        border: 2rpx solid #eee;
        font-size: 26rpx;
        color: #666;
        display: flex;
        align-items: center;
        justify-content: center;

        &.active {
          border-color: #FF6B6B;
          background: #FFF0F0;
          color: #FF6B6B;
        }

        .pay-icon {
          width: 40rpx;
          height: 40rpx;
          margin-right: 10rpx;
        }
      }

    }
  }

  .user-balance-info {
    margin: 24rpx 0 0;
    padding: 24rpx 32rpx;
    border-radius: 16rpx;
    background: linear-gradient(90deg, #f0f6ff, #e8f1ff);
    box-shadow: 0 4rpx 12rpx rgba(0, 102, 204, 0.1);
    font-size: 26rpx;
    color: #333;
    display: flex;
    flex-direction: column;
    gap: 16rpx;

    .balance-row {
      display: flex;
      align-items: center;
      font-weight: bold;
      font-size: 26rpx;

      .icon {
        width: 36rpx;
        height: 36rpx;
        border-radius: 16rpx;
        margin-right: 12rpx;
      }

      .balance-text {
        color: #2b6fc3;
      }
    }

    .balance-warning {
      color: #f56c6c;
      font-size: 26rpx;
      background-color: #fff0f0;
      padding: 8rpx 16rpx;
      border-radius: 8rpx;
      text-decoration: underline;
    }
  }

  .agreement-checkbox {
    margin-top: 30rpx;
    font-size: 24rpx;
    color: #666;

    .link {
      color: #FF6B6B;
      margin-left: 4rpx;
      text-decoration: underline;
    }
  }

  .bullet-recharge-footer {
    margin-top: 40rpx;
    display: flex;
    justify-content: space-between;
    gap: 20rpx;

    button {
      flex: 1;
      height: 88rpx;
      line-height: 88rpx;
      text-align: center;
      border-radius: 44rpx;
      font-size: 32rpx;
      font-weight: bold;

      &.recharge-btn {
        background: linear-gradient(90deg, #FF6B6B 0%, #FF8E8E 100%);
        color: #fff;
        box-shadow: 0 8rpx 16rpx rgba(255, 107, 107, 0.3);
      }

      &.cancel-btn {
        background: #F5F5F5;
        color: #666;
      }

      &.disabled {
        background: #ccc !important;
        color: #999 !important;
        box-shadow: none;
        cursor: not-allowed;
      }

      &.loading {
        background: linear-gradient(90deg, #4A90E2, #6FB1FC); // 支付中风格，可自定义
        color: #fff;
        box-shadow: 0 8rpx 16rpx rgba(79, 158, 255, 0.3);
        cursor: wait;
      }
    }


  }


}
</style>
