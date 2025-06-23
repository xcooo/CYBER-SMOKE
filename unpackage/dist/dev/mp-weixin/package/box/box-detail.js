(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["package/box/box-detail"],{

/***/ 480:
/*!*************************************************************************************************!*\
  !*** G:/PHP_dev/340-paopaoji/V3/paopao-v3-uinapp/main.js?{"page":"package%2Fbox%2Fbox-detail"} ***!
  \*************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(wx, createPage) {

var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 4);
__webpack_require__(/*! uni-pages */ 26);
var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 25));
var _boxDetail = _interopRequireDefault(__webpack_require__(/*! ./package/box/box-detail.vue */ 481));
// @ts-ignore
wx.__webpack_require_UNI_MP_PLUGIN__ = __webpack_require__;
createPage(_boxDetail.default);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/wx.js */ 1)["default"], __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 2)["createPage"]))

/***/ }),

/***/ 481:
/*!******************************************************************************!*\
  !*** G:/PHP_dev/340-paopaoji/V3/paopao-v3-uinapp/package/box/box-detail.vue ***!
  \******************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _box_detail_vue_vue_type_template_id_5cb6414e___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./box-detail.vue?vue&type=template&id=5cb6414e& */ 482);
/* harmony import */ var _box_detail_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./box-detail.vue?vue&type=script&lang=js& */ 484);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _box_detail_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _box_detail_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _box_detail_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./box-detail.vue?vue&type=style&index=0&lang=scss& */ 486);
/* harmony import */ var _D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js */ 32);

var renderjs





/* normalize component */

var component = Object(_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _box_detail_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _box_detail_vue_vue_type_template_id_5cb6414e___WEBPACK_IMPORTED_MODULE_0__["render"],
  _box_detail_vue_vue_type_template_id_5cb6414e___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null,
  false,
  _box_detail_vue_vue_type_template_id_5cb6414e___WEBPACK_IMPORTED_MODULE_0__["components"],
  renderjs
)

component.options.__file = "package/box/box-detail.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ 482:
/*!*************************************************************************************************************!*\
  !*** G:/PHP_dev/340-paopaoji/V3/paopao-v3-uinapp/package/box/box-detail.vue?vue&type=template&id=5cb6414e& ***!
  \*************************************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_box_detail_vue_vue_type_template_id_5cb6414e___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--17-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./box-detail.vue?vue&type=template&id=5cb6414e& */ 483);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_box_detail_vue_vue_type_template_id_5cb6414e___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_box_detail_vue_vue_type_template_id_5cb6414e___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "recyclableRender", function() { return _D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_box_detail_vue_vue_type_template_id_5cb6414e___WEBPACK_IMPORTED_MODULE_0__["recyclableRender"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "components", function() { return _D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_box_detail_vue_vue_type_template_id_5cb6414e___WEBPACK_IMPORTED_MODULE_0__["components"]; });



/***/ }),

