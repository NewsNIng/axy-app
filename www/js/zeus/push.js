// 初始化 推送
// 依赖 rx.min.js, H5NativeBridge.js, ni.js
(function() {
	var OB = Rx.Observable;
	var P = plug.H5NativeBridge;
	var D;

	OB
		// plus ready
		.create(function(ob) {
			if(window.plus) {
				ob.next();
			} else {
				document.addEventListener('plusready', function() {
					ob.next();
				});
			}
		})
		// 获取推送ID
		.mergeMap(function() {
			D = new ni.Cache("push_key", "", {
				plus: true
			});

			// 最多尝试8次 每次间隔2s
			var timer = OB.interval(2e3).take(8);
			// 获取原生推送信息
			var getCid = OB.create(function(ob) {
				var rs = P.GetPushInfoSyn();
				if(!rs) {
					return
				}
				rs = JSON.parse(rs);
				if(!rs || rs["code"] !== 0) {
					return
				}
				if(!rs.data || !rs.data.clientId){
					return
				}
				
				ob.next(rs.data.clientId);
			});
			return timer.mergeMap(function() {
				return getCid
			}).first();

		})
		.subscribe(function(id) {
			// 保存到本地
			D.data = id;
		});

}());