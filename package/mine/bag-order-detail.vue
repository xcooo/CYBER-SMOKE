<!--
 * @Date: 2022-06-08 16:07:05
 * @LastEditTime: 2024-06-05 16:23:20
 * @Description: 订单详情
-->
<template>
  <view v-if="pageData" class="page-wrap">
    <uni-nav-bar title="订单详情" color="#fff" leftIcon="left" backgroundColor="#222333" :border="false" :statusBar="true"
      :fixed="true" @clickLeft="$common.back()"></uni-nav-bar>

    <view class="top-card">
      <view class="top-card-hd">
        <template v-if="pageData[0].status == 1">
          <view>待发货</view>
          <view class="msg">等待商家发货中</view>
        </template>
        <template v-if="pageData[0].status == 2">
          <view>待收货</view>
          <view class="msg">商家已发货,请注意查收</view>
        </template>
        <template v-if="pageData[0].status == 4">
          <view>已完成</view>
          <view class="msg">订单已完成</view>
        </template>
      </view>
      <view class="top-card-bd">
        <view class="icon">
          <cimage src="/static/icon/address1.png" mode="scaleToFill" />
        </view>
        <view class="address-info">
          <view class="name-phone">
            <view>{{ pageData[0].name }}</view>
            <view>{{ pageData[0].mobile }}</view>
          </view>
          <view class="address">{{ pageData[0].address }}</view>
        </view>
      </view>
    </view>

    <view class="goods-wrap">
      <view class="goods-card" v-for="(item, index) in pageData" :key="index">
        <view class="pic">
          <cimage :src="item.thumb" mode="scaleToFill" />
        </view>

        <view class="info">
          <view class="title hang1">
            {{ item.title }}
          </view>

          <view class="type">{{ item.sku_name }}</view>

          <view class="price-num">
            <view class="price">¥{{ item.price }}</view>

            <view class="num">×{{ item.num }}</view>
          </view>
        </view>
      </view>
    </view>



    <!-- <view class="info-card">
      <view class="info-title">支付详情</view>
      <view class="row">
        <view class="label">订单编号:</view>
        <view class="right">
          <view>{{ pageData.order_sn }}</view>
          <text @click="copy" class="btn">复制</text>
        </view>
      </view>
      <view class="row">
        <view class="label">下单时间:</view>
        <view class="right">
          <view>{{ pageData.pay_time }}</view>
        </view>
      </view>
      <view class="row">
        <view class="label">购买方式:</view>
        <view class="right">
          <view>{{ pageData.pay_type_desc }}</view>
        </view>
      </view>
      <view v-if="pageData.express_money" class="row">
        <view class="label">运费:</view>
        <view class="right">
          <view>{{ pageData.express_money }}元</view>
        </view>
      </view>
    </view> -->
  </view>
</template>

<script>
export default {
  data () {
    return {
      optionsData: '',
      pageData: ''
    }
  },
  onLoad (options) {
    this.optionsData = options
    this.getData()
  },
  methods: {
    /**
     * @description: 获取详情
     * @param {*}
     * @return {*}
     */
    getData () {
      this.req({
        url: '/v1/user/ship/box/info',
        data: this.optionsData,
        success: res => {
          if (res.code == 200) {
            this.pageData = res.data
          }
        }
      })
    },

    /**
     * @description: 复制
     * @param {*}
     * @return {*}
     */
    copy () {
      this.$copy({
        content: this.pageData.order_sn,
        success (res) {
          console.log(res)
          uni.showToast({
            title: res,
            icon: 'success'
          })
        }
      })
    }
  }
}
</script>

<style lang="scss">
.page-wrap {
  // background: url("https://img.alicdn.com/imgextra/i4/2200676927379/O1CN01unkdtT24NdWplMdw8_!!2200676927379.png") no-repeat;
  // background-size: 100vw 100%;
  // background-repeat: no-repeat;
  // min-height: calc(100vh - 50px);
  min-height: 100vh;
  background: #222333;

  padding: 0 0 30rpx;

  .top-card {
    padding: 30rpx 30rpx 0;
    // background: #fff;
    background-size: 100% 60%;


    &-hd {
      font-size: 40rpx;
      font-family: Source Han Sans CN;
      font-weight: 400;
      color: #fff;

      .msg {
        font-size: 24rpx;
        font-family: Source Han Sans CN;
        font-weight: 400;
        color: #999;
        margin-top: 10rpx;
      }
    }

    &-bd {
      transform: translateY(40rpx);
      margin-top: 0rpx;
      padding: 40rpx 25rpx;
      border-radius: 20rpx;
      background: #313131;
      display: flex;
      justify-content: space-between;
      align-items: center;

      .icon {
        width: 48rpx;
        height: 48rpx;
      }

      .address-info {
        width: calc(100% - 50rpx);
        padding-left: 20rpx;
        box-sizing: border-box;

        .name-phone {
          font-size: 32rpx;
          font-family: Source Han Sans CN;
          font-weight: 400;
          color: #fff;
          display: flex;

          view {
            &:nth-of-type(2) {
              margin-left: 30rpx;
            }
          }
        }

        .address {
          font-size: 24rpx;
          font-family: Source Han Sans CN;
          font-weight: 400;
          color: #999999;
          margin-top: 20rpx;
        }
      }
    }
  }

  .goods-wrap {
    padding: 0 30rpx;
    margin-top: 60rpx;
  }

  .goods-card {
    margin: 20rpx auto 20rpx;
    box-sizing: border-box;
    border-radius: 20rpx;
    background: #313131;
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
          color: #fff;
        }
      }
    }
  }

  .info-card {
    padding: 20rpx 30rpx;
    border-radius: 20rpx;
    background: #ffffff;
    width: 690rpx;
    box-sizing: border-box;
    margin: 20rpx auto 0;

    .info-title {
      font-size: 32rpx;
      font-family: Source Han Sans CN;
      font-weight: 400;
      color: #222222;
      padding: 15rpx 0;
    }

    .row {
      display: flex;
      padding: 15rpx 0;
      // justify-content: space-between;
      align-items: center;

      .label {
        font-size: 28rpx;
        font-family: Source Han Sans CN;
        font-weight: 400;
        color: #222222;
        width: 150rpx;
      }

      .right {
        flex: 1;
        font-size: 28rpx;
        font-family: Source Han Sans CN;
        font-weight: 400;
        color: #222222;
        display: flex;
        align-items: center;

        .btn {
          padding: 5rpx 18rpx;
          // display: flex;
          // justify-content: center;
          // align-items: center;
          background: #222222;
          border-radius: 999px;

          font-size: 24rpx;
          font-family: Source Han Sans CN;
          font-weight: 400;
          color: #ffffff;
          margin-left: 20rpx;
        }
      }
    }
  }
}
</style>
