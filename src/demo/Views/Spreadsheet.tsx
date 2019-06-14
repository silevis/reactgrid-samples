import * as React from 'react'
import { ColumnProps, RowProps, CellMatrixProps, DataChange } from '../../lib/Common';
import { TextCell } from '../../lib/Cells/TextCell';
import { DynaGrid } from '../../lib/Components/DynaGrid';
import { HeaderCell } from '../../lib/Cells/HeaderCell';

export class Spreadsheet extends React.Component<{}, { data: string[][], widths: number[] }> {
    constructor(props: {}) {
        super(props);
        state = {
            widths: Array(10).fill(120),
            data: Array(10).fill(0).map((_, ri) => Array(10).fill(0).map((_, ci) => (ri + 100) + ' - ' + (ci + 100)))

        }
    }

    private generateCellMatrix(): CellMatrixProps {
        const columns: ColumnProps[] = state.data[0].map((c, idx) => ({
            id: idx,
            width: state.widths[idx],
            onDrop: (ids) => this.reorderColumns(ids as number[], idx),
            reorderable: true,
            resizable: true,
            onResize: width => { state.widths[idx] = 120, this.forceUpdate(); }
        }));
        const rows: RowProps[] = state.data.map((row, rowIdx) => ({
            id: rowIdx,
            height: 25,
            onDrop: (ids) => this.reorderRows(ids as number[], rowIdx),
            reorderable: true,
            cells: row.map((data, colIdx) => (rowIdx === 0 || colIdx === 0) ? new HeaderCell(data) : new TextCell(data))
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
            onDataChanged={changes => this.handleDataChanges(changes)}
        />
    }

    handleDataChanges(dataChanges: DataChange[]) {
        const data = state.data;
        dataChanges.forEach(change => {
            data[change.rowId as number][change.columnId as number] = change.newData as string;
        })
        this.setState({ data });
    }

    reorderColumns(colIdxs: number[], to: number) {
        let data = [...state.data];
        if (to > colIdxs[0]) {
            data = data.map(r => this.calculateColumnReorder(r, colIdxs, 'right', to));
        } else {
            data = data.map(r => this.calculateColumnReorder(r, colIdxs, 'left', to));
        }
        this.setState({ data })
    }

    reorderRows(rowIdxs: number[], to: number) {
        const data = [...state.data];
        const movedRows = data.filter((_, idx) => rowIdxs.includes(idx));
        const clearedData = data.filter((_, idx) => !rowIdxs.includes(idx));
        if (to > rowIdxs[0])
            to = to - rowIdxs.length + 1
        clearedData.splice(to, 0, ...movedRows)
        this.setState({ data: clearedData })
    }
}