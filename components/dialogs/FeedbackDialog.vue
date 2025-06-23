<template>
  <u-popup v-model="localShow" mode="center" border-radius="20" :custom-style="{ backgroundColor: 'rgba(0, 0, 0, 0.7)' }">
    <view class="feedback-box">
      <view class="feedback-header">
        <u-icon class="close-icon" name="close" color="#333" size="38" @click="close" />
        <view class="feedback-title">投诉反馈</view>
      </view>
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
      <view class="feedback-content">
        <textarea v-model="content" class="feedback-textarea" placeholder="请输入您的问题或建议..." maxlength="500"></textarea>
      </view>
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
      <view class="feedback-footer">
        <button class="cancel-btn" @click="close">取消</button>
        <button class="submit-btn" @click="submit">提交</button>
      </view>
    </view>
    <!-- 问题类型 -->
    <u-picker @confirm="pickerConfirm" v-model="modelShow" mode="selector" :range="modelData"
      range-key="title"></u-picker>
  </u-popup>
</template>

<script>
export default {
  name: 'FeedbackDialog',
  props: {
    show: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      localShow: this.show,
      modelShow: false,
      mobile: '',
      content: '',
      questionCur: '',
      modelData: []
    }
  },
  watch: {
    show (val) {
      this.localShow = val
    },
    localShow (val) {
      this.$emit('update:show', val)
      this.getClassify()
    }
  },
  methods: {
    close () {
      this.localShow = false
    },
    pickerConfirm (e) {
      this.questionCur = e
    },
    getClassify () {
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
    submit () {
      if (this.questionCur === '') {
        this.$common.toast({
          title: '请选择问题类型'
        })
        return
      }
      if (!this.content.trim()) {
        uni.showToast({
          title: '请输入反馈内容',
          icon: 'none'
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
          content: this.content,
          thumb: ''
        },
        success: res => {
          if (res.code == 200) {
            this.$common.toast({
              title: res.msg,
              icon: 'success',
              duration: 500,
              success: () => {
                this.close()
                this.content = ''
                this.mobile = ''
                this.modelShow = false
                this.questionCur = ''
              }
            })
          }
        }
      })

    }
  }
}
</script>

<style lang="scss" scoped>
.feedback-box {
  width: 650rpx;
  background: linear-gradient(180deg, #FFFFFF 0%, #F8F8F8 100%);
  border-radius: 30rpx;
  padding: 40rpx;
}

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

.feedback-content {
  .feedback-textarea {
    width: 100%;
    height: 300rpx;
    background: #FFFFFF;
    border-radius: 16rpx;
    padding: 20rpx;
    font-size: 28rpx;
    color: #333;
    margin-bottom: 30rpx;
    box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.05);
  }


}

.feedback-footer {
  display: flex;
  justify-content: space-between;
  gap: 20rpx;
  margin-top: 40rpx;

  button {
    flex: 1;
    height: 88rpx;
    line-height: 88rpx;
    text-align: center;
    border-radius: 44rpx;
    font-size: 32rpx;
    font-weight: bold;

    &.submit-btn {
      background: linear-gradient(90deg, #FF6B6B 0%, #FF8E8E 100%);
      color: #fff;
      box-shadow: 0 8rpx 16rpx rgba(255, 107, 107, 0.3);
    }

    &.cancel-btn {
      background: #F5F5F5;
      color: #666;
    }
  }
}
</style>
