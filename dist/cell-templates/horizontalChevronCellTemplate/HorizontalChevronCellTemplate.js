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
import { isNavigationKey, isAlphaNumericKey, getCellProperty } from "@silevis/reactgrid";
var HorizontalChevronCellTemplate = (function () {
    function HorizontalChevronCellTemplate() {
        this.isFocusable = function () { return false; };
    }
    HorizontalChevronCellTemplate.prototype.getCompatibleCell = function (uncertainCell) {
        var text = getCellProperty(uncertainCell, 'text', 'string');
        var isExpanded = false;
        try {
            isExpanded = getCellProperty(uncertainCell, 'isExpanded', 'boolean');
        }
        catch (_a) {
            isExpanded = true;
        }
        var hasChildren = false;
        try {
            hasChildren = getCellProperty(uncertainCell, 'hasChildren', 'boolean');
        }
        catch (_b) {
            hasChildren = false;
        }
        var value = parseFloat(text);
        return __assign(__assign({}, uncertainCell), { text: text, value: value, isExpanded: isExpanded, hasChildren: hasChildren });
    };
    HorizontalChevronCellTemplate.prototype.update = function (cell, cellToMerge) {
        return this.getCompatibleCell(__assign(__assign({}, cell), { isExpanded: cellToMerge.isExpanded, text: cellToMerge.text }));
    };
    HorizontalChevronCellTemplate.prototype.handleKeyDown = function (cell, keyCode, ctrl, shift, alt) {
        var cellCopy = __assign({}, cell);
        return { cell: cellCopy, enableEditMode: false };
    };
    HorizontalChevronCellTemplate.prototype.getClassName = function (cell, isInEditMode) {
        var isExpanded = cell.hasChildren ? cell.isExpanded ? 'expanded' : 'collapsed' : '';
        var className = cell.className || '';
        return isExpanded + " " + className;
    };
    HorizontalChevronCellTemplate.prototype.render = function (cell, isInEditMode, onCellChanged) {
        var _this = this;
        return (!isInEditMode ?
            React.createElement(React.Fragment, null,
                cell.text,
                cell.hasChildren ?
                    React.createElement("div", { className: 'chevron', onPointerDown: function (e) {
                            e.stopPropagation();
                            onCellChanged(_this.getCompatibleCell(__assign(__assign({}, cell), { isExpanded: !cell.isExpanded })), true);
                        } },
                        React.createElement("span", { className: 'icon' }, "\u276F"))
                    :
                        React.createElement("div", { className: 'no-child' }))
            :
                React.createElement("input", { ref: function (input) {
                        if (input) {
                            input.focus();
                            input.setSelectionRange(input.value.length, input.value.length);
                        }
                    }, defaultValue: cell.text, onChange: function (e) { return onCellChanged(_this.getCompatibleCell(__assign(__assign({}, cell), { text: e.currentTarget.value })), false); }, onBlur: function (e) { return onCellChanged(_this.getCompatibleCell(__assign(__assign({}, cell), { text: e.currentTarget.value })), true); }, onCopy: function (e) { return e.stopPropagation(); }, onCut: function (e) { return e.stopPropagation(); }, onPaste: function (e) { return e.stopPropagation(); }, onPointerDown: function (e) { return e.stopPropagation(); }, onKeyDown: function (e) {
                        if (isAlphaNumericKey(e.keyCode) || (isNavigationKey(e.keyCode)))
                            e.stopPropagation();
                    } }));
    };
    return HorizontalChevronCellTemplate;
}());
export { HorizontalChevronCellTemplate };
