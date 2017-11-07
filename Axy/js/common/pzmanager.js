
/**
 * 定位信息管理
 */
(function(w){
	var debug = true;
	var log = function(msg, toStr){
		if(debug){
			msg = toStr? JSON.stringify(msg): msg;
			console.log("[定位管理]" + msg);
		}
	}
	
	
	var m = {};
	
	m.getIndexPostion = function(){
		plus.geolocation.getCurrentPosition(function(info){
			console.log(info);
		},function(){
			
		});
	};
	
	w.pzmanager = m;
	
}(window));