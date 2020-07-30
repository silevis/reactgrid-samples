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
import moment from 'moment';
import { isString, isNumber, isDate } from 'util';
export var getGroupsOptions = function (variables, disableGroupOptions) {
    if (disableGroupOptions === void 0) { disableGroupOptions = []; }
    var groupOptions = [];
    variables && variables.forEach(function (variable) {
        groupOptions.push.apply(groupOptions, __spread(Object.keys(variable)));
    });
    return filterBlockedGroupsOptions(groupOptions.filter(function (x, i, a) { return a.indexOf(x) === i; }), disableGroupOptions);
};
export var filterBlockedGroupsOptions = function (groupOptions, disableGroupOptions) {
    return groupOptions.filter(function (groupOption) { return !disableGroupOptions.includes(groupOption); });
};
export var getGroupNames = function (key, values) {
    var groupValues = values && values
        .map(function (value) { return value[key]; })
        .filter(function (x, i, a) { return a.indexOf(x) === i && x !== undefined; });
    return groupValues;
};
export var getGroupAttributes = function (groups, values, dates, span, groupAttributes) {
    if (groupAttributes === void 0) { groupAttributes = []; }
    if (groups.length === 0)
        groups.push('name');
    groups.forEach(function (group, key) {
        var groupNames = getGroupNames(group, values);
        groupNames && groupNames.forEach(function (groupName) {
            var groupAttributeLength = groupAttributes.push({
                name: groupName,
                fieldName: group,
                children: []
            });
            if (groups[key + 1]) {
                getGroupAttributes(groups.slice(1), values, dates, span, groupAttributes[groupAttributeLength - 1].children);
            }
            else {
                groupAttributes[groupAttributeLength - 1].children = undefined;
            }
        });
        groups.splice(0, groups.length - 1);
    });
    return groupAttributes;
};
export var getGridColumns = function (dates, span, columnsData) {
    if (columnsData === void 0) { columnsData = []; }
    if (columnsData.length === 0) {
        columnsData = [{
                columnId: 0,
                resizable: true,
                width: 180,
            }];
    }
    dates && dates.forEach(function (date) {
        var cellText = getFormattedDate(date, span);
        columnsData.push({
            columnId: cellText,
            resizable: true,
            width: 180,
        });
    });
    return columnsData;
};
export var getHeaderRows = function (dates, span, row) {
    var _a, _b;
    var cells = [];
    if (!row)
        row = { rowId: 'header', cells: [] };
    if (row.cells.length === 0) {
        cells.push(({
            type: 'header',
            text: 'Group by',
            className: 'nevy-blue-header',
        }));
        (_a = row.cells).push.apply(_a, __spread(cells));
        cells = [];
    }
    dates && dates.forEach(function (date) {
        var cellText = getFormattedDate(date, span);
        cells.push(({
            type: 'header',
            text: cellText,
            className: 'nevy-blue-header',
        }));
    });
    (_b = row.cells).push.apply(_b, __spread(cells));
    return row;
};
export var getGridRows = function (dates, data, displayFields, rows, parentId) {
    if (rows === undefined)
        rows = [];
    data && data.forEach(function (groupAttribute) {
        var _a, _b;
        var rowId = groupAttribute.name;
        if (parentId)
            rowId += parentId;
        if (groupAttribute.children && groupAttribute.children.length > 0) {
            var row = { rowId: rowId, cells: [] };
            var cells_1 = [];
            cells_1.push({
                type: 'group',
                text: groupAttribute.name.toString(),
                className: 'nevy-blue-header',
                isExpanded: true,
                parentId: parentId
            });
            for (var key in groupAttribute.values) {
                dates.forEach(function (date, keyDate) {
                    cells_1.push(createCell(0, 'grey-header'));
                });
            }
            (_a = row.cells).push.apply(_a, __spread(cells_1));
            if (rows)
                rows.push(row);
            rows = getGridRows(dates, groupAttribute.children, displayFields, __spread(rows), rowId);
        }
        else {
            var row = { rowId: rowId, cells: [] };
            var cells_2 = [];
            cells_2.push({
                type: 'group',
                text: groupAttribute.name.toString(),
                isExpanded: true,
                parentId: parentId,
                className: 'nevy-blue-header',
            });
            var _loop_1 = function (key) {
                dates.forEach(function (date, keyDate) {
                    cells_2.push(createCell(groupAttribute.values[key], 'grey-header'));
                });
            };
            for (var key in groupAttribute.values) {
                _loop_1(key);
            }
            (_b = row.cells).push.apply(_b, __spread(cells_2));
            var parentRow = row;
            var groupRows_1 = [];
            groupAttribute.variables.forEach(function (variable) {
                var _loop_2 = function (key) {
                    var _a;
                    var rowValueId = variable[0]._id;
                    var row_1 = { rowId: rowValueId, cells: [] };
                    var cells_3 = [];
                    cells_3.push({
                        type: 'group',
                        parentId: rowId,
                        text: displayFields[key],
                        className: 'nevy-blue-header',
                    });
                    variable && variable.forEach(function (value) {
                        dates && dates.forEach(function (date, keyDate) {
                            cells_3.push(createCell(0));
                        });
                    });
                    (_a = row_1.cells).push.apply(_a, __spread(cells_3));
                    groupRows_1.push(row_1);
                };
                for (var key in displayFields) {
                    _loop_2(key);
                }
            });
            if (rows && groupRows_1.length > 0) {
                rows.push(parentRow);
                rows.push.apply(rows, __spread(groupRows_1));
            }
        }
    });
    return rows;
};
export var createCell = function (value, className) {
    var cell;
    if (isNumber(value)) {
        cell = {
            type: 'number',
            value: value,
            className: className,
        };
    }
    else if (isString(value)) {
        cell = {
            type: 'text',
            text: value,
            className: className,
        };
    }
    else if (isDate(value)) {
        cell = {
            type: 'date',
            date: value,
            className: className,
        };
    }
    else {
        cell = {
            type: 'text',
            text: value.toString(),
            className: className,
        };
    }
    return cell;
};
export var getFormattedDate = function (date, span) {
    switch (span) {
        case 'year':
            return moment(date).format('YYYY');
        case 'month':
            return moment(date).format('MM-YYYY');
        case 'day':
            return moment(date).format('DD-MM-YYYY');
        default:
            return moment(date).format('MM-YYYY');
    }
};
