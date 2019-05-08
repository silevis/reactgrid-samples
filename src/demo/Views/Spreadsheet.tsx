import * as React from 'react'
import { ColProps, RowProps, CellMatrix } from '../../lib/Common';
import { TextCell } from '../../lib/Cells/TextCell';
import { HeaderCell } from '../../lib/Cells/HeaderCell';
import { Grid } from '../../lib/Components/Grid';

export class Spreadsheet extends React.Component<{}, {}> {
    private generateCellMatrix() {
        const rowHeights = Array(500).fill(25)
        const columnWidths = Array(50).fill(80)

        const cells = rowHeights.map((rh, ri) =>
            columnWidths.map((cw, ci) => TextCell.Create((ri + 100) + ' - ' + (ci + 100), _ => { }, false, _ => { }))
        )
        const columns: ColProps[] = columnWidths.map(_ => { return { width: 80, context: undefined } });
        const rows: RowProps[] = rowHeights.map(_ => { return { height: 25, context: undefined } })
        rowHeights.map((_, i) => cells[i][0] = HeaderCell.Create('vertical', i.toString(), 'header', () => { }, false, true, () => { }));
        columnWidths.map((_, j) => cells[0][j] = HeaderCell.Create('horizontal', j.toString(), 'header', () => { }, false, true, () => { }));
        cells[0][0] = HeaderCell.Create('horizontal', '', 'header', () => { }, true, false, () => { });
        return new CellMatrix({ frozenTopRows: 2, frozenLeftColumns: 2, frozenBottomRows: 2, frozenRightColumns: 2, rows, columns, cells: cells })
    }

    render() {
        return <Grid style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, fontFamily: ' Sans-Serif' }}
            cellMatrix={this.generateCellMatrix()}
            onValuesChanged={() => this.forceUpdate()}
        />
    }
}
