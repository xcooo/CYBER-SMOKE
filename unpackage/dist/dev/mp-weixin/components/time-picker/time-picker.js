(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["components/time-picker/time-picker"],{

/***/ 1268:
/*!******************************************************************************************!*\
  !*** G:/PHP_dev/340-paopaoji/V3/paopao-v3-uinapp/components/time-picker/time-picker.vue ***!
  \******************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _time_picker_vue_vue_type_template_id_374e9ea2___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./time-picker.vue?vue&type=template&id=374e9ea2& */ 1269);
/* harmony import */ var _time_picker_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./time-picker.vue?vue&type=script&lang=js& */ 1271);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _time_picker_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _time_picker_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _time_picker_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./time-picker.vue?vue&type=style&index=0&lang=scss& */ 1273);
/* harmony import */ var _D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js */ 32);

var renderjs





/* normalize component */

var component = Object(_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _time_picker_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _time_picker_vue_vue_type_template_id_374e9ea2___WEBPACK_IMPORTED_MODULE_0__["render"],
  _time_picker_vue_vue_type_template_id_374e9ea2___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null,
  false,
  _time_picker_vue_vue_type_template_id_374e9ea2___WEBPACK_IMPORTED_MODULE_0__["components"],
  renderjs
)

component.options.__file = "components/time-picker/time-picker.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ 1269:
/*!*************************************************************************************************************************!*\
  !*** G:/PHP_dev/340-paopaoji/V3/paopao-v3-uinapp/components/time-picker/time-picker.vue?vue&type=template&id=374e9ea2& ***!
  \*************************************************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_time_picker_vue_vue_type_template_id_374e9ea2___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--17-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./time-picker.vue?vue&type=template&id=374e9ea2& */ 1270);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_time_picker_vue_vue_type_template_id_374e9ea2___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_time_picker_vue_vue_type_template_id_374e9ea2___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "recyclableRender", function() { return _D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_time_picker_vue_vue_type_template_id_374e9ea2___WEBPACK_IMPORTED_MODULE_0__["recyclableRender"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "components", function() { return _D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_time_picker_vue_vue_type_template_id_374e9ea2___WEBPACK_IMPORTED_MODULE_0__["components"]; });



/***/ }),

/***/ 1270:
/*!*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--17-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!G:/PHP_dev/340-paopaoji/V3/paopao-v3-uinapp/components/time-picker/time-picker.vue?vue&type=template&id=374e9ea2& ***!
  \*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
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
  var l0 =
    _vm.pickerShow && !_vm.reset && _vm.params.month
      ? _vm.__map(_vm.months, function (item, index) {
          var $orig = _vm.__get_orig(item)
          var m0 = _vm.formatNumber(item)
          return {
            $orig: $orig,
            m0: m0,
          }
        })
      : null
  var l1 =
    _vm.pickerShow && !_vm.reset && _vm.params.day
      ? _vm.__map(_vm.days, function (item, index) {
          var $orig = _vm.__get_orig(item)
          var m1 = _vm.formatNumber(item)
          return {
            $orig: $orig,
            m1: m1,
          }
        })
      : null
  var l2 =
    _vm.pickerShow && !_vm.reset && _vm.params.hour
      ? _vm.__map(_vm.hours, function (item, index) {
          var $orig = _vm.__get_orig(item)
          var m2 = _vm.formatNumber(item)
          return {
            $orig: $orig,
            m2: m2,
          }
        })
      : null
  var l3 =
    _vm.pickerShow && !_vm.reset && _vm.params.minute
      ? _vm.__map(_vm.minutes, function (item, index) {
          var $orig = _vm.__get_orig(item)
          var m3 = _vm.formatNumber(item)
          return {
            $orig: $orig,
            m3: m3,
          }
        })
      : null
  var l4 =
    _vm.pickerShow && !_vm.reset && _vm.params.second
      ? _vm.__map(_vm.seconds, function (item, index) {
          var $orig = _vm.__get_orig(item)
          var m4 = _vm.formatNumber(item)
          return {
            $orig: $orig,
            m4: m4,
          }
        })
      : null
  _vm.$mp.data = Object.assign(
    {},
    {
      $root: {
        l0: l0,
        l1: l1,
        l2: l2,
        l3: l3,
        l4: l4,
      },
    }
  )
}
var recyclableRender = false
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ 1271:
/*!*******************************************************************************************************************!*\
  !*** G:/PHP_dev/340-paopaoji/V3/paopao-v3-uinapp/components/time-picker/time-picker.vue?vue&type=script&lang=js& ***!
  \*******************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_time_picker_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--13-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./time-picker.vue?vue&type=script&lang=js& */ 1272);
