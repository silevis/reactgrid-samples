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
import * as React from "react";
import { ReactGrid } from "@silevis/reactgrid";
import './styling.scss';
import { FlagCellTemplate } from "./FlagCellTemplate";
export var FlagCellTemplateSample = function () {
    var _a = React.useState(function () { return ({
        columns: [{ columnId: 0, width: 100 }],
        rows: [
            {
                rowId: 0,
                height: 40,
                cells: [{ type: "header", text: "Flag" }]
            },
            {
                rowId: 1,
                height: 40,
                cells: [{ type: "flag", text: "rus" }]
            },
            {
                rowId: 2,
                height: 40,
                cells: [{ type: "flag", text: "usa" }]
            },
            {
                rowId: 3,
                height: 40,
                cells: [{ type: "flag", text: "pl" }]
            }
        ]
    }); }), state = _a[0], setState = _a[1];
    var handleChanges = function (changes) {
        var newState = __assign({}, state);
        changes.forEach(function (change) {
            var changeRowIdx = newState.rows.findIndex(function (el) { return el.rowId === change.rowId; });
            var changeColumnIdx = newState.columns.findIndex(function (el) { return el.columnId === change.columnId; });
            newState.rows[changeRowIdx].cells[changeColumnIdx] = change.newCell;
        });
        setState(newState);
        return true;
    };
    return (React.createElement(ReactGrid, { rows: state.rows, columns: state.columns, onCellsChanged: handleChanges, customCellTemplates: { flag: new FlagCellTemplate() }, enableFillHandle: true, enableRangeSelection: true }));
};
