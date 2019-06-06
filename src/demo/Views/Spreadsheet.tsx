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
            data: Array(20).fill(0).map((_, ri) => Array(40).fill(0).map((_, ci) => (ri + 100) + ' - ' + (ci + 100)))
        }

    }



    private generateCellMatrix() {
        const cells: any = this.state.data.map((row, ri) =>
            row.map((value, ci) => new TextCell(value, v => { console.log(v); this.state.data[ri][ci] = v; this.setState(this.state); return true }))
        )
        const columns: ColumnProps[] = this.state.data[0].map((c, idx) => { return { id: idx, width: 75, context: idx, onDropLeft: (cols) => this.reorderColumns(cols[0].idx, idx, cols.length), onDropRight: (cols) => this.reorderColumns(cols[0].idx, idx, cols.length) } });
        const rows: RowProps[] = this.state.data.map(_ => { return { height: 25, context: undefined } })
        // rows.map((_, i) => cells[i][0] = new RowHeaderCell(i.toString(), v => { console.log(v); this.state.data[i][0] = v; this.setState(this.state); return true }))
        columns.map((_, j) => cells[0][j] = new ColumnHeaderCell(j.toString(), v => { console.log(v); this.state.data[0][j] = v; this.setState(this.state); return true }))
        // cells[0][0] = new ColumnHeaderCell('', v => { console.log(v); this.state.data[0][0] = v; this.setState(this.state); return true })
        return new CellMatrix({ frozenTopRows: 2, frozenLeftColumns: 2, frozenBottomRows: 2, frozenRightColumns: 2, rows, columns, cells: cells })
    }

    render() {
        console.log('render spreadsheet')
        return <Grid style={{ position: 'absolute', top: 40, bottom: 0, left: 0, right: 0, fontFamily: 'Sans-Serif' }}
            cellMatrix={this.generateCellMatrix()}
            onValuesChanged={() => this.forceUpdate()}
        />
    }

    reorderColumns(from: number, to: number, count: number) {
        console.log('from:' + from + ' to: ' + to + ' count: ' + count)
        const data = this.state.data;
        if (to > from) {
            data.forEach(r => r.splice(to - count + 1, 0, ...r.splice(from, count)));
        } else {
            data.forEach(r => r.splice(to, 0, ...r.splice(from, count)));
        }
        this.setState({ data })
    }

}