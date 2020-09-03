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
export var ColumnsAndRowsReorderSample = function () {
    var _a = __read(React.useState(function () { return [
        { columnId: "Name", width: 100, reorderable: true },
        { columnId: "Surname", width: 100, reorderable: true }
    ]; }), 2), columns = _a[0], setColumns = _a[1];
    var _b = __read(React.useState(function () { return [
        {
            rowId: 0,
            reorderable: true,
            cells: [
                { type: "header", text: "Name" },
                { type: "header", text: "Surname" }
            ]
        },
        {
            rowId: 1,
            reorderable: true,
            cells: [
                { type: "text", text: "Thomas" },
                { type: "text", text: "Goldman" }
            ]
        },
        {
            rowId: 2,
            reorderable: true,
            cells: [
                { type: "text", text: "Susie" },
                { type: "text", text: "Spencer" }
            ]
        },
        {
            rowId: 3,
            reorderable: true,
            cells: [
                { type: "text", text: "" },
                { type: "text", text: "" }
            ]
        }
    ]; }), 2), rows = _b[0], setRows = _b[1];
    var reorderArray = function (arr, idxs, to) {
        var movedElements = arr.filter(function (_, idx) { return idxs.includes(idx); });
        to = Math.min.apply(Math, __spread(idxs)) < to ? to += 1 : to -= idxs.filter(function (idx) { return idx < to; }).length;
        var leftSide = arr.filter(function (_, idx) { return idx < to && !idxs.includes(idx); });
        var rightSide = arr.filter(function (_, idx) { return idx >= to && !idxs.includes(idx); });
        return __spread(leftSide, movedElements, rightSide);
    };
    var handleColumnsReorder = function (targetColumnId, columnIds, dropPosition) {
        var to = columns.findIndex(function (column) { return column.columnId === targetColumnId; });
        var columnIdxs = columnIds.map(function (id, idx) { return columns.findIndex(function (c) { return c.columnId === id; }); });
        setRows(rows.map(function (row) { return (__assign(__assign({}, row), { cells: reorderArray(row.cells, columnIdxs, to) })); }));
        setColumns(reorderArray(columns, columnIdxs, to));
    };
    var handleRowsReorder = function (targetRowId, rowIds, dropPosition) {
        setRows(function (prevRows) {
            var to = rows.findIndex(function (row) { return row.rowId === targetRowId; });
            var columnIdxs = rowIds.map(function (id) { return rows.findIndex(function (r) { return r.rowId === id; }); });
            return reorderArray(prevRows, columnIdxs, to);
        });
    };
    return (React.createElement(ReactGrid, { rows: rows, columns: columns, onColumnsReordered: handleColumnsReorder, onRowsReordered: handleRowsReorder, enableRowSelection: true, enableColumnSelection: true }));
};
