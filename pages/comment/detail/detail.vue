<template>
	<view>
		<u-navbar title="评论详情" title-color="#222" back-icon-color="#222" title-bold title-size="31" :border-bottom="false">
		</u-navbar>
		<!-- 头部内容 -->
		<view class="px-3 pt-4 flex flex-column">
			<view class="flex align-center">
				<u-avatar size="75" :src="info.user.headimgurl">
				</u-avatar>
				<view class="hei font30 ml-2">
					{{info.user.nickname}}
				</view>
			</view>
			<view class="font29 my-3" style="color: #000;line-height: 43rpx;">
				{{info.content}}
			</view>
			<view class="font25 gray">
				{{$u.timeFormat(info.create_time, 'yy-mm-dd hh:MM')}}
			</view>
			<view class="bg-hui mt-3 px-2 pb-15 flex align-center justify-between">
				<view class="font24 pt-2 mb-1">
					{{info.up}}人点赞了该条评论
				</view>
				<view class="pt-2 mr-2 gray">
					<u-icon name="thumb-up" @click="support()" :color="info.isSupport ? '#fa3534' : 'gray'" size="29">
					</u-icon>
				</view>
			</view>
			<book-gap style="margin: 20rpx -30rpx 0 -30rpx;" :height="12"></book-gap>
		</view>
		<!-- 回复输入框 -->
		<comment-input2 ref="cinput2" @submit="sendComment"></comment-input2>
		<!-- 回复列表 -->
		<view class="p-15 gray font26">
			共{{list.total}}条
		</view>
		<view class="px-3 pt-1 pb-3">
			<block v-for="(item,index) in list.data" :key="index">
				<comment-item2 :item="item" :index="index" @repost="repost" @support="doSupport">
				</comment-item2>
				<template v-if="item.child">
					<block v-for="(item2,index2) in item.child" :key="'child_'+index2+index">
						<comment-item3 :item="item2" :index="index2" :rename="item.user.nickname" @repost="repost"
							@support="doSupport([index,index2])">
						</comment-item3>
					</block>
				</template>
			</block>
			<u-loadmore class="py-1" :status="list.loadStatus" icon-color="#ef5952" />
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				info: {},
				list: {
					page: 1,
					pageSize: 10,
					loadStatus: 'loading',
					data: [],
					total: 0
				}
			}
		},
		onLoad(e) {
			this.info = JSON.parse(e.info);
			this.loadData();
		},
		methods: {
			loadData() {
				this.$api.getChildList(this.info.id, {
					page: this.list.page,
					pageSize: this.list.pageSize
				}).then(res => {
					if (res.data.page == 1) {
						this.list.data = res.data.list;
					} else {
						this.list.data = this.list.data.concat(res.data.list);
					}
					this.list.loadStatus = 'loadmore';
					this.list.total = res.data.total;
					if (res.data.list.length < 10) this.list.loadStatus = 'nomore';
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
						this.list.data.unshift(res.data);
					} else {
						// 回复的评论
						let data = this.list.data[this.index];
						// 回复评论的回复
						let dataChild = data.child;
						let index = dataChild.findIndex(v => v.id === e.pid);
						if (index != -1) { // 回复别人的回复
							let dataChild2 = dataChild[index].child;
							console.log(dataChild2);
							dataChild2.unshift(res.data);
						} else { // 普通回复
							dataChild.unshift(res.data);
						}
					}
					this.$H.msg('发表成功');
				});
			},
			doSupport(index) {
				let comment;
				if (typeof index == 'object') {
					comment = this.list.data[index[0]].child[index[1]];
				} else {
					comment = this.list.data[index];
				}
				if (comment.isSupport) {
					return this.$H.msg('你已经点过赞了');
				}
				comment.isSupport = true;
				this.$api.supportComment(comment.id).then(res => {
					this.$H.msg(res.msg);
				});
			},
			support(){
				if (this.info.isSupport) {
					return this.$H.msg('你已经点过赞了');
				}
				this.info.isSupport = true;
				this.$api.supportComment(this.info.id).then(res => {
					this.$H.msg(res.msg);
				});
			},
			repost(e = 0, index = 0) {
				let input2 = this.$refs['cinput2'];
				input2.show = true;
				input2.sendData.nickname = e.user.nickname;
				input2.sendData.pid = e.id;
				this.index = index;
			},
			loadMore() {
				if (this.list.loadStatus != 'loadmore') return;
				this.list.page += 1;
				this.list.loadStatus = 'loading';
				this.loadData();
			},
			onReachBottom() {
				this.loadMore();
			}
		}
	}
</script>

<style>

</style>
