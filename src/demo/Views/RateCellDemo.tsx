import * as React from 'react';
import { DataChange } from '../../lib';
import { ReactGrid } from '../../lib';
import { RateCellTemplate } from './RateCellTemplate';

export default class RateCellDemo extends React.Component<{}, {}> {
  state = {
    columns: [
      { id: 'player', reorderable: true, resizable: true, width: 200 },
      { id: 'age', reorderable: true, resizable: true, width: 50 },
      { id: 'rate', reorderable: true, resizable: true, width: 130 },  // added
      { id: 'club', reorderable: true, resizable: true, width: 200 },
    ],
    rows: [
      {
        id: 'header',
        height: 25,
        reorderable: true,
        cells: [
          { type: 'header', data: 'Player' },
          { type: 'header', data: 'Age' },
          { type: 'header', data: 'Rate' },           // added
          { type: 'header', data: 'Club' },
        ]
      },
      {
        id: '1',
        height: 25,
        reorderable: true,
        cells: [
          { type: 'text', data: 'Lionel Messi' },
          { type: 'number', data: 32 },
          { type: 'rating', data: 2 },                // added and updated
          { type: 'text', data: 'Barcelona' },
        ]
      },
    ]
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