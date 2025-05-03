<template>
  <view class="vip" :class="'vip' + current">
    <uni-nav-bar title="VIP中心" color="#fff" leftIcon="left" backgroundColor="transparent" :border="false"
      :statusBar="true" :fixed="true" @clickLeft="$common.back()"></uni-nav-bar>
    <swiper class="swiper" easing-function="linear" circular :current="current" :indicator-dots="false" :autoplay="false"
      :interval="100" :duration="1000" @change="handleSwiperChange">
      <swiper-item v-for="(item, index) in vipList" :key="index">
        <view class="swiper-item">
          <view class="vip-card-wrap" :class="'vip-card-wrap' + index">
            <view class="vip-card">
              <view class="vip-top">
                <view class="vip-title">{{ item.name }}</view>
                <template v-if="userInfo.coin >= item.min_growth_points">
                  <view class="vip-desc">已达成</view>
                </template>
                <template v-else>
                  <view class="vip-desc">未达成</view>
                </template>

                <view class="vip-top-image">
                  <u-icon name="../../static/mine/vip.png" color="#fff" size="200"></u-icon>
                </view>
              </view>
              <view class="vip-center">
                <template>
                  <!-- <view>成长值需达到{{ item.min_growth_points }}, 当前{{ userInfo.coin }}</view> -->
                  <view class="vip-progress">
                    <u-line-progress active-color="#ffc904" :striped="true" :percent="item.percent"
                      :striped-active="true"></u-line-progress>
                    <view class="vip-progress-desc">
                      <!-- <view class="vip-progress-left">当前成长值{{ userInfo.coin }}</view> -->
                      <view class="vip-progress-right">当前等级总成长值为{{ item.min_growth_points }}</view>
                    </view>
                  </view>
                </template>
                <!-- <template v-else>
                  <view>未解锁, 成长值需达到{{ item.min_growth_points }}</view>
                </template> -->
                <view class="update-vip" @click="goRecharge">去升级</view>
              </view>
              <view class="rule">
                <view @click="show = true">会员规则></view>
              </view>
            </view>
          </view>
          <view class="vip-serve">
            <view class="serve-list">
              <view class="serve-item" v-for="(v, i) in serveList" :key="i">
                <image class="serve-img" @click="goDetail(i)"
                  :src="userInfo.coin >= item.min_growth_points ? v.activeIcon : v.icon" mode="widthFix" lazy-load="false"
                  binderror="" bindload="" />
                <view class="serve-title">{{ v.name }}</view>
                <template v-if="item.level == userInfo.vip_level">
                  <view class="serve-power" :class="[money_info && money_info.is_money ? 'serve-power-active' : '']"
                    v-if="i == 0" @click="getPower(0, item.money)">{{ money_info && money_info.is_money ? '已领取' : '领取' }}
                  </view>
                  <!-- <view class="serve-power" v-if="i == 1" @click="getPower(1)">可用</view> -->
                  <!-- <view class="serve-power" v-if="i == 2" @click="getPower(2)">{{ 0 }}/{{ item.ship_num }}</view> -->
                  <view class="serve-power" v-if="i == 2" @click="getPower(2, item.ship_num)">{{ shipnum_info &&
                    shipnum_info.is_ship ? `${shipnum_info.ship_num}` + '/' + `${item.ship_num}` :
                    '领取' }}</view>
                </template>
                <view class="serve-desc" v-if="i == 0">每月领{{ item.money }}余额</view>
                <view class="serve-desc" v-if="i == 1">积分抵扣商品</view>
                <view class="serve-desc" v-if="i == 2">每月{{ item.ship_num }}次包邮</view>
                <view class="serve-desc" v-if="i == 3">VIP专属客服</view>
              </view>
            </view>
            <view class="shop-title">
              <text>专属积分商城</text>(限制当前及以下等级购买)
            </view>
            <scroll-view class='scrollContainer' scroll-x>
              <view class="scrollwrap">
                <view class='scrollitem' v-for="(n, m) in item.vipList" :key="m" @click="buyScoreGoods(n)">
                  <image class="scrollimage" :src="n.thumb"></image>
                  <view class="recommandItemText title">{{ n.title }}</view>
                  <view class="recommandItemText score">{{ n.score }}积分</view>
                </view>
                <view class="empty">
                  <u-empty v-if="item.vipList.length == 0" text="暂无商品数据" mode="list"></u-empty>
                </view>

              </view>
            </scroll-view>

          </view>

          <!-- <view class="vip-tip" v-if="index > 0">更高级VIP解锁更多商品</view> -->
        </view>
      </swiper-item>
    </swiper>

    <u-popup v-model="show" mode="center" width="90%" border-radius="20">
      <view class="xc-rule">
        <view class="xc-rule-title">
          会员规则
        </view>
        <view class="xc-rule-content">
          <view v-html="vip_rule"></view>
        </view>
        <view class="xc-rule-btn">
          <view class="rule-btn" @click="show = false">我知道了</view>
        </view>
      </view>
    </u-popup>

  </view>
