(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["common/mescroll-uni/mescroll-body"],{

/***/ 707:
/*!*****************************************************************************************!*\
  !*** G:/PHP_dev/340-paopaoji/V3/paopao-v3-uinapp/common/mescroll-uni/mescroll-body.vue ***!
  \*****************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _mescroll_body_vue_vue_type_template_id_5d41596e___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./mescroll-body.vue?vue&type=template&id=5d41596e& */ 708);
/* harmony import */ var _mescroll_body_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./mescroll-body.vue?vue&type=script&lang=js& */ 710);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _mescroll_body_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _mescroll_body_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _mescroll_body_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./mescroll-body.vue?vue&type=style&index=0&lang=css& */ 714);
/* harmony import */ var _D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js */ 32);

var renderjs





/* normalize component */

var component = Object(_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _mescroll_body_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _mescroll_body_vue_vue_type_template_id_5d41596e___WEBPACK_IMPORTED_MODULE_0__["render"],
  _mescroll_body_vue_vue_type_template_id_5d41596e___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null,
  false,
  _mescroll_body_vue_vue_type_template_id_5d41596e___WEBPACK_IMPORTED_MODULE_0__["components"],
  renderjs
)

component.options.__file = "common/mescroll-uni/mescroll-body.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ 708:
/*!************************************************************************************************************************!*\
  !*** G:/PHP_dev/340-paopaoji/V3/paopao-v3-uinapp/common/mescroll-uni/mescroll-body.vue?vue&type=template&id=5d41596e& ***!
  \************************************************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_mescroll_body_vue_vue_type_template_id_5d41596e___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--17-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./mescroll-body.vue?vue&type=template&id=5d41596e& */ 709);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_mescroll_body_vue_vue_type_template_id_5d41596e___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_mescroll_body_vue_vue_type_template_id_5d41596e___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "recyclableRender", function() { return _D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_mescroll_body_vue_vue_type_template_id_5d41596e___WEBPACK_IMPORTED_MODULE_0__["recyclableRender"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "components", function() { return _D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_mescroll_body_vue_vue_type_template_id_5d41596e___WEBPACK_IMPORTED_MODULE_0__["components"]; });



/***/ }),

/***/ 709:
/*!************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--17-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!G:/PHP_dev/340-paopaoji/V3/paopao-v3-uinapp/common/mescroll-uni/mescroll-body.vue?vue&type=template&id=5d41596e& ***!
  \************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "recyclableRender", function() { return recyclableRender; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "components", function() { return components; });
var components
var render = function () {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
}
var recyclableRender = false
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ 710:
/*!******************************************************************************************************************!*\
  !*** G:/PHP_dev/340-paopaoji/V3/paopao-v3-uinapp/common/mescroll-uni/mescroll-body.vue?vue&type=script&lang=js& ***!
  \******************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_mescroll_body_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--13-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./mescroll-body.vue?vue&type=script&lang=js& */ 711);
