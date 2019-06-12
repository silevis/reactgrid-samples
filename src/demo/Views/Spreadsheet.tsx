import * as React from 'react'
import { ColumnProps, RowProps, CellMatrixProps, DataChange } from '../../lib/Common';
import { TextCell } from '../../lib/Cells/TextCell';
import { DynaGrid } from '../../lib/Components/DynaGrid';
import { HeaderCell } from '../../lib/Cells/HeaderCell';

export class Spreadsheet extends React.Component<{}, { data: string[][], widths: number[] }> {
    constructor(props: {}) {
        super(props);
        this.state = {
            widths: Array(30).fill(120),
            data: Array(1000).fill(0).map((_, ri) => Array(30).fill(0).map((_, ci) => (ri + 100) + ' - ' + (ci + 100)))

        }
    }

    private generateCellMatrix(): CellMatrixProps {
        const columns: ColumnProps[] = this.state.data[0].map((c, idx) => ({
            id: idx,
            width: this.state.widths[idx],
            onDrop: (ids) => this.reorderColumns(ids as number[], idx),
            reorderable: true,
            resizable: true,
            onResize: width => { this.state.widths[idx] = 120, this.forceUpdate(); }
        }));
        const rows: RowProps[] = this.state.data.map((row, rowIdx) => ({
            id: rowIdx,
            height: 25,
            reorderable: false,
            cells: row.map((data) => rowIdx === 0 ? new HeaderCell(data) : new TextCell(data))
        }))
        return ({ frozenTopRows: 2, frozenLeftColumns: 2, frozenBottomRows: 2, frozenRightColumns: 2, rows, columns })
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
        return <DynaGrid style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, fontFamily: 'Sans-Serif' }}
            cellMatrixProps={this.generateCellMatrix()}
            onDataChanged={this.handleDataChanges}
        />
    }

    handleDataChanges(dataChanges: DataChange[]) {
        const data = { ... this.state.data }
        dataChanges.forEach(change => {
            data[change.rowId as number][change.columnId as number] = change.newData as string;
        })
        this.setState({ data });
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