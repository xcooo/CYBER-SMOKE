<!--
 * @Date: 2022-04-15 09:05:47
 * @LastEditTime: 2025-06-12 10:02:30
 * @Description: content
-->
<script>
export default {
  onLaunch: function () {
    uni.hideTabBar({
      animation: true
    });
    this.$store.commit('setDrawMusic')
    console.log('App Launch')
    // #ifdef H5
    let userAgentInfo = navigator.userAgent;
    let Agents = new Array("Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod");
    //pc

    if (
      !Agents.some(item => userAgentInfo.toLowerCase().includes(item.toLowerCase())) &&
      !(self.frameElement && self.frameElement.tagName == "IFRAME")
    ) {
      let ifrTag = document.createElement("iframe");
      document.body.innerHTML = "";
      ifrTag.setAttribute("src", location.href);
      let styleObj = {
        width: "350px",
        height: "100%",
        position: "absolute",
        left: "50%",
        border: "none",
        transform: "translateX(-50%)",
      };
      Object.entries(styleObj).forEach(([key, value]) => {
        ifrTag.style[key] = value;
      });
      document.body.append(ifrTag);
    }
    // #endif
  },
  onShow: function () {
    console.log('App Show')
    /* 微信小程序检测更新 */
    // #ifdef MP-WEIXIN
    this.checkUpdate()
    // #endif

    // #ifdef H5
    console.log("%cxcooo ", "font-size: 50px;background: #EEE url(data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAECAIAAAAmkwkpAAAAHklEQVQImWNkYGBgYGD4//8/A5wF5SBYyAr+//8PAPOCFO0Q2zq7AAAAAElFTkSuQmCC) repeat; text-shadow: 5px -5px black, 4px -4px white;  font-weight: bold;  -webkit-text-fill-color: transparent;  -webkit-background-clip: text;");
    console.log("%c%s", "color: blue; font-size: 16px;", "邮箱602006050@qq.com \n\n你可以通过 https://www.xcooo.cn 了解我们 ");
    // #endif

  },
  onHide: function () {
    console.log('App Hide')
  },

  methods: {
    /**
     * @description: 检测小程序更新
     * @return {*}
     */
    checkUpdate () {
      const upOpt = uni.getUpdateManager()

      /* 检查是否有新版本 */
      upOpt.onCheckForUpdate(res => {
        /* 发现新版本 */
        if (res.hasUpdate) {
          /* 新版本下载完成 */
          upOpt.onUpdateReady(() => {
            uni.showModal({
              title: '更新提示',
              content: '发现新版本,是否立即更新?',
              showCancel: true,
              confirmText: '更新',
              success: ({ confirm, cancel }) => {
                /* 用户同意,立即更新 */
                if (confirm) {
                  upOpt.applyUpdate()
                }

                /* 用户取消更新,再次提示 */
                if (cancel) {
                  uni.showModal({
                    title: '提示',
                    content: '忽略更新将无法体验完整功能,确定忽略吗?',
                    showCancel: true,
                    cancelText: '继续更新',
                    confirmText: '忽略',
                    success: ({ confirm, cancel }) => {
                      if (cancel) {
                        upOpt.applyUpdate()
                      }
                    }
                  })
                }
              }
            })
          })

          /* 新版本下载失败处理 */
          upOpt.onUpdateFailed(() => {
            uni.showModal({
              title: '更新提示',
              content: '新版本已上线,请删除本小程序后重新搜索进入',
              showCancel: false,
              success: ({ confirm, cancel }) => { }
            })
          })
        }
      })
    }
  }
}
</script>

<style>
@import url("/static/css/home.css");
</style>

<style lang="scss">
@import '@/style/common.scss';
@import 'uview-ui/index.scss';
/*每个页面公共css */

@keyframes prize-fade-in {
  0% {
    transform: scale(0.5);
    opacity: 0;
  }

  100% {
    opacity: 1;
    transform: scale(1);
  }
}

::-webkit-scrollbar {
  display: none;
  width: 0;
  height: 0;
  color: transparent;
}

page {
  min-height: 100%;
  background: #f3f8fb;
}

image {
  width: 100%;
  height: 100%;
  border-radius: inherit;
}

/* #ifdef MP */
cimage {
  border-radius: inherit;
  line-height: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

/* #endif */
.c_image {
  border-radius: inherit;
  line-height: 0;
  width: 100%;
  height: 100%;
}

.icon {
  display: flex;
  justify-content: center;
  align-items: center;
}

.flex-center {
  display: flex;
  justify-content: center;
  align-items: center;
}

.status-bar {
  width: 100%;
  height: var(--status-bar-height);
}

.hang1 {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.hang2 {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  word-wrap: break-word;
  word-break: break-all;
}

button.hide {
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  z-index: 2;
  opacity: 0;
}

.common_bg {
  background-repeat: no-repeat;
  background-position: 0 0;
  background-size: 100% 100%;
}

.relative {
  position: relative;
}
</style>
