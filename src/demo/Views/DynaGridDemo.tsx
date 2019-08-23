import * as React from 'react';
import { ColumnProps, RowProps, CellMatrixProps, DataChange, Id, MenuOption, Range } from '../../lib/Common';
import { DynaGrid } from '../../lib/Components/DynaGrid';
import { VirtualEnv, VirtualUser, DynaGridDataGenerator } from '../../lib/Common/VirtualUser';
import { any, number } from 'prop-types';
import { ThemeConsumer } from 'styled-components';
interface Column {
    id: number;
    name: string;
    type: string;
    width: number;
}

export interface Record {
    id: number;
    name: string;
    surname: string;
    age: number;
    country: string;
    position: string;
    onHoliday: boolean;
}

export interface IDynaGridDemoState {
    fields: Column[];
    records: Record[];
    focuses: { colId: number, rowId: number, color: string }[];
    virtualUsers: boolean;
    resizing: boolean;
    reordering: boolean;
    frozenPanes: { top: number, bottom: number, left: number, right: number, active: boolean };
}

const fields: Column[] = [
    {
        id: 1,
        name: 'id',
        type: 'number',
        width: 125,
    },
    {
        id: 2,
        name: 'name',
        type: 'text',
        width: 125,
    },
    {
        id: 3,
        name: 'surname',
        type: 'text',
        width: 125,
    },
    {
        id: 4,
        name: 'age',
        type: 'number',
        width: 125,
    },
    {
        id: 5,
        name: 'country',
        type: 'text',
        width: 125,
    },
    {
        id: 6,
        name: 'position',
        type: 'text',
        width: 125,
    },
    {
        id: 7,
        name: 'onHoliday',
        type: 'checkbox',
        width: 125,
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
    },
    {
        id: 1,
        name: 'Marcin',
        surname: "Kowalski",
        age: 21,
        country: 'Poland',
        position: 'CEO',
        onHoliday: false,
    },
    {
        id: 2,
        name: 'Arkadiusz',
        surname: "Kowalewski",
        age: 19,
        country: 'Czech Republic',
        position: 'Manager',
        onHoliday: true,
    },
    {
        id: 3,
        name: 'Marlena',
        surname: "Zalewska",
        age: 34,
        country: 'South Sudan',
        position: 'Director',
        onHoliday: false,
    },
]



export class DynaGridDemo extends React.Component {

    state = {
        fields: [...fields],
        records: [...records],
        focuses: [],
        virtualUsers: false,
        resizing: false,
        reordering: false,
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
        for (let x = 0; x < 5000; x++) {
            records.push(dataGen.createNewUser());
        }
        this.setState({ records });
    }

    private unsetVirtualEnv() {
        this.setState({ virtualUsers: false, focuses: [] });
        window.clearInterval(this.intervalId)
    }

    private generateMatrix(): CellMatrixProps {
        const columns: ColumnProps[] = this.state.fields.map((field, idx) => ({
            id: field.id,
            width: field.width,
            reorderable: this.state.reordering,
            resizable: this.state.resizing,
            onDrop: (ids) => this.reorderColumns(ids as number[], idx),
            onResize: width => { this.state.fields[idx].width = width, this.forceUpdate(); }
        }));

        const rows: RowProps[] = this.state.records.map((record, rowIdx) => ({
            id: record.id,
            height: 25,
            reorderable: this.state.reordering,
            cells: this.state.fields.map(field => { return { data: record[field.name], type: rowIdx == 0 ? 'header' : field.type } }),
            onDrop: (ids) => this.reorderRows(ids as number[], rowIdx),
        }))
        const frozenPanes = {
            frozenBottomRows: this.state.frozenPanes.bottom,
            frozenLeftColumns: this.state.frozenPanes.left,
            frozenRightColumns: this.state.frozenPanes.right,
            frozenTopRows: this.state.frozenPanes.top
        }
        return Object.assign({ columns, rows }, frozenPanes)
    }


    private handleDataChanges(dataChanges: DataChange[]) {
        this.setState(this.prepareDataChanges(dataChanges))
    }