/***/ 483:
/*!*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--17-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!G:/PHP_dev/340-paopaoji/V3/paopao-v3-uinapp/package/box/box-detail.vue?vue&type=template&id=5cb6414e& ***!
  \*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "recyclableRender", function() { return recyclableRender; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "components", function() { return components; });
var components
try {
  components = {
    uniNavBar: function () {
      return __webpack_require__.e(/*! import() | uni_modules/uni-nav-bar/components/uni-nav-bar/uni-nav-bar */ "uni_modules/uni-nav-bar/components/uni-nav-bar/uni-nav-bar").then(__webpack_require__.bind(null, /*! @/uni_modules/uni-nav-bar/components/uni-nav-bar/uni-nav-bar.vue */ 841))
    },
    lffBarrage: function () {
      return __webpack_require__.e(/*! import() | components/lff-barrage/lff-barrage */ "components/lff-barrage/lff-barrage").then(__webpack_require__.bind(null, /*! @/components/lff-barrage/lff-barrage.vue */ 1074))
    },
    cimage: function () {
      return __webpack_require__.e(/*! import() | components/cimage/cimage */ "components/cimage/cimage").then(__webpack_require__.bind(null, /*! @/components/cimage/cimage.vue */ 814))
    },
    uniIcons: function () {
      return Promise.all(/*! import() | uni_modules/uni-icons/components/uni-icons/uni-icons */[__webpack_require__.e("common/vendor"), __webpack_require__.e("uni_modules/uni-icons/components/uni-icons/uni-icons")]).then(__webpack_require__.bind(null, /*! @/uni_modules/uni-icons/components/uni-icons/uni-icons.vue */ 833))
    },
    gbroMarquee: function () {
      return __webpack_require__.e(/*! import() | components/gbro-marquee/gbro-marquee */ "components/gbro-marquee/gbro-marquee").then(__webpack_require__.bind(null, /*! @/components/gbro-marquee/gbro-marquee.vue */ 989))
    },
    uGap: function () {
      return __webpack_require__.e(/*! import() | uview-ui/components/u-gap/u-gap */ "uview-ui/components/u-gap/u-gap").then(__webpack_require__.bind(null, /*! @/uview-ui/components/u-gap/u-gap.vue */ 928))
    },
    uniPopup: function () {
      return Promise.all(/*! import() | components/uni-popup/uni-popup */[__webpack_require__.e("common/vendor"), __webpack_require__.e("components/uni-popup/uni-popup")]).then(__webpack_require__.bind(null, /*! @/components/uni-popup/uni-popup.vue */ 898))
    },
    evanSwitch: function () {
      return __webpack_require__.e(/*! import() | components/evan-switch/evan-switch */ "components/evan-switch/evan-switch").then(__webpack_require__.bind(null, /*! @/components/evan-switch/evan-switch.vue */ 907))
    },
  }
} catch (e) {
  if (
    e.message.indexOf("Cannot find module") !== -1 &&
    e.message.indexOf(".vue") !== -1
  ) {
    console.error(e.message)
    console.error("1. 排查组件名称拼写是否正确")
    console.error(
      "2. 排查组件是否符合 easycom 规范，文档：https://uniapp.dcloud.net.cn/collocation/pages?id=easycom"
    )
    console.error(
      "3. 若组件不符合 easycom 规范，需手动引入，并在 components 中注册该组件"
    )
  } else {
    throw e
  }
}
var render = function () {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  if (!_vm._isMounted) {
    _vm.e0 = function ($event) {
      return _vm.$common.back()
    }
    _vm.e1 = function ($event) {
      return _vm.$common.to({
        url: "/package/mine/bag",
      })
    }
    _vm.e2 = function ($event) {
      return _vm.$common.toRule(2)
    }
    _vm.e3 = function ($event) {
      return _vm.$common.back()
    }
    _vm.e4 = function ($event) {
      return _vm.$common.to({
        url: "/package/mine/tou-su",
      })
    }
    _vm.e5 = function ($event) {
      return _vm.$common.to({
        url: "/package/box/log-invite",
      })
    }
    _vm.e6 = function ($event) {
      return _vm.$common.toRule(2)
    }
    _vm.e7 = function ($event) {
      return _vm.$common.noDouble(_vm.confirmSubmit, 1)
    }
  }
}
var recyclableRender = false
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ 484:
/*!*******************************************************************************************************!*\
  !*** G:/PHP_dev/340-paopaoji/V3/paopao-v3-uinapp/package/box/box-detail.vue?vue&type=script&lang=js& ***!
  \*******************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_box_detail_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--13-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./box-detail.vue?vue&type=script&lang=js& */ 485);
