var tools = {
	httpOne: 'https://test.mh.test.laibinwl.cn/api/', //域名 线上
	// httpOne: 'http://192.168.1.192:8043/api/', //域名 线上
	httpUrl: 'https://test.mh.test.laibinwl.cn', //域名 线上
	showtt: function(add1, add2) {
		uni.showToast({
			title: add1,
			duration: 2000,
			icon: add2 ? add2 : 'none'
		})
	},
	showload: function() {
		uni.showLoading({
			mask: true,
		})
	},
	// 跳转下一页
	goNext(gourl) {
		uni.navigateTo({
			url: gourl
		})
	},
	// 返回上一页
	goBack(num) {
		uni.navigateBack({
			delta: num
		})
	},
	// 跳转tabar页面
	goTab(url) {
		uni.switchTab({
			url: url
		})
	},
	// 关闭所有页面，跳转到指定页面
	goAllClose(url) {
		uni.reLaunch({
			url: url
		})
	},
	// 关闭当前页，跳转下一页
	goClose(url) {
		uni.redirectTo({
			url: url
		})
	},
	//正常请求 
	//请求格式 method POST GET
	//请求地址 url
	//请求参数 data
	//加载中的框  showLoads
	axios: function(method, url, data, showLoads) {
		if (showLoads) {
			uni.showLoading({
				'title': showLoads
			})
		}; //加载中的框  showLoads
		return new Promise((resolve, reject) => {
			uni.request({
				url: this.httpOne + url, //请求地址 url
				method: method, //请求格式 method POST GET
				data: data, //请求参数 data
				header: {
					'Content-Type': 'application/json;charset=utf-8'
				},
				success: (res) => {
					if (showLoads) {
						uni.hideLoading()
					}
					resolve(res.data)
				},
				fail: (err) => {
					reject(err)
				},
				complete() {

				}
			})
		})
	},
	//FROM的请求
	//请求格式 method POST GET
	//请求地址 url
	//请求参数 data
	//加载中的框  showLoads
	axiosFrom: function(method, url, data, showLoads) {
		if (showLoads) {
			uni.showLoading({
				'title': showLoads
			})
		}; //加载中的框
		return new Promise((resolve, reject) => {
			uni.request({
				url: this.httpOne + url, //请求地址 url
				method: method, //请求格式 method POST GET
				data: data, //请求参数 data
				header: {
					'content-Type': 'application/x-www-form-urlencoded',
				},
				success: (res) => {
					if (showLoads) {
						uni.hideLoading()
					}
					resolve(res.data)
				},
				fail: (err) => {
					reject(err)
				},
				complete() {

				}
			})
		})
	},
	//FROM的请求 token
	//请求格式 method POST GET
	//请求地址 url
	//请求参数 data
	//加载中的框  showLoads
	axiosFromToken: function(method, url, data, showLoads) {
		let token = uni.getStorageSync('token') || ''; //用户的token
		if (showLoads) {
			uni.showLoading({
				'title': showLoads
			})
		}; //加载中的框
		return new Promise((resolve, reject) => {
			uni.request({
				url: this.httpOne + url, //请求地址 url
				method: method, //请求格式 method POST GET
				data: data, //请求参数 data
				header: {
					'content-Type': 'application/x-www-form-urlencoded',
					'token': token
				},
				success: (res) => {
					if (showLoads) {
						uni.hideLoading()
					}
					resolve(res.data)
				},
				fail: (err) => {
					reject(err)
				},
				complete() {

				}
			})
		})
	},
	// from表单的输入
	formInfo(data) {
		let show = true
		for (let key in data) {
			const value = data[key]
			if (!value) {
				uni.showToast({
					title: '未填写完整',
					icon: 'none'
				})

				show = false;
				break;
			}
		}
		return show;
	},

	noPassByMobile(str) {
		if (null != str && str != undefined) {
			var pat = /(\d{3})\d*(\d{4})/;
			return str.replace(pat, '$1****$2');
		} else {
			return "";
		}
	},


	getLiveTimeCount: function(startTime) {
		if (startTime) { //如果设置了开始时间
			this.liveCountTimes = setInterval(() => {
				//注：不论安卓还是ios，请将时间如 2020-02-02 20:20:20 转化为 2020/02/02 20:20:20 这种形式后再使用，否则无法转换，如下转换即可↓
				let transedPreTime = startTime.replace(/-/g, '/') //这里转化时间格式为以/分隔形式
				let nowTime = new Date().getTime();
				let preTime = new Date(transedPreTime).getTime()
				let obj = null;
				if (preTime - nowTime > 0) {
					let time = (preTime - nowTime) / 1000;
					let day = parseInt(time / (60 * 60 * 24));
					let hou = parseInt(time % (60 * 60 * 24) / 3600);
					let min = parseInt(time % (60 * 60 * 24) % 3600 / 60);
					let sec = parseInt(time % (60 * 60 * 24) % 3600 % 60);
					obj = {
						day: day < 10 ? '0' + day : day,
						hou: hou < 10 ? '0' + hou : hou,
						min: min < 10 ? '0' + min : min,
						sec: sec < 10 ? '0' + sec : sec
					};
					this.liveCountdown = obj.day + '天' + obj.hou + '时' + obj.min + '分' + obj.sec + '秒'
					console.log(this.liveCountdown)
				} else {
					obj = {
						day: '00',
						hou: '00',
						min: '00',
						sec: '00'
					};
					this.liveCountdown = obj.day + '天' + obj.hou + '时' + obj.min + '分' + obj.sec + '秒'
					clearInterval(this.liveCountTimes)
				}
			}, 1000)
		} else {
			this.liveCountdown = "开始时间待定"
		}
	},
	// 判断身份证号    
	isSfz(idcard) {
		var id =
			/^[1-9][0-9]{5}(19|20)[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|31)|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))[0-9]{3}([0-9]|x|X)$/
		if (idcard === '') {
			uni.showToast({
				title: '请输入身份证号',
				icon: 'none'
			})
		} else if (!id.test(idcard)) {
			uni.showToast({
				title: '身份证号格式不正确!',
				icon: 'none'
			})
			return false
		} else {
			return false
		}
	},
	// 判断是否是手机号   
	isPhone(val) {
		var patrn = /^(((1[3456789][0-9]{1})|(15[0-9]{1}))+\d{8})$/
		if (!patrn.test(val) || val === '') {
			uni.showToast({
				title: '手机号格式不正确',
				icon: 'none'
			})
			return false
		} else {
			return true
		}
	},
	// 判断邮箱
	isEmail(email) {
		if (email.search(/^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/) != -1)
			return true;
		else
			return false;
	},
	// 时间戳转时间
	timestampToTime(timestamp) {
		var date = new Date(timestamp); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
		var Y = date.getFullYear() + '-';
		var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
		var D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' ';
		var h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
		var m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
		var s = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds());
		return Y + M + D + h + m + s;
	},
	/**
	 * 判断是否是中文
	 * @param str
	 * @returns {Boolean}
	 */
	isChine: function(str) {
		var reg = /^([u4E00-u9FA5]|[uFE30-uFFA0])*$/;
		if (reg.test(str)) {
			return false;
		}
		return true;
	},
	/*验证是否为图片*/
	tmCheckImage: function(fileName) {
		return /(gif|jpg|jpeg|png|GIF|JPG|PNG)$/ig.test(fileName);
	},
	/*验证是否为视频*/
	tmCheckVideo: function(fileName) {
		return /(mp4|mp3|flv|wav)$/ig.test(fileName);
	},
	// 判断密码是否符合 至少6位,包括大小写字母、数字、特殊字符
	isPassword(val) {
		var reg = /^(?![0-9]+$)(?![a-z]+$)(?![A-Z]+$)(?!([^(0-9a-zA-Z)])+$)^.{8,16}$/;
		if (val === '') {
			uni.showToast({
				title: '请输入密码',
				icon: 'none'
			})
		} else if (!reg.test(val)) {
			uni.showToast({
				title: '至少6位,包括大小写字母、数字、特殊字符',
				icon: 'none'
			})
			return false
		} else {
			return true
		}
	},
}




export default tools;
