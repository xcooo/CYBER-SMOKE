<template>
  <view class="my">
    <view class="top-box">
      <view class="userInfo-box">
        <view class="left">
          <image class="avatar"
            :src="userInfo.avatar ? userInfo.avatar : 'https://img.alicdn.com/imgextra/i1/2215984279448/O1CN01Hd1yTg2JfEt36ZLP7_!!2215984279448.png'"
            mode="widthFix" lazy-load="false" binderror="" bindload="" />
          <!-- <view class="get-proto">
            点击头像
          </view> -->
          <view class="name-wrap">
            <view>
              <template v-if="userInfo">
                <view class="uc0-name-0">{{ userInfo.nickName }}</view>
                <view class="uc0-name-1">ID:{{ userInfo.id }}
                  <view class="copyText" @click="copy(userInfo.id)">复制</view>
                </view>
              </template>
              <template v-else>
                <view class="userName" @click="toLogin">
                  登录/注册
                </view>
              </template>
            </view>
          </view>
        </view>
        <view class="right">
          <!-- <view class="news-btn">
            <view @click="editUserInfo">
              <image style="height: 20px; width: 20px;" class="" src="https://img.alicdn.com/imgextra/i2/2200676927379/O1CN01zQAk9d24NdcU3Oojt_!!2200676927379.png" mode="widthFix"
                lazy-load="false" binderror="" bindload="" />
            </view>
          </view> -->
          <view class="edit" @click="editUserInfo">
            <image class="edit-img" src="https://www.img.xcooo.cn/uploads/2024/02/52c8deca2d219576.png" mode="widthFix"
              lazy-load="false" binderror="" bindload="" />
            <view class="" selectable="false" space="false" decode="false">
              编辑资料
            </view>
          </view>
        </view>
      </view>
    </view>

    <view class="my-content">
      <!-- <view class="jinebox">
        <view class="jinebox-info">
          <image class="" src="https://www.img.xcooo.cn/uploads/2024/02/9ac10f683ab85ce7.png" mode="widthFix"
            lazy-load="false" binderror="" bindload="" />
          <view class="text" @click="toWallet(1)">
            <view class="text-0">
              佣金
            </view>
            <view class="text-1">
              {{ userInfo.gold || '0.00' }}
            </view>
          </view>

        </view>
        <view class="jinebox-info">
          <image class="" src="https://www.img.xcooo.cn/uploads/2024/02/231fcebf5c7a968d.png" mode="widthFix"
            lazy-load="false" binderror="" bindload="" />
          <view class="text" @click="recharge">
            <view class="text-0">
              余额
            </view>
            <view class="text-1">
              {{ userInfo.money || '0.00' }}
            </view>
          </view>

        </view>
      </view> -->

      <view class="other-view">
        <view class="other-view-0">
          <view class="other-view-right" @click="toWallet(1)">
            <view class="other-view-right-0">
              余额
            </view>
            <view class="other-view-right-1">
              {{ userInfo.money || '' }}
            </view>
          </view>
        </view>
        <view class="other-view-0 other-view-1">
          <view class="other-view-right" @click="recharge">
            <view class="other-view-right-0">
              积分
            </view>
            <view class="other-view-right-1">
              {{ userInfo.coin || '' }}
            </view>
          </view>
        </view>
        <view class="other-view-0 other-view-2">
          <view class="other-view-right" @click="recharge">
            <view class="other-view-right-0">
              佣金
            </view>
            <view class="other-view-right-1">
              {{ userInfo.gold || '' }}
            </view>
          </view>
        </view>
      </view>

      <!-- <view class="xc-vip" @click="goVip">
        <view class="vip-left">
          <image class="vip-image" src="../../static/mine/vip.png" mode="widthFix" lazy-load="false" binderror=""
            bindload="" />
          <view class="vip-title">会员中心</view>
        </view>

        <view class="vip-right">
          <u-icon name="arrow-right" color="#bc9569" size="28"></u-icon>
        </view>
      </view> -->

      <view class="myOrder">
        <view class="title">
          我的盒柜
        </view>
        <view class="orderList">
          <view class="list-item" @click="menuToOrder(item)" v-for="(item, i) in orderList" :key="i">
            <view class="dot" v-if="userInfo && userInfo['box_' + (i + 1)] * 1 > 0">
              {{ userInfo['box_' + (i + 1)] }}
            </view>
            <image class="" :src="item.icon" mode="widthFix" lazy-load="false" binderror="" bindload="" />
            <view>
              {{ item.title }}
            </view>
          </view>
        </view>
      </view>


      <view class="invite">
        <view class="invite-title">
          <view class="invite-title-left">
            我的邀请
          </view>
          <view class="invite-title-right" @click="goInvite">
            进入邀请
            <uni-icons type="right" size="14" style="color:#fff"></uni-icons>
          </view>
        </view>
        <view class="invite-content">
          <image class=""
            src="https://img.alicdn.com/imgextra/i2/2215984279448/O1CN01ttkYLw2JfEvRZqXQI_!!2215984279448.png"
            mode="widthFix" lazy-load="false" binderror="" bindload="" />
          <view class="invite-content-info">
            <view class="info-item">
              <view class="info-item-0" @click="toWallet(1)">
                {{ userInfo.gold || '0.00' }}
              </view>
              <view class="info-item-1">
                当前收益
              </view>
            </view>
            <view class="info-item">
              <view class="info-item-0" @click="toWallet(1)">
                {{ userInfo.gold || '0.00' }}
              </view>
              <view class="info-item-1">
                可提现收益
              </view>
            </view>
            <view class="info-item">
              <view class="info-item-0">
                <template v-if="userInfo.total_xjnum">
                  {{ userInfo.total_xjnum.total_num }}
                </template>
                <template v-else>0</template>
              </view>
              <view class="info-item-1">
                已邀好友
              </view>
            </view>
          </view>

        </view>

      </view>

      <!-- <view class="xc-serve">
        <view class="xc-serve-item" v-for="(item, index) in serveList" :key="index" @click="menuTo(item)">
          <view class="xc-serve-item-left">
            <view class="xc-serve-img">
              <image class="" :src="item.icon" lazy-load="false" binderror="" bindload="" />
            </view>
            <view class="xc-server-title"> {{ item.title }}</view>
          </view>
          <view class="xc-serve-item-right">
            <image style="height: 20px; width: 20px;" class="" src="../../static/home/right.png" mode="widthFix"
              lazy-load="false" binderror="" bindload="" />
          </view>
        </view>
      </view> -->


      <view class="myapp">
        <view class="tit">
          我的应用
        </view>
        <view class="applist">
          <view class="app-list-item" v-for="(item, index) in serveList" :key="index" @click="menuTo(item)">
            <image class="" :src="item.icon" mode="widthFix" lazy-load="false" binderror="" bindload="" />
            <view class="app-title">
              {{ item.title }}
            </view>
          </view>
        </view>
      </view>

      <!-- 手机号绑定 -->
      <uni-popup ref="alertDialog" type="dialog">
        <uni-popup-dialog :type="msgType" cancelText="关闭" confirmText="去绑定" title="公告" content="您还未绑定手机号建议先去绑定手机号哦"
          @confirm="dialogConfirm" @close="dialogClose"></uni-popup-dialog>
      </uni-popup>

      <!-- 礼包码 -->
      <u-popup v-model="sdkshow" mode="center" border-radius="16">
        <view class="cdkbox">
          <view class="tit">礼包码兑换</view>
          <u-input v-model="sdk" input-align="center" :border="true" placeholder="请输入礼包码" />
          <button style="background: #6b57dc;" @click="duihuan">确定</button>
        </view>
      </u-popup>

      <!-- 联系客服 -->
      <u-popup v-model="kefushow" mode="center" border-radius="16">
        <view class="bgbox">
          <view class="off" @click="kefushow = false">
            <uni-icons type="close" color="#fff" size="25" />
          </view>
          <view class="content">
            <view class="ma">
              <image class="" :src="wx_kefu" mode="widthFix" lazy-load="false" binderror="" bindload="" />
            </view>
          </view>
          <view class="yi">
            微信扫一扫
          </view>
        </view>
      </u-popup>
    </view>

  </view>
