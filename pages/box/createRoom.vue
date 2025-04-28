<template>
  <view class="createRoom">
    <view class="nav">
      <uni-nav-bar color="#fff" leftIcon="left" backgroundColor="transparent" :border="false" :statusBar="true"
        :fixed="true" title="创建房间">
        <view slot="left" class="nav-left" @click="back">
          <image class="" src="../../static/home/arrow.png" mode="widthFix" lazy-load="false" binderror="" bindload="" />
        </view>
      </uni-nav-bar>
    </view>
    <view class="list">
      <view class="item">
        <view class="title">玩家数量</view>
        <view class="right">
          <!-- <input class="uni-input" v-model="num" focus placeholder="请填写玩家数量(最少2人)" /> -->
          <u-radio-group v-model="room_type" @change="radioGroupChange">
            <u-radio active-color="#a63dff" v-for="(item, index) in list" :key="index" :name="item.type"
              :disabled="item.disabled">
              {{ item.name }}
            </u-radio>
          </u-radio-group>
        </view>
      </view>
      <view class="item">
        <view class="title">房间盲盒</view>
        <view class="right" @click="show = true">
          <template v-if="currentBox.title">
            <view>{{ currentBox.title }}</view>
          </template>
          <template v-else>
            <view class="desc">请选择您的开房盲盒</view>
          </template>

          <view class="select">选择</view>
        </view>
      </view>
      <view class="item">
        <view class="title">房间名称</view>
        <view class="right">
          <input class="uni-input" v-model="title" focus placeholder="请填写房间名称" />
        </view>
      </view>
      <!-- <view class="item">
        <view class="title">房间密码</view>
        <view class="right">
          <input class="uni-input" v-model="password" focus placeholder="请设置您的房间密码" />
        </view>
      </view> -->
    </view>

    <!-- 盲盒列表 -->
    <u-popup v-model="show" mode="bottom" border-radius="16" height="70%">
      <view class="mh-wrap">
        <mescroll-uni ref="mescrollRef" @init="mescrollInit" @down="downCallback" @up="getList" :down="downOption"
          :up="upOption">
          <view class="ck-title">选择盲盒</view>
          <scroll-view scroll-y>
            <view class="ck-box-list">
              <u-radio-group @change="boxRadioChange">
                <view class="ck-box-item" v-for="(item, index) in listData" :key="index">
                  <view class="ck-box-mask" :class="[item.is_new == 1 ? 'ck-box-mask-1' : 'ck-box-mask-2']">
                  </view>
                  <view class="ck-box-wrap" :style="{ backgroundImage: `url(${item.thumb})` }">
                    <view class="box-info">
                      <view class="box-title">{{ item.title }}</view>
                      <u-radio icon-size="30" shape="circle" active-color="#6b57dc" class="box-radio"
                        :name="item.id"></u-radio>
                    </view>
                    <view class="box-bottom">
                      <view class="box-price">￥{{ item.price }}/抽</view>
                      <view class="room-price">建房需支付 <text>￥</text><text>{{ room_price }}</text> </view>
                    </view>
                  </view>
                </view>
              </u-radio-group>
            </view>
          </scroll-view>

        </mescroll-uni>
      </view>
    </u-popup>

    <u-popup v-model="showOrder" mode="bottom" border-radius="16" height="30%">
      <view class="order">
        <view class="order-title">创建房间</view>
        <view class="order-pay">
          <view class="order-type">
            星币抵扣
          </view>
          <view class="order-price">
            -￥{{ room_price }}<text style="margin-left:5px">(余额:{{ money }})</text>
          </view>
        </view>
        <view class="order-btn">
          <view class="order-submit" @click="submitPay">立即支付</view>
        </view>
      </view>
    </u-popup>

    <view class="create-btn">
      <view class="room-price">￥{{ room_price }}</view>
      <view class="pay" @click="submitOrder">支付建房</view>
    </view>
  </view>
</template>

