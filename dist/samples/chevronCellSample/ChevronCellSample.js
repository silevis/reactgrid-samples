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
import React, { useState } from 'react';
import styled from 'styled-components';
import { columns as dataColumns } from '../../data/chevron/columns';
import { rows as dataRows, headerRow } from '../../data/chevron/rows';
import { ReactGrid } from '@silevis/reactgrid';
import './styling.scss';
var ReactGridContainer = styled.div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  min-height: 400px;\n"], ["\n  min-height: 400px;\n"])));
var findParentRow = function (rows, row) { return rows.find(function (r) {
    var foundChevronCell = findChevronCell(row);
    return foundChevronCell ? r.rowId === foundChevronCell.parentId : false;
}); };
var findChevronCell = function (row) { return row.cells.find(function (cell) { return cell.type === 'chevron'; }); };
var hasChildren = function (rows, row) { return rows.some(function (r) {
    var foundChevronCell = findChevronCell(r);
    return foundChevronCell ? foundChevronCell.parentId === row.rowId : false;
}); };
var isRowFullyExpanded = function (rows, row) {
    var parentRow = findParentRow(rows, row);
    if (parentRow) {
        var foundChevronCell = findChevronCell(parentRow);
        if (foundChevronCell && !foundChevronCell.isExpanded)
            return false;
        return isRowFullyExpanded(rows, parentRow);
    }
    return true;
};
var getExpandedRows = function (rows) { return rows.filter(function (row) {
    var areAllParentsExpanded = isRowFullyExpanded(rows, row);
    return areAllParentsExpanded !== undefined ? areAllParentsExpanded : true;
}); };
var getDirectChildRows = function (rows, parentRow) { return rows.filter(function (row) { return !!row.cells.find(function (cell) { return cell.type === 'chevron' && cell.parentId === parentRow.rowId; }); }); };
var assignIndentAndHasChildren = function (rows, parentRow, indent) {
    if (indent === void 0) { indent = 0; }
    ++indent;
    getDirectChildRows(rows, parentRow).forEach(function (row) {
        var foundChevronCell = findChevronCell(row);
        var hasRowChildrens = hasChildren(rows, row);
        if (foundChevronCell) {
            foundChevronCell.indent = indent;
            foundChevronCell.hasChildren = hasRowChildrens;
        }
        if (hasRowChildrens)
            assignIndentAndHasChildren(rows, row, indent);
    });
};
var buildTree = function (rows) { return rows.map(function (row) {
    var foundChevronCell = findChevronCell(row);
    if (foundChevronCell && !foundChevronCell.parentId) {
        var hasRowChildrens = hasChildren(rows, row);
        foundChevronCell.hasChildren = hasRowChildrens;
        if (hasRowChildrens)
            assignIndentAndHasChildren(rows, row);
    }
    return row;
}); };
export var ChevronCellSample = function () {
    var _a = __read(useState(function () {
        var columns = __spread(dataColumns(true, false));
        return { columns: columns, rows: buildTree(__spread(dataRows(true))) };
    }), 2), state = _a[0], setState = _a[1];
    var _b = __read(useState(__spread([headerRow], getExpandedRows(state.rows))), 2), rowsToRender = _b[0], setRowsToRender = _b[1];
    var handleChanges = function (changes) {
        var newState = __assign({}, state);
        changes.forEach(function (change) {
            var changeRowIdx = newState.rows.findIndex(function (el) { return el.rowId === change.rowId; });
            var changeColumnIdx = newState.columns.findIndex(function (el) { return el.columnId === change.columnId; });
            newState.rows[changeRowIdx].cells[changeColumnIdx] = change.newCell;
        });
        setState(__assign(__assign({}, state), { rows: buildTree(newState.rows) }));
        setRowsToRender(__spread([headerRow], getExpandedRows(newState.rows)));
    };
    var reorderArray = function (arr, idxs, to) {
        var movedElements = arr.filter(function (_, idx) { return idxs.includes(idx); });
        to = Math.min.apply(Math, __spread(idxs)) < to ? to += 1 : to -= idxs.filter(function (idx) { return idx < to; }).length;
        var leftSide = arr.filter(function (_, idx) { return idx < to && !idxs.includes(idx); });
        var rightSide = arr.filter(function (_, idx) { return idx >= to && !idxs.includes(idx); });
        return __spread(leftSide, movedElements, rightSide);
    };
    var handleRowsReorder = function (targetRowId, rowIds, dropPosition) {
        var newState = __assign({}, state);
        var to = newState.rows.findIndex(function (row) { return row.rowId === targetRowId; });
        var rowIdxs = rowIds.map(function (id) { return state.rows.findIndex(function (r) { return r.rowId === id; }); });
        if (rowIdxs.length === 1) {
            var row = newState.rows[rowIdxs[0]];
            rowIdxs = __spread([row], new Set(getRowChildren(newState.rows, [], row))).map(function (item) { return newState.rows.findIndex(function (r) { return r.rowId === item.rowId; }); });
            var onRow = newState.rows.find(function (row) { return row.rowId === targetRowId; });
            if (onRow) {
                var movingRowRoot = findChevronCell(row);
                if (movingRowRoot) {
                    if (dropPosition === 'on') {
                        movingRowRoot.parentId = onRow.rowId;
                        var onRowIndex = newState.rows.indexOf(onRow);
                        var rowIndex = newState.rows.indexOf(row);
                        if (rowIndex >= onRowIndex) {
                            to += 1;
                        }
                    }
                    else {
                        var parentRow = findParentRow(newState.rows, onRow);
                        if (dropPosition === 'after') {
                            movingRowRoot.parentId = onRow.rowId;
                            console.log('after');
                        }
                        if (parentRow) {
                            movingRowRoot.parentId = parentRow.rowId;
                            console.log('parentRow');
                            if (dropPosition === 'after') {
                                movingRowRoot.parentId = onRow.rowId;
                            }
                        }
                        else {
                            if (dropPosition === 'before') {
                                console.log('before');
                                movingRowRoot.parentId = undefined;
                                movingRowRoot.indent = undefined;
                            }
                        }
                    }
                }
            }
        }
        var reorderedRows = reorderArray(newState.rows, rowIdxs, to);
        setState(__assign(__assign({}, newState), { rows: buildTree(reorderedRows) }));
        setRowsToRender(__spread([headerRow], getExpandedRows(reorderedRows)));
    };
    var getRowChildren = function (rows, acc, row) {
        var rowsChildren = getDirectChildRows(rows, row);
        if (!rowsChildren)
            return [];
        rowsChildren.forEach(function (childRow) {
            acc = __spread(acc, getRowChildren(rows, rowsChildren, childRow));
        });
        return acc;
    };
    var handleCanReorderRows = function (targetRowId, rowIds, dropPosition) {
        var newState = __assign({}, state);
        var rowIdxs = rowIds.map(function (id) { return newState.rows.findIndex(function (row) { return row.rowId === id; }); });
        if (rowIdxs.length === 1 && targetRowId !== headerRow.rowId) {
            var row = newState.rows[rowIdxs[0]];
            var rowChildren = __spread(new Set(getRowChildren(newState.rows, [], row)));
            if (rowChildren.some(function (item) { return item.rowId === targetRowId; })) {
                return false;
            }
        }
        else {
            return false;
        }
        return true;
    };
    return (React.createElement(ReactGridContainer, { id: "chevron-cell-sample" },
        React.createElement(ReactGrid, { rows: rowsToRender, columns: state.columns, onCellsChanged: handleChanges, onRowsReordered: handleRowsReorder, canReorderRows: handleCanReorderRows, stickyLeftColumns: 1, stickyTopRows: 1, enableRowSelection: true, enableColumnSelection: true, enableFillHandle: true, enableRangeSelection: true })));
};
var templateObject_1;
