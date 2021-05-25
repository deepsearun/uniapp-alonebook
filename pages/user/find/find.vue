<template>
	<view>
		<uni-status-bar></uni-status-bar>
		<view class="login">
			<view class="login-label">
				找回密码
			</view>
			<view class="login-input">
				<input type="text" placeholder="请输入找回用户名" confirm-type="done" maxlength="25" v-model="user" class="login-input-inn" />
			</view>
			<view class="btn bg-hei" @click="submit()">
				<text class="btn-text">下一步</text>
			</view>

			<view class="mt-5 flex align-center justify-between font27">
				<view @click="reg()">
					注册账号
				</view>
				<view @click="login()">
					返回登录
				</view>
			</view>
			<view class="flex flex-column tc bottom">
				<!-- <view>
					<u-divider color="#222" border-color="#cccccc">第三方登录</u-divider>
				</view>
				<view class="bottom-icon">
					<u-icon name="weixin-circle-fill" color="#c5c6c5" size="80" class="mx-3"></u-icon>
					<u-icon name="qq-circle-fill" color="#c5c6c5" size="80" class="mx-4"></u-icon>
					<u-icon name="weibo-circle-fill" color="#c5c6c5" size="80" class="mx-3"></u-icon>
				</view> -->
				<view>
					<text>登录即代表同意</text><text class="bottom-text">《阅读协议》</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				user: ''
			};
		},
		onLoad(e) {
			this.user = e.user ? e.user : '';
		},
		methods: {
			reg() {
				uni.redirectTo({
					url: '/pages/user/reg/reg'
				});
			},
			login() {
				uni.redirectTo({
					url: '/pages/user/login/login'
				});
			},
			submit() {
				if (!this.user.length) return this.$H.msg('请输入用户名');
				uni.showLoading({
					title: '正在效验',
					mask: false
				});
				this.$api.find(this.user).then(res => {
					if (!res) return;
					if (res.errorCode) return this.$H.msg(res.msg);
					uni.hideLoading();
					uni.showLoading({
						title: '验证成功',
						mask: false
					});
					setTimeout(() => {
						uni.hideLoading();
						uni.navigateTo({
							url: '/pages/user/setPass/setPass?email=' + res.data
						});
					}, 1000);
				})
			}
		}
	}
</script>

<style lang="less">
@import "../login/login.less";
</style>
