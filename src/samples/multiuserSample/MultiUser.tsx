import * as React from 'react';
import styled from 'styled-components';
import { ReactGrid, Column, CellChange, Id, DropPosition } from '@silevis/reactgrid';
import { DropdownNumberCellTemplate } from '../../cell-templates/dropdownNumberCell/DropdownNumberCellTemplate';
import { FlagCellTemplate } from '../../cell-templates/flagCell/FlagCellTemplate';
import { RateCellTemplate } from '../../cell-templates/rateCell/RateCellTemplate';
import { columns as crmColumns } from '../../data/crm/columns';
import { rows as crmRows } from '../../data/crm/rows';
import './styling.scss';

const ReactGridContainer = styled.div`
  height: 300px;
  width: 650px;
  overflow: scroll;
`;

interface MultiUserState {
  columns: Column[];
  rows: ReturnType<typeof crmRows>;
  stickyTopRows?: number;
  stickyBottomRows?: number;
  stickyLeftColumns?: number;
  stickyRightColumns?: number;
}

export const MultiUserSample: React.FC = () => {

  const [state, setState] = React.useState<MultiUserState>(() => ({
    columns: [...crmColumns(true, false)],
    rows: [...crmRows(true)],
    stickyTopRows: 1,
    stickyLeftColumns: 1,
    stickyRightColumns: 1,
    stickyBottomRows: undefined
  }))

  const handleChanges = (changes: CellChange[]) => {
    const newState = { ...state };
    changes.forEach(change => {
      const changeRowIdx = newState.rows.findIndex(el => el.rowId === change.rowId);
      const changeColumnIdx = newState.columns.findIndex(el => el.columnId === change.columnId);
      newState.rows[changeRowIdx].cells[changeColumnIdx] = change.newCell;
    })
    setState(newState);
  }

  const reorderArray = <T extends {}>(arr: T[], idxs: number[], to: number) => {
    const movedElements: T[] = arr.filter((_: T, idx: number) => idxs.includes(idx));
    to = Math.min(...idxs) < to ? to += 1 : to -= idxs.filter(idx => idx < to).length;
    const leftSide: T[] = arr.filter((_: T, idx: number) => idx < to && !idxs.includes(idx));
    const rightSide: T[] = arr.filter((_: T, idx: number) => idx >= to && !idxs.includes(idx));
    return [...leftSide, ...movedElements, ...rightSide];
  }

  const handleRowsReorder = (targetRowId: Id, rowIds: Id[], dropPosition: DropPosition) => {
    const newState = { ...state };
    const to = state.rows.findIndex(row => row.rowId === targetRowId);
    const ids = rowIds.map(id => state.rows.findIndex(r => r.rowId === id));
    setState({ ...newState, rows: reorderArray(state.rows, ids, to) });
  }

  const handleCanReorderRows = (targetColumnId: Id, columnIds: Id[], dropPosition: DropPosition): boolean => {
    return true;
  }

  return (
    <ReactGridContainer id="multiuser-sample">
      <ReactGrid
        rows={state.rows}
        columns={state.columns}
        customCellTemplates={{
          'rate': new RateCellTemplate,
          'flag': new FlagCellTemplate,
          'dropdownNumber': new DropdownNumberCellTemplate,
        }}
        stickyTopRows={state.stickyTopRows}
        stickyBottomRows={state.stickyBottomRows}
        stickyLeftColumns={state.stickyLeftColumns}
        stickyRightColumns={state.stickyRightColumns}
        onCellsChanged={handleChanges}
        canReorderRows={handleCanReorderRows}
        onRowsReordered={handleRowsReorder}
        enableColumnSelection
        enableRowSelection
        enableFillHandle
        enableRangeSelection
      />
    </ReactGridContainer>
  )
}