    private prepareDataChanges = (dataChanges: DataChange[]) => {
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

    private calculateColumnReorder(colIdxs: number[], direction: string, destination: number) {
        const movedColumns: Column[] = this.state.fields.filter((_, idx) => colIdxs.includes(idx));
        const clearedFields: Column[] = this.state.fields.filter((_, idx) => !colIdxs.includes(idx));
        if (direction === 'right') {
            destination = destination - colIdxs.length + 1
        }
        clearedFields.splice(destination, 0, ...movedColumns)
        return clearedFields
    }

    private reorderColumns(colIdxs: number[], to: number) {
        let fields = [...this.state.fields];
        const direction = to > colIdxs[0] ? 'right' : 'left'
        fields = this.calculateColumnReorder(colIdxs, direction, to)
        this.setState({ fields })
    }

    private reorderRows(rowIdxs: number[], to: number) {
        const records = [...this.state.records];
        const movedRecords = records.filter((_, idx) => rowIdxs.includes(idx));
        const clearedRecords = records.filter((_, idx) => !rowIdxs.includes(idx));
        if (to > rowIdxs[0])
            to = to - rowIdxs.length + 1
        clearedRecords.splice(to, 0, ...movedRecords)
        this.setState({ records: clearedRecords })
    }

    private handleRowContextMenu(selectedRowIds: Id[], menuOptions: MenuOption[]): MenuOption[] {
        if (selectedRowIds.length === 0) return menuOptions;
        return menuOptions.concat([
            {
                title: 'Delete Row',
                handler: () => {
                    this.deleteRows(selectedRowIds);
                }
            },
            {
                title: 'Pin row to the top',
                handler: () => {
                    this.pinRows(selectedRowIds, 'top');
                }
            },
            {
                title: 'Pin row to the bottom',
                handler: () => {
                    this.pinRows(selectedRowIds, 'bottom');
                }
            },
        ]);
    }

    private handleColContextMenu(selectedColIds: Id[], menuOptions: MenuOption[]): MenuOption[] {
        if (selectedColIds.length === 0) return menuOptions;
        return menuOptions.concat([
            {
                title: 'Delete Column',
                handler: () => {
                    this.deleteColumns(selectedColIds)
                }
            },
            {
                title: 'Pin column to the left',
                handler: () => {
                    this.pinColumns(selectedColIds, 'left');
                }
            },
            {
                title: 'Pin column to the right',
                handler: () => {
                    this.pinColumns(selectedColIds, 'right');
                }
            },
        ]);
    }

    private deleteRows(selectedRowIds: Id[]) {
        const records = [...this.state.records].filter(r => !selectedRowIds.toString().includes(r.id));
        this.setState({ records })
    }

    private deleteColumns(selectedColIds: Id[]) {
        const fields = [...this.state.fields].filter(f => !selectedColIds.includes(f.id));
        this.setState({ fields })
    }

    private pinColumns(ids: Id[], direction: 'left' | 'right') {
        const indexes: number[] = [];
        ids.forEach(id => indexes.push(this.state.fields.findIndex(f => f.id == id)))
        if (direction == 'left') {
            this.reorderColumns(indexes, this.state.frozenPanes.left)
            this.setState({ frozenPanes: { ...this.state.frozenPanes, left: this.state.frozenPanes.left + indexes.length } })
        } else {
            this.reorderColumns(indexes, this.state.fields.length - this.state.frozenPanes.right - 1)
            this.setState({ frozenPanes: { ...this.state.frozenPanes, right: this.state.frozenPanes.right + indexes.length } })
        }
    }

    private pinRows(ids: Id[], direction: 'top' | 'bottom') {
        const indexes: number[] = [];
        ids.forEach(id => indexes.push(this.state.records.findIndex(r => r.id == id)))
        if (direction == 'top') {
            this.reorderRows(indexes, this.state.frozenPanes.top)
            this.setState({ frozenPanes: { ...this.state.frozenPanes, top: this.state.frozenPanes.top + indexes.length } })
        } else {
            this.reorderRows(indexes, this.state.records.length - this.state.frozenPanes.bottom - 1)
            this.setState({ frozenPanes: { ...this.state.frozenPanes, bottom: this.state.frozenPanes.bottom + indexes.length } })
        }
    }

    private handleRangeContextMenu(selectedRanges: Range[], menuOptions: MenuOption[]): MenuOption[] {
        let selectedRowIds: Id[] = [];
        let selectedColIds: Id[] = [];
        let options = menuOptions.concat([
            {
                title: 'Delete row',
                handler: () => {
                    this.deleteRows(selectedRowIds);
                }
            },
            {
                title: 'Delete column',
                handler: () => {
                    this.deleteColumns(selectedColIds);
                }
            },
            {
                title: 'Pin column to the left',
                handler: () => {
                    this.pinColumns(selectedColIds, 'left');
                }
            },
            {
                title: 'Pin column to the right',
                handler: () => {
                    this.pinColumns(selectedColIds, 'right');
                }
            },
            {
                title: 'Pin row to the top', handler: () => this.pinRows(selectedRowIds, 'top')
            },
            {
                title: 'Pin row to the bottom',
                handler: () => {
                    this.pinRows(selectedRowIds, 'bottom');
                }
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
                            option.title !== 'Pin row to the right' &&
                            option.title !== 'Pin row to the left')
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

    render() {
        return <div>
            <ul>
                <li>resize
                    <button onClick={() => this.setState({ resizing: !this.state.resizing })}>
                        {this.state.resizing ? 'on' : 'off'}
                    </button>
                </li>
                <li>reorder<button onClick={() => this.setState({ reordering: !this.state.reordering })}>{this.state.reordering ? 'on' : 'off'}</button></li>
                <li>frozenPanes
                    <button onClick={() =>
                        this.setState({ frozenPanes: this.state.frozenPanes.active ? { top: 0, bottom: 0, left: 0, right: 0, active: false } : { top: 1, bottom: 1, left: 1, right: 1, active: true } })}>
                        {this.state.frozenPanes.active ? 'on' : 'off'}
                    </button>
                </li>
                <li>virtualUsers
                    <button onClick={() => { this.state.virtualUsers ? this.unsetVirtualEnv() : this.setVirtualEnv(); }}>
                        {this.state.virtualUsers ? 'on' : 'off'}
                    </button>
                </li>
                <li>addNewRecord
                    <button onClick={() => { this.addNewRecord() }}>
                        add
                    </button>
                </li>
            </ul>
            <div style={{
                position: 'absolute',
                width: '100%',
                height: '50%'
            }}>
                <DynaGrid
                    cellMatrixProps={this.generateMatrix()}
                    onDataChanged={changes => this.handleDataChanges(changes)}
                    customFocuses={this.state.focuses}
                    onRowContextMenu={(selectedRowIds: Id[], menuOptions: MenuOption[]) => this.handleRowContextMenu(selectedRowIds, menuOptions)}
                    onColumnContextMenu={(selectedColIds: Id[], menuOptions: MenuOption[]) => this.handleColContextMenu(selectedColIds, menuOptions)}
                    onRangeContextMenu={(selectedRanges: Range[], menuOptions: MenuOption[]) => this.handleRangeContextMenu(selectedRanges, menuOptions)}
                />
            </div>
        </div>
    }
}

