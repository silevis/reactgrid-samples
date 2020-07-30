var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
var VirtualEnv = (function () {
    function VirtualEnv() {
        var _this = this;
        this.virtualUsers = [];
        this.updateView = function (state) {
            var modifiedState = __assign({}, state);
            _this.virtualUsers.forEach(function (virtualUser) { return modifiedState = virtualUser.makeChanges(modifiedState); });
            return modifiedState;
        };
    }
    VirtualEnv.prototype.addUser = function (virtualUser) {
        this.virtualUsers = __spread(this.virtualUsers, [virtualUser]);
        return this;
    };
    return VirtualEnv;
}());
export { VirtualEnv };
