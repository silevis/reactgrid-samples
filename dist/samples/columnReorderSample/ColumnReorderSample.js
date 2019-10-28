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
import '@silevis/reactgrid/dist/lib/assets/core.css';
var DynaGridContainer = styled.div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  position: relative;\n  margin-left: 10px;\n  width: 100%;\n  min-height: 400px;\n"], ["\n  position: relative;\n  margin-left: 10px;\n  width: 100%;\n  min-height: 400px;\n"])));
var ColumnReorderSample = (function (_super) {
    __extends(ColumnReorderSample, _super);
    function ColumnReorderSample() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            columns: columns(true, false),
            rows: rows(true)
        };
        _this.getMatrix = function () {
            var columns = __spreadArrays(_this.state.columns).map(function (c, cIdx) { return (__assign(__assign({}, c), { onDrop: function (idxs) {
                    _this.setState({
                        columns: _this.getReorderedColumns(idxs, cIdx),
                        rows: _this.getUpdatedRows(__spreadArrays(idxs).reverse().map(function (id) { return _this.state.columns.findIndex(function (c) { return c.id === id; }); }), cIdx)
                    });
                } })); });
            var rows = __spreadArrays(_this.state.rows).map(function (r, rIdx) { return (__assign(__assign({}, r), { onDrop: function (idxs) { return _this.setState({
                    rows: _this.getReorderedRows(idxs, rIdx)
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
            state.rows.forEach(function (r) { r.id == change.rowId ? r.cells[columnIndex].data = change.newData : r; });
        });
        return state;
    };
    ColumnReorderSample.prototype.getReorderedColumns = function (colIds, to) {
        var movedColumns = __spreadArrays(this.state.columns).filter(function (c) { return colIds.includes(c.id); });
        var clearedColumns = __spreadArrays(this.state.columns).filter(function (c) { return !colIds.includes(c.id); });
        if (to > __spreadArrays(this.state.columns).findIndex(function (c) { return c.id == colIds[0]; }))
            to -= colIds.length - 1;
        clearedColumns.splice.apply(clearedColumns, __spreadArrays([to, 0], movedColumns));
        return clearedColumns;
    };
    ColumnReorderSample.prototype.getUpdatedRows = function (from, to) {
        var newRows = [];
        this.state.rows.forEach(function (row) {
            var newRow = __assign({}, row);
            var newCells = __spreadArrays(row.cells);
            var i = 0;
            from.forEach(function (fromIdx) {
                if (to > fromIdx) {
                    newCells.splice(to - i, 0, newCells.splice(fromIdx, 1)[0]);
                    i++;
                }
                else {
                    newCells.splice(to, 0, newCells.splice(fromIdx - i, 1)[0]);
                    i--;
                }
            });
            newRow.cells = newCells;
            newRows = __spreadArrays(newRows, [newRow]);
        });
        return newRows;
    };
    ColumnReorderSample.prototype.getReorderedRows = function (rowIds, to) {
        var movedRows = __spreadArrays(this.state.rows).filter(function (r) { return rowIds.includes(r.id); });
        var clearedRows = __spreadArrays(this.state.rows).filter(function (r) { return !rowIds.includes(r.id); });
        if (to > __spreadArrays(this.state.rows).findIndex(function (r) { return r.id == rowIds[0]; }))
            to -= rowIds.length - 1;
        clearedRows.splice.apply(clearedRows, __spreadArrays([to, 0], movedRows));
        return clearedRows;
    };
    ColumnReorderSample.prototype.render = function () {
        var _this = this;
        return (React.createElement(DynaGridContainer, null,
            React.createElement(ReactGrid, { cellMatrixProps: this.getMatrix(), cellTemplates: {
                    'rating': new RateCellTemplate,
                    'flag': new FlagCellTemplate
                }, onDataChanged: function (changes) { return _this.setState(_this.prepareDataChanges(changes)); }, license: 'non-commercial' })));
    };
    return ColumnReorderSample;
}(React.Component));
export { ColumnReorderSample };
var templateObject_1;
