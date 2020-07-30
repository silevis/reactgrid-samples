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
import { DatagridDataGenerator } from './DatagridDataGenerator';
var VirtualUser = (function () {
    function VirtualUser(borderColor, highlightColumnIdx, highlightRowIdx) {
        this.borderColor = borderColor;
        this.highlightColumnIdx = highlightColumnIdx;
        this.highlightRowIdx = highlightRowIdx;
        this.count = 0;
        this.currectLetterCount = -1;
        this.drawData = '';
        this.dataGen = new DatagridDataGenerator();
        this.borderColor = borderColor;
        this.highlightColumnIdx = highlightColumnIdx;
        this.highlightRowIdx = highlightRowIdx;
    }
    VirtualUser.prototype.getHighlightedCell = function (state) {
        return this.getHighlightedRow(state).cells[this.highlightColumnIdx];
    };
    VirtualUser.prototype.getHighlightedColumn = function (state) {
        return state.columns[this.highlightColumnIdx];
    };
    VirtualUser.prototype.getHighlightedRow = function (state) {
        return state.rows[this.highlightRowIdx];
    };
    VirtualUser.prototype.drawHighlight = function (state) {
        var moveFactor = 2;
        this.highlightColumnIdx = DatagridDataGenerator.getRandomInt(Math.max(0, this.highlightColumnIdx - moveFactor), Math.min(this.highlightColumnIdx + moveFactor, state.columns.length));
        this.highlightRowIdx = DatagridDataGenerator.getRandomInt(Math.max(1, this.highlightRowIdx - moveFactor), Math.min(this.highlightRowIdx + moveFactor, state.rows.length));
    };
    VirtualUser.prototype.updateHighlightsState = function (state) {
        var _this = this;
        var highlightLocations = __spread(state.highlights).filter(function (highlight) { return highlight.borderColor !== _this.borderColor; });
        if (state.rows.length > 0 && this.getHighlightedColumn(state)) {
            var highlight = {
                columnId: this.getHighlightedColumn(state).columnId,
                rowId: this.getHighlightedRow(state).rowId,
                borderColor: this.borderColor
            };
            return __assign(__assign({}, state), { highlights: __spread(highlightLocations, [highlight]) });
        }
        return __assign({}, state);
    };
    VirtualUser.prototype.makeChanges = function (state) {
        var _this = this;
        if (this.currectLetterCount === -1) {
            this.drawData = this.dataGen.getDataAttrByKey(this.getHighlightedColumn(state).columnId);
            this.drawHighlight(state);
            state = this.updateHighlightsState(state);
        }
        this.currectLetterCount += 1;
        state = this.updateHighlightsState(state);
        if (this.drawData && this.drawData.length < this.currectLetterCount) {
            this.currectLetterCount = 0;
            this.drawHighlight(state);
            this.drawData = this.dataGen.getDataAttrByKey(this.getHighlightedColumn(state).columnId);
        }
        var removeChars = DatagridDataGenerator.getRandomInt(0, 1);
        for (var i = 0; i < this.currectLetterCount; i++) {
            if (removeChars) {
                break;
            }
            state = __assign(__assign({}, state), { rows: state.rows.map(function (row, rIdx) {
                    if (rIdx === _this.highlightRowIdx) {
                        return __assign(__assign({}, row), { cells: row.cells.map(function (cell, cIdx) {
                                if (cIdx === _this.highlightColumnIdx) {
                                    return __assign(__assign({}, cell), { text: _this.drawData.slice(0, _this.currectLetterCount), value: parseInt(_this.drawData.slice(0, _this.currectLetterCount), 10) });
                                }
                                return cell;
                            }) });
                    }
                    return row;
                }) });
        }
        this.count++;
        return state;
    };
    return VirtualUser;
}());
export { VirtualUser };
