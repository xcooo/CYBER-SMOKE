<!--
 * @Date: 2022-12-06 16:23:46
 * @LastEditTime: 2023-01-09 18:49:49
 * @Description: content
-->
<template>
  <view class="page-wrap">
    <uni-nav-bar
      title="我的记录"
      color="#333"
      leftIcon="left"
      backgroundColor="#fff"
      :border="false"
      :statusBar="true"
      :fixed="true"
      @clickLeft="$common.back()"
    ></uni-nav-bar>

    <u-gap height="88"></u-gap>

    <view
      class="tab-list"
      :style="{
        top: `calc(${sysConfig.statusBarHeight}px + 44px)`
      }"
    >
      <u-tabs
        :list="tabList"
        name="title"
        :current="tabCur"
        @change="tabChange"
        bg-color="transparent"
        font-size="28rpx"
        :height="88"
        active-color="#333333"
        inactive-color="#999999"
        :bar-width="70"
        :bar-height="6"
        :bold="false"
        :is-scroll="false"
        :bar-style="{
          background: '#333333'
        }"
      ></u-tabs>
    </view>

    <mescroll-body
      ref="mescrollRef"
      @init="mescrollInit"
      @down="downCallback"
      @up="getList"
      :down="downOption"
      :up="upOption"
    >
      <view class="list">
        <template v-if="tabCur == 0">
          <view v-for="(item, i) in listData" :key="i" class="invite-item">
            <view class="invite-item-hd">
              <view class="avatar">
                <cimage :src="item.avatar" mode="scaleToFill" />
              </view>

              <view class="info">
                <view class="name hang1">
                  {{ item.nickName }}
                </view>

                <view class="time">{{ item.created_at }}</view>
              </view>

              <view class="status">已到账</view>
            </view>

            <view class="invite-item-bd">
              <view class="pic">
                <cimage :src="item.thumb" mode="scaleToFill" />
              </view>

              <view class="info">
                <view class="title hang2">
                  {{ item.title }}
                </view>

                <view class="get-num">
                  {{ '可得奖励 ' }}
                  <text v-if="item.get_coin * 1 > 0">
                    {{ item.get_coin }}积分
                  </text>
                  <template
                    v-if="item.get_coin * 1 > 0 && item.get_money * 1 > 0"
                  >
                    +
                  </template>
                  <text v-if="item.get_money * 1 > 0" class="red">
                    {{ item.get_money }}元现金
                  </text>
                </view>
              </view>
            </view>
          </view>
        </template>

        <template v-if="tabCur == 1">
          <div v-for="(item, i) in listData" :key="i" class="log-item">
            <view class="icon">
              <cimage src="/static/icon/integral.png" mode="scaleToFill" />
            </view>

            <view class="info">
              <view class="title">
                {{ item.desc }}
              </view>

              <view class="time">{{ item.created_at }}</view>
            </view>

            <view class="num">{{ item.change }}</view>
          </div>
        </template>
      </view>
    </mescroll-body>
  </view>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data() {
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

      pageTop: 0,
      tabList: [
        {
          id: 1,
          title: '好友开盒'
        },
        {
          id: 3,
          title: '积分明细'
        }
      ],
      tabCur: 0,
      detailData: ''
    }
  },

  computed: {
    ...mapGetters(['sysConfig'])
  },

  onLoad(options) {},

  onReady() {
    // this.openDetailPop()
  },

  methods: {
    /**
     * @description: 获取列表数据
     * @param {*}
     * @return {*}
     */
    getList({ num, size }) {
      let url = ''

      if (this.tabCur == 0) {
        url = '/v1/box/friend/log'
      }

      if (this.tabCur == 1) {
        url = '/v1/user/coin/list'
      }

      if (!url) return

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
    tabChange(e) {
      this.tabCur = e
      this.listData = []
      this.mescroll.resetUpScroll()
      this.mescroll.scrollTo(0, 0)
    },

    /**
     * @description: 关闭中奖详情弹窗
     * @return {*}
     */
    closeDetailPop() {
      this.$refs.detailPop.close()
    },

    /**
     * @description: 打开中奖详情弹窗
     * @return {*}
     */
    openDetailPop() {
      this.$refs.detailPop.open()
    }
  }
}
</script>

