<!--
 * @Date: 2022-12-03 16:05:23
 * @LastEditTime: 2022-12-16 16:15:40
 * @Description: content
-->
<template>
  <view class="page-wrap">
    <uni-nav-bar
      title="本期奖励"
      color="#333"
      leftIcon="left"
      backgroundColor="#fff"
      :border="false"
      :statusBar="true"
      :fixed="true"
      @clickLeft="$common.back()"
    ></uni-nav-bar>

    <view v-if="configData" class="all-type">
      <view
        v-for="(item, i) in configData.markList"
        :key="i"
        class="all-type-item"
      >
        <text
          :style="{
            color: item.color
          }"
        >
          {{ item.title }}:
        </text>

        {{ item.rate }}%
      </view>
    </view>

    <u-gap height="20"></u-gap>

    <view @click="$common.toRule(9)" class="notice">
      <u-notice-bar
        type="none"
        mode="horizontal"
        color="#333333"
        :list="['通知通知']"
      ></u-notice-bar>
    </view>

    <mescroll-body
      ref="mescrollRef"
      @init="mescrollInit"
      @down="downCallback"
      @up="getList"
      :down="downOption"
      :up="upOption"
    >
      <view class="bao-list">
        <view v-for="(item, i) in listData" :key="i" class="bao-list-item">
          <view class="pic">
            <cimage :src="item.thumb" mode="scaleToFill" />

            <view
              :style="{
                background: item.mark_color
              }"
              class="tag"
            >
              <view>{{ item.mark_title }}</view>
            </view>
          </view>

          <view class="name hang1">
            {{ item.title }}
          </view>

          <view class="price-num">
            <view class="price">
              参考价
              <text>
                ¥
                <text>{{ item.price }}</text>
              </text>
            </view>
          </view>
        </view>
      </view>
    </mescroll-body>
  </view>
</template>

<script>
export default {
  data() {
    return {
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
      optionsData: '',
      configData: ''
    }
  },

  onLoad(options) {
    this.getConfig()
  },

  methods: {
    /**
     * @description: 获取列表数据
     * @param {*}
     * @return {*}
     */
    getList({ num, size }) {
      this.req({
        url: '/v1/luckbox/award',
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
     * @description: 幸运盲盒配置
     * @return {*}
     */
    getConfig() {
      this.req({
        url: '/v1/luckbox/config',
        data: {},
        success: res => {
          if (res.code == 200) {
            this.configData = res.data
          }
        }
      })
    }
  }
}
</script>

<style lang="scss">
.page-wrap {
  .all-type {
    width: 100%;
    height: 88rpx;
    align-items: center;
    background: #fff;
    box-sizing: border-box;
    // padding: 0 50rpx;
    display: flex;
    justify-content: space-evenly;

    &-item {
      font-size: 20rpx;
      font-family: PingFang SC;
      font-weight: 500;
      color: #333333;

      text {
        color: #ee5c5e;
      }
    }
  }

  .notice {
    background: #fff;
    padding: 6rpx 0;
  }

  .bao-list {
    display: flex;
    flex-flow: row wrap;
    justify-content: space-between;
    padding: 1rpx 30rpx 40rpx;
    &-item {
      width: 340rpx;
      border-radius: 10rpx;
      overflow: hidden;
      background: #ffffff;
      margin-top: 20rpx;

      .pic {
        height: 340rpx;
        position: relative;

        .tag {
          position: absolute;
          left: 10rpx;
          bottom: 0;

          padding: 8rpx 20rpx;
          border-radius: 8rpx;
          background: #f43336;
          transform: skew(-14deg);

          view {
            transform: skew(14deg);

            font-size: 26rpx;
            font-family: PingFang SC;
            font-weight: 500;
            color: #ffffff;
          }
        }
      }

      .name {
        padding: 10rpx 15rpx;

        font-size: 26rpx;
        font-family: PingFang SC;
        font-weight: 500;
        color: #333333;
      }

      .price-num {
        padding: 0 15rpx 10rpx;
        display: flex;
        flex-flow: row wrap;
        justify-content: space-between;
        align-items: center;

        .price {
          font-size: 24rpx;
          font-family: PingFang SC;
          font-weight: 500;
          color: #666666;

          text {
            font-weight: bold;
            padding-left: 6rpx;
            font-size: 24rpx;
            color: #f67a29;

            text {
              font-size: 32rpx;
            }
          }
        }

        .num {
          font-size: 20rpx;
          font-family: PingFang SC;
          font-weight: 500;
          color: #999999;
        }
      }
    }
  }
}
</style>
