(function(w){
	if(w.immersed !== undefined){
		return;
	}
	
	var immersed = 0;
	var ms = (/Html5Plus\/.+\s\(.*(Immersed\/(\d+\.?\d*).*)\)/gi).exec(navigator.userAgent);
	if(ms && ms.length >= 3) {
		immersed = parseFloat(ms[2]);
	}
	w.immersed = immersed;
	
}(window));

/**
 * app 内商城工具库
 * 依赖 Broadcast.js
 */
(function(app, Broadcast) {
	var _B = new Broadcast();

	// 配置	
	var config = {
		url: "http://192.168.1.161:8080/#/home",
		id: "mall",
		routerCmdName: "router",
	};

	// 命令
	var routerCmd = {
		// 主页
		HOME: {
			path: "/",
			query: {
				goindex: false
			}
		},

		// 订单
		ORDER: {
			path: '/order',
			query: {
				goindex: true,

			}
		},

		// 购物车
		SHOPCAR: {
			path: '/shopCart',
			query: {
				goindex: true
			}
		},

	};

	var mall = {};

	var mallView = null;

	// 创建商城
	mall.create = function() {
		return plus.webview.create(config.url, config.id, {
			popGesture: "hide",
			top: (window.immersed || 0) + 'px',
			bottom: '0px',
			background: "#06c1ae"
		});
	};

	// 获取商城webview
	mall.getView = function() {
		return plus.webview.getWebviewById(config.id);
	};

	mall.showView = function(a, d, fn) {
		a = a || 'pop-in';
		d = d || 250;
		var v = mall.getView();
		if(!v) {
			mall.create();
		}
		fn && typeof fn === 'function' && v.addEventListener('show', function _f() {
			fn();
			v.removeEventListener('show', _f);
		});
		v.show(a, d);
	};
	
	// 发送命令
	mall.sendRouterCmd = function(data) {

		new Promise(function(re, rj) {
			var v = mall.getView();
			// 页面是否存在？
			if(!v) {
				plus.nativeUI.showWaiting();
				// 创建
				v = mall.create();
				// 添加事件
				v.addEventListener('loaded', re);
			} else {
				re();
			}
		}).then(function() {
			// 标识为 app 发送的命令
			data.query.app = true;
			_B.emit(config.routerCmdName, data, {
				views: [config.id]
			});
			plus.nativeUI.closeWaiting();
			// 显示view
			mall.showView();
		});

	};

	// 打开购物车
	mall.openShopCart = function() {
		this.sendRouterCmd(routerCmd.SHOPCAR);

	};
	
	// 打开首页
	mall.openHome = function(){
		this.sendRouterCmd(routerCmd.HOME);
	}

	app.mall = mall;

}(window.app || (window.app = {}), ni.Broadcast));