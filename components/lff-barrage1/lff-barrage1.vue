<template>
  <view
    style="
      overflow: hidden;
      position: absolute;
      width: 100%;
      pointer-events: none;
      top: 0;
    "
    :style="{
      height: `${height}rpx`
    }"
  >
    <view
      class="danmu-li"
      v-for="(item, index) in listData"
      :class="item.type"
      :style="[item.style]"
      :key="index"
    >
      <view class="danmu-inner">
        <view
          class="user-box common_bg"
          :style="{
            'background-image': `url(${imgBaseUrl}${'/static/img/log_item_bg.png'})`
          }"
        >
          <view v-if="item.head_pic" class="user-img">
            <view class="img-box">
              <image :src="item.head_pic"></image>
            </view>
          </view>
          <view
            :style="{
              width: '80rpx',
              marginLeft: '10rpx',
              color: '#333333'
            }"
            class="user-text cl1 hang1"
          >
            <!-- <text style="margin-right: 10rpx">恭喜</text> -->
            {{ item.name }}
          </view>
          <view
            class="user-text cl1"
            style="margin-right: 10rpx; color: #333333"
          >
            <!-- <text style="margin-right: 10rpx">恭喜</text> -->
            开出了
          </view>
          <view class="user-status cl1">
            <text style="margin-right: 26rpx; color: #666ef2">
              {{ item.markTitle }}
            </text>
            <!-- <text style="color: #fff">{{ item.item }}</text> -->
          </view>
          <view v-if="item.prize" class="user-img">
            <view class="img-box">
              <image :src="item.prize"></image>
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>
<script>
export default {
  props: {
    //rightToLeft leftToRight leftBottom
    type: {
      type: String,
      default: 'rightToLeft'
    },
    minTime: {
      type: Number,
      default: 4
    },
    maxTime: {
      type: Number,
      default: 9
    },
    minTop: {
      type: Number,
      default: 0
    },
    maxTop: {
      type: Number,
      default: 150
    },
    hrackH: {
      //轨道高度
      type: Number,
      default: 40
    },
    noStacked: {
      //不允许堆叠(暂不可用)
      type: Array,
      default() {
        return []
      }
    },
    height: {
      type: String,
      default: '300'
    },
    /* 背景色 */
    background: {
      type: String,
      default: 'rgba(0, 0, 0, 0.9)'
    }
  },
  data() {
    return {
      listData: []
    }
  },
  mounted() {
    this.hrackNum = Math.floor((this.maxTop - this.minTop) / this.hrackH)
  },
  methods: {
    add(obj) {
      console.log('666',obj)
      let data = {
        head_pic: obj.head_pic,
        name: obj.name,
        times: obj.times,
        markTitle: obj.markTitle,
        prize: obj.prize,
        id: Date.parse(new Date()),
        // time: Math.ceil(
        //   Math.floor(
        //     Math.random() * (this.maxTime - this.minTime + 1) + this.minTime
        //   )
        // ),
        time: 6,
        type: this.type
      }
      if (this.type === 'leftBottom') {
        let objData = {
          head_pic: obj.head_pic,
          name: obj.name,
          times: obj.times,
          markTitle: obj.markTitle,
          prize: obj.prize,
          type: 'leftBottomEnter',
          style: {
            transition: `all 0.5s`,
            animationDuration: `0.5s`,
            transform: `translateX(0%)`,
            bottom: `${this.minTop}px`
          }
        }
        let listLen = this.listData.length
        let hrackNum = this.hrackNum
        for (let i in this.listData) {
          if (this.listData[i].status === 'reuse') {
            //重用
            this.$set(this.listData, i, objData)
          } else if (this.listData[i].status === 'reset') {
            //重置
            this.listData[i].style.transition = 'none'
            this.listData[i].style.bottom = 0
            this.listData[i].status = 'reuse'
          } else if (this.listData[i].status === 'recycle') {
            //回收
            this.listData[i].type = 'leftBottomExit'
            this.listData[i].status = 'reset'
          } else {
            this.listData[i].style.bottom =
              parseInt(this.listData[i].style.bottom) + this.hrackH + 'px'
          }
          if (
            parseInt(this.listData[i].style.bottom) >=
              this.maxTop - this.hrackH &&
            this.listData[i].status !== 'reset'
          ) {
            //需要回收
            this.listData[i].status = 'recycle'
          }
        }
        if (listLen < hrackNum + 2) {
          this.listData.push(objData)
        }
      } else if (this.type === 'rightToLeft' || this.type === 'leftToRight') {
        let objData = this.horStacked(data)
        for (let i in this.listData) {
          if (this.listData[i].delTime <= Date.parse(new Date())) {
            this.repaint(i, objData.type)
            objData.type = ''
            this.$set(this.listData, i, objData)
            return
          }
        }
        this.listData.push(objData)
      }
    },
    horStacked(data) {
      return {
        head_pic: data.head_pic,
        name: data.name,
        times: data.times,
        markTitle: data.markTitle,
        prize: data.prize,
        type: this.type,
        style: {
          animationDuration: `${data.time}s`,
          top: `${Math.ceil(
            Math.random() * (this.maxTop - this.minTop + 1) + this.minTop
          )}px`
        },
        delTime: Date.parse(new Date()) + data.time * 1200
      }
    },
    repaint(index, type) {
      setTimeout(() => {
        this.listData[index].type = type
      }, 100)
    }
  }
}
</script>
<style></style>
<style lang="scss">
@keyframes leftBottomEnter {
  0% {
    transform: translateY(100%);
    opacity: 0;
  }

  100% {
    transform: translateY(0%);
    opacity: 1;
  }
}

