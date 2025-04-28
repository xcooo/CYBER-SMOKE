<!--
 * @Date: 2022-12-07 14:57:46
 * @LastEditTime: 2024-02-29 10:56:29
 * @Description: content
-->
<template>
  <view class="page-wrap">
    <uni-nav-bar title="我的盒柜" color="#333" leftIcon="left" backgroundColor="#fff" :border="false" :statusBar="true"
      :fixed="true" @clickLeft="$common.back()"></uni-nav-bar>

    <view class="tab-list" :style="{
      top: `calc(${sysConfig.statusBarHeight}px + 44px)`
    }">
      <view @click="tabChage(i)" v-for="(item, i) in tabList" :key="i" class="tab-list-item" :class="{
        act: tabCur == i
      }">
        {{ item.title }}
      </view>
    </view>

    <scroll-view class="btn-list-wrap" scroll-x :style="{
      top: `calc(${sysConfig.statusBarHeight}px + 44px + 88rpx)`
    }">
      <view class="btn-list-wrap-content">
        <view class="btn-list">
          <view @click="btnChange(i)" v-for="(item, i) in btnList" :key="i" class="btn-list-item" :class="{
            act: btnCur == i
          }">
            {{ item.title }}
          </view>
        </view>
      </view>
    </scroll-view>

    <u-gap height="176"></u-gap>

    <mescroll-body ref="mescrollRef" @init="mescrollInit" @down="downCallback" @up="getList" :down="downOption"
      :up="upOption">
      <view class="list">
        <view v-for="(item, i) in listData" :key="i" class="list-item">
          <view class="list-item-hd">
            <view class="pic">
              <cimage :src="item.thumb" mode="scaleToFill" />

              <view :style="{
                background: item.mark_color
              }" class="tag">
                {{ item.mark_title }}
              </view>
            </view>

            <view class="info">
              <view class="title hang2">
                {{ item.title }}
              </view>
            </view>
          </view>

          <view class="list-item-bd">
            <template v-if="tabCur == 0">
              <view @click="openDhModel(item)" v-if="item.type == 1" class="btn">
                溶解
              </view>

              <view @click="toSend(item)" class="btn">提货</view>
            </template>

            <view @click="toDetail(item)" v-if="tabCur == 1 || tabCur == 4" class="btn">
              查看详情
            </view>

            <template v-if="tabCur == 2">
              <view @click="toExpress(item)" class="btn">查看物流</view>

              <view @click="openModel(item)" class="btn">确认收货</view>
            </template>

            <view @click="toComment(item)" v-if="tabCur == 3 &&
              item.type == 1 &&
              (item.mark_id == 1 || item.mark_id == 2)
              " class="btn">
              去评价
            </view>

            <view
              @click="buyAgain(item)"
              v-if="tabCur == 4 && item.type == 1 && item.is_change == 0"
              class="btn"
            >
              再次购买
            </view>
          </view>
        </view>
      </view>
    </mescroll-body>

    <u-modal v-model="showModel" :title="'提示'" :content="'请确认是否已收到货'" :show-cancel-button="true"
      @confirm="submitGet"></u-modal>
    <u-modal v-model="showRj" :title="'提示'" @confirm="duihuan" content="粉碎根据市场成本变化，一经粉碎无法撤销，请确认是否粉碎？"
      :show-cancel-button="true"></u-modal>
  </view>
</template>

