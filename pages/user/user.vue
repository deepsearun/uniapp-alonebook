<template>
	<view class="px-2">
		<!-- 自定义导航栏 -->
        <uni-status-bar></uni-status-bar>
		<view class="my-7 flex justify-center" v-if="!$store.state.loginStatus">
			<view class="flex align-center flex-column">
				<view style="font-size: 34rpx;" class="f7 mb-3">
					登录后将同步书架及阅读记录
				</view>
				<view class="btn" @click="login()">
					<text class="mx-1">立即登录</text>
				</view>
			</view>
		</view>
		<view class="flex align-center justify-between p-2" @click="editInfo()" style="height: 200rpx;"
			hover-class="bg-hui" v-else>
			<view>
				<u-avatar :src="$H.loadImg(userInfo.headimgurl)" size="110"></u-avatar>
			</view>
			<view class="flex flex-column mb-1" style="width: 480rpx;">
				<view style="font-size: 33rpx;" class="f6 text-ellipsis1">{{userInfo.nickname}}</view>
				<view class="font23 mt-15 gray">阅读{{readTime}} 读过{{userInfo.read_count}}本
				</view>
			</view>
			<view class="mr-1">
				<u-icon name="arrow-right" color="gray"></u-icon>
			</view>
		</view>
		<book-gap style="margin: 0 -20rpx;"></book-gap>
		<u-cell-group bg-color="#fff" :border="false">
			<u-cell-item icon="bookmark" title="我的书架" @click="$H.toTab('bookshelf/bookshelf')"></u-cell-item>
			<u-cell-item icon="eye" title="浏览记录" @click="navigateTo({url:'/pages/user/readRecord/readRecord'})">
			</u-cell-item>
			<u-cell-item icon="heart" title="阅读偏好" :value="readLikeSelect.label.name" @click="readLike()"></u-cell-item>
			<u-cell-item icon="share" title="邀请好友" @click="share()"></u-cell-item>
			<u-cell-item icon="lock-open" title="注销登录" @click="logout()"></u-cell-item>
		</u-cell-group>

		<u-select v-model="readLikeSelect.show" :list="readLikeList" @confirm="readLikeConfirm"></u-select>
		<book-share ref="book-share"></book-share>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				userInfo: this.$store.state.user || {},
				readLikeSelect: {
					show: false,
					label: this.$H.cache('readLike') || {
						id: 0,
						name: ''
					}
				},
				readLikeList: []
			}
		},
		onShow() {
			this.userInfo = this.$store.state.user;
		},
		async onLoad() {
			let cache = this.$H.cache('read_like_list'),
				res = [];
			if (cache) {
				res = cache;
			} else {
				res = await this.$api.getCategoryTop();
				this.$H.cache('read_like_list', res);
			}
			for (var i = 0; i < res.data.list.length; i++) {
				let item = {
					value: res.data.list[i].id,
					label: res.data.list[i].title
				};
				this.readLikeList.push(item);
			}
		},
		computed: {
			readTime() {
				let time = this.userInfo.read_time,
					h, i;
				if (time > 3600) {
					h = parseInt(time / 3600);
					i = parseInt(time % 3600 / 60);
					return i > 0 ? h + '小时' + i + '分钟' : h + '小时';
				} else {
					return parseInt(time / 60) + '分钟'
				}

			}
		},
		methods: {
			login() {
				uni.navigateTo({
					url: '/pages/user/login/login'
				});
			},
			editInfo() {
				uni.navigateTo({
					url: '/pages/user/info/info?userInfo=' + encodeURIComponent(JSON.stringify(this.userInfo))
				});
			},
			share() {
				this.$refs['book-share'].show = true;
			},
			readLike() {
				this.readLikeSelect.show = !this.readLikeSelect.show;
			},
			readLikeConfirm(e) {
				this.readLikeSelect.label.id = e[0].value;
				this.readLikeSelect.label.name = e[0].label;
				this.$H.cache('readLike', this.readLikeSelect.label);
			},
			logout() {
				if (!this.$store.state.loginStatus) {
					return this.$H.msg('您还没有登录');
				}
				this.$api.logout().then(res => {
					this.$H.msg(res.msg);
					this.$store.commit('logout');
				});
			},
			setting() {

			}
		}
	}
</script>

<style lang="less">
	.btn {
		width: 220rpx;
		height: 70rpx;
		border-radius: 50rpx;
		color: #fff;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 27rpx;
		background-color: #333;
		// background-image: linear-gradient(to right, #fd717c, #fc4c7b);
	}
</style>
