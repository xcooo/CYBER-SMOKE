<!--
 * @Date: 2022-12-01 18:08:54
 * @LastEditTime: 2022-12-15 22:06:01
 * @Description: content
-->
<template>
  <view class="page-wrap">
    <uni-nav-bar
      :title="'收货评价'"
      color="#333"
      leftIcon="left"
      backgroundColor="#fff"
      :border="false"
      :statusBar="true"
      :fixed="true"
      @clickLeft="$common.back()"
    ></uni-nav-bar>

    <!-- <scroll-view scroll-x class="tab-wrap">
      <view class="tab-content">
        <view class="tab-list">
          <view
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
      </view>
    </scroll-view> -->

    <mescroll-body
      ref="mescrollRef"
      @init="mescrollInit"
      @down="downCallback"
      @up="getList"
      :down="downOption"
      :up="upOption"
    >
      <view class="list">
        <view v-for="(item, i) in listData" :key="i" class="list-item">
          <view class="list-item-hd">
            <view class="avatar">
              <cimage :src="item.avatar" mode="scaleToFill" />
            </view>

            <view class="name hang1">{{ item.nickName }}</view>
          </view>

          <view class="list-item-bd">
            <uni-rate
              :size="18"
              :value="item.star"
              readonly
              color="#cccccc"
              active-color="#fe2f3c"
            />

            <view class="goods-name hang1">
              <text>|</text>

              {{ item.title }}
            </view>
          </view>

          <view class="list-item-ft">
            {{ item.content }}
          </view>

          <view class="img-list">
            <view @click="$common.previewImg(a)" v-for="(a, b) in item.thumb" :key="b" class="img-list-item">
              <cimage :src="a" mode="scaleToFill" />
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
      tabList: [
        {
          id: 1,
          title: '全部'
        },
        {
          id: 1,
          title: '东西不错'
        },
        {
          id: 1,
          title: '太值了'
        },
        {
          id: 1,
          title: '是正品'
        },
        {
          id: 1,
          title: '是正品'
        },
        {
          id: 1,
          title: '是正品'
        },
        {
          id: 1,
          title: '是正品'
        },
        {
          id: 1,
          title: '是正品'
        }
      ],
      tabCur: 0
    }
  },

  onLoad(options) {
    this.optionsData = options
  },

  methods: {
    /**
     * @description: 获取列表数据
     * @param {*}
     * @return {*}
     */
    getList({ num, size }) {
      this.req({
        url: '/v1/box/rating',
        data: {
          id: this.optionsData.id,
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
    }
  }
}
</script>

<style lang="scss">
.page-wrap {
  padding-bottom: 40rpx;

  .tab-wrap {
    background: #fff;
    height: 88rpx;

    .tab-content {
      display: inline-block;
      height: 100%;

      .tab-list {
        height: 100%;
        display: flex;
        align-items: center;
        padding: 0 30rpx;

        &-item {
          padding: 10rpx 20rpx;
          border-radius: 999rpx;
          background: #faeeee;
          white-space: nowrap;

          font-size: 20rpx;
          font-family: PingFang SC;
          font-weight: 500;
          color: #333333;

          &.act {
            background: #fe2b22;
            color: #fff;
          }
        }

        &-item + .tab-list-item {
          margin-left: 15rpx;
        }
      }
    }
  }

  .list {
    padding: 1rpx 0 0;

    &-item {
      padding: 30rpx 50rpx 40rpx;
      background: #fff;
      border-radius: 10rpx;
      margin-top: 20rpx;

      &-hd {
        display: flex;
        align-items: center;

        .avatar {
          width: 64rpx;
          height: 64rpx;
          border-radius: 50%;
          overflow: hidden;
          margin-left: 10rpx;
        }

        .name {
          width: 250rpx;
          padding-left: 28rpx;

          font-size: 24rpx;
          font-family: PingFang SC;
          font-weight: bold;
          color: #333333;
        }
      }

      &-bd {
        display: flex;
        align-items: center;
        margin-top: 10rpx;

        .goods-name {
          flex: 1;
          font-size: 20rpx;
          font-family: PingFang SC;
          font-weight: 500;
          color: #999999;
          line-height: 36rpx;

          text {
            padding: 0 10rpx;
          }
        }
      }

      &-ft {
        margin-top: 30rpx;

        font-size: 26rpx;
        font-family: PingFang SC;
        // font-weight: bold;
        color: #333333;
      }

      .img-list {
        display: flex;
        padding: 1rpx 0 0;
        flex-flow: row wrap;

        &-item {
          width: 140rpx;
          height: 140rpx;
          margin-top: 20rpx;
          margin-right: 20rpx;
        }
      }
    }
  }
}
</style>