/* harmony import */ var _D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_box_detail_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_box_detail_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_box_detail_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_box_detail_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_box_detail_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 485:
/*!**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--13-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!G:/PHP_dev/340-paopaoji/V3/paopao-v3-uinapp/package/box/box-detail.vue?vue&type=script&lang=js& ***!
  \**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {

var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 4);
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _regenerator = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/regenerator */ 44));
var _toConsumableArray2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/toConsumableArray */ 18));
var _asyncToGenerator2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ 46));
var _defineProperty2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/defineProperty */ 11));
var _index = __webpack_require__(/*! ../../js_sdk/mmmm-image-tools/index */ 67);
var _vuex = __webpack_require__(/*! vuex */ 35);
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
var _default = {
  data: function data() {
    var _ref;
    return _ref = {
      optionsData: '',
      pageLoading: true,
      // 下拉刷新的配置(可选, 绝大部分情况无需配置)
      downOption: {
        auto: false,
        use: false
      },
      // 上拉加载的配置(可选, 绝大部分情况无需配置)
      upOption: {
        auto: false,
        page: {
          size: 20 // 每页数据的数量,默认10
        }
      },

      listData: [],
      baoTotal: 0,
      baoList: [{
        id: '',
        title: '全部',
        rate: 100
      }],
      rateCur: 0,
      barrageTimer: null,
      btnList: [],
      btnCur: 0,
      payTypeList: [{
        id: 3,
        icon: 'https://xcooo.oss-cn-hangzhou.aliyuncs.com/wxapp/wei_xin.png',
        title: '微信支付'
      }
      // {
      //   id: 4,
      //   icon: 'https://xcooo.oss-cn-hangzhou.aliyuncs.com/wxapp/alipay.png',
      //   title: '支付宝支付'
      // }

      // {
      //   id: 2,
      //   icon: '',
      //   title: '余额支付'
      // }
      ],

      payTypeCur: 0,
      agree: true,
      pageData: '',
      logList: [],
      barrageCur: 0,
      swiperCur: 0,
      commentList: [],
      commentTotal: 0,
      orderData: '',
      ruleData: '',
      shareData: '',
      curDetail: ''
    }, (0, _defineProperty2.default)(_ref, "ruleData", ''), (0, _defineProperty2.default)(_ref, "redBagConfig", ''), (0, _defineProperty2.default)(_ref, "redOpenRes", ''), (0, _defineProperty2.default)(_ref, "ruleType", ''), (0, _defineProperty2.default)(_ref, "userInfo", ''), _ref;
  },
  computed: _objectSpread({}, (0, _vuex.mapGetters)(['sysConfig'])),
  onShareAppMessage: function onShareAppMessage() {
    var userInfo = uni.getStorageSync('userInfo');
    return {
      title: "\u5FEB\u6765\u62BD\u53D6".concat(this.pageData.box.title, "!"),
      imageUrl: this.pageData.box.thumb,
      path: "/package/box/box-detail?id=".concat(this.pageData.box.id, "&userId=").concat(userInfo && userInfo.id || '')
    };
  },
  onLoad: function onLoad(options) {
    var _this2 = this;
    if (options.scene) {
      var arr = options.scene.split('_');
      this.optionsData = {
        userId: arr[1],
        id: arr[2]
      };
    } else {
      this.optionsData = options;
    }
    console.log(this.optionsData, '-----');
    uni.$on('again', function (data) {
      _this2.confirmSubmit(0);
    });
    this.$store.dispatch('getUserInfo').then(function (res) {
      console.log(res);
      _this2.userInfo = res.data;
    });
  },
  onReady: function onReady() {
    var _this3 = this;
    return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee() {
      return _regenerator.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _this3.getComment();
              _this3.getDraw();
              _this3.$common.getRule(3, true).then(function (res) {
                _this3.ruleData = res;
              });
              _this3.getLog();
              _context.next = 6;
              return _this3.getData();
            case 6:
              _this3.mescroll.resetUpScroll();
              _this3.mescroll.scrollTo(0, 0);
              console.log('pageReady');
              _this3.$nextTick(function () {
                setTimeout(function () {
                  _this3.pageLoading = false;
                }, 1000);
              });
            case 10:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }))();
  },
  onUnload: function onUnload() {
    clearInterval(this.barrageTimer);
    clearInterval(this.checkTimer);
    clearInterval(this.cancelTimer);
    this.barrageTimer = null;
    console.log('移除事件');
    this.cancelCheckPayStatus();
    uni.$off('again');
  },
  methods: {
    checkPayStatus: function checkPayStatus() {
      var _this4 = this;
      var _this = this;
      var order_info = uni.getStorageSync('order_info_box');
      _this.checkTimer = setInterval(function () {
        console.log(order_info, '获取到的订单数据');

        // 查询订单
        _this4.req({
          url: '/v1/pay/orderStatus',
          data: {
            order_sn: order_info.order_sn
          },
          Loading: true,
          success: function success(res) {
            switch (res.code) {
              case 200:
                _this.cancelCheckPayStatus();
                _this4.$common.toast({
                  title: '支付成功',
                  icon: 'success',
                  duration: 1500,
                  success: function success() {
                    _this4.$common.to({
                      type: 1,
                      url: '/pages/index/draw',
                      query: {
                        id: res.data.id,
                        order_sn: order_info.order_sn,
                        drawNum: res.data.box_num
                      }
                    });
                  }
                });
                break;
              case 203:
                _this.cancelCheckPayStatus();
                _this4.$common.toast({
                  title: '支付失败',
                  icon: 'none',
                  duration: 500
                });
                break;
            }
          }
        });
      }, 2 * 1000);
      _this.cancelTimer = setTimeout(function () {
        _this.cancelCheckPayStatus();
      }, 60 * 1000);
    },
    cancelCheckPayStatus: function cancelCheckPayStatus() {
      uni.removeStorageSync('order_info_box');
      // this.$common.toast({
      // 	title: '支付超时',
      // 	icon: 'none',
      // 	duration: 500
      // })
      if (this.checkTimer) {
        clearTimeout(this.checkTimer);
      }
      if (this.cancelTimer) {
        clearInterval(this.cancelTimer);
      }
    },
    /**
     * @description: 确认购买规则
     * @return {*}
     */
    confirmBuyRule: function confirmBuyRule() {
      this.agree = true;
      this.closeRulePop();
    },
    /**
     * @description: 去提现
     * @return {*}
     */
    toWithdrawal: function toWithdrawal() {
      this.closeBagRes();
      this.$common.to({
        url: '/package/mine/withdrawal'
      });
    },
    /**
     * @description: 开启红包
     * @return {*}
     */
    submitOpenRedBag: function submitOpenRedBag(e) {
      var _this5 = this;
      if (this.redBagConfig.redpack_times * 1 <= 0) {
        return;
      }
      this.closeBagOpen();
      this.req({
        url: '/v1/redpack/open',
        data: {},
        Loading: false,
        success: function success(res) {
          if (res.code == 200) {
            _this5.redOpenRes = res.data;
            _this5.openBagRes();
            _this5.getRedBagConfig(true);
          }
        }
      });
    },
    /**
     * @description: 获取红包配置
     * @return {*}
     */
    getRedBagConfig: function getRedBagConfig() {
      var _this6 = this;
      var Loading = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      return new Promise(function (resolve, reject) {
        _this6.req({
          url: '/v1/config/redpack',
          data: {},
          Loading: Loading,
          success: function success(res) {
            if (res.code == 200) {
              _this6.redBagConfig = res.data;
              resolve();
            }
          }
        });
      });
    },
    /**
     * @description: 关闭规则弹窗
     * @return {*}
     */
    closeRulePop: function closeRulePop() {
      this.$refs.rulePop.close();
    },
    /**
     * @description: 打开规则弹窗
     * @return {*}
     */
    openRulePop: function openRulePop() {
      this.$refs.rulePop.open();
    },
    /**
     * @description: 获取规则
     * @return {*}
     */
    getRule: function getRule(e) {
      var _this7 = this;
      this.$common.getRule(e).then(function (res) {
        _this7.ruleData = res;
        _this7.ruleType = 'red_bag';
        _this7.openRulePop();
      });
    },
    /**
     * @description: 关闭获得红包弹窗
     * @return {*}
     */
    closeBagRes: function closeBagRes() {
      this.$refs.bagRes.close();
    },
    /**
     * @description: 打开获得红包弹窗
     * @return {*}
     */
    openBagRes: function openBagRes() {
      this.$refs.bagRes.open();
    },
    /**
     * @description: 关闭开启红包弹窗
     * @return {*}
     */
    closeBagOpen: function closeBagOpen() {
      this.$refs.bagOpen.close();
    },
    /**
     * @description: 打开开启红包弹窗
     * @return {*}
     */
    openBagOpen: function openBagOpen() {
      if (this.redBagConfig.redpack_times * 1 <= 0) {
        this.$common.toast({
          title: '积分不足'
        });
        return;
      }
      this.$refs.bagOpen.open();
    },
    /**
     * @description: 关闭详情弹窗
     * @return {*}
     */
    closeDetailPop: function closeDetailPop() {
      this.$refs.detailPop.close();
    },
    /**
     * @description: 打开详情弹窗
     * @return {*}
     */
    openDetailPop: function openDetailPop(e) {
      this.curDetail = '';
      if (e.editor) {
        e.editor = e.editor.replace(/\<img/gi, '<img style="width: 100%;vertical-align: middle;"');
      }
      this.curDetail = e;
      this.$refs.detailPop.open();
    },
    /**
     * @description: 保存图片
     * @param {*} e
     * @return {*}
     */
    saveImg: function saveImg() {
      var _this8 = this;
      uni.showLoading({
        title: '保存中',
        mask: true
      });
      (0, _index.base64ToPath)(this.shareData).then(function (res) {
        uni.saveImageToPhotosAlbum({
          filePath: res,
          success: function success(result) {
            uni.hideLoading();
            _this8.closePicPop();
            _this8.$common.toast({
              title: '保存成功,请前往相册查看'
            });
          },
          fail: function fail(error) {
            uni.hideLoading();
            _this8.$common.toast({
              title: '保存失败'
            });
          }
        });
      });
    },
    /**
     * @description: 关闭海报弹窗
     * @return {*}
     */
    closePicPop: function closePicPop() {
      this.$refs.picPop.close();
    },
    /**
     * @description: 打开海报弹窗
     * @return {*}
     */
    openPicPop: function openPicPop() {
      this.closeSharePop();
      this.closeRedBagPop();
      this.$refs.picPop.open();
    },
    /**
     * @description: 获取海报
     * @return {*}
     */
    getSharePic: function getSharePic() {
      var _this9 = this;
      this.req({
        url: '/v1/luckbox/share/poster',
        data: {
          id: this.pageData.box.id
        },
        Loading: false,
        success: function success(res) {
          if (res.code == 200) {
            _this9.shareData = res.data;
            _this9.openPicPop();
          }
        }
      });
    },
    /**
     * @description: 获取商品列表数据
     * @param {*}
     * @return {*}
     */
    getList: function getList(_ref2) {
      var _this10 = this;
      var num = _ref2.num,
        size = _ref2.size;
      this.req({
        url: '/v1/box/award',
        data: {
          page: num,
          per_page: size,
          box_id: this.optionsData.id,
          mark_id: this.baoList[this.rateCur].id
        },
        Loading: true,
        success: function success(res) {
          if (res.code == 200) {
            _this10.baoTotal = res.data.totals;
            if (num == 1) {
              _this10.listData = [];
            }
            _this10.listData = [].concat((0, _toConsumableArray2.default)(_this10.listData), (0, _toConsumableArray2.default)(res.data.data));
            _this10.mescroll.endBySize(res.data.data.length, res.data.total);
          }
        }
      });
    },
    /**
     * @description: 保底奖品切换
     * @param {*} e
     * @return {*}
     */
    baoChange: function baoChange(e) {
      this.rateCur = e;
      this.listData = [];
      this.mescroll.resetUpScroll();
    },
    /**
     * @description: 试玩
     * @return {*}
     */
    tryPlay: function tryPlay() {
      this.$common.to({
        url: '/pages/index/draw',
        query: {
          id: this.pageData.box.id,
          drawNum: 1,
          type: 'play'
        }
      });
    },
    /**
     * @description: 获取抽奖方式
     * @return {*}
     */
    getDraw: function getDraw() {
      var _this11 = this;
      return new Promise(function (resolve, reject) {
        _this11.req({
          url: '/v1/box/draw',
          data: {},
          Loading: true,
          success: function success(res) {
            if (res.code == 200) {
              _this11.btnList = res.data;
              resolve();
            }
          }
        });
      });
    },
    /**
     * @description: 确认/提交订单
     * @param {*} e 0:确认订单,1:提交订单
     * @return {*}
     */
    confirmSubmit: function confirmSubmit(e) {
      var _this12 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee2() {
        var data;
        return _regenerator.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                if (!(_this12.btnList.length == 0)) {
                  _context2.next = 3;
                  break;
                }
                _context2.next = 3;
                return _this12.getDraw();
              case 3:
                if (!(e == 1 && !_this12.agree)) {
                  _context2.next = 8;
                  break;
                }
                _this12.$common.toast({
                  title: '请阅读并同意抽盒规则'
                });
                _this12.ruleType = 'buy';
                _this12.$common.getRule(3, true).then(function (res) {
                  _this12.ruleData = res;
                  _this12.openRulePop();
                });
                return _context2.abrupt("return");
              case 8:
                data = {
                  id: _this12.pageData.box.id,
                  draw_id: _this12.btnList[_this12.btnCur].id,
                  invite_user_id: _this12.optionsData.userId || '',
                  pay_type: _this12.payTypeList[_this12.payTypeCur].id,
                  submit: e
                };
                _this12.req({
                  url: '/v1/box/order',
                  data: data,
                  success: function success(res) {
                    if (res.code == 200) {
                      if (e == 0) {
                        _this12.orderData = res.data;
                        _this12.openOrderPop();
                      } else {
                        _this12.closeOrderPop();
                        if (res.data.pay_money * 1 > 0) {
                          var order_info = {
                            order_sn: res.data.order_sn
                          };
                          uni.setStorageSync('order_info_box', order_info);
                          _this12.checkPayStatus();
                          var params = _objectSpread(_objectSpread({}, res.data), {}, {
                            returnUrl: "/package/box/box-detail?id=".concat(_this12.optionsData.id)
                          });
                          _this12.$common.orderPay(params).then(function (res1) {
                            if (res1 == 'success') {
                              _this12.$common.toast({
                                title: '支付成功',
                                icon: 'success',
                                duration: 1500,
                                success: function success() {
                                  _this12.$common.to({
                                    type: 1,
                                    url: '/pages/index/draw',
                                    query: {
                                      id: _this12.pageData.box.id,
                                      order_sn: res.data.order_sn,
                                      drawNum: _this12.orderData.box.num
                                    }
                                  });
                                }
                              });
                            }
                          });
                        } else {
                          _this12.$common.toast({
                            title: '支付成功',
                            duration: 1500,
                            success: function success() {
                              _this12.$common.to({
                                type: 1,
                                url: '/pages/index/draw',
                                query: {
                                  id: _this12.pageData.box.id,
                                  order_sn: res.data.order_sn,
                                  drawNum: _this12.orderData.box.num
                                }
                              });
                            }
                          });
                        }
                      }
                    }
                  }
                });
              case 10:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }))();
    },
    /**
     * @description: 获取评论
     * @return {*}
     */
    getComment: function getComment() {
      var _this13 = this;
      this.req({
        url: '/v1/box/rating',
        data: {
          id: this.optionsData.id,
          page: 1,
          per_page: 1
        },
        Loading: true,
        success: function success(res) {
          if (res.code == 200) {
            _this13.commentList = res.data.data;
            _this13.commentTotal = res.data.total;
          }
        }
      });
    },
    /**
     * @description: 轮播图切换
     * @param {*} e
     * @return {*}
     */
    swiperChange: function swiperChange(e) {
      this.swiperCur = e.detail.current;
    },
    /**
     * @description: 中奖记录
     * @return {*}
     */
    getLog: function getLog() {
      var _this14 = this;
      this.req({
        url: '/v1/box/log',
        data: {},
        Loading: true,
        success: function success(res) {
          if (res.code == 200) {
            _this14.logList = res.data;
            _this14.runBarrage();
          }
        }
      });
    },
    /**
     * @description: 获取数据
     * @return {*}
     */
    getData: function getData() {
      var _this15 = this;
      return new Promise(function (resolve, reject) {
        _this15.req({
          url: '/v1/box/info',
          data: {
            id: _this15.optionsData.id
          },
          Loading: true,
          success: function success(res) {
            if (res.code == 200) {
              var _this15$baoList;
              _this15.pageData = res.data;
              (_this15$baoList = _this15.baoList).push.apply(_this15$baoList, (0, _toConsumableArray2.default)(res.data.box.markList));
              resolve();
            }
          }
        });
      });
    },
    /**
     * @description: 前往评论列表
     * @return {*}
     */
    toComment: function toComment() {
      this.$common.to({
        url: '/package/box/comment-list',
        query: {
          id: this.pageData.box.id
        }
      });
    },
    /**
     * @description: 选择购买类型
     * @param {*} e
     * @return {*}
     */
    changeBuyType: function changeBuyType(e) {
      this.btnCur = e;
      this.confirmSubmit(0);
    },
    /**
     * @description: 切换支付方式
     * @return {*}
     */
    changePayType: function changePayType(e) {
      this.payTypeCur = e;

      // this.confirmSubmit(0)
    },
    /**
     * @description: 关闭订单弹窗
     * @return {*}
     */
    closeOrderPop: function closeOrderPop() {
      this.$refs.orderPop.close();
    },
    /**
     * @description: 打开订单弹窗
     * @return {*}
     */
    openOrderPop: function openOrderPop() {
      this.agree = true;
      this.$refs.orderPop.open();
    },
    /**
     * @description: 关闭红包弹窗
     * @return {*}
     */
    closeRedBagPop: function closeRedBagPop() {
      this.$refs.redBagPop.close();
    },
    /**
     * @description: 打开红包弹窗
     * @return {*}
     */
    openRedBagPop: function openRedBagPop() {
      var _this16 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee3() {
        return _regenerator.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return _this16.getRedBagConfig();
              case 2:
                _this16.$refs.redBagPop.open();
              case 3:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }))();
    },
    /**
     * @description: 关闭分享弹窗
     * @return {*}
     */
    closeSharePop: function closeSharePop() {
      this.$refs.sharePop.close();
    },
    /**
     * @description: 打开分享弹窗
     * @return {*}
     */
    openSharePop: function openSharePop() {
      this.$refs.sharePop.open();
    },
    /**
     * @description: 发送弹幕
     * @param {*}
     * @return {*}
     */
    runBarrage: function runBarrage() {
      var _this17 = this;
      this.barrageTimer = setInterval(function () {
        if (_this17.logList.length > 0) {
          _this17.$refs.detailBarrage.add({
            head_pic: _this17.logList[_this17.barrageCur].avatar,
            name: _this17.logList[_this17.barrageCur].nickName,
            times: _this17.logList[_this17.barrageCur].times,
            markTitle: _this17.logList[_this17.barrageCur].mark_title,
            prize: _this17.logList[_this17.barrageCur].thumb
          });
          _this17.barrageCur += 1;
          if (_this17.barrageCur == _this17.logList.length) {
            _this17.barrageCur = 0;
          }
        }
      }, 3000);
    }
  }
};
exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 2)["default"]))

