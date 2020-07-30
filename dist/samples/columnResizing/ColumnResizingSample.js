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
import * as React from "react";
import { ReactGrid } from "@silevis/reactgrid";
import "./styling.scss";
export var ColumnResizingSample = function () {
    var _a = __read(React.useState(function () { return ({
        columns: [
            { columnId: "Name", resizable: true, width: 100 },
            { columnId: "Surname", resizable: true, width: 100 }
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
    }); }), 2), state = _a[0], setState = _a[1];
    var handleColumnResize = function (ci, width) {
        var newState = __assign({}, state);
        var columnIndex = newState.columns.findIndex(function (el) { return el.columnId === ci; });
        var resizedColumn = newState.columns[columnIndex];
        var updatedColumn = __assign(__assign({}, resizedColumn), { width: width });
        newState.columns[columnIndex] = updatedColumn;
        setState(newState);
    };
    return (React.createElement(ReactGrid, { rows: state.rows, columns: state.columns, onColumnResized: handleColumnResize, enableFillHandle: true }));
};
