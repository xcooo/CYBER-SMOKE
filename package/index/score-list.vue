<template>
  <view class="touch-page">
    <uni-nav-bar title="积分商城" color="#333" leftIcon="left" backgroundColor="#fff" :border="false" :statusBar="true"
      :fixed="true" @clickLeft="$common.back()"></uni-nav-bar>

    <!-- 用户积分展示 -->
    <view class="user-info">
      <view class="user-score">
        <text>我的积分：</text>
        <text class="score-value">{{ userInfo.coin || 0 }} 积分</text> <!-- 用户积分，未登录显示0 -->
      </view>
    </view>

    <mescroll-body ref="mescrollRef" height="400" @init="mescrollInit" @down="downCallback" @up="getList"
      :down="downOption" :up="upOption">
      <view class="list-container">
        <view class="list-item" v-for="(item, index) in listData" :key="index">
          <image :src="item.thumb" class="item-image" mode="aspectFit" />
          <view class="item-title">{{ item.title }}</view>
          <view class="item-price">
            <text class="price">{{ item.score }}</text><text>积分</text>
          </view>

          <!-- 显示所有用户的兑换次数 -->
          <view class="item-info">
            <view class="item-exchange-info">
              <view class="flex flex-jbetween mb-5">
                <view class="exchange-count">共兑：{{ item.exchange_count }} 次</view>
                <view v-if="item.total_limit > 0" class="limit-count">
                  总限：{{ item.total_limit }} 次
                </view>
                <view v-else class="limit-count">
                  不限总次数
                </view>
              </view>
              <view v-if="item.limit_per_user > 0" class="limit-count">
                每人限次：{{ item.limit_per_user }} 次
              </view>
              <view v-else class="limit-count">
                每人不限次数
              </view>
            </view>
          </view>

          <view class="exchange-btn" :class="{ disabled: isDisabled(item) }" @click="handleExchange(item)">
            {{ isDisabled(item) ? '已达上限' : '积分兑换' }}
          </view>
        </view>
      </view>
    </mescroll-body>
  </view>
</template>

<script>
export default {
  components: {

  },
  data () {
    return {
      // 下拉刷新的配置(可选, 绝大部分情况无需配置)
      downOption: {
        use: false,
        auto: false
      },
      // 上拉加载的配置(可选, 绝大部分情况无需配置)
      upOption: {
        auto: true,
        page: {
          size: 20 // 每页数据的数量,默认10
        }
      },
      userInfo: '',  // 存储用户信息
      listData: [], // 存储商品列表数据
    }
  },
  onShow () {

    this.getUserInfo()
    this.getList({ num: 1, size: 20 })
  },
  computed: {
  },
  methods: {
    isDisabled (item) {
      return (
        (item.limit_per_user > 0 && item.user_exchange_count >= item.limit_per_user) ||
        (item.total_limit > 0 && item.exchange_count >= item.total_limit)
      );
    },
    getUserInfo () {
      this.$store.dispatch('getUserInfo').then(res => {
        console.log(res)
        this.userInfo = res.data
      })
    },
    getList (data) {
      let requestData = {
        page: data.num,
        per_page: data.size,
        type: 4,
      }
      this.req({
        url: '/v1/scoreGoods/list',
        data: requestData,
        Loading: true,
        success: res => {
          if (res.code == 200) {
            if (data.num == 1) {
              this.listData = []
            }
            this.listData = [...this.listData, ...res.data.data]
            this.mescroll.endBySize(res.data.data.length, res.data.total)
          } else {
            this.mescroll.endBySize(0, 0)
          }
        }
      })
    },
    handleExchange (item) {
      if (this.isDisabled(item)) {
        uni.showToast({
          title: '每人兑换次数已达上限',
          icon: 'none'
        })
        return
      }
      let that = this
      uni.showModal({
        title: '提示',
        content: '确认兑换该商品',
        success: function (res) {
          if (res.confirm) {
            that.req({
              url: '/v1/scoreGoods/order',
              data: { id: item.id },
              Loading: true,
              success: res => {
                if (res.code == 200) {
                  uni.showToast({
                    title: res.msg,
                    icon: 'none',
                    mask: true
                  })
                  that.getUserInfo()
                  that.getList({ num: 1, size: 20 })
                }
              }
            })
          }
        }
      })
    }
  },
}
</script>

<style lang='scss' scoped>
.touch-page {}

.user-info {
  padding: 16rpx;
  background-color: #fff;
  box-shadow: 0 4rpx 8rpx rgba(0, 0, 0, 0.1);
  text-align: center;
}

.user-score {
  font-size: 32rpx;
  color: #333;
  font-weight: bold;
}

.score-value {
  font-size: 36rpx;
  color: #ff3d00;
}

.list-container {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  /* 3列布局 */
  gap: 24rpx;
  padding: 24rpx;

  .list-item {
    display: flex;
    flex-direction: column;
    background: linear-gradient(to bottom, #ffffff, #f7f8fa);
    border-radius: 20rpx;
    box-shadow: 0 8rpx 16rpx rgba(0, 0, 0, 0.06);
    overflow: hidden;
    transition: transform 0.2s;
    max-width: 100%;
    padding-bottom: 20rpx;
    // min-height: 450rpx;
    /* 设置统一的最小高度，避免按钮区域不一致 */

    &:active {
      transform: scale(0.98);
    }

    .item-image {
      width: 100%;
      height: 180rpx;
      /* 固定图片高度 */
      object-fit: cover;
      border-top-left-radius: 20rpx;
      border-top-right-radius: 20rpx;
    }

    .item-title {
      font-size: 28rpx;
      color: #222;
      margin-top: 16rpx;
      padding: 0 20rpx;
      text-align: center;
      line-height: 1.4em;
      min-height: 72rpx;
      overflow: hidden;
    }

    .item-price {
      font-size: 26rpx;
      color: #e53e38;
      text-align: center;
      font-weight: bold;
      padding: 12rpx 20rpx;
    }

    .item-info {
      font-size: 24rpx;
      color: #999;
      padding: 0 20rpx 10rpx;
      display: flex;
      justify-content: center;
      gap: 8rpx;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;

      /* 在一行显示“已兑”和“限兑” */
      .item-exchange-info {
        // display: flex;
        // justify-content: space-between;
        width: 100%;
        font-size: 24rpx;
      }

      .exchange-count,
      .limit-count {
        margin-right: 10rpx;
      }
    }


    .exchange-btn {
      margin: 20rpx auto 0;
      width: 80%;
      text-align: center;
      background: linear-gradient(135deg, #ff7e1b, #ff3d00);
      color: #fff;
      padding: 10rpx 0;
      border-radius: 40rpx;
      font-size: 28rpx;
      font-weight: 500;
      transition: all 0.2s;

      &:active {
        transform: scale(0.96);
        opacity: 0.9;
      }
    }

    .exchange-btn.disabled {
      background: #ccc;
      color: #666;
    }
  }
}
</style>