</template>

<script>
import {
  mapGetters
} from 'vuex'
export default {
  name: 'my',
  components: {

  },
  data () {
    return {
      orderList: [
        {
          id: 1,
          icon: 'https://www.img.xcooo.cn/uploads/2024/02/68f352b2f441fc09.png',
          title: '待提货',
          url: '/pages/tabBar/bag',
          type: 0
        },
        {
          icon: 'https://www.img.xcooo.cn/uploads/2024/02/d14c7bafd3d74f5e.png',
          title: '待发货',
          url: '/pages/tabBar/bag',
          type: 1
        },
        {
          icon: 'https://www.img.xcooo.cn/uploads/2024/02/00e3752b94973d6c.png',
          title: '已发货',
          url: '/pages/tabBar/bag',
          type: 2
        },
        {
          icon: 'https://www.img.xcooo.cn/uploads/2024/02/3da2ddb81a697ce0.png',
          title: '已完成',
          url: '/pages/tabBar/bag',
          type: 3
        },
      ],
      serveList: [
        {
          id: 2,
          icon: '../../static/mine/order.png',
          title: '商城订单',
          url: '/package/mine/mall-order'
        },
        {
          id: 3,
          icon: '../../static/mine/bankCard.png',
          title: '任务签到',
          // url: '/package/mine/score-order'
          url: '/pages/index/sign'
        },
        {
          id: 5,
          icon: '../../static/mine/coupon.png',
          title: '我的卡券',
          url: '/package/mine/coupon'
        },
        {
          id: 0,
          icon: '../../static/mine/code.png',
          title: '兑换码',
          url: ''
        },
        {
          id: 1,
          icon: '../../static/mine/avatarFrame.png',
          title: '我的团队',
          url: '/package/mine/daili'
        },

        {
          id: 3,
          icon: '../../static/mine/address.png',
          title: '收货地址',
          url: '/package/mine/address'
        },
        {
          id: 4,
          icon: '../../static/mine/service.png',
          title: '联系客服',
          url: ''
        },

        {
          id: 6,
          icon: '../../static/mine/prop.png',
          title: '投诉举报',
          url: '/package/mine/tou-su'
        },
        // {
        //   id: 7,
        //   icon: '../../static/mine/setting.png',
        //   title: '设置',
        //   url: '/package/mine/account-safe'
        // },
      ],
      xcServerList: [

      ],
      msgType: '',
      popContent: '',
      sdk: '',
      sdkshow: false,
      kefushow: false,
      wx_kefu: ''
    }
  },
  created () {

  },
  mounted () {

  },
  onLoad (options) {
    // 绑定手机号
    // #ifdef MP
    if (this.userInfo.mobile == '') {
      this.dialogToggle('info')
    }
    // #endif
  },
  onShareAppMessage () {
    return {
      title: `祝大家玩的开心!`,
      // imageUrl: this.pageData.box.thumb,
      path: `/pages/tabbar/home`
    }
  },
  onShow () {
    this.$store.dispatch('getUserInfo').then(res => {
      console.log(res)
    })
    this.$store.dispatch('getAppConfig').then((res) => {
      console.log(res);
      this.popContent = res.data.pop_con
      this.wx_kefu = res.data.wx_kefu
    })

  },
  computed: {
    ...mapGetters(['sysConfig', 'userInfo'])
  },
  methods: {
    // 编辑资料
    editUserInfo () {
      if (!this.userInfo) {
        uni.showToast({
          title: '登录后再操作',
          icon: 'none',
          mask: true
        })
        return
      }
      this.$common.to({ url: '/package/mine/account-safe' })
    },
    // 去钱包页面
    toWallet (e) {
      if (!this.userInfo) {
        uni.showToast({
          title: '登录后再操作',
          icon: 'none',
          mask: true
        })
        return
      }
      this.$common.to({
        url: '/package/mine/wallet',
        query: {
          type: e
        }
      })
    },
    // 充值
    recharge () {
      if (!this.userInfo) {
        uni.showToast({
          title: '登录后再操作',
          icon: 'none',
          mask: true
        })
        return
      }
      this.$common.to({ url: '/package/mine/recharge' })
    },
    menuToOrder (item) {
      console.log(item)
      getApp().globalData.tabCur = item.type
      uni.switchTab({
        url: item.url,
      });
    },
    goInvite () {
      if (!this.userInfo) {
        uni.showToast({
          title: '登录后再操作',
          icon: 'none',
          mask: true
        })
        return
      }
      let url
      if (this.userInfo.level == 2) {
        url = '/package/mine/daili'
      } else {
        url = '/package/mine/yaoqing'
      }
      this.$common.to({
        tabCur: 1,
        url,
      })
    },
    //  菜单跳转
    menuTo (item) {
      if (!this.userInfo) {
        uni.showToast({
          title: '登录后再操作',
          icon: 'none',
          mask: true
        })
        return
      }
      console.log(item.id);
      let url = item.url
      if (item.id == 1) {
        if (this.userInfo.level == 2) {
          url = '/package/mine/daili'
        } else {
          url = '/package/mine/yaoqing'
        }
      }
      if (item.id == 0) {
        this.sdkshow = true;
      }
      if (item.id == 4) {
        this.kefushow = true
      }
      let query = {}
      if (item.type) {
        query.type = item.type
      }
      switch (item.id) {
        default:
          this.$common.to({
            tabCur: 1,
            url,
            query
          })
          break
      }
    },
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
    // 打开手机号弹窗
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
    // 复制
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
    //  去登录
    toLogin () {
      this.$common.to({
        url: '/pages/mine/login',
        query: {
          page: '/pages/tabbar/home'
        }
      })
    },
    goVip () {
      if (!this.userInfo) {
        uni.showToast({
          title: '登录后再操作',
          icon: 'none',
          mask: true
        })
        return
      }
      this.$common.to({
        url: '/pages/mine/vip',
      })
    }
  },
}
</script>

