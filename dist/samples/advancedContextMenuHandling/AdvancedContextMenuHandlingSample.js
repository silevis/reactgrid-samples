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
import * as React from "react";
import { ReactGrid, } from "@silevis/reactgrid";
import "./styling.scss";
export var AdvancedContextMenuHandlingSample = function () {
    var _a = React.useState(function () { return ({
        columns: [
            { columnId: "Name", width: 100 },
            { columnId: "Surname", width: 100 }
        ],
        rows: [
            {
                rowId: 0,
                cells: [
                    { type: "header", text: "Name" },
                    { type: "header", text: "Surname" }
                ]
            },
            {
                rowId: 1,
                cells: [
                    { type: "text", text: "Thomas" },
                    { type: "text", text: "Goldman" }
                ]
            },
            {
                rowId: 2,
                cells: [
                    { type: "text", text: "Susie" },
                    { type: "text", text: "Spencer" }
                ]
            },
            {
                rowId: 3,
                cells: [{ type: "text", text: "" }, { type: "text", text: "" }]
            }
        ]
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
    var handleContextMenu = function (selectedRowIds, selectedColIds, selectionMode, menuOptions) {
        if (selectionMode === "row") {
            menuOptions = __spreadArrays(menuOptions, [
                {
                    id: "removeRow",
                    label: "Remove row",
                    handler: function () {
                        setState(__assign(__assign({}, state), { rows: state.rows.filter(function (row) { return !selectedRowIds.includes(row.rowId); }) }));
                    }
                }
            ]);
        }
        if (selectionMode === "column") {
            menuOptions = __spreadArrays(menuOptions, [
                {
                    id: "removeColumn",
                    label: "Remove column",
                    handler: function () {
                        var columns = state.columns.filter(function (column) { return !selectedColIds.includes(column.columnId); });
                        var columnsIdxs = state.columns
                            .map(function (column, idx) {
                            if (!columns.includes(column))
                                return idx;
                            return undefined;
                        })
                            .filter(function (idx) { return idx !== undefined; });
                        var rows = state.rows.map(function (row) { return (__assign(__assign({}, row), { cells: row.cells.filter(function (_, idx) { return !columnsIdxs.includes(idx); }) })); });
                        setState(__assign(__assign(__assign({}, state), columns), rows));
                    }
                }
            ]);
        }
        return menuOptions;
    };
    return (React.createElement(ReactGrid, { rows: state.rows, columns: state.columns, onCellsChanged: handleChanges, onContextMenu: handleContextMenu, enableFillHandle: true, enableRangeSelection: true, enableColumnSelection: true, enableRowSelection: true }));
};
