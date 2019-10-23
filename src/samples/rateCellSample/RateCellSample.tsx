import * as React from 'react';
import { ReactGrid, DataChange } from '@silevis/reactgrid';
import { RateCellTemplate } from '../../cell-templates/rateCell/RateCellTemplate';
import { columns } from '../../data/columns';
import { rows } from '../../data/rows';

export default class RateCellDemo extends React.Component<{}, {}> {
  state = {
    columns,
    rows
  }

  private prepareDataChanges = (dataChanges: DataChange[]): {} => {
    const state = { ...this.state }
    dataChanges.forEach(change => {
      state.rows.forEach(r => {
        if (r.id == change.rowId) {
          const field = this.state.columns.findIndex(c => c.id == change.columnId)
          if (field !== undefined)
            r.cells[field].data = change.newData;
        }
      })
    })
    return state
  }

  render() {
    return (
      <ReactGrid
        cellMatrixProps={this.state}
        cellTemplates={{ 'rating': new RateCellTemplate }}
        onDataChanged={changes => this.setState(this.prepareDataChanges(changes))}
        license={'non-commercial'}
      />
    )
  }
}