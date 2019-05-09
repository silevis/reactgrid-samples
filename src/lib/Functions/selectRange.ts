import { GridContext, Range } from "../Common";

export function selectRange(gridContext: GridContext, range: Range) {
    const selectedRanges = gridContext.state.selectedRanges.map(r => r.contains(gridContext.state.focusedLocation!) ? range : r);

    gridContext.setState({
        selectionMode: 'range',
        selectedRanges,
        selectedIndexes: []
    });
}

export function selectSingleCell(gridContext: GridContext, range: Range) {
    gridContext.setState({
        selectionMode: 'range',
        selectedRanges: gridContext.state.selectedRanges.concat([range]),
        selectedIndexes: [],
        activeSelectedRangeIdx: gridContext.state.selectedRanges.length
    });
}

export function selectColumn(gridContext: GridContext, column: Range) {
    gridContext.setState({
        selectionMode: 'column',
        selectedRanges: [column],
        selectedIndexes: [column.first.col.idx]
    });
}

export function selectColumns(gridContext: GridContext, column: Range) {
    gridContext.setState({
        selectionMode: 'column',
        selectedRanges: gridContext.state.selectedRanges.concat(column),
        selectedIndexes: gridContext.state.selectedIndexes.concat(column.first.col.idx)
    });
}