<style lang="scss">
.page-wrap {
  // padding-bottom: 40rpx;

  .tab-list {
    background: #fff;
    height: 88rpx;
    padding: 0 30rpx;
    position: fixed;
    left: 0;
    width: 100%;
    box-sizing: border-box;
    z-index: 10;

    &-item {
      font-size: 28rpx;
      font-family: PingFang SC;
      font-weight: 500;
      color: #999999;
      transition: all 0.3s;

      &.act {
        font-size: 32rpx;
        font-weight: bold;
        color: #333333;
      }
    }
  }

  .list {
    padding: 1rpx 30rpx 40rpx;

    .join-item {
      background: #fff;
      border-radius: 10rpx;
      margin-top: 30rpx;

      &-hd {
        padding: 30rpx;

        font-size: 28rpx;
        font-family: PingFang SC;
        font-weight: bold;
        color: #333333;
      }

      &-bd {
        padding: 30rpx 20rpx;
        border-top: 1rpx solid #f1f1f1;
        display: flex;

        .info-item {
          width: 25%;
          display: flex;
          flex-flow: column nowrap;
          align-items: center;
          justify-content: space-between;

          .title {
            font-size: 26rpx;
            font-family: PingFang SC;
            font-weight: 500;
            color: #333333;
            margin-bottom: 20rpx;
          }

          .num {
            font-size: 28rpx;
            font-family: PingFang SC;
            font-weight: bold;
            color: #ed1e1e;
          }

          .none {
            font-size: 24rpx;
            font-family: PingFang SC;
            font-weight: 500;
            color: #666666;
          }

          .normal {
            font-weight: normal;
            font-size: 24rpx;
          }
        }
      }
    }

    .invite-item {
      background: #fff;
      border-radius: 10rpx;
      margin-top: 30rpx;
      padding: 30rpx;

      &-hd {
        display: flex;
        align-items: center;
        justify-content: space-between;

        .avatar {
          width: 90rpx;
          height: 90rpx;
          border-radius: 50%;
          overflow: hidden;
        }

        .info {
          width: 400rpx;

          .name {
            font-size: 26rpx;
            font-family: PingFang SC;
            font-weight: 500;
            color: #333333;
          }

          .time {
            font-size: 24rpx;
            font-family: PingFang SC;
            font-weight: 500;
            color: #666666;
            margin-top: 10rpx;
          }
        }

        .status {
          font-size: 26rpx;
          font-family: PingFang SC;
          font-weight: 500;
          color: #666666;
        }
      }

      &-bd {
        margin-top: 20rpx;
        padding-top: 20rpx;
        border-top: 1rpx solid #f6f6f6;
        display: flex;

        .pic {
          width: 184rpx;
          height: 184rpx;
          border-radius: 10rpx;
          overflow: hidden;
        }

        .info {
          width: calc(100% - 184rpx);
          box-sizing: border-box;
          padding-left: 20rpx;
          display: flex;
          flex-flow: column nowrap;
          justify-content: space-between;
          padding-top: 10rpx;
          padding-bottom: 20rpx;

          .title {
            font-size: 26rpx;
            font-family: PingFang SC;
            font-weight: 500;
            color: #333333;
          }

          .get-num {
            font-size: 26rpx;
            font-family: PingFang SC;
            font-weight: 500;
            color: #333333;

            text {
              color: #ed3e7b;

              &.red {
                color: #f2342c;
              }
            }
          }
        }
      }
    }

    .log-item {
      display: flex;
      background: #fff;
      border-radius: 10rpx;
      padding: 30rpx;
      align-items: center;
      margin-top: 30rpx;

      .icon {
        width: 50rpx;
        height: 50rpx;
      }

      .info {
        flex: 1;
        padding: 0 20rpx;

        .title {
          font-size: 28rpx;
          font-family: PingFang SC;
          font-weight: bold;
          color: #333333;
        }

        .time {
          margin-top: 10rpx;
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
        color: #ff3333;
      }
    }
  }
}
</style>
