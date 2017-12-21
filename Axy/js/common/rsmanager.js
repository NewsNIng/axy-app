
/**
 * 资源管理 (含热更新)
 */
(function(w){
	var debug = true;
	var log = function(msg, toStr){
		if(debug){
			msg = toStr? JSON.stringify(msg): msg;
			console.log("[资源管理]" + msg);
		}
	}
	
	
	var m = {};
	/**
	 * 是否可下载资源
	 * @param {String} uri 资源地址
	 */
	m.isHotRresource = function(uri){
		return /(wgt|wgtu|apk)$/g.test(uri);
	};
	
	function _showUpdatePrompt(title, message, callback){
		plus.nativeUI.confirm(message || "是否更新", function(e){
			callback(e.index === 0);
		}, {
			title: title || "提示",
			buttons: ["立即更新", "取消"]
		})
	}
	
	function _install(uri, callback, isHide){
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
		var task = plus.downloader.createDownload(uri, {method: "GET", timeout: 10}, function(d, status) {
			// 下载成功
			if(status === 200) {
				// 转换路径
				var path = plus.io.convertLocalFileSystemURL(d.filename);
				if(path.indexOf('file') < 0) {
					path = 'file://' + path;
				}
				log("" + path);
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
					result(true, path);
				},function(e){
					log(e, true);
					// 安装失败
					result(false, e);
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
				size = size.toFixed(2);
				size = isNaN(size) ? 0: size;
				w.setTitle('正在下载...\n' + size + '%');
			});
		}
		this.tasker = task;
		// 开始下载
		task.start();
		return task;
	}
	
	/**
	 * 安装新资源
	 * @param {String} uri 资源地址
	 * @param {Function} callback 下载完成回调函数
	 * @param {Object} options 参数配置
	 */
	m.install = function(uri, callback, options){
		
		options = (function(o, _o){
			for(var k in _o){
				o[k] = _o[k];
			}
			return o;
		}({
			hide: false, // 是否隐藏更新
			show: true, // 是否提示
			force: false, // 强制更新 关不了提示框
			title: "", // 更新提示框的标题内容 可以设置为app的版本号
			message: "是否现在更新", // 提示框显示内容，可以设置为app新版内容功能讲解  \n换行
		}, options));
		
		var isHide = options.hide;
		
		var that = this;
		
		if(isHide){
			options.show = false;
		}
		
		if(options.show){
			_showUpdatePrompt(options.title, options.message, function _showUpdatePromptCallback(succ){
				// 点击了取消更新
				if(!succ){
					// 如果是强制更新
					if(options.force){
						// 递归调用再次提示
						plus.nativeUI.toast("应用旧版本将无法使用，请立即更新。");
						return _showUpdatePrompt(options.title, options.message, _showUpdatePromptCallback);
					}
				}else{
					// 执行更新
					_install.call(that, uri, callback, isHide);	
				}
				
						
			});
		}
		
		
		
	};
	
	/**
	 * 获取资源下载实例
	 */
	m.getTask = function(){
		return this.tasker || null;
	};
	
	w.rsmanager = m;
	
}(window));