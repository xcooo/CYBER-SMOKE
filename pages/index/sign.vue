<template>
  <view class="sign-container">
    <view class="nav-bar">
      <view class="nav-left" @click="goBack">
        <u-icon name="arrow-left" color="#333" size="40"></u-icon>
      </view>
      <view class="nav-title">签到任务</view>
    </view>

    <!-- 标题 -->
    <view class="score-wrap">
      <view class="title">我的积分</view>
      <view class="score">{{ coin }}</view>
    </view>

    <!-- 签到日历 -->
    <view class="sign-card">
      <view class="sign-grid">
        <view v-for="(item, index) in signList" :key="index" class="sign-day" :class="[
          item.status ? 'signed' : '',
          index === 6 ? 'last-day' : ''
        ]">
          <view class="day-label">第{{ item.day }}天</view>

          <!-- 遮罩层 -->
          <view v-if="item.status" class="mask">
            已签到
          </view>
          <image v-if="index === 6" class="coin-img"
            src="https://img.alicdn.com/imgextra/i3/2200676927379/O1CN01owmomh24NdcXgD3uz_!!2200676927379.png" />
          <image v-else class="coin-img"
            src="https://img.alicdn.com/imgextra/i4/2200676927379/O1CN01pWpy1324NdcZ5vSha_!!2200676927379.png" />

          <view class="reward-text">{{ item.points }} 积分</view>
        </view>
      </view>

      <!-- 签到按钮 -->
      <view class="sign-btn" :class="{ 'sign-btn-disabled': has_signed_today }" @click="handleSignIn"
        :disabled="has_signed_today">
        {{ has_signed_today ? '今天已签到' : '立即签到' }}
      </view>
      <view class="sign-tip">
        <view v-if="last_sign_date">您上次签到的日期是{{ last_sign_date }}</view>
        <view>
          您已累计签到 <text class="sign-days">{{ total_sign_days
          }}</text> 天
        </view>
      </view>

    </view>

    <u-popup v-model="showSign" mode="center" width="80%" border-radius="20" :mask-close-able="false">
      <section class="sign-popup">
        <!-- 顶部祝贺图 -->
        <header class="popup-header">
          <image class="congrats-image"
            src="https://img.alicdn.com/imgextra/i1/2200676927379/O1CN013nQc6b24NdcX1xgHH_!!2200676927379.png"
            mode="widthFix" />
        </header>

        <!-- 中部奖励展示 -->
        <main class="popup-main">
          <image class="reward-icon"
            src="https://img.alicdn.com/imgextra/i4/2200676927379/O1CN01pWpy1324NdcZ5vSha_!!2200676927379.png"
            mode="widthFix" />
          <view class="reward-text">+{{ points }} 积分</view>
        </main>

        <!-- 底部按钮 -->
        <footer class="popup-footer">
          <view class="confirm-btn" @click="closePopup">我知道了</view>
        </footer>
      </section>
    </u-popup>


    <!-- 说明按钮 -->
    <view class="help-btn" @click="showRule = true">
      <image class="help-img"
        src="https://img.alicdn.com/imgextra/i2/2200676927379/O1CN01QVx42t24NdcX9gMKF_!!2200676927379.png"
        mode="widthFix" />
      <view>说明</view>
    </view>

    <!-- 说明弹窗 -->
    <u-popup v-model="showRule" mode="center" width="80%" border-radius="20">
      <view class="rule-pop">
        <view class="rule-title">
          签到说明
        </view>
        <scroll-view class="rule-pop-bd" scroll-y>
          <view class="rule-content"> 1、每日可签到一次，获得积分奖励。</view>
          <view class="rule-content">
            2、连续签到7天，第7天奖励更高！
          </view>
          <view class="rule-content">
            3、连续签到7天，以第7天的奖励一直叠加！
          </view>
          <view class="rule-content">
            4、中断签到，则从第一天重新开始！
          </view>
        </scroll-view>
      </view>
    </u-popup>

    <!-- 补签弹窗 -->
    <u-popup v-model="showReSign" mode="center" width="80%" border-radius="20">
      <section class="resign-popup">
        <!-- 顶部图片 -->
        <header class="popup-header">
          <image class="resign-image"
            src="https://img.alicdn.com/imgextra/i2/2200676927379/O1CN01Nlfyio24NdcbFbdg8_!!2200676927379.png"
            mode="widthFix" />
        </header>

        <!-- 中部提示 -->
        <main class="popup-main">
          <view class="resign-text">今天未签到，是否补签？</view>
        </main>

        <!-- 底部按钮 -->
        <footer class="popup-footer">
          <view class="resign-btn" @click="handleReSign">立即补签</view>
          <view class="cancel-btn" @click="showReSign = false">取消</view>
        </footer>
      </section>
    </u-popup>
    <loginPopup ref="loginPopup"></loginPopup>
  </view>
