<template>
	<view class="p-3">
		<u-navbar :title="title" title-color="#222" back-icon-color="#222" title-bold
			title-size="31" :border-bottom="false">
			<template slot="right">
				<view class="pr-3">
					<u-icon class="ml-4" name="grid" color="#222" size="41" @click="clickScreen()"></u-icon>
				</view>
			</template>
		</u-navbar>
		<view class="mt-1 flex flex-wrap">
			<book-item-y v-for="(item,index) in list.data" :key="index" :item="item"></book-item-y>
		</view>
		<book-screen ref="screen" @change="changeScreen"></book-screen>
		<u-loadmore class="pt-2" :status="list.loadStatus" v-if="list.data.length" />
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: '分类',
				cid: '',
				list: {
					page: 1,
					pageSize: 10,
					loadStatus: 'loading',
					data: []
				},
				fromData: {
					status: {
						active: 'all',
					},
					sort: {
						active: 'all',
					},
					word: {
						active: 'all',
					},
					update: {
						active: 'all',
					}
				}
			}
		},
		onLoad(e) {
			uni.showLoading({
				mask:true,
				title:'加载中'
			});
			this.title = e.title;
			this.cid = e.cid;
			this.loadData();
		},
		methods: {
			clickScreen(){
				this.$refs['screen'].show = true;
			},
			changeScreen(e) {
				this.fromData = e;
				this.list.page = 1;
				this.loadData();
			},
			async loadData() {
				let res = await this.$api.getBookByCid(this.cid, {
					page: this.list.page,
					pageSize: this.list.pageSize,
					serialize: this.fromData.status.active,
					word: this.fromData.word.active,
					hits: this.fromData.sort.active,
					update: this.fromData.update.active
				});
				if (res) {
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