/***/ }),

/***/ 486:
/*!****************************************************************************************************************!*\
  !*** G:/PHP_dev/340-paopaoji/V3/paopao-v3-uinapp/package/box/box-detail.vue?vue&type=style&index=0&lang=scss& ***!
  \****************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_box_detail_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./node_modules/mini-css-extract-plugin/dist/loader.js??ref--8-oneOf-1-0!./node_modules/css-loader/dist/cjs.js??ref--8-oneOf-1-1!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-2!./node_modules/postcss-loader/src??ref--8-oneOf-1-3!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/sass-loader/dist/cjs.js??ref--8-oneOf-1-4!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-5!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./box-detail.vue?vue&type=style&index=0&lang=scss& */ 487);
/* harmony import */ var _D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_box_detail_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_box_detail_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_box_detail_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_box_detail_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_box_detail_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 487:
/*!********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js??ref--8-oneOf-1-0!./node_modules/css-loader/dist/cjs.js??ref--8-oneOf-1-1!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-2!./node_modules/postcss-loader/src??ref--8-oneOf-1-3!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/sass-loader/dist/cjs.js??ref--8-oneOf-1-4!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-5!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!G:/PHP_dev/340-paopaoji/V3/paopao-v3-uinapp/package/box/box-detail.vue?vue&type=style&index=0&lang=scss& ***!
  \********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(false) { var cssReload; }
  

/***/ })

},[[480,"common/runtime","common/vendor"]]]);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/package/box/box-detail.js.map