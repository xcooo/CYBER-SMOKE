<!--
 * @Date: 2022-11-21 15:10:27
 * @LastEditTime: 2024-01-26 15:36:37
 * @Description: content
-->
<template>
  <view class="page-wrap common_bg">
    <view class="page-wrap-hd">
      <view @click="$common.to({ url: '/package/mine/bag' })" class="bag-btn">
        <view class="icon">
          <cimage src="/static/icon/bag.png" mode="scaleToFill" />
        </view>
        盒柜
      </view>
      <view @click="$common.toRule(2)" class="rule-btn">活动规则</view>
      <view class="fhsm" v-if="ggao[0]">
        <u-notice-bar mode="horizontal" type="none" :list="ggao"></u-notice-bar>
      </view>
      <!-- <view class="xc-tip">
        <view>盲盒抽赏存在概率性,请理性消费</view>
        <view>常规地区邮费10元, 可用余额抵扣，7天内发货</view>
      </view> -->
    </view>

    <scroll-view scroll-y class="page-wrap-bd">
      <mescroll-body ref="mescrollRef" @init="mescrollInit" @down="downCallback" @up="getList" :down="downOption"
        :up="upOption">
        <view class="header-box">
          <view class="magic-box">
            <view class="left-box">
              <h3 class="title">
                {{ site_title }}
              </h3>
              <view class="particulars">
                <view class="details">
                  <view class="details-icon">
                    <image src="https://xcooo.oss-cn-hangzhou.aliyuncs.com/wxapp/open-box.png" mode="aspectFill"></image>
                  </view>
                  <view class="details-text">
                    在线开盒
                  </view>
                </view>
                <view class="details">
                  <view class="details-icon">
                    <image src="https://xcooo.oss-cn-hangzhou.aliyuncs.com/wxapp/pinkage.png" mode="aspectFill"></image>
                  </view>
                  <view class="details-text">
                    三件包邮
                  </view>
                </view>
                <view class="details">
                  <view class="details-icon">
                    <image src="https://xcooo.oss-cn-hangzhou.aliyuncs.com/wxapp/safeguard.png" mode="aspectFill"></image>
                  </view>
                  <view class="details-text">
                    正品保障
                  </view>
                </view>
              </view>
            </view>
            <view class="right-box">
              <image src="https://xcooo.oss-cn-hangzhou.aliyuncs.com/wxapp/gameplay.png" mode=""></image>
              <image src="https://xcooo.oss-cn-hangzhou.aliyuncs.com/wxapp/service.png" mode=""></image>
            </view>
          </view>
          <view class="uni-margin-wrap">
            <swiper indicator-color="rgb(125, 123, 120)" indicator-active-color="#fff" class="swiper" circular
              indicator-dots autoplay :interval="interval">
              <swiper-item>
                <view class="swiper-item">
                  <image src="https://xcooo.oss-cn-hangzhou.aliyuncs.com/wxapp/huawei.png" mode="scaleToFill"></image>
                </view>
              </swiper-item>
              <swiper-item>
                <view class="swiper-item">
                  <image src="https://xcooo.oss-cn-hangzhou.aliyuncs.com/wxapp/faddish.png" mode="scaleToFill"></image>
                </view>
              </swiper-item>
              <swiper-item>
                <view class="swiper-item">
                  <image src="https://xcooo.oss-cn-hangzhou.aliyuncs.com/wxapp/acquire.png" mode="scaleToFill"></image>
                </view>
              </swiper-item>
            </swiper>
          </view>
          <view class="recommend">
            <image src="https://xcooo.oss-cn-hangzhou.aliyuncs.com/wxapp/everyday.png" mode="aspectFit"></image>
            <view class="interval"></view>
            <image src="https://xcooo.oss-cn-hangzhou.aliyuncs.com/wxapp/pFmGOHJ.png" mode="aspectFit"></image>
          </view>
        </view>
        <view class="shop-nav">
          <view class="shop-nav-item" @click="changeNav(1)" :class="shop_nav == 1 ? 'active' : ''">推荐</view>
          <view class="shop-nav-item" @click="changeNav(2)" :class="shop_nav == 2 ? 'active' : ''">人气</view>
          <view class="shop-nav-item" @click="changeNav(3)" :class="shop_nav == 3 ? 'active' : ''">特惠</view>
          <view class="shop-nav-item" @click="changeNav(4)" :class="shop_nav == 4 ? 'active' : ''">手机</view>
          <view class="shop-nav-item" @click="changeNav(5)" :class="shop_nav == 5 ? 'active' : ''">数码</view>
          <view class="shop-nav-item" @click="changeNav(6)" :class="shop_nav == 6 ? 'active' : ''">新品</view>
          <view class="nav-tab"></view>
        </view>
        <!-- <view class="roll-tip">
          <uni-notice-bar color="#666" showIcon scrollable single :speed="30"
            text="一切在本平台之外而引致之任何意外、疏忽、合约毁坏、诽谤、版权或知识产权侵犯等及其所造成的财产损失，本平台概不负责，亦不承担任何法律责任，建议受损失的用户找其平台处理。"></uni-notice-bar>
        </view> -->

        <view class="list-box">

          <view @click="toDetail(item)" v-for="(item, i) of listData" :key="i">
            <view class="purchase-box" v-if="i == 0">
              <view class="purchase-details">
                <cimage class="purchase-details-image" :src="item.thumb" mode="scaleToFill" />
                <view class="details">
                  <h3 class="overflow">{{ item.title }}</h3>
                  <view class="hint overflow">
                    每抽必中，绝无空盒
                  </view>
                  <view class="price-box">
                    <view class="price-main">
                      <view class="price">
                        <view class="spacing">

                        </view>
                        <view class="price-details">
                          <text class="new-price">￥{{ item.price }}</text><text class="old-price">￥399</text>
                        </view>
                      </view>
                      <view class="acquisition">
                        <view class="immediately">
                          马上买
                        </view>
                        <view class="already">
                          {{ item.sales }}已购买
                        </view>
                      </view>
                    </view>
                    <view class="orange-btn">

                    </view>
                  </view>
                  <gbro-marquee broadcastType="mould" direction="left" :viewHeight="76" :imgdata="item.awardList"
                    :broadcastStyle="{ speed: 40 }" style="width: 100%">
                    <block v-for="c in 2" :key="c">
                      <view v-for="(a, b) in item.awardList.slice(0, 15)" :key="b" class="pic">
                        <cimage :src="a" />
                      </view>
                    </block>
                  </gbro-marquee>
                </view>
              </view>
            </view>
            <view class="shop-box" v-else>
              <view class="shop-image-box">
                <!-- 这个是商品图片 -->
                <cimage :src="item.thumb" mode="scaleToFill" />
                <!-- <image class="shop-image" :src="item.thumb" mode="aspectFit"></image> -->

                <view class="count-down-hint">
                  <view class="hint">
                    倒计时
                  </view>
                </view>
                <view class="count-down-box">
                  <uni-countdown splitorColor="#fff" color="#fff" :show-day="false" :hour="12" :minute="12"
                    :second="12" />
                </view>
              </view>
              <view class="shop-details">
                <view class="shop-title overflow">
                  {{ item.title }}
                </view>
                <view class="shop-hint overflow">
                  每5发大概率出传说/欧皇/稀有大概率出必出传说/欧皇/稀有大概率出必出传说/欧皇
                </view>
                <view class="shop-reduced-box">
                  <view class="shop-reduced">
                    最高优惠453元
                  </view>
                </view>
                <view class="shop-discount">
                  <view class="shop-discount-left">
                    <text class="discount-hint">折扣价￥</text>
                    <text class="discount-price">{{ item.price }}</text>
                    <text class="old-price">￥688</text>
                  </view>
                  <view class="shop-discount-right">
                    {{ item.sales }}人已购买
                  </view>
                </view>

                <view class="shop-price-box">
                  <view class="shop-price-left">
                    <view class="percentage">
                      100%
                    </view>
                    <view class="guarantee">
                      保底必中
                    </view>
                  </view>
                  <view class="shop-price-right">
                    89-9999元
                  </view>
                </view>
                <gbro-marquee broadcastType="mould" direction="left" :viewHeight="76" :imgdata="item.awardList"
                  :broadcastStyle="{ speed: 40 }" style="width: 100%">
                  <block v-for="c in 2" :key="c">
                    <!--在小程序里遇到一个坑不能使用两个slot 所有统一复制一份做衔接 -->
                    <view v-for="(a, b) in item.awardList.slice(0, 15)" :key="b" class="pic">
                      <cimage :src="a" />
                    </view>
                  </block>
                </gbro-marquee>
              </view>
            </view>
          </view>
        </view>
      </mescroll-body>
    </scroll-view>
  </view>
