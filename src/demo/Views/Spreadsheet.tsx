import * as React from 'react'
import { ColumnProps, RowProps, CellMatrix, Cell } from '../../lib/Common';
import { TextCell } from '../../lib/Cells/TextCell';
import { Grid } from '../../lib/Components/Grid';
import { ColumnHeaderCell } from '../../lib/Cells/ColumnHeaderCell';
import { RowHeaderCell } from '../../lib/Cells/RowHeaderCell';
import { SSL_OP_EPHEMERAL_RSA } from 'constants';

export class Spreadsheet extends React.Component<{}, { data: string[][] }> {
    constructor(props: {}) {
        super(props);
        this.state = {
            data: Array(12).fill(0).map((_, ri) => Array(12).fill(0).map((_, ci) => (ri + 100) + ' - ' + (ci + 100)))
        }

    }



    private generateCellMatrix() {
        const cells: any = this.state.data.map((row, ri) =>
            row.map((value, ci) => new TextCell(value, v => { console.log(v); this.state.data[ri][ci] = v; this.setState(this.state); return true }))
        )
        const columns: ColumnProps[] = this.state.data[0].map((c, idx) => { return { id: idx, width: 75, context: idx, onDropLeft: (cols) => this.reorderColumns(cols, idx), onDropRight: (cols) => this.reorderColumns(cols, idx) } });
        const rows: RowProps[] = this.state.data.map(_ => { return { height: 25, context: undefined } })
        // rows.map((_, i) => cells[i][0] = new RowHeaderCell(i.toString(), v => { console.log(v); this.state.data[i][0] = v; this.setState(this.state); return true }))
        columns.map((_, j) => cells[0][j] = new ColumnHeaderCell(j.toString(), v => { console.log(v); this.state.data[0][j] = v; this.setState(this.state); return true }))
        // cells[0][0] = new ColumnHeaderCell('', v => { console.log(v); this.state.data[0][0] = v; this.setState(this.state); return true })
        return new CellMatrix({ frozenTopRows: 2, frozenLeftColumns: 2, frozenBottomRows: 2, frozenRightColumns: 2, rows, columns, cells: cells })
    }

    private calculateColumnReorder = (row: string[], colIdxs: number[], direction: string, destination: number) => {
        const movedColumns: string[] = row.filter((_, idx) => colIdxs.includes(idx));
        const clearedRow: string[] = row.filter((_, idx) => !colIdxs.includes(idx));
        if (direction === 'right') {
            destination = destination - colIdxs.length + 1
        }
        clearedRow.splice(destination, 0, ...movedColumns)
        return clearedRow
    }

    render() {
        console.log('render spreadsheet')
        return <Grid style={{ position: 'absolute', top: 40, bottom: 0, left: 0, right: 0, fontFamily: 'Sans-Serif' }}
            cellMatrix={this.generateCellMatrix()}
            onValuesChanged={() => this.forceUpdate()}
        />
    }

    reorderColumns(colIdxs: number[], to: number) {
        let data = [...this.state.data];
        if (to > colIdxs[0]) {
            data = data.map(r => this.calculateColumnReorder(r, colIdxs, 'right', to));
        } else {
            data = data.map(r => this.calculateColumnReorder(r, colIdxs, 'left', to));
        }
        this.setState({ data })
    }

}