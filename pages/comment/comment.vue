<template>
	<view>
		<nav-bar type="transparentFixed" :title="info.title" :scrollTop="scrollTop"
			transparentFixedFontColor="rgba(0, 0, 0, 0)">
			<view slot="left" style="padding-left: 15px;" @click="$H.back()">
				<u-icon name="arrow-left" :size="45"></u-icon>
			</view>
			<view slot="transparentFixedLeft" style="padding-left: 15px;color: #FFFFFF;">
				<u-icon name="arrow-left" :size="45" @click="$H.back()"></u-icon>
			</view>
			<view slot="right" @click="repost()">
				<u-icon name="plus" :size="45" style="margin-right: 30rpx;"></u-icon>
			</view>
			<view slot="transparentFixedRight" style="color: #FFFFFF;" @click="repost()">
				<u-icon name="plus" :size="45" style="margin-right: 30rpx;"></u-icon>
			</view>
		</nav-bar>
		<view class="status_bar" v-if="info.pic">
			<!-- 背景 -->
			<view class="bg" :style="{'background-image':'url('+$H.loadImg(info.pic)+')'}"></view>
			<!-- 头部 -->
			<detail-header :item="info" @author="toAuthor"></detail-header>
			<!-- 回复输入框 -->
			<comment-input2 ref="cinput2" @submit="sendComment"></comment-input2>
			<!-- 头部 -->
			<view class="main">
				<view class="flex align-center justify-between bg-bai" style="height: 85rpx;">
					<view class="ml-2 font30">书评 · {{info.commentNum}}</view>
					<view class="mr-2">
						<text :class="current ? 'gray' : 'hon'" @click="changeTab(0)">最新</text>
						<text class="mx-1" style="color: #CECECE;">|</text>
						<text :class="current ? 'hon' : 'gray'" @click="changeTab(1)">热门</text>
					</view>
				</view>
				<book-gap :height="8"></book-gap>
				<!-- 列表 item -->
				<view class="p-3" v-if="list.data.length">
					<comment-item v-for="(item,index) in list.data" :key="index" :item="item" :index="index"
						@repost="repost" @support="doSupport">
					</comment-item>
					<u-loadmore class="py-1" :status="list.loadStatus" icon-color="#ef5952" />
				</view>

				<!-- 评论输入框 -->
				<comment-input ref="cinput" @submit="sendComment"></comment-input>
			</view>
		</view>
	</view>
</template>

<script>
	var statusBar = uni.getSystemInfoSync().statusBarHeight;
	export default {
		data() {
			return {
				scrollTop: 0,
				statusBarHeight: statusBar,
				info: {},
				current: 0,
				index: 0,
				list: {
					page: 1,
					pageSize: 10,
					loadStatus: 'loading',
					data: []
				}
			};
		},
		onLoad(e) {
			this.info = JSON.parse(e.info);
			this.loadData();
		},
		methods: {
			onPageScroll(e) {
				this.scrollTop = e.scrollTop;
			},
			toAuthor() {
				uni.navigateTo({
					url: '/pages/detail/author/author?title=' + this.info.author,
				});
			},
			reset() {
				this.list.page = 1;
				// this.list.data = [];
				this.list.loadStatus = 'loading';
			},
			changeTab(index) {
				this.current = index;
				this.reset();
				this.loadData();
			},
			loadData() {
				this.$api.getComment(this.info.id, {
					page: this.list.page,
					pageSize: this.list.pageSize,
					desc: this.current == 1 ? 'up' : 'id'
				}).then(res => {
					if (res.data.page == 1) {
						this.list.data = res.data.list;
					} else {
						this.list.data = this.list.data.concat(res.data.list);
					}
					this.list.loadStatus = 'loadmore';
					if (res.data.list.length < 10) this.list.loadStatus = 'nomore';
				});
			},
			doSupport(index) {
				let comment = this.list.data[index];
				if (comment.isSupport) {
					return this.$H.msg('你已经点过赞了');
				}
				comment.isSupport = true;
				comment.up += 1;
				this.$api.supportComment(comment.id).then(res => {
					this.$H.msg(res.msg);
				});
			},
			sendComment(e) {
				this.$api.sendComment({
					content: e.content,
					pid: e.pid,
					rate: e.rate,
					novel_id: this.info.id
				}).then(res => {
					if (!e.pid) {
						this.list.data.unshift(res.data);
						this.info.commentNum += 1;
					} else {
						// 回复的评论
						let data = this.list.data[this.index];
						// 回复评论的回复
						let dataChild = data.child;
						let index = dataChild.findIndex(v => v.id === e.pid);
						if (index != -1) { // 回复别人的回复
							let dataChild2 = dataChild[index].child;
							dataChild2.push(res.data);
						} else { // 普通回复
							data.childNum += 1;
							dataChild.push(res.data);
						}
					}
					this.$H.msg('发表成功');
				});
			},
			repost(e = 0, index = 0) {
				if (e) {
					let input2 = this.$refs['cinput2'];
					input2.show = true;
					input2.sendData.nickname = e.user.nickname;
					input2.sendData.pid = e.id;
				} else {
					this.$refs['cinput'].show = true;
				}
				this.index = index;
			},
			loadMore() {
				if (this.list.loadStatus != 'loadmore') return;
				this.list.page += 1;
				this.list.loadStatus = 'loading';
				this.loadData();
			},
			onReachBottom() {
				this.loadMore();
			},
		}
	}
</script>

<style lang="scss">
	page {
		overflow-x: hidden;
	}

	.status_bar {
		height: calc(var(--status-bar-height) + 220px);
		background-color: #938c8c;
		width: 100%;

		.bg {
			width: 100%;
			height: 100%;
			filter: blur(80rpx);
		}
	}

	.base-text {
		color: gray;
	}

	.main {
		width: 100%;
		background-color: #fff;
		position: absolute;
		top: calc(var(--status-bar-height) + 200px);
	}

	.comment {
		height: 85rpx;
		background-color: #F8F8F8;

		.comment-input {
			background-color: #fff;
			border-radius: 8rpx;
			width: 600rpx;
			font-size: 25rpx;
			padding: 15rpx;
			margin-left: 10rpx;
		}
	}
</style>
