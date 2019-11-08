import * as React from 'react';
import { ReactGrid, DataChange, Focus, CellMatrixProps, RowProps, ColumnProps, Id } from '@silevis/reactgrid';
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
  min-height: 400px;
`;

export interface IMultiUserSampleState extends CellMatrixProps {
  focuses: Focus[]
}

export class MultiUserSample extends React.Component<{}, IMultiUserSampleState> {

  state = {
    columns:  columns(true, true),
    rows:     rows(false),
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
      .addUser(new VirtualUser('#00f2c3'))
      .addUser(new VirtualUser('#ffd600'))
      .addUser(new VirtualUser('#344675'))
      .addUser(new VirtualUser('#212529'))
      .addUser(new VirtualUser('#ffffff'))
      .addUser(new VirtualUser('#000000'))
      .addUser(new VirtualUser('#5e72e4'))
      .addUser(new VirtualUser('#4D8802'))
      .addUser(new VirtualUser('#A771FE'));

    this.intervalId = window.setInterval(() => {
      this.setState(virtEnv.updateView(this.state));
    }, 1000);
  }

  private unsetVirtualEnv() {
    this.setState({ focuses: [] });
    window.clearInterval(this.intervalId);
  }

  private prepareDataChanges = (dataChanges: DataChange[]): IMultiUserSampleState => {
    const state = { ...this.state };
    dataChanges.forEach((change: DataChange) => {
      const columnIndex: number = this.state.columns.findIndex((column: ColumnProps) => column.id === change.columnId)
      state.rows.forEach((row: RowProps) => { row.id == change.rowId ? row.cells[columnIndex].data = change.newData : row })
    })
    return state
  }

  private reorderArray(arr: any[], idxs: number[], to: number) {
    const movedElements: any[] = arr.filter((_: any[], idx: number) => idxs.includes(idx));
    to = Math.min(...idxs) < to ? to += 1 : to -= idxs.filter(idx => idx < to).length;
    const leftSide: any[] = arr.filter((_: any, idx: number) => idx < to && !idxs.includes(idx));
    const rightSide: any[] = arr.filter((_: any, idx: number) => idx >= to && !idxs.includes(idx));
    return [...leftSide, ...movedElements, ...rightSide];
  }

  private getMatrix = (): CellMatrixProps => {
    const columns: ColumnProps[] = [...this.state.columns].map((column: ColumnProps, cIdx: number) => ({
      ...column,
      onDrop: (idxs: Id[]) => {
        const arrayIndexes = idxs.map((id: Id) => this.state.columns.findIndex((column: ColumnProps) => column.id === id));
        this.setState({
          columns: this.reorderArray(this.state.columns, arrayIndexes, cIdx),
          rows: this.state.rows.map(row => ({ ...row, cells: this.reorderArray(row.cells, arrayIndexes, cIdx) })),
        });
      },
      onResize: width => {
        columns[cIdx] = { ...column, width };
        this.setState({ columns })
      }
    }))
    const rows: RowProps[] = [...this.state.rows].map((row: RowProps, rIdx: number) => ({
      ...row,
      onDrop: (idxs: Id[]) => this.setState({
        rows: this.reorderArray(this.state.rows, idxs.map((id: Id) => this.state.rows.findIndex(r => r.id === id)), rIdx)
      })
    }))
    return { rows, columns }
  }

  render() {
    return (
      <ReactGridContainer id="multi-user-sample">
        <ReactGrid
          cellMatrixProps={this.getMatrix()}
          cellTemplates={{
            'rating': new RateCellTemplate,
            'flag': new FlagCellTemplate,
            'dropdownNumber': new DropdownNumberCellTemplate,
          }}
          customFocuses={this.state.focuses}
          onDataChanged={changes => this.setState(this.prepareDataChanges(changes))}
          license={'non-commercial'}
        />
      </ReactGridContainer>
    )
  }
}