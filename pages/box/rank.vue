<template>
  <view class="rank">
    <view class="nav">
      <uni-nav-bar color="#fff" leftIcon="left" backgroundColor="transparent" :border="false" :statusBar="true"
        :fixed="true" title="排行榜">
        <view slot="left" class="nav-left" @click="back">
          <image class="" src="../../static/home/arrow.png" mode="widthFix" lazy-load="false" binderror="" bindload="" />
        </view>
        <view slot="right" class="nav-right" @click="rule">
          规则
        </view>
      </uni-nav-bar>
    </view>

    <view class="timer-wrap">
      <view class="timer">当前赛季结束倒计时：

        <u-count-down :show-days="true" separator="zh" :timestamp="seasonInfo.distance_time"></u-count-down>
      </view>
    </view>

    <!-- <view class="ranking-container">
      <view class="ranking-item" v-for="(item, index) in seasonInfo.top_three" :key="index"
        :class="{ 'ranking-left': index === 0, 'ranking-center': index === 1, 'ranking-right': index === 2 }">
        <view class="avatar-container" v-if="item && item.avatar">
          <image :src="item.avatar" class="avatar"></image>
          <image :src="item.kuang" class="frame"></image>
        </view>
        <view class="name" v-if="item && item.nickName">{{ item.nickName }}</view>
        <view class="times" v-if="item && item.count">登顶次数 {{ item.count }}</view>
      </view>
    </view> -->
    <view class="ranking-container">
      <view class="ranking-item ranking-left">
        <template v-if="top_three[0]">
          <view class="avatar-container">
            <image :src="top_three[0].avatar" class="avatar"></image>
            <image :src="top_three[0].kuang" class="frame"></image>
          </view>
          <view class="userinfo-wrap">
            <view class="userinfo-index">
              2
            </view>
            <view class="userinfo-info">
              <view class="name">{{ top_three[0].nickName }}</view>
              <view class="times">登顶次数 {{ top_three[0].count }}</view>
            </view>
          </view>

          <view @click="openDetail(top_three[0])">
            <image :src="top_three[0].award_thumb" class="award-thumb"></image>
          </view>
        </template>
      </view>

      <view class="ranking-item ranking-center">
        <template v-if="top_three[1]">
          <view class="avatar-container">
            <image :src="top_three[1].avatar" class="avatar center-avatar"></image>
            <image :src="top_three[1].kuang" class="frame center-frame"></image>
          </view>
          <view class="userinfo-wrap">
            <view class="userinfo-index">
              1
            </view>
            <view class="userinfo-info">
              <view class="name">{{ top_three[1].nickName }}</view>
              <view class="times">登顶次数 {{ top_three[1].count }}</view>
            </view>
          </view>
          <view @click="openDetail(top_three[1])">
            <image :src="top_three[1].award_thumb" class="award-thumb"></image>
          </view>
        </template>
      </view>

      <view class="ranking-item ranking-right">
        <template v-if="top_three[2]">
          <view class="avatar-container">
            <image :src="top_three[2].avatar" class="avatar"></image>
            <image :src="top_three[2].kuang" class="frame"></image>
          </view>
          <view class="userinfo-wrap">
            <view class="userinfo-index">
              3
            </view>
            <view class="userinfo-info">
              <view class="name">{{ top_three[2].nickName }}</view>
              <view class="times">登顶次数 {{ top_three[2].count }}</view>
            </view>
          </view>
          <view @click="openDetail(top_three[2])">
            <image :src="top_three[2].award_thumb" class="award-thumb"></image>
          </view>
        </template>
      </view>
    </view>

    <scroll-view class="footer" :scroll-y="true">
      <view class="footer-item" v-for="(item, index) in seasonInfo.all_stats" :key="index">
        <view class="item-left">
          <view class="item-index">{{ item.ranking }}</view>
          <image :src="item.avatar" class="avatar"></image>
        </view>
        <view class="item-center">
          <view class="name">{{ item.nickName }}</view>
          <view class="details">
            <text>登顶次数: {{ item.count }}次 </text>
            <text>登顶时间: {{ item.last_completed_at }}</text>
          </view>
        </view>
        <view class="item-right" @click="openDetail(item)">
          <image :src="item.award_thumb" class="badge"></image>
        </view>
      </view>
    </scroll-view>

    <view class="user-my">
      <view class="footer-item">
        <view class="item-left">
          <view class="item-index">{{ current_user_ranking.ranking }}</view>
          <image :src="current_user_ranking.avatar" class="avatar"></image>
        </view>
        <view class="item-center">
          <view class="name">{{ current_user_ranking.nickName }}</view>
          <view class="details">
            <text>登顶次数: {{ current_user_ranking.count }}次 </text>
            <text>登顶时间: {{ current_user_ranking.last_completed_at }}</text>
          </view>
        </view>
        <view class="item-right" @click="openDetail(current_user_ranking)">
          <image :src="current_user_ranking.award_thumb" class="badge"></image>
        </view>
      </view>
    </view>


    <view class="side-buttons">
      <!-- <view class="side-button">
        <image src="../../static/home/wfgz.png" mode="widthFix" lazy-load="false" binderror="" bindload="" />
      </view> -->
      <view class="side-button" @click="getCurrentSeasonAwards">
        <image src="../../static/home/jplb.png" mode="widthFix" lazy-load="false" binderror="" bindload="" />
      </view>
      <view class="side-button" @click="getPastRewards">
        <image src="../../static/home/wqjl.png" mode="widthFix" lazy-load="false" binderror="" bindload="" />
      </view>
    </view>

    <u-popup v-model="show" mode="center" width="80%" border-radius="20">
      <view class="rule-wrap">
        <view class="rule-title">规则说明</view>
        <view class="rule-content">
          <p>规则:攀登者玩法共设有10个层级 每一层级设有攀登证明、滑落证明商品，抽中攀登证明商品既可获得该层级赛季首次通关奖励并攀登进入上一层，首次通关奖励将会发放至仓库中，如抽中滑落证明商品则滑落至下一层。</p>
          <p>
            封神榜:攀导者顺利通关全部层级后将会进入封神榜，封神榜将根据成功攀登全部层级的通关次数和攀登时间先后进行排名，如用户之间成功攀登次数相同的，将根据成功攀登时间顺序进行排名。封神榜赛季结束后，将根据用户的封神榜排名发放对应的排名奖励。
          </p>
        </view>
      </view>
    </u-popup>

    <!-- 奖励列表 -->
    <u-popup v-model="showAward" mode="bottom" border-radius="20" height="70%" class="reward-popup" closeable>
      <view class="reward-popup-wrap">
        <view class="popup-title">当前赛季奖励列表</view>
        <scroll-view scroll-y>
          <view class="reward-list">
            <view v-for="(item, index) in rewards" :key="index" class="reward-item">
              <!-- <view class="reward-rank">第{{ index + 1 }}名</view> -->
              <view class="reward-content">
                <view class="reward-info">
                  <view class="reward-title">排名奖励:</view>
                  <view class="reward-description">{{ item.title }}</view>
                </view>
                <view class="reward-thumb">
                  <img :src="item.thumb" alt="reward thumbnail" />
                </view>
              </view>
            </view>
          </view>
        </scroll-view>
      </view>
    </u-popup>

    <!-- 往期奖励 -->
    <u-popup v-model="showHistoryAward" mode="bottom" height="70%" border-radius="20" class="reward-popup" closeable>
      <view class="reward-popup-wrap">
        <view class="popup-title">往期奖励列表</view>
        <scroll-view scroll-y>
          <view v-for="(season, seasonId) in historyRewards" :key="seasonId" class="season-section">
            <view class="reward-list">
              <view v-for="(item, index) in season.rewards" :key="index" class="reward-item">
                <view class="reward-rank">第{{ item.rank }}名</view>
                <view class="reward-content">
                  <view class="reward-avatar">
                    <img :src="item.avatar" alt="avatar" />
                  </view>
                  <view class="reward-info">
                    <view class="reward-name">{{ item.name }}</view>
                    <view class="reward-times">登顶 {{ item.count }} 次</view>
                    <view class="reward-title">排名奖励:</view>
                    <view class="reward-description">{{ item.award_title }}</view>
                  </view>
                  <view class="reward-thumb">
                    <img :src="item.award_thumb" alt="reward thumbnail" />
                  </view>
                </view>
              </view>
            </view>
          </view>
        </scroll-view>
      </view>
    </u-popup>

    <!-- 奖品详情弹窗 -->
    <u-popup mode="bottom" height="75%" border-radius="20" v-model="showPopup" @close="showPopup = false" closeable>
      <view class="popup-container">
        <view class="popup-header">
          <text class="popup-title">商品详情</text>
        </view>
        <view class="popup-content">
          <view class="product-name">{{ productDetail.award_title }}</view>
          <view class="product-price">¥{{ productDetail.award_price }}</view>
          <image :src="productDetail.award_thumb" class="product-image" mode="widthFix" />
          <view class="product-details">
            <image src="../../static/home/product-detail.png" mode="widthFix" />
          </view>
        </view>
      </view>
    </u-popup>
  </view>
