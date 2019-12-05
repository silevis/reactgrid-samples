import * as React from 'react';
import { ReactGrid, CellChange, Highlight, Column, Row, DropPosition, Id, Cell } from '@silevis/reactgrid';
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
        columns: columns(true, true),
        rows: rows(true),
        frozenTopRows: 1,
        frozenLeftColumns: 2,
        highlights: [],
    }

    intervalId?: number;

    componentDidMount() {
        this.setVirtualEnv();
    }

    componentWillUnmount() {
        this.unsetVirtualEnv();
    }

    private setVirtualEnv() {
        const virtEnv: VirtualEnv = new VirtualEnv(this.makeChanges);

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


    private makeChanges = (changes: CellChange[]): IMultiUserSampleState => {
        let newState = { ...this.state };
        changes.forEach((change: any) => {
            const changeRowIdx = newState.rows.findIndex(el => el.rowId === change.rowId);
            const changeColumnIdx = newState.columns.findIndex(el => el.columnId === change.columnId);
            newState.rows[changeRowIdx].cells[changeColumnIdx] = change.newCell;
        })
        this.setState(newState);
        return newState;
    }

    private reorderArray = <T extends {}>(arr: T[], idxs: number[], to: number) => {
        const movedElements: T[] = arr.filter((_: T, idx: number) => idxs.includes(idx));
        to = Math.min(...idxs) < to ? to += 1 : to -= idxs.filter(idx => idx < to).length;
        const leftSide: T[] = arr.filter((_: T, idx: number) => idx < to && !idxs.includes(idx));
        const rightSide: T[] = arr.filter((_: T, idx: number) => idx >= to && !idxs.includes(idx));
        return [...leftSide, ...movedElements, ...rightSide];
    }

    private handleCanReorderColumns = (targetColumnId: Id, columnIds: Id[], dropPosition: DropPosition): boolean => {
        return true;
    }

    private handleCanReorderRows = (targetColumnId: Id, rowIds: Id[], dropPosition: DropPosition): boolean => {
        const rowIndex = this.state.rows.findIndex((row: Row) => row.rowId === targetColumnId);
        if (rowIndex === 0) return false;
        return true;
    }

    private handleColumnsReordered = (targetColumnId: Id, columnIds: Id[], dropPosition: DropPosition) => {
        const to = this.state.columns.findIndex((column: Column) => column.columnId === targetColumnId);
        this.setState({
            columns: this.reorderArray<Column>(this.state.columns, columnIds as number[], to),
            rows: this.state.rows.map(row => ({ ...row, cells: this.reorderArray<Cell>(row.cells, columnIds as number[], to) })),
        });
    }

    private handleRowsReordered = (targetRowId: Id, rowIds: Id[], dropPosition: DropPosition) => {
        const newState = { ...this.state };
        const to = this.state.rows.findIndex((row: Row) => row.rowId === targetRowId);
        const ids = rowIds.map((id: Id) => this.state.rows.findIndex(r => r.rowId === id)) as number[];
        this.setState({ ...newState, rows: this.reorderArray<Row>(this.state.rows, ids, to) });
    }

    private handleChanges = (changes: CellChange[]): boolean => {
        this.makeChanges(changes);
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
                    canReorderColumns={this.handleCanReorderColumns}
                    canReorderRows={this.handleCanReorderRows}
                    onColumnsReordered={this.handleColumnsReordered}
                    onRowsReordered={this.handleRowsReordered}
                    license={'non-commercial'}
                    enableColumnSelection
                    enableRowSelection
                />
            </ReactGridContainer>
        )
    }
}