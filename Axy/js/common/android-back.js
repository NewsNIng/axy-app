(function($) {
	var backButtonPress = 0;
	$.back = function() {
		var mall = plus.webview.getWebviewById("mall");
		
		new Promise(function(re, rj){
			if(mall && mall.isVisible()){
				mall.canBack(function(e){
					if(e.canBack){
						return mall.back();
					}
					re();
				});
			}else{
				re();
			}
		})
		.then(function(){
			
			backButtonPress++;
			if (backButtonPress > 1) {
				//退出
				plus.runtime.quit();
				//后台
				//var main = plus.android.runtimeMainActivity();
				//main.moveTaskToBack(false);
			} else {
				plus.nativeUI.toast('再按一次退出程序');
			}
			setTimeout(function() {
				backButtonPress = 0;
			}, 1000);
		}); 
		
		return false;
	};
}(mui));