import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		loginStatus: false,
		token: '',
		user: {

		},
	},
	mutations: {
		login(state, token) {
			state.loginStatus = true;
			state.token = token;
			uni.setStorageSync('token', token);
		},
		saveUser(state,info){
			state.user = info;
			uni.setStorageSync('user', JSON.stringify(info));
		},
		initLogin(state) {
			let user = uni.getStorageSync('user'),
			token  = uni.getStorageSync('token');
			if (user && token) {
				state.loginStatus = true;
				state.user = JSON.parse(user);
				state.token = token
			}
		},
		logout(state) {
			state.loginStatus = false;
			uni.removeStorageSync('user');
			uni.removeStorageSync('token');
		},
	}
})
