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
var getPeople = function () { return [
    { name: "Thomas", surname: "Goldman" },
    { name: "Susie", surname: "Quattro" },
    { name: "", surname: "" }
]; };
var getColumns = function () { return [
    { columnId: "name", width: 150 },
    { columnId: "surname", width: 150 }
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
var applyChangesToPeople = function (changes, prevPeople) {
    changes.forEach(function (change) {
        if (change.newCell.type === 'text') {
            var personIndex = change.rowId;
            var fieldName = change.columnId;
            prevPeople[personIndex][fieldName] = change.newCell.text;
        }
    });
    return __spread(prevPeople);
};
export var SimpleContextMenuHandlingSample = function () {
    var _a = __read(React.useState(getPeople()), 2), people = _a[0], setPeople = _a[1];
    var rows = getRows(people);
    var columns = getColumns();
    var handleChanges = function (changes) {
        setPeople(function (prevPeople) { return applyChangesToPeople(changes, prevPeople); });
    };
    var simpleHandleContextMenu = function (selectedRowIds, selectedColIds, selectionMode, menuOptions) {
        return menuOptions;
    };
    return (React.createElement(ReactGrid, { rows: rows, columns: columns, onCellsChanged: handleChanges, onContextMenu: simpleHandleContextMenu }));
};
