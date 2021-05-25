// 全局配置信息
export default {
	// API请求地址
	apiUrl:'https://book-api.czcn.net/api/v1',
	// CMS请求地址
	cmsUrl:'http://book.czcn.net/api',
	// 图片存储地址(一般是cms地址)
	staticUrl:'http://book.czcn.net/',
	// APP下载链接
	appDownloadUrl:'http://book.52e.cc',
	// 缓存签名
	cacheSign:'v1',
	// 宫格布局配置
	grid:{
		// 每行显示个数
		col:5,
		//列表
		list:[
			{
				icon:'/static/icon/1.png',
				name:'书库',
				url:''
			},
			{
				icon:'/static/icon/2.png',
				name:'最新',
				url:''
			},
			{
				icon:'/static/icon/3.png',
				name:'最热',
				url:''
			},
			{
				icon:'/static/icon/4.png',
				name:'完本',
				url:''
			},
			{
				icon:'/static/icon/5.png',
				name:'排行榜',
				url:''
			}
		]
	}
	
}
