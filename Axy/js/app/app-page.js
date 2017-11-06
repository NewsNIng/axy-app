
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
			position: '_www/html/public/position.html'
		};
	
	page.getPosition = function(callback){
		this.openForResult('position', callback);
	}
	
	
	page.openForResult = function(name, callback){
		_tempSrc = '_APP_PAGE_RESULT_FUN_' + name + '_' + _id;
		_id++;
		w[_tempSrc] = function(data){
			w[_tempSrc] = null;
			callback(data);
		};
		
		pg = plus.webview.create(pageDir[name], name, {
			render: "always"
		}, {
			callbackName: _tempSrc 
		});
		
		pg.addEventListener('titleUpdate', function(){
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
		indexV.opener().evalJS(jsstr);
		return indexV;
	}
	
	_.page = page;
}(window.app || (window.app = {}), window));
