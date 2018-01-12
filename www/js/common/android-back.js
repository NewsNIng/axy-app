(function($) {
	var backButtonPress = 0;
	$.back = function() {
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
		return false;
	};
}(mui));