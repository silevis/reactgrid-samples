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
import { isNumberInput, keyCodes, isNavigationKey, isTextInput } from '@silevis/reactgrid';
var BudgetPlannerNumberCellTemplate = (function () {
    function BudgetPlannerNumberCellTemplate() {
        var _this = this;
        this.renderContent = function (props) {
            if (!props.isInEditMode) {
                var ret = _this.cellDataToText(props.cellData);
                return ret;
            }
            return React.createElement("input", { style: {
                    width: '100%',
                    height: '100%',
                    padding: 0,
                    border: 0,
                    background: 'transparent',
                    fontSize: 14,
                    outline: 'none',
                }, ref: function (input) {
                    if (input) {
                        input.focus();
                        input.setSelectionRange(input.value.length, input.value.length);
                    }
                }, value: _this.cellDataToText(props.cellData), onChange: function (e) { return props.onCellDataChanged(_this.textToCellData(e.currentTarget.value), false); }, onKeyDown: function (e) {
                    if (isNumberInput(e.keyCode) || isNavigationKey(e))
                        e.stopPropagation();
                    if (e.keyCode === keyCodes.ESC)
                        e.currentTarget.value = props.cellData.value.toString();
                }, onCopy: function (e) { return e.stopPropagation(); }, onCut: function (e) { return e.stopPropagation(); }, onPaste: function (e) { return e.stopPropagation(); }, onPointerDown: function (e) { return e.stopPropagation(); } });
        };
    }
    BudgetPlannerNumberCellTemplate.prototype.isValid = function (cellData) {
        return typeof (cellData.value) === 'number';
    };
    BudgetPlannerNumberCellTemplate.prototype.textToCellData = function (text) {
        return { value: parseFloat(text), isCollapsed: false };
    };
    BudgetPlannerNumberCellTemplate.prototype.cellDataToText = function (cellData) {
        return isNaN(cellData.value) ? '' : cellData.value.toString();
    };
    BudgetPlannerNumberCellTemplate.prototype.handleKeyDown = function (cellData, keyCode, ctrl, shift, alt, props) {
        if (!ctrl && !alt && !shift && isNumberInput(keyCode))
            return { cellData: __assign({}, cellData, { value: NaN }), enableEditMode: true };
        return { cellData: cellData, enableEditMode: keyCode === keyCodes.POINTER || keyCode === keyCodes.ENTER };
    };
    return BudgetPlannerNumberCellTemplate;
}());
export { BudgetPlannerNumberCellTemplate };
var BudgetPlannerTextCellTemplate = (function () {
    function BudgetPlannerTextCellTemplate() {
        var _this = this;
        this.renderContent = function (props) {
            if (!props.isInEditMode)
                return _this.cellDataToText(props.cellData);
            return React.createElement("input", { style: {
                    position: 'inherit',
                    width: '100%',
                    height: '100%',
                    padding: 0,
                    border: 0,
                    background: 'transparent',
                    fontSize: 14,
                    outline: 'none',
                }, ref: function (input) {
                    if (input) {
                        input.focus();
                        input.setSelectionRange(input.value.length, input.value.length);
                    }
                }, defaultValue: props.cellData.value, onChange: function (e) { return props.onCellDataChanged({ value: e.currentTarget.value, isCollapsed: false }, false); }, onBlur: function (e) { return props.onCellDataChanged({ value: e.currentTarget.value, isCollapsed: false }, true); }, onCopy: function (e) { return e.stopPropagation(); }, onCut: function (e) { return e.stopPropagation(); }, onPaste: function (e) { return e.stopPropagation(); }, onPointerDown: function (e) { return e.stopPropagation(); }, onKeyDown: function (e) {
                    if (isTextInput(e.keyCode) || (isNavigationKey(e)))
                        e.stopPropagation();
                    if (e.keyCode === keyCodes.ESC)
                        e.currentTarget.value = props.cellData.value;
                } });
        };
    }
    BudgetPlannerTextCellTemplate.prototype.isValid = function (cellData) {
        return typeof (cellData.value) === 'string';
    };
    BudgetPlannerTextCellTemplate.prototype.textToCellData = function (text) {
        return { value: text, isCollapsed: false };
    };
    BudgetPlannerTextCellTemplate.prototype.cellDataToText = function (cellData) {
        return cellData.value;
    };
    BudgetPlannerTextCellTemplate.prototype.handleKeyDown = function (cellData, keyCode, ctrl, shift, alt, props) {
        if (!ctrl && !alt && isTextInput(keyCode))
            return { cellData: __assign({}, cellData, { value: '' }), enableEditMode: true };
        return { cellData: cellData, enableEditMode: keyCode === keyCodes.POINTER || keyCode === keyCodes.ENTER };
    };
    BudgetPlannerTextCellTemplate.prototype.getCustomStyle = function (cellData, isInEditMode, props) {
        return { backgroundColor: '#34495E', color: 'white' };
    };
    ;
    return BudgetPlannerTextCellTemplate;
}());
export { BudgetPlannerTextCellTemplate };
var BudgetPlannerColumnHeaderCellTemplate = (function () {
    function BudgetPlannerColumnHeaderCellTemplate() {
        var _this = this;
        this.renderContent = function (props) {
            if (!props.isInEditMode) {
                var ret = _this.cellDataToText(props.cellData);
                return ret;
            }
            return React.createElement("input", { style: {
                    position: 'inherit',
                    width: '100%',
                    height: '100%',
                    padding: 0,
                    border: 0,
                    background: 'transparent',
                    fontSize: 14,
                    outline: 'none',
                }, ref: function (input) {
                    if (input) {
                        input.focus();
                        input.setSelectionRange(input.value.length, input.value.length);
                    }
                }, defaultValue: props.cellData.value, onChange: function (e) { return props.onCellDataChanged({ value: e.currentTarget.value, isCollapsed: false }, false); }, onBlur: function (e) { return props.onCellDataChanged({ value: e.currentTarget.value, isCollapsed: false }, true); }, onCopy: function (e) { return e.stopPropagation(); }, onCut: function (e) { return e.stopPropagation(); }, onPaste: function (e) { return e.stopPropagation(); }, onPointerDown: function (e) { return e.stopPropagation(); }, onKeyDown: function (e) {
                    if (isTextInput(e.keyCode) || (isNavigationKey(e)))
                        e.stopPropagation();
                    if (e.keyCode === keyCodes.ESC)
                        e.currentTarget.value = props.cellData.value;
                } });
        };
    }
    BudgetPlannerColumnHeaderCellTemplate.prototype.isValid = function (cellData) {
        return typeof (cellData.value) === 'string';
    };
    BudgetPlannerColumnHeaderCellTemplate.prototype.textToCellData = function (text) {
        return { value: text, isCollapsed: false };
    };
    BudgetPlannerColumnHeaderCellTemplate.prototype.cellDataToText = function (cellData) {
        return cellData.value;
    };
    BudgetPlannerColumnHeaderCellTemplate.prototype.handleKeyDown = function (cellData, keyCode, ctrl, shift, alt) {
        var newCellData = { cellData: cellData, enableEditMode: false };
        if (keyCode === keyCodes.SPACE || keyCode === keyCodes.END || keyCode === 1) {
            console.log('column collapse/expand event');
            newCellData.cellData = __assign({}, cellData, { isCollapsed: !cellData.isCollapsed });
            console.log('was', cellData.isCollapsed, 'is', newCellData.cellData.isCollapsed);
        }
        return newCellData;
    };
    BudgetPlannerColumnHeaderCellTemplate.prototype.getCustomStyle = function (cellData, isInEditMode, props) {
        var parentCount = 0;
        if (cellData.parent) {
            parentCount++;
            var parentCell = cellData.parent;
            while (parentCell.data.parent) {
                parentCount++;
                parentCell = parentCell.data.parent;
            }
        }
        var ret = [
            {
                backgroundColor: 'green',
                color: 'white'
            },
            {
                backgroundColor: 'purple',
                color: 'white',
            },
            {
                backgroundColor: 'pink'
            }
        ];
        return ret[parentCount];
    };
    ;
    return BudgetPlannerColumnHeaderCellTemplate;
}());
export { BudgetPlannerColumnHeaderCellTemplate };
