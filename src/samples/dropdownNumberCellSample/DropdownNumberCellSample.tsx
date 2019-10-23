import * as React from 'react';
import styled from 'styled-components';
import { ReactGrid, DataChange } from '@silevis/reactgrid';
import { DropdownNumberCellTemplate } from '../../cell-templates/dropdownNumberCell/DropdownNumberCellTemplate';
import { FlagCellTemplate } from '../../cell-templates/flagCell/FlagCellTemplate';
import { RateCellTemplate } from '../../cell-templates/rateCell/RateCellTemplate';
import { columns } from '../../data/columns';
import { rows } from '../../data/rows';

const DynaGridContainer = styled.div`
  position: relative;
  margin-left: 10px;
  width: 100%;
  min-height: 400px;
`;

export default class DropdownNumberCell extends React.Component {
  state = {
    columns:  [...columns(true, true)],
    rows:     [...rows(true)]
  }

  private prepareDataChanges = (dataChanges: DataChange[]): {} => {
    const state = { ...this.state }
    dataChanges.forEach(change => {
      state.rows.forEach((row: any) => {
        if (row.id == change.rowId) {
          const field = this.state.columns.findIndex((column: any) => column.id == change.columnId);
          if (field !== undefined)
            row.cells[field].data = change.newData;
        }
      })
    });
    return state
  };

  render() {
    return (
      <DynaGridContainer>
        <ReactGrid
          cellMatrixProps={this.state}
          cellTemplates={{ 
            'rating': new RateCellTemplate, 
            'flag': new FlagCellTemplate,
            'dropdownNumber' : new DropdownNumberCellTemplate, // TODO - add this cell template to data - currently unused
          }}
          onDataChanged={changes => this.setState(this.prepareDataChanges(changes))}
          license={'non-commercial'}
        />
      </DynaGridContainer>
      
    )
  }
}