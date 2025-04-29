<template>
  <!-- 登录弹窗 -->
  <uni-popup ref="loginPopup" type="center">
    <view class="tiploginShow-view">
      <view class="tiploginShow-view-0">
        您还未登录
      </view>
      <view class="tiploginShow-view-1">
        请登录以后再进行此操作~
      </view>
      <view class="tiploginShow-view-2" @click="$common.to({ url: '/pages/mine/login' })">
        前往登录
      </view>
      <view class="tiploginShow-view-3" @click="$refs.loginPopup.close()">
        暂不登录
      </view>

    </view>
  </uni-popup>
</template>

<script>
export default {
  name: 'LoginPopup',
  components: {

  },
  data () {
    return {

    }
  },
  methods: {
    open () {
      this.$refs.loginPopup.open('center');
    },
    close () {
      this.$refs.loginPopup.close();
    }
  },
}
</script>

<style lang='scss' scoped>
.tiploginShow-view {
  width: 260px;
  background-color: #fff;
  border-radius: 15px;
  padding: 15px;
  box-sizing: border-box;

  .tiploginShow-view-0 {
    text-align: center;
    font-size: 16px;
    color: #131313;
  }

  .tiploginShow-view-1 {
    text-align: center;
    font-size: 12px;
    margin-top: 10px;
    color: #2c2c2c;
  }

  .tiploginShow-view-2 {
    width: 208px;
    height: 41px;
    // background: linear-gradient(90deg, #f6d181 0%, #d0749d 100%);
    // background-color: #d0749d;
    background: linear-gradient(to right, #5dfda1, #baf828);
    box-shadow: 2rpx 10rpx 2rpx 2rpx #209200;

    color: #000;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 20px auto 10px;
    border-radius: 20rpx;
  }

  .tiploginShow-view-3 {
    text-align: center;

  }
}
</style>