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
import "./styling.scss";
export var ColumnResizingSample = function () {
    var _a = __read(React.useState(function () { return [
        { columnId: "Name", width: 100, resizable: true },
        { columnId: "Surname", width: 100, resizable: true }
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
    ]; }), 1), rows = _b[0];
    var handleColumnResize = function (ci, width) {
        setColumns(function (prevColumns) {
            var columnIndex = prevColumns.findIndex(function (el) { return el.columnId === ci; });
            var resizedColumn = prevColumns[columnIndex];
            var updatedColumn = __assign(__assign({}, resizedColumn), { width: width });
            prevColumns[columnIndex] = updatedColumn;
            return __spread(prevColumns);
        });
    };
    return (React.createElement(ReactGrid, { rows: rows, columns: columns, onColumnResized: handleColumnResize }));
};
