import * as React from 'react';
import styled from 'styled-components';
import { ReactGrid, DataChange, ColumnProps, Id, CellMatrixProps, RowProps } from '@silevis/reactgrid';
import { RateCellTemplate } from '../../cell-templates/rateCell/RateCellTemplate';
import { FlagCellTemplate } from '../../cell-templates/flagCell/FlagCellTemplate';
import { columns } from '../../data/columns';
import { rows } from '../../data/rows';
import './styling.scss';


const DynaGridContainer = styled.div`
  position: relative;
  min-height: 400px;
`;


export class ColumnReorderSample extends React.Component<{}, CellMatrixProps> {

  state = {
    columns: columns(true, false),
    rows: rows(true)
  }

  private getMatrix = (): CellMatrixProps => {
    const columns: ColumnProps[] = [...this.state.columns].map((column: ColumnProps, cIdx: number) => ({
      ...column,
      onDrop: (idxs: Id[]) => {
        const arrayIndexes = idxs.map((id: Id) => this.state.columns.findIndex((column: ColumnProps) => column.id === id));
        this.setState({
          columns: this.reorderArray(this.state.columns, arrayIndexes, cIdx),
          rows: this.state.rows.map(row => ({ ...row, cells: this.reorderArray(row.cells, arrayIndexes, cIdx) })),
        });
      }
    }))
    const rows: RowProps[] = [...this.state.rows].map((row: RowProps, rIdx: number) => ({
      ...row,
      onDrop: (idxs: Id[]) => this.setState({
        rows: this.reorderArray(this.state.rows, idxs.map((id: Id) => this.state.rows.findIndex(r => r.id === id)), rIdx)
      })
    }))
    return { rows, columns }
  }

  private prepareDataChanges(dataChanges: DataChange[]): CellMatrixProps {
    const state = { ...this.state };
    dataChanges.forEach((change: DataChange) => {
      const columnIndex: number = this.state.columns.findIndex((column: ColumnProps) => column.id === change.columnId)
      state.rows.forEach((row: RowProps) => { row.id == change.rowId ? row.cells[columnIndex].data = change.newData : row })
    })
    return state
  }

  private reorderArray(arr: any[], idxs: number[], to: number) {
    const movedElements: any[] = arr.filter((_: any[], idx: number) => idxs.includes(idx));
    to = Math.min(...idxs) < to ? to += 1 : to -= idxs.filter(idx => idx < to).length;
    const leftSide: any[] = arr.filter((_: any, idx: number) => idx < to && !idxs.includes(idx));
    const rightSide: any[] = arr.filter((_: any, idx: number) => idx >= to && !idxs.includes(idx));
    return [...leftSide, ...movedElements, ...rightSide];
  }

  render() {
    return (
      <DynaGridContainer id="column-reorder-sample">
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