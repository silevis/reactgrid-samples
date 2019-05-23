import * as React from 'react'
import { ColProps, RowProps, CellMatrix } from '../../lib/Common';
import { TextCell } from '../../lib/Cells/TextCell';
import { Grid } from '../../lib/Components/Grid';
// import { ColumnHeaderCell } from '../../lib/Cells/ColumnHeaderCell';
// import { RowHeaderCell } from '../../lib/Cells/RowHeaderCell';

export class Spreadsheet extends React.Component<{}, { data: string[][] }> {
    constructor(props: {}) {
        super(props);
        this.state = {
            data: Array(500).fill(0).map((r, ri) => Array(50).fill(0).map((c, ci) => (ri + 100) + ' - ' + (ci + 100)))
        }

    }


    private generateCellMatrix() {
        const cells = this.state.data.map((row, ri) =>
            row.map((value, ci) => new TextCell(value, v => { console.log(v); this.state.data[ri][ci] = v; this.setState(this.state); return true }))
        )
        const columns: ColProps[] = this.state.data[0].map(_ => { return { width: 80, context: undefined } });
        const rows: RowProps[] = this.state.data.map(_ => { return { height: 25, context: undefined } })
        // rowHeights.map((_, i) => cells[i][0] = RowHeaderCell.Create({ textValue: i.toString(), data: i.toString(), type: 'rowHeader' }, 'header', () => { }, false, true, () => { }));
        // columnWidths.map((_, j) => cells[0][j] = ColumnHeaderCell.Create({ textValue: j.toString(), data: j.toString(), type: 'columnHeader' }, 'header', () => { }, false, true, () => { }));
        // cells[0][0] = ColumnHeaderCell.Create({ textValue: '', data: '', type: 'columnHeader' }, 'header', () => { }, true, false, () => { });
        return new CellMatrix({ frozenTopRows: 1, frozenLeftColumns: 1, frozenBottomRows: 1, frozenRightColumns: 1, rows, columns, cells: cells })
    }

    render() {
        console.log('render spreadsheet')
        return <Grid style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, fontFamily: 'Sans-Serif' }}
            cellMatrix={this.generateCellMatrix()}
            onValuesChanged={() => this.forceUpdate()}
        />
    }
}