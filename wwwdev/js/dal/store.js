// 商家相关
(function(_, ra) {
	var store = {};

	/**
	 * 商家入驻
	 * @param {Object} info 商家信息
	 * @param {Function} callback 回调
	 */
	store.add = function(info, callback) {
		/**
		 * 
		 */
		return ra("post", "/store/add", info, callback);
	}
	
	/**
	 * 商家更新
	 * @param {Object} info 商家信息
	 * @param {Function} callback 回调
	 */
	store.update = function(info, callback) {
		/**
		 * 
		 */
		//info.BASE_URL = _.BASE_URL_DEV;
		return ra("post", "/store/update", info, callback);
	}

	store.category = function(callback) {
		return ra("get", "/store/category", {}, callback);
	}

	/**
	 *  获取附近的店铺（分页）
	 * @param {String} longitude 经度
	 * @param {String} latitude 纬度
	 * @param {String} city 城市
	 * @param {Function} callback 回调
	 * @param {Number} pageNumber
	 * @param {Number} pageSize
	 */
	store.list = function(longitude, latitude, city, callback, pageNumber, pageSize) {
		pageNumber = pageNumber || 1;
		pageSize = pageSize || 10;

		return ra("get", '/store/list', {
			longitude: longitude,
			latitude: latitude,
			city: city,
			pageNumber: pageNumber,
			pageSize: pageSize
		}, callback);
	}
	
	/**
	 * 删除店铺
	 * @param {Number} info 店铺id
	 * @param {Function} callback 回调
	 */
	store.delete = function(id, callback){
		return ra("get", "/store/delStore", {
				storeId: id
		}, callback);
	}

	/**
	 * 店铺详情
	 * @param {Number} info 店铺id
	 * @param {Function} callback 回调
	 */
	store.get = function(id, callback) {
		return ra("get", "/store/" + id, {
				//BASE_URL: _.BASE_URL_DEV,
		}, callback);
	}

	// 商品
	store.goods = {
		add: function(storeId, name, introduction, imagelist,callback) {
			var o = {
				storeId: storeId,
				name: name,
				introduction: introduction
			};
			for(var i = 0; i < 3; i++){
				o['image'+(i+1)] = imagelist[i];
			}
			return ra('post', '/store/goods/add',o, callback);
		}
	}
	
	var getAccount = (function (){
		var ac;
		return function(){
			if(!ac){
				ac = window.localStorage.getItem('_account_');
			}
			return ac;
		}
	}());
	
	// 获取帐号的店铺列表
	store.myList = function(pageNumber, callback, account, pageSize){
		account = account || getAccount();
		return ra('get', '/store/list/' + account, {
			//BASE_URL: _.BASE_URL_DEV,
			pageNumber: pageNumber,
			pageSize: pageSize || 10
		}, callback);
	}
	


	_.store = store;

}(window.dal, window.requestAdapter));