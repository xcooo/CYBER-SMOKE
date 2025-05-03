<template>
  <view class="vipMallDetail">
    <uni-nav-bar title="会员特权" color="#fff" leftIcon="left" backgroundColor="transparent" :border="false" :statusBar="true"
      :fixed="true" @clickLeft="$common.back()"></uni-nav-bar>
    <swiper class="swiper" easing-function="linear" indicator-active-color="#f1d5a4" circular :current="current"
      :indicator-dots="true" :autoplay="false" :interval="100" :duration="1000" previous-margin='50rpx'
      next-margin='50rpx' @change="handleSwiperChange">
      <swiper-item v-for="(item, index) in serveList" :key="index">
        <view class="swiper-item" :class="[current === index ? 'active-item' : '']">
          <view class="vip-card-wrap">
            <view class="vip-card">
              <image class="vip-card-img" src="../../static/vip/privilege.png" mode="widthFix" lazy-load="false"
                binderror="" bindload="" />
              <view class="vip-content">
                <view class="vip-icon-wrap">
                  <view class="vip-icon">
                    <image class="vip-icon-img" :src="item.icon" mode="widthFix" lazy-load="false" binderror=""
                      bindload="" />
                  </view>
                </view>
                <view class="vip-title">{{ item.name }}</view>
              </view>
              <view class="vip-desc">
                <view class="vip-desc-title">权益说明</view>
                <view class="vip-desc-content" v-html="item.content">

                </view>
              </view>
            </view>
          </view>
        </view>
      </swiper-item>
    </swiper>
  </view>
</template>

<script>
export default {
  name: 'vipMallDetail',
  components: {

  },
  data () {
    return {
      current: 0,
      serveList: [
        // {
        //   name: '自定义头像',
        //   icon: '../../static/vip/user.png',
        //   content: `<p>1.用户成功升级VIP可自定义头像。</p>
        //           <p>2.用户更改头像后，将随同账号头像在平台公开展示。</p>
        //           <p>3.VIP10用户可享定制头像框服务(详情请联系客服)。</p>`
        // },
        // {
        //   name: '自定义昵称',
        //   icon: '../../static/vip/nickname.png',
        //   content: `<p>1.用户成功升级VIP可自定义昵称。</p>
        //           <p>2.昵称一经改变后永久生效, 以前的昵称视为自主放弃。</p>`
        // },
        // {
        //   name: '道具奖励',
        //   icon: '../../static/vip/specialEffects.png',
        //   content: `<p>1.所有道具将在VIP用户每月首次登录平台自动发放。</p>
        //           <p>2.所有道具都具有时限，超过时限的道具将会失效并无法使用。</p>
        //           `
        // },
        // {
        //   name: '全屏公告',
        //   icon: '../../static/vip/notice.png',
        //   content: `<p>1.VIP7及以上用户专属特权。</p>
        //           <p>2.当用户抽中传说时，将会在平台首页、赏池等特定区域公开展示玩家的特效通知。</p>
        //           `
        // },
        {
          name: '月月领余额',
          icon: '../../static/vip/yabi.png',
          content: `<p>1.用户成功升级VIP及以上等级时, 每月可以领取余额奖励。</p>
                  <p>2.不同VIP等级, 奖励的余额额度不同。</p>
                  <p>3.用户成功升级奖励的余额将自动发放至账户余额。</p>
                  `
        },
        {
          name: '专属商城',
          icon: '../../static/vip/notice.png',
          content: `<p>1.VIP专属商城商品兑换功能目前仅针对VIP以上用户开放。</p>
          <p>2.VIP专属商城商品库存和账号兑换次数都具有限制,非质量问题，一经兑换，无法退换货，请谨慎兑换。</p>
          <p>3.VIP用户不可跨等级兑换商品(如VIP4用户不可兑换VIP3等级的商品)。</p>
          <p>4.用户若当月己无法在专属商城继续兑换商品可通过VIP升级刷新账号可兑换次数。</p>
          `
        },
        {
          name: '提货免邮费',
          icon: '../../static/vip/freeShipping.png',
          content: `<p>1.VIP用户享受包邮福利</p>
                  <p>2.包邮福利将在用户成功升级VIP后自动发放至账户, 用户可在提货页面查看相应权益。</p>
                  <p>3.特殊商品或偏远地区可能涉及运费差价，具体以提货详情页提示为准。</p>
                  `
        },
        {
          name: '专属客服',
          icon: '../../static/vip/server.png',
          content: `<p>VIP及以上用户可享专属客服一对一服务。</p>`
        },
      ],
    }
  },
  computed: {
  },
  onShow () {
    let pagearr = getCurrentPages();//获取应用页面栈
    let currentPage = pagearr[pagearr.length - 1];//获取当前页面信息
    let options = currentPage.options
    this.current = options.index
  },
  methods: {
    handleSwiperChange (event) {
      this.current = event.detail.current;
    },
  },
}
</script>

<style lang='scss' scoped>
.vipMallDetail {
  background-color: #222333;
  min-height: 100vh;


  .swiper {
    width: 100%;
    height: 85vh;
    border-radius: 20rpx;
    position: relative;

    .swiper-item {
      width: 100%;
      height: 80vh;
      padding: 0 20rpx;

      .vip-card-wrap {
        padding: 0 10rpx;
        height: 100%;

        .vip-card {
          color: #fff;
          width: 100%;
          height: 79vh;
          margin-top: 50rpx;
          position: relative;
          background: linear-gradient(90deg, #5e5a83 0%, #4d496f 100%);
          border-radius: 20rpx;

          .vip-content {
            padding: 30rpx;

            .vip-icon-wrap {
              width: 100%;
              display: flex;
              justify-content: center;
              position: relative;
              z-index: 1;
              margin-top: -95rpx;

              .vip-icon {
                background: #2f1d35;
                padding: 20rpx;
                border-radius: 50%;

                .vip-icon-img {
                  width: 70rpx;
                }
              }
            }

            .vip-title {
              text-align: center;
              margin-top: 20rpx;
              color: #ebc68b;
              font-size: 18px;
            }
          }

          .vip-desc {
            padding: 30rpx;

            .vip-desc-title {
              font-size: 18px;
              display: flex;
              align-items: center;

              &::before {
                content: "";
                display: inline-block;
                width: 10rpx;
                height: 40rpx;
                border-radius: 20rpx;
                background: #f1d5a4;
                margin-right: 20rpx;
              }
            }

            .vip-desc-content {
              margin-top: 40rpx;

              p {
                margin-bottom: 10rpx;
                line-height: 50rpx;
              }
            }
          }
        }
      }
    }

    .active-item {
      transform: scale(1.05);
      transition: all 0.2s ease-in 0s;
    }
  }
}
</style>