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
import React, { useState, useEffect } from 'react';
import { getGroupAttributes, getGridRows, getGridColumns, getHeaderRows } from './BudgetPlannerUtil';
import { getVariableModel } from './budgetPlannerVariables';
import { ReactGrid } from '@silevis/reactgrid';
import { initializeIcons, Dropdown } from 'office-ui-fabric-react';
initializeIcons();
export var BudgetPlannerDisplay = function (props) {
    var variables = props.variables, dates = props.dates, span = props.span;
    var _a = useState(["job position", "name", "project"]), groupByItemsFields = _a[0], setGroupByItemsField = _a[1];
    var _b = useState(), rowsToRender = _b[0], setRowsToRender = _b[1];
    var _c = useState({}), state = _c[0], setState = _c[1];
    var displayFields = ['value'];
    var groupByItems = Object.keys(variables.reduce(function (result, obj) { return Object.assign(result, obj); }, {})).filter(function (it) { return it !== '_id'; });
    var getGroupCell = function (row) { return row.cells.find(function (cell) { return cell.type === 'group'; }); };
    var hasChildren = function (rows, row) {
        return rows.some(function (r) { return getGroupCell(r).parentId === row.rowId; });
    };
    var isRowFullyExpanded = function (rows, row) {
        var parentRow = getParentRow(rows, row);
        if (parentRow) {
            if (!getGroupCell(parentRow).isExpanded)
                return false;
            return isRowFullyExpanded(rows, parentRow);
        }
        return true;
    };
    var getExpandedRows = function (rows) {
        return rows.filter(function (row) {
            var areAllParentsExpanded = isRowFullyExpanded(rows, row);
            return areAllParentsExpanded !== undefined ? areAllParentsExpanded : true;
        });
    };
    var getDirectChildrenRows = function (rows, parentRow) {
        return rows.filter(function (row) { return !!row.cells.find(function (cell) { return cell.type === 'group' && cell.parentId === parentRow.rowId; }); });
    };
    var getParentRow = function (rows, row) { return rows.find(function (r) { return r.rowId === getGroupCell(row).parentId; }); };
    var assignIndentAndHasChildren = function (allRows, parentRow, indent) {
        ++indent;
        getDirectChildrenRows(allRows, parentRow).forEach(function (row) {
            var groupCell = getGroupCell(row);
            groupCell.indent = indent;
            var hasRowChildrens = hasChildren(allRows, row);
            groupCell.hasChildren = hasRowChildrens;
            if (hasRowChildrens)
                assignIndentAndHasChildren(allRows, row, indent);
        });
    };
    var createIndents = function (rows) {
        return rows.map(function (row) {
            var groupCell = getGroupCell(row);
            if (groupCell.parentId === undefined) {
                var hasRowChildrens = hasChildren(rows, row);
                groupCell.hasChildren = hasRowChildrens;
                if (hasRowChildrens)
                    assignIndentAndHasChildren(rows, row, 0);
            }
            return row;
        });
    };
    var handleChanges = function (changes) {
        var newState = __assign({}, state);
        changes.forEach(function (change) {
            var changeRowIdx = newState.rows.findIndex(function (el) { return el.rowId === change.rowId; });
            var changeColumnIdx = newState.columns.findIndex(function (el) { return el.columnId === change.columnId; });
            newState.rows[changeRowIdx].cells[changeColumnIdx] = change.newCell;
        });
        if (changes[0].initialCell.type === 'group') {
            var rowsToRender_1 = __spreadArrays([getHeaderRows(state.dates, span)], getExpandedRows(newState.rows));
            setRowsToRender(rowsToRender_1);
        }
        setState(__assign(__assign({}, state), { rows: createIndents(newState.rows) }));
    };
    var updateTable = function () {
        var groupAttributes = getGroupAttributes(__spreadArrays(groupByItemsFields), variables, dates, span, []);
        var columns = getGridColumns(dates, span);
        var data = getVariableModel(groupAttributes, dates, span, variables);
        var rows = __spreadArrays(getGridRows(dates, data, displayFields));
        rows = createIndents(rows);
        setRowsToRender(__spreadArrays([getHeaderRows(dates, span)], getExpandedRows(rows)));
        setState(__assign(__assign({}, state), { rows: rows, columns: columns, dates: dates }));
    };
    useEffect(function () {
        updateTable();
    }, [groupByItemsFields, setGroupByItemsField, dates]);
    var handleColumnResize = function (ci, width) {
        var newState = __assign({}, state);
        var columnIndex = newState.columns.findIndex(function (el) { return el.columnId === ci; });
        var resizedColumn = newState.columns[columnIndex];
        var updateColumn = __assign(__assign({}, resizedColumn), { width: width });
        newState.columns[columnIndex] = updateColumn;
        setState(newState);
    };
    return (React.createElement(React.Fragment, null,
        React.createElement("h3", null, "Variables Options"),
        React.createElement("div", { className: "budget-planning-header" },
            React.createElement(Dropdown, { placeholder: "Select options", label: "Group by", selectedKeys: groupByItemsFields, onChange: function (_, item) { return item && setGroupByItemsField(item.selected ? __spreadArrays(groupByItemsFields, [item.key]) : groupByItemsFields.filter(function (key) { return key !== item.key; })); }, multiSelect: true, options: groupByItems.map(function (dropdownOption) { return ({ key: dropdownOption, text: dropdownOption }); }), styles: { dropdown: { width: 300 } } })),
        React.createElement("div", { className: "budget-planning-react-grid" }, state.columns && rowsToRender && React.createElement(ReactGrid, { rows: rowsToRender, columns: state.columns, onCellsChanged: handleChanges, onColumnResized: handleColumnResize, enableFillHandle: true, enableRangeSelection: true, stickyLeftColumns: 1, stickyTopRows: 1 }))));
};
export default BudgetPlannerDisplay;
