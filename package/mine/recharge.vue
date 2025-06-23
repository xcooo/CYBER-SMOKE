<template>
  <view class="recharge">
    <uni-nav-bar title="充值" color="#333" leftIcon="left" backgroundColor="#fff" :border="false" :statusBar="true"
      :fixed="true" @clickLeft="back()"></uni-nav-bar>
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
            <image src="https://img.alicdn.com/imgextra/i1/2200676927379/O1CN01tXMf6P24NdcmZikNI_!!2200676927379.png"
              mode=""></image>
            <text>{{ item.money }}</text>
          </view>
          <view class="item_bottom">
            ￥{{ item.rmb }}
          </view>
        </view>
      </view>
    </view>
    <view class="pay_type">
      <view v-if="filteredMoneyTypeList.length === 0" class="no-payment-tip">
        当前系统已关闭支付方式
      </view>
      <view v-else>
        <radio-group @change="changeRadio">
          <view class="pay_type_list_item" v-for="(item, index) in filteredMoneyTypeList" :key="index">
            <view class="item_left">
              <view class="icon">
                <image :src="item.icon"></image>
              </view>
              <text>{{ item.name }}</text>
            </view>

            <radio :checked="moneyType === item.id" style="transform:scale(0.9)" color="#6853d6" :value="item.id" />
          </view>
        </radio-group>
        <view class="protocol">
          <u-checkbox-group>
            <u-checkbox v-model="protocol" activeColor="#6853d6" shape="circle" label="明月">我已满18岁，已阅读并同意<text
                @click="goToAgreement" class="link">《支付服务协议》</text></u-checkbox>
          </u-checkbox-group>
        </view>
        <view class="submit" @click="submit()">
          提交充值
        </view>
      </view>
    </view>
    <view class="bottom">
      <view class="b_title">
        温馨提示：
      </view>
      <view class="b_text">
        <text>1、充值的余额可用于泡泡机和在发货时支付运费</text>
        <text>2、充值的余额不会过期，支付后的剩余余额不支持赠送不支持提现</text>
        <text>3、未成年人消费需事先取得家人或法定监护人的陪同及监管下进行消费;</text>
        <text>4、充值前请您仔细阅读《支付服务协议》，成功充值即代表您对本协议无异议。</text>
      </view>

    </view>
    <loginPopup :show.sync="loginVisible"></loginPopup>
    <!-- 支付宝弹窗 -->
    <AliPay :show.sync="aliShow" :orderData="orderData" :isPaying="isPaying" :aliUrl="aliUrl"></AliPay>
  </view>
</template>

<script>
import AliPay from '@/components//dialogs/AliPay.vue'
export default {
  components: {
    AliPay
  },
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
        {
          id: '3',
          icon: 'https://img.alicdn.com/imgextra/i2/2200676927379/O1CN01mfiDjv24NdXdrF5yS_!!2200676927379.png',
          name: '微信支付'
        },
        {
          id: '4',
          icon: 'https://img.alicdn.com/imgextra/i4/2200676927379/O1CN01A3bNW324NdW9QBJvc_!!2200676927379.png',
          name: '支付宝支付',
          type: 'alipay'
        }
      ],
      // #ifdef H5
      checkTimer: null,
      cancelTimer: null,
      // #endif
      is_epay: 0,
      is_wx_epay: 0,
      is_ali_epay: 0,
      is_ali_pay: 0,
      is_wx_pay: 0,
      isPaying: false,
      aliShow: false,
      ali_code: '',
      aliUrl: '',  // 二维码地址
      orderData: {},
      loginVisible: false
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
      const { is_epay, is_wx_epay, is_ali_epay, is_ali_pay, is_wx_pay } = res.data
      this.is_epay = is_epay
      this.is_wx_epay = is_wx_epay
      this.is_ali_epay = is_ali_epay
      this.is_ali_pay = is_ali_pay
      this.is_wx_pay = is_wx_pay
    })
  },
  onHide () {
    this.loginVisible = false
  },
  onUnload () {
    this.cancelCheckPayStatus()
    clearInterval(this.checkTimer)
    clearInterval(this.cancelTimer)
    this.loginVisible = false
  },
  computed: {
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
      return this.moneyTypeList.filter(item => list.includes(Number(item.id)));
    }
  },
  methods: {
    goToAgreement () {
      uni.navigateTo({
        url: '/pages/mine/agreement?type=pay'
      })
    },
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
      // this.$common.toast({
      //   title: '支付超时',
      //   icon: 'none',
      //   duration: 500
      // })
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
      if (!this.userInfo.id) {
        this.loginVisible = true
        return;
      }
      if (this.filteredMoneyTypeList.length === 0) {
        uni.showToast({
          title: '当前系统已关闭支付方式',
          icon: 'none'
        });
        return;
      }
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
      this.isPaying = true;
      this.req({
        url: '/v1/user/recharge/gopay',
        data: {
          id,
          pay_type: this.moneyType,
          // jump_url: `https://${location.host}/h5/index.html#/mine/recharge`
        },
        success: res => {
          console.log(res);
          // if (res.msg == '充值成功!') {
          //   this.$common.toast({
          //     title: '充值成功',
          //     duration: 500
          //   })
          //   this.$store.dispatch('getUserInfo').then(res => {
          //     console.log(res);
          //     this.userInfo = res.data
          //   })
          //   return
          // }
          this.orderData = res.data
          // #ifdef H5
          const order_info = { order_sn: res.data.order_sn }

          uni.setStorageSync('order_info_recharge', order_info);

          this.checkPayStatus()

          // #endif

          const params = { ...res.data, is_epay: this.is_epay, returnUrl: `/package/mine/recharge` }
          this.$common.orderPay(params).then(res1 => {
            if (res1 == 'success') {

            }
            if (res1.data.pay_type == 'alipay') {
              this.aliShow = true

              let ali_code = res1.data.data.qr_code
              // #ifdef H5
              this.generateQRCode(ali_code)
              // #endif
              // #ifdef MP
              this.generateWXCode(ali_code)
              // #endif
            }
          })
        },
        fail: () => {
          this.$common.toast({ title: '下单失败', icon: 'none' });
        },
        complete: () => {
          this.isPaying = false
        }
      })
    },
    generateWXCode (text) {
      UQrcode.make({
        canvasId: 'wxcode',   //切记canvasId 里边的内容需要跟canvas里边canvas-id=wxcode"的名字一样
        componentInstance: this,
        text: text,  //需要转成二维码的内容
        size: 350,
        margin: 0,
        backgroundColor: '#ffffff',
        foregroundColor: '#000000',
        fileType: 'jpg',
        errorCorrectLevel: UQrcode.errorCorrectLevel.H,
        success: res => { }
      })
    },
    generateQRCode (url) {
      this.aliUrl = url;
      // 确保组件渲染完成后再生成二维码
      // this.$nextTick(() => {
      //   try {
      //     this.$refs.qrcode.remake({
      //       success: () => {
      //         console.log('二维码生成成功');
      //       },
      //       fail: (err) => {
      //         console.error('二维码生成失败', err);
      //       }
      //     });
      //   } catch (error) {
      //     console.error('二维码生成异常', error);
      //   }
      // });
    },
    back () {
      uni.switchTab({
        url: '/pages/tabBar/my',
      });

    }
  }
}
</script>

