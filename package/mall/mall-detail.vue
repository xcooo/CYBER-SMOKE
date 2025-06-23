<!--
 * @Date: 2022-12-06 08:57:16
 * @LastEditTime: 2024-05-26 11:52:31
 * @Description: content
-->
<template>
  <view class="page-wrap">
    <!-- <uni-nav-bar
      color="#333"
      leftIcon="left"
      backgroundColor="transparent"
      :border="false"
      :statusBar="true"
      :fixed="true"
    >
      <view slot="left" class="nav-left">
        <uni-icons
          @click="$common.back()"
          :style="{
            fontWeight: 'normal'
          }"
          type="left"
          color="#333"
          size="20"
        />

        <view @click="toHome" class="icon">
          <cimage src="/static/icon/home.png" mode="scaleToFill" />
        </view>
      </view>
    </uni-nav-bar> -->

    <view class="nav-bar">
      <view :style="{
        height: `calc(${sysConfig.statusBarHeight}px)`
      }"></view>

      <view class="nav-bar-content">
        <view class="header-btn">
          <view @click="$common.back()" class="btn">
            <uni-icons :style="{
              fontWeight: 'normal'
            }" type="left" color="#616360" size="20" />
          </view>

          <view class="line"></view>

          <view @click="toHome" class="btn icon">
            <cimage src="/static/icon/home.png" mode="scaleToFill" />
          </view>
        </view>
      </view>
    </view>

    <template v-if="pageData">
      <view class="swiper-wrap">
        <swiper @change="swiperChange" :current="swiperIndex" :autoplay="autoplay" circular>
          <swiper-item v-for="(item, i) in pageData.thumb" :key="i">
            <cimage :src="item" mode="scaleToFill" />
          </swiper-item>
        </swiper>

        <view class="swiper-bt">
          <scroll-view class="list-wrap" scroll-x>
            <view class="list-wrap-content">
              <view class="img-list">
                <view @click.stop="tapPic(i)" v-for="(item, i) in pageData.thumb" :key="i" class="pic" :class="{
                  act: swiperIndex == i
                }">
                  <cimage :src="item" mode="scaleToFill" />
                </view>
              </view>
            </view>
          </scroll-view>

          <view class="swiper-index">
            {{ swiperIndex + 1 }}/{{ pageData.thumb.length }}
          </view>
        </view>
      </view>

      <u-gap height="20"></u-gap>

      <view class="goods-info">
        <view class="goods-info-hd">
          <view class="price">
            ¥

            <text>{{ pageData.price }}</text>
          </view>

          <view class="pre-price">
            市场价:

            <text>{{ pageData.old_price }}</text>
          </view>

          <!-- <view class="money-price">
            <image class="" src="https://www.img.xcooo.cn/uploads/2024/02/231fcebf5c7a968d.png" mode="widthFix"
              lazy-load="false" binderror="" bindload="" />

            <text>{{ pageData.money }}</text>
          </view> -->

          <view class="buy-num">{{ pageData.sales }}人付款</view>

          <view class="want">{{ pageData.collect_num || 0 }}人想要</view>
        </view>

        <view class="goods-info-bd">
          {{ pageData.title }}
        </view>
      </view>

      <u-gap height="30"></u-gap>

      <view class="zheng-pin">
        <cimage src="/static/img/zheng_pin.png" mode="scaleToFill" />
      </view>

      <view class="goods-tag">
        <view class="goods-tag-item">
          <view class="icon">
            <cimage src="/static/icon/check2_act.png" mode="scaleToFill" />
          </view>

          假一罚三
        </view>

        <view class="goods-tag-item">
          <view class="icon">
            <cimage src="/static/icon/check2_act.png" mode="scaleToFill" />
          </view>

          正品保障
        </view>

        <view class="goods-tag-item">
          <view class="icon">
            <cimage src="/static/icon/check2_act.png" mode="scaleToFill" />
          </view>

          全新正品
        </view>

        <view class="goods-tag-item">
          <view class="icon">
            <cimage src="/static/icon/check2_act.png" mode="scaleToFill" />
          </view>

          超时赔付
        </view>
      </view>

      <u-gap height="20"></u-gap>

      <view class="choose-info">
        <view @click="openBuyPop" class="row">
          <view class="title">已选规格</view>

          <view class="right">
            {{ curData ? curData.name : '选择规格' }}
          </view>
        </view>

        <view @click="toChooseAddress" class="row">
          <view class="title">收货地址</view>

          <view class="right">
            <template v-if="addressData">
              {{ addressData.address }}
            </template>

            <template v-else>
              <view class="icon">
                <cimage src="/static/icon/address.png" mode="scaleToFill" />
              </view>

              选择收货地址
            </template>
          </view>
        </view>

        <view class="row">
          <view class="title">商品运费</view>

          <view class="right">
            {{
              true === ''
              ? '以订单页面实际支付金额为准'
              : '以订单页面实际支付金额为准'
            }}
          </view>
        </view>
      </view>

      <u-gap height="20"></u-gap>

      <view v-html="pageData.editor" class="detail"></view>

      <view class="bt-fixed">
        <view @click="toggleCollect" class="sm-btn">
          <view class="icon">
            <cimage v-if="pageData.is_collect == 1" src="/static/icon/fav_act.png" mode="scaleToFill" />

            <cimage v-else src="/static/icon/fav.png" mode="scaleToFill" />
          </view>

          <view class="title">想要</view>
        </view>

        <view class="sm-btn relative">
          <button class="hide" open-type="share"></button>

          <view class="icon">
            <cimage src="/static/icon/share1.png" mode="scaleToFill" />
          </view>

          <view class="title">分享</view>
        </view>

        <view class="sm-btn relative">
          <button class="hide" open-type="contact"></button>

          <view class="icon">
            <cimage src="/static/icon/ke_fu.png" mode="scaleToFill" />
          </view>

          <view class="title">客服</view>
        </view>

        <view @click="openBuyPop" class="lg-btn">立即购买</view>
      </view>
    </template>

    <uni-popup ref="buyPop" type="bottom">
      <view v-if="curData" class="buy-pop">
        <view class="buy-pop-hd">
          <view @click="closeBuyPop" class="close icon">
            <cimage src="/static/icon/close2.png" mode="scaleToFill" />
          </view>
        </view>

        <view class="buy-pop-bd">
          <view class="info">
            <view class="pic">
              <cimage :src="curData.thumb" mode="scaleToFill" />
            </view>

            <view class="info-content">
              <view class="title hang2">
                {{ curData.name }}
              </view>

              <view class="price-num">
                <view class="price">
                  ¥

                  <text>
                    {{ curData.price }}

                    <text>¥{{ curData.old_price }}</text>
                  </text>
                </view>

                <view class="has">库存:{{ curData.stock }}</view>
              </view>
              <!-- <view class="money">
                <image class="" src="https://www.img.xcooo.cn/uploads/2024/02/231fcebf5c7a968d.png" mode="widthFix"
                  lazy-load="false" binderror="" bindload="" />{{ curData.money }}
              </view> -->
            </view>
          </view>

          <view class="row-title">选择规格</view>

          <view class="line"></view>

          <scroll-view class="spec-wrap" scroll-y>
            <view v-for="(item, i) in pageData.attr" :key="i" class="spec">
              <view class="row-title bold">{{ item.title }}</view>

              <view class="spec-list">
                <view @click="chooseSpec(i, b)" v-for="(a, b) in item.valinfo" :key="b" class="spec-list-item" :class="{
                  act: b === specCurs[i]
                }">
                  {{ a.title }}
                </view>
              </view>
            </view>
          </scroll-view>

          <view class="row">
            <view class="row-title bold no-margin">选择数量</view>

            <view class="num-box">
              <view @click.stop="jian" class="icon">
                <cimage src="/static/icon/jian1.png" mode="scaleToFill" />
              </view>

              <input @blur="checkBuyNum" v-model="buyNum" />

              <view @click.stop="jia" class="icon">
                <cimage src="/static/icon/jia1.png" mode="scaleToFill" />
              </view>
            </view>
          </view>

          <view @click="toOrder" class="buy-btn">立即购买</view>
        </view>
      </view>
    </uni-popup>
  </view>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data () {
    return {
      optionsData: '',
      specCurs: [],
      addressData: '',
      buyNum: 1,
      pageData: '',
      curData: '',
      goodsId: '',
      swiperIndex: 0,
      autoplay: false
    }
  },

  computed: {
    ...mapGetters(['sysConfig'])
  },

  onShareAppMessage () {
    return {
      title: `正品保障 ${this.pageData.title}!`,
      imageUrl: this.pageData.thumb[0],
      path: `/package/mall/mall-detail?id=${this.pageData.id}`
    }
  },

  onLoad (options) {
    uni.$on('chooseAdd', data => {
      this.addressData = data.data
      // console.log(this.addressData)
    })
    this.optionsData = options
    this.getData()
  },

  onShow () {
    this.autoplay = true
  },

  onReady () {
    // this.openBuyPop()
  },

  onHide () {
    this.autoplay = false
  },

  onUnload () {
    uni.$off('chooseAdd')
  },

  methods: {
    /**
     * @description: 点击小图
     * @return {*}
     */
    tapPic (e) {
      this.swiperChange({
        detail: {
          current: e
        }
      })
    },

    /**
     * @description: 轮播图切换
     * @param {*} e
     * @return {*}
     */
    swiperChange (e) {
      // console.log(e.detail.current)

      this.swiperIndex = e.detail.current
    },

    /**
     * @description: 筛选规格
     * @return {*}
     */
    screenSpec () {
      let ids = this.specCurs
        .map((item, i) => {
          return this.pageData.attr[i].valinfo[item].id
        })
        .join('-')

      let data = this.pageData.sku.find(item => item.data == ids)
      this.curData = data

      // console.log(data)
    },

    /**
     * @description: 选择规格
     * @param {*} e
     * @return {*}
     */
    chooseSpec (i, b) {
      this.specCurs[i] = b
      this.screenSpec()
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
     * @description: 切换收藏
     * @return {*}
     */
    toggleCollect () {
      this.req({
        url: '/v1/shop/collect',
        data: {
          id: this.pageData.id
        },
        success: res => {
          if (res.code == 200) {
            this.getData()
          }
        }
      })
    },

    /**
     * @description: 获取数据
     * @return {*}
     */
    getData () {
      this.req({
        url: '/v1/shop/info',
        data: {
          id: this.optionsData.id
        },
        Loading: true,
        success: res => {
          if (res.code == 200) {
            if (res.data.editor) {
              res.data.editor = res.data.editor.replace(
                /\<img/gi,
                '<img style="width: 100%;vertical-align: middle;"'
              )
            }

            let arr = res.data.attr.map(item => 0)
            this.specCurs = arr
            this.pageData = res.data

            this.screenSpec()
          }
        }
      })
    },

    /**
     * @description: 确认/提交订单
     * @param {*} e 0:确认订单,1:提交订单
     * @return {*}
     */
    confirmSubmit (e) {
      return new Promise((resolve, reject) => {
        let data = {
          id: this.curData.goods_id,
          sku_id: this.curData.id,
          add_id: this.addressData.id || '',
          num: this.buyNum,
          pay_type: 3
        }

        this.req({
          url: '/v1/shop/order',
          data,
          success: res => {
            if (res.code == 200) {
              resolve()
            }
          }
        })
      })
    },

    /**
     * @description: 前往订单页
     * @return {*}
     */
    async toOrder () {
      if (this.specCur === '') {
        this.$common.toast({
          title: '请选择规格'
        })

        return
      }

      await this.confirmSubmit(0)

      this.closeBuyPop()

      this.$common.to({
        url: '/package/mall/pay-order',
        query: {
          id: this.curData.goods_id,
          sku_id: this.curData.id,
          add_id: this.addressData.id || '',
          num: this.buyNum,
          pay_type: 3
        }
      })
    },

    /**
     * @description: 验证购买数量
     * @return {*}
     */
    checkBuyNum () {
      if (this.buyNum <= 1) {
        this.buyNum = 1
      }

      if (this.buyNum >= this.curData.stock) {
        this.buyNum = this.curData.stock
      }
    },

    /**
     * @description: 兑换数量减
     * @return {*}
     */
    jian () {
      if (this.buyNum <= 1) {
        this.buyNum = 1
        return
      }

      this.buyNum -= 1
    },

    /**
     * @description: 兑换数量加
     * @return {*}
     */
    jia () {
      if (this.buyNum >= this.curData.stock) {
        this.buyNum = this.curData.stock
        return
      }

      this.buyNum += 1
    },

    /**
     * @description: 关闭购买弹窗
     * @return {*}
     */
    closeBuyPop () {
      this.$refs.buyPop.close()
    },

    /**
     * @description: 打开购买弹窗
     * @return {*}
     */
    openBuyPop () {
      this.screenSpec()
      this.$refs.buyPop.open()
    },

    /**
     * @description: 前往首页
     * @return {*}
     */
    toHome () {
      this.$common.to({
        type: 3,
        url: '/pages/index/index'
      })
    }
  }
}
</script>