</template>

<script>
const switchMp3 = 'https://www.img.xcooo.cn/uploads/2024/02/17887756404cea30.mp3'
const switchMusic = uni.createInnerAudioContext();
export default {
  data () {
    return {
      userInfo: '',
      signList: [],
      showRule: false,
      showSign: false,
      coin: 0,
      showReSign: false,
      total_sign_days: 0,
      // 恭喜获得积分展示
      points: 0,
      has_signed_today: false,
      last_sign_date: ''
    }
  },
  onLoad () {
    switchMusic.src = switchMp3
  },
  onShow () {
    this.getUserInfo()
    this.getSignInfo()
  },
  onHide () {
    console.log('页面隐藏事件')
    this.$refs.loginPopup.close();
  },
  methods: {
    getUserInfo () {
      this.$store.dispatch('getUserInfo').then(res => {
        console.log(res)
        this.userInfo = res.data
      })
    },
    getSignInfo () {
      this.req({
        url: '/v1/user/signInfo',
        success: res => {
          if (res.code == 200) {
            console.log(res.data)
            const { signList, coin, total_sign_days, has_signed_today, last_sign_date } = res.data
            this.signList = signList
            this.coin = (Number(coin) || 0).toFixed(2)
            this.total_sign_days = total_sign_days
            this.has_signed_today = has_signed_today
            this.last_sign_date = last_sign_date
          } else {
            wx.showLoading({
              title: res.msg,
              mask: false,
              success: (result) => {

              },
              fail: () => { },
              complete: () => { }
            });

          }
        },
        complete: () => {

        }
      })
    },
    handleSignIn () {
      // this.$nextTick(() => {
      //   if (switchMusic) {
      //     switchMusic.play()
      //   }
      // })
      if (!this.userInfo) {
        this.$refs.loginPopup.open();
        return
      }
      if (this.has_signed_today) {
        return; // 如果今天已经签到，直接返回
      }
      this.req({
        url: '/v1/user/sign',
        success: res => {
          if (res.code == 200) {
            console.log(res.data)
            this.showSign = true
            this.points = res.data.points
          } else {
            wx.showLoading({
              title: res.msg,
              mask: false,
              success: (result) => {

              },
              fail: () => {

              },
              complete: () => { }
            });

          }
        },
        complete: () => {

        }
      })
    },
    goBack () {
      uni.switchTab({
        url: '/pages/tabBar/home',
      });
    },
    closePopup () {
      this.showSign = false
      this.getSignInfo()
    },
    handleReSign () {
      this.showReSign = false
      this.showSign = true
    }
  }
}
</script>

<style lang="scss" scoped>
.sign-container {
  // background: linear-gradient(to bottom, #e7f7ff, #ffffff);
  background: url("https://img.alicdn.com/imgextra/i4/2200676927379/O1CN014XOtNY24NdcXgC3Z6_!!2200676927379.png") no-repeat center center;
  background: url("https://img.alicdn.com/imgextra/i3/2200676927379/O1CN01hWLwJe24NdcZJEIHt_!!2200676927379.png") no-repeat center center;
  background-size: 100% 100%;
  width: 100vw;
  height: 100vh;
  padding: 30rpx;
  padding-top: 100rpx;
}

.nav-bar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 88rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: transparent;
  z-index: 10;
  padding-top: var(--status-bar-height); // iOS 刘海屏兼容（如使用 uView）
  // box-shadow: 0 2rpx 6rpx rgba(0, 0, 0, 0.05);

  .nav-left {
    position: absolute;
    left: 30rpx;
    top: 50%;
    transform: translateY(-50%);
    z-index: 2;
  }

  .nav-title {
    font-size: 36rpx;
    font-weight: bold;
    color: #333;
  }
}

.score-wrap {
  margin-bottom: 40rpx;

  .title {
    font-size: 28rpx;
    margin-bottom: 20rpx;
    text-shadow: -1px -1px #fff, 1px 1px #333;
  }

  .score {
    font-size: 48rpx;
    font-weight: bold;
    text-shadow: -1px -1px #fff, 1px 1px #333;
  }
}


.sign-card {
  background: rgba(235, 246, 255, 0.7);
  background: #e8f5ff;
  padding: 20rpx;
  border-radius: 30rpx;
}

.sign-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 20rpx;

}

.sign-day {
  width: calc((100% - 60rpx) / 4); // 一行4个，减去3个间距
  background: #ffffff;
  border-radius: 20rpx;
  padding: 40rpx 0;
  box-shadow: 0 4rpx 10rpx rgba(0, 0, 0, 0.05);
  text-align: center;
  transition: background 0.3s;
  position: relative;
  padding-bottom: 10rpx;

  &.signed {
    background: #d8f9e3;
  }

  &.last-day {
    width: calc((100% - 60rpx) / 4 * 2 + 20rpx); // 占两列 + 一列间距
  }
}