/* harmony import */ var _D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_time_picker_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_time_picker_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_time_picker_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_time_picker_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_time_picker_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 1272:
/*!**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--13-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!G:/PHP_dev/340-paopaoji/V3/paopao-v3-uinapp/components/time-picker/time-picker.vue?vue&type=script&lang=js& ***!
  \**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 4);
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _toConsumableArray2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/toConsumableArray */ 18));
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
var _default2 = {
  name: 'timePicker',
  props: {
    value: {
      default: true,
      type: Boolean
    },
    // picker中需要显示的参数
    params: {
      type: Object,
      default: function _default() {
        return {
          year: true,
          month: true,
          day: true,
          hour: true,
          minute: true,
          second: true,
          timestamp: false
        };
      }
    },
    //左上角文字
    cancelText: {
      type: String,
      default: '取消'
    },
    //右上角文字
    confirmText: {
      type: String,
      default: '确认'
    },
    //年月日开始时间
    beginDate: {
      type: [String, Number],
      default: '1990-1-1'
    },
    //年月日结束时间
    endDate: {
      type: [String, Number],
      default: '2050-12-31'
    },
    // 默认显示的时间，2025-07-02 || 2025-07-02 13:01:00 || 2025/07/02
    defaultTime: {
      type: String,
      default: ''
    },
    // 是否显示后面的年月日中文提示
    showTimeTag: {
      type: Boolean,
      default: true
    },
    // 是否允许通过点击背景关闭Picker
    backClickClose: {
      type: Boolean,
      default: true
    },
    //开始小时
    hourBegin: {
      type: [Number, String],
      default: '0'
    },
    //结束小时
    hourEnd: {
      type: [Number, String],
      default: '23'
    },
    //分钟间隔
    minutesInterval: {
      type: [Number, String],
      default: '1'
    },
    //左上角文字颜色
    cancelTextColor: {
      type: String,
      default: '#000'
    },
    //右上角文字颜色
    confirmTextColor: {
      type: String,
      default: '#1E7DEB'
    }
  },
  data: function data() {
    return {
      pickerShow: false,
      years: [],
      months: [],
      days: [],
      hours: [],
      minutes: [],
      seconds: [],
      year: 0,
      month: 0,
      day: 0,
      hour: 0,
      minute: 0,
      second: 0,
      reset: false,
      valueArr: [],
      moving: false // 列是否还在滑动中，微信小程序如果在滑动中就点确定，结果可能不准确
    };
  },
  mounted: function mounted() {
    this.init();
  },
  computed: {
    currentYear: function currentYear() {
      return "".concat(this.year);
    },
    currentMonth: function currentMonth() {
      return "".concat(this.month);
    },
    beginYear: function beginYear() {
      return new Date(this.beginDate).getFullYear();
    },
    endYear: function endYear() {
      return new Date(this.endDate).getFullYear();
    },
    beginMonth: function beginMonth() {
      return new Date(this.beginDate).getMonth() + 1;
    },
    endMonth: function endMonth() {
      return new Date(this.endDate).getMonth() + 1;
    },
    beginDay: function beginDay() {
      return new Date(this.beginDate).getDate();
    },
    endDay: function endDay() {
      return new Date(this.endDate).getDate();
    }
  },
  watch: {
    currentYear: function currentYear() {
      if (this.params.year) this.setMonths();
    },
    currentMonth: function currentMonth() {
      this.setDays();
    },
    value: function value(val) {
      this.pickerShow = val;
    },
    pickerShow: function pickerShow(val) {
      this.init();
      this.$emit("input", val);
    }
  },
  methods: {
    //日期时间处理
    initTimeValue: function initTimeValue() {
      // 格式化时间，在IE浏览器(uni不存在此情况)，无法识别日期间的"-"间隔符号
      var dfdate = this.defaultTime.replace(/\-/g, '/');
      var bdate = this.beginDate.replace(/\-/g, '/');
      var edate = this.endDate.replace(/\-/g, '/');
      var time = null;
      time = new Date(bdate);
      if (!!dfdate) {
        time = new Date(dfdate) > new Date(bdate) ? new Date(dfdate) : new Date(bdate);
        time = new Date(dfdate) > new Date(edate) ? new Date(edate) : new Date(dfdate);
      }
      // 获取年日月时分秒
      this.year = time.getFullYear();
      this.month = Number(time.getMonth()) + 1;
      this.day = time.getDate();
      this.hour = time.getHours();
      this.minute = time.getMinutes();
      this.second = time.getSeconds();
    },
    // 生成递进的数组
    generateArray: function generateArray(start, end) {
      // 转为数值格式，否则用户给end-year等传递字符串值时，下面的end+1会导致字符串拼接，而不是相加
      start = Number(start);
      end = Number(end);
      end = end > start ? end : start;
      // 生成数组，获取其中的索引，并剪出来
      return (0, _toConsumableArray2.default)(Array(end + 1).keys()).slice(start);
    },
    getIndex: function getIndex(arr, val) {
      var index = arr.indexOf(val);
      // 如果index为-1(即找不到index值)，~(-1)=-(-1)-1=0 (转成相反数在减一)，导致条件不成立
      return ~index ? index : 0;
    },
    init: function init() {
      this.valueArr = [];
      this.reset = false;
      this.initTimeValue();
      if (this.params.year) {
        this.valueArr.push(0);
        this.setYears();
      }
      if (this.params.month) {
        this.valueArr.push(0);
        this.setMonths();
      }
      if (this.params.day) {
        this.valueArr.push(0);
        this.setDays();
      }
      if (this.params.hour) {
        this.valueArr.push(0);
        this.setHours();
      }
      if (this.params.minute) {
        this.valueArr.push(0);
        this.setMinutes();
      }
      if (this.params.second) {
        this.valueArr.push(0);
        this.setSeconds();
      }
    },
    setYears: function setYears() {
      // 获取年份集合
      this.years = this.generateArray(this.beginYear, this.endYear);
      // 设置this.valueArr某一项的值，是为了让picker预选中某一个值
      this.valueArr.splice(this.valueArr.length - 1, 1, this.getIndex(this.years, this.year));
    },
    setMonths: function setMonths() {
      //结束开始年是同年
      if (this.endYear == this.beginYear) {
        this.months = this.generateArray(this.beginMonth, this.endMonth);
      }
      //开始年为当前选择年
      else if (this.beginYear == this.year) {
        this.months = this.generateArray(this.beginMonth, 12);
      }
      //结束年为当前选择年
      else if (this.endYear == this.year) {
        this.months = this.generateArray(1, this.endMonth);
      } else {
        this.months = this.generateArray(1, 12);
      }
      var index = 0;
      if (this.params.year && this.params.month) index = 1;else index = 0;
      this.month = this.months[this.valueArr[index]];
      this.valueArr.splice(index, 1, this.getIndex(this.months, this.month));
    },
    setDays: function setDays() {
      var totalDays = new Date(this.year, this.month, 0).getDate();
      //结束开始月份是同月份
      if (this.beginMonth == this.endMonth) {
        this.days = this.generateArray(this.beginDay, this.endDay);
      }
      //开始月份为当前选择月
      else if (this.beginMonth == this.month && this.year == this.beginYear) {
        this.days = this.generateArray(this.beginDay, totalDays);
      }
      //结束月份为当前选择月
      else if (this.endMonth == this.month && this.year == this.endYear) {
        this.days = this.generateArray(1, this.endDay);
      }
      //正常月份
      else {
        this.days = this.generateArray(1, totalDays);
      }
      var index = 0;
      // 这里不能使用类似setMonths()中的this.valueArr.splice(this.valueArr.length - 1, xxx)做法
      // 因为this.month和this.year变化时，会触发watch中的this.setDays()，导致this.valueArr.length计算有误
      if (this.params.year && this.params.month) index = 2;else if (this.params.month) index = 1;else if (this.params.year) index = 1;else index = 0;
      // 当月份变化时，会导致日期的天数也会变化，如果原来选的天数大于变化后的天数，则重置为变化后的最大值
      // 比如原来选中3月31日，调整为2月后，日期变为最大29，这时如果day值继续为31显然不合理，于是将其置为29(picker-column从1开始)
      if (this.day > this.days.length) this.day = this.days.length;
      this.valueArr.splice(index, 1, this.getIndex(this.days, this.day));
    },
    setHours: function setHours() {
      var bh = +this.hourBegin;
      var eh = +this.hourEnd;
      this.hours = this.generateArray(bh, eh);
      this.valueArr.splice(this.valueArr.length - 1, 1, this.getIndex(this.hours, this.hour));
    },
    setMinutes: function setMinutes() {
      if (+this.minutesInterval > 1) {
        var inter = +this.minutesInterval < 60 ? +this.minutesInterval : 59;
        for (var i = 0; i < 60; i += inter) {
          this.minutes.push(i);
        }
      } else {
        this.minutes = this.generateArray(0, 59);
      }
      this.valueArr.splice(this.valueArr.length - 1, 1, this.getIndex(this.minutes, this.minute));
    },
    setSeconds: function setSeconds() {
      this.seconds = this.generateArray(0, 59);
      this.valueArr.splice(this.valueArr.length - 1, 1, this.getIndex(this.seconds, this.second));
    },
    backClick: function backClick() {
      this.backClickClose && this.close();
    },
    open: function open() {
      this.pickerShow = true;
    },
    close: function close() {
      this.pickerShow = false;
    },
    // 小于10前面补0，用于月份，日期，时分秒等
    formatNumber: function formatNumber(num) {
      return +num < 10 ? '0' + num : String(num);
    },
    // 标识滑动开始，只有微信小程序才有这样的事件
    pickstart: function pickstart() {
      this.moving = true;
    },
    // 标识滑动结束
    pickend: function pickend() {
      this.moving = false;
    },
    // 用户更改picker的列选项
    change: function change(e) {
      console.log('change', e);
      this.valueArr = e.detail.value;
      var i = 0;
      // 这里使用i++，是因为this.valueArr数组的长度是不确定长度的，它根据this.params的值来配置长度
      // 进入if规则，i会加1，保证了能获取准确的值
      if (this.params.year) this.year = this.years[this.valueArr[i++]];
      if (this.params.month) this.month = this.months[this.valueArr[i++]];
      if (this.params.day) this.day = this.days[this.valueArr[i++]];
      if (this.params.hour) this.hour = this.hours[this.valueArr[i++]];
      if (this.params.minute) this.minute = this.minutes[this.valueArr[i++]];
      if (this.params.second) this.second = this.seconds[this.valueArr[i++]];
    },
    // 用户点击确定按钮
    getResult: function getResult() {
      var event = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
      if (this.moving) return;
      var result = {};
      // 只返回用户在this.params中配置了为true的字段
      if (this.params.year) result.year = this.formatNumber(this.year || 0);
      if (this.params.month) result.month = this.formatNumber(this.month || 0);
      if (this.params.day) result.day = this.formatNumber(this.day || 0);
      if (this.params.hour) result.hour = this.formatNumber(this.hour || 0);
      if (this.params.minute) result.minute = this.formatNumber(this.minute || 0);
      if (this.params.second) result.second = this.formatNumber(this.second || 0);
      if (this.params.timestamp) result.timestamp = this.getTimestamp();
      if (event) this.$emit(event, result);
      this.close();
    },
    // 获取时间戳
    getTimestamp: function getTimestamp() {
      // yyyy-mm-dd为安卓写法，不支持iOS，需要使用"/"分隔，才能二者兼容
      var time = this.year + '/' + this.month + '/' + this.day + ' ' + this.hour + ':' + this.minute + ':' + this.second;
      return new Date(time).getTime() / 1000;
    }
  }
};
exports.default = _default2;

