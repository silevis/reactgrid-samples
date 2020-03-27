import * as React from 'react';
import styled from 'styled-components';
import { ReactGrid, Column, CellChange, Row } from '@silevis/reactgrid';
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

interface FrozensState {
  columns: Column[]
  rows: Row[],
  frozenTopRows?: number,
  frozenBottomRows?: number,
  frozenLeftColumns?: number,
  frozenRightColumns?: number,
}

export const FrozensSample: React.FunctionComponent = () => {

  const [state, setState] = React.useState<FrozensState>(() => ({
    columns: [...crmColumns(true, false)],
    rows: [...crmRows(true)],
    frozenTopRows: 1,
    frozenLeftColumns: 2,
    frozenRightColumns: 1,
    frozenBottomRows: undefined
  }))

  const handleChanges = (changes: CellChange[]) => {
    let newState = { ...state };
    changes.forEach((change: any) => {
      const changeRowIdx = newState.rows.findIndex(el => el.rowId === change.rowId);
      const changeColumnIdx = newState.columns.findIndex(el => el.columnId === change.columnId);
      newState.rows[changeRowIdx].cells[changeColumnIdx] = change.newCell;
    })
    setState(newState);
    return true;
  }

  return (
    <ReactGridContainer id="frozens-sample">
      <ReactGrid
        rows={state.rows}
        columns={state.columns}
        customCellTemplates={{
          'rating': new RateCellTemplate,
          'flag': new FlagCellTemplate,
          'dropdownNumber': new DropdownNumberCellTemplate,
        }}
        stickyTopRows={state.frozenTopRows}
        stickyBottomRows={state.frozenBottomRows}
        stickyLeftColumns={state.frozenLeftColumns}
        stickyRightColumns={state.frozenRightColumns}
        onCellsChanged={handleChanges}
        enableColumnSelection
        enableRowSelection
        license={'non-commercial'}
      />
    </ReactGridContainer>
  )
}
