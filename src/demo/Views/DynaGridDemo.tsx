import * as React from 'react';
import {Component} from 'react';
import { ColumnProps, RowProps, CellMatrixProps, DataChange, Id, MenuOption, Range } from '../../lib/Common';
import { DynaGrid } from '../../lib/Components/DynaGrid';

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

const records: {[key:string]: any}[] = [
    {
        'id': 1,
        'name': 'Marcin',
        'surname': "Kowalski",
        'age': 21,
        'country': 'Poland',
        'position': 'CEO',
        'onHoliday': false,
    }
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
            width: field.width,
            reorderable: true,
            resizable: true,
        }));

        const rows: RowProps[] = this.state.records.map((record, rowIdx) => ({
            id: record.id,
            height: 25,
            reorderable: true,
            cells: this.state.fields.map((field, colIdx) => {return {data: record[field.name], type: field.type}})
        }))
        
        return {columns, rows}
    }

    render(){
        return <DynaGrid cellMatrixProps={this.generateMatrix()} />
    }
}