/***/ }),

/***/ 1273:
/*!****************************************************************************************************************************!*\
  !*** G:/PHP_dev/340-paopaoji/V3/paopao-v3-uinapp/components/time-picker/time-picker.vue?vue&type=style&index=0&lang=scss& ***!
  \****************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_time_picker_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./node_modules/mini-css-extract-plugin/dist/loader.js??ref--8-oneOf-1-0!./node_modules/css-loader/dist/cjs.js??ref--8-oneOf-1-1!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-2!./node_modules/postcss-loader/src??ref--8-oneOf-1-3!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/sass-loader/dist/cjs.js??ref--8-oneOf-1-4!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-5!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./time-picker.vue?vue&type=style&index=0&lang=scss& */ 1274);
/* harmony import */ var _D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_time_picker_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_time_picker_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_time_picker_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_time_picker_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_hbuilderx_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_time_picker_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 1274:
/*!********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js??ref--8-oneOf-1-0!./node_modules/css-loader/dist/cjs.js??ref--8-oneOf-1-1!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-2!./node_modules/postcss-loader/src??ref--8-oneOf-1-3!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/sass-loader/dist/cjs.js??ref--8-oneOf-1-4!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-5!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!G:/PHP_dev/340-paopaoji/V3/paopao-v3-uinapp/components/time-picker/time-picker.vue?vue&type=style&index=0&lang=scss& ***!
  \********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(false) { var cssReload; }
  

/***/ })

}]);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/components/time-picker/time-picker.js.map
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'components/time-picker/time-picker-create-component',
    {
        'components/time-picker/time-picker-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('2')['createComponent'](__webpack_require__(1268))
        })
    },
    [['components/time-picker/time-picker-create-component']]
]);