</template>

<script>
import {
  mapGetters
} from 'vuex'
import uniCountdown from '@/components/uni-countdown/uni-countdown.vue'
export default {
  components: {
    uniCountdown
  },
  data () {
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
      swiperList: '',
      userInfo: [],
      msgType: '',
      popContent: '',
      site_title: '',
      ggao: [],
      interval: 2000,
      shop_nav: 1
      // ggao:[
      // 	{''}
      // ],
    }
  },

  onShareAppMessage () {
    return {
      title: `开盲盒 赢好礼!`,
      path: `/pages/box/box`
    }
  },
  onShow () {
    console.log(123)
  },
  onLoad (options) {
    // this.chouhegonggao()
    this.$store.dispatch('getAppConfig').then((res) => {
      console.log(res);
      this.popContent = res.data.pop_con
      this.site_title = res.data.site_title
    })

    console.log('参数', options)
    if (options.invite_code) {
      uni.setStorageSync('invite_code', options.invite_code);
    }

    if (options.scene) {
      let invite_code = decodeURIComponent(options.scene)
      let index = invite_code.indexOf('=') + 1
      if (index > 0) {
        invite_code = invite_code.slice(index, invite_code.length)
        uni.setStorageSync('invite_code', invite_code);
      } else {
        uni.setStorageSync('invite_code', invite_code);
      }
    }
    /* 获取轮播图 */
    this.$common.getBanner(3).then(res => {
      this.swiperList = res
    })

  },

  onReady () {
    this.getLog()
  },

  onUnload () {
    clearTimeout(this.barrageTimer)
    this.barrageTimer = null
  },
  computed: {
    ...mapGetters(['sysConfig'])
  },
  methods: {
    dialogClose () {
      console.log('点击关闭')
    },
    /*
    打开手机号弹窗
    */
    dialogToggle (type) {
      this.msgType = type
      this.$refs.alertDialog.open()
    },
    dialogConfirm () {
      this.$common.to({
        url: '/package/mine/account-safe',
      })
    },
    /**
     * @description: 中奖记录
     * @return {*}
     */
    getLog () {
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
    getList ({
      num,
      size
    }) {
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
    toDetail (item) {
      this.$common.to({
        url: '/package/box/box-detail',
        query: {
          id: item.id
        }
      })
    },

    /**
     * @description: 抽盒公告
     * @return {*}
     */
    chouhegonggao () {
      this.req({
        url: '/v1/box/chouhegonggao',
        data: {},
        Loading: true,
        success: res => {
          if (res.code == 200) {
            this.ggao.push(res.data[0].val);
            // this.logList = res.data

            // this.runBarrage()
          }
        }
      })
    },
    /**
     * @description: 发送弹幕
     * @param {*}
     * @return {*}
     */
    runBarrage () {
      this.barrageTimer = setInterval(() => {
        if (this.logList.length > 0) {

          this.$refs.detailBarrage?.add({
            head_pic: this.logList[this.barrageCur].avatar,
            title: this.logList[this.barrageCur].title,
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
    },
    //人气 特惠 超值  特惠 手机 数码 新品
    changeNav (e) {
      this.shop_nav = e
    },
  }
}
</script>

<style lang="scss">
page {
  height: 100%;
}

.page-wrap {
  // padding-top: 460rpx;
  background: #fff;
  width: 750rpx;
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
  height: 100%;
  position: relative;

  &-hd {
    // position: relative;
    // left: 0;
    // top: 0;
    // z-index: 5;

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
      height: 200rpx;
      position: absolute;
      bottom: 50rpx;
      left: 0;
      box-sizing: border-box;
      padding: 0 70rpx;
    }

    .log-item {
      display: inline-flex;
      height: 46rpx;
      align-items: center;
      padding: 0 14rpx;
      box-sizing: border-box;
      // width: 360rpx;
      margin-bottom: 14rpx;

      .avatar {
        width: 35rpx;
        height: 35rpx;
        border-radius: 50%;
        overflow: hidden;
      }

      .nick-name {
        width: 70rpx;
        font-size: 20rpx;
        font-family: PingFang SC;
        font-weight: bold;
        color: #333333;
        margin-left: 10rpx;
      }

      .prize {
        margin-left: 10rpx;
        font-size: 20rpx;
        font-family: PingFang SC;
        font-weight: bold;
        color: #333333;

        text {
          margin-left: 10rpx;
          color: #666ef2;
        }
      }

      .pic {
        margin-left: 30rpx;
        width: 35rpx;
        height: 35rpx;
      }
    }

    .bag-btn {
      word-wrap: break-word;
      word-break: break-all;
      width: 45rpx;
      height: 145rpx;
      background: rgba(255, 255, 255, 0.9);
      border-radius: 0rpx 10rpx 10rpx 0rpx;
      // border-radius: 10rpx 0rpx 0rpx 10rpx;
      display: flex;
      flex-flow: column nowrap;
      justify-content: center;
      align-items: center;
      text-align: center;
      position: absolute;
      z-index: 99999;
      left: 0;
      top: 160rpx;

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
      z-index: 9999;
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


  .header-box {
    padding: 20rpx;
    // #ifdef H5
    background: url(https://s11.ax1x.com/2024/01/25/pFmVOJJ.jpg) repeat fixed center;
    // #endif
    // #ifdef MP
    background: url(https://s11.ax1x.com/2024/01/25/pFmVOJJ.jpg) repeat fixed center;
    // #endif
    background-size: 100% auto;
    // height: 1000rpx;
    padding-bottom: 0;
  }

  .magic-box {
    position: relative;
    width: 100%;
    height: 100rpx;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .right-box {
      display: flex;

      image {
        width: 60rpx;
        height: 60rpx;
        margin: 0 10rpx;
      }
    }

    .left-box {

      .title {
        font-size: 32rpx;
        font-style: italic;
      }

      .particulars {
        display: flex;

        .details {
          display: flex;
          align-items: center;
          margin-right: 10rpx;
          overflow: hidden;

          .details-icon {

            width: 60rpx;
            height: 60rpx;

            image {
              width: 100%;
              height: 100%;
            }
          }

          .details-text {
            font-size: 20rpx;
            color: rgb(80, 54, 26);
          }
        }
      }
    }
  }

  .uni-margin-wrap {
    width: 100%;
    margin-bottom: 20rpx;
  }

  .swiper {
    height: 250rpx;
  }

  .swiper-item {
    display: block;
    height: 250rpx;
    border-radius: 10rpx;
    // line-height: 300rpx;
    text-align: center;

    image {
      width: 100%;
      height: 100%;
    }
  }

  .swiper-list {
    margin-top: 40rpx;
    margin-bottom: 0;
  }

  .uni-common-mt {
    margin-top: 60rpx;
    position: relative;
  }

  .info {
    position: absolute;
    right: 20rpx;
  }

  .uni-padding-wrap {
    width: 550rpx;
    padding: 0 100rpx;
  }

  .recommend {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .interval {
      width: 40rpx;
    }

    image {
      width: 100%;
      height: 204rpx;
      border-radius: 20rpx;
    }
  }

  .shop-nav {
    display: flex;
    width: 100%;
    height: 90rpx;
    background: #fff;
    overflow: hidden;

    &-item {
      width: 25%;
      height: 100%;
      text-align: center;
      line-height: 90rpx;
      font-size: 28rpx;
      transition: all .2s;
      position: relative;

      &:after {
        position: absolute;
        content: '';
        width: 0;
        left: 0;
        // height: 6rpx;
        bottom: 0;
        border-radius: 6rpx;
        // background: rgba(246, 215, 154,0);
        transition: width .3s;
      }
    }

    .active {
      font-weight: bold;
      font-size: 32rpx;
      position: relative;
      color: rgb(215, 60, 57);

      &:after {
        position: absolute;
        content: '';
        width: 40%;
        left: 30%;
        // height: 6rpx;
        background: rgba(246, 215, 154, 0);
        bottom: 0;
        border-radius: 6rpx;
        box-shadow: 0 0 15px 10px rgb(246, 215, 154);
      }
    }
  }

  .list-box {
    padding: 20rpx;
    background-color: rgb(246, 246, 246);

    .purchase-box {
      position: relative;
      width: 100%;
      // height: 350rpx;
      border-radius: 20rpx;
      // #ifdef H5
      background: url(https://s11.ax1x.com/2024/01/25/pFmZYyq.png) no-repeat;
      // #endif
      // #ifdef MP
      background: url(https://s11.ax1x.com/2024/01/25/pFmZYyq.png) no-repeat;
      // #endif
      background-size: 100% 100%;
      padding: 30rpx 10rpx 10rpx;
      margin-bottom: 20rpx;

      .purchase-details {
        display: flex;
        align-items: flex-end;
        justify-content: space-between;

        .purchase-details-image {
          width: 250rpx;
          height: 250rpx;
          border-radius: 20rpx;
          margin-right: 20rpx;
        }

        .details {
          flex: 1;
          height: 320rpx;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          justify-content: space-between;

          .title {
            margin-bottom: 20rpx;
          }

          .hint {
            font-size: 24rpx;
            color: #000;
            margin-bottom: 20rpx;
          }

          .price-box {
            width: 100%;
            height: 80rpx;
            position: relative;

            .orange-btn {
              position: absolute;
              width: 100%;
              height: 100%;
              bottom: -10rpx;
              left: 0;
              background-color: #f68228;
              border-radius: 20rpx;
            }

            .price-main {
              display: flex;
              align-self: center;
              justify-content: space-between;
              position: absolute;
              top: 0;
              left: 0;
              z-index: 1;
              width: 100%;
              height: 100%;
              border-radius: 20rpx;
              border: 1px solid #d4cba9;
              overflow: hidden;

              .price {
                flex: 0.4;
                // display: flex;
                background-color: #fbf6d9;

                .spacing {
                  height: 20rpx;
                }

                .price-details {
                  display: flex;
                  align-items: flex-end;
                  justify-content: center;
                }

                .new-price {
                  font-size: 24rpx;
                  color: rgb(15, 14, 11);
                  font-weight: 600;
                }

                .old-price {
                  font-size: 18rpx;
                  color: rgb(175, 167, 148);
                  position: relative;

                  &:after {
                    content: '';
                    position: absolute;
                    top: 49%;
                    left: 0rpx;
                    width: 100%;
                    height: 2rpx;
                    background-color: rgb(175, 167, 148);
                  }
                }
              }
            }
          }

          .acquisition {
            flex: 0.6;
            display: flex;
            flex-direction: column;
            align-items: center;
            background-color: #000;

            // padding: 10rpx;
            .immediately {
              font-size: 32rpx;
              color: #c9b473;
              font-weight: 600;
              // margin-bottom: 10rpx;
            }

            .already {
              font-size: 18rpx;
              color: #c9b473;
            }
          }
        }


      }
    }

    .others {
      display: flex;
      align-items: center;

      .others-image {
        width: 50rpx;
        height: 50rpx;
        margin-right: 10rpx;

        &:last-child {
          margin-right: 0;
        }
      }
    }

    .shop-box {
      border-radius: 20rpx;
      background-color: #fff;
      display: flex;
      align-items: center;
      padding: 20rpx 12rpx;
      justify-content: space-between;
      margin-bottom: 20rpx;

      .shop-image-box {
        width: 300rpx;
        height: 300rpx;
        border-radius: 10rpx;
        margin-right: 20rpx;
        position: relative;
        overflow: hidden;

        .shop-image {
          width: 100%;
          height: 100%;
        }

        .time-limit {
          position: absolute;
          top: 0;
          left: 5%;
          z-index: 1;
          width: 200rpx;
          height: 50rpx;
        }

        .astrict {
          position: absolute;
          top: 5%;
          left: 0%;
          z-index: 10;
          width: 160rpx;
          height: 160rpx;
        }

        .count-down-box {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          line-height: 50rpx;
          height: 50rpx;
          display: flex;
          justify-content: flex-end;
          // background-color: #f66338;
          background: linear-gradient(to right, #f7663a, #f3394d);
          color: #fff;
          font-size: 20rpx;
        }

        .count-down-hint {
          z-index: 10;
          position: absolute;
          bottom: 0;
          left: -20rpx;
          width: 150rpx;
          height: 60rpx;
          text-align: center;
          line-height: 60rpx;
          transform: skew(30deg);
          border-radius: 0 20rpx 0 0;
          background: linear-gradient(to right, #f27a31, #f9c238);

          .hint {
            transform: skew(-30deg);
            font-size: 28rpx;
            color: #fff;
          }
        }
      }

      .shop-details {
        flex: 1;
        overflow: hidden;
      }

      .shop-price-box {
        display: flex;
        width: 320rpx;
        border-radius: 50rpx;
        height: 50rpx;
        align-items: center;
        justify-content: center;
        overflow: hidden;
        margin-bottom: 10rpx;

        .shop-price-left {
          flex: 1;
          background-color: rgb(242, 95, 43);
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 0 10rpx;

          .percentage {
            font-size: 20rpx;
            width: 50rpx;
            height: 50rpx;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #fff;
            background-color: rgb(240, 108, 53);
            text-align: center;
          }

          .guarantee {
            flex: 1;
            height: 100%;
            text-align: center;
            font-size: 20rpx;
            color: #fff;
          }
        }

        .shop-price-right {
          flex: 1;
          text-align: center;
          display: flex;
          align-items: center;
          justify-content: center;
          height: 50rpx;
          font-size: 20rpx;
          background-color: rgb(247, 224, 231);
          color: rgb(207, 110, 119);
        }
      }

      .shop-discount {
        display: flex;
        justify-content: space-between;
        align-items: flex-end;
        margin: 5rpx 0;
        margin: 15rpx 0;
        margin-bottom: 20rpx;
      }

      .shop-discount-left {
        display: flex;
        flex-shrink: 0;
        align-items: flex-end;

        .discount-hint {
          font-size: 20rpx;
          color: rgb(206, 146, 141);
        }

        .discount-price {
          font-size: 30rpx;
          color: rgb(220, 64, 44);
          font-weight: 600;
        }

        .old-price {
          font-size: 20rpx;
          color: rgb(154, 154, 154);
          position: relative;

          &:after {
            content: '';
            position: absolute;
            top: 49%;
            left: 0rpx;
            width: 100%;
            height: 2rpx;
            background-color: rgb(175, 167, 148);
          }
        }
      }

      .shop-discount-right {
        font-size: 20rpx;
        color: rgb(154, 154, 154);
        text-align: right;
      }

      .shop-reduced-box {
        display: flex;

        .shop-reduced {
          padding: 2rpx 10rpx;
          font-size: 24rpx;
          color: #fff;
          background: linear-gradient(to right, #e243e7, #6b30f5);
          border-radius: 10rpx;
        }
      }

      .shop-hint {
        font-size: 24rpx;
        color: #5a5a5a;
        margin-bottom: 10rpx;
      }

      .shop-title {
        font-size: 28rpx;
        font-weight: 500;
        margin-bottom: 10rpx;
      }
    }
  }

  .overflow {
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }

  .scroll-view_H {
    display: inline-block;
    width: 100%;
    height: 300rpx;
    line-height: 300rpx;
    text-align: center;
    font-size: 36rpx;
  }

  .pic {
    width: 76rpx;
    height: 76rpx;
    border-radius: 6rpx;
    margin: 0 5rpx;
  }

  .page-wrap-bd {
    flex: 1;
    overflow: hidden;
  }

  .roll-tip {
    width: 690rpx;
    margin: 20rpx auto 0;
    border-radius: 10rpx;
    overflow: hidden;
    background: #fff;

    ::v-deep.uni-noticebar {
      margin-bottom: 0;
      background: none !important;
    }
  }
}
</style>