<style lang="scss">
.page-wrap {
  padding-bottom: 128rpx;

  .nav-left {
    display: flex;
    align-items: center;

    .icon {
      width: 50rpx;
      height: 50rpx;
      margin-left: 30rpx;
    }
  }

  .nav-bar {
    position: fixed;
    left: 0;
    top: 0;
    background: transparent;
    z-index: 888;
    width: 100%;

    &-content {
      display: flex;
      align-items: center;
      height: 88rpx;
      padding: 0 30rpx;

      .header-btn {
        display: flex;
        align-items: center;
        background: rgba(255, 255, 255, 0.5);
        border: 2rpx solid #f3eeec;
        border-radius: 999rpx;
        padding: 0 10rpx 0 5rpx;

        .btn {
          padding: 4rpx;
          width: 40rpx;
          height: 40rpx;
          box-sizing: content-box;
          display: flex;
          justify-content: center;
          align-items: center;

          &.icon {
            width: 34rpx;
            height: 34rpx;
          }
        }

        .line {
          width: 2rpx;
          height: 20rpx;
          background: #999999;
          margin-left: 10rpx;
          margin-right: 20rpx;
        }
      }
    }
  }

  .swiper-wrap {
    width: 100%;
    height: 750rpx;
    position: relative;

    swiper {
      width: 100%;
      height: 100%;
    }

    .swiper-bt {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      z-index: 2;
      padding: 20rpx;
      display: flex;
      justify-content: space-between;
      align-items: center;

      .list-wrap {
        width: 500rpx;
        // height: 100rpx;

        &-content {
          display: inline-block;

          .img-list {
            display: flex;
            align-items: center;

            .pic {
              width: 70rpx;
              height: 70rpx;
              border: 2rpx solid #fff;

              &.act {
                border-color: #000;
              }
            }

            .pic+.pic {
              margin-left: 10rpx;
            }
          }
        }
      }

      .swiper-index {
        background: rgba(0, 0, 0, 0.3);
        border-radius: 999rpx;
        padding: 4rpx 20rpx;
        color: #fff;
        font-size: 26rpx;
      }
    }
  }

  .goods-info {
    padding: 30rpx;
    background: #fff;

    &-hd {
      display: flex;
      justify-content: space-between;
      align-items: center;

      .price {
        font-size: 24rpx;
        font-family: SourceHanSansCN;
        font-weight: 800;
        color: #333333;

        text {
          font-size: 38rpx;
        }
      }

      .pre-price {
        font-size: 24rpx;
        font-family: PingFang SC;
        // font-weight: bold;
        color: #999999;

        text {
          text-decoration: line-through;
        }
      }

      .money-price {
        font-size: 24px;
        font-family: PingFang SC;
        font-weight: bold;
        color: orange;
        display: flex;
        align-items: center;

        image {
          width: 30rpx;
          margin-right: 5rpx;
        }

        text {
          // text-decoration: line-through;
        }
      }

      .buy-num {
        font-size: 24rpx;
        font-family: PingFang SC;
        font-weight: 500;
        color: #999999;
      }

      .want {
        font-size: 24rpx;
        font-family: PingFang SC;
        font-weight: 500;
        color: #999999;
      }
    }

    &-bd {
      font-size: 26rpx;
      font-family: PingFang SC;
      font-weight: bold;
      color: #222222;
      line-height: 43rpx;
      margin-top: 20rpx;
    }
  }

  .zheng-pin {
    width: 100%;
    height: 114rpx;
  }

  .goods-tag {
    padding: 30rpx;
    display: flex;
    justify-content: space-between;
    background: #fff;

    &-item {
      display: flex;
      align-items: center;

      .icon {
        width: 30rpx;
        height: 30rpx;
        margin-right: 4rpx;
      }

      font-size: 24rpx;
      font-family: PingFang SC;
      font-weight: bold;
      color: #222222;
      line-height: 30rpx;
    }
  }

  .choose-info {
    background: #fff;
    padding: 30rpx;

    .row {
      display: flex;
      align-items: center;

      font-size: 24rpx;
      font-family: PingFang SC;
      // font-weight: bold;
      color: #999999;

      .title {
        width: 150rpx;
      }

      .right {
        flex: 1;
        display: flex;
        align-items: center;

        .icon {
          width: 40rpx;
          height: 40rpx;
        }
      }
    }

    .row+.row {
      margin-top: 30rpx;
    }
  }

  .detail {
    font-size: 26rpx;
    font-family: PingFang SC;
    color: #222222;
    line-height: 43rpx;
    background: #fff;
  }

  .bt-fixed {
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 128rpx;
    background: #fff;
    box-shadow: 0rpx -3rpx 9rpx 0rpx rgba(115, 115, 115, 0.3);
    z-index: 10;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-sizing: border-box;
    padding: 0 30rpx;

    .sm-btn {
      display: flex;
      flex-flow: column nowrap;
      align-items: center;

      .icon {
        width: 50rpx;
        height: 50rpx;
      }

      .title {
        font-size: 24rpx;
        font-family: PingFang SC;
        font-weight: 500;
        color: #333333;
        // margin-top: 10rpx;
      }
    }

    .lg-btn {
      width: 435rpx;
      height: 88rpx;
      background: #333333;
      border-radius: 10rpx;
      line-height: 88rpx;
      text-align: center;

      font-size: 32rpx;
      font-family: PingFang SC;
      font-weight: bold;
      color: #ffffff;
    }
  }

  .buy-pop {
    background: #fff;

    &-hd {
      display: flex;
      justify-content: flex-end;
      padding: 20rpx 20rpx 0;

      .icon {
        width: 50rpx;
        height: 50rpx;
      }
    }

    &-bd {
      padding: 30rpx;

      .info {
        display: flex;

        .pic {
          width: 140rpx;
          height: 140rpx;
          border-radius: 10rpx;
          overflow: hidden;
        }

        &-content {
          width: calc(100% - 140rpx);
          box-sizing: border-box;
          padding-left: 30rpx;
          display: flex;
          flex-flow: column nowrap;
          justify-content: space-between;

          .title {
            font-size: 26rpx;
            font-family: PingFang SC;
            color: #222222;
            font-weight: bold;
          }

          .price-num {
            display: flex;
            align-items: center;
            justify-content: space-between;

            .price {
              font-size: 30rpx;
              font-family: Source Han Sans CN;
              font-weight: 800;
              color: #333333;

              text {
                font-size: 38rpx;

                text {
                  padding-left: 10rpx;
                  font-size: 24rpx;
                  font-family: PingFang SC;
                  font-weight: bold;
                  text-decoration: line-through;
                  color: #999999;
                }
              }
            }


            .has {
              font-size: 26rpx;
              font-family: PingFang SC;
              font-weight: bold;
              color: #999999;
            }
          }

          .money {
            font-size: 20px;
            font-family: PingFang SC;
            font-weight: bold;
            color: #edc736;
            display: flex;
            align-items: center;

            image {
              width: 30rpx;
              margin-right: 5rpx;
            }
          }
        }
      }

      .row-title {
        font-size: 26rpx;
        font-family: PingFang SC;
        font-weight: 500;
        color: #222222;
        margin-top: 30rpx;

        &.no-margin {
          margin: 0;
        }

        &.bold {
          font-weight: bold;
        }
      }

      .line {
        width: 100%;
        height: 1rpx;
        background: #eeeeee;
        margin-top: 30rpx;
      }

      .spec-wrap {
        max-height: 40vh;
      }

      .spec {
        &-list {
          display: flex;
          flex-flow: row wrap;
          padding: 1rpx 0 0;

          &-item {
            margin-top: 30rpx;
            margin-right: 30rpx;
            padding: 0 30rpx;
            height: 66rpx;
            background: #ebebeb;
            line-height: 66rpx;

            font-size: 26rpx;
            font-family: PingFang SC;
            font-weight: 500;
            color: #222222;

            &.act {
              background: #000;
              color: #fff;
            }
          }
        }
      }

      .row {
        margin-top: 30rpx;
        display: flex;
        justify-content: space-between;
        align-items: center;

        .num-box {
          display: flex;
          align-items: center;

          .icon {
            width: 50rpx;
            height: 50rpx;
          }

          input {
            height: 36rpx;
            width: 80rpx;
            margin: 0 10rpx;
            background: #ebeaef;

            font-size: 28rpx;
            font-family: PingFang SC;
            // font-weight: bold;
            color: #333333;
            text-align: center;
          }
        }
      }

      .buy-btn {
        width: 100%;
        height: 88rpx;
        line-height: 88rpx;
        text-align: center;
        background: #333333;
        margin-top: 30rpx;
        border-radius: 999rpx;

        font-size: 26rpx;
        font-family: PingFang SC;
        font-weight: bold;
        color: #ffffff;
      }
    }
  }
}
</style>
