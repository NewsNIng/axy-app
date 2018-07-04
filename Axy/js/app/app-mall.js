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
//		url: "http://47.106.92.195/shop/#/home?t=" + +new Date(),
		url: "http://192.168.1.128:8080/#/home?t=" + +new Date(),
		id: "mall",
		routerCmdName: "router",
	};
 
	// 命令
	var routerCmd = {
		// 主页
		HOME: {
			path: "/home",
			query: {
				goindex: false
			}
		},

		// 订单
		ORDER: {
			path: '/order/index',
			query: {
				goindex: true,
				state: 0
			}
		},

		// 购物车
		SHOPCAR: {
			path: '/shopCart',
			query: {
				goindex: true
			}
		},
		
		// 收货地址
		ADDRESS: {
			path: '/user/address',
			query: {
				goindex: true
			}
		},
		
		//商品详情页
		TODETAIL: function(goodscode){
			return {
				path: '/detail',
				query: {
					goindex: true,
					id: goodscode
				}
			}
		}

	};

	var mall = {};

	var mallView = null;

	// 创建商城
	mall.create = function() {
		var mallView = plus.webview.create(config.url, config.id, {
			popGesture: "hide",
			top: "0px",
			//top: (window.immersed || 0) + 'px',
			bottom: '0px',
			background: "#06c1ae",
			//cachemode: "noCache",
			
		});
		
		mallView.addEventListener('titleUpdate',function(){
			var url = mallView.getURL();
//			var jsStr = `var head = document.querySelector('.header')
//			head.style.paddingTop = ${window.immersed} + 'px';
//			head.style.height = head.offsetHeight + ${window.immersed} + 'px';`
			var jsStr = "var head = document.querySelector('.header')\n\t\t\thead.style.paddingTop = " + window.immersed + " + 'px';\n\t\t\thead.style.height = head.offsetHeight + " + window.immersed + " + 'px';";
			if(url.indexOf('wap.lianlianpay.com') > -1){
				mallView.evalJS(jsStr);
			}
		})
		
		return mallView;
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
			v = mall.create();
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
				v.addEventListener('titleUpdate', function(){
					re(false);
				});
			} else {
				re(true);
			}
		}).then(function(has) {
			
			return new Promise(function(re, rj){
				if(has){
					re();
				}else{
					_B.once("mall_plus_ready", function(){
						re();
					});
				}
			});
		}).then(function(){
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
	
	// 打开订单
	mall.openOrder = function() {
		this.sendRouterCmd(routerCmd.ORDER);

	};
	// 打开收获地址
	mall.openAddress = function() {
		this.sendRouterCmd(routerCmd.ADDRESS);

	};
	
	
	
	
	// 打开首页
	mall.openHome = function(){
		this.sendRouterCmd(routerCmd.HOME);
	}
	
	mall.openDetail = function(goodscode){
		this.sendRouterCmd(routerCmd.TODETAIL(goodscode))
	}
	app.mall = mall;

}(window.app || (window.app = {}), ni.Broadcast));