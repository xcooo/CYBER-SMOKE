<!--
 * @Date: 2022-11-24 15:15:21
 * @LastEditTime: 2022-12-14 21:22:29
 * @Description: content
-->
<template>
  <view class="page-wrap">
    <uni-nav-bar
      title="反馈记录"
      color="#333"
      leftIcon="left"
      backgroundColor="#fff"
      :border="false"
      :statusBar="true"
      :fixed="true"
      @clickLeft="$common.back()"
    ></uni-nav-bar>

    <mescroll-body
      ref="mescrollRef"
      @init="mescrollInit"
      @down="downCallback"
      @up="getList"
      :down="downOption"
      :up="upOption"
    >
      <view class="log-list">
        <view v-for="(item, i) in listData" :key="i" class="log-list-item">
          <view
            class="status"
            :class="{
              act: item.status === 1
            }"
          >
            <template v-if="item.status === 0">待处理</template>

            <template v-if="item.status === 1">已处理</template>
          </view>

          <view class="row">
            <view class="row-title">问题类型</view>

            <view class="right">
              <view>{{ item.title }}</view>
            </view>
          </view>

          <view class="row">
            <view class="row-title">问题描述</view>

            <view class="right">
              <view>{{ item.content }}</view>
            </view>
          </view>

          <view v-if="item.thumb && item.thumb.length > 0" class="row">
            <view class="row-title"></view>

            <view class="right">
              <view class="img-list">
                <view
                  @click="$common.previewImg(a)"
                  v-for="(a, b) in item.thumb"
                  :key="b"
                  class="img-list-item common_bg"
                  :style="{
                    backgroundImage: `url(${a})`
                  }"
                ></view>
              </view>
            </view>
          </view>

          <view v-if="item.reply" class="row">
            <view class="row-title">回复</view>

            <view class="right">
              <view>{{ item.reply }}</view>
            </view>
          </view>
        </view>
      </view>
    </mescroll-body>
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
      money: '',
      imgUrl: ''
    }
  },

  computed: {
    ...mapGetters(['userInfo', 'appConfig'])
  },

  onShow() {},

  onReady() {},

  methods: {
    /**
     * @description: 获取列表数据
     * @param {*}
     * @return {*}
     */
    getList({ num, size }) {
      this.req({
        url: '/v1/complain/log',
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
    }
  }
}
</script>

<style lang="scss">
.page-wrap {
  padding: 0 30rpx 40rpx;

  .log-list {
    padding: 1rpx 0 0;

    &-item {
      padding: 20rpx 30rpx;
      border-radius: 10rpx;
      background: #fff;
      margin-top: 20rpx;
      position: relative;

      .status {
        font-size: 26rpx;
        color: #999;
        position: absolute;
        right: 30rpx;
        top: 20rpx;
        z-index: 1;

        &.act {
          color: #ff3333;
        }
      }

      .row {
        display: flex;
        font-size: 26rpx;
        color: #333;

        &-title {
          width: 140rpx;
        }

        .right {
          flex: 1;
          color: #666;

          .img-list {
            display: flex;

            &-item {
              width: 60rpx;
              height: 60rpx;
              margin-right: 20rpx;
              border-radius: 10rpx;
              overflow: hidden;
            }
          }
        }
      }

      .row + .row {
        margin-top: 20rpx;
      }
    }
  }
}
</style>
