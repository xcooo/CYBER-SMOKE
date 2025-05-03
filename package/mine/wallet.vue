<!--
 * @Date: 2022-11-24 14:30:40
 * @LastEditTime: 2025-05-03 09:48:10
 * @Description: content
-->
<template>
  <view class="page-wrap">
    <uni-nav-bar :title="'钱包'" color="#fff" leftIcon="left" backgroundColor="#222333" :border="false" :statusBar="true"
      :fixed="true" @clickLeft="$common.back()"></uni-nav-bar>

    <u-gap height="360"></u-gap>

    <view class="page-wrap-hd" :style="{
      top: `calc(${sysConfig.statusBarHeight}px + 44px)`
    }">
      <view class="money-card">
        <view class="money-card-item">
          <view class="num">{{ userInfo.money }}</view>

          <view class="title">余额</view>

          <view @click="$common.to({ url: '/package/mine/recharge' })" class="btn">
            去充值

            <uni-icons type="right" color="#fff" size="12" />
          </view>
        </view>

        <view class="money-card-item">
          <view class="num">{{ userInfo.coin }}</view>

          <view class="title">积分</view>

          <view @click="$common.to({ type: 2, url: '/package/index/score-list' })" class="btn">
            积分商城

            <uni-icons type="right" color="#fff" size="12" />
          </view>
        </view>

        <view class="money-card-item">
          <view class="num">{{ userInfo.gold }}</view>

          <view class="title">佣金</view>

          <view @click="$common.to({ url: '/package/mine/withdrawal' })" class="btn">
            去提现

            <uni-icons type="right" color="#fff" size="12" />
          </view>
        </view>


      </view>

      <view class="tab-wrap">
        <u-tabs :list="tabList" name="title" :current="tabCur" @change="tabChange" bg-color="transparent"
          font-size="28rpx" :height="88" active-color="#6c5bde" inactive-color="#999999" :bar-width="70" :bar-height="6"
          :bold="false" :is-scroll="false" :bar-style="{
            background: '#6c5bde'
          }"></u-tabs>
      </view>
    </view>

    <mescroll-body ref="mescrollRef" @init="mescrollInit" @down="downCallback" @up="getList" :down="downOption"
      :up="upOption">
      <view class="list">
        <view v-for="(item, i) in listData" :key="i" class="list-item">
          <view v-if="tabCur == 2" class="icon">
            <cimage src="/static/icon/integral.png" mode="scaleToFill" />
          </view>

          <view class="info">
            <view class="title">{{ item.desc }}</view>

            <view class="time">{{ item.created_at }}</view>
          </view>

          <view class="num">{{ item.change }}</view>
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
        auto: true,
        page: {
          size: 20 // 每页数据的数量,默认10
        }
      },
      listData: [],
      tabList: [
        {
          id: 1,
          name: '余额明细'
        },
        {
          id: 2,
          name: '积分明细'
        },
        {
          id: 3,
          name: '佣金明细'
        },

      ],
      tabCur: 0,
      canRefresh: false
    }
  },

  computed: {
    ...mapGetters(['sysConfig', 'userInfo'])
  },

  onLoad (options) {
    if (options.type) {
      this.tabCur = options.type
    }
  },

  onShow () {
    this.$store.dispatch('getUserInfo')
    this.canRefresh && this.mescroll.resetUpScroll()
    this.canRefresh && this.mescroll.scrollTo(0, 0)
    this.canRefresh = true
  },

  methods: {
    toBox () {
      uni.switchTab({
        url: '/pages/box/box'
      })
    },
    /**
     * @description: 获取列表数据
     * @param {*}
     * @return {*}
     */
    getList ({ num, size }) {
      let url = ''

      if (this.tabCur == 0) {
        url = '/v1/user/money/list'
      }
      if (this.tabCur == 1) {
        url = '/v1/user/coin/list'
      }
      if (this.tabCur == 2) {
        url = '/v1/user/gold/list'
      }

      this.req({
        url,
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
     * @description: tab切换
     * @param {*} e
     * @return {*}
     */
    tabChange (e) {
      this.tabCur = e
      this.listData = []
      this.mescroll.resetUpScroll()
      this.mescroll.scrollTo(0, 0)
    }
  }
}
</script>

<style lang="scss">
page {
  // background: url("https://img.alicdn.com/imgextra/i4/2200676927379/O1CN01unkdtT24NdWplMdw8_!!2200676927379.png") no-repeat;
  // background-size: 100% 100%;
  // background: #dbf7cb;
  background-color: #222333;
}

::v-deep .mescroll-body {
  background-color: #222333;
  // background: url("https://img.alicdn.com/imgextra/i4/2200676927379/O1CN01unkdtT24NdWplMdw8_!!2200676927379.png") no-repeat;
  // background-size: 100% 100%;
  // background: #dbf7cb;
}

.page-wrap {

  &-hd {
    position: fixed;
    z-index: 10;
    left: 0;
    top: 0;
    width: 100%;
    box-sizing: border-box;
    padding: 30rpx 0 0;
    background-color: #222333;

    .money-card {
      width: 690rpx;
      margin: 0 auto;
      display: flex;
      justify-content: space-around;
      box-sizing: border-box;
      padding: 50rpx 0 40rpx;
      background: linear-gradient(0deg, #313236, #44444e);
      border-radius: 10rpx;

      &-item {
        width: 30%;
        display: flex;
        flex-flow: column nowrap;
        align-items: center;
        justify-content: space-between;

        .num {
          font-size: 36rpx;
          font-family: PingFang SC;
          font-weight: bold;
          color: #ffffff;
          word-wrap: break-word;
          word-break: break-all;
        }

        .title {
          font-size: 26rpx;
          font-family: PingFang SC;
          font-weight: 500;
          color: #999999;
          margin: 20rpx 0;
        }

        .btn {
          display: flex;
          align-items: center;
          padding-left: 10rpx;

          font-size: 24rpx;
          font-family: PingFang SC;
          font-weight: 500;
          color: #ffffff;
        }
      }
    }

    .tab-wrap {
      width: 100%;
      height: 88rpx;
    }
  }

  .list {
    padding: 1rpx 30rpx 40rpx;

    &-item {
      display: flex;
      align-items: center;
      padding: 30rpx;
      background: #ffffff;
      border-radius: 10rpx;
      margin-top: 20rpx;
      background-color: #222333;

      .icon {
        width: 50rpx;
        height: 50rpx;
      }

      .info {
        // display: flex;
        flex: 1;
        padding: 0 30rpx;

        .title {
          // max-width: 400rpx;
          font-size: 28rpx;
          font-family: PingFang SC;
          font-weight: bold;
          color: #fff;
        }

        .time {
          margin-top: 16rpx;
          font-size: 28rpx;
          font-family: PingFang SC;
          font-weight: 500;
          color: #999999;
        }
      }

      .num {
        font-size: 28rpx;
        font-family: PingFang SC;
        font-weight: bold;
        color: #6c5bde;
      }
    }
  }
}
</style>
