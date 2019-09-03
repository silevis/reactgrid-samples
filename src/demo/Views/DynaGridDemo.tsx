import * as React from 'react';
import { ColumnProps, RowProps, CellMatrixProps, DataChange, Id, MenuOption, Range } from '../../lib/Common';
import { DynaGrid } from '../../lib/Components/DynaGrid';
import { VirtualEnv, VirtualUser, DynaGridDataGenerator } from '../../lib/Common/VirtualUser';
import styled, { ThemeConsumer } from 'styled-components';
import { FeatureListContainer } from '../Views/DemoComponents/FeatureListContainer'
interface Column {
    id: number;
    name: string;
    type: string;
    width: number;
    pinned: boolean;
}

export interface Record {
    id: number;
    name: string;
    surname: string;
    age: number;
    country: string;
    position: string;
    onHoliday: boolean;
    pinned: boolean;
}

export interface IDynaGridDemoState {
    fields: Column[];
    records: Record[];
    focuses: { colId: number, rowId: number, color: string }[];
    virtualUsers: boolean;
    resizing: boolean;
    columnReordering: boolean;
    rowReordering: boolean;
    frozenPanes: { top: number, bottom: number, left: number, right: number, active: boolean };
}

export interface IDemoActions {
    toggleResizeAction(): void;
    toggleColumnReorderAction(): void;
    toggleRowReorderAction(): void;
    toogleFreezePaneAction(): void;
    toggleVirtualUsersAction(): void;
    addNewRecordAction(): void;
    addNewFieldAction(): void;
}

const DemoContainer = styled.div`
    margin: 0;
    padding: 0;
`;

const H1 = styled.h1`
    text-align: center;
    margin: 10px 0;
`;

const H3 = styled.h3`
    text-align: center;
    margin: 6px 0;
`;

const DemoHeader = styled.div`
    font-family: Arial, Helvetica, sans-serif;
    margin: 30px 0;
    padding: 0;
`;

const DemoBody = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    margin: 0;
    padding: 0;
`;

const DynaGridContainer = styled.div`
    position: relative;
    margin-left: 10px;
    width: 100%;
    min-height: 400px;
    font-family: Arial  , Helvetica, sans-serif;
