<template>
	<view>
		<u-navbar title="" :border-bottom="true">
			<view style="width: 85%;" class="ml-2">
				<u-search placeholder="输入书名或作者名" v-model="keyword" :show-action="false" placeholder-color="#7a7a7a"
					search-icon-color="#7a7a7a" :input-style="{'fontSize':'26rpx'}" height="56" @search="submit()"
					@change="searchComplete" @focus="focusChange()" @blur="blurChange()" style="line-height: 120rpx;">
				</u-search>
			</view>
		</u-navbar>


		<template v-if="!doSearch">
			<view class="p-3" v-if="!focus && !keyword">
				<!-- 搜索热词 -->
				<view class="hei">大家都在搜</view>
				<view class="flex align-center flex-wrap my-1">
					<block v-for="(item,index) in wordsList" :key="index">
						<view class="hot-word" @click="clickWord(item.word)">
							<text class="font24" :class="index <= 1 ? 'hon': 'hei'">{{item.word}}</text>
						</view>
					</block>
				</view>

				<!-- 搜索历史 -->
				<view class="flex align-center justify-between mb-35 my-35">
					<text class="hei">搜索历史</text>
					<text class="font27" @click="dumpHistory()">清空</text>
				</view>
				<view class="flex align-center flex-wrap mt-1">
					<block v-for="(item,index) in hisList" :key="index">
						<view class="his-word mr-2 mb-2" @click="clickWord(item)">
							<text class="font24 hei">{{item}}</text>
						</view>
					</block>
				</view>
			</view>

			<!-- 搜索补齐  -->
			<view class="px-4" v-else>
				<block v-for="(item2,index2) in completeList.author" :key="index2+'author'">
					<search-complete-list :item="item2" :isAuthor="true"></search-complete-list>
				</block>
				<block v-for="(item,index) in completeList.title" :key="index">
					<search-complete-list :item="item" @doSearch="clickWord"></search-complete-list>
				</block>
			</view>
		</template>

		<template v-else>
			<!-- 书籍列表 -->
			<view class="p-3 flex flex-wrap">
				<block v-for="(item,index) in list.data" :key="index" :item="item">
					<view class="flex align-center mb-2" @click="$H.toDetail(item.id)">
						<view>
							<u-lazy-load :image="$H.loadImg(item.pic)" img-mode="aspectFill" style="width: 125rpx;"
								height="175" border-radius="8" loading-img="" :is-effect="false">
							</u-lazy-load>
						</view>
						<view class="ml-2 flex flex-column justify-between mb-1" style="height: 175rpx;">
							<view class="text-ellipsis1 f5 font29"><text v-html="item.title"></text></view>
							<view class="gray font24 text-ellipsis2">{{item.content}}</view>
							<view class="gray text-ellipsis1 font24">
								<text v-html="item.author"></text>
								<text class="mx-1">·</text>
								{{item.serialize ? '完结' : '连载'}}
								<text class="mx-1">·</text>
								{{$H.numberToShort(item.word)}}字
							</view>
						</view>
					</view>
				</block>
			</view>
			<template v-if="noData">
				<u-empty mode="search" icon-size="210"></u-empty>
				<book-gap style="margin: 30rpx 0;"></book-gap>
				<view class="mt-2 px-4">
					<view class="font33 f5 mb-3">猜你喜欢</view>
					<view class="flex justify-between flex-wrap bookitem">
						<book-item v-for="(item,index) in like" :key="index" :item="item" :author="false">
						</book-item>
					</view>
				</view>
			</template>

			<u-loadmore class="py-2" :status="list.loadStatus" v-if="list.data.length" />
		</template>

	</view>
</template>


