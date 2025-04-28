<!--
 * @Date: 2022-11-23 11:45:21
 * @LastEditTime: 2025-04-27 17:01:05
 * @Description: content
-->
<template>
  <view class="page-wrap">
    <uni-nav-bar title="账号与安全" color="#fff" leftIcon="left" backgroundColor="#222333" :border="false" :statusBar="true"
      :fixed="true" @clickLeft="$common.back()"></uni-nav-bar>

    <view class="page-wrap-bd">
      <view class="row">
        <view class="title">头像</view>

        <view class="right">
          <view @click="handelEdit(1)" class="avatar">
            <cimage
              :src="userInfo.avatar ? userInfo.avatar : 'https://www.img.xcooo.cn/uploads/2024/02/b0698422bfbf2c52.png'"
              mode="scaleToFill" />
          </view>
        </view>
      </view>

      <view class="row">
        <view class="title">昵称</view>

        <view @click="handelEdit(2)" class="right">
          {{ userInfo.nickName }}
        </view>
      </view>

      <!-- #ifdef MP-WEIXIN -->
      <view class="row">
        <view class="title">绑定手机号</view>
        <view class="right relative">
          <button class="hide" open-type="getPhoneNumber" @getphonenumber="pullPhone"></button>
          {{ !userInfo.mobile ? '点击绑定' : userInfo.mobile }}
        </view>
      </view>
      <!-- #endif -->

      <view @click="$common.toRule(1)" class="row">
        <view class="title">用户协议</view>

        <view class="right">
          <uni-icons type="right" color="#999999" size="16" />
        </view>
      </view>

      <view @click="$common.toRule(7)" class="row">
        <view class="title">隐私政策</view>

        <view class="right">
          <uni-icons type="right" color="#999999" size="16" />
        </view>
      </view>

      <!-- <view @click="$common.to({ url: '/package/mine/tou-su' })" class="row">
        <view class="title">举报与投诉</view>

        <view class="right">
          <uni-icons type="right" color="#999999" size="16" />
        </view>
      </view> -->
      <view @click="outLogin()" class="row">
        <view class="title">退出登录</view>

        <view class="right">
          <uni-icons type="right" color="#999999" size="16" />
        </view>
      </view>
    </view>

    <!-- 修改信息弹窗 -->
    <uni-popup ref="editPop" type="center">
      <view class="edit-pop">
        <view class="edit-pop-hd">{{ popTitle }}</view>
        <view class="edit-pop-bd">
          <view v-if="editType == 2" class="input-box">
            <input v-model="nickName" maxlength="11" placeholder="请输入昵称" />
          </view>
        </view>
        <view class="edit-pop-ft">
          <view @click="closeEditPop" class="btn">取消</view>
          <view @click="submitEdit" class="btn confirm">确定</view>
        </view>
      </view>
    </uni-popup>
  </view>
</template>

<script>
import {
  mapGetters
} from 'vuex'

