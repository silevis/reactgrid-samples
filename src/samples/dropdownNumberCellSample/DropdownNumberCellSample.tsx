import * as React from 'react';
import styled from 'styled-components';
import { ReactGrid, DataChange, CellMatrixProps } from '@silevis/reactgrid';
import { DropdownNumberCellTemplate } from '../../cell-templates/dropdownNumberCell/DropdownNumberCellTemplate';
import { FlagCellTemplate } from '../../cell-templates/flagCell/FlagCellTemplate';
import { RateCellTemplate } from '../../cell-templates/rateCell/RateCellTemplate';
import { columns } from '../../data/crm/columns';
import { rows } from '../../data/crm/rows';
import './styling.scss';

const ReactGridContainer = styled.div`
  position: relative;
  min-height: 400px;
`;

export class DropdownNumberCellSample extends React.Component<{}, CellMatrixProps> {
  state = {
    columns:  columns(true, false),
    rows:     rows(true)
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
      <ReactGridContainer id="dropdown-number-cell-sample">
        <ReactGrid
          cellMatrixProps={this.state}
          cellTemplates={{
            'rating': new RateCellTemplate,
            'flag': new FlagCellTemplate,
            'dropdownNumber' : new DropdownNumberCellTemplate,
          }}
          onDataChanged={changes => this.setState(this.prepareDataChanges(changes))}
          license={'non-commercial'}
        />
      </ReactGridContainer>
    )
  }
}