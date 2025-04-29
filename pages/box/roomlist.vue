<template>
  <view class="roomlist">
    <view class="nav">
      <uni-nav-bar color="#fff" leftIcon="left" backgroundColor="transparent" :border="false" :statusBar="true"
        :fixed="true" title="私人房间">
        <view slot="left" class="nav-left" @click="back">
          <image class="" src="../../static/home/arrow.png" mode="widthFix" lazy-load="false" binderror="" bindload="" />
        </view>
        <view slot="right" class="nav-right" @click="rule">
          规则
        </view>
      </uni-nav-bar>
    </view>

    <view class="cate-wrap">
      <view class="cate-item" :class="[currentIndex == index ? 'cate-active-item' : '']" v-for="(item, index) in cateList"
        :key="index" @click="changeIndex(index)">{{ item.name }}</view>
    </view>


    <mescroll-body ref="mescrollRef" @init="mescrollInit" @down="downCallback" @up="getList" :down="downOption"
      :up="upOption">
      <view class="ck-box-list">
        <view class="ck-box-item" v-for="(item, index) in listData" :key="index" @click="toDetail(item)">
          <view class="ck-box-wrap" :style="{ backgroundImage: `url(${item.thumb})` }">
            <view class="box-info">
              <view class="box-top">
                <view class="box-id">
                  <image class="box-id-img" src="../../static/home/room.png" mode="widthFix" lazy-load="false"
                    binderror="" bindload="" />房间号:{{ item.id }}
                </view>
                <view class="box-status">
                  <view class="box-status-text box-status-ing" v-if="item.is_full == 0">组队中</view>
                  <view class="box-status-text box-status-complate" v-else>已结束</view>
                </view>
              </view>

              <view class="box-title">{{ item.title }}</view>
            </view>
            <view class="box-bottom">
              <view class="box-bottom-left">
                <image class="box-bottom-left-img" src="../../static/home/box.png" mode="widthFix" lazy-load="false"
                  binderror="" bindload="" />
                <view class="box-left-title">{{ item.box_title }}({{item.num}}人房)</view>
              </view>
              <view class="box-bottom-right">
                <image class="box-bottom-right-img" src="../../static/home/user.png" mode="widthFix" lazy-load="false"
                  binderror="" bindload="" />{{ item.owner }}
              </view>
            </view>

          </view>
        </view>
      </view>
    </mescroll-body>

    <u-popup v-model="detailShow" mode="center" width="80%" border-radius="20" closeable>
      <view class="detail-wrap">
        <view class="detail-title">
          请输入房间密码
        </view>
        <view class="detail-input">
          <input class="uni-input" v-model="password" focus placeholder="请输入房间密码" />
        </view>
        <view class="detail-desc">
          成功后下次将不用再输入
        </view>
        <view class="btn-wrap">
          <view class="detail-btn" @click="submit">确认</view>
        </view>
      </view>
    </u-popup>

    <u-popup v-model="show" mode="center" width="80%" border-radius="20">
      <view class="rule-wrap">
        <view class="rule-title">规则说明</view>
        <view class="rule-content">
          <p>点击创建房间，可以选择一个现有赏池，并编辑房间名称。</p>
          <p>创建成功后，玩家可进入房间参与抽赏。</p>
        </view>
      </view>
    </u-popup>

    <view class="create-room" @click="createRoom">
      <image src="../../static/home/createRoom.png" lazy-load="false" binderror="" bindload="" mode="widthFix" />
    </view>

  </view>
</template>

<script>
export default {
  name: 'roomlist',
  components: {

  },
  data () {
    return {
      show: false,
      // 下拉刷新的配置(可选, 绝大部分情况无需配置)
      downOption: {
        auto: false
      },
      // 上拉加载的配置(可选, 绝大部分情况无需配置)
      upOption: {
        auto: false,
        page: {
          size: 20 // 每页数据的数量,默认10
        },
        empty: {
          use: true, // 是否显示空布局
          // icon: "../../static/home/empty.png", // 图标路径
          tip: '这里什么都没有~', // 提示
          fixed: false, // 是否使用fixed定位,默认false; 配置fixed为true,以下的top和zIndex才生效 (transform会使fixed失效,最终会降级为absolute)
          top: "100rpx", // fixed定位的top值 (完整的单位值,如 "10%"; "100rpx")
          zIndex: 99 // fixed定位z-index值
        },
      },
      listData: [],
      cateList: [
        {
          name: '房间大厅'
        },
        {
          name: '我的房间'
        },
      ],
      currentIndex: 0,
      detailShow: false,
      password: '',
      currentItem: {},
      owner_id: '',
      userInfo: {}
    }
  },
  computed: {
  },
  onShow () {
    this.getList({ num: 1, size: 10 })
    this.$store.dispatch('getUserInfo').then(res => {
      this.userInfo = res.data
    })
  },
  methods: {
    changeIndex (index) {
      this.currentIndex = index
      if (this.currentIndex == 0) {
        this.owner_id = ''
      } else {
        this.owner_id = this.userInfo.id
      }
      this.getList({ num: 1, size: 10 })
    },
    getList ({
      num,
      size
    }) {
      this.req({
        url: '/v1/room/list',
        data: {
          page: num,
          per_page: size,
          owner_id: this.owner_id
        },
        Loading: true,
        success: res => {
          if (res.code == 200) {
            if (num == 1) {
              this.listData = []
            }
            this.listData = [...this.listData, ...res.data.data]
            // for(let i=0;i<20;i++) {
            //   this.listData.push({

            //   })
            // }
            this.mescroll.endBySize(res.data.data.length, res.data.total)
          } else {
            this.mescroll.endBySize(0, 0)
          }
        }
      })
    },
    toDetail (item) {
      console.log(item)
      this.$common.to({
        url: '/pages/box/roomDetail?room_id=' + item.id + '&box_id=' + item.box_id + '&is_full=' + item.is_full
      })
      // this.currentItem = item
      // this.detailShow = true
    },
    submit () {
      this.detailShow = false

    },
    createRoom () {
      this.$common.to({
        url: '/pages/box/createRoom'
      })
    },
    back () {
      uni.switchTab({
        url: '/pages/tabBar/home',

      });
    },
    rule () {
      this.show = true
    }
  },
}
</script>

