import * as React from 'react';
import './rate-cell-style.scss';
var RateCellTemplate = (function () {
    function RateCellTemplate() {
        var _this = this;
        this.STARS = 6;
        this.MIN_VAL = 1;
        this.renderContent = function (props) {
            var stars = [];
            var randNumber = Math.floor(Math.random() * 100000);
            var _loop_1 = function (i) {
                stars.push(React.createElement(React.Fragment, { key: i },
                    React.createElement("input", { type: "radio", id: "star_" + i + "_input_" + randNumber, name: "rate_" + randNumber, value: i, checked: _this.textToCellData(props.cellData.toString()) === i, onChange: function () { } }),
                    React.createElement("label", { htmlFor: "star_" + i + "_input_" + randNumber, title: "text", onClick: function (e) { props.onCellDataChanged(i, true); } })));
            };
            for (var i = 1; i <= _this.STARS; i++) {
                _loop_1(i);
            }
            return (React.createElement("div", { className: "rate" }, stars.reverse()));
        };
    }
    RateCellTemplate.prototype.isValid = function (cellData) {
        return typeof (cellData) === 'number';
    };
    RateCellTemplate.prototype.textToCellData = function (text) {
        var result = parseFloat(text);
        if (isNaN(result) || result < this.MIN_VAL)
            return this.MIN_VAL;
        else if (result > this.STARS)
            return this.STARS;
        else
            return result;
    };
    RateCellTemplate.prototype.cellDataToText = function (cellData) {
        return isNaN(cellData) ? '' : cellData.toString();
    };
    RateCellTemplate.prototype.handleKeyDown = function (cellData, keyCode, ctrl, shift, alt, props) {
        return { cellData: cellData, enableEditMode: false };
    };
    return RateCellTemplate;
}());
export { RateCellTemplate };
