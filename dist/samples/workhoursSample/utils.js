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
import { useRef, useEffect } from "react";
import { getDropdownCell } from "../../cell-templates/dropdownCellTemplate/dropdownCellTemplate";
import { projects } from "../../data/workhoursData/initialValues";
import { getButtonCell } from "../../cell-templates/buttonCellTemplate/buttonCellTemplate";
export var initialColumns = [
    { columnId: 0, resizable: true, width: 50 },
    { columnId: 1, resizable: true, width: 300, key: 'date' },
    { columnId: 2, resizable: true, width: 300, key: 'employee' },
    { columnId: 3, resizable: true, width: 100, key: 'hours' },
    { columnId: 4, resizable: true, width: 250, key: 'project' },
    { columnId: 5, width: 600, resizable: true, key: 'description' },
];
export var usePrevious = function (value) {
    var ref = useRef();
    useEffect(function () {
        ref.current = value;
    }, [value]);
    return ref.current;
};
var transparentBorder = { color: 'rgba(0,0,0,0.25)' };
var transparentBorderStyle = { border: { top: transparentBorder, right: transparentBorder, bottom: transparentBorder } };
export var getTextCell = function (text) { return ({ type: 'text', text: text || '' }); };
export var getHeaderCell = function (text, background) { return ({ type: 'header', text: text || '', style: __assign({ background: background }, transparentBorderStyle) }); };
export var getCellValue = function (change) {
    var newCell = change.newCell;
    switch (newCell.type) {
        case 'number':
            return newCell.value;
        case 'dropdown':
        case 'text':
            return newCell.text;
        case 'date':
            return newCell.date;
        default:
            return '';
    }
};
export var transformLogsToModel = function (logs, height) {
    return logs.map(function (log, idx) { return ({
        rowId: log.id,
        height: height,
        cells: [
            { type: 'number', value: idx + 1, className: 'idx-cell' },
            { type: 'date', date: log.date, className: 'date-cell' },
            getTextCell(log.employee),
            { type: 'number', value: log.hours },
            getDropdownCell(log.project || '', projects, false, {}, 'dropdown-cell'),
            getTextCell(log.description),
        ]
    }); });
};
export var getBlankRow = function (onPressButton, height, id) { return ({
    rowId: id,
    height: height,
    cells: [
        getButtonCell('+', onPressButton, {}, 'add-row-button'),
        { type: 'date', date: undefined, className: 'date-cell' },
        getTextCell(''),
        { type: 'number', value: 0, nanToZero: true, hideZero: true },
        getDropdownCell('', projects, false, {}, 'dropdown-cell'),
        getTextCell(''),
    ]
}); };
