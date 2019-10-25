import * as React from 'react';
import './number-dropdown-cell-style.css';
var DropdownNumberCellTemplate = (function () {
    function DropdownNumberCellTemplate() {
        var _this = this;
        this.MIN_VAL = 0;
        this.MAX_VAL = 100;
        this.STEP = 10;
        this.renderContent = function (props) {
            return (React.createElement(React.Fragment, null,
                React.createElement("div", { className: "rg-dropdown-number-cell" },
                    React.createElement("div", { className: "rg-dropdown-number-cell-wrapper" },
                        React.createElement("div", { className: "rg-dropdown-number-cell-value" },
                            React.createElement("span", null, _this.cellDataToText(props.cellData))),
                        React.createElement("div", { className: "rg-dropdown-number-cell-chevron" },
                            React.createElement("div", { style: { transform: !props.cellData.isOpened ? 'rotate(0deg)' : 'rotate(90deg)', transitionDuration: '200ms' }, onClick: function () {
                                    props.onCellDataChanged({ value: props.cellData.value, isOpened: !props.cellData.isOpened }, true);
                                } }, " \u276F"))),
                    props.cellData.isOpened &&
                        React.createElement("div", { className: "rg-dropdown-number-cell-dropdown" },
                            React.createElement("input", { type: "range", min: _this.MIN_VAL, max: _this.MAX_VAL, step: _this.STEP, defaultValue: props.cellData.value.toString(), onChange: function (e) {
                                    props.onCellDataChanged({ value: parseInt(e.currentTarget.value), isOpened: props.cellData.isOpened }, true);
                                } })))));
        };
    }
    DropdownNumberCellTemplate.prototype.isValid = function (cellData) {
        cellData.isOpened;
        return typeof cellData.value === 'number';
    };
    DropdownNumberCellTemplate.prototype.textToCellData = function (text) {
        var result = parseInt(text);
        if (isNaN(result) || result < this.MIN_VAL)
            return { value: this.MIN_VAL, isOpened: false };
        else if (result > this.MAX_VAL)
            return { value: this.MAX_VAL, isOpened: false };
        else
            return { value: result, isOpened: false };
    };
    DropdownNumberCellTemplate.prototype.cellDataToText = function (cellData) {
        return isNaN(cellData.value) ? '' : cellData.value.toString();
    };
    DropdownNumberCellTemplate.prototype.handleKeyDown = function (cellData, keyCode, ctrl, shift, alt, props) {
        return { cellData: cellData, enableEditMode: false };
    };
    DropdownNumberCellTemplate.prototype.getCustomStyle = function (cellData, isInEditMode, props) {
        return { overflow: 'unset' };
    };
    ;
    return DropdownNumberCellTemplate;
}());
export { DropdownNumberCellTemplate };
