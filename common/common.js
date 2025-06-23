/*
 * @Date: 2022-05-16 17:08:57
 * @LastEditTime: 2025-06-12 18:49:05
 * @Description: content
 */
import Vue from 'vue'
import { pathToBase64, base64ToPath } from '../js_sdk/mmmm-image-tools/index'
import { Base64 } from 'base64-string'

// #ifdef H5
const jWeixin = require('jweixin-module')
// #endif

export default {
  data: {
    loading: false,
    timer: null
  },

  isLogin () {
    let token = uni.getStorageSync('token')
    if (!token) {
      return false
    }
    return true
  },

  /* ##################################### 当前应用方法-start ##################################### */

  /**
   * @description: 下载app
   * @param {*} e
   * @return {*}
   */
  downloadApp (e, showWating = true) {
    console.log('下载', e)
    var dtask = plus.downloader.createDownload(
      e.app_api_url,
      {},
      function (d, status) {
        //下载完成

        if (status == 200) {
          plus.runtime.install(
            plus.io.convertLocalFileSystemURL(d.filename),
            {},
            {},
            function (error) {
              uni.showToast({
                title: '安装失败',
                mask: false,
                duration: 1500
              })
            }
          )
        } else {
          uni.showToast({
            title: '更新失败',
            mask: false,
            duration: 1500
          })
        }
      }
    )
    console.log(dtask)
    try {
      console.log('开始下载')
      dtask.start() // 开启下载的任务
      var prg = 0

      //创建一个showWaiting对象
      var showLoading = showWating
        ? plus.nativeUI.showWaiting('正在下载')
        : showWating

      dtask.addEventListener('statechanged', (task, status) => {
        // 给下载任务设置一个监听 并根据状态  做操作
        // console.log('下载监听')
        switch (task.state) {
          case 1:
            showLoading && showLoading.setTitle('正在下载')
            break
          case 2:
            showLoading && showLoading.setTitle('已连接到服务器')
            if (!showLoading) {
              this.toast({
                title: '应用后台下载中,下载完成将会自动安装',
                duration: 3000
              })
            }
            break
          case 3:
            prg = parseInt(
              (parseFloat(task.downloadedSize) / parseFloat(task.totalSize)) *
              100
            )
            showLoading && showLoading.setTitle('  正在下载' + prg + '%  ')
            break
          case 4:
            plus.nativeUI.closeWaiting()
            //下载完成
            break
        }
      })
    } catch (err) {
      showLoading && plus.nativeUI.closeWaiting()
      uni.showToast({
        title: '更新失败-03',
        mask: false,
        duration: 1500
      })
    }
  },

  /**
   * @description: 检查是否更新
   * @param {*} e
   * @return {*}
   */
  checkUpdate (e) {
    return new Promise((resolve, reject) => {
      let platform = uni.getSystemInfoSync().platform

      if (platform == 'android') {
        plus.runtime.getProperty(plus.runtime.appid, wgtinfo => {
          // 与后台交互获取版本号

          let resV = e.app_version.split('.')
          let appV = wgtinfo.version.split('.')
          let isUpdate = false

          for (let i = 0; i < Math.max(appV.length, resV.length); i++) {
            if (resV[i] === undefined) resV[i] = 0
            if (appV[i] === undefined) appV[i] = 0
            /* 后台版本号小于app版本号,不更新 */
            if (resV[i] * 1 < appV[i] * 1) {
              isUpdate = false
              break
            }
            /* 后台版本号大于app版本号,更新 */
            if (resV[i] * 1 > appV[i] * 1) {
              isUpdate = true
              break
            }
            /* 版本号相等,进行下一位比对 */
            if (resV[i] * 1 == appV[i] * 1) {
              continue
            }
          }

          resolve(isUpdate)
        })
      } else {
        resolve(false)
      }
    })
  },

  /**
   * @description: app微信助力分享
   * @param {*} e
   * @return {*}
   */
  appShare (e) {
    let content = `newbox_${encodeURIComponent(
      JSON.stringify(e)
    )}_复制去[扭蛋盲盒]帮我助力`

    uni.share({
      provider: 'weixin',
      type: 1,
      scene: 'WXSceneSession',
      // title: e,
      summary: content,
      success: result => { },
      fail: error => {
        console.log(error)
      }
    })
  },

  /**
   * @description: 轮播跳转
   * @return {*}
   */
  bannerTo (item) {
    console.log('common.bannerTo', item)
    switch (item.url_type) {
      /* 跳转详情 (图文) */
      case 2:
        this.to({
          type: 1,
          url: '/pages/rich-text/rich-text',
          query: {
            id: item.id
          }
        })
        break
      /* 跳转内部链接 */
      case 3:
        console.log(item.links)
        uni.navigateTo({
          url: item.links,
          fail: err => {
            console.log(err)
            uni.switchTab({ url: item.links })
          }
        })
        break
      /* 跳转外链 */
      case 4:
        // #ifdef APP-PLUS
        plus.runtime.openURL(item.links)
        // #endif

        // #ifdef MP
        this.to({
          type: 1,
          url: '/pages/index/web-view',
          query: {
            url: item.links
          }
        })
        // #endif
        // #ifdef H5
        window.location.href = item.links
        // #endif
        break
    }
  },

  /**
   * @description:获取轮播图
   * @param {*}
   * @return {*}
   */
  getBanner (e) {
    return new Promise((resolve, reject) => {
      Vue.prototype.req({
        url: '/v1/operate/banners',
        data: {
          cat_id: e
        },
        success: res => {
          if (res.code == 200) {
            resolve(res.data)
          }
        }
      })
    })
  },

  /**
   * @description: 取消订单
   * @param {*} order_sn
   * @return {*}
   */
  orderCancel (order_sn) {
    Vue.prototype.req({
      url: '/v1/pay/cancel',
      data: {
        order_sn
      },
      Loading: true,
      success: res => {
        if (res.code == 200) {
          // this.toast({
          //   title: '订单已取消'
          // })
        }
      }
    })
  },

  /**
   * @description: 订单支付
   * @param {*} opt
   * @return {*}
   */
  orderPay (opt) {
    return new Promise((resolve, reject) => {
      let provider = ''
      switch (parseInt(opt.pay_type)) {
        case 3:
          provider = 'wxpay'
          break
        case 4:
          provider = 'alipay'
          break
      }

      // #ifdef H5
      // let returnUrl = opt.returnUrl ? `https://${location.host}#${opt.returnUrl}` : ''
      let host = location.host
      let protocol = window.location.protocol
      let returnUrl = opt.returnUrl ? `${protocol}//${host}/#${opt.returnUrl}` : ''
      // #endif

      Vue.prototype.req({
        url: '/v1/pay/pay',
        data: {
          order_sn: opt.order_sn,
          // #ifdef H5
          type: 'h5',
          return_url: returnUrl,
          // #endif
          // #ifdef APP-PLUS 
          type: 'app',
          // #endif
          // #ifdef MP 
          type: 'MP'
          // #endif
        },
        success: res => {
          if (res.code == 200) {
            // #ifdef APP-PLUS
            if (opt.is_epay == 0) {
              this.appPay({
                provider,
                data: res.data.data,
                order_sn: opt.order_sn
              }).then(res => {
                resolve(res)
              })
            } else {
              // 易支付/码支付
              this.h5Pay({
                provider,
                data: res.data.data,
                order_sn: opt.order_sn,
                is_epay: opt.is_epay
              })
            }
            // #endif
            // #ifdef MP
            if (opt.pay_type == 3) {
              this.wxMpPay({
                provider,
                data: res.data.data,
                order_sn: opt.order_sn
              }).then(res => {
                resolve(res)
              })
            } else {
              // 支付宝扫码支付
              resolve(res)
            }
            // #endif
            // #ifdef H5
            if (opt.is_epay == 0) {
              if (opt.pay_type == 3) {
                // 微信官方支付
                this.wxH5Pay({
                  provider,
                  data: res.data.data,
                  order_sn: opt.order_sn,
                }).then(res => {
                  resolve(res)
                })
              } else {
                // 支付宝扫码支付
                resolve(res)
              }
            } else {
              // 易支付/码支付
              this.h5Pay({
                provider,
                data: res.data.data,
                order_sn: opt.order_sn,
                is_epay: opt.is_epay
              })
            }
            // #endif
          } else {
            this.orderCancel(opt.order_sn)
            // ===================================
            // 易支付 页面处理
            // console.log(res)
            // uni.navigateTo({
            //   url: '/pages/tabBar/pay'
            // })
            // setTimeout(() => {
            //   uni.$emit('h5pay', res)
            // }, 600)
          }
        }
      })
    })
  },

  /**
   * @description: 获取规则
   * @param {*} id
   * @return {*}
   */
  getRule (id = '', Loading = false) {
    return new Promise((resolve, reject) => {
      Vue.prototype.req({
        url: '/v1/sysrule',
        Loading,
        data: {
          id
        },
        success: res => {
          if (res.code == 200) {
            if (res.data.editor) {
              res.data.editor = res.data.editor.replace(
                /\<img/gi,
                '<img style="width: 100%"'
              )
            }

            resolve(res.data)
          } else {
            reject(res)
          }
        }
      })
    })
  },

  /**
   * @description: 前往帮助页面
   * @param {*} e
   * @return {*}
   */
  toHelp (e = '') {
    console.log(e)
    this.to({
      url: '/pages/help/help',
      query: {
        id: e
      }
    })
  },

  /**
   * @description: 前往规则页面
   * @param {*} e
   * @return {*}
   */
  toRule (e) {
    console.log(e)
    this.to({
      url: '/pages/index/rule',
      query: {
        id: e
      }
    })
  },

  /**
   * @description: 添加订阅
   * @return {*}
   */
  addWxMsg (e) {
    return new Promise((resolve, reject) => {
      Vue.prototype.req({
        url: '/wxmessage/add',
        data: {
          data: e
        },
        loading: true,
        success: res => {
          console.log(res)
          if (res.code == 200) {
            resolve(true)
          }
        }
      })
    })
  },

  /* ##################################### 当前应用方法-end ##################################### */

  noLoginTo (url) {
    // 获取当前页面栈
    let pages = getCurrentPages()
    // 数组中索引最大的页面--当前页面
    console.log('没有登陆`````````````````')
    let page = pages[pages.length - 1].route
    if (page == 'pages/login/login') {
      return
    }
    this.to({
      url,
      query: {
        ...pages[pages.length - 1].options,
        toPage: `/${page}`
      }
    })
  },

  /**
   * @description: 获取图片临时路径
   * @return {*}
   */
  imgTemp (e) {
    return new Promise((resolve, reject) => {
      uni.getImageInfo({
        src: e,
        success: ({ width, height, path, orientation, type }) => {
          resolve(path)
        },
        fail: error => {
          console.log('获取临时路径失败')
          reject(error)
        }
      })
    })
  },

  /**
   * @description: 拼接图片路径
   * @return {*}
   */
  joinImg (path) {
    let url = `${Vue.prototype.imgBaseUrl}${path}`
    return url
  },

  /**
   * @description: tost提示
   * @return {*}
   */
  toast (opt) {
    let title = opt.title || ''
    let icon = opt.icon || 'none'
    let mask = opt.mask || false
    let duration = opt.duration || 1500
    let position = opt.position || 'center'

    setTimeout(() => {
      uni.showToast({
        title,
        icon,
        mask,
        duration,
        position,
        success: () => {
          if (opt.success) {
            setTimeout(() => {
              opt.success()
            }, duration)
          }
        }
      })
    }, 100)
  },

  /**
   * @description: 规避连点
   * @param {*}
   * @return {*}
   */
  noDouble (fun, data, loading = false) {
    /**
     * $common.noDouble(fun,data)
     * fun  需要规避连点的方法
     * data 该方法需要用到的参数
     * loading  接口加载中状态
     * 传入方法不要写括号
     */

    /* 如果接口加载中,终止任何操作 */
    if (loading) {
      setTimeout(() => {
        uni.showToast({
          title: '请勿重复点击',
          icon: 'none',
          mask: false
        })
      }, 100)
      return
    }

    /* 如果定时器未结束 */
    if (this.data.timer) {
      setTimeout(() => {
        uni.showToast({
          title: '请勿重复点击',
          icon: 'none',
          mask: false
        })
      }, 100)

      /* 清除之前的定时器 */
      clearTimeout(this.data.timer)
      /* 重新设置定时器 */
      this.data.timer = setTimeout(() => {
        this.data.timer = null
      }, 1000)
      return
    }

    console.log(data && data)

    /* 设置第一次点击的定时器 */
    this.data.timer = setTimeout(() => {
      this.data.timer = null
    }, 1000)

    /* 如果有回调,使用回调并传入参数 */
    fun && fun(data && data)
  },

  /**
   * @description: 微信静默登录
   * @param {*}
   * @return {*}
   */
  wxMpLogin () {
    return new Promise((resolve, reject) => {
      uni.login({
        provider: 'weixin',
        success: result => {
          // console.log(result)
          resolve(result)
        },
        fail: error => {
          console.log(error)
        }
      })
    })
  },

  /**
   * @description: 获取当前页面栈中的页面参数
   * @param {*} e 添加的参数
   * @return {*}
   */
  getOptions (e = {}) {
    // 获取当前小程序的页面栈
    let pages = getCurrentPages()
    // 数组中索引最大的页面--当前页面
    let currentPage = pages[pages.length - 1]
    // 打印出当前页面中的 options
    console.log('common > getOptions', currentPage.options) //正常打印出 options 值
    let options = Object.assign(e, currentPage.options)
    console.log('common > getOptions', options)
    return options
  },

  /**
   * @description: 解析转译过的跳转参数
   * @param {*} e
   * @return {*}
   */
  parseQuery (e) {
    if (!e) {
      return
    }
    let data = JSON.parse(decodeURIComponent(e))
    return data
  },

  /**
   * @description: obj转为queryString
   * @param {*} e
   * @return {*}
   */
  qs (e) {
    let str = Object.keys(e).reduce((pre, item, i) => {
      return i === 0 ? `${pre}?${item}=${e[item]}` : `${pre}&${item}=${e[item]}`
    }, '')

    return str
  },

  /**
   * @description: 跳转页面
   * @param {*} type 跳转类型 1 navigate,2 redirect,3 switch,4 relaunch
   * @param {*} url
   * @param {*} query
   * @return {*}
   */
  to ({ type, url, query = {}, success, fail }) {
    if (!url) {
      return
    }

    if (Object.keys(query).length > 0) {
      url += this.qs(query)
    }

    let opt = {
      url,
      success: res => {
        success && success()
      },
      fail: err => {
        console.log(err)
        fail && fail()
      }
    }

    // console.log(type, url)

    switch (type) {
      case 2:
        uni.redirectTo(opt)
        break
      case 3:
        uni.switchTab(opt)
        break
      case 4:
        uni.reLaunch(opt)
        break
      default:
        uni.navigateTo(opt)
        break
    }
  },

  /**
   * @description: 返回上一页
   * @param {*} e
   * @return {*}
   */
  back (e) {
    /* 判断传入的是否是数字 */
    let pages = getCurrentPages()
    console.log('pgaes', pages)
    console.log(pages.length)
    if (pages.length >= 2) {
      if (typeof e === 'number' && !isNaN(e)) {
        /* 如果要跳转的长度小于页面栈数量 */
        if (e < pages.length) {
          console.log('进来了1')
          uni.navigateBack({ delta: e })
          /* 否则回首页 */
        } else {
          console.log('进来了2')
          uni.switchTab({ url: '/pages/tabBar/home' })
        }
        /* 默认返回上一级 */
      } else {
        console.log('进来了3')
        uni.navigateBack({ delta: 1 })
      }
    } else {
      uni.switchTab({ url: '/pages/tabBar/home' })
    }
  },

  /**
   * @description: 预览图片
   * @param {*}
   * @return {*}
   */
  previewImg (path) {
    if (!path) {
      return
    }
    uni.previewImage({
      urls: [path],
      current: 0,
      indicator: 'none',
      success: result => { },
      fail: error => { }
    })
  },

  /**
   * @description: 上传图片
   * @param {*}
   * @return {*}
   */
  uploadImg (callback) {
    uni.chooseImage({
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      count: 1,
      success: ({ tempFilePaths, tempFiles }) => {
        pathToBase64(tempFilePaths[0]).then(base64 => {
          Vue.prototype.req({
            url: '/upload/image',
            data: {
              image: base64
            },
            success: res => {
              console.log(res)
              if (res.code == 200) {
                callback && callback(res.data)
              }
            }
          })
        })
      },
      fail: error => { }
    })
  },

  /**
   * @description: 微信支付(小程序)
   * @param {*}
   * @return {*}
   */
  wxMpPay ({ provider, data, order_sn }) {
    console.log('wxdata', data)
    return new Promise((resolve, reject) => {
      uni.requestPayment({
        provider,
        ...data,
        success: res => {
          // console.log(res)
        },
        fail: err => {
          // console.log('common.wxMpPay-error', err)
        },
        complete: res => {
          console.log('complete (res)', res)
          if (res.errMsg == 'requestPayment:fail cancel') {
            this.toast({
              title: '取消支付',
              icon: 'none',
              duration: 500,
              success: () => {
                /* 取消订单 */
                this.orderCancel(order_sn)
              }
            })

            resolve('cancel')
          }
          if (res.errMsg == 'requestPayment:ok') {
            this.toast({
              title: '支付成功',
              icon: 'success',
              duration: 500,
              success: () => {
                resolve('success')
              }
            })
          }
        }
      })
    })
  },

  /**
   * @description: app支付
   * @param {*} data
   * @return {*}
   */
  appPay ({ provider, data, order_sn }) {
    console.log('common.appPay:data', data)
    return new Promise((resolve, reject) => {
      uni.requestPayment({
        provider,
        orderInfo: data,
        success: res => {
          console.log(res)
        },
        fail (err) {
          console.log('err', err)
        },
        complete: res => {
          console.log('complete (res)', res)
          if (
            res.errMsg == 'requestPayment:fail [payment微信:-2]User canceled' ||
            res.errMsg ==
            'requestPayment:fail [payment支付宝:62001]用户中途取消支付操作'
          ) {
            this.toast({
              title: '取消支付',
              icon: 'none',
              duration: 500,
              success: () => {
                /* 取消订单 */
                this.orderCancel(order_sn)
              }
            })

            resolve('cancel')
          }
          if (res.errMsg == 'requestPayment:ok') {
            this.toast({
              title: '支付成功',
              icon: 'success',
              duration: 500,
              success: () => {
                resolve('success')
              }
            })
          }
        }
      })
    })
  },

  /**
   *  @description 微信h5支付
   */
  wxH5Pay ({ provider, data, order_sn }) {
    console.log('provider:', provider, 'data:', data, 'order_sn:', order_sn)

    // jWeixin.config({
    //   // debug: true,
    //   appId: data.appId,
    //   timeStamp: data.timeStamp,
    //   nonceStr: data.nonceStr,
    //   signature: data.signature,
    //   signType: data.signType,
    //   jsApiList: ['chooseWXPay', 'getBrandWCPayRequest']
    // })

    jWeixin.config({
      // debug: true,
      appId: data.appId,
      timeStamp: data.timeStamp,
      nonceStr: data.nonceStr,
      signature: data.signature,
      jsApiList: ['chooseWXPay', 'getBrandWCPayRequest']
    })


    return new Promise((resolve, reject) => {
      jWeixin.ready(() => {
        jWeixin.chooseWXPay({
          appId: data.appId,
          timestamp: data.timeStamp,
          nonceStr: data.nonceStr,
          package: data.package,
          signType: data.signType,
          paySign: data.paySign
          ,
          success: (res) => {
            console.log(res)
            // this.toast({
            //   title: '支付成功',
            //   icon: 'success',
            //   duration: 500
            // })
            resolve('success')
          },
          cancel: (res) => {
            console.log('取消支付')
            this.toast({
              title: '取消支付',
              icon: 'none',
              duration: 500
            })
            resolve('cancel')
          },
          fail: (err) => {
            this.toast({
              title: '支付失败',
              icon: 'none',
              duration: 500
            })
            resolve('fail')
          }
        })
      })
    })
  },
  alipayH5 ({ provider, data, order_sn }) {
    uni.setStorageSync('order_sn', { provider: provider, order_sn: order_sn })
    location.href = data.qrcode
  },
  h5Pay ({ provider, data, order_sn, is_epay }) {
    return new Promise((resolve, reject) => {
      // console.log('333',data)
      // return
      switch (is_epay * 1) {
        case 1:
          // 易支付
          if (data.qrcode) {
            location.href = data.qrcode
          } else if (data.payurl) {
            location.href = data.payurl
          } else if (data.urlscheme) {
            location.href = data.urlscheme
          } else {
            this.toast({
              title: '调用支付失败，请重试',
              icon: 'none',
              duration: 500
            })
          }
          break
        case 2:
          // 码支付跳转
          if (data) {
            location.href = data
          } else {
            this.toast({
              title: '调用支付失败，请重试',
              icon: 'none',
              duration: 500
            })
          }
          break
      }
    })
  },
}
