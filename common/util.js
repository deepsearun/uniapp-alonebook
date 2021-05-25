// 引入全局配置文件
import $C from '@/common/config.js';
export default {
	/**
	 * 判断是否为空
	 * @param {Object} value
	 */
	isEmpty(value) {
		return (value === null || value === '' || value === undefined) ? true : false;
	},
	/**
	 * 去除空格
	 * @param {Object} value
	 */
	trim(value) {
		return value.replace(/(^\s*)|(\s*$)/g, "");
	},
	/**
	 * 是否为手机号
	 * @param {Object} value
	 */
	isMobile(value) {
		return /^(?:13\d|14\d|15\d|16\d|17\d|18\d|19\d)\d{5}(\d{3}|\*{3})$/.test(value);
	},
	/**
	 * 是否为邮箱
	 * @param {Object} email
	 */
	isEmail(email) {
		var reEmail = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/;
		if (!reEmail.test(email)) {
			return false;
		} else {
			return true;
		}
	},
	/**
	 * 是否为QQ
	 * @param {Object} qq
	 */
	isQQ(qq) {
		var reQQ = /^[1-9]\d{4,9}$/;
		if (!reQQ.test(qq)) {
			return false;
		} else {
			return true;
		}
	},

	/**
	 * 快捷输出提示
	 * @param {String} msg
	 */
	msg(msg, duration = 1500) {
		return uni.showToast({
			icon: 'none',
			title: msg,
			duration: duration
		});
	},

	/**
	 * 检测内容中是否带有HTTP
	 */
	checkUrl(url) {
		if ((/(http|https):\/\/([\w.]+\/?)\S*/.test(url)) == true) {
			return url;
		}
		return false;
	},

	/**
	 * 加载图片
	 * @param {Object} url
	 */
	loadImg(url) {
		if(this.isEmpty(url)){
			return '/static/style/default_cover.png';
		}
		if (this.checkUrl(url) === false) {
			return $C.staticUrl + url;
		}
		return url;
	},

	/**
	 * 获取设备ClientID
	 */
	getClientId() {
		// #ifdef APP-PLUS
		const clientInfo = plus.push.getClientInfo()
		return clientInfo.clientid;
		// #endif
		return '';
	},
	/**
	 * 隐藏手机号4位
	 * @param {Object} number
	 */
	hiddenPhone(number) {
		number = "" + number;
		var reg = /(\d{3})\d{4}(\d{4})/;
		return number.replace(reg, "$1****$2")
	},

	/**
	 * 获取当前时间戳
	 */
	getTime() {
		return Math.round(new Date() / 1000);
	},

	/**
	 * 时间转换时间戳
	 * @param {Object} time
	 */
	parseTime(time) {
		return Math.round(new Date(time) / 1000);
	},

	/**
	 * 解析时间戳
	 * @param {Object} timestamp
	 */
	friendlyDate(timestamp) {
		timestamp *= 1000;
		var formats = {
			'year': '%n%年前',
			'month': '%n%月前',
			'day': '%n%天前',
			'hour': '%n%小时前',
			'minute': '%n%分钟前',
			'second': '%n%秒前',
		};

		var now = Date.now();
		var seconds = Math.floor((now - timestamp) / 1000);
		var minutes = Math.floor(seconds / 60);
		var hours = Math.floor(minutes / 60);
		var days = Math.floor(hours / 24);
		var months = Math.floor(days / 30);
		var years = Math.floor(months / 12);

		var diffType = '';
		var diffValue = 0;
		if (years > 0) {
			diffType = 'year';
			diffValue = years;
		} else {
			if (months > 0) {
				diffType = 'month';
				diffValue = months;
			} else {
				if (days > 0) {
					diffType = 'day';
					diffValue = days;
				} else {
					if (hours > 0) {
						diffType = 'hour';
						diffValue = hours;
					} else {
						if (minutes > 0) {
							diffType = 'minute';
							diffValue = minutes;
						} else {
							diffType = 'second';
							diffValue = seconds === 0 ? (seconds = 1) : seconds;
						}
					}
				}
			}
		}
		return formats[diffType].replace('%n%', diffValue);
	},

	/**
	 * 截取指定长度字符，多余部分转换为...
	 * @param {Object} value
	 */
	ellipsis(value, length = 13) {
		if (!value) return '';
		if (value.length > length) {
			return value.slice(0, length) + '...'
		}
		return value
	},

	/**
	 * 将10000+ 缩短为xx万
	 * @param {Object} int
	 */
	numberToShort(int, fixed = 2) {
		if (!typeof int === 'number' || isNaN(int)) return 0;
		if (int.toString().length > 4) return (int / 10000).toFixed(fixed) + '万';
		return int;
	},

	/**
	 * 文件大小转换
	 * @param {Object} size
	 */
	changeSize(size) {
		let num;
		if ((size / 1024) <= 1024) {
			num = size / 1024;
			return num.toFixed(2) + 'KB';
		}
		if ((size / 1024) > 1024 && (size / 1024) <= (1024 * 1024)) {
			num = (size / 1024) / 1024;
			return num.toFixed(2) + 'MB';
		}
		if ((size / 1024) > (1024 * 1024)) {
			num = ((size / 1024) / 1024) / 1024
			return num.toFixed(2) + 'GB';
		}
	},

	/**
	 * 缓存
	 */
	cache(name = null, value = null, time = null, sign = null) {
		let cacheKey = sign != null ? sign + name : $C.cacheSign + name;
		let timeKey = cacheKey + '_time';
		let nowTime = Math.round(new Date() / 1000);
		// 为空获取所有
		if (name == null) return uni.getStorageInfoSync();
		// 设置缓存
		if (value != null && name != null) {
			if (time != null) {
				let expTime = nowTime + time;
				uni.setStorageSync(timeKey, expTime)
			}
			return uni.setStorageSync(cacheKey, value);
		}
		// 获取缓存
		let setTime = uni.getStorageSync(timeKey);
		let cacheData = uni.getStorageSync(cacheKey);
		if (!setTime && cacheData) return cacheData;
		if (setTime <= nowTime) {
			uni.removeStorageSync(timeKey);
			uni.removeStorageSync(cacheKey);
			return false;
		}
		return cacheData ? cacheData : false;
	},

	toTab(path) {
		uni.switchTab({
			url: '/pages/' + path
		});
		return;
	},

	back(delta = 1) {
		uni.navigateBack({
			delta: delta
		});
	},

	toDetail(id) {
		uni.navigateTo({
			url: '/pages/detail/detail?id=' + id
		});
	}
}
