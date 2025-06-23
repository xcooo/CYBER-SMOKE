<!--
 * @Date: 2022-11-21 15:10:42
 * @LastEditTime: 2024-01-25 14:17:57
 * @Description: content
-->
<template>
  <view class="page-wrap">
    <view class="page-wrap-bg">
      <cimage src="/static/img/mine_top_bg.png" mode="scaleToFill" />
    </view>

    <view class="page-wrap-hd" :style="{
      paddingTop: `calc(100rpx + ${sysConfig.statusBarHeight}px)`
    }">
      <view class="info">
        <view class="avatar">
          <cimage :src="userInfo.avatar" mode="scaleToFill" />
        </view>

        <view class="name">
          <template v-if="userInfo">
            <view class="hang1">{{ userInfo.nickName }}</view>

            <view @click="copy(userInfo.id)" class="id">
              ID:{{ userInfo.id }}

              <uni-icons type="right" color="#999999" size="12" />
            </view>
          </template>

          <view v-else @click="toLogin">去登录</view>
        </view>

        <view class="money-list">
          <view @click="toWallet(0)" class="money-list-item">
            <view class="num">{{ userInfo.money }}</view>
            <view class="title">余额</view>
          </view>
          <view class="fg"></view>
          <button class="recharge" @click="$common.to({ url: '/package/mine/recharge' })">充值</button>
          <!-- <view @click="toWallet(1)" class="money-list-item">
						<view class="num">{{ userInfo.gold }}</view>

						<view class="title">佣金</view>
					</view>

					<view @click="toWallet(2)" class="money-list-item">
						<view class="num">{{ userInfo.coin }}</view>

						<view class="title">积分</view>
					</view> -->
        </view>
      </view>
    </view>

    <view class="order-menu">
      <view @click="$common.to({ url: '/package/mine/bag' })" class="order-menu-hd">
        我的盒柜

        <uni-icons :style="{
          fontWeight: 'normal'
        }" type="right" color="#999999" size="16" />
      </view>

      <view class="menu-list">
        <view @click="menuTo(item)" v-for="(item, i) in menuList" :key="i" class="menu-list-item">
          <view v-if="userInfo && userInfo['box_' + (i + 1)] * 1 > 0" class="dot">
            {{ userInfo['box_' + (i + 1)] }}
          </view>

          <view class="icon">
            <cimage :src="item.icon" mode="scaleToFill" />
          </view>

          <view class="title">{{ item.title }}</view>
        </view>
      </view>
    </view>

    <view class="roll-tip">
      <uni-notice-bar color="#666" showIcon scrollable single :speed="30"
        text="一切在本平台之外而引致之任何意外、疏忽、合约毁坏、诽谤、版权或知识产权侵犯等及其所造成的财产损失，本平台概不负责，亦不承担任何法律责任，建议受损失的用户找其平台处理。"></uni-notice-bar>
    </view>
    <uni-popup ref="alertDialog" type="dialog">
      <uni-popup-dialog :type="msgType" cancelText="关闭" confirmText="去绑定" title="公告" content="您还未绑定手机号建议先去绑定手机号哦"
        @confirm="dialogConfirm" @close="dialogClose"></uni-popup-dialog>
    </uni-popup>

    <view class="common-tools">
      <view class="common-tools-hd">常用工具</view>

      <view class="common-tools-bd">
        <view @click="menuTo(item)" v-for="(item, i) in commonTools" :key="i" class="btn-item">
          <!-- <button v-if="item.id == 8" class="hide" open-type="contact"></button> -->

          <view class="title">{{ item.title }}</view>

          <uni-icons type="right" color="#999999" size="16" />
        </view>
      </view>
    </view>
    <u-popup v-model="sdkshow" mode="center" border-radius="16">
      <view class="cdkbox">
        <view class="tit">礼包码兑换</view>
        <u-input v-model="sdk" input-align="center" :border="true" placeholder="请输入礼包码" />
        <button @click="duihuan">确定</button>
      </view>
    </u-popup>
  </view>
</template>

<script>
import {
  mapGetters
} from 'vuex'

