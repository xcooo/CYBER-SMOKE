<!--
 * @Date: 2022-11-21 15:10:27
 * @LastEditTime: 2023-01-05 08:56:11
 * @Description: content
-->
<template>
  <view class="page-wrap">
    <view class="page-wrap-hd">
      <swiper class="banner" autoplay :circular="true">
        <swiper-item v-for="(item, i) of swiperList" :key="i">
          <view @click="$common.bannerTo(item)" class="swiper-pic">
            <cimage :src="item.thumb" mode="scaleToFill" />
          </view>
        </swiper-item>
      </swiper>

      <view class="radius-hd">
        <view class="radius-hd-content"></view>
      </view>

      <view class="barrage-wrap">
        <lff-barrage
          :style="{
            width: '100%'
          }"
          background="linear-gradient(to right,rgba(118, 208, 232, 0.9),rgba(118, 208, 232, 0.2))"
          type="rightToLeft"
          ref="xbarrage"
          height="120"
          :maxTop="0"
        ></lff-barrage>
      </view>

      <view @click="$common.to({ url: '/package/mine/bag' })" class="bag-btn">
        <view class="icon">
          <cimage src="/static/icon/bag.png" mode="scaleToFill" />
        </view>

        盒柜
      </view>

      <view @click="$common.toRule(2)" class="rule-btn">活动规则</view>
    </view>

    <mescroll-body
      ref="mescrollRef"
      @init="mescrollInit"
      @down="downCallback"
      @up="getList"
      :down="downOption"
      :up="upOption"
    >
      <view class="page-wrap-bd">
        <view class="list">
          <view
            @click="toDetail(item)"
            v-for="(item, i) of listData"
            :key="i"
            class="list-item"
          >
            <view class="pic">
              <cimage :src="item.thumb" mode="scaleToFill" />

              <view v-if="i + 1 <= 3" class="tag">
                <cimage src="/static/icon/hot_tag.png" mode="scaleToFill" />
              </view>
            </view>

            <!-- 商品信息 -->
            <view class="item-info">
              <view class="title hang2">
                {{ item.title }}
              </view>

              <view class="price-num">
                <view class="price">
                  ¥
                  <text>{{ item.price }}</text>
                </view>

                <view class="num">{{ item.sales }}人开启</view>
              </view>

              <!-- 奖品列表 -->
              <gbro-marquee
                broadcastType="mould"
                direction="left"
                :viewHeight="76"
                :imgdata="item.awardList"
                :broadcastStyle="{ speed: 40 }"
                style="width: 100%"
              >
                <block v-for="c in 2" :key="c">
                  <!--在小程序里遇到一个坑不能使用两个slot 所有统一复制一份做衔接 -->
                  <view
                    v-for="(a, b) in item.awardList.slice(0, 15)"
                    :key="b"
                    class="pic"
                  >
                    <cimage :src="a" />
                  </view>
                </block>
              </gbro-marquee>
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
      logList: [],
      barrageTimer: null,
      barrageCur: 0,
      swiperList: ''
    }
  },

  onShareAppMessage() {
    return {
      title: `开忙和赢好礼!`,
      // imageUrl: this.pageData.box.thumb,
      path: `/pages/box/box`
    }
  },

  onLoad(options) {
    /* 获取轮播图 */
    this.$common.getBanner(3).then(res => {
      this.swiperList = res
    })
  },

  onReady() {
    this.getLog()
  },

  onUnload() {
    clearTimeout(this.barrageTimer)
    this.barrageTimer = null
  },

  methods: {
    /**
     * @description: 中奖记录
     * @return {*}
     */
    getLog() {
      this.req({
        url: '/v1/box/log',
        data: {},
        Loading: true,
        success: res => {
          if (res.code == 200) {
            this.logList = res.data

            this.runBarrage()
          }
        }
      })
    },

    /**
     * @description: 获取商品列表数据
     * @param {*}
     * @return {*}
     */
    getList({ num, size }) {
      this.req({
        url: '/v1/box/list',
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
     * @description: 前往盒子详情
     * @param {*} item
     * @param {*} i
     * @return {*}
     */
    toDetail(item) {
      this.$common.to({
        url: '/package/box/box-detail',
        query: {
          id: item.id
        }
      })
    },

    /**
     * @description: 发送弹幕
     * @param {*}
     * @return {*}
     */
    runBarrage() {
      this.barrageTimer = setInterval(() => {
        if (this.logList.length > 0) {
          this.$refs.xbarrage.add({
            head_pic: this.logList[this.barrageCur].avatar,
            name: this.logList[this.barrageCur].nickName,
            times: this.logList[this.barrageCur].times,
            markTitle: this.logList[this.barrageCur].mark_title,
            prize: this.logList[this.barrageCur].thumb
          })
          this.barrageCur += 1
          if (this.barrageCur == this.logList.length) {
            this.barrageCur = 0
          }
        }
      }, 3000)
    }
  }
}
</script>

<style lang="scss">
.page-wrap {
  padding-top: 460rpx;
  min-height: 100vh;
  background: #fff;

  &-hd {
    width: 750rpx;
    height: 460rpx;
    position: fixed;
    left: 0;
    top: 0;
    z-index: 5;
    background: #000;

    .banner {
      width: 100%;
      height: 400rpx;

      .swiper-pic {
        width: 100%;
        height: 100%;
      }
    }

    .radius-hd {
      width: 100%;
      padding-top: 20rpx;

      &-content {
        height: 42rpx;
        border-radius: 30rpx 30rpx 0 0;
        background: #fff;
      }
    }

    .barrage-wrap {
      width: 100%;
      height: 50rpx;
      position: absolute;
      bottom: 50rpx;
      left: 0;
    }

    .bag-btn {
      width: 147rpx;
      height: 53rpx;
      background: #ffffff;
      border-radius: 27rpx;
      display: flex;
      justify-content: center;
      align-items: center;
      position: absolute;
      z-index: 1;
      left: 30rpx;
      bottom: 160rpx;

      .icon {
        width: 40rpx;
        height: 40rpx;
      }

      font-size: 26rpx;
      font-family: PingFang SC;
      font-weight: 500;
      color: #333333;
    }

    .rule-btn {
      word-wrap: break-word;
      word-break: break-all;
      width: 45rpx;
      height: 169rpx;
      background: rgba(255, 255, 255, 0.9);
      border-radius: 10rpx 0rpx 0rpx 10rpx;
      position: absolute;
      z-index: 1;
      right: 0rpx;
      top: 140rpx;
      display: flex;
      justify-content: center;
      align-items: center;
      box-sizing: border-box;
      padding: 0 10rpx;
      line-height: 32rpx;

      font-size: 26rpx;
      font-family: PingFang SC;
      font-weight: 500;
      color: #333333;
    }
  }

  &-bd {
    background: #fff;
    margin-top: -2rpx;

    .list {
      padding: 1rpx 30rpx 40rpx;

      &-item {
        padding: 16rpx 0;
        display: flex;

        .pic {
          width: 260rpx;
          height: 260rpx;
          position: relative;

          image {
            border-radius: 10rpx;
            overflow: hidden;
          }

          .tag {
            width: 88rpx;
            height: 30rpx;
            position: absolute;
            z-index: 1;
            left: 0;
            top: 0;

            image {
              border-radius: 0;
            }
          }
        }

        .item-info {
          width: calc(100% - 260rpx);
          box-sizing: border-box;
          padding-left: 26rpx;
          display: flex;
          flex-flow: column nowrap;
          justify-content: space-around;

          .title {
            font-size: 28rpx;
            font-family: PingFang SC;
            font-weight: 500;
            color: #666666;
          }

          .price-num {
            display: flex;
            justify-content: space-between;
            align-items: center;

            .price {
              font-size: 28rpx;
              font-family: Source Han Sans CN;
              font-weight: 800;
              color: #333333;
              font-weight: bold;

              text {
                font-size: 32rpx;
              }
            }

            .num {
              font-size: 24rpx;
              font-family: PingFang SC;
              font-weight: 500;
              color: #999999;
            }
          }

          .pic {
            width: 76rpx;
            height: 76rpx;
            border-radius: 6rpx;
            margin: 0 5rpx;
          }
        }
      }

      // &-item + .list-item {
      //   border-top: 1px solid #eee;
      // }
    }
  }
}
</style>
