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
import React from 'react';
export var DropdownCellTemplate = {
    getCompatibleCell: function (uncertainCell) {
        var _a;
        return __assign(__assign({}, uncertainCell), { text: uncertainCell.text || '', value: ((_a = uncertainCell.values) === null || _a === void 0 ? void 0 : _a.length) || 0, values: uncertainCell.values || [], disabled: uncertainCell.disabled });
    },
    update: function (cell, cellToMerge) {
        return this.getCompatibleCell(__assign(__assign({}, cell), { text: cellToMerge.text }));
    },
    render: function (cell, isInEditMode, onCellChanged) {
        var _this = this;
        return (React.createElement("select", { disabled: cell.disabled, className: cell.className, onPointerDown: function (e) { return e.stopPropagation(); }, value: cell.text, onChange: function (e) {
                return onCellChanged(_this.getCompatibleCell(__assign(__assign({}, cell), { text: e.currentTarget.value })), true);
            } }, cell.values.map(function (value, idx) { return React.createElement("option", { key: idx, value: value }, value); })));
    },
};
export var getDropdownCell = function (text, values, disabled, style, className) { return ({
    type: 'dropdown',
    text: text,
    style: style,
    values: values,
    disabled: disabled,
    className: className
}); };
