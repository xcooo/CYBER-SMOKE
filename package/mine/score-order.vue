<!--
 * @Date: 2022-12-07 14:57:46
 * @LastEditTime: 2025-04-27 16:57:59
 * @Description: content
-->
<template>
  <view class="page-wrap">
    <uni-nav-bar title="积分订单" color="#fff" leftIcon="left" backgroundColor="#222333" :border="false" :statusBar="true"
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

    <u-gap height="88"></u-gap>

    <mescroll-body ref="mescrollRef" @init="mescrollInit" @down="downCallback" @up="getList" :down="downOption"
      :up="upOption">
      <view class="list">
        <view v-for="(item, i) in listData" :key="i" class="list-item">
          <view class="list-item-hd">
            <view class="pic">
              <cimage :src="item.thumb" mode="scaleToFill" />
            </view>

            <view class="info">
              <view class="title hang2">
                {{ item.title }}
              </view>

              <view class="price-num">
                <view class="price">¥{{ item.score }}</view>

                <view class="num">×{{ item.num }}</view>
              </view>
            </view>
          </view>

          <view class="list-item-bd">
            <template v-if="item.status == 0">
              <view class="no-shipped">待发货</view>
            </template>
            <template v-else>
              <view class="shipped">已发货</view>
            </template>
          </view>

          <!-- <view class="list-item-ft">
            <template v-if="tabCur == 0">
              <view @click="toDetail(item)" class="btn">查看详情</view>
            </template>

            <template v-if="tabCur == 1">
              <view @click="toDetail(item)" class="btn yellow">查看详情</view>

              <view @click="toExpress(item)" class="btn red">查看物流</view>

              <view @click="openModel(item)" class="btn">确认收货</view>
            </template>

            <template v-if="tabCur == 2">
              <view @click="toDetail(item)" class="btn yellow">查看详情</view>

              <view @click="toExpress(item)" class="btn">查看物流</view>
            </template>
          </view> -->
        </view>
      </view>
    </mescroll-body>

    <u-modal v-model="showModel" :title="'提示'" :content="'请确认是否已收到货'" :show-cancel-button="true"
      @confirm="submitGet"></u-modal>
  </view>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
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
        },
        // empty: {
        //   use: true, // 是否显示空布局
        //   icon: "../../static/home/empty.png", // 图标路径
        //   tip: '这里什么都没有~', // 提示
        //   fixed: false, // 是否使用fixed定位,默认false; 配置fixed为true,以下的top和zIndex才生效 (transform会使fixed失效,最终会降级为absolute)
        //   top: "100rpx", // fixed定位的top值 (完整的单位值,如 "10%"; "100rpx")
        //   zIndex: 99 // fixed定位z-index值
        // },
      },
      listData: [],
      tabList: [
        {
          id: 0,
          title: '待发货'
        },
        {
          id: 1,
          title: '已发货'
        },
      ],
      tabCur: 0,
      canRefresh: false,
      curItem: '',
      showModel: false
    }
  },

  computed: {
    ...mapGetters(['sysConfig'])
  },

  onShow () {
    this.canRefresh && this.mescroll.resetUpScroll()
    this.canRefresh && this.mescroll.scrollTo(0, 0)
    this.canRefresh = true
  },

  methods: {
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
     * @description: 确认收货
     * @param {*}
     * @return {*}
     */
    submitGet () {
      this.req({
        url: '/v1/shop/ship/receipt',
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
     * @description: 获取商品列表数据
     * @param {*}
     * @return {*}
     */
    getList ({ num, size }) {
      this.req({
        url: '/v1/vip/recordList',
        data: {
          page: num,
          per_page: size,
          status: this.tabList[this.tabCur].id
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
        url: '/package/mine/mall-express',
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
        url: '/package/mine/mall-order-detail',
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
page {}

.page-wrap {
  // background: url("https://img.alicdn.com/imgextra/i4/2200676927379/O1CN01unkdtT24NdWplMdw8_!!2200676927379.png") no-repeat;
  // background-size: 100% 100%;
  background: #222333;
  min-height: calc(100vh - 50px);

  ::v-deep .mescroll-body {
    // background: url("https://img.alicdn.com/imgextra/i4/2200676927379/O1CN01unkdtT24NdWplMdw8_!!2200676927379.png") no-repeat !important;
    // background-size: 100% 100%;
  }

  .tab-list {
    background: #fff;
    height: 88rpx;
    padding: 0 30rpx;
    display: flex;
    // justify-content: space-between;
    justify-content: center;
    align-items: center;
    position: fixed;
    left: 0;
    width: 100%;
    box-sizing: border-box;
    z-index: 10;
    background: url("https://img.alicdn.com/imgextra/i4/2200676927379/O1CN01unkdtT24NdWplMdw8_!!2200676927379.png") no-repeat;
    background-size: 100% 100%;
    background: #222333;


    &-item {
      font-size: 28rpx;
      font-family: PingFang SC;
      font-weight: 500;
      color: #fff;
      transition: all 0.3s;
      width: 50%;

      &.act {
        font-size: 32rpx;
        font-weight: bold;
        color: #6b57dc;
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
            border-color: #333333;
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
      background: #313131;
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
          border-radius: 20rpx;
          overflow: hidden;
        }

        .info {
          width: calc(100% - 166rpx);
          box-sizing: border-box;
          padding-left: 30rpx;
          display: flex;
          flex-flow: column nowrap;
          justify-content: space-between;

          .title {
            font-size: 32rpx;
            font-family: PingFang SC;
            font-weight: 500;
            color: #fff;
          }

          .price-num {
            display: flex;
            justify-content: space-between;
            align-items: center;

            .price {
              font-size: 28rpx;
              font-family: PingFang SC;
              font-weight: 500;
              color: orange;
            }

            .num {
              font-size: 32rpx;
              font-family: PingFang SC;
              font-weight: 500;
              color: #999999;
            }
          }
        }
      }

      &-bd {
        font-size: 24rpx;
        font-family: PingFang SC;
        font-weight: 400;
        color: #999999;
        width: 100%;
        display: flex;
        justify-content: flex-end;

        .no-shipped {
          background-color: #ff9900;
          padding: 10rpx 20rpx;
          color: #fff;
          border-radius: 20rpx;
        }

        .shipped {
          background-color: #2979ff;
          padding: 10rpx 20rpx;
          color: #fff;
          border-radius: 20rpx;
        }

      }

      &-ft {
        padding-top: 30rpx;
        // border-top: 1rpx solid #ededed;
        display: flex;
        justify-content: flex-end;

        .btn {
          width: 180rpx;
          height: 66rpx;
          background: #000000;
          // border: 1rpx solid #000000;
          border-radius: 999rpx;
          box-sizing: border-box;
          line-height: 66rpx;
          text-align: center;

          font-size: 24rpx;
          font-family: PingFang SC;
          font-weight: 500;
          color: #fff;

          &.yellow {
            background: #f7a631;
          }

          &.red {
            background: #f22222;
          }
        }

        .btn+.btn {
          margin-left: 25rpx;
        }
      }
    }
  }
}
</style>
