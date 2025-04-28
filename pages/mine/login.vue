<template>
  <view class="login-page">
    <view class="back">
      <uni-nav-bar color="#999" leftIcon="left" backgroundColor="transparent" :border="false" :statusBar="true"
        :fixed="false" @clickLeft="$common.back()"></uni-nav-bar>
    </view>
    <view class="top">
      <view class="text">
        <view class="sys-title">{{ appConfig.site_title }}</view>
        <view class="text-content">欢迎登录~快来领取您的专属好礼吧</view>
      </view>
      <!-- #ifdef MP-WEIXIN -->
      <view @click="login()" class="biaodan">
        <view class="btn">微信授权登录</view>
      </view>
      <!-- #endif -->
      <!-- #ifdef H5 -->

      <!-- <view class="h5-biaodan">
        <view class="row">
          <u-field v-model="phone" type="number" label="+86" maxlength="11" placeholder="请填写手机号">
          </u-field>
        </view>

        <view class="row">
          <u-field v-model="num" type="number" label="验证码" placeholder="清输入验证码">
            <text class="huoqu" slot="right" @click="getPhoneCode">{{ codeText }}</text>
          </u-field>
          <u-verification-code ref="uCode" @change="codeChange" change-text="xs">获取验证码</u-verification-code>
        </view>
        <button class="btn" @click="submit">登录</button>

      </view> -->
      <template v-if="appConfig.is_reg_login == 0">
        <view @click="getCode()" class="biaodan">
          <view class="btn">微信授权登录</view>
        </view>
      </template>
      <template v-else>
        <view class="login-wrap">
          <view class="h5-biaodan">
            <view class="row">
              <u-field v-model="form.nickName" type="text" label="用户名" placeholder="请输入用户名">
              </u-field>
            </view>
            <view class="row">
              <u-field v-model="form.password" type="password" label="密码" placeholder="请输入密码">
              </u-field>
            </view>
            <view class="row" v-if="isRegOrLogin">
              <u-field v-model="form.rePassword" type="password" label="确认密码" placeholder="请确认密码">
              </u-field>
            </view>
            <button class="btn" @click="submitForm">{{ isRegOrLogin ? '注册' : '登录' }}</button>
          </view>
        </view>
      </template>
      <!-- #endif -->
      <!-- #ifdef APP-PLUS  -->
      <template v-if="appConfig.is_reg_login == 0">
        <view @click="wxAppLogin()" class="biaodan">
          <view class="btn">微信授权登录</view>
        </view>
      </template>
      <template v-else>
        <view class="login-wrap">
          <view class="h5-biaodan">
            <view class="row">
              <u-field v-model="form.nickName" type="text" label="用户名" placeholder="请输入用户名">
              </u-field>
            </view>
            <view class="row">
              <u-field v-model="form.password" type="password" label="密码" placeholder="请输入密码">
              </u-field>
            </view>
            <view class="row" v-if="isRegOrLogin">
              <u-field v-model="form.rePassword" type="password" label="确认密码" placeholder="请确认密码">
              </u-field>
            </view>
            <button class="btn" @click="submitForm">{{ isRegOrLogin ? '注册' : '登录' }}</button>
          </view>
        </view>
      </template>
      <!-- <button @click="oauthLogin('wx')" size="default" type="default" class="biaodan" hover-class="is-hover"
            :loading="loading">{{ loading ? '正在登录, 请稍等...' : '微信授权登录' }}</button> -->
      <!-- #endif -->
    </view>
    <!-- #ifdef H5   -->
    <template v-if="appConfig.is_reg_login == 1">
      <view class="regOrLogin" @click="switchRegOrLogin">
        <view class="regOrLogin-text">
          {{ isRegOrLogin ? '登录账号' : '注册账号' }}
        </view>
      </view>
    </template>
    <!-- #endif -->
    <!-- #ifdef APP-PLUS   -->
    <template v-if="appConfig.is_reg_login == 1">
      <view class="regOrLogin" @click="switchRegOrLogin">
        <view class="regOrLogin-text">
          {{ isRegOrLogin ? '登录账号' : '注册账号' }}
        </view>
      </view>
    </template>
    <!-- #endif -->
    <view class="agree-box">
      <u-checkbox @change="checkboxChange" v-model="agreeChecked" shape="circle">
      </u-checkbox>
      <view class="agree-box-text">
        注册或登录即表示已阅读并同意
        <text class="book-style" @click="go('/pages/mine/agreement?type=user_agreement')">《用户协议》</text>，
        <text class="book-style" @click="go('/pages/mine/agreement?type=privacy_policy')">《隐私协议》</text>
      </view>
    </view>

    <u-popup mode="center" :popup="false" v-model="anShow" border-radius="20">
      <view class="popup-view">
        <view class="popup-view-title">您好，首次注册需要设置用户头像、昵称</view>
        <view class="">
          <view class="cell-list">
            <text class="cell-list-left">用户头像</text>
            <view class="cell-list-right right-pic">
              <button open-type="chooseAvatar" @chooseavatar="onChooseAvatar">
                <image class="refreshIcon xc-avatar" :src="headImg" alt="点击上传头像"></image>
                <!-- <view class="get-avatar" v-else>点击获取头像 <em class="avatar-icon">></em></view> -->
              </button>
            </view>

          </view>
          <view class="cell-list">
            <text class="cell-list-left">用户昵称</text>
            <view class="cell-list-right">
              <input class="weui-input" type="nickname" v-model="nickName" placeholder="请输入昵称" @blur="bindblur" />
            </view>

          </view>
        </view>

        <view class="btn1">
          <view class="btn-sub" @click="reg()">保存用户信息</view>
        </view>
      </view>
    </u-popup>

  </view>
