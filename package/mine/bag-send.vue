<!--
 * @Date: 2022-12-06 10:53:50
 * @LastEditTime: 2025-06-21 15:30:52
 * @Description: content
-->
<template>
  <view class="page-wrap">
    <uni-nav-bar title="支付订单" color="#fff" leftIcon="left" backgroundColor="#222333" :border="false" :statusBar="true"
      :fixed="true" @clickLeft="$common.back()"></uni-nav-bar>

    <view @click="toChooseAddress" class="address-card">
      <template v-if="addressData">
        <view class="address-card-hd">收货信息</view>

        <view class="address-card-bd">
          <view class="name hang1">{{ addressData.name }}</view>

          <view class="phone">{{ addressData.mobile }}</view>
        </view>

        <view class="address-card-ft">
          {{ addressData.address }}
        </view>
      </template>

      <view v-else class="no-address">
        <view class="icon">
          <cimage src="/static/icon/address1.png" mode="scaleToFill" />
        </view>

        <view class="msg">添加收件人信息</view>
      </view>
    </view>

    <template v-if="orderData">
      <view class="goods-card">
        <view class="goods-card-hd" v-for="(item, index) in orderData.data" :key="index">
          <view class="pic">
            <cimage :src="item.thumb" mode="scaleToFill" />
          </view>

          <view class="info">
            <view class="title hang3">
              {{ item.title }}
            </view>

            <view class="type">{{ item.sku_name }}</view>

            <view class="price-num">
              <view class="price">¥{{ item.price }}</view>

              <view class="num">×{{ item.num }}</view>
            </view>
          </view>
        </view>

        <!-- <view class="goods-card-bd">
          <view class="total">
            共{{ orderData.data.num }}件,合计:
            <text>¥{{ orderData.discount.total_money }}</text>
          </view>
        </view> -->
      </view>

      <view class="note-card">
        <view class="note-card-hd">订单备注</view>

        <view class="note-card-bd">
          <textarea auto-height v-model="note" :maxlength="noteMax" placeholder="选填,可给商家留言" />

          <view class="note-num">{{ note.length }}/{{ noteMax }}</view>
        </view>
      </view>

      <view class="info-card">
        <!-- <view class="row">
          <view class="title">订单金额</view>

          <view class="right">
            <view class="bold">¥{{ orderData.discount.total_money }}</view>
          </view>
        </view> -->

        <view class="row">
          <view class="title">物流运费</view>

          <view class="right">
            <view>
              {{
                orderData.express.express_money * 1 > 0
                ? `¥${orderData.express.express_money}`
                : '免运费'
              }}
            </view>
          </view>
        </view>

        <view v-if="orderData.express.express_money * 1 > 0" @click="getRule" class="rule-btn">
          共{{ orderData.data.num }}个包裹,需支付{{
            orderData.express.express_money
          }}元邮费

          <uni-icons :style="{
                fontWeight: 'normal'
              }" type="right" color="#999999" size="12" />
        </view>

        <view class="row">
          <template v-if="orderData.discount.is_shipnum">
            <view class="title">包邮卡抵扣</view>
          </template>
          <template v-else>
            <view class="title">余额抵扣</view>
          </template>

          <view class="right" :class="{
            gray: false
          }">
            <view>
              {{
                orderData.discount.money_dis * 1 > 0
                ? `-${orderData.discount.money_dis}`
                : '暂无可用'
              }}
            </view>
          </view>
        </view>

        <view class="row">
          <view class="title">发货预估</view>

          <view class="right">
            <view>1-15日发货</view>
          </view>
        </view>

        <view class="row">
          <view class="title">支付方式</view>

          <view class="right">
            <view>微信支付</view>
          </view>
        </view>
      </view>

      <view class="bt-fixed">
        <view class="total-money">
          合计支付:

          <text>
            ¥

            <text>{{ orderData.discount.pay_money }}</text>
          </text>
        </view>

        <view @click="$common.noDouble(confirmSubmit, 1)" class="buy-btn">
          确认支付
        </view>
      </view>
    </template>

    <uni-popup ref="rulePop" type="center">
      <view v-if="ruleData" class="rule-pop">
        <view class="rule-pop-hd">{{ ruleData.title }}</view>

        <scroll-view scroll-y class="rule-pop-bd">
          <view v-html="ruleData.editor" class="content"></view>
        </scroll-view>

        <view @click="closeRulePop" class="rule-pop-ft">我知道了</view>
      </view>
    </uni-popup>
  </view>
