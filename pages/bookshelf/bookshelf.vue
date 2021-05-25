<template>
	<view>
		<nav-bar type="transparentFixed" :titleCenter="false" :scrollTop="scrollTop"
			transparentFixedFontColor="rgba(0, 0, 0, 0)">
			<view slot="">
				<text style="font-weight: bold;font-size: 44rpx;margin-right:10rpx;">书架</text>
			</view>
			<view slot="right">
				<view class="pr-3">
					<u-icon name="search" color="#333" size="42" @click="search()"></u-icon>
					<u-icon class="ml-4" :name="itemType ? 'grid' : 'list'" color="#333" size="44"
						@click="changeItemType"></u-icon>
				</view>
			</view>
			<view slot="transparentFixedRight" style="color: #000000;">
				<view class="pr-3">
					<u-icon name="search" color="#333" size="42" @click="search()"></u-icon>
					<u-icon class="ml-4" :name="itemType ? 'grid' : 'list'" color="#333" size="44"
						@click="changeItemType"></u-icon>
				</view>
			</view>
		</nav-bar>
		<view class="status_bar">
			<view
				style="margin-left:40px;text-align:center;margin-top: calc(var(--status-bar-height) + 60px);position: absolute;">
				<view style="font-weight: bold;font-size: 70rpx;">{{parseInt($store.state.user.read_time / 60)}}</view>
				<text class="font27">累计阅读/分钟</text>
			</view>
		</view>
		<!-- 	<view class="card mx-2" v-if="this.list.data.length">
			<view class="flex px-2 pt-1 align-center">
				<view class="mt-1 mr-3 ml-1">
					<image class="card-img" :src="$H.loadImg(this.list.data[0].novel.pic)" mode="aspectFill">
					</image>
				</view>
				<view class="flex flex-column justify-between" style="width: 470rpx;">
					<view>
						<text class="f7 font29">{{$H.ellipsis(this.list.data[0].novel.title,10)}}</text>
						<text class="font24 gray ml-2">{{this.list.data[0].novel.author}}</text>
					</view>
					<view class="card-cap text-ellipsis1">更新至 {{this.list.data[0].novelChapter.updated.title}}</view>
					<view class="card-cap">
						{{this.list.data[0].reading.length ? '正在读 '+this.list.data[0].reading.title : '暂未开始阅读'}}
					</view>
				</view>
				<view class="mt-10">
					<view class="card-btn">
						<text class="mx-1">{{this.list.data[0].reading.length ? '继续阅读' : '开始阅读'}}</text>
						<u-icon name="arrow-right" color="#fff" size="22" style="margin-top: 3rpx;"></u-icon>
					</view>
				</view>
			</view>
		</view> -->
		<view class="flex align-center flex-wrap justify-between p-3 booksfitem">
			<block v-for="(item,index) in list.data" :key="index">
				<template v-if="!itemType">
					<book-shelf-item :item="item" @logo="showModal"></book-shelf-item>
				</template>
				<template v-else>
					<book-shelf-item-list :item="item" @logo="showModal"></book-shelf-item-list>
				</template>
			</block>
		</view>
		<u-modal v-model="modal.show" :content="modal.content" :async-close="true" show-cancel-button @confirm="del()">
		</u-modal>
		<u-loadmore style="padding: 30rpx 0 50rpx 0" :status="list.loadStatus" />
	</view>
</template>

<script>
	var statusBarHeight = uni.getSystemInfoSync().statusBarHeight;
	export default {
		data() {
			return {
				scrollTop: 0,
				statusBar: statusBarHeight,
				modal: {
					id: 0,
					show: false,
					content: '您确定要将该书从书架移除吗？'
				},
				list: {
					loadStatus: 'nomore',
					data: this.$H.cache('bookshelf_list') || []
				},
				itemType: this.$H.cache('bookshelf_itemType') || 0
			};
		},
		async onLoad() {
			this.loadData();
		},
		onPullDownRefresh() {
			this.loadData();
		},
		onPageScroll(e) {
			this.scrollTop = e.scrollTop;
		},
		methods: {
			changeItemType() {
				this.itemType = !this.itemType ? 1 : 0;
				this.$H.cache('bookshelf_itemType', this.itemType);
			},
			showModal(e = 0) {
				this.modal.id = e;
				this.modal.show = !this.modal.show;
			},
			del() {
				this.$api.bookshelfDel(this.modal.id).then(res => {
					this.loadData();
					setTimeout(() => {
						this.showModal();
					}, 500);
					this.$H.msg('移除成功');
				});
			},
			async loadData() {
				let res = await this.$api.bookshelf();
				if (res) {
					this.list.data = res.data.list;
					this.$H.cache('bookshelf_list', this.list.data);
					uni.stopPullDownRefresh();
				}
			},
			search() {
				uni.navigateTo({
					url: '/pages/search/search'
				});
			}
		}
	}
</script>

<style>
	.status_bar {
		height: calc(var(--status-bar-height) + 180px);
		width: 100%;
		background-image: url(../../static/style/bj.jpg);
		background-position: center;
		position: relative;
	}
</style>
<style lang="less">
	.booksfitem::after {
		content: '';
		width: 200rpx;
	}

	.tabs {
		width: 13px;
		background-color: rgb(51, 51, 51);
		height: 3px;
		border-radius: 3px;
		position: absolute;
		bottom: 0;
	}

	.tab-item {
		color: #9c9bad;
		font-size: 30rpx;
	}

	.tab-active-item {
		font-weight: bold;
		color: #333;
		font-size: 44rpx;
	}

	.card {
		position: absolute;
		top: calc(var(--status-bar-height) + 150px);
		width: 710rpx;
		border-radius: 25rpx;
		height: 190rpx;
		background-color: #fff;
		margin-bottom: 30rpx;
		box-shadow: #d4d2d2 0px 0px 20rpx;

		&-img {
			width: 120rpx;
			height: 155rpx;
			border-radius: 10rpx;
		}

		&-cap {
			font-size: 22rpx;
			color: gray;
			margin-top: 15rpx;
		}

		&-btn {
			width: 180rpx;
			height: 55rpx;
			border-radius: 50rpx;
			color: #fff;
			display: flex;
			align-items: center;
			justify-content: center;
			font-size: 27rpx;
			background-image: linear-gradient(to right, #fd717c, #fc4c7b);
		}
	}
</style>
