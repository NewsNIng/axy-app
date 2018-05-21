Vue && Vue.component('warn-msg', {

	template: '<div class="home-warnmsg" v-if="items.length" ><img src="../../image/home/icon_Unreadmessage@3x.png" /><transition-group name="flip-list" tag="div"><div class="home-warnmsg-item" v-for="o,i in items" :key="o.ID" @tap="onTap(o)"><span class="app-font-size-26 mui-ellipsis">{{_fixDevLocation(o.location) +　" " + (o.accessoryName || o.accessoryID)}}</span><span class="app-font-size-26 home-warnmsg-item-right">{{_fixTimeAgo(o.ntime)}}</span></div></transition-group></div>',

	data: function() {
		return {
			animate: false,
			items: [{
				ID:1,
				location: 'jsian',
				accessoryName: '9999',
				accessoryID: '3ii',
				ntime: 195632563555,
			}],
			st: null,
		}
	},
	created: function() {
		var that = this;
		// 设备就绪流
		var pready$ = Rx.Observable.create(function(ob) {
			if(window.plus) {
				ob.next();
			} else {
				document.addEventListener('plusready', function() {
					ob.next();
				});
			}
		});

		var NotifyWarningMsg$ = Rx.Observable.create(function(ob) {
			// 原生通知告警信息刷新
			plug.H5NativeBridge.NotifyWarningMsg(function(data) {
				ob.next(data);
			});
		});
		
		

 
		Rx.Observable.create(function(ob) {
				_B.on('login_success', function() {
					ob.next();
				});
				_B.on('home_reload', function() {
					ob.next();
				});

				app.user.has() && ob.next();
			})
			
			.merge(pready$.mergeMapTo(NotifyWarningMsg$).debounceTime(3e3))
		
			.mergeMap(function() {
				return Rx.Observable.fromPromise(that.getMessageList())
			})

			.subscribe(function(data) {
				
				that.items = data;

				if(data.length > 1) {
					if(!that.st) {
						that.st = setInterval(that.scroll, 8e3);
					}
				} else {
					if(that.st) {
						window.clearInterval(that.st);
						that.st = null;
					}
				}
			}, function(err) {
				mui.toast(err.message);
			});

	},
	

	methods: {
		// 获取告警列表
//		getMessageList: function() {
//			return new Promise(function(resolve, reject) {
//				dal.message.getAlarmList(1, "", "", function(err, data) {
//
//					if(err) {
//						return reject(err);
//					}
//					if(!data || data.length === 0) {
//						return;
//					}
//					resolve(data);
//				});
//			});
//
//		},
		
		getMessageList: function(){
			return new Promise(function(resolve,reject){
				var username = app.user.get().account;
				plug.H5NativeBridge.GetNoReadAlarmListAsyn(username,10,function(data){
					data = JSON.parse(data);
					if(data.code != 0) return;
					data = data.data;
					if(!data || data.length == 0){
						return;
					}
					resolve(data);
				})
			})
		},
		onTap: function(o) {
			mui.openWindow('../person/message/index.html');
		},

		scroll: function() {
			this.animate = true;
			setTimeout(function() {
				this.items.push(this.items[0]);
				this.items.shift();
				this.animate = false;
			}.bind(this), 0)
		},

		_fixDevLocation: function(s) {
			return app.dev.fixName(s);
		},
		_fixTimeAgo: function(s) {
			return new Date().ago(s);
		},
	},

});