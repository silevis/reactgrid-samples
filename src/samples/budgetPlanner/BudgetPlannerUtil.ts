import { Column, Row, HeaderCell, GroupCell, NumberCell, Cell, TextCell, DateCell } from '@silevis/reactgrid';
import moment from 'moment';
import { isString, isNumber, isDate } from 'util';
import { DefaultCellTypes } from '@silevis/reactgrid/lib';
import { Value, Variable, GroupAttribute } from './interfaces';

export const getGroupsOptions = (variables: Variable[], disableGroupOptions: string[] = []): string[] => {
  let groupOptions: string[] = [];
  variables && variables.forEach((variable: Variable) => {
    groupOptions.push(...Object.keys(variable));
  })
  // returning groupOptions with removed duplicated keys
  return filterBlockedGroupsOptions(groupOptions.filter((x, i, a) => a.indexOf(x) === i), disableGroupOptions);
}

export const filterBlockedGroupsOptions = (groupOptions: string[], disableGroupOptions: string[]): string[] => {
  return groupOptions.filter((groupOption: string) => !disableGroupOptions.includes(groupOption));
}

export const getGroupNames = (key: string, values: Value[]): any[] => {
  const groupValues = values && values
    .map((value: Value) => value[key])
    .filter((x, i, a) => a.indexOf(x) === i && x !== undefined);
  return groupValues;
}

export const getGroupAttributes = (groups: string[], values: Value[], dates: Date[], span: string, groupAttributes: GroupAttribute[] | undefined = []): GroupAttribute[] => {
  if (groups.length === 0) groups.push('name');
  groups.forEach((group: string, key: number) => {
    const groupNames = getGroupNames(group, values);
    groupNames && groupNames.forEach((groupName: string) => {
      const groupAttributeLength = groupAttributes.push(
        {
          name: groupName,
          fieldName: group,
          children: [] as GroupAttribute[]
        } as GroupAttribute
      )
      if (groups[key + 1]) {
        getGroupAttributes(groups.slice(1), values, dates, span, groupAttributes[groupAttributeLength - 1].children as GroupAttribute[])
      } else {
        groupAttributes[groupAttributeLength - 1].children = undefined
      }
    })
    groups.splice(0, groups.length - 1)
  })

  return groupAttributes;
}

export const getGridColumns = (dates: Date[], span: string, columnsData: Column[] = []): Column[] => {
  if (columnsData.length === 0) {
    columnsData = [{
      columnId: 0,
      resizable: true,
      width: 180,
    }];
  }
  dates && dates.forEach((date: Date) => {
    const cellText = getFormattedDate(date, span);
    columnsData.push({
      columnId: cellText,
      resizable: true,
      width: 180,
    });
  });
  return columnsData;
}

export const getHeaderRows = (dates: Date[], span: string, row?: Row): Row => {
  let cells: Array<DefaultCellTypes> = [];
  if (!row) row = { rowId: 'header' as string, cells: [] as Array<any> };
  if (row.cells.length === 0) {
    cells.push(
      ({
        type: 'header',
        text: 'Group by',
        className: 'nevy-blue-header',
      } as HeaderCell)
    );
    row.cells.push(...cells);
    cells = [];
  }
  dates && dates.forEach((date: Date) => {
    let cellText = getFormattedDate(date, span);
    cells.push(
      ({
        type: 'header',
        text: cellText,
        className: 'nevy-blue-header',
      } as HeaderCell)
    )
  });
  row.cells.push(...cells);

  return row;
}

export const getGridRows = (dates: Date[], data: GroupAttribute[], displayFields: string[], rows?: Row[] | undefined, parentId?: string | undefined): Row[] => {
  if (rows === undefined) rows = [] as Row[]
  data && data.forEach((groupAttribute: GroupAttribute) => {
    let rowId = groupAttribute.name;
    if (parentId) rowId += parentId
    if (groupAttribute.children && groupAttribute.children.length > 0) {
      let row = { rowId: rowId as string, cells: [] as Array<any> };
      let cells: Array<Cell> = [];
      cells.push(
        ({
          type: 'group',
          text: groupAttribute.name.toString(),
          className: 'nevy-blue-header',
          isExpanded: true,
          parentId: parentId
        } as GroupCell)
      )
      for (const key in groupAttribute.values) {
        dates.forEach((date: Date, keyDate: number) => {
          cells.push(
            createCell(0, 'grey-header')
          )
        });
      }
      row.cells.push(...cells);
      if (rows) rows.push(row);
      // @ts-ignore
      rows = getGridRows(dates, groupAttribute.children, displayFields, [...rows], rowId);
    } else {
      let row = { rowId: rowId as string, cells: [] as Array<any> };
      let cells: Array<Cell> = [];
      cells.push(
        ({
          type: 'group',
          text: groupAttribute.name.toString(),
          isExpanded: true,
          parentId: parentId,
          className: 'nevy-blue-header',
        } as GroupCell)
      )
      for (const key in groupAttribute.values) {
        dates.forEach((date: Date, keyDate: number) => {
          cells.push(
            createCell(groupAttribute.values[key], 'grey-header')
          )
        })
      }
      row.cells.push(...cells);
      const parentRow: Row = row;
      let groupRows: Row[] = [];
      groupAttribute.variables.forEach((variable: Variable[]) => {
        for (let key in displayFields) {
          const rowValueId = variable[0]._id;
          // first number is row number in rowId - required for uniq rowId
          let row = { rowId: rowValueId as string, cells: [] as Array<any> };
          let cells: Array<Cell> = [];
          cells.push(
            ({
              type: 'group',
              parentId: rowId,
              text: displayFields[key],
              className: 'nevy-blue-header',
            } as GroupCell)
          );
          variable && variable.forEach((value: Value) => {
            dates && dates.forEach((date: Date, keyDate: number) => {
              cells.push(
                createCell(0)
              );
            });
          });
          row.cells.push(...cells)
          //@ts-ignore
          groupRows.push(row);
        }
      });
      if (rows && groupRows.length > 0) {
        rows.push(parentRow);
        rows.push(...groupRows);
      }
    }
  });
  return rows;
}

export const createCell = (value: any, className?: string): Cell => {
  let cell: Cell;
  if (isNumber(value)) {
    cell = ({
      type: 'number',
      value: value,
      className: className,
    } as NumberCell);
  } else if (isString(value)) {
    cell = ({
      type: 'text',
      text: value,
      className: className,
    } as TextCell);
  } else if (isDate(value)) {
    cell = ({
      type: 'date',
      date: value,
      className: className,
    } as DateCell);
  } else {
    cell = ({
      type: 'text',
      text: value.toString(),
      className: className,
    } as TextCell);
  }
  return cell;
}

export const getFormattedDate = (date: Date, span: string): string => {
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
}