</template>

<script>
export default {
  name: 'vip',
  components: {

  },
  data () {
    return {
      userInfo: {},
      current: 0,
      vipList: [],
      serveList: [
        // {
        //   name: '自定义头像',
        //   icon: '../../static/vip/vip01.png',
        //   activeIcon: '../../static/vip/vip01-active.png',
        //   vip: [3, 4, 5, 6, 7, 8, 9, 10]
        // },
        // {
        //   name: '自定义昵称',
        //   icon: '../../static/vip/vip02.png',
        //   activeIcon: '../../static/vip/vip02-active.png',
        //   vip: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
        // },
        // {
        //   name: '道具奖励',
        //   icon: '../../static/vip/vip03.png',
        //   activeIcon: '../../static/vip/vip03-active.png',
        //   vip: [3, 4, 5, 6, 7, 8, 9, 10]
        // },
        // {
        //   name: '全屏公告',
        //   icon: '../../static/vip/vip04.png',
        //   activeIcon: '../../static/vip/vip04-active.png',
        //   vip: [7, 8, 9, 10]
        // },
        {
          name: '月月领余额',
          icon: '../../static/vip/vip06.png',
          activeIcon: '../../static/vip/vip06-active.png',
        },
        {
          name: '专属商城',
          icon: '../../static/vip/vip08.png',
          activeIcon: '../../static/vip/vip08-active.png',
        },
        {
          name: '提货免邮费',
          icon: '../../static/vip/vip05.png',
          activeIcon: '../../static/vip/vip05-active.png',
        },
        {
          name: '专属客服',
          icon: '../../static/vip/vip07.png',
          activeIcon: '../../static/vip/vip07-active.png',
        },
      ],
      show: false,
      money_info: {},
      shipnum_info: {},
      vip_rule: ""
    }
  },
  async onShow () {
    this.getUserInfo()
    this.$store.dispatch('getAppConfig').then((res) => {
      console.log(res);
      this.vip_rule = res.data.vip_rule
    })
  },
  computed: {
    vipShopList () {
      return []
    }
  },
  methods: {
    getUserInfo () {
      this.$store.dispatch('getUserInfo').then(res => {
        this.userInfo = res.data
        this.money_info = res.data.money_info
        this.shipnum_info = res.data.shipnum_info

        this.getVipList()
      })
    },
    handleSwiperChange (event) {
      this.current = event.detail.current;
    },
    getVipList () {
      this.req({
        url: '/v1/vip/list',
        data: {},
        Loading: true,
        success: res => {
          if (res.code == 200) {
            this.vipList = res.data.data.map(item => {
              let percent = (this.userInfo.coin / item.min_growth_points) * 100
              percent = percent.toFixed(0)
              if (percent > 100) {
                percent = 100;
              }
              return { ...item, percent: percent * 1 }
            })
            console.log(this.vipList)
          }
        }
      })
    },
    goRecharge () {
      this.$common.to({ url: '/package/mine/recharge' })
    },
    goDetail (i) {
      this.$common.to({ url: '/pages/mine/vipMallDetail', query: { index: i } })
    },
    getPower (index, item) {
      let that = this
      switch (index) {
        case 0:
          uni.showModal({
            title: '提示',
            content: '确认领取余额?',
            success: function (res) {
              if (res.confirm) {
                let data = {
                  index,
                  money: item
                }
                that.req({
                  url: '/v1/vip/getPower',
                  data,
                  Loading: true,
                  success: res => {
                    if (res.code == 200) {
                      uni.showToast({
                        title: res.msg,
                        icon: 'none',
                        mask: true
                      })
                      that.getUserInfo()
                    }
                  }
                })

              } else if (res.cancel) {
                console.log('用户点击取消');
              }
            }
          });
          break
        case 1:
          uni.showToast({
            title: '在下方商城选择你想要的商品',
            icon: 'none',
            mask: true
          })
          break
        case 2:
          uni.showModal({
            title: '提示',
            content: '确认领取包邮卡?',
            success: function (res) {
              if (res.confirm) {
                console.log('用户点击确定');
                let data = {
                  index,
                  ship_num: item
                }
                that.req({
                  url: '/v1/vip/getPower',
                  data,
                  Loading: true,
                  success: res => {
                    if (res.code == 200) {
                      uni.showToast({
                        title: res.msg,
                        icon: 'none',
                        mask: true
                      })
                      that.getUserInfo()
                    }
                  }
                })

              } else if (res.cancel) {
                console.log('用户点击取消');
              }
            }
          });
          break
      }
    },
    buyScoreGoods (item) {
      let that = this
      console.log(item)
      uni.showModal({
        title: '提示',
        content: '确认购买该商品',
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定');
            that.req({
              url: '/v1/vip/order',
              data: {
                id: item.id
              },
              Loading: true,
              success: res => {
                if (res.code == 200) {
                  uni.showToast({
                    title: res.msg,
                    icon: 'none',
                    mask: true
                  })
                  that.getUserInfo()
                }
              }
            })
          } else if (res.cancel) {
            console.log('用户点击取消');
          }
        }
      });

    }
  },
}
</script>

