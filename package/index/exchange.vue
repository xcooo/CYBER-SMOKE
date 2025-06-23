<!--
 * @Date: 2022-12-07 10:49:00
 * @LastEditTime: 2022-12-19 14:57:26
 * @Description: content
-->
<template>
  <view class="page-wrap">
    <mescroll-body ref="mescrollRef" @init="mescrollInit" @down="downCallback" @up="getList" :down="downOption"
      :up="upOption">
      <uni-nav-bar color="#333" leftIcon="left" backgroundColor="transparent" :border="false" :statusBar="true"
        :fixed="false" @clickLeft="$common.back()"></uni-nav-bar>

      <view class="page-wrap-hd common_bg" :style="{
        backgroundImage: `url(${imgBaseUrl}${'/static/img/zhi_huan_hd_bg.png'})`,
        marginTop: `calc(-${sysConfig.statusBarHeight}px - 44px)`
      }">
        <view @click="getRule" class="rule-btn">规则</view>
      </view>

      <view class="list">
        <view @click="toDetail(item)" v-for="(item, i) in listData" :key="i" class="list-item">
          <view class="pic">
            <cimage :src="item.thumb[0]" mode="scaleToFill" />
          </view>

          <view class="tag-list">
            <view class="tag-list-item zheng">正品保障</view>

            <view class="tag-list-item">{{ item.cat_desc }}</view>
          </view>

          <view class="name hang1">
            {{ item.title }}
          </view>

          <view class="price-num">
            <view class="price">
              参考价¥
              <text>
                {{ item.price }}

                <!-- <text>¥23333</text> -->
              </text>
            </view>
          </view>
        </view>
      </view>
    </mescroll-body>

    <uni-popup ref="rulePop" type="center">
      <view v-if="ruleData" class="rule-pop">
        <view class="rule-pop-hd">{{ ruleData.title }}</view>

        <scroll-view scroll-y class="rule-pop-bd">
          <view class="content" v-html="ruleData.editor">
            <!-- {{ ruleData.editor }}
               -->
          </view>
        </scroll-view>

        <view @click="closeRulePop" class="rule-pop-ft">我知道了</view>
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
      ruleData: ''
    }
  },

  computed: {
    ...mapGetters(['sysConfig'])
  },

  onLoad (options) {
    this.optionsData = options
  },

  methods: {
    /**
     * @description: 获取规则
     * @return {*}
     */
    getRule () {
      this.$common.getRule(4).then(res => {
        this.ruleData = res

        this.openRulePop()
      })
    },

    /**
     * @description: 获取商品列表数据
     * @param {*}
     * @return {*}
     */
    getList ({ num, size }) {
      let data = {
        page: num,
        per_page: size
      }

      if (this.optionsData.money) {
        data.money = this.optionsData.money
      }

      this.req({
        url: '/v1/shop/change/list',
        data,
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
     * @description: 关闭规则弹窗
     * @return {*}
     */
    closeRulePop () {
      this.$refs.rulePop.close()
    },

    /**
     * @description: 打开规则弹窗
     * @return {*}
     */
    openRulePop () {
      this.$refs.rulePop.open()
    },

    /**
     * @description: 前往置换商城详情
     * @return {*}
     */
    toDetail (item) {
      this.$common.to({
        url: '/package/index/exchange-detail',
        query: {
          id: this.optionsData.id || '',
          change_id: item.id
        }
      })
    }
  }
}
</script>

<style lang="scss">
.page-wrap {
  min-height: 100vh;
  background: #fff;

  ::v-deep.uni-navbar__content {
    z-index: 10;
  }

  &-hd {
    position: relative;
    height: 474rpx;

    .rule-btn {
      width: 91rpx;
      height: 50rpx;
      background: linear-gradient(0deg, #f3dcf8 0%, #f7f5fe 99%);
      border-radius: 5rpx 5rpx 0rpx 0rpx;
      position: absolute;
      right: 60rpx;
      bottom: 40rpx;
      line-height: 50rpx;
      text-align: center;

      font-size: 26rpx;
      font-family: PingFang SC;
      font-weight: bold;
      color: #b36ae9;
    }
  }

  .list {
    padding: 1rpx 30rpx 40rpx;
    display: flex;
    flex-flow: row wrap;
    justify-content: space-between;
    border-radius: 40rpx 40rpx 0 0;
    position: relative;
    z-index: 1;
    margin-top: -40rpx;
    background: #fff;

    &-item {
      width: 340rpx;
      border-radius: 10rpx;
      overflow: hidden;
      background: #ffffff;
      margin-top: 30rpx;

      .pic {
        height: 340rpx;
      }

      .tag-list {
        padding: 1rpx 15rpx 0;
        display: flex;
        flex-flow: row wrap;

        &-item {
          border-radius: 5rpx;
          overflow: hidden;
          margin-right: 10rpx;
          margin-top: 10rpx;
          height: 40rpx;
          box-sizing: border-box;
          padding: 0 10rpx;
          display: flex;
          align-items: center;

          font-size: 20rpx;
          font-family: PingFang SC;
          font-weight: 500;
          color: #eb989c;
          border: 1rpx solid #eb989c;

          &.zheng {
            color: #fff;
            background: #333333;
            border: none;
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
          font-weight: bold;
          color: #333333;

          text {
            font-size: 32rpx;

            text {
              margin-left: 10rpx;
              font-size: 20rpx;
              font-family: PingFang SC;
              font-weight: 500;
              text-decoration: line-through;
              color: #999999;
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

  .rule-pop {
    width: 570rpx;
    border-radius: 10rpx;
    background: #fff;
    padding: 0 30rpx 30rpx;

    &-hd {
      padding: 30rpx 0;
      text-align: center;

      font-size: 32rpx;
      font-family: PingFang SC;
      font-weight: bold;
      color: #333333;
    }

    &-bd {
      max-height: 50vh;

      .content {
        font-size: 26rpx;
        font-family: PingFang SC;
        font-weight: 500;
        color: #666666;
        line-height: 44rpx;
      }
    }

    &-ft {
      margin: 50rpx auto 0;
      width: 327rpx;
      height: 66rpx;
      background: #000000;
      border-radius: 33rpx;
      line-height: 66rpx;
      text-align: center;

      font-size: 26rpx;
      font-family: PingFang SC;
      font-weight: 500;
      color: #ffffff;
    }
  }
}
</style>
