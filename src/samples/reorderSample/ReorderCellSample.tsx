import * as React from 'react';
import { ReactGrid, DataChange, DropPosition, Id } from '@silevis/reactgrid';
import { RateCellTemplate } from '../../cell-templates/rateCell/RateCellTemplate';
import { FlagCellTemplate } from '../../cell-templates/flagCell/FlagCellTemplate';
import { columns } from '../../data/columns';
import { rows } from '../../data/rows';
import styled from 'styled-components';


export interface Column {
  id: Id;
  name: string;
  type: string;
  width: number;
}

export interface ColumnProps {
  readonly id: Id;
  readonly width: number;
  readonly reorderable: boolean;
  readonly resizable: boolean;
  onDrop?: (columnIds: Id[], position: DropPosition) => void;

}



export default class ReorderCellDemo extends React.Component<ColumnProps, {}> {

  // w konsturktorze state 
  //  sprawdzic czy  dodano pole 

  state = {
    columns: columns(true, true).map((column: ColumnProps, idx: number) => {
      column.onDrop = (ids: any) => this.setState({ column: this.reorderedColumns(ids as number[], idx) })
      return column
    }),
    rows: rows(true),
  }





  // columnProps: columns(true, true).map((x, idx) => {
  //   return {
  //     id: x.id,
  //     width: 60,
  //     reorderable: true,
  //     resizable: true,
  //     onDrop: (ids: any) => { console.log('ondrop', ids); this.setState({ fields: this.reorderedColumns(ids as number[], idx) }) }
  //   }
  // }),
  //   columns: ColumnProps[] = this.state.columns.map((field, idx) => ({
  //   id: field.id,
  //   width: field.width,
  //   onDrop: (ids: any) => this.setState({ fields: this.reorderedColumns(ids as number[], idx) }),
  // }));




  private reorderedColumns(colIdxs: number[], to: number) {
    const direction = to > colIdxs[0] ? 'right' : 'left'
    return this.calculateColumnReorder([...this.state.columns], colIdxs, direction, to)
  }

  private calculateColumnReorder(fields: ColumnProps[], colIdxs: number[], direction: string, destination: number): ColumnProps[] {
    const movedColumns: ColumnProps[] = fields.filter((_, idx) => colIdxs.includes(idx));
    const clearedFields: ColumnProps[] = fields.filter((_, idx) => !colIdxs.includes(idx));
    if (direction === 'right') {
      destination = destination - colIdxs.length + 1
    }
    clearedFields.splice(destination, 0, ...movedColumns)
    return clearedFields
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