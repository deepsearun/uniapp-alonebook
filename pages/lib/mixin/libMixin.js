export default {
	data() {
		return {
			tabs: this.$H.cache('lib_tabs') || [],
			category: [],
			novel: {
				page: 1,
				pageSize: 10,
				list: this.$H.cache('lib_bookList') || [],
				loadStatus: 'loading'
			},
			tagCurrent: 0,
			current: 0,
			fromData: {
				status: {
					active: 'all',
					list: [{
							name: '全部',
							val: 'all'
						},
						{
							name: '完结',
							val: 1
						},
						{
							name: '连载',
							val: 2
						}
					]
				},
				sort: {
					active: 'new',
					list: [
						{
							name: '最新添加',
							val: 'new'
						},
						{
							name: '更新时间',
							val: 'update'
						},
						{
							name: '推荐票',
							val: 'recommend'
						},
						{
							name: '按评分',
							val: 'rating'
						},
						{
							name: '总人气',
							val: 'all'
						},
						{
							name: '日人气',
							val: 'day'
						},
						{
							name: '周人气',
							val: 'week'
						},
						{
							name: '月人气',
							val: 'month'
						},
						
					]
				},
				word: {
					active: 'all',
					list: [{
							name: '全部',
							val: 'all'
						},
						{
							name: '30万字以下',
							val: 0
						},
						{
							name: '30-50万字',
							val: 1
						},
						{
							name: '50-100万字',
							val: 2
						},
						{
							name: '100-200万字',
							val: 3
						},
						{
							name: '200万字以上',
							val: 4
						}
					]
				},
				update: {
					active: 'all',
					list: [{
							name: '全部',
							val: 'all'
						},
						{
							name: '3天内',
							val: 3
						},
						{
							name: '7天内',
							val: 7
						},
						{
							name: '15天内',
							val: 15
						},
						{
							name: '30天内',
							val: 30
						}
					]
				}
			},
			customStyle: {
				ok: {
					'background-color': '#ef5952',
					'color': '#fff',
					'width': '280rpx'
				},
				no: {
					'width': '280rpx'
				}
			}
		}
	},
	methods: {
		async getCategory(pid = 0) {
			let cache = this.$H.cache('lib_category' + pid);
			if (cache) {
				this.category = cache;
				this.getList();
				return;
			}
			let res = await this.$api.getCategorySon(pid);
			if (res) {
				this.category = res.data.list;
				this.getList();
				this.$H.cache('lib_category' + pid, this.category, 86400);
			}
		},
		async getList() {
			let cid = this.category[this.tagCurrent].id;
			let res = await this.$api.getBookByCid(cid, {
				page: this.novel.page,
				pageSize: this.novel.pageSize,
				serialize: this.fromData.status.active,
				word: this.fromData.word.active,
				hits: this.fromData.sort.active,
				update: this.fromData.update.active
			});
			if (res) {
				if (res.data.page == 1) {
					this.novel.list = res.data.list;
				} else {
					this.novel.list = this.novel.list.concat(res.data.list);
				}
				this.novel.loadStatus = 'loadmore';
				if (res.data.list.length < 10) this.novel.loadStatus = 'nomore';
				this.$H.cache('lib_bookList', this.novel.list);
			}
			setTimeout(() => {
				uni.hideLoading();
			}, 200);
		},
		loadMore() {
			if (this.novel.loadStatus != 'loadmore') return;
			this.novel.page += 1;
			this.novel.loadStatus = 'loading';
			this.getList();
		},
		getTabs() {
			let cache = this.$H.cache('lib_tabs');
			if (cache) {
				this.tabs = cache;
				return;
			}
			this.$api.getCategoryTop().then(res => {
				this.tabs = res.data.list;
				this.tabs.unshift({
					id: 0,
					title: '全部'
				});
				this.$H.cache('lib_tabs', this.tabs);
			});
		}
	}
}