<style lang="scss" scoped>
.recharge {

  .top_money {
    padding: 20rpx;
    font-size: 32rpx;

    image {
      vertical-align: bottom;
    }

    text {
      font-size: 30rpx;
      padding-left: 6rpx;
    }
  }

  .center_body {
    margin-top: 0rpx;
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
        background: #ff9d00 !important;
        color: #fff;
      }

      .money_item {
        width: calc(33.33% - 20rpx);
        // height: 120rpx;
        padding: 25rpx 0;
        background: #f0f0f0;
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
      background: #ff9d00;
      font-size: 32rpx;
      color: #fff;
      margin: 0rpx auto;
      margin-top: 20rpx;
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
          width: 50rpx !important;
          height: 50rpx;
          vertical-align: bottom;
        }

        text {
          font-size: 32rpx;
          margin-left: 10rpx;
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
      margin-top: 20rpx;
      color: #666;
      font-size: 26rpx;
      display: flex;
      flex-direction: column;
    }


  }
}

.protocol {
  margin: 40rpx 0;
  text-align: center;
  display: flex;
  justify-content: center;
  // text{
  // 	margin-left: -30rpx;
  // }
}

.alipay {
  height: 100%;
  position: relative;
  padding-top: 80rpx;

  .alipay-tutorial {
    padding-top: 30rpx;
    padding-right: 20rpx;
    color: #4197ef;
    font-size: 18px;
    text-align: right;
    display: inline-block;
    position: absolute;
    right: 20rpx;
    top: 0;
  }

  .alipay-title {
    text-align: center;
    font-size: 20px;
    margin-bottom: 10rpx;
    margin-top: 20rpx;
  }

  .alipay-price {
    font-size: 20px;
    margin-bottom: 40rpx;

    .alipay-price-text {
      font-size: 28px;
    }
  }

  .ali-item {
    font-size: 16px;
    display: flex;
    justify-content: space-between;
    padding: 0 20rpx;
  }

  .ali-qrcode {
    margin-top: 40rpx;
    display: flex;
    justify-content: center;

    .ali-qrcode-img {
      width: 350px;
      height: 350px;
    }
  }

  .ali-tip {
    text-align: center;
    color: #999;
    margin: 20rpx 0;
    margin-bottom: 30rpx;
  }

  .btn-wrap {
    display: flex;
    justify-content: center;

    .btn {
      width: 90%;
      font-size: 16px;
      font-weight: 700;
      background: #3f95ee;
      color: #fff;
      padding: 20rpx 0;
      text-align: center;
      border-radius: 40rpx;
    }
  }

  .ali-tip-2 {
    text-align: center;
    color: #999;
    margin-top: 10rpx;
  }
}

.link {
  color: #FF6B6B;
  margin-left: 4rpx;
  text-decoration: underline;
}

.no-payment-tip {
  padding: 40rpx 20rpx;
  text-align: center;
  color: #FF6B6B;
  font-weight: 700;
  font-size: 28rpx;
  background-color: #f0f0f0;
  border-radius: 16rpx;
  margin: 30rpx 20rpx;
  box-shadow: 0 4rpx 8rpx rgba(0, 0, 0, 0.05);
}
</style>