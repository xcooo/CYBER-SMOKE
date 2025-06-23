/*
 * @Date: 2022-10-17 14:32:11
 * @LastEditTime: 2025-05-27 12:30:04
 * @Description: content
 */
import Vue from 'vue'
import SHA1 from './sha1.min'
import MD5 from './md5'

const bind_phone = function (a, b, c) {
  // #ifdef APP
  let full1 = {
    fullScreen: 'true', // 是否全屏显示，默认值： "false"
    backgroundColor: '#ffffff', // 授权页面背景颜色，默认值：#ffffff
    icon: {
      path: 'static/logo.png' // 自定义显示在授权框中的logo，仅支持本地图片 默认显示App logo
    },
    phoneNum: {
      color: '#202020' // 手机号文字颜色 默认值：#202020
    },
    slogan: {
      color: '#BBBBBB' //  slogan 字体颜色 默认值：#BBBBBB
    },
    authButton: {
      normalColor: '#5534fd', // 授权按钮正常状态背景颜色 默认值：#3479f5
      highlightColor: '#2861c5', // 授权按钮按下状态背景颜色 默认值：#2861c5（仅ios支持）
      disabledColor: '#73aaf5', // 授权按钮不可点击时背景颜色 默认值：#73aaf5（仅ios支持）
      textColor: '#ffffff', // 授权按钮文字颜色 默认值：#ffffff
      title: '本机号码一键绑定', // 授权按钮文案 默认值：“本机号码一键登录”
      borderRadius: '24px' // 授权按钮圆角 默认值："24px" （按钮高度的一半）
    },
    otherLoginButton: {
      visible: 'false', // 是否显示其他登录按钮，默认值：true
      normalColor: '', // 其他登录按钮正常状态背景颜色 默认值：透明
      highlightColor: '', // 其他登录按钮按下状态背景颜色 默认值：透明
      textColor: '#656565', // 其他登录按钮文字颜色 默认值：#656565
      title: '', // 其他登录方式按钮文字 默认值：“其他登录方式”
      borderColor: '', //边框颜色 默认值：透明（仅iOS支持）
      borderRadius: '0px' // 其他登录按钮圆角 默认值："24px" （按钮高度的一半）
    },
    privacyTerms: {
      defaultCheckBoxState: 'false', // 条款勾选框初始状态 默认值： true
      uncheckedImage: 'static/wxz.png', // 可选 条款勾选框未选中状态图片（仅支持本地图片 建议尺寸 24x24px）(3.2.0+ 版本支持)
      checkedImage: 'static/xz2.png', // 可选 条款勾选框选中状态图片（仅支持本地图片 建议尺寸24x24px）(3.2.0+ 版本支持)
      textColor: '#BBBBBB', // 文字颜色 默认值：#BBBBBB
      termsColor: '#5496E3', //  协议文字颜色 默认值： #5496E3
      prefix: '我已阅读并同意', // 条款前的文案 默认值：“我已阅读并同意”
      suffix: '并使用本机号码登录', // 条款后的文案 默认值：“并使用本机号码登录”
      privacyItems: [
        // 自定义协议条款，最大支持2个，需要同时设置url和title. 否则不生效
        {
          url: 'http://admin.cykongjian.com/www/index.html', // 点击跳转的协议详情页面
          title: '用户服务协议' // 协议名称
        }
      ]
    },
    buttons: {
      // 自定义页面下方按钮仅全屏模式生效（3.1.14+ 版本支持）
      iconWidth: '45px', // 图标宽度（高度等比例缩放） 默认值：45px
      list: []
    }
  }
  uni.preLogin({
    // 该函数是判断当前设备环境是否支持一键登录，
    // 如果能支持一键登录，此时可以显示一键登录选项，同时预登录会准备好相关环境
    provider: 'univerify',
    success (e) {
      console.log(e)
      //预登录成功
      // 显示一键登录选项
      uni.login({
        provider: 'univerify',
        univerifyStyle: full1,
        success (res) {
          console.log(res)
          // 在得到access_token后，通过callfunction调用云函数
          uniCloud
            .callFunction({
              name: 'newbox', // 你的云函数名称
              data: {
                access_token: res.authResult.access_token, // 客户端一键登录接口返回的access_token
                openid: res.authResult.openid // 客户端一键登录接口返回的openid
              }
            })
            .then(ress => {
              console.log(ress)
              Vue.prototype.req({
                url: 'wxphone',
                data: {
                  openid: a,
                  nickname: b,
                  headimg: c,
                  phone: ress.result.content.phoneNumber
                },
                success (e) {
                  console.log(e)
                  if (e.code == 1) {
                    uni.setStorageSync('token', e.data.token)
                    // 登录成功，可以关闭一键登录授权界面了
                    uni.closeAuthView()
                    uni.reLaunch({
                      url: '../user/index'
                    })
                  }
                }
              })
            })
            .catch(err => {
              console.log(err)
              // 处理错误
              // uni.closeAuthView()
            })
        },
        fail (res) {
          console.log(res)
        }
      })
    },
    fail (res) {
      // 预登录失败
      uni.reLaunch({
        url: '/pages/login/bind'
      })
    }
  })
  // #endif
  // #ifdef H5
  uni.reLaunch({
    url: '/pages/login/bind'
  })
  // #endif
}

