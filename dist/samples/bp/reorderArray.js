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
export var reorderArray = function (arr, idxs, to) {
    var movedElements = arr.filter(function (_, idx) { return idxs.includes(idx); });
    to = Math.min.apply(Math, __spread(idxs)) < to ? to += 1 : to -= idxs.filter(function (idx) { return idx < to; }).length;
    var leftSide = arr.filter(function (_, idx) { return idx < to && !idxs.includes(idx); });
    var rightSide = arr.filter(function (_, idx) { return idx >= to && !idxs.includes(idx); });
    return __spread(leftSide, movedElements, rightSide);
};
