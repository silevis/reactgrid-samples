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
import React, { useState, useRef, useEffect } from 'react';
import { ReactGrid } from '@silevis/reactgrid';
import { initialColumns, usePrevious, getHeaderCell, transformLogsToModel, getCellValue, getBlankRow } from './utils';
import { initialWorkhours } from '../../data/workhoursData/initialValues';
import { DropdownCellTemplate } from '../../cell-templates/dropdownCellTemplate/dropdownCellTemplate';
import { ButtonCellTemplate } from '../../cell-templates/buttonCellTemplate/buttonCellTemplate';
export var WorkhoursGrid = function (_a) {
    var rowHeight = _a.rowHeight, color = _a.color;
    var _b = __read(useState(function () { return initialWorkhours; }), 2), workLogs = _b[0], setWorkLogs = _b[1];
    var _c = __read(useState(function () { return initialColumns; }), 2), columns = _c[0], setColumns = _c[1];
    var previousLogLength = usePrevious(workLogs.length);
    var ref = useRef(null);
    useEffect(function () {
        if (previousLogLength !== workLogs.length && ref.current) {
            ref.current.scrollTo(0, ref.current.scrollHeight);
        }
    }, [workLogs, previousLogLength]);
    var headerRow = {
        rowId: 'header',
        height: rowHeight,
        cells: [
            getHeaderCell('Nr', color),
            getHeaderCell('Date', color),
            getHeaderCell('Employee', color),
            getHeaderCell('Hours', color),
            getHeaderCell('Project', color),
            getHeaderCell('Description', color)
        ]
    };
    var rows = transformLogsToModel(workLogs, rowHeight);
    var onCellsChanged = function (changes) {
        changes.forEach(function (change) {
            var column = columns.find(function (col) { return col.columnId === change.columnId; });
            if (change.rowId === workLogs.length && column) {
                setWorkLogs(function (oldLogs) {
                    var _a;
                    return column.key
                        ? __spread(oldLogs, [(_a = { id: oldLogs.length, hours: 0, project: '', employee: '', description: '' }, _a[column.key] = getCellValue(change), _a)]) : oldLogs;
                });
            }
            var logIdx = workLogs.findIndex(function (log) { return log.id === change.rowId; });
            if (logIdx === -1 || !column)
                return;
            setWorkLogs(function (oldLogs) {
                var _a;
                if (!column.key)
                    return oldLogs;
                oldLogs[logIdx] = __assign(__assign({}, oldLogs[logIdx]), (_a = {}, _a[column.key] = getCellValue(change), _a));
                return __spread(oldLogs);
            });
        });
    };
    var addBlankLog = function () { return setWorkLogs(function (logs) { return __spread(logs, [{ id: logs.length, hours: 0, employee: '', description: '', project: '' }]); }); };
    return React.createElement("div", { ref: ref, style: { height: '400px', width: '1200px', overflow: 'auto' } },
        React.createElement(ReactGrid, { customCellTemplates: {
                'dropdown': DropdownCellTemplate,
                'button': ButtonCellTemplate,
            }, onCellsChanged: onCellsChanged, rows: __spread([
                headerRow
            ], rows.map(function (row, idx) { return idx % 2 === 0 ? __assign(__assign({}, row), { cells: row.cells.map(function (cell) { return (__assign(__assign({}, cell), { style: { background: 'rgba(0,0,0,0.02)' } })); }) }) : row; }), [
                getBlankRow(addBlankLog, rowHeight, workLogs.length)
            ]), stickyBottomRows: 1, stickyTopRows: 1, columns: columns, enableRangeSelection: true, enableColumnSelection: true, enableRowSelection: true, onColumnResized: function (id, width) {
                setColumns(function (columns) { return columns.map(function (col) { return col.columnId === id ? __assign(__assign({}, col), { width: width }) : col; }); });
            } }));
};
