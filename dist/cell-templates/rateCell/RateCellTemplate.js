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
import * as React from 'react';
import { getCellProperty } from '@silevis/reactgrid';
import './rate-cell-style.scss';
var RateCellTemplate = (function () {
    function RateCellTemplate() {
        this.STARS = 6;
        this.MIN_VAL = 1;
    }
    RateCellTemplate.prototype.getCompatibleCell = function (uncertainCell) {
        var value = getCellProperty(uncertainCell, 'value', 'number');
        var text = value.toString();
        return __assign(__assign({}, uncertainCell), { value: value, text: text });
    };
    RateCellTemplate.prototype.textToCellData = function (cellvalue) {
        if (isNaN(cellvalue) || cellvalue < this.MIN_VAL)
            return this.MIN_VAL;
        else if (cellvalue > this.STARS)
            return this.STARS;
        else
            return cellvalue;
    };
    RateCellTemplate.prototype.handleKeyDown = function (cell, keyCode, ctrl, shift, alt) {
        return { cell: cell, enableEditMode: false };
    };
    RateCellTemplate.prototype.update = function (cell, cellToMerge) {
        return this.getCompatibleCell(__assign(__assign({}, cell), { value: cellToMerge.value }));
    };
    RateCellTemplate.prototype.render = function (cell, isInEditMode, onCellChanged) {
        var stars = [];
        var randNumber = Math.floor(Math.random() * 100000);
        var _loop_1 = function (i) {
            stars.push(React.createElement(React.Fragment, { key: i },
                React.createElement("input", { type: "radio", id: "star_" + i + "_input_" + randNumber, name: "rate_" + randNumber, value: i, checked: this_1.textToCellData(cell.value) === i, onChange: function () { return null; } }),
                React.createElement("label", { htmlFor: "star_" + i + "_input_" + randNumber, title: "text", onClick: function (e) {
                        e.preventDefault();
                        onCellChanged(__assign(__assign({}, cell), { value: i }), true);
                    } })));
        };
        var this_1 = this;
        for (var i = 1; i <= this.STARS; i++) {
            _loop_1(i);
        }
        return React.createElement("div", { className: "rate" }, stars.reverse());
    };
    return RateCellTemplate;
}());
export { RateCellTemplate };
