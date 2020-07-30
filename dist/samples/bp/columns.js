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
var getMonth = function (year, quarter, month) {
    return { columnId: year + "-" + quarter + "-" + month, width: 100 };
};
var getQuarter = function (year, quarter) {
    return { columnId: year + "-" + quarter, width: 100 };
};
var generateQuarter = function (year, quarter, month) {
    return [
        getQuarter(year, quarter),
        getMonth(year, quarter, month),
        getMonth(year, quarter, month + 1),
        getMonth(year, quarter, month + 2),
    ];
};
var generateYear = function (year) {
    return __spread([
        { columnId: "" + year, width: 100 }
    ], generateQuarter(year, 'Q1', 1), generateQuarter(year, 'Q2', 4), generateQuarter(year, 'Q3', 7), generateQuarter(year, 'Q4', 10));
};
export var dataColumns = __spread([
    { columnId: 'Struct', width: 250 }
], generateYear(2020), generateYear(2021));
