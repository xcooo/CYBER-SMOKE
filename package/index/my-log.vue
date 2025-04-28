<!--
 * @Date: 2022-12-06 16:23:46
 * @LastEditTime: 2022-12-22 11:44:54
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
      <view
        @click="tabChage(i)"
        v-for="(item, i) in tabList"
        :key="i"
        class="tab-list-item"
        :class="{
          act: tabCur == i
        }"
      >
        {{ item.title }}
      </view>
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
          <view v-for="(item, i) in listData" :key="i" class="join-item">
            <view class="join-item-hd">{{ item.title }}期盲盒天天乐</view>

            <view class="join-item-bd">
              <view class="info-item">
                <view class="title">幸运盲盒</view>

                <view class="num">{{ item.luck_number }}号</view>
              </view>

              <view class="info-item">
                <view class="title">参与人数</view>

                <view class="num">{{ item.join_num }}人</view>
              </view>

              <view class="info-item">
                <view class="title">我的盲盒</view>

                <view class="num">{{ item.box_num }}个</view>
              </view>

              <view class="info-item">
                <view class="title">开盒详情</view>

                <view v-if="item.box_num * 1 <= 0" class="none">未参与</view>

                <view v-else @click="getPrizeDetail(item)" class="num normal">
                  点击查看
                </view>
              </view>
            </view>
          </view>
        </template>

        <template v-if="tabCur == 1">
          <div v-for="(item, i) in listData" :key="i" class="invite-item">
            <view class="avatar">
              <cimage :src="item.avatar" mode="scaleToFill" />
            </view>

            <view class="user-info">
              <view class="name hang1">
                {{ item.nickName }}
              </view>

              <view class="time">{{ item.created_at }}</view>
            </view>
          </div>
        </template>

        <template v-if="tabCur == 2 || tabCur == 3">
          <div v-for="(item, i) in listData" :key="i" class="log-item">
            <view v-if="tabCur == 2" class="icon">
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

    <uni-popup ref="detailPop" type="bottom">
      <view class="detail-pop">
        <view class="detail-pop-hd">
          <view class="title">恭喜 获得以下奖励</view>

          <view @click="closeDetailPop" class="icon close">
            <cimage src="/static/icon/close2.png" mode="scaleToFill" />
          </view>
        </view>

        <view class="detail-pop-bd">
          <view class="total-card">
            <view class="total-card-item">
              <view class="title">本期获得红包</view>

              <view class="money">
                ¥

                <text>{{ detailData.money }}</text>
              </view>
            </view>

            <view class="line"></view>

            <view class="total-card-item">
              <view class="title">本期获得购物金</view>

              <view class="money">
                ¥

                <text>{{ detailData.gold }}</text>
              </view>
            </view>

            <view class="line"></view>

            <view class="total-card-item">
              <view class="title">本期实物商品</view>

              <view class="money">
                <text>{{ detailData.goods_num }}</text>
              </view>
            </view>
          </view>

          <scroll-view class="box-list" scroll-y>
            <view
              v-for="(item, i) in detailData.joinList"
              :key="i"
              class="box-list-item"
              :class="{
                act: item.status == 1
              }"
            >
              <view
                class="box common_bg"
                :style="{
                  backgroundImage: `url(${imgBaseUrl}${'/static/img/box_act.png'})`
                }"
              >
                <view class="num">{{ item.number }}</view>

                <view class="title">号盲盒</view>
              </view>

              <view class="info">
                <view class="info-l">
                  <view class="title">{{ item.number }}号盲盒</view>

                  <view class="num">本期已选{{ item.num }}个盲盒</view>
                </view>

                <view class="info-r">
                  <view v-if="item.status == 1" class="tag">幸运盲盒</view>
                </view>
              </view>
            </view>
          </scroll-view>
        </view>
      </view>
    </uni-popup>
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
          title: '参与记录'
        },
        {
          id: 2,
          title: '邀请记录'
        },
        {
          id: 3,
          title: '积分明细'
        },
        {
          id: 4,
          title: '购物金'
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
     * @description: 获取中奖详情
     * @param {*} item
     * @return {*}
     */
    getPrizeDetail(item) {
      this.req({
        url: '/v1/luckbox/log/info',
        data: {
          term_id: item.id
        },
        Loading: false,
        success: res => {
          if (res.code == 200) {
            this.detailData = res.data

            this.openDetailPop()
          }
        }
      })
    },

    /**
     * @description: 获取列表数据
     * @param {*}
     * @return {*}
     */
    getList({ num, size }) {
      let url = ''

      if (this.tabCur == 0) {
        url = '/v1/luckbox/log'
      }
      if (this.tabCur == 1) {
        url = '/v1/user/bind'
      }
      if (this.tabCur == 2) {
        url = '/v1/user/coin/list'
      }
      if (this.tabCur == 3) {
        url = '/v1/user/gold/list'
      }

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
    tabChage(e) {
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
      margin-top: 30rpx;
      padding: 30rpx;
      border-radius: 10rpx;
      background: #fff;
      display: flex;

      .avatar {
        width: 88rpx;
        height: 88rpx;
        border-radius: 50%;
        overflow: hidden;
      }

      .user-info {
        width: calc(100% - 88rpx);
        box-sizing: border-box;
        padding-left: 40rpx;

        .name {
          max-width: 250rpx;

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

  .detail-pop {
    border-radius: 20rpx 20rpx 0 0;
    padding: 0 30rpx;
    background: #fefbf2;

    &-hd {
      position: relative;
      display: flex;
      justify-content: center;

      .title {
        height: 70rpx;
        padding: 0 40rpx;
        border-radius: 0 0 20rpx 20rpx;
        background: linear-gradient(0deg, #fe2c2f, #fa6579);
        line-height: 70rpx;
        color: #fff;
        font-size: 30rpx;
        font-weight: bold;
      }

      .close {
        position: absolute;
        right: 0;
        top: 50%;
        transform: translateY(-50%);
        width: 40rpx;
        height: 40rpx;
      }
    }

    &-bd {
      padding-bottom: 20rpx;

      .total-card {
        display: flex;
        justify-content: space-around;
        align-items: center;
        background: #fef0d6;
        padding: 30rpx 0;
        margin-top: 30rpx;
        border-radius: 20rpx;

        &-item {
          display: flex;
          flex-flow: column nowrap;
          align-items: center;
          width: 30%;

          .title {
            font-size: 26rpx;
            color: #f43a39;
          }

          .money {
            font-size: 24rpx;
            color: #f42a4b;
            margin-top: 10rpx;

            text {
              font-size: 32rpx;
              font-weight: bold;
            }
          }
        }

        .line {
          height: 50rpx;
          width: 1rpx;
          background: #f0d4bc;
        }
      }

      .box-list {
        max-height: 40vh;
        padding: 1rpx 0 0;
        margin-top: 10rpx;

        &-item {
          padding: 20rpx 30rpx;
          margin-top: 30rpx;
          background: #fefbf2;
          border: 2rpx solid #f0d4bc;
          border-radius: 10rpx;
          display: flex;
          // align-items: center;

          .box {
            display: flex;
            flex-flow: column nowrap;
            align-items: center;
            width: 70rpx;
            height: 100rpx;
            box-sizing: border-box;
            padding-top: 24rpx;

            .num {
              font-size: 32rpx;
              font-family: Source Han Sans CN;
              font-weight: 800;
              color: #8f4721;
            }

            .title {
              font-size: 15rpx;
              font-family: Source Han Sans CN;
              font-weight: bold;
              color: #8f4721;
            }
          }

          .info {
            flex: 1;
            padding-left: 40rpx;

            display: flex;
            justify-content: space-between;

            &-l {
              display: flex;
              flex-flow: column nowrap;
              justify-content: space-around;
              // align-items: center;

              .title {
                font-size: 26rpx;
                font-family: PingFang SC;
                font-weight: bold;
                color: #8f4721;
              }

              .num {
                // margin-top: 10rpx;
                font-size: 22rpx;
                font-family: PingFang SC;
                font-weight: 500;
                color: #8f4721;
              }
            }

            &-r {
              display: flex;
              align-items: center;
              padding-right: 30rpx;

              .tag {
                display: flex;
                justify-content: center;
                align-items: center;
                width: 100rpx;
                height: 100rpx;
                border: 4rpx solid #fff;
                font-size: 18rpx;
                font-weight: bold;
                color: #fff;
                border-radius: 50%;
                transform: rotate(-30deg);
              }
            }
          }
        }

        &-item.act {
          background: #f84545;

          .info {
            &-l {
              .title {
                color: #fff;
              }

              .num {
                color: #fff;
              }
            }
          }
        }
      }
    }
  }
}
</style>