export default {
  data () {
    return {
      popTitle: '',
      editType: '',
      nickName: ''
    }
  },

  computed: {
    ...mapGetters(['sysConfig', 'userInfo'])
  },

  onShow () {
    this.$store.dispatch('getUserInfo')
  },

  methods: {
    /**
     * @description: 拉取手机号授权
     * @param {*} e
     * @return {*}
     */
    pullPhone (e) {
      if (e.type == 'getphonenumber') {
        // this.formData.mobileCode = e.detail.code
        if (e.detail.code) {
          this.req({
            url: '/v1/user/updateMobile',
            data: {
              mobileCode: e.detail.code
            },
            success: res => {
              if (res.code == 200) {
                this.$common.toast({
                  title: res.msg,
                  duration: 600,
                  success: res => {
                    this.$store.dispatch('getUserInfo')
                  }
                })
              }
            }
          })
        }
      }
    },

    /**
     * @description: 点击修改
     * @param {*} e
     * @return {*}
     */
    handelEdit (e) {
      if (!this.userInfo.level > 0) {
        this.$common.toast({
          title: '请先升级为VIP',
          duration: 600,
          success: res => {
          }
        })
        return
      }
      this.editType = e
      switch (e) {
        case 1:
          this.uploadAvatar()
          break
        case 2:
          this.popTitle = '修改昵称'
          this.nickName = this.userInfo.nickName
          this.openEditPop()
          break
      }
    },

    /**
     * @description: 修改用户信息
     * @param {*} data
     * @return {*}
     */
    setUserInfo (data) {
      this.req({
        url: '/v1/user/info/edit',
        data,
        Loading: true,
        success: res => {
          if (res.code == 200) {
            this.closeEditPop()
            this.$common.toast({
              title: res.msg,
              duration: 600,
              success: res => {
                this.$store.dispatch('getUserInfo')
              }
            })
          }
        }
      })
    },

    /**
     * @description: 上传头像
     * @param {*}
     * @return {*}
     */
    uploadAvatar () {
      uni.chooseImage({
        sizeType: ['original', 'compressed'],
        sourceType: ['album', 'camera'],
        count: 1,
        success: ({
          tempFilePaths,
          tempFiles
        }) => {
          console.log(tempFilePaths)
          this.req({
            url: '/v1/upload/image',
            file: tempFilePaths[0],
            fileName: 'image',
            success: res => {
              if (res.code == 200) {
                this.setUserInfo({
                  type: 1,
                  avatar: res.data
                })
              }
            }
          })
        },
        fail: error => { }
      })
    },

    /**
     * @description: 关闭修改信息弹窗
     * @param {*}
     * @return {*}
     */
    closeEditPop () {
      this.$refs.editPop.close()
    },

    /**
     * @description: 打开修改信息弹窗
     * @param {*}
     * @return {*}
     */
    openEditPop () {
      this.$refs.editPop.open()
    },

    /**
     * @description: 提交修改
     * @param {*}
     * @return {*}
     */
    submitEdit () {
      let data = {
        type: this.editType
      }
      let msg = ''
      switch (this.editType) {
        case 2:
          if (!this.nickName) {
            msg = '请输入用户名'
          } else {
            data.nickName = this.nickName
          }
          break
      }

      if (msg) {
        this.$common.toast({
          title: msg
        })
        return
      }

      this.setUserInfo(data)
    },
    /**
     * 退出登录
     */
    outLogin () {
      uni.removeStorageSync('token')
      this.$store.commit('setUserInfo', null)
      setTimeout(() => {
        uni.showToast({
          title: '退出成功',
          icon: 'success',
          mask: true
        })
      }, 100)
      // #ifdef H5
      location.href = "/"
      // #endif

      // #ifdef MP
      uni.switchTab({
        url: '/pages/tabBar/home',
      });

      // #endif
    }
  }
}
</script>

<style lang="scss">
.page-wrap {
  background: url("https://img.alicdn.com/imgextra/i4/2200676927379/O1CN01unkdtT24NdWplMdw8_!!2200676927379.png") no-repeat;
  background-size: 100vw 100%;
  background-repeat: no-repeat;
  min-height: calc(100vh - 50px);
  background: #222333;

  &-bd {
    width: 690rpx;
    margin: 30rpx auto 0;
    // background: #fff;
    border-radius: 10rpx;

    .row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 30rpx;

      .title {
        font-size: 26rpx;
        font-family: PingFang SC;
        font-weight: 500;
        color: #fff;
      }

      .right {
        color: #fff;

        .avatar {
          width: 70rpx;
          height: 70rpx;
          border-radius: 50%;
          overflow: hidden;
        }
      }
    }
  }

  .edit-pop {
    width: 590rpx;
    background: #ffffff;
    border-radius: 20rpx;
    padding: 40rpx;

    &-hd {
      padding: 0 30rpx;
      font-size: 36rpx;
      font-family: Source Han Sans CN;
      font-weight: 400;
      color: #222222;
      text-align: center;
    }

    &-bd {
      padding: 40rpx 0 60rpx;
      font-size: 28rpx;
      font-family: Source Han Sans CN;
      font-weight: 400;
      color: #222222;

      .input-box {
        height: 88rpx;
        border-radius: 10rpx;
        padding: 0 30rpx;
        background: #f7f7f7;

        input {
          width: 100%;
          height: 100%;
          font-size: 28rpx;
          font-family: Source Han Sans CN;
          font-weight: 400;
          color: #222222;
        }
      }
    }

    &-ft {
      display: flex;
      justify-content: space-between;

      .btn {
        width: 240rpx;
        height: 68rpx;
        border-radius: 5rpx;
        line-height: 68rpx;
        text-align: center;
        background: #f1f1f1;

        font-size: 32rpx;
        font-family: Source Han Sans CN;
        font-weight: bold;
        color: #999999;

        &.confirm {
          background: #000;
          color: #fff;
        }
      }
    }
  }
}
</style>