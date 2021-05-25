<template>
	<view class="p-3">
		<u-navbar :title="title" title-color="#222" back-icon-color="#222" title-bold
			title-size="31" :border-bottom="false">
		</u-navbar>
		<view class="mt-1 flex flex-wrap">
			<book-item-y v-for="(item,index) in list.data" :key="index" :item="item"></book-item-y>
		</view>
		<u-loadmore class="pt-2" :status="list.loadStatus" v-if="list.data.length" />
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: '查看更多',
				type: '',
				list: {
					page: 1,
					pageSize: 10,
					loadStatus: 'loading',
					data: []
				}
			}
		},
		onLoad(e) {
			uni.showLoading({
				mask: true,
				title: '加载中'
			});
			this.title = e.title;
			this.type = e.type;
			this.loadData();
		},
		methods: {
			loadData() {
				switch (this.type) {
					case 'like':
						this.like();
						break;
					case 'update':
						this.update();
						break;
					case 'hits':
						this.hits();
						break;
				}
			},
			like() {
				this.$api.likeBook({
					pageSize: this.list.pageSize
				}).then(res => {
					this.list.data = res.data.list;
					this.list.loadStatus = 'nomore';
					setTimeout(()=>{
						uni.hideLoading();
					},300);
				});
			},
			update() {
				this.$api.newBook({
					page: this.list.page,
					pageSize: this.list.pageSize
				}).then(res => {
					if (res.data.page == 1) {
						this.list.data = res.data.list;
					} else {
						this.list.data = this.list.data.concat(res.data.list);
					}
					this.list.loadStatus = 'loadmore';
					if (res.data.list.length < 10) this.list.loadStatus = 'nomore';
					setTimeout(()=>{
						uni.hideLoading();
					},300);
				});
			},
			hits() {
				this.$api.novelHits({
					page: this.list.page,
					pageSize: this.list.pageSize,
					hits: 'week'
				}).then(res => {
					if (res.data.page == 1) {
						this.list.data = res.data.list;
					} else {
						this.list.data = this.list.data.concat(res.data.list);
					}
					this.list.loadStatus = 'loadmore';
					if (res.data.list.length < 10) this.list.loadStatus = 'nomore';
					setTimeout(()=>{
						uni.hideLoading();
					},300);
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
		}
	}
</script>

<style>

</style>