<style lang='scss' scoped>
.vip {
  background-color: #222333;
  width: 100%;
  min-height: 100vh;

  // ::v-deep .u-progress {
  //   width: 70%;
  // }

  .swiper {
    width: 100%;
    height: 85vh;
    position: relative;

    .swiper-item {
      width: 100%;
      height: 100%;
      padding: 0 20rpx;

      .vip-card-wrap {
        padding: 0 30rpx;

        .vip-card {
          color: #fff;
          width: 100%;
          margin-top: 80rpx;
          position: relative;
          background: linear-gradient(90deg, #a4aabf 0%, #cbd0e1 100%);
          border-radius: 40rpx;
          padding: 20rpx;

          .vip-top {
            display: flex;

            .vip-title {
              font-size: 80px;
              font-style: italic;
              font-weight: 700;
              position: absolute;
              left: -2rpx;
              top: -94rpx;
              color: #5b637e;
              font-family: "Microsoft YaHei", Arial, Helvetica, sans-serif, "宋体";
            }


            .vip-desc {
              font-size: 18px;
              position: absolute;
              left: 110px;
              top: 20rpx;
              color: #5b637e;
            }

            .vip-top-image {
              position: absolute;
              right: 0;
              top: -66rpx;

              .vip-img {
                width: 200rpx;
                height: 200rpx;

                image {
                  width: 100%;
                  height: 100%;
                  object-fit: cover;
                }
              }
            }

          }

          .vip-center {
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-top: 90rpx;

            .vip-progress {
              width: 70%;

              .vip-progress-desc {
                display: flex;
                justify-content: flex-end;
                margin-top: 20rpx;
              }
            }

            .update-vip {
              background-color: #f3f3f3;
              color: #999;
              padding: 10rpx 20rpx;
              border-radius: 10rpx;
            }
          }

          .rule {
            display: flex;
            justify-content: flex-end;
            margin-top: 100rpx;
            font-size: 16px;
            position: relative;
            z-index: 1;
          }
        }
      }

      .vip-serve {
        position: relative;
        top: -80px;
        background: url("../../static/vip/01.png") no-repeat;
        background-size: 100% 100%;
        width: 100%;
        color: #fff;
        height: 100%;
        word-wrap: break-word;
        padding: 0 20rpx;
        padding-top: 160rpx;


        .serve-list {
          display: flex;
          flex-wrap: wrap;

          .serve-item {
            width: 25%;
            text-align: center;
            position: relative;

            .serve-img {
              width: 80rpx;
              margin-bottom: 10rpx;
            }

            .serve-title {
              color: #737373;
              margin-bottom: 20rpx;
            }

            .serve-power {
              position: absolute;
              right: -30rpx;
              top: 0;
              border: 1px solid orange;
              padding: 10rpx 20rpx;
              font-size: 12px;
              border-radius: 20rpx;
              background-color: #171719;
              color: orange;
              z-index: 10;
            }

            .serve-power-active {
              border: 1px solid #999;
              color: #999;
            }

            .serve-desc {
              font-size: 12px;
              color: #999;
            }

          }
        }
      }

      .vip-tip {
        border: 4rpx solid #f1d5a4;
        background-color: #171718;
        color: #fff;
        padding: 20rpx 0;
        text-align: center;
        font-size: 16px;
        position: relative;
        top: -60px;
      }
    }
  }
}

.vip1 {
  background-color: #0f2e33;

  .vip-card-wrap1 {
    .vip-card {
      background: linear-gradient(90deg, #86b1b7 0%, #d4e4ea 100%) !important;

      .vip-title {
        color: #226b7a !important;
      }

      .vip-desc {
        color: #226b7a !important;
      }

      .update-vip {
        background: linear-gradient(45deg, #FFFFFF 0%, #99DAE9 100%) !important;
      }
    }

  }
}

.vip2 {
  background-color: #0f2133;

  .vip-card-wrap2 {
    .vip-card {
      background: linear-gradient(90deg, #46729b 0%, #7d9cbd 100%) !important;

      .vip-title {
        color: #335388 !important;
      }

      .vip-desc {
        color: #335388 !important;
      }

      .update-vip {
        background: linear-gradient(45deg, #FFFFFF 0%, #99ACD6 100%) !important;
        color: #335388 !important;
      }
    }

  }
}

.vip3 {
  background-color: #331c05;

  .vip-card-wrap3 {
    .vip-card {
      background: linear-gradient(90deg, #c7b291 0%, #d9cca9 100%) !important;

      .vip-title {
        color: #b77138 !important;
      }

      .vip-desc {
        color: #b77138 !important;
      }

      .update-vip {
        background: linear-gradient(45deg, #FFFFFF 0%, #ECC599 100%) !important;
        color: #b77138 !important;
      }
    }

  }
}

.vip4 {
  background-color: #0f2f33;

  .vip-card-wrap4 {
    .vip-card {
      background: linear-gradient(90deg, #46b17c 0%, #8be8b6 100%) !important;

      .vip-title {
        color: #7ae8ca !important;
      }

      .vip-desc {
        color: #0f2f33 !important;
      }

      .update-vip {
        background: linear-gradient(45deg, #FFFFFF 0%, #B3F2E3 100%) !important;
        color: #7ae8ca !important;
      }
    }

  }
}

.vip5 {
  background-color: #103849;

  .vip-card-wrap5 {
    .vip-card {
      background: linear-gradient(90deg, #3ac7fd 0%, #9be1ff 100%) !important;

      .vip-title {
        color: #379bd0 !important;
      }

      .vip-desc {
        color: #226b7a !important;
      }

      .update-vip {
        background: linear-gradient(45deg, #FFFFFF 0%, #C3E3FF 100%) !important;
        color: #6bd4fe !important;
      }
    }

  }
}

.vip6 {
  background-color: #4e1938;

  .vip-card-wrap6 {
    .vip-card {
      background: linear-gradient(90deg, #f689d7 0%, #feaee5 100%) !important;

      .vip-title {
        color: #c04894 !important;
      }

      .vip-desc {
        color: #fb70c6 !important;
      }

      .update-vip {
        background: linear-gradient(45deg, #FFFFFF 0%, #FF8FCA 100%) !important;
        color: #fb70c6 !important;
      }
    }

  }
}

.vip7 {
  background-color: #1b0f33;

  .vip-card-wrap7 {
    .vip-card {
      background: linear-gradient(90deg, #9f5dff 0%, #d8b3ff 100%) !important;

      .vip-title {
        color: #8437ff !important;
      }

      .vip-desc {
        color: #8437ff !important;
      }

      .update-vip {
        background: linear-gradient(45deg, #FFFFFF 0%, #D8BEFF 100%) !important;
        color: #8437ff !important;
      }
    }

  }
}

.vip8 {
  background-color: #331f0a;

  .vip-card-wrap8 {
    .vip-card {
      background: linear-gradient(90deg, #ebc693 0%, #fce2ba 100%) !important;

      .vip-title {
        color: #cc853a !important;
      }

      .vip-desc {
        color: #cc853a !important;
      }

      .update-vip {
        background: linear-gradient(45deg, #FFFFFF 0%, #FFDDA8 100%) !important;
        color: #cc853a !important;
      }
    }

  }
}

.vip9 {
  background-color: #5d0a34;

  .vip-card-wrap9 {
    .vip-card {
      background: linear-gradient(90deg, #f74b6e 0%, #eb4688 100%) !important;

      .vip-title {
        color: #ffe6b3 !important;
      }

      .vip-desc {
        color: #ffe6b3 !important;
        left: 165px !important;
      }

      .update-vip {
        background: linear-gradient(45deg, #FFFFFF 0%, #F9A0CA 100%) !important;
        color: #f42b67 !important;
      }
    }

  }
}



.xc-rule {
  padding: 30rpx;
  padding-bottom: 50rpx;
  background-color: #f6dec5;

  .xc-rule-title {
    font-size: 24px;
  }

  .xc-rule-content {
    margin: 40rpx 0;
    line-height: 50rpx;
  }

  .xc-rule-btn {
    display: flex;
    justify-content: center;
    margin-top: 50rpx;

    .rule-btn {
      background: linear-gradient(45deg, #7a1ecc 0%, #373dcc 100%);
      width: 100%;
      text-align: center;
      color: #fff;
      padding: 30rpx 0;
      font-size: 16px;
      border-radius: 100rpx;
    }
  }
}
</style>

<style lang="scss">
.shop-title {
  margin-top: 50rpx;
  color: #fff;
  font-size: 14px;

  text {
    color: orange;
    margin-right: 10rpx;
    font-weight: 700;
    font-size: 16px;
  }
}

.scrollContainer {
  margin-top: 20rpx;
  width: 100%;
  // height: 100vh;
  white-space: nowrap;
}

.scrollwrap {
  display: flex;
  // flex-wrap: wrap;
}

.scrollitem {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-right: 20rpx;
  margin-bottom: 20rpx;
  width: 31%;
  text-align: center;
  border: 1px solid #666;
  padding: 10rpx 20rpx;
  border-radius: 10px;

  &:nth-child(3n) {
    // margin-right: 0;
  }
}

.scrollimage {
  width: 77px;
  height: 77px;
  margin-bottom: 10rpx;
}

.recommandItemText {
  text-align: center;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}

.title {
  font-size: 14px;
  margin-bottom: 20rpx;
}

.score {
  font-size: 14px;
}

.EmptyData {
  width: 100%;
  text-align: center;
  margin-top: 50rpx;
}

.empty {
  width: 100%;
  margin: 0 auto;
  margin-top: 100rpx;
}
</style>