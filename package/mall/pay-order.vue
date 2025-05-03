<!--
 * @Date: 2022-12-06 10:53:50
 * @LastEditTime: 2024-05-26 11:32:06
 * @Description: content
-->
<template>
  <view class="page-wrap">
    <uni-nav-bar title="支付订单" color="#333" leftIcon="left" backgroundColor="#fff" :border="false" :statusBar="true"
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
        <view class="goods-card-hd">
          <view class="pic">
            <cimage :src="orderData.goods.thumb" mode="scaleToFill" />
          </view>

          <view class="info">
            <view class="title hang1">
              {{ orderData.goods.title }}
            </view>

            <view class="type">{{ orderData.goods.sku_name }}</view>

            <view class="price-num">
              <view class="price">¥{{ orderData.goods.price }}</view>

              <view class="num">×{{ orderData.goods.num }}</view>
            </view>
          </view>
        </view>

        <view class="goods-card-bd">
          <view class="total">
            共{{ orderData.goods.num }}件,合计:
            <text>¥{{ orderData.discount.total_money }}</text>
          </view>
        </view>
      </view>

      <view class="note-card">
        <view class="note-card-hd">订单备注</view>

        <view class="note-card-bd">
          <textarea auto-height v-model="note" :maxlength="noteMax" placeholder="选填,可给商家留言" />

          <view class="note-num">{{ note.length }}/{{ noteMax }}</view>
        </view>
      </view>

      <view class="info-card">
        <view class="row">
          <view class="title">订单金额</view>

          <view class="right">
            <view class="bold">¥{{ orderData.discount.total_money }}</view>
          </view>
        </view>

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
          共{{ orderData.goods.num }}个包裹,需支付{{
            orderData.express.express_money
          }}元邮费

          <uni-icons :style="{
                fontWeight: 'normal'
              }" type="right" color="#999999" size="12" />
        </view>

        <!-- <view class="row">
          <view class="title">购物金抵扣</view>

          <view class="right" :class="{
            gray: false
          }">
            <view>
              {{
                orderData.discount.gold_dis * 1 > 0
                ? `-${orderData.discount.gold_dis}`
                : '暂无可用'
              }}
            </view>
          </view>
        </view> -->

        <view class="row">
          <view class="title">余额抵扣</view>

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
      ruleData: ''
    }
  },

  async onLoad (options) {
    uni.$on('chooseAdd', data => {
      this.addressData = data.data
      this.confirmSubmit(0)
      // console.log(this.addressData)
    })
    this.optionsData = options

    if (options.add_id) {
      await this.getAdd()
    } else {
      await this.getDefAdd()
    }

    this.confirmSubmit(0)
  },

  onUnload () {
    uni.$off('chooseAdd')
  },

  methods: {
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
     * @description: 获取地址信息
     * @return {*}
     */
    getAdd () {
      return new Promise((resolve, reject) => {
        this.req({
          url: '/v1/address/info',
          data: {
            id: this.optionsData.add_id
          },
          Loading: true,
          success: res => {
            // console.log(res)
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

    /**
     * @description: 确认/提交订单
     * @param {*} e 0:确认订单,1:提交订单
     * @return {*}
     */
    confirmSubmit (e) {
      let data = {
        ...this.optionsData,
        submit: e,
        ramk: this.note
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
        url: '/v1/shop/order',
        data,
        success: res => {
          if (res.code == 200) {
            if (e == 0) {
              this.orderData = res.data
            } else {
              if (res.data.pay_money * 1 > 0) {
                this.$common.orderPay(res.data).then(res1 => {
                  if (res1 == 'success') {
                    this.$common.to({
                      type: 2,
                      url: '/package/mine/mall-order'
                    })
                  }
                })
              } else {
                this.$common.toast({
                  title: '支付成功',
                  duration: 500,
                  success: () => {
                    this.$common.to({
                      type: 2,
                      url: '/package/mine/mall-order'
                    })
                  }
                })
              }
            }
          }
        }
      })
    }
  }
}
</script>

<style lang="scss">
.page-wrap {
  padding: 0 30rpx 150rpx;

  .address-card {
    border-radius: 10rpx;
    background: #fff;
    padding: 30rpx;
    margin-top: 30rpx;

    &-hd {
      font-size: 24rpx;
      font-family: PingFang SC;
      font-weight: 500;
      color: #222222;
    }

    &-bd {
      margin-top: 20rpx;
      display: flex;

      font-size: 32rpx;
      font-family: PingFang SC;
      font-weight: bold;
      color: #333333;

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
        color: #222222;
        margin-top: 20rpx;
      }
    }
  }

  .goods-card {
    border-radius: 10rpx;
    background: #fff;
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
          color: #222222;
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
    background: #fff;
    margin-top: 30rpx;

    &-hd {
      font-size: 28rpx;
      font-family: PingFang SC;
      font-weight: 500;
      color: #222222;
    }

    &-bd {
      margin-top: 30rpx;
      background: #f8f8f8;
      border-radius: 10rpx;
      padding: 30rpx 30rpx 10rpx;

      textarea {
        font-size: 26rpx;
        font-family: PingFang SC;
        font-weight: 500;
        color: #333;
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
    background: #fff;
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
      color: #222222;

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
    background: #fff;
    padding: 0 30rpx;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .total-money {
      font-size: 28rpx;
      font-family: PingFang SC;
      font-weight: 500;
      color: #222222;

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
      background: #000000;
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
      color: #333333;
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
