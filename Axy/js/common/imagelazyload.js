// 图片懒加载
// 依赖 5+ 平台 和  md5.min.js


var imagelazyload = (function(doc) {
	var debug = false;
	var log = function(msg, toStr){
		if(debug){
			msg = toStr? JSON.stringify(msg): msg;
			console.log("[图片缓存]" + msg);
		}
	}
	
	
	//	var img_translate = "../../img/translate.png"; // loading图
	//  var amcsname = ""; // 动画

	var taskArr = new Array(); //图片下载任务集合
	var isStartTask = false; //是否开启下载任务
	var task;

	

	function domAttr(dom, a, b) {
		return dom[(b ? "set" : "get") + "Attribute"](a, b);
	}

	function onLoad(imgDom, imgSrc) {
		//HBuilder平台路径
		var hb_path = '_downloads/image/' + md5(imgSrc) + '.jpg';
		//SD卡绝对路径
		var sd_path = plus.io.convertLocalFileSystemURL(hb_path);
		var temp = new Image();
		temp.src = sd_path;
		temp.onload = function(){
			log('已存在,直接显示==' + hb_path);
			setLoaded.call(imgDom, imgDom, sd_path);
		}; 
		temp.onerror = function(){
			log('不存在,等待下载==' + hb_path);
			getNetSrc.call(imgDom, imgDom, imgSrc, hb_path, sd_path);
		};

	}

	function getNetSrc(imgDom, imgSrc, hb_path, sd_path) {
		//为避免下载出错或下载超时过长,先用src加载图显示
		var temp = new Image();
		temp.onload = function() {
			//设置图片
			setLoaded(imgDom, imgSrc);
		};
		temp.src = imgSrc;
		//添加图片下载任务
		// 本来打算先检查图片是否已在任务队列中,如果存在则不加入;
		// 但是可能图刚加入时就被取出,导致后面相同的图又重复加入,出现本地图存在,下载无回调的问题
		//obj.setAttribute('hb_path', hb_path);
		//obj.setAttribute('sd_path', sd_path);
		taskArr.push({
			dom: imgDom,
			src: imgSrc,
			hb_path: hb_path,
			sd_path: sd_path
		});
		//启动下载
		if(!isStartTask) {
			isStartTask = true;
			startTask();
		}

	}
	
	function setSrc(dom, src){
		// img元素设置src
		if(dom.tagName.toUpperCase() === "IMG"){
			domAttr(dom, "src", src);	
		}else{
			//其他元素则设置它的背景 
			dom.style.backgroundImage = "url(" + src + ")";	
		}
	}

	// 下载失败
	function setFailed(dom){
		log("下载失败，启用默认图");
		// 这里按照自己的实际情况逻辑
		// 获取这个图片的模式
		var type = domAttr(dom, "data-type");
		var base64;
		if(type === 'avatar'){
			// 启用默认头部图片
			base64 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAALEAAACxCAYAAACLKVzFAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjhCOEE4OUU5RTkwRDExRTdCRTIyRTI2RkFGQzg5QzQ1IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjhCOEE4OUVBRTkwRDExRTdCRTIyRTI2RkFGQzg5QzQ1Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6OEI4QTg5RTdFOTBEMTFFN0JFMjJFMjZGQUZDODlDNDUiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6OEI4QTg5RThFOTBEMTFFN0JFMjJFMjZGQUZDODlDNDUiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz5ogvk1AAAUtklEQVR42uyd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";
		}else{
			// 启用其它默认图片
			base64 = "data:image/png;base64,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";
		}
		
		setSrc(dom, base64);
	}
	
	// 下载成功后 操作dom
	function setLoaded(dom, src) {
		dom.classList.add("anim_opacity"); //渐变动画
		/* .anim_opacity {
			    animation: anim_opacity 1s;
			    -webkit-animation: anim_opacity 1s;
			}
		 */
		
		// 如果不是一直会变化的img，像是头像更改这类的需求，就得在dom上加上img-lay-forever类名，这样插件会一直检查
		if(!dom.classList.contains('img-lazy-forever')){
			// 标记成功
			domAttr(dom, "data-loaded", true);	
		}
		setSrc(dom, src);
	}

	function startTask() {
		if(taskArr.length == 0) {
			isStartTask = false;
			return;
		}
		
		//从任务集合中取一个任务
		var obj = taskArr.shift();
		var image_url = obj.src;
		
		var hb_path = obj.hb_path;
		var sd_path = obj.sd_path;
		//检查是否已经下载过,避免downloader文件存在时无回调,手机发烫;
		var temp = new Image();
		temp.src = sd_path;
		temp.onload = function() {
			//已下载则跳过
			startTask();
		};
		temp.onerror = function() {
			//执行下载
			task = plus.downloader.createDownload(image_url, {
				"filename": hb_path,
				"timeout": 5,
				"retry": 0,
				
			}, function(download, status) {
				if(status == 200) {
					setLoaded(obj.dom, sd_path);
				} else {
					//下载失败,取消下载任务,需删除本地临时文件,否则下次进来时会检查到图片已存在
					delFile(hb_path);
					download.abort();
					setFailed(obj.dom);
				}
				//继续下载
				startTask();
			});
			task.start();
		};
	}

	function delFile(hb_path) {
		if(hb_path) {
			plus.io.resolveLocalFileSystemURL(hb_path, function(entry) {
				entry.remove(function(entry) {
					//console.log("文件删除成功==" + hb_path);
				}, function(e) {
					//console.log("文件删除失败=" + hb_path);
				});
			});
		}
	}
	
	// 重新检查页面
	function restart(){
		// 如果已经有下载的任务了
		if(isStartTask && task){
			// 停止下载
			task.abort();
			task = null;
			// 清空列表
			taskArr = [];
			// 标记
			isStartTask = false;
		}
		// 获取页面中img
		var imgs = doc.querySelectorAll(".img-lazy-load:not([data-loaded])");
		
		var i = 0,
			l = imgs.length,
			tempImgSrc;
		
		function _(){
			Array.prototype.forEach.call(imgs, function(temp){
				if(tempImgSrc = domAttr(temp, "data-src")) {
					onLoad.call(temp, temp, tempImgSrc);
				}else{
					setFailed.call(temp, temp);
				}
			});
		}
			
		if(window.plus) {
			setTimeout(_);
		} else {
			doc.addEventListener("plusready", _, false);
		}
			
		
	}
	// 直接运行
	restart();
	
	// 返回 
	return restart;
	
}(document));