`

const fields: Column[] = [
    {
        id: 1,
        name: 'name',
        type: 'text',
        width: 125,
        pinned: false,
    },
    {
        id: 2,
        name: 'surname',
        type: 'text',
        width: 125,
        pinned: false,
    },
    {
        id: 3,
        name: 'age',
        type: 'number',
        width: 125,
        pinned: false,
    },
    {
        id: 4,
        name: 'country',
        type: 'flag',
        width: 125,
        pinned: false,
    },
    {
        id: 5,
        name: 'position',
        type: 'text',
        width: 125,
        pinned: false,
    },
    {
        id: 6,
        name: 'onHoliday',
        type: 'checkbox',
        width: 125,
        pinned: false,
    },
]

const records: any[] = [
    {
        id: 'Id',
        name: 'Name',
        surname: "Surname",
        age: 'age',
        country: 'Country',
        position: 'Position',
        onHoliday: 'On Holiday',
        pinned: false,
    },
    {
        id: 1,
        name: 'Marcin',
        surname: "Kowalski",
        age: 21,
        country: 'pol',
        position: 'CEO',
        onHoliday: false,
        pinned: false,
    },
    {
        id: 2,
        name: 'Arkadiusz',
        surname: "Kowalewski",
        age: 19,
        country: 'can',
        position: 'Manager',
        onHoliday: true,
        pinned: false,
    },
    {
        id: 3,
        name: 'Marlena',
        surname: "Zalewska",
        age: 34,
        country: 'ven',
        position: 'Director',
        onHoliday: false,
        pinned: false,
    },
]



export class DynaGridDemo extends React.Component<{}, IDynaGridDemoState> {

    state = {
        fields: [...fields],
        records: [...records],
        focuses: [],
        virtualUsers: false,
        resizing: false,
        columnReordering: false,
        rowReordering: false,
        frozenPanes: { top: 0, bottom: 0, left: 0, right: 0, active: false },
    }

    intervalId: number = 0;

    private setVirtualEnv() {
        this.setState({ virtualUsers: true })
        const virtEnv: VirtualEnv = new VirtualEnv(this.state, this.prepareDataChanges);

        virtEnv
            .addUser(new VirtualUser('#fff700'))
            .addUser(new VirtualUser('#03fceb'))
            .addUser(new VirtualUser('#5b5b73'));

        this.intervalId = window.setInterval(() => {
            const state = virtEnv.updateView(this.state);
            this.setState(state);
        }, 1000)

    }

    private addNewRecord() {
        const dataGen: DynaGridDataGenerator = new DynaGridDataGenerator();
        const records = [...this.state.records];
        for (let x = 0; x < 10; x++) {
            records.push(dataGen.createNewUser());
        }
        this.setState({ records });
    }

    private addNewField() {
        const nextId = Math.max(...this.state.fields.map(field => field.id), 1) + 1;
        const randomCapitalLetter = String.fromCharCode(65 + Math.floor(Math.random() * 26));
        const fieldName = nextId + randomCapitalLetter;
        const newField: Column = {
            id: nextId,
            name: fieldName,
            type: "text",
            width: 125,
            pinned: false,
        };
        // TODO ... identyfikowanie headera po innym  Id
        const updatedHeaderRecord: Record = { ...this.state.records.find((record: any) => { return record.id === 'Id' ?  record : undefined }) , [fieldName]: fieldName };
        const updatedRecords: Record[] = [...this.state.records.map((record: any): Record => { return record.id === 'Id' ? updatedHeaderRecord : record } )];

        this.setState({ fields: [...this.state.fields, newField], records: updatedRecords});
    }

    private unsetVirtualEnv() {
        this.setState({ virtualUsers: false, focuses: [] });
        window.clearInterval(this.intervalId)
    }

    private generateMatrix(): CellMatrixProps {
        const columns: ColumnProps[] = this.state.fields.map((field, idx) => ({
            id: field.id,
            width: field.width,
            reorderable: this.state.columnReordering,
            resizable: this.state.resizing,
            onDrop: (ids) => this.setState({ fields: this.reorderedColumns(ids as number[], idx) }),
            onResize: width => { this.state.fields[idx].width = width, this.forceUpdate(); }
        }));

        const rows: RowProps[] = this.state.records.map((record: any, rowIdx) => ({
            id: record.id,
            height: 25,
            reorderable: this.state.rowReordering,
            cells: this.state.fields.map(field => { return { data: record[field.name], type: rowIdx == 0 ? 'header' : field.type } }),
            onDrop: (ids) => this.setState({ records: this.reorderedRows(ids as number[], rowIdx) }),
        }))
        const frozenPanes = {
            frozenBottomRows: this.state.frozenPanes.bottom,
            frozenLeftColumns: this.state.frozenPanes.left,
            frozenRightColumns: this.state.frozenPanes.right,
            frozenTopRows: this.state.frozenPanes.top
        }
        return Object.assign({ columns, rows }, frozenPanes)
    }

    private prepareDataChanges = (dataChanges: DataChange[]): IDynaGridDemoState => {
        const state = { ...this.state }
        dataChanges.forEach(change => {
            state.records.forEach(r => {
                if (r.id == change.rowId) {
                    const field = this.state.fields.find(c => c.id == change.columnId)
                    if (field !== undefined) {
                        r[field.name] = change.newData;
                    }
                }
            })
        })
        return state
    }

    private calculateColumnReorder(fields: Column[], colIdxs: number[], direction: string, destination: number): Column[] {
        const movedColumns: Column[] = fields.filter((_, idx) => colIdxs.includes(idx));
        const clearedFields: Column[] = fields.filter((_, idx) => !colIdxs.includes(idx));
        if (direction === 'right') {
            destination = destination - colIdxs.length + 1
        }
        clearedFields.splice(destination, 0, ...movedColumns)
        return clearedFields
    }

    private reorderedColumns(colIdxs: number[], to: number) {
        const direction = to > colIdxs[0] ? 'right' : 'left'
        return this.calculateColumnReorder([...this.state.fields], colIdxs, direction, to)
    }

    private reorderedRows(rowIdxs: number[], to: number) {
        const movedRecords = [...this.state.records].filter((_, idx) => rowIdxs.includes(idx));
        const clearedRecords = [...this.state.records].filter((_, idx) => !rowIdxs.includes(idx));
        if (to > rowIdxs[0])
            to = to - rowIdxs.length + 1
        clearedRecords.splice(to, 0, ...movedRecords)
        return clearedRecords
    }

    private handleRowContextMenu(selectedRowIds: Id[], menuOptions: MenuOption[]): MenuOption[] {
        if (selectedRowIds.length === 0) return menuOptions;
        menuOptions = menuOptions.concat([
            {
                title: 'Delete row', handler: () => this.setState({ records: this.deleteRows(selectedRowIds) })
            },
            {
                title: 'Pin row to the top', handler: () => this.setState(this.pinRows(selectedRowIds, 'top'))
            },
            {
                title: 'Pin row to the bottom', handler: () => this.setState(this.pinRows(selectedRowIds, 'bottom'))
            },
            {
                title: 'Unpin row(s)', handler: () => this.setState(this.unpinRows(selectedRowIds))
            },
        ]);

        if (this.state.records.filter(r => selectedRowIds.includes(r.id)).some(r => r.pinned == true))
            menuOptions = menuOptions.filter(o => o.title !== 'Pin row to the top' && o.title !== 'Pin row to the bottom')
        else if (this.state.records.filter(r => selectedRowIds.includes(r.id)).some(r => r.pinned == false))
            menuOptions = menuOptions.filter(o => o.title !== 'Unpin row(s)')

        return menuOptions
    }

    private handleColContextMenu(selectedColIds: Id[], menuOptions: MenuOption[]): MenuOption[] {
        if (selectedColIds.length === 0) return menuOptions;
        menuOptions = menuOptions.concat([
            {
                title: 'Delete Column', handler: () => this.setState({ fields: this.deleteColumns(selectedColIds) })
            },
            {
                title: 'Pin column to the left', handler: () => this.setState(this.pinColumns(selectedColIds, 'left'))
            },
            {
                title: 'Pin column to the right', handler: () => this.setState(this.pinColumns(selectedColIds, 'right'))
            },
            {
                title: 'Unpin column(s)', handler: () => this.setState(this.unpinColumns(selectedColIds))
            },
        ]);

        if (this.state.fields.filter(f => selectedColIds.includes(f.id)).some(f => f.pinned == true))
            menuOptions = menuOptions.filter(o => o.title !== 'Pin column to the left' && o.title !== 'Pin column to the right')
        else if (this.state.fields.filter(f => !selectedColIds.includes(f.id)).some(f => f.pinned == false))
            menuOptions = menuOptions.filter(o => o.title !== 'Unpin column(s)')

        return menuOptions
    }

    private deleteRows(selectedRowIds: Id[]): Record[] {
        return [...this.state.records].filter(r => !selectedRowIds.includes(r.id));
    }

    private deleteColumns(selectedColIds: Id[]): Column[] {
        return [...this.state.fields].filter(f => !selectedColIds.includes(f.id));
    }

    private pinColumns(ids: Id[], direction: 'left' | 'right'): IDynaGridDemoState {
        const indexes: number[] = ids.map(id => this.state.fields.findIndex(f => f.id == id));
        if (direction == 'left') {
            return {
                ...this.state,
                fields: this.reorderedColumns(indexes, this.state.frozenPanes.left).map(f => ids.includes(f.id) ? { ...f, pinned: true } : f),
                frozenPanes: { ...this.state.frozenPanes, left: this.state.frozenPanes.left + indexes.length }
            }

        } else {
            return {
                ...this.state,
                fields: this.reorderedColumns(indexes, this.state.fields.length - this.state.frozenPanes.right - 1).map(f => ids.includes(f.id) ? { ...f, pinned: true } : f),
                frozenPanes: { ...this.state.frozenPanes, right: this.state.frozenPanes.right + indexes.length },
            }
        }
    }

    private unpinColumns(ids: Id[]) {
        const indexes: number[] = ids.map(id => this.state.fields.findIndex(f => f.id == id)).filter(i => this.state.fields[i].pinned == true)
        if (indexes[0] > this.state.frozenPanes.left) {
            return {
                ...this.state,
                fields: this.calculateColumnReorder([...this.state.fields], indexes, 'right', this.state.fields.length - this.state.frozenPanes.right).map(f => ids.includes(f.id) ? { ...f, pinned: false } : f),
                frozenPanes: {
                    ...this.state.frozenPanes,
                    right: this.state.frozenPanes.right - indexes.length
                }
            }

        } else {
            return {
                ...this.state,
                fields: this.calculateColumnReorder([...this.state.fields], indexes, 'left', this.state.frozenPanes.left - indexes.length).map(f => ids.includes(f.id) ? { ...f, pinned: false } : f),
                frozenPanes: {
                    ...this.state.frozenPanes,
                    left: this.state.frozenPanes.left - indexes.length,
                }
            }
        }
    }

    private unpinRows(ids: Id[]) {
        const indexes: number[] = ids.map(id => this.state.records.findIndex(r => r.id == id)).filter(i => this.state.records[i].pinned == true)
        if (indexes[0] > this.state.frozenPanes.top) {
            return {
                ...this.state,
                records: this.reorderedRows(indexes, this.state.records.length - this.state.frozenPanes.bottom).map(f => ids.includes(f.id) ? { ...f, pinned: false } : f),
                frozenPanes: {
                    ...this.state.frozenPanes,
                    bottom: this.state.frozenPanes.bottom - indexes.length
                }
            }
        } else {
            return {
                ...this.state,
                records: this.reorderedRows(indexes, this.state.frozenPanes.top - 1).map(f => ids.includes(f.id) ? { ...f, pinned: false } : f),
                frozenPanes: {
                    ...this.state.frozenPanes,
                    top: this.state.frozenPanes.top - indexes.length,
                }
            }
        }

    }

    private pinRows(ids: Id[], direction: 'top' | 'bottom'): IDynaGridDemoState {
        const indexes: number[] = [];
        ids.forEach(id => indexes.push(this.state.records.findIndex(r => r.id == id)))
        if (direction == 'top') {
            return {
                ...this.state,
                records: this.reorderedRows(indexes, this.state.frozenPanes.top).map(r => ids.includes(r.id) ? { ...r, pinned: true } : r),
                frozenPanes: { ...this.state.frozenPanes, top: this.state.frozenPanes.top + indexes.length }
            }
        } else {
            return {
                ...this.state,
                records: this.reorderedRows(indexes, this.state.records.length - this.state.frozenPanes.bottom - 1).map(r => ids.includes(r.id) ? { ...r, pinned: true } : r),
                frozenPanes: { ...this.state.frozenPanes, bottom: this.state.frozenPanes.bottom + indexes.length }
            }
        }
    }

    private handleRangeContextMenu(selectedRanges: Range[], menuOptions: MenuOption[]): MenuOption[] {
        let selectedRowIds: Id[] = [];
        let selectedColIds: Id[] = [];
        let options = menuOptions.concat([
            {
                title: 'Delete row', handler: () => this.setState({ records: this.deleteRows(selectedRowIds) })
            },
            {
                title: 'Delete column', handler: () => this.setState({ fields: this.deleteColumns(selectedColIds) })
            },
        ]);

        selectedRanges.forEach((range, idx) => {
            range.cols.forEach((col, colIdx) => {
                selectedColIds.push(col.id);
                range.rows.forEach((row, rowIdx) => {
                    selectedRowIds.push(row.id);
                    if (range.cols[colIdx].idx === 0) {
                        options = options.filter(option =>
                            option.title !== 'Delete column' &&
                            option.title !== 'Pin column to the right' &&
                            option.title !== 'Pin column to the left')
                    }
                    if (range.rows[rowIdx].idx === 0) {
                        options = options.filter(option =>
                            option.title !== 'Delete row' &&
                            option.title !== 'Pin row to the top' &&
                            option.title !== 'Pin row to the bottom')
                    }
                })
            })
        });

        // delete duplicated ids
        selectedRowIds = Array.from(new Set(selectedRowIds));
        selectedColIds = Array.from(new Set(selectedColIds));

        return options;
    }

    demoActions: IDemoActions = {
        toggleResizeAction: () => {
            this.setState({ resizing: !this.state.resizing })
        },
        toggleColumnReorderAction: () => {
            this.setState({ columnReordering: !this.state.columnReordering })
        },
        toggleRowReorderAction: () => {
            this.setState({ rowReordering: !this.state.rowReordering })
        },
        toogleFreezePaneAction: () => {
            this.setState({
                frozenPanes: this.state.frozenPanes.active ? { top: 0, bottom: 0, left: 0, right: 0, active: false } :
                    { top: 1, bottom: 1, left: 1, right: 1, active: true }
            })
        },
        toggleVirtualUsersAction: () => {
            this.state.virtualUsers ? this.unsetVirtualEnv() : this.setVirtualEnv()
        },
        addNewRecordAction: () => {
            this.addNewRecord();
        },
        addNewFieldAction: () => {
            this.addNewField();
        }
    }

    render() {
        return <DemoContainer>
            <DemoHeader>
                <H1>Customize your ReactGrid</H1>
                <H3>Choose from the most popular features</H3>
            </DemoHeader>
            <DemoBody>
                <FeatureListContainer
                    demoActions={this.demoActions}
                    state={this.state} />
                <DynaGridContainer>
                    <DynaGrid
                        cellMatrixProps={this.generateMatrix()}
                        onDataChanged={changes => this.setState(this.prepareDataChanges(changes))}
                        customFocuses={this.state.focuses}
                        onRowContextMenu={(selectedRowIds: Id[], menuOptions: MenuOption[]) => this.handleRowContextMenu(selectedRowIds, menuOptions)}
                        onColumnContextMenu={(selectedColIds: Id[], menuOptions: MenuOption[]) => this.handleColContextMenu(selectedColIds, menuOptions)}
                        onRangeContextMenu={(selectedRanges: Range[], menuOptions: MenuOption[]) => this.handleRangeContextMenu(selectedRanges, menuOptions)}
                    />
                </DynaGridContainer>
            </DemoBody>
        </DemoContainer>
    }
}