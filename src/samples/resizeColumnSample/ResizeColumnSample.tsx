import * as React from 'react';
import styled from 'styled-components';
import { ReactGrid, DataChange, ColumnProps, CellMatrixProps, RowProps } from '@silevis/reactgrid';
import { RateCellTemplate } from '../../cell-templates/rateCell/RateCellTemplate';
import { FlagCellTemplate } from '../../cell-templates/flagCell/FlagCellTemplate';
import { columns } from '../../data/columns';
import { rows } from '../../data/rows';

const ReactGridContainer = styled.div`
  position: relative;
  min-height: 400px;
`;

export class ResizeColumnSample extends React.Component<{}, CellMatrixProps> {
  state = {
    columns:  columns(false, true),
    rows:     rows(false),
  }

  private getMatrix() {
    const columns: ColumnProps[] = [...this.state.columns].map((column, cIdx) => ({
      ...column,
      onResize: width => {
        columns[cIdx] = { ...column, width };
        this.setState({ columns })
      }
    }));
    return { columns, rows: this.state.rows }
  }

  private prepareDataChanges = (dataChanges: DataChange[]): CellMatrixProps => {
    const state = { ...this.state };
    dataChanges.forEach((change: DataChange) => {
      const columnIndex: number = this.state.columns.findIndex((column: ColumnProps) => column.id === change.columnId)
      state.rows.forEach((row: RowProps) => { row.id == change.rowId ? row.cells[columnIndex].data = change.newData : row })
    })
    return state
  }

  render() {
    return (
      <ReactGridContainer id="resize-column-sample">
        <ReactGrid
          cellMatrixProps={this.getMatrix()}
          cellTemplates={{ 
            'rating': new RateCellTemplate, 
            'flag': new FlagCellTemplate 
          }}
          onDataChanged={changes => this.setState(this.prepareDataChanges(changes))}
          license={'non-commercial'}
        />
      </ReactGridContainer> 
    )
  }
}