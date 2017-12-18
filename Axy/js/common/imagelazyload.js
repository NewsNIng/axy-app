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

	function setLoaded(dom, src) {
		//dom.classList.add("anim_opacity"); //渐变动画
		
		// 如果不是一直会变化的img，像是头像更改这类的需求，就得在dom上加上img-lay-forever类名，这样插件会一直检查
		if(!dom.classList.contains('img-lazy-forever')){
			// 标记成功
			domAttr(dom, "data-loaded", true);	
		}
		//去掉灰色边,只有背景图才可居中铺满图片
		//domAttr(dom, "src", img_translate);
		
		if(dom.tagName.toUpperCase() === "IMG"){
			domAttr(dom, "src", src);	
		}else{
			//背景
			dom.style.backgroundImage = "url(" + src + ")";	
		}
		
		
		 
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
				"timeout": 10,
				"retry": 2
			}, function(download, status) {
				if(status == 200) {
					setLoaded(obj.dom, sd_path);
				} else {
					//下载失败,取消下载任务,需删除本地临时文件,否则下次进来时会检查到图片已存在
					delFile(hb_path);
					download.abort();
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