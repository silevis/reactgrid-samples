var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
import * as React from 'react';
import styled from 'styled-components';
import { ReactGrid } from '@silevis/reactgrid';
import { RateCellTemplate } from '../../cell-templates/rateCell/RateCellTemplate';
import { FlagCellTemplate } from '../../cell-templates/flagCell/FlagCellTemplate';
import { columns } from '../../data/columns';
import { rows } from '../../data/rows';
var ReactGridContainer = styled.div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  position: relative;\n  min-height: 400px;\n"], ["\n  position: relative;\n  min-height: 400px;\n"])));
var ResizeCellSample = (function (_super) {
    __extends(ResizeCellSample, _super);
    function ResizeCellSample() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            columns: columns(false, true),
            rows: rows(false),
        };
        _this.prepareDataChanges = function (dataChanges) {
            var state = __assign({}, _this.state);
            dataChanges.forEach(function (change) {
                state.rows.forEach(function (row) {
                    if (row.id == change.rowId) {
                        var field = _this.state.columns.findIndex(function (column) { return column.id == change.columnId; });
                        if (field !== undefined)
                            row.cells[field].data = change.newData;
                    }
                });
            });
            return state;
        };
        return _this;
    }
    ResizeCellSample.prototype.getMatrix = function () {
        var _this = this;
        var columns = __spreadArrays(this.state.columns).map(function (column, idx) { return (__assign(__assign({}, column), { onResize: function (width) {
                columns[idx] = __assign(__assign({}, column), { width: width });
                _this.setState({ columns: columns });
            } })); });
        return { columns: columns, rows: this.state.rows };
    };
    ResizeCellSample.prototype.render = function () {
        var _this = this;
        return (React.createElement(ReactGridContainer, { id: "resize-cell-sample" },
            React.createElement(ReactGrid, { cellMatrixProps: this.getMatrix(), cellTemplates: {
                    'rating': new RateCellTemplate,
                    'flag': new FlagCellTemplate
                }, onDataChanged: function (changes) { return _this.setState(_this.prepareDataChanges(changes)); }, license: 'non-commercial' })));
    };
    return ResizeCellSample;
}(React.Component));
export { ResizeCellSample };
var templateObject_1;
