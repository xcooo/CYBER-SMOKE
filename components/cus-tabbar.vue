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
          icon: '/static/tabbar/home.png',
          selectIcon: '/static/tabbar/home-active.png',
          text: '首页',
          centerItem: false
        },
        {
          id: 1,
          path: '/pages/tabBar/charts',
          icon: '/static/tabbar/shop.png',
          selectIcon: '/static/tabbar/shop-active.png',
          text: '排行榜',
          centerItem: false
        },
        {
          id: 2,
          path: '/pages/index/index',
          icon: '/static/tabbar/shop.png',
          selectIcon: '/static/tabbar/shop-active.png',
          text: '商城',
          centerItem: false
        },

        {
          id: 3,
          path: '/pages/tabBar/bag',
          icon: '/static/tabbar/cangku.png',
          selectIcon: '/static/tabbar/cangku-active.png',
          text: '盒柜',
          centerItem: false
        },
        {
          id: 4,
          path: '/pages/tabBar/my',
          icon: '/static/tabbar/my.png',
          selectIcon: '/static/tabbar/my-active.png',
          text: '我的',
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
      console.log(item)
      //_this.currentItem = item.id;
      uni.switchTab({
        url: item.path
      });
    }
  }
};
</script>
<style>
view {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

.tabbar-container {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  /* height: 110rpx; */
  /* box-shadow: 0 0 5px #999; */
  display: flex;
  align-items: center;
  padding: 5rpx 0;
  color: #999999;
  z-index: 100;
  padding-bottom: env(safe-area-inset-bottom);
  padding-bottom: env(safe-area-inset-bottom);
  /*兼容 IOS>11.2*/
  /* background: url("../static/home/tabbar-bg.png") no-repeat 50%/100% 100%;
   */
  background: #fff5ee;
  border-top-left-radius: 20rpx;
  border-top-right-radius: 20rpx;
  border: 4rpx solid #fffb22;
  height: 200rpx;
}

.tabbar-container .tabbar-item {
  width: 25%;
  /* height: 200rpx; */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  margin-top: 30rpx;
}

.tabbar-container .item-active {
  color: #000;
}

.tabbar-container .center-item {
  display: block;
  position: relative;
  height: 43px;
}

.tabbar-container .tabbar-item .item-top {
  width: 50rpx;
  height: 50rpx;
  margin-bottom: 20rpx;
}

.tabbar-container .center-item .item-top {
  flex-shrink: 0;
  width: 100rpx;
  height: 100rpx;
  position: absolute;
  top: -54rpx;
  left: 50%;
  transform: translateX(-50%);
  border-radius: 50%;
  padding: 10rpx;
  background-color: #ffffff;
}

.tabbar-container .tabbar-item .item-top image {
  width: 100%;
  height: 100%;
}

.tabbar-container .tabbar-item .item-bottom {
  font-size: 12px;
  width: 100%;
}

.tabbar-container .center-item .item-bottom {
  position: absolute;
  bottom: 8rpx;
}
</style>