</template>

<script>
export default {
  data () {
    return {
      optionsData: '',
      note: '',
      noteMax: 140,
      orderData: '',
      addressData: '',
      ruleData: '',
      checkTimer: null,
      cancelTimer: null
    }
  },

  async onLoad (options) {
    uni.$on('chooseAdd', data => {
      this.addressData = data.data
      this.confirmSubmit(0)
      // console.log(this.addressData)
    })
    this.optionsData = options

    await this.getDefAdd()

    this.confirmSubmit(0)

    // #ifdef H5
    let order_info = uni.getStorageSync('order_info_ship')
    // let order_info = {provider: 'alipay', order_sn: 'C916652564524855'}
    console.log(order_info, '这里是打印的订单信息')
    if (order_info) {
      this.checkPayStatus()
    }
    // #endif
  },

  onUnload () {
    uni.$off('chooseAdd')
    clearInterval(this.checkTimer)
    clearInterval(this.cancelTimer)
    this.cancelOrderPay()
    this.cancelCheckPayStatus()
  },
  methods: {
    checkPayStatus () {
      const _this = this

      const order_info = uni.getStorageSync('order_info_ship')

      _this.checkTimer = setInterval(() => {
        console.log(order_info, '获取到的订单数据')

        // 查询订单
        this.req({
          url: '/v1/pay/orderStatus',
          data: {
            order_sn: order_info.order_sn
          },
          Loading: true,
          success: (res) => {
            switch (res.code) {
              case 200:
                _this.cancelCheckPayStatus()

                this.$common.toast({
                  title: '支付成功', icon: 'success', duration: 1500, success: () => {
                    this.$common.back()
                  }
                })
                break;
              case 203:
                _this.cancelOrderPay()
                _this.cancelCheckPayStatus()
                this.$common.toast({ title: '支付失败', icon: 'none', duration: 500 })
                break;
            }
          }
        })
      }, 2 * 1000)

      _this.cancelTimer = setTimeout(() => {
        _this.cancelOrderPay()
        _this.cancelCheckPayStatus();
      }, 60 * 1000)
    },
    cancelCheckPayStatus () {
      uni.removeStorageSync('order_info_ship')
      // this.$common.toast({
      // 	title: '支付超时',
      // 	icon: 'none',
      // 	duration: 500
      // })
      if (this.checkTimer) {
        clearTimeout(this.checkTimer)
      }

      if (this.cancelTimer) {
        clearInterval(this.cancelTimer)
      }
    },
    // 取消支付
    cancelOrderPay () {
      const order_info = uni.getStorageSync('order_info_ship')
      if (order_info.order_sn) {
        this.req({
          url: '/v1/pay/cancel',
          data: {
            order_sn: order_info.order_sn
          },
          Loading: true,
          success: (res) => {
            console.log(res)
          }
        })
      }
    },
    /**
 * @description: 确认/提交订单
 * @param {*} e 0:确认订单,1:提交订单
 * @return {*}
 */
    confirmSubmit (e, id = null) {
      // let goods_id = []
      // for (let i = 1; i <= this.optionsData.num; i++) {
      //   goods_id.push(this.optionsData.goods_id)
      // }
      let goods_id = this.optionsData.goods_id
      let num = this.optionsData.num
      let data = {
        // id: id ? id : this.optionsData.id,
        goods_id: goods_id,
        num: num,
        type: 1,
        ramk: this.note,
        pay_type: 3,
        submit: e
      }
      data.add_id = (this.addressData && this.addressData.id) || ''

      if (e == 1) {
        if (!this.addressData) {
          this.$common.toast({
            title: '未选择地址'
          })
          return
        }
      }

      this.req({
        url: '/v1/user/ship/box',
        data,
        success: res => {
          if (res.code == 200) {
            if (e == 0) {
              this.orderData = res.data
            } else {
              if (res.data.pay_money * 1 > 0) {
                // #ifdef H5 || MP
                const order_info = { order_sn: res.data.order_sn }
                uni.setStorageSync('order_info_ship', order_info);
                this.checkPayStatus()
                // #endif
                const params = { ...res.data, returnUrl: '/pages/tabBar/bag' }
                this.$common.orderPay(params).then(res1 => {
                  if (res1 == 'success') {
                    this.$common.back()
                  }
                })
              } else {
                this.$common.toast({
                  title: '支付成功',
                  duration: 500,
                  success: () => {
                    this.$common.back()
                  }
                })
              }
            }
          }
        }
      })
    },
    /**
     * @description: 获取规则
     * @return {*}
     */
    getRule () {
      this.$common.getRule(5).then(res => {
        this.ruleData = res

        this.openRulePop()
      })
    },

    /**
     * @description: 关闭规则弹窗
     * @return {*}
     */
    closeRulePop () {
      this.$refs.rulePop.close()
    },

    /**
     * @description: 打开规则弹窗
     * @return {*}
     */
    openRulePop () {
      this.$refs.rulePop.open()
    },

    /**
     * @description: 获取默认地址
     * @return {*}
     */
    getDefAdd () {
      return new Promise((resolve, reject) => {
        this.req({
          url: '/v1/address/data',
          data: {},
          Loading: true,
          success: res => {
            console.log(res)
            if (res.code == 200) {
              this.addressData = res.data

              resolve()
            }
          }
        })
      })
    },

    /**
     * @description: 前往选择地址
     * @return {*}
     */
    toChooseAddress () {
      this.$common.to({
        url: '/package/mine/address',
        query: {
          type: 'choose'
        }
      })
    },
    submitOrder () {
      let newIdsArr = this.optionsData.id.split(",")
      newIdsArr.forEach(id => {
        setTimeout(() => {
          this.confirmSubmit(1, id)
        }, 5000)

      })
    }

  }
}
</script>