</template>
<script>
import {
  mapGetters
} from 'vuex'
export default {
  data () {
    return {
      headImg: '',
      nickName: '默认微信用户',
      agreeChecked: false,
      anShow: false,
      optionsData: '',
      formData: {
        loginCode: '',
        mobileCode: ''
      },
      showReg: false,
      sysConfig: '',
      code: '',
      wxH5Code: '',
      redirect_uri: '', //正式
      // appId: 'wxc6f013b3330ff875', //正式
      appId: '', //正式

      phone: '',
      num: '',
      codeText: '',
      form: {
        nickName: '',
        password: '',
        rePassword: ''
      },
      isRegOrLogin: false
    }
  },
  computed: {
    ...mapGetters(['appConfig'])
  },
  onLoad (options) {
    console.log('options', options)
    this.optionsData = options

    // #ifdef H5
    let host = location.host
    let protocol = window.location.protocol
    this.redirect_uri = `${protocol}//${host}`
    // #endif

    let invite_code = this.optionsData.invite_code

    if (invite_code) {
      // 保存分享码
      uni.setStorageSync('invite_code', invite_code)
    }

    // 判断是否有openid
    let token = uni.getStorageSync('token')

    if (token) {
      uni.redirectTo({
        url: '/pages/index/index',
      })
    }

    // #ifdef H5
    this.wxH5Code = this.getUrlCode().code // 截取code

    console.log(this.wxH5Code)

    if (this.wxH5Code) {
      this.getOpenid() //获取openid
    }
    // #endif
    this.$store.dispatch('getAppConfig').then((res) => {
      this.sysConfig = res.data;
    })
  },
  onShow () {
    this.appId = this.appConfig.h5_appid
  },
  methods: {
    wxAppLogin () {
      uni.getProvider({
        service: 'oauth',
        success: function (res) {
          console.log(res.provider)
          if (~res.provider.indexOf('weixin')) {
            uni.login({
              provider: 'weixin',
              success: function (loginRes) {
                console.log(JSON.stringify(loginRes));
                // 获取用户信息
                uni.getUserInfo({
                  provider: 'weixin',
                  success: function (infoRes) {
                    let data = Object.assign(loginRes.authResult, infoRes);
                    console.log(data);
                    this.req({
                      url: '/v1/user/wxAppLogin',
                      data: {
                        nickName: infoRes.userInfo.nickName,
                        // gender: infoRes.userInfo.gender,
                        avatarUrl: infoRes.userInfo.avatarUrl,
                        openId: infoRes.userInfo.openId,
                        // unionId: infoRes.userInfo.unionId,
                        invite_code: uni.getStorageSync('invite_code')
                      },
                      success: res => {
                        if (res.code == 200) {
                          if (res.code == 200) {
                            uni.setStorageSync(
                              'token',
                              `${res.data.token_type}${res.data.access_token}`
                            )

                            setTimeout(() => {
                              uni.switchTab({
                                url: '/pages/tabBar/home'
                              })
                            }, 500)
                          }
                        }
                      }
                    })
                  }
                })
              }
            });
          }
        }
      });
    },
    submitForm () {
      if (!this.agreeChecked) {
        this.$tip.tip("请先同意协议")
        return
      }
      if (!this.form.nickName) {
        this.$tip.tip("请输入用户名")
        return
      }
      if (!this.form.password) {
        this.$tip.tip("请输入密码")
        return
      }
      if (this.isRegOrLogin) {
        if (this.form.password.length < 6) {
          this.$tip.tip("密码长度必须大于六位")
          return
        }
        if (this.form.password !== this.form.rePassword) {
          this.$tip.tip("输入密码不一致")
          return
        }
      }
      // 注册
      if (this.isRegOrLogin) {
        this.req({
          url: "/v1/user/userRegister",
          data: {
            nickName: this.form.nickName,
            password: this.form.password,
            rePassword: this.form.rePassword,
            invite_code: uni.getStorageSync('invite_code')
            // invite_code: '9EI34L20'
          },
          success: res => {
            if (res.code == 200) {
              uni.setStorageSync(
                'token',
                `${res.data.token_type}${res.data.access_token}`
              )
              uni.showToast({
                title: '注册成功',
                icon: 'success',
                mask: true
              })
              setTimeout(() => {
                uni.switchTab({
                  url: '/pages/tabBar/home'
                })
              }, 2000)
            }
          },
          fail: (res) => {
            uni.showToast({
              title: '注册失败',
              icon: 'error',
              mask: true
            })
          }
        })
      } else {
        // 登录
        this.req({
          url: "/v1/user/userLogin",
          data: {
            nickName: this.form.nickName,
            password: this.form.password,
          },
          success: res => {
            if (res.code == 200) {
              uni.setStorageSync(
                'token',
                `${res.data.token_type}${res.data.access_token}`
              )
              uni.showToast({
                title: '登录成功',
                icon: 'success',
                mask: true
              })
              setTimeout(() => {
                uni.switchTab({
                  url: '/pages/tabBar/home'
                })
              }, 2000)
            }
          },
          fail: (res) => {
            uni.showToast({
              title: '登录失败',
              icon: 'error',
              mask: true
            })
          }
        })
      }

    },
    switchRegOrLogin () {
      this.isRegOrLogin = !this.isRegOrLogin
      this.form.nickName = ''
      this.form.password = ''
      this.form.rePassword = ''
    },
    codeChange (text) {
      this.codeText = text;
    },
    getPhoneCode () {
      if (this.$refs.uCode.canGetCode) {
        var reg_tel = /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/;    //11位手机号码正则
        if (reg_tel.test(this.phone) == false) {
          uni.showToast({
            title: '请填写正确的手机号',
            icon: 'none',
            mask: true
          })
          return
        }
        // 模拟向后端请求验证码
        uni.showLoading({
          title: '正在获取验证码'
        })
        this.req({
          url: "/v1/user/smsSend",
          data: {
            mobile: this.phone
          },
          success: res => {
            if (res.code == 200) {
              uni.hideLoading();
              // 通知验证码组件内部开始倒计时
              this.$refs.uCode.start();
            }
          }
        })
      } else {
        this.$u.toast('倒计时结束后再发送');
      }
    },
    submit () {
      var reg_tel = /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/;    //11位手机号码正则
      if (reg_tel.test(this.phone) == false) {
        uni.showToast({
          title: '请填写正确的手机号',
          icon: 'none',
          mask: true
        })
        return
      }
      if (this.num == '') {
        uni.showToast({
          title: '请填写验证码',
          icon: 'none',
          mask: true
        })
        return
      }
      this.req({
        url: "index.php/api/user/mobilelogin",
        data: {
          mobile: this.phone,
          captcha: this.num,
        },
        success: res => {
          if (res.data.code == 200) {
            uni.setStorageSync(
              'token',
              `${res.data.token_type}${res.data.access_token}`
            )
            uni.switchTab({
              url: '/pages/tabBar/home'
            })
          }
        }
      })
    },
    getUrlCode () { //
      var url = location.search
      var theRequest = new Object()
      if (url.indexOf("?") != -1) {
        var str = url.substr(1)
        var strs = str.split("&")
        for (var i = 0; i < strs.length; i++) {
          theRequest[strs[i].split("=")[0]] = (strs[i].split("=")[1])
        }
      }
      return theRequest
    },
    getCode () {
      if (!this.agreeChecked) {
        uni.showToast({
          title: '请先同意协议',
          icon: 'error',
          mask: true
        })
        return
      }
      // 非静默授权，第一次有弹框 https://www.baiguyou.com/h5/index.html#/
      var local = ''
      if (uni.getSystemInfoSync().platform == 'android') {

        local = encodeURIComponent(window.location.href) // 获取页面url
      } else {
        local = window.location.origin + window.location.pathname
      }

      // window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${this.appId}&redirect_uri=${this.redirect_uri}&response_type=code&scope=snsapi_userinfo&state=#wechat_redirect`

      // 资深全栈架构师开发,请联系QQ:602006050
      window.location.href = `http://www.api-redirect.xcooo.cn/get-weixin-code.html?appid=${this.appId}&redirect_uri=${this.redirect_uri}&response_type=code&scope=snsapi_userinfo&state=#wechat_redirect`

      // this.wxH5Code = this.getUrlCode().code // 截取code
      // if (this.wxH5Code == null || this.wxH5Code === '') { // 如果没有code，则去请求
      // }
    },
    getOpenid () { //获取opendi
      this.req({
        url: '/v1/shop/wxLogin',
        data: {
          code: this.wxH5Code,
          invite_code: uni.getStorageSync('invite_code')
        },
        success: res => {
          if (res.code == 200) {
            if (res.code == 200) {
              uni.setStorageSync(
                'token',
                `${res.data.token_type}${res.data.access_token}`
              )

              setTimeout(() => {
                uni.showToast({
                  title: '登录成功',
                  icon: 'success',
                  mask: true
                })
              }, 100)

              setTimeout(() => {
                this.pageTo('wxH5')
              }, 500)
            }
          }
        }
      })

    },
    uploadImage (tempFilePaths) {
      console.log(this.siteBaseUrl);
      let _this = this;
      uni.uploadFile({
        url: this.siteBaseUrl + '/v1/upload/image', //接口地址
        filePath: tempFilePaths,
        name: 'image',
        success: (res) => {
          let data = JSON.parse(res.data);
          // console.log(data,'image');
          this.headImg = data.data
          uni.hideLoading();
        },
        fail: (res) => {
          console.log(res);
        }
      });
    },
    onChooseAvatar (e) {
      try {
        const avatarUrl = e.detail.avatarUrl // 此处是头像的临时路径
        // 需要后端配合，获得线上的地址
        this.uploadImage(avatarUrl);
      } catch (err) {
        console.log(err)
      }
    },
    bindblur (e) {
      this.nickName = e.detail.value; // 获取微信昵称
    },
    checkboxChange () {
      this.agreeChecked = true;
    },
    /**
     * @description: 统一处理登录后页面跳转传参
     * @param {*}
     * @return {*}
     */
    pageTo (wx) {
      this.$store.dispatch('getUserInfo').then(() => {
        let pages = getCurrentPages()
        console.log(pages)

        console.log('this.optionsData', this.optionsData)
        let data = ''
        if (this.optionsData) {
          let query = this.optionsData
          if (this.optionsData.page == 'package/fuli/fuli-detail') {
            query.is_new = 1
          }
          data = query
        }
        /* 小程序码进入 */
        if (this.optionsData.scene) {
          let query = {}
          let arr = this.optionsData.scene.split('_')
          /**
           * 小程序码参数为 1_1_1 格式 参数间通过_分隔
           * 参数1为类型,之后参数为与后台约定的参数
           * 类型:
           * 1 幸运盒子 参数1为分享人id,参数2为盒子id
           * 未完待续...
           */
          if (arr[0] == 1) {
            query.userId = arr[1]
            query.id = arr[2]
          }
          data = query
        }
        if (wx) {
          uni.switchTab({
            url: '/pages/tabBar/home'
          })
        }

        uni.redirectTo({
          url: `${this.optionsData.page}${this.$common.qs(this.optionsData)}`,
          fail: err => {
            console.log('跳转失败--', this.optionsData.page)
            uni.switchTab({
              url: `${this.optionsData.page}`
            })
          }
        })
      })
    },

    /**
     * @description: 清除注册信息
     * @param {*}
     * @return {*}
     */
    clearForm () {
      this.formData = this.$options.data().formData
      console.log('clearOk')
    },

    /**
     * @description: 用户注册
     * @param {*}
     * @return {*}
     */
    async reg (e) {
      let wxData = await this.$common.wxMpLogin();
      // if (!this.headImg) {
      //   uni.showToast({
      //     title: '请获取头像',
      //     icon: 'none'
      //   })
      //   return
      // }
      let data = {}
      data.loginCode = wxData.code;
      data.nickName = this.nickName;
      data.avatarUrl = this.headImg ? this.headImg : 'https://xcooo.oss-cn-hangzhou.aliyuncs.com/wxapp/avatar3.png';
      data.invite_code = uni.getStorageSync('invite_code', '');
      /* 小程序码进入 */
      this.req({
        url: '/v1/user/register',
        data,
        success: res => {
          console.log(res)
          if (res.code == 200) {
            uni.setStorageSync(
              'token',
              `${res.data.token_type}${res.data.access_token}`
            )
            setTimeout(() => {
              uni.showToast({
                title: '登录成功',
                icon: 'success',
                mask: true
              })
            }, 100)

            setTimeout(() => {
              this.pageTo('wxH5')
            }, 800)
          }
        }
      })

    },

    /**
     * @description: 获取注册信息
     * @param {*}
     * @return {*}
     */
    getInfo (e) {
      /* 获取登录code */
      if (this.formData.loginCode === '') {
        this.$common.wxMpLogin().then(res => {
          this.formData.loginCode = res.code
          this.reg('login')
        })
      }

      /* 获取手机号code */
      if (this.formData.mobileCode === '') {
        console.log(e)
        if (e.type == 'getphonenumber') {
          this.formData.mobileCode = e.detail.code
          this.reg('phone')
        }
      }
    },

    /**
     * @description:
     * @param {*}
     * @return {*}
     */
    async login () {
      if (!this.agreeChecked) {
        uni.showToast({
          title: '请先同意协议',
          icon: 'error',
          mask: true
        })
        return
      }
      let data = await this.$common.wxMpLogin()
      console.log(data)
      this.req({
        url: '/v1/user/login',
        data: {
          code: data.code,
        },
        success: res => {
          if (res.code == 200) {
            uni.setStorageSync(
              'token',
              `${res.data.token_type}${res.data.access_token}`
            )

            setTimeout(() => {
              uni.showToast({
                title: '登录成功',
                icon: 'success',
                mask: true
              })
            }, 100)

            setTimeout(() => {
              this.pageTo('wxH5')
            }, 800)
          } else if (res.code == 1001) {
            this.code = data.code
            this.anShow = true
            // uni.showToast({
            //   title: '请点击授权登录',
            //   icon: 'none'
            // })
          }
        }
      })
    },
    go (url) {
      uni.navigateTo(
        {
          url
        }
      )
    }
  }
}
</script>

