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
import { keyCodes } from '@silevis/reactgrid/lib';
var blankFunction = function () { };
export var ButtonCellTemplate = {
    getCompatibleCell: function (uncertainCell) {
        return __assign(__assign({}, uncertainCell), { text: uncertainCell.text || '', value: 0, onClick: uncertainCell.onClick || blankFunction });
    },
    handleKeyDown: function (cell, keyCode) {
        if (keyCode === keyCodes.ENTER) {
            cell.onClick();
        }
        return { cell: cell, enableEditMode: false };
    },
    render: function (cell) {
        return (React.createElement("button", { className: cell.className, onPointerDown: function (e) { return e.stopPropagation(); }, onClick: cell.onClick }, cell.text));
    },
};
export var getButtonCell = function (text, onClick, style, className) { return ({
    type: 'button',
    text: text,
    style: style,
    onClick: onClick,
    className: className
}); };
