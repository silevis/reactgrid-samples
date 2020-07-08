var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
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
import { columns as dataColumns } from '../../data/columns';
import { rows as dataRows } from '../../data/rows';
import './styling.scss';
var ReactGridContainer = styled.div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  position: relative;\n  min-height: 400px;\n"], ["\n  position: relative;\n  min-height: 400px;\n"])));
export var ColumnReorderSample = function () {
    var _a = React.useState(function () { return ({
        columns: dataColumns(true, false),
        rows: dataRows(true),
    }); }), state = _a[0], setState = _a[1];
    var handleChanges = function (changes) {
        var newState = __assign({}, state);
        changes.forEach(function (change) {
            var changeRowIdx = newState.rows.findIndex(function (el) { return el.rowId === change.rowId; });
            var changeColumnIdx = newState.columns.findIndex(function (el) { return el.columnId === change.columnId; });
            newState.rows[changeRowIdx].cells[changeColumnIdx] = change.newCell;
        });
        setState(newState);
        return true;
    };
    var reorderArray = function (arr, idxs, to) {
        var movedElements = arr.filter(function (_, idx) { return idxs.includes(idx); });
        to = Math.min.apply(Math, idxs) < to ? to += 1 : to -= idxs.filter(function (idx) { return idx < to; }).length;
        var leftSide = arr.filter(function (_, idx) { return idx < to && !idxs.includes(idx); });
        var rightSide = arr.filter(function (_, idx) { return idx >= to && !idxs.includes(idx); });
        return __spreadArrays(leftSide, movedElements, rightSide);
    };
    var handleCanReorderColumns = function (targetColumnId, columnIds, dropPosition) {
        return true;
    };
    var handleCanReorderRows = function (targetColumnId, rowIds, dropPosition) {
        var rowIndex = state.rows.findIndex(function (row) { return row.rowId === targetColumnId; });
        if (rowIndex === 0)
            return false;
        return true;
    };
    var handleColumnsReordered = function (targetColumnId, columnIds, dropPosition) {
        var to = state.columns.findIndex(function (column) { return column.columnId === targetColumnId; });
        var columnIdxs = columnIds.map(function (id, idx) { return state.columns.findIndex(function (c) { return c.columnId === id; }); });
        setState({
            columns: reorderArray(state.columns, columnIdxs, to),
            rows: state.rows.map(function (row) { return (__assign(__assign({}, row), { cells: reorderArray(row.cells, columnIdxs, to) })); }),
        });
    };
    var handleRowsReordered = function (targetRowId, rowIds, dropPosition) {
        var newState = __assign({}, state);
        var to = state.rows.findIndex(function (row) { return row.rowId === targetRowId; });
        var ids = rowIds.map(function (id) { return state.rows.findIndex(function (r) { return r.rowId === id; }); });
        setState(__assign(__assign({}, newState), { rows: reorderArray(state.rows, ids, to) }));
    };
    return (React.createElement(ReactGridContainer, { id: "column-reorder-sample" },
        React.createElement(ReactGrid, { rows: state.rows, columns: state.columns, customCellTemplates: {
                'rate': new RateCellTemplate,
                'flag': new FlagCellTemplate
            }, onCellsChanged: handleChanges, canReorderColumns: handleCanReorderColumns, canReorderRows: handleCanReorderRows, onColumnsReordered: handleColumnsReordered, onRowsReordered: handleRowsReordered, enableColumnSelection: true, enableRowSelection: true, enableRangeSelection: true })));
};
var templateObject_1;
