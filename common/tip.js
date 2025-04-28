let tip = (title,icon="none")=>{
	uni.showToast({
		title,
		icon
	})
}

let phoneReg = /^1((34[0-8])|(8\d{2})|(([35][0-35-9]|4[579]|66|7[35678]|9[1389])\d{1}))\d{7}$/

module.exports = {
	tip,
	phoneReg,
}