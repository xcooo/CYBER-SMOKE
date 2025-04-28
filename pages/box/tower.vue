<template>
  <scroll-view class="tower" scroll-y>
    <view class="nav">
      <uni-nav-bar color="#fff" leftIcon="left" backgroundColor="transparent" :border="false" :statusBar="true"
        :fixed="true" :title="seasonInfo.title">
        <view slot="left" class="nav-left" @click="back">
          <image class="" src="../../static/home/arrow.png" mode="widthFix" lazy-load="false" binderror="" bindload="" />
        </view>
        <!-- <view slot="right" class="nav-right" @click="rule">
          规则
        </view> -->
      </uni-nav-bar>
    </view>
    <view class="diamond-wrap">
      <view class="diamond">
        <image class="diamond-img" src="../../static/home/yaoshi.png" mode="widthFix" lazy-load="false" binderror=""
          bindload="" />
      </view>
      <view>{{ diamonds }}</view>
    </view>
    <view class="rank-wrap">
      <view>
        <image class="rank-img" src="../../static/home/rank.png" mode="widthFix" lazy-load="false" binderror=""
          bindload="" />
      </view>
      <view class="rank-list">
        <view class="rank-item" v-for="(item, index) in ranks" :key="index">
          <view class="rank-left">
            <view class="no-img">
              <image :src="item.image" lazy-load="false" binderror="" bindload="" />
            </view>
            <view>{{ item.nickName }}</view>
          </view>
          <view class="rank-right">{{ item.count }}</view>
        </view>
        <view class="more-rank" @click="rank">查看更多</view>
      </view>
    </view>
    <view class="rule-wrap">
      <view class="rule-img" @click="resetLayer">
        <image class="rule-first-img" src="../../static/home/cxpd.png" mode="widthFix" lazy-load="false" binderror=""
          bindload="" />
      </view>
      <view class="rule-img" @click="rule">
        <image class="rule-first-img" src="../../static/home/guize.png" mode="widthFix" lazy-load="false" binderror=""
          bindload="" />
      </view>
      <view class="rule-img" @click="refresh">
        <image class="rule-first-img" src="../../static/home/shuaxin.png" mode="widthFix" lazy-load="false" binderror=""
          bindload="" />
      </view>
    </view>
    <view class="tower-background" :style="{ backgroundImage: `url(${imgBaseUrl}${'/static/web/tower.png'})` }">
      <view class="tower-wrap">
        <view class="tower-item" v-for="(item, index) in listData" :key="index"
          :style="{ top: `${-20 * (index - 1)}px` }">
          <template v-if="item.status">
            <image class="tower-item-img" src="../../static/home/climb_status3.png" @click="toTowerDetail(item)" />
          </template>
          <template v-else>
            <image class="tower-item-img" src="../../static/home/climb_status1.png" bindload="" />
          </template>
          <view class="tower-layer">{{ item.layer }}F</view>

          <view class="st_bg">
            <image class="st-award-img" :src="item.first_rewards.thumb" lazy-load="false" binderror="" bindload="" />
          </view>
        </view>
      </view>
    </view>
    <!-- 登录弹窗 -->
    <uni-popup ref="loginPopup" type="center">
      <view class="tiploginShow-view">
        <view class="tiploginShow-view-0">
          您还未登录
        </view>
        <view class="tiploginShow-view-1">
          请登录以后再进行此操作~
        </view>
        <view class="tiploginShow-view-2" @click="$common.to({ url: '/pages/mine/login' })">
          前往登录
        </view>
        <view class="tiploginShow-view-3" @click="$refs.loginPopup.close()">
          暂不登录
        </view>

      </view>
    </uni-popup>
    <u-popup v-model="show" mode="center" width="80%" border-radius="20">
      <view class="rule-popup-wrap">
        <view class="rule-title">规则说明</view>
        <view class="rule-content">
          <p>规则:攀登者玩法共设有10个层级每一层级设有攀登证明、滑落证明商品，抽中攀登证明商品既可获得该层级赛季首次通关奖励并攀登进入上一层:首次通关奖励将会发放至仓库中，如抽中滑落证明商品则滑落至下一层。</p>
          <p>
            封神榜:攀登者顺利通关全部层级后将会进入封神榜，封神榜将根据成功攀登全部层级的通关次数和攀登时间先后进行排名，如用户之间成功攀登次数相同的，将根据成功攀登时间顺序进行排名。封神榜赛季结束后，将根据用户的封神榜排名发放对应的排名奖励。
          </p>
        </view>
      </view>
    </u-popup>
    <u-modal v-model="showModel" :title="'攀登提示'" :content="'请确认是否重新攀登'" :show-cancel-button="true"
      @confirm="submitGet"></u-modal>
  </scroll-view>
