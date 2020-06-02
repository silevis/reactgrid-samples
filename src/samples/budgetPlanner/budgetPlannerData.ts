import { isString } from 'util';
import { CellChange } from '@silevis/reactgrid';
import { Value, Variable } from './interfaces';

export interface GroupAttribute {
  name: string,
  fieldName: string,
  children: GroupAttribute[] | null,
  values: any,
  variables: any
}

export const getAllVariablesType = (variables: Variable[]): any[] => {
  let groupOptions: any[] = [];
  variables && variables.forEach((variable: Variable) => {
    for (const key in variable) {
      const groupOption = {
        [key]: typeof variable[key]
      }
      groupOptions.push(groupOption);
    }
  })

  return groupOptions.filter((groupOption, index) => {
    const _groupOption = JSON.stringify(groupOption);
    return index === groupOptions.findIndex(obj => {
      return JSON.stringify(obj) === _groupOption;
    });
  });
}

export const getGroupByDisabledOptions = (valuesTypes: any[]): string[] => {
  let groupByDisabledOptions = [] as string[];
  valuesTypes.forEach((valuesType: any) => {
    for (const key in valuesType) {
      if (key === '_id' || key === 'span' /* || valuesType[key] !== 'string' */) {
        groupByDisabledOptions.push(key);
      }
    }
  })
  return groupByDisabledOptions;
}

export const getDisplayFieldsOptions = (valuesTypes: any[]): string[] => {
  let groupByDisabledOptions = [] as string[];
  valuesTypes.forEach((valuesType: any) => {
    for (const key in valuesType) {
      if (key === '_id' || key === 'span' || /* valuesType[key] === 'string' || */ valuesType[key] === 'object') {
        groupByDisabledOptions.push(key);
      }
    }
  })
  return groupByDisabledOptions;
}

/**
 * Function for values
 * Mapping from reactgrid to values value change
 */
export const updateValues = (changes: CellChange[], values: Value[]): Value[] => {
  changes.forEach((change: CellChange) => {
    let splittedRowId: string[] = [], splittedColumnDate: string[] = [];
    if (isString(change.rowId)) {
      // @ts-ignore
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