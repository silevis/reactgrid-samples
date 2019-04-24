import * as React from "react"
import { Grid, CellMatrix } from 'lib'
import { TextCell } from 'lib'
import { ColProps, RowProps } from '../../../../react-dyna-grid-new/src/lib/Model';


export interface Field {
    prop: string
    width: number
    name: string
}


export class PivotGrid extends React.Component<{}, { cellMatrix: CellMatrix }> {
    private records: any[] = []
    // private fields: Field[] = [
    //     { prop: "name", width: 200, name: 'Name' },
    //     { prop: "surname", width: 200, name: ' Surname' },
    //     { prop: "task", width: 140, name: 'Task' },
    //     { prop: "month", width: 140, name: 'Month' },
    //     { prop: 'year', width: 200, name: 'Year' }
    // ]
    componentWillMount() {
        this.generateRecords()
        this.generateCellMatrix()
    }

    render() {
        return (<div style={{ margin: 0 }}>
            <Grid style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, fontFamily: ' Sans-Serif' }}
                cellMatrix={this.state.cellMatrix}
                onValuesChanged={() => { this.generateCellMatrix(); }}
            />
        </div>
        )
    }

    generateCellMatrix() {
        let cells: any = []
        let years = [2015, 2016, 2017, 2018]
        let months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
        let fields = ['name', 'surname', 'task']
        let row: any = [TextCell.Create('M/Y', value => { })]
        months.forEach(month => {
            fields.forEach(field => {
                row.push(TextCell.Create(month.toString(), value => { }))
            })
        })
        cells.push(row)
        row = [TextCell.Create('Field', value => { })]
        months.forEach(month => {
            fields.forEach(field => {
                row.push(TextCell.Create(field, value => { }))
            })
        })
        cells.push(row)
        years.forEach(year => {
            row = [TextCell.Create(year.toString(), value => { })]
            row.push
            months.forEach(month => {
                fields.forEach(field => {
                    let value = this.records.find(r => r['month'] === month && r['year'] === year)[field]
                    console.log(value)
                    row.push(TextCell.Create(value, value => { }))
                })
            })
            cells.push(row)
        })

        //const cells = this.records.map((record, ri) => this.fields.map((field, fi) => TextCell.Create(record[field.prop], value => record[field.prop] = value)))
        //this.fields.forEach((r, j) => cells[0][j] = HeaderCell.Create('horizontal', r.name, value => { this.fields[j].name = value }, true, true))
        const columns: ColProps[] = row.map((r: any) => { return { width: 200, context: undefined } as ColProps });
        const rows: RowProps[] = cells.map((record: any) => { return { height: 25, context: undefined } as RowProps })

        console.log(cells)
        console.log(columns)
        console.log(rows)
        this.setState({
            cellMatrix: new CellMatrix({
                columns: columns,
                rows: rows,
                cells: cells,
                frozenTopRows: 0
            })
        })
    }

    generateRecords() {
        for (let i = 1; i <= 12; i++) {
            for (let j = 2014; j <= 2018; j++) {
                this.records.push({
                    name: 'John' + i + j, surname: 'Cena' + i + j, task: 'Eating' + i + j, month: i, year: j
                })
            }
        }
    }


}