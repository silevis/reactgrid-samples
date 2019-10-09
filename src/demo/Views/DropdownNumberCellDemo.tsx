import * as React from 'react';
import { DataChange } from '../../lib';
import { ReactGrid } from '../../lib';
import { DropdownNumberCellTemplate } from './DropdownNumberCellTemplate';

export default class DropdownNumberCellDemo extends React.Component<{}, {}> {
  state = {
    columns: [
      { id: 'player', reorderable: false, resizable: false, width: 200 },
      { id: 'age',    reorderable: false, resizable: false, width: 50 },
      { id: 'rate',   reorderable: false, resizable: false, width: 130 },
      { id: 'club',   reorderable: false, resizable: false, width: 200 },
    ],
    rows: [
      { 
        id: 'header', 
        height: 25, 
        reorderable: true, 
        cells: [
          { type: 'header', data: 'Player' },
          { type: 'header', data: 'Age'},
          { type: 'header', data: 'Speed'},
          { type: 'header', data: 'Club' },
        ]
      },
      { 
        id: '1', 
        height: 25, 
        reorderable: true,  
        cells: [
          { type: 'text', data: 'Lionel Messi' },
          { type: 'number', data: 32},
          { type: 'dropdown-number', data: {value: 40, isOpened: false}},
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
        cellTemplates={{'dropdown-number': new DropdownNumberCellTemplate}}
        onDataChanged={changes => this.setState(this.prepareDataChanges(changes))}
      />
    )
  }
}