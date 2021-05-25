<template>
	<view>
		<uni-status-bar></uni-status-bar>
		<view class="login">
			<view class="login-label">
				重置新密码
			</view>
			<view style="color: #333;" class="font26">验证码已发送至邮箱(<text class="hon">{{email}}</text>)</view>
			<view class="login-input mt-2">
				<input type="text" placeholder="请输入新密码" confirm-type="done" maxlength="18" class="login-input-inn" v-model="pass"
				 password @input="checkFrom" />
			</view>
			<view class="login-input mt-2">
				<input type="text" placeholder="请再次输入新密码" confirm-type="done" maxlength="18" class="login-input-inn" v-model="repass"
				 password @input="checkFrom" />
			</view>
			<view class="login-input mt-2 flex align-center justify-between">
				<input type="number" placeholder="请输入验证码" confirm-type="done" maxlength="4" v-model="code" class="login-input-inn"
				 @input="checkFrom" />
				 <view class="font27 mr-2" style="height: 100%;line-height: 90rpx;" @click="getCode">
					 {{getCodeTime === 0 ? '重新获取' : getCodeTime+' s'}}
				 </view>
			</view>
			<view class="btn" @click="submit()" :class="disable ? 'bg-hei' : 'bg-disable disabled'">
				<text class="btn-text">保存</text>
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
				pass: '',
				repass:'',
				code:'',
				email:'',
				getCodeTime: 0,
				disable: false
			};
		},
		onLoad(e) {
			this.email = e.email;
			this.startCodeTime();
		},
		methods: {
			reg(){
				uni.redirectTo({
					url: '/pages/user/reg/reg'
				});
			},
			login(){
				uni.redirectTo({
					url: '/pages/user/login/login'
				});
			},
			getCode() {
				if (this.getCodeTime > 0) return false;
				this.$api.getCode(this.email).then(res => {
					this.startCodeTime();
				});
			},
			startCodeTime(){
				this.getCodeTime = 60;
				let timer = setInterval(() => {
					if (this.getCodeTime >= 1) {
						this.getCodeTime--;
					} else {
						this.getCodeTime = 0;
						clearInterval(timer);
					}
				}, 1000);
			},
			checkFrom() {
				if (this.pass.length < 6) {
					return this.disable = false;
				}
				if (this.repass.length < 6 || this.code.length != 4) {
					return this.disable = false;
				}
				this.disable = true;
			},
			submit() {
				if (this.pass != this.repass) return this.$H.msg('两次输入密码不一致');
				this.$api.setNewPass({
					password:this.pass,
					password_confirm:this.repass,
					email:this.email,
					code:this.code
				}).then(res => {
					if(!res) return;
					if(res.errorCode) return this.$H.msg(res.msg);
					this.$H.msg('设置新密码成功');
					setTimeout(()=>{
						this.login();
					},800);
				})
			}
		}
	}
</script>

<style lang="less">
@import "../login/login.less";
</style>
