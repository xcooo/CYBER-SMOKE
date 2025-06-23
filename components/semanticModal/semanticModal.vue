<template>
  <view v-if="visible" class="modal-overlay" role="dialog" aria-modal="true">
    <view class="modal-container">
      <view class="modal-header">
        <text class="modal-title">{{ title }}</text>
      </view>
      <view class="modal-body">
        <text class="modal-message">{{ content }}</text>
      </view>
      <view class="modal-footer">
        <!-- <button class="modal-button cancel" @click="handleCancel">{{ cancelText }}</button> -->
        <button class="modal-button confirm" @click="handleConfirm">{{ confirmText }}</button>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  name: 'SemanticModal',
  props: {
    title: { type: String, default: '系统提示' },
    content: { type: String, default: '' },
    confirmText: { type: String, default: '确定' },
    cancelText: { type: String, default: '取消' }
  },
  data () {
    return {
      visible: false
    }
  },
  methods: {
    open () {
      this.visible = true
    },
    close () {
      this.visible = false
    },
    handleConfirm () {
      this.$emit('confirm')
      this.close()
    },
    handleCancel () {
      this.$emit('cancel')
      this.close()
    }
  }
}
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0; left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-container {
  width: 80%;
  background-color: #fff;
  border-radius: 16rpx;
  overflow: hidden;
  box-shadow: 0 10rpx 40rpx rgba(0, 0, 0, 0.1);
}

.modal-header {
  padding: 32rpx;
  border-bottom: 1rpx solid #eee;
  text-align: center;
}

.modal-title {
  font-size: 34rpx;
  font-weight: 600;
}

.modal-body {
  padding: 40rpx 32rpx;
  text-align: center;
}

.modal-message {
  font-size: 28rpx;
  color: #333;
  line-height: 1.6;
}

.modal-footer {
  display: flex;
  justify-content: space-around;
  padding: 24rpx;
  border-top: 1rpx solid #f0f0f0;
}

.modal-button {
  flex: 1;
  margin: 0 10rpx;
  padding: 10rpx 0;
  font-size: 30rpx;
  border-radius: 12rpx;
  text-align: center;
}

.modal-button.cancel {
  background-color: #f0f0f0;
  color: #333;
}

.modal-button.confirm {
  background-color: #007aff;
  color: #fff;
}
</style>
