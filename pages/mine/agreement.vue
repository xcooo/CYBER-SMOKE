<template>
  <view>
    <u-navbar :title="title"></u-navbar>
    <view class="box">
      <rich-text :nodes="data"></rich-text>
    </view>
  </view>
</template>

<script>
export default {
  data () {
    return {
      title: '',
      data: '',
    }
  },
  onLoad (option) {
    this.getDat(option.type)
  },
  methods: {
    getDat (type) {
      this.req({
        url: "/v1/user/agreement",
        header: {
          // "Content-Type": "application/json",
          "token": uni.getStorageSync("user").token
        },
        data: {
          type
        },
        success: res => {
          console.log(res)
          if (res.code == 200) {
            this.title = res.data.title
            this.data = res.data.editor
          }
        }
      })
    }
  }
}
</script>

<style>
.box {
  padding: 30rpx;
  box-sizing: border-box;
}
</style>