<style lang="scss">
.login-page {
  width: 100%;
  height: 100vh;
  // background-image: url("https://img.50api.cn/vx.tongbayun.v3/loginbg.jpg");
  background: url("https://img.alicdn.com/imgextra/i4/2200676927379/O1CN01unkdtT24NdWplMdw8_!!2200676927379.png") no-repeat;
  background-size: 100% 100%;
  position: relative;
}

.top {
  position: absolute;
  top: 200rpx;
  width: 100%;

  .sys-title {
    font-size: 70rpx;
    font-weight: bold;
    color: #3643bd;
    padding-left: 50rpx;
  }

  .text-content {
    font-size: 30rpx;
    font-weight: bolder;
    color: #3643bd;
    padding-left: 50rpx;
    margin-top: 40rpx;
  }

  .biaodan {
    margin-top: 300rpx;
    width: 650rpx;
    height: 100rpx;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #3643bd;
    color: #fff;
    font-size: 32rpx;
    margin-left: 50rpx;
    border-radius: 30rpx;
  }
}

.regOrLogin {
  position: absolute;
  bottom: 200rpx;
  width: 100%;
  display: flex;
  justify-content: center;

  .regOrLogin-text {
    font-size: 15px;
    color: #3643bd;
  }
}


.agree-box {
  position: absolute;
  bottom: 100rpx;
  width: 650rpx;
  margin-left: 50rpx;
  display: flex;

  .agree-box-text {
    color: #fff;
    font-size: 24rpx;
    line-height: 36rpx;
  }

  .book-style {
    color: #3643bd;
    font-size: 24rpx;
    line-height: 36rpx;

  }
}