@keyframes leftBottomExit {
  0% {
    transform: translateY(0%);
    opacity: 1;
  }

  100% {
    transform: translateY(-200%);
    opacity: 0;
  }
}

@keyframes leftToRight {
  0% {
    transform: translateX(-100%);
    opacity: 0;
  }

  1% {
    transform: translateX(-100%);
    opacity: 0;
  }

  5% {
    opacity: 1;
  }

  100% {
    opacity: 1;
    transform: translateX(100%);
  }
}

@keyframes rightToLeft {
  0% {
    transform: translateX(100%);
    opacity: 0;
  }

  1% {
    transform: translateX(100%);
    opacity: 0;
  }

  5% {
    opacity: 1;
  }

  100% {
    transform: translateX(-100%);
    opacity: 1;
  }
}

.danmu-li {
  position: absolute;
  width: 100%;
  transform: translateX(100%);
  animation-timing-function: linear;
  display: flex;
  justify-content: flex-start;

  &.leftBottomEnter {
    animation-name: leftBottomEnter;
  }
  &.leftBottomExit {
    animation-name: leftBottomExit;
    animation-fill-mode: forwards;
  }

  &.rightToLeft {
    animation-name: rightToLeft;
  }

  &.leftToRight {
    animation-name: leftToRight;
  }

  .danmu-inner {
    display: inline-block;

    .user-box {
      padding: 015rpx;
      display: flex;
      // padding: 3rpx 0rpx 3rpx 0rpx;
      height: 50rpx;
      // background: rgba(0, 0, 0, 0.9);
      // background: linear-gradient(
      //   to right,
      //   rgba(118, 208, 232, 0.9),
      //   rgba(118, 208, 232, 0.2)
      // );
      // border-radius: 32rpx;
      align-items: center;

      .user-img {
        .img-box {
          display: flex;

          image {
            width: 40rpx;
            height: 40rpx;
            // background: rgba(55, 55, 55, 1);
            border-radius: 58rpx;
          }
        }
      }

      .user-status {
        // margin-left: 10rpx;
        white-space: nowrap;
        font-size: 24rpx;
        font-weight: 400;
        color: rgba(255, 255, 255, 1);
      }

      .user-text {
        // margin-left: 10rpx;
        // white-space: nowrap;
        font-size: 24rpx;
        font-weight: 400;
        // width: 130rpx;
        color: rgba(255, 255, 255, 1);
      }
    }
  }
}
</style>
