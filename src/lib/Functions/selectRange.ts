import { GridContext, Range, Column, Row } from "../Common";

export function selectRange(gridContext: GridContext, range: Range, incremental: boolean) {
    gridContext.setState({
        selectionMode: 'range',
        selectedRanges: (incremental ? gridContext.state.selectedRanges : []).concat([range]),
        selectedIndexes: [],
        activeSelectedRangeIdx: incremental ? gridContext.state.selectedRanges.length : 0

    });
}

export function updateActiveSelectedRange(gridContext: GridContext, range: Range) {
    gridContext.setState({
        // replace active selected range in selectedRanges
        selectedRanges: Object.assign([], gridContext.state.selectedRanges, { [gridContext.state.activeSelectedRangeIdx]: range })
    })
}

export function selectColumn(gridContext: GridContext, column: Column, incremental: boolean) {
    const firstRow = gridContext.cellMatrix.first.row;
    const lastRow = gridContext.cellMatrix.last.row;
    const range = gridContext.cellMatrix.getRange({ col: column, row: firstRow }, { col: column, row: lastRow })
    gridContext.setState({
        selectionMode: 'column',
        // TODO Ranges have to be re-calculated durring render
        selectedRanges: (incremental && gridContext.state.selectionMode === 'column' ? gridContext.state.selectedRanges : []).concat(range),
        selectedIndexes: (incremental && gridContext.state.selectionMode === 'column' ? gridContext.state.selectedIndexes : []).concat(column.idx)
    });
}

export function updateActiveSelectedColumns(gridContext: GridContext, firstColumn: Column, lastColumn: Column, incremental: boolean) {
    // TODO THIS! 

    const firstRow = gridContext.cellMatrix.first.row;
    const lastRow = gridContext.cellMatrix.last.row;
    const range = gridContext.cellMatrix.getRange({ col: firstColumn, row: firstRow }, { col: lastColumn, row: lastRow })
    gridContext.setState({
        selectionMode: 'column',
        // TODO Ranges have to be re-calculated durring render
        selectedRanges: [range],
        selectedIndexes: range.cols.map(col => col.idx)
    });
}

export function selectRow(gridContext: GridContext, row: Row, incremental: boolean) {
    const firstCol = gridContext.cellMatrix.first.col;
    const lastCol = gridContext.cellMatrix.last.col;
    const range = gridContext.cellMatrix.getRange({ col: firstCol, row: row }, { col: lastCol, row: row })
    gridContext.setState({
        selectionMode: 'row',
        // TODO Ranges have to be re-calculated durring render
        selectedRanges: (incremental && gridContext.state.selectionMode === 'row' ? gridContext.state.selectedRanges : []).concat(range),
        selectedIndexes: (incremental && gridContext.state.selectionMode === 'row' ? gridContext.state.selectedIndexes : []).concat(row.idx)
    });
}

export function updateActiveSelectedRows(gridContext: GridContext, firstRow: Row, lastRow: Row, incremental: boolean) {
    // TODO THIS! 

    const firstCol = gridContext.cellMatrix.first.col;
    const lastCol = gridContext.cellMatrix.last.col;
    const range = gridContext.cellMatrix.getRange({ col: firstCol, row: firstRow }, { col: lastCol, row: lastRow })
    gridContext.setState({
        selectionMode: 'row',
        // TODO Ranges have to be re-calculated durring render
        selectedRanges: [range],
        selectedIndexes: range.rows.map(row => row.idx)
    });
}