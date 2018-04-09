

/**
 * app 内商城工具库
 * 依赖 Broadcast.js
 */

(function(app, Broadcast){
	var _B = new Broadcast();
	
	// 配置	
	var config = {
		url: "http://192.168.1.150:8080/#/home",
		id: "mall",
		routerCmdName: "router",
	};

	// 命令
	var routerCmd = {
		// 订单
		ORDER:  {
			path: '/order',
		}, 
		// 购物车
		SHOPCAR: {
			path: '/shopCart',
		},
	};
	
	
	var mall = {};
	
	var mallView = null;
	
	// 创建商城
	mall.create = function(){
		mallView = plus.webview.create(config.url, config.id, {
			popGesture: "hide"
		});
		return mallView;
	};

	// 获取商城webview
	mall.getView = function(){
		return mallView;
	};
	
	mall.showView = function(a, d){
		a = a || 'pop-in';
		d = d || 250;
		mallView && mallView.show(a, d);
	};
	
	// 是否存在商城webview
	mall.hasView = function(){
		return mallView !== null;
	};
	
	// 重载入商城
	mall.reload = function(){
		mallView && mallView.loadURL(config.url);
	};
	
	
	// 发送命令
	mall.sendRouterCmd = function(data){
		_B.emit(config.routerCmdName, data, {
			views: [config.id]
		})
	};
	
	// 打开购物车
	mall.openShopCart = function(){
		this.sendRouterCmd(routerCmd.SHOPCAR);
		this.showView();
	};
	
	
	
	
	app.mall = mall;
	
}(window.app || (window.app = {}), ni.Broadcast));
