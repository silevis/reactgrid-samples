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
import { DropdownNumberCellTemplate } from '../../cell-templates/dropdownNumberCell/DropdownNumberCellTemplate';
import { FlagCellTemplate } from '../../cell-templates/flagCell/FlagCellTemplate';
import { RateCellTemplate } from '../../cell-templates/rateCell/RateCellTemplate';
import { columns as crmColumns } from '../../data/crm/columns';
import { rows as crmRows } from '../../data/crm/rows';
import './styling.scss';
var ReactGridContainer = styled.div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  height: 300px;\n  width: 450px;\n  overflow: scroll;\n"], ["\n  height: 300px;\n  width: 450px;\n  overflow: scroll;\n"])));
export var StickySample = function () {
    var _a = React.useState(function () { return ({
        columns: __spreadArrays(crmColumns(true, false)),
        rows: __spreadArrays(crmRows(true)),
        stickyTopRows: 1,
        stickyLeftColumns: 1,
        stickyRightColumns: 1,
        stickyBottomRows: undefined
    }); }), state = _a[0], setState = _a[1];
    var handleChanges = function (changes) {
        var newState = __assign({}, state);
        changes.forEach(function (change) {
            var changeRowIdx = newState.rows.findIndex(function (el) { return el.rowId === change.rowId; });
            var changeColumnIdx = newState.columns.findIndex(function (el) { return el.columnId === change.columnId; });
            newState.rows[changeRowIdx].cells[changeColumnIdx] = change.newCell;
        });
        setState(newState);
    };
    var reorderArray = function (arr, idxs, to) {
        var movedElements = arr.filter(function (_, idx) { return idxs.includes(idx); });
        to = Math.min.apply(Math, idxs) < to ? to += 1 : to -= idxs.filter(function (idx) { return idx < to; }).length;
        var leftSide = arr.filter(function (_, idx) { return idx < to && !idxs.includes(idx); });
        var rightSide = arr.filter(function (_, idx) { return idx >= to && !idxs.includes(idx); });
        return __spreadArrays(leftSide, movedElements, rightSide);
    };
    var handleColumnsReordered = function (targetColumnId, columnIds, dropPosition) {
        var to = state.columns.findIndex(function (column) { return column.columnId === targetColumnId; });
        var columnIdxs = columnIds.map(function (id, idx) { return state.columns.findIndex(function (c) { return c.columnId === id; }); });
        setState(__assign(__assign({}, state), { columns: reorderArray(state.columns, columnIdxs, to), rows: state.rows.map(function (row) { return (__assign(__assign({}, row), { cells: reorderArray(row.cells, columnIdxs, to) })); }) }));
    };
    var handleCanReorderColumns = function (targetColumnId, columnIds, dropPosition) {
        return true;
    };
    return (React.createElement(ReactGridContainer, { id: "sticky-sample" },
        React.createElement(ReactGrid, { rows: state.rows, columns: state.columns, customCellTemplates: {
                'rate': new RateCellTemplate,
                'flag': new FlagCellTemplate,
                'dropdownNumber': new DropdownNumberCellTemplate,
            }, stickyTopRows: state.stickyTopRows, stickyBottomRows: state.stickyBottomRows, stickyLeftColumns: state.stickyLeftColumns, stickyRightColumns: state.stickyRightColumns, onCellsChanged: handleChanges, canReorderColumns: handleCanReorderColumns, onColumnsReordered: handleColumnsReordered, enableColumnSelection: true, enableRowSelection: true, enableFillHandle: true, enableRangeSelection: true })));
};
var templateObject_1;
