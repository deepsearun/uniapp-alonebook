<template>
	<view>
		<u-popup v-model="show" mode="center" border-radius="10" width="420" height="230">
			<view class="tc p-4">
				<view class="f6 font31">请选择分享方式</view>
				<view class="font27 mt-3" hover-class="bg-hui" @click="shareUrl()">
					<view>1.点击复制APP下载链接</view>
					<view class="hon text-ellipsis1">({{$C.appDownloadUrl}})</view>
				</view>
			</view>
		</u-popup>
	</view>
</template>

<script>
	import {
		setClipboardData,
		getClipboardData
	} from '@/uni_modules/u-clipboard/js_sdk';
	export default {
		name:"book-share",
		data() {
			return {
				show: false
			};
		},
		methods:{
			shareUrl() {
				setClipboardData(this.$C.appDownloadUrl).then(res => {
					this.$H.msg('复制链接成功');
					this.show = false;
				});
			}
		}
	}
</script>

<style>

</style>
