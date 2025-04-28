<!--
 * @Date: 2022-07-30 17:30:31
 * @LastEditTime: 2024-05-22 19:54:18
 * @Description: content
-->
<template>
  <view class="page-wrap">
    <!-- <uni-nav-bar
      title="搜索"
      color="#333"
      leftIcon="left"
      backgroundColor="#fff"
      :border="false"
      :statusBar="true"
      :fixed="true"
      @clickLeft="$common.back()"
    ></uni-nav-bar> -->
    <view :style="{
      height: `calc(${sysConfig.statusBarHeight}px)`,
      background: '#fff'
    }"></view>

    <view class="search-box">
      <view @click="$common.back()" class="back">
        <uni-icons :style="{
          fontWeight: 'normal'
        }" type="left" color="#fff" size="20" />
      </view>

      <view class="search-box-content">
        <uni-search-bar @confirm="search" @cancel="handleCancel" v-model="formData.keywords" :cancelText="'搜索'"
          :focus="true" :radius="999"></uni-search-bar>
      </view>
    </view>

    <view class="title-del">
      <view>搜索历史</view>

      <view @click="showModel = true" class="icon">
        <cimage src="/static/icon/del.png" mode="scaleToFill" />
      </view>
    </view>

    <view class="search-list">
      <view v-for="(item, i) of searchList" :key="i" @click="search({ value: item })" class="search-list-item">
        {{ item }}
      </view>
    </view>

    <view class="title-del">
      <view>热门搜索</view>
    </view>

    <view class="search-list">
      <view v-for="(item, i) of listData" :key="i" @click="search({ value: item })" class="search-list-item">
        {{ item }}
      </view>
    </view>

    <u-modal v-model="showModel" :title="'提示'" :content="'确定要删除所有历史记录吗?'" :show-cancel-button="true"
      @confirm="delHistory"></u-modal>
  </view>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data () {
    return {
      optionsData: '',
      formData: {
        keywords: ''
      },
      searchList: [],
      showModel: false,
      listData: ''
    }
  },

  computed: {
    ...mapGetters(['sysConfig'])
  },

  onLoad (options) {
    this.optionsData = options
    if (uni.getStorageSync('_search_list')) {
      this.searchList = uni.getStorageSync('_search_list')
    }

    this.getHotList()
  },
  methods: {
    /**
     * @description: 获取热门搜索
     * @return {*}
     */
    getHotList () {
      this.req({
        url: '/v1/shop/hotsearch',
        data: {},
        success: res => {
          if (res.code == 200) {
            this.listData = res.data
          }
        }
      })
    },

    /**
     * @description: 删除所有历史记录
     * @return {*}
     */
    delHistory () {
      uni.setStorageSync('_search_list', [])
      this.searchList = uni.getStorageSync('_search_list')
    },

    /**
     * @description: 点击搜索按钮
     * @param {*} e
     * @return {*}
     */
    handleCancel (e) {
      this.search({ value: e.value })
    },

    /**
     * @description: 添加搜索历史
     * @return {*}
     */
    addHistory () {
      let list = uni.getStorageSync('_search_list') || []

      console.log(this.formData.keywords)

      if (this.formData.keywords != '') {
        if (list.indexOf(this.formData.keywords) >= 0) {
          list.map((item, i) => {
            if (this.formData.keywords == item) {
              list.splice(i, 1)
              list.unshift(this.formData.keywords)
            }
          })
        } else {
          list.unshift(this.formData.keywords)
        }

        this.searchList = list
        uni.setStorageSync('_search_list', list)
        // this.formData.keywords = ''
      }
    },

    /**
     * @description: 搜索
     * @return {*}
     */
    search (e) {
      console.log(e)
      let reg = /(^\s*|\s*$)/g
      e.value = e.value.replace(reg, '')

      if (e.value == '') {
        this.$common.toast({
          title: '请输入搜索内容'
        })
        return
      }

      this.formData.keywords = e.value
      this.$common.to({
        type: 2,
        url: '/package/index/search-res',
        query: {
          keywords: e.value,
          ...this.optionsData
        },
        success: () => {
          // console.log('成功了')
          this.addHistory()
        }
      })
    }
  }
}
</script>

<style lang="scss">
page {}

.page-wrap {
  background: url("https://img.alicdn.com/imgextra/i4/2200676927379/O1CN01unkdtT24NdWplMdw8_!!2200676927379.png") no-repeat;
  background-size: 100vw 100%;
  min-height: calc(100vh - 50px);
  padding-bottom: 40rpx;

  .search-box {
    background: #fff;
    display: flex;
    align-items: center;
    height: 88rpx;
    background: #222333;

    .back {
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 10rpx 10rpx 10rpx 20rpx;
    }

    &-content {
      width: 450rpx;

    }

    ::v-deep .uni-searchbar__cancel {
      color: #fff;
    }

    ::v-deep .uni-searchbar {
      padding: 10rpx;
      display: flex;
      align-items: center;

      .uni-searchbar__box {
        padding: 0 10rpx 0 0 !important;
        height: 60rpx !important;
        display: flex !important;
        align-items: center !important;


      }

      .uni-searchbar__box-icon-clear {
        line-height: 60rpx !important;
      }
    }
  }

  .title-del {
    padding: 20rpx 30rpx;
    display: flex;
    justify-content: space-between;
    align-items: center;

    font-size: 24rpx;
    color: #999;

    .icon {
      width: 33rpx;
      height: 33rpx;
    }
  }

  .search-list {
    padding: 10rpx 30rpx;
    display: flex;
    flex-flow: row wrap;

    &-item {
      padding: 5rpx 10rpx;
      border-radius: 10rpx;
      background: #fff;

      color: #666;
      margin-top: 20rpx;
      margin-right: 30rpx;
    }
  }
}
</style>
