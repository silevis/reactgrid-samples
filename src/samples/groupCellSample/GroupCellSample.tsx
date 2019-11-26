import * as React from 'react';
import styled from 'styled-components';
import { ReactGrid, CellChange, Column, Row } from '@silevis/reactgrid';
import { RateCellTemplate } from '../../cell-templates/rateCell/RateCellTemplate';
import { FlagCellTemplate } from '../../cell-templates/flagCell/FlagCellTemplate';
import { columns as dataColumns } from '../../data/group/columns';
import { rows as dataRows } from '../../data/group/rows';
import './styling.scss';

const ReactGridContainer = styled.div`
  position: relative;
  min-height: 400px;
`;

interface ColumnReorderGridState {
  columns:  Column[]
  rows:     Row[]
}

export const GroupCellSample: React.FunctionComponent = () => {

  const [state, setState] = React.useState<ColumnReorderGridState>(() => ({
    columns:  dataColumns(false, false),
    rows:     dataRows(false),
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
    <ReactGridContainer id="group-cell-sample">
      <ReactGrid
        rows={state.rows}
        columns={state.columns}
        customCellTemplates={{
          'rating': new RateCellTemplate,
          'flag': new FlagCellTemplate
        }}
        onCellsChanged={handleChanges}
        license={'non-commercial'}
        enableColumnSelection
        enableRowSelection
      />
    </ReactGridContainer>
  )
}