<style lang='scss'>
page {
  background: #f5f6f6;
  background: #effdea;
}

.my {
  padding-bottom: 150px;
  background: url("https://img.alicdn.com/imgextra/i2/2200676927379/O1CN011bNx0v24NdcXV4o5Y_!!2200676927379.png") no-repeat;
  background: url("https://img.alicdn.com/imgextra/i4/2200676927379/O1CN014XOtNY24NdcXgC3Z6_!!2200676927379.png") no-repeat;
  background-size: cover;
  min-height: calc(100vh - 50px);

  .top-box {
    width: 100%;
    height: 400rpx;

    padding-top: 60rpx;
    box-sizing: border-box;
    margin-bottom: 40rpx;
    // MP-WEIXIN
    padding-top: 100rpx;
    // endif

    .userInfo-box {
      padding: 0 20rpx;
      display: flex;
      align-items: center;
      justify-content: space-between;

      .left {
        display: flex;
        align-items: center;
        position: relative;

        .avatar {
          width: 72px;
          height: 72px;
          border-radius: 50%;
          margin-right: 15px;
          flex-shrink: 0;
        }

        .get-proto {
          width: 72px;
          text-align: center;
          font-size: 11px;
          color: #fff;
          text-align: center;
          position: absolute;
        }

        .name-wrap {
          .uc0-name-0 {
            color: #333;
            font-size: 16px;
            font-weight: 700;
          }

          .uc0-name-1 {
            color: #666;
            font-size: 16px;
            margin-top: 6px;
            display: flex;
            align-items: center;

            .copyText {
              padding: 0.5px 5px;
              background-color: #b778ce;
              color: #fff;
              border: 1px solid;
              margin-left: 10px;
              border-radius: 10rpx;
            }
          }

          .userName {
            color: #000;
            font-weight: 700;
            font-size: 16px;
          }
        }
      }

      .right {
        .news-btn {
          display: flex;
          justify-content: flex-end;
          width: 98px;
        }

        .edit {
          display: flex;
          align-items: center;
          border-radius: 50rpx;
          border: 1rpx solid #000;
          padding: 10rpx 20rpx;
          color: #000;

          .edit-img {
            width: 32rpx;
            margin-right: 10rpx;
          }
        }
      }
    }
  }

  .my-content {
    padding: 0 20rpx;
    margin-top: -90px;
  }

  .jinebox {
    height: 78px;
    box-sizing: border-box;
    background-color: #fff;
    border-radius: 8px;
    overflow: hidden;
    display: flex;
    justify-content: space-around;
    margin-bottom: 40rpx;
    background: url("../../static/mine/mine-border-01.png") no-repeat;
    background-size: 100% 100%;


    .jinebox-info {
      text-align: center;
      font-size: 13px;
      color: #fff;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 50%;

      image {
        width: 26px;
        height: 26px;
        margin-right: 10px;
      }

      .text {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        font-weight: 700;
        font-size: 32rpx;
        max-width: 70%;

        .text-1 {
          margin-top: 3px;
          font-size: 14px;
          font-weight: 700;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          width: 100%;
        }
      }
    }
  }

  .xc-serve {
    background: url("../../static/mine/mine-border-02.png") no-repeat;
    background-size: 100% 100%;
    //height: 500rpx;
    padding: 30rpx;

    .xc-serve-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 20rpx 30rpx;

      .xc-serve-item-left {
        display: flex;
        align-items: center;

        .xc-serve-img {
          width: 70rpx;
          height: 70rpx;
          margin-right: 20rpx;
        }

        .xc-server-title {
          font-size: 16px;
          color: #fff;
        }
      }
    }

  }

  .fulibox {
    .fulibox-left {
      height: 100%;
      text-align: center;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .fulibox-right {
      height: 100%;
      text-align: center;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }

  .xc-vip {
    margin-top: 20rpx;
    border-radius: 20rpx;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20rpx 40rpx;
    background-color: #f9e2c1;

    .vip-left {
      display: flex;
      align-items: center;

      .vip-title {
        color: #bc9569;
        font-size: 18px;
        margin-left: 30rpx;
      }
    }

    .vip-image {
      width: 80rpx;
    }
  }

  .myOrder {
    box-sizing: border-box;
    margin: 15px auto;
    border-radius: 8px;
    background-color: #fff;
    padding: 10px 10px 15px;
    padding: 20rpx;
    background: linear-gradient(to right, #5dfda1, #baf828);

    .title {
      font-size: 15px;
      font-weight: 700;
      margin-bottom: 20rpx;
    }

    .orderList {
      margin-top: 10px;
      box-sizing: border-box;
      display: flex;
      justify-content: space-between;
      background: #e1fee9;
      border-radius: 20rpx;
      padding: 50rpx 20rpx;

      .list-item {
        text-align: center;
        font-size: 14px;
        position: relative;
        color: #000;

        image {
          width: 28px;
          height: 28px;
          margin-bottom: 5rpx;
        }

        .dot {
          padding: 7rpx 10rpx;
          border-radius: 999rpx;
          background: #6b57dd;
          font-size: 12px;
          line-height: 20rpx;
          position: absolute;
          right: -15px;
          top: -7px;
          color: #000;
          z-index: 100;
        }
      }
    }
  }

  .invite {
    height: 140px;
    box-sizing: border-box;
    margin: 0px auto;
    border-radius: 8px;
    background-color: #fff;
    padding: 15px 10px;

    .invite-title {
      display: flex;
      justify-content: space-between;
      align-items: center;

      .invite-title-left {
        font-size: 15px;
        font-weight: 700;
      }

      .invite-title-right {
        font-size: 15px;
        height: 26px;
        line-height: 26px;
        text-align: center;
        background-color: rgba(160, 74, 255, .6);
        border-radius: 13px;
        color: #fff;
        padding: 0 15rpx;
      }
    }

    .invite-content {
      display: flex;
      align-items: center;
      margin-top: 10px;

      image {
        height: 70px;
        width: 120px;
        flex-shrink: 0;
      }

      .invite-content-info {
        display: flex;
        justify-content: space-between;
        width: 100%;
        text-align: center;

        .info-item {
          width: 100%;

          .info-item-0 {
            font-size: 17px;
            font-weight: 700;
            max-width: 90%;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }

          .info-item-1 {
            font-size: 13px;
            margin-top: 8px;
            color: #999;
            max-width: 90%;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
        }
      }
    }
  }

  .myapp {
    box-sizing: border-box;
    margin: 15px auto;
    border-radius: 20rpx;
    background-color: #fff;
    padding: 10px 15px 15px;
    padding: 20rpx;
    background: linear-gradient(to right, #5dfda1, #baf828);

    .tit {
      font-size: 15px;
      font-weight: 700;
      color: #fff;
      color: #000;
      margin-bottom: 20rpx;
    }

    .applist {
      display: flex;
      flex-wrap: wrap;
      background: #e1fee9;
      border-radius: 20rpx;
      padding: 20rpx;

      .app-list-item {
        margin-top: 15px;
        text-align: center;
        width: 25%;
        font-size: 14px;
        line-height: 1.5;
        padding: 0;
        padding: 5px;

        image {
          width: 60rpx;
          height: 60rpx;
        }

        .app-title {
          font-size: 14px;
          margin-top: 5px;
          color: #000;
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

.bgbox {
  background: url('https://www.img.xcooo.cn/uploads/2024/02/d969aa4534f6b91e.png') no-repeat;
  background-size: 100% 100%;
  width: 540rpx;
  height: 680rpx;

  .off {
    text-align: right;
    padding: 15px;
    box-sizing: border-box;
  }

  .content {
    margin-top: 35px;
    text-align: center;
    display: flex;
    justify-content: center;

    .ma {
      width: 156px;
      height: 156px;

      image {
        width: 100%;
        height: 100%;
      }
    }
  }

  .yi {
    text-align: center;
    font-size: 17px;
    color: #999;
    line-height: 26px;
    margin-top: 20px;
  }
}

.other-view {
  position: relative;
  padding: 15px 0;
  box-sizing: border-box;
  margin: 0 auto;
  margin-top: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 10px;
  background-color: #fff;
  // background: url("../../static/mine/mine-border-02.png") no-repeat;
  // background-size: 100% 100%;

  // &:after {
  //   content: " ";
  //   position: absolute;
  //   top: 0;
  //   left: 0;
  //   width: 200%;
  //   height: 200%;
  //   border: 1px solid #00fdeb;
  //   border-radius: 10px;
  //   -webkit-transform-origin: 0 0;
  //   transform-origin: 0 0;
  //   -webkit-transform: scale(.5);
  //   transform: scale(.5);
  // }

  .other-view-0 {
    width: calc(750rpx/3);
    color: #fff;
    display: flex;
    height: 100%;
    flex-shrink: 0;
    justify-content: center;
    align-items: center;
    position: relative;
    z-index: 2;

    .other-view-img {
      width: 23px;
      height: 23px;

      image {
        width: 100%;
        height: 100%;
      }
    }

    .other-view-right {
      display: flex;
      flex-direction: column;
      margin-left: 10px;
      font-weight: 400;

      .other-view-right-0 {
        font-size: 16px;
        text-align: center;
        color: #666;
      }

      .other-view-right-1 {
        max-width: calc(500rpx/3);
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        color: #000;
        font-weight: 700;
      }
    }
  }

  .other-view-1 {
    border-left: 1rpx solid #47a4be;
    border-right: 1rpx solid #47a4be;
  }

  .other-view-2 {
    width: calc(750rpx/3);
    color: #fff;
    display: flex;
    height: 100%;
    flex-shrink: 0;
    justify-content: center;
    align-items: center;
    position: relative;
    z-index: 2;
  }

}
</style>