export default {
  data () {
    return {
      msgType: '',
      popContent: '',
      sdk: '',
      sdkshow: false,
      menuList: [{
        id: 1,
        title: '待提货',
        icon: '/static/icon/he_zi.png',
        url: '/package/mine/bag',
        type: 0
      },
      {
        id: 2,
        title: '待发货',
        icon: '/static/icon/dai_fa_huo.png',
        url: '/package/mine/bag',
        type: 1
      },
      {
        id: 3,
        title: '已发货',
        icon: '/static/icon/yi_fa_huo.png',
        url: '/package/mine/bag',
        type: 2
      },
      {
        id: 4,
        title: '待评价',
        icon: '/static/icon/dai_ping_jia.png',
        url: '/package/mine/bag',
        type: 3
      }
      ],
      commonTools: [{
        id: 5,
        title: '礼包码兑换',
        url: ''
      }, {
        id: 6,
        title: '我的团队',
        url: ''
      },
      {
        id: 7,
        title: '商城订单',
        url: '/package/mine/mall-order'
      },
      {
        id: 8,
        title: '收货地址',
        url: '/package/mine/address'
      },
      {
        id: 9,
        title: '联系客服',
        url: ''
      },
      {
        id: 10,
        title: '商务合作',
        url: '/package/mine/he-zuo'
      },
      {
        id: 11,
        title: '投诉举报',
        url: '/package/mine/tou-su'
      },
      {
        id: 12,
        title: '账号与安全',
        url: '/package/mine/account-safe'
      }
      ]
    }
  },
  computed: {
    ...mapGetters(['sysConfig', 'userInfo'])
  },
  onShareAppMessage () {
    return {
      title: `祝大家玩的开心!`,
      // imageUrl: this.pageData.box.thumb,
      path: `/pages/mine/mine`
    }
  },
  onLoad (options) {
    if (this.userInfo.mobile == '') {
      this.dialogToggle('info')
    }
  },
  onShow () {
    this.$store.dispatch('getUserInfo').then(res => {
      console.log(res)
    })
    this.$store.dispatch('getAppConfig').then((res) => {
      console.log(res);
      this.popContent = res.data.pop_con
    })
    // #ifdef MP
    let userInfo = uni.getStorageSync('userInfo')
    console.log('xc',userInfo)
    if (!userInfo) {
      uni.navigateTo(
        {
          url: '/pages/mine/login'
        }
      )
    }
    // #endif
  },
  methods: {
    duihuan () {
      let data = {
        sdk: this.sdk,
      }

      this.req({
        url: '/v1/user/duihuan',
        data,
        Loading: true,
        success: res => {
          if (res.code == 200) {
            this.$common.toast({
              title: '兑换成功'
            })
            setTimeout(() => {
              this.sdkshow = false
            }, 1000)
          }
        }
      })
    },
    dialogClose () {
      console.log('点击关闭')
    },
    /*
    打开手机号弹窗
    */
    dialogToggle (type) {
      this.msgType = type
      console.log(type);
      this.$refs.alertDialog.open()
    },
    dialogConfirm () {

      this.$common.to({
        url: '/package/mine/account-safe',
      })

    },
    /**
     * @description: 复制
     * @param {*}
     * @return {*}
     */
    copy (e) {
      this.$copy({
        content: e,
        success (res) {
          console.log(res)
          uni.showToast({
            title: res,
            icon: 'success'
          })
        }
      })
    },

    /**
     * @description: 去登录
     * @return {*}
     */
    toLogin () {
      this.$common.to({
        url: '/pages/mine/login',
        query: {
          page: '/pages/mine/mine'
        }
      })
    },

    /**
     * @description: 去钱包页面
     * @param {*} e
     * @return {*}
     */
    toWallet (e) {
      this.$common.to({
        url: '/package/mine/wallet',
        query: {
          type: e
        }
      })
    },

    /**
     * @description: 菜单跳转
     * @param {*} item
     * @return {*}
     */
    menuTo (item) {
      console.log(item.id);
      let url = item.url
      if (item.id == 6) {
        if (this.userInfo.level == 2) {
          url = '/package/mine/daili'
        } else {
          url = '/package/mine/yaoqing'
        }
      }
      if (item.id == 5) {
        this.sdkshow = true;
      }
      if (item.id == 9) {
        let info = uni.getStorageSync('userInfo')
        window.location = `
					http://kefu.fandou01.com/index/index/home?
					visiter_id=${info.id}&
					visiter_name=${info.nickName}&
					avatar=${info.avatar}&
					business_id=1&
					groupid=0&
					special=1
					`;
        // return
      }
      let query = {}
      if (item.type) {
        query.type = item.type
      }

      switch (item.id) {
        // case 1:
        //   break

        default:
          this.$common.to({
            tabCur: 1,
            url,
            query
          })
          break
      }
    }
  }
}
</script>

