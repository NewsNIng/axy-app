// 系统相关
(function(_, ra, $) {
	var system = {};

	system.update = function(nativeversion, version, callback) {

		return ra('get', '/app/appversion', {
			nativeversion: nativeversion,
			version: version,
			type: +!$.os.ios
		}, callback);

	}

	/**
	 * 上传图片
	 * @param {Array} imgs 图片路径数组  
	 * @param {Function} callback 回调函数
	 */
	system.uploadImg = function(imgs, callback) {
		var task = plus.uploader.createUpload(dal.BASE_URL + "/upload/multipart", {
			timeout: 8000
		}, function(up, status) {
			if(up.state == 4 && status == 200) {
				var data = JSON.parse(up.responseText);
				if(data.code !== '0000') {
					return callback({
						message: data.message
					}, null);
				}
				return callback(null, data.data);
			} else {
				callback({
					message: up.state + '-' + status
				}, null);
			}
		});

		imgs.forEach(function(item) {
			task.addFile(item, {
				key: item
			});
		});

		task.start();

	}

	// 获取顶级域名
	system.getTopMain = function(account, callback) {
		return ra('get', '/getserver.do', {
			account: account,
			BASE_URL: _.BASE_URL_TOP
		}, function(err, url) {
//			url = dal.BASE_URL_TEST
			url = dal.BASE_URL_DEV
			callback(err, url);
		});
	}

	// 获取第三方登录所关联的账户
	system.getAccount = function(type, openid, callback) {
		return ra('post', '/user/getAccount', {
			type: type,
			openid: openid,
			BASE_URL: _.BASE_URL
		}, callback);
	}

	_.system = system;

}(window.dal, window.requestAdapter, mui));