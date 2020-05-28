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
import './number-dropdown-cell-style.scss';
var DropdownNumberCellTemplate = (function () {
    function DropdownNumberCellTemplate() {
    }
    DropdownNumberCellTemplate.prototype.getCompatibleCell = function (uncertainCell) {
        var value = getCellProperty(uncertainCell, 'value', 'number');
        var isOpened = getCellProperty(uncertainCell, 'isOpened', 'boolean');
        var text = value.toString();
        var limitedValue = this.getLimitedValue(value);
        return __assign(__assign({}, uncertainCell), { value: limitedValue, text: limitedValue.toString(), isOpened: isOpened });
    };
    DropdownNumberCellTemplate.prototype.getLimitedValue = function (value) {
        if (Number.isNaN(value) || value < DropdownNumberCellTemplate.MIN_VAL)
            return DropdownNumberCellTemplate.MIN_VAL;
        else if (value > DropdownNumberCellTemplate.MAX_VAL)
            return DropdownNumberCellTemplate.MAX_VAL;
        else
            return value;
    };
    DropdownNumberCellTemplate.prototype.handleKeyDown = function (cell, keyCode, ctrl, shift, alt) {
        return { cell: cell, enableEditMode: false };
    };
    DropdownNumberCellTemplate.prototype.update = function (cell, cellToMerge) {
        if (cellToMerge.value !== undefined && cellToMerge.value !== NaN)
            return this.getCompatibleCell(__assign(__assign({}, cell), { value: cellToMerge.value }));
        var parsed = parseFloat(cellToMerge.text);
        return this.getCompatibleCell(__assign(__assign({}, cell), { value: (parsed > 0 || parsed < 0) ? parsed : 0 }));
    };
    DropdownNumberCellTemplate.prototype.getStyle = function (cell, isInEditMode) {
        return ({ overflow: 'unset' });
    };
    ;
    DropdownNumberCellTemplate.prototype.render = function (cell, isInEditMode, onCellChanged) {
        var _this = this;
        var _a = React.useState(false), isOpen = _a[0], setOpen = _a[1];
        return (React.createElement(React.Fragment, null,
            React.createElement("div", { className: "wrapper" },
                React.createElement("div", { className: "value" },
                    React.createElement("span", null, cell.value)),
                React.createElement("div", { className: "chevron", onClick: function () { setOpen(!isOpen); } },
                    React.createElement("div", { style: { transform: !isOpen ? 'rotate(0deg)' : 'rotate(90deg)', transitionDuration: '200ms' } }, " \u276F"))),
            isOpen &&
                React.createElement("div", { className: "dropdown" },
                    React.createElement("input", { type: "range", min: DropdownNumberCellTemplate.MIN_VAL, max: DropdownNumberCellTemplate.MAX_VAL, step: DropdownNumberCellTemplate.STEP, defaultValue: cell.value.toString(), onPointerDown: function (e) { return e.stopPropagation(); }, onChange: function (e) {
                            onCellChanged(_this.getCompatibleCell(__assign(__assign({}, cell), { value: parseInt(e.currentTarget.value, 10) })), true);
                        } }))));
    };
    DropdownNumberCellTemplate.MIN_VAL = 0;
    DropdownNumberCellTemplate.MAX_VAL = 100;
    DropdownNumberCellTemplate.STEP = 2;
    return DropdownNumberCellTemplate;
}());
export { DropdownNumberCellTemplate };
