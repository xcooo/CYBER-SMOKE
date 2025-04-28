<!--
 * @Date: 2022-08-02 10:52:30
 * @LastEditTime: 2022-12-27 14:07:31
 * @Description: 搜索结果
-->
<template>
  <view class="page-wrap">
    <!-- <uni-nav-bar
      title="搜索结果"
      color="#333"
      leftIcon="left"
      backgroundColor="#fff"
      :border="false"
      :statusBar="true"
      :fixed="true"
      @clickLeft="$common.back()"
    ></uni-nav-bar> -->

    <view
      :style="{
        height: `calc(${sysConfig.statusBarHeight}px)`,
        background: '#fff'
      }"
    ></view>

    <view class="search-box">
      <view @click="toSearch" class="search-box-shadow"></view>

      <view @click="$common.back()" class="back">
        <uni-icons
          :style="{
            fontWeight: 'normal'
          }"
          type="left"
          color="#333"
          size="20"
        />
      </view>

      <view class="search-box-content">
        <view @click="toSearch" class="search-box-content-shadow"></view>

        <uni-search-bar
          v-model="optionsData.keywords"
          :focus="false"
          :radius="999"
          disabled
          clearButton="none"
          cancelButton="none"
        ></uni-search-bar>
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
      <view class="goods-list">
        <!-- 左列 -->
        <view class="goods-list-col">
          <template v-for="(item, i) in listData">
            <view
              @click="toMallDetail(item)"
              v-if="i % 2 == 0"
              :key="i"
              class="goods-list-col-item"
            >
              <view class="pic">
                <cimage :src="item.thumb" mode="scaleToFill" />
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
                  ¥
                  <text>
                    {{ item.price }}

                    <text>¥{{ item.old_price }}</text>
                  </text>
                </view>
              </view>
            </view>
          </template>
        </view>

        <!-- 右列 -->
        <view class="goods-list-col">
          <template v-for="(item, i) in listData">
            <view
              @click="toMallDetail(item)"
              v-if="i % 2 != 0"
              :key="i"
              class="goods-list-col-item"
            >
              <view class="pic">
                <cimage :src="item.thumb" mode="scaleToFill" />
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
                  ¥
                  <text>
                    {{ item.price }}

                    <text>¥{{ item.old_price }}</text>
                  </text>
                </view>
              </view>
            </view>
          </template>
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
        auto: false,
        page: {
          size: 20 // 每页数据的数量,默认10
        }
      },
      listData: []
    }
  },

  computed: {
    ...mapGetters(['sysConfig'])
  },

  onLoad(options) {
    this.optionsData = options
  },
  onReady() {
    this.mescroll.resetUpScroll()
    this.mescroll.scrollTo(0, 0)
  },
  methods: {
    /**
     * @description: 去商品详情
     * @param {*} item
     * @return {*}
     */
    toMallDetail(item) {
      this.$common.to({
        url: '/package/mall/mall-detail',
        query: {
          id: item.id
        }
      })
    },

    /**
     * @description: 获取搜索结果
     * @param {*} num
     * @param {*} size
     * @return {*}
     */
    getList({ num, size }) {
      let url = '/v1/shop/list'

      this.req({
        url,
        data: {
          page: num,
          per_page: size,
          keywords: this.optionsData.keywords,
          cat_id: this.optionsData.catId || ''
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
     * @description: 前往搜索
     * @return {*}
     */
    toSearch() {
      let query = Object.assign({}, this.optionsData)
      delete query.keywords
      this.$common.to({
        type: 2,
        url: '/package/index/search',
        query
      })
    }
  }
}
</script>

<style lang="scss">
.page-wrap {
  .search-box {
    background: #fff;
    display: flex;
    align-items: center;
    height: 88rpx;

    .back {
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 10rpx 10rpx 10rpx 20rpx;
    }

    &-content {
      width: 450rpx;
      position: relative;

      &-shadow {
        width: 100%;
        height: 100%;
        position: absolute;
        left: 0;
        top: 0;
        z-index: 10;
      }
    }

    ::v-deep.uni-searchbar {
      padding: 10rpx;

      .uni-searchbar__box {
        padding: 0 10rpx 0 0 !important;
        height: 60rpx !important;
        display: flex !important;
        align-items: center !important;
      }

      .uni-searchbar__box-icon-clear {
        line-height: 60rpx !important;
      }
    }
  }

  .goods-list {
    display: flex;
    justify-content: space-between;
    padding: 14rpx 30rpx 10rpx;

    &-col {
      &-item {
        width: 340rpx;
        border-radius: 10rpx;
        overflow: hidden;
        background: #ffffff;
        margin-bottom: 30rpx;

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
            border: 2rpx solid #eb989c;

            &.zheng {
              color: #fff;
              background: #333333;
              border-color: #333333;
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
  }
}
</style>
