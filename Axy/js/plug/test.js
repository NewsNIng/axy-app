document.addEventListener("plusready", function() {
	var B = window.plus.bridge;
	var PGPlugintest = {
		"openCamListWindow": function() {
			return B.exec("PGPlugintest", "OpenCamListWindow", Array.prototype.slice.call(arguments, 0));
		}
	};
	window.plus.PGPlugintest = PGPlugintest;
}, true);