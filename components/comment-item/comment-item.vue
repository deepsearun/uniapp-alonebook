<template>
	<view class="flex flex-column border-bottom-hui pb-3 mb-3">
		<view class="flex justify-between flex-1 align-center" @click="detail(item)">
			<view class="flex">
				<u-avatar size="42" :src="item.user.headimgurl">
				</u-avatar>
				<view class="font26 ml-2">
					{{item.user.nickname}}
				</view>
			</view>
			<view>
				<u-rate :current="item.rate" :disabled="true" size="26"></u-rate>
			</view>
		</view>
		<view class="mt-1 ml-6">
			<view class="font26 mb-1" style="color: #5f5c5c;line-height: 43rpx;" @click="detail(item)">
				{{item.content}}
			</view>
			<view class="flex align-center justify-between flex-1">
				<view class="font23">
					<text class="base-text">{{$u.timeFormat(item.create_time, 'mm.dd hh:MM')}}</text>
					<text class="mx-1 base-text">·</text>
					<text style="color: #62a6fa;" @click="repost(item)">回复TA</text>
				</view>
				<!-- icons -->
				<view>
					<u-icon name="thumb-up" @click="support()" :color="item.isSupport ? '#fa3534' : 'gray'" class="mr-4"
						size="29">
					</u-icon>
					<u-icon name="chat" color="gray" size="30" @click="repost(item)"></u-icon>
				</view>
			</view>
			<!-- 点赞 回复列表 -->
			<view class="bg-hui mt-1 px-2 pb-15" v-if="item.child.length || item.up">

				<view class="font24 base-text pt-2" v-if="item.up" :class="item.child.length ? '' : 'mb-1'">
					{{item.up}}人点赞了该条评论
				</view>

				<block v-if="item.child.length" v-for="(item1,index1) in item.child" :key="index1">
					<view class="font24 pt-15" @click="repost(item1)">
						<text style="color: #348fde;">{{item1.user.nickname}}</text>
						<text class="mx-1">:</text>
						<text>{{item1.content}}</text>
					</view>

					<view class="font24 pt-15" v-if="item1.child.length"
						v-for="(item2,index2) in item1.child" :key="index2">
						<text style="color: #348fde;">{{item2.user.nickname}}</text>
						<text class="mx-1">回复</text>
						<text style="color: #348fde;">{{item1.user.nickname}}</text>
						<text class="mx-1">:</text>
						<text>{{item2.content}}</text>
					</view>

				</block>

				<view class="base-text font24 mt-2 mb-1" v-if="item.child.length" @click="detail(item)">
					查看全部{{item.childNum}}条回复
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "comment-item",
		props: {
			item: [Array, Object],
			index: Number
		},
		data() {
			return {

			}
		},
		methods: {
			repost(item) {
				if (this.$store.state.user.id == item.uid) {
					// return;
				}
				this.$emit('repost', item, this.index);
			},
			support() {
				this.$emit('support',this.index);
			},
			detail(item) {
				let data = {
					user: item.user,
					isSupport: item.isSupport,
					create_time: item.create_time,
					id: item.id,
					content: item.content,
					up: item.up
				};
				uni.navigateTo({
					url: '/pages/comment/detail/detail?info=' + JSON.stringify(data)
				});
			}
		}
	}
</script>

<style>

</style>
