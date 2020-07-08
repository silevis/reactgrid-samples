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
  width: 450px;
  overflow: scroll;
`;

interface StickyState {
  columns: Column[]
  rows: ReturnType<typeof crmRows>,
  stickyTopRows?: number,
  stickyBottomRows?: number,
  stickyLeftColumns?: number,
  stickyRightColumns?: number,
}

export const StickySample: React.FunctionComponent = () => {

  const [state, setState] = React.useState<StickyState>(() => ({
    columns: [...crmColumns(true, false)],
    rows: [...crmRows(true)],
    stickyTopRows: 1,
    stickyLeftColumns: 1,
    stickyRightColumns: 1,
    stickyBottomRows: undefined
  }))

  const handleChanges = (changes: CellChange[]) => {
    let newState = { ...state };
    changes.forEach((change: any) => {
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

  const handleColumnsReordered = (targetColumnId: Id, columnIds: Id[], dropPosition: DropPosition) => {
    const to = state.columns.findIndex((column: Column) => column.columnId === targetColumnId);
    const columnIdxs = columnIds.map((id: Id, idx: number) => state.columns.findIndex((c: Column) => c.columnId === id));
    setState({
      ...state,
      columns: reorderArray(state.columns, columnIdxs, to),
      rows: state.rows.map(row => ({ ...row, cells: reorderArray(row.cells, columnIdxs, to) })),
    });
  }

  const handleCanReorderColumns = (targetColumnId: Id, columnIds: Id[], dropPosition: DropPosition): boolean => {
    return true;
  }

  return (
    <ReactGridContainer id="sticky-sample">
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
        canReorderColumns={handleCanReorderColumns}
        onColumnsReordered={handleColumnsReordered}
        enableColumnSelection
        enableRowSelection
        enableFillHandle
        enableRangeSelection
      />
    </ReactGridContainer>
  )
}
