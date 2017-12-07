/*

const DevManager = (function() {

	class ManagerBase {
		private ALLD: any;
		public data: Array < any > ;

		constructor(ALLD: any) {
			this.ALLD = ALLD;
			this.data = [];
		}

		get(): Array < any > {
			return this.data.length ? this.data: this._get();
		}
		_get(): Array < any > {
			this.data = this.ALLD.data;
			return this.data;
		}
		set(data: Array < any > ) {
			this.data = data;
			this._set();
			return this;
		}
		_set() {
			this.ALLD.data = this.data;
		}
		add(newData: object) {
			this.data.unshift(newData);
			this._set();
			return this;
		}
	}

	class DevManager extends ManagerBase {
		constructor(c: any) {
			super(c);
		}

        updateById(o: any, where: Function) {
            for (let i = 0, l = this.data.length; i < l; i++) {
                if(where(this.data[i], o)){
					this.data[i] = o;
					this._set();
					return this;
				}
			}
			return this.add(o);
		}
	}

	return DevManager;
}());

*/

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var DevManager = (function () {
    var ManagerBase = /** @class */ (function () {
        function ManagerBase(ALLD) {
            this.ALLD = ALLD;
            this.data = [];
        }
        ManagerBase.prototype.get = function () {
            return this.data.length ? this.data : this._get();
        };
        ManagerBase.prototype._get = function () {
            this.data = this.ALLD.data;
            return this.data;
        };
        ManagerBase.prototype.set = function (data) {
            this.data = data;
            this._set();
            return this;
        };
        ManagerBase.prototype._set = function () {
            this.ALLD.data = this.data;
        };
        ManagerBase.prototype.add = function (newData) {
            this.data.unshift(newData);
            this._set();
            return this;
        };
        return ManagerBase;
    }());
    var DevManager = /** @class */ (function (_super) {
        __extends(DevManager, _super);
        function DevManager(c) {
            return _super.call(this, c) || this;
        }
        DevManager.prototype.updateById = function (o, where) {
            for (var i = 0, l = this.data.length; i < l; i++) {
                if (where(this.data[i], o)) {
                    this.data[i] = o;
                    this._set();
                    return this;
                }
            }
            return this.add(o);
        };
        return DevManager;
    }(ManagerBase));
    return DevManager;
}());
