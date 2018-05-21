// 沉浸式动态处理

(function(w) {
	var immersed = 0;
	var ms = (/Html5Plus\/.+\s\(.*(Immersed\/(\d+\.?\d*).*)\)/gi).exec(navigator.userAgent);
	if(ms && ms.length >= 3) {
		immersed = parseFloat(ms[2]);
	}
	w.immersed = immersed;
	if(!immersed) {
		return;
	}
	var t = document.querySelector("header");
	if(t) {
		t.style.paddingTop = immersed + 'px';
		t.style.height = t.offsetHeight + immersed + 'px';
		t = document.querySelector(".mui-content:not(.noImmersed)");
		t && (t.style.marginTop = immersed + 'px');
	}
})(window);