<style lang="scss">
page {
  background: url("https://img.alicdn.com/imgextra/i4/2200676927379/O1CN01unkdtT24NdWplMdw8_!!2200676927379.png") no-repeat;
  background-size: 100% 100%;
  background: #222333;
}

.page-wrap {
  padding: 0 30rpx 150rpx;

  .address-card {
    border-radius: 10rpx;
    background: #313131;
    padding: 30rpx;
    margin-top: 30rpx;

    &-hd {
      font-size: 24rpx;
      font-family: PingFang SC;
      font-weight: 500;
      color: #fff;
    }

    &-bd {
      margin-top: 20rpx;
      display: flex;

      font-size: 32rpx;
      font-family: PingFang SC;
      font-weight: bold;
      color: #fff;

      .name {
        max-width: 200rpx;
      }

      .phone {
        margin-left: 20rpx;
      }
    }

    &-ft {
      margin-top: 10rpx;
      font-size: 24rpx;
      font-family: PingFang SC;
      font-weight: 500;
      color: #999999;
    }

    .no-address {
      display: flex;
      flex-flow: column nowrap;
      align-items: center;

      .icon {
        width: 60rpx;
        height: 60rpx;
      }

      .msg {
        font-size: 32rpx;
        font-family: PingFang SC;
        font-weight: bold;
        color: #fff;
        margin-top: 20rpx;
      }
    }
  }

  .goods-card {
    border-radius: 10rpx;
    background: #313131;
    margin-top: 30rpx;

    &-hd {
      padding: 30rpx;
      display: flex;

      .pic {
        width: 168rpx;
        height: 168rpx;
        border-radius: 10rpx;
        border: 1rpx solid #f4f4f4;
        box-sizing: border-box;
      }

      .info {
        width: calc(100% - 168rpx);
        box-sizing: border-box;
        padding-left: 20rpx;
        display: flex;
        flex-flow: column nowrap;
        justify-content: space-between;

        .title {
          font-size: 28rpx;
          font-family: PingFang SC;
          font-weight: 500;
          color: #fff;
        }

        .type {
          margin-top: 20rpx;
          margin-right: 20rpx;

          font-size: 24rpx;
          font-family: PingFang SC;
          font-weight: 500;
          color: #999999;
        }

        .price-num {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 20rpx;

          .price {
            font-size: 28rpx;
            font-family: SourceHanSansCN;
            font-weight: bold;
            color: #ff4f4d;
          }

          .num {
            font-size: 28rpx;
            font-family: PingFang SC;
            font-weight: 500;
            color: #999999;
          }
        }
      }
    }

    &-bd {
      padding: 30rpx;
      border-top: 1rpx solid #eeeeee;
      display: flex;
      justify-content: flex-end;

      .total {
        font-size: 24rpx;
        font-family: PingFang SC;
        font-weight: 500;
        color: #999999;

        text {
          color: #222222;
          font-size: 28rpx;
          font-weight: bolder;
        }
      }
    }
  }

  .note-card {
    padding: 30rpx;
    border-radius: 10rpx;
    background: #313131;
    margin-top: 30rpx;

    &-hd {
      font-size: 28rpx;
      font-family: PingFang SC;
      font-weight: 500;
      color: #fff;
    }

    &-bd {
      margin-top: 30rpx;
      background: #666;
      border-radius: 10rpx;
      padding: 30rpx 30rpx 10rpx;

      textarea {
        font-size: 26rpx;
        font-family: PingFang SC;
        font-weight: 500;
        color: #fff;
        line-height: 27rpx;
      }

      .note-num {
        text-align: right;
        margin-top: 10rpx;

        font-size: 20rpx;
        font-family: PingFang SC;
        font-weight: 500;
        color: #b3b3b3;
      }
    }
  }

  .info-card {
    border-radius: 10rpx;
    background: #313131;
    margin-top: 30rpx;
    padding: 10rpx 0;

    .row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 20rpx 30rpx;

      font-size: 28rpx;
      font-family: PingFang SC;
      font-weight: 500;
      color: #fff;

      .right {
        .bold {
          font-weight: bold;
        }

        .gray {
          color: #999999;
        }
      }
    }

    .rule-btn {
      padding: 20rpx 30rpx;
      display: flex;
      align-items: center;

      font-size: 24rpx;
      font-family: PingFang SC;
      font-weight: 500;
      color: #999999;
    }
  }

  .bt-fixed {
    position: fixed;
    left: 0;
    bottom: 0;
    z-index: 10;
    width: 100%;
    height: 120rpx;
    background: #313131;
    padding: 0 30rpx;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .total-money {
      font-size: 28rpx;
      font-family: PingFang SC;
      font-weight: 500;
      color: #fff;

      text {
        font-size: 24rpx;
        font-family: SourceHanSansCN;
        font-weight: bold;
        color: #ff0000;

        text {
          font-size: 32rpx;
        }
      }
    }

    .buy-btn {
      width: 216rpx;
      height: 66rpx;
      background: #6953d6;
      border-radius: 5rpx;
      text-align: center;
      line-height: 66rpx;

      font-size: 28rpx;
      font-family: PingFang SC;
      font-weight: 500;
      color: #ffffff;
    }
  }

  .rule-pop {
    width: 570rpx;
    border-radius: 10rpx;
    background: #fff;
    padding: 0 30rpx 30rpx;

    &-hd {
      padding: 30rpx 0;
      text-align: center;

      font-size: 32rpx;
      font-family: PingFang SC;
      font-weight: bold;
      color: #fff;
    }

    &-bd {
      max-height: 50vh;

      .content {
        font-size: 26rpx;
        font-family: PingFang SC;
        font-weight: 500;
        color: #666666;
        line-height: 44rpx;
      }
    }

    &-ft {
      margin: 50rpx auto 0;
      width: 327rpx;
      height: 66rpx;
      background: #000000;
      border-radius: 33rpx;
      line-height: 66rpx;
      text-align: center;

      font-size: 26rpx;
      font-family: PingFang SC;
      font-weight: 500;
      color: #ffffff;
    }
  }
}
</style>
