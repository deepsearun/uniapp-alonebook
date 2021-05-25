<template>
	<view>
		<u-navbar :title="info.title" title-color="#222" back-icon-color="#222" title-bold title-size="31"
			:border-bottom="false">
		</u-navbar>
		<view class="px-3 pt-2">
			<view style="position: sticky;" :style="{top:statusH+44+'px'}">
				<view class="flex align-center justify-between bg-bai" style="height: 50rpx;">
					<view class="font23 gray flex text-ellipsis1" style="width: 500rpx;">
						<text class="mr-1">{{info.serialize ? '已完结' : '连载中'}}</text>
						<text>{{info.serialize ? '完结至'+info.updated.title : '更新至'+info.updated.title}}</text>
					</view>
					<view class="flex align-center" @click="changeDesc()">
						<text class="iconfont">&#xe60f;</text>
						<text class="font23">{{desc ? '正序' : '倒序'}}</text>
					</view>
				</view>
			</view>
			<!-- 章节列表 -->
			<view class="my-3">

				<template v-if="!desc">
					<block v-for="(item,index) in chapter" :key="index">
						<chapter-list-item :item="item"></chapter-list-item>
					</block>
				</template>
				
				<template v-else>
					<block v-for="(item,index) in descChapter" :key="index">
						<chapter-list-item :item="item"></chapter-list-item>
					</block>
				</template>

			</view>
		</view>
	</view>
</template>

<script>
	var statusBar = uni.getSystemInfoSync().statusBarHeight;
	export default {
		data() {
			return {
				info: {},
				chapter:[],
				descChapter:[],
				desc: false,
				statusH: statusBar
			}
		},
		onLoad(e) {
			uni.showLoading({
				title: '加载中',
				mask: true
			});
			this.info = JSON.parse(e.info);
			this.loadData();
		},
		methods: {
			loadData() {
				this.$api.getChapterList(this.info.id).then(res => {
					let arrs = [];
					for(let i in res.data.chapter){
						arrs.push(res.data.chapter[i]);
					}
					arrs.reverse()
					this.chapter = res.data.chapter;
					this.descChapter = arrs;
					uni.hideLoading();
				});
			},
			changeDesc() {
				this.desc = !this.desc;
			}
		}
	}
</script>

<style>

</style>
