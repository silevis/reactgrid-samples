import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { getGroupAttributes, getGridRows, getGridColumns, getHeaderRows } from './BudgetPlannerUtil';
import { updateValues } from './budgetPlannerData';
import { getVariableModel } from './budgetPlannerVariables';
import { ReactGrid, CellChange, Column, Row, GroupCell, Cell, Id } from '@silevis/reactgrid';
import { Dropdown, } from 'office-ui-fabric-react/lib/Dropdown';
import { initializeIcons } from 'office-ui-fabric-react/lib/Icons';
import { GroupGridStateData, Value } from './interfaces';
import { Variable } from './models';
initializeIcons();

export interface BudgetPlannerDisplayProps {
  values: Value[],
  variables: Variable[],
  dates: Date[],
  span: string,
}

export const BudgetPlannerDisplay: React.FunctionComponent<BudgetPlannerDisplayProps> = (props) => {

  const { values, variables, dates, span } = props

  const [groupByItemsFilds, setGroupByItemsFild] = useState<string[]>([]);
  const [rowsToRender, setRowsToRender] = useState<Row[]>();
  const [state, setState] = useState<GroupGridStateData>({} as GroupGridStateData);

  const displayFields = ['value'];
  const groupByItems = Object.keys(variables.reduce((result, obj) => Object.assign(result, obj), {})).filter(it => it !== '_id')

  const getGroupCell = (row: Row): GroupCell => row.cells.find((cell: Cell) => cell.type === 'group') as GroupCell;

  const hasChildren = (rows: Row[], row: Row): boolean => {
    return rows.some((r: Row) => getGroupCell(r).parentId === row.rowId);
  }
  const isRowFullyExpanded = (rows: Row[], row: Row): boolean => {
    const parentRow = getParentRow(rows, row);
    if (parentRow) {
      if (!getGroupCell(parentRow).isExpanded) return false;
      return isRowFullyExpanded(rows, parentRow);
    }
    return true;
  };

  const getExpandedRows = (rows: Row[]): Row[] => {
    return rows.filter((row: Row) => {
      const areAllParentsExpanded = isRowFullyExpanded(rows, row);
      return areAllParentsExpanded !== undefined ? areAllParentsExpanded : true;
    });
  };

  const getDirectChildrenRows = (rows: Row[], parentRow: Row): Row[] => {
    return rows.filter((row: Row) => !!row.cells.find((cell: Cell) => cell.type === 'group' && (cell as GroupCell).parentId === parentRow.rowId));
  }

  const getParentRow = (rows: Row[], row: Row): Row | undefined => {
    return rows.find((r: Row) => r.rowId === getGroupCell(row).parentId);
  }

  const assignIndentAndHasChildrens = (allRows: Row[], parentRow: Row, indent: number) => {
    ++indent;
    getDirectChildrenRows(allRows, parentRow).forEach((row: Row) => {
      const groupCell = getGroupCell(row);
      groupCell.indent = indent;
      const hasRowChildrens = hasChildren(allRows, row);
      groupCell.hasChildrens = hasRowChildrens;
      if (hasRowChildrens) assignIndentAndHasChildrens(allRows, row, indent);
    });
  };

  const createIndents = (rows: Row[]): Row[] => {
    return rows.map((row: Row) => {
      const groupCell: GroupCell = getGroupCell(row);
      if (groupCell.parentId === undefined) {
        const hasRowChildrens = hasChildren(rows, row);
        groupCell.hasChildrens = hasRowChildrens;
        if (hasRowChildrens) assignIndentAndHasChildrens(rows, row, 0);
      }
      return row;
    });
  };

  const handleChanges = (changes: CellChange[]) => {
    if (changes[0].initialCell.type === 'group') {
      const newState = { ...state };
      changes.forEach((change: CellChange) => {
        const changeRowIdx = newState.rows.findIndex((el: Row) => el.rowId === change.rowId);
        const changeColumnIdx = newState.columns.findIndex((el: Column) => el.columnId === change.columnId);
        newState.rows[changeRowIdx].cells[changeColumnIdx] = change.newCell;
      });
      setState({ ...state, rows: createIndents(newState.rows) });
      setRowsToRender([getHeaderRows(state.dates, span), ...getExpandedRows(newState.rows)]);
    } else {
      updateValues(changes, values);
      updateTable()
    }
    return true;
  };

  const updateTable = (): void => {
    const groupAttributes: Array<any> = getGroupAttributes([...groupByItemsFilds], variables, dates, span, []);
    console.log()
    let columns: Column[] = getGridColumns([...groupByItemsFilds], variables, dates, span, getVariableModel(getGroupAttributes([...groupByItemsFilds], variables, state.dates, span, []), state.dates, span, variables), displayFields);
    const data = getVariableModel(groupAttributes, dates, span, variables);
    let rows: Row[] = [...getGridRows(dates, data, displayFields)];
    rows = createIndents(rows);
    setRowsToRender([getHeaderRows(dates, span, getVariableModel(getGroupAttributes([...groupByItemsFilds], variables, dates, span, []),
      state.dates, span, variables), displayFields), ...getExpandedRows(rows)]);

    setState({
      ...state, rows: rows, columns: columns, dates: dates
    });
  }

  useEffect(() => {
    updateTable()
  }, [groupByItemsFilds, setGroupByItemsFild, dates]);


  const handleColumnResize = (ci: Id, width: number) => {
    let newState = { ...state }
    const columnIndex = newState.columns.findIndex((el: Column) => el.columnId === ci)
    const resizedColumn: Column = newState.columns[columnIndex]
    const updateColumn: Column = { ...resizedColumn, width }
    newState.columns[columnIndex] = updateColumn
    setState(newState)
  }


  return (
    <>
      <div className="budget-planning-container">
        <h3>
          Variables Options
        </h3>
      </div>
      <div className="budget-planning-container">
        <div className="budget-planning-header">
          <Dropdown
            placeholder="Select options"
            label="Group by"
            selectedKeys={groupByItemsFilds}
            onChange={(_, item) => item && setGroupByItemsFild(item.selected ? [...groupByItemsFilds, item.key as string] : groupByItemsFilds.filter(key => key !== item.key))}
            multiSelect
            options={groupByItems.map((dropdownOption: string) => ({ key: dropdownOption, text: dropdownOption }))}
            styles={{ dropdown: { width: 300 } }}
          />
        </div>
      </div>
      <div className="budget-planning-container">
        <div className="budget-planning-react-grid">
          {state.columns && rowsToRender && <ReactGrid
            rows={rowsToRender}
            columns={state.columns}
            onCellsChanged={handleChanges}
            onColumnResized={handleColumnResize}
            stickyLeftColumns={1}
            stickyTopRows={1}
          />}
        </div>
      </div>
    </>
  )
}

export default BudgetPlannerDisplay;