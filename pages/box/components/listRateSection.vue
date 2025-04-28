<template >
  <view>
    <view>
      <view class="list-rate">
        <view class="recode-btn">
          <image class="recode-btn-img" :src="icon" mode="widthFix" lazy-load="false" binderror="" bindload="" />
        </view>
        <view class="rate">获得概率 {{ rate }}%</view>
      </view>
      <scroll-view class="" :scroll-x="true">
        <view class="mh-goods-list">
          <view class="mh-goods-list-item" v-for="(item, index) in awards" :key="index">
            <view class="mh-goods-img-wrap" :style="{ backgroundImage: `url(${item.image})` }"
              @click="openDetailPop(item)">
              <image class="mh-goods-img" :src="item.thumb" lazy-load="false" binderror="" bindload="" />
              <image class="mh-goods-rate" :src="item.mark_icon" mode="widthFix" lazy-load="false" binderror=""
                bindload="" />
              <view class="zhengming-wrap">
                <cimage class="zhengming-img" v-if="item.type == 2" src="/static/web/zhengming1.png" mode="scaleToFill" />
                <cimage class="zhengming-img" v-if="item.type == 3" src="/static/web/zhengming2.png" mode="scaleToFill" />
              </view>
              <view class="mh-sale">￥{{ item.price }}</view>
            </view>
          </view>
        </view>
      </scroll-view>
    </view>
  </view>
</template>

<script>
export default {
  props: {
    icon: String,
    rate: String,
    awards: Array
  },
}
</script>

<style lang='scss' scoped >
.list-rate {
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  // margin: 20rpx 0;
  // margin-bottom: 10rpx;

  .recode-btn {
    width: 150rpx;
  }

  .rate {}
}

.mh-goods-list {
  padding: 20rpx 0;
  display: flex;
  // flex-wrap: wrap;
  justify-content: flex-start;

  .mh-goods-list-item {
    position: relative;
    flex: 1;
    // background-color: rgba(0, 0, 0, .2);
    width: calc((100% - 20px) / 3);
    max-width: calc((100% - 20px) / 3);
    text-align: center;
    margin-right: 15px;
    margin-bottom: 10px;

    .mh-goods-img-wrap {
      background-size: 100% 100%;
      padding: 20rpx 3px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;
      color: #fff;
    }

    // &:nth-child(3n) {
    //   margin-right: 0;
    // }

    .mh-goods-rate {
      width: 62px;
      height: 62px;
      position: absolute;
      top: 1px;
      left: 1px;
      z-index: 9;
    }

    .mh-goods-img {
      width: 93px;
      height: 93px;
      margin-top: 20rpx;
    }

    .mh-goods-name {
      color: #fff;
      width: 100%;
      font-size: 12px;
      margin-top: 7px;
      display: -webkit-box;
      text-align: left;
      overflow: hidden;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
    }


  }

  .zhengming-wrap {
    width: 70px;
    height: 20px;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    bottom: 30px;

    .zhengming-img {
      animation: bLine 3s linear infinite;
    }

    @keyframes bLine {

      0%,
      100% {
        transform: scale(1);
      }

      50% {
        transform: scale(1.2);
      }
    }
  }

  .mh-sale {
    background-color: rgba(0, 0, 0, 0.2);
    color: #fff;
    width: 100%;
  }

  .mh-goods-price {
    font-size: 12px;
    font-weight: 700;
    color: #fff;
    margin-top: 5px;
    width: 100%;
    text-align: center;

    text {
      color: #a2c2bd;
      font-size: 9px;
    }
  }
}
</style>