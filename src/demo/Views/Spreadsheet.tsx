import * as React from 'react'
import { ColumnProps, RowProps, CellMatrix, Cell } from '../../lib/Common';
import { TextCell } from '../../lib/Cells/TextCell';
import { DynaGrid } from '../../lib/Components/DynaGrid';
import { ColumnHeaderCell } from '../../lib/Cells/HeaderCell';

export class Spreadsheet extends React.Component<{}, { data: string[][] }> {
    constructor(props: {}) {
        super(props);
        this.state = {
<<<<<<< HEAD
            data: Array(1000).fill(0).map((_, ri) => Array(25).fill(0).map((_, ci) => (ri + 100) + ' - ' + (ci + 100)))
=======
            data: Array(40).fill(0).map((_, ri) => Array(40).fill(0).map((_, ci) => (ri + 100) + ' - ' + (ci + 100)))
>>>>>>> 0a347c353be5afe321eeb8dcbb457281cbc0834d
        }

    }

    private generateCellMatrix() {
        const cells: any = this.state.data.map((row, ri) =>
            row.map((value, ci) => new TextCell(value)
            )
        const columns: ColumnProps[] = this.state.data[0].map((c, idx) => { return { id: idx, width: 120, onDropLeft: (cols) => this.reorderColumns(cols, idx), onDropRight: (cols) => this.reorderColumns(cols, idx) } });
        const rows: RowProps[] = this.state.data.map((_, idx) => ({ id: idx, height: 25 }))
        columns.forEach((_, j) => cells[0][j] = new ColumnHeaderCell(j.toString()))
        return new CellMatrix({ frozenTopRows: 2, frozenLeftColumns: 2, frozenBottomRows: 2, frozenRightColumns: 2, rows, columns, cells })
    }

    private calculateColumnReorder(row: string[], colIdxs: number[], direction: string, destination: number) {
        const movedColumns: string[] = row.filter((_, idx) => colIdxs.includes(idx));
        const clearedRow: string[] = row.filter((_, idx) => !colIdxs.includes(idx));
        if (direction === 'right') {
            destination = destination - colIdxs.length + 1
        }
        clearedRow.splice(destination, 0, ...movedColumns)
        return clearedRow
    }

    render() {
        return <DynaGrid style={{ position: 'absolute', top: 40, bottom: 0, left: 0, right: 0, fontFamily: 'Sans-Serif' }}
            cellMatrixProps={this.generateCellMatrix()}
            onValuesChangesCommited={this.forceUpdate}
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