<template>
	<view v-if="pickerShow" class="picker" @click="backClick">
		<view class="main">
			<view class="header" @touchmove.stop.prevent @click.stop>
				<view class="btn" @tap="getResult('cancel')" :style="{color: cancelTextColor}">{{cancelText}}</view>
				<view class="btn" @tap="getResult('confirm')" :style="{color: confirmTextColor}">{{confirmText}}</view>
			</view>
			<view class="body" @click.stop @touchmove.stop.prevent>
				<picker-view :value="valueArr" @change="change" class="picker-view" @pickstart="pickstart"
					@pickend="pickend">
					<picker-view-column v-if="!reset && params.year">
						<view class="column" v-for="(item, index) in years" :key="index">
							{{ item }}
							<text class="text" v-if="showTimeTag">年</text>
						</view>
					</picker-view-column>
					<picker-view-column v-if="!reset && params.month">
						<view class="column" v-for="(item, index) in months" :key="index">
							{{ formatNumber(item) }}
							<text class="text" v-if="showTimeTag">月</text>
						</view>
					</picker-view-column>
					<picker-view-column v-if="!reset && params.day">
						<view class="column" v-for="(item, index) in days" :key="index">
							{{ formatNumber(item) }}
							<text class="text" v-if="showTimeTag">日</text>
						</view>
					</picker-view-column>
					<picker-view-column v-if="!reset && params.hour">
						<view class="column" v-for="(item, index) in hours" :key="index">
							{{ formatNumber(item) }}
							<text class="text" v-if="showTimeTag">时</text>
						</view>
					</picker-view-column>
					<picker-view-column v-if="!reset && params.minute">
						<view class="column" v-for="(item, index) in minutes" :key="index">
							{{ formatNumber(item) }}
							<text class="text" v-if="showTimeTag">分</text>
						</view>
					</picker-view-column>
					<picker-view-column v-if="!reset && params.second">
						<view class="column" v-for="(item, index) in seconds" :key="index">
							{{ formatNumber(item) }}
							<text class="text" v-if="showTimeTag">秒</text>
						</view>
					</picker-view-column>
				</picker-view>
			</view>

		</view>

	</view>
</template>