<script>
	export default {
		data() {
			return {
				keyword: '',
				wordsList: this.$H.cache('hotWords') || [],
				hisList: uni.getStorageSync('search_cache') || [],
				completeList: [],
				doSearch: false,
				focus: false,
				noData: false,
				like: this.$H.cache('search_like') || [],
				list: {
					page: 1,
					pageSize: 10,
					loadStatus: 'loading',
					data: {}
				}
			}
		},
		onLoad() {
			this.hotWords();
		},
		methods: {
			submit() {
				uni.showLoading({
					mask: true,
					title: '搜索中'
				});
				this.resetSearch();
				this.startSearch();
				this.saveSearchLog();
				this.loadData();
			},
			loadData() {
				this.$api.search(this.keyword,this.list.page,this.list.pageSize).then(res => {
					for (let i = 0; i < res.data.list.length; i++) {
						let oReg = new RegExp(this.keyword, "g");
						let replaceString;
						replaceString = '<text class="hon">' + this.keyword + '</text>';
						res.data.list[i].author = res.data.list[i].author.replace(oReg, replaceString);
						replaceString = '<text class="hon">' + this.keyword + '</text>';
						res.data.list[i].title = res.data.list[i].title.replace(oReg, replaceString);
					}
					if (res.data.page == 1) {
						this.list.data = res.data.list;
					} else {
						this.list.data = this.list.data.concat(res.data.list);
					}
					this.noData = false;
					if (!res.data.list.length) {
						this.$api.categoryRand(0, 9).then(r => {
							this.like = r.data.list;
							this.$H.cache('search_like', this.like);
						});
						this.noData = true;
					}
					this.list.loadStatus = 'loadmore';
					if (res.data.list.length < this.list.pageSize) this.list.loadStatus = 'nomore';
					// 收起键盘
					uni.hideKeyboard();
					// 加载结束
					uni.hideLoading();
				});
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
			clickWord(e) {
				this.startSearch();
				this.keyword = e;
				this.submit();
			},
			startSearch() {
				this.doSearch = true;
			},
			focusChange() {
				this.focus = true;
				this.doSearch = false;
				this.searchComplete(this.keyword);
			},
			blurChange() {
				this.focus = false;
			},
			resetSearch() {
				this.list.loadStatus = 'loading';
				this.list.page = 1;
				this.list.data = [];
			},
			hotWords() {
				this.$api.hotWords().then(res => {
					this.wordsList = res.data.list;
					this.$H.cache('hotWords', this.wordsList);
				});
			},
			searchComplete(e) {
				if (this.doSearch) return;
				if (e == '') {
					this.blurChange();
					this.doSearch = false;
					this.completeList = [];
					return;
				}
				this.$u.debounce(() => {
					this.$api.searchComplete(e).then(res => {
						this.completeList = res.data.list;
					});
				}, 300);
			},
			saveSearchLog() {
				uni.getStorage({
					key: 'search_cache',
					success: (res) => {
						let list = res.data;
						if (list.length > 20) {
							for (let item of list) {
								if (item == this.keyword) {
									return;
								}
							}
							list.pop();
							list.unshift(this.keyword);
						} else {
							for (let item of list) {
								if (item == this.keyword) {
									return;
								}
							}
							list.unshift(this.keyword);
						}
						this.hisList = list;
						uni.setStorage({
							key: 'search_cache',
							data: this.hisList
						});
					},
					fail: () => {
						this.hisList = [];
						this.hisList.push(this.keyword);
						uni.setStorage({
							key: 'search_cache',
							data: this.hisList
						});
					}
				})
			},
			dumpHistory() {
				this.hisList = [];
				uni.setStorage({
					key: 'search_cache',
					data: []
				});
			}
		}
	}
</script>

<style lang="less">
	page {
		overflow-x: hidden;

	}

	.hot-word {
		border: 1rpx solid #e8e8e8;
		border-radius: 26rpx;
		padding: 8rpx 20rpx;
		margin-right: 20rpx;
		margin-top: 16rpx;
		line-height: 38rpx;
	}

	.his-word {
		background-color: #e6e6e8;
		padding: 12rpx 15rpx;
		border-radius: 8rpx;
		line-height: 30rpx;
	}
</style>
