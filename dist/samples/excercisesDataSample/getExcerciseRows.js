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
import { noBorderCellStyle } from "./utils";
import { getDisabledCell } from "../../cell-templates/disabledCellTemplate/DisabledCellTemplate";
import { parameters } from "../../data/excercisesData/initialValues";
export var getExcerciseRows = function (excercise, athletes, results) {
    var style = noBorderCellStyle;
    var headerBorder = { color: 'rgba(0,0,0,0.4)', width: '1px' };
    var lastRowStyle = __assign(__assign({}, style), { border: __assign(__assign({}, style.border), { bottom: headerBorder }) });
    var headerRowStyle = __assign(__assign({}, excercise.hidden ? lastRowStyle : style), { color: '#404040' });
    var headerRow = {
        rowId: excercise.id,
        height: 30,
        cells: __spread([
            { type: 'chevron', text: excercise.name, isExpanded: !excercise.hidden, className: 'bold-text', style: headerRowStyle, hasChildren: true }
        ], athletes.map(function (athlete) {
            var athleteResults = results.filter(function (result) { return result.athleteId === athlete.id && result.excerciseId === excercise.id; });
            var summedUpPoints = athleteResults.reduce(function (prev, curr) {
                var param = parameters.find(function (param) { return param.id === curr.parameterId; });
                if (!param)
                    return prev;
                return prev + param.multiplier(curr.value || 0);
            }, 0);
            return getDisabledCell(summedUpPoints.toFixed(2), headerRowStyle, "bold-text gray align-right");
        }))
    };
    var excerciseParams = parameters.filter(function (param) { return param.excerciseId === excercise.id; });
    var rows = excerciseParams.map(function (param, idx) {
        var rowStyle = idx === excerciseParams.length - 1 ? lastRowStyle : style;
        return ({
            rowId: param.id,
            height: 30,
            cells: __spread([
                getDisabledCell(param.name, rowStyle)
            ], athletes.map(function (athlete) {
                var result = results.find(function (result) { return result.athleteId === athlete.id && result.parameterId === param.id; });
                return { type: 'number', value: (result === null || result === void 0 ? void 0 : result.value) || 0, style: rowStyle };
            }))
        });
    });
    return excercise.hidden ? [headerRow] : __spread([headerRow], rows);
};
