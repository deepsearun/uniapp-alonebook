import {
	http
} from '@/api/service.js';

export default {
	/**
	 * 获取幻灯图
	 * @param {Object} params
	 */
	getSlider() {
		return http.get('/slider');
	},

	/**
	 * 获取顶级分类
	 */
	getCategoryTop() {
		return http.get('/category/parents');
	},

	/**
	 * 获取子分类
	 */
	getCategorySon(pid = 0) {
		return http.get('/category/son/pid/' + pid);
	},

	/**
	 * 通过cid获取书籍列表
	 */
	getBookByCid(cid, params) {
		return http.get('/novel/ByCid/' + cid, {
			params
		});
	},

	/**
	 * 用户登录
	 * @param {Object} user
	 * @param {Object} pass
	 */
	login(user, pass) {
		return http.post('/user/login', {
			username: user,
			password: pass
		});
	},

	/**
	 * 用户注册
	 * @param {Object} params
	 */
	reg(params) {
		return http.post('/user/reg', params);
	},

	/**
	 * 找回密码
	 * @param {Object} params
	 */
	find(user) {
		return http.post('/user/find', {
			username: user
		});
	},

	/**
	 * 设置密码
	 * @param {Object} params
	 */
	setNewPass(params) {
		return http.post('/user/setNewPass', params);
	},

	/**
	 * 获取用户信息
	 */
	userinfo() {
		return http.get('/user/info');
	},

	/**
	 * 获取验证码
	 * @param {String} email
	 */
	getCode(email) {
		return http.get('/user/getCode', {
			email: email
		});
	},

	/**
	 * 修改头像
	 * @param {Object} path
	 */
	changeAvatar(path) {
		return http.upload('/user/changeAvatar', {
			filePath: path,
			name: 'avatar'
		});
	},

	/**
	 * 修改资料
	 * @param {Object} params
	 */
	changeInfo(params) {
		return http.post('/user/changeInfo', params);
	},

	/**
	 * 浏览记录
	 * @param {Object} params
	 */
	record(params) {
		return http.get('/user/record', {
			params
		});
	},

	/**
	 * 书架列表
	 * @param {Object} params
	 */
	bookshelf(params) {
		return http.get('/bookshelf/list', {
			params
		});
	},

	/**
	 * 添加书架
	 * @param {Int} novelId
	 */
	bookshelfAdd(novelId) {
		return http.get('/bookshelf/add/' + novelId);
	},

	/**
	 * 删除书架
	 * @param {Int} id
	 */
	bookshelfDel(id) {
		return http.get('/bookshelf/delete/' + id);
	},

	/**
	 * 注销登录
	 */
	logout() {
		return http.get('/user/logout');
	},

	/**
	 * 最近更新
	 * @param {Object} params
	 */
	newBook(params) {
		return http.get('/novel/new', {
			params
		});
	},

	/**
	 * 猜你喜欢
	 * @param {Object} params
	 */
	likeBook(params) {
		return http.get('/novel/like', {
			params
		});
	},

	/**
	 * 热门分类
	 * @param {Object} params
	 */
	categoryHits(params) {
		return http.get('/category/hits', {
			params
		});
	},

	/**
	 * 热门书籍
	 * @param {Object} params
	 */
	novelHits(params) {
		return http.get('/novel/hits', {
			params
		});
	},

	/**
	 * 获取章节内容
	 * @param {Object} id
	 */
	getChapterContent(id, key) {
		return http.get('/chapter/content/' + id + '/' + key);
	},

	/**
	 * 获取章节列表
	 * @param {Object} nid
	 */
	getChapterList(nid) {
		return http.get('/chapter/list/' + nid);
	},

	/**
	 * 更新章节
	 * @param {Object} id
	 */
	updateChapter(id) {
		return http.get('/chapter/update/' + id);
	},

	/**
	 * 保存章节
	 * @param {Object} id
	 */
	saveChapter(id, key) {
		return http.get('/chapter/save/' + id + '/' + key);
	},

	/**
	 * 作者相关
	 * @param {Object} author
	 */
	byAuthor(author, pageSize = 6) {
		return http.get('/novel/byAuthor/' + author + '/pageSize/' + pageSize);
	},

	/**
	 * 作者相关2
	 * @param {Object} author
	 */
	authorList(author, page = 1, pageSize = 10) {
		return http.get('/novel/byAuthor/' + author + '/page/' + page + '/pageSize/' + pageSize);
	},

	/**
	 * 分类随机推荐
	 * @param {Object} cid
	 */
	categoryRand(cid, pageSize = 9) {
		return http.get('/novel/categoryRand/' + cid + '/pageSize/' + pageSize);
	},

	/**
	 * 获取详情
	 * @param {Object} id
	 */
	detail(id) {
		return http.get('/novel/detail/' + id);
	},

	/**
	 * 加载评论列表
	 * @param {Object} id
	 */
	getComment(id, params) {
		return http.get('/comment/list/' + id, {
			params
		});
	},

	/**
	 * 发表评论
	 */
	sendComment(params) {
		return http.post('/comment/add/', params);
	},

	/**
	 * 点赞
	 */
	supportComment(id) {
		return http.get('/comment/support/' + id);
	},


	/**
	 * 删除
	 */
	delComment(id) {
		return http.get('/comment/del./' + id);
	},

	/**
	 * 加载回复列表
	 * @param {Object} id
	 */
	getChildList(id, params) {
		return http.get('/comment/childList/' + id, {
			params
		});
	},

	/**
	 * 搜索书籍
	 * @param {Object} keyword
	 */
	search(keyword, page, pageSize) {
		return http.get('/novel/search/' + keyword + '/page/' + page + '/pageSize/' + pageSize);
	},

	/**
	 * 搜索补齐
	 * @param {Object} keyword
	 */
	searchComplete(keyword) {
		return http.get('/novel/searchComplete/' + keyword + '?pageSize=5');
	},

	/**
	 * 热门搜索词
	 */
	hotWords() {
		return http.get('/novel/searchHotWords');
	}
}