</template>

<script>
const switchMp3 = 'https://www.img.xcooo.cn/uploads/2024/02/17887756404cea30.mp3'
const switchMusic = uni.createInnerAudioContext();
export default {
  name: 'rank',
  components: {

  },
  data () {
    return {
      showPopup: false,
      showAward: false,
      seasonInfo: {},
      rewards: [],
      historyRewards: [],
      showHistoryAward: false,
      show: false,
      timer: '27天08时04分22秒',
      productDetail: {},
      top_three:[],
      current_user_ranking:{}
    }
  },
  onLoad (options) {
    switchMusic.src = switchMp3
  },
  onShow () {
    this.getSeasonInfo()
  },
  computed: {
  },
  methods: {
    openDetail (item) {
      this.showPopup = true
      this.productDetail = item
    },
    getCurrentSeasonAwards () {
      this.req({
        url: '/v1/tower/getCurrentSeasonAwards',
        Loading: true,
        success: res => {
          if (res.code == 200) {
            this.showAward = true
            this.rewards = res.data
          } else {
          }
        }
      })
    },
    getPastRewards () {
      this.req({
        url: '/v1/tower/getPastRewards',
        Loading: true,
        success: res => {
          if (res.code == 200) {
            this.showHistoryAward = true
            this.historyRewards = res.data
          } else {
          }
        }
      })
    },
    getSeasonInfo () {
      this.req({
        url: '/v1/tower/getRankings',
        Loading: true,
        success: res => {
          if (res.code == 200) {
            this.seasonInfo = res.data
            this.top_three = res.data.top_three
            this.current_user_ranking = res.data.current_user_ranking
          } else {
          }
        }
      })
    },
    rule () {
      this.show = true
    },
    back () {
      this.$nextTick(() => {
        if (switchMusic) {
          switchMusic.play()
        }
      })
      this.$common.to({
        url: '/pages/box/tower'
      })
    }
  },
}
</script>

