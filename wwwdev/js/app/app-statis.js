// 统计管理

(function(app){
	
	var statis = {};
	
	// 事件名映射表
	var statisNameDir = {
		// "test": "verylongeventtestname"
	};
	
	
	// 安全处理 plusready
	function safeRunPlusReady(fn){
		return function(){
			if(window.plus){
				fn.apply(fn, arguments);
			}else{
				document.addEventListener("plusready", function(){
					fn.apply(fn, arguments);
				});
			}
		}
	}
	
	/**
	 * 触发事件
	 * @param {String} eventName 事件名称
	 * @param {Object} data 相关事件数据
	 * @param {Number} d 数量 
	 */
	statis.emit = function(eventName, data, d){
		eventName = statisNameDir[eventName] || statis;
		data = data || {};
		if(d !== undefined){
			plus.statistic.eventDuration(eventName, d, data);
		}else{
			plus.statistic.eventTrig(eventName, data);	
		}
	};
	
	statis.emit = safeRunPlusReady(statis.emit);
	
	
	
	
	
	
	app.statis = statis;
	
}(window.app || (window.app = {})));
