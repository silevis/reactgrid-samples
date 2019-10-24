import * as React from 'react';
import styled from 'styled-components';
import { ReactGrid, DataChange, ColumnProps, Id, DropPosition } from '@silevis/reactgrid';
import { RateCellTemplate } from '../../cell-templates/rateCell/RateCellTemplate';
import { FlagCellTemplate } from '../../cell-templates/flagCell/FlagCellTemplate';
import { columns } from '../../data/columns';
import { rows } from '../../data/rows';

const DynaGridContainer = styled.div`
  position: relative;
  margin-left: 10px;
  width: 100%;
  min-height: 400px;
`;

export default class ColumnReorderSample extends React.Component {

  reorderableColumns = columns(true, false).map((column: ColumnProps, idx: number): ColumnProps => {
    const reorderableColumn: ColumnProps = {
      ...column,
      onDrop: (columnIds: Id[], position: DropPosition) => {
        this.setState({ columns: this.reorderedColumns(columnIds, idx) }) 
      },
    }
    return reorderableColumn
  });

  state = {
    columns:  this.reorderableColumns,
    rows:     rows(false)
  }

  private reorderedColumns(colIdxs: Id[], to: number) {
    const columnIndex = this.state.columns.findIndex((column: ColumnProps) => column.id === colIdxs[0]);
    console.log(to);
    
    const direction = to > columnIndex ? 'right' : 'left';
    return this.calculateColumnReorder([...this.state.columns], colIdxs, direction, to);
  }

  private calculateColumnReorder(columns: ColumnProps[], colIdxs: Id[], direction: string, destination: number): ColumnProps[] {
    const movedColumns: ColumnProps[] = columns.filter((column: ColumnProps) => colIdxs.includes(column.id));
    const clearedColumns: ColumnProps[] = columns.filter((column: ColumnProps) => !colIdxs.includes(column.id));
    if (direction === 'right') {
      destination = destination - colIdxs.length + 1
    } else {
      destination = destination - colIdxs.length + 1
    }
    console.log(destination);
    
    clearedColumns.splice(destination, 0, ...movedColumns)
    return clearedColumns
  }

  private prepareDataChanges = (dataChanges: DataChange[]): {} => {
    const state = { ...this.state }
    dataChanges.forEach(change => {
      state.rows.forEach((row: any) => {
        if (row.id == change.rowId) {
          const field = this.state.columns.findIndex((column: any) => column.id == change.columnId)
          if (field !== undefined)
            row.cells[field].data = change.newData;
        }
      })
    })
    return state
  }

  render() {
    return (
      <DynaGridContainer>
        <ReactGrid
          cellMatrixProps={this.state}
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