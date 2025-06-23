(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["package/rightTouch/detail"],{

/***/ 388:
/*!****************************************************************************************************!*\
  !*** G:/PHP_dev/340-paopaoji/V3/paopao-v3-uinapp/main.js?{"page":"package%2FrightTouch%2Fdetail"} ***!
  \****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(wx, createPage) {

var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 4);
__webpack_require__(/*! uni-pages */ 26);
var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 25));
var _detail = _interopRequireDefault(__webpack_require__(/*! ./package/rightTouch/detail.vue */ 389));
// @ts-ignore
wx.__webpack_require_UNI_MP_PLUGIN__ = __webpack_require__;
createPage(_detail.default);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/wx.js */ 1)["default"], __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 2)["createPage"]))

/***/ }),

/***/ 389:
/*!*********************************************************************************!*\
  !*** G:/PHP_dev/340-paopaoji/V3/paopao-v3-uinapp/package/rightTouch/detail.vue ***!
  \*********************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _detail_vue_vue_type_template_id_0d872794_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./detail.vue?vue&type=template&id=0d872794&scoped=true& */ 390);
/* harmony import */ var _detail_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./detail.vue?vue&type=script&lang=js& */ 392);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _detail_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _detail_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _detail_vue_vue_type_style_index_0_id_0d872794_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./detail.vue?vue&type=style&index=0&id=0d872794&lang=scss&scoped=true& */ 394);
/* harmony import */ var _detail_vue_vue_type_style_index_1_id_0d872794_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./detail.vue?vue&type=style&index=1&id=0d872794&lang=scss&scoped=true& */ 396);
/* harmony import */ var _detail_vue_vue_type_style_index_2_id_0d872794_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./detail.vue?vue&type=style&index=2&id=0d872794&lang=scss&scoped=true& */ 398);
/* harmony import */ var _D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js */ 32);

var renderjs







/* normalize component */

var component = Object(_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_5__["default"])(
  _detail_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _detail_vue_vue_type_template_id_0d872794_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _detail_vue_vue_type_template_id_0d872794_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "0d872794",
  null,
  false,
  _detail_vue_vue_type_template_id_0d872794_scoped_true___WEBPACK_IMPORTED_MODULE_0__["components"],
  renderjs
)

component.options.__file = "package/rightTouch/detail.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ 390:
/*!****************************************************************************************************************************!*\
  !*** G:/PHP_dev/340-paopaoji/V3/paopao-v3-uinapp/package/rightTouch/detail.vue?vue&type=template&id=0d872794&scoped=true& ***!
  \****************************************************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_detail_vue_vue_type_template_id_0d872794_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--17-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./detail.vue?vue&type=template&id=0d872794&scoped=true& */ 391);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_detail_vue_vue_type_template_id_0d872794_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_detail_vue_vue_type_template_id_0d872794_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "recyclableRender", function() { return _D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_detail_vue_vue_type_template_id_0d872794_scoped_true___WEBPACK_IMPORTED_MODULE_0__["recyclableRender"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "components", function() { return _D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_detail_vue_vue_type_template_id_0d872794_scoped_true___WEBPACK_IMPORTED_MODULE_0__["components"]; });



/***/ }),

