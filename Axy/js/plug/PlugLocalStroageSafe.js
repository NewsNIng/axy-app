// 内置浏览器访问外部链接 安全规则

// 暂时 去除 webview html5 plus 事件
// 详情见 browser.html 
// 后期可针对安全域名做处理

// 重写 localStorage 部分 方法 
// 防止 外部页面恶意删除本地数据

// 重写 key 方法 防止 外部遍历 key 值并 进行恶意修改或删除
window.localStorage.key = function(n){
	return null;
};
// 重写 clear 方法 防止恶意删除
window.localStorage.clear = function(){
	return;
};

console.log('防JS注入');


