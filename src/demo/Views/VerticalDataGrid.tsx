import * as React from "react"
import { Grid, CellMatrix } from 'lib'
import { HeaderCell, TextCell } from 'lib'
import { ColProps, RowProps, Column } from '../../lib/Model';


export interface Field {
    prop: string
    width: number
    name: string
}

export interface VerticalDataGridProps {
    records: any[]
    fields: Field[]
}

export class VerticalDataGrid extends React.Component<VerticalDataGridProps, { cellMatrix: CellMatrix }> {

    componentWillMount() {
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
        const cells = this.props.records.map((record, ri) => this.props.fields.map((field, fi) => TextCell.Create(record[field.prop], value => record[field.prop] = value)))
        this.props.fields.forEach((r, j) => cells[0][j] = HeaderCell.Create('horizontal', r.name, value => { this.props.fields[j].name = value }, true, true))
        const columns: ColProps[] = this.props.fields.map(col => { return { width: col.width, context: col, onDropRight: this.handleDropOnColumn.bind(this), onDropLeft: this.handleDropOnColumn.bind(this), onColResize: this.handleColResize.bind(this) } as ColProps });
        const rows: RowProps[] = this.props.records.map(record => { return { height: 25, context: record } })
        this.setState({
            cellMatrix: new CellMatrix({
                columns: columns,
                rows: rows,
                cells: cells,
                frozenTopRows: 1
            })
        })
    }

    handleDropOnColumn(reorderedColumns: Column[], targetColumn: Column) {
        const indexOfFirstReorderedColumn = this.props.fields.findIndex(field => field.prop === reorderedColumns[0].context.prop)
        const reorderedElements = this.props.fields.splice(indexOfFirstReorderedColumn, reorderedColumns.length)
        const positionChange = (targetColumn.idx > reorderedColumns[0].idx) ? targetColumn.idx - reorderedColumns[reorderedColumns.length - 1].idx : targetColumn.idx - reorderedColumns[0].idx
        this.props.fields.splice(indexOfFirstReorderedColumn + positionChange, 0, ...reorderedElements)
    }

    handleColResize = (resizedColumn: Column, newColWidth: number) => {
        console.log(this.props.fields[resizedColumn.idx].width)
        this.props.fields[resizedColumn.idx].width = newColWidth
        console.log(this.props.fields[resizedColumn.idx].width)
    }



}