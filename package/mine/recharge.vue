<template>
  <view class="recharge">
    <u-navbar title="充值" back-icon-color="#fff" title-color="#fff"
      :background="{ backgroundColor: '#222333' }"></u-navbar>
    <view class="top_money">
      账户余额：<image style="width: 40rpx;height: 40rpx;" mode=""></image>
      <text>{{ userInfo.money }}</text>
    </view>
    <view class="center_body">
      <view class="money_list">
        <view @click="moneySelect(moneyList[index].rmb)"
          :class="MonetType == item.id ? 'money_item item_active' : 'money_item'" v-for="(item, index) in moneyList"
          :key="index">
          <view class="item_top">
            <image src="../../static/mine/coin.png" mode=""></image>
            <text>{{ item.money }}</text>
          </view>
          <view class="item_bottom">
            ￥{{ item.rmb }}
          </view>
        </view>
      </view>
    </view>
    <view class="pay_type">
      <radio-group @change="changeRadio">
        <view class="pay_type_list_item" v-for="(item, index) in moneyTypeList" :key="index">
          <view class="item_left">
            <view class="icon">
              <image :src="item.icon"></image>
            </view>
            <text>{{ item.name }}</text>
          </view>

          <radio :checked="moneyType === item.id" style="transform:scale(0.9)" color="#6853d6" :value="item.id" />
        </view>
      </radio-group>
      <view class="submit" @click="submit()">
        提交充值
      </view>
    </view>
    <view class="bottom">
      <view class="b_title">
        温馨提示：
      </view>
      <view class="b_text">
        <text>1、充值的余额可用于开盲盒和在发货时支付运费</text>
        <text>2、充值的余额不会过期，支付后的剩余余额不支持赠送不支持提现</text>
        <text>3、未成年人消费需事先取得家人或法定监护人的陪同及监管下进行消费;</text>
        <text>4、充值前请您仔细阅读《支付服务协议》，成功充值即代表您对本协议无异议。</text>
      </view>
      <view class="protocol">
        <u-checkbox-group>
          <u-checkbox v-model="protocol" activeColor="#6853d6" shape="circle" label="明月">我已满18岁，已阅读并同意<text
              @click.stop="$.to('/pages/my/agreement?type=wfashuiming')">《支付服务协议》</text></u-checkbox>
        </u-checkbox-group>

      </view>
    </view>

  </view>
</template>

