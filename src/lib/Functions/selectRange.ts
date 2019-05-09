import { GridContext, Range, Column } from "../Common";

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

export function selectColumns(gridContext: GridContext, firstColumn: Column, lastColumn: Column, incremental: boolean) {
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