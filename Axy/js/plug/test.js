document.addEventListener("plusready", function() {
	var B = window.plus.bridge;
	var plugintest = {
		"openCamListWindow": function() {
			return B.exec("plugintest", "OpenCamListWindow", Array.prototype.slice.call(arguments, 0));
		}
	};
	window.plus.plugintest = plugintest;
}, true);