import * as React from 'react';
import { ReactGrid, CellChange, Highlight, Column, Row } from '@silevis/reactgrid';
import styled from 'styled-components';
import { VirtualEnv, VirtualUser } from './VirtualUser';
import { columns } from '../../data/crm/columns';
import { rows } from '../../data/crm/rows';
import { FlagCellTemplate } from '../../cell-templates/flagCell/FlagCellTemplate';
import { DropdownNumberCellTemplate } from '../../cell-templates/dropdownNumberCell/DropdownNumberCellTemplate';
import './styling.scss';

const ReactGridContainer = styled.div`
  position: relative;
  min-height: 400px;
`;

export interface IMultiUserSampleState {
    columns: Column[],
    rows: Row[],
    frozenTopRows?: number,
    frozenLeftColumns?: number,
    highlights: Highlight[]
}

export class MultiUserSample extends React.Component<{}, IMultiUserSampleState> {

    state = {
        columns:            columns(false, false),
        rows:               rows(false),
        frozenTopRows:      1,
        frozenLeftColumns:  2,
        highlights:         [],
    }

    intervalId?: number;

    componentDidMount() {
        this.setVirtualEnv();
    }

    componentWillUnmount() {
        this.unsetVirtualEnv();
    }

    private setVirtualEnv() {
        const virtEnv: VirtualEnv = new VirtualEnv(this.state, this.prepareChanges);

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
            .addUser(new VirtualUser('#A771FE'))


        this.intervalId = setInterval(() => this.setState(virtEnv.updateView(this.state)), 1000);
    }

    private unsetVirtualEnv() {
        this.setState({ highlights: [] });
        window.clearInterval(this.intervalId);
    }

    private prepareChanges = (changes: CellChange[]) => {
        let newState = { ...this.state };
        changes.forEach((change: any) => {
            const changeRowIdx = newState.rows.findIndex(el => el.rowId === change.rowId);
            const changeColumnIdx = newState.columns.findIndex(el => el.columnId === change.columnId);
            newState.rows[changeRowIdx].cells[changeColumnIdx] = change.newCell;
        })
        return newState;
    }

    private handleChanges = (changes: CellChange[]) => {
        let newState = { ...this.state };
        changes.forEach((change: any) => {
            const changeRowIdx = newState.rows.findIndex(el => el.rowId === change.rowId);
            const changeColumnIdx = newState.columns.findIndex(el => el.columnId === change.columnId);
            newState.rows[changeRowIdx].cells[changeColumnIdx] = change.newCell;
        })
        this.setState(newState);
        return true;
    }

    render() {
        return (
            <ReactGridContainer id="multi-user-sample">
                <ReactGrid
                    columns={this.state.columns}
                    rows={this.state.rows}
                    onCellsChanged={this.handleChanges}
                    customCellTemplates={{
                        'flag': new FlagCellTemplate,
                        'dropdownNumber': new DropdownNumberCellTemplate
                    }}
                    frozenTopRows={this.state.frozenTopRows}
                    frozenLeftColumns={this.state.frozenLeftColumns}
                    highlights={this.state.highlights}
                    license={'non-commercial'}
                    enableColumnSelection
                    enableRowSelection
                />
            </ReactGridContainer>
        )
    }
}