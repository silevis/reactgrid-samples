var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
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
import * as React from 'react';
import styled from 'styled-components';
import { ReactGrid } from '@silevis/reactgrid';
import { RateCellTemplate } from '../../cell-templates/rateCell/RateCellTemplate';
import { FlagCellTemplate } from '../../cell-templates/flagCell/FlagCellTemplate';
import { columns as dataColumns } from '../../data/columns';
import { rows as dataRows } from '../../data/rows';
import './styling.scss';
var ReactGridContainer = styled.div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  position: relative;\n  min-height: 400px;\n"], ["\n  position: relative;\n  min-height: 400px;\n"])));
export var ResizeColumnSample = function () {
    var _a = __read(React.useState(function () { return dataColumns(false, true); }), 2), columns = _a[0], setColumns = _a[1];
    var _b = __read(React.useState(function () { return __spread(dataRows(false)); }), 2), rows = _b[0], setRows = _b[1];
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
    var handleColumnResize = function (ci, width) {
        setColumns(function (prevColumns) {
            var columnIndex = prevColumns.findIndex(function (el) { return el.columnId === ci; });
            var resizedColumn = prevColumns[columnIndex];
            var updatedColumn = __assign(__assign({}, resizedColumn), { width: width });
            prevColumns[columnIndex] = updatedColumn;
            return __spread(prevColumns);
        });
    };
    return (React.createElement(ReactGridContainer, { id: "column-reorder-sample" },
        React.createElement(ReactGrid, { rows: rows, columns: columns, customCellTemplates: {
                'rate': new RateCellTemplate(),
                'flag': new FlagCellTemplate(),
            }, onCellsChanged: handleChanges, onColumnResized: handleColumnResize, enableColumnSelection: true, enableRowSelection: true, enableFillHandle: true, enableRangeSelection: true })));
};
var templateObject_1;
