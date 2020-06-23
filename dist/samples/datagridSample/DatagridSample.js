var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
import * as React from 'react';
import { ReactGrid } from '@silevis/reactgrid';
import styled from 'styled-components';
import { VirtualEnv, VirtualUser } from './VirtualUser';
import { columns } from '../../data/crm/columns';
import { rows } from '../../data/crm/rows';
import { FlagCellTemplate } from '../../cell-templates/flagCell/FlagCellTemplate';
import { DropdownNumberCellTemplate } from '../../cell-templates/dropdownNumberCell/DropdownNumberCellTemplate';
import './styling.scss';
var ReactGridContainer = styled.div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  /* height: 300px;\n  width: 800px;\n  overflow: auto; */\n"], ["\n  /* height: 300px;\n  width: 800px;\n  overflow: auto; */\n"])));
var DatagridSample = (function (_super) {
    __extends(DatagridSample, _super);
    function DatagridSample() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            columns: columns(true, true),
            rows: __spreadArrays(rows(true)),
            stickyTopRows: 1,
            stickyLeftColumns: 2,
            highlights: [],
        };
        _this.makeChanges = function (changes) {
            var newState = __assign({}, _this.state);
            changes.forEach(function (change) {
                var changeRowIdx = newState.rows.findIndex(function (el) { return el.rowId === change.rowId; });
                var changeColumnIdx = newState.columns.findIndex(function (el) { return el.columnId === change.columnId; });
                newState.rows[changeRowIdx].cells[changeColumnIdx] = change.newCell;
            });
            _this.setState(newState);
            return newState;
        };
        _this.reorderArray = function (arr, idxs, to) {
            var movedElements = arr.filter(function (_, idx) { return idxs.includes(idx); });
            to = Math.min.apply(Math, idxs) < to ? to += 1 : to -= idxs.filter(function (idx) { return idx < to; }).length;
            var leftSide = arr.filter(function (_, idx) { return idx < to && !idxs.includes(idx); });
            var rightSide = arr.filter(function (_, idx) { return idx >= to && !idxs.includes(idx); });
            return __spreadArrays(leftSide, movedElements, rightSide);
        };
        _this.handleCanReorderColumns = function (targetColumnId, columnIds, dropPosition) {
            return true;
        };
        _this.handleCanReorderRows = function (targetColumnId, rowIds, dropPosition) {
            var rowIndex = _this.state.rows.findIndex(function (row) { return row.rowId === targetColumnId; });
            if (rowIndex === 0)
                return false;
            return true;
        };
        _this.handleColumnsReorder = function (targetColumnId, columnIds, dropPosition) {
            var to = _this.state.columns.findIndex(function (column) { return column.columnId === targetColumnId; });
            var columnIdxs = columnIds.map(function (id, idx) { return _this.state.columns.findIndex(function (c) { return c.columnId === id; }); });
            _this.setState({
                columns: _this.reorderArray(_this.state.columns, columnIdxs, to),
                rows: _this.state.rows.map(function (row) { return (__assign(__assign({}, row), { cells: _this.reorderArray(row.cells, columnIdxs, to) })); }),
            });
        };
        _this.handleRowsReorder = function (targetRowId, rowIds, dropPosition) {
            var newState = __assign({}, _this.state);
            var to = _this.state.rows.findIndex(function (row) { return row.rowId === targetRowId; });
            var ids = rowIds.map(function (id) { return _this.state.rows.findIndex(function (r) { return r.rowId === id; }); });
            _this.setState(__assign(__assign({}, newState), { rows: _this.reorderArray(_this.state.rows, ids, to) }));
        };
        _this.handleChanges = function (changes) {
            _this.makeChanges(changes);
        };
        _this.handleColumnResize = function (ci, width) {
            var newState = __assign({}, _this.state);
            var columnIndex = newState.columns.findIndex(function (el) { return el.columnId === ci; });
            var resizedColumn = newState.columns[columnIndex];
            var updateColumn = __assign(__assign({}, resizedColumn), { width: width });
            newState.columns[columnIndex] = updateColumn;
            _this.setState(newState);
        };
        _this.handleContextMenu = function (selectedRowIds, selectedColIds, selectionMode, menuOptions) {
            if (selectionMode === 'row') {
                menuOptions = __spreadArrays(menuOptions, [
                    {
                        id: 'removeRow', label: 'Remove row',
                        handler: function () {
                            var highlights = _this.state.highlights.filter(function (h) { return !selectedRowIds.includes(h.rowId); });
                            _this.setState({ rows: _this.state.rows.filter(function (row) { return !selectedRowIds.includes(row.rowId); }), highlights: highlights });
                        }
                    },
                ]);
            }
            if (selectionMode === 'column') {
                menuOptions = __spreadArrays(menuOptions, [
                    {
                        id: 'removeColumn', label: 'Remove column',
                        handler: function () {
                            var columns = _this.state.columns.filter(function (column) { return !selectedColIds.includes(column.columnId); });
                            var columnsIdxs = _this.state.columns.map(function (column, idx) {
                                if (!columns.includes(column))
                                    return idx;
                                return undefined;
                            }).filter(function (idx) { return idx !== undefined; });
                            var rows = _this.state.rows.map(function (row) { return (__assign(__assign({}, row), { cells: row.cells.filter(function (_, idx) { return !columnsIdxs.includes(idx); }) })); });
                            var highlights = _this.state.highlights.filter(function (h) { return !selectedColIds.includes(h.columnId); });
                            _this.setState({ columns: columns, rows: rows, highlights: highlights });
                        }
                    },
                ]);
            }
            return menuOptions;
        };
        return _this;
    }
    DatagridSample.prototype.componentDidMount = function () {
        this.setVirtualEnv();
    };
    DatagridSample.prototype.componentWillUnmount = function () {
        this.unsetVirtualEnv();
    };
    DatagridSample.prototype.setVirtualEnv = function () {
        var _this = this;
        var virtEnv = new VirtualEnv(this.makeChanges);
        virtEnv
            .addUser(new VirtualUser('#2274A5'))
            .addUser(new VirtualUser('#F75C03'))
            .addUser(new VirtualUser('#F1C40F'))
            .addUser(new VirtualUser('#D90368'))
            .addUser(new VirtualUser('#00f2c3'))
            .addUser(new VirtualUser('#ffd600'))
            .addUser(new VirtualUser('#344675'))
            .addUser(new VirtualUser('#212529'))
            .addUser(new VirtualUser('#ffffff'))
            .addUser(new VirtualUser('#000000'))
            .addUser(new VirtualUser('#5e72e4'))
            .addUser(new VirtualUser('#4D8802'))
            .addUser(new VirtualUser('#A771FE'));
        this.intervalId = setInterval(function () { return _this.setState(virtEnv.updateView(_this.state)); }, 1000);
    };
    DatagridSample.prototype.unsetVirtualEnv = function () {
        this.setState({ highlights: [] });
        window.clearInterval(this.intervalId);
    };
    DatagridSample.prototype.render = function () {
        return (React.createElement(ReactGridContainer, { id: "datagrid-sample" },
            React.createElement(ReactGrid, { columns: this.state.columns, rows: this.state.rows, onCellsChanged: this.handleChanges, customCellTemplates: {
                    'flag': new FlagCellTemplate,
                    'dropdownNumber': new DropdownNumberCellTemplate
                }, stickyTopRows: this.state.stickyTopRows, stickyLeftColumns: this.state.stickyLeftColumns, highlights: this.state.highlights, canReorderColumns: this.handleCanReorderColumns, canReorderRows: this.handleCanReorderRows, onColumnsReordered: this.handleColumnsReorder, onContextMenu: this.handleContextMenu, onRowsReordered: this.handleRowsReorder, onColumnResized: this.handleColumnResize, enableColumnSelection: true, enableRowSelection: true, enableFillHandle: true, enableRangeSelection: true })));
    };
    return DatagridSample;
}(React.Component));
export { DatagridSample };
var templateObject_1;
