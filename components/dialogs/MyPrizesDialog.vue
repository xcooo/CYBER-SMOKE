<template>
  <view>
    <u-popup v-model="localShow" mode="center" border-radius="20"
      :custom-style="{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }" width="88%">
      <view class="prizes-box">
        <view class="prizes-header">
          <u-icon class="close-icon" name="close" color="#333" size="38" @click="close"></u-icon>
          <view class="prizes-title">我的奖品</view>
        </view>
        <view class="prizes-content">
          <scroll-view scroll-y class="prize-scroll">
            <view class="prize-list" v-if="listData.length">
              <view class="prize-item" v-for="(item, index) in listData" :key="index">
                <image :src="item.thumb" mode="aspectFit" class="prize-image"></image>
                <view class="prize-info">
                  <view class="prize-name">{{ item.title }}</view>
                  <view class="product-meta">
                    <view class="return-price" v-if="is_rongjie">
                      <image class="return-icon" src="https://www.img.xcooo.cn/uploads/2024/02/231fcebf5c7a968d.png"
                        mode="widthFix" />
                      可退货余额: {{ item.total_return_price }}
                    </view>
                  </view>
                  <view class="quantity-box">
                    <u-number-box :min="1" v-model="item.num" :max="item.total" @change="totalChange(item, $event)">
                    </u-number-box>
                    <view class="return-quantity">x {{ item.total }}</view>
                  </view>
                  <!-- 按钮放底部 -->
                  <view class="prizes-footer">
                    <button class="return-btn" v-if="is_rongjie" @click="returnPrize(item)">退货</button>
                    <button class="prize-btn" @click="claimPrize(item)">提货</button>
                  </view>
                </view>
              </view>

            </view>
            <template v-else>
              <u-empty text="暂无奖品数据" mode="list"></u-empty>
            </template>
          </scroll-view>
        </view>
      </view>
    </u-popup>
    <u-modal v-model="showRj" :title="'提示'" @confirm="duihuan" content="退货根据市场成本变化，一经退货无法撤销，请确认是否退货？"
      :show-cancel-button="true"></u-modal>
  </view>
</template>

<script>
export default {
  name: 'MyPrizesDialog',
  props: {
    show: {
      type: Boolean,
      default: false
    },
    is_rongjie:{
      type: Boolean,
      default: false
    },
    prizes: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      showRj: false,
      currentItem: {},
      localShow: this.show,
      listData: []
    }
  },
  watch: {
    show (val) {
      this.localShow = val
    },
    localShow (val) {
      this.$emit('update:show', val)
      if (val) {
        this.getList()  // 弹窗打开时调用接口
      }
    }
  },
  methods: {
    getList () {
      this.req({
        url: '/v1/user/award',
        data: {
          status: 0,
          mark_id: 0
        },
        Loading: true,
        success: res => {
          if (res.code == 200) {
            let newArr = res.data.map(item => {
              return { ...item, checked: false, num: item.total }
            })

            this.listData = newArr
          } else {
          }
        }
      })
    },
    close () {
      this.localShow = false
    },
    returnPrize (prize) {
      this.currentItem = prize
      this.showRj = true
    },

    claimPrize (prize) {
      // this.$emit('claim', prize)
      console.log(prize)
      this.$common.to({
        url: '/package/mine/bag-send',
        query: {
          goods_id: prize.goods_id,
          num: prize.num
        }
      })
      this.localShow = false
    },
    totalChange (item, e) {
      // 当前数量
      let value = e.value
      item.total_return_price = this.preciseMultiply(item.return_price, value)
    },
    // 自定义函数来处理浮点数乘法精度问题
    preciseMultiply (a, b) {
      const factor = Math.pow(10, 10);
      let num = (Math.round(a * factor) * Math.round(b * factor)) / (factor * factor);
      return num.toFixed(2)
    },
    duihuan () {
      let goods_id = []
      for (let i = 1; i <= this.currentItem.num; i++) {
        goods_id.push(this.currentItem.goods_id)
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
.rules-box,
.prizes-box,
.weapon-box {
  background: linear-gradient(180deg, #FFFFFF 0%, #F8F8F8 100%);
  border-radius: 30rpx;
  padding: 40rpx 20rpx;

  .rules-header,
  .prizes-header,
  .weapon-header {
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

.prize-list {
  .prize-item {
    display: flex;
    flex-direction: row;
    padding: 20rpx;
    background: #FFFFFF;
    border-radius: 16rpx;
    margin-bottom: 20rpx;
    box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.05);

    .prize-image {
      width: 100rpx;
      height: 100rpx;
      margin-right: 20rpx;
      flex-shrink: 0;
    }

    .prize-info {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-between;

      .prize-name {
        font-size: 28rpx;
        font-weight: bold;
        color: #333;
        margin-bottom: 10rpx;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
      }

      .product-meta {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }

      .return-price {
        font-size: 26rpx;
        color: #f1a52f;
        display: flex;
        align-items: center;

        .return-icon {
          width: 28rpx;
          height: 28rpx;
          margin-right: 8rpx;
        }
      }

      .quantity-box {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 15rpx;
        margin-bottom: 15rpx;

        ::v-deep .u-number-input {
          background: #e8f0fe !important;
          border-radius: 8rpx;
          color: #333 !important;
        }

        ::v-deep .u-icon-minus,
        ::v-deep .u-icon-plus,
        ::v-deep .u-icon-disabled {
          background: linear-gradient(90deg, #3a8dde, #6aabf7) !important;
          color: white !important;
          border-radius: 6rpx !important;
          box-shadow: 0 2rpx 8rpx rgba(58, 141, 222, 0.4);
        }

        .return-quantity {
          font-size: 26rpx;
          color: #4a4a4a;
        }
      }



      .prize-time {
        font-size: 24rpx;
        color: #999;
      }

      .prizes-footer {
        display: flex;
        justify-content: flex-end;
        gap: 24rpx;
        margin-top: 10rpx;

        .return-btn,
        .prize-btn {
          font-size: 26rpx;
          padding: 0rpx 50rpx;
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
    }
  }

}



.prize-scroll {
  max-height: 800rpx; // 根据弹窗实际大小调整
  overflow: auto;
}
</style>
