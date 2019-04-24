import * as React from 'react'
import { Grid, CellMatrix } from 'lib'
import { TextCell, HeaderCell } from 'lib'
import { ColProps, RowProps } from '../../../react-dyna-grid-new/src/lib/Model';

export class Spreadsheet extends React.Component<{}, {}> {
    private generateCellMatrix() {
        const rowHeights = Array(100).fill(25)
        const columnWidths = Array(20).fill(150)

        const cells = rowHeights.map((rh, ri) =>
            columnWidths.map((cw, ci) => TextCell.Create((ri + 100) + ' - ' + (ci + 100), _ => { }))
        )
        const columns: ColProps[] = columnWidths.map(_ => { return { width: 200, context: undefined } });
        const rows: RowProps[] = rowHeights.map(_ => { return { height: 25, context: undefined } })
        rowHeights.map((_, i) => cells[i][0] = HeaderCell.Create('vertical', i.toString(), _ => { }, true))
        columnWidths.map((_, j) => cells[0][j] = HeaderCell.Create('horizontal', j.toString(), _ => { }, true))
        cells[0][0] = HeaderCell.Create('full-dimension', '', _ => { }, true);
        return new CellMatrix({ frozenTopRows: 3, frozenLeftColumns: 3, frozenBottomRows: 7, frozenRightColumns: 2, rows, columns, cells: cells })
    }

    render() {
        return <Grid style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, fontFamily: ' Sans-Serif' }}
            cellMatrix={this.generateCellMatrix()}
            onValuesChanged={() => this.forceUpdate()}
            />
    }
}
