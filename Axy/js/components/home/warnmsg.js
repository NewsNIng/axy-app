Vue && Vue.component('warnMsg', {

	template: `<div class="home-warnmsg" v-if="items.length">
	
	
	 <transition-group name="flip-list" tag="div">

				<div class="home-warnmsg-item" v-for="o,i in items" :key="o.id" @tap="onTap(o)">
					<img src="../../image/home/icon_Alarmnews@3x.png" />
					<span class="app-font-size-26 mui-ellipsis">
							{{_fixDevLocation(o.location) +　" " + (o.areaname || o.areaid)}}
						</span>
					<span class="app-font-size-26 home-warnmsg-item-right">{{_fixTimeAgo(o.atime)}}</span>
				</div>
					 
  </transition-group>
	
			</div>`,

	data: function() {
		return {
			animate: false,
			items: [

			]
		}
	},
	created() {
		var that = this;

		Rx.Observable.create(function(ob) {
				_B.on('login_success', function(){
					ob.next();
				});
				_B.on('home_reload', function(){
					ob.next();
				});
				app.user.has() && ob.next();
			})
			.mergeMap(function() {
				return Rx.Observable.fromPromise(that.getMessageList())
			})

			.subscribe(function(data) {
				that.items = data;
				data.length > 1 && setInterval(that.scroll, 4000);
			}, function(err) {
				mui.toast(err.message);
			});

	},

	methods: {
		// 获取告警列表
		getMessageList: function() {
			return new Promise(function(resolve, reject) {
				dal.message.getAlarmList(1, "", "", function(err, data) {

					if(err) {
						return reject(err);
					}
					if(!data || data.length === 0) {
						return;
					}
					resolve(data);
				});
			});

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