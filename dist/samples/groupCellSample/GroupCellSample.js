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
import React, { useState } from 'react';
import styled from 'styled-components';
import { columns as dataColumns } from '../../data/group/columns';
import { rows as dataRows, headerRow } from '../../data/group/rows';
import { ReactGrid } from '@silevis/reactgrid';
import './styling.scss';
var ReactGridContainer = styled.div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  position: relative;\n  min-height: 400px;\n"], ["\n  position: relative;\n  min-height: 400px;\n"])));
export var GroupCellSample = function () {
    var getGroupCell = function (row) { return row.cells.find(function (cell) { return cell.type === 'group'; }); };
    var hasChildren = function (rows, row) { return rows.some(function (r) { return getGroupCell(r).parentId === row.rowId; }); };
    var isRowFullyExpanded = function (rows, row) {
        var parentRow = getParentRow(rows, row);
        if (parentRow) {
            if (!getGroupCell(parentRow).isExpanded)
                return false;
            return isRowFullyExpanded(rows, parentRow);
        }
        return true;
    };
    var getExpandedRows = function (rows) {
        return rows.filter(function (row) {
            var areAllParentsExpanded = isRowFullyExpanded(rows, row);
            return areAllParentsExpanded !== undefined ? areAllParentsExpanded : true;
        });
    };
    var getDirectChildrenRows = function (rows, parentRow) { return rows.filter(function (row) { return !!row.cells.find(function (cell) { return cell.type === 'group' && cell.parentId === parentRow.rowId; }); }); };
    var getParentRow = function (rows, row) { return rows.find(function (r) { return r.rowId === getGroupCell(row).parentId; }); };
    var assignIndentAndHasChildrens = function (allRows, parentRow, indent) {
        ++indent;
        getDirectChildrenRows(allRows, parentRow).forEach(function (row) {
            var groupCell = getGroupCell(row);
            groupCell.indent = indent;
            var hasRowChildrens = hasChildren(allRows, row);
            groupCell.hasChildrens = hasRowChildrens;
            if (hasRowChildrens)
                assignIndentAndHasChildrens(allRows, row, indent);
        });
    };
    var getDataFromRows = function (rows) { return rows.filter(function (row) { return row.cells.find(function (cell) { return cell.type === 'group'; }) !== undefined; }); };
    var createIndents = function (rows) {
        return rows.map(function (row) {
            var groupCell = getGroupCell(row);
            if (groupCell.parentId === undefined) {
                var hasRowChildrens = hasChildren(rows, row);
                groupCell.hasChildrens = hasRowChildrens;
                if (hasRowChildrens)
                    assignIndentAndHasChildrens(rows, row, 0);
            }
            return row;
        });
    };
    var _a = useState(function () {
        var columns = dataColumns(true, false);
        var rows = __spreadArrays(dataRows(true));
        rows = getDataFromRows(rows);
        rows = createIndents(rows);
        return { columns: columns, rows: rows };
    }), state = _a[0], setState = _a[1];
    var _b = useState(__spreadArrays([headerRow], state.rows)), rowsToRender = _b[0], setRowsToRender = _b[1];
    var handleChanges = function (changes) {
        var newState = __assign({}, state);
        changes.forEach(function (change) {
            var changeRowIdx = newState.rows.findIndex(function (el) { return el.rowId === change.rowId; });
            var changeColumnIdx = newState.columns.findIndex(function (el) { return el.columnId === change.columnId; });
            newState.rows[changeRowIdx].cells[changeColumnIdx] = change.newCell;
        });
        setState(__assign(__assign({}, state), { rows: createIndents(newState.rows) }));
        setRowsToRender(__spreadArrays([headerRow], getExpandedRows(newState.rows)));
    };
    return (React.createElement(ReactGridContainer, { id: "group-cell-sample" },
        React.createElement(ReactGrid, { rows: rowsToRender, columns: state.columns, onCellsChanged: handleChanges, stickyLeftColumns: 1, stickyTopRows: 1, enableRowSelection: true, enableColumnSelection: true, enableFillHandle: true, enableRangeSelection: true })));
};
var templateObject_1;
