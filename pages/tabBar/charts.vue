<template>
  <view class="ranking-container">

    <!-- 顶部导航栏 -->
    <view class="ranking-header">
      <text class="ranking-title">排行榜</text>

      <view class="category-list">
        <view v-for="(category, index) in categories" :key="index"
          :class="['category-item', { 'active-cate': activeCategory == index }]" @click="setActiveCategory(index)">
          <text class="category-title">{{ category }}</text>
        </view>
      </view>
      <view class="time">
        <view class="time">
          {{ timeRange.start }} <text class="time-text">至</text> {{ timeRange.end }}
        </view>
      </view>
      <view class="ranking-container">
        <view class="ranking-item ranking-left">
          <template v-if="top_three[1]">
            <view class="avatar-container">
              <image :src="top_three[1].avatar" class="avatar"></image>
              <image src="https://img.alicdn.com/imgextra/i1/2200676927379/O1CN01lcrcQm24NdcaiphrF_!!2200676927379.png"
                class="frame" mode="widthFix"></image>
            </view>
            <view class="userinfo-wrap">
              <view class="userinfo-info">
                <view class="name">{{ top_three[1].nickName }}</view>
                <view class="times">抽赏次数 {{ top_three[1].count }}</view>
              </view>
            </view>
          </template>
        </view>

        <view class="ranking-item ranking-center">
          <template v-if="top_three[0]">
            <view class="avatar-container">
              <image :src="top_three[0].avatar" class="avatar center-avatar"></image>
              <image src="https://img.alicdn.com/imgextra/i4/2200676927379/O1CN01eGFDR324NdcbVqDTe_!!2200676927379.png"
                class="frame center-frame" mode="widthFix"></image>
            </view>
            <view class="userinfo-wrap">
              <view class="userinfo-info">
                <view class="name">{{ top_three[0].nickName }}</view>
                <view class="times">抽赏次数 {{ top_three[0].count }}</view>
              </view>
            </view>

          </template>
        </view>

        <view class="ranking-item ranking-right">
          <template v-if="top_three[2]">
            <view class="avatar-container">
              <image :src="top_three[2].avatar" class="avatar"></image>
              <image src="https://img.alicdn.com/imgextra/i2/2200676927379/O1CN01vxCI4z24NdcYKlqKu_!!2200676927379.png"
                class="frame" mode="widthFix"></image>
            </view>
            <view class="userinfo-wrap">
              <view class="userinfo-info">
                <view class="name">{{ top_three[2].nickName }}</view>
                <view class="times">抽赏次数 {{ top_three[2].count }}</view>
              </view>
            </view>
          </template>
        </view>
      </view>
    </view>

    <template v-if="leaderboard.length">
      <scroll-view class="footer" :scroll-y="true">
        <view class="footer-item" v-for="(item, index) in leaderboard" :key="index">
          <view class="item-left">
            <view class="item-index">{{ item.index }}</view>
          </view>
          <view class="item-center">
            <image :src="item.avatarUrl" class="avatar"></image>
            <view class="name">{{ item.nickname }}</view>
          </view>
          <view class="item-right">
            <view class="details">
              <text> {{ item.count }}次 </text>
            </view>
          </view>
        </view>
      </scroll-view>
    </template>
    <template v-else>
      <view class="empty-list">
        <u-empty text="暂无排行榜数据~" mode="list"></u-empty>
      </view>
    </template>


    <view class="rule-btn-wrap">
      <view class="rule-btn-item" @click="showRules">
        <image class="rule-btn-item-img"
          src="https://img.alicdn.com/imgextra/i4/2200676927379/O1CN01WhNdaL24NdcWm4MBp_!!2200676927379.png"
          mode="widthFix" lazy-load="false" binderror="" bindload="" />
      </view>
      <view class="rule-btn-item" @click="fresh">
        <image class="rule-btn-item-img"
          src="https://img.alicdn.com/imgextra/i1/2200676927379/O1CN01WJw25c24NdcXfR5bK_!!2200676927379.png"
          mode="widthFix" lazy-load="false" binderror="" bindload="" />
      </view>
    </view>

    <!-- 规则说明 -->
    <u-popup v-model="rulePop" mode="center" width="80%" border-radius="20">
      <view class="rule-pop">
        <view class="rule-title">
          规则说明
        </view>
        <scroll-view class="rule-pop-bd" scroll-y>
          <view class="rule-content">
            1、排行榜展示排名前10抽赏用户;
          </view>
          <view class="rule-content">
            2、以排行榜排名为准;
          </view>
        </scroll-view>
      </view>
    </u-popup>
  </view>
</template>

