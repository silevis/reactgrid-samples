import moment from 'moment';
import { getDefaultValues } from './budgetPlannerValues';
import { isString } from 'util';
export var getVariableModel = function (groupAttributes, dates, span, variables) {
    groupAttributes.forEach(function (groupAttribute) {
        var variablesChildren = variables.filter(function (variable) { return (groupAttribute.name === variable[groupAttribute.fieldName]) ||
            (groupAttribute.name === moment(variable.date).format('MM-YYYY')); });
        if (groupAttribute.children && groupAttribute.children.length > 0) {
            groupAttribute.values = getDefaultValues([], dates, span);
            groupAttribute = getVariableModel(groupAttribute.children, dates, span, variablesChildren);
        }
        else {
            groupAttribute.values = getDefaultValues([], dates, span);
            groupAttribute.variables = Object.keys(groupBy(variablesChildren, 'name')).map(function (key) { return (groupBy(variablesChildren, 'name')[key]); });
        }
    });
    return groupAttributes;
};
export var updateValues = function (changes, values) {
    changes.forEach(function (change) {
        var splittedRowId = [], splittedColumnDate = [];
        if (isString(change.rowId)) {
            splittedRowId = change.rowId.split('-');
        }
        if (isString(change.columnId)) {
            splittedColumnDate = change.columnId.split('-');
        }
        var ValueIndex = values.findIndex(function (value) { return value.name.toString() === splittedRowId[0].toString() && value.date.toUTCString() === new Date(parseInt(splittedColumnDate[1]), parseInt(splittedColumnDate[0]) - 1).toUTCString(); });
        if (ValueIndex >= 0 && splittedRowId.length >= 2 && splittedColumnDate.length >= 2) {
            values[ValueIndex][splittedRowId[1]] = change.newCell.value;
        }
    });
    return values;
};
export var groupBy = function (array, key) {
    return array.reduce(function (objectsByKeyValue, obj) {
        var value = obj[key];
        objectsByKeyValue[value] = (objectsByKeyValue[value] || []).concat(obj);
        return objectsByKeyValue;
    }, {});
};
