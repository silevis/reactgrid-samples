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
import './styling.scss';
var DynaGridContainer = styled.div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  position: relative;\n  min-height: 400px;\n"], ["\n  position: relative;\n  min-height: 400px;\n"])));
var ColumnReorderSample = (function (_super) {
    __extends(ColumnReorderSample, _super);
    function ColumnReorderSample() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            columns: columns(true, false),
            rows: rows(true)
        };
        _this.getMatrix = function () {
            var columns = __spreadArrays(_this.state.columns).map(function (column, cIdx) { return (__assign(__assign({}, column), { onDrop: function (idxs) {
                    var arrayIndexes = idxs.map(function (id) { return _this.state.columns.findIndex(function (column) { return column.id === id; }); });
                    _this.setState({
                        columns: _this.reorderArray(_this.state.columns, arrayIndexes, cIdx),
                        rows: _this.state.rows.map(function (row) { return (__assign(__assign({}, row), { cells: _this.reorderArray(row.cells, arrayIndexes, cIdx) })); }),
                    });
                } })); });
            var rows = __spreadArrays(_this.state.rows).map(function (row, rIdx) { return (__assign(__assign({}, row), { onDrop: function (idxs) { return _this.setState({
                    rows: _this.reorderArray(_this.state.rows, idxs.map(function (id) { return _this.state.rows.findIndex(function (r) { return r.id === id; }); }), rIdx)
                }); } })); });
            return { rows: rows, columns: columns };
        };
        return _this;
    }
    ColumnReorderSample.prototype.prepareDataChanges = function (dataChanges) {
        var _this = this;
        var state = __assign({}, this.state);
        dataChanges.forEach(function (change) {
            var columnIndex = _this.state.columns.findIndex(function (column) { return column.id === change.columnId; });
            state.rows.forEach(function (row) { row.id == change.rowId ? row.cells[columnIndex].data = change.newData : row; });
        });
        return state;
    };
    ColumnReorderSample.prototype.reorderArray = function (arr, idxs, to) {
        var movedElements = arr.filter(function (_, idx) { return idxs.includes(idx); });
        to = Math.min.apply(Math, idxs) < to ? to += 1 : to -= idxs.filter(function (idx) { return idx < to; }).length;
        var leftSide = arr.filter(function (_, idx) { return idx < to && !idxs.includes(idx); });
        var rightSide = arr.filter(function (_, idx) { return idx >= to && !idxs.includes(idx); });
        return __spreadArrays(leftSide, movedElements, rightSide);
    };
    ColumnReorderSample.prototype.render = function () {
        var _this = this;
        return (React.createElement(DynaGridContainer, { id: "column-reorder-sample" },
            React.createElement(ReactGrid, { cellMatrixProps: this.getMatrix(), cellTemplates: {
                    'rating': new RateCellTemplate,
                    'flag': new FlagCellTemplate
                }, onDataChanged: function (changes) { return _this.setState(_this.prepareDataChanges(changes)); }, license: 'non-commercial' })));
    };
    return ColumnReorderSample;
}(React.Component));
export { ColumnReorderSample };
var templateObject_1;
