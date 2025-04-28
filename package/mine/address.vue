<!--
 * @Date: 2022-11-24 11:39:03
 * @LastEditTime: 2022-12-10 10:25:44
 * @Description: content
-->
<template>
  <view class="page-wrap">
    <uni-nav-bar
      title="地址管理"
      color="#333"
      leftIcon="left"
      backgroundColor="#fff"
      :border="false"
      :statusBar="true"
      :fixed="true"
      @clickLeft="$common.back()"
    ></uni-nav-bar>

    <view class="address">
      <view
        @click="chooseAdd(item)"
        v-for="(item, i) of listData"
        :key="i"
        class="address-item"
      >
        <view class="address-item-hd">
          <view class="name hang1">{{ item.name }}</view>

          <view>{{ item.mobile }}</view>
        </view>

        <view class="address-item-bd">
          {{ item.address }}
        </view>

        <view class="address-item-ft">
          <view @click.stop="setDef(item)" class="def-btn">
            <view class="icon">
              <cimage
                v-if="item.status == 1"
                src="/static/icon/check_act.png"
                mode="scaleToFill"
              />

              <cimage v-else src="/static/icon/check.png" mode="scaleToFill" />
            </view>

            默认地址
          </view>

          <view class="btn-list">
            <view @click.stop="toSet(item)" class="btn icon">
              <cimage src="/static/icon/edit.png" mode="scaleToFill" />
            </view>

            <view @click.stop="openModel(item)" class="btn icon">
              <cimage src="/static/icon/del.png" mode="scaleToFill" />
            </view>
          </view>
        </view>
      </view>
    </view>

    <view @click="toSet()" class="add-btn">新增收货地址</view>

    <u-modal
      v-model="showModel"
      :title="'提示'"
      :content="'请确认是否删除'"
      :show-cancel-button="true"
      @confirm="delAddress"
    ></u-modal>
  </view>
</template>

<script>
export default {
  data() {
    return {
      optionsData: '',
      showModel: false,
      delForm: {
        id: ''
      },
      listData: []
    }
  },

  onLoad(options) {
    this.optionsData = options
  },

  onShow() {
    this.getList()
  },

  methods: {
    /**
     * @description: 选择地址
     * @return {*}
     */
    chooseAdd(item) {
      if (this.optionsData.type == 'choose') {
        uni.$emit('chooseAdd', {
          data: item
        })
        this.$common.back()
      }
    },

    /**
     * @description: 打开模态框
     * @param {*} e
     * @return {*}
     */
    openModel(item) {
      this.delForm.id = item.id
      this.showModel = true
    },

    /**
     * @description: 删除地址
     * @param {*}
     * @return {*}
     */
    delAddress() {
      this.req({
        url: '/v1/address/del',
        data: this.delForm,
        success: res => {
          console.log(res)
          if (res.code == 200) {
            this.$common.toast({
              title: res.msg,
              icon: 'success',
              duration: 600,
              success: () => {
                this.getList()
              }
            })
          }
        }
      })
    },

    /**
     * @description: 设置默认地址
     * @return {*}
     */
    setDef(item) {
      if (item.status == 1) {
        return
      }

      this.req({
        url: '/v1/address/default',
        data: {
          id: item.id
        },
        success: res => {
          if (res.code == 200) {
            this.getList()
          }
        }
      })
    },

    /**
     * @description: 获取列表
     * @return {*}
     */
    getList() {
      this.req({
        url: '/v1/address/list',
        data: {},
        Loading: true,
        success: res => {
          if (res.code == 200) {
            this.listData = res.data
          }
        }
      })
    },

    /**
     * @description: 新增/修改地址
     * @return {*}
     */
    toSet(item) {
      this.$common.to({
        type: 1,
        url: '/package/mine/address-set',
        query: {
          id: (item && item.id) || ''
        }
      })
    }
  }
}
</script>

<style lang="scss">
.page-wrap {
  padding-bottom: 140rpx;

  .address {
    padding: 1rpx 30rpx 40rpx;

    &-item {
      border-radius: 10rpx;
      background: #fff;
      padding: 30rpx;
      margin-top: 30rpx;

      &-hd {
        font-size: 32rpx;
        font-family: PingFang SC;
        // font-weight: bold;
        color: #222222;
        display: flex;

        .name {
          max-width: 200rpx;
          padding-right: 30rpx;
        }
      }

      &-bd {
        padding: 30rpx 0;

        font-size: 24rpx;
        font-family: PingFang SC;
        font-weight: 500;
        color: #999999;
      }

      &-ft {
        display: flex;
        justify-content: space-between;
        align-items: center;

        .def-btn {
          display: flex;
          align-items: center;

          font-size: 24rpx;
          font-family: PingFang SC;
          font-weight: 500;
          color: #333333;

          .icon {
            width: 30rpx;
            height: 30rpx;
            margin-right: 10rpx;
          }
        }

        .btn-list {
          display: flex;

          .btn {
            width: 50rpx;
            height: 50rpx;
          }

          .btn + .btn {
            margin-left: 30rpx;
          }
        }
      }
    }
  }

  .add-btn {
    position: fixed;
    width: 100%;
    height: 100rpx;
    left: 0;
    bottom: 0;
    background: #000;
    line-height: 100rpx;
    text-align: center;

    font-size: 32rpx;
    font-family: PingFang SC;
    font-weight: 500;
    color: #ffffff;
  }
}
</style>