<style lang="scss">
.page-wrap {
  position: relative;
  padding-bottom: 40rpx;

  &-bg {
    position: absolute;
    left: 0;
    top: 0;
    width: 750rpx;
    height: 324rpx;
  }

  &-hd {
    position: relative;
    z-index: 1;
    left: 0;
    top: 0;
    padding: 0 30rpx 0;

    .info {
      background: #fff;
      border-radius: 10rpx;
      display: flex;
      flex-flow: column nowrap;
      align-items: center;

      .avatar {
        width: 135rpx;
        height: 135rpx;
        border-radius: 50%;
        background: #ccc;
        // overflow: hidden;

        margin-top: -65rpx;
      }

      .name {
        position: relative;
        margin-top: 20rpx;
        width: 170rpx;

        font-size: 28rpx;
        font-family: PingFang SC;
        font-weight: bold;
        color: #051a2b;
        text-align: center;

        .id {
          position: absolute;
          left: 100%;
          top: 50%;
          transform: translateY(-50%);
          display: flex;
          align-items: center;
          padding-left: 30rpx;

          font-size: 24rpx;
          font-family: PingFang SC;
          font-weight: 500;
          color: #666666;
        }
      }

      .money-list {
        box-sizing: border-box;
        width: 100%;
        padding: 70rpx 0 40rpx;
        display: flex;
        justify-content: center;

        .fg {
          border: 1rpx solid #ccc;
          height: 100rpx;
          margin: auto;
        }

        .recharge {
          height: 80rpx;
          border-radius: 15rpx;
          border: none;
          margin: auto;
          line-height: 80rpx;

        }

        &-item {
          display: flex;
          flex-flow: column nowrap;
          justify-content: space-between;
          align-items: center;
          padding: 0 20rpx;
          box-sizing: border-box;
          width: 39%;

          .num {
            font-size: 32rpx;
            font-family: SourceHanSansCN;
            font-weight: 800;
            color: #333333;
            word-wrap: break-word;
            word-break: break-all;
            text-align: center;
          }

          .title {
            margin-top: 10rpx;
            font-size: 26rpx;
            font-family: PingFang SC;
            font-weight: 500;
            color: #666666;
          }
        }
      }
    }
  }

  .order-menu {
    width: 690rpx;
    margin: 30rpx auto 0;
    background: #fff;
    border-radius: 10rpx;
    padding: 30rpx 0;

    &-hd {
      display: flex;
      align-items: center;
      font-size: 28rpx;
      font-family: PingFang SC;
      font-weight: bold;
      color: #051a2b;
      padding: 0 30rpx;
    }

    .menu-list {
      display: flex;

      &-item {
        width: 25%;
        display: flex;
        flex-flow: column nowrap;
        align-items: center;
        margin-top: 20rpx;
        position: relative;

        .dot {
          padding: 7rpx 10rpx;
          border-radius: 999rpx;
          background: #000;
          color: #fff;
          font-size: 20rpx;
          line-height: 20rpx;
          position: absolute;
          right: 20rpx;
          top: 0;
        }

        .icon {
          width: 80rpx;
          height: 80rpx;
        }

        .title {
          font-size: 26rpx;
          font-family: PingFang SC;
          font-weight: 500;
          color: #666666;
        }
      }
    }
  }

  .roll-tip {
    width: 690rpx;
    margin: 30rpx auto 0;
    border-radius: 10rpx;
    overflow: hidden;
    background: #fff;

    ::v-deep.uni-noticebar {
      margin-bottom: 0;
      background: none !important;
    }
  }

  .common-tools {
    width: 690rpx;
    margin: 30rpx auto 0;
    background: #fff;
    border-radius: 10rpx;
    padding: 30rpx 30rpx 0;

    &-hd {
      font-size: 28rpx;
      font-family: PingFang SC;
      font-weight: bold;
      color: #051a2b;
    }

    &-bd {
      .btn-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 30rpx 0;

        .title {
          font-size: 26rpx;
          font-family: PingFang SC;
          font-weight: 500;
          color: #666666;
        }
      }
    }
  }
}

.cdkbox {
  width: 500rpx;
  background-color: #fff;
  padding: 30rpx;
  box-sizing: border-box;
}

.cdkbox .tit {
  text-align: center;
  margin-bottom: 35rpx;
}

.cdkbox .inp {
  border-radius: 16rpx;
  border: 1rpx solid #333;
  height: 60rpx;
}

.cdkbox button {
  border-radius: 8rpx;
  color: #fff;
  background-color: #00E1DB;
  height: 70rpx;
  line-height: 70rpx;
  margin-top: 25rpx;
  font-size: 28rpx;
}
</style>