/***/ 391:
/*!****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--17-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!G:/PHP_dev/340-paopaoji/V3/paopao-v3-uinapp/package/rightTouch/detail.vue?vue&type=template&id=0d872794&scoped=true& ***!
  \****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
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
    cimage: function () {
      return __webpack_require__.e(/*! import() | components/cimage/cimage */ "components/cimage/cimage").then(__webpack_require__.bind(null, /*! @/components/cimage/cimage.vue */ 814))
    },
    uPopup: function () {
      return __webpack_require__.e(/*! import() | uview-ui/components/u-popup/u-popup */ "uview-ui/components/u-popup/u-popup").then(__webpack_require__.bind(null, /*! @/uview-ui/components/u-popup/u-popup.vue */ 826))
    },
    uniPopup: function () {
      return Promise.all(/*! import() | components/uni-popup/uni-popup */[__webpack_require__.e("common/vendor"), __webpack_require__.e("components/uni-popup/uni-popup")]).then(__webpack_require__.bind(null, /*! @/components/uni-popup/uni-popup.vue */ 898))
    },
    uIcon: function () {
      return __webpack_require__.e(/*! import() | uview-ui/components/u-icon/u-icon */ "uview-ui/components/u-icon/u-icon").then(__webpack_require__.bind(null, /*! @/uview-ui/components/u-icon/u-icon.vue */ 848))
    },
    uniIcons: function () {
      return Promise.all(/*! import() | uni_modules/uni-icons/components/uni-icons/uni-icons */[__webpack_require__.e("common/vendor"), __webpack_require__.e("uni_modules/uni-icons/components/uni-icons/uni-icons")]).then(__webpack_require__.bind(null, /*! @/uni_modules/uni-icons/components/uni-icons/uni-icons.vue */ 833))
    },
    evanSwitch: function () {
      return __webpack_require__.e(/*! import() | components/evan-switch/evan-switch */ "components/evan-switch/evan-switch").then(__webpack_require__.bind(null, /*! @/components/evan-switch/evan-switch.vue */ 907))
    },
    uEmpty: function () {
      return __webpack_require__.e(/*! import() | uview-ui/components/u-empty/u-empty */ "uview-ui/components/u-empty/u-empty").then(__webpack_require__.bind(null, /*! @/uview-ui/components/u-empty/u-empty.vue */ 819))
    },
    loginPopup: function () {
      return __webpack_require__.e(/*! import() | components/loginPopup/loginPopup */ "components/loginPopup/loginPopup").then(__webpack_require__.bind(null, /*! @/components/loginPopup/loginPopup.vue */ 730))
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
  var l0 = !(_vm.game_status == 0)
    ? _vm.__map(_vm.gameRewards, function (item, index) {
        var $orig = _vm.__get_orig(item)
        var m0 = _vm.isRewardSelected(item, index)
        return {
          $orig: $orig,
          m0: m0,
        }
      })
    : null
  var l1 = _vm.__map(_vm.couponList, function (item, idx) {
    var $orig = _vm.__get_orig(item)
    var g0 = item.valid_from.substring(0, 11)
    var g1 = item.valid_until.substring(0, 11)
    return {
      $orig: $orig,
      g0: g0,
      g1: g1,
    }
  })
  if (!_vm._isMounted) {
    _vm.e0 = function ($event) {
      return _vm.$common.toRule(2)
    }
    _vm.e1 = function ($event) {
      return _vm.$common.noDouble(_vm.confirmSubmit, 1)
    }
    _vm.e2 = function ($event) {
      _vm.zsPop = false
    }
  }
  _vm.$mp.data = Object.assign(
    {},
    {
      $root: {
        l0: l0,
        l1: l1,
      },
    }
  )
}
var recyclableRender = false
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ 392:
/*!**********************************************************************************************************!*\
  !*** G:/PHP_dev/340-paopaoji/V3/paopao-v3-uinapp/package/rightTouch/detail.vue?vue&type=script&lang=js& ***!
  \**********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_detail_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--13-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./detail.vue?vue&type=script&lang=js& */ 393);
/* harmony import */ var _D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_detail_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_detail_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_detail_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_detail_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_detail_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 393:
/*!*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--13-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!G:/PHP_dev/340-paopaoji/V3/paopao-v3-uinapp/package/rightTouch/detail.vue?vue&type=script&lang=js& ***!
  \*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
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
var _slicedToArray2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/slicedToArray */ 5));
var _asyncToGenerator2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ 46));
var _defineProperty2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/defineProperty */ 11));
var _vuex = __webpack_require__(/*! vuex */ 35);
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
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

