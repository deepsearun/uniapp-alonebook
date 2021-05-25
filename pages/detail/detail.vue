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
			<view slot="right" @click="share()">
				<u-icon name="share-fill" :size="45" style="margin-right: 30rpx;"></u-icon>
			</view>
			<view slot="transparentFixedRight" style="color: #FFFFFF;" @click="share()">
				<u-icon name="share" :size="45" style="margin-right: 30rpx;"></u-icon>
			</view>
		</nav-bar>
		<view class="status_bar" v-if="info.title">
			<!-- 背景 -->
			<view class="bg" :style="{'background-image':'url('+$H.loadImg(info.pic)+')'}"></view>
			<!-- 头部 -->
			<detail-header :item="info" @author="toAuthor"></detail-header>
			<!-- 回复输入框 -->
			<comment-input2 ref="cinput2" @submit="sendComment"></comment-input2>
			<view class="main">
				<!-- 点评 -->
				<view class="flex align-center border-bottom-hui pb-3">
					<view class="flex flex-column mr-5">
						<view>
							<text class="rate mr-15">{{info.rating}}</text>
							<u-rate :current="info.rating" :disabled="true" size="36" active-color="#333"></u-rate>
						</view>
						<view class="font23 base-text">
							{{info.rating_count}}人点评
						</view>
					</view>

					<view class="flex flex-column ml-2">
						<view>
							<text class="rate mr-1">{{info.hits}}</text>
							<text class="font27">人</text>
						</view>
						<view class="font23 base-text">
							正在阅读
						</view>
					</view>
				</view>

				<!-- 书籍简介 -->
				<view class="mt-4 base-text border-bottom-hui pb-4 font28">
					“ {{info.content}}
				</view>
				<view class="flex align-center justify-between mt-25" @click="toRead()">
					<view class="font32 f5">最新章节</view>
					<view class="base-text font24 text-ellipsis1" style="max-width: 280rpx;">
						{{info.serialize ? '完结至'+info.chapter.updated.title : '更新至'+info.chapter.updated.title}}
					</view>
					<view class="base-text font24 flex align-center"><text
							class="mr-15">{{$u.timeFormat(info.chapter.updated.update_time)}}更新</text>
						<u-icon name="arrow-right" :size="26"></u-icon>
					</view>
				</view>
				<book-gap style="margin: 25rpx -40rpx 0 -40rpx;"></book-gap>

				<!-- 书评 -->
				<view class="mt-3 pb-2">

					<!-- 头部 -->
					<view class="flex align-center justify-between">
						<view class="font33 f5">书评 · {{info.rating_count}}</view>
						<view class="base-text font25 flex align-center" @click="repost()">
							<text class="mr-1">我要评论</text>
							<u-icon name="arrow-right" :size="25"></u-icon>
						</view>
					</view>

					<!-- 评分显示 -->
					<view class="bg-hui flex align-center justify-between w100 mt-35 px-3" style="height: 90rpx;"
						@click="repost()">
						<view class="gray">轻点评分</view>
						<view>
							<u-rate :disabled="true" size="38"></u-rate>
						</view>
					</view>

					<!-- 列表 item -->
					<view class="mt-4">
						<comment-item v-for="(item,index) in comment" :key="index" :item="item" @repost="repost"
							:index="index" @support="doSupport">
						</comment-item>
						<view v-if="info.commentNum" class="base-text font28 tc mb-1" @click="toComment()">
							查看全部评论({{info.commentNum}})</view>
					</view>
				</view>

				<book-gap style="margin: 0 -40rpx 0 -40rpx;"></book-gap>

				<!-- 作者写过 -->
				<template v-if="aboutAuthor.length > 1">
					<view class="mt-3">
						<!-- 头部 -->
						<view class="flex align-center justify-between">
							<view class="font33 f5">作者写过</view>
						</view>
						<view class="pt-3 flex align-center justify-between flex-wrap tc bookitem">
							<book-item v-for="(item,index) in aboutAuthor" :key="index+'ed'" :item="item"
								:author="false">
							</book-item>
						</view>
					</view>
					<book-gap style="margin: 0 -40rpx 0 -40rpx;"></book-gap>
				</template>

				<!-- 猜你喜欢 -->
				<template v-if="like.length">
					<view class="mt-3">
						<!-- 头部 -->
						<view class="flex align-center justify-between">
							<view class="font33 f5">看过这本书的书友还在看</view>
						</view>
						<view class="pt-3 flex align-center justify-between flex-wrap tc bookitem">
							<book-item v-for="(item,index) in like" :key="index+'like'" :item="item" :author="false">
							</book-item>
						</view>
					</view>
				</template>
				<view style="height: 120rpx;"></view>
			</view>
		</view>
		<!-- 底部按钮 -->
		<view class="w100 flex align-center justify-between px-3 btn-bottom" v-if="info.pic">
			<view class="font32" style="margin-left: 110rpx;" :class="!$H.isEmpty(info.bookshelf) ? 'gray' :''"
				@click="bookshelf">
				{{!$H.isEmpty(info.bookshelf) ? '移出书架' : '加入书架'}}
			</view>
			<view class="font32 tc white mr-11 btn-start" @click="toRead()">开始阅读</view>
		</view>
		<!-- 分享 -->
		<book-share ref="book-share"></book-share>
		<!-- 评论输入框 -->
		<comment-input ref="cinput" @submit="sendComment"></comment-input>
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
				comment: {},
				aboutAuthor: {},
				like: {},
				index: 0,
			}
		},
		onLoad(e) {
			uni.showLoading({
				title: '加载中',
			})
			this.init(e.id);
		},
		methods: {
			onPageScroll(e) {
				this.scrollTop = e.scrollTop;
			},
			share() {
				this.$refs['book-share'].show = true;
			},
			toAuthor() {
				uni.navigateTo({
					url: '/pages/detail/author/author?title=' + this.info.author,
				});
			},
			toRead() {
				uni.redirectTo({
					url: '/pages/read/read?info=' + JSON.stringify(this.info)
				});
			},
			toComment() {
				uni.navigateTo({
					url: '/pages/comment/comment?info=' + JSON.stringify(this.info),
				});
			},
			toChapterList() {
				let data = {
					title: this.info.title,
					id: this.info.id,
					serialize: this.info.serialize,
					record: this.info.record,
					updated: this.info.chapter.updated,
					bookshelf: this.info.bookshelf
				};
				uni.navigateTo({
					url: '/pages/read/chapter/chapter?info=' + JSON.stringify(data),
				});
			},
			init(id) {
				// 加载基础信息
				this.$api.detail(id).then(res => {
					this.info = res.data;
					// 作者其他作品
					this.$api.byAuthor(this.info.author, 6).then(res => {
						this.aboutAuthor = res.data.list;
					});
					// 猜你喜欢
					this.$api.categoryRand(this.info.category.id, 6).then(res => {
						this.like = res.data.list
					});
					uni.hideLoading();

					this.check();
				});
				// 加载评论列表
				this.loadComment(id);
			},
			check() {
				if (this.info.serialize) return;
				this.$api.updateChapter(this.info.id).then(res => {
					if (!res.data) return;
					this.init(this.info.id);
					return this.$H.msg('最新章节同步成功');
				});
			},
			bookshelf() {
				if (this.info.bookshelf) {
					this.$api.bookshelfDel(this.info.id).then(res => {
						if (!res) return;
						this.info.bookshelf = 0;
						uni.showToast({
							title: '移除成功',
							icon: 'success',
							duration: 2000
						});
					});
				} else {
					this.$api.bookshelfAdd(this.info.id).then(res => {
						if (!res) return;
						this.info.bookshelf = this.info.id;
						uni.showToast({
							title: '加入成功',
							icon: 'success',
							duration: 2000
						});
					});
				}

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
			loadComment(id) {
				this.$api.getComment(id, {
					pageSize: 5
				}).then(res => {
					this.comment = res.data.list;
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
						this.comment.unshift(res.data);
						this.info.commentNum += 1;
					} else {
						// 回复的评论
						let data = this.comment[this.index];
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
			doSupport(index) {
				let comment = this.comment[index];
				if (comment.isSupport) {
					return this.$H.msg('你已经点过赞了');
				}
				comment.isSupport = true;
				comment.up += 1;
				this.$api.supportComment(comment.id).then(res => {
					this.$H.msg(res.msg);
				});
			},

		}
	}
</script>

<style lang="scss">
	page {
		overflow-x: hidden;

	}

	.status_bar {
		height: calc(var(--status-bar-height) + 230px);
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
		padding: 40rpx;
		width: 100%;
		border-radius: 35rpx;
		background-color: #fff;
		position: absolute;
		top: calc(var(--status-bar-height) + 195px);

		.rate {
			font-size: 55rpx;
			color: #222222;
		}
	}

	.btn-bottom {
		position: fixed;
		height: 120rpx;
		background-color: #fff;
		bottom: 0;

		.btn-start {
			height: 75rpx;
			border-radius: 18rpx;
			line-height: 75rpx;
			width: 320rpx;
			background-color: #ea564f;
		}
	}
</style>