.mask {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.3);
  color: #fff;
  font-size: 28rpx;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 20rpx;
  z-index: 1;
}



.day-label {
  font-size: 24rpx;
  margin-bottom: 10rpx;
  position: absolute;
  top: 0;
  left: 0;
  padding: 5rpx 20rpx;
  background: #83fc73;
  border-top-left-radius: 20rpx;
  border-bottom-right-radius: 20rpx;
}

.coin-img {
  width: 100rpx;
  height: 100rpx;
  margin-top: 10rpx;
  margin-bottom: 10rpx;
}

.reward-text {
  font-size: 28rpx;
  color: #333;
  text-shadow: -1px -1px #fff, 1px 1px #999;
}



.sign-btn {
  background: linear-gradient(to right, #c6f71a, #90fa61, #55fdac);
  box-shadow: 2rpx 10rpx 2rpx 2rpx #209200;
  color: #000;
  font-weight: 700;
  padding: 25rpx 0;
  border-radius: 50rpx;
  font-size: 28rpx;
  margin: 20rpx 40rpx;
  margin-top: 50rpx;
  text-align: center;
}

.sign-btn-disabled {
  background: #ccc;
  box-shadow: 2rpx 10rpx 2rpx 2rpx #1376c7;
  color: #000;
  pointer-events: none;
  /* 禁用点击 */
}

.sign-tip {
  font-size: 28rpx;
  color: #888;
  text-align: center;

  .sign-days {
    color: red;
    margin: 0 5rpx;
  }
}

.help-btn {
  position: absolute;
  right: 0rpx;
  top: 50rpx;
  font-size: 32rpx;
  color: #000;
  display: flex;
  align-items: center;
  background: linear-gradient(to right, #c3f81e, #87fb6e);
  padding: 10rpx 20rpx;
  border-top-left-radius: 50rpx;
  border-bottom-left-radius: 50rpx;
  z-index: 100;

  .help-img {
    width: 40rpx;
    margin-right: 10rpx;
  }
}

.rule-pop {
  background: linear-gradient(to right, #5dfda1, #baf828);
  border-radius: 20rpx;
  padding: 20rpx;
  padding-bottom: 40rpx;

  .rule-title {
    text-align: center;
    font-size: 48rpx;
    font-weight: 700;
    margin: 30rpx 0;
    margin-top: 20rpx;
    text-shadow: -1px -1px #fff, 1px 1px #333;
  }

  .rule-pop-bd {
    background: #eefed9;
    padding: 30rpx 20rpx;
    border-radius: 20rpx;
    min-height: 400rpx;
    max-height: 700rpx; // 改成固定高度
    overflow: hidden; // 防止外面内容溢出

    .rule-content {
      line-height: 50rpx;
      color: #696969;
      font-weight: 700;
      font-size: 28rpx;
      text-align: left;
    }
  }
}

::v-deep .u-mode-center-box {
  background-color: transparent !important;
  box-shadow: none !important;
}

.sign-popup {
  padding: 40rpx 20rpx;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  background-color: transparent; // 透明背景

  .popup-header {
    margin-bottom: 50rpx;
  }

  .congrats-image {
    width: 400rpx;
  }

  .popup-main {
    // display: flex;
    // align-items: center;
    // justify-content: center;
    margin-bottom: 30rpx;
  }

  .reward-icon {
    width: 200rpx;

  }

  .reward-text {
    font-size: 38rpx;
    font-weight: bold;
    color: #f90;
    margin-top: 30rpx;
    margin-bottom: 50rpx;
  }

  .popup-footer {
    width: 100%;
    display: flex;
    justify-content: center;
  }

  .confirm-btn {
    width: 50%;
    background: linear-gradient(to right, #c6f71a, #90fa61, #55fdac);
    padding: 20rpx 0;
    border-radius: 50rpx;
    font-weight: 700;
    font-size: 32rpx;
    color: #000;
  }
}

.resign-popup {
  padding: 40rpx 20rpx;
  text-align: center;

  .resign-image {
    width: 180rpx;
    margin: 0 auto 20rpx;
  }

  .resign-text {
    font-size: 30rpx;
    color: #333;
    margin-bottom: 30rpx;
  }

  .popup-footer {
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin-top: 20rpx;

    .resign-btn {
      background-color: #ff9900;
      color: #fff;
      padding: 20rpx 60rpx;
      border-radius: 30rpx;
    }

    .cancel-btn {
      color: #999;
      font-size: 26rpx;
    }
  }
}
</style>