</template>

<script>
const switchMp3 = 'https://www.img.xcooo.cn/uploads/2024/02/17887756404cea30.mp3'
const switchMusic = uni.createInnerAudioContext();
export default {
  name: 'tower',
  components: {

  },
  data () {
    return {
      show: false,
      showModel: false,
      listData: [],
      ranks: [],
      diamonds: 0,
      seasonInfo: {},
      userInfo: ''
    }
  },
  onLoad (options) {
    switchMusic.src = switchMp3
  },
  onShow () {
    this.getList()
    this.getSeasonInfo()
    this.$store.dispatch('getUserInfo').then(res => {
      this.userInfo = res.data
    })
  },
  computed: {
  },
  methods: {
    getSeasonInfo () {
      this.req({
        url: '/v1/tower/seasonInfo',
        Loading: true,
        success: res => {
          if (res.code == 200) {
            this.seasonInfo = res.data
          } else {
          }
        }
      })
    },
    async refresh () {
      this.$nextTick(() => {
        if (switchMusic) {
          switchMusic.play()
        }
      })
      await this.getList()
      uni.showToast({
        title: '刷新成功',
        icon: 'none',
        mask: true
      })
    },
    resetLayer () {
      this.showModel = true
    },
    submitGet () {
      this.req({
        url: '/v1/tower/resetLayer',
        Loading: true,
        success: res => {
          if (res.code == 200) {
            uni.showToast({
              title: res.msg,
              icon: 'none',
              mask: true
            })
            this.getList()
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
        url: '/v1/tower/list',
        Loading: true,
        success: res => {
          if (res.code == 200) {
            this.listData = res.data.data
            this.diamonds = res.data.diamonds
            this.ranks = res.data.ranks
          } else {
          }
        }
      })
    },
    toTowerDetail (item) {
      this.$common.to({
        url: '/pages/box/towerDetail',
        query: {
          id: item.id,
          layer: item.layer
        }
      })
    },
    rule () {
      this.$nextTick(() => {
        if (switchMusic) {
          switchMusic.play()
        }
      })
      this.show = true
    },
    async back () {
      this.$nextTick(() => {
        if (switchMusic) {
          switchMusic.play()
        }
      })
      uni.switchTab({
        url: '/pages/tabBar/home',

      });
    },
    rank () {
      this.$nextTick(() => {
        if (switchMusic) {
          switchMusic.play()
        }
      })
      if (!this.userInfo) {
        this.$refs.loginPopup.open('center')
        return
      }
      this.$common.to({
        url: '/pages/box/rank'
      })
    },
  },
}
</script>

<style lang='scss' scoped>
.tiploginShow-view {
  width: 260px;
  background-color: #fff;
  border-radius: 15px;
  padding: 15px;
  box-sizing: border-box;

  .tiploginShow-view-0 {
    text-align: center;
    font-size: 16px;
    color: #131313;
  }

  .tiploginShow-view-1 {
    text-align: center;
    font-size: 12px;
    margin-top: 10px;
    color: #2c2c2c;
  }

  .tiploginShow-view-2 {
    width: 208px;
    height: 41px;
    background-color: #0079fe;
    color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 20px auto 10px;
  }

  .tiploginShow-view-3 {
    text-align: center;

  }
}

.tower {
  width: 100%;
  height: 100vh;
  /* 视口高度 */
  overflow: hidden;

  .nav {
    position: fixed;
    z-index: 10;

    ::v-deep .uni-navbar__header {
      padding: 0;
    }

    ::v-deep .uni-nav-bar-text {
      font-size: 24px;
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

  .diamond-wrap {
    position: fixed;
    top: 200rpx;
    left: 40rpx;
    background-color: #000;
    padding: 0 20rpx;
    border-radius: 20rpx;
    color: #fff;
    display: flex;
    align-items: center;
    z-index: 10;
    // max-width: 150rpx;

    .diamond-img {
      width: 50rpx;
      margin-right: 10rpx;
    }
  }

  .rank-wrap {
    position: fixed;
    top: 200rpx;
    right: 20rpx;
    background-color: rgba(0, 0, 0, 0.2);
    border-radius: 20rpx;
    border: 2rpx solid orange;
    box-shadow: orange 0px 0px 10px;
    padding: 40rpx 20rpx;
    padding-bottom: 20rpx;
    color: #fff;
    width: 40%;
    z-index: 10;

    .rank-img {
      position: absolute;
      top: -40rpx;
      left: 50%;
      transform: translateX(-50%);
      width: 150rpx;
      margin-bottom: 40rpx;

      image {
        width: 100%;
      }
    }

    .rank-list {
      .rank-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 10rpx;

        .rank-left {
          display: flex;
          align-items: center;

          .no-img {
            width: 40rpx;
            height: 42rpx;
            margin-right: 5rpx;
          }
        }

        .rank-right {}
      }

      .more-rank {
        margin-top: 20rpx;
        color: #ffe21f;
        text-align: center;
      }
    }
  }

  .rule-wrap {
    position: fixed;
    bottom: 200rpx;
    right: 20rpx;
    z-index: 10;

    .rule-img {
      width: 120rpx;
      margin-bottom: 40rpx;

      image {
        width: 100%;
      }
    }
  }


  .tower-background {
    position: relative;
    width: 100%;
    height: 2000px;
    /* 设置背景图高度为2000px */
    background-size: cover;
    /* 使背景图片覆盖整个容器 */
    background-repeat: no-repeat;
    /* 防止背景图片重复 */
    background-position: top;
    /* 背景图片从顶部开始 */
  }

  .tower-wrap {
    position: absolute;
    /* 绝对定位 */
    width: 80%;
    /* 调整塔身宽度为背景图的80% */
    height: 80%;
    /* 调整塔身高度为背景图的80% */
    left: 10%;
    /* 居中塔身 */
    top: 14%;
    /* 将塔身置于背景图片的中间区域 */
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    /* 从顶部开始排列 */
    align-items: center;
    /* 水平居中 */

    .tower-item {
      width: 100%;
      height: calc(10% + 20px);
      /* 每层高度设置为塔容器总高度的10%加20px */
      position: relative;

      .tower-item-img {
        width: 100%;
        height: 100%;
        display: block;
      }

      .tower-layer {
        color: #f2cd67;
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        bottom: 30px;
      }

      .st_bg {
        position: absolute;
        left: -35px;
        top: 40px;
        background: url("../../static/home/st_bg.png") no-repeat;
        background-size: 100% 100%;
        width: 120px;
        padding: 5rpx 10rpx;

        .st-award-img {
          width: 100rpx;
          height: 100rpx;
          object-fit: contain; // 保持图片比例并适应高度
        }
      }
    }

  }

  .rule-popup-wrap {
    padding: 30rpx;
    background: #222333;
    color: #fff;

    .rule-title {
      font-size: 20px;
      font-family: xcooo;
      margin-bottom: 30rpx;
      text-align: center;
      border-radius: 30rpx;
    }

    .rule-content {}
  }
}
</style>