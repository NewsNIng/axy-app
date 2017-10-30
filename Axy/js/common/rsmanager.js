
/**
 * 资源管理
 */
(function(w){
	
	var m = {};
	/**
	 * 是否可下载资源
	 * @param {String} uri 资源地址
	 */
	m.isHotRresource = function(uri){
		return /(wgt|wgtu|apk)$/g.test(uri);
	};
	
	/**
	 * 安装新资源
	 * @param {String} uri 资源地址
	 * @param {Function} callback 下载完成回调函数
	 * @param {Boolean} isHide 是否隐藏下载
	 */
	m.install = function(uri, callback, isHide){
		var w = {
			close: function(){},
			setTitle: function(){}
		}, result = function(success){
			w.close();
			if(success){
				callback(true);	
			}else{
				plus.nativeUI.toast("更新失败，请重试。");
				callback(false);
			}
		};
		var task = plus.downloader.createDownload(uri, {method: "GET"}, function(d, status) {
			// 下载成功
			if(status === 200) {
				// 转换路径
				var path = plus.io.convertLocalFileSystemURL(d.filename);
				if(path.indexOf('file') < 0) {
					path = 'file://' + path;
				}
				// 开始安装
				w.setTitle("开始安装...");
				plus.runtime.install(path, {
				}, function(){
					// 安装成功
					isHide || plus.nativeUI.alert("资源更新完成", function() {
						// 应用重启
						plus.runtime.restart();
						// 未重启则提示
						plus.nativeUI.toast('您需要手动关闭应用并重启');
					});
					result(true);
				},function(){
					// 安装失败
					result(false);
				});
				
			} else {
				// 停止下载进程, 删除临时文件
				d.abort(); 
				// 失败
				result(false);
			}
		});
		
		// 是否显示下载进度
		if(!isHide){
			// 显示提示框
			w = plus.nativeUI.showWaiting("获取资源...", {
				back: 'none'
			});
			// 监控下载进度
			var size = 0;
			task.addEventListener('statechanged', function(d, status) {
				size = +(d.downloadedSize / d.totalSize * 100);
				size = size.toFixed(2)
				w.setTitle('正在下载...\n' + size + '%');
			});
		}
		this.tasker = task;
		// 开始下载
		task.start();
		return task;
	};
	
	/**
	 * 获取资源下载实例
	 */
	m.getTask = function(){
		return this.tasker || null;
	};
	
	w.rsmanager = m;
	
}(window));
