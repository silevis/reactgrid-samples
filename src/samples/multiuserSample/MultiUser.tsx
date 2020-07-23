import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { ReactGrid, DefaultCellTypes, CellChange, Id, DropPosition } from '@silevis/reactgrid';
import { DropdownNumberCellTemplate, DropdownNumberCell } from '../../cell-templates/dropdownNumberCell/DropdownNumberCellTemplate';
import { FlagCellTemplate, FlagCell } from '../../cell-templates/flagCell/FlagCellTemplate';
import { RateCellTemplate } from '../../cell-templates/rateCell/RateCellTemplate';
import { columns as crmColumns } from '../../data/crm/columns';
import { rows as crmRows } from '../../data/crm/rows';
import './styling.scss';
import { VirtualEnv, IMultiUserState } from './VirtualEnv';
import { VirtualUser } from './VirtualUser';
import useInterval from '@use-it/interval';


const ReactGridContainer = styled.div`
  overflow: scroll;
`;

export type VirtualEnvCellChange = CellChange<DefaultCellTypes | FlagCell | DropdownNumberCell>;

export const MultiUserSample: React.FC = () => {

  const [state, setState] = useState<IMultiUserState>(() => ({
    columns: [...crmColumns(true, false)],
    rows: [...crmRows(true)],
    stickyTopRows: 1,
    stickyLeftColumns: 0,
    highlights: []
  }));

  const handleChanges = (changes: VirtualEnvCellChange[]) => {
    const newState = { ...state };
    changes.forEach(change => {
      const changeRowIdx = newState.rows.findIndex(el => el.rowId === change.rowId);
      const changeColumnIdx = newState.columns.findIndex(el => el.columnId === change.columnId);
      newState.rows[changeRowIdx].cells[changeColumnIdx] = change.newCell;
    })
    setState(newState);
  }

  const [virtualEnv, setVirtualEnv] = useState(() => new VirtualEnv());

  useEffect(() => {
    virtualEnv
      .addUser(new VirtualUser('darkolivegreen'))
      .addUser(new VirtualUser('mediumpurple'))
      // .addUser(new VirtualUser('blueviolet'))
      // .addUser(new VirtualUser('green'))
      .addUser(new VirtualUser('red'))
    // .addUser(new VirtualUser('cyan'))
    // .addUser(new VirtualUser('yellow'))

    setState(virtualEnv.updateView(state));
  }, []);

  useInterval(() => {
    setState(virtualEnv.updateView(state))
  }, 250);

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
        highlights={state.highlights}
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
