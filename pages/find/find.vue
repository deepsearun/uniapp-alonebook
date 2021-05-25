<template>
	<view>
		<!-- 自定义导航栏 -->
		<!-- #ifndef H5 -->
		<book-navbar title="发现"></book-navbar>
		<view class="mb-3"></view>
		<!-- #endif -->

		<!-- H5页面 显示LOGO以及下载链接 -->
		<book-h5-head></book-h5-head>


		<view class="px-3">

			<!-- 轮播图 -->
			<view style="margin: 0 -30rpx;">
				<u-swiper :list="slider" name="image_url" mode="rect" :effect3d="true" height="280" bg-color="#fff">
				</u-swiper>
			</view>
			
			<!-- 猜你喜欢 -->
			<view class="mt-5 section">
				<u-section title="猜你喜欢" sub-title="更多" font-size="31" :show-line="false" @click="more('猜你喜欢','like')">
				</u-section>
			</view>

			<view class="pt-4">

				<!-- 书籍卡片 -->
				<book-card v-if="list.like.length" :item="list.like[0]"></book-card>

				<!-- 书籍横向列表 -->
				<view class="flex align-center justify-between mt-3 bookitem flex-wrap">
					<book-item v-for="(item,index) in list.like" :key="index" :item="item" v-if="index > 0"></book-item>
				</view>

			</view>
			<book-gap style="margin: 0 -30rpx;"></book-gap>
			<!-- 最近更新-->
			<view class="mt-3 section">
				<u-section title="最近更新" sub-title="更多" font-size="31" :show-line="false" @click="more('最近更新','update')">
				</u-section>
			</view>

			<view class="mt-4">
				<book-item-y v-for="(item,index) in list.update" :key="index" :item="item"></book-item-y>
			</view>

			<book-gap style="margin: 0 -30rpx;"></book-gap>

			<!-- 热门分类 -->
			<view class="mt-3 section">
				<u-section title="热门分类" sub-title="更多" font-size="31" :show-line="false" @click="$H.toTab('lib/lib')">
				</u-section>
			</view>

			<view class="pt-4 flex flex-wrap justify-between">


				<book-class-bigcard v-for="(item,index) in list.category" :key="index" :item="item">
				</book-class-bigcard>

			</view>
			<book-gap style="margin: 0 -30rpx;"></book-gap>
			<!-- 人气推荐 -->
			<view class="mt-3 section">
				<u-section title="人气推荐" sub-title="更多" font-size="31" :show-line="false" @click="more('人气推荐','hits')">
				</u-section>
			</view>

			<view class="mt-4">
				<book-item-y v-for="(item,index) in list.novel.hits" :key="index" :item="item"></book-item-y>

			</view>
			<book-gap style="margin: 0 -30rpx;"></book-gap>
			<!-- 热门完本 -->
			<template v-if="list.novel.end.length">
				<view class="mt-3 section">
					<u-section title="热门完本" sub-title="更多" font-size="31" :show-line="false"
						@click="$H.toTab('lib/lib')"></u-section>
				</view>

				<view class="pt-4 flex align-center justify-between flex-wrap bookitem">
					<book-item v-for="(item,index) in list.novel.end" :key="index" :item="item"></book-item>
				</view>
			</template>
			<book-gap style="margin: 0 -30rpx;"></book-gap>
			<template v-if="list.novel.ser.length">
				<!-- 热门连载 -->
				<view class="mt-3 section">
					<u-section title="热门连载" sub-title="更多" font-size="31" :show-line="false"
						@click="$H.toTab('lib/lib')"></u-section>
				</view>

				<view class="py-4 flex align-center justify-between flex-wrap bookitem">
					<book-item v-for="(item,index) in list.novel.ser" :key="index" :item="item"></book-item>
				</view>
			</template>

			<u-loadmore class="py-3" status="nomore" v-if="list.like.length" />
		</view>

	</view>
	</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				slider: this.$H.cache('find_slider') || [],
				list: {
					update: [],
					like: [],
					category: [],
					novel: {
						hits: [],
						end: [],
						ser: []
					}
				}
			}
		},
		onPullDownRefresh() {
			setTimeout(() => {
				this.loadData();
				uni.stopPullDownRefresh();
			}, 500);
		},
		onLoad() {
			uni.showLoading({
				mask: true,
				title: '加载中'
			});
			this.loadData();
		},
		methods: {
			loadData() {
				this.getSlider();
				this.likeBook();
				setTimeout(() => {
					this.newBook();
					this.categoryHits();
				}, 100);
				setTimeout(() => {
					this.getNovelHits('hits', {
						pageSize: 6,
						hits: 'day'
					});
					this.getNovelHits('end', {
						pageSize: 9,
						serialize: 1,
						hits: 'week'
					});
					this.getNovelHits('ser', {
						pageSize: 9,
						serialize: 2,
						hits: 'week'
					});
					setTimeout(function() {
						uni.hideLoading();
					}, 300);
				}, 100)
			},
			likeBook() {
				this.$api.likeBook({
					pageSize: 4
				}).then(res => {
					this.list.like = res.data.list;
				});
			},
			newBook() {
				this.$api.newBook({
					pageSize: 5
				}).then(res => {
					this.list.update = res.data.list;
				});
			},
			getNovelHits(key, params) {
				this.$api.novelHits(params).then(res => {
					this.list.novel[key] = res.data.list;
				});
			},
			categoryHits() {
				this.$api.categoryHits({
					pageSize: 4
				}).then(res => {
					this.list.category = res.data.list;
				});
			},
			download() {
				window.location.href = $C.appDownloadUrl;
				return;
			},
			getSlider() {
				this.$api.getSlider().then(res => {
					this.slider = res.data.list;
					this.$H.cache('find_slider', this.slider);
				});
			},
			more(title, type) {
				uni.navigateTo({
					url: '/pages/find/more/more?title=' + title + '&type=' + type,
				});
			}
		}
	}
</script>

<style lang="less" scoped>
	.grid-text {
		margin-top: 13rpx;
	}

	.section {
		// margin-left: -30rpx;

		&-rank {
			margin-left: -45rpx;
			margin-right: -35rpx;
		}
	}
</style>
