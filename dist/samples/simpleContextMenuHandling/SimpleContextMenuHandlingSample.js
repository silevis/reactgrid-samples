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
import "./styling.scss";
import "@silevis/reactgrid/styles.css";
export var SimpleContextMenuHandlingSample = function () {
    var _a = __read(React.useState(function () { return [
        { columnId: "Name", width: 100 },
        { columnId: "Surname", width: 100 }
    ]; }), 1), columns = _a[0];
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
    var simpleHandleContextMenu = function (selectedRowIds, selectedColIds, selectionMode, menuOptions) {
        return menuOptions;
    };
    return (React.createElement(ReactGrid, { rows: rows, columns: columns, onCellsChanged: handleChanges, onContextMenu: simpleHandleContextMenu }));
};
