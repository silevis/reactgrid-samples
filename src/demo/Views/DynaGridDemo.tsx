import * as React from 'react';
import {Component} from 'react';
import { ColumnProps, RowProps, CellMatrixProps, DataChange, Id, MenuOption, Range } from '../../lib/Common';
import { DynaGrid } from '../../lib/Components/DynaGrid';

interface Column {
    id: number;
    name: string;
    type: string;
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

const fields: Column[] = [
    {
        id: 1,
        name: 'id',
        type: 'number',
    },
    {
        id: 2,
        name: 'name',
        type: 'text',
    },
    {
        id: 3,
        name: 'surname',
        type: 'text',
    },
    {
        id: 4,
        name: 'age',
        type: 'number',
    },
    {
        id: 5,
        name: 'country',
        type: 'text',
    },
    {
        id: 6,
        name: 'position',
        type: 'text',
    },
    {
        id: 7,
        name: 'onHoliday',
        type: 'checkbox',
    },
]

const records: {[key:string]: any}[] = [
    {
        'id': 'Id',
        'name': 'Name',
        'surname': "Surname",
        'age': 'age',
        'country': 'Country',
        'position': 'Position',
        'onHoliday': 'On Holiday',
    },
    {
        'id': 1,
        'name': 'Marcin',
        'surname': "Kowalski",
        'age': 21,
        'country': 'Poland',
        'position': 'CEO',
        'onHoliday': false,
    },
]

export class DynaGridDemo extends React.Component {
    
    state = {
        fields: [...fields],
        records: [...records],
        isLoaded: false,
    }

    private generateMatrix(): CellMatrixProps  {
        const columns: ColumnProps[] = this.state.fields.map((field, idx) => ({
            id: field.id,
            width: 125,
            reorderable: true,
            resizable: true,
        }));

        const rows: RowProps[] = this.state.records.map((record, rowIdx) => ({
            id: record.id,
            height: 25,
            reorderable: true,
            cells: this.state.fields.map(field => {return {data: record[field.name], type: rowIdx == 0 ? 'header' : field.type }})
        }))
        
        return { columns, rows}
    }


    private handleDataChanges(dataChanges: DataChange[]) {
        this.setState(this.prepareDataChanges(dataChanges))
    }

    private prepareDataChanges(dataChanges: DataChange[]) {
        const state = { ...this.state }
        dataChanges.forEach(change => {
            state.records.forEach(r => r['id'] == change.rowId ? r['country'] = change.newData : r)
        })
        return state
    }

    render(){
        return <DynaGrid 
                cellMatrixProps={this.generateMatrix()}
                onDataChanged={changes => this.handleDataChanges(changes)} />
    }
}

