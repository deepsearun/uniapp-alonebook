<template>
	<view>
		<uni-status-bar></uni-status-bar>
		<view class="login">
			<view class="login-label">
				注册账号
			</view>
			<view class="login-input">
				<input type="text" placeholder="请输入用户名" confirm-type="done" maxlength="25" v-model="user" class="login-input-inn"
				 @input="checkFrom" />
			</view>
			<view class="login-input mt-2">
				<input type="text" placeholder="请输入密码" confirm-type="done" maxlength="25" class="login-input-inn" v-model="pass"
				 password @input="checkFrom" />
			</view>
			<view class="login-input mt-2">
				<input type="text" placeholder="再次输入密码" confirm-type="done" maxlength="25" class="login-input-inn" v-model="repass"
				 password @input="checkFrom" />
			</view>
			<view class="login-input mt-2">
				<input type="text" placeholder="请输入邮箱" confirm-type="done" maxlength="25" class="login-input-inn" v-model="email"
				 @input="checkFrom" />
			</view>
			<view class="btn" @click="submit()" :class="disable ? 'bg-hei' : 'bg-disable disabled'">
				<text class="btn-text">注册</text>
			</view>

			<view class="mt-5 flex align-center justify-between font27">
				<view @click="login()">
					返回登录
				</view>
				<view @click="find()">
					忘记密码？
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
					<text>注册即代表同意</text><text class="bottom-text">《阅读协议》</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				user: '',
				pass: '',
				repass: '',
				email: '',
				disable: false
			};
		},
		methods: {
			login() {
				uni.redirectTo({
					url: '/pages/user/login/login'
				});
			},
			find() {
				uni.redirectTo({
					url: '/pages/user/find/find'
				});
			},
			checkFrom() {
				if (!this.user.length || !this.user.length) {
					return this.disable = false;
				}
				if (this.user.length < 5 || this.pass.length < 6) {
					return this.disable = false;
				}
				if (!this.email.length) {
					return this.disable = false;
				}
				if (!this.repass.length) {
					return this.disable = false;
				}
				this.disable = true;
			},
			submit() {
				if (this.pass != this.repass) return this.$H.msg('两次输入密码不一致');
				if (!this.$H.isEmail(this.email)) return this.$H.msg('邮箱格式错误');
				this.$api.reg({
					username: this.user,
					password: this.pass,
					password_confirm: this.repass,
					email: this.email
				}).then(res => {
					if(!res) return;
					if (res.errorCode) {
						return this.$H.msg(res.msg);
					}
					this.$H.msg('注册成功');
					setTimeout(() => {
						this.login();
					}, 800);
				})
			}
		}
	}
</script>

<style lang="less">
@import "../login/login.less";
</style>