/* harmony import */ var _D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_mescroll_body_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_mescroll_body_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_mescroll_body_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_mescroll_body_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_mescroll_body_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 711:
/*!*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--13-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!G:/PHP_dev/340-paopaoji/V3/paopao-v3-uinapp/common/mescroll-uni/mescroll-body.vue?vue&type=script&lang=js& ***!
  \*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {

var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 4);
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _mescrollUni = _interopRequireDefault(__webpack_require__(/*! ./mescroll-uni.js */ 712));
var _mescrollUniOption = _interopRequireDefault(__webpack_require__(/*! ./mescroll-uni-option.js */ 713));
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
// 引入mescroll-uni.js,处理核心逻辑
// 引入全局配置
var MescrollEmpty = function MescrollEmpty() {
  __webpack_require__.e(/*! require.ensure | common/mescroll-uni/components/mescroll-empty */ "common/mescroll-uni/components/mescroll-empty").then((function () {
    return resolve(__webpack_require__(/*! ./components/mescroll-empty.vue */ 1180));
  }).bind(null, __webpack_require__)).catch(__webpack_require__.oe);
};
var MescrollTop = function MescrollTop() {
  __webpack_require__.e(/*! require.ensure | common/mescroll-uni/components/mescroll-top */ "common/mescroll-uni/components/mescroll-top").then((function () {
    return resolve(__webpack_require__(/*! ./components/mescroll-top.vue */ 1187));
  }).bind(null, __webpack_require__)).catch(__webpack_require__.oe);
};
var _default = {
  components: {
    MescrollEmpty: MescrollEmpty,
    MescrollTop: MescrollTop
  },
  data: function data() {
    return {
      mescroll: {
        optDown: {},
        optUp: {}
      },
      // mescroll实例
      downHight: 0,
      //下拉刷新: 容器高度
      downRate: 0,
      // 下拉比率(inOffset: rate<1; outOffset: rate>=1)
      downLoadType: 4,
      // 下拉刷新状态 （inOffset：1， outOffset：2， showLoading：3， endDownScroll：4）
      upLoadType: 0,
      // 上拉加载状态：0（loading前），1（loading中），2（没有更多了）
      isShowEmpty: false,
      // 是否显示空布局
      isShowToTop: false,
      // 是否显示回到顶部按钮
      windowHeight: 0,
      // 可使用窗口的高度
      statusBarHeight: 0,
      // 状态栏高度
      isSafearea: false // 支持安全区
    };
  },

  props: {
    down: Object,
    // 下拉刷新的参数配置
    up: Object,
    // 上拉加载的参数配置
    top: [String, Number],
    // 下拉布局往下的偏移量 (支持20, "20rpx", "20px", "20%"格式的值, 其中纯数字则默认单位rpx, 百分比则相对于windowHeight)
    topbar: Boolean,
    // top的偏移量是否加上状态栏高度, 默认false (使用场景:取消原生导航栏时,配置此项可自动加上状态栏高度的偏移量)
    bottom: [String, Number],
    // 上拉布局往上的偏移量 (支持20, "20rpx", "20px", "20%"格式的值, 其中纯数字则默认单位rpx, 百分比则相对于windowHeight)
    safearea: Boolean,
    // bottom的偏移量是否加上底部安全区的距离, 默认false (需要适配iPhoneX时使用)
    navbar: {
      type: Boolean,
      default: true
    },
    // 高度是否减去导航栏和状态栏部分
    height: [String, Number] // 指定mescroll最小高度,默认windowHeight,使列表不满屏仍可下拉
  },

  computed: {
    // mescroll最小高度,默认windowHeight,使列表不满屏仍可下拉
    minHeight: function minHeight() {
      var minHeight = 0;
      if (this.height > 0) {
        minHeight = this.toPx(this.height);
      } else if (this.height && Number(this.height) < 0) {
        minHeight = this.toPx('100%') + uni.upx2px(this.height);
      } else {
        minHeight = this.toPx('100%');
      }
      if (this.navbar) {
        return minHeight - this.statusBarHeight - uni.upx2px(88) + 'px';
      } else {
        return minHeight + 'px';
      }
    },
    // 下拉布局往下偏移的距离 (px)
    numTop: function numTop() {
      return this.toPx(this.top) + (this.topbar ? this.statusBarHeight : 0);
    },
    padTop: function padTop() {
      return this.numTop + 'px';
    },
    // 上拉布局往上偏移 (px)
    numBottom: function numBottom() {
      return this.toPx(this.bottom);
    },
    padBottom: function padBottom() {
      return this.numBottom + 'px';
    },
    padBottomConstant: function padBottomConstant() {
      return this.isSafearea ? 'calc(' + this.padBottom + ' + constant(safe-area-inset-bottom))' : this.padBottom;
    },
    padBottomEnv: function padBottomEnv() {
      return this.isSafearea ? 'calc(' + this.padBottom + ' + env(safe-area-inset-bottom))' : this.padBottom;
    },
    // 是否为重置下拉的状态
    isDownReset: function isDownReset() {
      return this.downLoadType === 3 || this.downLoadType === 4;
    },
    // 过渡
    transition: function transition() {
      return this.isDownReset ? 'transform 300ms' : this.downTransition;
    },
    translateY: function translateY() {
      return this.downHight > 0 ? 'translateY(' + this.downHight + 'px)' : ''; // transform会使fixed失效,需注意把fixed元素写在mescroll之外
    },
    // 是否在加载中
    isDownLoading: function isDownLoading() {
      return this.downLoadType === 3;
    },
    // 旋转的角度
    downRotate: function downRotate() {
      return 'rotate(' + 360 * this.downRate + 'deg)';
    },
    // 文本提示
    downText: function downText() {
      switch (this.downLoadType) {
        case 1:
          return this.mescroll.optDown.textInOffset;
        case 2:
          return this.mescroll.optDown.textOutOffset;
        case 3:
          return this.mescroll.optDown.textLoading;
        case 4:
          return this.mescroll.optDown.textLoading;
        default:
          return this.mescroll.optDown.textInOffset;
      }
    }
  },
  methods: {
    //number,rpx,upx,px,% --> px的数值
    toPx: function toPx(num) {
      if (typeof num === 'string') {
        if (num.indexOf('px') !== -1) {
          if (num.indexOf('rpx') !== -1) {
            // "10rpx"
            num = num.replace('rpx', '');
          } else if (num.indexOf('upx') !== -1) {
            // "10upx"
            num = num.replace('upx', '');
          } else {
            // "10px"
            return Number(num.replace('px', ''));
          }
        } else if (num.indexOf('%') !== -1) {
          // 传百分比,则相对于windowHeight,传"10%"则等于windowHeight的10%
          var rate = Number(num.replace('%', '')) / 100;
          return this.windowHeight * rate;
        }
      }
      return num ? uni.upx2px(Number(num)) : 0;
    },
    //注册列表touchstart事件,用于下拉刷新
    touchstartEvent: function touchstartEvent(e) {
      this.mescroll.touchstartEvent(e);
    },
    //注册列表touchmove事件,用于下拉刷新
    touchmoveEvent: function touchmoveEvent(e) {
      this.mescroll.touchmoveEvent(e);
    },
    //注册列表touchend事件,用于下拉刷新
    touchendEvent: function touchendEvent(e) {
      this.mescroll.touchendEvent(e);
    },
    // 点击空布局的按钮回调
    emptyClick: function emptyClick() {
      this.$emit('emptyclick', this.mescroll);
    },
    // 点击回到顶部的按钮回调
    toTopClick: function toTopClick() {
      this.mescroll.scrollTo(0, this.mescroll.optUp.toTop.duration); // 执行回到顶部
      this.$emit('topclick', this.mescroll); // 派发点击回到顶部按钮的回调
    }
  },
  // 使用created初始化mescroll对象; 如果用mounted部分css样式编译到H5会失效
  created: function created() {
    var vm = this;
    var diyOption = {
      // 下拉刷新的配置
      down: {
        inOffset: function inOffset(mescroll) {
          vm.downLoadType = 1; // 下拉的距离进入offset范围内那一刻的回调 (自定义mescroll组件时,此行不可删)
        },
        outOffset: function outOffset(mescroll) {
          vm.downLoadType = 2; // 下拉的距离大于offset那一刻的回调 (自定义mescroll组件时,此行不可删)
        },
        onMoving: function onMoving(mescroll, rate, downHight) {
          // 下拉过程中的回调,滑动过程一直在执行;
          vm.downHight = downHight; // 设置下拉区域的高度 (自定义mescroll组件时,此行不可删)
          vm.downRate = rate; //下拉比率 (inOffset: rate<1; outOffset: rate>=1)
        },
        showLoading: function showLoading(mescroll, downHight) {
          vm.downLoadType = 3; // 显示下拉刷新进度的回调 (自定义mescroll组件时,此行不可删)
          vm.downHight = downHight; // 设置下拉区域的高度 (自定义mescroll组件时,此行不可删)
        },
        endDownScroll: function endDownScroll(mescroll) {
          vm.downLoadType = 4; // 结束下拉 (自定义mescroll组件时,此行不可删)
          vm.downHight = 0; // 设置下拉区域的高度 (自定义mescroll组件时,此行不可删)
        },

        // 派发下拉刷新的回调
        callback: function callback(mescroll) {
          vm.$emit('down', mescroll);
        }
      },
      // 上拉加载的配置
      up: {
        // 显示加载中的回调
        showLoading: function showLoading() {
          vm.upLoadType = 1;
        },
        // 显示无更多数据的回调
        showNoMore: function showNoMore() {
          vm.upLoadType = 2;
        },
        // 隐藏上拉加载的回调
        hideUpScroll: function hideUpScroll() {
          vm.upLoadType = 0;
        },
        // 空布局
        empty: {
          onShow: function onShow(isShow) {
            // 显示隐藏的回调
            vm.isShowEmpty = isShow;
          }
        },
        // 回到顶部
        toTop: {
          onShow: function onShow(isShow) {
            // 显示隐藏的回调
            vm.isShowToTop = isShow;
          }
        },
        // 派发上拉加载的回调
        callback: function callback(mescroll) {
          vm.$emit('up', mescroll);
        }
      },
      // 显示请求失败
      showErr: function showErr() {
        vm.upLoadType = 3;
      }
    };
    _mescrollUni.default.extend(diyOption, _mescrollUniOption.default); // 混入全局的配置
    var myOption = JSON.parse(JSON.stringify({
      down: vm.down,
      up: vm.up
    })); // 深拷贝,避免对props的影响
    _mescrollUni.default.extend(myOption, diyOption); // 混入具体界面的配置

    // 初始化MeScroll对象
    vm.mescroll = new _mescrollUni.default(myOption, true); // 传入true,标记body为滚动区域
    // init回调mescroll对象
    vm.$emit('init', vm.mescroll);

    // 设置高度
    var sys = uni.getSystemInfoSync();
    if (sys.windowHeight) vm.windowHeight = sys.windowHeight;
    if (sys.statusBarHeight) vm.statusBarHeight = sys.statusBarHeight;
    // 使down的bottomOffset生效
    vm.mescroll.setBodyHeight(sys.windowHeight);
    // mescroll-body在Android小程序下拉会卡顿,无法像mescroll-uni那样通过设置"disableScroll":true解决,只能用动画过渡缓解

    if (sys.platform == "android") vm.downTransition = 'transform 200ms';

    // 因为使用的是page的scroll,这里需自定义scrollTo
    vm.mescroll.resetScrollTo(function (y, t) {
      uni.pageScrollTo({
        scrollTop: y,
        duration: t
      });
    });

    // 具体的界面如果不配置up.toTop.safearea,则取本vue的safearea值
    if (sys.platform == "ios") {
      vm.isSafearea = vm.safearea;
      if (vm.up && vm.up.toTop && vm.up.toTop.safearea != null) {} else {
        vm.mescroll.optUp.toTop.safearea = vm.safearea;
      }
    } else {
      vm.isSafearea = false;
      vm.mescroll.optUp.toTop.safearea = false;
    }
  }
};
exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 2)["default"]))

