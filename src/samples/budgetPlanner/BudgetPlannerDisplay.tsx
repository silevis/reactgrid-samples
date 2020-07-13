import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { getGroupAttributes, getGridRows, getGridColumns, getHeaderRows } from './BudgetPlannerUtil';
import { getVariableModel } from './budgetPlannerVariables';
import { ReactGrid, CellChange, Column, Row, GroupCell, Cell, Id, DefaultCellTypes } from '@silevis/reactgrid';
import { initializeIcons, Dropdown } from 'office-ui-fabric-react';
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
  const { variables, dates, span } = props

  const [groupByItemsFields, setGroupByItemsField] = useState(["job position", "name", "project"]);
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
    return rows.filter(row => !!row.cells.find(cell => cell.type === 'group' && cell.parentId === parentRow.rowId));
  }

  const getParentRow = (rows: Row[], row: Row): Row | undefined => rows.find(r => r.rowId === getGroupCell(row).parentId);

  const assignIndentAndHasChildren = (allRows: Row[], parentRow: Row, indent: number) => {
    ++indent;
    getDirectChildrenRows(allRows, parentRow).forEach(row => {
      const groupCell = getGroupCell(row);
      groupCell.indent = indent;
      const hasRowChildrens = hasChildren(allRows, row);
      groupCell.hasChildren = hasRowChildrens;
      if (hasRowChildrens) assignIndentAndHasChildren(allRows, row, indent);
    });
  };

  const createIndents = (rows: Row[]): Row[] => {
    return rows.map(row => {
      const groupCell: GroupCell = getGroupCell(row);
      if (groupCell.parentId === undefined) {
        const hasRowChildrens = hasChildren(rows, row);
        groupCell.hasChildren = hasRowChildrens;
        if (hasRowChildrens) assignIndentAndHasChildren(rows, row, 0);
      }
      return row;
    });
  };


  const handleChanges = (changes: CellChange[]) => {
    const newState = { ...state };
    changes.forEach((change: CellChange) => {
      const changeRowIdx = newState.rows.findIndex((el: Row) => el.rowId === change.rowId);
      const changeColumnIdx = newState.columns.findIndex((el: Column) => el.columnId === change.columnId);
      if (change.type === 'group') {
        newState.rows[changeRowIdx].cells[changeColumnIdx] = { ...change.newCell, text: change.initialCell.text };
      } else {
        newState.rows[changeRowIdx].cells[changeColumnIdx] = change.newCell;
      }
    });

    if (changes[0].initialCell.type === 'group') {
      const rowsToRender: Row<DefaultCellTypes>[] = [getHeaderRows(state.dates, span), ...getExpandedRows(newState.rows)]
      setRowsToRender(rowsToRender);
    }
    setState({ ...state, rows: createIndents(newState.rows) });
  };

  const updateTable = (): void => {

    const groupAttributes = getGroupAttributes([...groupByItemsFields], variables, dates, span, []);
    let columns: Column[] = getGridColumns(dates, span);
    const data = getVariableModel(groupAttributes, dates, span, variables);
    let rows: Row[] = [...getGridRows(dates, data, displayFields)];
    rows = createIndents(rows);
    setRowsToRender([getHeaderRows(dates, span), ...getExpandedRows(rows)]);
    setState({
      ...state, rows: rows, columns: columns, dates: dates
    });
  }

  useEffect(() => {
    updateTable()
  }, [groupByItemsFields, setGroupByItemsField, dates]);


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
      <h3>
        Variables Options
      </h3>
      <div className="budget-planning-header">
        <Dropdown
          placeholder="Select options"
          label="Group by"
          selectedKeys={groupByItemsFields}
          onChange={(_, item) => item && setGroupByItemsField(item.selected ? [...groupByItemsFields, item.key as string] : groupByItemsFields.filter(key => key !== item.key))}
          multiSelect
          options={groupByItems.map((dropdownOption: string) => ({ key: dropdownOption, text: dropdownOption }))}
          styles={{ dropdown: { width: 300 } }}
        />
      </div>
      <div className="budget-planning-react-grid">
        {state.columns && rowsToRender && <ReactGrid
          rows={rowsToRender}
          columns={state.columns}
          onCellsChanged={handleChanges}
          onColumnResized={handleColumnResize}
          enableFillHandle
          enableRangeSelection
          stickyLeftColumns={1}
          stickyTopRows={1}
        />}
      </div>
    </>
  )
}

export default BudgetPlannerDisplay;