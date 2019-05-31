import * as React from 'react'
import { ColProps, RowProps, CellMatrix, Cell } from '../../lib/Common';
import { TextCell } from '../../lib/Cells/TextCell';
import { Grid } from '../../lib/Components/Grid';
import { ColumnHeaderCell } from '../../lib/Cells/ColumnHeaderCell';
import { RowHeaderCell } from '../../lib/Cells/RowHeaderCell';
import { SSL_OP_EPHEMERAL_RSA } from 'constants';

export class Spreadsheet extends React.Component<{}, { data: string[][] }> {
    constructor(props: {}) {
        super(props);
        this.state = {
            data: Array(20).fill(0).map((_, ri) => Array(10).fill(0).map((_, ci) => (ri + 100) + ' - ' + (ci + 100)))
        }

    }



    private generateCellMatrix() {
        const cells: any = this.state.data.map((row, ri) =>
            row.map((value, ci) => new TextCell(value, v => { console.log(v); this.state.data[ri][ci] = v; this.setState(this.state); return true }))
        )
        const columns: ColProps[] = this.state.data[0].map(_ => { return { width: 80, context: undefined } });
        const rows: RowProps[] = this.state.data.map(_ => { return { height: 25, context: undefined } })
        rows.map((_, i) => cells[i][0] = new RowHeaderCell(i.toString(), v => { console.log(v); this.state.data[i][0] = v; this.setState(this.state); return true }))
        columns.map((_, j) => cells[0][j] = new ColumnHeaderCell(j.toString(), v => { console.log(v); this.state.data[0][j] = v; this.setState(this.state); return true }))
        cells[0][0] = new ColumnHeaderCell('', v => { console.log(v); this.state.data[0][0] = v; this.setState(this.state); return true })
        return new CellMatrix({ frozenTopRows: 1, frozenLeftColumns: 1, frozenBottomRows: 1, frozenRightColumns: 1, rows, columns, cells: cells })
    }

    render() {
        console.log('render spreadsheet')
        return <Grid style={{ position: 'absolute', top: 40, bottom: 0, left: 0, right: 0, fontFamily: 'Sans-Serif' }}
            cellMatrix={this.generateCellMatrix()}
            onValuesChanged={() => this.forceUpdate()}
        />
    }
}