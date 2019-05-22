import * as React from 'react'
import { ColProps, RowProps, CellMatrix } from '../../lib/Common';
import { TextCell } from '../../lib/Cells/TextCell';
import { Grid } from '../../lib/Components/Grid';
import { ColumnHeaderCell } from '../../lib/Cells/ColumnHeaderCell';
import { RowHeaderCell } from '../../lib/Cells/RowHeaderCell';

export class Spreadsheet extends React.Component<{}, {}> {
    private generateCellMatrix() {
        const rowHeights = Array(500).fill(25)
        const columnWidths = Array(50).fill(80)

        const cells = rowHeights.map((rh, ri) =>
            columnWidths.map((cw, ci) => TextCell.Create({ textValue: (ri + 100) + ' - ' + (ci + 100), data: (ri + 100) + ' - ' + (ci + 100), type: 'string' }, (v) => console.log(v), false, _ => { }))
        )
        const columns: ColProps[] = columnWidths.map(_ => { return { width: 80, context: undefined } });
        const rows: RowProps[] = rowHeights.map(_ => { return { height: 25, context: undefined } })
        rowHeights.map((_, i) => cells[i][0] = RowHeaderCell.Create({ textValue: i.toString(), data: i.toString(), type: 'rowHeader' }, 'header', () => { }, false, true, () => { }));
        columnWidths.map((_, j) => cells[0][j] = ColumnHeaderCell.Create({ textValue: j.toString(), data: j.toString(), type: 'columnHeader' }, 'header', () => { }, false, true, () => { }));
        cells[0][0] = ColumnHeaderCell.Create({ textValue: '', data: '', type: 'columnHeader' }, 'header', () => { }, true, false, () => { });
        return new CellMatrix({ frozenTopRows: 1, frozenLeftColumns: 1, frozenBottomRows: 1, frozenRightColumns: 1, rows, columns, cells: cells })
    }

    render() {
        return <Grid style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, fontFamily: 'Sans-Serif' }}
            cellMatrix={this.generateCellMatrix()}
            onValuesChanged={() => this.forceUpdate()}
        />
    }
}