<template>
  <u-popup
    v-model="localShow"
    mode="center"
    border-radius="20"
    :custom-style="{ backgroundColor: 'rgba(0, 0, 0, 0.7)' }"
  >
    <view class="power-reference-box">
      <view class="power-reference-header">
        <u-icon
          class="close-icon"
          name="close"
          color="#333"
          size="38"
          @click="close"
        ></u-icon>
        <view class="power-reference-title">火力值参考</view>
      </view>
      <view class="power-reference-content">
        <view class="reference-item">
          <text class="item-title">普通炮</text>
          <text class="item-desc">基础伤害10点，适合新手使用</text>
        </view>
        <view class="reference-item">
          <text class="item-title">激光炮</text>
          <text class="item-desc">基础伤害15点，具有穿透效果</text>
        </view>
        <view class="reference-item">
          <text class="item-title">散弹炮</text>
          <text class="item-desc">每发子弹6点伤害，一次发射3发</text>
        </view>
        <view class="reference-item">
          <text class="item-title">连续发射</text>
          <text class="item-desc">每次连续发射增加10%伤害</text>
        </view>
      </view>
    </view>
  </u-popup>
</template>

<script>
export default {
  name: 'PowerReferenceDialog',
  props: {
    show: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
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
    }
  }
}
</script>

<style lang='scss' scoped>
.power-reference-box,
.feedback-box {
  width: 650rpx;
  background: linear-gradient(180deg, #FFFFFF 0%, #F8F8F8 100%);
  border-radius: 30rpx;
  padding: 40rpx;
}

.power-reference-header,
.feedback-header {
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

  .power-reference-title,
  .feedback-title {
    font-size: 36rpx;
    font-weight: bold;
    color: #333;
    background: linear-gradient(90deg, #FF6B6B 0%, #FF8E8E 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
}

.power-reference-content {
  .reference-item {
    background: #FFFFFF;
    border-radius: 16rpx;
    padding: 20rpx;
    margin-bottom: 20rpx;
    box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.05);

    .item-title {
      font-size: 28rpx;
      font-weight: bold;
      color: #333;
      margin-bottom: 10rpx;
      display: block;
    }

    .item-desc {
      font-size: 24rpx;
      color: #666;
      display: block;
    }
  }
}

</style>
