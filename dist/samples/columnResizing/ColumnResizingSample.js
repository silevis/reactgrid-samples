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
var getPeople = function () { return [
    { name: "Thomas", surname: "Goldman" },
    { name: "Susie", surname: "Quattro" },
    { name: "", surname: "" }
]; };
var getColumns = function () { return [
    { columnId: "name", width: 150, resizable: true },
    { columnId: "surname", width: 150, resizable: true }
]; };
var headerRow = {
    rowId: "header",
    cells: [
        { type: "header", text: "Name" },
        { type: "header", text: "Surname" }
    ]
};
var getRows = function (people) { return __spread([
    headerRow
], people.map(function (person, idx) { return ({
    rowId: idx,
    cells: [
        { type: "text", text: person.name },
        { type: "text", text: person.surname }
    ]
}); })); };
export function ColumnResizingSample() {
    var _a = __read(React.useState(getPeople()), 1), people = _a[0];
    var _b = __read(React.useState(getColumns()), 2), columns = _b[0], setColumns = _b[1];
    var rows = getRows(people);
    var handleColumnResize = function (ci, width) {
        setColumns(function (prevColumns) {
            var columnIndex = prevColumns.findIndex(function (el) { return el.columnId === ci; });
            var resizedColumn = prevColumns[columnIndex];
            var updatedColumn = __assign(__assign({}, resizedColumn), { width: width });
            prevColumns[columnIndex] = updatedColumn;
            return __spread(prevColumns);
        });
    };
    return React.createElement(ReactGrid, { rows: rows, columns: columns, onColumnResized: handleColumnResize });
}
