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
    var _a = React.useState(function () { return ({
        columns: dataColumns(false, true),
        rows: dataRows(false),
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
    var handleColumnResize = function (ci, width) {
        var newState = __assign({}, state);
        var columnIndex = newState.columns.findIndex(function (el) { return el.columnId === ci; });
        var resizedColumn = newState.columns[columnIndex];
        var updateColumn = __assign(__assign({}, resizedColumn), { width: width });
        newState.columns[columnIndex] = updateColumn;
        setState(newState);
    };
    return (React.createElement(ReactGridContainer, { id: "column-reorder-sample" },
        React.createElement(ReactGrid, { rows: state.rows, columns: state.columns, customCellTemplates: {
                'rating': new RateCellTemplate,
                'flag': new FlagCellTemplate
            }, onCellsChanged: handleChanges, onColumnResized: handleColumnResize, enableColumnSelection: true, enableRowSelection: true })));
};
var templateObject_1;
