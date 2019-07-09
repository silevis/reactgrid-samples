import * as React from 'react'
import { ColumnProps, RowProps, CellMatrixProps, DataChange } from '../../lib/Common';
import { DynaGrid } from '../../lib/Components/DynaGrid';


interface Cell {
    colId: string;
    data: any;
}
interface Row {
    rowId: string;
    cols: Cell[]
}


export class Spreadsheet extends React.Component<{}, { data: Row[], widths: number[] }> {
    constructor(props: {}) {
        super(props);

        const colIds: string[] = Array.from(Array(10), () => Math.random().toString(36).substr(2, 9));

        this.state = {
            widths: Array(500).fill(120),
            data: Array(20).fill(0).map((_, ri) =>
                ({
                    rowId: Math.random().toString(36).substr(2, 9),
                    cols: Array(10).fill(0).map((_, ci) =>
                        ({
                            data: (ri + 100) + ' - ' + (ci + 100),
                            colId: colIds[ci]
                        }))
                })
            )
        }
    }

    private generateCellMatrix(): CellMatrixProps {
        const columns: ColumnProps[] = this.state.data[0].cols.map((c, idx) => ({
            id: c.colId,
            width: this.state.widths[idx],
            onDrop: (ids) => this.reorderColumns(ids as number[], idx),
            reorderable: true,
            resizable: true,
            onResize: width => { this.state.widths[idx] = 120, this.forceUpdate(); }
        }));
        const rows: RowProps[] = this.state.data.map((row, rowIdx) => ({
            id: row.rowId,
            height: 25,
            onDrop: (ids) => this.reorderRows(ids as number[], rowIdx),
            reorderable: true,
            cells: row.cols.map((data, colIdx) => (rowIdx === 0 || colIdx === 0) ? { data: data.data, type: 'header' } : (rowIdx !== 0 && colIdx === 1) ? { data: data.data, type: 'checkbox' } : { data: data.data, type: 'text' })
        }))
        return ({ frozenTopRows: 2, frozenLeftColumns: 2, frozenBottomRows: 2, frozenRightColumns: 2, rows, columns })
    }

    private calculateColumnReorder(row: Row, colIdxs: number[], direction: string, destination: number) {
        const movedColumns: Cell[] = row.cols.filter((_, idx) => colIdxs.includes(idx));
        const clearedRow: Cell[] = row.cols.filter((_, idx) => !colIdxs.includes(idx));
        if (direction === 'right') {
            destination = destination - colIdxs.length + 1
        }
        clearedRow.splice(destination, 0, ...movedColumns)
        row.cols = clearedRow
        return row
    }

    render() {
        return <div>
            <button style={{ width: 250, height: 50 }} onClick={() => {
                let data = [...this.state.data];
                data.shift()
                this.setState({ data })
            }}>
                usuń pierwszy rekord od góry
            </button>
            <button style={{ width: 250, height: 50 }} onClick={() => {
                let data = [...this.state.data];
                data.forEach(r => r.cols.shift())
                this.setState({ data })
            }}>
                usuń pierwszy kolumn od lewej
            </button>
            <DynaGrid style={{ position: 'absolute', top: 50, bottom: 0, left: 0, right: 0, fontFamily: 'Sans-Serif' }}
                cellMatrixProps={this.generateCellMatrix()}
                onDataChanged={changes => this.handleDataChanges(changes)}
                cellTemplates={{}}
            />
        </div>
    }

    handleDataChanges(dataChanges: DataChange[]) {
        const data: Row[] = this.state.data;
        dataChanges.forEach(change => {
            const row: any = data.find(row => row.rowId === change.rowId);
            const cell: any = row ? row.cols.find((c: any) => c.colId === change.columnId) : null
            if (cell && row) {
                cell.data = change.newData as string;
                row.cols.map((c: any) => c.colId == cell.colId ? c = cell : change)
                const newData: Row[] = data.map(r => r.rowId == row.rowId ? r = row : r)
                this.setState({ data: newData })
            }
        })
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

    reorderRows(rowIdxs: number[], to: number) {
        const data = [...this.state.data];
        const movedRows = data.filter((_, idx) => rowIdxs.includes(idx));
        const clearedData = data.filter((_, idx) => !rowIdxs.includes(idx));
        if (to > rowIdxs[0])
            to = to - rowIdxs.length + 1
        clearedData.splice(to, 0, ...movedRows)
        this.setState({ data: clearedData })
    }
}