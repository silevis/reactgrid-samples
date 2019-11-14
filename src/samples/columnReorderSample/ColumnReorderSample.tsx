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

  const [state, setState] = React.useState<ColumnReorderGridState>(() => {
    const columns: Column[] = (dataColumns(true, false) as Column[]).map((column: Column, cIdx: number) => ({
      ...column,
      columnId: column.columnId,
      // onDrop: (idxs: Id[]) => {
      //   const arrayIndexes = idxs.map((id: Id) => state.columns.findIndex((column: Column) => column.columnId === id));
      //   setState({
      //     columns: reorderArray(state.columns, arrayIndexes, cIdx),
      //     rows: state.rows.map(row => ({ ...row, cells: reorderArray(row.cells, arrayIndexes, cIdx) })),
      //   });
      // }
    }))
    const rows: Row[] = (dataRows(true) as Row[]).map((row: Row, rIdx: number) => ({
      ...row,
      // onDrop: (idxs: Id[]) => setState({
      //   rows: reorderArray(state.rows, idxs.map((id: Id) => state.rows.findIndex(r => r.rowId === id)), rIdx)
      // })
    }))
    return { rows, columns }
  })

  // private getMatrix = (): ColumnReorderGridState => {
  //   const columns: Column[] = [...this.state.columns].map((column: Column, cIdx: number) => ({
  //     ...column,
  //     onDrop: (idxs: Id[]) => {
  //       const arrayIndexes = idxs.map((id: Id) => this.state.columns.findIndex((column: Column) => column.columnId === id));
  //       this.setState({
  //         columns: this.reorderArray(this.state.columns, arrayIndexes, cIdx),
  //         rows: this.state.rows.map(row => ({ ...row, cells: this.reorderArray(row.cells, arrayIndexes, cIdx) })),
  //       });
  //     }
  //   }))
  //   const rows: Row[] = [...this.state.rows].map((row: Row, rIdx: number) => ({
  //     ...row,
  //     onDrop: (idxs: Id[]) => this.setState({
  //       rows: this.reorderArray(this.state.rows, idxs.map((id: Id) => this.state.rows.findIndex(r => r.id === id)), rIdx)
  //     })
  //   }))
  //   return { rows, columns }
  // }

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

  const handleColumnsReordered = (targetColumnId: Id, columnIds: Id[], dropPosition: DropPosition) => {
    const arrayIndexes = columnIds.map((id: Id) => { 
      return id as number
    });
    const to = state.columns.findIndex((column: Column) => column.columnId === targetColumnId);
    console.log(state.rows.map(row => ({ ...row, cells: reorderArray(row.cells, arrayIndexes as number[], targetColumnId as number) })));
    
    setState({
      rows: state.rows.map(row => ({ ...row, cells: reorderArray(row.cells, arrayIndexes as number[], targetColumnId as number) })),
      columns: reorderArray(state.columns, arrayIndexes as number[], targetColumnId as number)
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
        canReorderRows={handleCanReorderColumns}
        onColumnsReordered={handleColumnsReordered}
        enableColumnSelection
      />
    </ReactGridContainer>
  )
}