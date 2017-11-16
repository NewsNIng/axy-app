// 系统相关
(function(_, ra){
	var system = {};
	
	system.update = function(verison, callback){
		callback();
//		return ra("get", "/update", {
//			verison: verison
//		},callback);
	}
	
	/**
	 * 上传图片
	 * @param {Array} imgs 图片路径数组  
	 * @param {Function} callback 回调函数
	 */
	system.uploadImg = function(imgs, callback){
		var task = plus.uploader.createUpload(dal.BASE_URL + "/upload/multipart", {
			timeout: 8000
		}, function(up, status){
			if ( up.state == 4 && status == 200 ) {
				var data = JSON.parse(up.responseText);
				if(data.code !== '0000'){
					return callback({message: data.message}, null);
				}
				return callback(null, data.data);
			}else{
				callback({message: up.state + '-' + status}, null);
			}
		});
		
		imgs.forEach(function(item){
			task.addFile(item, {key: item});	
		});
		
		task.start();
		
		
	}
	
	
	
	
	_.system = system;
	
}(window.dal, window.requestAdapter));
