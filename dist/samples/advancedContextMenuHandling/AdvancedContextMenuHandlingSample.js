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
import { ReactGrid, } from "@silevis/reactgrid";
import "./styling.scss";
export var AdvancedContextMenuHandlingSample = function () {
    var _a = __read(React.useState(function () { return [
        { columnId: "Name", width: 100 },
        { columnId: "Surname", width: 100 }
    ]; }), 2), columns = _a[0], setColumns = _a[1];
    var _b = __read(React.useState(function () { return [
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
            cells: [
                { type: "text", text: "" },
                { type: "text", text: "" }
            ]
        }
    ]; }), 2), rows = _b[0], setRows = _b[1];
    var handleChanges = function (changes) {
        setRows(function (prevRows) {
            changes.forEach(function (change) {
                var changeRowIdx = prevRows.findIndex(function (el) { return el.rowId === change.rowId; });
                var changeColumnIdx = columns.findIndex(function (el) { return el.columnId === change.columnId; });
                prevRows[changeRowIdx].cells[changeColumnIdx] = change.newCell;
            });
            return __spread(prevRows);
        });
    };
    var handleContextMenu = function (selectedRowIds, selectedColIds, selectionMode, menuOptions) {
        if (selectionMode === "row") {
            menuOptions = __spread(menuOptions, [
                {
                    id: "removeRow",
                    label: "Remove row",
                    handler: function () { return setRows(rows.filter(function (row) { return !selectedRowIds.includes(row.rowId); })); }
                }
            ]);
        }
        if (selectionMode === "column") {
            menuOptions = __spread(menuOptions, [
                {
                    id: "removeColumn",
                    label: "Remove column",
                    handler: function () {
                        var cols = columns.filter(function (column) { return !selectedColIds.includes(column.columnId); });
                        var columnsIdxs = columns
                            .map(function (column, idx) {
                            if (!cols.includes(column))
                                return idx;
                            return undefined;
                        })
                            .filter(function (idx) { return idx !== undefined; });
                        setRows(rows.map(function (row) { return (__assign(__assign({}, row), { cells: row.cells.filter(function (_, idx) { return !columnsIdxs.includes(idx); }) })); }));
                        setColumns(cols);
                    }
                }
            ]);
        }
        return menuOptions;
    };
    return (React.createElement(ReactGrid, { rows: rows, columns: columns, onCellsChanged: handleChanges, onContextMenu: handleContextMenu, enableFillHandle: true, enableRangeSelection: true, enableColumnSelection: true, enableRowSelection: true }));
};
