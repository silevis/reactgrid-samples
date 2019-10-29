import * as React from 'react';
import styled from 'styled-components';
import { ReactGrid, DataChange, ColumnProps, Id, Cell, CellMatrixProps, RowProps } from '@silevis/reactgrid';
import { RateCellTemplate } from '../../cell-templates/rateCell/RateCellTemplate';
import { FlagCellTemplate } from '../../cell-templates/flagCell/FlagCellTemplate';
import { columns } from '../../data/columns';
import { rows } from '../../data/rows';
import '@silevis/reactgrid/dist/lib/assets/core.css';

const DynaGridContainer = styled.div`
  position: relative;
  margin-left: 10px;
  width: 100%;
  min-height: 400px;
`;


export class ColumnReorderSample extends React.Component<{}, CellMatrixProps> {

  state = {
    columns: columns(true, false),
    rows: rows(true)
  }

  private getMatrix = (): CellMatrixProps => {
    const columns: ColumnProps[] = [...this.state.columns].map((c: ColumnProps, cIdx: number) => ({
      ...c,
      onDrop: (idxs: Id[]) => {
        const arrayIdxs = idxs.map((id: Id) => this.state.columns.findIndex(c => c.id === id));
        this.setState({
          columns: this.reorderArray(this.state.columns, arrayIdxs, cIdx),
          rows: this.state.rows.map(row => ({ ...row, cells: this.reorderArray(row.cells, arrayIdxs, cIdx) })),
        });
      }
    }))
    const rows: RowProps[] = [...this.state.rows].map((r: RowProps, rIdx: number) => ({
      ...r,
      onDrop: (idxs: Id[]) => this.setState({
        rows: this.reorderArray(this.state.rows, idxs.map((id: Id) => this.state.rows.findIndex(c => c.id === id)), rIdx),
      })
    }))
    return { rows, columns }
  }

  private prepareDataChanges(dataChanges: DataChange[]): CellMatrixProps {
    const state = { ...this.state };
    dataChanges.forEach((change: DataChange) => {
      const columnIndex: number = this.state.columns.findIndex((column: ColumnProps) => column.id === change.columnId)
      state.rows.forEach((r: RowProps) => { r.id == change.rowId ? r.cells[columnIndex].data = change.newData : r })
    })
    return state
  }

  private reorderArray(arr: any[], idxs: number[], to: number) {
    const movedElements: any[] = arr.filter((e, idx) => idxs.includes(idx));

    if (Math.min(...idxs) < to)
      to += 1;
    else
      to -= idxs.filter(idx => idx < to).length;

    const leftSide: any[] = arr.filter((e, idx) => idx < to && !idxs.includes(idx));
    const rightSide: any[] = arr.filter((e, idx) => idx >= to && !idxs.includes(idx));

    return [...leftSide, ...movedElements, ...rightSide];
  }

  render() {
    return (
      <DynaGridContainer>
        <ReactGrid
          cellMatrixProps={this.getMatrix()}
          cellTemplates={{
            'rating': new RateCellTemplate,
            'flag': new FlagCellTemplate
          }}
          onDataChanged={changes => this.setState(this.prepareDataChanges(changes))}
          license={'non-commercial'}
        />
      </DynaGridContainer>
    )
  }
}