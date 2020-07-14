import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { ReactGrid, Column, CellChange, Id, DropPosition } from '@silevis/reactgrid';
import { DropdownNumberCellTemplate } from '../../cell-templates/dropdownNumberCell/DropdownNumberCellTemplate';
import { FlagCellTemplate } from '../../cell-templates/flagCell/FlagCellTemplate';
import { RateCellTemplate } from '../../cell-templates/rateCell/RateCellTemplate';
import { columns as crmColumns } from '../../data/crm/columns';
import { rows as crmRows } from '../../data/crm/rows';
import './styling.scss';
import { VirtualEnv, VirtualEnvCellChange, IMultiUserState } from './VirtualEnv';

const ReactGridContainer = styled.div`
  height: 300px;
  width: 650px;
  overflow: scroll;
`;

export const MultiUserSample: React.FC = () => {

  const [state, setState] = useState<IMultiUserState>(() => ({
    columns: [...crmColumns(true, false)],
    rows: [...crmRows(true)],
    stickyTopRows: 1,
    stickyLeftColumns: 1,
    highlights: []
  }))

  const [virtualEnv, setVirtualEnv] = useState(() => {
    return new VirtualEnv(handleChanges)
  });

  /* useEffect(() => {
    const interval = setInterval(() => {
      setState(virtualEnv.updateView(state))
    }, 1000);
    return () => {
      clearInterval(interval)
    };
  }, []); */

  const handleChanges = (changes: VirtualEnvCellChange[]) => {
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
        stickyLeftColumns={state.stickyLeftColumns}
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
