import * as React from 'react';
import { ColumnProps, RowProps, CellMatrixProps, DataChange, Id, MenuOption, Range } from '../../lib/Common';
import { DynaGrid } from '../../lib/Components/DynaGrid';

function getRandomInt(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

function getRandomWord() {
    const words = [
        'SHARED',
        'GRID',
        'REACT',
        'RAPID',
        'RELIABLE',
    ]
    return words[getRandomInt(0, words.length)]
}

interface Column {
    id: number;
    name: string;
    type: string;
    width: number;
}

interface Record {
    id: number;
    name: string;
    surname: string;
    age: number;
    country: string;
    position: string;
    onHoliday: boolean;
}

interface IDynaGridDemoState {
    fields: Column[];
    records: Record[];
    focuses: any;
    // ... TODO zmodyfikowac any -> na typ tablicwy
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

class VirtualEnv {

    handleData: (data: any) => IDynaGridDemoState;
    private virtualUsers: VirtualUser[] = [];
    state: IDynaGridDemoState;

    constructor(state: IDynaGridDemoState, handleData: (data: any) => IDynaGridDemoState) {
        this.state = state;
        this.handleData = handleData;
    }

    addUser(virtualUser: VirtualUser): VirtualEnv {
        this.virtualUsers = [... this.virtualUsers, virtualUser]
        return this;
    }

    updateView = () => {
        let modifiedState: IDynaGridDemoState = this.state;
        this.virtualUsers.forEach(virtualUser => {
            modifiedState = virtualUser.makeChanges(modifiedState, this.handleData);
        });
        return modifiedState
    }
}

class VirtualUser {

    color: string;

    constructor(color: string) {
        this.color = color;
    }
    private count = 0;
    private focusX = 0;
    private focusY = 0;

    updateField(state: IDynaGridDemoState) {
        this.focusX = getRandomInt(1, state.fields.length)
        this.focusY = getRandomInt(1, state.records.length)
        var focuses = [...state.focuses].filter(f => f.color !== this.color)
        state = { ...state, focuses: [...focuses, { colId: state.fields[this.focusX].id, rowId: state.records[this.focusY].id, color: this.color }] }
    }

    makeChanges(state: IDynaGridDemoState, handleData: (data: any) => IDynaGridDemoState) {
        switch (this.count++) {
            case 0:
                this.updateField(state);
                break;
            case 1:
                if (state.fields[this.focusX] == undefined || state.records[this.focusY] == undefined)
                    break;
                state = { ...handleData([{ columnId: state.fields[this.focusX].id, rowId: state.records[this.focusY].id, type: 'text', initialData: '', newData: getRandomWord() }]), focuses: state.focuses }
                break;
            case 2:
                break;
            case 3:
                this.focusX = getRandomInt(1, state.fields.length)
                this.focusY = getRandomInt(1, state.records.length)
                var focuses = [...state.focuses].filter(f => f.color !== this.color)
                state = { ...state, focuses: [...focuses, { colId: state.fields[this.focusX].id, rowId: state.records[this.focusY].id, color: this.color }] }
                break;
            case 4:
                if (state.fields[this.focusX] == undefined || state.records[this.focusY] == undefined)
                    break;
                state = { ...handleData([{ columnId: state.fields[this.focusX].id, rowId: state.records[this.focusY].id, type: 'text', initialData: '', newData: getRandomWord() }]), focuses: state.focuses }
                break;
            case 5:
                this.count = 0;
                break;
        }
        return state;
    }
}

export class DynaGridDemo extends React.Component {

    state = {
        fields: [...fields],
        records: [...records],
        focuses: [],
        virtualUsers: false,
        resizing: false,
        reordering: false,
        frozenPanes: false,
    }

    intervalId: number = 0;

    componentDidMount() {
        if (this.state.virtualUsers) {
            const virtEnv: VirtualEnv = new VirtualEnv(this.state, this.prepareDataChanges);

            virtEnv
                .addUser(new VirtualUser('#fff700'))
                .addUser(new VirtualUser('#03fceb'))
                .addUser(new VirtualUser('#5b5b73'));

            this.intervalId = window.setInterval(() => {
                let state = virtEnv.updateView();
                this.setState(state);
            }, 1000)
        }
    }

    componentWillUnmount() {
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
            reorderable: this.state.resizing,
            cells: this.state.fields.map(field => { return { data: record[field.name], type: rowIdx == 0 ? 'header' : field.type } }),
            onDrop: (ids) => this.reorderRows(ids as number[], rowIdx),
        }))
        const frozenPanes = { frozenBottomRows: 1, frozenLeftColumns: 1, frozenRightColumns: 1, frozenTopRows: 1 }
        return Object.assign({ columns, rows }, this.state.frozenPanes ? frozenPanes : {})
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

    render() {
        return <div>
            <ul>
                <li>resize <button onClick={() => this.setState({ resizing: !this.state.resizing })}>{this.state.resizing ? 'on' : 'off'}</button></li>
                <li>reorder<button onClick={() => this.setState({ reordering: !this.state.reordering })}>{this.state.reordering ? 'on' : 'off'}</button></li>
                <li>frozenPanes<button onClick={() => this.setState({ frozenPanes: !this.state.frozenPanes })}>{this.state.frozenPanes ? 'on' : 'off'}</button></li>
                <li>virtualUsers<button onClick={() => { this.setState({ virtualUsers: !this.state.virtualUsers }); this.forceUpdate() }}>{this.state.virtualUsers ? 'on' : 'off'}</button></li>
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
                />
            </div>
        </div>
    }
}