<style lang='scss' scoped>
.roomlist {
  background: url("https://img.alicdn.com/imgextra/i4/2200676927379/O1CN01unkdtT24NdWplMdw8_!!2200676927379.png") no-repeat;
  background-size: 100vw 100%;

  background-repeat: no-repeat;
  min-height: calc(100vh - 50px);

  .nav {
    ::v-deep .uni-navbar__header {
      padding: 0;
    }

    ::v-deep .uni-nav-bar-text {
      font-size: 36rpx;
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

  .cate-wrap {
    display: flex;
    color: #fff;
    padding: 0 20rpx;
    position: fixed;
    width: 100%;
    left: 0;
    z-index: 10;
    height: 88rpx;
    margin-top: 10px;

    .cate-item {
      background: url("../../static/home/tab.png") no-repeat;
      background-size: 100% 100%;
      width: 100%;
      padding: 20rpx 40rpx;

      font-size: 18px;
      text-align: center;
      margin-right: 50rpx;

      &:last-child {
        margin-right: 0;
      }
    }

    .cate-active-item {
      background: url("../../static/home/tab-active.png") no-repeat;
      background-size: 100% 100%;
      width: 100%;
    }
  }

  .ck-box-list {
    margin-top: 130rpx;
    padding: 0 20rpx;
    // max-height: calc(100vh - 50px);
    // overflow: scroll;


    .ck-box-item {
      position: relative;
      margin-bottom: 30rpx;
      border: 4rpx solid;
      border-image: linear-gradient(270deg, #039aff, #705cff, #af38ff) 2 2;


      &:last-child {
        margin-bottom: 0;
      }
    }


    .ck-box-wrap {
      background-size: 100% 100%;
      width: 100%;
      height: 300rpx;
      padding: 0 50rpx;
      padding-top: 40rpx;
      padding-bottom: 40rpx;
      display: flex;
      flex-direction: column;
      justify-content: space-between;

      .box-info {
        color: #fff;

        .box-top {
          display: flex;
          justify-content: space-between;

          .box-id {
            display: inline;
            background: #49327e;
            padding: 10rpx 20rpx;
            border-radius: 15rpx;
            margin-bottom: 10rpx;

            .box-id-img {
              width: 30rpx;
              margin-right: 10rpx;
            }

          }

          .box-status {

            .box-status-text {
              color: #fff;
              padding: 10rpx 20rpx;
              border-radius: 15rpx;
              text-align: center;
            }

            .box-status-ing {
              background: linear-gradient(270deg, #039aff, #705cff, #af38ff);
            }

            .box-status-complate {
              background: #333;
            }
          }
        }

        .box-title {
          font-size: 18px;
          font-weight: bold;
          color: #fff;

        }

        .box-num {
          margin-bottom: 10rpx;
          font-size: 12px;
        }

        .box-img {
          width: 150rpx;
        }

        .number {
          margin-left: 20rpx;
          color: yellow;
        }
      }

      .box-bottom {
        display: flex;
        justify-content: space-between;

        .box-bottom-left {
          font-size: 16px;
          color: #fff;
          display: flex;
          align-items: center;

          .box-bottom-left-img {
            width: 30rpx;
            margin-right: 10rpx;
          }

          .box-left-title {
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            max-width: 400rpx;
          }
        }

        .box-bottom-right {
          font-size: 16px;
          color: #fff;
          display: flex;
          align-items: center;

          .box-bottom-right-img {
            width: 30rpx;
            margin-right: 10rpx;
          }
        }
      }


    }
  }

  .detail-wrap {
    padding: 40rpx;
    background: #222333;
    color: #fff;

    .detail-input {
      margin: 40rpx 0;
      padding: 20rpx 20rpx;
      background: #333;
    }

    .detail-desc {
      color: #999;
    }

    .btn-wrap {
      display: flex;
      justify-content: flex-end;
    }

    .detail-btn {
      display: inline-block;
      padding: 10rpx 40rpx;
      font-size: 18px;
      border-radius: 20rpx;
      background: linear-gradient(270deg, #039aff, #705cff, #af38ff);
    }
  }

  .detail-title {
    font-size: 18px;
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

  .create-room {
    width: 100rpx;
    position: fixed;
    top: 50%;
    right: 10rpx;

    image {
      width: 100%;
    }
  }

}
</style>