import * as React from 'react'
import { Grid, CellMatrix } from 'lib'
import { RowProps, ColProps, Column, Row } from 'lib/Model';
import { HeaderCell, TextCell, NumberCell } from 'lib'

export interface Field {
    prop: string
    width: number
    name: string
}

export interface HorizontalDataGridProps {
    records: any[]
    fields: Field[]
}
export class HorizontalDataGrid extends React.Component<HorizontalDataGridProps, { cellMatrix: CellMatrix }> {

    componentWillMount() {
        this.generateCellMatrix()
    }

    generateCellMatrix() {
        const cells = this.props.fields.map((field, fi) => this.props.records.map((record, ri) =>
            (field.prop === 'age') ? NumberCell.Create(record[field.prop], (value: any) => record[field.prop] = value) :
                TextCell.Create(record[field.prop], (value: any) => record[field.prop] = value)))
        this.props.fields.forEach((f, i) => cells[i][0] = HeaderCell.Create('vertical', f.name, (value: any) => { this.props.fields[i].name = value }, true))
        const columns: ColProps[] = this.props.records.map(record => { return { width: 200, context: record } })
        const rows: RowProps[] = this.props.fields.map(field => { return { height: 25, context: field, onDropBelow: this.handleDropOnRow.bind(this), onDropAbove: this.handleDropOnRow.bind(this) } });
        this.setState({
            cellMatrix: new CellMatrix({
                columns: columns,
                rows: rows,
                cells: cells,
                frozenLeftColumns: 1,
                frozenRightColumns: 1
            })
        })
    }

    handleDropOnRow(reorderedRows: Row[], targetRow: Row) {
        const indexOfFirstReorderedRow = this.props.fields.findIndex(field => field.prop === reorderedRows[0].context.prop)
        const reorderedElements = this.props.fields.splice(indexOfFirstReorderedRow, reorderedRows.length)
        const positionChange = (targetRow.idx > reorderedRows[0].idx) ? targetRow.idx - reorderedRows[reorderedRows.length - 1].idx : targetRow.idx - reorderedRows[0].idx
        this.props.fields.splice(indexOfFirstReorderedRow + positionChange, 0, ...reorderedElements)
    }

    handleRowReorder = (firstReorderedRowIdx: number, selectedRowsCount: number, positionChange: number) => {
        const reorderedElement = this.props.fields.splice(firstReorderedRowIdx, selectedRowsCount)
        this.props.fields.splice(firstReorderedRowIdx + positionChange, 0, ...reorderedElement)
        this.generateCellMatrix()
    }

    handleColReorder = (reorderedColumns: Column[], targetColumn: Column, areColumnsMovingRight: boolean) => {

        this.generateCellMatrix()
    }

    handleColResize = (resizedColumnIdx: number, newColWidth: number) => {
        this.props.fields[resizedColumnIdx].width = newColWidth
        this.generateCellMatrix()
    }


    render() {
        return (<div style={{ margin: 0 }}>
            <Grid style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, fontFamily: ' Sans-Serif' }}
                cellMatrix={this.state.cellMatrix}
                onValuesChanged={() => { this.generateCellMatrix(); this.forceUpdate() }}
            />
        </div>
        )
    }
}