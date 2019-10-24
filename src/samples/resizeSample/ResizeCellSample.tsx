import * as React from 'react';
import { ReactGrid, DataChange, DropPosition, Id, ColumnProps } from '@silevis/reactgrid';
import { RateCellTemplate } from '../../cell-templates/rateCell/RateCellTemplate';
import { FlagCellTemplate } from '../../cell-templates/flagCell/FlagCellTemplate';
import { columns } from '../../data/columns';
import { rows } from '../../data/rows';
import styled from 'styled-components';

export default class ResizeCellDemo extends React.Component<ColumnProps, {}> {

  resizeRow = columns(false, true).map((column: ColumnProps, idr: number): ColumnProps => {
    const resizeRow: ColumnProps = {
      ...column,
      onResize: width => {
        const updatedColumns = this.state.columns.map((column: ColumnProps, idc: number) => {
          return {
            ...column,
            width: idr == idc ? width : column.width
          }
        })
        this.setState({ columns: updatedColumns });
        this.forceUpdate();
      }
    }
    return resizeRow
  });

  state = {
    columns: this.resizeRow,
    rows: rows(true),
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
    const RateContainer = styled.div`
      position: relative;
      margin-left: 10px;
      width: 100%;
      min-height: 400px;
      font-family: Arial  , Helvetica, sans-serif;
    `
    return (
      <RateContainer>
        <ReactGrid
          cellMatrixProps={{ columns: this.state.columns, rows: this.state.rows }}
          cellTemplates={{ 'rating': new RateCellTemplate, 'flag': new FlagCellTemplate }}
          onDataChanged={changes => this.setState(this.prepareDataChanges(changes))}
          license={'non-commercial'}
        />
      </RateContainer>
    )
  }
}