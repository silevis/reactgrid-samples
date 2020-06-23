import * as React from 'react';
import { ReactGrid, CellChange, Highlight, Column, DropPosition, Id, Cell, SelectionMode, MenuOption, DefaultCellTypes } from '@silevis/reactgrid';
import styled from 'styled-components';
import { VirtualEnv, VirtualUser } from './VirtualUser';
import { columns } from '../../data/crm/columns';
import { rows } from '../../data/crm/rows';
import { FlagCellTemplate, FlagCell } from '../../cell-templates/flagCell/FlagCellTemplate';
import { DropdownNumberCellTemplate, DropdownNumberCell } from '../../cell-templates/dropdownNumberCell/DropdownNumberCellTemplate';
import './styling.scss';

const ReactGridContainer = styled.div`
  /* height: 300px;
  width: 800px;
  overflow: auto; */
`;

export interface IDatagridState {
    columns: Column[],
    rows: ReturnType<typeof rows>,
    stickyTopRows?: number,
    stickyLeftColumns?: number,
    highlights: Highlight[]
}

export class DatagridSample extends React.Component<{}, IDatagridState> {

    state = {
        columns: columns(true, true),
        rows: [
            ...rows(true),
        ],
        stickyTopRows: 1,
        stickyLeftColumns: 2,
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


    private makeChanges = (changes: CellChange<DefaultCellTypes | FlagCell | DropdownNumberCell>[]): IDatagridState => {
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
        const rowIndex = this.state.rows.findIndex(row => row.rowId === targetColumnId);
        if (rowIndex === 0) return false;
        return true;
    }

    private handleColumnsReorder = (targetColumnId: Id, columnIds: Id[], dropPosition: DropPosition) => {
        const to = this.state.columns.findIndex((column: Column) => column.columnId === targetColumnId);
        const columnIdxs = columnIds.map((id: Id, idx: number) => this.state.columns.findIndex((c: Column) => c.columnId === id));
        this.setState({
            columns: this.reorderArray(this.state.columns, columnIdxs, to),
            rows: this.state.rows.map(row => ({ ...row, cells: this.reorderArray(row.cells, columnIdxs, to) })),
        });
    }

    private handleRowsReorder = (targetRowId: Id, rowIds: Id[], dropPosition: DropPosition) => {
        const newState = { ...this.state };
        const to = this.state.rows.findIndex(row => row.rowId === targetRowId);
        const ids = rowIds.map((id: Id) => this.state.rows.findIndex(r => r.rowId === id));
        this.setState({ ...newState, rows: this.reorderArray(this.state.rows, ids, to) });
    }

    private handleChanges = (changes: CellChange<DefaultCellTypes | FlagCell | DropdownNumberCell>[]) => {
        this.makeChanges(changes);
    }

    private handleColumnResize = (ci: Id, width: number) => {
        let newState = { ...this.state };
        const columnIndex = newState.columns.findIndex(el => el.columnId === ci);
        const resizedColumn: Column = newState.columns[columnIndex];
        const updateColumn: Column = { ...resizedColumn, width };
        newState.columns[columnIndex] = updateColumn;
        this.setState(newState);
    }

    private handleContextMenu = (selectedRowIds: Id[], selectedColIds: Id[], selectionMode: SelectionMode, menuOptions: MenuOption[]): MenuOption[] => {
        if (selectionMode === 'row') {
            menuOptions = [
                ...menuOptions,
                {
                    id: 'removeRow', label: 'Remove row', handler: () => {
                        const highlights = this.state.highlights.filter((h: Highlight) => !selectedRowIds.includes(h.rowId));
                        this.setState({ rows: this.state.rows.filter(row => !selectedRowIds.includes(row.rowId)), highlights });
                    }
                },
            ]
        }
        if (selectionMode === 'column') {
            menuOptions = [
                ...menuOptions,
                {
                    id: 'removeColumn', label: 'Remove column', handler: () => {
                        const columns: Column[] = this.state.columns.filter((column: Column) => !selectedColIds.includes(column.columnId));
                        const columnsIdxs = this.state.columns.map((column: Column, idx: number) => {
                            if (!columns.includes(column)) return idx;
                            return undefined;
                        }).filter(idx => idx !== undefined);
                        const rows = this.state.rows.map(row => ({ ...row, cells: row.cells.filter((_: Cell, idx: number) => !columnsIdxs.includes(idx)) }));
                        const highlights = this.state.highlights.filter((h: Highlight) => !selectedColIds.includes(h.columnId));
                        this.setState({ columns, rows, highlights });
                    }
                },
            ]
        }
        return menuOptions;
    }

    render() {
        return (
            <ReactGridContainer id="datagrid-sample">
                <ReactGrid
                    columns={this.state.columns}
                    rows={this.state.rows}
                    onCellsChanged={this.handleChanges}
                    customCellTemplates={{
                        'flag': new FlagCellTemplate,
                        'dropdownNumber': new DropdownNumberCellTemplate
                    }}
                    stickyTopRows={this.state.stickyTopRows}
                    stickyLeftColumns={this.state.stickyLeftColumns}
                    highlights={this.state.highlights}
                    canReorderColumns={this.handleCanReorderColumns}
                    canReorderRows={this.handleCanReorderRows}
                    onColumnsReordered={this.handleColumnsReorder}
                    onContextMenu={this.handleContextMenu}
                    onRowsReordered={this.handleRowsReorder}
                    onColumnResized={this.handleColumnResize}
                    enableColumnSelection
                    enableRowSelection
                    enableFillHandle
                    enableRangeSelection
                />
            </ReactGridContainer>
        )
    }
}