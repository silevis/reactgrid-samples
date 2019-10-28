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
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
import React from 'react';
import styled from 'styled-components';
import { ReactGrid } from '@silevis/reactgrid';
import BudgetPlannerDemoData from './BudgetPlannerSampleData';
import { BudgetPlannerTextCellTemplate, BudgetPlannerNumberCellTemplate, BudgetPlannerColumnHeaderCellTemplate } from './../../cell-templates/budgetPlannerCells/BudgetPlannerCellTemplates';
import './styling.scss';
var MonthNameByIdx = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
];
var ReactGridContainer = styled.div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n    position: relative;\n    margin-left: 10px;\n    width: 100%;\n    min-height: 400px;\n"], ["\n    position: relative;\n    margin-left: 10px;\n    width: 100%;\n    min-height: 400px;\n"])));
var BudgetPlanner = function (props) {
    var _a = React.useState(props.budgetData), budgetData = _a[0], setBudgetData = _a[1];
    var _b = React.useState({ columns: {}, rows: {} }), collapsedLabels = _b[0], setCollapsedLabels = _b[1];
    var getMonthsInRange = function (dateRange) {
        var monthsInRange = [];
        var start = dateRange.start, end = dateRange.end;
        for (var yearIdx = start.year; yearIdx <= end.year; yearIdx++) {
            var endMonthIdx = yearIdx !== end.year ? 11 : end.month;
            var startMonthIdx = yearIdx === start.year ? start.month : 0;
            for (var monthIdx = startMonthIdx; monthIdx <= endMonthIdx; monthIdx = (monthIdx > 12 ? monthIdx % 12 || 11 : monthIdx + 1)) {
                monthsInRange.push({ year: yearIdx, month: monthIdx });
            }
        }
        return monthsInRange;
    };
    var computeGridData = function () {
        var seen = {
            years: {},
            quarters: {}
        };
        var computedColumns = [
            { id: 'tag', reorderable: false, resizable: true, width: 100 }
        ];
        getMonthsInRange(props.dateRange).forEach(function (month) {
            var newColumn = { reorderable: false, resizable: false };
            var quarterId = ['quarter', month.year, Math.floor(month.month / 3)].join(',');
            var yearId = ['year', month.year].join(',');
            var monthId = ['month', month.year, month.month].join(',');
            if (!(month.year in seen.years)) {
                seen.years[month.year] = true;
                newColumn.width = 80;
                newColumn.id = yearId;
                computedColumns.push(__assign({}, newColumn));
            }
            if (!(quarterId in seen.quarters)) {
                seen.quarters[quarterId] = true;
                newColumn.width = 100;
                newColumn.id = quarterId;
                computedColumns.push(__assign({}, newColumn));
            }
            newColumn.width = 140;
            newColumn.id = monthId;
            computedColumns.push(newColumn);
        });
        var parentYearCell;
        var parentQuarterCell;
        var computedRows = [{
                id: 'header',
                height: 40,
                reorderable: false,
                cells: __spreadArrays([
                    { type: 'text', data: { value: 'Category', isCollapsed: false } }
                ], computedColumns.slice(1).map(function (column) {
                    var columnData = column.id.split(',');
                    var newCell = {
                        type: 'columnHeader',
                        data: { value: columnData[1], isCollapsed: false }
                    };
                    if (columnData[0] === 'year') {
                        parentYearCell = newCell;
                    }
                    else if (columnData[0] === 'quarter') {
                        newCell.data.value = "Q" + (parseInt(columnData[2]) + 1) + "/" + columnData[1].substr(2);
                        newCell.data.parent = parentYearCell;
                        parentQuarterCell = newCell;
                    }
                    else {
                        newCell.data.value = MonthNameByIdx[parseInt(columnData[2])] + ", " + columnData[1];
                        newCell.data.parent = parentQuarterCell;
                    }
                    newCell.data.isCollapsed = Boolean(collapsedLabels.columns[column.id]);
                    return newCell;
                }))
            }];
        props.budgetData.forEach(function (category) {
            var parentYearCell;
            var parentQuarterCell;
            var parentRow = {
                id: category.id,
                reorderable: false,
                height: 40,
                cells: __spreadArrays([
                    { type: 'columnHeader', data: { value: category.category, isCollapsed: category.isCollapsed } }
                ], computedColumns.slice(1).map(function (column, idx) {
                    var newCell = { data: { value: 0 }, type: 'bpNumber' };
                    var columnData = column.id.toString().split(',');
                    newCell.data.isCollapsed = false;
                    if (columnData[0] === 'year') {
                        parentYearCell = newCell;
                        newCell.data.isCollapsed = computedRows[0].cells[idx + 1].data.isCollapsed;
                    }
                    else if (columnData[0] === 'quarter') {
                        newCell.data.parent = parentYearCell;
                        newCell.data.isCollapsed = computedRows[0].cells[idx + 1].data.isCollapsed;
                        parentQuarterCell = newCell;
                    }
                    else {
                        newCell.data.parent = parentQuarterCell;
                    }
                    return newCell;
                }))
            };
            computedRows.push(parentRow);
            category.subcategories.forEach(function (subcategory) {
                var row = {
                    id: subcategory.id,
                    reorderable: false,
                    height: 40,
                    cells: [{
                            type: 'columnHeader',
                            data: { value: subcategory.subcategory, isCollapsed: false, parent: parentRow.cells[0] }
                        }]
                };
                var _a = [NaN, NaN], yearColIdx = _a[0], quarterColIdx = _a[1];
                computedColumns.slice(1).forEach(function (column, idx) {
                    var newCell = {
                        type: 'bpNumber',
                        data: { value: NaN, isCollapsed: false },
                    };
                    var columnData = column.id.split(',');
                    switch (columnData[0]) {
                        case 'year':
                            parentYearCell = newCell;
                            newCell.data.value = 0;
                            yearColIdx = idx + 1;
                            newCell.data.isCollapsed = computedRows[0].cells[idx + 1].data.isCollapsed;
                            break;
                        case 'quarter':
                            parentQuarterCell = newCell;
                            newCell.data.value = 0;
                            newCell.data.parent = parentYearCell;
                            newCell.data.isCollapsed = computedRows[0].cells[idx + 1].data.isCollapsed;
                            quarterColIdx = idx + 1;
                            break;
                        default:
                            newCell.data.parent = parentQuarterCell;
                            var matchingEntry = subcategory.entries.find(function (entry) { return (entry.year.toString() === columnData[1] && entry.month.toString() === columnData[2]); });
                            var value = matchingEntry ? matchingEntry.value : 0;
                            row.cells[yearColIdx].data.value += value;
                            row.cells[quarterColIdx].data.value += value;
                            parentRow.cells[idx + 1].data.value += value;
                            parentRow.cells[yearColIdx].data.value += value;
                            parentRow.cells[quarterColIdx].data.value += value;
                            newCell.data.value = value !== 0 ? value : NaN;
                    }
                    row.cells.push(newCell);
                });
                computedRows.push(row);
            });
        });
        return { computedColumns: computedColumns, computedRows: computedRows };
    };
    var generateCellMatrixProps = function () {
        var _a = computeGridData(), computedColumns = _a.computedColumns, computedRows = _a.computedRows;
        var gridColumns = computedColumns.filter(function (computedColumn, idx) {
            var parentCell = computedRows[0].cells[idx].data.parent;
            var ancestorCollapsed = false;
            while (ancestorCollapsed === false && parentCell) {
                ancestorCollapsed = parentCell.data.isCollapsed;
                if (ancestorCollapsed)
                    return false;
                parentCell = parentCell.data.parent;
            }
            return true;
        });
        var gridRows = computedRows.filter(function (row) {
            return row.cells[0].data.parent ? !row.cells[0].data.parent.data.isCollapsed : true;
        });
        gridRows.forEach(function (gridRow) {
            gridRow.cells = gridRow.cells.filter(function (cell) {
                var cellHidden = false;
                if (cell.data.parent) {
                    cellHidden = cell.data.parent.data.isCollapsed;
                    var parentCell = cell.data.parent;
                    while (parentCell.data.parent) {
                        parentCell = parentCell.data.parent;
                        if (!cellHidden)
                            cellHidden = parentCell.data.isCollapsed;
                    }
                }
                return !cellHidden;
            });
        });
        gridRows.forEach(function (gridRow) {
            gridRow.cells = gridRow.cells.filter(function (cell) {
                if (cell.type === 'bpNumber') {
                    cell.type = 'number';
                    cell.data = cell.data.value;
                }
                return true;
            });
        });
        return { columns: gridColumns, rows: gridRows };
    };
    var dataChangeHandler = function (dataChanges) {
        dataChanges.forEach(function (dataChange) {
            if (dataChange.type === 'columnHeader') {
                if (dataChange.rowId === 'header') {
                    var newCollapsedLabels = __assign({}, collapsedLabels);
                    newCollapsedLabels.columns[dataChange.columnId] = dataChange.newData.isCollapsed;
                    setCollapsedLabels(newCollapsedLabels);
                }
                else {
                    var newBudgetData = __spreadArrays(budgetData);
                    var entry = newBudgetData.find(function (x) { return x.id === dataChange.rowId; });
                    if (!entry) {
                        return;
                    }
                    entry.isCollapsed = dataChange.newData.isCollapsed;
                    setBudgetData(newBudgetData);
                }
            }
            else if (dataChange.type === 'number') {
                var newBudgetData = __spreadArrays(budgetData);
                var _loop_1 = function (category) {
                    var subcategory = category.subcategories.find(function (x) { return x.id === dataChange.rowId; });
                    if (!subcategory) {
                        return "continue";
                    }
                    var columnData = dataChange.columnId.split(',');
                    if (columnData[0] !== 'month') {
                        return "continue";
                    }
                    var entry = subcategory.entries.find(function (x) { return (x.year === parseInt(columnData[1]) && x.month === parseInt(columnData[2])); });
                    if (!entry) {
                        subcategory.entries.push({ year: parseInt(columnData[1]), month: parseInt(columnData[2]), value: dataChange.newData });
                    }
                    else {
                        entry.value = dataChange.newData || 0;
                    }
                    setBudgetData(newBudgetData);
                    return "break";
                };
                for (var _i = 0, newBudgetData_1 = newBudgetData; _i < newBudgetData_1.length; _i++) {
                    var category = newBudgetData_1[_i];
                    var state_1 = _loop_1(category);
                    if (state_1 === "break")
                        break;
                }
            }
        });
    };
    var myCellTemplates = {
        text: new BudgetPlannerTextCellTemplate(),
        bpNumber: new BudgetPlannerNumberCellTemplate(),
        columnHeader: new BudgetPlannerColumnHeaderCellTemplate(),
    };
    return (React.createElement(ReactGrid, { style: {
            marginTop: 20,
            top: 50,
            position: 'relative'
        }, license: 'non-commercial', cellMatrixProps: generateCellMatrixProps(), disableRowSelection: true, cellTemplates: myCellTemplates, onDataChanged: dataChangeHandler }));
};
export var BudgetPlannerSample = function () {
    return (React.createElement(ReactGridContainer, { id: "budget-planner" },
        React.createElement(BudgetPlanner, { budgetData: BudgetPlannerDemoData.budgetData, dateRange: BudgetPlannerDemoData.dateRange })));
};
var templateObject_1;
