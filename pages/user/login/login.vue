<template>
	<view>
		<uni-status-bar></uni-status-bar>
		<view class="login">
			<view class="login-label">
				账号密码登录
			</view>
			<view class="login-input">
				<input type="text" placeholder="请输入用户名或邮箱" confirm-type="done" maxlength="25" v-model="user" class="login-input-inn"
				 @input="checkFrom" />
			</view>
			<view class="login-input mt-2">
				<input type="text" placeholder="请输入登录密码" confirm-type="done" maxlength="25" class="login-input-inn" v-model="pass"
				 password @input="checkFrom" />
			</view>
			<view class="btn" @click="submit()" :class="disable ? 'bg-hei' : 'bg-disable disabled'">
				<text class="btn-text">登录</text>
			</view>

			<view class="mt-5 flex align-center justify-between font27">
				<view @click="reg()">
					注册账号
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
				user: '',
				pass: '',
				disable: false
			};
		},
		methods: {
			reg() {
				uni.redirectTo({
					url: '/pages/user/reg/reg'
				});
			},
			find() {
				uni.redirectTo({
					url: '/pages/user/find/find?user=' + this.user
				});
			},
			checkFrom() {
				if (!this.user.length || !this.user.length) {
					return this.disable = false;
				}
				if (this.user.length < 5 || this.pass.length < 6) {
					return this.disable = false;
				}
				this.disable = true;
			},
			submit() {
				if (!this.disable) return this.$H.msg('用户名或密码不正确');
				this.$api.login(this.user, this.pass).then(res => {
					if (!res) return;
					if (res.errorCode) return this.$H.msg(res.msg);
					let token = res.data.token;
					this.$store.commit('login', token);
					this.$api.userinfo().then(res => {
						if (res.errorCode) return this.$U.msg(res.msg);
						this.$store.commit('saveUser', res.data);
						return uni.navigateBack({
							delta: 1
						});
					});
				})
			}
		}
	}
</script>

<style lang="less" scoped>
@import "login.less";
</style>
