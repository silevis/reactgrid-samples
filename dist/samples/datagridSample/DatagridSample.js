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
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { ReactGrid } from '@silevis/reactgrid';
import { DropdownNumberCellTemplate } from '../../cell-templates/dropdownNumberCell/DropdownNumberCellTemplate';
import { FlagCellTemplate } from '../../cell-templates/flagCell/FlagCellTemplate';
import { columns as crmColumns } from '../../data/crm/columns';
import { rows as crmRows } from '../../data/crm/rows';
import './styling.scss';
import { VirtualEnv } from './VirtualEnv';
import { VirtualUser } from './VirtualUser';
import useInterval from '@use-it/interval';
var ReactGridContainer = styled.div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  overflow: scroll;\n"], ["\n  overflow: scroll;\n"])));
export var DatagridSample = function () {
    var _a = __read(useState(function () { return ({
        columns: __spread(crmColumns(true, false)),
        rows: __spread(crmRows(true)),
        stickyTopRows: 1,
        stickyLeftColumns: 2,
        highlights: []
    }); }), 2), state = _a[0], setState = _a[1];
    var handleChanges = function (changes) {
        var newState = __assign({}, state);
        changes.forEach(function (change) {
            var changeRowIdx = newState.rows.findIndex(function (el) { return el.rowId === change.rowId; });
            var changeColumnIdx = newState.columns.findIndex(function (el) { return el.columnId === change.columnId; });
            newState.rows[changeRowIdx].cells[changeColumnIdx] = change.newCell;
        });
        setState(newState);
    };
    var _b = __read(useState(function () { return new VirtualEnv(); }), 1), virtualEnv = _b[0];
    useEffect(function () {
        virtualEnv
            .addUser(new VirtualUser('darkolivegreen', 12, 3))
            .addUser(new VirtualUser('mediumpurple', 0, 0))
            .addUser(new VirtualUser('red', 10, 12))
            .addUser(new VirtualUser('orange', 0, 18));
        setState(virtualEnv.updateView(state));
    }, [virtualEnv]);
    var handleCanReorderColumns = function (targetColumnId, columnIds, dropPosition) {
        var columnInside = columnIds.includes(targetColumnId);
        if (columnInside)
            return false;
        return true;
    };
    var handleColumnsReorder = function (targetColumnId, columnIds, dropPosition) {
        var to = state.columns.findIndex(function (column) { return column.columnId === targetColumnId; });
        var columnIdxs = columnIds.map(function (id, idx) { return state.columns.findIndex(function (c) { return c.columnId === id; }); });
        setState(__assign(__assign({}, state), { columns: reorderArray(state.columns, columnIdxs, to), rows: state.rows.map(function (row) { return (__assign(__assign({}, row), { cells: reorderArray(row.cells, columnIdxs, to) })); }) }));
    };
    useInterval(function () {
        setState(virtualEnv.updateView(state));
    }, 250);
    var reorderArray = function (arr, idxs, to) {
        var movedElements = arr.filter(function (_, idx) { return idxs.includes(idx); });
        to = Math.min.apply(Math, __spread(idxs)) < to ? to += 1 : to -= idxs.filter(function (idx) { return idx < to; }).length;
        var leftSide = arr.filter(function (_, idx) { return idx < to && !idxs.includes(idx); });
        var rightSide = arr.filter(function (_, idx) { return idx >= to && !idxs.includes(idx); });
        return __spread(leftSide, movedElements, rightSide);
    };
    var handleRowsReorder = function (targetRowId, rowIds, dropPosition) {
        var newState = __assign({}, state);
        var to = state.rows.findIndex(function (row) { return row.rowId === targetRowId; });
        var ids = rowIds.map(function (id) { return state.rows.findIndex(function (r) { return r.rowId === id; }); });
        setState(__assign(__assign({}, newState), { rows: reorderArray(state.rows, ids, to) }));
    };
    var handleCanReorderRows = function (targetRowId, rowIds, dropPosition) {
        var rowIndex = state.rows.findIndex(function (row) { return row.rowId === targetRowId; });
        var rowInside = rowIds.includes(targetRowId);
        if (rowIndex === 0 || rowInside)
            return false;
        return true;
    };
    var handleColumnResize = function (columnId, width, selectedColIds) {
        var newState = __assign({}, state);
        var setColumnWidth = function (columnIndex) {
            var resizedColumn = newState.columns[columnIndex];
            newState.columns[columnIndex] = __assign(__assign({}, resizedColumn), { width: width });
        };
        if (selectedColIds.includes(columnId)) {
            var stateColumnIndexes = newState.columns
                .filter(function (col) { return selectedColIds.includes(col.columnId); })
                .map(function (col) { return newState.columns.findIndex(function (el) { return el.columnId === col.columnId; }); });
            stateColumnIndexes.forEach(setColumnWidth);
        }
        else {
            var columnIndex = newState.columns.findIndex(function (col) { return col.columnId === columnId; });
            setColumnWidth(columnIndex);
        }
        setState(newState);
    };
    var handleContextMenu = function (selectedRowIds, selectedColIds, selectionMode, menuOptions) {
        if (selectionMode === 'row') {
            menuOptions = __spread(menuOptions, [
                {
                    id: 'removeRow', label: 'Remove row',
                    handler: function () {
                        var highlights = state.highlights.filter(function (h) { return !selectedRowIds.includes(h.rowId); });
                        setState(__assign(__assign({}, state), { rows: state.rows.filter(function (row) { return !selectedRowIds.includes(row.rowId); }), highlights: highlights }));
                    }
                },
            ]);
        }
        if (selectionMode === 'column') {
            menuOptions = __spread(menuOptions, [
                {
                    id: 'removeColumn', label: 'Remove column',
                    handler: function () {
                        var columns = state.columns.filter(function (column) { return !selectedColIds.includes(column.columnId); });
                        var columnsIdxs = state.columns.map(function (column, idx) {
                            if (!columns.includes(column))
                                return idx;
                            return undefined;
                        }).filter(function (idx) { return idx !== undefined; });
                        var rows = state.rows.map(function (row) { return (__assign(__assign({}, row), { cells: row.cells.filter(function (_, idx) { return !columnsIdxs.includes(idx); }) })); });
                        var highlights = state.highlights.filter(function (h) { return !selectedColIds.includes(h.columnId); });
                        setState(__assign(__assign({}, state), { columns: columns, rows: rows, highlights: highlights }));
                    }
                },
            ]);
        }
        return menuOptions;
    };
    return (React.createElement(ReactGridContainer, { id: "multiuser-sample" },
        React.createElement(ReactGrid, { rows: state.rows, columns: state.columns, customCellTemplates: {
                'flag': new FlagCellTemplate(),
                'dropdownNumber': new DropdownNumberCellTemplate(),
            }, highlights: state.highlights, stickyTopRows: state.stickyTopRows, stickyLeftColumns: state.stickyLeftColumns, onCellsChanged: handleChanges, canReorderRows: handleCanReorderRows, onRowsReordered: handleRowsReorder, canReorderColumns: handleCanReorderColumns, onColumnsReordered: handleColumnsReorder, onContextMenu: handleContextMenu, onColumnResized: handleColumnResize, enableColumnSelection: true, enableRowSelection: true, enableFillHandle: true, enableRangeSelection: true })));
};
var templateObject_1;
