import * as React from 'react';
import styled from 'styled-components';
import { ReactGrid, Column, CellChange, SelectionMode, MenuOption, Id, Cell } from '@silevis/reactgrid';
import { DropdownNumberCellTemplate } from '../../cell-templates/dropdownNumberCell/DropdownNumberCellTemplate';
import { FlagCellTemplate } from '../../cell-templates/flagCell/FlagCellTemplate';
import { RateCellTemplate } from '../../cell-templates/rateCell/RateCellTemplate';
import { columns as crmColumns } from '../../data/crm/columns';
import { rows as crmRows } from '../../data/crm/rows';
import './styling.scss';

const ReactGridContainer = styled.div`
  position: relative;
  min-height: 400px;
`;

interface ContextMenuState {
  columns: Column[]
  rows: ReturnType<typeof crmRows>,
}

export const ContextMenuSample: React.FunctionComponent = () => {

  const [state, setState] = React.useState<ContextMenuState>(() => ({
    columns: [...crmColumns(true, false)],
    rows: [...crmRows(true)],
  }))

  const handleChanges = (changes: CellChange[]) => {
    const newState = { ...state };
    changes.forEach((change) => {
      const changeRowIdx = newState.rows.findIndex(el => el.rowId === change.rowId);
      const changeColumnIdx = newState.columns.findIndex(el => el.columnId === change.columnId);
      newState.rows[changeRowIdx].cells[changeColumnIdx] = change.newCell;
    })
    setState(newState);
  }

  const handleContextMenu = (selectedRowIds: Id[], selectedColIds: Id[], selectionMode: SelectionMode, menuOptions: MenuOption[]): MenuOption[] => {
    if (selectionMode === 'row') {
      menuOptions = [
        ...menuOptions,
        {
          id: 'removeRow', label: 'Remove row', handler: () => {
            setState({ ...state, rows: state.rows.filter(row => !selectedRowIds.includes(row.rowId)) });
          }
        },
      ]
    }
    if (selectionMode === 'column') {
      menuOptions = [
        ...menuOptions,
        {
          id: 'removeColumn', label: 'Remove column', handler: () => {
            const columns: Column[] = state.columns.filter((column: Column) => !selectedColIds.includes(column.columnId));
            const columnsIdxs = state.columns.map((column: Column, idx: number) => {
              if (!columns.includes(column)) return idx;
              return undefined;
            }).filter(idx => idx !== undefined);
            const rows = state.rows.map(row => ({ ...row, cells: row.cells.filter((_: Cell, idx: number) => !columnsIdxs.includes(idx)) }));
            setState({ ...state, columns, rows });
          }
        },
      ]
    }
    return menuOptions;
  }

  return (
    <>
      <ReactGridContainer id="context-menu-sample">
        <ReactGrid
          rows={state.rows}
          columns={state.columns}
          customCellTemplates={{
            'rate': new RateCellTemplate(),
            'flag': new FlagCellTemplate(),
            'dropdownNumber': new DropdownNumberCellTemplate(),
          }}
          onContextMenu={handleContextMenu}
          onCellsChanged={handleChanges}
          enableColumnSelection
          enableRowSelection
          enableFillHandle
          enableRangeSelection
        />
      </ReactGridContainer>
    </>
  )
}
