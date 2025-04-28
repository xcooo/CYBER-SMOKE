<template>
  <view class="prize-flying">
    <block v-for="(item, index) in flyLeftList" :key="'aa' + index">
      <view :class="['fly-prize', 'fly-left', 'aa' + index]" :style="{ animationDuration: flySpeed + 's' }"
        @animationend="handleAnimationEnd(index)">
        <image :src="item.thumb" mode=""></image>
      </view>
      <!-- <view :key="index" :class="['fly-prize', 'fly-left']" :style="flyStyle(flyLeft)"></view> -->
    </block>
    <block v-for="(item, index) in flyCenterList" :key="'bb' + index">
      <view :class="['fly-prize', 'fly-center']" :style="{ animationDuration: flySpeed + 's' }">
        <image :src="item.thumb" mode=""></image>
      </view>
    </block>
    <block v-for="(item, index) in flyRightList" :key="'cc' + index">
      <view :class="['fly-prize', 'fly-right']" :style="{ animationDuration: flySpeed + 's' }">
        <image :src="item.thumb" mode=""></image>
      </view>
    </block>
  </view>
</template>

<script>
export default {
  name: "prize-flying",
  props: {
    boxId: Number
  },
  data () {
    return {
      prizeList: [],
      flyLeftList: [],
      flyCenterList: [],
      flyRightList: [],
      indexRecord: 0, //记录奖品下标
      intervalTime: 2, //飞出频率 秒
      interval: null,
      flySpeed: 25, //飞行速度 秒 越小越快
    };
  },
  mounted () {
    console.log("进去了------------");
    this.loadPrizeList()
  },

  destroyed () {
    //销毁
    clearInterval(this.interval)
  },
  computed: {
    prizeLength () {
      return this.prizeList.length
    }
  },
  methods: {
    isshowleft (index) {
      console.log(index);
      console.log(this.flyLeftList.length);
      if (this.flyLeftList.length < 5) {
        return true
      } else {
        if (index < (this.flyLeftList.length - 5)) {
          return false
        } else {
          return true
        }
      }
    },
    handleAnimationEnd (index) {

    },
    //加载奖品列表
    loadPrizeList () {
      console.log("调用气泡");
      if (!this.boxId) return
      this.req({
        url: "/v1/box/getBoxShop",
        data: {
          id: this.boxId
        },
        success: res => {
          if (res.code == 200) {
            this.prizeList = res.data
            console.log(this.prizeList, "奖品");
            this.flyInterval()
          }
        }
      })
    },
    //循环
    flyInterval () {
      this.pushFlyList()
      this.interval = setInterval(() => {
        this.pushFlyList()
      }, this.intervalTime * 1000)
    },
    pushFlyList () {
      let count = 0
      while (count < 3) {
        if (this.indexRecord == this.prizeLength - 1) {
          this.indexRecord = 0
        } else {
          this.indexRecord++
        }
        let prize = this.prizeList[this.indexRecord]
        switch (count) {
          case 0:
            this.flyLeftList.push(prize);
            break
          case 1:
            this.flyCenterList.push(prize)
            break
          case 2:
            this.flyRightList.push(prize)
            break
        }
        count++
      }
    },
    flyStyle (prize) {
      return {
        background: `url(${prize.image})`,
        '-webkit-animation-duration': `${this.flySpeed}s`,
        'animation-duration': `${this.flySpeed}s`,
      }
    }
  }
}
</script>

<style lang="scss">
.prize-flying {
  z-index: 99;
  width: 200rpx;
  position: absolute;
  bottom: 50%;
  left: 50%;
  transform: translateX(-50%);

  .fly-prize {
    text-align: center;
    position: absolute;
    top: 100%;
    opacity: 0;
    width: 78rpx;
    height: 78rpx;
    background-image: url('https://img.50api.cn/dingdang/paopao.png') !important;
    background-repeat: no-repeat !important;
    background-size: 100% 100% !important;
    border-radius: 50%;
    background: #fff;
    // border: 1px solid #3277ff;
    padding: 14rpx;
    text-align: center;

    image {
      margin-top: 15%;
      width: 70%;
      height: 70%;
    }
  }

  .fly-left {
    left: 0px;
    z-index: 5;
    -webkit-animation: flyleft;
    animation: flyleft;
  }

  .fly-center {
    left: 60rpx;
    z-index: 3;
    -webkit-animation: flycenter;
    animation: flycenter;

  }

  .fly-right {
    right: 0px;
    z-index: 5;
    -webkit-animation: flyright;
    animation: flyright;
  }
}

// 动画
@keyframes flyleft {
  0% {
    // top: 100%;
    -webkit-transform: scale(0) translateX(0);
    transform: scale(0) translateX(0);
    opacity: .6;
  }

  3% {
    // top: 95%;
  }

  5% {
    -webkit-transform: scale(1) translateX(0) translateY(-80%);
    transform: scale(1) translateX(0) translateY(-80%);
    opacity: .8;
  }

  20% {
    opacity: 1;
  }

  30% {
    opacity: .2;
  }

  32% {
    opacity: 0;
    visibility: hidden;
  }

  50% {
    -webkit-transform: scale(1.9) translateX(-40px) translateY(-340%);
    transform: scale(1.9) translateX(-40px) translateY(-340%);
  }

  100% {
    // top: 0%;
    -webkit-transform: translateX(-100px);
    transform: translateX(-100px);
  }
}

@keyframes flycenter {
  0% {
    // top: 100%;
    -webkit-transform: scale(0) translateX(0);
    transform: scale(0) translateX(0);
    opacity: .6;
  }

  3% {
    // top: 95%;
  }

  5% {
    -webkit-transform: scale(1) translateX(0) translateY(-80%);
    transform: scale(1) translateX(0) translateY(-80%);
    opacity: .8;
  }

  20% {
    opacity: 1;
  }

  30% {
    opacity: .2;
  }

  32% {
    opacity: 0;
    visibility: hidden;
  }

  34% {
    opacity: 0;
  }

  50% {
    -webkit-transform: scale(1.9) translateX(0) translateY(-340%);
    transform: scale(1.9) translateX(0) translateY(-340%);
  }

  100% {
    // top: 0%;
    -webkit-transform: translateX(0);
    transform: translateX(0);
  }
}

@keyframes flyright {
  0% {
    // top: 100%;
    -webkit-transform: scale(0) translateX(0);
    transform: scale(0) translateX(0);
    opacity: .6;
  }


  3% {
    // top: 95%;
  }

  5% {
    -webkit-transform: scale(1) translateX(0) translateY(-80%);
    transform: scale(1) translateX(0) translateY(-80%);
    opacity: .8;
  }

  20% {
    opacity: 1;
  }

  30% {
    opacity: .2;
  }

  32% {
    opacity: 0;
    visibility: hidden;
  }

  34% {
    opacity: 0;
  }

  50% {
    -webkit-transform: scale(1.9) translateX(40px) translateY(-340%);
    transform: scale(1.9) translateX(40px) translateY(-340%);
  }

  100% {
    // top: 0%;
    -webkit-transform: translateX(100px);
    transform: translateX(100px);
  }
}
</style>
