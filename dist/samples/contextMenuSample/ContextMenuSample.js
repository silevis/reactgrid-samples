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
import { DropdownNumberCellTemplate } from '../../cell-templates/dropdownNumberCell/DropdownNumberCellTemplate';
import { FlagCellTemplate } from '../../cell-templates/flagCell/FlagCellTemplate';
import { RateCellTemplate } from '../../cell-templates/rateCell/RateCellTemplate';
import { columns as crmColumns } from '../../data/crm/columns';
import { rows as crmRows } from '../../data/crm/rows';
import './styling.scss';
var ReactGridContainer = styled.div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  position: relative;\n  min-height: 400px;\n"], ["\n  position: relative;\n  min-height: 400px;\n"])));
export var ContextMenuSample = function () {
    var _a = __read(React.useState(function () { return ({
        columns: __spread(crmColumns(true, false)),
        rows: __spread(crmRows(true)),
    }); }), 2), state = _a[0], setState = _a[1];
    var handleChanges = function (changes) {
        var newState = __assign({}, state);
        changes.forEach(function (change) {
            var changeRowIdx = newState.rows.findIndex(function (el) { return el.rowId === change.rowId; });
            var changeColumnIdx = newState.columns.findIndex(function (el) { return el.columnId === change.columnId; });
            newState.rows[changeRowIdx].cells[changeColumnIdx] = change.newCell;
        });
        setState(newState);
    };
    var handleContextMenu = function (selectedRowIds, selectedColIds, selectionMode, menuOptions) {
        if (selectionMode === 'row') {
            menuOptions = __spread(menuOptions, [
                {
                    id: 'removeRow', label: 'Remove row',
                    handler: function () {
                        setState(__assign(__assign({}, state), { rows: state.rows.filter(function (row) { return !selectedRowIds.includes(row.rowId); }) }));
                    }
                },
            ]);
        }
        if (selectionMode === 'column') {
            menuOptions = __spread(menuOptions, [
                {
                    id: 'removeColumn', label: 'Remove column',
                    handler: function () {
                        var columns = state.columns.filter(function (column) { return !selectedColIds.includes(column.columnId); });
                        var columnsIdxs = state.columns.map(function (column, idx) {
                            if (!columns.includes(column))
                                return idx;
                            return undefined;
                        }).filter(function (idx) { return idx !== undefined; });
                        var rows = state.rows.map(function (row) { return (__assign(__assign({}, row), { cells: row.cells.filter(function (_, idx) { return !columnsIdxs.includes(idx); }) })); });
                        setState(__assign(__assign({}, state), { columns: columns, rows: rows }));
                    }
                },
            ]);
        }
        return menuOptions;
    };
    return (React.createElement(React.Fragment, null,
        React.createElement(ReactGridContainer, { id: "context-menu-sample" },
            React.createElement(ReactGrid, { rows: state.rows, columns: state.columns, customCellTemplates: {
                    'rate': new RateCellTemplate(),
                    'flag': new FlagCellTemplate(),
                    'dropdownNumber': new DropdownNumberCellTemplate(),
                }, onContextMenu: handleContextMenu, onCellsChanged: handleChanges, enableColumnSelection: true, enableRowSelection: true, enableFillHandle: true, enableRangeSelection: true }))));
};
var templateObject_1;