var switchMp3 = 'https://www.img.xcooo.cn/uploads/2024/02/17887756404cea30.mp3';
var switchMusic = uni.createInnerAudioContext();
// const bg_music = 'https://img.50api.cn/dingdang/music.mp3'
var bg_music = '';
var bgMusic = uni.createInnerAudioContext();
var _default = {
  name: 'kaixiang',
  components: {},
  data: function data() {
    return {
      muteBgMusic: false,
      optionsData: '',
      boxInfo: {},
      // 赏等级列表
      markList: [],
      // 奖品
      awardList: [],
      orderData: '',
      // 购买方案
      btnCur: 0,
      // 支付类型
      payTypeCur: 0,
      payTypeList: [{
        id: 3,
        icon: 'https://img.alicdn.com/imgextra/i2/2200676927379/O1CN01mfiDjv24NdXdrF5yS_!!2200676927379.png',
        title: '微信支付'
      }
      // {
      //   id: 4,
      //   icon: 'https://img.alicdn.com/imgextra/i4/2200676927379/O1CN01A3bNW324NdW9QBJvc_!!2200676927379.png',
      //   title: '支付宝支付'
      // }

      // {
      //   id: 2,
      //   icon: '',
      //   title: '余额支付'
      // }
      ],

      agree: true,
      ruleData: '',
      is_epay: 0,
      currentBanner: 0,
      zsPop: false,
      boxLogList: [],
      btnLists: [],
      currentItems: 0,
      // 下拉刷新的配置(可选, 绝大部分情况无需配置)
      downOption: {
        auto: false
      },
      // 上拉加载的配置(可选, 绝大部分情况无需配置)
      upOption: {
        auto: false,
        page: {
          size: 20 // 每页数据的数量,默认10
        },

        textNoMore: '-- END --'
      },
      couponList: [],
      couponPop: false,
      couponShow: false,
      coupon_info: {},
      animateSet: uni.getStorageSync('animateSet') ? uni.getStorageSync('animateSet') : false,
      setShow: false,
      rulePop: false,
      // 赏品数据
      initialRewards: [],
      // 初始阶段的卡牌（只图）
      gameRewards: [],
      // 游戏阶段的卡牌（图 + 文）
      rewardCards: [],
      // 奖励卡池
      wishPoolData: [],
      showWishPool: false,
      selectedIndex: null,
      // 许愿的奖品
      order_id: null,
      selected_prize_info: {
        thumb: 'https://img.alicdn.com/imgextra/i4/2200676927379/O1CN01EyyA5i24NdcZzXtx6_!!2200676927379.png'
      },
      collision_count: 0,
      isPlacingCard: false,
      // 选中的奖品
      selectedRewards: [],
      showOrderPool: false,
      orderList: [],
      game_status: 0
    };
  },
  onLoad: function onLoad(options) {
    if (options.scene) {
      var arr = options.scene.split('_');
      this.optionsData = {
        userId: arr[1],
        id: arr[2]
      };
    } else {
      this.optionsData = options;
    }
    switchMusic.src = switchMp3;
    bgMusic.src = bg_music;
    bgMusic.autoplay = true;
    bgMusic.loop = true;
  },
  onShow: function onShow() {
    var _this2 = this;
    this.$store.dispatch('getUserInfo').then(function (res) {
      console.log(res);
    });
    this.$store.dispatch('getAppConfig').then(function (res) {
      _this2.is_epay = res.data.is_epay;
    });
    // 清空优惠券信息
    this.coupon_info = {};
    this.getData();
    this.getGameDetail();
    this.initInitialRewards();
  },
  watch: {},
  onUnload: function onUnload() {
    console.log('移除事件');
    clearInterval(this.barrageTimer);
    clearInterval(this.checkTimer);
    clearInterval(this.cancelTimer);
    this.barrageTimer = null;
    this.cancelOrderPay();
    this.cancelCheckPayStatus();
    bgMusic.pause();
  },
  onHide: function onHide() {
    console.log('页面隐藏事件');
    this.$refs.loginPopup.close();
  },
  computed: _objectSpread(_objectSpread({}, (0, _vuex.mapGetters)(['sysConfig', 'userInfo'])), {}, {
    navTitle: function navTitle() {
      // if (this.boxInfo.touch_type_title) {
      //   return this.boxInfo.touch_type_title + '对对碰'
      // }
      return '对对碰';
    }
  }),
  methods: {
    getGameDetail: function getGameDetail() {
      var _this3 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee() {
        return _regenerator.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _this3.req({
                  url: '/v1/collision/getCollisionGameDetail',
                  data: {
                    box_id: _this3.optionsData.id
                  },
                  success: function success(res) {
                    if (res.code == 200) {
                      var data = res.data;
                      // 判断接口返回的数据是否有效，只有当数据存在时才进行赋值
                      if (data) {
                        // 仅在有数据时才赋值
                        if (data.game_status !== undefined) {
                          _this3.game_status = data.game_status;
                        }
                        if (data.order_id !== undefined) {
                          _this3.order_id = data.order_id;
                        }
                        if (data.collision_count !== undefined) {
                          _this3.collision_count = data.collision_count;
                        }
                        if (data.selected_prize_info) {
                          _this3.selected_prize_info = data.selected_prize_info;
                        }
                        if (data.game_rewards && Array.isArray(data.game_rewards)) {
                          _this3.gameRewards = data.game_rewards;
                        }
                        if (data.reward_cards && Array.isArray(data.reward_cards)) {
                          _this3.rewardCards = data.reward_cards.map(function (card, index) {
                            // 给没有图片的卡片设置默认图片
                            if (!card.image) {
                              card.image = 'https://img.alicdn.com/imgextra/i4/2200676927379/O1CN01EyyA5i24NdcZzXtx6_!!2200676927379.png';
                            }
                            return card;
                          });
                        }
                      }
                    } else {
                      // 处理接口返回其他错误的情况
                      uni.showToast({
                        title: res.msg || '获取数据失败',
                        icon: 'none'
                      });
                    }
                  },
                  fail: function fail() {
                    // 网络请求失败的处理
                    uni.showToast({
                      title: '请求失败，请稍后再试',
                      icon: 'none'
                    });
                  }
                });
              case 1:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }))();
    },
    getWishPool: function getWishPool() {
      var _this4 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee2() {
        return _regenerator.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _this4.req({
                  url: '/v1/collision/getWishPoolByOrderId',
                  data: {
                    order_id: _this4.order_id
                  },
                  success: function success(res) {
                    if (res.code == 200) {
                      _this4.wishPoolData = res.data.awards_pool;
                      _this4.showWishPool = true;
                    }
                  }
                });
              case 1:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }))();
    },
    selectItem: function selectItem(index) {
      if (this.selectedIndex === index) {
        // 如果再次点击已选中的项，则取消选中
        this.selectedIndex = null;
      } else {
        this.selectedIndex = index;
      }
    },
    makeWish: function makeWish() {
      var _this5 = this;
      if (this.selectedIndex === null) {
        uni.showToast({
          title: '请选择一个奖品进行许愿',
          icon: 'none'
        });
        return;
      }
      var selectedItem = this.wishPoolData[this.selectedIndex];
      console.log('许愿成功：', selectedItem);

      // 提交许愿请求逻辑
      this.req({
        url: '/v1/collision/makeWish',
        data: {
          order_id: this.order_id,
          prize_id: selectedItem.id
        },
        success: function success(res) {
          if (res.code == 200) {
            // 设置许愿奖品信息
            _this5.selected_prize_info = res.data.selected_prize_info;

            // 设置游戏初始牌池 (gameRewards)
            _this5.gameRewards = res.data.game_rewards;

            // 设置奖励卡池
            _this5.rewardCards = res.data.reward_cards;

            // 隐藏许愿池界面
            _this5.showWishPool = false;

            // 更新游戏状态
            _this5.game_status = res.data.game_status;
          }
        }
      });
    },
    // 对对碰
    handleRewardSelect: function handleRewardSelect(card, index) {
      var _this6 = this;
      var existIndex = this.selectedRewards.findIndex(function (r) {
        return r.index === index;
      });
      if (existIndex !== -1) {
        // 再次点击取消选中
        this.selectedRewards.splice(existIndex, 1);
      } else {
        if (this.selectedRewards.length === 2) {
          uni.showToast({
            title: '最多只能选择两个',
            icon: 'none'
          });
          return;
        }
        this.selectedRewards.push({
          card: card,
          index: index
        });
      }
      if (this.selectedRewards.length === 2) {
        var _this$selectedRewards = (0, _slicedToArray2.default)(this.selectedRewards, 2),
          c1 = _this$selectedRewards[0],
          c2 = _this$selectedRewards[1];
        if (c1.card.id !== c2.card.id) {
          uni.showToast({
            title: '所选商品不同',
            icon: 'none'
          });
          this.selectedRewards = [];
          return;
        }

        // 发请求
        this.req({
          url: '/v1/collision/matchCards',
          data: {
            order_id: this.order_id,
            card1_id: c1.card.id,
            card2_id: c2.card.id
          },
          success: function success(res) {
            if (res.code == 200) {
              var data = res.data;
              _this6.game_status = data.game_status;
              if (_this6.game_status == 2) {
                _this6.showOrderPool = true;
                _this6.orderList = data.orderList;
              } else {
                _this6.gameRewards = data.game_rewards;
                _this6.collision_count = data.collision_count;
                _this6.selectedRewards = []; // ✅清除选中状态
                uni.showToast({
                  title: res.msg,
                  icon: 'none'
                });
              }
            } else {
              uni.showToast({
                title: res.msg || '操作失败',
                icon: 'none'
              });
            }
          }
        });
      }
    },
    closesOrderPool: function closesOrderPool() {
      this.showOrderPool = false;
      // 重置游戏卡牌池
      this.resetCard();
    },
    resetCard: function resetCard() {
      this.initInitialRewards();
      this.selected_prize_info.thumb = 'https://img.alicdn.com/imgextra/i4/2200676927379/O1CN01EyyA5i24NdcZzXtx6_!!2200676927379.png';
      this.collision_count = 0;
      this.rewardCards = [];
      this.selectedRewards = [];
      this.gameRewards = [];
      this.game_status = 0;
    },
    isRewardSelected: function isRewardSelected(reward, index) {
      console.log(this.selectedRewards);
      return this.selectedRewards.some(function (r) {
        return r.index === index;
      });
    },
    // 将选中的卡片添加到游戏奖励列表
    placeRewardCard: function placeRewardCard(card) {
      var _this7 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee3() {
        return _regenerator.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                // if (this.isPlacingCard) return; // 防止重复点击
                // this.isPlacingCard = true;

                _this7.req({
                  url: '/v1/collision/placeRewardCard',
                  data: {
                    order_id: _this7.order_id,
                    card_id: card.id
                  },
                  success: function success(res) {
                    if (res.code == 200) {
                      var data = res.data;

                      // ✅ 后端返回的最新卡牌状态
                      _this7.gameRewards = data.game_rewards || [];
                      _this7.collision_count = data.collision_count || 0;

                      // 将 rewardCards 更新
                      _this7.rewardCards = data.remaining_reward_cards;
                      uni.showToast({
                        title: '卡牌已放置',
                        icon: 'success'
                      });
                    } else {
                      uni.showToast({
                        title: res.msg || '操作失败',
                        icon: 'none'
                      });
                    }
                  }
                });
              case 1:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }))();
    },
    getCardStyle: function getCardStyle(index) {
      return {
        left: "".concat(index * 20, "%"),
        zIndex: 5 - index
      };
    },
    initInitialRewards: function initInitialRewards() {
      var url = 'https://img.alicdn.com/imgextra/i4/2200676927379/O1CN01EyyA5i24NdcZzXtx6_!!2200676927379.png';
      this.initialRewards = Array.from({
        length: 9
      }, function () {
        return {
          thumb: url
        };
      });
    },
    useCouPon: function useCouPon(item) {
      this.coupon_info = item;
      // 请求订单信息
      this.confirmSubmit(0);
      this.couponPop = false;
    },
    goCoupon: function goCoupon() {
      this.couponPop = true;
      this.getUserCoupon();
    },
    getUserCoupon: function getUserCoupon() {
      var _this8 = this;
      this.req({
        url: '/v1/coupon/order_coupons',
        data: {
          paymentAmount: this.orderData.discount.pay_money
        },
        Loading: true,
        success: function success(res) {
          if (res.code == 200) {
            if (res.data.length == 0) {
              _this8.couponShow = true;
            } else {
              _this8.couponShow = false;
            }
            _this8.couponList = res.data;
          } else {
            _this8.couponShow = true;
          }
        }
      });
    },
    zsCu: function zsCu(index) {
      this.currentItems = index;
      this.boxLogList = [];
      this.mescroll.resetUpScroll();
      this.mescroll.scrollTo(0, 0);
    },
    zs: function zs() {
      this.$nextTick(function () {
        if (switchMusic) {
          switchMusic.play();
        }
      });
      this.zsPop = true;
      this.getTab();
    },
    getBoxLogList: function getBoxLogList(_ref) {
      var _this9 = this;
      var num = _ref.num,
        size = _ref.size;
      this.req({
        url: '/v1/box/boxLogList',
        data: {
          id: this.optionsData.id,
          mark_id: this.btnLists.length ? this.btnLists[this.currentItems].id : 0,
          page: num,
          per_page: size
        },
        Loading: true,
        success: function success(res) {
          if (res.code == 200) {
            if (num == 1) {
              _this9.boxLogList = [];
            }
            var newArr = res.data.data.map(function (item) {
              switch (item.mark_id) {
                case 33:
                  item.image = 'https://img.alicdn.com/imgextra/i4/2200676927379/O1CN01khNh7d24NdcoDC0Ny_!!2200676927379.png';
                  break;
                case 34:
                  item.image = 'https://img.alicdn.com/imgextra/i4/2200676927379/O1CN01KaZ6qs24Ndco6VAfA_!!2200676927379.png';
                  break;
                case 35:
                  item.image = 'https://img.alicdn.com/imgextra/i2/2200676927379/O1CN01GpZzz024NdcoDFpOW_!!2200676927379.png';
                  break;
                case 36:
                  item.image = 'https://img.alicdn.com/imgextra/i1/2200676927379/O1CN01PZkzwd24NdcoKRnBt_!!2200676927379.png';
                  break;
                default:
                  item.image = 'https://img.alicdn.com/imgextra/i1/2200676927379/O1CN01PZkzwd24NdcoKRnBt_!!2200676927379.png';
                  break;
              }
              return item;
            });
            _this9.boxLogList = [].concat((0, _toConsumableArray2.default)(_this9.boxLogList), (0, _toConsumableArray2.default)(newArr));
            _this9.mescroll.endBySize(res.data.data.length, res.data.total);
          } else {
            _this9.mescroll.endBySize(0, 0);
          }
        }
      });
    },
    getTab: function getTab() {
      var _this10 = this;
      return new Promise(function (resolve, reject) {
        _this10.req({
          url: '/v1/box/mark',
          data: {
            type: 2
          },
          Loading: true,
          success: function success(res) {
            if (res.code == 200) {
              _this10.btnLists = res.data.map(function (item) {
                // if (item.id == 1) {
                //   item.title = '传说'
                // }
                // if (item.id == 4) {
                //   item.title = '高级'
                // }
                return item;
              });
              _this10.mescroll.resetUpScroll();
              _this10.mescroll.scrollTo(0, 0);
              resolve();
            }
          }
        });
      });
    },
    handleSwiperChange: function handleSwiperChange(event) {
      this.$nextTick(function () {
        if (switchMusic) {
          switchMusic.play();
        }
      });
      var current = event.detail.current;
      this.currentBanner = current;
    },
    getPrevIndex: function getPrevIndex() {
      return (this.currentBanner - 1 + this.awardList.length) % this.awardList.length;
    },
    getNextIndex: function getNextIndex() {
      return (this.currentBanner + 1) % this.awardList.length;
    },
    checkPayStatus: function checkPayStatus() {
      var _this11 = this;
      var _this = this;
      var order_info = uni.getStorageSync('order_info_box');
      _this.checkTimer = setInterval(function () {
        console.log(order_info, '获取到的订单数据');

        // 查询订单
        _this11.req({
          url: '/v1/pay/orderStatus',
          data: {
            order_sn: order_info.order_sn
          },
          Loading: true,
          success: function success(res) {
            switch (res.code) {
              case 200:
                _this.cancelCheckPayStatus();
                _this11.$common.toast({
                  title: '支付成功',
                  icon: 'success',
                  duration: 1500,
                  success: function success() {
                    _this11.$common.to({
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
                _this.cancelOrderPay();
                _this.cancelCheckPayStatus();
                _this11.$common.toast({
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
        _this.cancelOrderPay();
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
    // 取消支付
    cancelOrderPay: function cancelOrderPay() {
      var order_info = uni.getStorageSync('order_info_box');
      if (order_info.order_sn) {
        this.req({
          url: '/v1/pay/cancel',
          data: {
            order_sn: order_info.order_sn
          },
          Loading: true,
          success: function success(res) {
            console.log(res);
          }
        });
      }
    },
    getData: function getData() {
      var _this12 = this;
      return new Promise(function (resolve, reject) {
        _this12.req({
          url: '/v1/box/info',
          data: {
            id: _this12.optionsData.id
          },
          Loading: true,
          success: function success(res) {
            if (res.code == 200) {
              _this12.boxInfo = res.data.box;
              _this12.awardList = res.data.awardList;
              _this12.markList = res.data.box ? res.data.box.markList : [];
              _this12.getDraw();
              resolve();
            }
          }
        });
      });
    },
    /**
    * @description: 获取抽奖方式
    * @return {*}
    */
    getDraw: function getDraw() {
      var _this13 = this;
      return new Promise(function (resolve, reject) {
        _this13.req({
          url: '/v1/box/draw',
          data: {},
          Loading: true,
          success: function success(res) {
            if (res.code == 200) {
              _this13.btnList = res.data;
              resolve();
            }
          }
        });
      });
    },
    changePayType: function changePayType(e) {
      this.payTypeCur = e;
    },
    changeBuyType: function changeBuyType(e) {
      this.btnCur = e;
      this.confirmSubmit(0);
    },
    openBox: function openBox() {
      this.confirmSubmit(0);
    },
    confirmSubmit: function confirmSubmit(e) {
      var _this14 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee4() {
        var _this14$coupon_info;
        var data;
        return _regenerator.default.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _this14.$nextTick(function () {
                  if (switchMusic) {
                    switchMusic.play();
                  }
                });
                if (_this14.userInfo) {
                  _context4.next = 4;
                  break;
                }
                _this14.$refs.loginPopup.open();
                return _context4.abrupt("return");
              case 4:
                if (!(e == 1 && !_this14.agree)) {
                  _context4.next = 9;
                  break;
                }
                _this14.$common.toast({
                  title: '请阅读并同意抽盒规则'
                });
                _this14.ruleType = 'buy';
                _this14.$common.getRule(3, true).then(function (res) {
                  _this14.ruleData = res;
                  _this14.openRulePop();
                });
                return _context4.abrupt("return");
              case 9:
                console.log(_this14.btnCur);
                data = {
                  id: _this14.boxInfo.id,
                  // draw_id: this.btnList[this.btnCur].id || '',
                  draw_num: _this14.btnCur,
                  invite_user_id: _this14.optionsData.userId || '',
                  pay_type: _this14.payTypeList[_this14.payTypeCur].id,
                  coupon_id: ((_this14$coupon_info = _this14.coupon_info) === null || _this14$coupon_info === void 0 ? void 0 : _this14$coupon_info.id) || '',
                  submit: e
                };
                _this14.req({
                  url: '/v1/collision/order',
                  data: data,
                  success: function success(res) {
                    if (res.code == 200) {
                      if (e == 0) {
                        _this14.orderData = res.data;
                        _this14.openOrderPop();
                      } else {
                        _this14.closeOrderPop();
                        if (res.data.pay_money * 1 > 0) {
                          var order_info = {
                            order_sn: res.data.order_sn
                          };
                          uni.setStorageSync('order_info_box', order_info);
                          _this14.checkPayStatus();
                          var params = _objectSpread(_objectSpread({}, res.data), {}, {
                            is_epay: _this14.is_epay,
                            returnUrl: "/pages/box/kaixiang?id=".concat(_this14.boxInfo.id)
                          });
                          _this14.$common.orderPay(params).then(function (res1) {
                            if (res1 == 'success') {
                              _this14.$common.toast({
                                title: '支付成功',
                                icon: 'success',
                                duration: 1500,
                                success: function success() {
                                  _this14.order_id = res.data.order_id;
                                  _this14.getWishPool();
                                }
                              });
                            }
                          });
                        } else {
                          _this14.$common.toast({
                            title: '支付成功',
                            duration: 1500,
                            success: function success() {
                              _this14.order_id = res.data.order_id;
                              _this14.getWishPool();
                            }
                          });
                        }
                      }
                    }
                  }
                });
              case 12:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4);
      }))();
    },
    openOrderPop: function openOrderPop() {
      this.agree = true;
      this.$refs.orderPop.open();
    },
    closeOrderPop: function closeOrderPop() {
      this.$refs.orderPop.close();
    },
    tryPlay: function tryPlay() {
      this.$nextTick(function () {
        if (switchMusic) {
          switchMusic.play();
        }
      });
      this.$common.to({
        url: '/pages/index/draw',
        query: {
          id: this.boxInfo.id,
          drawNum: 1,
          type: 'play'
        }
      });
    },
    goMall: function goMall() {
      this.$nextTick(function () {
        if (switchMusic) {
          switchMusic.play();
        }
      });
      uni.switchTab({
        url: '/pages/index/index'
      });
    },
    upper: function upper(e) {
      // console.log(e)
    },
    lower: function lower(e) {
      // console.log(e)
    },
    goInvite: function goInvite() {
      this.$nextTick(function () {
        if (switchMusic) {
          switchMusic.play();
        }
      });
      if (!this.userInfo) {
        uni.showToast({
          title: '登录后再操作',
          icon: 'none',
          mask: true
        });
        return;
      }
      var url;
      if (this.userInfo.level == 2) {
        url = '/package/mine/daili';
      } else {
        url = '/package/mine/yaoqing';
      }
      this.$common.to({
        tabCur: 1,
        url: url
      });
    },
    playMusic: function playMusic() {
      this.muteBgMusic = !this.muteBgMusic;
      this.$nextTick(function () {
        if (switchMusic) {
          switchMusic.play();
        }
      });
      if (this.muteBgMusic) {
        bgMusic.play();
      } else {
        bgMusic.pause();
      }
    },
    noticeEnd: function noticeEnd(e) {
      console.log('123', e);
    },
    back: function back() {
      this.$nextTick(function () {
        if (switchMusic) {
          switchMusic.play();
        }
      });
      uni.navigateTo({
        url: '/package/rightTouch/list',
        success: function success(result) {},
        fail: function fail() {},
        complete: function complete() {}
      });
    },
    fresh: function fresh() {
      this.$nextTick(function () {
        if (switchMusic) {
          switchMusic.play();
        }
      });
      uni.showToast({
        title: '刷新成功',
        icon: 'none',
        mask: true
      });
      this.getData();
      this.getGameDetail();
    },
    openRule: function openRule() {
      this.$nextTick(function () {
        if (switchMusic) {
          switchMusic.play();
        }
      });
      this.rulePop = true;
    },
    goZs: function goZs() {
      this.$nextTick(function () {
        if (switchMusic) {
          switchMusic.play();
        }
      });
      this.zsPop = true;
      this.getTab();
    },
    playGame: function playGame() {
      this.$nextTick(function () {
        if (switchMusic) {
          switchMusic.play();
        }
      });
      this.btnCur = 1;
      this.confirmSubmit(0);
      // this.startGame()
    }
  }
};
exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 2)["default"]))

/***/ }),

/***/ 394:
/*!*******************************************************************************************************************************************!*\
  !*** G:/PHP_dev/340-paopaoji/V3/paopao-v3-uinapp/package/rightTouch/detail.vue?vue&type=style&index=0&id=0d872794&lang=scss&scoped=true& ***!
  \*******************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_detail_vue_vue_type_style_index_0_id_0d872794_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./node_modules/mini-css-extract-plugin/dist/loader.js??ref--8-oneOf-1-0!./node_modules/css-loader/dist/cjs.js??ref--8-oneOf-1-1!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-2!./node_modules/postcss-loader/src??ref--8-oneOf-1-3!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/sass-loader/dist/cjs.js??ref--8-oneOf-1-4!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-5!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./detail.vue?vue&type=style&index=0&id=0d872794&lang=scss&scoped=true& */ 395);
/* harmony import */ var _D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_detail_vue_vue_type_style_index_0_id_0d872794_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_detail_vue_vue_type_style_index_0_id_0d872794_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_detail_vue_vue_type_style_index_0_id_0d872794_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_detail_vue_vue_type_style_index_0_id_0d872794_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_detail_vue_vue_type_style_index_0_id_0d872794_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 395:
/*!***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js??ref--8-oneOf-1-0!./node_modules/css-loader/dist/cjs.js??ref--8-oneOf-1-1!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-2!./node_modules/postcss-loader/src??ref--8-oneOf-1-3!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/sass-loader/dist/cjs.js??ref--8-oneOf-1-4!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-5!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!G:/PHP_dev/340-paopaoji/V3/paopao-v3-uinapp/package/rightTouch/detail.vue?vue&type=style&index=0&id=0d872794&lang=scss&scoped=true& ***!
  \***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(false) { var cssReload; }
  

/***/ }),

/***/ 396:
/*!*******************************************************************************************************************************************!*\
  !*** G:/PHP_dev/340-paopaoji/V3/paopao-v3-uinapp/package/rightTouch/detail.vue?vue&type=style&index=1&id=0d872794&lang=scss&scoped=true& ***!
  \*******************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_detail_vue_vue_type_style_index_1_id_0d872794_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./node_modules/mini-css-extract-plugin/dist/loader.js??ref--8-oneOf-1-0!./node_modules/css-loader/dist/cjs.js??ref--8-oneOf-1-1!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-2!./node_modules/postcss-loader/src??ref--8-oneOf-1-3!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/sass-loader/dist/cjs.js??ref--8-oneOf-1-4!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-5!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./detail.vue?vue&type=style&index=1&id=0d872794&lang=scss&scoped=true& */ 397);
