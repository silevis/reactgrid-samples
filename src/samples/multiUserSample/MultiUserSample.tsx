import * as React from 'react';
import { ReactGrid, DataChange, Focus, CellMatrixProps} from '@silevis/reactgrid';
import { RateCellTemplate } from '../../cell-templates/rateCell/RateCellTemplate';
import { FlagCellTemplate } from '../../cell-templates/flagCell/FlagCellTemplate';
import { DropdownNumberCellTemplate } from '../../cell-templates/dropdownNumberCell/DropdownNumberCellTemplate';
import { VirtualEnv, VirtualUser } from './VirtualUser';
import { columns } from '../../data/crm/columns';
import { rows } from '../../data/crm/rows';
import styled from 'styled-components';
import './styling.scss';

const ReactGridContainer = styled.div`
  position: relative;
  margin-left: 10px;
  width: 100%;
  min-height: 400px;
`;

export interface IMultiUserSampleState extends CellMatrixProps {
  focuses: Focus[]
}

export default class MultiUserSample extends React.Component<{}, IMultiUserSampleState> {

  state = {
    columns:  columns(false, false),
    rows:     rows(true),
    focuses:  []
  }

  intervalId?: number;

  componentDidMount() {
    this.setVirtualEnv();
  }

  componentWillUnmount() {
    this.unsetVirtualEnv();
  }

  private setVirtualEnv() {
    const virtEnv: VirtualEnv = new VirtualEnv(this.state, this.prepareDataChanges);

    virtEnv
        .addUser(new VirtualUser('#2274A5'))
        .addUser(new VirtualUser('#F75C03'))
        .addUser(new VirtualUser('#F1C40F'))
        .addUser(new VirtualUser('#D90368'))
        .addUser(new VirtualUser('#00A754'));

    this.intervalId = window.setInterval(() => {
        this.setState(virtEnv.updateView(this.state));
    }, 1000);
  }

  private unsetVirtualEnv() {
    this.setState({ focuses: [] });
    window.clearInterval(this.intervalId);
  }

  private prepareDataChanges = (dataChanges: DataChange[]): IMultiUserSampleState => {
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
      <ReactGridContainer id="multi-user-sample">
        <ReactGrid
          cellMatrixProps={this.state}
          cellTemplates={{ 
            'rating': new RateCellTemplate, 
            'flag': new FlagCellTemplate,
            'dropdownNumber' : new DropdownNumberCellTemplate,
          }}
          customFocuses={this.state.focuses}
          onDataChanged={changes => this.setState(this.prepareDataChanges(changes))}
          license={'non-commercial'}
        />
      </ReactGridContainer>
    )
  }
}