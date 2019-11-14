import * as React from 'react';
import styled from 'styled-components';
import { ReactGrid, CellChange, Column, Id, Row, DropPosition } from '@silevis/reactgrid';
import { RateCellTemplate } from '../../cell-templates/rateCell/RateCellTemplate';
import { FlagCellTemplate } from '../../cell-templates/flagCell/FlagCellTemplate';
import { columns as dataColumns } from '../../data/columns';
import { rows as dataRows } from '../../data/rows';
import './styling.scss';

const ReactGridContainer = styled.div`
  position: relative;
  min-height: 400px;
`;

interface ColumnReorderGridState {
  columns:  Column[]
  rows:     Row[]
}

export const ColumnReorderSample: React.FunctionComponent = () => {

  const [state, setState] = React.useState<ColumnReorderGridState>(() => ({ 
      columns:  dataColumns(true, false),
      rows:     dataRows(true), 
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

  const reorderArray = (arr: any[], idxs: number[], to: number) => {
    const movedElements: any[] = arr.filter((_: any[], idx: number) => idxs.includes(idx));
    to = Math.min(...idxs) < to ? to += 1 : to -= idxs.filter(idx => idx < to).length;
    const leftSide: any[] = arr.filter((_: any, idx: number) => idx < to && !idxs.includes(idx));
    const rightSide: any[] = arr.filter((_: any, idx: number) => idx >= to && !idxs.includes(idx));
    return [...leftSide, ...movedElements, ...rightSide];
  }

  const handleCanReorderColumns = (targetColumnId: Id, columnIds: Id[], dropPosition: DropPosition): boolean => {
    return true;
  }

  const handleCanReorderRows = (targetColumnId: Id, columnIds: Id[], dropPosition: DropPosition): boolean => {
    return true;
  }

  const handleColumnsReordered = (targetColumnId: Id, columnIds: Id[], dropPosition: DropPosition) => {
    const to = state.columns.findIndex((column: Column) => column.columnId === targetColumnId);
    setState({
      columns: reorderArray(state.columns, columnIds as number[], to),
      rows: state.rows.map(row => ({ ...row, cells: reorderArray(row.cells, columnIds as number[], to) })),
    });
  }

  const handleRowsReordered = (targetRowId: Id, rowIds: Id[], dropPosition: DropPosition) => {
    let newState = { ...state };
    const to = state.rows.findIndex((row: Row) => row.rowId === targetRowId);
    const ids = rowIds.map((id: Id) => state.rows.findIndex(r => r.rowId === id)) as number[];
    setState({
      ...newState,
      rows: reorderArray(state.rows, ids, to)
    });
  }

  return (
    <ReactGridContainer id="column-reorder-sample">
      <ReactGrid
        rows={state.rows}
        columns={state.columns}
        customCellTemplates={{
          'rating': new RateCellTemplate,
          'flag': new FlagCellTemplate
        }}
        onCellsChanged={handleChanges}
        license={'non-commercial'}
        canReorderColumns={handleCanReorderColumns}
        canReorderRows={handleCanReorderRows}
        onColumnsReordered={handleColumnsReordered}
        onRowsReordered={handleRowsReordered}
        enableColumnSelection
        enableRowSelection
      />
    </ReactGridContainer>
  )
}