.phonesanniu {
  width: 640rpx;
  height: 700rpx;
  border-radius: 20rpx;
  border: 1rpx solid #fff;
  background-color: #ccc;
  background-size: 100% 100%;
  top: 100rpx;
  left: 60rpx;
  position: relative;

  .topshanguin {
    width: 100%;
    height: 25%;
    display: flex;
    align-items: center;
    justify-content: center;

    .imgs {
      font-size: 40rpx;
      font-weight: bold;
      color: #333333;
    }
  }

  .containar {
    width: 100%;
    height: 75%;

    .avatarUrl {
      padding: 30rpx 0 40rpx;
      background: #fff;

      button {
        background: #fff;
        line-height: 80rpx;
        height: auto;
        width: auto;
        padding: 20rpx 30rpx;
        border: 1rpx solid #f1f1f1;
        margin: 0;
        display: flex;
        justify-content: center;
        align-items: center;

        .avatar {
          height: 100rpx;
          width: 100rpx;
        }

        .refreshIcon {
          width: 160rpx;
          height: 160rpx;
          border-radius: 50%;
        }

        .jt {
          width: 14rpx;
          height: 28rpx;
        }
      }
    }

    .nickname {
      background: #fff;
      padding: 20rpx;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: auto;
      border: 1rpx solid #f1f1f1;

      .weui-input {
        margin: auto;
        padding-left: -10rpx;

      }
    }

    .btn1 {
      width: 100%;
      margin-top: 10rpx;

      .btn-sub {
        width: 468rpx;
        margin: auto;
        height: 100rpx;
        border-radius: 25rpx;
        font-size: 40rpx;
        color: #ffffff;
        line-height: 100rpx;
        text-align: center;
        font-size: 36rpx;
        background-color: #01d9d8;
      }

      .btn-tg {
        padding-top: 15rpx;
        width: 468rpx;
        margin: auto;
        text-align: center;
      }
    }
  }
}


