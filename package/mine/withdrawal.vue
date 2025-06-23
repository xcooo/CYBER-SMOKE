<!--
 * @Date: 2022-11-24 15:15:21
 * @LastEditTime: 2024-05-13 09:15:11
 * @Description: content
-->
<template>
  <view class="page-wrap">
    <uni-nav-bar title="账户提现" color="#fff" leftIcon="left" backgroundColor="#222333" :border="false" :statusBar="true"
      :fixed="true" @clickLeft="$common.back()"></uni-nav-bar>

    <mescroll-body ref="mescrollRef" @init="mescrollInit" @down="downCallback" @up="getList" :down="downOption"
      :up="upOption">
      <view class="money">
        <view class="money-title">
          <view class="icon">
            <cimage src="/static/icon/coin.png" mode="scaleToFill" />
          </view>

          总金额（元）
        </view>

        <view class="money-num">{{ userInfo.gold }}</view>
      </view>

      <view class="row-title">提现至支付宝/微信</view>

      <view class="input-box">
        <input v-model="money" placeholder="请输入提现金额" />
      </view>

      <view class="tips">
        注意：提现平台将

        <text>扣除{{ appConfig.withdraw_handling_rate || 0 }}%</text>

        的手续费
      </view>

      <view class="row-title">微信/支付宝收款码</view>

      <view @click="upImg" class="pic-box">
        <cimage v-if="imgUrl" :src="imgUrl" mode="scaleToFill" />

        <template v-else>
          <view class="icon">
            <cimage src="/static/icon/add.png" mode="scaleToFill" />
          </view>

          <view class="box-title">请上传微信/支付宝 收款码</view>
        </template>
      </view>

      <view @click="submit" class="submit-btn">提交申请</view>

      <view class="submit-tip">
        每日最多提现{{
          appConfig.withdraw_day_max || 0
        }}次,超过会提现失败,请于次日重新发起
      </view>

      <view class="log-title">提现记录</view>

      <view class="log-list">
        <view v-for="(item, i) in listData" :key="i" class="log-list-item">
          <view class="log-list-item-hd">
            <view class="title">提现</view>

            <view class="num">{{ item.pay_fee }}元</view>
          </view>

          <view class="log-list-item-bd">
            <view class="time">{{ item.time }}</view>

            <view class="status" :class="{
              red: item.status == 1
            }">
              <template v-if="item.status == -1">未通过</template>

              <template v-if="item.status == 0">申请中</template>

              <template v-if="item.status == 1">成功</template>
            </view>
          </view>
        </view>
      </view>
    </mescroll-body>
  </view>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data () {
    return {
      optionsData: '',
      // 下拉刷新的配置(可选, 绝大部分情况无需配置)
      downOption: {
        auto: false
      },
      // 上拉加载的配置(可选, 绝大部分情况无需配置)
      upOption: {
        auto: false,
        page: {
          size: 20 // 每页数据的数量,默认10
        }
      },
      listData: [],
      money: '',
      imgUrl: ''
    }
  },

  computed: {
    ...mapGetters(['userInfo', 'appConfig'])
  },

  onShow () { },

  onReady () {
    this.downCallback()
  },

  methods: {
    /**
     * @description: 下拉刷新
     * @return {*}
     */
    downCallback () {
      this.$store.dispatch('getUserInfo')
      this.$store.dispatch('getAppConfig')

      this.mescroll.resetUpScroll()
      this.mescroll.scrollTo(0, 0)
    },

    /**
     * @description: 获取列表数据
     * @param {*}
     * @return {*}
     */
    getList ({ num, size }) {
      this.req({
        url: '/v1/user/withdraw/log',
        data: {
          page: num,
          per_page: size
        },
        Loading: true,
        success: res => {
          if (res.code == 200) {
            if (num == 1) {
              this.listData = []
            }

            this.listData = [...this.listData, ...res.data.data]
            this.mescroll.endBySize(res.data.data.length, res.data.total)
          }
        }
      })
    },

    /**
     * @description: 提现
     * @return {*}
     */
    submit () {
      if (!this.money) {
        this.$common.toast({
          title: '请输入提现金额'
        })
        return
      }
      if (!this.imgUrl) {
        this.$common.toast({
          title: '请上传收款码'
        })
        return
      }
      this.req({
        url: '/v1/user/withdraw/apply',
        data: {
          money: this.money,
          qrcode: this.imgUrl
        },
        success: res => {
          if (res.code == 200) {
            this.$common.toast({
              title: res.msg,
              duration: 500,
              success: () => {
                this.money = ''
                this.imgUrl = ''

                this.downCallback()
              }
            })
          }
        }
      })
    },

    /**
     * @description: 上传图片
     * @return {*}
     */
    upImg () {
      uni.chooseImage({
        sizeType: ['original', 'compressed'],
        sourceType: ['album', 'camera'],
        count: 1,
        success: ({ tempFilePaths, tempFiles }) => {
          this.req({
            url: '/v1/upload/image',
            file: tempFilePaths[0],
            fileName: 'image',
            success: res => {
              if (res.code == 200) {
                this.imgUrl = res.data
              }
            }
          })
        },
        fail: error => { }
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
  padding: 0 30rpx 40rpx;

  .money {
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
    padding-top: 40rpx;

    &-title {
      display: flex;
      align-items: center;

      font-size: 28rpx;
      font-family: PingFang SC;
      font-weight: 500;
      color: #fff;

      .icon {
        width: 50rpx;
        height: 50rpx;
      }
    }

    &-num {
      margin-top: 20rpx;
      font-size: 60rpx;
      font-family: Source Han Sans CN;
      font-weight: bold;
      color: #705cff;
    }
  }

  .row-title {
    font-size: 32rpx;
    font-family: PingFang SC;
    font-weight: bold;
    color: #fff;
    margin-top: 60rpx;
  }

  .input-box {
    height: 88rpx;
    display: flex;
    align-items: center;
    border-radius: 10rpx;
    background: #313131;
    padding: 0 30rpx;
    margin-top: 30rpx;

    input {
      flex: 1;
      font-size: 16px;
      font-family: PingFang SC;
      font-weight: 500;
      color: #fff;
    }
  }

  .tips {
    padding: 10rpx 20rpx;

    font-size: 14px;
    font-family: PingFang SC;
    font-weight: 500;
    color: #999999;

    text {
      color: #705cff;
    }
  }

  .pic-box {
    width: 256rpx;
    height: 256rpx;
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
    justify-content: center;
    background: #313131;
    border-radius: 10rpx;
    margin-top: 20rpx;

    .icon {
      width: 62rpx;
      height: 62rpx;
    }

    .box-title {
      padding: 0 10rpx;
      text-align: center;
      margin-top: 30rpx;

      font-size: 26rpx;
      font-family: PingFang SC;
      font-weight: 500;
      color: #999999;
    }
  }

  .submit-btn {
    width: 630rpx;
    height: 88rpx;
    background: #313131;
    border-radius: 5rpx;
    margin: 70rpx auto 0;
    line-height: 88rpx;
    text-align: center;

    font-size: 28rpx;
    font-family: PingFang SC;
    font-weight: 500;
    color: #ffffff;
  }

  .submit-tip {
    font-size: 14px;
    font-family: PingFang SC;
    font-weight: 500;
    color: #fff;
    text-align: center;
    margin-top: 20rpx;
  }

  .log-title {
    text-align: center;
    margin-top: 80rpx;

    font-size: 36rpx;
    font-family: Source Han Sans CN;
    font-weight: bold;
    color: #705cff;
  }

  .log-list {
    padding: 1rpx 0 0;

    &-item {
      padding: 20rpx 30rpx;
      border-radius: 10rpx;
      background: #313131;
      margin-top: 20rpx;

      &-hd {
        display: flex;
        justify-content: space-between;
        align-items: center;

        .title {
          font-size: 26rpx;
          font-family: PingFang SC;
          font-weight: bold;
          color: #fff;
        }

        .num {
          font-size: 26rpx;
          font-family: PingFang SC;
          font-weight: bold;
          color: #ff3333;
        }
      }

      &-bd {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 10rpx;

        .time {
          font-size: 26rpx;
          font-family: PingFang SC;
          font-weight: 500;
          color: #666666;
        }

        .status {
          font-size: 24rpx;
          font-family: PingFang SC;
          font-weight: bold;
          color: #999999;

          &.red {
            color: #ff3333;
          }
        }
      }
    }
  }
}
</style>
