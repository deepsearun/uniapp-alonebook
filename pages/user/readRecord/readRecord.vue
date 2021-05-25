<template>
	<view class="p-3">
		<u-navbar title="浏览记录" title-color="#222" back-icon-color="#222" title-bold title-size="31" :border-bottom="false">
		</u-navbar>
		<view class="mt-1 flex flex-wrap">
			<book-his-list v-for="(item,index) in list.data" :key="index" :item="item">
			</book-his-list>
		</view>
		<u-loadmore class="pt-2" :status="list.loadStatus" v-if="list.data.length"  />
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: {
					page: 1,
					pageSize: 10,
					loadStatus: 'loading',
					data: []
				}
			}
		},
		onLoad() {
			uni.showLoading({
				mask:true,
				title:'加载中'
			});
			this.loadData();
		},
		methods: {
			async loadData() {
				let res = await this.$api.record({
					page: this.list.page,
					pageSize: this.list.pageSize
				});
				if (res) {
					if (res.data.page == 1) {
						this.list.data = res.data.list;
					} else {
						this.list.data = this.list.data.concat(res.data.list);
					}
					this.list.loadStatus = 'loadmore';
					if (res.data.list.length < 10) this.list.loadStatus = 'nomore';
					uni.hideLoading();
				}
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

<style>

</style>