<script>
export default {
  data () {
    return {
      MonetType: '',
      noClick: true,
      userInfo: {
        money: '0.00',
      },
      protocol: false,
      // 充值金额
      money: '',
      // 哪种支付方式
      moneyType: '3',
      // 可选金额
      moneyList: [
      ],
      // 支付方式
      moneyTypeList: [
        // #ifdef H5 || MP
        {
          id: '3',
          icon: '../../static/mine/wechat.png',
          name: '微信支付'
        },
        // #endif
        // #ifdef APP-PLUS || H5
        // {
        //   id: '4',
        //   icon: 'https://img.alicdn.com/imgextra/i4/2200676927379/O1CN01A3bNW324NdW9QBJvc_!!2200676927379.png',
        //   name: '支付宝支付',
        //   type: 'alipay'
        // }
        // #endif
        // #ifndef MP-WEIXIN
        // {icon:'../../../static/image/zhifubao.png',name:'支付宝支付',id:'1',type:'alipay'},
        // #endif
      ],
      // #ifdef H5
      checkTimer: null,
      cancelTimer: null,
      // #endif
      is_epay: 0
    }
  },
  onLoad () {
    this.getRechargeList()

    // #ifdef H5
    let order_info = uni.getStorageSync('order_info_recharge')
    if (order_info) {
      this.checkPayStatus()
    }
    // #endif
  },
  onShow () {
    this.$store.dispatch('getUserInfo').then(res => {
      console.log(res);
      this.userInfo = res.data
    })
    this.$store.dispatch('getAppConfig').then((res) => {
      console.log(res);
      this.is_epay = res.data.is_epay
    })
  },
  onUnload () {
    this.cancelCheckPayStatus()
    clearInterval(this.checkTimer)
    clearInterval(this.cancelTimer)
  },
  methods: {
    checkPayStatus () {
      const _this = this
      const order_info = uni.getStorageSync('order_info_recharge')

      _this.checkTimer = setInterval(() => {
        if (!order_info) {
          _this.cancelCheckPayStatus()
          return
        }

        // 查询订单
        this.req({
          url: '/v1/pay/rechargePayStatus',
          data: {
            order_sn: order_info.order_sn
          },
          Loading: true,
          success: (res) => {
            console.log(res.data, '支付结果查询')
            switch (res.code) {
              case 200:
                _this.cancelCheckPayStatus()
                this.$store.dispatch('getUserInfo').then(res => { this.userInfo = res.data })
                this.$common.toast({ title: '充值成功', icon: 'success', duration: 1500 })
                break;
              case 203:
                _this.cancelCheckPayStatus()
                this.$common.toast({ title: '支付失败', icon: 'none', duration: 500 })
                break;
            }
          }
        })
      }, 2 * 1000)

      _this.cancelTimer = setTimeout(() => {
        _this.cancelCheckPayStatus();
      }, 60 * 1000)
    },
    cancelCheckPayStatus () {
      uni.removeStorageSync('order_info_recharge')
      this.$common.toast({
        title: '支付超时',
        icon: 'none',
        duration: 500
      })
      if (this.checkTimer) {
        clearTimeout(this.checkTimer)
      }

      if (this.cancelTimer) {
        clearInterval(this.cancelTimer)
      }
    },
    getRechargeList () {
      this.req({
        url: '/v1/user/recharge',
        success: res => {
          console.log(res);
          if (res.code == 200) {
            this.moneyList = res.data.data
          }
        }
      })
    },
    moneySelect (val) {
      this.moneyList.forEach(item => {
        if (Number(item.rmb) == val) {
          this.MonetType = item.id
          this.money = item.rmb
        }
      })
    },
    inputValue (e) {
      this.money = e.detail.value
      this.moneySelect(this.money)
    },
    changeRadio (e) {
      this.moneyType = e.detail.value
    },
    getPage () {
      console.log(222);
    },
    submit () {
      if (!this.protocol) {
        this.$common.toast({
          title: '请阅读并同意支付服务协议'
        })
        return
      }
      if (!this.money || this.money < 0) {
        this.$common.toast({
          title: '请选择正确金额'
        })
        return
      }

      if (!this.moneyType) {
        this.$common.toast({
          title: '请选择正确的支付方式'
        })
        return
      }
      let id = 0
      this.moneyList.forEach(item => {
        if (item.rmb === this.money) {
          id = item.id
        }
      })
      this.req({
        url: '/v1/user/recharge/gopay',
        data: {
          id,
          pay_type: this.moneyType,
          // jump_url: `https://${location.host}/h5/index.html#/mine/recharge`
        },
        success: res => {
          console.log(res);
          if (res.msg == '充值成功!') {
            this.$common.toast({
              title: '充值成功',
              duration: 500
            })
            this.$store.dispatch('getUserInfo').then(res => {
              console.log(res);
              this.userInfo = res.data
            })
            return
          }

          // #ifdef H5
          const order_info = { order_sn: res.data.order_sn }

          uni.setStorageSync('order_info_recharge', order_info);

          this.checkPayStatus()

          // #endif

          const params = { ...res.data, is_epay: this.is_epay, returnUrl: `/package/mine/recharge` }
          this.$common.orderPay(params).then(res1 => {
            if (res1 == 'success') {

            }
          })
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.recharge {
  // background: url("https://img.alicdn.com/imgextra/i4/2200676927379/O1CN01unkdtT24NdWplMdw8_!!2200676927379.png") no-repeat;
  // background-size: 100% 100%;
  background-color: #222333;
  min-height: calc(100vh - 50px);

  .top_money {
    padding: 20rpx;
    font-size: 32rpx;
    color: #fff;

    image {
      vertical-align: bottom;
    }

    text {
      font-size: 30rpx;
      padding-left: 6rpx;
    }
  }

  .center_body {
    margin-top: 40rpx;
    padding: 20rpx;
    border-top: 1px solid #eeeeee;
    border-bottom: 1px solid #eeeeee;

    .money_list {
      padding-top: 20rpx;
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      justify-content: flex-start;

      .item_active {
        background: #354fc8 !important;
        color: #fff;
        border: 1px solid #fff !important;
      }

      .money_item {
        width: calc(33.33% - 20rpx);
        // height: 120rpx;
        padding: 25rpx 0;
        background: #354fc8;
        border: 1px solid transparent;
        color: #fff;
        margin: 0 10rpx;
        margin-bottom: 40rpx;
        border-radius: 10rpx;
        display: flex;
        flex-direction: column;
        text-align: center;

        .item_top {

          text {
            font-weight: bold;
            padding-left: 6rpx;
          }

          image {
            width: 40rpx;
            height: 40rpx;
            vertical-align: bottom;
            margin-right: 10rpx;
          }
        }

        .item_bottom {
          margin-top: 8rpx;
        }
      }
    }

    .zdy_money {
      display: flex;
      align-items: center;
      margin-top: 40rpx;

      text {
        font-size: 32rpx;
        font-weight: bold;
      }

      input {
        margin-left: 20rpx;
        font-size: 30rpx;
        flex: 1;
      }
    }
  }

  .pay_type {
    .submit {
      width: 90%;
      padding: 20rpx 0;
      text-align: center;
      border-radius: 10rpx;
      background: #9948d3;
      font-size: 32rpx;
      color: #fff;
      margin: 0rpx auto;
      margin-top: 60rpx;
      background: url("../../static/mine/btn-bg.png") no-repeat;
      background-size: 100% 100%;
    }

    .pay_type_list_item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin: 30rpx 20rpx;

      .item_left {
        display: flex;
        height: 55rpx;

        .icon {
          width: 55rpx !important;
          height: 55rpx;
          vertical-align: bottom;
        }

        text {
          font-size: 32rpx;
          margin-left: 10rpx;
          color: #fff;
        }
      }

      radio {
        // width: 20rpx;
        // height: 20rpx;
      }
    }
  }

  .bottom {

    padding: 20rpx;

    .b_title {
      font-size: 32rpx;
      font-weight: bold;
      color: #747474;
    }

    .b_text {
      color: #9c9c9c;
      font-size: 24rpx;
      display: flex;
      flex-direction: column;
    }

    .protocol {
      margin-top: 40rpx;
      text-align: center;
      display: flex;
      justify-content: center;
      color: #fff;

      ::v-deep .u-checkbox__label {
        color: #fff;
      }

      text {
        margin-left: 10rpx;
        color: #6d84ec;
      }
    }
  }
}
</style>