<template>
  <view class="coupon">
    <uni-nav-bar title="优惠券" color="#fff" leftIcon="left" backgroundColor="#222333" :border="false" :statusBar="true"
      :fixed="true" @clickLeft="$common.back()"></uni-nav-bar>
    <view class="btn-list">
      <view class="btn" :class="current == item.id ? 'active' : ''" @click="select(item.id)"
        v-for="(item, idx) in btnList" :key="idx"> {{ item.name }} </view>
    </view>
    <view class="youhuicon">
      <view class="couList" v-for="(item, idx) in list" :key="idx">
        <view class="l" style="'background:#63D7D6'">
          <view class="aa">
            <text class="pri">￥{{ item.discount_amount }}</text>
            <view class="tiao">满减券</view>
          </view>
        </view>
        <view class="r">
          <view class="ll">
            <view class="t">{{ item.name }}</view>
            <view class="man">满{{ item.minimum_spend }}减{{ item.discount_amount }}元券</view>
            <view class="qi">{{ item.valid_from.substring(0, 11) }}至{{ item.valid_until.substring(0, 11) }} </view>
            <view class="count" v-if="current == 0"><text>数量:</text>{{ item.count }}</view>
          </view>
          <view class="rr" @click="buyCoupon(item)" v-if="current == 0">领取</view>
          <view class="rr xx" v-if="current == 1">待使用</view>
          <view class="rr xx2" v-if="current == 2">已使用</view>
          <view class="rr xx3" v-if="current == 3">已过期</view>
        </view>
      </view>
    </view>
    <u-empty text="暂无优惠券" mode="coupon" :show="show" margin-top="400"></u-empty>
  </view>
</template>

<script>
export default {
  data () {
    return {
      current: 0,
      btnList: [{
        id: 0,
        name: '可领取'
      }, {
        id: 1,
        name: '可使用'
      }, {
        id: 2,
        name: '已使用'
      },
      {
        id: 3,
        name: '不可用'
      },
      ],
      show: false,
      list: [],
    }
  },
  onLoad () {
    this.getList()
  },

  methods: {
    select (id) {
      this.current = id
      this.list = []
      if (this.current == 0) {
        this.getList()
      } else {
        this.getUserCoupon()
      }
    },
    getUserCoupon () {
      this.req({
        url: '/v1/coupon/user_coupons',
        data: {
          status: this.current
        },
        Loading: true,
        success: res => {
          if (res.code == 200) {
            if (res.data.data.length == 0) {
              this.show = true
            } else {
              this.show = false
            }
            this.list = res.data.data
          } else {
            this.show = true
          }
        }
      })
    },
    buyCoupon (item) {
      let that = this
      this.req({
        url: '/v1/coupon/add_coupons',
        data: {
          id: item.id
        },
        Loading: true,
        success: res => {
          if (res.code == 200) {
            uni.showToast({
              title: res.msg,
              icon: 'none',
              mask: true
            })
            that.getList()
          } else {
            uni.showToast({
              title: res.msg,
              icon: 'none',
              mask: true
            })
          }
        }
      })
    },
    getList () {
      this.req({
        url: '/v1/coupon/list',
        data: {

        },
        Loading: true,
        success: res => {
          if (res.code == 200) {
            if (res.data.data.length == 0) {
              this.show = true
            } else {
              this.show = false
            }
            this.list = res.data.data
          } else {
            this.show = true
          }
        }
      })
    }
  }
}
</script>

<style lang="scss">
.coupon {
  background-color: #F4F4FC;
  background: url("https://img.alicdn.com/imgextra/i4/2200676927379/O1CN01unkdtT24NdWplMdw8_!!2200676927379.png") no-repeat;
  background-size: 100% 100%;
  min-height: calc(100vh - 50px);
  background: #222333;
}

.btn-list {
  padding: 20rpx;
  display: flex;

  .btn {
    // padding: 5rpx 15rpx;
    // margin-right: 20rpx;
    color: #909195;
    flex: 1;
    text-align: center;
    font-size: 18px;
  }

  .active {
    color: #6c58dc;
    font-weight: 700;
    font-size: 18px;
  }
}


.youhuicon {
  padding: 20rpx;
  box-sizing: border-box;
}

.no {
  text-align: center;
  margin-top: 100rpx;
  font-size: 38rpx;
}

.youhuicon .couList {
  display: flex;
  border-radius: 6rpx;
  overflow: hidden;
  margin-bottom: 20rpx;
}

.youhuicon .couList .l {
  flex-shrink: 0;
  width: 200rpx;
  background-color: #6c58dc;
  display: flex;
  justify-content: center;
  align-items: center;
}

.youhuicon .couList .l .aa {
  font-size: 30rpx;
  color: #fff;
}

.youhuicon .couList .l .pri {
  font-size: 40rpx;
  color: #fff;
  text-align: center;
}

.youhuicon .couList .l .tiao {
  color: #fff;
  text-align: center;
  font-size: 16px;
  margin-top: 20rpx;
}

.count {
  color: #fff;
  font-size: 14px;
  margin-top: 20rpx;

  text {
    margin-right: 10rpx;
  }
}

.youhuicon .couList .r {
  background-color: #fff;
  width: 100%;
  padding: 20rpx;
  height: 100%;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #313131;
}

.youhuicon .couList .r .ll .t {
  font-size: 32rpx;
  color: #fff;
}

.man {
  margin-top: 20rpx;
  font-size: 14px;
  color: #fff;
}


.youhuicon .couList .r .use {
  margin: 8rpx 0;
}

.youhuicon .couList .r .qi {
  font-size: 24rpx;
  color: #999;
  margin-top: 20rpx;
}

.rr {
  color: #fff;
  background-color: orange;
  padding: 10rpx 20rpx;
  flex-shrink: 0;
  border-radius: 20rpx;
}

.xx {
  background-color: #6c58dc;
}

.xx2 {
  background-color: #000;
}

.xx3 {
  background-color: red;
}
</style>
