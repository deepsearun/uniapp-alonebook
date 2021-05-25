<template>
	<view>
		<!-- 弹出层 -->
		<u-popup v-model="show" :mode="mode" :height="height+'rpx'">
			<view class="flex flex-column p-3">
				<view class="flex align-center mb-3">
					<view class="f8 font32 pop-mw">
						状态
					</view>
					<view class="flex flex-wrap align-center">
						<book-select-btn class="mb-2 mr-2" :name="item.name"
							v-for="(item,index) in fromData.status.list" :key="index"
							:class="fromData.status.list[index].val == fromData.status.active ? 'bg-hon white' : ''"
							:index="index" @click="change('status',index)">
						</book-select-btn>
					</view>
				</view>

				<view class="flex align-center mb-3">
					<view class="f8 font32 pop-mw">
						排序
					</view>
					<view class="flex flex-wrap align-center">
						<book-select-btn class="mb-2 mr-2" :name="item.name" v-for="(item,index) in fromData.sort.list"
							:key="index"
							:class="fromData.sort.list[index].val == fromData.sort.active ? 'bg-hon white' : ''"
							:index="index" @click="change('sort',index)">
						</book-select-btn>
					</view>
				</view>

				<view class="flex align-center justify-between mb-2">
					<view class="f8 font32 pop-mw">
						字数
					</view>
					<view class="flex flex-wrap align-center">
						<book-select-btn class="mb-2 mr-2" :name="item.name" v-for="(item,index) in fromData.word.list"
							:key="index"
							:class="fromData.word.list[index].val == fromData.word.active ? 'bg-hon white' : ''"
							:index="index" @click="change('word',index)">
						</book-select-btn>
					</view>
				</view>

				<view class="flex align-center mb-3">
					<view class="f8 font32 pop-mw">
						更新
					</view>
					<view class="flex flex-wrap align-center">
						<book-select-btn class="mb-2 mr-2" :name="item.name"
							v-for="(item,index) in fromData.update.list" :key="index"
							:class="fromData.update.list[index].val == fromData.update.active ? 'bg-hon white' : ''"
							:index="index" @click="change('update',index)">
						</book-select-btn>
					</view>
				</view>
			</view>
		</u-popup>
	</view>
</template>

<script>
	export default {
		name: "book-screen",
		props:{
			mode:{
				type:String,
				default:'bottom'
			},
			height:{
				type:[String,Number],
				default:700
			}
		},
		data() {
			return {
				show:false,
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
						active: 'all',
						list: [{
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
							{
								name: '按时间',
								val: 'time'
							}
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
					},
				}
			};
		},
		methods: {
			change(name, index) {
				this.fromData[name].active = this.fromData[name].list[index].val;
				this.$emit('change',this.fromData);
			}
		}
	}
</script>

<style>
	.pop-mw {
		min-width: 110rpx;
	}
</style>
