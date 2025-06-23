<!--
 * @Date: 2022-07-22 14:25:07
 * @LastEditTime: 2022-12-09 11:00:36
 * @Description: 图文详情
-->
<template>
  <view class="page-wrap">
    <view v-html="pageData.editor" class="page-content"></view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      optionsData: '',
      pageData: ''
    }
  },
  onLoad(options) {
    this.optionsData = options
    this.getRich()
  },
  methods: {
    /**
     * @description: 获取图文数据
     * @return {*}
     */
    getRich() {
      let url = '/v1/operate/banners/info'

      this.req({
        url,
        data: {
          id: this.optionsData.id
        },
        success: res => {
          console.log(res)
          if (res.code == 200) {
            if (res.data.editor) {
              res.data.editor = res.data.editor.replace(
                /\<img/gi,
                '<img style="width: 100%;vertical-align: middle;"'
              )
            }

            this.pageData = res.data
            uni.setNavigationBarTitle({ title: res.data.title })
          }
        }
      })
    }
  }
}
</script>

<style lang="scss">
.page-wrap {
  // padding: 10rpx;
  .page-content {
    // color: #aaa;
    font-size: 26rpx;
  }
}
</style>
