<template>
	<view class="p-2">
		<u-navbar title="编辑资料" title-color="#333" back-icon-color="#222" :border-bottom="false" title-bold  title-size="31">
			<view slot="right" class="mr-2" style="margin-bottom: 8rpx;" @click="submit()">
				<text class="hon f7" style="font-size: 28rpx;">完成</text>
			</view>
		</u-navbar>
		<view class="flex flex-column justify-center align-center m-4">
			<u-avatar size="160" :src="userInfo.headimgurl" @click="setAvatar()">
			</u-avatar>
			<view class="mt-2" @click="setAvatar()" style="font-size: 27rpx;">点击更换头像</view>
		</view>
		<view class="mx-1 mb-5 pb-3">
			<u-form :model="userInfo" ref="uForm">
				<u-form-item label="昵称">
					<u-input v-model="userInfo.nickname" placeholder="请输入昵称" />
				</u-form-item>
				<u-form-item label="性别">
					<u-input v-model="userInfo.sex" type="select" @click="openSexSheet()" placeholder="请选择性别" />
				</u-form-item>
				<u-form-item label="邮箱">
					<u-input v-model="userInfo.email" placeholder="请输入邮箱" />
				</u-form-item>
				<u-form-item label="地区">
					<u-input v-model="addr.value" type="select" placeholder="请选择地区" @click="openAddrPick()" />
				</u-form-item>
				<u-form-item label="简介">
					<u-input v-model="userInfo.introduce" placeholder="请输入简介,可为空" />
				</u-form-item>
			</u-form>
		</view>

		<u-action-sheet :list="sex.list" @click="sexClick" v-model="sex.show"></u-action-sheet>
		<u-picker mode="region" v-model="addr.show" @confirm="addrSelect" :default-region="addr.default"></u-picker>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				userInfo: {},
				addr: {
					show: false,
					value: "",
					default: []
				},
				sex: {
					show: false,
					list: [{
							text: '男'
						},
						{
							text: '女'
						},
						{
							text: '保密'
						}
					]
				}
			}
		},
		onLoad(e) {
			this.userInfo = JSON.parse(decodeURIComponent(e.userInfo));
			this.addr.value = this.userInfo.province + '-' + this.userInfo.city + '-' + this.userInfo.area;
		},
		onReady() {
			this.addr.default = [this.userInfo.province, this.userInfo.city, this.userInfo.area];
		},
		methods: {
			openSexSheet() {
				this.sex.show = !this.sex.show;
			},
			openAddrPick() {
				this.addr.show = !this.addr.show;
			},
			sexClick(index) {
				this.userInfo.sex = this.sex.list[index].text;
			},
			addrSelect(e) {
				this.addr.value = e.province.label + '-' + e.city.label + '-' + e.area.label;
				this.userInfo.province = e.province.label;
				this.userInfo.city = e.city.label;
				this.userInfo.area = e.area.label;
				this.addr.default = [e.province.label, e.city.label, e.area.label];
			},
			setAvatar() {
				this.checkAuth(() => {
					uni.chooseImage({
						count: 1,
						success: res => {
							this.$api.changeAvatar(res.tempFilePaths[0]).then(req => {
								this.$H.msg(req.msg);
								this.userInfo.headimgurl = req.data.url;
							});
						}
					});
				});
			},
			submit() {
				if (!this.$H.isEmail(this.userInfo.email)) {
					this.$H.msg('请输入正确的邮箱地址');
					return;
				}
				this.$api.changeInfo({
					nickname: this.userInfo.nickname,
					email: this.userInfo.email,
					sex: this.userInfo.sex.length ? this.userInfo.sex : '保密',
					addr: this.addr.value,
					introduce: this.userInfo.introduce
				}).then(res => {
					if (!res) return;
					if (res.errorCode) return this.$H.msg(res.msg);
					this.$store.commit('saveUser', this.userInfo);
					uni.navigateBack({
						delta: 1
					});
				});
			}
		}
	}
</script>

<style lang="less">
	.info {
		margin-top: 70rpx;

		&-title {
			font-size: 28rpx;
			font-weight: 500;
		}

		input {
			font-size: 28rpx;
			color: gray;
		}
	}

	.submit {
		width: 570rpx;
		height: 90rpx;
		border-radius: 50rpx;
		text-align: center;

		&-text {
			line-height: 90rpx;
			font-size: 32rpx;
		}
	}
</style>