<script>
import {
  mapGetters
} from 'vuex'

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
      tabList: [{
        id: 0,
        title: '待提货'
      },
      {
        id: 1,
        title: '待发货'
      },
      {
        id: 2,
        title: '已发货'
      },
      {
        id: 3,
        title: '待评价'
      },
      {
        id: 4,
        title: '已完成'
      }
      ],
      tabCur: 0,
      btnList: [],
      btnCur: 0,
      canRefresh: false,
      curItem: '',
      showModel: false,
      showRj: false
    }
  },

  computed: {
    ...mapGetters(['sysConfig'])
  },

  onLoad (options) {
    this.optionsData = options

    this.tabCur = options.tabCur ?? 0

    this.init()
  },

  onShow () {
    this.canRefresh && this.mescroll.resetUpScroll()
    this.canRefresh && this.mescroll.scrollTo(0, 0)
    this.canRefresh = true
  },

  methods: {
    async init () {
      await this.getTab()

      this.mescroll.resetUpScroll()
      this.mescroll.scrollTo(0, 0)

      this.tabChage(this.tabCur)
      this.getList({ num: 1, size: 20 })
    },
    /**
     * @description: 再次购买
     * @param {*} item
     * @return {*}
     */
    buyAgain (item) {
      this.$common.to({
        url: '/package/box/box-detail',
        query: {
          id: item.box_id
        }
      })
    },

    /**
     * @description: 打开确认收货弹窗
     * @param {*} item
     * @return {*}
     */
    openModel (item) {
      this.curItem = item
      this.showModel = true
    },
    /**
     * @description: 打开确认收货弹窗
     * @param {*} item
     * @return {*}
     */
    openDhModel (item) {
      this.curItem = item
      this.showRj = true
    },
    /**
     * @description: 去置换商品
     * @return {*}
     */
    toExchange (item) {

    },

    /**
     * @description: 去评价
     * @param {*} item
     * @return {*}
     */
    toComment (item) {
      this.$common.to({
        url: '/package/mine/comment',
        query: {
          id: item.id,
          title: item.title
        }
      })
    },

    /**
     * @description: 确认收货
     * @param {*}
     * @return {*}
     */
    submitGet () {
      this.req({
        url: '/v1/user/ship/box/receipt',
        data: {
          id: this.curItem.id
        },
        success: res => {
          if (res.code == 200) {
            this.$common.toast({
              title: res.msg,
              icon: 'success',
              duration: 600,
              success: () => {
                this.mescroll.resetUpScroll()
                this.mescroll.scrollTo(0, 0)
              }
            })
          }
        }
      })
    },

    /**
     * @description: 粉碎商品
     * @param {*}
     * @return {*}
     */
    duihuan () {
      this.req({
        url: '/v1/user/ship/box/dissolve',
        data: {
          id: this.curItem.id
        },
        success: res => {
          if (res.code == 200) {
            this.$common.toast({
              title: res.msg,
              icon: 'success',
              duration: 600,
              success: () => {
                this.mescroll.resetUpScroll()
                this.mescroll.scrollTo(0, 0)
              }
            })
          }
        }
      })
    },

    /**
     * @description: 商品等级切换
     * @param {*} e
     * @return {*}
     */
    btnChange (e) {
      this.btnCur = e
      this.listData = []
      this.mescroll.resetUpScroll()
      this.mescroll.scrollTo(0, 0)
    },

    /**
     * @description: 获取奖品类型
     * @return {*}
     */
    getTab () {
      return new Promise((resolve, reject) => {
        this.req({
          url: '/v1/box/mark',
          data: {},
          Loading: true,
          success: res => {
            if (res.code == 200) {
              this.btnList = res.data

              resolve()
            }
          }
        })
      })
    },

    /**
     * @description: 前往发货
     * @return {*}
     */
    toSend (item) {
      this.$common.to({
        url: '/package/mine/bag-send',
        query: {
          id: item.id
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
        url: '/v1/user/award',
        data: {
          page: num,
          per_page: size,
          status: this.tabList[this.tabCur].id,
          mark_id: this.btnList[this.btnCur].id
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
     * @description: 物流详情
     * @return {*}
     */
    toExpress (item) {
      this.$common.to({
        url: '/package/mine/bag-express',
        query: {
          id: item.id
        }
      })
    },

    /**
     * @description: 订单详情
     * @return {*}
     */
    toDetail (item) {
      this.$common.to({
        url: '/package/mine/bag-order-detail',
        query: {
          id: item.id
        }
      })
    },

    /**
     * @description: tab切换
     * @param {*} e
     * @return {*}
     */
    tabChage (e) {
      this.tabCur = e
      this.listData = []
      this.mescroll.resetUpScroll()
      this.mescroll.scrollTo(0, 0)
    }
  }
}
</script>

<style lang="scss">
.page-wrap {
  .tab-list {
    background: #fff;
    height: 88rpx;
    padding: 0 30rpx;
    display: flex;
    justify-content: space-between;
    align-items: center;
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

  .btn-list-wrap {
    width: 100%;
    height: 88rpx;
    position: fixed;
    z-index: 10;
    left: 0;
    box-sizing: border-box;
    padding: 0 30rpx;
    background: #fff;

    &-content {
      display: inline-block;
      height: 100%;

      .btn-list {
        display: flex;
        align-items: center;
        height: 100%;

        &-item {
          width: 122rpx;
          height: 60rpx;
          background: #f5f5f5;
          border-radius: 5rpx;
          line-height: 60rpx;
          text-align: center;
          box-sizing: border-box;
          border: 1rpx solid #f5f5f5;

          font-size: 26rpx;
          font-family: PingFang SC;
          font-weight: 500;
          color: #333333;

          &.act {
            border-color: #2ac2b3;
            background: #fff;
          }
        }

        &-item+.btn-list-item {
          margin-left: 20rpx;
        }
      }
    }
  }

  .list {
    padding: 1rpx 30rpx 40rpx;

    &-item {
      border-radius: 10rpx;
      background: #fff;
      padding: 30rpx;
      margin-top: 30rpx;

      &-hd {
        display: flex;
        padding-bottom: 30rpx;

        .pic {
          width: 166rpx;
          height: 166rpx;
          box-sizing: border-box;
          border: 1rpx solid #f7f7f7;
          position: relative;

          .tag {
            position: absolute;
            z-index: 1;
            padding: 2rpx 10rpx;
            border-radius: 20rpx 0 0 0;
            right: 0;
            bottom: 0;
            background: #0d6bc9;

            font-size: 20rpx;
            font-family: PingFang SC;
            font-weight: bold;
            color: #ffffff;
          }
        }

        .info {
          width: calc(100% - 166rpx);
          box-sizing: border-box;
          padding-left: 30rpx;

          .title {
            font-size: 32rpx;
            font-family: PingFang SC;
            font-weight: 500;
            color: #333333;
          }
        }
      }

      &-bd {
        padding-top: 30rpx;
        border-top: 1rpx solid #ededed;
        display: flex;
        justify-content: flex-end;

        .btn {
          width: 148rpx;
          height: 58rpx;
          background: #ffffff;
          border: 2rpx solid #000000;
          border-radius: 5rpx;
          box-sizing: border-box;
          line-height: 58rpx;
          text-align: center;

          font-size: 24rpx;
          font-family: PingFang SC;
          font-weight: 500;
          color: #333333;

          &:last-child {
            background: #000000;
            color: #fff;
          }
        }

        .btn+.btn {
          margin-left: 30rpx;
        }
      }
    }
  }
}
</style>