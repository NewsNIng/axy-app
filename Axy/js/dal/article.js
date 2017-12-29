// 文章说说相关
(function(_, ra){
	var article = {};
	
	
	article._add = function(title, content, callback, image1, image2, image3){
		return ra("post", "/article/add", {
				"title": title,
				"content": content,
				"image1": image1,
				"image2": image2,
				"image3": image3
		}, callback);
	}
	/**
	 * 发布说说（需要登录）
	 * @param {String} title 标题
	 * @param {String} content 内容
	 * @param {Array} imgList 图片数组
	 */
	article.add = function(title, content, imgList, callback){
		return article._add.bind(article, title, content, callback).apply(article, imgList);
	}
	
	/**
	 * 说说列表（分页）
	 * @param {Number} pageNumber
	 * @param {Function} callback
	 * @param {Number} pageSize
	 */
	article.list = function(pageNumber, callback, pageSize){
		pageSize = pageSize || 10;
		return ra('get', '/article/list', {
			pageNumber: pageNumber,
			pageSize: pageSize,
		}, callback);
	}
	
	
	/**
	 * 获取说说详情
	 * @param {Number} id 说说id
	 */
	article.get = function(id, callback){
		return ra('get', '/article/' + id, {}, callback);
	}
	
	/**
	 * 评论相关
	 */
	article.comments = {
		/**
		 * 发表评论
		 * @param {Number} aid 说说id
		 * @param {String} content 评论内容
		 * @param {Function} callback
		 */
		add: function(aid, content, callback){
			return ra('post', '/article/comments/add', {
				aid: aid,
				content: content
			},callback);
		},
		/**
		 * 获取评论列表（分页）
		 * @param {Number} aid 说说id
		 * @param {Number} pageNumber 页码
		 * @param {Function} callback
		 * @param {Number} pageSize 页量
		 */
		list: function(aid, pageNumber, callback, pageSize){
			pageSize = pageSize || 10;
			return ra('get', '/article/comments/list', {
				aid: aid,
				pageNumber: pageNumber,
				pageSize: pageSize,
			}, callback);
		}
	}
	
	/**
	 * 喜欢
	 * @param {Number} aid 说说id
	 * @param {Function} callback
	 */
	article.like = function(aid, callback){
		return ra('post', '/article/like/' + aid, {}, callback);
	}
	
	
	/**
	 * 用户相关说说
	 */
	article.user = {
		list: function(account, pageNumber, callback, pageSize){
			return ra('get', '/article/user/list', {
				account: account,
				pageNumber: pageNumber,
				pageSize: pageSize || 10,
			},callback);
		},
		
	}
	
	_.article = article; 
	
}(window.dal, window.requestAdapter));