/* harmony import */ var _D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_detail_vue_vue_type_style_index_1_id_0d872794_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_detail_vue_vue_type_style_index_1_id_0d872794_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_detail_vue_vue_type_style_index_1_id_0d872794_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_detail_vue_vue_type_style_index_1_id_0d872794_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_detail_vue_vue_type_style_index_1_id_0d872794_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 397:
/*!***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js??ref--8-oneOf-1-0!./node_modules/css-loader/dist/cjs.js??ref--8-oneOf-1-1!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-2!./node_modules/postcss-loader/src??ref--8-oneOf-1-3!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/sass-loader/dist/cjs.js??ref--8-oneOf-1-4!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-5!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!G:/PHP_dev/340-paopaoji/V3/paopao-v3-uinapp/package/rightTouch/detail.vue?vue&type=style&index=1&id=0d872794&lang=scss&scoped=true& ***!
  \***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(false) { var cssReload; }
  

/***/ }),

/***/ 398:
/*!*******************************************************************************************************************************************!*\
  !*** G:/PHP_dev/340-paopaoji/V3/paopao-v3-uinapp/package/rightTouch/detail.vue?vue&type=style&index=2&id=0d872794&lang=scss&scoped=true& ***!
  \*******************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_detail_vue_vue_type_style_index_2_id_0d872794_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./node_modules/mini-css-extract-plugin/dist/loader.js??ref--8-oneOf-1-0!./node_modules/css-loader/dist/cjs.js??ref--8-oneOf-1-1!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-2!./node_modules/postcss-loader/src??ref--8-oneOf-1-3!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/sass-loader/dist/cjs.js??ref--8-oneOf-1-4!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-5!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./detail.vue?vue&type=style&index=2&id=0d872794&lang=scss&scoped=true& */ 399);
/* harmony import */ var _D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_detail_vue_vue_type_style_index_2_id_0d872794_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_detail_vue_vue_type_style_index_2_id_0d872794_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_detail_vue_vue_type_style_index_2_id_0d872794_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_detail_vue_vue_type_style_index_2_id_0d872794_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_detail_vue_vue_type_style_index_2_id_0d872794_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 399:
/*!***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js??ref--8-oneOf-1-0!./node_modules/css-loader/dist/cjs.js??ref--8-oneOf-1-1!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-2!./node_modules/postcss-loader/src??ref--8-oneOf-1-3!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/sass-loader/dist/cjs.js??ref--8-oneOf-1-4!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-5!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!G:/PHP_dev/340-paopaoji/V3/paopao-v3-uinapp/package/rightTouch/detail.vue?vue&type=style&index=2&id=0d872794&lang=scss&scoped=true& ***!
  \***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(false) { var cssReload; }
  

/***/ })

},[[388,"common/runtime","common/vendor"]]]);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/package/rightTouch/detail.js.map