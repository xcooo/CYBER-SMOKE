<template>
  <view>
    <u-popup v-model="localShow" mode="center" border-radius="20"
      :custom-style="{ backgroundColor: 'rgba(0, 0, 0, 0.7)' }" :mask-close-able="false">
      <view class="prizes-box">
        <view class="prizes-header">
          <u-icon class="close-icon" name="close" color="#333" size="38" @click="close" />
          <view class="prizes-title">我的奖品</view>
        </view>
        <view class="prizes-content">
          <view class="prize-item">
            <image :src="reward.thumb" mode="aspectFit" class="prize-image" />
            <view class="prize-info">
              <view class="prize-name">{{ reward.title }}</view>
              <view class="prize-time">{{ reward.created_at }}</view>
            </view>
          </view>
        </view>
        <view class="prizes-footer">
          <button class="return-btn" @click="returnPrize()" v-if="is_rongjie">退货</button>
          <button class="prize-btn" @click="claimPrize()">提货</button>
        </view>
      </view>
    </u-popup>
    <u-modal v-model="showRj" :title="'提示'" @confirm="duihuan" content="退货根据市场成本变化，一经退货无法撤销，请确认是否退货？"
      :show-cancel-button="true"></u-modal>
  </view>
</template>

<script>
export default {
  name: 'Reward',
  props: {
    show: {
      type: Boolean,
      default: false
    },
    is_rongjie:{
      type: Boolean,
      default: false
    },
    reward: {
      type: Object,
      default: () => ({})
    }
  },
  data () {
    return {
      showRj: false,
      localShow: this.show
    }
  },
  watch: {
    show (val) {
      this.localShow = val
    },
    localShow (val) {
      this.$emit('update:show', val)
    }
  },
  methods: {
    close () {
      this.localShow = false
    },
    returnPrize () {
      this.showRj = true
    },
    claimPrize () {
      this.$common.to({
        url: '/package/mine/bag-send',
        query: {
          goods_id: this.reward.goods_id,
          num: this.reward.num
        }
      })
      this.localShow = false
    },
    duihuan () {
      let goods_id = []
      for (let i = 1; i <= this.reward.num; i++) {
          goods_id.push(this.reward.goods_id)
        }

      this.req({
        url: '/v1/user/ship/box/dissolveByGoodsId',
        data: {
          goods_id
        },
        success: res => {
          if (res.code == 200) {
            this.$common.toast({
              title: res.msg,
              icon: 'success',
              duration: 600,
              success: () => {
                this.localShow = false
                this.rjShow = false
              }
            })
          }
        }
      })
    },
  }
}
</script>

<style lang="scss" scoped>
.prizes-box {
  width: 650rpx;
  background: linear-gradient(180deg, #FFFFFF 0%, #F8F8F8 100%);
  border-radius: 30rpx;
  padding: 40rpx;


  .prizes-header {
    position: relative;
    text-align: center;
    margin-bottom: 40rpx;

    .close-icon {
      position: absolute;
      right: 0;
      top: 50%;
      transform: translateY(-50%);
      width: 40rpx;
      height: 40rpx;
    }

    .rules-title,
    .prizes-title,
    .weapon-title {
      font-size: 36rpx;
      font-weight: bold;
      color: #333;
      background: linear-gradient(90deg, #FF6B6B 0%, #FF8E8E 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
  }
}

.prize-item {
  display: flex;
  align-items: center;
  padding: 20rpx;
  background: #FFFFFF;
  border-radius: 16rpx;
  margin-bottom: 20rpx;
  box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.05);

  .prize-image {
    width: 100rpx;
    height: 100rpx;
    margin-right: 20rpx;
  }

  .prize-info {
    flex: 1;

    .prize-name {
      font-size: 28rpx;
      font-weight: bold;
      color: #333;
      margin-bottom: 10rpx;
    }

    .prize-time {
      font-size: 24rpx;
      color: #999;
    }
  }
}

.prizes-footer {
  display: flex;
  justify-content: flex-end;
  gap: 24rpx;
  margin-top: 32rpx;

  .return-btn,
  .prize-btn {
    font-size: 26rpx;
    padding: 5rpx 50rpx;
    border-radius: 36rpx;
    text-align: center;
    white-space: nowrap;
    /* 防止文字换行 */
  }

  .return-btn {
    background: linear-gradient(90deg, #f5a623, #f8c14d);
    color: #fff;
  }

  .prize-btn {
    background: linear-gradient(to right, #FF6B6B, #FF8E8E);
    background: linear-gradient(90deg, #3a8dde, #6aabf7);
    color: #fff;
  }
}
</style>

