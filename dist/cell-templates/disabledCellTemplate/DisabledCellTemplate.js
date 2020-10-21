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
export var DisabledCellTemplate = {
    getCompatibleCell: function (uncertainCell) {
        return __assign(__assign({}, uncertainCell), { text: uncertainCell.text || '', value: uncertainCell.value || parseFloat(uncertainCell.text || '0') });
    },
    render: function (cell) {
        return React.createElement("div", { className: cell.className }, cell.text || (cell.value !== 0 && cell.value));
    },
};
export var getDisabledCell = function (value, style, className) { return ({
    type: 'disabled',
    text: typeof value === 'string' ? value : '',
    value: typeof value === 'number' ? value : 0,
    style: style,
    className: className
}); };