<style lang='scss' scoped>
.rank {
  background: url("../../static/home/rank_bg.png") no-repeat;
  background-size: 100vw 100%;
  background-repeat: no-repeat;
  // min-height: calc(100vh - 50px);
  height: 100vh;
  padding: 0 20rpx;
  display: flex;
  flex-direction: column;


  .nav {

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

  .timer-wrap {
    display: flex;
    justify-content: center;
    width: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    color: #fff;
    padding: 20rpx 50rpx;
    border-radius: 25px;
    display: inline-block;
    margin: 20rpx 0;
    font-size: 16px;
    text-align: center;


    .timer {}

    ::v-deep .u-countdown {
      .u-countdown-colon {
        color: #fff !important;
      }

      .u-countdown-item {
        background: none !important;
      }

      .u-countdown-time {
        color: #fff !important;
      }

    }
  }

  .ranking-container {
    display: flex;
    justify-content: space-around;
    margin-top: 50px;
    margin-bottom: 20px;
    color: #ccbebe;


    .ranking-item {
      text-align: center;
      position: relative;
      margin: 0 10px;
      width: calc((100% - 30px) / 3);
      max-width: calc((100% - 30px) / 3);

      .avatar-container {
        position: relative;
        display: inline-block;

        .avatar {
          width: 80px;
          height: 80px;
          border-radius: 50%;
        }

        .frame {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 120px;
          height: 120px;
          pointer-events: none;
          /* 使框不可点击 */
        }

      }

      .userinfo-wrap {
        color: #fff;
        display: flex;
        align-items: center;

        .userinfo-index {
          font-size: 20px;
          font-weight: 700;
          margin-right: 20rpx;
        }

        .userinfo-info {

          .name {
            margin: 5px 0;
            margin-top: 35px;
            font-size: 16px;
            white-space: nowrap;
            /* 单行显示 */
            overflow: hidden;
            /* 超出部分隐藏 */
            text-overflow: ellipsis;
            /* 显示省略号 */
          }

          .times {
            border-radius: 20px;
            display: inline-block;
            margin-top: 5px;
            font-size: 14px;
            color: #ffe21f;
          }
        }
      }


      .award-thumb {
        width: 100rpx;
        height: 100rpx;
        margin-top: 10rpx;
      }

    }

    .ranking-left {
      margin-top: 50px;
    }

    .ranking-center {
      margin-top: 20px;

      .avatar {
        width: 100px;
        height: 100px;
      }

      .frame {
        width: 150px;
        height: 150px;
      }
    }

    .ranking-right {
      margin-top: 50px;
    }
  }

  .footer {
    margin-top: 0px;
    flex: 1 1 auto;
    /* 使footer占据剩余空间 */
    overflow: hidden;
    /* 防止内容溢出 */

    .footer-item {
      margin: 10px 0;
      display: flex;
      justify-content: space-between;
      align-items: center;
      background: url("../../static/home/rank_item.png") no-repeat;
      background-size: 100vw 100%;
      padding: 10px 20px;
      border-radius: 10px;
      color: #fff;

      .item-left,
      .item-right {
        display: flex;
        align-items: center;
      }

      .item-left {

        .item-index {
          color: #fff;
          font-size: 20px;
          font-weight: 700;
          margin-right: 20rpx;
        }
      }


      .avatar {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        flex-shrink: 0;
      }

      .item-center {
        flex: 1;
        padding: 0 10px;
        display: flex;
        flex-direction: column;
        justify-content: center;
      }

      .name {
        white-space: nowrap;
        /* 单行显示 */
        overflow: hidden;
        /* 超出部分隐藏 */
        text-overflow: ellipsis;
        /* 显示省略号 */
      }

      .details {
        font-size: 14px;
        color: #ffe21f;
      }

      .details text {
        display: block;
      }

      .times,
      .time {
        font-size: 14px;
        color: #888;
      }

      .item-right {
        display: flex;
        align-items: center;
      }

      .badge {
        width: 50px;
        height: 50px;
      }


    }

  }

  .user-my {
    .footer-item {
      margin: 10px 0;
      display: flex;
      justify-content: space-between;
      align-items: center;
      background: url("../../static/home/rank_item.png") no-repeat;
      background-size: 100vw 100%;
      padding: 10px 20px;
      border-radius: 10px;
      color: #fff;

      .item-left,
      .item-right {
        display: flex;
        align-items: center;
      }

      .item-left {

        .item-index {
          color: #fff;
          font-size: 20px;
          font-weight: 700;
          margin-right: 20rpx;
        }
      }


      .avatar {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        flex-shrink: 0;
      }

      .item-center {
        flex: 1;
        padding: 0 10px;
        display: flex;
        flex-direction: column;
        justify-content: center;
      }

      .name {
        white-space: nowrap;
        /* 单行显示 */
        overflow: hidden;
        /* 超出部分隐藏 */
        text-overflow: ellipsis;
        /* 显示省略号 */
      }

      .details {
        font-size: 14px;
        color: #ffe21f;
      }

      .details text {
        display: block;
      }

      .times,
      .time {
        font-size: 14px;
        color: #888;
      }

      .item-right {
        display: flex;
        align-items: center;
      }

      .badge {
        width: 50px;
        height: 50px;
      }


    }
  }

  .side-buttons {
    position: fixed;
    right: 10px;
    top: 200rpx;

    .side-button {
      width: 100rpx;
      margin-bottom: 40rpx;

      image {
        width: 100%;
      }
    }
  }

  .rule-wrap {
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

  .reward-popup {

    ::v-deep .uni-scroll-view {
      background-color: #1e1e1e;
    }
  }


  .reward-popup-wrap {
    padding: 20px;
    color: #fff;
    padding-bottom: 80rpx;
    height: 100%;

  }

  .popup-title {
    font-size: 24px;
    font-weight: bold;
    text-align: center;
    margin-bottom: 20px;
  }

  .reward-list {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  .reward-item {
    display: flex;
    flex-direction: column;
    background-color: #2a2a2a;
    border-radius: 10px;
    padding: 15px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }

  .reward-rank {
    font-size: 20px;
    font-weight: bold;
    color: #00ff00;
    margin-bottom: 10px;
  }

  .reward-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .reward-info {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .reward-title {
    font-size: 18px;
    font-weight: bold;
  }

  .reward-description {
    font-size: 16px;
    color: #bbb;
  }

  .reward-thumb {
    width: 100px;
    height: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #fff;
    border-radius: 10px;
    overflow: hidden;
  }

  .reward-thumb img {
    max-width: 100%;
    max-height: 100%;
  }
}
</style>

<style scoped>
.reward-popup-wrap {
  padding: 20px;
  /* background-color: #1e1e1e; */
  color: #fff;
  padding-bottom: 80rpx;
  height: 100%;
}

.popup-title {
  font-size: 24px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 20px;
}

.season-section {
  margin-bottom: 20px;
}

.season-title {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 10px;
}

.reward-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.reward-item {
  display: flex;
  flex-direction: column;
  background-color: #2a2a2a;
  border-radius: 10px;
  padding: 15px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.reward-rank {
  font-size: 20px;
  font-weight: bold;
  color: #00ff00;
  margin-bottom: 10px;
}

.reward-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.reward-avatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  overflow: hidden;
  background-color: #fff;
}

.reward-avatar img {
  width: 100%;
  height: auto;
}

.reward-info {
  display: flex;
  flex-direction: column;
  gap: 5px;
  flex: 1;
  padding: 0 10px;
}

.reward-name {
  font-size: 18px;
  font-weight: bold;
  color: #fff;
}

.reward-times {
  font-size: 16px;
  color: #ffcc00;
}

.reward-title {
  font-size: 16px;
  font-weight: bold;
  color: #fff;
}

.reward-description {
  font-size: 16px;
  color: #bbb;
}

.reward-thumb {
  width: 100px;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  border-radius: 10px;
  overflow: hidden;
}

.reward-thumb img {
  max-width: 100%;
  max-height: 100%;
}
</style>

<!-- 奖品详情弹窗 -->
<style scoped>
.popup-container {
  width: 100%;
  min-height: 100%;
  background-color: #222333;
  border-radius: 10px;
  padding: 20px;
}

.popup-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #ccc;
  padding-bottom: 10px;
}

.popup-title {
  font-size: 18px;
  font-weight: bold;
  color: #fff;
}

.popup-close {
  font-size: 18px;
  color: #ff0000;
  cursor: pointer;
}

.popup-content {
  padding-top: 20px;
}

.product-image {
  width: 100rpx;
  height: auto;
  margin-bottom: 20px;
}

.product-name {
  font-size: 16px;
  margin-bottom: 10px;
  color: #fff;
}

.product-price {
  font-size: 20px;
  color: red;
  margin-bottom: 20px;
}

.product-details-title {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
}

.product-details {
  font-size: 14px;
  color: #666;
}

.product-details image {
  width: 100%;
  height: auto;
}
</style>