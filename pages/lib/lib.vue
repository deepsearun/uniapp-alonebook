<template>
	<view>
		<!-- 自定义导航栏 -->
		<!-- <book-navbar title="书库"></book-navbar> -->
		<uni-status-bar></uni-status-bar>
		<!-- tabs -->
		<view class="flex align-center justify-between">
			<view style="width: 240rpx;" class="ml-1">
				<u-tabs :list="tabs" :is-scroll="false" bar-width="35" :current="current" @change="changeTab"
					font-size="32" active-color="#ef5952" name="title"></u-tabs>
			</view>
			<view class="mr-4">
				<u-icon name="search" size="42" class="mr-4" @click="search()()"></u-icon>
				<u-icon :name="popShow ? 'grid-fill' : 'grid'" color="#333333" size="42" @click="openPop()"></u-icon>
			</view>
		</view>
		<!-- 弹出层 -->
		<u-popup v-model="popShow" mode="bottom" height="700rpx">
			<view class="flex flex-column p-3">
				<view class="flex align-center mb-3">
					<view class="f8 font32 pop-mw">
						状态
					</view>
					<view class="flex flex-wrap align-center">
						<book-select-btn class="mb-2 mr-2" :name="item.name"
							v-for="(item,index) in fromData.status.list" :key="index+'a'"
							:class="fromData.status.list[index].val == fromData.status.active ? 'bg-hon white' : ''"
							:index="index" @click="changeSelect('status',index)">
						</book-select-btn>
					</view>
				</view>

				<view class="flex align-center mb-3">
					<view class="f8 font32 pop-mw">
						排序
					</view>
					<view class="flex flex-wrap align-center">
						<book-select-btn class="mb-2 mr-2" :name="item.name" v-for="(item,index) in fromData.sort.list"
							:key="index+'x'"
							:class="fromData.sort.list[index].val == fromData.sort.active ? 'bg-hon white' : ''"
							:index="index" @click="changeSelect('sort',index)">
						</book-select-btn>
					</view>
				</view>

				<view class="flex align-center justify-between mb-2">
					<view class="f8 font32 pop-mw">
						字数
					</view>
					<view class="flex flex-wrap align-center">
						<book-select-btn class="mb-2 mr-2" :name="item.name" v-for="(item,index) in fromData.word.list"
							:key="index+'c'"
							:class="fromData.word.list[index].val == fromData.word.active ? 'bg-hon white' : ''"
							:index="index" @click="changeSelect('word',index)">
						</book-select-btn>
					</view>
				</view>

				<view class="flex align-center mb-3">
					<view class="f8 font32 pop-mw">
						更新
					</view>
					<view class="flex flex-wrap align-center">
						<book-select-btn class="mb-2 mr-2" :name="item.name"
							v-for="(item,index) in fromData.update.list" :key="index+'g'"
							:class="fromData.update.list[index].val == fromData.update.active ? 'bg-hon white' : ''"
							:index="index" @click="changeSelect('update',index)">
						</book-select-btn>
					</view>
				</view>
			</view>
		</u-popup>

		<view class="mt-4 flex">

			<scroll-view :scroll-y="true" class="nav" :style="{'height':scrollH+'px'}" style="width: 210rpx;">
				<view class="flex flex-column ml-3">
					<view class="mb-5" @click="changeTag(index)" v-for="(item,index) in category" :key="index+'q'"
						:class="tagCurrent == index ? 'tab-item-active' : ' font26'">{{item.title}}</view>
				</view>
			</scroll-view>

			<scroll-view :scroll-y="true" class="nav" :style="{'height':scrollH+'px'}" @scrolltolower="loadMore">
				<view class="flex mr-1 flex-column">
					<book-item-y v-for="(item,index) in novel.list" :key="index+'l'" :item="item"></book-item-y>
				</view>
				<view class="flex align-center justify-center">
					<u-loadmore :status="novel.loadStatus" margin-top="20" margin-bottom="40"
						icon-color="#ef5952" font-size="26" />
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	import libMixin from '@/pages/lib/mixin/libMixin.js';
	export default {
		mixins: [libMixin],
		data() {
			return {
				popShow: false,
				pH: 0,
				scrollH: 2000,
			}
		},
		onLoad() {
			uni.showLoading({
				title: '加载中',
			});
			this.getTabs();
			this.getCategory();
		},
		onReady() {
			uni.getSystemInfo({
				success: (res) => {
					this.pH = res.windowHeight //windoHeight为窗口高度，主要使用的是这个
					let titleH = uni.createSelectorQuery().select(".nav"); //想要获取高度的元素名（class/id）
					titleH.boundingClientRect(data => {
						let pH = this.pH;
						this.scrollH = pH - data.top; //计算高度：元素高度=窗口高度-元素距离顶部的距离（data.top）
					}).exec();
				}
			});
		},
		methods: {
			changeTab(index) {
				this.tagCurrent = 0;
				this.current = index;
				this.reset();
				this.getCategory(this.tabs[index].id);
			},
			search(){
				uni.navigateTo({
					url: '/pages/search/search'
				});
			},
			changeTag(index) {
				this.tagCurrent = index;
				this.reset();
				this.getList();
			},
			openPop() {
				this.popShow = !this.popShow;
			},
			closePop() {
				this.popShow = false;
			},
			changeSelect(name, index) {
				this.fromData[name].active = this.fromData[name].list[index].val;
				this.reset();
				this.getList();
			},
			reset() {
				this.novel.page = 1;
				this.novel.list = [];
				this.novel.loadStatus = 'loading';
			}
		}
	}
</script>

<style lang="scss" scoped>
	.pop-mw {
		min-width: 110rpx;
	}

	.tab-item-active {
		position: relative;
		color: #000;
		font-size: 26rpx;
	}

	.tab-item-active::before {
		margin-left: -30rpx;
		content: "";
		position: absolute;
		border-left: 4px solid #ef5952;
		height: 32rpx;
		left: 0;
		top: 6rpx;
	}
</style>
