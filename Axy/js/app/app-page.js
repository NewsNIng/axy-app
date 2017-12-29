
/**
 * 拓展实现带返回参数的页面功能
 * 类似 Android的 ActivityForResult 效果
 */

(function(_, w){
	var page = {};
	
	var _id = 0,
		_tempSrc = '',
		pg = null,
		pageDir = {
			position: '_www/html/public/position.html',
			input: '_www/html/public/input.html',
			mailltype: '_www/html/public/mailltype.html',
			city: '_www/html/public/city.html',
			maps: '_www/html/public/maps.html',
			login: '_www/html/common/login.html',
			browser: '_www/html/public/browser.html',
			image_cropper: '_www/html/public/image_cropper.html',
			alarmParam: '_www/html/public/alarmParam.html',
			authorized: "_www/html/common/authorized.html",
		},cw = null;
	
	// 打开城市选择
	page.getPosition = function(callback){
		this.openForResult('position', callback, {});
	}
	
	// 打开城市索引选择
	page.getCity = function(callback){
		this.openForResult('city', callback, {});
	}
	
	// 打开内容编辑
	page.getInput = function(callback, ex){
		this.openForResult('input', callback, ex);
	}
	
	// 打开商户类型
	page.getMailType = function(callback){
		this.openForResult('mailltype', callback, {});
	}
	// 打开地图
	page.getMaps = function(callback){
		this.openForResult('maps', callback, {});
	}
	
	// 打开图片剪裁
	page.cropper = function(callback, url){
		this.openForResult('image_cropper', callback, {
			imgurl: url
		});
	}
	
	page.openForResult = function(name, callback, ex){
		this.openForResultBy(pageDir[name], name, callback, ex);
	}
	
	page.getLogin = function(callback){
		this.openForResult('login', callback, {});
	}
	
	page.openBrowser = function(options){
		this.openForResult('browser', function(){}, options);
	}
	
	// 打开权限认证
	page.openAuthorized = function(account, tel, callback){
		this.openForResult('authorized', callback, {
			account: account,
			tel: tel
		});
	}
	
	page.openForResultBy = function(url, id, callback, ex){
		id = id || url;
		ex = ex || {};
		_tempSrc = '_APP_PAGE_RESULT_FUN_' + id + '_' + _id;
		_id++;
		
		w[_tempSrc] = function(data){
			w[_tempSrc] = null;
			callback(data);
		};
		
		ex.callbackName = _tempSrc;
		
		cw = plus.nativeUI.showWaiting();
		
		pg = plus.webview.create(url, id, {
			render: "always"
		}, ex);
		
		pg.addEventListener('titleUpdate', function(){
			cw && (cw.close(),cw = null);
			pg.show('pop-in');
		});
		
		pg.addEventListener('close', function(){
			w[_tempSrc] = null;
			//callback(null);
		});
		
	}
	
	page.setResult = function(data){
		var indexV = plus.webview.currentWebview();
		var jsstr = "";
		if(indexV.callbackName){
			jsstr = "window." + indexV.callbackName;
			jsstr = jsstr + "&&" + jsstr + "(" + JSON.stringify(data) + ")";
		}
		jsstr && indexV.opener().evalJS(jsstr);
		return indexV;
	}
	
	// 打开告警参数
	page.getAlarmParam = function(callback, ex){
		this.openForResult('alarmParam', callback, ex);
	}
	
	_.page = page;
}(window.app || (window.app = {}), window));