const login_z = function () {
  // #ifdef APP
  let full = {
    fullScreen: 'true', // 是否全屏显示，默认值： "false"
    backgroundColor: '#ffffff', // 授权页面背景颜色，默认值：#ffffff
    icon: {
      path: 'static/logo.png' // 自定义显示在授权框中的logo，仅支持本地图片 默认显示App logo
    },
    phoneNum: {
      color: '#202020' // 手机号文字颜色 默认值：#202020
    },
    slogan: {
      color: '#BBBBBB' //  slogan 字体颜色 默认值：#BBBBBB
    },
    authButton: {
      normalColor: '#76D0E8', // 授权按钮正常状态背景颜色 默认值：#3479f5
      highlightColor: '#76D0E8', // 授权按钮按下状态背景颜色 默认值：#2861c5（仅ios支持）
      disabledColor: '#73aaf5', // 授权按钮不可点击时背景颜色 默认值：#73aaf5（仅ios支持）
      textColor: '#222222', // 授权按钮文字颜色 默认值：#ffffff
      title: '本机号码一键登录', // 授权按钮文案 默认值：“本机号码一键登录”
      borderRadius: '1px', // 授权按钮圆角 默认值："24px" （按钮高度的一半）
      fontWeight: 'bold',
      fontStyle: 'italic'
    },
    otherLoginButton: {
      visible: 'true', // 是否显示其他登录按钮，默认值：true
      normalColor: '', // 其他登录按钮正常状态背景颜色 默认值：透明
      highlightColor: '', // 其他登录按钮按下状态背景颜色 默认值：透明
      textColor: '#333333', // 其他登录按钮文字颜色 默认值：#656565
      title: '其他手机号登录', // 其他登录方式按钮文字 默认值：“其他登录方式”
      borderColor: '#999999', //边框颜色 默认值：透明（仅iOS支持）
      borderRadius: '1px' // 其他登录按钮圆角 默认值："24px" （按钮高度的一半）
    },
    privacyTerms: {
      defaultCheckBoxState: 'false', // 条款勾选框初始状态 默认值： true
      uncheckedImage: 'static/icon/chenck.png', // 可选 条款勾选框未选中状态图片（仅支持本地图片 建议尺寸 24x24px）(3.2.0+ 版本支持)
      checkedImage: 'static/icon/chenck_act.png', // 可选 条款勾选框选中状态图片（仅支持本地图片 建议尺寸24x24px）(3.2.0+ 版本支持)
      textColor: '#333333', // 文字颜色 默认值：#BBBBBB
      termsColor: '#76D0E8', //  协议文字颜色 默认值： #5496E3
      prefix: '我已阅读并同意', // 条款前的文案 默认值：“我已阅读并同意”
      suffix: '并使用本机号码登录', // 条款后的文案 默认值：“并使用本机号码登录”
      privacyItems: [
        // 自定义协议条款，最大支持2个，需要同时设置url和title. 否则不生效
        {
          url: 'http://admin.cykongjian.com/www/index.html', // 点击跳转的协议详情页面
          title: '用户服务协议' // 协议名称
        }
      ]
    },
    buttons: {
      // 自定义页面下方按钮仅全屏模式生效（3.1.14+ 版本支持）
      iconWidth: '32px', // 图标宽度（高度等比例缩放） 默认值：45px
      list: []
    }
  }
  uni.preLogin({
    // 该函数是判断当前设备环境是否支持一键登录，
    // 如果能支持一键登录，此时可以显示一键登录选项，同时预登录会准备好相关环境
    provider: 'univerify',
    success (e) {
      //预登录成功
      // 显示一键登录选项
      uni.login({
        provider: 'univerify',
        univerifyStyle: full,
        success (res) {
          // console.log(res)
          // 在得到access_token后，通过callfunction调用云函数
          uniCloud
            .callFunction({
              name: 'newbox', // 你的云函数名称
              data: {
                access_token: res.authResult.access_token, // 客户端一键登录接口返回的access_token
                openid: res.authResult.openid // 客户端一键登录接口返回的openid
              }
            })
            .then(ress => {
              console.log(ress)
              let reqData = {
                mobile: ress.result.content.phoneNumber
              }
              // #ifdef APP-PLUS
              reqData.cid = plus.push.getClientInfo().clientid
              // #endif
              console.log('登录数据``````````````````', reqData)
              request({
                url: '/v1/user/mobileLogin',
                data: reqData,
                success (e) {
                  console.log('dnglu``````````', e, e.data)

                  /* 手机号未注册 */
                  if (e.code == 1001) {
                    uni.closeAuthView()
                    let pages = getCurrentPages()
                    Vue.prototype.$common.to({
                      type: 2,
                      url: '/pages/reg/reg',
                      query: Vue.prototype.$common.getOptions({
                        page: `/${pages[pages.length - 1].route}`,
                        phone: mobile
                      })
                    })

                    // 需要注册
                    //#ifdef APP-PLUS
                    plus.nativeUI.toast(res.msg)
                    //#endif
                    //#ifndef APP-PLUS
                    uni.showToast({
                      title: res.msg,
                      icon: 'none'
                    })
                    //#endif
                    return
                  }
                  if (e.code == 200) {
                    uni.setStorageSync(
                      'token',
                      `${e.data.token_type}${e.data.access_token}`
                    )

                    let pages = getCurrentPages()
                    let url = `/${pages[pages.length - 1].route}`
                    let options = pages[pages.length - 1].options
                    Vue.prototype.$common.to({
                      type: 2,
                      url,
                      query: options,
                      fail: () => {
                        Vue.prototype.$common.to({
                          type: 3,
                          url,
                          query: options
                        })
                      }
                    })

                    // 登录成功，可以关闭一键登录授权界面了
                    uni.closeAuthView()
                    // uni.reLaunch({
                    //   url: '/pages/mine/mine'
                    // })
                    return
                  }
                },
                fail (err) {
                  console.log('logfail```````', err)
                }
              })
            })
            .catch(err => {
              console.log(err)
              // 处理错误
              uni.closeAuthView()
            })
        },
        fail (res) {
          console.log(res)
          // 用户点击其他按钮的回调
          if (res.code == 30002) {
            uni.closeAuthView()
            let pages = getCurrentPages()
            Vue.prototype.$common.to({
              type: 2,
              url: '/pages/login/login',
              query: Vue.prototype.$common.getOptions({
                page: `/${pages[pages.length - 1].route}`
              })
            })
          }
          if (res.code == 30008) {
            uni.redirectTo({
              url: '/pages/login/login'
            })
          }
        }
      })
    },
    fail (res) {
      console.log(res)
      uni.reLaunch({
        url: '/pages/login/login'
      })
    }
  })
  // #endif
  // #ifdef H5
  uni.reLaunch({
    url: '/pages/login/login'
  })
  // #endif
}

