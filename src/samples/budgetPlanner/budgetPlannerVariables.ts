import moment from 'moment';
import { getDefaultValues } from './budgetPlannerValues';
import { Value, GroupAttribute } from './interfaces';
import { CellChange } from '@silevis/reactgrid';
import { Variable } from './models';
import { isString } from 'util';

export const getVariableModel = (groupAttributes: any, dates: Date[], span: string, variables: Variable[]): any => {
  groupAttributes.forEach((groupAttribute: GroupAttribute) => {
    // @ts-ignore
    const variablesChildren = variables.filter((variable: Variable) => (groupAttribute.name === variable[groupAttribute.fieldName]) ||
      (groupAttribute.name === moment(variable.date).format('MM-YYYY')));
    if (groupAttribute.children && groupAttribute.children.length > 0) {
      groupAttribute.values = getDefaultValues([] as Value[], dates, span);
      groupAttribute = getVariableModel(groupAttribute.children, dates, span, variablesChildren);
    } else {
      groupAttribute.values = getDefaultValues([] as Value[], dates, span);
      groupAttribute.variables = Object.keys(groupBy(variablesChildren, 'name')).map(key => (groupBy(variablesChildren, 'name')[key]));

    }
  })
  return groupAttributes;
}

export const updateValues = (changes: CellChange[], values: Value[]): Value[] => {
  changes.forEach((change: CellChange) => {
    let splittedRowId: string[] = [], splittedColumnDate: string[] = [];
    if (isString(change.rowId)) {
      splittedRowId = change.rowId.split('-');
    }
    if (isString(change.columnId)) {
      // @ts-ignore
      splittedColumnDate = change.columnId.split('-');
    }

    // @ts-ignore
    const ValueIndex: number = values.findIndex((value: Value) => value.name.toString() === splittedRowId[0].toString() && value.date.toUTCString() === new Date(parseInt(splittedColumnDate[1]), parseInt(splittedColumnDate[0]) - 1).toUTCString());
    if (ValueIndex >= 0 && splittedRowId.length >= 2 && splittedColumnDate.length >= 2) {
      // @ts-ignore
      values[ValueIndex][splittedRowId[1]] = change.newCell.value;
    }
  });
  return values;
}

export const groupBy = <T extends { [x in K]: keyof any }, K extends keyof T>(array: T[], key: K): Record<T[K], T[]> => {
  return array.reduce(
    (objectsByKeyValue, obj) => {
      const value = obj[key];
      objectsByKeyValue[value] = (objectsByKeyValue[value] || []).concat(obj);
      return objectsByKeyValue;
    },
    {} as Record<T[K], T[]>
  );
};