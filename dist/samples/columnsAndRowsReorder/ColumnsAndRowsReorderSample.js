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
    { id: 1, name: "Thomas", surname: "Goldman" },
    { id: 2, name: "Susie", surname: "Quattro" },
    { id: 3, name: "", surname: "" }
]; };
var columnMap = {
    name: 'Name',
    surname: 'Surname'
};
var getColumns = function () { return [
    { columnId: 'name', width: 150, reorderable: true },
    { columnId: 'surname', width: 200, reorderable: true }
]; };
var getRows = function (people, columnsOrder) {
    return __spread([
        {
            rowId: "header",
            cells: [
                { type: "header", text: columnMap[columnsOrder[0]] },
                { type: "header", text: columnMap[columnsOrder[1]] }
            ]
        }
    ], people.map(function (person, idx) { return ({
        rowId: person.id,
        reorderable: true,
        cells: [
            { type: "text", text: person[columnsOrder[0]] },
            { type: "text", text: person[columnsOrder[1]] }
        ]
    }); }));
};
var reorderArray = function (arr, idxs, to) {
    var movedElements = arr.filter(function (_, idx) { return idxs.includes(idx); });
    var targetIdx = Math.min.apply(Math, __spread(idxs)) < to ? to += 1 : to -= idxs.filter(function (idx) { return idx < to; }).length;
    var leftSide = arr.filter(function (_, idx) { return idx < targetIdx && !idxs.includes(idx); });
    var rightSide = arr.filter(function (_, idx) { return idx >= targetIdx && !idxs.includes(idx); });
    return __spread(leftSide, movedElements, rightSide);
};
var handleCanReorderRows = function (targetRowId, rowIds) {
    return targetRowId !== 'header';
};
export var ColumnsAndRowsReorderSample = function () {
    var _a = __read(React.useState(getPeople()), 2), people = _a[0], setPeople = _a[1];
    var _b = __read(React.useState(getColumns()), 2), columns = _b[0], setColumns = _b[1];
    var rows = getRows(people, columns.map(function (c) { return c.columnId; }));
    var handleColumnsReorder = function (targetColumnId, columnIds) {
        var to = columns.findIndex(function (column) { return column.columnId === targetColumnId; });
        var columnIdxs = columnIds.map(function (columnId) { return columns.findIndex(function (c) { return c.columnId === columnId; }); });
        setColumns(function (prevColumns) { return reorderArray(prevColumns, columnIdxs, to); });
    };
    var handleRowsReorder = function (targetRowId, rowIds) {
        setPeople(function (prevPeople) {
            var to = people.findIndex(function (person) { return person.id === targetRowId; });
            var rowsIds = rowIds.map(function (id) { return people.findIndex(function (person) { return person.id === id; }); });
            return reorderArray(prevPeople, rowsIds, to);
        });
    };
    return React.createElement(ReactGrid, { rows: rows, columns: columns, onColumnsReordered: handleColumnsReorder, onRowsReordered: handleRowsReorder, canReorderRows: handleCanReorderRows, enableRowSelection: true, enableColumnSelection: true });
};
