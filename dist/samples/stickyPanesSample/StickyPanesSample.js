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
import "@silevis/reactgrid/styles.css";
export var StickyPanesSample = function () {
    var _a = __read(React.useState(function () { return [
        { columnId: "Name", width: 150 },
        { columnId: "Surname", width: 100 },
        { columnId: "Birth Data", width: 100 },
        { columnId: "Phone", width: 100 },
        { columnId: "Company", width: 150 },
        { columnId: "Occupation", width: 250 }
    ]; }), 1), columns = _a[0];
    var _b = __read(React.useState(function () { return [
        {
            rowId: 0,
            cells: [
                { type: "header", text: "Name" },
                { type: "header", text: "Surname" },
                { type: "header", text: "Birth Data" },
                { type: "header", text: "Phone" },
                { type: "header", text: "Company" },
                { type: "header", text: "Occupation" }
            ]
        },
        {
            rowId: 1,
            cells: [
                { type: "text", text: "Thomas Anthony" },
                { type: "text", text: "Goldman" },
                { type: "date", date: new Date("1989-04-01") },
                { type: "number", value: 293827394 },
                { type: "text", text: "Electronic Geek" },
                { type: "text", text: "Textile and furnishings occupation" }
            ]
        },
        {
            rowId: 2,
            cells: [
                { type: "text", text: "Susie Evelyn" },
                { type: "text", text: "Spencer" },
                { type: "date", date: new Date("1970-12-02") },
                { type: "number", value: 684739283 },
                { type: "text", text: "Harold Powell" },
                { type: "text", text: "Concrete paving machine operator" }
            ]
        },
        {
            rowId: 3,
            cells: [
                { type: "text", text: "Mathew Lawrence" },
                { type: "text", text: "Joshua" },
                { type: "date", date: new Date("1970-12-02") },
                { type: "number", value: 684739283 },
                { type: "text", text: "De-Jaiz Mens Clothing" },
                { type: "text", text: "Technical recruiter" }
            ]
        },
        {
            rowId: 4,
            cells: [
                { type: "text", text: "" },
                { type: "text", text: "" },
                { type: "date", date: undefined },
                { type: "number", value: NaN },
                { type: "text", text: "" },
                { type: "text", text: "" }
            ]
        }
    ]; }), 1), rows = _b[0];
    return (React.createElement(ReactGrid, { rows: rows, columns: columns, stickyLeftColumns: 1, stickyRightColumns: 1, stickyTopRows: 1, stickyBottomRows: 1, enableFillHandle: true, enableRangeSelection: true }));
};
