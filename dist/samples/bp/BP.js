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
import * as React from "react";
import { ReactGrid } from "@silevis/reactgrid";
import "@silevis/reactgrid/styles.css";
import "./styling.scss";
import { getDataFromRows, createIndents, getExpandedRows, getDataFromColumns, fillCellMatrixHorizontally, fillCellMatrixVertically, getGroupCell, getDirectChildrenRows, getParentRow, } from "./helpersFunctions";
import { dataRows, topHeaderRow } from "./rows";
import { dataColumns } from "./columns";
import { HorizontalGroupCellTemplate } from '../../cell-templates/horizontalGroupCellTemplate/HorizontalGroupCellTemplate';
import { reorderArray } from './reorderArray';
import { nonEditableNumberCellTemplate } from './CellTemplates';
export var BPSample = function () {
    var _a = __read(React.useState(function () {
        var rows = __spread(dataRows);
        var columns = __spread(dataColumns);
        columns = getDataFromColumns(columns);
        rows = getDataFromRows(rows);
        rows = fillCellMatrixHorizontally(rows);
        console.log(topHeaderRow);
        fillCellMatrixVertically(rows);
        rows = createIndents(rows);
        return {
            columns: __spread([dataColumns[0]], columns),
            rows: __spread([topHeaderRow], rows)
        };
    }), 2), state = _a[0], setState = _a[1];
    var _b = __read(React.useState(function () {
        return getExpandedRows(state.rows).map(function (row, idx) {
            return row;
        });
    }), 2), rowsToRender = _b[0], setRowsToRender = _b[1];
    var _c = __read(React.useState(function () {
        return state.columns.filter(function (col, idx) {
            return col;
        });
    }), 2), colsToRender = _c[0], setColsToRender = _c[1];
    var handleChanges = function (changes) {
        var newState = __assign({}, state);
        changes.forEach(function (change) {
            var _a, _b;
            var changeRowIdx = newState.rows.findIndex(function (el) { return el.rowId === change.rowId; });
            var changeColumnIdx = newState.columns.findIndex(function (el) { return el.columnId === change.columnId; });
            if (changeRowIdx === 0 && changeColumnIdx === 0) {
                newState.rows[changeRowIdx].cells[changeColumnIdx] = __assign(__assign({}, change.newCell), { text: change.initialCell.text });
            }
            else {
                if ((change.newCell.type === 'number' || change.newCell.type === 'nonEditableNumber')
                    && (((_a = change.newCell.className) === null || _a === void 0 ? void 0 : _a.includes('quarter')) || ((_b = change.newCell.className) === null || _b === void 0 ? void 0 : _b.includes('year')))) {
                    var groupCell = getGroupCell(newState.rows[changeRowIdx]);
                    if (!groupCell.hasChildren) {
                        updateNodeQuarter(newState, change.newCell.value, changeRowIdx, changeColumnIdx);
                    }
                }
                else {
                    newState.rows[changeRowIdx].cells[changeColumnIdx] = change.newCell;
                }
            }
        });
        var rows = fillCellMatrixHorizontally(newState.rows);
        fillCellMatrixVertically(rows);
        setState(__assign(__assign({}, state), { rows: createIndents(rows) }));
        setRowsToRender(__spread(getExpandedRows(rows)));
    };
    var updateNodeQuarter = function (state, valueToDivide, changeRowIdx, changeColumnIdx) {
        var partialValue = valueToDivide / 3;
        for (var i = 1; i < 4; i++) {
            state.rows[changeRowIdx].cells[changeColumnIdx + i].value = partialValue;
        }
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
                var movingRowRoot = getGroupCell(row);
                if (dropPosition === 'on') {
                    movingRowRoot.parentId = onRow.rowId;
                    var onRowIndex = newState.rows.indexOf(onRow);
                    var rowIndex = newState.rows.indexOf(row);
                    if (rowIndex >= onRowIndex) {
                        to += 1;
                    }
                }
                else {
                    var parentRow = getParentRow(newState.rows, onRow);
                    if (dropPosition === 'after') {
                        movingRowRoot.parentId = onRow.rowId;
                    }
                    if (parentRow) {
                        movingRowRoot.parentId = parentRow.rowId;
                        if (dropPosition === 'after') {
                            movingRowRoot.parentId = onRow.rowId;
                        }
                    }
                    else {
                        if (dropPosition === 'before') {
                            movingRowRoot.parentId = undefined;
                            movingRowRoot.indent = undefined;
                        }
                    }
                }
            }
        }
        var reorderedRows = reorderArray(newState.rows, rowIdxs, to);
        setState(__assign(__assign({}, newState), { rows: createIndents(reorderedRows) }));
        setRowsToRender(__spread(getExpandedRows(reorderedRows)));
    };
    var handleCanReorderRows = function (targetRowId, rowIds, dropPosition) {
        var newState = __assign({}, state);
        var rowIdxs = rowIds.map(function (id) { return newState.rows.findIndex(function (row) { return row.rowId === id; }); });
        if (rowIdxs.length === 1 && targetRowId !== topHeaderRow.rowId) {
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
    var getRowChildren = function (rows, acc, row) {
        var rowsChildren = getDirectChildrenRows(rows, row);
        if (!rowsChildren)
            return [];
        rowsChildren.forEach(function (childRow) {
            acc = __spread(acc, getRowChildren(rows, rowsChildren, childRow));
        });
        return acc;
    };
    return (React.createElement(ReactGrid, { rows: rowsToRender, columns: colsToRender, onCellsChanged: handleChanges, stickyTopRows: 1, stickyLeftColumns: 1, customCellTemplates: {
            horizontalGroup: new HorizontalGroupCellTemplate(),
            nonEditableNumber: nonEditableNumberCellTemplate,
        }, onRowsReordered: handleRowsReorder, canReorderRows: handleCanReorderRows, enableRangeSelection: true, enableFillHandle: true, enableRowSelection: true }));
};