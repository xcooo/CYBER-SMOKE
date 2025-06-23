<template>
  <view class="tabbar-container">
    <block>
      <view class="tabbar-item" v-for="(item, index) in tabbarList" :class="[item.centerItem ? ' center-item' : '']"
        @click="changeItem(item)">
        <view class="item-top">
          <image :src="currentItem == item.id ? item.selectIcon : item.icon"></image>
        </view>
        <view class="item-bottom" :class="[currentItem == item.id ? 'item-active' : '']">
          <text>{{ item.text }}</text>
        </view>
      </view>
    </block>
  </view>
</template>
 
<script>
export default {
  props: {
    currentPage: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      currentItem: 0,
      tabbarList: [
        {
          id: 0,
          path: '/pages/tabBar/home',
          icon: 'https://img.alicdn.com/imgextra/i3/2200676927379/O1CN01bNiOMd24NdczpbDBY_!!2200676927379.png',
          selectIcon: 'https://img.alicdn.com/imgextra/i1/2200676927379/O1CN01BKkZhz24Ndd25cGa2_!!2200676927379.png',
          text: '首页',
          centerItem: false
        },
        {
          id: 1,
          path: '/pages/tabBar/help',
          icon: 'https://img.alicdn.com/imgextra/i4/2200676927379/O1CN01BTBcOD24Ndd1fVl40_!!2200676927379.png',
          selectIcon: 'https://img.alicdn.com/imgextra/i3/2200676927379/O1CN01MIuQxl24Ndd1XUioY_!!2200676927379.png',
          text: '帮助中心',
          centerItem: false
        },
        // {
        //   id: 2,
        //   path: '/pages/index/index',
        //   icon: 'https://img.alicdn.com/imgextra/i4/2200676927379/O1CN01cUqZkj24NdcrJ0U8K_!!2200676927379.png',
        //   selectIcon: 'https://img.alicdn.com/imgextra/i3/2200676927379/O1CN01ptcdmZ24NdcoA0fYI_!!2200676927379.png',
        //   text: '商城',
        //   centerItem: false
        // },

        {
          id: 2,
          path: '/pages/tabBar/bag',
          icon: 'https://img.alicdn.com/imgextra/i4/2200676927379/O1CN01jFN45I24Ndd25fDa3_!!2200676927379.png',
          selectIcon: 'https://img.alicdn.com/imgextra/i1/2200676927379/O1CN01ss7WdL24Ndd1fWUoj_!!2200676927379.png',
          text: '我的订单',
          centerItem: false
        },
        {
          id: 3,
          path: '/pages/tabBar/my',
          icon: 'https://img.alicdn.com/imgextra/i3/2200676927379/O1CN01m5Y0E324Ndczu76Km_!!2200676927379.png',
          selectIcon: 'https://img.alicdn.com/imgextra/i3/2200676927379/O1CN01s5yQjV24NdczpYfCD_!!2200676927379.png',
          text: '个人中心',
          centerItem: false
        }
      ]
    };
  },
  mounted () {
    this.currentItem = this.currentPage;
    uni.hideTabBar();
  },
  methods: {
    changeItem (item) {
      let _this = this;
      //_this.currentItem = item.id;
      uni.switchTab({
        url: item.path
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.tabbar-container {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding: 20rpx 0 10rpx; // 上方增加间距
  padding-bottom: calc(env(safe-area-inset-bottom) + 10rpx);
  background: linear-gradient(90deg, #fcb045, #fd1d1d, #833ab4); // 橙→红→紫
  background: linear-gradient(90deg, #3a8dde, #6aabf7);
  background: #01435d;

  // 海蓝 → 水蓝，适合智能、管理类App
  box-shadow: 0 -4rpx 12rpx rgba(0, 0, 0, 0.15);
  color: #ffffff;

  .tabbar-item {
    width: 25%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .item-top {
      width: 50rpx;
      height: 50rpx;
      margin-bottom: 6rpx;

      image {
        width: 100%;
        height: 100%;
      }
    }

    .item-bottom {
      font-size: 24rpx;
      color: rgba(255, 255, 255, 0.85);
      transition: all 0.3s;
    }

    &.item-active {
      .item-bottom {
        color: #fff;
        font-weight: bold;
        text-shadow: 0 0 6rpx rgba(255, 255, 255, 0.5);
      }
    }
  }

  .center-item {
    position: relative;
    height: 48px;

    .item-top {
      position: absolute;
      top: -60rpx;
      left: 50%;
      transform: translateX(-50%);
      width: 100rpx;
      height: 100rpx;
      padding: 10rpx;
      background: linear-gradient(135deg, #ff9a9e, #fad0c4); // 中间按钮粉系渐变
      box-shadow: 0 6rpx 16rpx rgba(255, 174, 174, 0.5);
    }

    .item-bottom {
      position: absolute;
      bottom: 4rpx;
      font-size: 24rpx;
      color: #fff;
    }
  }
}
</style>