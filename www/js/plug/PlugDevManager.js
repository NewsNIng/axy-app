/*
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
    var ManagerBase = (function () {
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
    var DevManager =(function (_super) {
        __extends(DevManager, _super);
        function DevManager(c) {
            return _super.call(this, c) || this;
        }
        DevManager.prototype.updateById = function (o, where) {
            for (var i = 0, l = this.data.length; i < l; i++) {
                if (where(this.data[i], o)) {
                    this.data[i] = o;
                    this._set();
                    return true;
                }
            }
            this.add(o);
            return false;
        };
        DevManager.prototype.selectByWhere = function (where) {
            for (var i = 0, l = this.data.length; i < l; i++) {
                if (where(this.data[i])) {
                    return this.data[i];
                }
            }
            return null;
        };
        return DevManager;
    }(ManagerBase));
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
                    return true;
                }
            }
            this.add(o);
            return false;
        };
        DevManager.prototype.selectByWhere = function (where) {
        	var data = this._get();
            for (var i = 0, l = data.length; i < l; i++) {
                if (where(data[i])) {
                    return data[i];
                }
            }
            return null;
        };
        return DevManager;
    }(ManagerBase));
    return DevManager;
}());




