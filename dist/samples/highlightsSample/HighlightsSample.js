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
import '@silevis/reactgrid/styles.css';
export var HighlightsSample = function () {
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
    ]; }), 1), rows = _b[0];
    var highlights = [
        { columnId: "Name", rowId: 1, borderColor: "#00ff00" },
        { columnId: "Surname", rowId: 2, borderColor: "#0000ff" },
        { columnId: "Name", rowId: 3, borderColor: "#ff0000" }
    ];
    return (React.createElement(ReactGrid, { rows: rows, columns: columns, highlights: highlights }));
};