<script>
export default {
  name: 'createRoom',
  components: {

  },
  data () {
    return {
      title: '',
      num: 2,
      password: '',
      box_id: '',
      show: false,
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
      currentBox: {},
      room_price: 0,
      showOrder: false,
      money: 0,
      room_type: 1,
      list: [
        {
          name: '2人房',
          type: 1,
          disabled: false
        },
        {
          name: '5人房',
          type: 2,
          disabled: false
        },
      ],
    }
  },
  onShow () {
    this.init()

  },
  computed: {
  },
  methods: {
    radioGroupChange (e) {
      this.room_type = e
    },
    init () {
      this.$store.dispatch('getUserInfo').then(res => {
        let nickName = res.data.nickName
        this.money = res.data.money
        this.title = nickName + '的房间'
      })
      this.$store.dispatch('getAppConfig').then((res) => {
        console.log(res);
        this.room_price = res.data.room_price
      })
    },
    resetParams () {
      this.title = ''
      this.password = ''
      this.box_id = ''
      this.currentBox = {}
      this.room_price = 0
    },
    submitOrder () {
      if (!this.box_id) {
        this.$common.toast({
          title: '请选择房间盲盒'
        })
        return
      }
      if (this.num < 2) {
        this.$common.toast({
          title: '玩家数量最少2人'
        })
        return
      }
      this.showOrder = true
    },
    submitPay () {
      let data = {
        title: this.title,
        box_id: this.box_id,
        num: this.room_type == 1 ? 2 : 5
      }
      this.req({
        url: '/v1/room/store',
        data,
        Loading: true,
        success: res => {
          if (res.code == 200) {
            this.$common.toast({
              title: res.msg
            })
            this.showOrder = false
            this.resetParams()
            this.init()
            this.$common.to({
              url: '/pages/box/roomlist'
            })
          } else {
            this.$common.toast({
              title: res.msg
            })
          }
        }
      })
    },
    boxRadioChange (e) {
      let index = this.listData.findIndex(item => item.id == e)
      this.currentBox = this.listData[index]
      this.box_id = this.currentBox.id
      this.show = false
      console.log(this.currentBox)
    },
    getList ({
      num,
      size
    }) {

      let data = {
        page: num,
        per_page: size,
        sort_type: '',
        type: 2,
        room_type: this.room_type
      }
      this.req({
        url: '/v1/box/homeList',
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
    back () {
      uni.navigateTo({
        url: '/pages/box/roomlist',
      });
    },
  },
}
</script>

<style lang='scss' scoped>
.createRoom {
  background: url("https://img.alicdn.com/imgextra/i4/2200676927379/O1CN01unkdtT24NdWplMdw8_!!2200676927379.png") no-repeat;
  background-size: 100vw 100%;
  background-repeat: no-repeat;
  min-height: calc(100vh);

  .nav {
    ::v-deep .uni-navbar__header {
      padding: 0;
    }

    ::v-deep .uni-nav-bar-text {
      font-size: 30px;
      font-family: xcooo;
    }

    .nav-left {
      image {
        width: 70px;
      }
    }

    .nav-right {
      font-size: 16px;
      margin-right: 40rpx;
    }
  }

  .list {
    padding: 20rpx;

    .item {
      border: 4rpx solid;
      border-image: linear-gradient(270deg, #039aff, #705cff, #af38ff) 2 2;
      display: flex;
      align-items: center;
      padding: 20rpx 40rpx;
      color: #fff;
      margin-bottom: 40rpx;

      .right {
        flex: 1;
        margin-left: 40rpx;
        display: flex;
        justify-content: space-between;
        align-items: center;

        .desc {
          color: #999;
        }

        .select {
          color: aqua;
          flex-shrink: 0;
        }
      }
    }

  }

  .create-btn {
    color: #ffff;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: #000;
    padding: 40rpx 20rpx;
    padding-bottom: 150rpx;
    position: fixed;
    bottom: 0;
    width: 100%;

    .room-price {
      color: orange;
      font-size: 24px;
    }

    .pay {
      width: 200rpx;
      background: linear-gradient(270deg, #039aff, #705cff, #af38ff);
      border-radius: 40rpx;
      padding: 20rpx 40rpx;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }

  .ck-title {
    color: #fff;
    font-size: 24px;
    text-align: center;
    margin: 40rpx 0;
    font-family: xcooo;
  }

  ::v-deep .u-radio__icon-wrap {
    border-color: #705cff;
    border-width: 5rpx;
    width: 50rpx !important;
    height: 50rpx !important;
  }

  ::v-deep .u-radio-group {
    width: 100%;
  }

  ::v-deep .u-radio__label {
    color: #fff;
  }

  .ck-order {
    position: fixed;
    background-color: #000;
    width: 100%;
    color: #fff;
    z-index: 1;
  }

  .ck-box-list {
    padding: 30rpx;

    .ck-box-item {
      position: relative;
      margin-bottom: 30rpx;
      border: 4rpx solid;
      border-image: linear-gradient(270deg, #039aff, #705cff, #af38ff) 2 2;
      width: 100%;


      &:last-child {
        margin-bottom: 0;
      }
    }

    .ck-box-mask {
      width: 100%;
      height: 250rpx;
      position: absolute;
      top: 0;
      left: 0;
    }

    .ck-box-wrap {
      background-size: 100% 100%;
      width: 100%;
      height: 250rpx;
      padding: 0 20rpx;
      padding-top: 20rpx;
      padding-bottom: 20rpx;
      display: flex;
      flex-direction: column;
      justify-content: space-between;

      .box-info {
        color: #fff;
        display: flex;
        justify-content: space-between;

        .box-title {
          margin-bottom: 10rpx;
        }

        .number {
          margin-left: 20rpx;
          color: yellow;
        }
      }

      .box-bottom {
        display: flex;
        justify-content: space-between;
      }

      .box-price {
        font-size: 16px;
        font-weight: bold;
        color: #fff;
      }

      .room-price {
        color: #fff;
        padding: 10rpx 20rpx;
        background-size: 100% 100%;
        background: linear-gradient(270deg, #039aff, #705cff, #af38ff);
        border-radius: 20rpx;
      }
    }
  }

  .mh-wrap {
    padding-bottom: 40rpx;
    background-color: #222333;
    min-height: 100%;
  }

  .order {
    background-color: #222333;
    min-height: 100%;
    padding: 0 30rpx;
    padding-bottom: 40rpx;

    .order-title {
      color: #fff;
      font-size: 24px;
      text-align: center;
      font-family: xcooo;
      padding: 30rpx 0;
    }

    .order-pay {
      display: flex;
      justify-content: space-between;
      color: #fff;
      margin: 40rpx 0;
      font-size: 18px;
    }

    .order-btn {
      display: flex;
      justify-content: center;
    }

    .order-price {
      color: orange;

    }

    .order-submit {
      width: 100%;
      background: linear-gradient(270deg, #039aff, #705cff, #af38ff);
      border-radius: 40rpx;
      padding: 20rpx 40rpx;
      display: flex;
      justify-content: center;
      align-items: center;
      color: #fff;
    }
  }
}
</style>