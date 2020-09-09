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
import { getDataFromRows, createIndents, getExpandedRows, getDataFromColumns, fillCellMatrixHorizontally, fillCellMatrixVertically, getChevronCell, getDirectChildrenRows, getParentRow, extendWithColIds, getExpandedCells, getColumnsIdsxToRender, filterCellsOnRows, resetAggregatedMonthFields, } from "./helpersFunctions";
import { dataRows, topHeaderRow, filledYear, emptyYear } from "./rows";
import { dataColumns } from "./columns";
import { HorizontalChevronCellTemplate } from '../../cell-templates/horizontalChevronCellTemplate/HorizontalChevronCellTemplate';
import { reorderArray } from './reorderArray';
import { nonEditableNumberCellTemplate } from './CellTemplates';
export var BPSample = function () {
    var _a = __read(React.useState(function () {
        var rows = __spread(dataRows);
        var columns = __spread(dataColumns);
        columns = getDataFromColumns(columns);
        rows = getDataFromRows(rows);
        rows = fillCellMatrixHorizontally(rows);
        fillCellMatrixVertically(rows);
        rows = createIndents(rows);
        return {
            columns: __spread([dataColumns[0]], columns),
            rows: __spread([topHeaderRow], rows)
        };
    }), 2), state = _a[0], setState = _a[1];
    var _b = __read(React.useState(function () {
        var extendedTopHeaderRow = extendWithColIds(topHeaderRow, __spread(dataColumns));
        var expandedCells = getExpandedCells(extendedTopHeaderRow.cells);
        return state.columns.filter(function (col) { return expandedCells.find(function (expCell) { return expCell.columnId === col.columnId; }); });
    }), 2), columnsToRender = _b[0], setColumnsToRender = _b[1];
    var _c = __read(React.useState(function () {
        var topHeaderRowWithColumnIds = extendWithColIds(topHeaderRow, __spread(dataColumns));
        var expandedRows = getExpandedRows(state.rows);
        var idxs = getColumnsIdsxToRender(topHeaderRowWithColumnIds.cells, columnsToRender);
        return filterCellsOnRows(expandedRows, idxs);
    }), 2), rowsToRender = _c[0], setRowsToRender = _c[1];
    var handleChanges = function (changes) {
        var newState = __assign({}, state);
        changes.forEach(function (change) {
            var _a;
            var changeRowIdx = newState.rows.findIndex(function (el) { return el.rowId === change.rowId; });
            var changeColumnIdx = newState.columns.findIndex(function (el) { return el.columnId === change.columnId; });
            if (changeRowIdx === 0) {
                newState.rows[changeRowIdx].cells[changeColumnIdx] = __assign(__assign({}, change.newCell), { text: change.previousCell.text });
            }
            else {
                if ((change.newCell.type === 'number' || change.newCell.type === 'nonEditableNumber')
                    && ((_a = change.newCell.className) === null || _a === void 0 ? void 0 : _a.includes('quarter'))) {
                    var chevronCell = getChevronCell(newState.rows[changeRowIdx]);
                    if (!chevronCell.hasChildren) {
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
        var expandedCells = getExpandedCells(topHeaderRow.cells);
        var columnsToRender = newState.columns.filter(function (col) { return expandedCells.find(function (expandedCell) { return expandedCell.columnId === col.columnId; }); });
        var idxs = getColumnsIdsxToRender(topHeaderRow.cells, columnsToRender);
        var expandedRows = getExpandedRows(rows);
        setColumnsToRender(__spread(columnsToRender));
        setState(__assign(__assign({}, state), { rows: createIndents(rows) }));
        setRowsToRender(__spread(filterCellsOnRows(expandedRows, idxs)));
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
                var movingRowRoot = getChevronCell(row);
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
            acc.push.apply(acc, __spread(getRowChildren(rows, rowsChildren, childRow)));
        });
        return acc;
    };
    var handleContextMenu = function (selectedRowIds, selectedColIds, selectionMode, menuOptions) {
        if (selectionMode === 'row' && selectedRowIds.length === 1 && selectedRowIds[0] !== 'topHeader') {
            var newState_1 = __assign({}, state);
            menuOptions = __spread(menuOptions, [
                {
                    id: 'addRow', label: 'Add child row',
                    handler: function (selectedRowIds, selectedColIds, selectionMode) {
                        if (selectedRowIds.length === 1) {
                            var selectedRowIdx = newState_1.rows.findIndex(function (row) { return row.rowId === selectedRowIds[0]; });
                            var selectedRow = newState_1.rows[selectedRowIdx];
                            var emptyRow = {
                                rowId: Date.now(),
                                reorderable: true,
                                cells: __spread([
                                    { type: 'chevron', text: "New row", parentId: selectedRowIds[0], isExpanded: false }
                                ], filledYear(0, 0), filledYear(0, 0))
                            };
                            var changedSelectedRow = __assign(__assign({}, selectedRow), { cells: __spread([
                                    selectedRow.cells[0]
                                ], emptyYear(), emptyYear()) });
                            var newRows = __spread(newState_1.rows.slice(0, selectedRowIdx), [
                                changedSelectedRow,
                                emptyRow
                            ], newState_1.rows.slice(selectedRowIdx + 1, newState_1.rows.length));
                            var expandedRows = getExpandedRows(newRows);
                            var idxs = getColumnsIdsxToRender(topHeaderRow.cells, columnsToRender);
                            var rows = fillCellMatrixHorizontally(newRows);
                            fillCellMatrixVertically(rows);
                            setState(__assign(__assign({}, state), { rows: createIndents(rows) }));
                            setRowsToRender(__spread(filterCellsOnRows(expandedRows, idxs)));
                        }
                    }
                },
                {
                    id: 'removeRow', label: 'Remove row',
                    handler: function (selectedRowIds, selectedColIds, selectionMode) {
                        if (selectedRowIds.length === 1) {
                            var selectedRowIdx = newState_1.rows.findIndex(function (row) { return row.rowId === selectedRowIds[0]; });
                            var selectedRow = newState_1.rows[selectedRowIdx];
                            var rowsToRemove_1 = __spread([
                                selectedRow
                            ], new Set(getRowChildren(state.rows, [], selectedRow)));
                            var newRows = newState_1.rows.filter(function (row) { return !rowsToRemove_1.some(function (rowToRemove) { return rowToRemove.rowId === row.rowId; }); });
                            newRows.forEach(function (row) {
                                resetAggregatedMonthFields(row);
                            });
                            var expandedRows = getExpandedRows(newRows);
                            var idxs = getColumnsIdsxToRender(topHeaderRow.cells, columnsToRender);
                            var rows = fillCellMatrixHorizontally(newRows);
                            fillCellMatrixVertically(rows);
                            setState(__assign(__assign({}, state), { rows: createIndents(rows) }));
                            setRowsToRender(__spread(filterCellsOnRows(expandedRows, idxs)));
                        }
                    }
                },
            ]);
        }
        return menuOptions;
    };
    return (React.createElement("div", { className: "bp-sample" },
        React.createElement(ReactGrid, { rows: rowsToRender, columns: columnsToRender, onCellsChanged: handleChanges, stickyTopRows: 1, stickyLeftColumns: 1, customCellTemplates: {
                horizontalChevron: new HorizontalChevronCellTemplate(),
                nonEditableNumber: nonEditableNumberCellTemplate,
            }, onRowsReordered: handleRowsReorder, canReorderRows: handleCanReorderRows, onContextMenu: handleContextMenu, enableRangeSelection: true, enableFillHandle: true, enableRowSelection: true })));
};