<script>
const switchMp3 = 'https://www.img.xcooo.cn/uploads/2024/02/17887756404cea30.mp3'
const switchMusic = uni.createInnerAudioContext();
export default {
  data () {
    return {
      leaderboard: [
        // { nickname: '微信用户微信用户微信用户微信用户微信用户微信用户微信用户', avatarUrl: 'https://img.alicdn.com/imgextra/i4/2200676927379/O1CN01pWpy1324NdcZ5vSha_!!2200676927379.png', count: 158, index: 4 },
        // { nickname: '退网炒情', avatarUrl: 'https://img.alicdn.com/imgextra/i4/2200676927379/O1CN01pWpy1324NdcZ5vSha_!!2200676927379.png', count: 98, index: 5 },
        // { nickname: '一发入魂', avatarUrl: 'https://img.alicdn.com/imgextra/i4/2200676927379/O1CN01pWpy1324NdcZ5vSha_!!2200676927379.png', count: 65, index: 6 },
        // { nickname: '小嗨虎', avatarUrl: 'https://img.alicdn.com/imgextra/i4/2200676927379/O1CN01pWpy1324NdcZ5vSha_!!2200676927379.png', count: 50, index: 7 },
        // { nickname: '无名', avatarUrl: 'https://img.alicdn.com/imgextra/i4/2200676927379/O1CN01pWpy1324NdcZ5vSha_!!2200676927379.png', count: 42, index: 8 },
        // { nickname: '嗨', avatarUrl: 'https://img.alicdn.com/imgextra/i4/2200676927379/O1CN01pWpy1324NdcZ5vSha_!!2200676927379.png', count: 22, index: 9 },
        // { nickname: '无情', avatarUrl: 'https://img.alicdn.com/imgextra/i4/2200676927379/O1CN01pWpy1324NdcZ5vSha_!!2200676927379.png', count: 8, index: 10 },
      ],
      categories: ['周榜', '月榜'],
      activeCategory: 0, // 当前激活的分类
      rulePop: false, // 控制 u-popup 是否显示
      top_three: [
        // {
        //   avatar: 'https://img.alicdn.com/imgextra/i1/2200676927379/O1CN013RWavI24NdXioVlyz_!!2200676927379.png',
        //   nickName: 'xcooo',
        //   count: 657,
        // },
        // {
        //   avatar: 'https://img.alicdn.com/imgextra/i2/2200676927379/O1CN01pK0pvE24NdXibuapg_!!2200676927379.png',
        //   nickName: '退网老人',
        //   count: 350,
        // },
        // {
        //   avatar: 'https://img.alicdn.com/imgextra/i2/2200676927379/O1CN01JJ9NsV24NdXiolPmK_!!2200676927379.jpg',
        //   nickName: '甜甜',
        //   count: 215,
        // }
      ],
      timeRange: {
        start: '',
        end: ''
      },
    };
  },
  onLoad () {
    switchMusic.src = switchMp3
  },
  onShow () {
    this.updateTimeRange();
    this.getRankInfo();
  },
  methods: {
    updateTimeRange () {
      const now = new Date();
      let startTime = '';
      let endTime = '';

      if (this.activeCategory == 0) {
        // 周榜
        const day = now.getDay() || 7;
        const monday = new Date(now.getFullYear(), now.getMonth(), now.getDate() - day + 1);
        const sunday = new Date(monday.getFullYear(), monday.getMonth(), monday.getDate() + 6);
        startTime = this.formatDate(monday) + ' 00:00:00';
        endTime = this.formatDate(sunday) + ' 23:59:59';
      } else {
        // 月榜
        const firstDay = new Date(now.getFullYear(), now.getMonth(), 1);
        const lastDay = new Date(now.getFullYear(), now.getMonth() + 1, 0);
        startTime = this.formatDate(firstDay) + ' 00:00:00';
        endTime = this.formatDate(lastDay) + ' 23:59:59';
      }

      this.timeRange = {
        start: startTime,
        end: endTime
      };
    },
    getRankInfo () {
      this.req({
        url: '/v1/box/rank',
        data: {
          startTime: this.timeRange.start,
          endTime: this.timeRange.end
        },
        Loading: true,
        success: res => {
          if (res.code == 200) {
            const allData = res.data || [];
            if (allData.length) {
              this.top_three = allData.slice(0, 3).map(item => ({
                avatar: item.avatarUrl,
                nickName: item.nickname,
                count: item.count,
              }));

              this.leaderboard = allData.slice(3).map((item, index) => ({
                avatarUrl: item.avatarUrl,
                nickname: item.nickname,
                count: item.count,
                index: index + 4
              }));
            }

          }
        }
      })
    },
    setActiveCategory (index) {
      this.$nextTick(() => {
        if (switchMusic) {
          switchMusic.play()
        }
      })
      this.activeCategory = index;
      this.updateTimeRange();
      this.getRankInfo();
    },
    showRules () {
      this.$nextTick(() => {
        if (switchMusic) {
          switchMusic.play()
        }
      })
      this.rulePop = true;
    },
    // 工具方法：格式化日期为 YYYY-MM-DD
    formatDate (date) {
      const y = date.getFullYear();
      const m = (date.getMonth() + 1).toString().padStart(2, '0');
      const d = date.getDate().toString().padStart(2, '0');
      return `${y}-${m}-${d}`;
    },
    fresh () {
      this.$nextTick(() => {
        if (switchMusic) {
          switchMusic.play()
        }
      })
      uni.showToast({
        title: '刷新成功',
        icon: 'none',
        mask: true
      })
      this.updateTimeRange();
      this.getRankInfo();
    },
  }
};
</script>

