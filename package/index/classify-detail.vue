<!--
 * @Date: 2022-11-21 19:17:15
 * @LastEditTime: 2024-05-09 15:13:19
 * @Description: content
-->
<template>
  <view class="page-wrap">
    <!-- 状态栏 -->
    <view class="status-bar" :style="{
      height: sysConfig.statusBarHeight + 'px',
      width: '100%'
    }"></view>

    <view class="page-wrap-header">
      <uni-icons @click="$common.back()" class="left-icon" type="left" color="#fff" size="24" />

      <view @click="toSearch" class="input-box">
        <view>请输入商品关键词</view>

        <view class="icon">
          <cimage src="/static/icon/search.png" mode="scaleToFill" />
        </view>
      </view>
    </view>

    <view class="tab-list">
      <view @click="tabChage(item, i)" v-for="(item, i) in tabList" :key="i" class="tab-list-item" :class="{
        act: tabCur == i
      }">
        <view class="title">{{ item.title }}</view>

        <view v-if="item.sort" class="sort">
          <view class="icon">
            <cimage v-if="item.sortType == 4" src="/static/icon/top_act.png" mode="scaleToFill" />

            <cimage v-else src="/static/icon/top.png" mode="scaleToFill" />
          </view>

          <view class="icon">
            <cimage v-if="item.sortType == 5" src="/static/icon/bt_act.png" mode="scaleToFill" />

            <cimage v-else src="/static/icon/bt.png" mode="scaleToFill" />
          </view>
        </view>
      </view>
    </view>

    <mescroll-body ref="mescrollRef" @init="mescrollInit" @down="downCallback" @up="getList" :down="downOption"
      :up="upOption">
       <view class="goods-list">
        <!-- 左列 -->
        <view class="goods-list-col">
          <template v-for="( item, i ) in  listData ">
            <view @click="toMallDetail(item)" v-if="i % 2 == 0" :key="i" class="goods-list-col-item">
              <view class="pic">
                <cimage :src="item.thumb" mode="scaleToFill" />
              </view>

              <!-- <view class="tag-list">
                <view class="tag-list-item zheng">正品保障</view>

                <view class="tag-list-item">{{ item.cat_desc }}</view>
              </view> -->

              <view class="name hang1">
                {{ item.title }}
              </view>

              <view class="price-num">
                <view class="price">
                  ¥
                  <text>
                    {{ item.price }}

                    <!-- <text>¥{{ item.old_price }}</text> -->
                  </text>
                </view>
              </view>
            </view>
          </template>
        </view>

        <!-- 右列 -->
        <view class="goods-list-col">
          <template v-for="( item, i ) in  listData ">
            <view @click="toMallDetail(item)" v-if="i % 2 != 0" :key="i" class="goods-list-col-item">
              <view class="pic">
                <cimage :src="item.thumb" mode="scaleToFill" />
              </view>

              <!-- <view class="tag-list">
                <view class="tag-list-item zheng">正品保障</view>

                <view class="tag-list-item">{{ item.cat_desc }}</view>
              </view> -->

              <view class="name hang1">
                {{ item.title }}
              </view>

              <view class="price-num">
                <view class="price">
                  ¥
                  <text>
                    {{ item.price }}

                    <!-- <text>¥{{ item.old_price }}</text> -->
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
      tabList: [
        {
          id: 1,
          title: '综合排序'
        },
        {
          id: 2,
          title: '最新上架'
        },
        {
          id: 3,
          title: '销量优先'
        },
        {
          id: 4,
          title: '价格排序',
          sort: true,
          sortType: ''
        }
      ],
      tabCur: 0
    }
  },

  computed: {
    ...mapGetters(['sysConfig'])
  },

  onReady () { },

  onLoad (options) {
    this.optionsData = options
  },

  methods: {
    /**
     * @description: 去搜索
     * @return {*}
     */
    toSearch () {
      this.$common.to({
        type: 2,
        url: '/package/index/search',
        query: {
          catId: this.optionsData.catId
        }
      })
    },

    /**
     * @description: 商城详情
     * @param {*} item
     * @return {*}
     */
    toMallDetail (item) {
      this.$common.to({
        url: '/package/mall/mall-detail',
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
    getList ({ num, size }) {
      let data = {
        cat_id: this.optionsData.catId || '',
        page: num,
        per_page: size,
        sort_type: ''
      }

      if (this.tabList[this.tabCur].id != 4) {
        data.sort_type = this.tabList[this.tabCur].id
      } else {
        data.sort_type = this.tabList[this.tabCur].sortType
      }

      this.req({
        url: '/v1/shop/list',
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
     * @description: tab切换
     * @param {*} item
     * @param {*} i
     * @return {*}
     */
    tabChage (item, i) {
      this.tabCur = i
      if (item.sort) {
        if (item.sortType !== 4) {
          item.sortType = 4
        } else {
          item.sortType = 5
        }
      } else {
        this.tabList.map(item => {
          item.sortType = ''
        })
      }

      this.listData = []
      this.mescroll.resetUpScroll()
      this.mescroll.scrollTo(0, 0)
    }
  }
}
</script>

<style lang="scss">
.page-wrap {
  background: url("https://img.alicdn.com/imgextra/i4/2200676927379/O1CN01unkdtT24NdWplMdw8_!!2200676927379.png") no-repeat;
  background-size: 100% 100%;
  min-height: calc(100vh - 50px);

  .status-bar {
    background: #222333;
    color: #fff;
  }

  &-header {
    display: flex;
    align-items: center;
    height: 88rpx;
    padding: 0 10rpx;
    background: #222333;
    color: #fff;

    .input-box {
      margin-left: 20rpx;
      border-radius: 999rpx;
      background: #f6f5f5;
      width: 400rpx;
      height: 56rpx;
      padding: 0 30rpx;
      box-sizing: border-box;
      display: flex;
      justify-content: space-between;
      align-items: center;

      font-size: 24rpx;
      font-family: PingFang SC;
      font-weight: 500;
      color: #b2b2b2;

      .icon {
        width: 50rpx;
        height: 50rpx;
      }
    }
  }

  .tab-list {
    padding: 0 30rpx;
    justify-content: space-between;
    align-items: center;
    display: flex;
    height: 88rpx;
    background: #fff;
    background: #222333;
    color: #fff;

    &-item {
      display: flex;
      justify-content: center;
      align-items: center;
      transition: all 0.3s;

      font-size: 28rpx;
      font-family: PingFang SC;
      font-weight: 500;
      color: #fff;

      .sort {
        display: flex;
        flex-flow: column nowrap;
        justify-content: center;
        align-items: center;
        margin-left: 10rpx;

        .icon {
          width: 12rpx;
          height: 12rpx;
        }

        .icon+.icon {
          margin-top: 2rpx;
        }
      }

      &.act {
        font-size: 32rpx;
        font-family: PingFang SC;
        font-weight: bold;
        color: #7368b4;
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
        // background: #ffffff;
        margin-bottom: 30rpx;
        background: url('../../static/home/market-border.png') no-repeat no-repeat;
        background-size: 100% 100%;
        padding-bottom: 30rpx;

        .pic {
          height: 340rpx;
          margin-bottom: 20rpx;
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
          padding: 20rpx 30rpx;

          font-size: 16px;
          font-family: PingFang SC;
          font-weight: 500;
          color: #fff;
        }

        .price-num {
          padding: 0rpx 30rpx;
          display: flex;
          flex-flow: row wrap;
          justify-content: space-between;
          align-items: center;

          .price {
            font-size: 32rpx;
            font-family: PingFang SC;
            font-weight: bold;
            color: #edc736;

            text {
              font-size: 32rpx;
              margin-left: 5rpx;

              text {
                margin-left: 10rpx;
                font-size: 20rpx;
                font-family: PingFang SC;
                font-weight: 500;
                text-decoration: line-through;
                color: #edc736;
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
