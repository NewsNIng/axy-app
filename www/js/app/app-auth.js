// app 内权限控制

// 依赖Js
// app.js app.page.js

(function(app) {
	
	var auth = {};

	// 权限对应名称
	var AUTH_NAME_DIR = {
		LOGIN: "login", // 登录权限
		MASTER: "master", // 是否主账号
	};

	// 权限对应处理
	var auth_check_dir = {
		"login": {
			exec: function() {
				return new Promise(function(re, rj) {
					app.user.get(function(u) {
						u && re(u);
					});
				});
			},
		},
		"master": {
			exec: function(user) {
				return new Promise(function(re, rj) {
					if(user.ismaster === 1) {
						re(user);
					} else {
						rj("操作需要主账号");
					}
				});
			},
		},

	};

	for(var i in AUTH_NAME_DIR) {
		auth[i] = AUTH_NAME_DIR[i]
	}

	// 验证权限
	auth.verify = function(authName, data) {
		return new Promise(function(reslove, reject) {
			var obj = auth_check_dir[authName];
			if(obj && obj.exec) {
				obj.exec(data)
					.then(reslove)
					.catch(function(message) {
						reject({
							message: message,
							authName: authName
						});
					});
			} else {
				reject({
					message: "权限验证不存在",
					authName: authName
				});
			}
		});
	};

	// 验证多个权限
	auth.verifys = function(authList) {
		var temp,
			l = authList.length;

		return new Promise(function(re, rj) {
			(function _(index) {

				if(index >= l) {
					return re();
				}

				temp = authList[index];

				auth.verify(temp.name, temp.data)
					.then(function() {
						_(index + 1);
					})
					.catch(rj);
			}(0));
		});

	};

	app.auth = auth;

}(window.app = window.app || {}));