<style lang="scss" scoped>
page {
  background: #fff;
}

.ranking-container {
  font-family: 'Roboto', sans-serif;
  position: relative;

  .ranking-header {
    padding: 20px;
    // box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
    background: url('https://img.alicdn.com/imgextra/i4/2200676927379/O1CN01lQxUno24Ndcahj1iE_!!2200676927379.png') no-repeat;
    background-size: 100% 100%;
    height: 60vh;
    // min-height: 60vh;
    // max-height: 60vh;
    // padding-bottom:0;

    .ranking-title {
      font-size: 28px;
      font-weight: bold;
      color: #222222;
      text-align: left;
      text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.3);
    }

    .category-list {
      display: flex;
      // justify-content: space-between;
      margin: 30rpx 0;

      .category-item {
        background-color: #ffe4c1;
        padding: 15rpx 30rpx;
        border-radius: 50rpx;
        text-align: center;
        cursor: pointer;
        transition: background-color 0.3s;
        margin-right: 30rpx;

        .category-title {
          font-size: 16px;
          font-weight: bold;
          color: #e53e38;
        }
      }

      .active-cate {
        background: #fff;
      }
    }

    .time {
      color: #e53e38;
      font-size: 24rpx;
      margin-bottom: 20rpx;

      .time-text {
        margin: 0 10rpx;
      }
    }

  }

  .ranking-container {
    display: flex;
    justify-content: space-around;
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
          top: -6%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 80rpx;
          pointer-events: none;
        }

      }

      .userinfo-wrap {
        display: flex;
        align-items: center;
        justify-content: center;

        .userinfo-info {

          .name {
            margin: 5px 0;
            margin-top: 35px;
            font-size: 16px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            color: #000;
            font-weight: 700;
          }

          .times {
            border-radius: 20px;
            display: inline-block;
            margin-top: 5px;
            font-size: 14px;
            color: #e53e38;
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
    margin-top: -200rpx;
    flex: 1 1 auto;
    /* 使footer占据剩余空间 */
    overflow: hidden;
    /* 防止内容溢出 */

    ::v-deep .uni-scroll-view {
      background-color: #fff;
    }

    .footer-item {
      margin: 10px 0;
      display: flex;
      justify-content: space-between;
      align-items: center;
      // background: url("../../static/home/rank_item.png") no-repeat;
      background-size: 100vw 100%;
      padding: 10px 20px;
      border-radius: 10px;

      .item-left,
      .item-right {
        display: flex;
        align-items: center;
      }


      .item-left {
        color: #000;
        width: 50rpx;
        text-align: center;

        .item-index {
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
        justify-content: flex-start;
        align-items: center;

        .name {
          font-weight: 700;
          margin-left: 20rpx;
          width: 250rpx;
          white-space: nowrap;
          /* 单行显示 */
          overflow: hidden;
          /* 超出部分隐藏 */
          text-overflow: ellipsis;
          /* 显示省略号 */
        }
      }



      .details {
        font-size: 28rpx;
        font-weight: 700;
        color: #e53e38;
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

  /* Popup样式 */
  .rule-btn-wrap {
    position: fixed;
    top: 3%;
    right: 10rpx;
    z-index: 10;

    .rule-btn-item {
      width: 100rpx;
      margin-bottom: 40rpx;

      image {
        width: 100%;
        height: 100%;
      }
    }
  }

  .rule-pop {
    background: linear-gradient(to right, #5dfda1, #baf828);
    border-radius: 20rpx;
    padding: 20rpx;
    padding-bottom: 40rpx;

    .rule-title {
      text-align: center;
      font-size: 48rpx;
      font-weight: 700;
      margin: 30rpx 0;
      margin-top: 20rpx;
      text-shadow: -1px -1px #fff, 1px 1px #333;
    }

    .rule-pop-bd {
      background: #eefed9;
      padding: 30rpx 20rpx;
      border-radius: 20rpx;
      min-height: 400rpx;
      max-height: 700rpx; // 改成固定高度
      overflow: hidden; // 防止外面内容溢出

      .rule-content {
        line-height: 50rpx;
        color: #696969;
        font-weight: 700;
        font-size: 28rpx;
      }
    }
  }

}

.empty-list {
  min-height: 30vh;
}
</style>
