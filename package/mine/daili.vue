<template>
  <view class="daili">
    <uni-nav-bar title="申请推广员" color="#fff" leftIcon="left" backgroundColor="transparent" :border="false"
      :statusBar="true" :fixed="true" @clickLeft="$common.back()"></uni-nav-bar>

    <view class="all">
      <view class="new-all ">
        <view style="text-align: center;">请填写申请信息</view>
        <view class="all-one">
          <view>邀请人</view>
          <input type="text" placeholder="请输入邀请人(选填可不填)" placeholder-style="font-size: 28rpx;color: #999999;"
            v-model="formData.superior">
        </view>
        <view class="all-one">
          <view>姓名</view>
          <input type="text" placeholder="请输入姓名" placeholder-style="font-size: 28rpx;color: #999999;"
            v-model="formData.name">
        </view>
        <view class="all-one">
          <view>手机号</view>
          <input type="number" placeholder="请输入手机号" placeholder-style="font-size: 28rpx;color: #999999;"
            v-model="formData.mobile">
        </view>
        <view class="f-ac all-two">
          <view @click="$common.toRule(12)" style="color: #477AFF;">【分销协议及规则】</view>
        </view>
        <view class="all-button" @click="shenqing">申请推广员</view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data () {
    return {
      data: "",
      isdl: false,
      state: '',
      formData: {
        superior: '',
        name: '',
        mobile: '',
      },
      rule: '',
      userInfo: [],
    }
  },
  onLoad () {
    this.$common.getRule(12).then(res => {
      console.log(res);
      this.rule = res
    })
    this.$store.dispatch('getUserInfo').then(res => {
      this.userInfo = res.data
    })
  },
  methods: {
    shenqing () {
      if (this.formData.name == '') {
        uni.showToast({
          title: '请输入姓名',
          icon: 'none'
        })
        return
      }
      if (this.formData.mobile == '') {
        uni.showToast({
          title: '请输入手机号',
          icon: 'none'
        })
        return
      }
      this.req({
        url: '/v1/user/setdaili',
        data: this.formData,
        success: res => {
          // console.log(res)
          if (res.code == 200) {
            this.$common.toast({
              title: res.msg,
              icon: 'success',
              duration: 500,
              success: res => {
                // this.$common.back()
              }
            })
          }
        }
      })
    },
    getDat (type) {
      this.$http({
        url: "index.php/api/common/agreement",
        header: {
          "token": uni.getStorageSync("user").token
        },
        data: {
          name: 'dailitiaojian'
        }
      }).then(res => {
        console.log(res);
        if (res.data.code == 1) {
          this.data = res.data.data.content
        } else {
          this.$tip.tip(res.data.msg)
        }
      }).catch(err => { });
    }
  }
}
</script>

<style lang="scss" scoped>
.daili {
  background: url("https://img.alicdn.com/imgextra/i1/2200676927379/O1CN01GYJhsN24Ndco7ktYR_!!2200676927379.png") no-repeat;
  background: url("https://img.alicdn.com/imgextra/i2/2200676927379/O1CN01egMgSN24NdcX9gh44_!!2200676927379.png") no-repeat center center;
  background-size: 100% 100%;
  height: 100vh;
}

.all {
  // width: 100%;
  // height: 100vh;
  // background: url(https://long.96mh.cn/wechat/static/newIndex/distributionBgi.png) no-repeat 0 0 / 100% 100%;

  // position: relative;
}

.new-all {
  width: 690rpx;
  // height: 820rpx;
  // background: #FFFFFF;
  border-radius: 20rpx;
  position: absolute;
  top: 235rpx;
  left: 30rpx;
  padding: 40rpx 40rpx;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  // align-items: center;
  font-size: 32rpx;
  font-family: Source Han Sans CN;
  font-weight: 400;
  color: #fff;
  background: rgba(255, 255, 255, 0.5);
  // background: url("https://img.alicdn.com/imgextra/i2/2200676927379/O1CN01iRPLut24NdcrdO15e_!!2200676927379.png") no-repeat;
  // background-size: 100% 100%;

  .all-one {
    font-size: 28rpx;
    font-family: Source Han Sans CN;
    font-weight: 400;
    color: #333;
    margin-top: 30rpx;

    input {
      width: 631rpx;
      height: 79rpx;
      background: #F5F5F5;
      border: 1px solid #EEEEEE;
      border-radius: 39rpx;
      padding-left: 30rpx;
      box-sizing: border-box;
      margin-top: 30rpx;
    }
  }

  .all-two {
    margin-top: 34rpx;
    font-size: 24rpx;
    font-family: Source Han Sans CN;
    font-weight: 400;
    color: #999999;
    margin-left: 20rpx;

    &>view:nth-child(3) {
      color: #477AFF;
    }
  }

  image {
    width: 36rpx;
    height: 36rpx;
    margin-right: 12rpx;
  }

  .all-button {
    width: 600rpx;
    height: 88rpx;
    background: linear-gradient(90deg, #6798FB 0%, #7E98F9 100%);
    // border-radius: 44rpx;
    font-size: 32rpx;
    font-family: Source Han Sans CN;
    font-weight: 400;
    color: #fff;
    text-align: center;
    line-height: 88rpx;
    margin-top: 30rpx;
    background: url("https://img.alicdn.com/imgextra/i2/2200676927379/O1CN01OVBCs524NdcpnMWsZ_!!2200676927379.png") no-repeat;
    background-size: 100% 100%;
  }
}
</style>