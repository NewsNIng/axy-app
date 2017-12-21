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
		var base64 = "data:image/png;base64,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";
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