/***/ }),

/***/ 714:
/*!**************************************************************************************************************************!*\
  !*** G:/PHP_dev/340-paopaoji/V3/paopao-v3-uinapp/common/mescroll-uni/mescroll-body.vue?vue&type=style&index=0&lang=css& ***!
  \**************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_2_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_mescroll_body_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./node_modules/mini-css-extract-plugin/dist/loader.js??ref--6-oneOf-1-0!./node_modules/css-loader/dist/cjs.js??ref--6-oneOf-1-1!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--6-oneOf-1-2!./node_modules/postcss-loader/src??ref--6-oneOf-1-3!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./mescroll-body.vue?vue&type=style&index=0&lang=css& */ 715);
/* harmony import */ var _D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_2_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_mescroll_body_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_2_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_mescroll_body_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_2_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_mescroll_body_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_2_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_mescroll_body_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_2_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_mescroll_body_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 715:
/*!******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js??ref--6-oneOf-1-0!./node_modules/css-loader/dist/cjs.js??ref--6-oneOf-1-1!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--6-oneOf-1-2!./node_modules/postcss-loader/src??ref--6-oneOf-1-3!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!G:/PHP_dev/340-paopaoji/V3/paopao-v3-uinapp/common/mescroll-uni/mescroll-body.vue?vue&type=style&index=0&lang=css& ***!
  \******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(false) { var cssReload; }
  

/***/ })

}]);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/common/mescroll-uni/mescroll-body.js.map
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'common/mescroll-uni/mescroll-body-create-component',
    {
        'common/mescroll-uni/mescroll-body-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('2')['createComponent'](__webpack_require__(707))
        })
    },
    [['common/mescroll-uni/mescroll-body-create-component']]
]);
