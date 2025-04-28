<!--
 * @Date: 2022-11-23 14:18:08
 * @LastEditTime: 2022-12-14 20:57:32
 * @Description: content
-->
<template>
  <view class="page-wrap">
    <uni-nav-bar
      title="投诉举报"
      color="#333"
      leftIcon="left"
      backgroundColor="#fff"
      :border="false"
      :statusBar="true"
      :fixed="true"
      @clickLeft="$common.back()"
    ></uni-nav-bar>

    <view v-if="modelData.length > 0" class="row">
      <view class="title">
        <text>*</text>

        问题类型
      </view>

      <view @click="modelShow = true" class="right">
        <view class="name">
          {{
            questionCur === '' ? '请选择问题类型' : modelData[questionCur].title
          }}
        </view>

        <uni-icons type="right" color="#999999" size="16" />
      </view>
    </view>

    <u-gap height="20"></u-gap>

    <view class="question-content">
      <view class="row">
        <view class="title">
          <text>*</text>

          问题描述
        </view>

        <view class="right">
          <view class="word-length">{{ questionText.length }}/300</view>
        </view>
      </view>

      <textarea
        v-model="questionText"
        maxlength="300"
        placeholder="请详细描述您遇到的问题，以便我们提供更好的帮助，我们会在3个工作日内处理您的问题"
      />

      <view class="img-list">
        <view v-for="(item, i) in imgList" :key="i" class="img-list-item">
          <view @click="del(i)" class="close icon">
            <cimage src="/static/icon/close.png" mode="scaleToFill" />
          </view>

          <cimage :src="item" mode="scaleToFill" />
        </view>

        <view
          v-if="imgList.length < 4"
          @click="upImg"
          class="img-list-item upload"
        >
          <cimage src="/static/icon/photo.png" mode="scaleToFill" />
        </view>
      </view>
    </view>

    <u-gap height="20"></u-gap>

    <view class="row">
      <view class="title">
        <text>*</text>

        联系电话
      </view>

      <view class="right">
        <view class="input-box">
          <input v-model="mobile" maxlength="11" placeholder="请输入联系电话" />
        </view>
      </view>
    </view>

    <view @click="submit" class="submit-btn">立刻提交</view>

    <view class="log-btn">
      <view
        @click="$common.to({ url: '/package/mine/tou-su-log' })"
        class="btn"
      >
        反馈记录＞＞
      </view>
    </view>

    <!-- 问题类型 -->
    <u-picker
      @confirm="pickerConfirm"
      v-model="modelShow"
      mode="selector"
      :range="modelData"
      range-key="title"
    ></u-picker>
  </view>
</template>

<script>
export default {
  data() {
    return {
      modelShow: false,
      modelData: [],
      questionCur: '',
      questionText: '',
      imgList: [],
      mobile: ''
    }
  },

  onLoad(options) {
    this.getClassify()
  },

  methods: {
    /**
     * @description: 删除图片
     * @param {*} e
     * @return {*}
     */
    del(e) {
      this.imgList.splice(e, 1)
    },

    /**
     * @description: 提交评价
     * @return {*}
     */
    submit() {
      if (this.questionCur === '') {
        this.$common.toast({
          title: '请选择问题类型'
        })
        return
      }
      if (!this.questionText) {
        this.$common.toast({
          title: '请输入问题描述'
        })
        return
      }
      if (!this.mobile) {
        this.$common.toast({
          title: '请输入您的联系电话'
        })
        return
      }

      this.req({
        url: '/v1/complain/add',
        data: {
          type_id: this.modelData[this.questionCur].id,
          mobile: this.mobile,
          content: this.questionText,
          thumb: this.imgList.join(',')
        },
        success: res => {
          if (res.code == 200) {
            this.$common.toast({
              title: res.msg,
              icon: 'success',
              duration: 500,
              success: () => {
                this.$common.back()
              }
            })
          }
        }
      })
    },

    /**
     * @description: 上传图片
     * @return {*}
     */
    upImg() {
      uni.chooseImage({
        sizeType: ['original', 'compressed'],
        sourceType: ['album', 'camera'],
        count: 1,
        success: ({ tempFilePaths, tempFiles }) => {
          this.req({
            url: '/v1/upload/image',
            file: tempFilePaths[0],
            fileName: 'image',
            success: res => {
              if (res.code == 200) {
                this.imgList.push(res.data)
              }
            }
          })
        },
        fail: error => {}
      })
    },

    /**
     * @description: 获取分类
     * @return {*}
     */
    getClassify() {
      this.req({
        url: '/v1/complain/type',
        data: {},
        Loading: true,
        success: res => {
          console.log(res)
          if (res.code == 200) {
            this.modelData = res.data
          }
        }
      })
    },

    /**
     * @description: 选择问题
     * @param {*} e
     * @return {*}
     */
    pickerConfirm(e) {
      this.questionCur = e
    }
  }
}
</script>

<style lang="scss">
.page-wrap {
  padding-bottom: 40rpx;

  .row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 30rpx;
    background: #fff;

    .title {
      font-size: 28rpx;
      font-family: PingFang SC;
      font-weight: 500;
      color: #666666;

      text {
        color: #cc0000;
      }
    }

    .right {
      color: #666666;
      display: flex;
      align-items: center;

      .input-box {
        input {
          font-size: 28rpx;
          font-family: PingFang SC;
          font-weight: 500;
          color: #333;
          text-align: right;
        }
      }
    }
  }

  .question-content {
    background: #fff;

    textarea {
      padding: 10rpx 30rpx;
      font-size: 24rpx;
      font-family: PingFang SC;
      font-weight: 500;
      color: #333;
    }

    .img-list {
      display: flex;
      flex-flow: row wrap;
      padding: 30rpx;

      &-item {
        width: 120rpx;
        height: 120rpx;
        background: #fafafa;
        box-sizing: border-box;
        position: relative;
        margin-right: 25rpx;

        .icon {
          width: 40rpx;
          height: 40rpx;
          position: absolute;
          right: 0;
          top: 0;
          z-index: 1;
        }

        &.upload {
          padding: 20rpx;
        }
      }
    }
  }

  .submit-btn {
    width: 690rpx;
    height: 88rpx;
    background: #000000;
    border-radius: 44rpx;
    margin: 50rpx auto 0;
    text-align: center;
    line-height: 88rpx;

    font-size: 28rpx;
    font-family: PingFang SC;
    font-weight: 500;
    color: #ffffff;
  }

  .log-btn {
    margin: 30rpx auto 0;
    font-size: 20rpx;
    font-family: PingFang SC;
    font-weight: 500;
    color: #666666;
    text-align: center;
  }
}
</style>
