import * as React from 'react';
import styled from 'styled-components';
import { ReactGrid, DataChange, ColumnProps, Id, DropPosition, CellMatrixProps, RowProps } from '@silevis/reactgrid';
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


export default class ColumnReorderSample extends React.Component {

  state = {
    columns: columns(true, false),
    rows: (rows(false))
  }

  private getMatrix() {
    const columns: ColumnProps[] = [...this.state.columns].map((c: ColumnProps, cIdx) => ({
      ...c,
      onDrop: (idxs) => {
        this.setState({ 
          columns: this.getReorderedColumns(idxs as string[], cIdx),
          rows: this.getUpdatedRows([...idxs].reverse().map(idx => this.state.columns.findIndex(c => c.id === idx)), cIdx) 
        });
      }
    }))
    return { rows: this.state.rows, columns }
  }

  private prepareDataChanges(dataChanges: DataChange[]) {
    const state = { ...this.state }
    dataChanges.forEach((change: DataChange, a) => {
      state.rows.map((r: RowProps, i) => r.id == change.rowId ? r.cells[i].data = change.newData : r)
    })
    return state
  }

  private getReorderedColumns(colIds: Id[], to: number) {
    const movedColumns: ColumnProps[] = [...this.state.columns].filter(c => colIds.includes(c.id));
    const clearedColumns: ColumnProps[] = [...this.state.columns].filter(c => !colIds.includes(c.id));
    if (to > [...this.state.columns].findIndex(c => c.id == colIds[0]))
      to -= colIds.length - 1
    clearedColumns.splice(to, 0, ...movedColumns)
    return clearedColumns
  }

  private getUpdatedRows(from: number[], to: number) {
    let newRows: RowProps[] = [];
    this.state.rows.forEach(row => {
      const newRow = { ...row };
      const newCells = [...row.cells]
      let i = 0;
      from.forEach(fromIdx => {
        if (to > fromIdx) {
          newCells.splice(to - i, 0, newCells.splice(fromIdx, 1)[0]);
          i++;
        } else {
          newCells.splice(to, 0, newCells.splice(fromIdx - i, 1)[0]);
          i--;
        }
      })
      newRow.cells = newCells;
      newRows = [...newRows, newRow];
    })
    return newRows;
  }

  private getReorderedRows(rowIds: Id[], to: number) {
    const movedRows = [...this.state.rows].filter(r => rowIds.includes(r.id));
    const clearedRows = [...this.state.rows].filter(r => !rowIds.includes(r.id));
    if (to > [...this.state.rows].findIndex(r => r.id == rowIds[0]))
      to -= rowIds.length - 1
    clearedRows.splice(to, 0, ...movedRows)
    return clearedRows
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