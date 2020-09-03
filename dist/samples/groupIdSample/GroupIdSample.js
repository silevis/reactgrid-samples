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
export var GroupIdSample = function () {
    var _a = __read(React.useState(function () { return [
        { columnId: "Name", width: 200 },
        { columnId: "Surname" },
        { columnId: "Birth Data", width: 100 },
    ]; }), 1), columns = _a[0];
    var _b = __read(React.useState(function () { return [
        {
            rowId: 0,
            cells: [
                { type: "header", text: 'Name' },
                { type: "header", text: "Surname" },
                { type: "header", text: "Birth Data" },
            ]
        },
        {
            rowId: 1,
            cells: [
                { type: "text", text: "Thomas Anthony", groupId: 'group: A' },
                { type: "text", text: "Goldman", groupId: 'group: B' },
                { type: "date", date: new Date("1989-04-01") },
            ]
        },
        {
            rowId: 2,
            cells: [
                { type: "text", text: "Susie Evelyn", groupId: 'group: A' },
                { type: "text", text: "Spencer", groupId: 'group: B' },
                { type: "date", date: new Date("1967-11-02") },
            ]
        },
        {
            rowId: 3,
            cells: [
                { type: "text", text: "Nancy" },
                { type: "text", text: "Gibbons", groupId: 'group: C' },
                { type: "date", date: new Date("1976-02-08") },
            ]
        },
        {
            rowId: 4,
            cells: [
                { type: "text", text: "Jose" },
                { type: "text", text: "Bell", groupId: 'group: C' },
                { type: "date", date: new Date("1966-10-12") },
            ]
        },
        {
            rowId: 5,
            cells: [
                { type: "text", text: "Jim", groupId: 'group: A' },
                { type: "text", text: "Hurst", groupId: 'group: C' },
                { type: "date", date: new Date("1976-08-30") },
            ]
        },
        {
            rowId: 6,
            cells: [
                { type: "text", text: "Laura" },
                { type: "text", text: "Pepper", groupId: 'group: C' },
                { type: "date", date: new Date("1956-05-01") },
            ]
        },
        {
            rowId: 7,
            cells: [
                { type: "text", text: "Sandra" },
                { type: "text", text: "Pollock", groupId: 'group: C' },
                { type: "date", date: new Date("1956-05-01") },
            ]
        },
        {
            rowId: 8,
            cells: [
                { type: "text", text: "" },
                { type: "text", text: "" },
                { type: "date", date: undefined },
            ]
        }
    ]; }), 2), rows = _b[0], setRows = _b[1];
    var handleContextMenu = function (selectedRowIds, selectedColIds, selectionMode, menuOptions) {
        return menuOptions;
    };
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
    return (React.createElement(ReactGrid, { rows: rows, columns: columns, onCellsChanged: handleChanges, onContextMenu: handleContextMenu, enableFillHandle: true, enableRangeSelection: true, enableGroupIdRender: true }));
};
