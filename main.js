import Vue from 'vue'
import App from './App'
import store from './store/index.js'
import {
	http
} from '@/api/service.js'
import api from '@/api/index.js'

// 引入uview-ui组件
import uView from "uview-ui";
Vue.use(uView);

import navBar from "@/components/zhouWei-navBar";
Vue.component('nav-bar', navBar)

// HTTP请求组件
Vue.prototype.$http = http;

// API封装
Vue.prototype.$api = api;

Vue.prototype.$store = store;

// 引入全局配置文件
import $C from '@/common/config.js';
Vue.prototype.$C = $C;

// 引入助手函数
import $H from '@/common/util.js';
Vue.prototype.$H = $H;

// 主题色
Vue.prototype.$mainColor = '#ef5952';

// 权限验证
Vue.prototype.checkAuth = (callback)=>{
	if(!store.state.loginStatus){
		setTimeout(()=>{
			uni.showToast({
				icon: 'none',
				title: '请先登录'
			});
		},300);
		return uni.navigateTo({
			url: '/pages/user/login/login'
		});
	}
	callback();
}

// 权限验证跳转
Vue.prototype.navigateTo = (options) => {
	if (!store.state.loginStatus) {
		setTimeout(()=>{
			uni.showToast({
				icon: 'none',
				title: '请先登录'
			});
		},300);
		return uni.navigateTo({
			url: '/pages/user/login/login',
		});
	}
	return uni.navigateTo(options);
}

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
	...App
})
app.$mount()
