<template>
  <view class="touch-page">
    <uni-nav-bar title="对对碰" color="#333" leftIcon="left" backgroundColor="#fff" :border="false" :statusBar="true"
    :fixed="true" @clickLeft="$common.back()"></uni-nav-bar>
    
    <mescroll-body ref="mescrollRef" height="400" @init="mescrollInit" @down="downCallback" @up="getList"
      :down="downOption" :up="upOption">
      <view class="list-container">
        <view class="list-item" v-for="(item, index) in listData" :key="index" @click="toDetail(item)">
          <image :src="item.thumb" class="item-image" mode="widthFix" />
          <view class="item-title">{{ item.title }}</view>
          <view class="item-price"><text>¥</text><text class="price">{{ item.price }}</text></view>
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
      listData: [],
    }
  },
  onShow () {
    this.$store.dispatch('getUserInfo').then(res => {
      console.log(res)
      this.userInfo = res.data
    })
    this.getList({ num: 1, size: 20 })
  },
  computed: {
  },
  methods: {
    getList ({
      num,
      size
    }) {

      let data = {
        page: num,
        per_page: size,
        type: 4,
      }
      this.req({
        url: '/v1/collision/list',
        data,
        Loading: true,
        success: res => {
          if (res.code == 200) {
            if (num == 1) {
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
    toDetail (item) {
      this.$common.to({
        url: '/pages/rightTouch/detail',
        query: {
          id: item.id
        }
      })
    },
  },
}
</script>

<style lang='scss' scoped>
.touch-page {

}
// 列表项目
.list-container {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20rpx;
  padding: 20rpx;

  .list-item {
    display: flex;
    flex-direction: column;
    background-color: #fff;
    border-radius: 10rpx;
    box-shadow: 0 4rpx 10rpx rgba(0, 0, 0, 0.1);

  }

  .item-image {
    width: 100%;
    height: 200rpx;
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
  }

  .item-title {
    font-size: 28rpx;
    color: #333;
    margin-top: 20rpx;
    text-align: left;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    padding: 0 20rpx;
  }

  .item-price {
    font-size: 24rpx;
    color: #e53e38;
    padding: 20rpx 20rpx;
    font-weight: 700;

    .price {
      font-size: 32rpx;
    }
  }
}
</style>