const request = function (param, backpage, backtype) {
  uni.getNetworkType({
    success: function (res) {
      if (res.networkType == 'none') {
        //#ifdef APP-PLUS
        plus.nativeUI.toast('网络连接异常，请检查网络')
        //#endif
        //#ifndef APP-PLUS
        uni.showToast({
          title: '网络连接异常，请检查网络',
          icon: 'none'
        })
        //#endif
        return
      }
    }
  })
  var url = param.url,
    method = 'POST',
    header = {},
    data = param.data || {},
    file = param.file || '',
    files = param.files || '',
    Loading = param.Loading || false,
    name = param.fileName || 'file'

  var token = uni.getStorageSync('token')
  // var token='b8e5376dd5d738d86126289468a3af19948ffe65'
  // var token_type = 'bearer'
  // var access_token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczpcL1wvdGVzdC5taC50ZXN0LmxhaWJpbndsLmNuXC9hcGlcL3YxXC9zaG9wXC93eExvZ2luIiwiaWF0IjoxNjk1MjgwODYzLCJuYmYiOjE2OTUyODA4NjMsImp0aSI6InR6NzZ0NjVxYmZieTM0ckEiLCJzdWIiOjEwMiwicHJ2IjoiMjcyNWExZTQ0ZTQyZGMzODBlZGZmNGZmMGM1MzcwZjZhZGFhNzA0NCJ9.wDRCxHYbAfp5bk6K45sajDdQ-G-Gz51SDyZUmRe_1Aw'
  // var token = `${token_type}${access_token}`
  //拼接完整请求地址
  var requestUrl = Vue.prototype.siteBaseUrl + url
  //固定参数:仅仅在小程序绑定页面通过code获取token的接口默认传递了参数token = login
  if (!header.token) {
    //其他业务接口传递过来的参数中无token
    //uni.getStorageSync('token'); 参数中无token时在本地缓存中获取
  }

  //请求方式:GET或POST(POST需配置header: {'content-type' : "application/x-www-form-urlencoded"},)
  if (method) {
    method = method.toUpperCase() //小写改为大写
    if (method == 'POST') {
      if (file) {
        header = {
          Authorization: token
        }
      } else if (files) {
        header = {
          Authorization: token
        }
      } else {
        header = {
          // 'content-type': 'application/x-www-form-urlencoded',
          'content-type': 'application/json',
          Authorization: token
        }
      }
    } else {
      header = {
        'content-type': 'application/json'
      }
    }
  } else {
    method = 'GET'
    header = {
      'content-type': 'application/json'
    }
  }

  /* 添加公共请求头 */
  {
    let randomString = function (e) {
      e = e || 32
      var t = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678',
        a = t.length,
        n = ''
      for (var i = 0; i < e; i++) n += t.charAt(Math.floor(Math.random() * a))
      return n
    }

    var token = '11fds45452432FED5FS4D'
    var t = `${Math.floor(Date.now() / 1000)}`
    var r = `${randomString(16)}`

    var arr = [token, t, r]
    // console.log('arr', arr)

    arr.sort()
    // console.log('arr1', arr)
    // console.log(Date(t * 1000))

    var s = MD5(SHA1(arr.join(''))).toUpperCase()

    // console.log('t', t)
    // console.log('r', r)
    // console.log('sha1', SHA1(token + t + r))
    // console.log('md5', MD5(SHA1(token + t + r)))
    // console.log('s', s)
    header.t = t
    header.r = r
    header.s = s
  }

  //用户交互:加载圈
  if (!Loading) {
    // uni.showLoading({
    //   title: '加载中...'
    // })
  }
  //网络请求
  if (file) {
    uni.uploadFile({
      url: requestUrl,
      header: header,
      name: name,
      formData: data,
      filePath: file,
      success: res => {
        res.data = JSON.parse(res.data)
        if (!Loading) {
          uni.hideLoading()
        }
        if (res.statusCode && res.statusCode != 200) {
          //api错误
          // uni.showModal({
          // 	content: "" + res.errMsg
          // });
          // return;
        }
        if (res.data.code == 200) {
          //返回结果码code判断:1成功,-1错误
        } else if (res.data.code == 1) {
          //成功的提示
          //#ifdef APP-PLUS
          plus.nativeUI.toast(res.data.msg)
          //#endif
          //#ifndef APP-PLUS
          uni.showToast({
            title: res.data.msg,
            icon: 'none'
          })
          //#endif
        } else if (res.data.code == -3) {
          //去登录
          uni.navigateTo({
            url: '/pages/personal/login/index'
          })
        } else {
          //#ifdef APP-PLUS
          plus.nativeUI.toast(res.data.msg)
          //#endif
          //#ifndef APP-PLUS
          uni.showToast({
            title: res.data.msg,
            icon: 'none'
          })
          //#endif
          return
        }
        typeof param.success == 'function' && param.success(res.data)
      },
      fail: e => {
        console.log('网络请求fail:' + JSON.stringify(e))
        uni.showModal({
          content: '' + e.errMsg
        })
        typeof param.fail == 'function' && param.fail(e.data)
      },
      complete: () => {
        if (!Loading) {
          uni.hideLoading()
        }
        typeof param.complete == 'function' && param.complete()
        return
      }
    })
  } else if (files) {
    uni.uploadFile({
      url: requestUrl,
      header: header,
      formData: data,
      files: files,
      success: res => {
        res.data = JSON.parse(res.data)
        if (!Loading) {
          uni.hideLoading()
        }
        if (res.data.code == 2) {
          //返回结果码code判断:1成功,-1错误
        } else if (res.data.code == 1) {
          //成功的提示
          //#ifdef APP-PLUS
          plus.nativeUI.toast(res.data.msg)
          //#endif
          //#ifndef APP-PLUS
          uni.showToast({
            title: res.data.msg,
            icon: 'none'
          })
          //#endif
        } else if (res.data.code == -3) {
          //去登录
          uni.navigateTo({
            url: '/pages/personal/login/index'
          })
        } else {
          //#ifdef APP-PLUS
          plus.nativeUI.toast(res.data.msg)
          //#endif
          //#ifndef APP-PLUS
          uni.showToast({
            title: res.data.msg,
            icon: 'none'
          })
          //#endif
          return
        }
        typeof param.success == 'function' && param.success(res.data)
      },
      fail: e => {
        console.log('网络请求fail:' + JSON.stringify(e))
        uni.showModal({
          content: '' + e.errMsg
        })
        typeof param.fail == 'function' && param.fail(e.data)
      },
      complete: () => {
        if (!Loading) {
          uni.hideLoading()
        }
        typeof param.complete == 'function' && param.complete()
        return
      }
    })
  } else {
    uni.request({
      url: requestUrl,
      method: method,
      header: header,
      data: data,
      success: res => {
        if (!Loading) {
          uni.hideLoading()
        }
        /* 过期时替换新token */
        if (res.header.authorization) {
          // console.log('`````````````````````````', res.header.authorization)
          uni.setStorageSync('token', res.header.authorization)
        }
        if (res.statusCode && res.statusCode == 500) {
          console.log(res)
          setTimeout(() => {
            uni.showToast({
              title: '系统出错',
              icon: 'none'
            })
          }, 100)
        }
        if (res.data.code == 200) {
          //返回结果码code判断:200成功
        } else if (res.data.code == 400) {
          // 失败
          //#ifdef APP-PLUS
          plus.nativeUI.toast(res.data.msg)
          //#endif
          //#ifndef APP-PLUS
          setTimeout(() => {
            uni.showToast({
              title: res.data.msg,
              icon: 'none'
            })
          }, 100)
          //#endif
        } else if (res.data.code == 1000) {
          // 签名错误不抛错
        } else if (res.data.code == 1001) {
          // #ifdef H5
          // let pages = getCurrentPages()
          // Vue.prototype.$common.to({
          //   type: 2,
          //   url: '/pages/mine/login',
          //   query: Vue.prototype.$common.getOptions({
          //     page: `/${pages[pages.length - 1].route}`
          //   })
          // })
          // #endif
        } else if (res.data.code == 1002) {
          // 需要登录
          // #ifdef APP-PLUS
          login_z()
          // #endif
          // #ifndef APP-PLUS
          // let pages = getCurrentPages()
          // Vue.prototype.$common.to({
          //   type: 2,
          //   url: '/pages/mine/login',
          //   query: Vue.prototype.$common.getOptions({
          //     page: `/${pages[pages.length - 1].route}`
          //   })
          // })
          // #endif
          // #ifdef H5 
          // let pages = getCurrentPages()
          // Vue.prototype.$common.to({
          //   type: 2,
          //   url: '/pages/mine/login',
          //   query: Vue.prototype.$common.getOptions({
          //     page: `/${pages[pages.length - 1].route}`
          //   })
          // })

          // uni.reLaunch({
          //   url: '/pages/tabBar/index'
          // });

          // #endif
          // #ifdef MP
          // let wxpages = getCurrentPages()
          // Vue.prototype.$common.to({
          //   type: 2,
          //   url: '/pages/mine/login',
          //   query: Vue.prototype.$common.getOptions({
          //     page: `/${wxpages[wxpages.length - 1].route}`
          //   })
          // })
          // #endif
        } else {
          //#ifdef APP-PLUS
          plus.nativeUI.toast(res.data.msg)
          //#endif
          //#ifndef APP-PLUS
          // setTimeout(() => {
          //   uni.showToast({
          //     title: res.data.msg,
          //     icon: 'none'
          //   })
          // }, 100)
          //#endif
        }
        typeof param.success == 'function' && param.success(res.data)
      },
      fail: e => {
        console.log('网络请求fail:' + JSON.stringify(e))
        // uni.showModal({
        // 	content: "" + e.errMsg
        // });
        typeof param.fail == 'function' && param.fail(e.data)
      },
      complete: () => {
        if (!Loading) {
          uni.hideLoading()
        }
        typeof param.complete == 'function' && param.complete()
        return
      }
    })
  }
}

export default request