<script>
	export default {
		name: 'timePicker',
		props: {
			value: {
				default: true,
				type: Boolean
			},
			// picker中需要显示的参数
			params: {
				type: Object,
				default () {
					return {
						year: true,
						month: true,
						day: true,
						hour: true,
						minute: true,
						second: true,
						timestamp: false,
					}
				}
			},
			//左上角文字
			cancelText: {
				type: String,
				default: '取消',
			},

			//右上角文字
			confirmText: {
				type: String,
				default: '确认',
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
			},

		},
		data() {
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
			}
		},
		mounted() {
			this.init()
		},
		computed: {
			currentYear() {
				return `${this.year}`
			},
			currentMonth() {
				return `${this.month}`
			},
			beginYear() {
				return (new Date(this.beginDate).getFullYear())
			},
			endYear() {
				return (new Date(this.endDate).getFullYear())
			},
			beginMonth() {
				return (new Date(this.beginDate).getMonth() + 1)
			},
			endMonth() {
				return (new Date(this.endDate).getMonth() + 1)
			},
			beginDay() {
				return (new Date(this.beginDate).getDate())
			},
			endDay() {
				return (new Date(this.endDate).getDate())
			},
		},
		watch: {
			currentYear() {
				if (this.params.year) this.setMonths()
			},
			currentMonth() {
				this.setDays()
			},
			value(val) {
				this.pickerShow = val;
			},
			pickerShow(val) {
				this.init()
				this.$emit("input", val);
			}
		},
		methods: {
			//日期时间处理
			initTimeValue() {
				// 格式化时间，在IE浏览器(uni不存在此情况)，无法识别日期间的"-"间隔符号
				let dfdate = this.defaultTime.replace(/\-/g, '/')
				let bdate = this.beginDate.replace(/\-/g, '/')
				let edate = this.endDate.replace(/\-/g, '/')
				let time = null
				time = new Date(bdate)
				if (!!dfdate) {
					time = new Date(dfdate) > new Date(bdate) ? new Date(dfdate) : new Date(bdate)
					time = new Date(dfdate) > new Date(edate) ? new Date(edate) : new Date(dfdate)
				}
				// 获取年日月时分秒
				this.year = time.getFullYear()
				this.month = Number(time.getMonth()) + 1
				this.day = time.getDate()
				this.hour = time.getHours()
				this.minute = time.getMinutes()
				this.second = time.getSeconds()
			},
			// 生成递进的数组
			generateArray: function(start, end) {
				// 转为数值格式，否则用户给end-year等传递字符串值时，下面的end+1会导致字符串拼接，而不是相加
				start = Number(start)
				end = Number(end)
				end = end > start ? end : start
				// 生成数组，获取其中的索引，并剪出来
				return [...Array(end + 1).keys()].slice(start)
			},
			getIndex: function(arr, val) {
				let index = arr.indexOf(val)
				// 如果index为-1(即找不到index值)，~(-1)=-(-1)-1=0 (转成相反数在减一)，导致条件不成立
				return ~index ? index : 0
			},
			init() {
				this.valueArr = []
				this.reset = false
				this.initTimeValue()
				if (this.params.year) {
					this.valueArr.push(0)
					this.setYears()
				}
				if (this.params.month) {
					this.valueArr.push(0)
					this.setMonths()
				}
				if (this.params.day) {
					this.valueArr.push(0)
					this.setDays()
				}
				if (this.params.hour) {
					this.valueArr.push(0)
					this.setHours()
				}
				if (this.params.minute) {
					this.valueArr.push(0)
					this.setMinutes()
				}
				if (this.params.second) {
					this.valueArr.push(0)
					this.setSeconds()
				}
			},
			setYears() {
				// 获取年份集合
				this.years = this.generateArray(this.beginYear, this.endYear)
				// 设置this.valueArr某一项的值，是为了让picker预选中某一个值
				this.valueArr.splice(this.valueArr.length - 1, 1, this.getIndex(this.years, this.year))
			},
			setMonths() {
				//结束开始年是同年
				if (this.endYear == this.beginYear) {
					this.months = this.generateArray(this.beginMonth, this.endMonth)
				}
				//开始年为当前选择年
				else if (this.beginYear == this.year) {
					this.months = this.generateArray(this.beginMonth, 12)
				}
				//结束年为当前选择年
				else if (this.endYear == this.year) {
					this.months = this.generateArray(1, this.endMonth)
				} else {
					this.months = this.generateArray(1, 12)
				}
				let index = 0
				if (this.params.year && this.params.month) index = 1
				else index = 0
				this.month = this.months[this.valueArr[index]]
				this.valueArr.splice(index, 1, this.getIndex(this.months, this.month))
			},
			setDays() {
				let totalDays = new Date(this.year, this.month, 0).getDate()
				//结束开始月份是同月份
				if (this.beginMonth == this.endMonth) {
					this.days = this.generateArray(this.beginDay, this.endDay)
				}
				//开始月份为当前选择月
				else if (this.beginMonth == this.month && this.year == this.beginYear) {
					this.days = this.generateArray(this.beginDay, totalDays)
				}
				//结束月份为当前选择月
				else if (this.endMonth == this.month && this.year == this.endYear) {
					this.days = this.generateArray(1, this.endDay)
				}
				//正常月份
				else {
					this.days = this.generateArray(1, totalDays)
				}

				let index = 0
				// 这里不能使用类似setMonths()中的this.valueArr.splice(this.valueArr.length - 1, xxx)做法
				// 因为this.month和this.year变化时，会触发watch中的this.setDays()，导致this.valueArr.length计算有误
				if (this.params.year && this.params.month) index = 2
				else if (this.params.month) index = 1
				else if (this.params.year) index = 1
				else index = 0
				// 当月份变化时，会导致日期的天数也会变化，如果原来选的天数大于变化后的天数，则重置为变化后的最大值
				// 比如原来选中3月31日，调整为2月后，日期变为最大29，这时如果day值继续为31显然不合理，于是将其置为29(picker-column从1开始)
				if (this.day > this.days.length) this.day = this.days.length
				this.valueArr.splice(index, 1, this.getIndex(this.days, this.day))
			},
			setHours() {
				let bh = +this.hourBegin
				let eh = +this.hourEnd
				this.hours = this.generateArray(bh, eh)
				this.valueArr.splice(this.valueArr.length - 1, 1, this.getIndex(this.hours, this.hour))
			},
			setMinutes() {
				if (+this.minutesInterval > 1) {
					let inter = +this.minutesInterval < 60 ? +this.minutesInterval : 59;
					for (let i = 0; i < 60; i += inter) {
						this.minutes.push(i);
					}
				} else {
					this.minutes = this.generateArray(0, 59)
				}
				this.valueArr.splice(this.valueArr.length - 1, 1, this.getIndex(this.minutes, this.minute))
			},
			setSeconds() {
				this.seconds = this.generateArray(0, 59)
				this.valueArr.splice(this.valueArr.length - 1, 1, this.getIndex(this.seconds, this.second))
			},
			backClick() {
				this.backClickClose && this.close()
			},
			open() {
				this.pickerShow = true
			},
			close() {
				this.pickerShow = false
			},
			// 小于10前面补0，用于月份，日期，时分秒等
			formatNumber(num) {
				return +num < 10 ? '0' + num : String(num)
			},
			// 标识滑动开始，只有微信小程序才有这样的事件
			pickstart() {
				// #ifdef MP-WEIXIN
				this.moving = true;
				// #endif
			},
			// 标识滑动结束
			pickend() {
				// #ifdef MP-WEIXIN
				this.moving = false;
				// #endif
			},
			// 用户更改picker的列选项
			change(e) {
				console.log('change', e);
				this.valueArr = e.detail.value;
				let i = 0;
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
			getResult(event = null) {
				// #ifdef MP-WEIXIN
				if (this.moving) return;
				// #endif
				let result = {};
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
			getTimestamp() {
				// yyyy-mm-dd为安卓写法，不支持iOS，需要使用"/"分隔，才能二者兼容
				let time = this.year + '/' + this.month + '/' + this.day + ' ' + this.hour + ':' + this.minute + ':' + this
					.second;
				return new Date(time).getTime() / 1000;
			}
		}

	}
</script>

<style lang="scss">
	.picker {
		/* #ifndef APP-NVUE */
		display: block;
		/* #endif */
		position: fixed;
		z-index: 10;
		bottom: 0;
		left: 0;
		right: 0;
		height: 100vh;
		background: rgba(0, 0, 0, 0.6);
		display: flex;
		flex-direction: column;
		justify-content: flex-end;

		.main {
			width: 100%;

			.header {
				width: 100%;
				height: 90rpx;
				padding: 0 40rpx;
				display: flex;
				flex-direction: row;
				justify-content: space-between;
				align-items: center;
				box-sizing: border-box;
				font-size: 30rpx;
				background: #fff;
				position: relative;


				&::after {
					content: '';
					position: absolute;
					border-bottom: 1rpx solid #eaeef1;
					-webkit-transform: scaleY(0.5);
					transform: scaleY(0.5);
					bottom: 0;
					right: 0;
					left: 0;
				}

				.btn {
					padding: 16rpx;
					box-sizing: border-box;
					text-align: center;
					text-decoration: none;
				}
			}

			.body {
				width: 100%;
				height: 500rpx;
				overflow: hidden;
				background-color: #fff;

				.picker-view {
					height: 100%;
					box-sizing: border-box;

					.item {
						display: flex;
						align-items: center;
						justify-content: center;
						font-size: 32rpx;
						padding: 0 8rpx;

						.text {
							font-size: 24rpx;
							padding-left: 8rpx;
						}
					}
				}
			}
		}
	}
</style>
