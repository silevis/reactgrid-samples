import * as React from 'react';
import styled from 'styled-components';
import { ReactGrid, CellChange, Column, Id, Row, DefaultCellTypes } from '@silevis/reactgrid';
import { RateCellTemplate, RateCell } from '../../cell-templates/rateCell/RateCellTemplate';
import { FlagCellTemplate, FlagCell } from '../../cell-templates/flagCell/FlagCellTemplate';
import { columns as dataColumns } from '../../data/columns';
import { rows as dataRows } from '../../data/rows';
import './styling.scss';

const ReactGridContainer = styled.div`
  position: relative;
  min-height: 400px;
`;

interface ResizeColumnSample {
  columns: Column[]
  rows: Row<DefaultCellTypes | FlagCell | RateCell>[]
}

export const ResizeColumnSample: React.FunctionComponent = () => {

  const [state, setState] = React.useState<ResizeColumnSample>(() => ({
    columns: dataColumns(false, true),
    rows: dataRows(false),
  }))

  const handleChanges = (changes: CellChange[]) => {
    // mothing os buggy there!
    let newState = { ...state };
    changes.forEach((change: CellChange) => {
      const changeRowIdx = newState.rows.findIndex(el => el.rowId === change.rowId);
      const changeColumnIdx = newState.columns.findIndex(el => el.columnId === change.columnId);
      newState.rows[changeRowIdx].cells[changeColumnIdx] = change.newCell;
    })
    setState(newState);
    return true;
  }

  const handleColumnResize = (ci: Id, width: number) => {
    let newState = { ...state };
    const columnIndex = newState.columns.findIndex(el => el.columnId === ci);
    const resizedColumn: Column = newState.columns[columnIndex];
    const updateColumn: Column = { ...resizedColumn, width };
    newState.columns[columnIndex] = updateColumn;
    setState(newState);
  }

  return (
    <ReactGridContainer id="column-reorder-sample">
      <ReactGrid
        rows={state.rows}
        columns={state.columns}
        customCellTemplates={{
          'rate': new RateCellTemplate(),
          'flag': new FlagCellTemplate(),
        }}
        onCellsChanged={handleChanges}
        onColumnResized={handleColumnResize}
        enableColumnSelection
        enableRowSelection
        enableFillHandle
        enableRangeSelection
      />
    </ReactGridContainer>
  )
}