.popup-view {
  width: 600rpx;
  height: 600rpx;
  background-color: #ffffff;
  border-radius: 20rpx;
  overflow: hidden;
  padding: 50rpx 0;
  box-sizing: border-box;

  .popup-view-title {
    height: 100rpx;
    text-align: center;
    line-height: 100rpx;
    font-size: 28rpx;
    color: #222;
  }

  .cell-list {
    display: flex;
    align-items: center;
    margin-top: 30rpx;
    width: 500rpx;
    margin-left: 50rpx;

    // padding: 20rpx 0;
    &-left {
      width: 160rpx;
      flex-shrink: 0;
    }

    .refreshIcon {
      width: 100rpx;
      height: 100rpx;
      border-radius: 50%;
      overflow: hidden;
    }

    .right-pic {
      width: 100%;
      height: 80rpx;

      button {
        width: 100%;
        height: 100%;
        padding: 0;
        display: flex;
        align-items: center;
        // background: linear-gradient(90deg, #03a9f4, #f441a5, #ffeb3b, #03a9f4);
        margin-left: 50rpx;
        background: transparent;
        position: relative;

        .get-avatar {
          position: absolute;
          width: 100%;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 30rpx;
          color: #fff;
          text-align: center;
        }

        .xc-avatar {
          width: 70rpx;
          height: 70rpx;
          border-radius: 50%;
        }

        .avatar-icon {
          margin-left: 20rpx;
        }
      }

      button::after {
        border: none;
      }
    }
  }

  .btn1 {
    margin-top: 60rpx;

    .btn-sub {
      width: 500rpx;
      background-color: #3643bd;
      height: 80rpx;
      color: #fff;
      border-radius: 15rpx;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-left: 50rpx;
    }
  }
}
</style>


<style lang="scss" scoped>
.login-wrap {
  margin-top: 50px;
  display: flex;
  justify-content: center;
  padding: 0 30rpx;

  ::v-deep .uni-input-wrapper {
    color: #fff;
  }

  ::v-deep .u-label-text {
    color: #fff;
  }

  .h5-biaodan {
    width: 100%;

    .row {
      margin-bottom: 15px;
    }

    .huoqu {
      color: #3643bd;
    }

    .btn {
      width: 90%;
      height: 50px;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #3643bd;
      color: #fff;
      font-size: 16px;
      border-radius: 15px;
    }
  }
}
</style>